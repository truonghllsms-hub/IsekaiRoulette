// Plays thousands of lives automatically and checks the game stays sane.
// Run: node tools/simulate.js [livesPerRace]   (exit code 1 when a check fails)
const Engine = require("../engine");
const { loadData } = require("./load");

const data = loadData();
const LIVES = Number(process.argv[2]) || 1000;
const rng = Engine.makeRng(12345);
const failures = [];

// 1) Race roll matches the weights.
const ROLLS = 100000;
const counts = {};
for (let i = 0; i < ROLLS; i++) {
  const r = Engine.weightedPick(data.races, rng);
  counts[r.id] = (counts[r.id] || 0) + 1;
}
const total = data.races.reduce((s, r) => s + r.weight, 0);
console.log(`\nTỉ lệ đầu thai (${ROLLS.toLocaleString()} lần):`);
for (const r of data.races) {
  const want = (r.weight / total) * 100;
  const got = ((counts[r.id] || 0) / ROLLS) * 100;
  const ok = Math.abs(got - want) <= 1;
  if (!ok) failures.push(`Tỉ lệ ${r.id}: ${got.toFixed(2)}% (cần ${want}%)`);
  console.log(`  ${ok ? "✓" : "✗"} ${r.id.padEnd(11)} ${want.toFixed(1).padStart(5)}%  →  ${got.toFixed(2).padStart(6)}%`);
}

// 2) Full lives per race.
const MAX_TURNS = 2000;
console.log(`\nMô phỏng ${LIVES} kiếp mỗi tộc:`);
console.log("  tộc         tuổi TB   lượt TB  câu lấp  lựa chọn  chết: già/bệnh/bạo lực/sự kiện");
for (const race of data.races) {
  let ages = 0, turns = 0, fillers = 0, entries = 0, choicesSeen = 0;
  const causes = { old: 0, health: 0, violent: 0, event: 0 };
  for (let i = 0; i < LIVES; i++) {
    let c;
    try {
      c = Engine.createCharacter(data, rng, race.id);
      let t = 0;
      while (c.alive && t < MAX_TURNS) {
        if (c.pending) {
          choicesSeen++;
          Engine.choose(c, data, Math.floor(rng() * c.pending.choices.length), rng);
        } else Engine.advance(c, data, rng);
        t++;
      }
      if (c.alive) { failures.push(`${race.id}: một kiếp chưa kết thúc sau ${MAX_TURNS} lượt (tuổi ${c.age})`); continue; }
      turns += t;
      ages += c.age;
      for (const e of c.log) { entries++; if (e.kind === "filler") fillers++; }
      causes[c.causeKind]++;
    } catch (err) {
      failures.push(`${race.id}: lỗi khi chạy (${err.message})`);
      break;
    }
  }
  const fillerPct = entries ? (fillers / entries) * 100 : 0;
  const pct = (n) => Math.round((n / LIVES) * 100);
  console.log(
    `  ${race.id.padEnd(11)} ${String(Math.round(ages / LIVES)).padStart(7)}  ${String(Math.round(turns / LIVES)).padStart(7)}  ${fillerPct.toFixed(0).padStart(6)}%  ${(choicesSeen / LIVES).toFixed(1).padStart(8)}   ${pct(causes.old)}/${pct(causes.health)}/${pct(causes.violent)}/${pct(causes.event)}%`
  );
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} kiểm tra thất bại:`);
  for (const f of failures.slice(0, 30)) console.error("  - " + f);
  process.exit(1);
}
console.log("\n✓ Mọi kiểm tra đều đạt.");
