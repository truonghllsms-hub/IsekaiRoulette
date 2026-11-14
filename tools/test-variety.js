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

// ---- storylines stay in order, name only titles that are held, and can close ----
const storylines=require('./storylines');
test('time-skip wording is read as years',()=>{
 assert.equal(storylines.yearsLater('Một trăm năm sau, cháu của Dũng Giả đầu tiên đến.'),100);
 assert.equal(storylines.yearsLater('Ba mươi năm sau, hắn quay lại.'),30);
 assert.equal(storylines.yearsLater('Hai thế kỷ sau, rừng đã khác.'),200);
 assert.equal(storylines.yearsLater('Dũng Giả đầu tiên đến.'),null);
});
test('a scene that follows another needs it to have happened, long enough ago',()=>{
 const e=data.events.find(e=>e.id==='drw_hero_grandson');
 assert.deepEqual(e.require.after,{event:'drw_hero_first',years:100});
 const c=E.createCharacter(data,E.makeRng(3),'dragon');
 Object.assign(c,{age:4000,captive:null,focus:'work',job:{id:'dragon_war',rank:2,xp:0},flags:[...c.flags,'drw_path_hero'],used:[],eventLast:{},pending:null});
 const stage=E.currentStage(c).id;
 assert.equal(E.eligible(e,c,stage,data),false);
 c.used.push('drw_hero_first');c.eventLast.drw_hero_first=3950;assert.equal(E.eligible(e,c,stage,data),false);
 c.eventLast.drw_hero_first=3900;assert.equal(E.eligible(e,c,stage,data),true);
});
test('an ending never names a title above the rank it asks for, and the copied late endings are gone',()=>{
 assert.equal(data.events.filter(e=>/_late$/.test(e.id)).length,0);
 const jobs=new Map(data.jobs.map(j=>[j.id,j]));
 for(const e of data.events.filter(e=>e.story&&e.story.kind==='end'&&!e.story.unfinished)){
  const j=jobs.get(e.story.job),said=JSON.stringify([e.text,e.choices]);
  j.ranks.forEach((r,k)=>{if(k>(e.require.jobRank||0))assert.ok(!new RegExp(`(^|[^\\p{L}])${r.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}($|[^\\p{L}])`,'u').test(said),`${e.id} names ${r}`);});
 }
});
test('every trade with a storyline has an unfinished ending that words the rank really held',()=>{
 const withStory=new Set(data.events.filter(e=>e.story).map(e=>e.story.job));
 for(const job of withStory){const u=data.events.filter(e=>e.story&&e.story.job===job&&e.story.unfinished);assert.equal(u.length,1,job);assert.equal(u[0].require.lateLife,true);assert.match(u[0].text,/\{rank\}/);}
 const c=person('human_mage',2);c.maxAge=80;c.age=70;c.flags.push('mag_path_tower');
 const u=data.events.find(e=>e.id==='mag_end_unfinished');
 assert.equal(E.eligible(u,c,E.currentStage(c).id,data),true);
 c.age=40;assert.equal(E.eligible(u,c,E.currentStage(c).id,data),false);
});
test('the road taken and the ending are kept for the Life Card',()=>{
 const c=person('human_mage',4);c.flags.push('mag_path_tower');
 const cross=data.events.find(e=>e.id==='mag_c2_crossroads'),end=data.events.find(e=>e.id==='mag_c5_tower');
 for(const e of [cross,end]){c.ctx={eventId:e.id};c.pending={kind:'event',choices:[{label:'x',text:'y',moment:e.choices[0].moment||(e.choices[0].success||{}).moment}]};E.choose(c,data,0,()=>0);}
 c.ctx=null;c.moments.push({age:c.age,text:'Một chuyện xảy ra sau đó'});
 const s=E.summary(c,data,()=>0);
 assert.ok(s.story.road&&s.story.ending);assert.ok(s.card.marks.includes(s.story.ending));
});
test('the last scene of a trade milestone no longer tells the outcome before the choice',()=>{
 const q=data.quests.find(q=>q.id==='career_dragon_war_r2');
 assert.doesNotMatch(q.steps[2].text,/Bạn thắng/);assert.match(q.steps[2].choices[0].success.text,/Bạn thắng trận đấu trên mây/);
 assert.doesNotMatch(JSON.stringify(q),/Xắn tay|mồ hôi/);
});

// ---- an ending is prepared by its road, and choices belong to the trade ----
test('an ending cannot come before the scenes its road requires, nor lock them out',()=>{
 const end=data.events.find(e=>e.id==='drw_c5_hero'),grand=data.events.find(e=>e.id==='drw_hero_grandson');
 const c=E.createCharacter(data,E.makeRng(3),'dragon');
 Object.assign(c,{age:4050,captive:null,focus:'work',job:{id:'dragon_war',rank:4,xp:0},flags:[...c.flags,'drw_path_hero'],used:['drw_hero_first'],eventLast:{drw_hero_first:4000},pending:null});
 const ok=(e)=>E.eligible(e,c,E.currentStage(c).id,data);
 // top rank, met the first Hero fifty years ago: neither the granddaughter nor the ending yet
 assert.equal(ok(grand),false);assert.equal(ok(end),false);
 c.age=4100;assert.equal(ok(grand),true);assert.equal(ok(end),false);
 c.used.push('drw_hero_grandson');c.eventLast.drw_hero_grandson=4100;assert.equal(ok(end),false);
 c.age=4150;assert.equal(ok(end),true);
});
test('every ending waits for its road, and no required scene waits on an optional one',()=>{
 const byId=new Map(data.events.map(e=>[e.id,e]));
 for(const e of data.events.filter(e=>e.story&&e.story.kind==='end'&&!e.story.unfinished)){
  const road=e.require.flags.find(f=>/_path_/.test(f));
  const must=data.events.filter(x=>x.story&&x.story.must&&x.require.flags.includes(road));
  assert.deepEqual([].concat(e.require.after||[]).map(a=>a.event),must.map(m=>m.id),e.id);
  for(const m of must)for(const a of [].concat(m.require.after||[]))assert.equal(byId.get(a.event).story.must,true,`${m.id} waits on optional ${a.event}`);
 }
});
test('priests and miners have their own wording, and borrowed wording is gone',()=>{
 const said=(job)=>JSON.stringify(data.quests.filter(q=>q.career&&q.career.job===job));
 assert.doesNotMatch(said('human_priest'),/tổ tiên|Lửa lễ|cả bầy/);
 assert.match(said('human_priest'),/Chia đều thuốc, rồi tự đi tìm nguồn tiếp tế/);
 for(const job of ['dwarf_miner','kobold_miner'])assert.doesNotMatch(said(job),/Trời của|ruộng|cả làng/);
 assert.doesNotMatch(said('elf_herb'),/ruộng|buông cuốc/);
 assert.doesNotMatch(said('slime_metal'),/bàn thợ|khách không nhìn ra/);
});

// ---- births, standing, war and work shape the trade ----
test('every birth of the main races opens at least one trade, and no trade keeps the shared trial wording',()=>{
 for(const race of data.races){
  const alt=new Set(data.jobs.filter(j=>j.races&&j.races.includes(race.id)).flatMap(j=>(j.alt&&j.alt.anyFlags)||[]));
  for(const o of data.origins.filter(o=>o.races[0]===race.id))for(const f of (o.effects&&o.effects.flags)||[])assert.ok(alt.has(f),`${o.id}: ${f}`);
 }
 const shared=/đặt nền móng bền vững|Một khách hàng đặt món đồ cần độ chính xác|Bạn tự chọn một kẻ buôn tin|Bạn tìm được một quầy hàng sắp sang nhượng/;
 for(const j of data.jobs.filter(j=>j.races))for(const t of j.promo)assert.doesNotMatch(t,shared,j.id);
 assert.deepEqual(data.jobs.find(j=>j.id==='bm_thief').alt.anyFlags,['slum_rat','stray_cat','sewer_rat']);
});
test('quiet years differ for an apprentice and a master',()=>{
 const seen=(rank)=>{const out=new Set();for(let i=1;i<=60;i++){const c=person('human_smith',rank,i);c.nextPromo=Infinity;c.nextCareer=Infinity;E.advance(c,quiet,E.makeRng(i));for(const l of c.log)if(l.kind==='quiet')out.add(l.text);}return [...out].join(' ');};
 assert.match(seen(0),/đạp bễ và quét xỉ|rèn hàng nghìn cái đinh|tạp dề da/);assert.doesNotMatch(seen(0),/Thợ trẻ làm phần nặng/);
 assert.match(seen(4),/Thợ trẻ làm phần nặng|Vai bạn đau|nghe thép ngân/);assert.doesNotMatch(seen(4),/đạp bễ và quét xỉ/);
});
test('war years cut the income of trades that carry no weapon, and can draft them',()=>{
 const earn=(job,era)=>{const c=person(job,2);c.bars.wealth=20;c.nextPromo=Infinity;c.nextCareer=Infinity;c.era={...data.eras.find(e=>e.id===era),perTurn:{},hazard:1};E.advance(c,quiet,()=>0.99);return c.bars.wealth;};
 assert.ok(earn('human_farmer','demon_lord')<earn('human_farmer','peace'));
 assert.equal(earn('human_swordsman','demon_lord'),earn('human_swordsman','peace'));
 const draft=data.events.find(e=>e.id==='era_draft_human');const c=person('human_farmer',2);
 c.era=data.eras.find(e=>e.id==='holy_war');assert.equal(E.eligible(draft,c,'adult',data),true);
 c.ctx={eventId:draft.id};c.pending={kind:'event',choices:draft.choices};E.choose(c,data,1,()=>0);
 assert.equal(c.job.id,'human_mercenary');assert.ok(c.pastJobs.some(j=>j.id==='human_farmer'));
});
test('a death at work is told for the trade, in one voice',()=>{
 const texts=new Set();
 for(let i=1;i<=80;i++){const c=person('dwarf_miner',2,i);c.race=data.races.find(r=>r.id==='dwarf');c.pending={kind:'event',choices:[{label:'x',check:{stat:'STR',target:99},success:{text:'ok'},fail:{text:'Hầm sập.',death:'x'}}]};c.pending=null;}
 const miner=data.deaths.filter(d=>d.require&&d.require.job==='dwarf_miner');assert.equal(miner.filter(d=>d.kind==='violent').length,1);assert.match(miner.find(d=>d.kind==='violent').text,/Trần hầm tầng sâu sập/);
 assert.doesNotMatch(JSON.stringify(data.deaths),/vô duyên|điểm kinh nghiệm|nát bạn thành tương|tỉ lệ tử vong 75%/);
});

test('each people has its own guild wording, and no trade keeps filled-in promotion copy',()=>{
 const org=(id)=>data.orgs.find(o=>o.id===id);
 assert.match(org('dwarf_guild').rankUp[3],/phiến đá/);assert.match(org('bm_guild').rankUp[3],/cột lều/);assert.match(org('elf_guild').rankUp[3],/chữ loài người/);
 for(const id of ['bm_guild','dwarf_guild','elf_guild'])assert.doesNotMatch(JSON.stringify(org(id).rankUp),/tấm bảng gỗ|ngoài chợ/);
 // S must not be a matter of a few quests for one people and out of reach for another
 const top=['human_guild','bm_guild','dwarf_guild','elf_guild'].map(id=>org(id).points[6]);
 assert.ok(Math.max(...top)/Math.min(...top)<4.5,top.join(','));
 const copy=JSON.stringify(data.jobs.filter(j=>j.races).map(j=>j.promotionCopy));
 assert.doesNotMatch(copy,/chưa được thấu hiểu|đã để lại dấu ấn trong|Quyền năng chưa ổn định/);
 assert.equal(data.jobs.filter(j=>j.promotionCopy&&j.promotionCopy.promo).length,0);
 assert.doesNotMatch(JSON.stringify(data.deaths),/Thiên kiếp|lôi đình|đầy chất Goblin|bầy Imp/);
});

test('every race declares its own life stages, and Beastmen reach old age within their span',()=>{
 for(const r of data.races)assert.ok(r.stages&&r.stages.length>=5,r.id);
 const b=data.races.find(r=>r.id==='beastman');
 assert.ok(b.stages.find(s=>s.id==='elder').start<b.lifespan[0]);
});
test('a parent the birth story tells as dead or lost is not waiting at home',()=>{
 const DEAD=/(?<!sống )chết|hành quyết|hiến tế|thanh trừng|sát hại|thiêu rụi|cắt cổ|qua đời|tử trận/i,GONE=/mất tích|biệt tích|bỏ chạy|bỏ đi|bán đi|không rõ tung tích/i;
 for(const o of data.origins)for(const w of ['father','mother','maker']){const p=o[w];if(!p||p.status!=='alive')continue;const t=p.note||'';
  if(/còn sống/i.test(t))continue;
  assert.doesNotMatch(t,DEAD,`${o.id}.${w}`);assert.doesNotMatch(t,GONE,`${o.id}.${w}`);}
 const st=(id,w)=>data.origins.find(o=>o.id===id)[w].status;
 assert.equal(st('demon_origin_forest','mother'),'dead');assert.equal(st('troll_origin_cave','mother'),'gone');assert.equal(st('vampir_bg_cult','mother'),'gone');
 const c=E.createCharacter({...data,origins:[data.origins.find(o=>o.id==='troll_origin_ice')]},E.makeRng(4),'troll');
 assert.equal(c.parents.father.alive,false);
});
