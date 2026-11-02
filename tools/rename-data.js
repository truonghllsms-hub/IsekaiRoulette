// One pass over the hand-written data files: guild names and the races' name lists in English
// (content/english-names.js). Safe to run again.
//   node tools/rename-data.js
const fs = require("fs");
const path = require("path");
const EN = require("../content/english-names");
const { englishData } = require("./english-names");
const ROOT = path.join(__dirname, "..");

const files = [
  ...fs.readdirSync(path.join(ROOT, "data")).filter((f) => f.endsWith(".json")).map((f) => path.join("data", f)),
  ...fs.readdirSync(path.join(ROOT, "data", "events")).filter((f) => f.endsWith(".json")).map((f) => path.join("data", "events", f)),
];
let changed = 0;
for (const f of files) {
  const full = path.join(ROOT, f);
  const raw = fs.readFileSync(full, "utf8");
  const out = JSON.stringify(englishData(JSON.parse(raw)), null, raw.includes('\n "') ? 1 : 2);
  if (JSON.stringify(JSON.parse(raw)) !== JSON.stringify(JSON.parse(out))) { fs.writeFileSync(full, out + "\n", "utf8"); changed++; console.log("  " + f); }
}
// name lists: data/names.json and each race profile
const fixList = (L) => L.map((n) => EN.family[n] || n);
const fixNames = (names) => { for (const v of Object.values(names)) for (const k of Object.keys(v)) if (Array.isArray(v[k])) v[k] = fixList(v[k]); return names; };
const nf = path.join(ROOT, "data", "names.json");
fs.writeFileSync(nf, JSON.stringify(fixNames(JSON.parse(fs.readFileSync(nf, "utf8"))), null, 2) + "\n", "utf8");
for (const f of fs.readdirSync(path.join(ROOT, "content", "races"))) {
  const full = path.join(ROOT, "content", "races", f);
  const p = JSON.parse(fs.readFileSync(full, "utf8"));
  if (!p.names) continue;
  for (const k of Object.keys(p.names)) if (Array.isArray(p.names[k])) p.names[k] = fixList(p.names[k]);
  fs.writeFileSync(full, JSON.stringify(p, null, 2) + "\n", "utf8");
}
console.log(`Đã đổi ${changed} file dữ liệu và các danh sách tên.`);
