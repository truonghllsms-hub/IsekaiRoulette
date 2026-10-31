// Checks every data file against the schema in docs/EVENT_SCHEMA.md.
// Run: node tools/validate.js   (exit code 1 when anything is wrong)
const STATS = ["STR", "INT", "AGI", "LUCK"];
const BARS = ["health", "joy", "wealth"];
const EFFECT_KEYS = new Set([...STATS, ...BARS, "flags", "unflags", "fame", "jobXp", "guildPts", "bond", "partyBond", "allyHurt", "allyDie", "allyLeave", "loseJob", "setJob", "joinGuild", "focus", "recruit", "marry", "child", "loseChild", "demote", "orgRank", "orgRankName", "evolve", "era", "jobRankSet", "jobPromote", "orgRankUp", "loseSpouse", "parentDie", "castDie", "castJoin", "castLeave", "castBond", "joinBand", "leaveBand", "bandGone", "bandLead", "minionAdd", "minionLose", "minionRevolt", "minionLoyal", "memberBond", "memberDie", "memberLeave"]);
const BOOL_EFFECTS = new Set(["allyHurt", "allyDie", "allyLeave", "loseJob", "joinGuild", "recruit", "marry", "child", "loseChild", "demote", "jobPromote", "loseSpouse"]);
const STR_EFFECTS = new Set(["setJob", "focus", "orgRankName", "evolve", "era", "parentDie"]);
const REQ_KEYS = new Set([...STATS, ...BARS, "fame", "below", "flags", "anyFlags", "notFlags", "flagHint", "gender", "job", "jobRank", "jobRankMax", "guild", "guildRank", "guildRankMax", "party", "noParty", "allyTrait", "spouse", "children", "noChildren", "focus", "hint", "any", "fatherAlive", "motherAlive", "makerAlive", "form", "subtype", "cast", "castAlive", "noBand", "band", "bandMember", "minionOk", "minions"]);
const STORY_EFFECTS = new Set(["castDie", "castJoin", "castLeave", "castBond", "joinBand", "leaveBand", "bandGone", "bandLead", "minionAdd", "minionLose", "minionRevolt", "minionLoyal", "memberBond", "memberDie", "memberLeave"]);
const EVENT_KEYS = new Set(["_file", "id", "races", "excludeRaces", "tags", "stages", "eras", "minAge", "maxAge", "once", "weight", "require", "text", "effects", "choices", "moment", "death", "focus", "result", "pack", "arc", "recall"]);
const PLACEHOLDERS = new Set(["name", "race", "age", "origin", "stage", "pct", "cause", "ally", "allyJob", "partner", "child", "job", "rank", "guild", "spouse", "quest", "next", "father", "mother", "maker", "who", "rival", "mentor", "friend", "party", "leader", "member", "minion"]);

function validate(data) {
  const errors = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);

  const raceIds = new Set();
  const stageIds = new Set(["infant", "child", "teen", "adult", "middle", "elder"]);
  const tags = new Set();
  let total = 0;
  for (const r of data.races) {
    const w = `races.json [${r.id}]`;
    if (!/^[a-z_]+$/.test(r.id || "")) err(w, "id phải viết thường, không dấu");
    if (raceIds.has(r.id)) err(w, "trùng id");
    raceIds.add(r.id);
    if (!(r.weight > 0)) err(w, "weight phải > 0");
    total += r.weight || 0;
    if (r.lifespan !== null && !(Array.isArray(r.lifespan) && r.lifespan[0] > 0 && r.lifespan[1] >= r.lifespan[0])) err(w, "lifespan phải là [min, max] hoặc null");
    if (r.lifespan === null && !r.stages) err(w, "tộc bất tử cần khai báo stages");
    if (r.lifespan === null && !r.lastStep) err(w, "tộc bất tử cần lastStep");
    for (const k of STATS) if (!(r.mult && r.mult[k] > 0)) err(w, `thiếu hệ số ${k}`);
    (r.tags || []).forEach((t) => tags.add(t));
    if (r.stages) {
      let prev = -1;
      for (const s of r.stages) {
        stageIds.add(s.id);
        if (!(s.start > prev)) err(w, `stage ${s.id} phải bắt đầu sau stage trước`);
        prev = s.start;
      }
      if (r.stages[0].start !== 0) err(w, "stage đầu tiên phải bắt đầu ở 0");
    }
  }
  if (Math.abs(total - 100) > 0.001) err("races.json", `tổng weight là ${total}, cần đúng 100`);

  const eraIds = new Set();
  let eraTotal = 0;
  for (const e of data.eras || []) {
    const w = `eras.json [${e.id}]`;
    eraIds.add(e.id);
    eraTotal += e.weight || 0;
    if (!(e.hazard > 0)) err(w, "hazard phải > 0");
    if (!e.text || !e.change) err(w, "cần text và change");
  }
  if (data.eras && Math.abs(eraTotal - 100) > 0.001) err("eras.json", `tổng weight là ${eraTotal}, cần đúng 100`);

  const checkText = (where, text) => {
    if (typeof text !== "string" || !text.trim()) return err(where, "thiếu text");
    for (const m of text.matchAll(/\{(\w+)\}/g)) if (!PLACEHOLDERS.has(m[1])) err(where, `placeholder lạ {${m[1]}}`);
  };
  const checkEffects = (where, eff) => {
    if (!eff) return;
    for (const k of Object.keys(eff)) {
      if (!EFFECT_KEYS.has(k)) err(where, `effect lạ "${k}"`);
      else if (k === "flags" || k === "unflags") { if (!Array.isArray(eff[k])) err(where, `${k} phải là mảng`); }
      else if (BOOL_EFFECTS.has(k)) { if (eff[k] !== true) err(where, `${k} phải là true`); }
      else if (STR_EFFECTS.has(k)) { if (typeof eff[k] !== "string") err(where, `${k} phải là chuỗi`); }
      else if (STORY_EFFECTS.has(k)) { /* free-form story values: true, ids, lists, objects */ }
      else if (["orgRank", "jobRankSet", "orgRankUp"].includes(k)) { if (typeof eff[k] !== "number") err(where, `${k} phải là số`); }
      else if (typeof eff[k] !== "number" || Math.abs(eff[k]) > 100) err(where, `${k} phải là số trong khoảng -100..100`);
    }
  };
  const checkReq = (where, req) => {
    if (!req) return;
    for (const k of Object.keys(req)) if (!REQ_KEYS.has(k)) err(where, `require lạ "${k}"`);
    for (const r of req.any || []) checkReq(where + " (any)", r);
  };
  const checkRaces = (where, list) => {
    for (const r of list || []) if (!raceIds.has(r)) err(where, `tộc không tồn tại "${r}"`);
  };
  const checkOutcome = (where, o) => {
    if (!o) return err(where, "thiếu kết quả");
    if (o.text != null) checkText(where, o.text);
    if (o.death != null) checkText(where + " death", o.death);
    checkEffects(where, o.effects);
  };

  const ids = new Set();
  for (const e of data.events) {
    const w = `events/${e._file} [${e.id}]`;
    for (const k of Object.keys(e)) if (!EVENT_KEYS.has(k)) err(w, `trường lạ "${k}"`);
    if (!/^[a-z0-9_]+$/.test(e.id || "")) err(w, "id phải viết thường, không dấu");
    if (ids.has(e.id)) err(w, "trùng id");
    ids.add(e.id);
    checkRaces(w, e.races);
    checkRaces(w, e.excludeRaces);
    for (const t of e.tags || []) if (!tags.has(t)) err(w, `tag không tồn tại "${t}"`);
    for (const s of e.stages || []) if (!stageIds.has(s)) err(w, `stage không tồn tại "${s}"`);
    for (const x of e.eras || []) if (!eraIds.has(x)) err(w, `thời đại không tồn tại "${x}"`);
    if (e.races && e.races.length && e.stages && e.stages.length) {
      // Each listed race must actually have at least one of the listed stages.
      for (const rid of e.races) {
        const r = data.races.find((x) => x.id === rid);
        const own = r && r.stages ? r.stages.map((s) => s.id) : ["infant", "child", "teen", "adult", "middle", "elder"];
        if (r && !e.stages.some((s) => own.includes(s))) err(w, `tộc ${rid} không có giai đoạn nào trong ${e.stages.join(", ")}`);
      }
    }
    if (e.weight != null && !(e.weight > 0)) err(w, "weight phải > 0");
    checkText(w, e.text);
    checkEffects(w, e.effects);
    checkReq(w, e.require);
    if (e.choices) {
      if (e.choices.length < 2 || e.choices.length > 4) err(w, "cần 2–4 lựa chọn");
      e.choices.forEach((ch, i) => {
        const cw = `${w} lựa chọn ${i + 1}`;
        if (!ch.label) err(cw, "thiếu label");
        checkReq(cw, ch.require);
        if (ch.check) {
          if (![...STATS, ...BARS, "fame", "best", "jobstat"].includes(ch.check.stat)) err(cw, `check.stat lạ "${ch.check.stat}"`);
          if (typeof ch.check.target !== "number") err(cw, "check.target phải là số");
          checkOutcome(cw + " success", ch.success);
          checkOutcome(cw + " fail", ch.fail);
        } else checkOutcome(cw, ch);
      });
      if (e.effects) err(w, "sự kiện có lựa chọn không dùng effects; đặt effects trong từng lựa chọn");
    }
  }

  const focusIds = new Set((data.focus || []).map((f) => f.id));
  const jobIds = new Set((data.jobs || []).map((j) => j.id));
  for (const e of data.events) {
    const w = `events/${e._file} [${e.id}]`;
    for (const f of e.focus || []) if (!focusIds.has(f)) err(w, `focus không tồn tại "${f}"`);
    const rj = e.require && e.require.job;
    for (const j of rj == null ? [] : [].concat(rj)) if (!jobIds.has(j) && j !== "any" && j !== "none") err(w, `nghề không tồn tại "${j}"`);
  }
  for (const f of data.focus || []) {
    const w = `focus.json [${f.id}]`;
    for (const k of Object.keys(f.gains || {})) if (!STATS.includes(k)) err(w, `gains lạ "${k}"`);
    for (const k of Object.keys(f.bars || {})) if (!BARS.includes(k)) err(w, `bars lạ "${k}"`);
    for (const list of Object.values(f.quiet || {})) for (const t of list) checkText(w, t);
  }
  for (const j of data.jobs || []) {
    const w = `jobs.json [${j.id}]`;
    if (!STATS.includes(j.stat)) err(w, "stat phải là STR/INT/AGI/LUCK");
    if (!(j.ranks && j.ranks.length === 5)) err(w, "cần đúng 5 bậc (ranks)");
    for (const k of ["income"]) if (!(j[k] && j[k].length === 5)) err(w, `${k} cần 5 giá trị`);
    for (const k of ["promoXp", "promoTarget", "promo"]) if (!(j[k] && j[k].length === 4)) err(w, `${k} cần 4 giá trị`);
    checkReq(w, j.require);
    checkReq(w, j.alt);
    checkText(w, j.start);
    for (const t of j.promo || []) checkText(w, t);
    for (const t of j.quiet || []) checkText(w, t);
  }
  const orgs = new Map((data.orgs || []).map((o) => [o.id, o]));
  for (const o of data.orgs || []) {
    const w = `orgs [${o.id}]`;
    if (!(o.ranks && o.ranks.length >= 2)) err(w, "cần danh sách ranks");
    if (!(o.points && o.points.length === o.ranks.length)) err(w, "points phải dài bằng ranks");
  }
  const qids = new Set();
  for (const q of data.quests || []) {
    const w = `quests [${q.id}]`;
    if (qids.has(q.id)) err(w, "trùng id");
    qids.add(q.id);
    const o = orgs.get(q.org || "guild");
    if (!o) err(w, `tổ chức không tồn tại "${q.org}"`);
    else {
      if (q.minRank != null && !(q.minRank >= 0 && q.minRank < o.ranks.length)) err(w, "minRank ngoài phạm vi");
      if (q.maxRank != null && !(q.maxRank >= 0 && q.maxRank < o.ranks.length)) err(w, "maxRank ngoài phạm vi");
    }
    for (const x of q.eras || []) if (!eraIds.has(x)) err(w, `thời đại không tồn tại "${x}"`);
    checkText(w, q.intro);
    checkText(w, q.complete);
    if (!(q.steps && q.steps.length)) err(w, "cần ít nhất 1 cảnh (steps)");
    (q.steps || []).forEach((st, si) => {
      const sw = `${w} cảnh ${si + 1}`;
      checkText(sw, st.text);
      if (st.auto) { checkOutcome(sw + " (tự động)", st.auto); return; }
      if (!(st.choices && st.choices.length >= 1 && st.choices.length <= 4)) err(sw, "cần 1–4 lựa chọn");
      for (const ch of st.choices || []) for (const o of [ch, ch.success, ch.fail]) if (o && o.next != null && !(o.next >= 0 && o.next < q.steps.length)) err(sw, `next=${o.next} không tồn tại`);
      (st.choices || []).forEach((ch, i) => {
        const cw = `${sw} lựa chọn ${i + 1}`;
        if (!ch.label) err(cw, "thiếu label");
        checkReq(cw, ch.require);
        for (const o of ch.check ? [ch.success, ch.fail] : [ch]) {
          if (o && o.end && !["fail", "win"].includes(o.end)) err(cw, "end phải là fail hoặc win");
        }
        if (ch.check) { checkOutcome(cw + " success", ch.success); checkOutcome(cw + " fail", ch.fail); }
        else checkOutcome(cw, ch);
      });
    });
  }

  for (const o of data.origins) {
    const w = `origins.json [${o.id}]`;
    checkRaces(w, o.races);
    checkText(w, o.text);
    checkEffects(w, o.effects);
  }
  if (!data.origins.some((o) => !o.races || !o.races.length)) err("origins.json", "cần ít nhất một xuất thân chung (races rỗng)");

  for (const d of data.deaths) {
    const w = `deaths.json [${d.id}]`;
    if (!["old", "health", "violent"].includes(d.kind)) err(w, `kind phải là old/health/violent`);
    checkRaces(w, d.races);
    checkText(w, d.text);
  }
  for (const kind of ["old", "health", "violent"])
    if (!data.deaths.some((d) => d.kind === kind && (!d.races || !d.races.length))) err("deaths.json", `cần một cái chết chung loại ${kind}`);

  for (const ep of data.epitaphs) checkText(`epitaphs.json [${ep.id}]`, ep.text);
  for (const f of data.fillers) checkText("fillers.json", f.text);
  for (const s of stageIds)
    if (!data.fillers.some((f) => (!f.stages || f.stages.includes(s)) && !f.races)) err("fillers.json", `thiếu câu lấp chỗ cho stage "${s}"`);

  if (!data.names.default) err("names.json", "thiếu bộ tên default");
  return errors;
}

module.exports = { validate };

if (require.main === module) {
  const { loadData } = require("./load");
  let errors;
  try {
    errors = validate(loadData());
  } catch (e) {
    errors = [e.message];
  }
  if (errors.length) {
    console.error(`✗ ${errors.length} lỗi:`);
    for (const e of errors) console.error("  - " + e);
    process.exit(1);
  }
  console.log("✓ Dữ liệu hợp lệ.");
}
