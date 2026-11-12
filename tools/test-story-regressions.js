// Exercise the generated stories through the public engine API, including filtering
// down to one available outcome. Run after tools/build-pack.js.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const { parse } = require("./script-parse");
const { loadData } = require("./load");
const E = require("../engine");
const data = loadData();
const event = (id) => {
  const e = data.events.find((e) => e.id === id);
  assert.ok(e, id);
  return e;
};

function character(race, flags = [], age = 40) {
  const c = E.createCharacter(data, E.makeRng(123), race);
  Object.assign(c, { age, maxAge: 100000, flags, pending: null, captive: null, quest: null, job: null, nextJobOffer: Infinity });
  // Isolate event behavior from unrelated random deaths during the search.
  c.race = { ...c.race, hazard: 0 };
  for (const parent of Object.values(c.parents || {})) if (parent.alive) parent.dieAt = Infinity;
  c.bars = { health: 60, joy: 60, wealth: 60 };
  c.stageId = E.currentStage(c).id;
  return c;
}

function start(id, c) {
  const e = event(id);
  const isolated = { ...data, events: [e] };
  if (e.focus) c.focus = e.focus[0];
  if (e.eras) c.era = data.eras.find((era) => era.id === e.eras[0]);
  c.eraUntil = 100000;
  assert.ok(E.eligible(e, c, E.currentStage(c).id, isolated), `${id} must be reachable`);
  const rng = E.makeRng(42);
  for (let i = 0; i < 100 && c.alive; i++) {
    E.advance(c, isolated, rng);
    if (c.used.includes(id)) return isolated;
    if (c.pending) E.choose(c, isolated, c.pending.choices.findIndex((ch) => !ch.disabled), rng);
  }
  assert.fail(`${id} was never shown: age=${c.age}, alive=${c.alive}, focus=${c.focus}, cause=${c.cause}, last=${JSON.stringify(c.log.slice(-2))}`);
}

function resolveBranch(id, flag, race, age) {
  const c = character(race, [flag], age);
  const isolated = start(id, c);
  assert.equal(c.pending?.choices.length, 1, "the matching branch must still have a button");
  assert.deepEqual(c.pending.choices[0].require.flags, [flag]);
  const joy = c.bars.joy;
  const expectedJoy = c.pending.choices[0].effects?.joy;
  E.choose(c, isolated, 0, E.makeRng(42));
  if (expectedJoy) assert.equal(c.bars.joy, Math.max(0, Math.min(100, joy + expectedJoy)));
  assert.equal(c.pending, null);
  return c;
}

test("recognizes all supported flag-branch spellings", () => {
  for (const prefix of ['Nếu có clue', 'Nếu có "clue"', 'Nếu có dấu ấn "clue"', 'Hệ quả (nếu có "clue")']) {
    const parsed = parse(`[sample] Kết thúc\nTình huống: Chờ kết quả.\n${prefix}: Bạn được cứu. → Sức khỏe +30.`);
    assert.equal(parsed.events[0].variants[0].flag, "clue");
    assert.equal(parsed.events[0].variants[0].auto.eff.health, 30);
  }
});

test("effect-only results retain narration elsewhere and do not swallow prose", () => {
  const pure = parse('[sample] Kết quả\nTình huống: Bạn tu luyện.\nHệ quả: Sức mạnh +3, thêm dấu ấn "black_bone_evolution".').events[0];
  assert.equal(pure.auto.eff.STR, 3);
  assert.equal(pure.auto.text, "");
  const prose = parse('[sample] Kết quả\nTình huống: Bạn tu luyện.\nHệ quả: Sức mạnh +3. Cơ thể bạn thay đổi.').events[0];
  assert.match(prose.auto.text, /Cơ thể bạn thay đổi/);
});

test("Elf saved by the Orc survives; the betrayed Orc kills the Elf", () => {
  const saved = resolveBranch("elf_chain_parent_3", "debt_paid", "elf", 1300);
  assert.equal(saved.alive, true);
  assert.ok(saved.log.some((e) => /được cứu sống ngoạn mục/.test(e.text)));
  const dead = resolveBranch("elf_chain_parent_3", "debt_ignored", "elf", 1300);
  assert.equal(dead.alive, false);
  assert.match(dead.cause, /nhục nhã/);
});

test("both Beastman endings show their result and apply their effects", () => {
  for (const flag of ["spared_zog_son", "killed_zog_son"]) {
    const c = resolveBranch("bm_chain_traitor_forgive", flag, "beastman", 90);
    assert.equal(c.alive, true);
    assert.ok(c.log.some((e) => flag === "spared_zog_son" ? /hận thù vĩnh viễn/.test(e.text) : /nghiệp chướng/.test(e.text)));
    if (flag === "spared_zog_son") assert.ok(c.fame > 0); // renown is softened by the engine; the branch must still raise it
  }
});

test("the assassin can be captured, killed or spared, and the final branch is playable", () => {
  for (const [index, flag] of [[0, "assassin_killed"], [1, "assassin_spared"]]) {
    const c = character("elf", ["sanctus_enemy"], 100);
    const ambush = start("elf_chain_relic_1", c);
    E.choose(c, ambush, 0, () => 0);
    assert.ok(c.flags.includes("assassin_captured"));
    const verdict = start("elf_chain_relic_verdict", c);
    assert.equal(c.pending.choices.length, 2);
    E.choose(c, verdict, index, () => 0);
    assert.ok(c.flags.includes(flag));
    const finale = start("elf_chain_relic_2", c);
    assert.equal(c.pending.choices.length, 1);
    const before = c.fame;
    E.choose(c, finale, 0, () => 0);
    assert.ok(index === 0 ? c.fame < before : c.fame > before); // killed lowers renown, sparing raises it (sizes are softened)
  }
});

test("sharing bread grants the flag required by the Kobold rescue", () => {
  const c = character("human", [], 8);
  const d = start("human_play_stray_kobold", c);
  E.choose(c, d, 1, () => 0);
  assert.ok(c.flags.includes("kobold_friend"));
  const rescue = event("human_chain_kobold_1");
  assert.ok((rescue.require.flags || rescue.require.anyFlags).includes("kobold_friend"));
});

test("hiding from the young dragon keeps the Kobold origin arc reachable", () => {
  const stages = data.races.find((r) => r.id === "kobold").stages;
  const c = character("kobold", ["dragon_2_hut"], stages.find((s) => s.id === "teen").start + 1);
  c.origin = data.origins.find((o) => o.id === "kobold_bg_dragon");
  const d = start("kobold_arc_dragon_3", c);
  E.choose(c, d, 1, () => 0);
  assert.ok(c.flags.includes("dragon_3_tron"));
  assert.ok(!c.flags.includes("dragon_3_") && !c.flags.includes("tron"));
  c.age = stages.find((s) => s.id === "adult").start + 1;
  assert.ok(E.eligible(event("kobold_arc_dragon_4"), c, E.currentStage(c).id, data));
});

test("all six evolved Goblin minion scenes require actual followers", () => {
  const scenes = data.events.filter((e) => /^goblin_minion_(hob|sham|king)_/.test(e.id));
  assert.equal(scenes.length, 6);
  for (const e of scenes) {
    const c = character("goblin", [], 10);
    c.form = e.require.form;
    c.minions = [];
    assert.equal(E.eligible(e, c, E.currentStage(c).id, data), false, e.id);
    c.minions = [{ id: "minion_a", name: "Grok", loyalty: 50 }];
    assert.equal(E.eligible(e, c, E.currentStage(c).id, data), true, e.id);
  }
});

test("dementia makes no assumptions about a spouse or a weapon", () => {
  const e = event("human_old_dementia");
  assert.doesNotMatch(e.text, /mài kiếm|vợ|chồng/);
  const c = character("human", [], 80);
  c.spouse = null;
  c.formerSpouses = [];
  assert.ok(E.eligible(e, c, E.currentStage(c).id, data));
});

test("noble events survive exclusive-pack filtering and accept bastard blood", () => {
  for (const id of ["h_tutor", "h_arranged", "human_child_noble_etiquette"]) {
    const e = event(id);
    assert.ok(!(e.excludeRaces || []).includes("human"), id);
    for (const flag of ["noble", "bastard_blood"]) {
      const c = character("human", [flag], id === "h_arranged" ? 16 : 8);
      assert.ok(E.eligible(e, c, E.currentStage(c).id, data), `${id}: ${flag}`);
    }
    const c = character("human", [], id === "h_arranged" ? 16 : 8);
    assert.equal(E.eligible(e, c, E.currentStage(c).id, data), false);
  }
});

test("the merchant scene requires its father instead of the mother", () => {
  const e = event("human_arc_merchant_1");
  assert.equal(e.require.fatherAlive, true);
  assert.equal(e.require.motherAlive, undefined);
  const c = character("human", ["merchant_kin"], 10);
  c.origin = data.origins.find((o) => o.id === "human_bg_merchant");
  c.parents.father.alive = true;
  c.parents.father.status = "alive";
  c.parents.mother.alive = false;
  c.parents.mother.status = "dead";
  assert.ok(E.eligible(e, c, E.currentStage(c).id, data));
  c.parents.father.alive = false;
  c.parents.mother.alive = true;
  assert.equal(E.eligible(e, c, E.currentStage(c).id, data), false);
});

test("the Demon mentor bankruptcy outcome grants its complete recall flag", () => {
  const id = "demon_cast_mentor_b_5";
  const flag = `${id}_bankrupt`;
  const c = character("demon", ["demon_cast_mentor_b_4_vassal"], 250);
  c.cast = { mentor: { kind: "mentor_b", name: "Lyra", alive: true, bond: 50 } };
  const d = start(id, c);
  E.choose(c, d, 0, () => 0.999);
  assert.ok(c.flags.includes(flag));
  assert.ok(!c.flags.includes(`${id}_`) && !c.flags.includes("bankrupt"));
  const memory = event(id).recall.find((r) => r.flags.includes(flag));
  assert.ok(memory && memory.flags.some((f) => c.flags.includes(f)));
  assert.match(memory.text, /đống nợ ngập đầu/);
});

test("turning away Goblins or young Orcs unlocks the corresponding memory", () => {
  for (const [suffix, flag, text] of [
    ["a", "duoi_goblin", /từ chối chứa chấp/],
    ["c", "duoi_orc", /tự sinh tự diệt/],
  ]) {
    const id = `orc_minion_rec_${suffix}`;
    const c = character("orc", [], 30);
    c.form = "High Orc";
    c.minions = [];
    const d = start(id, c);
    E.choose(c, d, 1, E.makeRng(42));
    assert.ok(c.flags.includes(flag));
    assert.equal(c.minions.length, 0);
    const memory = event(id).recall.find((r) => r.flags.includes(flag));
    assert.ok(memory && memory.flags.some((f) => c.flags.includes(f)));
    assert.match(memory.text, text);
  }
});

test("the fang event excludes rabbit, rat and hawk but keeps the other Beastman kins", () => {
  const e = event("bm_play_tooth");
  for (const subtype of data.races.find((r) => r.id === "beastman").subtypes) {
    const c = character("beastman", [], 5);
    c.subtype = subtype.id;
    c.focus = "play";
    assert.equal(E.eligible(e, c, E.currentStage(c).id, data), !["rabbit", "rat", "hawk"].includes(subtype.id), subtype.id);
  }
});

test("parents described as dead in the three origins cannot return to living-parent scenes", () => {
  for (const [race, id, who] of [
    ["beastman", "bm_bg_demon", "father"],
    ["demon", "demon_origin_prisoner", "mother"],
    ["orc", "orc_origin_4", "father"],
  ]) {
    const origin = data.origins.find((o) => o.id === id);
    assert.equal(origin[who].status, "dead", id);
    const d = { ...data, origins: [origin] };
    const c = E.createCharacter(d, E.makeRng(42), race);
    assert.equal(c.parents[who].alive, false, id);
    assert.equal(c.parents[who].dieAt, null, id);
    c.age = 16;
    assert.equal(E.eligible({ id: "living_parent", text: `{${who}} cõng bạn ra khỏi rừng.` }, c, E.currentStage(c).id, d), false, id);
    assert.equal(E.eligible({ id: "parent_memory", text: `Bạn nhớ về {${who}} đã mất.` }, c, E.currentStage(c).id, d), true, id);
  }
});

test("a Metal Slime cannot receive the weapon epitaph while a Human warrior still can", () => {
  const ep = data.epitaphs.find((e) => /Cả đời cầm vũ khí/.test(e.text));
  const fallback = { text: "Một cuộc đời đã khép lại." };
  const d = { ...data, epitaphs: [ep, fallback] };
  const slime = character("slime", [], 106);
  slime.job = { id: "slime_metal", rank: 0, xp: 0 };
  assert.equal(data.jobs.find((j) => j.id === slime.job.id).look, "chienbinh");
  assert.equal(E.summary(slime, d, () => 0).epitaph, fallback.text);
  const human = character("human");
  human.job = { id: data.jobs.find((j) => j.races?.includes("human") && j.look === "chienbinh").id, rank: 0, xp: 0 };
  assert.equal(E.summary(human, d, () => 0).epitaph, ep.text);
});

test("aging companions receive a farewell appropriate to their race", () => {
  for (const [raceId, expected] of [
    ["slime", /Lõi ma lực.*cạn kiệt.*hòa tan/],
    ["human", /Tóc họ bạc trắng/],
    ["elf", /Tóc họ bạc trắng/],
  ]) {
    const race = data.races.find((r) => r.id === raceId);
    const c = character("dragon", [], 3000);
    c.maxAge = 10400;
    c.party = [{ name: "Kael", race: race.name, alive: true, since: 0, bond: 70, wish: "" }];
    E.advance(c, { ...data, events: [] }, E.makeRng(42));
    assert.equal(c.party.length, 0, raceId);
    assert.equal(c.fallen.find(p=>p.name==="Kael").alive,false);
    assert.equal(c.fallen.filter((p) => p.name === "Kael").length, 1);
    const loss = c.log.find((e) => e.kind === "loss" && e.text.includes("Kael"));
    assert.ok(loss, raceId);
    assert.match(loss.text, expected);
    if (raceId === "slime") assert.doesNotMatch(loss.text, /Tóc họ bạc trắng|ra đi thanh thản/);
  }
});

test("Slime recurring cast also avoid mortal bedside farewells", () => {
  for (const raceId of ["slime"]) {
    const race = data.races.find((r) => r.id === raceId);
    const c = character("dragon", [], 3000);
    c.maxAge = 10400;
    c.cast = { rival: { name: "Kael", kind: "rival_a", role: "rival", alive: true, mortal: { years: 700, metAt: 0, race: race.name } } };
    E.advance(c, { ...data, events: [] }, E.makeRng(42));
    assert.equal(c.cast.rival.alive, false);
    const loss = c.log.find((e) => e.kind === "loss" && e.text.includes("Kael"));
    assert.match(loss.text, /Lõi ma lực/);
    assert.doesNotMatch(loss.text, /chết già trên giường/);
  }
});

test("the mine-prison friendship cannot start for a free adventurer", () => {
  const e = event("human_cast_friend_b_1");
  const c = character("human", [], 26);
  c.cast = { friend: { kind: "friend_b", name: "Oswin", alive: true } };
  assert.equal(E.eligible(e, c, E.currentStage(c).id, data), false);
  c.captive = { kind: "slave", temp: false };
  assert.equal(E.eligible(e, c, E.currentStage(c).id, data), true);
});

function mixedFamily(childRace, fatherRace = "Human", motherRace = "Elf", races = data.races) {
  const origin = {
    id: "mixed_family_fixture", races: [childRace], weight: 1, name: "Gia đình lai", text: "Bạn sinh ra trong một gia đình lai.", effects: {},
    father: { name: "Roland", race: fatherRace, status: "alive" },
    mother: { name: "Fiora", race: motherRace, status: "alive" },
  };
  const d = { ...data, races, origins: [origin] };
  return { c: E.createCharacter(d, E.makeRng(42), childRace), d };
}

test("each parent ages according to their own race, for both Human and Elf children", () => {
  for (const childRace of ["human", "elf"]) {
    const { c, d } = mixedFamily(childRace);
    assert.ok(c.parents.father.dieAt > 0 && c.parents.father.dieAt < 80, childRace);
    assert.ok(c.parents.mother.dieAt > 900, childRace);
    // The parent's expiry is relative to the child's birth. Advancing beyond
    // the Human father's expiry must not also kill the Elf mother.
    c.age = Math.ceil(c.parents.father.dieAt);
    c.maxAge = 5000;
    c.race = { ...c.race, hazard: 0 };
    c.stageId = E.currentStage(c).id;
    c.nextJobOffer = Infinity;
    c.pending = null;
    c.captive = null;
    E.advance(c, { ...d, events: [] }, E.makeRng(42));
    assert.equal(c.parents.father.alive, false);
    assert.equal(c.parents.mother.alive, true);
  }
});

test("parent race lookup understands Beastman kins and lowercase race IDs", () => {
  const { c } = mixedFamily("elf", "Beastman tộc Sói", "human");
  assert.ok(c.parents.father.dieAt > 0 && c.parents.father.dieAt < 60);
  assert.ok(c.parents.mother.dieAt > 0 && c.parents.mother.dieAt < 80);
});

test("an immortal parent has no expiry and an unknown race uses the child's lifespan", () => {
  const races = data.races.map((r) => r.id === "elf" ? { ...r, lifespan: null } : r);
  const { c } = mixedFamily("human", "Unknown race", "Elf", races);
  assert.ok(c.parents.father.dieAt > 0 && c.parents.father.dieAt < 80);
  assert.equal(c.parents.mother.dieAt, null);
});

test("an ancient Elf depleted of health receives a magical death instead of a fever", () => {
  for (const age of [1050, 1300]) {
    for (let i = 0; i < 10; i++) {
      const c = character("elf", [], age);
      c.pending = { kind: "event", choices: [{ label: "Hồn lực cạn kiệt", effects: { health: -100 } }] };
      E.choose(c, data, 0, () => i / 10);
      assert.equal(c.alive, false);
      assert.equal(c.causeKind, "health");
      assert.match(c.cause, /ma lực|Hồn lực/);
      assert.doesNotMatch(c.cause, /cơn sốt|cảm lạnh/);
    }
  }
  const newDeath = data.deaths.find((d) => d.id === "health_elf_soul_exhaustion");
  assert.ok(newDeath);
  assert.match(newDeath.text, /rễ Cây Thế Giới/);
});

test("life-card age titles change at 1000 and 10000 years", () => {
  for (const [age, expected] of [
    [199, null],
    [200, "Sống qua 2 thế kỷ"],
    [999, "Sống qua 9 thế kỷ"],
    [1000, "Tồn tại qua hàng thiên niên kỷ"],
    [9999, "Tồn tại qua hàng thiên niên kỷ"],
    [10000, "Thực thể thái cổ chứng kiến vạn vật khởi sinh"],
    [14000, "Thực thể thái cổ chứng kiến vạn vật khởi sinh"],
  ]) {
    const c = character("dragon", [], age);
    c.moments = [];
    c.job = null;
    c.questsDone = 0;
    c.fame = 0;
    c.spouse = null;
    c.children = [];
    const marks = E.summary(c, data, E.makeRng(42)).card.marks;
    if (expected) assert.ok(marks.includes(expected), `${age}: ${JSON.stringify(marks)}`);
    else assert.ok(!marks.some((m) => /Sống qua|thiên niên kỷ|thái cổ/.test(m)));
    if (age >= 1000) assert.ok(!marks.some((m) => /^Sống qua \d+ thế kỷ$/.test(m)));
  }
});

function ratingCharacter(joy = 0) {
  const c = character("human", [], 100);
  Object.assign(c, { maxAge: 100, form: null, job: null, guild: null, spouse: null, children: [], fame: 0, questsDone: 0, joyLog: { sum: joy, years: 1 } });
  return c;
}
const rating = (c) => E.summary(c, data, E.makeRng(42)).card.rating;
const ratingJob = () => data.jobs.find((j) => j.races?.includes("human") && j.ranks.length === 5);

test("life grades use the new 40, 72 and 90 point boundaries", () => {
  // Full lifespan = 25; each point of average joy adds 0.2.
  const ordinary = ratingCharacter(74);
  assert.equal(rating(ordinary).grade, "C"); // 39.8
  ordinary.joyLog.sum = 75;
  assert.equal(rating(ordinary).grade, "B"); // 40
  const famous = ratingCharacter(84);
  famous.fame = 100;
  assert.equal(rating(famous).grade, "B"); // 71.8
  famous.joyLog.sum = 85;
  assert.equal(rating(famous).grade, "A"); // 72
  const legend = ratingCharacter(99);
  legend.fame = 100;
  legend.job = { id: ratingJob().id, rank: 4, xp: 0 };
  legend.spouse = { name: "Mira" };
  assert.equal(rating(legend).grade, "A"); // 89.8
  legend.joyLog.sum = 100;
  assert.equal(rating(legend).grade, "S"); // 90
});

test("a high-scoring novice without achievements is capped at B", () => {
  const c = ratingCharacter(100);
  c.job = { id: ratingJob().id, rank: 0, xp: 0 };
  c.guild = { org: data.orgs.find((o) => o.races?.includes("human")).id, rank: 5, pts: 100 };
  c.spouse = { name: "Mira" };
  c.fame = 29.5; // renown counts in full from 50, so 29.5 gives the same 17.7 points the old 59 did
  assert.equal(rating(c).grade, "B"); // 72.7 points, but no qualifying achievement
  for (const patch of [{ job: { ...c.job, rank: 2 } }, { questsDone: 2 }, { form: "Ascended" }, { famePeak: 60 }]) {
    assert.equal(rating({ ...c, ...patch }).grade, "A");
  }
});

test("a peaceful family life can finish at B and low scores retain age-specific C titles", () => {
  const c = ratingCharacter(50);
  c.spouse = { name: "Mira" };
  assert.deepEqual(rating(c), { grade: "B", title: "Bình Yên Thanh Thản" }); // 25 + 10 + 5
  const poor = ratingCharacter();
  assert.deepEqual(rating(poor), { grade: "C", title: "Một Kiếp Cơ Cực" });
  poor.age = 5;
  assert.deepEqual(rating(poor), { grade: "C", title: "Chết Yểu" });
});

function quietBody(focus, wealth = 50, captive = null) {
  const c = character("human", [], 20);
  Object.assign(c, { focus, captive, parents: {}, cast: {}, party: [], guild: null, spouse: null, children: [], era: { ...data.eras.find((e) => e.id === "peace"), perTurn: {} }, eraUntil: Infinity });
  c.bars = { health: 20, joy: 60, wealth };
  return c;
}
const quietData = { ...data, events: [], quests: [] };

test("quiet play and work do not passively erase injuries", () => {
  for (const focus of ["play", "work"]) {
    const c = quietBody(focus);
    E.advance(c, quietData, E.makeRng(42));
    assert.equal(c.bars.health, 20, focus);
  }
});

test("poverty and slavery cause attrition while explicit rest still helps", () => {
  for (const [wealth, captive] of [[0, null], [50, { kind: "slave", temp: false }]]) {
    const working = quietBody("work", wealth, captive);
    E.advance(working, quietData, E.makeRng(42));
    assert.ok(working.bars.health < 20);
    const resting = quietBody("rest", wealth, captive);
    E.advance(resting, quietData, E.makeRng(42));
    assert.ok(resting.bars.health > 20);
  }
});

test("both dark eras increase event damage by 50 percent and preserve healing", () => {
  for (const id of ["peace", "dark_age", "demon_lord"]) {
    const c = character("human");
    c.bars.health = 80;
    c.era = data.eras.find((e) => e.id === id);
    c.pending = { kind: "event", choices: [{ effects: { health: -20 } }] };
    E.choose(c, data, 0, E.makeRng(42));
    assert.equal(c.bars.health, id === "peace" ? 60 : 50);
    c.pending = { kind: "event", choices: [{ effects: { health: 10 } }] };
    E.choose(c, data, 0, E.makeRng(42));
    assert.equal(c.bars.health, id === "peace" ? 70 : 60);
    assert.equal(E.eventDamage(c, 35), id === "peace" ? 35 : 53);
  }
});

test("era attrition and birth conditions are not amplified as event damage", () => {
  const c = quietBody("rest");
  c.era = data.eras.find((e) => e.id === "dark_age");
  E.advance(c, quietData, E.makeRng(42));
  assert.equal(c.bars.health, 20); // -2 era drift +2 rest per tick
  const origin = { id: "birth_damage_fixture", races: ["human"], name: "Xuất thân", text: "Bạn chào đời.", weight: 1, noParents: true, effects: { health: -10 } };
  const births = ["peace", "dark_age"].map((id) => E.createCharacter({ ...data, origins: [origin], eras: [data.eras.find((e) => e.id === id)] }, E.makeRng(42), "human"));
  assert.equal(births[0].bars.health, births[1].bars.health);
});

test("explicit lethal checks deal at least 35 damage and can kill a wounded character", () => {
  const ch = event("human_adv_goblin_ambush").choices[0];
  assert.equal(ch.risk, "lethal");
  assert.ok(ch.fail.effects.health <= -35);
  const c = character("human");
  c.era = data.eras.find((e) => e.id === "peace");
  c.bars.health = 30;
  c.pending = { kind: "event", choices: [ch] };
  E.choose(c, data, 0, () => 0.999);
  assert.equal(c.alive, false);
  assert.equal(c.causeKind, "health");
  assert.equal(event("human_work_sabotage").choices[0].fail.effects.health, -10);
});

test("short-lived races can mature and evolve within their new natural lifespan", () => {
  for (const id of ["goblin", "kobold"]) {
    const r = data.races.find((r) => r.id === id);
    assert.deepEqual(r.lifespan, [8, 12]);
    assert.ok(E.stagesOf(r).find((s) => s.id === "adult").start < r.lifespan[0]);
    for (const evo of require(`../content/packs/${id}.meta`).evos) assert.ok(evo.minAge <= r.lifespan[1]);
    assert.ok(E.createCharacter(data, E.makeRng(42), id).maxAge <= 12);
  }
});
