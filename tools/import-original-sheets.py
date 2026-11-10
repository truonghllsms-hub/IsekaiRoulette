#!/usr/bin/env python3
"""Use original embedded PDF JPEGs as sprite sheets without changing pixels.

python3 tools/import-original-sheets.py --human human.pdf --beastman beastman.pdf \
  --dwarf dwarf.pdf --elf elf.pdf --monsters monsters.pdf

Frame coordinates reuse the reviewed identity/column plan in import-sheets.py.
The default mode displays viewports into original JPEGs. With --transparent,
only alpha is changed and native-resolution RGBA atlases are packed losslessly.
Neither mode resizes, quantizes colors or repaints the supplied artwork.
"""
import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

import fitz
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("legacy_sheets", ROOT / "tools/import-sheets.py")
legacy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(legacy)
matte_spec = importlib.util.spec_from_file_location("sprite_background", ROOT / "tools/sprite-background.py")
matte = importlib.util.module_from_spec(matte_spec)
matte_spec.loader.exec_module(matte)

# Native source coordinates: the old screen-measured rectangle included the
# captions beneath the floating veteran envoy.
MANUAL_BOUNDS = {("elf", 3): [(1037, 565, 1215, 711)]}


def viewport(image, boxes, all_boxes, trim_headings=False):
    """Grow a tile's viewport to the connected picture/gray frame around it.

    Detection only supplies coordinates; it never changes the delivered image.
    The original tile rectangle is always included, even if dark clothes split
    the connected component. Nearby tiles cap horizontal growth.
    """
    if "_viewport_pixels" not in image.info:
        image.info["_viewport_pixels"] = np.asarray(image.convert("RGB")).astype(np.int32)
        image.info["_viewport_background"] = legacy.st.page_bg(image.info["_viewport_pixels"])
    a = image.info["_viewport_pixels"]
    height, width = a.shape[:2]
    x0 = min(b[0] for b in boxes)
    y0 = min(b[1] for b in boxes)
    x1 = max(b[2] for b in boxes)
    y1 = max(b[3] for b in boxes)
    bw, bh = x1 - x0, y1 - y0
    left, right = max(0, x0 - bw // 8), min(width, x1 + bw // 8)
    for b in all_boxes:
        if min(y1, b[3]) - max(y0, b[1]) < bh * 0.45:
            continue
        if b[2] <= x0:
            left = max(left, (b[2] + x0) // 2)
        if b[0] >= x1:
            right = min(right, (x1 + b[0]) // 2)
    top, bottom = max(0, y0 - bh // 2), min(height, y1 + max(4, bh // 15))
    patch = a[top:bottom, left:right]
    bg = image.info["_viewport_background"]
    mask = np.max(np.abs(patch - bg), axis=2) > 28
    labels, _ = ndimage.label(mask, structure=np.ones((3, 3)))
    inside = labels[max(0, y0-top):y1-top, max(0, x0-left):x1-left]
    counts = np.bincount(inside.ravel())
    if counts.size:
        counts[0] = 0
        selected = np.flatnonzero(counts >= max(12, bw * bh * 0.03))
        ys, xs = np.where(np.isin(labels, selected)) if len(selected) else ([], [])
        if len(xs):
            x0, y0 = min(x0, int(xs.min())+left), min(y0, int(ys.min())+top)
            x1, y1 = max(x1, int(xs.max())+left+1), max(y1, int(ys.max())+top+1)
    # Include JPEG antialiasing and dark outlines along the detected boundary.
    x0, y0 = max(left, x0-3), max(0, y0-3)
    x1, y1 = min(right, x1+3), min(height, y1+3)
    if trim_headings:
        y0 = max(y0, min(b[1] for b in boxes)-1)
    return [x0, y0, x1-x0, y1-y0]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    for key in ["human", "beastman", "dwarf", "elf", "monsters"]:
        parser.add_argument("--"+key, type=Path, required=True)
    parser.add_argument("--output", type=Path, default=ROOT / "img")
    parser.add_argument("--tiles-cache", type=Path, help="Optional cached detector output for the same source images")
    parser.add_argument("--transparent", action="store_true", help="Generate native-resolution RGBA atlases instead of original-sheet viewports")
    parser.add_argument("--format", choices=["png", "webp"], default="webp", help="Transparent atlas format; WebP uses lossless encoding")
    args = parser.parse_args()
    output = args.output.resolve()
    sheets_dir = output / "source-sheets"
    sheets_dir.mkdir(parents=True, exist_ok=True)
    cached = json.loads(args.tiles_cache.read_text()) if args.tiles_cache else {}
    atlas, sources, provenance = {}, {}, {}
    for key in ["human", "beastman", "dwarf", "elf", "monsters"]:
        pdf = getattr(args, key)
        doc = fitz.open(pdf)
        for page_no, page in enumerate(doc):
            plan = legacy.PAGES.get((key, page_no))
            if not plan:
                continue
            images = page.get_images(full=True)
            if len(images) != 1:
                raise ValueError(f"{pdf.name}, page {page_no+1}: expected one original sheet")
            original = doc.extract_image(images[0][0])
            if original["ext"] not in ("jpeg", "jpg"):
                raise ValueError(f"{pdf.name}, page {page_no+1}: unexpected original encoding")
            filename = f"{key}-{page_no:02d}.jpg"
            destination = sheets_dir / filename
            destination.write_bytes(original["image"])
            image = Image.open(destination).convert("RGB")
            cache = cached.get(f"{key}:{page_no}")
            if cache and list(image.size) != cache["size"]:
                raise ValueError("Cached detector dimensions do not match the source")
            boxes = cache["boxes"] if cache else legacy.st.tiles(image)[0]
            manual = MANUAL_BOUNDS.get((key, page_no), legacy.MANUAL.get((key, page_no), []))
            src = "img/source-sheets/"+filename
            sources[src] = {"pdf": pdf.name, "page": page_no+1, "size": list(image.size), "sha256": hashlib.sha256(original["image"]).hexdigest()}
            for person, columns in plan:
                if person in atlas:
                    raise ValueError(f"Duplicate person: {person}")
                frames = {"_src": src, "_size": list(image.size)}
                pictures = {}
                provenance[person] = {"source": src, "frames": {}}
                for column, refs in columns.items():
                    refs = refs if isinstance(refs, list) else [refs]
                    selected = [manual[int(ref[1:])] if isinstance(ref, str) else boxes[ref] for ref in refs]
                    rect = viewport(image, selected, boxes, key == "beastman" and (page_no == 4 or (page_no == 5 and column.startswith("herder_"))))
                    x, y, w, h = rect
                    if min(x, y) < 0 or min(w, h) <= 0 or x+w > image.width or y+h > image.height:
                        raise ValueError(f"Invalid frame: {person}/{column}: {rect}")
                    frames[column] = rect
                    if args.transparent:
                        pictures[column], source_rect = matte.transparent_frame(image, rect, selected, decorative=key == "beastman", captioned=key == "dwarf")
                        provenance[person]["frames"][column] = source_rect
                if args.transparent:
                    sheet_w = sum(p.width+4 for p in pictures.values())
                    sheet_h = max(p.height for p in pictures.values())+4
                    sheet = Image.new("RGBA",(sheet_w,sheet_h),(0,0,0,0))
                    frames = {"_src": f"img/{person}.{args.format}", "_size": [sheet_w,sheet_h]}
                    cursor = 2
                    for column,picture in pictures.items():
                        yy = sheet_h-picture.height-2
                        # No alpha compositing here: preserve the source RGB,
                        # including antialiased edges, without premultiplying.
                        sheet.paste(picture,(cursor,yy))
                        frames[column] = [cursor,yy,picture.width,picture.height]
                        cursor += picture.width+4
                    if args.format == "webp":
                        sheet.save(output/(person+".webp"),lossless=True,quality=100,method=6)
                    else:
                        sheet.save(output/(person+".png"),optimize=True)
                atlas[person] = frames
            print(f"{key} page {page_no+1}: {len(plan)} identities", flush=True)
    (output / "atlas.json").write_text(json.dumps(atlas, separators=(",", ":")))
    (output / "source-sheets.json").write_text(json.dumps(sources, ensure_ascii=False, indent=2)+"\n")
    (output / "sprite-provenance.json").write_text(json.dumps(provenance, ensure_ascii=False, separators=(",", ":"))+"\n")
    print(f"{len(atlas)} identities, {sum(sum(not k.startswith('_') for k in p) for p in atlas.values())} frames, {len(sources)} original JPEGs")


if __name__ == "__main__":
    main()
