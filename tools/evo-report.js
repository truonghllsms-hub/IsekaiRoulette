// Evolution rate, old-age deaths and age spread per race. Run: node tools/evo-report.js goblin slime ...
// evolution %, old-age death %, median/p90 age per race
const E = require("../engine");
const { loadData } = require("./load");
const data = loadData();
const N = Number(process.env.N || 600);
const rng = E.makeRng(321);
for (const rid of process.argv.slice(2)) {
  let evo = 0, old = 0; const ages = [];
  for (let i = 0; i < N; i++) {
    const c = E.createCharacter(data, rng, rid);
    let t = 0;
    while (c.alive && t < 4000) {
      if (c.pending) { const o = c.pending.choices.map((x, k) => (x.disabled ? -1 : k)).filter((k) => k >= 0); E.choose(c, data, o[Math.floor(rng() * o.length)], rng); }
      else { if (rng() < 0.08) { const f = E.focusOptions(c, data); if (f.length) E.setFocus(c, data, f[Math.floor(rng() * f.length)].id); } E.advance(c, data, rng); }
      t++;
    }
    if (c.form) evo++;
    if (c.causeKind === "old") old++;
    ages.push(c.age);
  }
  ages.sort((a, b) => a - b);
  console.log(`${rid.padEnd(11)} tiến hóa ${(evo / N * 100).toFixed(1).padStart(5)}%  chết già ${(old / N * 100).toFixed(0).padStart(3)}%  tuổi trung vị ${ages[N >> 1]}  p90 ${ages[Math.floor(N * 0.9)]}`);
}
