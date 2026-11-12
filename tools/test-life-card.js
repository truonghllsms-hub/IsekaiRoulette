const {test}=require('node:test'),assert=require('node:assert/strict');
const L=require('../life-card'),E=require('../engine'),data=require('./load').loadData();
function life(race='human') { const c=E.createCharacter(data,E.makeRng(42),race);Object.assign(c,{age:60,cause:'Bạn khép lại một cuộc đời bình yên.',moments:[],job:null,pastJobs:[],party:[],spouse:null,children:[],questsDone:0,fame:0});return c; }
function card(c) { return L.model(c,data,E.summary(c,data,()=>0).card); }
test('highest profession comes from the entire career, including a lost profession',()=>{
 const c=life();c.job={id:'human_farmer',rank:0};c.pastJobs=[{id:'human_mage',rank:4}];const m=card(c);
 assert.equal(m.job,data.jobs.find(j=>j.id==='human_mage').name);assert.equal(m.jobRank,data.jobs.find(j=>j.id==='human_mage').ranks[4]);assert.match(m.highlights.map(h=>h.body).join(' '),/bậc 5\/5/);
});
test('a very short life receives three grounded summaries without inventing deeds or a profession',()=>{
 const c=life();c.age=0;c.cause='Bạn ra đi khi vừa chào đời.';const m=card(c);
 assert.equal(m.job,'Chưa có chức nghiệp');assert.equal(m.highlights.length,3);assert.doesNotMatch(m.highlights.map(h=>h.body).join(' '),/học đồ|giải cứu|lập giao ước|bảo vật|hoàn thành \d+ nhiệm vụ/);assert.equal(m.timeline.length,2);assert.ok(m.timeline.every(t=>t.age===0));
});
test('timeline uses only actual dated memories, removes duplicates and rejects impossible dates',()=>{
 const c=life();c.moments=[{age:55,text:'Bạn trở về.'},{age:10,text:'Bạn bắt đầu học nghề.'},{age:35,text:'Bạn hoàn thành lời hẹn.'},{age:35,text:'Bạn hoàn thành lời hẹn.'},{age:500,text:'Chưa xảy ra.'},{age:-1,text:'Không hợp lệ.'}];
 const m=card(c);assert.deepEqual(m.timeline.map(t=>t.age),[10,35,55]);assert.match(m.highlights.map(h=>h.body).join(' '),/55 tuổi/);assert.doesNotMatch(JSON.stringify(m),/Chưa xảy ra|Không hợp lệ/);
});
test('former fame, a real family and completed tasks can supply remembered achievements',()=>{
 const c=life();c.questsDone=3;c.fame=1;c.famePeak=90;c.spouse={name:'Mira'};c.children=[{name:'A'},{name:'B'}];const m=card(c);
 assert.match(JSON.stringify(m.highlights),/Mira/);assert.match(JSON.stringify(m.highlights),/2 người con/);assert.match(JSON.stringify(m.highlights),/3 nhiệm vụ/);assert.match(JSON.stringify(m.highlights),/90/);
});
test('presentation model does not mutate the life, source data, or existing summary',()=>{
 const c=life('dragon');c.form='Dragon God';const k=E.summary(c,data,()=>0).card;const before=JSON.stringify(c),summary=JSON.stringify(k),definitions=JSON.stringify(data.races);L.model(c,data,k);assert.equal(JSON.stringify(c),before);assert.equal(JSON.stringify(k),summary);assert.equal(JSON.stringify(data.races),definitions);
});
test('all races use the same fixed 2:3 chronicle without human-only headings',()=>{
 for(const race of data.races){const m=card(life(race.id)),r=L.render(m,null);assert.equal(m.highlights.length,3);assert.match(r.svg,/Chức nghiệp cao nhất:/);assert.match(r.svg,/MỘT KIẾP SỐNG/);assert.doesNotMatch(r.svg,/MỘT KIẾP NGƯỜI|Nghề cao nhất:/);assert.equal(r.height,1620);assert.equal(r.width,1080);assert.ok(r.geometry.every(q=>q.y<r.height-25));}
});
test('long names, origins, dates and unbroken words fit inside a fixed frame',()=>{
 const m=card(life('dragon'));m.name='Thượng cổ long '+('VAELTHAR'.repeat(14));m.origin='Một xuất thân có tên rất dài được ghi đầy đủ trong biên niên của thế giới';m.age=125000;m.timeline=[{age:125000,text:'Một biến cố '+('cổ xưa '.repeat(45))}];m.epitaph='Lời cuối '+('được lưu lại '.repeat(35));const r=L.render(m,null);
 assert.equal(r.height,1620);assert.ok(r.geometry.some(q=>q.size<26));assert.ok(L.text(m).includes(m.name));
 for(const q of r.geometry){assert.ok(q.y<r.height-25);assert.ok(q.center?q.x-q.width/2>=50&&q.x+q.width/2<=1030:q.x+q.width<=1025);}
});
test('saved names and memories cannot inject SVG markup and copied text includes the same sections',()=>{
 const m=card(life());m.name='<script>alert("x")</script>';m.highlights[0].body='<image onload="bad()">';const r=L.render(m,null);assert.doesNotMatch(r.svg,/<script>|<image onload/);assert.match(r.svg,/&lt;script&gt;/);const t=L.text(m);for(const s of ['THÀNH TỰU NỔI BẬT','NHỮNG NĂM ĐÁNG NHỚ','DẤU ẤN CÁ NHÂN','Chức nghiệp cao nhất:'])assert.ok(t.includes(s));
});
test('portrait uses contain geometry, preserving wide Slimes and Dragons without distortion',()=>{
 const m=card(life('slime')),r=L.render(m,'data:image/png;base64,AAAA');assert.match(r.svg,/preserveAspectRatio="xMidYMid meet"/);assert.ok(r.portraitBox.x+r.portraitBox.width<540);assert.ok(r.portraitBox.y+r.portraitBox.height<r.height/2);
});
test('the same four self-contained fonts and painted assets are embedded in every SVG export',()=>{
 const assets=require('../chronicle-assets'),r=L.render(card(life('demon')),null,null,assets);
 assert.equal(assets.fonts.length,4);assert.equal(new Set(assets.fonts.map(f=>`${f.weight}/${f.style}`)).size,4);
 for(const f of assets.fonts){assert.equal(Buffer.from(f.src.split(',')[1],'base64').subarray(0,4).toString(),'wOFF');assert.ok(r.svg.includes(f.src));}
 for(const name of ['paper','rank-badge','wax-seal'])assert.ok(r.svg.includes(`data-part="${name}"`));
 assert.doesNotMatch(r.svg,/Georgia|Times New Roman|fonts\.googleapis/);assert.match(r.svg,/font-family="Chronicle Serif"/);
});
test('each current race receives its own emblem without changing its identity or game rules',()=>{
 const motifs=new Set();
 for(const race of data.races){const c=life(race.id),before=JSON.stringify(c),m=card(c),r=L.render(m,null);assert.notEqual(m.motif,'star',race.id);assert.ok(r.svg.includes(`data-emblem="${m.motif}"`));assert.equal(JSON.stringify(c),before);motifs.add(m.motif);}
 assert.equal(motifs.size,data.races.length);
});
