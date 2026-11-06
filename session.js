// Active-life storage. Independent of the DOM so recovery can be tested in Node.
(function(root){
  'use strict';
  const KEY='lhdg_active_run',VERSION=1;
  const KINDS=new Set(['focus','board','career','crisis','event','job','promotion','quest','recruit','romance']);
  const encode=(_key,value)=>typeof value==='number'&&!Number.isFinite(value)?{$lhdgNumber:String(value)}:value;
  const decode=(_key,value)=>value&&typeof value==='object'&&Object.keys(value).length===1&&['Infinity','-Infinity'].includes(value.$lhdgNumber)?Number(value.$lhdgNumber):value;
  function restore(record,data,engine){
    if(!record||record.version!==VERSION||!['reveal','life'].includes(record.phase))throw Error('incompatible');
    const c=record.character,race=data.races.find(r=>r.id===c?.race?.id),origin=data.origins.find(o=>o.id===c?.origin?.id);
    if(!c||!race||!origin||c.alive!==true||typeof c.name!=='string'||!Number.isFinite(c.age)||c.age<0||!Number.isFinite(c.clicks)||c.clicks<0)throw Error('invalid');
    if(!c.stats||!c.bars||!engine.STAT_KEYS.every(k=>Number.isFinite(c.stats[k]))||!engine.BAR_KEYS.every(k=>Number.isFinite(c.bars[k]))||!Number.isFinite(c.fame))throw Error('invalid');
    for(const key of ['flags','used','log','moments','party','children','pastJobs'])if(!Array.isArray(c[key]))throw Error('invalid');
    for(const key of ['parents','cast','questLast'])if(!c[key]||typeof c[key]!=="object"||Array.isArray(c[key]))throw Error('invalid');
    if(!c.flags.every(f=>typeof f==='string')||!c.used.every(f=>typeof f==='string'))throw Error('invalid');
    if(origin.races?.length&&!origin.races.includes(race.id))throw Error('invalid');
    if(!c.log.every(x=>x&&typeof x.text==='string')||!c.party.every(x=>x&&typeof x.name==='string'))throw Error('invalid');
    if(c.maxAge!==null&&(!Number.isFinite(c.maxAge)||c.maxAge<0))throw Error('invalid');
    if(c.job&&!data.jobs.some(j=>j.id===c.job.id&&Number.isInteger(c.job.rank)&&c.job.rank>=0&&c.job.rank<j.ranks.length&&Number.isFinite(c.job.xp)))throw Error('incompatible');
    if(c.pending&&(!Array.isArray(c.pending.choices)||!c.pending.choices.length||!c.pending.choices.some(ch=>!ch.disabled)||!KINDS.has(c.pending.kind)||!c.pending.choices.every(ch=>typeof ch.label==='string'&&(!ch.check||(ch.success&&ch.fail)))))throw Error('invalid');
    c.race={...race};c.origin=origin;
    if(c.race.genderless)c.gender=null;
    if(c.quest){const q=data.quests.find(q=>q.id===c.quest.id);if(!q||!Number.isInteger(c.quest.step)||c.quest.step<0||!q.steps[c.quest.step])throw Error('incompatible');c.ctx={...c.ctx,quest:q};}
    engine.reconcileCasualties?.(c,data);
    engine.archiveDeadParty(c);
    engine.deferRestGroup?.(c,data);
    const member=x=>x&&engine.aliveParty(c).find(p=>p.name===x.name&&(!x.band||p.band===x.band));
    if(c.ctx?.partner)c.ctx.partner=member(c.ctx.partner)||c.ctx.partner;
    function relink(x){if(!x||typeof x!=='object')return;if(x.act?.partner)x.act.partner=member(x.act.partner)||x.act.partner;for(const key of ['choices','success','fail']){const v=x[key];if(Array.isArray(v))v.forEach(relink);else relink(v);}}
    relink(c.pending);
    return {character:c,phase:record.phase};
  }
  function createStore(storage,data,engine){
    let error=null;
    const access=()=>typeof storage==='function'?storage():storage;
    return {
      get error(){return error;},
      read(){let raw;try{raw=access().getItem(KEY);}catch(e){error='unavailable';return null;}if(!raw){error=null;return null;}try{const result=restore(JSON.parse(raw,decode),data,engine);error=null;return result;}catch(e){error=e.message==='incompatible'?'incompatible':'invalid';return null;}},
      save(character,phase='life'){if(!character)return true;if(!character.alive)return this.clear();try{access().setItem(KEY,JSON.stringify({version:VERSION,phase,character},encode));error=null;return true;}catch(e){error='unavailable';return false;}},
      clear(){try{access().removeItem(KEY);error=null;return true;}catch(e){error='unavailable';return false;}},
    };
  }
  const api={KEY,VERSION,restore,createStore};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.ActiveRun=api;
})(typeof window!=='undefined'?window:globalThis);
