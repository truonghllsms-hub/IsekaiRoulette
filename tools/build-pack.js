// Builds a race pack (data/packs/<race>.json) from an approved Gemini script + its meta file.
//   script: content/scripts/<race>.txt   (parsed by tools/script-parse.js)
//   meta:   content/packs/<race>.meta.js (names, roles, organisation, evolutions, fixes)
// Most conditions are read from each event's "Khi nào" line: life stage (from the age range), role rank,
// marks, parents alive, companions, spouse, children, era, stat thresholds.
// Run: node tools/build-pack.js [race ...] [--report]
const fs = require("fs");
const path = require("path");
const { parse } = require("./script-parse");

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
  if (asciiShare(m[2]) > 0.9) return m[2].trim();
  if (asciiShare(m[1]) > 0.9) return m[1].trim();
  return n;
}

function build(raceId, opts) {
  const meta = require(path.join(ROOT, "content", "packs", raceId + ".meta.js"));
  const races = require(path.join(ROOT, "data", "races.json"));
  const race = races.find((r) => r.id === raceId);
  const profile = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "races", raceId + ".json"), "utf8"));
  const stages = (race.stages || profile.stages || []).map((s) => ({ id: s.id, start: s.start, name: (meta.stageNames && meta.stageNames[s.id]) || s.name }));
  const parsed = parse(fs.readFileSync(path.join(ROOT, meta.script), "utf8"));
  const report = [];
  const renames = [...(meta.rename || []), ...GLOBAL_RENAME];
  const ren = (t) => {
    if (typeof t !== "string") return t;
    for (const [a, b] of renames) t = t.split(a).join(b);
    return t.replace(/\s+/g, " ").trim();
  };
  const target = (stat, diff) => {
    const table = STAT_KEYS.includes(stat) ? meta.diff.stat : meta.diff.bar;
    return table[Math.min(table.length - 1, diff == null ? 3 : diff)];
  };
  const evoDefs = meta.evos || [];

  // ---- effects ----
  function effects(e, ctx) {
    ctx = ctx || {};
    const out = {};
    for (const k of [...STAT_KEYS, "health", "joy", "wealth", "fame", "guildPts", "bond"]) if (e[k]) out[k] = Math.max(-100, Math.min(100, e[k]));
    if (e.flags && e.flags.length) out.flags = [...new Set(e.flags)];
    for (const k of ["allyDie", "allyLeave", "allyHurt", "recruit", "loseChild", "child", "marry", "loseSpouse", "loseJob", "jobPromote"]) if (e[k]) out[k] = true;
    if (e.parentDie) out.parentDie = e.parentDie;
    if (e.demote) { if (ctx.rank) out.orgRank = 0; else out.demote = true; }
    if (e.rankDelta) { if (ctx.role) out.demote = true; else out.orgRankUp = e.rankDelta; }
    if (e.setRank != null) { if (ctx.role && !ctx.rank) out.jobRankSet = e.setRank; else out.orgRank = e.setRank; }
    if (e.orgRankUp) out.orgRankUp = e.orgRankUp;
    if (e.orgRankName) out.orgRankName = mangaName(ren(e.orgRankName));
    if (e.era) out.era = e.era;
    if (e.evolve) {
      const want = e.evolve.toLowerCase();
      const d = evoDefs.find((x) => want.includes(x.name.toLowerCase()) || (x.match && x.match.some((w) => want.includes(w.toLowerCase())))) || (meta.forms && meta.forms[e.evolve.toUpperCase()]);
      out.evolve = d ? d.name : mangaName(e.evolve);
    }
    if (e.clearBounty) out.unflags = ["guild_enemy", "bounty_survivor"];
    return out;
  }
  function outcome(o, ctx) {
    if (!o) return null;
    const r = { text: ren(o.text) };
    const eff = effects(o.eff, ctx);
    if (Object.keys(eff).length) r.effects = eff;
    if (o.eff.death) r.death = ren(o.eff.death === "Bạn chết." ? o.text : o.eff.death);
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
    const ch = { label: ren(c.label) };
    if (c.lock) { const rq = lockReq(c.lock); if (rq) { ch.require = rq; ch.showLocked = true; } }
    if (c.check && c.success && c.fail) {
      ch.check = { stat: c.check.stat, target: target(c.check.stat, c.check.diff) };
      ch.success = outcome(c.success, ctx);
      ch.fail = outcome(c.fail, ctx);
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
    const low = text.toLowerCase();
    if (/bất (kỳ|cứ) lúc nào/.test(low) && !/trưởng thành|tuổi/.test(low)) return [];
    const ranges = [];
    for (const m of text.matchAll(/(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)/g)) ranges.push([num(m[1]), num(m[2])]);
    for (const m of text.matchAll(/(\d[\d.]*)\s*\+/g)) ranges.push([num(m[1]), Infinity]);
    for (const m of text.matchAll(/(?:tuổi|trên)\s*(\d[\d.]*)\s*(?:tuổi)?\s*(?:trở lên)?/gi)) if (!/\+/.test(m[0])) ranges.push([num(m[1]), Infinity]);
    for (const [a, b] of ranges) {
      stages.forEach((s, i) => {
        const end = stages[i + 1] ? stages[i + 1].start : Infinity;
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
      const n = f.name.toLowerCase();
      if (low.includes("việc chính: " + n) || low.includes("· " + n) || (n.length >= 5 && low.includes(n))) out.focus = [fid];
    }
    if (ctx.role) {
      if ((m = low.match(/bậc (\d+)\s*[–-]\s*(\d+)/))) { out.require.jobRank = Number(m[1]) - 1; if (Number(m[2]) < 5) out.require.jobRankMax = Number(m[2]) - 1; }
      else if ((m = low.match(/bậc (\d+) hoặc (\d+)/))) { out.require.jobRank = Number(m[1]) - 1; out.require.jobRankMax = Number(m[2]) - 1; }
      else if ((m = low.match(/(?:từ )?bậc (\d+)(?: trở lên)?/))) out.require.jobRank = Number(m[1]) - 1;
    }
    if (ctx.rank && (m = low.match(/bậc (\d+)/))) out.require.guildRank = Number(m[1]) - 1;
    const fl = [...text.matchAll(/dấu ấn\s+["“]?([a-z][a-z0-9_]+)["”]?/gi)].map((x) => x[1]);
    const more = [...text.matchAll(/hoặc\s+["“]([a-z0-9_]+)["”]/gi)].map((x) => x[1]);
    const allFl = [...new Set([...fl, ...more])];
    if (allFl.length) { if (/hoặc/.test(low) && allFl.length > 1) out.require.anyFlags = allFl; else out.require.flags = allFl; }
    if (/cha và mẹ còn sống|cha mẹ còn sống/.test(low)) { out.require.fatherAlive = true; out.require.motherAlive = true; }
    else {
      if (/\{mother\} còn sống|mẹ còn sống/.test(low)) out.require.motherAlive = true;
      if (/\{father\} còn sống|cha còn sống/.test(low)) out.require.fatherAlive = true;
    }
    if (/\{maker\}.{0,20}còn sống|chủ nhân còn sống/.test(low)) out.require.makerAlive = true;
    if (/có (đồng đội )?\{ally\}|có đồng đội/.test(low)) out.require.party = 1;
    for (const [w, t] of Object.entries(TRAITS)) if (low.includes("tính " + w) || low.includes("tính cách " + w)) out.require.allyTrait = t;
    if (/chưa có (\{spouse\}|bạn đời|bạn tình)/.test(low)) out.require.spouse = false;
    else if (/(đã )?có \{spouse\}|đã có bạn đời/.test(low)) out.require.spouse = true;
    if (/chưa có \{child\}/.test(low)) out.require.noChildren = true;
    else if (/có \{child\}|\{child\}/.test(low)) out.require.children = 1;
    for (const [w, era] of Object.entries(ERA_WORDS)) if (text.includes(w)) out.eras = [...new Set([...(out.eras || []), era])];
    for (const mm of low.matchAll(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|danh vọng|tài sản)\s*(?:>|từ|>=|trên|lớn hơn)\s*(\d+)/g)) out.require[STAT[mm[1]]] = Math.min(mm[1] === "tài sản" ? 90 : 99, Number(mm[2]));
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
    const status = /đã chết|đã mất|vừa chết|bị .*giết|tử trận|đã khuất/.test(st) ? "dead" : /bỏ đi|lang thang|không tung tích|biến mất/.test(st) ? "gone" : /còn sống|còn tồn tại/.test(st) ? "alive" : unknown ? "unknown" : "alive";
    let name = unknown ? null : ren(p[0]);
    if (name && /^\{(father|mother|maker)\}$/.test(name)) name = null; // the script left the name to the game
    if (name && name.length > 40) name = null;
    return { name, race: ren(p[1] || ""), role: ren(p[2] || ""), trait: ren(p[3] || ""), status, note: ren(p.slice(4).join(" · ")) };
  }
  const origins = parsed.origins.map((o) => {
    const out = { id: o.id, name: ren(o.name), weight: o.weight, text: ren(o.text), siblings: ren(o.siblings || ""), home: ren(o.home || ""), effects: effects(o.effects || {}) };
    const f = person(o.father), mo = person(o.mother), mk = person(o.maker);
    if (f) out.father = f;
    if (mo) out.mother = mo;
    if (mk) out.maker = mk;
    if (!f && !mo) out.noParents = true;
    if (o.past) out.past = ren(o.past);
    return out;
  });

  // ---- roles → jobs ----
  const jobs = meta.roles.map((r, i) => {
    const src = parsed.roles[i] || {};
    const ranks = r.ranks || (src.ranks || []).map((x) => mangaName(ren(x)));
    const promoSrc = r.promo || (src.promo || []).map((p, k) => ({ text: p.text, diff: p.diff != null ? p.diff : k + 1, stat: p.stat || r.stat }));
    return {
      id: r.id, name: r.name, stat: r.stat, combat: r.combat !== false, desc: r.desc,
      require: r.require, alt: r.alt, ranks,
      income: r.income || [0.8, 1.3, 2, 2.8, 3.8], hazard: r.hazard || 1.3, gains: r.gains || { [r.stat]: 0.3 },
      promoXp: r.promoXp || meta.promoXp,
      promoTarget: promoSrc.map((p) => target(p.stat || r.stat, p.diff)),
      promoStat: promoSrc.map((p) => p.stat || r.stat),
      promo: promoSrc.map((p) => "Thử thách để trở thành {next}: " + ren(p.text).replace(/^./, (x) => x.toLowerCase()).replace(/\.?$/, ".")),
      start: ren(r.start || src.start || ""),
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
    const deathLike = o.asDeath || (/tử vong|cái chết tự nhiên|chết già/i.test(e.title || "") || /đạt tuổi thọ tối đa|trước khi qua đời do hết tuổi|hết tuổi thọ/i.test(e.when || "") ? "old" : null);
    if (deathLike) { deaths.push({ id: e.id, kind: deathLike, text: [ren(e.text), ren(e.auto ? e.auto.text : "")].filter(Boolean).join(" ") }); continue; }
    const rid = roleOf(e);
    const ctx = { role: !!rid, rank: !!e.rank };
    const w = when(e.when, ctx);
    const ev = { id: e.id, text: ren(e.text || "") };
    if (w.stages) ev.stages = w.stages;
    if (w.eras) ev.eras = w.eras;
    const fo = focusOf(e) || (w.focus && w.focus[0]);
    if (fo) ev.focus = [fo];
    const req = Object.assign({}, w.require);
    if (rid) req.job = rid;

    // evolutions: sign → ascension → after
    if (e.evo != null && evoDefs[e.evo] && /evo|post|tien_hoa|_sign|signal|foreshadow/.test(e.id)) {
      const d = evoDefs[e.evo];
      const flag = "evo_sign_" + d.key;
      if (/sign|foreshadow|bao_hieu|signal/.test(e.id)) { Object.assign(req, d.require || {}, { form: "none", notFlags: [flag] }); if (d.minAge) ev.minAge = d.minAge; ev.weight = 10; ev._addFlags = [flag]; }
      else if (/post/.test(e.id)) req.form = d.name;
      else { req.form = "none"; req.flags = [flag]; ev.weight = 12; ev._ascend = d; }
      delete ev.stages;
    }
    if (o.require && (o.require.any || o.require.flags || o.require.anyFlags)) { delete req.flags; delete req.anyFlags; }
    if (o.require && o.require.any) { delete req.fame; delete req.wealth; }
    Object.assign(req, o.require || {});
    for (const k of Object.keys(o.unrequire || {})) delete req[k];
    if (Object.keys(req).length) ev.require = req;
    if (o.stages) ev.stages = o.stages;
    if (o.focus) ev.focus = o.focus;
    if (o.eras) ev.eras = o.eras;
    if (o.minAge != null) ev.minAge = o.minAge;
    if (o.weight) ev.weight = o.weight;
    if (!ev.text) ev.text = ren(e.title || "");

    if (e.choices.length) {
      ev.choices = e.choices.map((c) => choice(c, ctx)).filter(Boolean);
      for (const [i, patch] of Object.entries(o.choiceEffects || {})) {
        const ch = ev.choices[i];
        if (!ch) continue;
        for (const [key, eff] of Object.entries(patch)) {
          const tgt = key === "plain" ? ch : ch[key];
          if (tgt) tgt.effects = Object.assign(tgt.effects || {}, eff);
        }
      }
      if (ev._ascend) {
        // a successful ascension must actually change the form
        for (const ch of ev.choices) for (const tgt of [ch.success, ch.text != null && !ch.check ? ch : null].filter(Boolean)) if (tgt.effects && tgt.effects.evolve == null && /tiến hóa|lột xác|đổi dạng|thăng hoa|trở thành/i.test(tgt.text)) tgt.effects.evolve = ev._ascend.name;
      }
      const addFlags = [...(o.addFlags || []), ...(ev._addFlags || [])];
      if (addFlags.length) for (const ch of ev.choices) for (const tgt of [ch.success, ch.fail, ch.text != null ? ch : null].filter(Boolean)) tgt.effects = Object.assign(tgt.effects || {}, { flags: [...((tgt.effects || {}).flags || []), ...addFlags] });
      if (ev.choices.length === 1 && ev.choices[0].check) {
        ev.choices.push({ label: (meta.decline && meta.decline.label) || "Kìm nén lại, chờ dịp khác", text: (meta.decline && meta.decline.text) || "Bạn ép mọi thứ lắng xuống. Cơ hội này sẽ còn quay lại." });
        ev.once = false;
      }
      if (ev._ascend && ev.choices.length >= 2) ev.once = false;
      if (ev.choices.length < 2) {
        const only = ev.choices[0];
        delete ev.choices;
        if (only) { ev.result = only.text; if (only.effects) ev.effects = only.effects; if (only.death) ev.death = only.death; }
      }
    } else if (e.auto) {
      if (ev.text && e.auto.text && ev.text !== ren(e.auto.text)) ev.result = ren(e.auto.text);
      else ev.text = ren(e.auto.text);
      const eff = effects(e.auto.eff, ctx);
      const addFlags = [...(o.addFlags || []), ...(ev._addFlags || [])];
      if (addFlags.length) eff.flags = [...(eff.flags || []), ...addFlags];
      if (Object.keys(eff).length) ev.effects = eff;
      if (e.auto.eff.death) ev.death = ren(e.auto.eff.death);
    } else if (ev._addFlags) ev.effects = { flags: ev._addFlags };
    delete ev._addFlags;
    delete ev._ascend;
    if (o.effects) ev.effects = Object.assign(ev.effects || {}, o.effects);
    if (e.moment) ev.moment = ren(e.moment);
    if (!ev.text) { report.push(`  ! bỏ qua ${e.id}: không có nội dung`); continue; }
    events.push(ev);
    report.push(`${e.id.padEnd(34)} ${(ev.stages || ["*"]).join(",").padEnd(22)} ${(ev.focus || ["-"]).join(",").padEnd(9)} ${JSON.stringify(ev.require || {})}${ev.eras ? " eras=" + ev.eras : ""}${ev.choices ? "" : " [không lựa chọn]"}`);
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
      } else st.choices = s.choices.map((c) => choice(c, ctx)).filter(Boolean);
      return st;
    });
    const rew = q.reward ? effects(q.reward.eff, ctx) : {};
    const out = {
      id, org: meta.org.id, name: ren(q.name).replace(/\s*\((thời đại|bậc tối thiểu)[^)]*\)\s*$/i, ""), minRank: Math.max(0, (q.minRank || 1) - 1), hint: ren(q.hint || ""),
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
  org.rankUp = {};
  hier.forEach((h, i) => (org.rankUp[i] = h.text));
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
  if (parsed.allyLines.die.length) systems.allyDie = parsed.allyLines.die.map(ren);
  if (parsed.allyLines.hurt.length) systems.allyHurt = parsed.allyLines.hurt.map(ren);
  if (parsed.allyLines.leave.length) systems.allyLeave = parsed.allyLines.leave.map(ren);

  const forms = {};
  for (const d of evoDefs) forms[d.name] = { name: d.name, life: d.life || 0 };
  for (const f of Object.values(meta.forms || {})) forms[f.name] = f;

  const pack = { race: raceId, stageNames: meta.stageNames, forms, origins, jobs, orgs: [org], quests, events, deaths, focus, systems };
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
