const {test}=require('node:test');const assert=require('node:assert/strict');
const E=require('../engine');const {loadData}=require('./load');const data=loadData();
function person(job=null,rank=0){
 const c=E.createCharacter(data,E.makeRng(42),'human');Object.assign(c,{gender:'male',age:25,maxAge:1000,stageId:'adult',focus:'social',parents:{},cast:{},party:[],band:null,spouse:null,children:[],quest:null,pending:null,guild:null,nextJobOffer:Infinity,nextPromo:Infinity,used:[],log:[],moments:[],eraUntil:Infinity,job:job?{id:job,rank,xp:0}:null});c.race={...c.race,hazard:0};c.era={...data.eras.find(e=>e.id==='peace'),perTurn:{},hazard:1};c.bars={health:100,joy:80,wealth:80};return c;
}
const quiet={...data,events:[],quests:[],story:{},systems:{...data.systems,race:{...data.systems.race,human:{...data.systems.race.human,autoChildren:false}}}};
function romance(c){for(let i=0;i<10;i++){E.advance(c,quiet,()=>0);if(c.pending?.kind==='romance')return;if(c.pending)E.choose(c,quiet,c.pending.choices.length-1,()=>0);}assert.fail('romance scene missing');}

test('a male character only courts a female companion, even when a male companion has more bond',()=>{
 const c=person();c.party=[{name:'Kael',gender:'male',race:'Human',alive:true,bond:100},{name:'Lyra',gender:'female',race:'Elf',alive:true,bond:60}];romance(c);assert.equal(c.ctx.partner.name,'Lyra');E.choose(c,quiet,0,()=>0);assert.equal(c.spouse.gender,'female');
});
test('same-gender and unknown-gender companions cause an opposite-gender stranger fallback',()=>{
 for(const gender of ['male',undefined]){const c=person();c.party=[{name:'Kael',gender,race:'Human',alive:true,bond:100}];romance(c);assert.notEqual(c.ctx.partner.name,'Kael');assert.equal(c.ctx.partner.gender,'female');E.choose(c,quiet,0,()=>0);assert.equal(c.spouse.gender,'female');}
});
test('female romance selects men and marriage via effects also stores gender',()=>{
 const c=person();c.gender='female';c.party=[{name:'Lyra',gender:'female',alive:true,bond:100},{name:'Kael',gender:'male',alive:true,bond:60}];romance(c);E.choose(c,quiet,0,()=>0);assert.equal(c.spouse.gender,'male');
 const b=person();b.pending={kind:'event',choices:[{label:'Kết duyên',effects:{marry:true}}]};E.choose(b,quiet,0,()=>0);assert.equal(b.spouse.gender,'female');
});
test('both marriage routes reject an incompatible existing partner',()=>{
 for(const kind of ['act','effects']){const c=person();const p={name:'Kael',gender:'male',race:'Human'};c.ctx={partner:p};c.pending={kind:'event',choices:[{label:'Kết duyên',...(kind==='act'?{act:{type:'marry',partner:p}}:{effects:{marry:true}})}]};E.choose(c,quiet,0,()=>0);assert.equal(c.spouse,null);}
});
test('same-gender couples cannot generate either automatic or scripted biological births',()=>{
 const c=person();c.focus='rest';c.spouse={name:'Kael',gender:'male'};
 const auto={...quiet,systems:{...quiet.systems,race:{...quiet.systems.race,human:{...quiet.systems.race.human,romance:false,autoChildren:true,childRate:1}}}};
 E.advance(c,auto,()=>0);assert.equal(c.children.length,0);assert.ok(!c.log.some(e=>/bà đỡ|chào đời/.test(e.text)));
 c.pending={kind:'event',choices:[{label:'Sinh con',effects:{child:true}}]};E.choose(c,auto,0,()=>0);assert.equal(c.children.length,0);
 assert.equal(E.eligible(data.events.find(e=>e.id==='human_child_birth'),c,'adult',data),false);
});
test('legacy spouses resolve gender only from a known companion; unknown spouses do not guess',()=>{
 for(const gender of ['male','female',undefined]){const c=person();c.spouse={name:'Mira'};if(gender)c.party=[{name:'Mira',gender,alive:true}];c.pending={kind:'event',choices:[{label:'Sinh con',effects:{child:true}}]};E.choose(c,quiet,0,()=>0);assert.equal(c.children.length,gender==='female'?1:0);}
});
test('female protagonists are the birth parent in pregnancy prose, while Slime division remains available',()=>{
 const c=person();c.gender='female';c.spouse={name:'Kael',gender:'male'};assert.equal(E.fmt('{spouse} vừa sinh hạ {child}.',c,null,data),'Bạn vừa sinh hạ đứa con.');
 const s=E.createCharacter(data,E.makeRng(42),'slime');s.pending={kind:'event',choices:[{label:'Phân chia',effects:{child:true}}]};E.choose(s,data,0,()=>0);assert.equal(s.children.length,1);assert.equal(s.children[0].gender,null);
});

test('work selection gives 75% priority to the exact profession when alternatives exist',()=>{
 const c=person('human_mage');c.focus='work';const own={id:'own',text:'Thí nghiệm.',require:{job:'human_mage'},choices:[]},other={id:'common',text:'Biến cố chung.'},wrong={id:'smith',text:'Rèn.',require:{job:'human_smith'}};const d={...quiet,events:[own,other,wrong]};const rng=E.makeRng(123);let hits=0;
 for(let i=0;i<10000;i++){const e=E.pickEvent(c,d,rng,'adult');assert.notEqual(e.id,'smith');if(e.id==='own')hits++;}assert.ok(hits>7200&&hits<7800,String(hits));
 c.focus='social';let outside=0;for(let i=0;i<2000;i++)if(E.pickEvent(c,d,rng,'adult').id==='own')outside++;assert.ok(outside>800&&outside<1200);
});
test('work remains playable when there are no matching profession events',()=>{const c=person('human_mage');c.focus='work';const d={...quiet,events:[{id:'common',text:'Trời mưa.'}]};assert.equal(E.pickEvent(c,d,()=>0,'adult').id,'common');});
test('shared encounters reveal only the player’s profession option and preserve dungeon progression',()=>{
 const event=data.events.find(e=>e.id==='path_dungeon_2');for(const [job,stat] of [['human_mage','INT'],['human_assassin','AGI'],['human_smith','STR'],['human_priest','INT']]){
  const c=person(job);c.focus='adventure';c.flags=['dg_1'];const d={...quiet,events:[event]};for(let i=0;i<10&&!c.used.includes(event.id);i++){E.advance(c,d,()=>0);if(c.pending&&c.pending.kind!=='event')E.choose(c,d,0,()=>0);}assert.equal(c.pending.choices.length,3);const special=c.pending.choices.findIndex(ch=>ch.require?.job);assert.equal(c.pending.choices[special].check.stat,stat);E.choose(c,d,special,()=>0);assert.ok(c.flags.includes('dg_2'));assert.equal(c.bars.health,100);
 }
});
test('all available careers have exactly two three-step arcs at displayed ranks 2 and 4',()=>{
 const arcs=data.quests.filter(q=>q.career&&!q.career.alt);assert.equal(arcs.length,188);const jobs=[...new Set(arcs.map(q=>q.career.job))];assert.equal(jobs.length,94);for(const job of jobs){const qs=arcs.filter(q=>q.career.job===job);assert.deepEqual(qs.map(q=>q.career.rank),[2,4]);for(const q of qs){assert.equal(q.steps.length,3);assert.equal(q.require.jobRank,q.career.rank-1);}}
});
test('career milestones are available without a guild, obey ranks and do not repeat after acceptance',()=>{
 const c=person('human_mage',0);c.focus='work';E.advance(c,{...quiet,quests:data.quests},()=>0);assert.notEqual(c.pending?.kind,'career');
 c.pending=null;c.job.rank=1;E.advance(c,{...quiet,quests:data.quests},()=>0);assert.equal(c.pending.kind,'career');const d={...quiet,quests:data.quests};E.choose(c,d,0,()=>0);assert.equal(c.quest.id,'career_human_mage_r2');let steps=0;while(c.pending&&c.quest){E.choose(c,d,0,()=>0);steps++;}assert.equal(steps,3);assert.ok(c.flags.includes('career_human_mage_r2_complete'));assert.equal(c.questsDone,1);E.advance(c,d,()=>0);assert.notEqual(c.pending?.kind,'career');
 c.pending=null;c.job.rank=3;E.advance(c,d,()=>0);assert.equal(c.pending.kind,'career');assert.match(c.pending.text,/Di tích Đại Ngàn/);
});
test('postponing a milestone does not consume it or advance a pending quest',()=>{const c=person('human_smith',1);const d={...quiet,quests:data.quests};E.advance(c,d,()=>0);const age=c.age;E.choose(c,d,1,()=>0);assert.equal(c.age,age);assert.equal(c.quest,null);assert.ok(!c.used.includes('quest:career_human_smith_r2'));assert.equal(c.careerLast.career_human_smith_r2,age);});
test('leaving a profession cancels its quest instead of completing another job’s career',()=>{const c=person('human_smith',1);c.quest={id:'career_human_mage_r2',step:0};E.advance(c,{...quiet,quests:data.quests},()=>0);assert.equal(c.quest,null);assert.equal(c.questsDone,0);});
test('forbidden magic consumes actual lifespan and can kill through magical burnout',()=>{
 const c=person('human_mage',1);c.maxAge=80;c.pending={kind:'event',choices:[{label:'Cấm thuật',effects:{lifeCost:3}}]};E.choose(c,data,0,()=>0);assert.equal(c.maxAge,77);assert.equal(c.alive,true);
 c.maxAge=c.age+1;c.pending={kind:'event',choices:[{label:'Cấm thuật',effects:{lifeCost:3}}]};E.choose(c,data,0,()=>0);assert.equal(c.alive,false);assert.equal(c.causeKind,'event');assert.match(c.cause,/Cấm thuật/);
});

test('the mage specialist route awards a real mana core without taking health',()=>{
 const c=person('human_mage');c.focus='adventure';const e=data.events.find(e=>e.id==='professional_common_gargoyle');const d={...quiet,events:[e],systems:{...quiet.systems,race:{...quiet.systems.race,human:{...quiet.systems.race.human,romance:false}}}};for(let i=0;i<10&&!c.used.includes(e.id);i++)E.advance(c,d,()=>0);assert.ok(c.used.includes(e.id));const index=c.pending.choices.findIndex(ch=>ch.require?.job);E.choose(c,d,index,()=>0);assert.equal(c.bars.health,100);assert.ok(c.items.some(i=>i.name==='Lõi Ma Lực'));
});
test('all fourteen Human professions have distinct milestone narratives and no authoring tokens leak',()=>{
 const human=data.quests.filter(q=>q.career&&!q.career.alt&&q.career.job.startsWith('human_'));
 for(const rank of [2,4])assert.equal(new Set(human.filter(q=>q.career.rank===rank).map(q=>q.intro)).size,14);
 for(const e of [...data.events.filter(e=>e._file==='careers'),...data.quests.filter(q=>q.career)])assert.doesNotMatch(JSON.stringify(e),/\[\[\w+\]\]/);
});
