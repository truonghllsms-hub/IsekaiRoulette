const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../engine');const {loadData}=require('./load');const data=loadData();
function birthData(race='human',origin=null,cast=null,chances=null){
 const r=data.races.find(r=>r.id===race);
 return {...data,events:[],origins:data.origins.filter(o=>origin?o.id===origin:(!o.races||o.races.includes(race))&&o.id!=='human_bg_gladiator'),story:cast?{...data.story,[race]:{cast}}:data.story,systems:{...data.systems,...(chances?{castChances:chances}:{})}};
}
const all={friend:1,mentor:1,rival:1};const none={friend:0,mentor:0,rival:0};
const simple=Object.fromEntries(['friend','mentor','rival'].map(role=>[role+'_a',{id:role+'_a',role,title:role,desc:'Một người đồng hành.',contexts:['free']}]));
function person(){const c=E.createCharacter(data,E.makeRng(42),'human');Object.assign(c,{captive:null,age:20,maxAge:1000,stageId:'adult',focus:'work',parents:{},cast:{},party:[],band:null,spouse:null,children:[],quest:null,pending:null,guild:null,nextJobOffer:0,nextPromo:0,used:[],log:[],moments:[],eraUntil:Infinity,job:{id:'human_mage',rank:1,xp:1000}});c.race={...c.race,hazard:0};c.era={...data.eras.find(e=>e.id==='peace'),perTurn:{},hazard:1};c.bars={health:100,joy:80,wealth:80};return c;}
const quiet={...data,events:[],quests:[],story:{},systems:{...data.systems,race:{...data.systems.race,human:{...data.systems.race.human,romance:false,autoChildren:false}}}};

test('normal births sample each Cast role independently at configured probabilities',()=>{
 const d=birthData('human',null,simple);const counts={friend:0,mentor:0,rival:0};let empty=0;
 for(let seed=1;seed<=2000;seed++){const c=E.createCharacter(d,E.makeRng(seed*7919),'human');for(const role of Object.keys(counts))if(c.cast[role])counts[role]++;if(!Object.keys(c.cast).length)empty++;}
 for(const [role,chance] of Object.entries(data.systems.castChances))assert.ok(Math.abs(counts[role]/2000-chance)<0.045,JSON.stringify(counts));assert.ok(empty>200);
});
test('Cast probabilities support both zero and one without inventing missing roles',()=>{
 for(const [chance,size] of [[none,0],[all,3]]){const d=birthData('human',null,simple,chance);for(let s=1;s<=20;s++)assert.equal(Object.keys(E.createCharacter(d,E.makeRng(s),'human').cast).length,size);}
});
test('all actual captive origins exclude Cast without matching prison context',()=>{
 const cases=[['human','human_bg_gladiator'],['demon','demon_origin_prisoner'],['goblin','goblin_origin_slave'],['imp','imp_origin_summon']];
 for(const [race,origin] of cases){const d=birthData(race,origin,null,all);for(let s=1;s<=20;s++){const c=E.createCharacter(d,E.makeRng(s),race);assert.ok(c.captive);for(const x of Object.values(c.cast)){assert.ok(x.contexts.includes(c.captive.kind));assert.match(d.story[race].cast[x.kind].desc,/bạn tù|cai ngục|chủ nô|nô lệ|tù nhân/i);}}}
 const d=birthData('human','human_bg_gladiator',null,all);assert.deepEqual(E.createCharacter(d,E.makeRng(7),'human').cast,{});
});
test('prison Cast requires both explicit context and a prison role description',()=>{
 const cast={friend_a:{...simple.friend_a,contexts:['arena'],desc:'Bạn tù cùng xà lim.'},mentor_a:{...simple.mentor_a,desc:'Một lão tù nhân.'},rival_a:{...simple.rival_a,contexts:['arena'],desc:'Quý tộc đi xe ngựa.'}};
 const d=birthData('human','human_bg_gladiator',cast,all);const c=E.createCharacter(d,E.makeRng(5),'human');assert.deepEqual(Object.keys(c.cast),['friend']);
});
test('solitary Slime and wild Ghoul births exclude other humanoid Cast',()=>{
 for(const [race,origin] of [['slime',null],['ghoul','ghoul_origin_massgrave']]){const cast={friend_a:{...simple.friend_a,desc:'Nam, Human. Một người tốt bụng.'},mentor_a:{...simple.mentor_a,desc:race==='slime'?'Vô tính, Slime. Một giọt nhầy già.':'Nam, Ghoul. Một xác sống già.'}};const d=birthData(race,origin,cast,all);const c=E.createCharacter(d,E.makeRng(3),race);assert.equal(c.cast.friend,undefined);assert.ok(c.cast.mentor);}
});
test('generated Cast scenes require freedom except the explicitly tagged mine meeting',()=>{
 const evs=data.events.filter(e=>/^human_cast_(friend|mentor|rival)_/.test(e.id));assert.ok(evs.length>40);for(const e of evs){if(e.id==='human_cast_friend_b_1'){assert.deepEqual(e.require.captiveKinds,['slave']);assert.equal(e.require.free,undefined);}else assert.equal(e.require.free,true,e.id);}
});
test('legacy outside Cast is suspended during capture and resumes when free',()=>{
 const c=person();c.cast.friend={kind:'friend_a',name:'Eric',alive:true,bond:50};const e={id:'outside',text:'{friend} bước đến.',require:{}};
 assert.equal(E.eligible(e,c,'adult',data),true);for(const kind of ['arena','prison','slave','bound']){c.captive={kind};assert.equal(E.eligible(e,c,'adult',data),false);}c.captive=null;assert.equal(E.eligible(e,c,'adult',data),true);assert.equal(c.cast.friend.bond,50);
});
test('events cannot fabricate missing actors through text or choices',()=>{
 const c=person();assert.equal(E.eligible({id:'missing',text:'{mentor} đến.'},c,'adult',data),false);assert.equal(E.eligible({id:'missing_choice',text:'Trời tối.',choices:[{label:'Gọi {friend}'}]},c,'adult',data),false);
 c.nextPromo=Infinity;c.nextJobOffer=Infinity;const e={id:'partial',text:'Trời tối.',choices:[{label:'Gọi {friend}'},{label:'Đứng chờ.'}]};const d={...quiet,events:[e]};E.advance(c,d,()=>0);assert.equal(c.pending?.kind,'event');assert.deepEqual(c.pending.choices.map(ch=>ch.label),['Đứng chờ.']);
});
test('explicit slave scene is playable only with the matching actor and captivity',()=>{
 const c=person();const e=data.events.find(e=>e.id==='human_cast_friend_b_1');c.cast.friend={kind:'friend_b',name:'Oswin',alive:true};c.captive={kind:'slave',temp:true};assert.equal(E.eligible(e,c,'adult',data),true);c.captive={kind:'arena'};assert.equal(E.eligible(e,c,'adult',data),false);c.captive=null;assert.equal(E.eligible(e,c,'adult',data),false);
});
test('permanent and temporary captives receive no civilian career or guild scenes',()=>{
 for(const kind of ['arena','prison','slave','bound'])for(const temp of [false,true]){const c=person();c.captive={kind,temp,since:0,until:1000};const d={...quiet,quests:data.quests};E.advance(c,d,()=>0);assert.ok(!['job','promotion','career','board','recruit','romance'].includes(c.pending?.kind));assert.equal(c.job.rank,1);assert.ok(c.captive);assert.ok(c.job.xp>=1000);}
});
test('saved career offers and promotion choices cannot be accepted inside prison',()=>{
 for(const kind of ['job','promotion','career']){const c=person();c.captive={kind:'prison'};c.pending={kind,choices:[{label:'Thi',act:{type:'promote'}}]};E.choose(c,quiet,0,()=>0);assert.equal(c.job.rank,1);assert.equal(c.pending,null);assert.match(c.log.at(-1).text,/Chừng nào còn bị giam/);}
});
test('capture cancels an outside quest before its next line or saved choice',()=>{
 for(const method of ['advance','choose']){const c=person();c.quest={id:'career_human_mage_r2',step:0};c.captive={kind:'prison'};c.pending=method==='choose'?{kind:'quest',choices:[{label:'Tiếp tục',effects:{fame:100}}]}:null;const d={...quiet,quests:data.quests};E[method](c,d,...(method==='choose'?[0,()=>0]:[()=>0]));assert.equal(c.quest,null);assert.equal(c.pending,null);assert.equal(c.questsDone,0);assert.ok(!c.log.some(x=>/Tháp Ngà/.test(x.text)));}
});
test('freedom restores career offers without discarding the existing job or XP',()=>{
 const c=person();c.captive={kind:'arena',since:0};const d={...quiet,quests:data.quests};E.advance(c,d,()=>0);const xp=c.job.xp;c.captive=null;E.advance(c,d,()=>0);assert.equal(c.pending?.kind,'career');assert.equal(c.job.id,'human_mage');assert.ok(c.job.xp>=xp);
});
test('generated profession events and career quests explicitly require freedom',()=>{
 const events=data.events.filter(e=>e._file==='careers'&&e.require?.job);assert.ok(events.length>=196);for(const e of events)assert.equal(e.require.free,true,e.id);for(const q of data.quests.filter(q=>q.career))assert.equal(q.require.free,true,q.id);
});
