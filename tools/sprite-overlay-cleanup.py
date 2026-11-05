"""Apply human-reviewed source-coordinate corrections without repainting sprites.

OCR is a review aid, never authority to erase a horizontal strip through art.
Repair PNGs contain only native source pixels accidentally cleared by an older
matte/label pass; all other character RGB pixels remain untouched.
"""
from pathlib import Path
import numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage
ROOT=Path(__file__).resolve().parent.parent
REPAIRS={}


def region(rect,source_rect,shape):
    sx,sy,_,_=source_rect;x,y,w,h=rect;hh,ww=shape
    return max(0,x-sx),max(0,y-sy),min(ww,x+w-sx),min(hh,y+h-sy)


def apply(rgba,source_rect,fix):
    alpha=rgba[:,:,3];h,w=alpha.shape;sx,sy,_,_=source_rect
    repair=fix.get('repair')
    if repair:
        filename=repair['file']
        if filename not in REPAIRS:REPAIRS[filename]=np.array(Image.open(ROOT/filename).convert('RGBA'))
        patch=REPAIRS[filename];rx,ry,rw,rh=repair['sourceRect'];assert patch.shape[:2]==(rh,rw)
        left,top=max(sx,rx),max(sy,ry);right,bottom=min(sx+w,rx+rw),min(sy+h,ry+rh)
        if left<right and top<bottom:
            block=patch[top-ry:bottom-ry,left-rx:right-rx];dest=rgba[top-sy:bottom-sy,left-sx:right-sx];mask=block[:,:,3]>0
            dest[mask]=block[mask]
    for rect in fix.get('erase',[]):
        x0,y0,x1,y1=region(rect,source_rect,alpha.shape)
        if x0<x1 and y0<y1:alpha[y0:y1,x0:x1]=0
    for points in fix.get('erasePolygons',[]):
        mask=Image.new('1',(w,h));ImageDraw.Draw(mask).polygon([(x-sx,y-sy)for x,y in points],fill=1);alpha[np.array(mask,dtype=bool)]=0
    if fix.get('background'):
        color=np.array(fix['background']['color']);near=np.max(np.abs(rgba[:,:,:3].astype(np.int16)-color),axis=2)<=fix['background']['tolerance']
        seed=alpha==0;seed[0]=seed[-1]=True;seed[:,0]=seed[:,-1]=True
        alpha[ndimage.binary_propagation(seed&near,mask=near)]=0
    if fix.get('eraseDetached') or fix.get('cleanDetached'):
        labels,count=ndimage.label(alpha>0,structure=np.ones((3,3)));sizes=np.bincount(labels.ravel());sizes[0]=0;main=int(sizes.argmax())
        for rect in fix.get('eraseDetached',[]):
            x0,y0,x1,y1=region(rect,source_rect,alpha.shape)
            if x0>=x1 or y0>=y1:continue
            for component in np.unique(labels[y0:y1,x0:x1]):
                if component and component!=main:alpha[labels==component]=0
        if fix.get('cleanDetached') and main:
            yy,xx=np.where(labels==main);left,right,top,bottom=xx.min(),xx.max(),yy.min(),yy.max()
            for component in range(1,count+1):
                if component==main or sizes[component]>16:continue
                cy,cx=np.where(labels==component)
                if cx.max()<left-3 or cx.min()>right+3 or cy.max()<top-3 or cy.min()>bottom+3:alpha[labels==component]=0
    return rgba
