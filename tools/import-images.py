#!/usr/bin/env python3
"""Brings character sprites into the game.

    python3 tools/import-images.py <file.zip | file.xlsx | folder> [more…]

Images come either as files named <Mã nhân dạng>_<cột>.png (human_nam_3_chienbinh.png) or
<Mã ảnh>.png for evolved forms (goblin_nam_hobgoblin.png), loose spellings are fine, or pasted
into the worksheet docs/bang-anh-nhan-vat.xlsx (sheets "Nhân dạng" and "Tiến hóa").
For every image it:
  1. removes the flat background (flood fill from the border, tolerant to AI noise),
  2. crops to the character,
  3. finds the real pixel size of the art and shrinks it back to that grid (nearest neighbour),
  4. trims the palette and writes img/<key>.png (a few KB each).
Then it prints what is still missing. Re-sending a file with the same name replaces it.
"""
import glob, io, json, os, re, sys, unicodedata, zipfile
from collections import Counter

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "img")
EXTS = (".png", ".jpg", ".jpeg", ".webp")
# the pictures asked for: every person row × picture column of docs/anh-nhan-vat-*.xlsx
SHEETS = sorted(glob.glob(os.path.join(ROOT, "docs", "anh-nhan-vat-*.xlsx")))


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn").replace("đ", "d")
    s = re.sub(r"\(\d+\)|copy|ban sao", "", s)
    return re.sub(r"[^a-z0-9]+", "_", s).strip("_")


def layout(ws):
    """(column of the person code, row of the column codes) on a per-race sheet, else None."""
    for r in range(1, 7):
        for c in range(1, 6):
            if str(ws.cell(r, c).value or "").strip() == "Mã nhân dạng":
                for rr in range(r, r + 4):
                    if any(str(ws.cell(rr, cc).value or "") == "thuongdan" for cc in range(1, ws.max_column + 1)):
                        return c, rr
    return None


def sheet_cells(wb):
    """{(sheet title, row, col): picture key} for every picture cell of a workbook."""
    cells = {}
    for ws in wb.worksheets:
        lay = layout(ws)
        if not lay:
            continue
        pc, cr = lay
        cols = {c: str(ws.cell(cr, c).value) for c in range(1, ws.max_column + 1) if re.match(r"^[a-z0-9_]+$", str(ws.cell(cr, c).value or ""))}
        for r in range(cr + 1, ws.max_row + 1):
            code = str(ws.cell(r, pc).value or "").strip()
            if re.match(r"^[a-z0-9_]+_(nam|nu|x)_\d+$", code):
                for c, col in cols.items():
                    cells[(ws.title, r, c)] = f"{code}_{col}"
    return cells


from openpyxl import load_workbook
KEYS = []
for path in SHEETS:
    KEYS += list(sheet_cells(load_workbook(path)).values())
NEED = set(KEYS)
ID_CODES = {k.rsplit("_", 1)[0] for k in KEYS if k.endswith("_thuongdan")}
LOOKUP = {norm(k): k for k in KEYS}


def key_for(name):
    """The picture a file name stands for: human_nam_3_swordsman_moi.png, "Human_Nam_3_Swordsman_Moi (1).jpg"…"""
    base = norm(os.path.splitext(os.path.basename(name))[0])
    return LOOKUP.get(base) or LOOKUP.get(re.sub(r"_\d+$", "", base))


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
    """Pictures in a worksheet as (key, bytes): floating pictures by the cell they sit on, and
    Excel's "place in cell" pictures through the rich-value tables."""
    import xml.etree.ElementTree as ET
    wb = load_workbook(path)
    cells = sheet_cells(wb)
    out = []
    for ws in wb.worksheets:
        for im in getattr(ws, "_images", []):
            a = im.anchor._from
            k = cells.get((ws.title, a.row + 1, a.col + 1))
            if k:
                out.append((k, im._data()))
    z = zipfile.ZipFile(path)
    names = set(z.namelist())
    if "xl/richData/richValueRel.xml" in names:
        rels = ET.fromstring(z.read("xl/richData/_rels/richValueRel.xml.rels"))
        rid2t = {r.get("Id"): r.get("Target") for r in rels}
        rel_list = [el.get("{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id") for el in ET.fromstring(z.read("xl/richData/richValueRel.xml"))]
        rv = [int(v.find("{*}v").text) for v in ET.fromstring(z.read("xl/richData/rdrichvalue.xml"))]
        for n in sorted(x for x in names if re.match(r"xl/worksheets/sheet\d+\.xml$", x)):
            idx = int(re.search(r"sheet(\d+)", n).group(1)) - 1
            if idx >= len(wb.sheetnames):
                continue
            title = wb.sheetnames[idx]
            for c in ET.fromstring(z.read(n)).iter("{*}c"):
                vm = c.get("vm")
                if not vm or int(vm) - 1 >= len(rv):
                    continue
                col, row = re.match(r"([A-Z]+)(\d+)", c.get("r")).groups()
                cn = 0
                for ch in col:
                    cn = cn * 26 + ord(ch) - 64
                k = cells.get((title, int(row), cn))
                if k:
                    target = os.path.normpath("xl/richData/" + rid2t[rel_list[rv[int(vm) - 1]]]).replace("\\", "/")
                    out.append((k, z.read(target)))
    return out


def sources(paths):
    for p in paths:
        if p.lower().endswith((".xlsx", ".xlsm")):
            for k, data in xlsx_images(p):
                yield k + ".png", data
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
        k = key_for(name)
        if not k:
            unknown.append(os.path.basename(name))
            continue
        im, p = process(data, name)
        im.save(os.path.join(OUT, k + ".png"), optimize=True)
        done.append(f"{k}.png  ({im.width}x{im.height}, lưới {p}px)")
    have = {f[:-4] for f in os.listdir(OUT) if f.endswith(".png")}
    print(f"Đã nhập {len(done)} ảnh.")
    for d in done[:200]:
        print("  ✓ " + d)
    if unknown:
        print(f"Không khớp tên ({len(unknown)}): " + ", ".join(unknown[:50]))
    print(f"Đã có {len(have & NEED)}/{len(KEYS)} ảnh.")
    ids_started = sorted({k.rsplit("_", 1)[0] for k in have & NEED if k.rsplit("_", 1)[0] in ID_CODES})
    no_base = [c for c in ids_started if f"{c}_thuongdan" not in have]
    if no_base:
        print("Nhân dạng thiếu ảnh gốc Thường dân: " + ", ".join(no_base))
    missing = [k for k in KEYS if k not in have]
    if missing:
        print("Tiếp theo nên làm (10 ảnh đầu bảng còn thiếu): " + ", ".join(missing[:10]))

if __name__ == "__main__":
    main()
