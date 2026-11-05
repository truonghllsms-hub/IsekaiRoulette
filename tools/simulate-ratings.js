// Weighted births and random legal choices, matching tools/simulate.js's policy.
// node tools/simulate-ratings.js [lives=300] [seed=12345] [baselineEnginePath]
// A baseline engine rates the SAME finished lives without changing their gameplay.
const assert = require("node:assert/strict");
const path = require("node:path");
const Engine = require("../engine");
const { loadData } = require("./load");

function simulateRatings(lives = 300, seed = 12345, baselineEngine) {
  assert.ok(Number.isInteger(lives) && lives > 0, "lives must be a positive integer");
  assert.ok(Number.isInteger(seed), "seed must be an integer");
  const data = loadData();
  const rng = Engine.makeRng(seed);
  const counts = () => ({ S: 0, A: 0, B: 0, C: 0 });
  const grades = counts();
  const baselineGrades = baselineEngine ? counts() : null;
  const races = {};
  for (let i = 0; i < lives; i++) {
    const c = Engine.createCharacter(data, rng);
    let turns = 0;
    while (c.alive && turns < 3000) {
      if (c.pending) {
        const open = c.pending.choices.map((ch, index) => ch.disabled ? -1 : index).filter((index) => index >= 0);
        assert.ok(open.length, `${c.race.id}: no available choice`);
        Engine.choose(c, data, open[Math.floor(rng() * open.length)], rng);
      } else {
        if (rng() < 0.05) {
          const options = Engine.focusOptions(c, data);
          if (options.length) Engine.setFocus(c, data, options[Math.floor(rng() * options.length)].id);
        }
        Engine.advance(c, data, rng);
      }
      turns++;
    }
    assert.equal(c.alive, false, `${c.race.id}: unfinished life after 3000 turns`);
    for (const entry of c.log) assert.doesNotMatch(entry.text, /\{\w+\}/, `${c.race.id}: unresolved placeholder`);
    const grade = Engine.summary(c, data, Engine.makeRng(i + 1)).card.rating.grade;
    assert.ok(Object.hasOwn(grades, grade));
    grades[grade]++;
    if (baselineEngine) baselineGrades[baselineEngine.summary(c, data, Engine.makeRng(i + 1)).card.rating.grade]++;
    races[c.race.id] = (races[c.race.id] || 0) + 1;
  }
  const distribution = (values) => Object.fromEntries(Object.entries(values).map(([grade, count]) => [grade, { count, percent: Number((count * 100 / lives).toFixed(1)) }]));
  return { lives, seed, policy: "weighted births; random enabled choices; 5% chance of changing focus per advance", grades: distribution(grades), ...(baselineGrades ? { baselineGrades: distribution(baselineGrades) } : {}), races };
}

module.exports = { simulateRatings };
if (require.main === module) {
  const baseline = process.argv[4] ? require(path.resolve(process.argv[4])) : undefined;
  console.log(JSON.stringify(simulateRatings(Number(process.argv[2] || 300), Number(process.argv[3] || 12345), baseline), null, 2));
}
