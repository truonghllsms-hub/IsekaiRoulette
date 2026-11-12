// Variety of trades and endings: one of several trials per life, deaths told by how the life ended.
const {test}=require('node:test');const assert=require('node:assert/strict');
const E=require('../engine'),data=require('./load').loadData();
const variety=require('../content/career-variety');
const quiet={...data,events:[],story:{},systems:{...data.systems,race:{...data.systems.race,human:{...data.systems.race.human,romance:false,autoChildren:false,noRecruit:true}}}};
function person(job='human_mage',rank=0,seed=42){const c=E.createCharacter(data,E.makeRng(seed),'human');Object.assign(c,{captive:null,age:20,maxAge:1000,stageId:'adult',focus:'work',parents:{},cast:{},party:[],guild:null,band:null,spouse:null,children:[],quest:null,pending:null,log:[],moments:[],used:[],eraUntil:Infinity,nextPromo:0,nextCareer:0,nextJobOffer:Infinity,job:{id:job,rank,xp:0}});c.race={...c.race,hazard:0};c.era={...data.eras.find(e=>e.id==='peace'),perTurn:{},hazard:1};c.bars={health:100,wealth:50,joy:80};return c;}

test('every trade of the five main races has its own variety',()=>{
 const jobs=data.jobs.filter(j=>j.races&&j.races.length===1&&['human','beastman','elf','demon','dwarf'].includes(j.races[0]));
 assert.equal(jobs.length,49);
 for(const j of jobs){
  assert.ok(j.startAlt.length>=3,j.id);assert.equal(j.promoAlt.length,4,j.id);
  for(const list of j.promoAlt)for(const t of list)assert.match(t,/\{next\}/,j.id);
  const q=data.quests.filter(q=>q.career&&q.career.job===j.id);
  assert.deepEqual(q.map(q=>`${q.career.rank}${q.career.alt?'b':''}`).sort(),['2','2b','4','4b'],j.id);
  assert.equal(data.events.filter(e=>e.id.startsWith(`jx_${j.id}_`)).length,3,j.id);
 }
 for(const race of ['human','beastman','elf','demon','dwarf']){const s=data.systems.race[race].jobSelect;assert.ok(s.teen.length>=10,race);assert.ok(s.later,race);
  for(const id of Object.keys(variety.leads[race].origins)){const full=data.origins.some(o=>o.id===id)?id:`${race}_${id}`;assert.ok(data.origins.some(o=>o.id===full),full);assert.ok(s.teen.some(l=>l.startsWith(`(${full}) `)),full);}}
});
test('a life is offered one trial per milestone, and keeps it when postponed',()=>{
 const seen=new Set();
 for(let seed=1;seed<=40;seed++){
  const c=person('human_mage',1,seed);const rng=E.makeRng(seed);const d={...quiet,quests:data.quests};
  E.advance(c,d,rng);assert.equal(c.pending.kind,'career');
  const first=c.pending.choices[0].act.id;seen.add(first);
  E.choose(c,d,1,rng);c.nextCareer=0;c.nextCareerClick=0;c.careerLast={};c.pending=null;
  E.advance(c,d,rng);assert.equal(c.pending.kind,'career');assert.equal(c.pending.choices[0].act.id,first);
  c.pending=null;c.used.push('quest:'+first);c.nextCareer=0;c.nextCareerClick=0;
  E.advance(c,d,rng);assert.notEqual(c.pending?.kind,'career');
 }
 assert.deepEqual([...seen].sort(),['career_human_mage_r2','career_human_mage_r2b']);
});
test('a promotion trial stays the same on a retry and differs between lives',()=>{
 const texts=new Set();
 for(let seed=1;seed<=40;seed++){
  const c=person('human_swordsman',0,seed);c.job.xp=1000;const rng=E.makeRng(seed);const d={...quiet,quests:[]};
  E.advance(c,d,rng);assert.equal(c.pending.kind,'promotion');const t=c.pending.text;texts.add(t);
  E.choose(c,d,1,rng);c.nextPromo=0;c.nextPromoClick=0;c.pending=null;
  E.advance(c,d,rng);assert.equal(c.pending.kind,'promotion');assert.ok(c.pending.text.endsWith(t.split(': ').pop()));
 }
 assert.equal(texts.size,2);
});
test('deaths are told by how the life ended',()=>{
 const die=(setup,seed)=>{const c=person('human_farmer',2,seed);c.maxAge=80;setup(c);c.pending={kind:'event',choices:[{label:'x',effects:{health:-200}}]};E.choose(c,data,0,E.makeRng(seed));assert.equal(c.alive,false);return c.cause;};
 const many=(setup)=>new Set(Array.from({length:60},(_, i)=>die(setup,i+1)));
 const old=many(c=>{c.age=75;c.stageId='elder';});
 assert.ok(old.size>=8,`only ${old.size} deaths for a frail farmer`);
 assert.ok([...old].some(t=>/lượm lúa cuối cùng/.test(t)));
 const poor=many(c=>{c.age=30;c.bars.wealth=0;});
 assert.ok([...poor].some(t=>/Mùa đói|củi sưởi|bán dần/.test(t)));
 for(const t of [...old,...poor])assert.doesNotMatch(t,/\{\w+\}/);
});
test('ending lines never leave a placeholder and need what they mention',()=>{
 for(const d of data.deaths.filter(d=>/^end_/.test(d.id))){
  if(/\{spouse\}/.test(d.text))assert.ok([].concat(d.when||[]).includes('spouse'),d.id);
  assert.doesNotMatch(d.text.replace(/\{(age|spouse|name)\}/g,''),/\{/,d.id);
 }
});
