const {test}=require('node:test');const assert=require('node:assert/strict');
const E=require('../engine'),data=require('./load').loadData();
const quiet={...data,events:[],quests:[],story:{},systems:{...data.systems,race:{...data.systems.race,human:{...data.systems.race.human,romance:false,autoChildren:false,noRecruit:true}}}};
function person(job='human_mage',rank=0){const c=E.createCharacter(data,E.makeRng(42),'human');Object.assign(c,{captive:null,age:20,maxAge:1000,stageId:'adult',focus:'work',parents:{},cast:{},party:[],guild:null,band:null,spouse:null,children:[],quest:null,pending:null,log:[],moments:[],used:[],eraUntil:Infinity,nextPromo:0,nextCareer:0,nextJobOffer:Infinity,job:{id:job,rank,xp:1000}});c.race={...c.race,hazard:0};c.era={...data.eras.find(e=>e.id==='peace'),perTurn:{},hazard:1};c.bars={health:100,wealth:50,joy:80};return c;}
function act(c,type,effects){c.pending={kind:'event',choices:[{label:'Làm',...(type?{act:{type}}:{}),...(effects?{effects}:{})}]};E.choose(c,quiet,0,()=>0);}
function step(c,d=quiet,rng=()=>0){c.pending=null;E.advance(c,d,rng);}

test('all profession sources use progressively spaced XP thresholds',()=>{for(const j of data.jobs)assert.deepEqual(j.promoXp,['bm_courier','imp_messenger'].includes(j.id)?[2,5,9,14]:[4,8,14,22],j.id);});
test('successful promotion resets XP and sets both promotion and milestone cooldowns',()=>{
 const c=person();act(c,'promote');assert.equal(c.job.rank,1);assert.equal(c.job.xp,0);assert.ok(c.nextPromo>c.age);assert.ok(c.nextCareer>c.age);const until=c.nextPromo;for(let i=0;i<1;i++){c.job.xp=1000;step(c,{...quiet,quests:data.quests});assert.notEqual(c.pending?.kind,'promotion');if(i===0)assert.notEqual(c.pending?.kind,'career');}assert.equal(c.nextPromo,until);
});
test('promotion becomes available at its cooldown boundary even with a legacy timer',()=>{const c=person();c.nextPromo=1000;step(c);assert.notEqual(c.pending?.kind,'promotion');c.nextPromo=c.age;step(c);assert.equal(c.pending?.kind,'promotion');});
test('higher ranks get longer promotion cooldowns for the same life stage',()=>{const a=person('human_mage',0),b=person('human_mage',2);act(a,'promote');act(b,'promote');assert.ok(b.nextPromo-b.age>a.nextPromo-a.age);});
test('scripted promotions and rank grants also receive cooldowns',()=>{for(const effects of [{jobPromote:true},{jobRankSet:3}]){const c=person();act(c,null,effects);assert.ok(c.nextPromo>c.age);assert.ok(c.nextCareer>c.age);}});
test('postponing milestones blocks another immediate milestone offer',()=>{const c=person('human_mage',3);c.pending={kind:'career',choices:[{label:'Để sau',act:{type:'careerLater',id:'career_human_mage_r2'}}]};E.choose(c,quiet,0,()=>0);step(c,{...quiet,quests:data.quests});assert.notEqual(c.pending?.kind,'career');});
function boardPerson(){const c=person();c.job=null;c.focus='adventure';c.guild={org:'guild',rank:0,pts:0};return c;}
const q={id:'test_pacing_quest',org:'guild',repeat:true,minRank:0,name:'Giao hàng',intro:'Bạn giao hàng.',steps:[{text:'Kiểm hàng.',choices:[{label:'Xong',text:'Đã giao.'},{label:'Bỏ',end:'fail'}]}],complete:'Hoàn tất.',failText:'Dừng lại.',reward:{wealth:2}};
const boardData={...quiet,quests:[q]};
test('quest completion and failure both leave a quiet turn before another board',()=>{
 for(const index of [0,1]){const c=boardPerson();c.quest={id:q.id,step:0};c.ctx={quest:q};c.pending={kind:'quest',choices:q.steps[0].choices};E.choose(c,boardData,index,()=>0);assert.equal(c.quest,null);assert.ok(c.nextQuestBoard>c.age);step(c,boardData);assert.notEqual(c.pending?.kind,'board');}
});
test('boards obey their timer, offer new members work, and honour postponement',()=>{
 const c=boardPerson();c.nextQuestBoard=1000;step(c,boardData);assert.notEqual(c.pending?.kind,'board');c.nextQuestBoard=0;step(c,boardData,()=>0.99);assert.equal(c.pending?.kind,'board');assert.equal(c.guild.boardSeen,true);E.choose(c,boardData,c.pending.choices.length-1,()=>0);assert.ok(c.nextQuestBoard>c.age);step(c,boardData);assert.notEqual(c.pending?.kind,'board');
});
test('merchant capital returns apply only while working with sufficient free capital',()=>{
 function balance(wealth,focus,enabled){const c=person('human_merchant');c.bars.wealth=wealth;c.focus=focus;c.nextPromo=Infinity;const d={...quiet,events:[{id:'pause',text:'Một ngày thường.',choices:[{label:'Tiếp tục'}]}],economy:{...quiet.economy,capitalRate:enabled?quiet.economy.capitalRate:0}};step(c,d,()=>0);return c.bars.wealth;}
 assert.ok(balance(50,'work',true)>balance(50,'work',false));assert.equal(balance(30,'work',true),balance(30,'work',false));assert.equal(balance(50,'rest',true),balance(50,'rest',false));
});
test('trade deals require capital and settle both investment and proceeds exactly once',()=>{
 const e=data.events.find(e=>e.id==='professional_human_merchant_trade');assert.ok(e);assert.equal(e.choices[0].require.wealth,20);
 for(const [rng,expected] of [[()=>0,90],[()=>0.999,30]]){const c=person('human_merchant');c.pending={kind:'event',choices:e.choices};E.choose(c,data,0,rng);assert.equal(c.bars.wealth,expected);assert.equal(c.pending,null);}
 const c=person('human_merchant');c.bars.wealth=10;c.nextPromo=Infinity;step(c,{...quiet,events:[e]},()=>0);assert.equal(c.pending?.kind,'event');assert.equal(c.pending.choices[0].disabled,true);E.choose(c,data,0,()=>0);assert.ok(c.pending);assert.ok(c.bars.wealth<20);
});
test('private and underground professions use personal milestone prose throughout',()=>{
 const jobs=data.jobs.filter(j=>j.progression);assert.ok(jobs.some(j=>j.id==='human_merchant'));assert.ok(jobs.some(j=>j.id==='human_assassin'));for(const j of jobs){assert.equal(j.promo.length,j.ranks.length-1);assert.doesNotMatch(JSON.stringify(j.promotionCopy),/hội đồng|giám thị|chấm thi/i);}
 for(const job of ['human_merchant','human_assassin','human_smith']){const c=person(job);step(c);assert.equal(c.pending?.kind,'promotion');assert.doesNotMatch(c.pending.text,/hội đồng|chấm thi/i);assert.match(c.pending.choices[0].label,/kinh doanh|phi vụ|tay nghề/);}
});
