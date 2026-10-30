// Builds a race pack (data/packs/<race>.json) from an approved Gemini script + its meta file.
//   script: content/scripts/<race>.txt   (parsed by tools/script-parse.js)
//   meta:   content/packs/<race>.meta.js (naming, roles, organisation, overrides)
// Run: node tools/build-pack.js goblin [--report]
const fs = require("fs");
const path = require("path");
const { parse } = require("./script-parse");

const ROOT = path.join(__dirname, "..");
const STAT_KEYS = ["STR", "INT", "AGI", "LUCK"];
const TRAITS = { "dũng cảm": "brave", "trung thành": "loyal", "tham lam": "greedy", "nhút nhát": "timid", "vui tính": "cheerful", "lạnh lùng": "cold" };
const STAT = { "sức mạnh": "STR", "trí tuệ": "INT", "nhanh nhẹn": "AGI", "may mắn": "LUCK", "sức khỏe": "health", "hạnh phúc": "joy", "tài sản": "wealth", "danh vọng": "fame" };

function build(raceId, opts) {
  const meta = require(path.join(ROOT, "content", "packs", raceId + ".meta.js"));
  const parsed = parse(fs.readFileSync(path.join(ROOT, meta.script), "utf8"));
  const report = [];
  const ren = (t) => {
    if (typeof t !== "string") return t;
    for (const [a, b] of meta.rename || []) t = t.split(a).join(b);
    return t.replace(/\s+/g, " ").trim();
  };
  const target = (stat, diff) => {
    const table = STAT_KEYS.includes(stat) ? meta.diff.stat : meta.diff.bar;
    return table[Math.min(table.length - 1, diff)];
  };
  const roleId = (title) => {
    const r = meta.roles.find((x) => title && title.toUpperCase().startsWith(x.title));
    return r ? r.id : null;
  };

  // ---- effects ----
  function effects(e) {
    const out = {};
    for (const k of [...STAT_KEYS, "health", "joy", "wealth", "fame", "guildPts", "bond"]) if (e[k]) out[k] = e[k];
    if (e.flags && e.flags.length) out.flags = e.flags;
    for (const k of ["allyDie", "recruit", "loseChild", "child", "marry", "demote"]) if (e[k]) out[k] = true;
    if (e.orgRank != null) out.orgRank = e.orgRank;
    if (e.orgRankName) out.orgRankName = e.orgRankName;
    if (e.era) out.era = e.era;
    if (e.evolve) out.evolve = (meta.forms[e.evolve.toUpperCase()] || {}).name || e.evolve;
    if (e.clearBounty) out.unflags = ["guild_enemy", "bounty_survivor"];
    return out;
  }
  function outcome(o) {
    if (!o) return null;
    const r = { text: ren(o.text) };
    const eff = effects(o.eff);
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
      let m;
      const fl = [...p.matchAll(/["“]([a-z0-9_]+)["”]/g)].map((x) => x[1]);
      if (fl.length) r.flags = fl;
      if ((m = low.match(/(sức mạnh|trí tuệ|nhanh nhẹn|may mắn|sức khỏe|danh vọng|tài sản)\s*(dưới|từ|>|>=)\s*(\d+)/))) r[STAT[m[1]]] = Number(m[3]);
      return r;
    }).filter((r) => Object.keys(r).length);
    if (reqs.length === 1) return reqs[0];
    return { any: reqs };
  }

  function choice(c) {
    const ch = { label: ren(c.label) };
    if (c.lock) { ch.require = lockReq(c.lock); ch.showLocked = true; }
    if (c.check && c.success && c.fail) {
      ch.check = { stat: c.check.stat, target: target(c.check.stat, c.check.diff) };
      ch.success = outcome(c.success);
      ch.fail = outcome(c.fail);
    } else {
      const o = outcome(c.plain || c.success);
      if (!o) { report.push(`  ! lựa chọn trống: ${c.label}`); return null; }
      Object.assign(ch, o);
    }
    return ch;
  }

  // ---- "Khi nào" → conditions ----
  function when(text, ev) {
    const out = { require: {} };
    if (!text) return out;
    const low = text.toLowerCase();
    let m;
    const stages = new Set();
    if (!/bất kỳ lúc nào/.test(low)) {
      for (const [ph, st] of Object.entries(meta.stagePhrases)) if (low.includes(ph)) st.split(",").forEach((s) => stages.add(s));
      if (low.includes("bất kỳ lúc trưởng thành")) { stages.clear(); ["adult", "middle", "elder"].forEach((s) => stages.add(s)); }
    }
    if (stages.size) out.stages = [...stages];
    for (const [k, f] of Object.entries(meta.focusMap)) if (low.includes(meta.focus[f].name.toLowerCase()) || low.includes(k.toLowerCase())) out.focus = [f];
    if ((m = low.match(/bậc (\d+)\s*[–-]\s*(\d+)/))) { out.require.jobRank = Number(m[1]) - 1; if (Number(m[2]) < 5) out.require.jobRankMax = Number(m[2]) - 1; }
    const fl = [...text.matchAll(/dấu ấn\s+["“]([a-z0-9_]+)["”]/gi)].map((x) => x[1]);
    if (fl.length) { if (/hoặc/.test(low) && fl.length > 1) out.require.anyFlags = fl; else out.require.flags = fl; }
    if (/\{mother\} còn sống/.test(low)) out.require.motherAlive = true;
    if (/\{father\} còn sống/.test(low)) out.require.fatherAlive = true;
    if (/có \{ally\}/.test(low)) out.require.party = 1;
    for (const [w, t] of Object.entries(TRAITS)) if (low.includes("tính " + w)) out.require.allyTrait = t;
    if (/chưa có \{spouse\}/.test(low)) out.require.spouse = false;
    else if (/có \{spouse\}/.test(low)) out.require.spouse = true;
    if (/chưa có \{child\}/.test(low)) out.require.noChildren = true;
    else if (/có \{child\}/.test(low)) out.require.children = 1;
    for (const [w, era] of Object.entries(meta.eraWords)) if (text.includes(w) && !/hoặc gặp/.test(low)) out.eras = [era];
    if ((m = low.match(/danh vọng\s*(?:>|từ|>=)\s*(\d+)/))) out.require.fame = Number(m[1]);
    if ((m = low.match(/tài sản\s*(?:>|từ|>=)\s*(\d+)/))) out.require.wealth = Math.min(90, Number(m[1]));
    if ((m = low.match(/thân thiết với \{ally\}\s*<\s*(\d+)/))) out.require.below = { bond: Number(m[1]) };
    return out;
  }

  // ---- origins ----
  function person(s) {
    if (!s) return null;
    const p = s.split("·").map((x) => x.trim());
    const unknown = /^không rõ/i.test(p[0]);
    const st = (p[p.length - 1] || "").toLowerCase();
    const status = /đã chết|đã mất|bị .*giết/.test(st) ? "dead" : /còn sống/.test(st) ? "alive" : /bỏ đi|lang thang/.test(st) ? "gone" : unknown ? "unknown" : "alive";
    return { name: unknown ? null : ren(p[0]), race: ren(p[1] || ""), role: ren(p[2] || ""), trait: ren(p[3] || ""), status, note: ren(p.slice(4).join(" · ")) };
  }
  const origins = parsed.origins.map((o) => ({
    id: o.id,
    name: ren(o.name),
    weight: o.weight,
    text: ren(o.text),
    father: person(o.father),
    mother: person(o.mother),
    siblings: ren(o.siblings || ""),
    home: ren(o.home || ""),
    effects: effects(o.effects || {}),
  }));

  // ---- roles → jobs ----
  const jobs = meta.roles.map((r) => {
    const src = parsed.roles.find((x) => x.title.toUpperCase().startsWith(r.title)) || {};
    const promo = src.promo || [];
    return {
      id: r.id, name: r.name, stat: r.stat, combat: r.combat, desc: r.desc,
      require: r.require, alt: r.alt,
      ranks: r.ranks,
      income: r.income, hazard: r.hazard, gains: r.gains,
      promoXp: meta.promoXp,
      promoTarget: promo.map((p) => target(p.stat || r.stat, p.diff)),
      promoStat: promo.map((p) => p.stat || r.stat),
      promo: promo.map((p) => "Thử thách để trở thành {next}: " + ren(p.text).replace(/^./, (x) => x.toLowerCase()) + "."),
      start: ren(src.start || ""),
      quiet: (src.quiet || []).map(ren),
    };
  });

  // ---- events ----
  const events = [];
  const deaths = [];
  for (const e of parsed.events) {
    const o = (meta.overrides || {})[e.id] || {};
    if (o.asDeath) {
      deaths.push({ id: e.id, kind: o.asDeath, text: ren(e.text) + " " + ren(e.auto ? e.auto.text : "") });
      continue;
    }
    const w = when(e.when, e);
    const ev = { id: e.id, text: ren(e.text) };
    if (w.stages) ev.stages = w.stages;
    if (w.eras) ev.eras = w.eras;
    const focusFromSection = e.focusTitle && Object.entries(meta.focusMap).find(([k]) => e.focusTitle.toUpperCase().startsWith(k));
    if (focusFromSection) ev.focus = [focusFromSection[1]];
    else if (w.focus) ev.focus = w.focus;
    const req = Object.assign({}, w.require);
    const rid = roleId(e.role);
    if (rid) req.job = rid;
    // A hand-written requirement replaces what was guessed from the same words.
    if (o.require && (o.require.any || o.require.flags || o.require.anyFlags)) { delete req.flags; delete req.anyFlags; }
    if (o.require && o.require.any) { delete req.fame; delete req.wealth; }
    Object.assign(req, o.require || {});
    if (Object.keys(req).length) ev.require = req;
    if (o.stages) ev.stages = o.stages;
    if (o.focus) ev.focus = o.focus;
    if (o.minAge != null) ev.minAge = o.minAge;
    if (o.weight) ev.weight = o.weight;
    if (e.choices.length) {
      ev.choices = e.choices.map(choice).filter(Boolean);
      for (const [i, patch] of Object.entries(o.choiceEffects || {})) {
        const ch = ev.choices[i];
        for (const [key, eff] of Object.entries(patch)) {
          const tgt = key === "plain" ? ch : ch[key];
          tgt.effects = Object.assign(tgt.effects || {}, eff);
        }
      }
      if (o.addFlags) for (const ch of ev.choices) for (const tgt of [ch.success, ch.fail, ch.text != null ? ch : null].filter(Boolean)) tgt.effects = Object.assign(tgt.effects || {}, { flags: [...((tgt.effects || {}).flags || []), ...o.addFlags] });
      if (ev.choices.length === 1 && ev.choices[0].check) {
        // One risky option alone is still a decision: offer to hold back and wait for another chance.
        ev.choices.push({ label: (meta.decline && meta.decline.label) || "Kìm nén lại, chờ dịp khác", text: (meta.decline && meta.decline.text) || "Bạn cắn răng ép mọi thứ lắng xuống. Cơ hội này sẽ còn quay lại." });
        ev.once = false;
      }
      if (ev.choices.length < 2) {
        // A single option is not a choice: play it as a plain event.
        const only = ev.choices[0];
        delete ev.choices;
        if (only) { ev.result = only.text; if (only.effects) ev.effects = only.effects; if (only.death) ev.death = only.death; }
      }
    } else if (e.auto) {
      ev.result = ren(e.auto.text);
      const eff = effects(e.auto.eff);
      if (o.addFlags) eff.flags = [...(eff.flags || []), ...o.addFlags];
      if (Object.keys(eff).length) ev.effects = eff;
      if (e.auto.eff.death) ev.death = ren(e.auto.eff.death);
    }
    if (e.moment) ev.moment = ren(e.moment);
    events.push(ev);
    report.push(`${e.id.padEnd(36)} ${(ev.stages || ["*"]).join(",").padEnd(18)} ${(ev.focus || ["-"]).join(",").padEnd(10)} ${JSON.stringify(ev.require || {})}${ev.eras ? " eras=" + ev.eras : ""}${ev.choices ? "" : " [không lựa chọn]"}`);
  }

  // ---- quests (raids) ----
  const quests = parsed.quests.map((q) => {
    const steps = q.steps.map((s) => {
      const st = { text: ren(s.text || s.title) };
      if (s.auto) {
        const a = outcome(s.auto);
        st.auto = { text: a.text };
        if (a.effects) st.auto.effects = a.effects;
        if (a.end) st.auto.end = a.end;
        if (a.next != null) st.auto.next = a.next;
      } else st.choices = s.choices.map(choice).filter(Boolean);
      return st;
    });
    const rew = q.reward ? effects(q.reward.eff) : {};
    const out = {
      id: q.id, org: meta.org.id, name: ren(q.name), minRank: Math.max(0, (q.minRank || 1) - 1), hint: ren(q.hint || ""),
      intro: ren(q.intro), steps, complete: ren(q.complete || ""), reward: rew, weight: 4,
    };
    if (meta.repeatRaids.includes(q.id)) out.repeat = true;
    if (q.era) for (const [w, era] of Object.entries(meta.eraWords)) if (q.era.includes(w)) out.eras = [era];
    if (q.moment) out.moment = ren(q.moment);
    report.push(`Q ${q.id.padEnd(34)} bậc≥${out.minRank} ${out.repeat ? "lặp" : "1 lần"} ${steps.length} cảnh ${out.eras || ""}`);
    return out;
  });

  // ---- organisation ----
  const org = Object.assign({}, meta.org);
  org.rankUp = {};
  for (const h of parsed.hierarchy) org.rankUp[h.rank - 1] = ren(h.text);
  org.join = [];

  // ---- focus quiet lines ----
  const focus = JSON.parse(JSON.stringify(meta.focus));
  for (const f of parsed.focusQuiet) {
    const hit = Object.entries(meta.focusMap).find(([k]) => f.title.toUpperCase().startsWith(k));
    if (!hit) continue;
    const q = (focus[hit[1]].quiet = { default: [] });
    for (const line of f.quiet) {
      const w = line.when.toLowerCase();
      const t = ren(line.text);
      if (/nhỏ/.test(w)) (q.child = q.child || []).push(t), (q.teen = q.teen || []).push(t);
      else if (/trưởng thành/.test(w)) for (const s of ["adult", "middle", "elder"]) (q[s] = q[s] || []).push(t);
      else q.default.push(t);
    }
    if (!q.default.length) q.default = [].concat(q.adult || q.child || []);
  }

  const systems = Object.assign({}, meta.systems, {
    allyDie: parsed.allyLines.die.map(ren),
    allyHurt: parsed.allyLines.hurt.map(ren),
    allyLeave: parsed.allyLines.leave.map(ren),
  });

  const forms = {};
  for (const f of Object.values(meta.forms)) forms[f.name] = f;

  const pack = { race: raceId, stageNames: meta.stageNames, forms, origins, jobs, orgs: [org], quests, events, deaths, focus, systems };
  const out = path.join(ROOT, "data", "packs", raceId + ".json");
  fs.writeFileSync(out, JSON.stringify(pack, null, 1), "utf8");
  console.log(`Đã tạo data/packs/${raceId}.json: ${origins.length} xuất thân, ${jobs.length} vai trò, ${events.length} sự kiện, ${quests.length} cuộc ${org.missionWord || "nhiệm vụ"}, ${deaths.length} cái chết riêng.`);
  if (opts.report) console.log(report.join("\n"));
  return pack;
}

module.exports = { build };

if (require.main === module) {
  const args = process.argv.slice(2);
  const report = args.includes("--report");
  const races = args.filter((a) => !a.startsWith("--"));
  const all = races.length ? races : fs.readdirSync(path.join(ROOT, "content", "packs")).filter((f) => f.endsWith(".meta.js")).map((f) => f.replace(".meta.js", ""));
  for (const r of all) build(r, { report });
}
