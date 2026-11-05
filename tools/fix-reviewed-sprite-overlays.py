#!/usr/bin/env python3
"""Apply reviewed caption removals and native pixel repairs, then repack.

The correction manifest and small transparent native repair patches are versioned
in tools/. No PDF, OCR model, or generated illustration is needed to apply them.
Run after an import/cleanup, or safely rerun against the current native atlases.
"""
import argparse,json,importlib.util
from pathlib import Path
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
spec=importlib.util.spec_from_file_location('overlays',ROOT/'tools/sprite-overlay-cleanup.py');overlay=importlib.util.module_from_spec(spec);spec.loader.exec_module(overlay)
p=argparse.ArgumentParser(description=__doc__);p.add_argument('--images',type=Path,default=ROOT/'img');args=p.parse_args()
a=json.loads((args.images/'atlas.json').read_text());prov=json.loads((args.images/'sprite-provenance.json').read_text());fixes=json.loads((ROOT/'tools/sprite-overlay-fixes.json').read_text())['frames'];changed=0
for person,rules in fixes.items():
    frames=a[person];sheet=Image.open(args.images/Path(frames['_src']).name).convert('RGBA');pics={}
    for key,rect in frames.items():
        if key.startswith('_'):continue
        x,y,w,h=rect;pic=np.array(sheet.crop((x,y,x+w,y+h)));sr=prov[person]['frames'][key];rule=rules.get(key)
        if rule:
            overlay.apply(pic,sr,rule);assert np.count_nonzero(pic[:,:,3])>16,(person,key,'empty frame');changed+=1
        pil=Image.fromarray(pic,'RGBA');l,t,r,b=pil.getchannel('A').getbbox();l,t=max(0,l-2),max(0,t-2);r,b=min(pil.width,r+2),min(pil.height,b+2)
        pics[key]=pil.crop((l,t,r,b));prov[person]['frames'][key]=[sr[0]+l,sr[1]+t,r-l,b-t]
    width=sum(p.width+4 for p in pics.values());height=max(p.height for p in pics.values())+4;packed=Image.new('RGBA',(width,height));cursor=2
    for key,pic in pics.items():
        top=height-pic.height-2;packed.paste(pic,(cursor,top));frames[key]=[cursor,top,pic.width,pic.height];cursor+=pic.width+4
    frames['_size']=[width,height];pixels=np.array(packed);pixels[pixels[:,:,3]==0,:3]=0;Image.fromarray(pixels,'RGBA').save(args.images/Path(frames['_src']).name,lossless=True,quality=100,method=4,exact=True)
(args.images/'atlas.json').write_text(json.dumps(a,ensure_ascii=False,separators=(',',':'))+'\n');(args.images/'sprite-provenance.json').write_text(json.dumps(prov,ensure_ascii=False,separators=(',',':'))+'\n');print('Applied source-coordinate review to',changed,'frames in',len(fixes),'atlases.')
