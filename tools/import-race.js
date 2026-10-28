// Imports Gemini's multi-part answer to a race prompt (prompts/race/<race>.md).
// Run: node tools/import-race.js <answer-file> <raceId>
// The answer file can hold every part pasted one after another, with or without ```json fences
// and the "CÒN TIẾP"/"HẾT" lines. Events go to data/events/<race>_gen.json; origins, deaths and
// names go into content/races/<race>.json. If anything fails validation, nothing is changed.
const fs = require("fs");
const path = require("path");
const { loadData } = require("./load");
const { validate } = require("./validate");

const ROOT = path.join(__dirname, "..");
const [src, raceId] = process.argv.slice(2);
if (!src || !raceId) {
  console.error("Cách dùng: node tools/import-race.js <file trả lời của Gemini> <id tộc>");
  process.exit(2);
}

// Pull every top-level JSON object/array out of free text.
function jsonBlocks(text) {
  const out = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch !== "{" && ch !== "[") { i++; continue; }
    let depth = 0, j = i, inStr = false;
    for (; j < text.length; j++) {
      const c = text[j];
      if (inStr) { if (c === "\\") j++; else if (c === '"') inStr = false; continue; }
      if (c === '"') inStr = true;
      else if (c === "{" || c === "[") depth++;
      else if (c === "}" || c === "]") { depth--; if (depth === 0) break; }
    }
    try { out.push(JSON.parse(text.slice(i, j + 1))); i = j + 1; } catch (e) { i++; }
  }
  return out;
}

const blocks = jsonBlocks(fs.readFileSync(src, "utf8").replace(/^﻿/, ""));
const got = { events: [], origins: [], deaths: [], names: null, parts: [] };
for (const b of blocks) {
  if (Array.isArray(b)) { got.events.push(...b); continue; }
  if (b.part) got.parts.push(b.part);
  got.events.push(...(b.events || []));
  got.origins.push(...(b.origins || []));
  got.deaths.push(...(b.deaths || []));
  if (b.names && Object.values(b.names).some((v) => v && v.length)) got.names = b.names;
  if (typeof b.desc === "string" && b.desc.trim()) got.desc = b.desc.trim();
}
if (!got.events.length && !got.origins.length) {
  console.error("✗ Không tìm thấy JSON nào dùng được trong file.");
  process.exit(1);
}

const evFile = path.join(ROOT, "data", "events", `${raceId}_gen.json`);
const profFile = path.join(ROOT, "content", "races", `${raceId}.json`);
const backup = {};
for (const f of [evFile, profFile]) backup[f] = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null;

// Merge by id so re-importing the same part replaces instead of duplicating.
const byId = (list, add) => {
  const m = new Map(list.map((x) => [x.id, x]));
  for (const x of add) m.set(x.id, x);
  return [...m.values()];
};
const events = byId(backup[evFile] ? JSON.parse(backup[evFile]) : [], got.events);
const profile = backup[profFile] ? JSON.parse(backup[profFile]) : { id: raceId, origins: [], deaths: [] };
profile.origins = byId(profile.origins || [], got.origins);
profile.deaths = byId(profile.deaths || [], got.deaths);
if (got.names) {
  if (profile.names) console.log("ℹ Bỏ qua \"names\": tộc này đã có bộ tên.");
  else if (JSON.stringify(got.names.male) === JSON.stringify(got.names.female)) console.log("ℹ Bỏ qua \"names\": tên nam và nữ giống hệt nhau.");
  else profile.names = got.names;
}
if (got.desc) profile.desc = got.desc;

fs.mkdirSync(path.dirname(profFile), { recursive: true });
fs.writeFileSync(evFile, JSON.stringify(events, null, 2) + "\n", "utf8");
fs.writeFileSync(profFile, JSON.stringify(profile, null, 2) + "\n", "utf8");

let errors;
try { errors = validate(loadData()); } catch (e) { errors = [e.message]; }
if (errors.length) {
  for (const f of Object.keys(backup)) backup[f] === null ? fs.unlinkSync(f) : fs.writeFileSync(f, backup[f], "utf8");
  console.error(`✗ ${errors.length} lỗi, đã hoàn tác, chưa nhập gì:`);
  for (const e of errors.slice(0, 40)) console.error("  - " + e);
  process.exit(1);
}
const choices = got.events.filter((e) => e.choices).length;
console.log(
  `✓ ${raceId}: nhận ${got.parts.length || blocks.length} phần — ${got.events.length - choices} sự kiện, ${choices} cảnh lựa chọn, ` +
    `${got.origins.length} xuất thân, ${got.deaths.length} cái chết${got.names ? ", bộ tên" : ""}.`
);
