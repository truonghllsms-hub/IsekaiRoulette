#!/usr/bin/env python3
"""Validate native transparent atlases, optionally against original PDF JPEGs.

python3 tools/validate-sprites.py [--images img] [--originals img/source-sheets]
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--images", type=Path, default=ROOT/"img")
parser.add_argument("--originals", type=Path)
args = parser.parse_args()
atlas=json.loads((args.images/"atlas.json").read_text())
provenance=json.loads((args.images/"sprite-provenance.json").read_text())
sources=json.loads((args.images/"source-sheets.json").read_text())
assert len(atlas)==69, f"Expected 69 identities, got {len(atlas)}"
assert atlas.keys()==provenance.keys()
originals={}
if args.originals:
    for name, source in sources.items():
        file=args.originals/Path(name).name
        assert hashlib.sha256(file.read_bytes()).hexdigest()==source["sha256"], file
        originals[name]=Image.open(file).convert("RGB")
frames=0
for person,columns in atlas.items():
    file=args.images/Path(columns["_src"]).name
    sheet=Image.open(file).convert("RGBA")
    assert list(sheet.size)==columns["_size"], person
    for column,rect in columns.items():
        if column.startswith("_"):
            continue
        x,y,w,h=rect
        assert min(x,y)>=0 and min(w,h)>0 and x+w<=sheet.width and y+h<=sheet.height,(person,column,rect)
        rgba=np.asarray(sheet.crop((x,y,x+w,y+h)))
        opaque=rgba[:,:,3]>0
        assert opaque.sum()>16 and (~opaque).any(),(person,column,"empty or opaque block")
        info=provenance[person]
        sx,sy,sw,sh=info["frames"][column]
        assert [sw,sh]==[w,h],(person,column,"resized image")
        if args.originals:
            source=np.asarray(originals[info["source"]].crop((sx,sy,sx+sw,sy+sh)))
            assert np.array_equal(rgba[:,:,:3][opaque],source[opaque]),(person,column,"foreground colors changed")
        frames+=1
assert frames==1588,frames
print(f"PASS: {len(atlas)} identities, {frames} transparent native-resolution frames, valid bounds.")
if args.originals:
    print(f"PASS: {len(originals)} source JPEG checksums and every visible foreground RGB pixel match the originals.")
else:
    print("Original-pixel comparison not run; supply --originals with the extracted JPEG source cache.")
