#!/usr/bin/env python3
"""Second pass over the sprite atlases made by tools/import-sheets.py: peels off what is left of a
tile behind a figure (a flat block of colour touching the edge of the frame), and specks, signs and
caption words standing apart from the figure. Re-packs the atlases in place.

    python3 tools/tidy-atlas.py img
"""
import json, os, sys, importlib.util
import numpy as np
from PIL import Image
from scipy import ndimage


def flat_bg(rgb, alpha):
    """Opaque pixels belonging to flat colour areas that reach the frame edge and are big: a tile face.
    Pixel-art figures have a dark outline, so their own flat areas never touch the edge."""
    a = alpha > 0
    c = rgb.astype(np.int32)
    d = np.zeros(a.shape, np.int32)
    for dy, dx in ((0, 1), (1, 0), (0, -1), (-1, 0)):
        d = np.maximum(d, np.abs(c - np.roll(np.roll(c, dy, 0), dx, 1)).sum(axis=2))
    flat = a & (d <= 30)
    lab, n = ndimage.label(flat)
    if not n:
        return np.zeros_like(a)
    H, W = a.shape
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    out = np.zeros_like(a)
    sizes = ndimage.sum(flat, lab, range(1, n + 1))
    objs = ndimage.find_objects(lab)
    for i in edge:
        sl = objs[i - 1]
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if sizes[i - 1] < 0.04 * H * W or not (w >= 0.4 * W or h >= 0.4 * H):
            continue
        r = lab == i
        # a tile lies along the frame's edge for a long straight stretch; a figure only touches it here and there
        runs = [r[0].mean(), r[-1].mean(), r[:, 0].mean(), r[:, -1].mean()]
        if max(runs) >= 0.45:
            out |= r
    if out.any():
        # the soft rim of that block (anti-aliased) goes with it
        out = ndimage.binary_dilation(out, iterations=1) & a & (d <= 60)
        out |= ndimage.binary_dilation(out, iterations=1) & a & (d <= 30)
    return out


_spec = importlib.util.spec_from_file_location("ii", os.path.join(os.path.dirname(os.path.abspath(__file__)), "import-images.py"))
ii = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(ii)


def is_block(a):
    s = sorted([a[0].mean(), a[-1].mean(), a[:, 0].mean(), a[:, -1].mean()])
    return s[2] > 0.6


def unblock(arr):
    """A whole tile came along: peel its face off from the border, harder and harder, until a figure is left."""
    for tol in (40, 60, 80):
        rgba = arr.copy()
        rgba[:, :, 3] = 255
        got = ii.remove_background(Image.fromarray(rgba), tol=tol)
        al = (got[:, :, 3] > 0) & (arr[:, :, 3] > 0)
        cov = al.mean()
        if 0.12 < cov < 0.7 and not is_block(al):
            lab, n = ndimage.label(al, structure=np.ones((3, 3)))
            sizes = ndimage.sum(al, lab, range(1, n + 1))
            main = int(np.argmax(sizes)) + 1
            if sizes[main - 1] < 0.7 * al.sum():
                return None  # the figure broke apart with its background: better left as it was
            keep = np.isin(lab, [i + 1 for i in range(n) if sizes[i] >= 0.03 * sizes[main - 1]])
            out = arr.copy()
            out[~keep, 3] = 0
            return out
    return None


def tidy(im):
    arr = np.asarray(im.convert("RGBA")).copy()
    if is_block(arr[:, :, 3] > 0):
        got = unblock(arr)
        if got is not None:
            ys, xs = np.where(got[:, :, 3] > 0)
            return Image.fromarray(got[ys.min():ys.max() + 1, xs.min():xs.max() + 1], "RGBA"), True
    al = arr[:, :, 3] > 0
    if al.sum() < 30:
        return im, False
    changed = False
    for _ in range(2):
        bg = flat_bg(arr[:, :, :3], arr[:, :, 3])
        # never strip most of the picture: that was the figure, not a tile
        if bg.any() and bg.sum() < 0.6 * (arr[:, :, 3] > 0).sum():
            arr[bg, 3] = 0
            changed = True
        else:
            break
    m = arr[:, :, 3] > 0
    lab, n = ndimage.label(m, structure=np.ones((3, 3)))
    if n > 1:
        sizes = ndimage.sum(m, lab, range(1, n + 1))
        main = int(np.argmax(sizes)) + 1
        objs = ndimage.find_objects(lab)
        mo = objs[main - 1]
        keep = []
        for i in range(n):
            sl = objs[i]
            if i + 1 == main:
                keep.append(i + 1)
                continue
            # touches or overlaps the figure's box and is not a crumb: a weapon tip, a staff orb
            near = sl[0].start <= mo[0].stop + 2 and sl[0].stop >= mo[0].start - 2 and sl[1].start <= mo[1].stop + 2 and sl[1].stop >= mo[1].start - 2
            inside = sl[0].start >= mo[0].start and sl[0].stop <= mo[0].stop and sl[1].start >= mo[1].start - 4 and sl[1].stop <= mo[1].stop + 4
            if near or inside or sizes[i] >= 0.15 * sizes[main - 1]:
                keep.append(i + 1)
        if len(keep) < n:
            arr[~np.isin(lab, keep), 3] = 0
            changed = True
    if not changed:
        return im, False
    ys, xs = np.where(arr[:, :, 3] > 0)
    if not len(ys):
        return im, False
    return Image.fromarray(arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1], "RGBA"), True


def main(d):
    atlas = json.load(open(os.path.join(d, "atlas.json")))
    fixed = 0
    for person, cols in atlas.items():
        sheet = Image.open(os.path.join(d, person + ".png")).convert("RGBA")
        frames = {}
        for col, v in cols.items():
            if col == "_size":
                continue
            x, y, w, h = v
            f, ch = tidy(sheet.crop((x, y, x + w, y + h)))
            fixed += ch
            frames[col] = f
        H = max(f.height for f in frames.values())
        W = sum(f.width + 2 for f in frames.values())
        out = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        x = 0
        atlas[person] = {}
        for col, f in frames.items():
            out.paste(f, (x, H - f.height), f)
            atlas[person][col] = [x, H - f.height, f.width, f.height]
            x += f.width + 2
        atlas[person]["_size"] = [W, H]
        out.quantize(colors=255, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(os.path.join(d, person + ".png"), optimize=True)
    json.dump(atlas, open(os.path.join(d, "atlas.json"), "w"), separators=(",", ":"))
    print(f"Đã dọn {fixed} ảnh")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "img")
