#!/usr/bin/env python3
"""Brings character sprites into the game.

    python3 tools/import-images.py <file.zip | file.xlsx | folder> [more…]

Images come either as files named <Mã ảnh>_<n>.png (goblin_nam_chienbinh_1.png, loose spellings
are fine) or pasted into the worksheet docs/bang-anh-nhan-vat.xlsx, in the "Ảnh n" cells of a row.
For every image it:
  1. removes the flat background (flood fill from the border, tolerant to AI noise),
  2. crops to the character,
  3. finds the real pixel size of the art and shrinks it back to that grid (nearest neighbour),
  4. trims the palette and writes img/<key>.png (a few KB each).
Then it prints what is still missing. Re-sending a file with the same name replaces it.
"""
import io, json, os, re, sys, unicodedata, zipfile
from collections import Counter

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "img")
ROWS = json.load(open(os.path.join(ROOT, "prompts", "image-rows.json"), encoding="utf8"))
KEYS = [x["code"] for x in ROWS]
NEED = {x["code"]: x["count"] for x in ROWS}
EXTS = (".png", ".jpg", ".jpeg", ".webp")


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").replace("đ", "d")
    s = re.sub(r"\(\d+\)|copy|ban sao", "", s)
    return re.sub(r"[^a-z0-9]+", "_", s).strip("_")


LOOKUP = {norm(k): k for k in KEYS}


def key_for(name):
    """(code, n) from a file name: goblin_nam_chienbinh_2.png, "Goblin_Nam_ChienBinh (2).jpg"…"""
    raw = os.path.splitext(os.path.basename(name))[0]
    paren = re.search(r"\((\d+)\)\s*$", raw)
    base = norm(raw)
    m = re.match(r"^(.*?)_(\d+)$", base)
    if m and m.group(1) in LOOKUP:
        return LOOKUP[m.group(1)], int(m.group(2))
    if base in LOOKUP:
        return LOOKUP[base], int(paren.group(1)) if paren else 1
    return None, None


def remove_background(img, tol=48):
    a = np.array(img.convert("RGBA")).astype(np.int32)
    h, w = a.shape[:2]
    if (a[:, :, 3] < 10).mean() > 0.2:  # already transparent
        return a.astype(np.uint8)
    border = np.concatenate([a[0, :, :3], a[-1, :, :3], a[:, 0, :3], a[:, -1, :3]])
    bg = Counter(map(tuple, (border // 8) * 8)).most_common(1)[0][0]
    near = (np.abs(a[:, :, :3] - np.array(bg)).sum(axis=2) <= tol * 3)
    # flood fill from the border; a step may only go to a pixel close to the one it comes from,
    # so a soft gradient background is eaten while the dark outline of the sprite stops it
    rgb = a[:, :, :3]
    seen = np.zeros((h, w), bool)
    stack = [(y, x) for y in (0, h - 1) for x in range(w)] + [(y, x) for x in (0, w - 1) for y in range(h)]
    for y, x in stack:
        seen[y, x] = near[y, x]
    stack = [(y, x) for y, x in stack if seen[y, x]]
    while stack:
        y, x = stack.pop()
        c0 = rgb[y, x]
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and near[ny, nx] and np.abs(rgb[ny, nx] - c0).sum() <= tol:
                seen[ny, nx] = True
                stack.append((ny, nx))
    a[seen, 3] = 0
    return a.astype(np.uint8)


def crop(a):
    ys, xs = np.where(a[:, :, 3] > 20)
    if not len(ys):
        return a
    return a[ys.min(): ys.max() + 1, xs.min(): xs.max() + 1]


def pixel_size(a):
    """The size of one art pixel. Only clear colour edges count (AI noise does not), then the grid is
    the largest size that the gaps between edges are, almost always, a multiple of."""
    rgb = a[:, :, :3].astype(np.int32)
    solid = a[:, :, 3] > 20
    runs = Counter()
    for axis in (1, 0):
        d = np.abs(np.diff(rgb, axis=axis)).sum(axis=2) > 70
        s_ = solid[:, 1:] & solid[:, :-1] if axis == 1 else solid[1:, :] & solid[:-1, :]
        edge = d & s_
        lines = edge if axis == 1 else edge.T
        for row in lines[:: max(1, len(lines) // 150)]:
            pos = np.flatnonzero(row)
            for ln in np.diff(pos):
                if 2 <= ln <= 64:
                    runs[int(ln)] += 1
    if not runs:
        return 1
    total = sum(runs.values())
    best = 1
    for p in range(2, 41):
        tol = 1 if p >= 5 else 0
        fit = sum(n for ln, n in runs.items() if ln >= p - tol and min(ln % p, p - ln % p) <= tol)
        if fit / total >= 0.7:
            best = p
    return best


def to_grid(a, p):
    h, w = a.shape[:2]
    if p <= 1:
        return a
    ys = (np.arange(h // p) * p + p // 2).clip(0, h - 1)
    xs = (np.arange(w // p) * p + p // 2).clip(0, w - 1)
    return a[np.ix_(ys, xs)]


def drop_specks(mask):
    """Keep the character: pieces of the sprite smaller than 2% of it (dust, leftover background) go."""
    h, w = mask.shape
    lab = np.zeros((h, w), np.int32)
    sizes = [0]
    for y in range(h):
        for x in range(w):
            if mask[y, x] and not lab[y, x]:
                n = len(sizes)
                lab[y, x] = n
                stack, size = [(y, x)], 0
                while stack:
                    cy, cx = stack.pop()
                    size += 1
                    for ny in (cy - 1, cy, cy + 1):
                        for nx in (cx - 1, cx, cx + 1):
                            if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not lab[ny, nx]:
                                lab[ny, nx] = n
                                stack.append((ny, nx))
                sizes.append(size)
    keep = {i for i, sz in enumerate(sizes) if i and sz >= max(4, mask.sum() * 0.02)}
    return np.isin(lab, list(keep))


def process(data, name):
    img = Image.open(io.BytesIO(data))
    a = crop(remove_background(img))
    p = pixel_size(a)
    small = to_grid(a, p)
    # keep sprites in a sane range whatever the generator did
    h = small.shape[0]
    im = Image.fromarray(small, "RGBA")
    if h > 160 or h < 40:
        target = 128 if h > 160 else 64
        im = im.resize((max(1, round(im.width * target / h)), target), Image.NEAREST)
    alpha = im.getchannel("A").point(lambda v: 255 if v > 128 else 0)
    alpha = Image.fromarray(drop_specks(np.array(alpha) > 0).astype(np.uint8) * 255)
    rgb = im.convert("RGB").quantize(colors=48, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert("RGBA")
    rgb.putalpha(alpha)
    return rgb, p


def xlsx_images(path):
    """Images in the worksheet: (code, n, bytes). Floating pictures by the cell they sit on, and
    Excel's "place in cell" pictures through the rich-value tables."""
    from openpyxl import load_workbook
    import xml.etree.ElementTree as ET
    wb = load_workbook(path)
    out = []
    for ws in wb.worksheets:
        head = {c.column: str(c.value or "") for c in ws[1]}
        def at(row, col):
            code = ws.cell(row, 1).value
            m = re.match(r"Ảnh (\d+)", head.get(col, ""))
            return (code, int(m.group(1))) if code in NEED and m else (None, None)
        for im in getattr(ws, "_images", []):
            a = im.anchor._from
            code, n = at(a.row + 1, a.col + 1)
            if code:
                out.append((code, n, im._data()))
    # pictures placed in cells (Excel 365): cell vm → rich value → relationship → media file
    z = zipfile.ZipFile(path)
    names = set(z.namelist())
    if "xl/richData/richValueRel.xml" in names:
        ns = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}
        rels = ET.fromstring(z.read("xl/richData/_rels/richValueRel.xml.rels"))
        rid2t = {r.get("Id"): r.get("Target") for r in rels}
        rel_list = [el.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id") for el in ET.fromstring(z.read("xl/richData/richValueRel.xml"))]
        rv = [int(v.find("{*}v").text) for v in ET.fromstring(z.read("xl/richData/rdrichvalue.xml"))]
        media = lambda vm: "xl/richData/" + rid2t[rel_list[rv[vm - 1]]] if vm - 1 < len(rv) else None
        wb_rels = {}
        for sheet_xml in [n for n in names if re.match(r"xl/worksheets/sheet\d+\.xml$", n)]:
            root = ET.fromstring(z.read(sheet_xml))
            cells = {}
            for c in root.iter("{%s}c" % ns["m"]):
                cells[c.get("r")] = c
            def val(ref):
                c = cells.get(ref)
                if c is None:
                    return ""
                v = c.find("{*}v")
                if c.get("t") == "s" and v is not None:
                    return shared[int(v.text)]
                is_ = c.find("{*}is")
                return (is_ is not None and "".join(t.text or "" for t in is_.iter("{*}t"))) or (v.text if v is not None else "")
            shared = []
            if "xl/sharedStrings.xml" in names:
                for si in ET.fromstring(z.read("xl/sharedStrings.xml")):
                    shared.append("".join(t.text or "" for t in si.iter("{*}t")))
            for ref, c in cells.items():
                if c.get("vm"):
                    col, row = re.match(r"([A-Z]+)(\d+)", ref).groups()
                    code = val(f"A{row}")
                    m = re.match(r"Ảnh (\d+)", val(f"{col}1"))
                    target = media(int(c.get("vm")))
                    if code in NEED and m and target:
                        target = os.path.normpath(target).replace("\\", "/")
                        out.append((code, int(m.group(1)), z.read(target)))
    return out


def sources(paths):
    for p in paths:
        if p.lower().endswith((".xlsx", ".xlsm")):
            for code, n, data in xlsx_images(p):
                yield f"{code}_{n}.png", data
        elif zipfile.is_zipfile(p):
            with zipfile.ZipFile(p) as z:
                for n in z.namelist():
                    if n.lower().endswith(EXTS) and not n.startswith("__MACOSX"):
                        yield n, z.read(n)
        elif os.path.isdir(p):
            for dp, _, fs in os.walk(p):
                for f in fs:
                    if f.lower().endswith(EXTS):
                        yield f, open(os.path.join(dp, f), "rb").read()
        elif p.lower().endswith(EXTS):
            yield p, open(p, "rb").read()


def main():
    os.makedirs(OUT, exist_ok=True)
    done, unknown = [], []
    for name, data in sources(sys.argv[1:]):
        code, n = key_for(name)
        if name.lower().endswith((".xlsx", ".xlsm")) or not code:
            if not code:
                unknown.append(os.path.basename(name))
            continue
        im, p = process(data, name)
        f = f"{code}_{n}.png"
        im.save(os.path.join(OUT, f), optimize=True)
        done.append(f"{f}  ({im.width}x{im.height}, lưới {p}px)")
    files = [f[:-4] for f in os.listdir(OUT) if f.endswith(".png")]
    have = Counter(re.sub(r"_\d+$", "", f) for f in files)
    print(f"Đã nhập {len(done)} ảnh.")
    for d in done[:200]:
        print("  ✓ " + d)
    if unknown:
        print(f"Không khớp tên ({len(unknown)}): " + ", ".join(unknown[:50]))
    rows_done = sum(1 for k in KEYS if have[k] >= 1)
    imgs = sum(min(have[k], NEED[k]) for k in KEYS)
    print(f"Nhóm hình đã có ảnh: {rows_done}/{len(KEYS)} · ảnh: {imgs}/{sum(NEED.values())}")
    missing = [k for k in KEYS if not have[k]]
    if missing:
        print("Nhóm chưa có ảnh nào (10 đầu, theo thứ tự ưu tiên): " + ", ".join(missing[:10]))


if __name__ == "__main__":
    main()
