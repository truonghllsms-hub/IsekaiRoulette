"""Conservative, boundary-connected matte for the supplied design sheets.

Only alpha is changed. Original foreground RGB pixels and native resolution are
retained. There is no erosion, resizing or palette reduction. Peripheral
components are filtered to separate captions and ornamental tile rims.
"""
from collections import Counter

import numpy as np
from PIL import Image
from scipy import ndimage


def transparent_frame(image, rect, boxes, decorative=False, captioned=False):
    x, y, w, h = rect
    rgb = np.asarray(image.crop((x, y, x+w, y+h)).convert("RGB")).copy()
    a = rgb.astype(np.int16)
    height, width = a.shape[:2]
    palettes = []
    seed = np.zeros((height, width), dtype=bool)
    inside = np.zeros_like(seed)
    if "_sheet_background" not in image.info:
        ww,hh=image.size
        samples=np.concatenate([np.asarray(image.crop(b).convert("RGB")).reshape(-1,3) for b in [(0,0,12,12),(ww-12,0,ww,12),(0,hh-12,12,hh),(ww-12,hh-12,ww,hh)]])
        image.info["_sheet_background"]=np.median(samples,axis=0)
    sheet_bg=image.info["_sheet_background"]
    for bx0, by0, bx1, by1 in boxes:
        x0, y0 = max(0, bx0-x), max(0, by0-y)
        x1, y1 = min(width, bx1-x), min(height, by1-y)
        inside[y0:y1, x0:x1] = True
        margin = max(3, round(min(x1-x0, y1-y0)*0.08))
        size = max(3, margin//2)
        for px, py in [(x0+margin,y0+margin),(x1-margin-size,y0+margin),(x0+margin,y1-margin-size),(x1-margin-size,y1-margin-size)]:
            sample = a[max(0,py):min(height,py+size),max(0,px):min(width,px+size)]
            if not sample.size:
                continue
            color = np.median(sample.reshape(-1,3),axis=0)
            palettes.append(color)
            seed[max(0,py):min(height,py+size),max(0,px):min(width,px+size)] = True
    # Flat tile faces are the modal color, even when a cape or wing covers
    # several corners. Sampling those corners alone can misclassify fur/armor.
    palettes=[]
    for bx0,by0,bx1,by1 in boxes:
        x0,y0=max(0,bx0-x),max(0,by0-y)
        x1,y1=min(width,bx1-x),min(height,by1-y)
        patch=a[y0:y1,x0:x1]
        hh,ww=patch.shape[:2]
        inset=max(2,round(min(hh,ww)*.06))
        ring=np.concatenate([patch[inset:inset*2,inset:ww-inset].reshape(-1,3),patch[hh-inset*2:hh-inset,inset:ww-inset].reshape(-1,3),patch[inset:hh-inset,inset:inset*2].reshape(-1,3),patch[inset:hh-inset,ww-inset*2:ww-inset].reshape(-1,3)])
        color=np.asarray(Counter(map(tuple,((ring//6)*6+3))).most_common(1)[0][0])
        same=np.max(np.abs(patch-color),axis=2)<=8
        palettes.append(np.median(patch[same],axis=0) if same.any() else color)
        seed[y0+inset:y0+inset*2,x0+inset:x1-inset]=True
        seed[y1-inset*2:y1-inset,x0+inset:x1-inset]=True
        seed[y0+inset:y1-inset,x0+inset:x0+inset*2]=True
        seed[y0+inset:y1-inset,x1-inset*2:x1-inset]=True
    possible = np.zeros_like(seed)
    for color in palettes:
        delta = a-color
        chroma = delta-delta.mean(axis=2,keepdims=True)
        possible |= (np.max(np.abs(delta),axis=2)<=12)&(np.max(np.abs(chroma),axis=2)<=7)
    border = np.concatenate([a[0],a[-1],a[:,0],a[:,-1]])
    page_color = np.asarray(Counter(map(tuple,(border//8)*8+4)).most_common(1)[0][0])
    possible |= (~inside)&(np.max(np.abs(a-page_color),axis=2)<=18)
    # Unframed figures (such as Elf's veteran envoy) sit on the page itself.
    # Their interior background must be floodable too.
    if sum(np.max(np.abs(color-sheet_bg))<=30 for color in palettes[:4])>=3:
        possible |= np.max(np.abs(a-sheet_bg),axis=2)<=24
    seed[0] = seed[-1] = True
    seed[:,0] = seed[:,-1] = True
    background = ndimage.binary_propagation(seed&possible, mask=possible)
    # JPEG tile rims sometimes touch a hat or a weapon. Detect their long,
    # straight, nearly uniform runs at the viewport edge, instead of deleting
    # the entire connected component (which would also delete the character).
    for axis in (0, 1):
        scan = a if axis == 0 else a.transpose(1,0,2)
        length, breadth = scan.shape[:2]
        for pos in range(breadth):
            if min(pos, breadth-1-pos) > breadth*.18:
                continue
            line=scan[:,pos]
            smooth=np.r_[False,np.max(np.abs(np.diff(line,axis=0)),axis=1)<=5]
            runs,nruns=ndimage.label(smooth)
            for run in range(1,nruns+1):
                points=np.flatnonzero(runs==run)
                if len(points)<length*.60:
                    continue
                color=np.median(line[points],axis=0)
                for offset in range(max(0,pos-1),min(breadth,pos+2)):
                    near=np.max(np.abs(scan[:,offset]-color),axis=1)<=10
                    if axis==0:
                        background[near,offset]=True
                    else:
                        background[offset,near]=True
    for axis in (0,1):
        scan=a if axis==0 else a.transpose(1,0,2)
        bg=background if axis==0 else background.T
        length,breadth=scan.shape[:2]
        for pos in range(breadth):
            if min(pos,breadth-1-pos)>breadth*.12:
                continue
            candidates=scan[:,pos][~bg[:,pos]]
            if len(candidates)<length*.55:
                continue
            color=np.median(candidates,axis=0)
            near=np.max(np.abs(scan[:,pos]-color),axis=1)<=12
            if near.sum()>=length*.55:
                bg[near,pos]=True
    if decorative:
        # Gold rims are separate from the supplied artwork; remove only long
        # straight edge lines, never a horizontal band through the figure.
        gold=(a[:,:,0]>a[:,:,1]+5)&(a[:,:,1]>a[:,:,2]+12)
        for axis in (0,1):
            mask=gold if axis==0 else gold.T
            bg=background if axis==0 else background.T
            length,breadth=mask.shape
            for pos in range(breadth):
                if min(pos,breadth-1-pos)<breadth*.18 and mask[:,pos].sum()>length*.45:
                    bg[mask[:,pos],pos]=True
    alpha = np.where(background,0,255).astype(np.uint8)
    # Separate captions are outside the picture tiles. Preserve every component
    # that touches a tile, including disconnected spell effects inside it.
    labels, count = ndimage.label(alpha>0,structure=np.ones((3,3)))
    keep = np.unique(labels[inside&(alpha>0)])
    keep = keep[keep!=0]
    anchor = labels[int(height*.35):int(height*.85),int(width*.3):int(width*.7)]
    counts=np.bincount(anchor.ravel())
    if counts.size:
        counts[0]=0
    main=int(np.argmax(counts)) if counts.size and counts.max() else 0
    my,mx=np.where(labels==main) if main else (np.array([]),np.array([]))
    for component in keep.copy():
        yy,xx=np.where(labels==component)
        if not len(xx):
            continue
        if main and component!=main:
            # Printed headings and ornamental frames are separate from the
            # central figure. Keep nearby detached effects, not page furniture.
            pad=max(6,min(width,height)*.08)
            outside=(xx.max()<mx.min()-pad or xx.min()>mx.max()+pad or yy.max()<my.min()-pad or yy.min()>my.max()+pad)
            frame=(xx.max()-xx.min()>width*.7 and yy.max()-yy.min()>height*.7)
            corner=(xx.mean()<width*.12 or xx.mean()>width*.88) and (yy.mean()<height*.12 or yy.mean()>height*.88)
            if outside or frame or corner or (captioned and yy.mean()>my.max()-2):
                keep=keep[keep!=component]
                continue
        near_edge=np.zeros(len(xx),dtype=bool)
        for bx0,by0,bx1,by1 in boxes:
            near_edge |= ((np.minimum(abs(xx+x-bx0),abs(xx+x-bx1))<=6)&(yy+y>=by0-6)&(yy+y<=by1+6))|((np.minimum(abs(yy+y-by0),abs(yy+y-by1))<=6)&(xx+x>=bx0-6)&(xx+x<=bx1+6))
        bw,bh=int(xx.max()-xx.min()+1),int(yy.max()-yy.min()+1)
        # Remove only isolated pieces of the known rectangular tile rim. Never
        # erode a component connected to the character, clothes or weapons.
        if near_edge.mean()>.65 and (min(bw,bh)<=8 or len(xx)/(bw*bh)<.18):
            keep=keep[keep!=component]
    alpha[~np.isin(labels,keep)] = 0
    ys,xs = np.where(alpha>0)
    if not len(xs):
        raise ValueError("Background removal produced an empty sprite")
    x0,y0,x1,y1 = max(0,int(xs.min())-2),max(0,int(ys.min())-2),min(width,int(xs.max())+3),min(height,int(ys.max())+3)
    rgba = np.dstack([rgb,alpha])[y0:y1,x0:x1]
    return Image.fromarray(rgba,"RGBA"), [x+x0,y+y0,x1-x0,y1-y0]
