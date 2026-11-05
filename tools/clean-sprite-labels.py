#!/usr/bin/env python3
"""Clear printed PDF captions from native atlases using reviewed source coordinates.
Only alpha is edited; source RGB, frame size and positioning are retained.
The coordinate list is OCR-assisted and stored in sprite-labels.json, so no OCR
software or model is needed to reproduce a build.
"""
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT=Path(__file__).resolve().parent.parent

def clean(images, only=None):
    atlas=json.loads((images/'atlas.json').read_text())
    provenance=json.loads((images/'sprite-provenance.json').read_text())
    captions=json.loads((ROOT/'tools/sprite-labels.json').read_text())
    removed=0
    for person,frames in atlas.items():
        if only and person not in only:continue
        path=images/Path(frames['_src']).name
        sheet=np.asarray(Image.open(path).convert('RGBA')).copy()
        info=provenance[person]
        words=captions.get(Path(info['source']).name,[])
        for column,rect in frames.items():
            if column.startswith('_'):continue
            x,y,w,h=rect
            sx,sy,sw,sh=info['frames'][column]
            patch=sheet[y:y+h,x:x+w]
            alpha=patch[:,:,3]
            before=np.count_nonzero(alpha)
            for tx,ty,tw,th,text in words:
                x0,y0=max(0,tx-sx-1),max(0,ty-sy-1)
                x1,y1=min(w,tx+tw-sx+1),min(h,ty+th-sy+1)
                if x0<x1 and y0<y1:alpha[y0:y1,x0:x1]=0
            # Source labels attached to a picture panel, reviewed at native size.
            printed_panels={
                ('dragon_nu_1','hoard_kycuu'):[149,444,128,43],
                ('dragon_nu_1','sage_kycuu'):[553,438,129,29],
                ('imp_nam_1','tienhoa_free_imp'):[256,848,182,43],
                ('high_demon_nu_1','tienhoa_demon_god'):[1212,580,30,25],
            }
            key=(person,column)
            if key in printed_panels:
                tx,ty,tw,th=printed_panels[key]
                x0,y0=max(0,tx-sx),max(0,ty-sy)
                x1,y1=min(w,tx+tw-sx),min(h,ty+th-sy)
                if x0<x1 and y0<y1:alpha[y0:y1,x0:x1]=0
                rgb=patch[:,:,:3].astype(np.int16)
                flat=(rgb.max(axis=2)-rgb.min(axis=2)<45)&(rgb.mean(axis=2)>60)&(rgb.mean(axis=2)<140)
                from collections import Counter
                colors=rgb[flat]
                if len(colors):
                    face=np.asarray(Counter(map(tuple,(colors//6)*6+3)).most_common(1)[0][0])
                    neutral=np.max(np.abs(rgb-face),axis=2)<=18
                    seed=np.zeros((h,w),bool);seed[0]=seed[-1]=True;seed[:,0]=seed[:,-1]=True
                    seed |= alpha==0
                    seed[:max(2,int(h*.12))]=True;seed[-max(2,int(h*.12)):]=True
                    seed[:,:max(2,int(w*.12))]=True;seed[:,-max(2,int(w*.12)):]=True
                    alpha[ndimage.binary_propagation(seed&neutral,mask=neutral)]=0
            # The unframed ice envoy has a neutral backdrop behind its blue
            # robe and green aurora. Clear only neutral boundary-connected gray.
            if person=='elf_nu_2' and column=='envoy_kycuu':
                rgb=patch[:,:,:3].astype(np.int16)
                neutral=(rgb.max(axis=2)-rgb.min(axis=2)<24)&(rgb.mean(axis=2)>25)&(rgb.mean(axis=2)<115)
                seed=np.zeros((h,w),bool);seed[0]=seed[-1]=True;seed[:,0]=seed[:,-1]=True
                alpha[ndimage.binary_propagation(seed&neutral,mask=neutral)]=0
            if person.startswith('troll_') and column in ('thuongdan','gia','bridge_kycuu'):
                rgb=patch[:,:,:3].astype(np.int16)
                # Cool gray printed rims differ from the Troll's green stone.
                rim=(rgb[:,:,2]>rgb[:,:,0]+5)&(rgb[:,:,1]>rgb[:,:,0]+5)&(rgb.max(axis=2)-rgb.min(axis=2)<35)&(rgb.mean(axis=2)>90)&(rgb.mean(axis=2)<210)
                seed=alpha==0
                seed[0]=seed[-1]=True;seed[:,0]=seed[:,-1]=True
                alpha[ndimage.binary_propagation(seed&rim,mask=rim)]=0
            # A caption may have joined a border to the sprite. Once the letters
            # are cleared, discard detached page furniture outside the figure.
            labels,n=ndimage.label(alpha>0,structure=np.ones((3,3)))
            center=labels[int(h*.25):int(h*.85),int(w*.25):int(w*.75)]
            counts=np.bincount(center.ravel());counts[0]=0
            main=int(np.argmax(counts)) if counts.max() else 0
            if main:
                yy,xx=np.where(labels==main)
                for component in range(1,n+1):
                    if component==main:continue
                    cy,cx=np.where(labels==component)
                    pad=max(4,min(w,h)*.08)
                    outside=cx.max()<xx.min()-pad or cx.min()>xx.max()+pad or cy.max()<yy.min()-pad or cy.min()>yy.max()+pad
                    frame=cx.max()-cx.min()>w*.7 and cy.max()-cy.min()>h*.7
                    footer=person.startswith('dwarf_') and cy.mean()>yy.max()-2
                    if outside or frame or footer:alpha[labels==component]=0
            assert np.count_nonzero(alpha)>16,(person,column,'empty after caption cleanup')
            removed+=before-np.count_nonzero(alpha)
        im=Image.fromarray(sheet,'RGBA')
        if path.suffix=='.webp':im.save(path,lossless=True,quality=100,method=4)
        else:im.save(path,optimize=True)
    print(f'Cleared {removed} caption/background pixels; preserved native frame sizes and foreground RGB.')

def repack(images, only=None):
    """Trim cleared caption padding; include every remaining alpha pixel."""
    atlas=json.loads((images/'atlas.json').read_text())
    provenance=json.loads((images/'sprite-provenance.json').read_text())
    for person,frames in atlas.items():
        if only and person not in only:continue
        path=images/Path(frames['_src']).name
        original=Image.open(path).convert('RGBA')
        pictures={}
        for column,rect in list(frames.items()):
            if column.startswith('_'):continue
            x,y,w,h=rect
            patch=original.crop((x,y,x+w,y+h))
            left,top,right,bottom=patch.getchannel('A').getbbox()
            left,top=max(0,left-2),max(0,top-2)
            right,bottom=min(w,right+2),min(h,bottom+2)
            pictures[column]=patch.crop((left,top,right,bottom))
            sx,sy,sw,sh=provenance[person]['frames'][column]
            provenance[person]['frames'][column]=[sx+left,sy+top,right-left,bottom-top]
        width=sum(p.width+4 for p in pictures.values())
        height=max(p.height for p in pictures.values())+4
        packed=Image.new('RGBA',(width,height),(0,0,0,0))
        cursor=2
        for column,pic in pictures.items():
            yy=height-pic.height-2
            packed.paste(pic,(cursor,yy))
            frames[column]=[cursor,yy,pic.width,pic.height]
            cursor+=pic.width+4
        frames['_size']=[width,height]
        if path.suffix=='.webp':packed.save(path,lossless=True,quality=100,method=4)
        else:packed.save(path,optimize=True)
    (images/'atlas.json').write_text(json.dumps(atlas,separators=(',',':')))
    (images/'sprite-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,separators=(',',':'))+'\n')
    print('Repacked native frames around their full alpha bounds; no resizing.')

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--images',type=Path,default=ROOT/'img')
    p.add_argument('--trim-only',action='store_true',help='Only repack already cleaned atlases')
    p.add_argument('--only',nargs='+',help='Rebuild a selected set of identities')
    args=p.parse_args()
    if not args.trim_only:clean(args.images,args.only)
    repack(args.images,args.only)
