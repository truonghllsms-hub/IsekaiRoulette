// Plays many lives per race and measures the main rates of a life: age, trade, rank, evolution,
// mate, children, companions, betrayal, causes of death…  Choices are random (like a careless player),
// and now and then the "việc chính" changes.
// Run: node tools/stats-report.js [lives] [--json out.json]
const fs = require("fs");
const E = require("../engine");
const { loadData } = require("./load");

const data = loadData();
const args = process.argv.slice(2);
const LIVES = Number(args.find((a) => /^\d+$/.test(a))) || 1000;
const jsonOut = args.includes("--json") ? args[args.indexOf("--json") + 1] : null;
const rng = E.makeRng(20261030);
const BETRAY = /betray|traitor|backstab|treason|phan_boi|ban_dung/;
const BETRAY_TEXT = /phản bội|bán đứng|đâm sau lưng|đâm lén/i;

const pct = (n, d) => (d ? Math.round((n / d) * 1000) / 10 : 0);
const median = (a) => { const s = a.slice().sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : 0; };
const avg = (a) => (a.length ? Math.round((a.reduce((x, y) => x + y, 0) / a.length) * 10) / 10 : 0);

const storyIds = new Set(data.events.filter((e) => e.arc).map((e) => e.id));
const totalWeight = data.races.reduce((s, r) => s + r.weight, 0);
const rows = [];
for (const race of data.races) {
  const ages = [], clicks = [], choices = [], kids = [], fame = [], wealth = [], quests = [];
  const n = { job: 0, jobTop: 0, jobMid: 0, org: 0, orgTop: 0, orgMid: 0, evo: 0, mate: 0, mateLost: 0, child: 0, childLost: 0,
    storyEv: 0, allEv: 0, arcEnd: 0, group: 0, ownGroup: 0, cast: 0, minion: 0,
    party: 0, allyDead: 0, allyLeft: 0, betrayed: 0, orphan: 0, old: 0, health: 0, violent: 0, event: 0, reachElder: 0 };
  const forms = {};
  const subtypes = {};
  for (let i = 0; i < LIVES; i++) {
    const c = E.createCharacter(data, rng, race.id);
    let t = 0;
    let parentLostYoung = false;
    const stages = E.stagesOf(c.race);
    const adultAge = (stages.find((s) => s.id === "adult") || { start: 18 }).start;
    while (c.alive && t < 4000) {
      if (c.pending) {
        const open = c.pending.choices.map((x, k) => (x.disabled ? -1 : k)).filter((k) => k >= 0);
        E.choose(c, data, open[Math.floor(rng() * open.length)], rng);
      } else {
        if (rng() < 0.08) { const f = E.focusOptions(c, data); if (f.length) E.setFocus(c, data, f[Math.floor(rng() * f.length)].id); }
        E.advance(c, data, rng);
      }
      if (!parentLostYoung && c.age < adultAge && c.parents) {
        const ps = ["father", "mother"].map((w) => c.parents[w]).filter((p) => p && p.generated !== undefined || (p && p.status !== "unknown"));
        if (ps.length && ps.every((p) => !p.alive)) parentLostYoung = true;
      }
      t++;
    }
    ages.push(c.age); clicks.push(c.clicks); fame.push(c.fame); wealth.push(c.bars.wealth); quests.push(c.questsDone || 0);
    let ch = 0; for (const e of c.log) if (e.kind === "choice") ch++; choices.push(ch);
    const allJobs = [...c.pastJobs, ...(c.job ? [c.job] : [])];
    if (allJobs.length) n.job++;
    const best = Math.max(-1, ...allJobs.map((j) => j.rank));
    if (best >= 2) n.jobMid++;
    if (best >= 4) n.jobTop++;
    if (c.guild) { n.org++; if (c.guild.rank >= 3) n.orgMid++; const o = E.orgDef(c, data); if (o && c.guild.rank >= o.ranks.length - 1) n.orgTop++; }
    if (c.form) { n.evo++; forms[c.form] = (forms[c.form] || 0) + 1; }
    if (c.subtype) subtypes[c.subtypeName] = (subtypes[c.subtypeName] || 0) + 1;
    if (c.spouse || (c.formerSpouses && c.formerSpouses.length)) n.mate++;
    if (c.formerSpouses && c.formerSpouses.length) n.mateLost++;
    const born = c.children.length + (c.lostChildren || 0);
    kids.push(born);
    if (born) n.child++;
    if (c.lostChildren) n.childLost++;
    if (c.party.length) n.party++;
    if (c.party.some((m) => !m.alive && !m.left)) n.allyDead++;
    if (c.party.some((m) => m.left)) n.allyLeft++;
    if (c.party.some((m) => m.left) || c.used.some((id) => BETRAY.test(id)) || c.log.some((e) => (e.kind === "result" || e.kind === "event" || e.kind === "loss") && BETRAY_TEXT.test(e.text))) n.betrayed++;
    if (parentLostYoung) n.orphan++;
    // story layer (prompts v3)
    const evs = c.used.filter((id) => !id.startsWith("quest:"));
    n.allEv += evs.length;
    n.storyEv += evs.filter((id) => storyIds.has(id)).length;
    const st = data.story && data.story[race.id];
    const arc = st && st.arcs && st.arcs[c.origin.id];
    if (arc && arc.endings.some((e) => e.flags.some((f) => c.flags.includes(f)))) n.arcEnd++;
    if (c.used.some((id) => /_band_band_[a-z]_1$|_party_party_[a-z]_join$/.test(id)) && (c.band || (c.formerBands && c.formerBands.length))) n.group++;
    if (c.used.some((id) => /_lead_1$/.test(id))) n.ownGroup++;
    if (c.used.some((id) => /_cast_/.test(id))) n.cast++;
    if (c.minions && c.minions.length) n.minion++;
    if (E.currentStage(c).id === "elder" || E.currentStage(c).id === "ancient") n.reachElder++;
    n[c.causeKind] = (n[c.causeKind] || 0) + 1;
  }
  rows.push({
    id: race.id, name: race.name, birth: pct(race.weight, totalWeight),
    lifespan: race.lifespan ? race.lifespan.join("–") : "bất tử",
    ageAvg: avg(ages), ageMedian: median(ages), ageP90: (() => { const s = ages.slice().sort((a, b) => a - b); return s[Math.floor(s.length * 0.9)]; })(),
    clicks: avg(clicks), choices: avg(choices),
    job: pct(n.job, LIVES), jobMid: pct(n.jobMid, LIVES), jobTop: pct(n.jobTop, LIVES),
    org: pct(n.org, LIVES), orgMid: pct(n.orgMid, LIVES), orgTop: pct(n.orgTop, LIVES), quests: avg(quests),
    evo: pct(n.evo, LIVES), forms: Object.fromEntries(Object.entries(forms).map(([k, v]) => [k, pct(v, LIVES)])),
    mate: pct(n.mate, LIVES), mateLost: pct(n.mateLost, LIVES), child: pct(n.child, LIVES), kidsAvg: avg(kids), childLost: pct(n.childLost, LIVES),
    story: pct(n.storyEv, n.allEv), arcEnd: pct(n.arcEnd, LIVES), group: pct(n.group, LIVES), ownGroup: pct(n.ownGroup, LIVES), cast: pct(n.cast, LIVES), minion: pct(n.minion, LIVES),
    party: pct(n.party, LIVES), allyDead: pct(n.allyDead, LIVES), allyLeft: pct(n.allyLeft, LIVES), betrayed: pct(n.betrayed, LIVES),
    orphan: pct(n.orphan, LIVES), reachElder: pct(n.reachElder, LIVES),
    deathOld: pct(n.old, LIVES), deathHealth: pct(n.health, LIVES), deathViolent: pct(n.violent, LIVES), deathEvent: pct(n.event, LIVES),
    fameAvg: avg(fame), wealthAvg: avg(wealth),
    subtypes: Object.fromEntries(Object.entries(subtypes).map(([k, v]) => [k, pct(v, LIVES)])),
  });
  process.stderr.write(`${race.id} `);
}
process.stderr.write("\n");
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ lives: LIVES, rows }, null, 1));
const cols = ["id", "story", "arcEnd", "group", "ownGroup", "cast", "minion", "birth", "lifespan", "ageAvg", "ageMedian", "clicks", "job", "jobTop", "org", "orgTop", "evo", "mate", "child", "kidsAvg", "party", "allyDead", "betrayed", "orphan", "deathOld", "deathHealth", "deathViolent", "deathEvent"];
console.log(cols.join("\t"));
for (const r of rows) console.log(cols.map((k) => r[k]).join("\t"));
