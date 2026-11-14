// Loads every data file into one object. Shared by build, validate and simulate.
// Race profiles in content/races/<id>.json (written by Gemini, prompt P3) are merged in here:
// their stages, origins, deaths and names override the defaults in data/.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PROFILE_DIR = path.join(ROOT, "content", "races");
const PACK_DIR = path.join(DATA_DIR, "packs");
const EXPANSION_DIR = path.join(ROOT, "content", "expansions");

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8").replace(/^﻿/, ""));
  } catch (err) {
    throw new Error(`${path.relative(ROOT, file)}: JSON không hợp lệ (${err.message})`);
  }
}

function jsonFiles(dir) {
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
}

function mergeProfile(data, p, file) {
  const race = data.races.find((r) => r.id === p.id);
  if (!race) throw new Error(`content/races/${file}: tộc "${p.id}" không có trong data/races.json`);
  const immortal = race.lifespan === null;

  if (p.stages && p.stages.length) race.stages = p.stages.map((s) => ({ id: s.id, name: s.name, start: s.start }));
  if (p.desc) race.desc = p.desc;

  // Profile origins replace the race's placeholder origins.
  data.origins = data.origins.filter((o) => !(o.races && o.races.length === 1 && o.races[0] === p.id));
  for (const o of p.origins || [])
    data.origins.push({ id: `${p.id}_${o.id}`, races: [p.id], weight: o.weight, name: o.name, text: o.text, effects: o.effects || {} });

  for (const d of p.deaths || [])
    data.deaths.push({
      id: `${p.id}_${d.id}`,
      races: [p.id],
      kind: immortal && d.kind === "old" ? "health" : d.kind, // immortals never die of old age
      text: d.text,
    });

  if (p.names) data.names[p.id] = p.names;
}

// A race pack (built by tools/build-pack.js from an approved Gemini script) brings everything a race
// needs to live its own way: origins with parents, roles, its organisation and raids, events, texts.
function mergePack(data, p, file) {
  const race = data.races.find((r) => r.id === p.race);
  if (!race) throw new Error(`data/packs/${file}: tộc "${p.race}" không tồn tại`);
  if (p.stageNames && race.stages) race.stages.forEach((s) => { if (p.stageNames[s.id]) s.name = p.stageNames[s.id]; });
  if (p.forms) race.forms = p.forms;
  // the script may define the race's life differently from the defaults (ages, tags, lifespan)
  if (p.stages && p.stages.length) race.stages = p.stages;
  if (p.tags) race.tags = p.tags;
  if (p.lifespan !== undefined) race.lifespan = p.lifespan;
  if (p.hazard != null) race.hazard = p.hazard;
  if (p.yearScale) race.yearScale = p.yearScale;
  if (p.subtypes) race.subtypes = p.subtypes;
  // races that are not born as babies (a newly turned Vampire, a High Demon seed) skip shared childhood events
  if (p.noChildhood)
    for (const e of data.events)
      if (!e.pack && !e.races && e.stages && e.stages.every((st) => st === "infant" || st === "child"))
        e.excludeRaces = [...new Set([...(e.excludeRaces || []), p.race])];
  if (p.origins && p.origins.length) {
    data.origins = data.origins.filter((o) => !(o.races && o.races.length === 1 && o.races[0] === p.race));
    for (const o of p.origins) data.origins.push(Object.assign({ races: [p.race] }, o));
  }
  // a race with its own trades no longer gets the shared ones (Human: 14 script trades instead of 7 generic)
  if (p.jobs && p.jobs.length)
    for (const j of data.jobs) if (!j.races) j.excludeRaces = [...new Set([...(j.excludeRaces || []), p.race])];
  for (const j of p.jobs || []) data.jobs.push(Object.assign({ races: [p.race] }, j));
  for (const o of p.orgs || []) data.orgs.push(Object.assign({ races: [p.race] }, o));
  for (const q of p.quests || []) data.quests.push(q);
  const ids = new Set(data.events.map((e) => e.id));
  for (const e of p.events || []) {
    const ev = Object.assign({ _file: "packs/" + file, races: [p.race], pack: true }, e);
    if (ids.has(ev.id)) ev.id += "_v2"; // an older event already uses this id
    data.events.push(ev);
  }
  for (const d of p.deaths || []) data.deaths.push(Object.assign({ races: [p.race] }, d));
  if (p.focus) data.focusRace[p.race] = p.focus;
  if (p.story) data.story[p.race] = p.story;
  // a race whose life is fully written: older and shared events step aside (the roads opened by
  // what you spend your years on, e.path, stay for everyone)
  if (p.exclusive)
    for (const e of data.events)
      if (!e.pack && !e.path && !(p.keepEvents || []).includes(e.id) && (!e.races || e.races.includes(p.race)))
        e.excludeRaces = [...new Set([...(e.excludeRaces || []), p.race])];
  if (p.systems) data.systems.race[p.race] = p.systems;
}

function loadData() {
  const one = (name) => readJson(path.join(DATA_DIR, name + ".json"));
  const events = [];
  for (const f of jsonFiles(path.join(DATA_DIR, "events")))
    for (const e of readJson(path.join(DATA_DIR, "events", f))) events.push(Object.assign({ _file: f }, e));

  const data = {
    races: one("races"),
    eras: one("eras"),
    origins: one("origins"),
    names: one("names"),
    deaths: one("deaths"),
    epitaphs: one("epitaphs"),
    fillers: one("fillers"),
    orgs: one("orgs"),
    jobs: one("jobs"),
    focus: one("focus"),
    quests: one("quests"),
    systems: one("systems"),
    items: one("items"),
    chronology: one("chronology"),
    economy: one("economy"),
    events,
  };
  for (const f of jsonFiles(PROFILE_DIR)) mergeProfile(data, readJson(path.join(PROFILE_DIR, f)), f);
  data.focusRace = {};
  data.story = {};
  for (const f of jsonFiles(PACK_DIR)) mergePack(data, readJson(path.join(PACK_DIR, f)), f);
  // Reviewed additions are appended after race packs, whose origins replace defaults.
  // Reject duplicate IDs instead of silently replacing an already authored story.
  const expansionIds = new Set([...data.origins, ...data.events].map(x => x.id));
  for (const file of jsonFiles(EXPANSION_DIR)) {
    const addition = readJson(path.join(EXPANSION_DIR, file));
    for (const key of ["origins", "events"]) {
      if (!Array.isArray(addition[key])) throw new Error(`expansions/${file}: ${key} phải là mảng`);
      for (const item of addition[key]) {
        if (expansionIds.has(item.id)) throw new Error(`expansions/${file}: trùng ID ${item.id}`);
        expansionIds.add(item.id);
        data[key].push(key === "events" ? {...item, pack: true, _file: "expansions/" + file} : item);
      }
    }
  }
  // love for the races whose packs left it out (their "social" focus promises a mate): data/romance.json
  const romance = fs.existsSync(path.join(DATA_DIR, "romance.json")) ? readJson(path.join(DATA_DIR, "romance.json")) : {};
  for (const [race, r] of Object.entries(romance)) {
    data.systems.race[race] = data.systems.race[race] || {};
    if (!data.systems.race[race].romance) data.systems.race[race].romance = r;
  }
  // a scene about the father that checks the mother is alive (or the other way round) was a slip when the
  // script was turned into data: the parent the scene speaks of is the one who must be there
  for (const e of data.events) {
    const r = e.require;
    if (!r) continue;
    const s = JSON.stringify([e.text, e.choices || null]);
    const f = s.includes("{father}"), m = s.includes("{mother}");
    if (r.motherAlive !== undefined && r.fatherAlive === undefined && f && !m) { r.fatherAlive = r.motherAlive; delete r.motherAlive; }
    else if (r.fatherAlive !== undefined && r.motherAlive === undefined && m && !f) { r.motherAlive = r.fatherAlive; delete r.fatherAlive; }
    // both asked for, one never mentioned: only the one in the scene matters
    else if (r.fatherAlive === true && r.motherAlive === true && f !== m) { if (f) delete r.motherAlive; else delete r.fatherAlive; }
  }
  // the look of each trade (warrior, mage, hunter, worker, plain): picks the sprite and the gear line
  const { jobLook } = require("./looks");
  for (const j of data.jobs) j.look = jobLook(j);
  for (const race of data.races) if (data.chronology[race.id]) race.pacing = data.chronology[race.id];
  require("./economy").installEconomy(data);
  require("./professions").installProfessions(data);
  require("../content/endings").install(data);
  require("../content/life-texture").install(data);
  require("../content/sagas").install(data);
  require("./storylines").install(data);
  require("../content/epoch-events").install(data);
  // after the epoch chronicles exist: their returns are told from what was chosen before
  require("../content/recurrence").install(data);
  require("./economy").annotateRewards(data);
  pruneRemoved(data);
  return data;
}

// A race taken out of the game (data/races.json) or a kin line taken out of a race (its subtypes): every
// piece of content still written for it goes with it, wherever it came from (packs, shared events,
// expansions, companions). An item written for several races keeps the races that remain.
function pruneRemoved(data) {
  const raceIds = new Set(data.races.map((r) => r.id));
  const keep = (x) => {
    if (x.excludeRaces) x.excludeRaces = x.excludeRaces.filter((r) => raceIds.has(r));
    if (!Array.isArray(x.races)) return true;
    const had = x.races.length;
    x.races = x.races.filter((r) => raceIds.has(r));
    return !had || x.races.length > 0;
  };
  for (const key of ["events", "origins", "jobs", "deaths", "quests", "orgs", "epitaphs", "fillers"])
    if (Array.isArray(data[key])) data[key] = data[key].filter(keep);
  for (const id of Object.keys(data.systems.race || {})) if (!raceIds.has(id)) delete data.systems.race[id];
  for (const r of Object.values(data.systems.race || {}))
    if (Array.isArray(r.companions)) r.companions = r.companions.filter((m) => !m.names || raceIds.has(m.names));
  for (const k of ["story", "focusRace"]) for (const id of Object.keys(data[k] || {})) if (!raceIds.has(id)) delete data[k][id];
  for (const r of data.races) {
    if (!r.subtypes) continue;
    const kin = new Set(r.subtypes.map((s) => s.id));
    data.origins = data.origins.filter((o) => !(o.subtype && o.races && o.races.includes(r.id) && !kin.has(o.subtype)));
    data.events = data.events.filter((e) => {
      const q = e.require;
      if (!q || !e.races || !e.races.includes(r.id)) return true;
      // "not for these kin": kin that no longer exist need no excluding
      if (Array.isArray(q.notSubtypes)) { q.notSubtypes = q.notSubtypes.filter((k) => kin.has(k)); if (!q.notSubtypes.length) delete q.notSubtypes; }
      if (Array.isArray(q.subtype)) { q.subtype = q.subtype.filter((k) => kin.has(k)); return q.subtype.length > 0; }
      return !(q.subtype && !kin.has(q.subtype));
    });
  }
}

module.exports = { loadData, DATA_DIR };
