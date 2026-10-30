// Parses a Gemini script (prompts/v2 format, plain text/markdown) into structured data.
// It understands: origins with parents, events (choices, locks, checks, effects), roles, hierarchy,
// focus "quiet year" lines, multi-scene raids/quests and companion status lines.
// Requirements written in "Khi nào" stay as raw text: the race pack adds them by hand (content/packs/<race>.meta.js).
// Run: node tools/script-parse.js content/scripts/goblin.txt > content/scripts/goblin.parsed.json
const fs = require("fs");

const STAT = { "sức mạnh": "STR", "trí tuệ": "INT", "nhanh nhẹn": "AGI", "may mắn": "LUCK", "sức khỏe": "health", "hạnh phúc": "joy", "tài sản": "wealth", "danh vọng": "fame" };
const DIFF = { "dễ": 1, "vừa": 2, "khó": 3, "rất khó": 4, "rất dễ": 0, "huyền thoại": 5 };

const clean = (s) =>
  s
    .replace(/\*\*/g, "")
    .replace(/^\s*[*\-•]\s+/, "")
    .replace(/^\s*\*\s*/, "")
    .replace(/[−–]/g, (m) => (m === "−" ? "-" : m))
    .trim();

// Top-level split by commas (ignores commas inside parentheses or quotes).
function splitTop(s) {
  const out = [];
  let depth = 0, q = false, cur = "";
  for (const ch of s) {
    if (ch === '"' || ch === "“" || ch === "”") q = !q;
    if (!q && ch === "(") depth++;
    if (!q && ch === ")") depth--;
    if (ch === "," && depth === 0 && !q) { out.push(cur); cur = ""; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim()).filter(Boolean);
}

// Last balanced (...) group at the end of a string: returns [before, inside] or null.
function tailGroup(s) {
  s = s.trim().replace(/\.$/, "").trim();
  if (!s.endsWith(")")) return null;
  let depth = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ")") depth++;
    else if (s[i] === "(") { depth--; if (depth === 0) return [s.slice(0, i).trim(), s.slice(i + 1, -1).trim()]; }
  }
  return null;
}

const EFFECT_WORDS = /(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|hạnh phúc|tài sản|danh vọng|dấu ấn|thân thiết|mất \{|có \{|thu nhận|chết|thắng ngay|thất bại ngay|chuyển sang cảnh|tiến hóa|thăng|giáng|bậc|điểm thăng|toàn bộ chỉ số|xóa truy nã|thu phục|chiến tranh)/i;

function parseEffects(str) {
  const eff = {}; const notes = [];
  const add = (k, v) => (eff[k] = (eff[k] || 0) + v);
  let deathNext = false;
  for (let tok of splitTop(str)) {
    const t = tok.replace(/\s+/g, " ").trim();
    const low = t.toLowerCase();
    let m;
    if (deathNext) { eff.death = t; deathNext = false; continue; }
    if (low === "chết") { eff.death = "Bạn chết."; deathNext = true; continue; }
    if ((m = low.match(/thăng bậc (goblin king|.+)$/)) && /thăng bậc/.test(low)) { eff.orgRankName = t.replace(/.*thăng bậc\s*/i, "").trim(); continue; }
    if ((m = low.match(/lên bậc (\d+)/))) { eff.orgRank = Number(m[1]) - 1; continue; }
    if (/thu phục được (.+)/.test(low)) { eff.flags = (eff.flags || []).concat("tamed_beast"); continue; }
    if (/xóa truy nã/.test(low)) { eff.clearBounty = true; continue; }
    if (/bùng nổ chiến tranh/.test(low)) { eff.era = "holy_war"; continue; }
    if (/^\(?(phải bỏ chạy|giữ mạng sống|nhưng phần thưởng|đứt chuỗi)/.test(low)) continue;
    if ((m = low.match(/^chết\s*[,(]?\s*(.*?)\)?$/)) && low.startsWith("chết")) { eff.death = tok.replace(/^chết\s*[,(]?\s*/i, "").replace(/\)$/, "").trim() || "Bạn chết."; continue; }
    if (/^thắng ngay/.test(low)) { eff.end = "win"; continue; }
    if (/^thất bại ngay/.test(low)) { eff.end = "fail"; continue; }
    if ((m = low.match(/chuyển sang cảnh (\d+)/))) { eff.next = Number(m[1]) - 1; continue; }
    if ((m = t.match(/dấu ấn\s+(.+)/i))) { const fl = [...m[1].matchAll(/["“]([a-z0-9_]+)["”]/g)].map((x) => x[1]); eff.flags = (eff.flags || []).concat(fl); continue; }
    if ((m = low.match(/^["“]([a-z0-9_]+)["”]$/))) { eff.flags = (eff.flags || []).concat(m[1]); continue; }
    if ((m = low.match(/thân thiết với \{(\w+)\}\s*([+-]\d+)/))) { if (m[1] === "ally") add("bond", Number(m[2])); else add("joy", Math.round(Number(m[2]) / 3)); continue; }
    if ((m = low.match(/toàn bộ chỉ số\s*([+-]\d+)/))) { for (const k of ["STR", "INT", "AGI", "LUCK"]) add(k, Number(m[1])); continue; }
    if ((m = low.match(/^\+?(\d+) điểm thăng bậc/))) { add("guildPts", Number(m[1])); continue; }
    if (/mất \{ally\}/.test(low)) { eff.allyDie = true; continue; }
    if (/mất \{child\}/.test(low)) { eff.loseChild = true; continue; }
    if (/có \{child\}/.test(low)) { eff.child = true; continue; }
    if (/có \{spouse\}/.test(low)) { eff.marry = true; continue; }
    if (/thu nhận \{ally\}/.test(low)) { eff.recruit = true; continue; }
    if ((m = t.match(/tiến hóa thành (.+)/i))) { eff.evolve = m[1].replace(/\*+/g, "").trim(); continue; }
    if (/giáng chức|mất chức|về bậc 1/.test(low) && !/^danh vọng|^sức khỏe/.test(low)) { eff.demote = true; continue; }
    if (/xóa truy nã/.test(low)) { notes.push(t); continue; }
    if ((m = low.match(/^(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|hạnh phúc|tài sản|danh vọng)\s*([+-]\s*\d+)/))) {
      add(STAT[m[1]], Number(m[2].replace(/\s/g, "")));
      const inner = tailGroup(t);
      if (inner && /giáng chức|về bậc 1/.test(inner[1].toLowerCase())) eff.demote = true;
      continue;
    }
    if (/^(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|hạnh phúc|tài sản|danh vọng)\s*(0|giữ nguyên|nguyên vẹn)/.test(low)) continue;
    if (/^(thắng lợi|thất bại)$/.test(low)) continue;
    notes.push(t);
  }
  return { eff, notes };
}

// "text → effects" or "text (effects)." → { text, eff, notes }
function splitOutcome(s) {
  s = clean(s);
  let text = s, effStr = "";
  const arrow = s.indexOf("→");
  if (arrow >= 0) { text = s.slice(0, arrow).trim(); effStr = s.slice(arrow + 1).trim(); }
  else {
    const g = tailGroup(s);
    if (g && EFFECT_WORDS.test(g[1])) { text = g[0]; effStr = g[1]; }
  }
  const { eff, notes } = parseEffects(effStr);
  return { text: text.replace(/\s+/g, " ").trim(), eff, notes };
}

function parseHead(rest) {
  // rest after the em dash in an option line
  const r = rest.toLowerCase();
  const out = {};
  let m;
  if ((m = r.match(/dựa vào ([^,]+),\s*(rất khó|rất dễ|khó|vừa|dễ|huyền thoại)/))) {
    const statName = m[1].split(" và ")[0].trim();
    out.check = { stat: STAT[statName] || statName, diff: DIFF[m[2]] };
  }
  if (/khóa nếu/.test(r)) out.lock = rest.replace(/.*?KHÓA nếu/i, "").trim();
  return out;
}

function parse(text) {
  const lines = text.split(/\r?\n/);
  const res = { origins: [], events: [], quests: [], roles: [], evolutions: [], hierarchy: [], focusQuiet: [], allyLines: { die: [], hurt: [], leave: [] }, warnings: [] };
  const idHead = /^(?:#+\s*)?(?:\d+\.\s*)?(?:\*\*)?(?:Sự kiện \d+:\s*)?(?:Cuộc cướp phá:\s*|Nhiệm vụ:\s*)?\[([a-z0-9_]+)\]\s*(.*?)(?:\*\*)?\s*$/i;
  let cur = null; // current block
  let opt = null; // current option
  let scene = null; // current quest scene
  let role = null;
  let focus = null;
  let allyMode = null;
  let inPromo = false, inQuiet = false;

  const flush = () => { cur = null; opt = null; scene = null; };

  for (let raw of lines) {
    const line = clean(raw);
    if (!line) continue;
    const lowRaw = raw.toLowerCase();

    // section switches that are not id blocks
    if (/^#+\s*\d+\.\s*[A-ZÀ-Ỹ ]+(\(.*\))?\s*$/.test(raw.trim()) && !/\[/.test(raw)) {
      const title = raw.replace(/^#+\s*\d+\.\s*/, "").trim();
      if (/^NHÁNH/.test(title)) {
        flush(); focus = null; role = { title, evo: true, raw: [] }; res.evolutions.push(role); continue;
      }
      if (/GOBLIN|RIDER|[A-Z]{4,}/.test(title) && !/BỚI|HỌC|KHỔ|PHỤC|ĐI CƯỚP|TRANH|TRỐN/.test(title)) {
        flush(); role = { title, ranks: [], promo: [], quiet: [], raw: [] }; res.roles.push(role); focus = null; continue;
      }
      flush(); role = null; focus = { title, quiet: [] }; res.focusQuiet.push(focus); continue;
    }
    // any other heading without an id closes the current role / focus section
    if (/^#/.test(raw.trim()) && !/\[/.test(raw)) { flush(); role = null; focus = null; allyMode = null; continue; }
    if (/^khi đồng đội chết/i.test(line)) { allyMode = "die"; flush(); continue; }
    if (/^khi đồng đội bị thương/i.test(line)) { allyMode = "hurt"; continue; }
    if (/^khi đồng đội bỏ đi/i.test(line)) { allyMode = "leave"; continue; }
    if (allyMode && /^["“]/.test(line)) { res.allyLines[allyMode].push(line.replace(/^["“]|["”]$/g, "")); continue; }
    if (allyMode && /^#/.test(raw.trim())) allyMode = null;

    // hierarchy lines: "Name (Bậc n): text"
    let hm = line.match(/^([^:]{2,60}?)\s*\(Bậc (\d+)\):\s*(.+)$/);
    if (hm) { flush(); role = null; res.hierarchy.push({ rank: Number(hm[2]), name: hm[1].trim(), text: hm[3].trim() }); continue; }

    // id block start
    const im = line.match(idHead);
    if (im && !/^\(?Đây chính là/i.test(line) && !/—\s*Cướp|—\s*Chặt|—\s*Xông|—\s*Cuộc/.test(line)) {
      const id = im[1];
      const title = im[2].replace(/\*+/g, "").trim();
      if (/_origin_/.test(id)) {
        const pm = title.match(/^(.*?)\s*—\s*(\d+)%/);
        cur = { type: "origin", id, name: pm ? pm[1].trim() : title, weight: pm ? Number(pm[2]) : 10 };
        res.origins.push(cur);
      } else if (/^[a-z]+_(raid|quest)_/.test(id)) {
        if (res.quests.some((q) => q.id === id)) { cur = res.quests.find((q) => q.id === id); continue; }
        cur = { type: "quest", id, name: title, steps: [] };
        res.quests.push(cur);
      } else {
        cur = { type: "event", id, title, choices: [] };
        if (role) cur[role.evo ? "evo" : "role"] = role.title;
        if (focus) cur.focusTitle = focus.title;
        res.events.push(cur);
      }
      opt = null; scene = null; inPromo = inQuiet = false;
      continue;
    }

    // role fields
    if (role && role.evo && !cur) {
      const m = line.match(/^Điều kiện:\s*(.+)/);
      if (m) role.require = m[1];
      continue;
    }
    if (role && !cur) {
      let m;
      if ((m = line.match(/^Điều kiện:\s*(.+)/))) { role.require = m[1]; continue; }
      if ((m = line.match(/^5 Bậc:\s*(.+)/))) { role.ranks = m[1].split("→").map((x) => x.replace(/\(Bậc \d+\)/, "").replace(/\.$/, "").trim()); continue; }
      if ((m = line.match(/^Câu mở đầu:\s*(.+)/))) { role.start = m[1]; continue; }
      if (/^Thử thách thăng bậc/.test(line)) { inPromo = true; inQuiet = false; continue; }
      if (/^Năm yên ả/.test(line)) { inQuiet = true; inPromo = false; continue; }
      if (inPromo && (m = line.match(/^\d+\.\s*(.+?)\s*\((rất khó|khó|vừa|dễ),\s*([^)]+)\)\.?$/i))) {
        role.promo.push({ text: m[1].trim(), diff: DIFF[m[2].toLowerCase()], stat: STAT[m[3].trim().toLowerCase()] || "STR" });
        continue;
      }
      if (inQuiet) { role.quiet.push(line); continue; }
      continue;
    }
    if (focus && !cur) {
      if (/^Năm yên ả/.test(line)) continue;
      const qm = line.match(/^\*?\((.*?)\)\*?\s*(.+)$/);
      if (qm) { focus.quiet.push({ when: qm[1], text: qm[2] }); continue; }
    }
    if (!cur) continue;

    // origin fields
    if (cur.type === "origin") {
      let m;
      if ((m = line.match(/^Đoạn mở đầu:\s*(.+)/))) cur.text = m[1];
      else if ((m = line.match(/^Cha:\s*(.+)/))) cur.father = m[1];
      else if ((m = line.match(/^Mẹ:\s*(.+)/))) cur.mother = m[1];
      else if ((m = line.match(/^Anh chị em:\s*(.+)/))) cur.siblings = m[1];
      else if ((m = line.match(/^Gia cảnh:\s*(.+)/))) cur.home = m[1];
      else if ((m = line.match(/^Ảnh hưởng:\s*(.+)/))) cur.effects = parseEffects(m[1]).eff;
      continue;
    }

    // quest fields
    if (cur.type === "quest") {
      let m;
      if ((m = line.match(/^Bậc tối thiểu:\s*Bậc (\d+)/))) { cur.minRank = Number(m[1]); continue; }
      if ((m = line.match(/^Thời đại:\s*(.+)/))) { cur.era = m[1]; continue; }
      if ((m = line.match(/^Gợi ý:\s*\*?(.+?)\*?$/))) { cur.hint = m[1].replace(/\*/g, "").trim(); continue; }
      if ((m = line.match(/^Đoạn mở đầu:\s*(.+)/))) { cur.intro = m[1]; continue; }
      if ((m = line.match(/^CẢNH (\d+):\s*(.+)/i))) { scene = { n: Number(m[1]), title: m[2].replace(/\*+/g, ""), choices: [] }; cur.steps.push(scene); opt = null; continue; }
      if ((m = line.match(/^Đoạn kết.*?:\s*(.+)/))) { cur.complete = m[1]; scene = null; continue; }
      if ((m = line.match(/^Phần thưởng:\s*(.+)/))) { cur.reward = parseEffects(m[1]); continue; }
      if ((m = line.match(/^Khoảnh khắc:\s*(.+)/))) { cur.moment = m[1]; continue; }
      if (scene) {
        if ((m = line.match(/^Tình huống:\s*(.+)/))) { scene.text = m[1]; continue; }
        if ((m = line.match(/^Hệ quả:\s*(.+)/))) { scene.auto = splitOutcome(m[1]); continue; }
        if (handleOption(line, scene)) continue;
      }
      continue;
    }

    // event fields
    let m;
    if ((m = line.match(/^Khi nào:\s*(.+)/))) { cur.when = m[1]; continue; }
    if ((m = line.match(/^Tình huống:\s*(.+)/))) { cur.text = m[1]; continue; }
    if ((m = line.match(/^Hệ quả:\s*(.+)/))) { cur.auto = splitOutcome(m[1]); continue; }
    if ((m = line.match(/^Khoảnh khắc:\s*(.+)/))) { cur.moment = m[1]; continue; }
    if (/^Hệ quả để lại/.test(line)) continue;
    handleOption(line, cur);
  }

  function handleOption(line, target) {
    let m;
    if ((m = line.match(/^([A-D])\.\s*["“](.+?)["”]\s*(?:—\s*(.*))?$/))) {
      const head = parseHead(m[3] || "");
      opt = { label: m[2].trim(), ...head };
      // inline outcome after the head, e.g. '— KHÓA nếu ... — text → effects'
      const tailText = (m[3] || "").split("—").slice(1).join("—").trim();
      if (!head.check && tailText) opt.plain = splitOutcome(tailText);
      target.choices.push(opt);
      return true;
    }
    if (!opt) return false;
    if ((m = line.match(/^Thành công:\s*(.+)/))) { opt.success = splitOutcome(m[1]); return true; }
    if ((m = line.match(/^Thất bại:\s*(.+)/))) { opt.fail = splitOutcome(m[1]); return true; }
    if (!opt.check && !opt.plain) { opt.plain = splitOutcome(line); return true; }
    return false;
  }

  return res;
}

module.exports = { parse, parseEffects, splitOutcome };

if (require.main === module) {
  const file = process.argv[2];
  process.stdout.write(JSON.stringify(parse(fs.readFileSync(file, "utf8")), null, 1));
}
