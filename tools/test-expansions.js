const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../engine'),{loadData}=require('./load'),data=loadData();
const additions=data.events.filter(e=>e._file.startsWith('expansions/'));
function witness(e){
 for(const race of e.races){
  const base=E.createCharacter(data,E.makeRng(12),race);
  for(const origin of data.origins.filter(o=>(!o.races?.length||o.races.includes(race))&&(!e.require?.origin||o.id===e.require.origin)))
   for(const stage of E.stagesOf(base.race).filter(s=>!e.stages||e.stages.includes(s.id))){
    const c=JSON.parse(JSON.stringify(base)),r=e.require||{};
    Object.assign(c,{age:Math.max(stage.start,e.minAge||0),maxAge:1000000,origin,stageId:stage.id,focus:e.focus?.[0]||[].concat(r.focus||'work')[0],used:[],eventLast:{},epoch:{recent:[]},captive:r.captiveKinds?{kind:r.captiveKinds[0],since:0}:null,job:r.job?{id:[].concat(r.job)[0],rank:r.jobRank||0,xp:0}:null,cast:{},party:r.party?[{name:'TestAlly',alive:true,bond:70,race:'Human'}]:[],band:null,parents:{},log:[],moments:[],quest:null,pending:null,stats:{STR:15,INT:15,AGI:15,LUCK:15},bars:{health:100,wealth:85,joy:85},flags:[...new Set([...(r.flags||[]),...(r.anyFlags||[])])].filter(f=>!(r.notFlags||[]).includes(f)),form:r.form==='none'?null:r.form==='any'?Object.keys(base.race.forms||{})[0]:r.form||null});
    if(e.eras)c.era=data.eras.find(x=>x.id===e.eras[0]);
    if(E.eligible(e,c,stage.id,data))return c;
   }
 }
 return null;
}
function play(c,e,index,success=true){
 c.pending={kind:'event',text:E.fmt(e.text,c,null,data),choices:e.choices.map(ch=>({...ch,label:E.fmt(ch.label,c,null,data)}))};c.ctx={eventId:e.id,ally:E.aliveParty(c)[0]||null};
 E.choose(c,data,index,()=>success?0:.99999);return c;
}
test('212 reviewed additions and four new origins load once and survive bundling filters',()=>{
 assert.equal(additions.length,212);assert.equal(data.origins.filter(o=>o.id.startsWith('gm_high_demon_origin_')).length,4);
 assert.equal(new Set(additions.map(e=>e.id)).size,212);
 for(const e of additions)assert.ok(e.pack&&e.races.some(r=>!(e.excludeRaces||[]).includes(r)),e.id);
 assert.equal(data.jobs.filter(j=>data.races.some(r=>(!j.races||j.races.includes(r.id))&&!(j.excludeRaces||[]).includes(r.id))).length,99);
});
test('every added event and every variant has a legitimate eligible life context',()=>{
 for(const e of additions){assert.ok(witness(e),e.id);for(const text of e.variants||[])assert.ok(witness({...e,text}),`${e.id}: ${text}`);}
});
test('every new available choice resolves its success and failure without raw tokens',()=>{
 let count=0;
 for(const e of additions)for(const ch of e.choices)for(const success of ch.check?[true,false]:[true]){
  // Some career choices depend on exactly which previous branch was taken.
  const r={...e.require,...ch.require,flags:[...(e.require?.flags||[]),...(ch.require?.flags||[])],anyFlags:ch.require?.anyFlags||e.require?.anyFlags};
  const c=witness({...e,require:r});assert.ok(c,`${e.id}: ${ch.label}`);
  play(c,e,e.choices.indexOf(ch),success);assert.equal(c.pending,null,e.id);assert.ok(c.flags.every(x=>typeof x==='string'),e.id);
  for(const line of c.log)assert.doesNotMatch(line.text,/\{\w+\}/,`${e.id}: ${line.text}`);
  if((success?ch.success:ch.fail)?.effects?.setFree||(!ch.check&&ch.effects?.setFree))assert.equal(c.captive,null,e.id);
  count++;
 }
 assert.ok(count>600,`resolved ${count} branches`);
});
test('new High Demon origins have no invented parents and block careers until their formation ends',()=>{
 for(const o of data.origins.filter(o=>o.captiveKind)){
  const c=E.createCharacter({...data,origins:[o]},E.makeRng(42),'high_demon');assert.deepEqual(Object.keys(c.parents),['maker']);assert.equal(c.parents.maker.alive,false);assert.equal(c.captive.kind,'bound');assert.equal(c.job,null);
  const start=additions.find(e=>e.require?.origin===o.id&&e.require.flags?.some(f=>f.endsWith('_start')));assert.ok(start);c.age=200;c.used=[];c.pending=null;c.log=[];c.ctx=null;c.stageId='infant';assert.ok(E.eligible(start,c,'infant',data));
  play(c,start,start.choices.length-1);assert.equal(c.captive,null);assert.ok(c.flags.some(f=>f.endsWith('_done')));assert.equal(E.eligible(start,c,'infant',data),false);
 }
});
test('High Demon origin chains can finish beyond their initial chapter on every final outcome',()=>{
 for(const e of additions.filter(e=>e.require?.origin?.startsWith('gm_high_demon_')&&e.id.endsWith('_3'))){
  const c=witness(e);c.age=9200;c.stageId='elder';assert.ok(E.eligible(e,c,'elder',data),e.id);
  for(let i=0;i<e.choices.length;i++)for(const success of e.choices[i].check?[true,false]:[true]){const x=JSON.parse(JSON.stringify(c));play(x,e,i,success);assert.equal(x.captive,null);assert.ok(x.flags.some(f=>f.endsWith('_done')));}
 }
});
test('a cleared Slime leaves the hunt closed while actual exposure opens it',()=>{
 const check=additions.find(e=>e.id==='gm_slime_humanoid_inquisition'),hunt=additions.find(e=>e.id==='gm_slime_humanoid_hunt');
 for(const [idx,success,expected]of [[0,true,false],[0,false,true],[1,true,false],[1,false,true],[2,true,true]]){const c=witness(check);play(c,check,idx,success);assert.equal(E.eligible(hunt,c,E.currentStage(c).id,data),expected,`${idx}:${success}`);}
});
test('both Ghoul ascensions require every previous step and cannot overwrite another form',()=>{
 for(const kind of ['ghast','lich']){const e=additions.find(e=>e.id===`gm_ghoul_${kind}_arc_3`),c=witness(e);assert.ok(E.eligible(e,c,E.currentStage(c).id,data));c.flags=[];assert.equal(E.eligible(e,c,E.currentStage(c).id,data),false);const other=witness(e);other.form=kind==='lich'?'Ghast':'Lich';assert.equal(E.eligible(e,other,E.currentStage(other).id,data),false);}
 for(const e of additions.filter(e=>e.choices.some(ch=>ch.success?.effects?.evolve))){if(e.races.includes('goblin')||e.races.includes('kobold'))assert.equal(e.require.form,'none',e.id);}
});
test('repeatable scenes with calendar cooldowns remain renewable after the second occurrence',()=>{
 for(const e of additions.filter(e=>e.once===false)){
  const c=witness(e);c.used=Array(4).fill(e.id);c.eventLast[e.id]=c.age-e.cooldownYears;assert.ok(E.eligible(e,c,E.currentStage(c).id,data),e.id);
  c.eventLast[e.id]=c.age;assert.equal(E.eligible(e,c,E.currentStage(c).id,data),false,e.id);
 }
});
test('Human and Beastman rest scenes respect freedom, real costs and existing-party context',()=>{
 const rest=additions.filter(e=>e.id.includes('_an_duong_'));assert.equal(rest.length,20);
 for(const e of rest){const c=witness(e);c.focus='work';assert.equal(E.eligible(e,c,E.currentStage(c).id,data),false);c.focus='rest';c.captive={kind:'prison'};assert.equal(E.eligible(e,c,E.currentStage(c).id,data),false);for(const ch of e.choices)if(ch.effects?.wealth<0)assert.ok(ch.require?.wealth>=-ch.effects.wealth,e.id);}
});
test('escaped prisoners retain an explicit terminal flag, failed attempts retain captivity',()=>{
 for(const e of additions.filter(e=>/_arc_3$/.test(e.id)&&e.require?.captiveKinds?.some(x=>x!=='bound'))){
  const c=witness(e);for(let i=0;i<e.choices.length;i++){const ch=e.choices[i];for(const success of ch.check?[true,false]:[true]){const x=JSON.parse(JSON.stringify(c));play(x,e,i,success);assert.ok(x.flags.some(f=>f.endsWith('_done')),e.id);if(ch.check&&!success)assert.ok(x.captive,e.id);}}
 }
});
