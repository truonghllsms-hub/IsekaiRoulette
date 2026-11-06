// UI geometry only. Source atlas RGB/alpha and the simulation state stay untouched.
(function(root){
  'use strict';
  function rectangle(sprite,data,mode='full') {
    if(!sprite)return null;
    const frame=data.spritePresentation?.people?.[sprite.person]?.frames?.[sprite.column];
    const chosen=mode==='portrait'?frame?.portrait:frame?.full;
    const [x,y,w,h]=sprite.rect;
    if(!chosen||chosen.length!==4||!chosen.every(Number.isFinite)||chosen[0]<x||chosen[1]<y||chosen[2]<=0||chosen[3]<=0||chosen[0]+chosen[2]>x+w||chosen[1]+chosen[3]>y+h)return sprite.rect.slice();
    return chosen.slice();
  }
  function layout(sprite,data,width,height,mode='full') {
    const rect=rectangle(sprite,data,mode);if(!rect)return null;
    const padding=mode==='portrait'?0.94:0.9;
    const scale=Math.min(mode==='portrait'?1.8:2.4,Math.max(1,width)*padding/rect[2],Math.max(1,height)*padding/rect[3]);
    return {rect,scale,width:rect[2]*scale,height:rect[3]*scale,kind:mode==='portrait'?(data.spritePresentation?.people?.[sprite.person]?.frames?.[sprite.column]?.kind||'full'):'full'};
  }
  const api={rectangle,layout};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SpritePresentation=api;
})(typeof window!=='undefined'?window:globalThis);
