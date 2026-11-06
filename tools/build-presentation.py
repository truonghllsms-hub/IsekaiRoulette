#!/usr/bin/env python3
"""Read alpha geometry to build UI focus windows. Never modify image pixels."""
import hashlib,json
from pathlib import Path
import numpy as np
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
atlas=json.loads((ROOT/'img/atlas.json').read_text())
overrides=json.loads((ROOT/'tools/presentation-overrides.json').read_text())
result={'version':1,'people':{}}
for person,sheet in atlas.items():
    source=ROOT/sheet['_src'];rgba=np.asarray(Image.open(source).convert('RGBA'));frames={}
    for column,rect in sheet.items():
        if column.startswith('_'):continue
        x,y,w,h=rect;alpha=rgba[y:y+h,x:x+w,3]>0
        view=overrides.get(person,{}).get(column,{}).get('viewport')
        if view:
            vx,vy,vw,vh=view
            if vx<0 or vy<0 or vx+vw>w or vy+vh>h:raise ValueError((person,column,'invalid viewport override'))
            keep=np.zeros_like(alpha);keep[vy:vy+vh,vx:vx+vw]=True;alpha=alpha&keep
        yy,xx=np.where(alpha)
        if not len(xx):raise ValueError((person,column,'empty frame'))
        left,top,right,bottom=int(xx.min()),int(yy.min()),int(xx.max()+1),int(yy.max()+1)
        full=[x+left,y+top,right-left,bottom-top];fw,fh=full[2:];focus=full[:];kind='full'
        # Wide bodies, wings, horns and juvenile silhouettes are shown intact.
        protected=person.startswith(('dragon_','slime_','high_demon_','imp_','minotaur_','troll_','demon_','ghoul_','goblin_','orc_','kobold_','lizardman_','beastman_hawk_','beastman_rabbit_')) or column.startswith('tienhoa_') or column in ['beti','hoilon'] or fw/fh>0.95
        if not protected:
            mask=alpha[top:bottom,left:right]
            band=mask[int(fh*.32):max(int(fh*.76),int(fh*.32)+1)]
            mass=band.sum(axis=0)
            window=max(3,int(fw*.28));smooth=np.convolve(mass,np.ones(window),mode='same')
            center=int(np.argmax(smooth))
            # Find the main silhouette, rather than the tip of a tall staff.
            a=max(0,center-int(fh*.15));b=min(fw,center+int(fh*.15)+1)
            rows=mask[:max(1,int(fh*.48)),a:b].sum(axis=1)
            dense=np.where(rows>=max(3,int((b-a)*.2)))[0]
            crown=int(dense[0]) if len(dense) else 0
            ph=min(fh,max(1,int(fh*.62)));pw=min(fw,max(1,int(ph*.88)))
            px=max(0,min(fw-pw,center-pw//2));py=max(0,min(fh-ph,crown-int(fh*.07)))
            focus=[full[0]+px,full[1]+py,pw,ph];kind='bust'
        frames[column]={'full':full,'portrait':focus,'kind':kind}
    result['people'][person]={'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'frames':frames}
out=ROOT/'img/presentation.json';out.write_text(json.dumps(result,ensure_ascii=False,separators=(',',':'))+'\n')
print(f'UI focus metadata: {len(atlas)} identities, {sum(len(p["frames"]) for p in result["people"].values())} frames; original pixels untouched.')
