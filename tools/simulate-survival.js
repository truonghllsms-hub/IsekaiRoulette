// Measure mortality by life stage rather than treating lifespan settings as
// observed survival. node tools/simulate-survival.js [livesPerRace=200] [seed=12345]
const assert = require("node:assert/strict");
const E = require("../engine");
const { loadData } = require("./load");
const lives = Number(process.argv[2] || 200);
const seed = Number(process.argv[3] || 12345);
assert.ok(Number.isInteger(lives) && lives > 0);
assert.ok(Number.isInteger(seed));
const data = loadData();
const rng = E.makeRng(seed);
const results = [];
for (const id of ["goblin", "kobold", "imp", "human", "beastman", "elf", "dragon", "high_demon"]) {
  const race = data.races.find((r) => r.id === id);
  const stages = E.stagesOf(race);
  const teen = stages.find((s) => s.id === "teen").start;
  const adult = stages.find((s) => s.id === "adult").start;
  let ageSum = 0, beforeTeen = 0, beforeAdult = 0, over15 = 0;
  const causes = {};
  for (let i = 0; i < lives; i++) {
    const c = E.createCharacter(data, rng, id);
    let turns = 0;
    while (c.alive && turns < 3000) {
      if (c.pending) {
        const open = c.pending.choices.map((ch, i) => ch.disabled ? -1 : i).filter((i) => i >= 0);
        assert.ok(open.length, `${id}: no available choice`);
        E.choose(c, data, open[Math.floor(rng() * open.length)], rng);
      } else {
        if (rng() < 0.05) {
          const options = E.focusOptions(c, data);
          if (options.length) E.setFocus(c, data, options[Math.floor(rng() * options.length)].id);
        }
        E.advance(c, data, rng);
      }
      turns++;
    }
    assert.equal(c.alive, false, `${id}: unfinished life`);
    for (const entry of c.log) assert.doesNotMatch(entry.text, /\{\w+\}/, id);
    ageSum += c.age;
    if (c.age < teen) beforeTeen++;
    if (c.age < adult) beforeAdult++;
    if (c.age > 15) over15++;
    causes[c.causeKind] = (causes[c.causeKind] || 0) + 1;
  }
  const percent = (n) => Number((n * 100 / lives).toFixed(1));
  const row = { race: id, lives, naturalLifespan: race.lifespan, adultAt: adult, meanDeathAge: Number((ageSum / lives).toFixed(1)), beforeTeenPercent: percent(beforeTeen), beforeAdultPercent: percent(beforeAdult), over15Percent: percent(over15), causes };
  results.push(row);
  console.error(JSON.stringify(row));
}
console.log(JSON.stringify({ seed, policy: "random enabled choices; 5% chance to change focus per advance", results }, null, 2));
