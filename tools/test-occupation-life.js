const {test}=require('node:test'),assert=require('node:assert/strict');
const E=require('../engine'),D=require('./load').loadData();
function person(race='human',job='human_priest',age=20){
 const c=E.createCharacter(D,E.makeRng(91),race);
 Object.assign(c,{age,maxAge:500,focus:'work',captive:null,parents:{},cast:{},party:[],fallen:[],band:null,guild:null,spouse:null,children:[],job:job?{id:job,rank:0,xp:0}:null,flags:[],used:[],eventLast:{},pending:null,quest:null,ctx:null,log:[],moments:[],eraUntil:Infinity,nextJobOffer:Infinity,nextPromo:Infinity,nextCareer:Infinity});
 c.race={...c.race,hazard:0,earlyHazard:0};if(race!=='human'&&age===20)c.age=E.stagesOf(c.race).find(s=>s.id==='adult').start+1;c.stageId=E.currentStage(c).id;c.era={...D.eras.find(e=>e.id==='peace'),hazard:0,perTurn:{}};c.bars={health:100,joy:90,wealth:100};c.stats={STR:8,INT:12,AGI:8,LUCK:8};return c;
}
function effect(c,effects){c.pending={kind:'event',choices:[{label:'x',effects}]};E.choose(c,D,0,()=>0);}
const isolated={...D,events:[],story:{},systems:{...D.systems,race:Object.fromEntries(Object.entries(D.systems.race).map(([id,v])=>[id,{...v,romance:false,autoChildren:false,noRecruit:true}]))}};
test('manual work scenes fit the current trade, not merely a racial work focus',()=>{
 for(const [race,job,id,matching]of [['human','human_priest','human_work_accident',null],['human','human_farmer','human_work_sabotage','human_smith'],['dwarf','dwarf_guard','dwarf_work_2','dwarf_runesmith'],['elf','elf_envoy','elf_work_strike','elf_herb'],['demon','demon_bu','demon_work_cheat','demon_bs']]){
  const c=person(race,job),e=D.events.find(e=>e.id===id);c.focus=e.focus?.[0]||'work';
  if(job==='human_farmer')c.job.id='human_priest';
  assert.equal(E.eligible(e,c,E.currentStage(c).id,D),false,id);
  if(matching){c.job.id=matching;c.party=[{name:'TestHelper',alive:true,bond:50}];assert.ok(E.eligible(e,c,E.currentStage(c).id,D),id+' matching');}
 }
});
test('a priest has authored work at every rank, beyond promotion quests',()=>{
 const c=person();for(let rank=0;rank<5;rank++){c.job.rank=rank;const es=D.events.filter(e=>e.id.startsWith('occupation_priest_')&&E.eligible(e,c,E.currentStage(c).id,D));assert.ok(es.length>=5,`rank ${rank}: ${es.length}`);}
 c.job.id='human_swordsman';assert.ok(D.events.filter(e=>e.id.startsWith('occupation_priest_')).every(e=>!E.eligible(e,c,E.currentStage(c).id,D)));
});
test('a new fourteen-year-old guild member sees a fitting commission before career stories',()=>{
 for(const focus of ['work','adventure']){const c=person('human','human_priest',14);c.focus=focus;c.job.xp=100;c.nextPromo=0;effect(c,{joinGuild:true});E.advance(c,D,()=>.99);assert.equal(c.pending?.kind,'board');assert.ok(c.age<=15);const offered=c.pending.choices.filter(ch=>ch.act?.type==='quest').map(ch=>D.quests.find(q=>q.id===ch.act.id));assert.ok(offered.some(q=>q.id.startsWith('service_')&&[].concat(q.require.job).includes(c.job.id)));}
});
test('rest and captivity pause guild invitations, and declining a board honours the timer',()=>{
 for(const focus of ['rest','work']){const c=person();effect(c,{joinGuild:true});c.focus=focus;if(focus==='work')c.captive={kind:'prison',temp:true,until:100};E.advance(c,isolated,()=>.99);assert.notEqual(c.pending?.kind,'board');}
 const c=person();effect(c,{joinGuild:true});E.advance(c,isolated,()=>.99);assert.equal(c.pending.kind,'board');E.choose(c,isolated,c.pending.choices.length-1,()=>0);E.advance(c,isolated,()=>.99);assert.notEqual(c.pending?.kind,'board');
});
test('a guild board already seen cannot be starved by career scenes for over three active ticks',()=>{
 const c=person();c.focus='adventure';c.job.xp=100;c.nextPromo=0;effect(c,{joinGuild:true});Object.assign(c.guild,{boardSeen:true,lastBoardAt:c.age-3});E.advance(c,D,()=>.99);assert.equal(c.pending?.kind,'board');
});
test('joining Dawn Torch at fourteen leads to its first mission within two subsequent choices',()=>{
 const c=person('human','human_priest',14);E.resolveEvent(c,D,D.events.find(e=>e.id==='human_party_party_a_join'),()=>0);E.choose(c,D,0,()=>0);c.job.xp=100;c.nextPromo=0;
 for(let i=0;i<3&&c.ctx?.eventId!=='human_party_party_a_1';i++){if(c.pending)E.choose(c,D,c.pending.choices.length-1,()=>0);E.advance(c,D,()=>.99);}
 assert.equal(c.ctx?.eventId,'human_party_party_a_1');assert.ok(c.age<=17,c.age);
 const support=c.pending.choices.findIndex(ch=>/băng bó/.test(ch.label));assert.ok(support>=0);E.choose(c,D,support,()=>0);assert.ok(c.flags.includes('pa_1_teamwork'));assert.ok(!c.log.filter(l=>l.kind==='result').some(l=>/bạn chém|Bạn và Grom chặn/.test(l.text)));
});
test('a human artisan also has an enabled logistics role in each first group mission',()=>{
 for(const band of ['a','b','c','d','e','f']){const c=person('human','human_smith');effect(c,{joinBand:'party_'+band});E.resolveEvent(c,D,D.events.find(e=>e.id===`human_party_party_${band}_1`),()=>0);assert.ok(c.pending?.choices.some(ch=>/Chuyển đèn|Kiểm tra tiếp tế|Lo dây|Dẫn người|Chuyển dây|Đánh dấu vùng/.test(ch.label)),band);}
});
test('service commissions can be finished without combat and award guild progress',()=>{
 const c=person();effect(c,{joinGuild:true});E.advance(c,isolated,()=>.99);const idx=c.pending.choices.findIndex(ch=>ch.act?.id==='service_human_aid'||ch.act?.id==='service_human_supplies');assert.ok(idx>=0);E.choose(c,isolated,idx,()=>0);
 for(let i=0;i<5&&c.quest;i++){E.advance(c,isolated,()=>.99);assert.equal(c.pending?.kind,'quest');E.choose(c,isolated,0,()=>0);}
 assert.equal(c.quest,null);assert.equal(c.questsDone,1);assert.ok(c.guild.pts>0);
});
test('later battles offer healing by intelligence and keep the actual casualty on failure',()=>{
 const c=person();effect(c,{joinBand:'party_f'});E.resolveEvent(c,D,D.events.find(e=>e.id==='human_party_party_f_3'),()=>0);
 const idx=c.pending.choices.findIndex(ch=>ch.check?.stat==='INT'&&/Vera/.test(ch.label));assert.ok(idx>=0);E.choose(c,D,idx,()=>.9999);
 assert.ok(c.flags.includes('pf_3_ignis_sacrifice'));assert.ok(c.fallen.some(m=>m.name==='Ignis'));assert.ok(!E.aliveParty(c).some(m=>m.name==='Ignis'));
});
