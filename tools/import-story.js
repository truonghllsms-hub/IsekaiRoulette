// Copies a Gemini story script into content/scripts/<race>_story.txt and repairs what pasting breaks:
// lost line breaks, flag codes with Vietnamese letters or capitals, origin prefixes inside arc codes.
// Run: node tools/import-story.js <race> <file> [--append]
const fs = require("fs");
const path = require("path");
const { normalizeStory } = require("./story-normalize");
const [race, file, flag] = process.argv.slice(2);
const out = path.join(__dirname, "..", "content", "scripts", race + "_story.txt");
const de = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
let t = normalizeStory(fs.readFileSync(file, "utf8").replace(/\r/g, ""));
let fixed = 0;
// flag-like codes (lower_with_underscores) must be plain ASCII lower case
t = t.replace(/(?<![\p{L}\d_])[a-z][a-z0-9]*_[\p{L}\d_]*(?:[^\x00-\x7f]|[A-Z])[\p{L}\d_]*/gu, (m) => { fixed++; return de(m).toLowerCase(); });
// arc codes written as full origin ids ("minota_origin_maze", "vampir_bg_castle") would read as origins
const pre = t.match(/\(([a-z]+_(?:origin|bg)_)[a-z0-9_]+\)/);
if (pre) t = t.split(pre[1]).join("");
// Gemini's chatter between parts
t = t.split("\n").filter((l) => !/^(Chờ bạn gửi tiếp|Dưới đây là|Hãy gõ "viết tiếp"|Bạn có muốn)/.test(l.trim())).join("\n");
if (flag === "--append" && fs.existsSync(out)) t = fs.readFileSync(out, "utf8").replace(/\s*$/, "\n\n") + t;
fs.writeFileSync(out, t);
console.log(`${race}: ${t.split("\n").length} dòng, ${(t.match(/^\[[a-z_]+\]/gm) || []).length} nút, sửa ${fixed} mã dấu ấn${pre ? `, bỏ tiền tố "${pre[1]}"` : ""}`);
