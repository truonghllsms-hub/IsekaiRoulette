// Data for the per-race sprite frames: every trade a race can take (first and top rank), its life
// stages and its evolved forms. Run: node tools/race-sheet-data.js <out.json> <race> [race…]
const fs = require("fs");
const { loadData } = require("./load");
const { LOOKS, jobLook } = require("./looks");
const data = loadData();
const [out, ...ids] = process.argv.slice(2);
const packs = Object.fromEntries(ids.map((id) => [id, JSON.parse(fs.readFileSync(`data/packs/${id}.json`, "utf8"))]));
const short = (t) => String(t || "").split(/(?<=[.!?])\s/)[0].slice(0, 160);
const races = ids.map((id) => {
  const r = data.races.find((x) => x.id === id);
  const jobs = data.jobs.filter((j) => (!j.races || j.races.includes(id)) && (!j.tags || (r.tags || []).some((t) => j.tags.includes(t))) && (!j.excludeRaces || !j.excludeRaces.includes(id)));
  return {
    id, name: r.name, genderless: !!r.genderless, desc: short(r.desc),
    kins: (r.subtypes || []).map((s) => ({ id: s.id, name: s.name })),
    jobs: jobs.map((j) => ({ id: j.id, name: j.name, look: LOOKS[jobLook(j)].vi, desc: short(j.desc), first: j.ranks[0], top: j.ranks[j.ranks.length - 1], n: j.ranks.length })),
    // evolved forms: the race's list plus any form a scene can turn you into
    forms: [...new Set([...Object.values(packs[id].forms || {}).map((f) => f.name), ...[...JSON.stringify(packs[id]).matchAll(/"evolve":\s*"([^"]+)"/g)].map((m) => m[1])])].map((name) => ({ name })),
    stages: require("../engine").stagesOf(r).map((s, i, all) => ({ id: s.id, name: s.name, ages: all[i + 1] ? `${Math.round(s.start)}–${Math.round(all[i + 1].start)} tuổi` : `${Math.round(s.start)}+ tuổi` })),
  };
});
fs.writeFileSync(out, JSON.stringify(races, null, 1));
console.log(races.map((r) => `${r.id}: ${r.jobs.length} nghề, ${r.forms.length} tiến hóa, ${r.kins.length} tộc con`).join("\n"));
