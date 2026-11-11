const {test}=require('node:test');
const assert=require('node:assert/strict');
const {npcSprite}=require('../portraits');
const data=require('./portraits').addPortraits({...require('./load').loadData(),sprites:{...require('../img/atlas.json')}});

test('Dawn Torch members use the original species, gender and role frames',()=>{
 const members=data.story.human.bands.party_a.members;
 const [kael,lyra,grom]=members.map(m=>npcSprite(m,data));
 assert.match(kael.person,/^pt\/H0\d\//);assert.equal(kael.column,'swordsman_1');
 assert.match(lyra.person,/^pt\/ELF_F0\d\//);assert.equal(lyra.column,'spirit_1');
 assert.equal(grom.person,'pt/BM_BEAR_M/gladiator_1');assert.equal(grom.column,'gladiator_1');
});

test('portrait selection is stable and leaves the member profile unchanged',()=>{
 const m={name:'Garr',race:'Beastman tộc Sói',position:'Gladiator (Bậc 3)',desc:'Dũng cảm'};
 const before=structuredClone(m);const first=npcSprite(m,data);
 assert.deepEqual(npcSprite(m,data),first);assert.deepEqual(m,before);
 assert.equal(first.person,'pt/BM_WOLF_M/gladiator_2');assert.equal(first.column,'gladiator_2');
});

test('explicit gender and the first race of a hybrid take precedence',()=>{
 assert.match(npcSprite({name:'Vera',race:'Nam, Demon',position:'Dark Knight (Bậc 3)',desc:'Bạn của một nữ pháp sư'},data).person,/^demon_nam_/);
 assert.match(npcSprite({name:'Kael',race:'Nữ, Vampire/Demon lai',position:'Quý tộc'},data).person,/^vampire_nu_/);
 assert.equal(npcSprite({name:'Krik',race:'Kobold lai Goblin'},data).raceId,'kobold');
});

test('known evolution names use their corresponding original illustration',()=>{
 const s=npcSprite({name:'Ruk',race:'Hobgoblin',gender:'male'},data);
 assert.equal(s.raceId,'goblin');assert.equal(s.column,'tienhoa_hobgoblin');
});

test('missing animal or lion art is not replaced with an unrelated humanoid',()=>{
 for(const race of ['Bat','Giant Rat','Sói hoang','Sư Tử','Golem Đá'])assert.equal(npcSprite({name:'Pet',race},data),null,race);
});

test('every returned frame refers to a real atlas rectangle',()=>{
 const members=Object.values(data.story).flatMap(st=>Object.values(st.bands||{}).flatMap(b=>b.members));
 let supported=0;
 for(const m of members){const s=npcSprite(m,data);if(!s)continue;supported++;const a=data.sprites[s.person];assert.deepEqual(s.rect,a[s.column]);const [x,y,w,h]=s.rect;assert.ok(x>=0&&y>=0&&w>0&&h>0&&x+w<=s.size[0]&&y+h<=s.size[1]);}
 assert.ok(supported>100,`${supported} supported members`);
});
