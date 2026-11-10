const { test } = require('node:test');
const assert = require('node:assert/strict');
const E = require('../engine');
const { loadData } = require('./load');
const data = loadData();
const quiet = { ...data, events: [], quests: [] };

function person(race = 'human', age = 20, hazardous = false) {
  const c = E.createCharacter(data, E.makeRng(123), race);
  Object.assign(c, { age, maxAge: 100000, stageId: null, pending: null, quest: null, captive: null, parents: {}, cast: {}, party: [], band: null, guild: null, job: null, spouse: null, children: [], focus: 'work', nextJobOffer: Infinity, eraUntil: Infinity });
  c.race = { ...c.race, hazard: hazardous ? 1 : 0 };
  c.era = { ...data.eras.find(e => e.id === 'peace'), perTurn: {}, hazard: 1 };
  c.stageId = E.currentStage(c).id;
  c.bars = { health: 80, joy: 80, wealth: 80 };
  c.log = []; c.used = []; c.moments = []; c.castMet = {}; c.npcMet = {};
  return c;
}

function display(c, text, choices = [{ label: 'Tiếp tục', text: 'Bạn bước tiếp.' }], extra = {}, source = data) {
  const e = { id: 'human_encounter_fixture', races: [c.race.id], text, choices, arc: true, ...extra };
  const d = { ...source, events: [e], quests: [] };
  for (let turn = 0; turn < 20; turn++) {
    E.advance(c, d, () => 0);
    if (c.used.includes(e.id)) return d;
    if (c.pending) E.choose(c, d, c.pending.choices.findIndex(ch => !ch.disabled), () => 0);
  }
  assert.fail('Fixture event did not appear');
}

function cast(c, role, kind, name) {
  c.cast[role] = { role, kind, name, alive: true, left: false, bond: 0, mortal: { race: 'Human', years: 1000 } };
}

test('Goblin and Kobold early accident rates are 5%, without changing Human/Beastman', () => {
  for (const id of ['goblin', 'kobold']) assert.equal(data.systems.race[id].earlyHazard, 0.05);
  assert.equal(data.systems.race.human.earlyHazard, 0.02);
  assert.equal(data.systems.race.beastman.earlyHazard, 0.025);
});

test('a forced accident pauses for a crisis, never an immediate death or an overwritten scene', () => {
  const c = person('human', 2, true);
  E.advance(c, quiet, () => 0);
  assert.equal(c.alive, true);
  assert.equal(c.pending.kind, 'crisis');
  assert.equal(c.age, 3);
  assert.equal(c.pending.choices.length, 3);
  assert.equal(c.pending.choices.filter(ch => !ch.disabled).length, 2);
  const pending = c.pending, age = c.age, lines = c.log.length, clicks = c.clicks;
  E.advance(c, quiet, () => 0);
  assert.equal(c.pending, pending);
  assert.equal(c.age, age);
  assert.equal(c.log.length, lines);
  assert.equal(c.clicks, clicks);
  assert.ok(!c.log.some(e => e.kind === 'death'));
});

test('surviving the crisis preserves time and resumes an interrupted childhood milestone', () => {
  const c = person('human', 2, true);
  E.advance(c, quiet, () => 0);
  E.choose(c, quiet, 0, () => 0);
  assert.equal(c.alive, true);
  assert.equal(c.age, 3);
  assert.equal(c.pending, null);
  E.advance(c, quiet, () => 0);
  assert.equal(c.pending.kind, 'crossroads');
  assert.equal(c.stageId, 'child');
  assert.equal(c.age, 3);
});

test('failing a lethal reaction kills only after the player chooses', () => {
  for (const index of [0, 2]) {
    const c = person('human', 1, true);
    E.advance(c, quiet, () => 0);
    assert.equal(c.alive, true);
    assert.equal(c.pending.choices[index].risk, 'lethal');
    E.choose(c, quiet, index, () => 0.999);
    assert.equal(c.alive, false);
    assert.equal(c.causeKind, 'violent');
    assert.equal(c.pending, null);
    assert.equal(c.log.filter(e => e.kind === 'death').length, 1);
  }
});

test('rescue requires an available living helper; dead/absent parents cannot save you', () => {
  for (const alive of [true, false]) {
    const c = person('human', 0, true);
    c.parents.father = { name: 'Zurg', alive, dieAt: Infinity };
    E.advance(c, quiet, () => 0);
    const rescue = c.pending.choices[1];
    assert.equal(rescue.disabled, !alive);
    if (alive) {
      assert.match(rescue.label, /Zurg/);
      E.choose(c, quiet, 1, () => 0);
      assert.equal(c.alive, true);
      assert.equal(c.pending, null);
    } else {
      const pending = c.pending;
      E.choose(c, quiet, 1, () => 0);
      assert.equal(c.pending, pending);
      assert.equal(c.alive, true);
    }
  }
});

test('captivity and mythic disasters respect the setting; rescuers do not teleport into jail', () => {
  const captive = person('human', 0, true);
  captive.parents.mother = { name: 'Mira', alive: true, dieAt: Infinity };
  captive.captive = { kind: 'slave' };
  E.advance(captive, quiet, () => 0);
  assert.equal(captive.pending.kind, 'crisis');
  assert.match(captive.pending.text, /Xiềng xích/);
  assert.equal(captive.pending.choices[1].disabled, true);
  const dragon = person('dragon', 0, true);
  E.advance(dragon, quiet, () => 0);
  assert.match(dragon.pending.text, /ma lực hủy diệt/);
});

test('health depletion and old age remain natural deaths, not accident crises', () => {
  for (const kind of ['health', 'old']) {
    const c = person('human', 20, true);
    if (kind === 'health') c.bars.health = 0;
    else c.maxAge = 20;
    E.advance(c, quiet, () => 0);
    assert.equal(c.alive, false);
    assert.equal(c.causeKind, kind);
    assert.equal(c.pending, null);
  }
});

test('first appearances introduce every referenced Cast role, with no side effects from fmt/eligibility', () => {
  const c = person();
  cast(c, 'rival', 'rival_a', 'Eric');
  cast(c, 'mentor', 'mentor_a', 'Mira');
  E.fmt('{rival} nhìn bạn.', c, null, data);
  E.eligible({ id: 'preview', text: '{mentor} nhìn bạn.' }, c, c.stageId, data);
  assert.deepEqual(c.castMet, {});
  const d = display(c, '{rival} bước xuống xe. {mentor} đứng gần đó.');
  const t = c.pending.text;
  assert.match(t, /Hôm ấy, bạn gặp Eric/);
  assert.match(t, /gia tộc công tước/);
  assert.match(t, /Hôm ấy, bạn gặp Mira/);
  assert.ok(t.indexOf('Hôm ấy') < t.indexOf('Eric bước xuống xe'));
  assert.ok(t.includes('\n\n'));
  assert.equal(c.castMet.rival, true);
  assert.equal(c.castMet.mentor, true);
  assert.equal(c.cast.rival.metAt, c.age);
  assert.equal(c.cast.rival.mortal.metAt, c.age);
  E.choose(c, d, 0, () => 0);
  display(c, '{rival} lại bước xuống xe.', undefined, { id: 'human_second_encounter_fixture' });
  assert.ok(!c.pending.text.includes('Hôm ấy, bạn gặp'));
});

test('unselected results do not introduce a Cast member; the chosen result does', () => {
  const c = person();
  cast(c, 'friend', 'friend_a', 'Elian');
  const choices = [{ label: 'Đi tiếp', text: 'Bạn bỏ đi.' }, { label: 'Nán lại', text: '{friend} bước tới.' }];
  const d = display(c, 'Bạn đứng trước ngã rẽ.', choices);
  assert.ok(!c.castMet.friend);
  E.choose(c, d, 0, () => 0);
  assert.ok(!c.castMet.friend);
  c.pending = { kind: 'event', choices };
  E.choose(c, d, 1, () => 0);
  assert.equal(c.castMet.friend, true);
  assert.match(c.log.at(-1).text, /Hôm ấy, bạn gặp Elian/);
});

test('Cast mentions in visible choices receive a hook, and metAt=0 is already met', () => {
  const c = person();
  cast(c, 'rival', 'rival_a', 'Eric');
  display(c, 'Một cỗ xe dừng lại.', [{ label: 'Bước tới chỗ {rival}', text: 'Bạn bước tới.' }]);
  assert.match(c.pending.text, /Hôm ấy, bạn gặp Eric/);
  const old = person();
  cast(old, 'rival', 'rival_a', 'Eric');
  old.cast.rival.metAt = 0;
  display(old, '{rival} lại chặn đường.');
  assert.equal(old.pending.text, 'Eric lại chặn đường.');
});

test('new arc recruits have race and role on first mention; names are matched as whole names', () => {
  const c = person();
  const custom = { ...data, story: { ...data.story, human: { ...data.story.human, bands: {}, recruits: { a: { name: 'Garr', race: 'Beastman tộc Sói', position: 'Thợ săn' }, b: { name: 'Garrick', race: 'Dwarf', position: 'Thợ rèn' } } } } };
  const d = display(c, 'Garrick đưa bạn bản đồ. Garr đứng cạnh anh ta.', undefined, {}, custom);
  assert.match(c.pending.text, /Garrick \(Dwarf, Thợ rèn\)/);
  assert.match(c.pending.text, /Garr \(Beastman tộc Sói, Thợ săn\)/);
  E.choose(c, d, 0, () => 0);
  display(c, 'Garrick kiểm tra bản đồ.', undefined, { id: 'human_later_npc_fixture' }, custom);
  assert.equal(c.pending.text, 'Garrick kiểm tra bản đồ.');
});

test('an already annotated NPC is recorded without adding a second parenthesis', () => {
  const c = person();
  display(c, 'Garr (Beastman tộc Sói, Gladiator) bước tới.');
  assert.equal(c.pending.text, 'Garr (Beastman tộc Sói, Gladiator) bước tới.');
  assert.equal(c.npcMet.Garr, true);
});

test('quest NPCs are introduced before the first step and not repeatedly in later steps', () => {
  const c = person();
  const q = { id: 'intro_quest', name: 'Bản đồ', intro: 'Garosh đưa cho bạn một bản đồ cũ.', npcs: [{ name: 'Garosh', race: 'Beastman', position: 'Thợ săn kỳ cựu' }], steps: [{ text: 'Garosh chỉ vào bản đồ.', choices: [{ label: 'Lắng nghe', text: 'Bạn ghi nhớ.', end: 'success' }] }], complete: 'Garosh cảm ơn bạn.', reward: {} };
  const d = { ...data, quests: [q] };
  c.pending = { kind: 'board', choices: [{ label: 'Nhận nhiệm vụ', act: { type: 'quest', id: q.id } }] };
  E.choose(c, d, 0, () => 0);
  const introduction = c.log.find(e => e.kind === 'quest');
  assert.equal(introduction.text, 'Garosh (Beastman, Thợ săn kỳ cựu) đưa cho bạn một bản đồ cũ.');
  assert.equal(c.pending.text, 'Garosh chỉ vào bản đồ.');
  assert.equal(c.npcMet.Garosh, true);
  assert.ok(data.quests.find(q => q.id === 'human_story_arena_ghost').npcs.some(p => p.name === 'Dorian' && p.race === 'Human'));
});

test('a real companion takes precedence over an unrelated scripted NPC with the same name', () => {
  const c = person();
  c.party = [{ name: 'Garr', race: 'Slime', jobName: 'Magic Slime', alive: true, left: false }];
  display(c, '{ally} tiến lại gần.');
  assert.match(c.pending.text, /Garr \(Slime, Magic Slime\)/);
  assert.ok(!c.pending.text.includes('Beastman'));
});
