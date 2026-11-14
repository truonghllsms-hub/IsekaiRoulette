// Builds a race pack (data/packs/<race>.json) from an approved Gemini script + its meta file.
//   script: content/scripts/<race>.txt   (parsed by tools/script-parse.js)
//   meta:   content/packs/<race>.meta.js (names, roles, organisation, evolutions, fixes)
// Most conditions are read from each event's "Khi nào" line: life stage (from the age range), role rank,
// marks, parents alive, companions, spouse, children, era, stat thresholds.
// Run: node tools/build-pack.js [race ...] [--report]
const fs = require("fs");
const path = require("path");
const { parse } = require("./script-parse");
const { scanStory } = require("./story-parse");

const ROOT = path.join(__dirname, "..");
const STAT_KEYS = ["STR", "INT", "AGI", "LUCK"];
const TRAITS = { "dũng cảm": "brave", "trung thành": "loyal", "tham lam": "greedy", "nhút nhát": "timid", "vui tính": "cheerful", "hài hước": "cheerful", "lạnh lùng": "cold" };
const STAT = { "sức mạnh": "STR", "trí tuệ": "INT", "nhanh nhẹn": "AGI", "may mắn": "LUCK", "sức khỏe": "health", "hạnh phúc": "joy", "tài sản": "wealth", "danh vọng": "fame" };
const ERA_WORDS = { "Kỷ Nguyên Tăm Tối": "dark_age", "Ma Vương Giáng Thế": "demon_lord", "Chiến Tranh Tuyến Đầu": "holy_war", "Thời Bình": "peace" };
// Thuần Việt names and old organisation names → manga style (docs/NAMING.md). Race metas add their own.
const GLOBAL_RENAME = [
  ["Bình Minh Hội", "Guild Bình Minh"], ["Guild Mạo hiểm giả", "Guild Bình Minh"], ["Guild Umbra", "Guild Sát thủ Umbra"],
  ["Thánh Vệ Quân", "Thánh Kỵ Sĩ Đoàn"], ["Quân Đoàn Hủy Diệt", "Quân đoàn Ma Vương"], ["Hội Bóng Đêm", "Guild Sát thủ Umbra"],
  ["Thương Đoàn Sói Bạc", "Thương hội Sói Bạc"], ["Tuần Lâm Trọng Vệ", "Đội Ranger Đại Ngàn"],
  ["Người lùn", "Dwarf"], ["người lùn", "Dwarf"], ["Tiên tộc", "Elf"], ["Ma cà rồng", "Vampire"], ["ma cà rồng", "Vampire"],
  ["Ngạ quỷ", "Ghoul"], ["Ngưu đầu nhân", "Minotaur"], ["Thằn lằn nhân", "Lizardman"], ["Cẩu đầu nhân", "Kobold"],
  ["Yêu tinh xanh", "Goblin"], ["Chằn tinh", "Orc"], ["Khổng lồ ngốc", "Troll"],
];

const asciiShare = (s) => (s.replace(/[^A-Za-z]/g, "").length / Math.max(1, s.replace(/[^A-Za-zÀ-ỹĐđ]/g, "").length));
// "Kẻ Thu Thập (Collector)" → "Collector"; "Meat Shield (Bia Đỡ Đạn)" → "Meat Shield"; otherwise unchanged.
function mangaName(n) {
  n = (n || "").replace(/\.$/, "").trim();
  const m = n.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (!m) return n;
  if (asciiShare(m[2]) > 0.999) return m[2].trim();
  if (asciiShare(m[1]) > 0.999) return m[1].trim();
  return n;
}

function build(raceId, opts) {
  const meta = require(path.join(ROOT, "content", "packs", raceId + ".meta.js"));
  const races = require(path.join(ROOT, "data", "races.json"));
  const race = races.find((r) => r.id === raceId);
  const profile = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "races", raceId + ".json"), "utf8"));
  // no stages written anywhere: the engine's default ones (shares of the average lifespan)
  const stageList = meta.stages || profile.stages || race.stages || require("../engine").stagesOf(race);
  const stages = stageList.map((s) => ({ id: s.id, start: s.start, name: (meta.stageNames && meta.stageNames[s.id]) || s.name }));
  // the ages written in the script follow the stages it was written for: a race whose stages
  // changed later (Elf, Dwarf, Demon) keeps reading "tuổi 60–225" with the old ones
  const scriptStages = meta.scriptStages ? meta.scriptStages === "engine" ? require("../engine").stagesOf(Object.assign({}, race, { stages: null })) : meta.scriptStages : stages;
  const parsed = parse(fs.readFileSync(path.join(ROOT, meta.script), "utf8"));
  // the story layer (prompts/v3): arcs, recurring cast, bands, minions — nodes join the events
  let story = null;
  if (meta.story) {
    const storyText = fs.readFileSync(path.join(ROOT, meta.story), "utf8");
    for (const e of parse(storyText).events) { e._story = true; parsed.events.push(e); }
  }
  if (meta.story) story = scanStory(fs.readFileSync(path.join(ROOT, meta.story), "utf8"), stages);
  const report = [];
  const renames = [...(meta.rename || []), ...GLOBAL_RENAME];
  const ren = (t) => {
    if (typeof t !== "string") return t;
    for (const [a, b] of renames) t = t.split(a).join(b);
    // "{father} Throk": the placeholder already is the name, a second copy reads "Throk Throk"
    t = t.replace(/\{(father|mother)\} \p{Lu}[\p{Ll}']+(?=[\s,.!?:;)]|$)/gu, "{$1}");
    // a text written in two versions "(Nếu A) … (Nếu B) …": keep the first, which is the arc's main road
    const COND = /\s*\((?:Nếu|nếu|Chỉ khi|chỉ khi)[^()]{0,160}\)\s*/g;
    const parts = t.split(COND);
    if (parts.length > 2) t = (parts[0] + " " + parts[1]).trim();
    // conditions the script wrote into the story itself, and the other choice it left beside a word
    // ("bộ giáp cũ (hoặc kỷ vật)", "(Nếu Kael còn sống, …)") are not read aloud
    return t.replace(/\s*\((THẮNG NGAY|THẤT BẠI NGAY)[^)]*\)\s*/g, " ").replace(/\s*\((?:Nếu|nếu|Chỉ khi|chỉ khi|khi còn|Khi còn)[^()]{0,160}\)/g, "").replace(/\s*\((?:hoặc|hay là|hay) [^()]{1,80}\)/g, "").replace(/([^.])\.\s*\.(?!\.)/g, "$1.").replace(/Cậu bé\/cô bé/g, "Nhóc").replace(/cậu bé\/cô bé/g, "nhóc").replace(/\s+/g, " ").trim().replace(/^[.,;:·]+\s*/, "");
  };
  const target = (stat, diff) => {
    const table = STAT_KEYS.includes(stat) || stat === "best" || stat === "jobstat" ? meta.diff.stat : meta.diff.bar;
    return table[Math.min(table.length - 1, diff == null ? 3 : diff)];
  };
  const evoDefs = meta.evos || [];

  // "thăng bậc Ma Vương (Demon King)" → index of that rank, matching Vietnamese or English names
  function rankIndex(name) {
    const clean = (x) => ren(String(x || "")).toLowerCase().replace(/[.,]/g, "").trim();
    const wants = [clean(name), clean(mangaName(ren(name))), clean(String(name).replace(/\s*\(.*\)\s*$/, ""))].filter(Boolean);
    const lists = [
      (meta.org && meta.org.ranks) || [],
      parsed.hierarchy.map((h) => h.name.replace(/\s*\(.*\)\s*$/, "")),
      parsed.hierarchy.map((h) => mangaName(h.name)),
      meta.rankAliases || [],
    ];
    for (const list of lists)
      for (const w of wants) {
        const i = list.findIndex((r) => r && (clean(r) === w || w.startsWith(clean(r)) || clean(r).startsWith(w)));
        if (i >= 0) return i;
      }
    return -1;
  }

  // ---- effects ----
  function effects(e, ctx) {
    ctx = ctx || {};
    const out = {};
    for (const k of [...STAT_KEYS, "health", "joy", "wealth", "fame", "guildPts", "bond"]) if (e[k]) out[k] = Math.max(-100, Math.min(100, e[k]));
    if (e.flags && e.flags.length) out.flags = [...new Set(e.flags)];
    for (const k of ["allyDie", "allyLeave", "allyHurt", "recruit", "loseChild", "child", "marry", "loseSpouse", "loseJob", "jobPromote"]) if (e[k]) out[k] = true;
    if (e.parentDie) out.parentDie = e.parentDie;
    for (const k of ["castDie", "castJoin", "castLeave", "castBond", "joinBand", "leaveBand", "bandGone", "bandLead", "minionAdd", "minionLose", "minionRevolt", "minionLoyal", "memberBond", "memberDie", "memberLeave", "memberJoin", "foundBand"]) if (e[k] != null) out[k] = e[k];
    if (e.demote) { if (ctx.rank) out.orgRank = 0; else out.demote = true; }
    if (e.rankDelta) { if (ctx.role) out.demote = true; else out.orgRankUp = e.rankDelta; }
    if (e.setRank != null) { if (ctx.role && !ctx.rank) out.jobRankSet = e.setRank; else out.orgRank = e.setRank; }
    if (e.orgRankUp) out.orgRankUp = e.orgRankUp;
    if (e.orgRankName) {
      const idx = rankIndex(e.orgRankName);
      if (idx >= 0) out.orgRank = idx;
      else out.orgRankName = mangaName(ren(e.orgRankName));
    }
    if (e.era) out.era = e.era;
    if (e.evolve) {
      const want = e.evolve.toLowerCase();
      const d = evoDefs.find((x) => want.includes(x.name.toLowerCase()) || (x.match && x.match.some((w) => want.includes(w.toLowerCase())))) || (meta.forms && meta.forms[e.evolve.toUpperCase()]);
      out.evolve = d ? d.name : mangaName(e.evolve);
    }
    if (e.clearBounty) out.unflags = ["guild_enemy", "bounty_survivor"];
    return out;
  }
  // "CHẾT già." leaves just "già." after the keyword: make it a sentence
  function deathText(d, fallback) {
    d = ren(d || "").replace(/^[.,;:\s]+/, "");
    if (d === "Bạn chết." || !d || /^chết\.?$/i.test(d)) return ren(fallback || "Bạn chết.");
    const lowerStart = d.charAt(0) !== d.charAt(0).toUpperCase();
    if (lowerStart && /^[a-zà-ỹđ]/.test(d) && d.length < 40) return "Bạn chết " + d;
    // a bare label from the script ("Tử trận", "Đột tử do …", "Đâm lén"): make it a sentence about you
    d = d.replace(/^["“]\s*(.*?)\s*["”]\.?$/, "$1");
    if (/^(anh hùng|vinh quang|oanh liệt)\.?$/i.test(d)) return "Bạn ngã xuống như một anh hùng.";
    if (/^phản bội\.?$/i.test(d)) return "Bạn chết vì bị phản bội.";
    if (!lowerStart && d.length < 80 && !/(^|\s)bạn\b/i.test(d) && !/[.!?…]\s+\S/.test(d.replace(/[.!?…]$/, ""))) {
      const low = d.charAt(0).toLowerCase() + d.slice(1).replace(/\.?$/, ".");
      // only a plain verb is folded into "Bạn …"; any other label stays a line of its own ("Vinh quang muôn đời.")
      if (/^(tử|đột|kiệt|nổ|bị|mất|chết|đồng quy|hy sinh|tự|trở thành|biến thành|kết thúc|gục|ngã)(\s|\.|$)/i.test(low)) return "Bạn " + low;
      if (/^(đâm lén|đói khát|trúng độc|trúng tên|trọng thương|trụy tim|vỡ sọ|vỡ ngực|chìm sông|mắc kẹt|hiến tế|kiệt quệ)/i.test(low)) return "Bạn chết vì " + low.replace(/^đâm lén/, "bị đâm lén");
      return d.replace(/\.?$/, ".");
    }
    return d;
  }
  // "CHẾT (Mẹ)", "CHẾT ({spouse})", "CHẾT nếu Sức khỏe dưới 0": someone else dies, or nobody yet
  function otherDeath(d) {
    const w = String(d || "").replace(/^\s*(?:bạn\s+)?chết\s*/i, "").replace(/^\(|\)?\.?\s*$/g, "").trim();
    if (/^nếu |^khi /i.test(w) || /nếu (Sức khỏe|máu|HP)/i.test(d)) return {};
    if (/^\{spouse\}$/i.test(w)) return { loseSpouse: true };
    if (/^\{child\}$/i.test(w)) return { loseChild: true };
    if (/^\{ally\}$/i.test(w)) return { allyDie: true };
    if ((m = w.match(/^\{(mentor|rival|friend)\}$/))) return { castDie: [m[1]] };
    if (/^(\{mother\}|mẹ|má)$/i.test(w)) return { parentDie: "mother" };
    if (/^(\{father\}|cha|bố)$/i.test(w)) return { parentDie: "father" };
    if (/^(cha mẹ|bố mẹ|\{father\} và \{mother\})$/i.test(w)) return { parentDie: ["father", "mother"] };
    return null;
  }
  let m;
  function outcome(o, ctx) {
    if (!o) return null;
    const r = { text: ren(o.text) };
    // "… vỡ sọ. CHẾT.", "(CHẾT) …", "CHẾT (ghi chú)", "(Dòng đời: …)": a death written inside the text
    let note = null;
    const dl = r.text.match(/\(Dòng đời:\s*([^)]*)\)/i);
    if (dl) { note = dl[1].trim(); r.text = r.text.replace(dl[0], "").trim(); }
    if (/\(CHẾT\)|(^|\s)CHẾT(?=$|[\s.(])/.test(r.text)) {
      const cm = r.text.match(/CHẾT\s*\(([^)]*)\)/);
      if (cm) note = note || cm[1].trim();
      r.text = r.text.replace(/\s*\(CHẾT\)\s*/g, " ").replace(/\s*CHẾT\s*(\([^)]*\))?\.?/g, " ").replace(/\s+/g, " ").trim();
      if (!o.eff.death) o.eff.death = note ? note.charAt(0).toUpperCase() + note.slice(1).replace(/\.?$/, ".") : "Bạn chết.";
    }
    const eff = effects(o.eff, ctx);
    const other = o.eff.death && otherDeath(o.eff.death);
    if (other) Object.assign(eff, other);
    if (Object.keys(eff).length) r.effects = eff;
    if (o.eff.death && !other) r.death = deathText(o.eff.death, r.text);
    if (o.eff.end) r.end = o.eff.end;
    if (o.eff.next != null) r.next = o.eff.next;
    return r;
  }

  // ---- "KHÓA nếu ..." → requirement ----
  function lockReq(text) {
    const parts = text.split(/\s+hoặc\s+/i);
    const reqs = parts.map((p) => {
      const r = {};
      const low = p.toLowerCase();
      const fl = [...p.matchAll(/["“]([a-z0-9_]+)["”]/g)].map((x) => x[1]);
      if (fl.length) r.flags = fl;
      for (const m of low.matchAll(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|danh vọng|tài sản)\s*(?:dưới|từ|>|>=|trên|ít nhất)?\s*(\d+)/g)) r[STAT[m[1]]] = Number(m[2]);
      return r;
    }).filter((r) => Object.keys(r).length);
    if (!reqs.length) return null;
    return reqs.length === 1 ? reqs[0] : { any: reqs };
  }

  function choice(c, ctx) {
    // one choice per mark when the script gives different outcomes for different past marks
    if (c.variants && Object.keys(c.variants).length > 1) {
      return Object.entries(c.variants).map(([flag, v]) => {
        const one = choice(Object.assign({}, c, { variants: null, success: v.success || c.success, fail: v.fail || c.fail }), ctx);
        if (one) one.require = Object.assign({}, one.require || {}, { flags: [flag] });
        return one;
      });
    }
    const ch = { label: ren(c.label) };
    // "(Nếu có rival_a_1_submissive) Sủa như chó để qua": only shown with that mark
    const only = ch.label.match(/^\(nếu có\s+([^)]+)\)\s*/i);
    if (only) {
      ch.label = ch.label.slice(only[0].length);
      const fl = only[1].split(/\s*(?:,|\/|hoặc)\s*/).map((x) => x.replace(/["“”]/g, "").trim()).filter((x) => /^[a-z0-9_]+$/.test(x));
      if (fl.length) ch.require = Object.assign(ch.require || {}, fl.length > 1 ? { anyFlags: fl } : { flags: fl });
    }
    if (c.lock) { const rq = lockReq(c.lock); if (rq) { ch.require = rq; ch.showLocked = true; } }
    if (c.needFlags) { ch.require = Object.assign(ch.require || {}, { flags: c.needFlags }); ch.showLocked = true; }
    if (c.needAnyFlags) { ch.require = Object.assign(ch.require || {}, c.needAnyFlags.length > 1 ? { anyFlags: c.needAnyFlags } : { flags: c.needAnyFlags }); }
    if (c.onlyFlags) ch.require = Object.assign(ch.require || {}, { flags: c.onlyFlags }); // hidden without the mark
    if (c.check && c.success && c.fail) {
      ch.check = { stat: c.check.stat, target: target(c.check.stat, c.check.diff) };
      ch.success = outcome(c.success, ctx);
      ch.fail = outcome(c.fail, ctx);
      // Mark fatal checks and severe injuries explicitly for the player. Authors
      // can mark lower-damage combat/escape checks with SINH TỬ in the script.
      if (c.lethal || ch.fail.death || (ch.fail.effects && ch.fail.effects.health <= -30)) {
        ch.risk = "lethal";
        if (!ch.fail.death) {
          const damage = c.check.diff >= 4 ? 50 : c.check.diff >= 3 ? 45 : 35;
          ch.fail.effects = Object.assign({}, ch.fail.effects, { health: Math.min(ch.fail.effects?.health || 0, -damage) });
        }
      }
    } else {
      const o = outcome(c.plain || c.success, ctx);
      if (!o || !o.text) { report.push(`  ! lựa chọn trống: ${c.label}`); return null; }
      Object.assign(ch, o);
    }
    return ch;
  }

  // ---- "Khi nào" → conditions ----
  const num = (s) => Number(String(s).replace(/\./g, "").replace(",", "."));
  function stagesFor(text) {
    const set = new Set();
    // "bậc 1–2" is a rank, not an age
    text = text.replace(/bậc\s*\d+\s*(?:[–-]\s*\d+|hoặc\s*\d+|trở lên|\+)?/gi, "");
    // "2-3 năm sau sự kiện…", "10 năm sau" are delays, not ages
    text = text.replace(/(?:khoảng\s*)?\d+(?:\s*[–-]\s*\d+)?\s*năm sau/gi, "").replace(/sau khoảng\s*\d+\s*năm/gi, "");
    // "Danh vọng trên 10", "Sức khỏe dưới 20" are stat checks, not ages
    text = text.replace(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|hạnh phúc|tài sản|danh vọng|thân thiết[^·.]*?)\s*(?:>|<|>=|từ|trên|dưới|lớn hơn|ít nhất)?\s*\d[\d.]*\s*(?:trở lên)?/gi, "");
    const low = text.toLowerCase();
    if (/bất (kỳ|cứ) lúc nào/.test(low) && !/trưởng thành|tuổi/.test(low)) return [];
    const ranges = [];
    for (const m of text.matchAll(/(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)/g)) ranges.push([num(m[1]), num(m[2])]);
    for (const m of text.matchAll(/(\d[\d.]*)\s*\+/g)) ranges.push([num(m[1]), Infinity]);
    for (const m of text.matchAll(/(tuổi|trên)\s*(\d[\d.]*)(?![\d.])(?!\s*[–-]\s*\d)(\s*(?:tuổi)?\s*(?:trở lên)?)/gi)) {
      if (/\+/.test(m[0])) continue;
      // "tuổi 25" alone is that age; "trên 40", "tuổi 40 trở lên" are open-ended
      if (/^tuổi$/i.test(m[1]) && !/trở lên/i.test(m[3]) && !/^\s*\+/.test(text.slice(m.index + m[0].length))) ranges.push([num(m[2]), num(m[2]) + 0.5]);
      else ranges.push([num(m[2]), Infinity]);
    }
    for (const [a, b] of ranges) {
      scriptStages.forEach((s, i) => {
        const end = scriptStages[i + 1] ? scriptStages[i + 1].start : Infinity;
        if (s.start < b && end > a) set.add(s.id);
      });
    }
    if (!set.size) {
      const phrases = Object.assign({}, meta.stagePhrases || {});
      for (const s of stages) phrases[s.name.toLowerCase()] = s.id;
      for (const s of (profile.stages || [])) phrases[s.name.toLowerCase()] = s.id;
      for (const [ph, st] of Object.entries(phrases)) if (ph && low.includes(ph)) st.split(",").forEach((x) => set.add(x));
      if (/bất kỳ lúc trưởng thành|bất cứ lúc nào trên/.test(low)) ["adult", "middle", "elder"].forEach((x) => set.add(x));
    }
    return [...set].filter((x) => stages.some((s) => s.id === x));
  }

  function when(text, ctx) {
    const out = { require: {} };
    if (!text) return out;
    const low = text.toLowerCase();
    let m;
    const st = stagesFor(text);
    if (st.length && st.length < stages.length) out.stages = st;
    for (const [fid, f] of Object.entries(meta.focus)) {
      if (!f.name) continue;
      const n = f.name.toLowerCase();
      if (low.includes("việc chính: " + n) || low.includes("· " + n) || (n.length >= 5 && low.includes(n))) out.focus = [fid];
    }
    if (ctx.role) {
      if ((m = low.match(/bậc (\d+)\s*[–-]\s*(\d+)/))) { out.require.jobRank = Number(m[1]) - 1; if (Number(m[2]) < 5) out.require.jobRankMax = Number(m[2]) - 1; }
      else if ((m = low.match(/bậc (\d+) hoặc (\d+)/))) { out.require.jobRank = Number(m[1]) - 1; out.require.jobRankMax = Number(m[2]) - 1; }
      else if ((m = low.match(/(?:từ )?bậc (\d+)(?: trở lên)?/))) out.require.jobRank = Number(m[1]) - 1;
    }
    if (ctx.rank && (m = low.match(/bậc (\d+)/))) out.require.guildRank = Number(m[1]) - 1;
    // "Không mang dấu ấn X" / "chưa có dấu ấn X" forbids the mark
    const notFl = [...text.matchAll(/(?:không (?:mang|có)|chưa (?:mang|có)|chưa từng có)\s+dấu ấn\s+["“]?([a-z][a-z0-9_]+)["”]?/gi)].map((x) => x[1]);
    if (notFl.length) out.require.notFlags = notFl;
    const fl = [...text.matchAll(/dấu ấn\s+["“]?([a-z][a-z0-9_]+)["”]?(?![A-Za-zÀ-ỹ])/gi)].map((x) => x[1]).filter((f) => !notFl.includes(f));
    const more = [...text.matchAll(/(?:hoặc|có)\s+["“]([a-z0-9_]+)["”]/gi), ...text.matchAll(/dấu ấn\s+["“]?[a-z][a-z0-9_]+["”]?\s+hoặc\s+["“]?([a-z][a-z0-9]*_[a-z0-9_]+)/gi)].map((x) => x[1]);
    // "dấu ấn a, b hoặc c"
    const listed = [...text.matchAll(/dấu ấn\s+([a-z0-9_"“”,\s]+?(?:\s*hoặc\s+["“]?[a-z][a-z0-9_]+)+)/gi)].flatMap((x) => x[1].match(/[a-z][a-z0-9]*_[a-z0-9_]+/g) || []).filter((f) => !notFl.includes(f));
    const allFl = [...new Set([...fl, ...more, ...listed])];
    if (allFl.length) { if (/hoặc/.test(low) && allFl.length > 1) out.require.anyFlags = allFl; else out.require.flags = allFl; }
    if (/cha và mẹ còn sống|cha mẹ còn sống/.test(low)) { out.require.fatherAlive = true; out.require.motherAlive = true; }
    else {
      if (/\{mother\}\)? còn sống|mẹ còn sống/.test(low)) out.require.motherAlive = true;
      if (/\{father\}\)? còn sống|cha còn sống/.test(low)) out.require.fatherAlive = true;
    }
    if (/\{maker\}.{0,20}còn sống|chủ nhân còn sống|có \{maker\}/.test(low)) out.require.makerAlive = true;
    if (/\{father\} (đã )?chết|\{father\} qua đời/.test(low)) out.require.fatherAlive = false;
    if (/\{mother\} (đã )?chết|\{mother\} qua đời/.test(low)) out.require.motherAlive = false;
    if (/\{spouse\}/.test(low) && !/chưa có/.test(low)) out.require.spouse = out.require.spouse !== undefined ? out.require.spouse : true;
    if (/thân thiết\s*(>|trên|từ)/.test(low) && /\{ally\}|thân thiết/.test(low)) out.require.party = 1;
    if (/có (đồng đội )?\{ally\}|có đồng đội|đi cùng \{ally\}|ít nhất \d+ đồng đội/.test(low)) out.require.party = 1;
    if (!/không phải tính/.test(low))
      for (const [w, t] of Object.entries(TRAITS)) if (low.includes("tính " + w) || low.includes("tính cách " + w) || low.includes("{ally} " + w)) out.require.allyTrait = t;
    if (/chưa có (\{spouse\}|bạn đời|bạn tình)/.test(low)) out.require.spouse = false;
    if ((m = text.match(/CẦN ([A-ZĐ][a-zà-ỹ]+) còn trong đội/))) out.require.bandMember = m[1];
    else if (/(đã )?có \{spouse\}|đã có bạn đời/.test(low)) out.require.spouse = true;
    if (/chưa có \{child\}/.test(low)) out.require.noChildren = true;
    else if (/có \{child\}|\{child\}/.test(low)) out.require.children = 1;
    for (const [w, era] of Object.entries(ERA_WORDS)) if (text.includes(w)) out.eras = [...new Set([...(out.eras || []), era])];
    for (const mm of low.matchAll(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|danh vọng|tài sản|sức khỏe)\s*(?:>|từ|>=|trên|lớn hơn)\s*(\d+)/g)) out.require[STAT[mm[1]]] = Math.min(mm[1] === "tài sản" ? 90 : 99, Number(mm[2]));
    if ((m = low.match(/có ít nhất (\d+) tài sản/))) out.require.wealth = Math.min(90, Number(m[1]));
    for (const mm of low.matchAll(/(sức khỏe|tài sản|hạnh phúc)\s*dưới\s*(\d+)/g)) out.require.below = Object.assign(out.require.below || {}, { [STAT[mm[1]]]: Number(mm[2]) });
    if ((m = low.match(/thân thiết với \{ally\}\s*<\s*(\d+)/))) out.require.below = Object.assign(out.require.below || {}, { bond: Number(m[1]) });
    return out;
  }

  // ---- origins ----
  function person(s) {
    if (!s) return null;
    const p = s.split("·").map((x) => x.trim());
    const unknown = /^không rõ/i.test(p[0]);
    const st = (p.length > 1 ? p[p.length - 1] : p[0]).toLowerCase();
    // A parent the script tells as killed, sacrificed or lost at the birth is not waiting at home
    // ("Bị hành quyết khi bạn vừa ra đời", "Chết cóng…", "rồi mất tích"). "Không rõ sống chết" stays unknown,
    // a nameless parent "không rõ tung tích" stays unknown, and "còn sống, đã bỏ đi" is gone.
    const dead = /đã chết|đã mất|vừa chết|chết|bị .*giết|giết chết|tử trận|đã khuất|tự sát|qua đời|hành quyết|hiến tế|thanh trừng|sát hại|thiêu rụi|cắt cổ|kéo tuột xuống|nhảy xuống vực|bị xử tử/;
    const gone = /bỏ đi|bỏ chạy|bỏ trốn|bỏ rơi|lang thang|không tung tích|không rõ tung tích|biệt tích|mất tích|biến mất|bị bán|bán đi/;
    const status = /(?:không|chưa) rõ sống chết/.test(st) ? "unknown"
      : dead.test(st) ? "dead"
      : unknown && /không (?:rõ )?tung tích/.test(st) ? "unknown"
      : gone.test(st) ? "gone"
      : unknown ? "unknown"
      : "alive";
    let name = unknown ? null : ren(p[0]).replace(/\{(father|mother|maker)\}\s*/g, "").trim() || null; // "{maker} Xanthus" → "Xanthus"
    if (name && /^\{(father|mother|maker)\}$/.test(name)) name = null; // the script left the name to the game
    if (name && name.length > 40) name = null;
    return { name, race: ren(p[1] || ""), role: ren(p[2] || ""), trait: ren(p[3] || ""), status, note: ren(p.slice(4).join(" · ")) };
  }
  const origins = parsed.origins.map((o) => {
    const st = (meta.subtypes || []).find((x) => new RegExp(`tộc ${x.word}(?![a-zà-ỹ])`, "i").test(o.name + " " + (o.tail || "")));
    const out = { id: o.id, name: ren(o.name).replace(/\s*\(chỉ [^)]*\)\s*/i, " ").trim(), weight: o.weight, text: ren(o.text), siblings: ren(o.siblings || ""), home: ren(o.home || ""), effects: effects(o.effects || {}) };
    const f = person(o.father), mo = person(o.mother), mk = person(o.maker);
    if (f) out.father = f;
    if (mo) out.mother = mo;
    if (mk) out.maker = mk;
    // parents the script describes in prose instead of "name · race · role · status"
    for (const [who, pv] of Object.entries((meta.parents || {})[o.id] || {})) {
      if (pv === null) delete out[who];
      else out[who] = Object.assign({ name: null, race: "", role: "", trait: "", status: "alive", note: "" }, pv);
    }
    if (!f && !mo) out.noParents = true;
    if (o.past) out.past = ren(o.past);
    if (st) out.subtype = st.id;
    return out;
  });

  // "Sức mạnh từ 5, hoặc có dấu ấn x, y" → { require, alt } when the meta does not spell them out
  function condReq(text) {
    if (!text) return {};
    const parts = text.split(/\s*(?:,\s*)?(?:\bhoặc\b|\bHOẶC\b|đặc cách|lối vào phụ|tự động mở)/i);
    const main = parts[0].toLowerCase();
    const require = {};
    for (const m of main.matchAll(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|tài sản|danh vọng)\s*(?:từ|>|>=|trên|ít nhất)?\s*(\d+)\s*\+?/g)) {
      const k = STAT[m[1]];
      require[k] = k === "health" && Number(m[2]) < 20 ? Number(m[2]) * 8 : Number(m[2]);
    }
    const flags = [...text.matchAll(/["“]?\b([a-z][a-z0-9]*_[a-z0-9_]+)\b["”]?/g)].map((x) => x[1]);
    // "Hoặc có xuất thân "Con nhà thợ mỏ Răng Cưa"": that origin's marks
    for (const m of text.matchAll(/xuất thân\s+["“]([^"”]+)["”]/gi))
      for (const o of parsed.origins) if (o.name.toLowerCase().includes(m[1].toLowerCase().trim())) flags.push(...((o.effects && o.effects.flags) || []));
    const out = { require };
    if (flags.length) out.alt = { anyFlags: [...new Set(flags)], hint: "có xuất thân / dấu ấn phù hợp" };
    return out;
  }

  // ---- roles → jobs ----
  const jobs = meta.roles.map((r, i) => {
    const src = parsed.roles[i] || {};
    const ranks = r.ranks || (src.ranks || []).map((x) => mangaName(ren(x)));
    const promoSrc = r.promo || (src.promo || []).map((p, k) => ({ text: p.text, diff: p.diff != null ? p.diff : k + 1, stat: p.stat || r.stat }));
    return {
      id: r.id, name: r.name, stat: r.stat, combat: r.combat !== false, desc: r.desc,
      require: r.require || condReq(src.require).require, alt: r.alt || condReq(src.require).alt, ranks, ranksF: r.ranksF,
      income: r.income || [0.8, 1.3, 2, 2.8, 3.8], hazard: r.hazard || 1.3, gains: r.gains || { [r.stat]: 0.3 },
      promoXp: r.promoXp || meta.promoXp,
      promoTarget: promoSrc.map((p) => target(p.stat || r.stat, p.diff)),
      promoStat: promoSrc.map((p) => p.stat || r.stat),
      promo: promoSrc.map((p) => "Thử thách để trở thành {next}: " + ren(p.text).replace(/\s*\((?:sức mạnh|trí tuệ|nhanh nhẹn|may mắn)[^)]*\)/gi, "").replace(/^\(?\d\s*(?:→|->|lên)\s*\d\)?\s*:?\s*/, "").replace(/^./, (x) => x.toLowerCase()).replace(/\.?$/, ".")),
      start: ren(r.start || src.start || "").replace(/\s*Thử thách thăng bậc\s*:?\s*$/i, ""),
      quiet: (r.quiet || (src.quiet || []).map((q) => q.text || q)).map(ren),
    };
  });
  const roleOf = (e) => {
    if (e.role != null && meta.roles[e.role]) return meta.roles[e.role].id;
    for (const [pre, id] of Object.entries(meta.roleByPrefix || {})) if (e.id.startsWith(pre)) return id;
    return null;
  };
  const focusOf = (e) => {
    if (e.focus != null && meta.focusOrder && meta.focusOrder[e.focus]) return meta.focusOrder[e.focus];
    for (const [pre, id] of Object.entries(meta.focusByPrefix || {})) if (e.id.startsWith(pre)) return id;
    return null;
  };

  // ---- events ----
  const events = [];
  const deaths = [];
  for (const e of parsed.events) {
    const o = (meta.overrides || {})[e.id] || {};
    if (o.skip) continue;
    const deathLike = o.asDeath || (!o.keep && (/tử vong|cái chết tự nhiên|chết già/i.test(e.title || "") && !e.choices.length) || /đạt tuổi thọ tối đa|trước khi qua đời do hết tuổi|hết tuổi thọ|tuổi thọ đạt giới hạn/i.test(e.when || "") ? "old" : null);
    if (deathLike) { deaths.push({ id: e.id, kind: deathLike, text: [ren(e.text), ren(e.auto ? e.auto.text : "")].filter(Boolean).join(" ").replace(/\s*(→\s*)?CHẾT\.?\s*(\([^)]*\))?\.?\s*$/, "") }); continue; }
    const rid = e._story ? null : roleOf(e); // story nodes are about people, not trades
    const ctx = { role: !!rid, rank: !!e.rank };
    const w = when(e.when, ctx);
    const ev = { id: e.id, text: ren(e.text || "") };
    if (w.stages) ev.stages = w.stages;
    if (w.eras) ev.eras = w.eras;
    const fo = focusOf(e) || (w.focus && w.focus[0]);
    if (fo) ev.focus = [fo];
    const req = Object.assign({}, w.require);
    if (rid) req.job = rid;
    // companion events always need a companion
    if ((/_ally_|_team_|_squad_/.test(e.id) || (!e._story && /_party_/.test(e.id))) && !req.party) req.party = 1;
    // story nodes: who they are about, and they come first when due
    if (e._story) {
      let sm;
      if ((sm = e.id.match(/_cast_(rival|mentor|friend)_([a-z])_\d/))) { req.cast = `${sm[1]}_${sm[2]}`; req.castAlive = sm[1]; req.free = true; }
      else if ((sm = e.id.match(/_band_(band_[a-z])_(m?\d+)$/))) {
        if (sm[2] === "1") req.noBand = true;
        else {
          req.band = sm[1];
          const who = (e.beat || "").match(/\(([^)]+)\)/);
          if (sm[2].startsWith("m") && who) req.bandMember = who[1].trim();
        }
      } else if ((sm = e.id.match(/_party_(party_[a-z])_(join|m?\d+)$/))) {
        if (sm[2] === "join") req.noBand = true;
        else req.band = sm[1];
        if (!ev.stages) ev.stages = ["teen"];
      } else if (/_recruit_\d+$/.test(e.id)) { req.bandLead = true; req.partyMax = 2; if (!ev.stages) ev.stages = ["adult"]; }
      else if (/_lead_1$/.test(e.id)) { req.bandLead = false; req.any = [{ guildRank: 2 }, { jobRank: 2 }]; ev._found = true; }
      else if (/_lead_(link_)?\d+$/.test(e.id)) { req.bandLead = true; if (!ev.stages) ev.stages = ["adult"]; }
      else if (/_minion_rec_[a-z]$/.test(e.id)) req.minionOk = true;
      else if (/_minion_\d+$/.test(e.id)) req.minions = 1;
      else if ((sm = e.id.match(/_minion_(hob|sham|king)_/))) { req.form = { hob: "Hobgoblin", sham: "Goblin Shaman Lord", king: "Goblin King" }[sm[1]]; req.minions = 1; }
      // v3 prompts for other races: <race>_minion_f<n>_<k>, f1 = the first evolution of the pack
      else if ((sm = e.id.match(/_minion_f(\d+)_/))) { const f = (meta.evos || [])[Number(sm[1]) - 1]; if (f) req.form = f.name || f.form || f; }
      if ((sm = (e.when || "").match(/\{(rival|mentor|friend)\} còn sống/))) req.castAlive = sm[1];
      // an origin's arc belongs to that origin only (some origins give no mark of their own)
      if ((sm = e.id.match(/_arc_(.+?)_\d+[a-z]?$/))) {
        let codes = {};
        try { codes = JSON.parse(fs.readFileSync(path.join(ROOT, "prompts", "v3", "arc-codes.json"), "utf8"))[raceId] || {}; } catch (err) {}
        const code = sm[1];
        const o = (meta.storyOrigins && meta.storyOrigins[code]) || codes[code] || (origins.find((x) => x.id === code || x.id.endsWith("_" + code)) || {}).id;
        if (o) req.origin = o;
      }
      // a node must not be missed for want of the right "việc chính": the activity is only flavour
      delete ev.focus;
      // scripts sometimes use the Human stat scale (Sức mạnh > 15); bring it to this race's scale
      if (meta.storyStatScale) for (const k of STAT_KEYS) if (req[k] > 10) req[k] = Math.round(req[k] * meta.storyStatScale);
      ev.arc = e.arc || null;
      if (e.recall && e.recall.length) ev.recall = e.recall.map((r) => ({ flags: r.flags, text: ren(r.text) }));
      ev.weight = /_arc_/.test(e.id) ? 100 : /_band_.*_1$/.test(e.id) ? 35 : /_minion_rec_/.test(e.id) ? 25 : /_minion_/.test(e.id) ? 15 : 40;
    }
    for (const st of meta.subtypes || []) if (new RegExp(`(beastman )?tộc ${st.word}(?![a-zà-ỹ])`, "i").test(e.when || "")) req.subtype = st.id;

    // evolutions: sign → ascension → after
    // scripts without "NHÁNH" headers: the branch is named in the id (troll_evo_stone_sign → key "stone")
    let evoIdx = e.evo;
    if (evoIdx == null) { const km = e.id.match(/_(?:evo|post)_([a-z]+)/); if (km) { const k = evoDefs.findIndex((d) => d.key === km[1]); if (k >= 0) evoIdx = k; } }
    if (evoIdx != null && evoDefs[evoIdx] && (/evo|post|tien_hoa|_sign|signal|foreshadow/.test(e.id) || /đã tiến hóa/i.test(e.when || ""))) {
      const d = evoDefs[evoIdx];
      const flag = "evo_sign_" + d.key;
      const t = e.title || "";
      const isPost = /sau khi tiến hóa/i.test(t);
      if (!isPost && (/sign|foreshadow|bao_hieu|signal/.test(e.id) || /báo hiệu/i.test(t))) { Object.assign(req, d.require || {}, { form: "none", notFlags: [flag] }); if (d.minAge) ev.minAge = d.minAge; ev.weight = 10; ev._addFlags = [flag]; }
      else if (isPost || /post/.test(e.id) || /đã tiến hóa/i.test(e.when || "")) req.form = d.name;
      else { req.form = "none"; req.flags = [flag]; ev.weight = 12; ev._ascend = d; }
      delete ev.stages;
    }
    // "Thuộc chuỗi …": the second step of a chain needs one of the marks the step before it gives
    const prevEv = parsed.events[parsed.events.indexOf(e) - 1];
    const sameChain = prevEv && /_chain/.test(e.id) && prevEv.id.replace(/_[^_]+$/, "") === e.id.replace(/_[^_]+$/, "");
    if ((/thuộc chuỗi|sau sự kiện|dấu ấn cũ/i.test(e.when || "") || sameChain) && !req.flags && !req.anyFlags) {
      const prev = prevEv;
      const given = new Set();
      for (const ch of (prev && prev.choices) || []) for (const oc of [ch.success, ch.fail, ch.plain]) for (const f of (oc && oc.eff && oc.eff.flags) || []) given.add(f);
      if (prev && prev.auto) for (const f of prev.auto.eff.flags || []) given.add(f);
      if (given.size) req.anyFlags = [...given];
    }
    if (/cha\/mẹ (vừa|đã) qua đời|cha mẹ (vừa|đã) qua đời|\{father\} hoặc \{mother\} (vừa |đã )?(qua đời|chết)/i.test(e.when || "")) req.any = [{ fatherAlive: false }, { motherAlive: false }];
    if (o.require && (o.require.any || o.require.flags || o.require.anyFlags)) { delete req.flags; delete req.anyFlags; }
    if (o.require && o.require.any) { delete req.fame; delete req.wealth; }
    Object.assign(req, o.require || {});
    if (req.captiveKinds) delete req.free;
    for (const k of Object.keys(o.unrequire || {})) delete req[k];
    if (Object.keys(req).length) ev.require = req;
    // "{child} ở giai đoạn Troll nhí" is the child's age, not yours: child events follow your own life
    if (ev.stages && req.children && /\{child\}[^·]*(giai đoạn|tuổi|trưởng thành|bước vào)|\{child\} (là |còn )?(một )?[A-ZĐ]/i.test(e.when || "")) {
      const own = stagesFor((e.when || "").split("·").filter((seg) => !/\{child\}/.test(seg)).join(" · "));
      if (own.length && own.length < stages.length) ev.stages = own;
      else delete ev.stages;
    }
    // events the script gives no stage for skip stages where the race cannot act yet (a dragon egg)
    if (!ev.stages && meta.defaultStages && !/_evo_|_post_/.test(e.id)) ev.stages = meta.defaultStages;
    if (o.stages) ev.stages = o.stages;
    if (o.npcs) ev.npcs = o.npcs;
    if (o.focus) ev.focus = o.focus;
    if (o.eras) ev.eras = o.eras;
    if (o.minAge != null) ev.minAge = o.minAge;
    if (o.weight) ev.weight = o.weight;
    if (!ev.text) ev.text = ren(e.title || "");

    if (e.choices.length) {
      ev.choices = e.choices.flatMap((c) => choice(c, ctx)).filter(Boolean);
      for (const [i, patch] of Object.entries(o.choiceEffects || {})) {
        const ch = ev.choices[i];
        if (!ch) continue;
        for (const [key, eff] of Object.entries(patch)) {
          const tgt = key === "plain" ? ch : ch[key];
          if (tgt) tgt.effects = Object.assign(tgt.effects || {}, eff);
        }
      }
      // a birth event gives a child, even when the script forgot to say so
      if (/_born|_birth|sinh_con/.test(e.id) && !JSON.stringify(ev.choices).includes('"child"'))
        for (const ch of ev.choices) for (const tgt of [ch.success, ch.check ? null : ch].filter(Boolean)) if (!tgt.death) tgt.effects = Object.assign(tgt.effects || {}, { child: true });
      // a won courtship means a mate, even when the script forgot to say so
      if (/marriage|mating|_mate_|romance/.test(e.id) && !JSON.stringify(ev.choices).includes('"marry"')) {
        for (const ch of ev.choices) {
          const tgt = ch.check ? ch.success : (/\{spouse\}/.test(ch.text || "") ? ch : null);
          if (tgt && !tgt.death) tgt.effects = Object.assign(tgt.effects || {}, { marry: true });
        }
      }
      if (o.choices) ev.choices = o.choices;
      // replace or drop whole fields of a choice: { 2: { death: null } }
      for (const [i, patch] of Object.entries(o.choicePatch || {})) {
        const ch = ev.choices[i];
        if (ch) for (const [k, v] of Object.entries(patch)) { if (v === null) delete ch[k]; else ch[k] = v; }
      }
      if (ev._ascend) {
        // a successful ascension must actually change the form
        for (const ch of ev.choices) for (const tgt of [ch.success, ch.text != null && !ch.check ? ch : null].filter(Boolean)) if (tgt.effects && tgt.effects.evolve == null && /tiến hóa|lột xác|đổi dạng|thăng hoa|trở thành/i.test(tgt.text)) tgt.effects.evolve = ev._ascend.name;
      }
      const addFlags = [...(o.addFlags || []), ...(ev._addFlags || [])];
      if (addFlags.length) for (const ch of ev.choices) for (const tgt of [ch.success, ch.fail, ch.text != null ? ch : null].filter(Boolean)) tgt.effects = Object.assign(tgt.effects || {}, { flags: [...((tgt.effects || {}).flags || []), ...addFlags] });
      if (ev.choices.length === 1 && ev.choices[0].check && ev.arc) {
        // story node with one risky option: let the player walk away, but the node stays used
        ev.choices.push({ label: "Lờ đi", text: "Bạn quyết định không dính vào chuyện này." });
      } else if (ev.choices.length === 1 && ev.choices[0].check && ev._ascend) {
        ev.choices.push({ label: (meta.decline && meta.decline.label) || "Kìm nén lại, chờ dịp khác", text: (meta.decline && meta.decline.text) || "Bạn ép mọi thứ lắng xuống. Cơ hội này sẽ còn quay lại." });
        ev.once = false;
      } else if (ev.choices.length === 1 && ev.choices[0].check) {
        // an ordinary scene (a fight, a fall, a deal): stepping back is the safe road, not "next time"
        ev.choices.push({ label: "Không liều lĩnh", text: "Bạn chọn đường an toàn, chấp nhận bỏ lỡ lần này." });
      }
      if (ev._ascend && ev.choices.length >= 2) ev.once = false;
      if (ev.choices.length < 2) {
        const only = ev.choices[0];
        delete ev.choices;
        if (only) { ev.result = only.text; if (only.effects) ev.effects = only.effects; if (only.death) ev.death = only.death; }
      }
    } else if (e.variants && e.variants.length) {
      // the result depends on a mark from an earlier event: only the matching path is shown
      ev.choices = e.variants.map((v) => Object.assign({ label: (meta.continueLabel || "Đối mặt"), require: { flags: [v.flag] } }, outcome(v.auto, ctx)));
      ev.once = true;
    } else if (e.auto) {
      if (ev.text && e.auto.text && ev.text !== ren(e.auto.text)) ev.result = ren(e.auto.text);
      else if (e.auto.text) ev.text = ren(e.auto.text);
      const eff = effects(e.auto.eff, ctx);
      if (/_born|_birth|sinh_con/.test(e.id) && !eff.child) eff.child = true;
      const addFlags = [...(o.addFlags || []), ...(ev._addFlags || [])];
      if (addFlags.length) eff.flags = [...(eff.flags || []), ...addFlags];
      const other = e.auto.eff.death && otherDeath(e.auto.eff.death);
      if (other) Object.assign(eff, other);
      if (Object.keys(eff).length) ev.effects = eff;
      if (e.auto.eff.death && !other) ev.death = deathText(e.auto.eff.death, e.auto.text);
    } else if (ev._addFlags) ev.effects = { flags: ev._addFlags };
    delete ev._addFlags;
    delete ev._ascend;
    if (o.effects) ev.effects = Object.assign(ev.effects || {}, o.effects);
    if (e.moment) ev.moment = ren(e.moment);
    if (JSON.stringify(ev.choices || ev.effects || {}).includes('"marry":true') && !(ev.require && ev.require.spouse === false)) ev.require = Object.assign(ev.require || {}, { spouse: false }); // a wedding needs someone still single
    // ...and someone grown up: a mating scene with no age written waits for adulthood
    if (JSON.stringify(ev.choices || ev.effects || {}).includes('"marry":true') && !(ev.stages && ev.stages.length)) ev.stages = ["teen", "adult", "middle", "elder", "ancient"];
    if (!ev.text) { report.push(`  ! bỏ qua ${e.id}: không có nội dung`); continue; }
    // a story node that missed its stage can still come later: the chain matters more than the age
    if (ev._found) { for (const ch of ev.choices || []) for (const t of [ch.success, ch.fail, ch]) if (t && t.effects && t.effects.bandLead) { delete t.effects.bandLead; t.effects.foundBand = true; } delete ev._found; }
    if (ev.arc && !(ev.stages && ev.stages.length)) ev.stages = ["child"]; // never in the cradle
    if (ev.arc && ev.stages && ev.stages.length) {
      const ORDER = ["infant", "child", "teen", "adult", "middle", "elder", "ancient"];
      const from = Math.min(...ev.stages.map((x) => ORDER.indexOf(x)).filter((i) => i >= 0));
      // short lives: a race can let its chains run a stage ahead of what the script wrote (the flags still keep the order)
      const shift = /_arc_|_cast_|_band_/.test(ev.id) && !/_band_.*_1$/.test(ev.id) ? meta.storyStageShift || 0 : 0;
      // ...and a scene written for a child should not turn up in old age: at most one stage late
      const to = Math.max(...ev.stages.map((x) => ORDER.indexOf(x)));
      if (Number.isFinite(from)) ev.stages = ORDER.slice(Math.max(1, from - shift), to >= ORDER.indexOf("elder") || !/_arc_|_cast_|_join$|_lead_1$|_band_band_[a-z]_1$/.test(ev.id) ? ORDER.length : to + 1 + (meta.storyStageLate || 1));
    }
    // nobody signs up with a band or a party while still a child, whatever age the script wrote
    if (e._story && /_join$|_band_band_[a-z]_1$|_lead_1$|_recruit_\d+$/.test(ev.id)) {
      const grown = (ev.stages || ["teen", "adult", "middle", "elder", "ancient"]).filter((x) => x !== "infant" && x !== "child");
      ev.stages = grown.length ? grown : ["teen"];
    }
    events.push(ev);
    report.push(`${e.id.padEnd(34)} ${(ev.stages || ["*"]).join(",").padEnd(22)} ${(ev.focus || ["-"]).join(",").padEnd(9)} ${JSON.stringify(ev.require || {})}${ev.eras ? " eras=" + ev.eras : ""}${ev.choices ? "" : " [không lựa chọn]"}`);
  }

  // story nodes must not wait for a flag nothing gives ("tuổi 11+ hoặc dấu ấn survived")
  {
    const made = new Set();
    const walk = (o) => { if (!o || typeof o !== "object") return; if (Array.isArray(o.flags) && !o.stat) o.flags.forEach((f) => made.add(f)); for (const v of Object.values(o)) walk(v); };
    for (const ev of events) { walk(ev.effects); walk(ev.choices); }
    for (const o of parsed.origins || []) walk(o);
    for (const ev of events) if (ev.arc && ev.require && ev.require.flags) {
      ev.require.flags = ev.require.flags.filter((f) => made.has(f));
      if (!ev.require.flags.length) delete ev.require.flags;
    }
  }

  // ---- quests ----
  const quests = parsed.quests.map((q) => {
    const qo = (meta.questOverrides || {})[q.id] || {};
    const id = q.id.startsWith(raceId.slice(0, 4)) || q.id.startsWith("hd_") ? q.id : `${raceId}_q_${q.id}`;
    const ctx = { rank: true };
    const steps = q.steps.map((s) => {
      const st = { text: ren(s.text || s.title || "") };
      if (s.auto || !s.choices.length) {
        const a = s.auto ? outcome(s.auto, ctx) : { text: "" };
        st.auto = { text: a.text };
        if (a.effects) st.auto.effects = a.effects;
        if (a.end) st.auto.end = a.end;
        if (a.next != null) st.auto.next = a.next;
        if (a.death) st.auto.death = a.death;
      } else st.choices = s.choices.flatMap((c) => choice(c, ctx)).filter(Boolean);
      return st;
    });
    const rew = q.reward ? effects(q.reward.eff, ctx) : {};
    const out = {
      id, org: meta.org.id, name: ren(q.name).replace(/\s*\((thời đại|bậc tối thiểu)[^)]*\)\s*$/i, ""), minRank: q.minRank ? Math.max(0, q.minRank - 1) : q.minRankName ? Math.max(0, rankIndex(q.minRankName)) : 0, hint: ren(q.hint || ""),
      intro: ren(q.intro || ""), steps, complete: ren(q.complete || `Bạn trở về, hoàn thành "${ren(q.name)}".`), reward: rew, weight: 4,
    };
    if (q.kind === "small") out.repeat = true;
    const eraText = [q.era, q.name, q.intro].filter(Boolean).join(" ");
    if (q.kind === "era" || q.era) for (const [w, era] of Object.entries(ERA_WORDS)) if (eraText.includes(w)) out.eras = [era];
    if (q.moment) out.moment = ren(q.moment);
    Object.assign(out, qo);
    report.push(`Q ${id.padEnd(40)} bậc≥${out.minRank} ${out.repeat ? "lặp" : "1 lần"} ${steps.length} cảnh ${out.eras || ""}`);
    return out;
  });

  // ---- organisation ----
  const org = Object.assign({}, meta.org);
  const hier = meta.hierarchy || parsed.hierarchy.map((h) => ({ name: mangaName(ren(h.name)), text: ren(h.text) }));
  if (!org.ranks) org.ranks = hier.map((h) => h.name);
  // other names the script uses for the same ranks ("Thủy Tổ Long Thần" for "Primordial Dragon God")
  org.rankAliases = parsed.hierarchy.map((h) => ren(h.name).replace(/\s*\(.*\)\s*$/, "").toLowerCase());
  if (meta.rankAliases) org.rankAliases = meta.rankAliases.map((x) => x.toLowerCase());
  if (hier.length) {
    org.rankUp = {};
    hier.forEach((h, i) => (org.rankUp[i] = h.text));
  }
  org.join = org.join || [];

  // ---- focus quiet lines ----
  const focus = JSON.parse(JSON.stringify(meta.focus));
  parsed.focusQuiet.forEach((f, idx) => {
    const fid = meta.focusOrder ? meta.focusOrder[idx] : null;
    if (!fid || !focus[fid] || focus[fid].quiet) return;
    const q = (focus[fid].quiet = { default: [] });
    for (const line of f.quiet) {
      const w = (line.when || "").toLowerCase();
      const t = ren(line.text);
      if (/nhỏ/.test(w)) (q.child = q.child || []).push(t), (q.teen = q.teen || []).push(t);
      else if (/trưởng thành/.test(w)) for (const s of ["adult", "middle", "elder"]) (q[s] = q[s] || []).push(t);
      else q.default.push(t);
    }
    if (!q.default.length) q.default = [].concat(q.adult || q.child || []);
  });

  const systems = Object.assign({}, meta.systems);
  // section headers ("a) GIAO ƯỚC MÁU (Bạn đời)") are not companion lines
  const allyOk = (t) => !/^[a-zđ]\)\s/i.test(t) && !/^dưới đây là/i.test(t);
  for (const [k, key] of [["die", "allyDie"], ["hurt", "allyHurt"], ["leave", "allyLeave"]]) {
    const lines = parsed.allyLines[k].filter(allyOk).map(ren);
    if (lines.length) systems[key] = lines;
  }

  const forms = {};
  for (const d of evoDefs) forms[d.name] = { name: d.name, life: d.life || 0 };
  for (const f of Object.values(meta.forms || {})) forms[f.name] = f;

  let pack = { race: raceId, stageNames: meta.stageNames, forms, origins, jobs, orgs: [org], quests, events, deaths, focus, systems };
  if (meta.useScriptStages || meta.stages) pack.stages = stages;
  if (story) {
    // arc codes the v3 prompts gave (prompts/v3/arc-codes.json) when the origin id is only a number
    let codes = {};
    try { codes = JSON.parse(fs.readFileSync(path.join(ROOT, "prompts", "v3", "arc-codes.json"), "utf8"))[raceId] || {}; } catch (e) {}
    const originOf = (arcId) => (meta.storyOrigins && meta.storyOrigins[arcId]) || codes[arcId] || (origins.find((o) => o.id === arcId || o.id.endsWith("_" + arcId)) || { id: `${raceId}_origin_${arcId}` }).id;
    const rmap = (o) => JSON.parse(ren(JSON.stringify(o)));
    pack.story = rmap({
      arcs: Object.fromEntries(Object.values(story.arcs).map((a) => [originOf(a.id), a])),
      cast: story.cast, chapters: story.chapters, bio: story.bio, memories: story.memories,
      bands: story.bands, minions: story.minions, recruits: story.recruits, bioMap: meta.storyBioOpen || null,
    });
  }
  for (const x of pack.story?.chapters?.child || []) if (/chưa có (nghề|vai trò)/i.test(x.cond || "")) x.requiresShelter = true;
  const childhood = require("../content/childhood");
  for (const id of ["play", "rest"]) if (pack.focus?.[id]) {
    const quiet = pack.focus[id].quiet || (pack.focus[id].quiet = {});
    for (const [stage, extra] of Object.entries(childhood)) quiet[stage] = [...new Set([...(quiet[stage] || quiet.default || []), ...extra])];
  }
  for (const k of Object.values(pack.story?.cast || {})) k.contexts = (meta.castContexts || {})[k.id] || ["free"];
  if (meta.exclusive) pack.exclusive = true;
  if (meta.keepEvents) pack.keepEvents = meta.keepEvents;
  for (const k of ["tags", "lifespan", "hazard", "yearScale", "noChildhood", "subtypes"]) if (meta[k] !== undefined) pack[k] = meta[k];
  // names of groups, guilds and people in English (content/english-names.js)
  pack = require("./english-names").englishPack(raceId, pack);
  fs.writeFileSync(path.join(ROOT, "data", "packs", raceId + ".json"), JSON.stringify(pack, null, 1), "utf8");
  console.log(`Đã tạo data/packs/${raceId}.json: ${origins.length} xuất thân, ${jobs.length} vai trò, ${events.length} sự kiện, ${quests.length} ${org.missionWord || "nhiệm vụ"}, ${deaths.length} cái chết riêng.`);
  if (opts.report) console.log(report.join("\n"));
  return pack;
}

module.exports = { build, mangaName };

if (require.main === module) {
  const args = process.argv.slice(2);
  const report = args.includes("--report");
  const list = args.filter((a) => !a.startsWith("--"));
  const all = list.length ? list : fs.readdirSync(path.join(ROOT, "content", "packs")).filter((f) => f.endsWith(".meta.js")).map((f) => f.replace(".meta.js", ""));
  for (const r of all) build(r, { report });
}
