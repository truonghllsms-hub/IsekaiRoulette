// Loads every data file into one object. Shared by build, validate and simulate.
// Race profiles in content/races/<id>.json (written by Gemini, prompt P3) are merged in here:
// their stages, origins, deaths and names override the defaults in data/.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PROFILE_DIR = path.join(ROOT, "content", "races");
const PACK_DIR = path.join(DATA_DIR, "packs");

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
      if (!e.pack && !e.path && (!e.races || e.races.includes(p.race)))
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
    events,
  };
  for (const f of jsonFiles(PROFILE_DIR)) mergeProfile(data, readJson(path.join(PROFILE_DIR, f)), f);
  data.focusRace = {};
  data.story = {};
  for (const f of jsonFiles(PACK_DIR)) mergePack(data, readJson(path.join(PACK_DIR, f)), f);
  // the look of each trade (warrior, mage, hunter, worker, plain): picks the sprite and the gear line
  const { jobLook } = require("./looks");
  for (const j of data.jobs) j.look = jobLook(j);
  return data;
}

module.exports = { loadData, DATA_DIR };
