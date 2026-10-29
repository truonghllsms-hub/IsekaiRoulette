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

// 2) Full lives per race. Choices are random among the open ones.
const MAX_TURNS = 3000;
console.log(`\nMô phỏng ${LIVES} kiếp mỗi tộc:`);
console.log("  tộc         tuổi  click  lựa chọn  dòng/click  nghề%  hội%  nhiệm vụ  cưới%   chết: già/bệnh/bạo lực/sự kiện");
const openIdx = (c) => c.pending.choices.map((ch, i) => (ch.disabled ? -1 : i)).filter((i) => i >= 0);
for (const race of data.races) {
  let ages = 0, clicks = 0, choicesSeen = 0, entries = 0, withJob = 0, withGuild = 0, quests = 0, married = 0;
  const causes = { old: 0, health: 0, violent: 0, event: 0 };
  for (let i = 0; i < LIVES; i++) {
    let c;
    try {
      c = Engine.createCharacter(data, rng, race.id);
      let t = 0;
      while (c.alive && t < MAX_TURNS) {
        if (c.pending) {
          choicesSeen++;
          const open = openIdx(c);
          if (!open.length) throw new Error("lựa chọn không có phương án nào mở: " + c.pending.text);
          Engine.choose(c, data, open[Math.floor(rng() * open.length)], rng);
        } else {
          // now and then change what we focus on, like a restless player would
          if (rng() < 0.05) {
            const opts = Engine.focusOptions(c, data);
            if (opts.length) Engine.setFocus(c, data, opts[Math.floor(rng() * opts.length)].id);
          }
          Engine.advance(c, data, rng);
        }
        t++;
      }
      if (c.alive) { failures.push(`${race.id}: một kiếp chưa kết thúc sau ${MAX_TURNS} lượt (tuổi ${c.age})`); continue; }
      for (const e of c.log) if (/\{\w+\}/.test(e.text)) failures.push(`${race.id}: placeholder chưa thay "${e.text.slice(0, 60)}"`);
      clicks += c.clicks;
      ages += c.age;
      entries += c.log.length;
      if (c.job || c.pastJobs.length) withJob++;
      if (c.guild) withGuild++;
      quests += c.questsDone;
      if (c.spouse) married++;
      causes[c.causeKind]++;
    } catch (err) {
      failures.push(`${race.id}: lỗi khi chạy (${err.stack.split("\n").slice(0, 2).join(" ")})`);
      break;
    }
  }
  const pct = (n) => Math.round((n / LIVES) * 100);
  console.log(
    `  ${race.id.padEnd(11)} ${String(Math.round(ages / LIVES)).padStart(5)} ${String(Math.round(clicks / LIVES)).padStart(6)} ${(choicesSeen / LIVES).toFixed(1).padStart(9)} ${(entries / Math.max(1, clicks + choicesSeen)).toFixed(1).padStart(11)} ${String(pct(withJob)).padStart(6)} ${String(pct(withGuild)).padStart(5)} ${(quests / LIVES).toFixed(1).padStart(9)} ${String(pct(married)).padStart(6)}   ${pct(causes.old)}/${pct(causes.health)}/${pct(causes.violent)}/${pct(causes.event)}%`
  );
}

if (failures.length) {
  console.error(`\n✗ ${failures.length} kiểm tra thất bại:`);
  for (const f of failures.slice(0, 30)) console.error("  - " + f);
  process.exit(1);
}
console.log("\n✓ Mọi kiểm tra đều đạt.");
