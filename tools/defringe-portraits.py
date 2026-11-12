#!/usr/bin/env python3
"""Remove the white rim left on illustrated portraits when their background was cut out.

The cut-out left a band of pure white, a few pixels wide, along edges and inside enclosed gaps
(between the legs, inside a bow, around a staff). This walks in from the transparent area through
near-white pixels only, so it stops at the ink outline of the figure. White that is part of the
picture is kept: anything wide enough to be a garment or a blade is protected, and the walk never
goes deeper than a few pixels.

  python3 tools/defringe-portraits.py            # fix img/portraits in place
  python3 tools/defringe-portraits.py --check    # report only, exit 1 if a rim remains
  python3 tools/defringe-portraits.py a.webp b.webp
Needs Pillow, NumPy and SciPy. Only transparency is decided here; the portraits are stored as lossy
WebP with a lossless alpha channel, like the files they replace.
"""
import argparse
import glob
import multiprocessing
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage as ndi

ROOT = os.path.join(os.path.dirname(__file__), "..")
WHITE_MIN = 222      # darkest channel of a "white" pixel
WHITE_SPREAD = 26    # most a white pixel may lean towards a colour
THICK = 5            # white wider than about 2*THICK px is part of the picture
DEPTH = 14           # how far the walk may go in from transparency
INK_REACH = 8        # the rim is never further than this from the figure's ink outline
GARMENT = 500        # a wide white area smaller than this (px) is leftover background, not clothing
DISK = ndi.generate_binary_structure(2, 2)


def disk(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


def rim_mask(rgb, alpha, shut=None):
    """Pixels of the white rim: near-white, reachable from transparency, not part of a wide white area."""
    lo = rgb.min(axis=2).astype(int)
    spread = rgb.max(axis=2).astype(int) - lo
    solid = alpha > 0
    white = solid & (lo >= WHITE_MIN) & (spread <= WHITE_SPREAD)
    # a faint pixel is rim whatever its exact shade, as long as it is pale
    faint = solid & (alpha < 110) & (lo >= 190) & (spread <= 40)
    white |= faint
    wide = ndi.binary_opening(white & (alpha >= 200), structure=disk(THICK))
    # a blob of leftover background in the corner of a gap is wide too, but small: only large areas are garments
    lab, n = ndi.label(wide, structure=DISK)
    if n:
        sizes = ndi.sum(wide, lab, range(1, n + 1))
        wide = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= GARMENT])
    keep = ndi.binary_dilation(wide, structure=disk(3)) & white
    walk = white & ~keep
    # the rim always lies against the ink outline; white further in than that is fur, cloth or metal
    ink = (alpha >= 128) & (lo < 110)
    walk &= ndi.distance_transform_edt(~ink) <= INK_REACH
    # never walk in from a hole that sits in pale metal with no outline round it: that is a highlight
    open_air = ~solid if shut is None else (~solid & ~shut)
    seed = ndi.binary_dilation(open_air, structure=DISK) & walk
    reached = ndi.binary_propagation(seed, structure=DISK, mask=walk)
    # only within DEPTH pixels of where transparency already was
    near = ndi.distance_transform_edt(solid) <= DEPTH
    return reached & near


def mend_holes(rgb, alpha):
    """Give back the highlights that the cut-out punched through.

    A bright highlight on armour or a blade was taken for background and made see-through, though its
    colour is still stored. Such a hole sits in the middle of pale metal with no ink line around it;
    a real gap (between an arm and the body) has the figure's outline around it. Returns the mask filled,
    and the holes left alone because they could be either.
    """
    lo = rgb.min(axis=2).astype(int)
    spread = rgb.max(axis=2).astype(int) - lo
    hollow = alpha < 128
    lab, n = ndi.label(hollow, structure=DISK)
    if not n:
        return np.zeros(alpha.shape, bool), np.zeros(alpha.shape, bool)
    outside = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    to_ink = ndi.distance_transform_edt(~((alpha >= 128) & (lo < 110)))
    filled = np.zeros(alpha.shape, bool)
    unsure = np.zeros(alpha.shape, bool)
    for i, box in enumerate(ndi.find_objects(lab), start=1):
        if i in outside or box is None:
            continue
        ys = slice(max(0, box[0].start - 12), box[0].stop + 12)
        xs = slice(max(0, box[1].start - 12), box[1].stop + 12)
        m = lab[ys, xs] == i
        if m.sum() < 4:
            continue
        border = m & ~ndi.binary_erosion(m, structure=DISK)
        if (to_ink[ys, xs][border] <= 6).mean() >= 0.85:
            continue  # the outline runs all the way round it: a real gap
        hidden_pale = lo[ys, xs][m].mean() >= 175 and spread[ys, xs][m].mean() <= 45
        if hidden_pale:
            grown = ndi.binary_dilation(m, structure=DISK, iterations=2) & (alpha[ys, xs] < 255) & (lo[ys, xs] > 190)
            filled[ys, xs] |= m | grown
        else:
            unsure[ys, xs] |= m
    return filled, unsure


def defringe(im):
    a = np.array(im.convert("RGBA"))
    rgb, alpha = a[..., :3], a[..., 3].copy()
    mended, unsure = mend_holes(rgb, alpha)
    alpha[mended] = 255
    rim = rim_mask(rgb, alpha, unsure)
    removed = int(rim.sum()) + int(mended.sum())
    if not removed:
        return im, 0
    alpha[rim] = 0
    # the row of pixels just uncovered is a blend of the white rim and the ink line: fade it by how pale it is
    solid = alpha > 0
    edge = solid & ndi.binary_dilation(rim, structure=DISK)
    lo = rgb.min(axis=2).astype(float)
    spread = rgb.max(axis=2).astype(float) - lo
    pale = edge & (lo > 150) & (spread <= 45)
    fade = np.clip((WHITE_MIN - lo) / (WHITE_MIN - 150.0), 0.0, 1.0)
    alpha[pale] = (alpha[pale] * fade[pale]).astype(np.uint8)
    # specks cut loose by the removal
    lab, n = ndi.label(alpha > 0, structure=DISK)
    if n > 1:
        sizes = ndi.sum(alpha > 0, lab, range(1, n + 1))
        small = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s < 12])
        alpha[small] = 0
    a[..., 3] = alpha
    return Image.fromarray(a, "RGBA"), removed


def rim_share(im):
    """Share of the outline that is still white rim, in percent."""
    a = np.asarray(im.convert("RGBA"))
    rgb, alpha = a[..., :3], a[..., 3]
    solid = alpha > 24
    edge = solid & ~ndi.binary_erosion(solid, iterations=3)
    rim = rim_mask(rgb, alpha) & edge
    return 100.0 * rim.sum() / max(1, edge.sum())


def check_one(f):
    return rim_share(Image.open(f))


def fix_one(f):
    out, removed = defringe(Image.open(f))
    if removed:
        out.save(f, "WEBP", quality=92, method=4, alpha_quality=100)
    return 1 if removed else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--limit", type=float, default=1.5, help="rim share (percent) allowed by --check")
    args = ap.parse_args()
    files = args.files or sorted(glob.glob(os.path.join(ROOT, "img", "portraits", "**", "*.webp"), recursive=True))
    changed = bad = 0
    with multiprocessing.Pool() as pool:
        if args.check:
            for f, share in zip(files, pool.map(check_one, files, chunksize=16)):
                if share > args.limit:
                    bad += 1
                    print(f"{share:5.1f}%  {os.path.relpath(f, ROOT)}")
        else:
            changed = sum(pool.map(fix_one, files, chunksize=16))
    if args.check:
        print(f"{len(files)} ảnh, {bad} ảnh còn viền trắng quá {args.limit}%.")
        sys.exit(1 if bad else 0)
    print(f"Đã làm sạch viền trắng ở {changed}/{len(files)} ảnh.")


if __name__ == "__main__":
    main()
