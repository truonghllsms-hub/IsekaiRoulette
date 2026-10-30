// Parses a Gemini script (prompts/v2 format, plain text or markdown) into structured data.
// Scripts differ a lot in layout (headings or not, "CẢNH 2:", "Cảnh 2/3:", scenes as [ids]...), so the
// parser reads each line for what it MEANS rather than how it is decorated:
//   [id] lines open a block; "Key: value" lines fill it; "A. "label" — ..." lines are choices.
// Origins, events, quests (with scenes), roles, hierarchy, focus quiet lines and companion lines come out.
// Requirements in "Khi nào" stay as text; tools/build-pack.js turns them into conditions.
// Run: node tools/script-parse.js content/scripts/goblin.txt > /tmp/goblin.parsed.json
const fs = require("fs");

const STAT = { "sức mạnh": "STR", "trí tuệ": "INT", "nhanh nhẹn": "AGI", "may mắn": "LUCK", "sức khỏe": "health", "hạnh phúc": "joy", "tài sản": "wealth", "danh vọng": "fame" };
const DIFF = { "rất dễ": 0, "dễ": 1, "vừa": 2, "trung bình": 2, "khó": 3, "rất khó": 4, "huyền thoại": 5, "cực khó": 4 };
const STAT_RE = "(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|hạnh phúc|tài sản|danh vọng)";

const strip = (s) =>
  s
    .replace(/\*\*/g, "")
    .replace(/^\s*#+\s*/, "")
    .replace(/^\s*[*\-•]\s+/, "")
    .replace(/^\s*\*\s*/, "")
    .replace(/\*\s*$/, "")
    .replace(/−/g, "-")
    .trim();

// Top-level split by commas (ignores commas inside parentheses or quotes).
function splitTop(s) {
  const out = [];
  let depth = 0, q = false, cur = "";
  for (const ch of s) {
    if (ch === '"' || ch === "“" || ch === "”") q = !q;
    if (!q && ch === "(") depth++;
    if (!q && ch === ")") depth--;
    if ((ch === "," || ch === ";") && depth === 0 && !q) { out.push(cur); cur = ""; } else cur += ch;
  }
  if (cur.trim()) out.push(cur);
  return out.map((x) => x.trim().replace(/\.$/, "").trim()).filter(Boolean);
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

const EFFECT_WORDS = new RegExp(`(${STAT_RE.slice(1, -1)}|dấu ấn|thân thiết|mất \\{|có \\{|tìm được|thu nhận|chết|thắng ngay|thất bại ngay|chuyển sang cảnh|đi tiếp cảnh|tiến hóa|đổi dạng|thăng|giáng|bậc|điểm thăng|toàn bộ chỉ số|xóa truy nã|thu phục|chiến tranh|mất vai trò|ác danh)`, "i");

function parseEffects(str) {
  const eff = {}; const notes = [];
  const add = (k, v) => (eff[k] = (eff[k] || 0) + v);
  let deathNext = false;
  for (const tok of splitTop(str || "")) {
    const t = tok.replace(/\s+/g, " ").trim();
    const low = t.toLowerCase();
    let m;
    if (deathNext) { eff.death = t; deathNext = false; continue; }
    if (low === "chết") { eff.death = "Bạn chết."; deathNext = true; continue; }
    if (/^chết\b/.test(low)) { eff.death = t.replace(/^chết\s*[,(:-]?\s*/i, "").replace(/\)$/, "").trim() || "Bạn chết."; continue; }
    if (/^thắng ngay/.test(low)) { eff.end = "win"; continue; }
    if (/^thất bại ngay/.test(low)) { eff.end = "fail"; continue; }
    if ((m = low.match(/(?:chuyển sang|đi tiếp|sang) cảnh (\d+)/))) { eff.next = Number(m[1]) - 1; continue; }
    if ((m = t.match(/dấu ấn\s*:?\s*(.+)/i))) { const fl = [...m[1].replace(/\([^)]*\)/g, "").matchAll(/(?<![A-Za-zÀ-ỹ0-9_])["“]?([a-z][a-z0-9_]+)["”]?(?![A-Za-zÀ-ỹ])/g)].map((x) => x[1]).filter((x) => x.includes("_") || /^[a-z]+$/.test(x)); eff.flags = (eff.flags || []).concat(fl); continue; }
    if ((m = low.match(/^["“]([a-z0-9_]+)["”]$/))) { eff.flags = (eff.flags || []).concat(m[1]); continue; }
    if ((m = low.match(/thân thiết với \{(\w+)\}\s*([+-]\s*\d+)/))) { const v = Number(m[2].replace(/\s/g, "")); if (m[1] === "ally") add("bond", v); else add("joy", Math.round(v / 3)); continue; }
    if ((m = low.match(/toàn bộ chỉ số\s*([+-]\d+)/))) { for (const k of ["STR", "INT", "AGI", "LUCK"]) add(k, Number(m[1])); continue; }
    if ((m = low.match(/điểm thăng bậc\s*(tối đa|[+-]?\s*\d+)/)) || (m = low.match(/^\+?(\d+) điểm thăng bậc/))) { add("guildPts", m[1] === "tối đa" ? 999 : Number(String(m[1]).replace(/\s/g, ""))); continue; }
    if (/mất (đồng đội )?\{ally\}/.test(low)) { eff.allyDie = true; continue; }
    if (/mất \{child\}/.test(low)) { eff.loseChild = true; continue; }
    if (/có \{child\}|sinh (ra )?\{child\}/.test(low)) { eff.child = true; continue; }
    if (/(có|tìm được|cưới|kết đôi với) \{spouse\}|\{ally\} trở thành \{spouse\}/.test(low)) { eff.marry = true; continue; }
    if (/\{spouse\} (biến thành|trở thành) \{ally\}/.test(low)) { eff.recruit = true; continue; }
    if (/thu nhận \{ally\}|\{ally\} gia nhập/.test(low)) { eff.recruit = true; continue; }
    if ((m = t.match(/(?:tiến hóa thành|đổi dạng thành)\s+(.+)/i))) { eff.evolve = m[1].replace(/\*+|!+/g, "").trim(); continue; }
    if (/bạn đã tiến hóa/.test(low)) continue;
    if (/mất vai trò|mất nghề|bị đuổi khỏi vai trò/.test(low)) { eff.loseJob = true; continue; }
    if ((m = low.match(/(?:thăng lên|lên thẳng|thăng thẳng lên|lên) bậc (\d+)/))) { eff.setRank = Number(m[1]) - 1; continue; }
    if ((m = low.match(/giáng (?:chức )?(?:xuống|về) bậc (\d+)/))) { eff.setRank = Number(m[1]) - 1; eff.down = true; continue; }
    if ((m = low.match(/giáng (\d+) bậc/))) { eff.rankDelta = -Number(m[1]); continue; }
    if ((m = low.match(/thăng\s*(\+\d+)\s*bậc|thăng bậc\s*\+\s*(\d+)/))) { eff.orgRankUp = Number((m[1] || m[2]).replace("+", "")); continue; }
    if ((m = t.match(/thăng bậc\s+(.+)/i))) { eff.orgRankName = m[1].replace(/\(.*\)/, "").trim(); continue; }
    if (/giáng chức|mất chức/.test(low) && !/^(danh vọng|sức khỏe)/.test(low)) { eff.demote = true; continue; }
    if (/thu phục được/.test(low)) { eff.flags = (eff.flags || []).concat("tamed_beast"); continue; }
    if (/xóa truy nã/.test(low)) { eff.clearBounty = true; continue; }
    if (/bùng nổ chiến tranh/.test(low)) { eff.era = "holy_war"; continue; }
    if (/ác danh tăng/.test(low)) { add("fame", 3); continue; }
    // who lives, dies, joins or leaves
    if (/\{ally\}\s*(chết|tử trận)/.test(low)) { eff.allyDie = true; continue; }
    if (/\{ally\}\s*bỏ đi|\{ally\}\s*rời/.test(low)) { eff.allyLeave = true; continue; }
    if (/\{ally\}\s*(bị thương|suýt chết)|sức khỏe (của )?\{ally\}/.test(low)) { eff.allyHurt = true; continue; }
    if (/(nhận|thu được|có thêm) (đồng đội|\{ally\})|thêm đồng đội/.test(low)) { eff.recruit = true; continue; }
    if (/\{child\}\s*(chết|bỏ đi|rời đi)|mất \{child\}/.test(low)) { eff.loseChild = true; continue; }
    if (/(nhận|có thêm|thu được) \{child\}/.test(low)) { eff.child = true; continue; }
    if (/\{spouse\}\s*chết|mất \{spouse\}/.test(low)) { eff.loseSpouse = true; continue; }
    if (/(thu được|thêm đồng hành) \{spouse\}/.test(low)) { eff.marry = true; continue; }
    if ((m = low.match(/\{(father|mother|maker)\}(?:\/\{(father|mother|maker)\})?\s*chết/))) { eff.parentDie = m[2] || m[1]; continue; }
    if ((m = t.match(/(?:đổi hình dạng thành|tiến hóa\s*:)\s*(.+)/i))) { eff.evolve = m[1].replace(/[*!.]+$/g, "").trim(); continue; }
    if (/thăng 1 bậc vai trò/.test(low)) { eff.jobPromote = true; continue; }
    if (/giáng xuống 1 bậc vai trò|giáng xuống bậc [a-z]/i.test(low) && !/bậc \d/.test(low)) { eff.demote = true; continue; }
    if ((m = t.match(/^thăng lên\s+([^\d].+)$/i))) { eff.orgRankName = m[1].trim(); continue; }
    if (/^(tài sản|danh vọng) vô hạn/.test(low)) { add(low.startsWith("tài") ? "wealth" : "fame", 100); continue; }
    if (/hạnh phúc tối đa/.test(low)) { add("joy", 100); continue; }
    if (/hạnh phúc giảm tận đáy/.test(low)) { add("joy", -100); continue; }
    if (/tài sản giảm một nửa/.test(low)) { add("wealth", -30); continue; }
    if ((m = low.match(/mất (\d+) tài sản/))) { add("wealth", -Number(m[1])); continue; }
    if (/không đổi|xóa nợ|trưởng thành hơn|phong ấn thành công|thay thế \{maker\}|tăng vọt|hồi phục dần/.test(low) && !new RegExp(`${STAT_RE}\\s*[+-]`).test(low)) continue;
    if (/thân thiết với sếp/.test(low)) { add("fame", 2); continue; }
    if ((m = low.match(new RegExp(`^${STAT_RE}\\s*về\\s*0`)))) { add(STAT[m[1]], -100); continue; }
    if ((m = low.match(new RegExp(`^${STAT_RE}\\s*([+-]\\s*\\d+)`)))) {
      add(STAT[m[1]], Number(m[2].replace(/\s/g, "")));
      const inner = tailGroup(t);
      if (inner && /giáng chức|về bậc 1/.test(inner[1].toLowerCase())) eff.demote = true;
      continue;
    }
    if (new RegExp(`^${STAT_RE}\\s*(\\+?0|giữ nguyên|nguyên vẹn)`).test(low)) continue;
    if (/^(thắng lợi|thất bại|đứt chuỗi|giữ mạng sống|phải bỏ chạy)/.test(low) || /^\(/.test(low)) continue;
    const inner = [...low.matchAll(new RegExp(`${STAT_RE}\\s*([+-]\\s*\\d+)`, "g"))];
    if (inner.length) { for (const x of inner) add(STAT[x[1]], Number(x[2].replace(/\s/g, ""))); continue; }
    notes.push(t);
  }
  return { eff, notes };
}

// "text → effects" or "text (effects)." → { text, eff, notes }
function splitOutcome(s) {
  s = strip(s);
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
  const r = rest.toLowerCase().replace(/[\[\]]/g, "");
  const out = {};
  let m;
  // "dựa vào chỉ số cao nhất (hệ thống tự chọn)", "dựa vào chỉ số chính của nghề"
  if (/chỉ số cao nhất|chỉ số chính/.test(r)) {
    const dm = r.match(/(rất khó|rất dễ|cực khó|khó|vừa|trung bình|dễ|huyền thoại)/);
    out.check = { stat: /cao nhất/.test(r) ? "best" : "jobstat", diff: dm ? DIFF[dm[1]] : 3 };
    if (/khóa/.test(r)) out.lock = rest.replace(/.*?KHÓA\s*(nếu|:)?/i, "").split("—")[0].trim();
    return out;
  }
  // "dựa vào Sức mạnh" or "dựa vào Uy áp (Sức mạnh)"
  if ((m = r.match(new RegExp(`dựa vào\\s+(?:[^(—,]{1,25}\\(\\s*)?${STAT_RE}`))) || (m = r.match(new RegExp(`^\\s*${STAT_RE}(?:\\s*\\([^)]*\\))?\\s*[,–-]\\s*(?:rất khó|rất dễ|cực khó|khó|vừa|trung bình|dễ|huyền thoại)`)))) {
    const dm = r.match(/(rất khó|rất dễ|cực khó|khó|vừa|trung bình|dễ|huyền thoại)/);
    out.check = { stat: STAT[m[1]], diff: dm ? DIFF[dm[1]] : 3 };
  }
  // "(Chỉ với dấu ấn demon_parasite)": only shown with that mark
  if ((m = r.match(/chỉ (?:với|khi có) dấu ấn\s*["“]?([a-z][a-z0-9_]+)/))) out.onlyFlags = [m[1]];
  if (/khóa/.test(r)) out.lock = rest.replace(/.*?KHÓA\s*(nếu|:)?/i, "").split("—")[0].trim();
  return out;
}

const FIELD = /^([^:]{2,40}?):\s*(.*)$/;
const isCapsHeader = (s) => {
  const letters = s.replace(/[^A-Za-zÀ-ỹĐđ]/g, "");
  if (letters.length < 5) return false;
  const up = letters.replace(/[^A-ZÀ-ÝĐẠ-Ỹ]/g, "").length;
  return up / letters.length > 0.75;
};

function parse(text) {
  // Gemini sometimes packs fields on one line ("…Tử linh.2. 5 bậc: …", "…quý tộc.Thứ bậc: …").
  text = text
    .replace(/\.(\d)\.\s+/g, ".\n$1. ")
    .replace(/\.(Thứ bậc|Năm yên ả|5 [Bb]ậc|Mở đầu|Câu mở đầu)\s*:/g, ".\n$1:")
    .replace(/\)\s+(?:\d+\.\s+)?(Năm yên ả\s*:)/g, ")\n$1");
  const lines = text.split(/\r?\n/);
  const res = { origins: [], events: [], quests: [], roles: [], evolutions: [], hierarchy: [], focusQuiet: [], allyLines: { die: [], hurt: [], leave: [] } };

  let block = null; // event or origin
  let quest = null; // quest container
  let pendingEra = null;
  let lastLine = ""; // the line before this one (a plain quest title sits right above "Bậc tối thiểu") // "Thời đại:" seen before the quest started
  let scene = null; // scene inside quest
  let opt = null;
  let role = null, focus = null, evo = null;
  let mode = null; // "promo" | "quiet" | "hier" | "ally:die" ...
  let lastHeader = "";
  let questDone = false;
  let questKind = "small";

  const closeContainers = () => { role = null; focus = null; evo = null; mode = null; };
  const target = () => scene || block;

  function startQuest(id, name) {
    let q = res.quests.find((x) => x.id === id);
    if (q) { q.steps = []; } else { q = { id, name, steps: [] }; res.quests.push(q); }
    q.kind = /story|cot_truyen|chain/.test(id) ? "story" : /_era_|thoi_dai|era_/.test(id) ? "era" : questKind;
    quest = q; scene = null; opt = null; questDone = false;
    if (pendingEra) { q.era = pendingEra; pendingEra = null; }
    return q;
  }
  function blockToQuest() {
    // An [id] block that turns out to be a quest header.
    const idx = res.events.indexOf(block);
    if (idx >= 0) res.events.splice(idx, 1);
    startQuest(block.id, block.title);
    block = null;
  }
  const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40);

  for (const raw0 of lines) {
    // "Báo hiệu (some_id): text" / "Tiến hóa (some_id): Title" → the usual [id] forms
    const raw = raw0.replace(/^\s*([^()\[\]:]{2,40}?)\s*\(([a-z][a-z0-9]*_[a-z0-9_]+)\)\s*:\s*(.*)$/i, (m, pre, id, rest) =>
      /^tiến hóa$/i.test(pre.trim()) ? `[${id}] ${rest}` : `${pre.trim()} - [${id}]: ${rest}`);
    let line = strip(raw);
    if (!line) continue;
    // number words at the start of list titles ("Năm bậc:", "Bốn thử thách…", "Ba câu năm yên ả") and "(Bậc 1 lên 2): …"
    line = line.replace(/^(năm|bốn|ba|bảy|hai)\s+(bậc|thử thách|câu|cấp)/i, (m, w, rest) => ({ "năm": 5, "bốn": 4, "ba": 3, "bảy": 7, "hai": 2 }[w.toLowerCase()] + " " + rest))
      .replace(/^\((bậc \d+ lên \d+)\)\s*:/i, "$1:")
      .replace(/^\d\s*(?:→|->)\s*\d\s*:\s*/, "") // "1→2: Vung kiếm… (Sức mạnh, DỄ)"
      .replace(/^\[MÃ\]\s*/i, "") // "[MÃ] demon_quest_scavenge_1"
      // "Thành công (THẮNG NGAY): …", "Thất bại (CHẾT): …": the note in brackets is an effect
      .replace(/^(Thành công|Thất bại)\s*\((THẮNG NGAY|THẤT BẠI NGAY|CHẾT)\)\s*:\s*(.+)$/i, (m0, k, note, rest) => `${k}: ${rest}${/→/.test(rest) ? ", " : " → "}${note.toUpperCase()}`)
      .replace(/^(Thành công|Thất bại)\s*\(dựa vào[^)]*\)\s*:/i, "$1:")
      // a bare id at the start of a line ("demon_dk_sword", "demon_origin_abyss — 12%") is an [id] line
      .replace(/^([a-z][a-z0-9]*(?:_[a-z0-9]+)+)(?=\s*$|\s+[—–-]\s|\s+[A-ZÀ-ỸĐ])/, "[$1]");
    const prevLine = lastLine;
    lastLine = line;
    const low = line.toLowerCase();
    let m;

    // ---- companion status lines ----
    if (/^(\d+\s*câu\s*)?(phản ứng của bạn\s+)?khi (\{ally\}\s+|đồng đội\s+)?(chết|bị thương|bỏ đi)/i.test(line) && (line.length < 70 || (line.length < 160 && /:$/.test(line)))) {
      mode = /chết/.test(low) ? "ally:die" : /thương/.test(low) ? "ally:hurt" : "ally:leave";
      block = null; opt = null; continue;
    }
    if (mode && mode.startsWith("ally:") && !/\[/.test(line) && !isCapsHeader(line) && !/^phần \d/i.test(line) && !/^(dưới đây|[a-d]\.)/i.test(line) && line.length > 15) {
      res.allyLines[mode.slice(5)].push(line.replace(/^["“]|["”]$/g, ""));
      continue;
    }

    // ---- era quest written as "[Chiến Tranh Tuyến Đầu] Lệnh Triệu Tập Đẫm Máu" ----
    const eh = line.match(/^\[(kỷ nguyên tăm tối|ma vương giáng thế|chiến tranh tuyến đầu|thời bình)\]\s*(.{3,90})$/i);
    if (eh) {
      closeContainers(); block = null; scene = null; opt = null; mode = null;
      startQuest(slug(eh[2]), eh[2].trim());
      quest.kind = "era"; quest.era = quest.era || eh[1];
      lastHeader = line;
      continue;
    }
    // ---- quest headers: "CUỘC CHINH PHẠT NHỎ 1: Cướp bóc Làng Human", "TRẬN CHIẾN CỐT TRUYỆN 2: …" ----
    const qh = line.match(/^((?:CUỘC|VIỆC|NHIỆM|MỆNH|TRẬN|CHIẾN|QUÂN LỆNH|HUYẾT LỆNH|CHUYẾN)[^:]{0,50}?)\s*:\s*(.{3,90})$/);
    if (qh && isCapsHeader(qh[1]) && !/^VIỆC CHÍNH/.test(qh[1]) && !/[.!?]$/.test(qh[2])) {
      closeContainers(); block = null; scene = null; opt = null; mode = null;
      const k = /CỐT TRUYỆN/.test(qh[1]) ? "story" : /THỜI ĐẠI/.test(qh[1]) ? "era" : "small";
      questKind = k;
      startQuest(slug(qh[2]), qh[2].trim());
      quest.kind = k;
      lastHeader = line;
      continue;
    }

    // ---- [id] lines ----
    const idm = line.match(/^(.{0,70}?)\[([A-Za-z][A-Za-z0-9_]*)\]\s*(:)?\s*(.*)$/);
    if (idm && !/đây chính là/i.test(idm[1]) && !/^(khi nào|tình huống|hệ quả)/i.test(line)) {
      const wasHier = mode === "hier" || mode === "hierDone";
      mode = wasHier ? "hierDone" : null;
      const id = idm[2].toLowerCase();
      let rest = idm[4].replace(/\*+$/, "").trim();
      const listing = /\(bậc tối thiểu/i.test(rest) || /^\d+\.\s*$/.test(idm[1].trim()) && /—/.test(rest) && /\(bậc \d+\)/i.test(rest);
      if (listing) continue; // a summary list of quests, the real ones follow
      opt = null;
      // "2. [kobold_quest_x] Title" starts the next quest, it is not a scene of the open one
      if (quest && /^\d+\.\s*$/.test(idm[1].trim()) && /quest|story|era|raid|hunt|battle/.test(id)) questDone = true;
      // Scenes of an open quest.
      if (quest && !questDone) {
        const sm = rest.match(/^cảnh\s*(\d+)(?:\/\d+)?\s*[:.]\s*(.*)$/i);
        scene = { id, title: (sm ? sm[2] : rest).replace(/\(chỉ xảy ra.*\)$/i, "").trim(), choices: [] };
        quest.steps.push(scene);
        block = null;
        continue;
      }
      quest = null; scene = null;
      // an origin has "— N%"; an "origin"-looking id without it is an event once real origins (with %) were seen
      const hasPct = /—\s*\d+\s*%/.test(rest);
      if (hasPct || (/_origin_|_bg_|origin/.test(id) && !res.origins.some((o) => o.pct))) {
        const pm = rest.match(/^(.*?)\s*—\s*(\d+)\s*%/);
        block = { type: "origin", id, pct: hasPct, name: (pm ? pm[1] : rest).replace(/\(mới\)/i, "").trim(), weight: pm ? Number(pm[2]) : 10, tail: pm ? rest.slice(pm[0].length).trim() : "" };
        res.origins.push(block);
        continue;
      }
      block = { type: "event", id, title: rest, choices: [] };
      if (idm[3] && rest) { block.title = ""; block.text = ""; block.auto = splitOutcome(rest); block.inline = true; }
      if (/^foreshadow|báo hiệu/i.test(idm[1]) && idm[3]) { block.text = splitOutcome(rest).text; block.auto = null; }
      if (role) block.role = role.index;
      if (focus) block.focus = focus.index;
      if (evo) block.evo = evo.index;
      if (wasHier) block.rank = true;
      res.events.push(block);
      continue;
    }

    // ---- choices ----
    const om = line.match(/^([A-D])[.)]\s*["“](.+?)["”]\s*(?:[—–-]\s*(.*))?$/) || line.match(/^([A-D])[.)]\s+([^"“—–]{3,90}?)\s+[—–]\s+(.*)$/);
    if (om && target()) {
      const restOpt = (om[3] || "").replace(/[\[\]]/g, "");
      const head = parseHead(restOpt);
      opt = { label: om[2].trim(), ...head };
      const parts = restOpt.split(/\s+[—–]\s+/);
      const afterNoRoll = restOpt.match(/\(không tung[^)]*\)\s*(.+)$/i);
      if (!head.check && afterNoRoll) opt.plain = splitOutcome(afterNoRoll[1]);
      else if (!head.check && parts.length > 1) opt.plain = splitOutcome(parts.slice(1).join(" — "));
      else if (!head.check && restOpt && !head.lock && !/không tung/i.test(restOpt)) opt.plain = splitOutcome(restOpt);
      const tg = target();
      if (!tg.choices) { if (process.env.PARSE_DEBUG) console.error("choice in", tg.type, tg.id, line.slice(0, 60)); tg.choices = []; }
      tg.choices.push(opt);
      continue;
    }
    // "Cần dấu ấn: "twin_core". Thành công: ..." — the option needs a mark
    if (opt && (m = line.match(/^Cần dấu ấn\s*:?\s*["“]([a-z0-9_]+)["”]\.?\s*(.*)$/i))) {
      opt.needFlags = [m[1]];
      if (!m[2]) continue;
      line = m[2];
    }
    // "Thành công (Nếu có "flag"): ..." — the outcome depends on a mark from an earlier event
    if (opt && (m = line.match(/^(Thành công|Thất bại)\s*\(nếu có\s*["“]([a-z0-9_]+)["”]\)\s*:\s*(.+)/i))) {
      const key = /thành/i.test(m[1]) ? "success" : "fail";
      opt.variants = opt.variants || {};
      (opt.variants[m[2]] = opt.variants[m[2]] || {})[key] = splitOutcome(m[3]);
      if (!opt[key]) opt[key] = splitOutcome(m[3]);
      continue;
    }
    if (block && !quest && (m = line.match(/^Hệ quả\s*\(nếu có\s*["“]([a-z0-9_]+)["”]\)\s*:\s*(.+)/i))) {
      (block.variants = block.variants || []).push({ flag: m[1], auto: splitOutcome(m[2]) });
      continue;
    }
    if (opt && (m = line.match(/^Thành công\s*:\s*(.+)/i))) { opt.success = splitOutcome(m[1]); continue; }
    if (opt && (m = line.match(/^Thất bại\s*:\s*(.+)/i))) { opt.fail = splitOutcome(m[1]); continue; }

    // ---- scene headers ----
    if ((m = line.match(/^cảnh\s*(\d+)(?:\/\d+)?\s*[:.]\s*(.*)$/i))) {
      if (!quest && block) blockToQuest();
      if (quest) { scene = { title: m[2].replace(/\(chỉ xảy ra.*\)$/i, "").trim(), choices: [] }; quest.steps.push(scene); opt = null; continue; }
    }

    // ---- fields ----
    // "Hệ quả (Không lựa chọn): …" is a plain outcome
    line = line.replace(/^(hệ quả)\s*\((?:không lựa chọn|tự động|không tung xúc xắc)\)\s*:/i, "$1:");
    const fm = line.match(FIELD);
    if (fm) {
      const key = fm[1].toLowerCase().replace(/^\d+\.\s*/, "").trim();
      const val = fm[2].trim();
      // quest-level fields
      if (/^(bậc|hạng) tối thiểu/.test(key)) {
        if (block && block.type === "event" && !block.text && !block.choices.length) blockToQuest();
        else if (!quest || questDone) {
          // the title is the header above, or a plain short line right before this field
          const title = prevLine && prevLine.length < 90 && !FIELD.test(prevLine) && !/[.!?]$/.test(prevLine) && prevLine !== lastHeader ? prevLine : lastHeader || "quest";
          startQuest(slug(title), title.replace(/^\d+\.\s*/, "").replace(/^(việc vặt|cuộc cướp phá|nhiệm vụ|chiến dịch[^:]*)\s*:\s*/i, ""));
        }
        const rm = val.match(/bậc\s*(\d+)/i) || val.match(/^(\d+)/);
        quest.minRank = rm ? Number(rm[1]) : null;
        if (!rm) quest.minRankName = val.replace(/\s*\(.*$/, "").replace(/^hạng\s+/i, "").trim();
        closeContainers();
        continue;
      }
      if (quest && !scene && /^(gợi ý)$/.test(key)) { quest.hint = val.replace(/\*/g, ""); continue; }
      if (/^thời đại( yêu cầu)?$/.test(key)) { if (quest && !questDone) quest.era = val; else pendingEra = val; continue; }
      if (quest && /^(mở đầu|đoạn mở đầu)$/.test(key) && !scene) { quest.intro = val; continue; }
      if (quest && !scene && key === "khi nào") { if (/thời đại/i.test(val)) quest.era = val; continue; }
      if (quest && /^(đoạn kết|kết thúc thành công|kết thúc|kết)$/.test(key)) { quest.complete = val; questDone = true; scene = null; opt = null; continue; }
      if (quest && /^(phần thưởng|thưởng)/.test(key)) { quest.reward = parseEffects(val); questDone = true; scene = null; continue; }
      if (quest && questDone && /^khoảnh khắc/.test(key)) { quest.moment = val; continue; }
      if (quest && scene) {
        if (key === "tình huống") { scene.text = val; continue; }
        if (key === "hệ quả") { scene.auto = splitOutcome(val); continue; }
        if (key === "khi nào") continue;
      }
      // origin fields
      if (block && block.type === "origin") {
        if (/mở đầu/.test(key)) block.text = val;
        else if (key === "cha") block.father = val;
        else if (key === "mẹ") block.mother = val;
        else if (/\{maker\}|kẻ tạo ra|kẻ hồi sinh|chủ nhân|người nuôi/.test(key)) block.maker = val;
        else if (/anh chị em|đồng loại/.test(key)) block.siblings = val;
        else if (/gia cảnh/.test(key)) block.home = val;
        else if (/ảnh hưởng/.test(key)) block.effects = parseEffects(val).eff;
        else if (/kiếp trước|nguồn gốc khác/.test(key)) block.past = val;
        continue;
      }
      // event fields
      if (block && block.type === "event" && !block.inline) {
        if (key === "khi nào") { block.when = val; continue; }
        if (key === "tình huống") { block.text = val; continue; }
        if (key === "hệ quả") { block.auto = splitOutcome(val); continue; }
        if (key === "khoảnh khắc") { block.moment = val; continue; }
      }
      // role / evolution fields
      if (/^điều kiện/.test(key)) {
        block = null; opt = null; quest = null; scene = null;
        if (evo && !evo.require) { evo.require = val; continue; }
        if (/nhánh|tiến hóa/i.test(lastHeader)) { evo = { index: res.evolutions.length, title: lastHeader, require: val }; res.evolutions.push(evo); role = null; focus = null; mode = null; }
        else { role = { index: res.roles.length, title: lastHeader, require: val, ranks: [], promo: [], quiet: [] }; res.roles.push(role); focus = null; evo = null; mode = null; }
        continue;
      }
      if (role && /5 bậc|năm bậc|tên 5 bậc|^thứ bậc$|^bậc nghề$|^các bậc$/.test(key) && val) {
        role.ranks = val.split(/\s*(?:→|·|>|,|;)\s*/).map((x) => x.replace(/\(bậc \d+\)/i, "").replace(/\.$/, "").trim()).filter(Boolean);
        continue;
      }
      if (role && /^(câu mở đầu|mở đầu|vào nghề)$/.test(key)) { role.start = val; mode = "promo"; continue; }
      if (role && /thử thách/.test(key)) { mode = "promo"; if (val) role.promo.push(...promoLines(val)); continue; }
      if ((role || focus) && /năm yên ả/.test(key)) { mode = "quiet"; if (val) (role || focus).quiet.push(...quietSplit(val)); continue; }
      if (role && (m = line.match(/^bậc (\d+)(?: lên (\d+))?\s*(?:\(([^)]+)\))?\s*:\s*(.+)$/i))) { role.promo.push(promoOf(m[4], m[3])); mode = "promo"; continue; }
      if (role && /sự kiện/.test(key)) { mode = null; continue; }
      if (mode === "hier" && res.hierarchy.length < 7) { pushHier(line); continue; }
    }

    // ---- headers ----
    if (/^(\d+\s*bậc\s*thứ bậc|thứ bậc\b)/i.test(line) && line.length < 120 && !/^thứ bậc\s*:/i.test(line)) { lastHeader = line; closeContainers(); mode = "hier"; block = null; quest = null; continue; }
    if (/năm yên ả/i.test(line) && (line.length < 40 || (/^năm yên ả\s*\(/i.test(line) && line.length < 140 && /:$/.test(line)))) {
      if (!role && !focus) {
        const prev = res.focusQuiet[res.focusQuiet.length - 1];
        if (prev && prev.title === lastHeader) focus = prev;
        else { focus = { index: res.focusQuiet.length, title: lastHeader, quiet: [] }; res.focusQuiet.push(focus); }
      }
      mode = "quiet"; block = null; opt = null; continue;
    }
    if (/thử thách thăng bậc/i.test(line) && line.length < 40) { mode = "promo"; continue; }
    if (/^(\d+\s*)?(câu|sự kiện|các sự kiện|\d+ sự kiện)/i.test(line) && line.length < 40) { if (mode === "quiet" || mode === "promo") mode = null; continue; }
    if (/cốt truyện/i.test(line) && line.length < 120) questKind = "story";
    else if (/thời đại/i.test(line) && /chiến dịch|nhiệm vụ|cướp|săn|mệnh lệnh|việc/i.test(line) && line.length < 120) questKind = "era";
    else if (/(việc vặt|nhỏ|lặp lại)/i.test(line) && line.length < 140 && !/\[/.test(line)) questKind = "small";
    const looksHeader = isCapsHeader(line) || /^\d+\.\s*(việc chính|vai trò|việc vặt)/i.test(line) || /^(vai trò|việc chính|nhánh)\b/i.test(line) || /^phần \d/i.test(line);
    if (looksHeader && line.length < 120) {
      lastHeader = line;
      if (/thứ bậc|\(7 cấp\)|7 bậc|^bậc lãnh (địa|thổ)|^cấp bậc/i.test(line) && !/5 bậc/i.test(line)) { closeContainers(); mode = "hier"; block = null; quest = null; continue; }
      if (/nhánh/i.test(line) && !/vai trò/i.test(line)) {
        closeContainers(); block = null; quest = null; scene = null;
        evo = { index: res.evolutions.length, title: line, require: "" }; res.evolutions.push(evo);
        continue;
      }
      if (/việc chính/i.test(line)) {
        closeContainers(); block = null; quest = null; scene = null;
        focus = { index: res.focusQuiet.length, title: line, quiet: [] }; res.focusQuiet.push(focus);
        continue;
      }
      if (/^\d+\.\s/.test(line) && !/vai trò|nhánh|việc vặt/i.test(line) && !role) {
        closeContainers(); block = null; quest = null; scene = null; continue;
      }
      if (!/sự kiện|câu/i.test(line)) { closeContainers(); block = null; if (questDone) quest = null; }
      continue;
    }
    if (/^\d+\.\s/.test(line) && line.length < 100 && !/^\d+\.\s*(điều kiện|\d+ bậc|5 bậc)/i.test(line)) {
      if (mode === "promo" && role) { const p = promoLines(line); if (!p.length && role.promo.length < 4 && line.length > 20 && !/:$/.test(line) && (!FIELD.test(line) || /["“]/.test(line.split(":")[0]))) p.push(promoOf(line.replace(/\.$/, ""), null, null)); if (p.length) { role.promo.push(...p); continue; } }
      // a short numbered line outside a list of trials is a section title: it closes the open role / focus
      if (mode !== "promo" && mode !== "quiet" && !/[.!?]$/.test(line)) closeContainers();
      lastHeader = line; block = null; opt = null; if (questDone) quest = null;
      continue;
    }

    // ---- free lines inside containers ----
    if (mode === "hier" && res.hierarchy.length < 7 && !/^(dưới đây)/i.test(line)) { pushHier(line); continue; }
    if (mode === "promo" && role) { const p = promoLines(line); if (!p.length && role.promo.length < 4 && line.length > 20 && !/:$/.test(line) && (!FIELD.test(line) || /["“]/.test(line.split(":")[0]))) p.push(promoOf(line.replace(/\.$/, ""), null, null)); if (p.length) { role.promo.push(...p); continue; } }
    if (mode === "quiet" && (role || focus) && !/^(dưới đây|phần)/i.test(line)) { (role || focus).quiet.push(...quietSplit(line)); continue; }
    if (opt && !opt.check && !opt.plain) { opt.plain = splitOutcome(line); continue; }
    if (!block && !quest && line.length < 100) lastHeader = line;
  }

  function promoOf(text, diffWord, statWord) {
    const d = DIFF[(diffWord || "").toLowerCase().trim()];
    return { text: text.trim(), diff: d != null ? d : null, stat: statWord ? STAT[statWord.toLowerCase().trim()] : null };
  }
  function promoLines(l) {
    let m;
    // "Lùa bầy cừu … — dựa vào May mắn, KHÓ"
    if ((m = l.match(/^(?:bậc \d+\s*(?:→|->|lên)\s*\d+\s*:\s*)?(.{15,}?)\s*[—–-]\s*dựa vào\s+(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe)\s*[,(]\s*(rất khó|cực khó|khó|vừa|dễ)\)?\.?$/i))) return [promoOf(m[1], m[3], m[2])];
    // "Lên bậc 2 (Dễ, Sức mạnh): …", "Bậc 1→2 (Sức mạnh - Khó): …"
    if ((m = l.match(/^(?:lên bậc \d+|bậc \d+\s*(?:→|->|lên)\s*\d+)\s*\(([^)]+)\)\s*:\s*(.+)$/i)) ||
        (m = l.match(/^(?:lên bậc \d+|bậc \d+\s*(?:→|->|lên)\s*\d+)\s*:\s*\(([^)]+)\)\s*[-–—]?\s*(.+)$/i))) {
      const bits = m[1].toLowerCase();
      const dw = (bits.match(/rất khó|cực khó|khó|vừa|dễ/) || [])[0];
      const sw = (bits.match(/sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe/) || [])[0];
      return [promoOf(m[2], dw, sw)];
    }
    if ((m = l.match(/^\((rất khó|cực khó|khó|vừa|dễ)\s*[-–,]\s*([^)]+)\)\s*(.+)$/i))) return [promoOf(m[3], m[1], m[2])];
    if ((m = l.match(/^(?:\d+\.\s*)?(.+?)\s*\((rất khó|cực khó|khó|vừa|dễ)(?:\s*[,-–]\s*([^)]+))?\)\.?$/i))) return [promoOf(m[1], m[2], m[3])];
    if ((m = l.match(/^(?:\d+\.\s*)?(.+?)\s*\((sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe)\s*[,-–]\s*(rất khó|cực khó|khó|vừa|dễ)\)\.?$/i))) return [promoOf(m[1], m[3], m[2])];
    if ((m = l.match(/^(?:\d+\.\s*)?(.+?)\s*\((sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe)\)\.?$/i))) return [promoOf(m[1], null, m[2])];
    if ((m = l.match(/^bậc (\d+)(?: lên (\d+))?\s*(?:\(([^)]+)\))?\s*:\s*(.+)$/i))) return [promoOf(m[4], m[3])];
    return [];
  }
  function quietSplit(l) {
    const qm = l.match(/^\(([^)]{2,20})\)\s*(.+)$/);
    if (qm) return [{ when: qm[1], text: qm[2] }];
    // several sentences on one line
    return l.split(/(?<=[.!?…])\s+(?=[A-ZÀ-ỸĐ])/).map((t) => ({ when: "", text: t.trim() })).filter((x) => x.text.length > 10);
  }
  function pushHier(l) {
    let m;
    l = l.replace(/^bậc\s*\d+\s*:\s*/i, "").replace(/^\d+\.\s*/, "");
    if ((m = l.match(/^([^:—–]{2,80}?)\s+[—–]\s+(.+)$/))) res.hierarchy.push({ rank: res.hierarchy.length + 1, name: m[1].trim(), text: m[2].trim() });
    else if ((m = l.match(/^([^:]{2,80}?)\s*(?:\(bậc \d+\))?\s*:\s*(.+)$/i))) res.hierarchy.push({ rank: res.hierarchy.length + 1, name: m[1].trim(), text: m[2].trim() });
    else res.hierarchy.push({ rank: res.hierarchy.length + 1, name: "", text: l.trim(), unsplit: true });
  }

  // Drop empty blocks (summary lines etc.) and quests without scenes.
  res.events = res.events.filter((e) => e.text || e.choices.length || e.auto);
  res.quests = res.quests.filter((q) => q.steps.length);
  return res;
}

module.exports = { parse, parseEffects, splitOutcome };

if (require.main === module) {
  process.stdout.write(JSON.stringify(parse(fs.readFileSync(process.argv[2], "utf8")), null, 1));
}
