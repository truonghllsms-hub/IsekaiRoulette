#!/usr/bin/env python3
"""Validate native transparent atlases, optionally against original PDF JPEGs.

python3 tools/validate-sprites.py [--images img] [--originals img/source-sheets]
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--images", type=Path, default=ROOT/"img")
parser.add_argument("--originals", type=Path)
args = parser.parse_args()
atlas=json.loads((args.images/"atlas.json").read_text())
provenance=json.loads((args.images/"sprite-provenance.json").read_text())
sources=json.loads((args.images/"source-sheets.json").read_text())
assert len(atlas)==52, f"Expected 52 identities, got {len(atlas)}"
assert atlas.keys()==provenance.keys()
originals={}
if args.originals:
    for name, source in sources.items():
        file=args.originals/Path(name).name
        assert hashlib.sha256(file.read_bytes()).hexdigest()==source["sha256"], file
        originals[name]=Image.open(file).convert("RGB")
reviewed=json.loads((ROOT/"tools/sprite-overlay-fixes.json").read_text())["frames"]
frames=0
reviewed_count=0
for person,columns in atlas.items():
    file=args.images/Path(columns["_src"]).name
    sheet=Image.open(file).convert("RGBA")
    assert list(sheet.size)==columns["_size"], person
    info=provenance[person]
    generated=info.get("kind")=="generated-art"
    if generated:
        assert hashlib.sha256(file.read_bytes()).hexdigest()==info["sha256"],(person,"generated atlas checksum")
        assert set(info["approvedSources"])=={k for k in columns if not k.startswith("_")},(person,"approved frame coverage")
    for column,rect in columns.items():
        if column.startswith("_"):
            continue
        x,y,w,h=rect
        assert min(x,y)>=0 and min(w,h)>0 and x+w<=sheet.width and y+h<=sheet.height,(person,column,rect)
        rgba=np.asarray(sheet.crop((x,y,x+w,y+h)))
        opaque=rgba[:,:,3]>0
        assert opaque.sum()>16 and (~opaque).any(),(person,column,"empty or opaque block")
        if person=="demon_nam_2" and column=="hoilon":
            source_y=provenance[person]["frames"][column][1]
            assert np.where(opaque)[0].min()+source_y>=555,"Demon childhood frame still includes the printed header"
        info=provenance[person]
        sx,sy,sw,sh=info["frames"][column]
        assert [sw,sh]==[w,h],(person,column,"resized image")
        fix=reviewed.get(person,{}).get(column)
        if fix:
            reviewed_count+=1
            for tx,ty,tw,th in fix.get("erase",[]):
                left,top=max(0,tx-sx),max(0,ty-sy);right,bottom=min(w,tx+tw-sx),min(h,ty+th-sy)
                if left<right and top<bottom:assert not opaque[top:bottom,left:right].any(),(person,column,"reviewed printed caption returned")
            for points in fix.get("erasePolygons",[]):
                mask=Image.new("1",(w,h));ImageDraw.Draw(mask).polygon([(xx-sx,yy-sy)for xx,yy in points],fill=1)
                assert not opaque[np.array(mask,dtype=bool)].any(),(person,column,"reviewed caption polygon returned")
            if fix.get("repair"):
                repair=fix["repair"];patch=np.array(Image.open(ROOT/repair["file"]).convert("RGBA"));rx,ry,rw,rh=repair["sourceRect"]
                assert patch.shape[:2]==(rh,rw),(person,column,"repair dimensions")
                py,px=np.where(patch[:,:,3]>0);xx,yy=px+rx-sx,py+ry-sy
                assert ((xx>=0)&(xx<w)&(yy>=0)&(yy<h)).all(),(person,column,"native repair clipped")
                assert np.array_equal(rgba[yy,xx],patch[py,px]),(person,column,"native face/prop repair erased or recolored")
        if args.originals and not generated:
            source=np.asarray(originals[info["source"]].crop((sx,sy,sx+sw,sy+sh)))
            assert np.array_equal(rgba[:,:,:3][opaque],source[opaque]),(person,column,"foreground colors changed")
        frames+=1
assert frames==1251,frames
assert reviewed_count==sum(map(len,reviewed.values())),"reviewed corrections missing from atlas"
print(f"PASS: {reviewed_count} reviewed caption/debris/repair frames retain their corrections.")
print(f"PASS: {len(atlas)} identities, {frames} transparent native-resolution frames, valid bounds.")
if args.originals:
    print(f"PASS: {len(originals)} source JPEG checksums and every visible foreground RGB pixel match the originals.")
else:
    print("Original-pixel comparison not run; supply --originals with the extracted JPEG source cache.")
