// Loads every data file into one object. Shared by build, validate and simulate.
// Race profiles in content/races/<id>.json (written by Gemini, prompt P3) are merged in here:
// their stages, origins, deaths and names override the defaults in data/.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA_DIR = path.join(ROOT, "data");
const PROFILE_DIR = path.join(ROOT, "content", "races");

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
    jobs: one("jobs"),
    focus: one("focus"),
    quests: one("quests"),
    systems: one("systems"),
    events,
  };
  for (const f of jsonFiles(PROFILE_DIR)) mergeProfile(data, readJson(path.join(PROFILE_DIR, f)), f);
  return data;
}

module.exports = { loadData, DATA_DIR };
