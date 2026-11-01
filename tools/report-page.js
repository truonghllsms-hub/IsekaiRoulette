// Builds docs/bao-cao.html: rates per race (from tools/stats-report.js --json), the list of pictures to draw
// (from the game data), and what is left to finish the game.
// Run: node tools/stats-report.js 1000 --json stats.json && node tools/report-page.js stats.json
const fs = require("fs");
const path = require("path");
const { loadData } = require("./load");

const stats = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const data = loadData();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1)).replace(".", ",");
const big = (n) => Math.round(n).toLocaleString("vi-VN");

// ---------- pictures ----------
const GENDERED = new Set(["human", "elf", "dwarf", "beastman", "demon", "vampire", "high_demon"]);
const IMMORTAL = new Set(["vampire", "high_demon"]);
const AGE_LABEL = {
  mortal: "Thơ ấu · Thiếu niên · Trưởng thành · Già",
  immortal: "Tân sinh · Trưởng thành · Cổ xưa",
  monster: "Non · Trưởng thành · Già",
  dragon: "Trứng · Ấu long · Cự long · Cổ long",
};
const pics = data.races.map((r) => {
  const jobs = data.jobs.filter((j) => j.races && j.races.includes(r.id));
  const forms = Object.keys(r.forms || {});
  const gendered = GENDERED.has(r.id);
  const g = gendered ? 2 : 1;
  const ageKind = r.id === "dragon" ? "dragon" : gendered ? (IMMORTAL.has(r.id) ? "immortal" : "mortal") : "monster";
  const ages = { mortal: 4, immortal: 3, monster: 3, dragon: 4 }[ageKind];
  const variants = r.id === "human" ? 3 : (r.subtypes || []).length || 1;
  const base = ages * g * variants;
  const jobPics = jobs.length * g;
  const formPics = forms.length * g;
  return {
    id: r.id, name: r.name, gendered, ages, ageKind, variants, variantNote: r.id === "human" ? "3 kiểu ngoại hình" : r.subtypes ? `${r.subtypes.length} dạng thú` : "—",
    jobs: jobs.length, forms, base, jobPics, formPics, total: base + jobPics + formPics,
  };
});
const EXTRA = [
  ["Đồng đội không có sẵn chân dung", "Familiar (người hầu của Vampire), Dragon Rider (kỵ sĩ rồng)", 2],
  ["Nhân vật cốt truyện", "Ma Vương, Dũng Giả, Thánh Nữ Lumina, Đại Ác Ma Baelgor, Necromancer Zeras, Nữ Giả Kim Elara, Cổ Long Đỉnh Hỏa Ngục, Goblin King đương nhiệm, Chân Tổ đời trước, Giáo hoàng Sanctus", 10],
  ["Nền thời đại", "Kỷ Nguyên Tăm Tối, Ma Vương Giáng Thế, Chiến Tranh Tuyến Đầu, Thời Bình", 4],
];
const picTotal = pics.reduce((s, p) => s + p.total, 0) + EXTRA.reduce((s, e) => s + e[2], 0);

// ---------- rates ----------
const rows = stats.rows;
const heat = (v) => `style="--h:${Math.min(100, Math.max(0, v))}"`;
const pctCell = (v) => `<td class="n heat" ${heat(v)}>${fmt(v)}%</td>`;
const deathBar = (r) => {
  const parts = [["old", r.deathOld, "già"], ["health", r.deathHealth, "kiệt sức khỏe"], ["violent", r.deathViolent, "bạo lực"], ["event", r.deathEvent, "sự kiện"]];
  return `<td class="death"><div class="bar" role="img" aria-label="${parts.map((p) => `${p[2]} ${fmt(p[1])}%`).join(", ")}">${parts.map((p) => `<span class="seg ${p[0]}" style="flex-basis:${p[1]}%"></span>`).join("")}</div><div class="death-n">${parts.map((p) => `<span class="${p[0]}">${Math.round(p[1])}</span>`).join("")}</div></td>`;
};
const ageTxt = (n) => (n >= 1000 ? big(n) : fmt(Math.round(n * 10) / 10));
const rateRows = rows.map((r) => {
  const forms = Object.entries(r.forms).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${esc(k)} ${fmt(v)}%`).join("<br>") || "—";
  return `<tr>
<th scope="row"><span class="race">${esc(r.name)}</span><span class="birth">${fmt(r.birth)}% đầu thai</span></th>
<td class="n">${esc(r.lifespan)}</td>
<td class="n">${ageTxt(r.ageAvg)}</td>
<td class="n">${ageTxt(r.ageMedian)}</td>
<td class="n">${fmt(r.clicks)}</td>
${pctCell(r.job)}${pctCell(r.jobMid)}${pctCell(r.jobTop)}
${pctCell(r.org)}${pctCell(r.orgTop)}
<td class="n">${fmt(r.quests)}</td>
${pctCell(r.evo)}<td class="forms">${forms}</td>
${pctCell(r.mate)}${pctCell(r.child)}<td class="n">${fmt(r.kidsAvg)}</td>
${pctCell(r.party)}${pctCell(r.allyDead)}${pctCell(r.betrayed)}${pctCell(r.orphan)}${pctCell(r.reachElder)}
${deathBar(r)}
</tr>`;
}).join("\n");

// ---------- story layer ----------
const nodeCount = (id) => data.events.filter((e) => e.arc && e.races && e.races.includes(id)).length;
const GROUP_WORD = { human: "tổ đội", elf: "tổ đội", dwarf: "tổ đội", beastman: "tổ đội", demon: "tiểu đội", vampire: "đoàn tùy tùng", dragon: "—", high_demon: "—" };
const storyRows = rows.map((r) => {
  const groupKind = GROUP_WORD[r.id] || "băng / bầy";
  const noGroup = groupKind === "—";
  const hasOwn = ["human", "elf", "dwarf", "beastman", "demon", "vampire"].includes(r.id);
  const hasMinion = r.minion > 0;
  return `<tr>
<th scope="row"><span class="race">${esc(r.name)}</span><span class="birth">${fmt(r.birth)}% đầu thai</span></th>
<td class="n">${nodeCount(r.id)}</td>
${pctCell(r.story)}${pctCell(r.arcEnd)}${pctCell(r.cast)}
<td>${esc(groupKind)}</td>
${noGroup ? '<td class="n">—</td>' : pctCell(r.group)}
${hasOwn ? pctCell(r.ownGroup) : '<td class="n">—</td>'}
${hasMinion ? pctCell(r.minion) : '<td class="n">—</td>'}
</tr>`;
}).join("\n");
const totalNodes = data.events.filter((e) => e.arc).length;

const top = (k, n = 2) => rows.slice().sort((a, b) => b[k] - a[k]).slice(0, n);
const beast = rows.find((r) => r.id === "beastman");
const kinRows = Object.entries(beast.subtypes).sort((a, b) => b[1] - a[1]).map(([k, v]) => `<li><span>${esc(k.replace("tộc ", ""))}</span><span class="n">${fmt(v)}%</span></li>`).join("");

const picRows = pics.map((p) => `<tr>
<th scope="row"><span class="race">${esc(p.name)}</span><span class="birth">${p.gendered ? "có trí tuệ · nam và nữ" : "ma vật · một giới"}</span></th>
<td>${esc(AGE_LABEL[p.ageKind])}</td>
<td class="n">${p.variantNote}</td>
<td class="n">${p.base}</td>
<td class="n">${p.jobs} nghề → ${p.jobPics}</td>
<td class="n">${p.forms.length ? `${p.forms.length} dạng → ${p.formPics}` : "—"}</td>
<td class="n total">${p.total}</td>
</tr>`).join("\n");
const sum = (k) => pics.reduce((s, p) => s + p[k], 0);

const TODO = [
  ["Nội dung", [
    ["Cao", "Chơi thử tay mỗi tộc vài đời, ghi lại chỗ lời kể vô lý hoặc lặp. Kịch bản v3 còn vài câu điều kiện viết thẳng vào lời kể (ví dụ “Nếu bạn đã tự do…” ở Dragon)."],
    ["Vừa", "Viết thêm câu kể theo quãng nhiều năm cho từng việc chính của mỗi tộc, để những năm yên ả đọc mượt hơn (hiện ghép từ câu một năm của kịch bản cũ)."],
    ["Vừa", "Chốt quy ước tên nghề: chỗ dùng Hán Việt (Kiếm sĩ, Thánh Kỵ Sĩ), chỗ dùng tiếng Anh (Rune Smith, Night Blade)."],
    ["Thấp", "Đổi tên “Metal Slime” (thuật ngữ của Dragon Quest) nếu muốn tránh trùng thương hiệu."],
  ]],
  ["Cân bằng (theo bảng tỉ lệ)", [
    ["Cao", "Đạt bậc nghề cao nhất chỉ 0–24% số đời: cân nhắc giảm kinh nghiệm cần để thăng bậc hoặc hạ độ khó thử thách."],
    ["Vừa", "Goblin, Kobold, Imp đi đến kết mạch xuất thân 14–38%: có thể rút mạch còn 3 nút hoặc dồn sớm hơn."],
    ["Vừa", "Lizardman chết sớm (tuổi TB khoảng 28): kịch bản có nhiều kết cục CHẾT nhất trong các tộc."],
    ["Vừa", "Demon, Elf, Vampire gặp sự kiện phản bội trên 45% số đời. Xem lại nếu thấy quá dày."],
  ]],
  ["Engine", [
    ["Vừa", "Đồng đội trở thành bạn đời: hiện tạo bạn đời mới thay vì chuyển đúng người trong tổ đội."],
    ["Vừa", "Lưu đời đang chơi dở để quay lại sau; hiện chỉ lưu danh sách các kiếp đã kết thúc."],
    ["Thấp", "Bộ sưu tập: các tộc, dạng thú, tiến hóa, nghề, tổ đội đã từng gia nhập; thành tựu cho người chơi lâu dài."],
  ]],
  ["Hình ảnh", [
    ["Cao", "Chốt phong cách bằng prompt thử của Goblin, rồi viết prompt cho các tộc còn lại theo bảng ảnh."],
    ["Vừa", "Chân dung thành viên các tổ đội và băng có sẵn (khoảng 3–4 người × 5–6 nhóm × 17 tộc), có thể làm sau."],
    ["Vừa", "Ghép lớp trong game: thân theo tộc/tuổi/giới + trang phục nghề, để không phải vẽ mọi tổ hợp."],
  ]],
  ["Kiểm thử và phát hành", [
    ["Cao", "Đẩy mã lên GitHub: hiện mọi commit chỉ nằm trên máy ảo và sẽ mất nếu máy bị thu hồi."],
    ["Vừa", "Chọn nơi đăng (GitHub Pages hoặc itch.io) và mở chia sẻ trang chơi (hiện đang riêng tư)."],
  ]],
];
const todoHtml = TODO.map(([group, items]) => `<section class="todo-group"><h3>${esc(group)}</h3><ul>${items.map(([p, t]) => `<li><span class="prio p-${p === "Cao" ? "hi" : p === "Vừa" ? "mid" : "lo"}">${p}</span><span>${esc(t)}</span></li>`).join("")}</ul></section>`).join("\n");

const totalEvents = data.events.length;
const html = `<title>Sổ Cái Luân Hồi</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alegreya+SC:wght@500;700&family=Be+Vietnam+Pro:wght@400;500;600&display=swap">
<style>
/* Layout: a ledger. One column of sections; the two big tables scroll sideways in their own frames with the race column pinned. */
:root {
  --bg: #eef0f4; --surface: #ffffff; --ink: #1c2130; --muted: #5a6274; --line: #d6dae3;
  --accent: #0e6f68; --gold: #a46a12;
  --old: #4f8a5b; --health: #c58a1d; --violent: #b4473d; --event: #6b56b8;
  --display: "Alegreya SC", "Palatino Linotype", Georgia, serif;
  --body: "Be Vietnam Pro", "Segoe UI", system-ui, sans-serif;
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {
  --bg: #11141b; --surface: #191d27; --ink: #e5e8f0; --muted: #9aa2b4; --line: #2b3140;
  --accent: #3cc7b8; --gold: #e2b357;
  --old: #6fb67d; --health: #e0a43a; --violent: #e06a5e; --event: #9d88ec; color-scheme: dark } }
:root[data-theme="dark"] {
  --bg: #11141b; --surface: #191d27; --ink: #e5e8f0; --muted: #9aa2b4; --line: #2b3140;
  --accent: #3cc7b8; --gold: #e2b357;
  --old: #6fb67d; --health: #e0a43a; --violent: #e06a5e; --event: #9d88ec; color-scheme: dark }
body { background: var(--bg); color: var(--ink); font: 15px/1.6 var(--body); }
main { max-width: 1180px; margin: 0 auto; padding-block: 40px 64px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); display: grid; gap: 48px; }
header { display: grid; gap: 10px; max-width: 70ch; }
.kicker { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
h1 { font: 700 clamp(30px, 5vw, 46px)/1.1 var(--display); margin: 0; text-wrap: balance; }
h2 { font: 700 26px/1.2 var(--display); margin: 0; text-wrap: balance; }
h3 { font-size: 15px; margin: 0; }
p { margin: 0; }
.lede { color: var(--muted); }
section.block { display: grid; gap: 16px; min-width: 0; }
.block > .intro { max-width: 72ch; display: grid; gap: 8px; color: var(--muted); }
.facts { display: flex; flex-wrap: wrap; gap: 8px 24px; font-variant-numeric: tabular-nums; }
.facts b { font: 700 22px/1 var(--display); color: var(--ink); margin-right: 6px; }
.frame { overflow-x: auto; background: var(--surface); border: 1px solid var(--line); border-radius: 6px; }
table { border-collapse: separate; border-spacing: 0; font-variant-numeric: tabular-nums; font-size: 13.5px; width: max-content; min-width: 100%; }
th, td { padding: 8px 10px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
thead th { font-size: 11.5px; font-weight: 600; color: var(--muted); letter-spacing: .03em; background: var(--surface); position: sticky; top: 0; z-index: 2; }
thead tr.group th { text-transform: uppercase; letter-spacing: .1em; font-size: 10.5px; color: var(--accent); border-bottom: 0; padding-bottom: 0; }
tbody th { position: sticky; left: 0; background: var(--surface); z-index: 1; min-width: 132px; box-shadow: 1px 0 0 var(--line); }
thead th:first-child { left: 0; z-index: 3; }
tbody tr:last-child > * { border-bottom: 0; }
.race { display: block; font-weight: 600; }
.birth { display: block; font-size: 11.5px; color: var(--muted); font-weight: 400; }
td.n { text-align: right; white-space: nowrap; }
td.heat { background: color-mix(in srgb, var(--accent) calc(var(--h) * 0.32%), transparent); }
td.forms { font-size: 12px; color: var(--muted); min-width: 150px; }
td.death { min-width: 170px; }
.bar { display: flex; height: 10px; border-radius: 3px; overflow: hidden; background: var(--line); }
.seg { display: block; flex-grow: 0; flex-shrink: 0; }
.seg.old, .legend .old::before { background: var(--old); }
.seg.health, .legend .health::before { background: var(--health); }
.seg.violent, .legend .violent::before { background: var(--violent); }
.seg.event, .legend .event::before { background: var(--event); }
.death-n { display: flex; justify-content: space-between; font-size: 11px; margin-top: 3px; }
.death-n .old { color: var(--old); } .death-n .health { color: var(--health); } .death-n .violent { color: var(--violent); } .death-n .event { color: var(--event); }
.legend { display: flex; flex-wrap: wrap; gap: 6px 18px; font-size: 12.5px; color: var(--muted); }
.legend span::before { content: ""; display: inline-block; width: 10px; height: 10px; border-radius: 2px; margin-right: 6px; vertical-align: -1px; }
.notes { display: grid; gap: 6px; font-size: 13.5px; color: var(--muted); max-width: 80ch; padding-left: 18px; margin: 0; }
.two { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: start; }
.two > * { min-width: 0; }
.kins { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 4px 16px; font-variant-numeric: tabular-nums; }
.kins li { display: flex; justify-content: space-between; border-bottom: 1px dotted var(--line); padding: 3px 0; }
td.total { font-weight: 600; color: var(--accent); }
tfoot td, tfoot th { font-weight: 600; border-top: 2px solid var(--line); border-bottom: 0; background: var(--surface); }
.grand { font: 700 40px/1 var(--display); color: var(--gold); }
.extra { display: grid; gap: 10px; }
.grand-box, .two > div.block { display: grid; gap: 8px; align-content: start; }
.extra div { display: grid; grid-template-columns: 1fr auto; gap: 4px 16px; padding-bottom: 10px; border-bottom: 1px solid var(--line); }
.extra small { grid-column: 1 / -1; color: var(--muted); }
.todo { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px 32px; }
.todo-group { display: grid; gap: 10px; align-content: start; min-width: 0; }
.todo-group h3 { font: 700 18px/1.2 var(--display); }
.todo-group ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.todo-group li { display: grid; grid-template-columns: 44px 1fr; gap: 10px; font-size: 14px; }
.prio { font-size: 11px; font-weight: 600; text-align: center; border-radius: 3px; padding: 2px 0; height: fit-content; border: 1px solid currentColor; }
.p-hi { color: var(--violent); } .p-mid { color: var(--health); } .p-lo { color: var(--muted); }
footer { font-size: 12.5px; color: var(--muted); max-width: 80ch; }
code { font-size: 12.5px; }
</style>
<main>
<header>
  <span class="kicker">Luân Hồi Dị Giới · số liệu sau khi nhập mạch truyện v3 cho 17 tộc</span>
  <h1>Sổ Cái Luân Hồi</h1>
  <p class="lede">Mỗi tộc được chơi tự động ${big(stats.lives)} đời với lựa chọn ngẫu nhiên, như một người chơi bấm bừa. Người chơi chủ động (đi làm, tìm thăng tiến, tìm tiến hóa) sẽ có tỉ lệ thăng tiến và tiến hóa cao hơn các con số dưới đây.</p>
  <div class="facts"><span><b>17</b>tộc</span><span><b>${big(totalEvents)}</b>sự kiện</span><span><b>${data.origins.length}</b>xuất thân</span><span><b>${data.jobs.filter((j) => j.races).length}</b>nghề và vai trò</span><span><b>${data.quests.length}</b>nhiệm vụ</span></div>
</header>

<section class="block" id="ti-le">
  <h2>Tỉ lệ theo tộc</h2>
  <div class="intro"><p>Tuổi tính theo năm của tộc đó. “Đạt bậc cao nhất” là bậc 5 của nghề, hoặc bậc trên cùng của tổ chức (hạng S, Goblin King, Chân Tổ…). Ô càng đậm màu, tỉ lệ càng cao.</p></div>
  <div class="frame"><table>
    <thead>
      <tr class="group"><th></th><th colspan="4">Tuổi đời</th><th colspan="3">Nghề</th><th colspan="3">Tổ chức</th><th colspan="2">Tiến hóa</th><th colspan="3">Gia đình</th><th colspan="5">Đồng đội và biến cố</th><th>Nguyên nhân chết</th></tr>
      <tr><th>Tộc</th><th>Tuổi thọ</th><th>Tuổi chết TB</th><th>Trung vị</th><th>Lượt bấm</th>
      <th>Có nghề</th><th>Bậc 3+</th><th>Bậc cao nhất</th>
      <th>Gia nhập</th><th>Bậc cao nhất</th><th>Nhiệm vụ/đời</th>
      <th>Tiến hóa</th><th>Theo nhánh</th>
      <th>Có bạn đời</th><th>Có con</th><th>Số con TB</th>
      <th>Có đồng đội</th><th>Đồng đội chết</th><th>Bị phản bội</th><th>Mồ côi trước khi lớn</th><th>Sống tới tuổi già</th>
      <th>già · sức khỏe · bạo lực · sự kiện (%)</th></tr>
    </thead>
    <tbody>
${rateRows}
    </tbody>
  </table></div>
  <div class="legend"><span class="old">Chết già (hết tuổi thọ)</span><span class="health">Kiệt sức khỏe (gồm suy kiệt tuổi già, bệnh, thương tích)</span><span class="violent">Bạo lực ngẫu nhiên trong năm</span><span class="event">Chết trong một sự kiện hay nhiệm vụ</span></div>
  <ul class="notes">
    <li>“Bị phản bội”: đồng đội bỏ đi, hoặc gặp sự kiện có kẻ phản bội, bán đứng, đâm sau lưng nhân vật.</li>
    <li>“Mồ côi trước khi lớn”: cả cha và mẹ (đã biết) đều mất trước giai đoạn trưởng thành của tộc.</li>
    <li>Human, Elf, Dwarf, Beastman chỉ vào Guild Bình Minh khi chọn Mạo hiểm; các tộc còn lại sinh ra đã thuộc tổ chức của mình.</li>
  </ul>
  <div class="two">
    <div class="block"><h3>Beastman theo dạng thú</h3><ul class="kins">${kinRows}</ul></div>
    <div class="block"><h3>Đọc nhanh</h3><ul class="notes">
      <li>Đời nhiều lựa chọn nhất: Human (khoảng ${fmt(rows.find((r) => r.id === "human").clicks)} lượt bấm), ít nhất: Goblin và Kobold (khoảng ${fmt(Math.round((rows.find((r) => r.id === "goblin").clicks + rows.find((r) => r.id === "kobold").clicks) / 2))}).</li>
      <li>Tiến hóa nhiều nhất: ${top("evo").map((r) => `${esc(r.name)} (${fmt(r.evo)}%)`).join(", ")}. Human, Elf, Dwarf, Beastman, Demon không có nhánh tiến hóa trong kịch bản.</li>
      <li>Dễ mồ côi nhất: ${top("orphan").map((r) => `${esc(r.name)} (${fmt(r.orphan)}%)`).join(", ")}.</li>
      <li>Mạch truyện chiếm nhiều nhất: ${top("story").map((r) => `${esc(r.name)} (${fmt(r.story)}%)`).join(", ")}; đi đến kết mạch nhiều nhất: ${top("arcEnd").map((r) => `${esc(r.name)} (${fmt(r.arcEnd)}%)`).join(", ")}.</li>
    </ul></div>
  </div>
</section>

<section class="block" id="mach-truyen">
  <h2>Mạch truyện</h2>
  <div class="intro"><p>Lớp cốt truyện v3: dàn nhân vật đi cùng suốt đời (kẻ thù, người dẫn dắt, tri kỷ), mạch theo xuất thân, băng nhóm hoặc tổ đội có sẵn, thuộc hạ. Tổng cộng ${big(totalNodes)} nút truyện. Cùng ${big(stats.lives)} đời mỗi tộc như bảng trên.</p></div>
  <div class="frame"><table>
    <thead>
      <tr><th>Tộc</th><th>Nút truyện</th><th>Sự kiện thuộc mạch</th><th>Đi đến kết mạch xuất thân</th><th>Gặp dàn nhân vật</th><th>Kiểu nhóm</th><th>Vào nhóm có sẵn</th><th>Tự lập nhóm</th><th>Có thuộc hạ</th></tr>
    </thead>
    <tbody>
${storyRows}
    </tbody>
  </table></div>
  <ul class="notes">
    <li>“Sự kiện thuộc mạch”: phần trăm sự kiện trong một đời đến từ mạch truyện, phần còn lại là sự kiện rời của kịch bản cũ.</li>
    <li>“Đi đến kết mạch xuất thân”: nhân vật sống tới nút cuối của mạch xuất thân và chọn một kết. Tộc đời ngắn (Goblin, Kobold, Imp) thấp vì phần lớn chết trước.</li>
    <li>Beastman vào tổ đội thấp hơn vì mỗi tổ đội chỉ nhận người có đúng xuất thân.</li>
  </ul>
</section>

<section class="block" id="anh">
  <h2>Ảnh cần vẽ</h2>
  <div class="intro">
    <p>Chân dung pixel 64×64. Tộc có trí tuệ vẽ riêng nam và nữ; ma vật vẽ một giới. Human chiếm 33% số lần đầu thai nên có 3 kiểu ngoại hình mỗi giới; Beastman vẽ đủ 9 dạng thú.</p>
    <p>Trang phục nghề vẽ ở tuổi trưởng thành và ghép lên thân theo tộc, nên không cần vẽ mọi tổ hợp tuổi × nghề.</p>
  </div>
  <div class="frame"><table>
    <thead><tr><th>Tộc</th><th>Giai đoạn đời được vẽ</th><th>Biến thể</th><th>Chân dung gốc</th><th>Trang phục nghề</th><th>Tiến hóa</th><th>Tổng</th></tr></thead>
    <tbody>
${picRows}
    </tbody>
    <tfoot><tr><th>Cộng 17 tộc</th><td></td><td></td><td class="n">${sum("base")}</td><td class="n">${sum("jobPics")}</td><td class="n">${sum("formPics")}</td><td class="n total">${sum("total")}</td></tr></tfoot>
  </table></div>
  <div class="two">
    <div class="extra">${EXTRA.map(([a, b, n]) => `<div><strong>${esc(a)}</strong><span class="n">${n}</span><small>${esc(b)}</small></div>`).join("")}</div>
    <div class="grand-box"><span class="kicker">Tổng số ảnh</span><span class="grand">${picTotal}</span><p class="lede">Với 2 tài khoản Gemini Pro, mỗi ngày làm khoảng 40–60 ảnh đạt yêu cầu thì cần khoảng ${Math.ceil(picTotal / 50)} ngày. Nên làm theo thứ tự tỉ lệ đầu thai: Human, Beastman, Dwarf, rồi Elf và Demon.</p></div>
  </div>
</section>

<section class="block" id="viec-can-lam">
  <h2>Việc cần làm để hoàn thiện</h2>
  <div class="todo">
${todoHtml}
  </div>
</section>

<footer>Số liệu sinh bằng <code>node tools/stats-report.js ${stats.lives} --json</code> và <code>node tools/report-page.js</code> trong mã nguồn game; chạy lại sau mỗi lần cân bằng để cập nhật trang này.</footer>
</main>
`;
const out = path.join(__dirname, "..", "docs", "bao-cao.html");
fs.writeFileSync(out, html);
console.log("Đã ghi " + out + " · ảnh: " + picTotal);
