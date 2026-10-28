// Content targets per race, scaled by reincarnation weight. Each tier doubles the one below it,
// so common races (seen most often) get far more variety than rare ones.
const TIERS = [
  { id: "S", name: "Bậc S", minWeight: 15, events: 160, choices: 32, origins: 12 },
  { id: "A", name: "Bậc A", minWeight: 7, events: 80, choices: 16, origins: 8 },
  { id: "B", name: "Bậc B", minWeight: 2, events: 40, choices: 8, origins: 5 },
  { id: "C", name: "Bậc C", minWeight: 0, events: 20, choices: 4, origins: 3 },
];

const tierOf = (race) => TIERS.find((t) => race.weight >= t.minWeight);

// What a race already has: race-specific regular events, choice scenes and origins.
function current(data, raceId) {
  const own = data.events.filter((e) => e.races && e.races.includes(raceId));
  return {
    events: own.filter((e) => !e.choices).length,
    choices: own.filter((e) => e.choices).length,
    origins: data.origins.filter((o) => o.races && o.races.includes(raceId)).length,
    deaths: data.deaths.filter((d) => d.races && d.races.includes(raceId)).length,
    named: !!data.names[raceId],
  };
}

function gap(data, race) {
  const t = tierOf(race);
  const c = current(data, race.id);
  return {
    tier: t,
    have: c,
    need: {
      events: Math.max(0, t.events - c.events),
      choices: Math.max(0, t.choices - c.choices),
      origins: Math.max(0, t.origins - c.origins),
      deaths: Math.max(0, 4 - c.deaths),
      names: !c.named,
    },
  };
}

module.exports = { TIERS, tierOf, current, gap };

if (require.main === module) {
  const { loadData } = require("./load");
  const data = loadData();
  console.log("tộc          tỉ lệ  bậc  sự kiện     lựa chọn   xuất thân");
  for (const r of data.races) {
    const g = gap(data, r);
    const cell = (have, want) => `${String(have).padStart(3)}/${String(want).padEnd(4)}`;
    console.log(
      `${r.id.padEnd(12)} ${String(r.weight).padStart(5)}%  ${g.tier.id}    ${cell(g.have.events, g.tier.events)}   ${cell(g.have.choices, g.tier.choices)}  ${cell(g.have.origins, g.tier.origins)}`
    );
  }
}
