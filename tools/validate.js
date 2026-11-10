// Checks every data file against the schema in docs/EVENT_SCHEMA.md.
// Run: node tools/validate.js   (exit code 1 when anything is wrong)
const STATS = ["STR", "INT", "AGI", "LUCK"];
const BARS = ["health", "joy", "wealth"];
const EFFECT_KEYS = new Set([...STATS, ...BARS, "flags", "unflags", "fame", "lifeCost", "setFree", "wealthKind", "epochChange", "jobXp", "guildPts", "bond", "partyBond", "allyHurt", "allyDie", "allyLeave", "loseJob", "setJob", "joinGuild", "focus", "recruit", "marry", "child", "loseChild", "demote", "orgRank", "orgRankName", "evolve", "era", "jobRankSet", "jobPromote", "orgRankUp", "loseSpouse", "parentDie", "castDie", "castJoin", "castLeave", "castBond", "joinBand", "leaveBand", "bandGone", "bandLead", "minionAdd", "minionLose", "minionRevolt", "minionLoyal", "memberBond", "memberDie", "memberLeave", "memberJoin", "foundBand", "item"]);
const BOOL_EFFECTS = new Set(["setFree","allyHurt", "allyDie", "allyLeave", "loseJob", "joinGuild", "recruit", "marry", "child", "loseChild", "demote", "jobPromote", "loseSpouse"]);
const STR_EFFECTS = new Set(["item", "setJob", "focus", "orgRankName", "evolve", "era", "parentDie"]);
const REQ_KEYS = new Set(["parentGone", "parentDead", "free", "captiveKinds", ...STATS, ...BARS, "fame", "below", "flags", "anyFlags", "notFlags", "flagHint", "gender", "job", "jobRank", "jobRankMax", "guild", "guildRank", "guildRankMax", "party", "noParty", "allyTrait", "spouse", "children", "noChildren", "focus", "hint", "any", "fatherAlive", "motherAlive", "makerAlive", "form", "subtype", "notSubtypes", "cast", "castAlive", "noBand", "band", "bandMember", "minionOk", "minions", "bandLead", "partyMax", "origin"]);
const STORY_EFFECTS = new Set(["castDie", "castJoin", "castLeave", "castBond", "joinBand", "leaveBand", "bandGone", "bandLead", "minionAdd", "minionLose", "minionRevolt", "minionLoyal", "memberBond", "memberDie", "memberLeave", "memberJoin", "foundBand"]);
const EVENT_KEYS = new Set(["epoch", "variants", "cooldownYears", "path", "_file", "id", "races", "excludeRaces", "tags", "stages", "eras", "minAge", "maxAge", "once", "weight", "require", "text", "effects", "choices", "moment", "death", "focus", "result", "pack", "arc", "recall", "npcs", "jobChoices"]);
const PLACEHOLDERS = new Set(["name", "race", "age", "origin", "stage", "pct", "cause", "ally", "allyJob", "partner", "child", "job", "rank", "guild", "spouse", "quest", "next", "father", "mother", "maker", "who", "rival", "mentor", "mentorPronoun", "friend", "party", "leader", "member", "minion", "place"]);

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
    if (/Lão\/Cô ta/i.test(text)) err(where, "đại từ biên tập chưa được thay bằng mentorPronoun");
    // "{mentor vào nửa đêm": an open brace the game would print as it is
    for (const m of text.matchAll(/\{(\w+)(?![\w}])/g)) err(where, `thiếu dấu } sau {${m[1]}`);
    if (/[.!?…]\s+\.(?!\.)/.test(text)) err(where, "dấu chấm kép");
  };
  const checkEffects = (where, eff) => {
    if (!eff) return;
    for (const k of Object.keys(eff)) {
      if (!EFFECT_KEYS.has(k)) err(where, `effect lạ "${k}"`);
      else if (k === "flags" || k === "unflags") { if (!Array.isArray(eff[k])) err(where, `${k} phải là mảng`); }
      else if (BOOL_EFFECTS.has(k)) { if (eff[k] !== true) err(where, `${k} phải là true`); }
      else if (STR_EFFECTS.has(k)) { if (typeof eff[k] !== "string" && !(k === "parentDie" && Array.isArray(eff[k]))) err(where, `${k} phải là chuỗi`); }
      else if (STORY_EFFECTS.has(k)) { /* free-form story values: true, ids, lists, objects */ }
      else if (["orgRank", "jobRankSet", "orgRankUp"].includes(k)) { if (typeof eff[k] !== "number") err(where, `${k} phải là số`); }
      else if (k === "wealthKind") { if (!["ordinary","commerce","windfall","refund"].includes(eff[k])) err(where,"wealthKind không hợp lệ"); }
      else if (k === "epochChange") { if (!eff[k] || typeof eff[k] !== "object" || Object.entries(eff[k]).some(([key,v])=>!["domain","ruin","insight","legacy"].includes(key)||!Number.isFinite(v)||Math.abs(v)>20)) err(where,"epochChange cần chỉ số kỷ nguyên hợp lệ"); }
      else if (k === "lifeCost" && (typeof eff[k] !== "number" || !Number.isFinite(eff[k]) || eff[k] < 0 || eff[k] > 100)) err(where, "lifeCost phải là số trong khoảng 0..100");
      else if (typeof eff[k] !== "number" || Math.abs(eff[k]) > 100) err(where, `${k} phải là số trong khoảng -100..100`);
    }
  };
  const checkReq = (where, req) => {
    if (!req) return;
    if(req.band!=null&&!["string","boolean"].includes(typeof req.band))err(where,"band cần ID hoặc boolean");
    if (req.captiveKinds != null) {
      if (!Array.isArray(req.captiveKinds) || !req.captiveKinds.length || req.captiveKinds.some(k => !["prison","slave","arena","bound"].includes(k))) err(where, "captiveKinds cần loại giam giữ hợp lệ");
      if (req.free) err(where, "không dùng free cùng captiveKinds");
    }
    for (const k of Object.keys(req)) if (!REQ_KEYS.has(k)) err(where, `require lạ "${k}"`);
    if (req.notSubtypes !== undefined) {
      if (!Array.isArray(req.notSubtypes)) err(where, "notSubtypes phải là mảng");
      else for (const id of req.notSubtypes)
        if (!data.races.some((r) => (r.subtypes || []).some((s) => s.id === id))) err(where, `phân loài không tồn tại "${id}"`);
    }
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

  const checkNpcs = (where, list) => {
    if (list == null) return;
    if (!Array.isArray(list)) return err(where, "npcs phải là một mảng");
    const seen = new Set();
    for (const npc of list) {
      if (!npc || typeof npc.name !== "string" || !npc.name.trim()) { err(where, "NPC phải có name"); continue; }
      if (seen.has(npc.name)) err(where, `NPC trùng tên "${npc.name}"`);
      seen.add(npc.name);
      if (!(typeof npc.race === "string" && npc.race.trim()) || !(typeof npc.position === "string" && npc.position.trim())) err(where, `NPC ${npc.name} cần race và position`);
    }
  };

  const ids = new Set();
  for (const e of data.events) {
    const w = `events/${e._file} [${e.id}]`;
    for (const k of Object.keys(e)) if (!EVENT_KEYS.has(k)) err(w, `trường lạ "${k}"`);
    if (!/^[a-z0-9_]+$/.test(e.id || "")) err(w, "id phải viết thường, không dấu");
    if (ids.has(e.id)) err(w, "trùng id");
    ids.add(e.id);
    checkNpcs(w, e.npcs);
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
    if (e.cooldownYears!=null && (!Number.isFinite(e.cooldownYears)||e.cooldownYears<0)) err(w,"cooldownYears cần số năm không âm");
    if (e.epoch!=null && typeof e.epoch!=="boolean") err(w,"epoch cần boolean");
    if (e.variants!=null) { if (!Array.isArray(e.variants)||!e.variants.length) err(w,"variants cần các đoạn kể");else for(const t of e.variants)checkText(w+" variant",t); }
    checkEffects(w, e.effects);
    checkReq(w, e.require);
    if (e.jobChoices && !e.choices) err(w, "jobChoices cần các lựa chọn chung trong choices");
    if (e.jobChoices && (!Array.isArray(e.jobChoices) || e.jobChoices.length > 4)) err(w, "jobChoices cần tối đa 4 lựa chọn");
    if (e.choices) {
      if (e.choices.length < 2 || e.choices.length > 4) err(w, "cần 2–4 lựa chọn");
      [...e.choices, ...(Array.isArray(e.jobChoices) ? e.jobChoices : [])].forEach((ch, i) => {
        const cw = `${w} lựa chọn ${i + 1}`;
        if (!ch.label) err(cw, "thiếu label");
        if (ch.risk != null && ch.risk !== "lethal") err(cw, "risk phải là lethal");
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

  for (const [id,p] of Object.entries(data.chronology||{})) {
    if (!data.races.some(r=>r.id===id) || !["generations","epoch"].includes(p.mode) || !Number.isFinite(p.minStep) || !Number.isFinite(p.maxStep) || p.minStep<1 || p.maxStep<p.minStep || p.maxTicks!==1 || !(p.period>0)) err(`chronology ${id}`,"nhịp thời gian không hợp lệ");
  }
  const contexts = ["free", "prison", "slave", "arena", "bound"];
  for (const [race, story] of Object.entries(data.story || {})) for (const k of Object.values(story.cast || {})) {
    if (!Array.isArray(k.contexts) || !k.contexts.length || k.contexts.some(x => !contexts.includes(x))) err(`story ${race}/${k.id}`, "Cast cần contexts hợp lệ");
  }
  for (const [race, story] of Object.entries(data.story || {})) for (const [stage, list] of Object.entries(story.chapters || {})) for (const chapter of list) {
    checkText(`chapter ${race}/${stage}`, chapter.text);
    if (chapter.requiresShelter != null && typeof chapter.requiresShelter !== "boolean") err(`chapter ${race}/${stage}`, "requiresShelter phải là boolean");
  }
  const probabilities = [["global", data.systems.castChances], ...Object.entries(data.systems.race || {}).filter(([,s])=>s.castChances).map(([id,s])=>[id,s.castChances])];
  for (const [id, values] of probabilities) {
    if (!values || typeof values !== "object" || Array.isArray(values)) { err(`castChances ${id}`, "cần object xác suất"); continue; }
    for (const [role,p] of Object.entries(values)) if (!["friend","mentor","rival"].includes(role) || typeof p !== "number" || !Number.isFinite(p) || p<0 || p>1) err(`castChances ${id}`, "vai và xác suất phải hợp lệ (0..1)");
  }

  const focusIds = new Set((data.focus || []).map((f) => f.id));
  const jobIds = new Set((data.jobs || []).map((j) => j.id));
  if (data.economy) {
    const p=data.economy;
    if (!(p.ordinaryRewardScale>0&&p.ordinaryRewardScale<=1&&p.capitalRate>=0&&p.capitalRate<=0.1&&p.capitalMinimum>=0&&p.capitalMinimum<=100&&Number.isInteger(p.seniorRank)&&p.seniorRank>=0)) err("economy","tham số kinh tế không hợp lệ");
    for(const id of p.commercialJobs||[]) if(!jobIds.has(id))err("economy",`nghề thương mại không tồn tại: ${id}`);
    for(const [id,range] of Object.entries(p.originStarting||{})) if(!data.origins.some(o=>o.id===id)||!Array.isArray(range)||range.length!==2||!range.every(Number.isFinite)||range[0]<0||range[1]<range[0]||range[1]>100)err("economy",`xuất thân/tài sản không hợp lệ: ${id}`);
    for(const r of data.races){const e=p.races?.[r.id];if(!e||!["currency","wild","barter","mythic"].includes(e.mode)||!Array.isArray(e.start)||e.start.length!==2||!e.start.every(Number.isFinite)||e.start[0]<0||e.start[1]<e.start[0]||e.start[1]>100||!(e.incomeCap>=0&&e.incomeCap<=100))err("economy",`phân tầng tài sản không hợp lệ: ${r.id}`);}
  }
  for (const e of data.events) {
    const w = `events/${e._file} [${e.id}]`;
    for (const f of e.focus || []) if (!focusIds.has(f)) err(w, `focus không tồn tại "${f}"`);
    for (const choice of Array.isArray(e.jobChoices) ? e.jobChoices : []) {
      if (!choice.require?.job || ![].concat(choice.require.job).length) err(w, "lựa chọn nghề cần require.job");
      for (const id of [].concat(choice.require?.job || [])) if (!jobIds.has(id)) err(w, `nghề lựa chọn không tồn tại "${id}"`);
    }
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
    if(j.practiceFocus && (typeof j.practiceFocus!=="object"||Array.isArray(j.practiceFocus)||Object.entries(j.practiceFocus).some(([key,value])=>!["adventure","train","study","social"].includes(key)||!Number.isFinite(value)||value<=0||value>1)))err(w,"practiceFocus cần hệ số (0,1] cho hướng chủ động, không có rest/play");
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
    checkReq(w, q.require);
    if (q.career) {
      if (!jobIds.has(q.career.job)) err(w, "nghề career không tồn tại");
      if (![2,4].includes(q.career.rank) || q.steps?.length !== 3) err(w, "career cần mốc 2/4 và ba chặng");
    }
    checkNpcs(w, q.npcs);
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
        if (ch.risk != null && ch.risk !== "lethal") err(cw, "risk phải là lethal");
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
    if (o.captiveKind != null && !["prison", "slave", "arena", "bound"].includes(o.captiveKind)) err(w, "captiveKind không hợp lệ");
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

  for (const ep of data.epitaphs) {
    checkText(`epitaphs.json [${ep.id}]`, ep.text);
    checkRaces("epitaphs.json", ep.races);
    checkRaces("epitaphs.json", ep.excludeRaces);
  }
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
