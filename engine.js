// Game engine. Pure logic, no DOM: runs in the browser and in Node (tools/simulate.js).
//
// A life is played in "chapters": one click lets time flow tick by tick until something worth
// stopping for happens (a choice, a new life stage, death) or a few events have been told.
// Quiet years are folded into one line, so busy ages read year by year and calm ones fly past.
//
// Races can bring their own "pack" (data/packs/<race>.json, merged by tools/load.js): their own
// organisation (Guild, tribe...), roles, raids, focus names, companions and texts.
(function (root) {
  "use strict";

  const STAT_KEYS = ["STR", "INT", "AGI", "LUCK"];
  const BAR_KEYS = ["health", "joy", "wealth"];
  const STAT_LABEL = { STR: "Sức mạnh", INT: "Trí tuệ", AGI: "Nhanh nhẹn", LUCK: "May mắn", health: "Sức khỏe", joy: "Hạnh phúc", wealth: "Tài sản", fame: "Danh vọng" };
  const MAX_PARTY = 3;

  // Default life stages as a share of the race's average lifespan.
  const DEFAULT_STAGES = [
    ["infant", "Sơ sinh", 0],
    ["child", "Thơ ấu", 0.04],
    ["teen", "Thiếu niên", 0.15],
    ["adult", "Trưởng thành", 0.25],
    ["middle", "Trung niên", 0.55],
    ["elder", "Tuổi già", 0.8],
  ];
  // How finely each stage is sliced (ticks per stage) and how eventful one tick is.
  // Growing-up years are sliced finer and are busier; old age moves in longer, quieter strides.
  const STAGE_TICKS = { infant: 3, child: 8, teen: 10, adult: 20, middle: 10, elder: 8, ancient: 10 };
  const STAGE_DENSITY = { infant: 0.3, child: 0.5, teen: 0.75, adult: 0.65, middle: 0.45, elder: 0.35, ancient: 0.45 };
  const MAX_TICKS_PER_CLICK = 8;
  const MAX_EVENTS_PER_CLICK = 3;

  // ---------- random ----------
  function makeRng(seed) {
    if (seed == null) return Math.random;
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const randInt = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const pick = (rng, list) => list[Math.floor(rng() * list.length)];

  function weightedPick(items, rng, getW) {
    getW = getW || ((x) => (x.weight == null ? 1 : x.weight));
    let total = 0;
    for (const it of items) total += Math.max(0, getW(it));
    if (total <= 0) return null;
    let r = rng() * total;
    for (const it of items) {
      r -= Math.max(0, getW(it));
      if (r < 0) return it;
    }
    return items[items.length - 1];
  }

  // ---------- race and time ----------
  function avgLifespan(race) {
    return race.lifespan ? (race.lifespan[0] + race.lifespan[1]) / 2 : null;
  }

  function stagesOf(race) {
    if (race.stages) return race.stages;
    const avg = avgLifespan(race);
    return DEFAULT_STAGES.map(([id, name, pct]) => ({ id, name, start: Math.round(pct * avg * 10) / 10 }));
  }

  function stageIndex(c) {
    const st = stagesOf(c.race);
    let idx = 0;
    for (let i = 0; i < st.length; i++) if (c.age >= st[i].start) idx = i;
    return idx;
  }
  function currentStage(c) {
    return stagesOf(c.race)[stageIndex(c)];
  }
  function adultStart(race) {
    const adult = stagesOf(race).find((s) => s.id === "adult");
    return adult ? adult.start : avgLifespan(race) * 0.25 || 20;
  }

  // How many real years equal one "human year" of living for this race. Used so a dragon does not
  // get promoted every tick: work experience, income and child births scale with it.
  function yearScale(race) {
    if (race.yearScale) return race.yearScale;
    return Math.max(1, adultStart(race) / 19);
  }

  function tickYears(c) {
    const st = stagesOf(c.race);
    const i = stageIndex(c);
    const cur = st[i];
    const next = st[i + 1];
    const slices = STAGE_TICKS[cur.id] || 10;
    let len;
    if (next) len = next.start - cur.start;
    else if (c.maxAge != null) len = Math.max(1, c.maxAge - cur.start);
    else return c.race.lastStep || 50;
    let step = Math.max(1, Math.round(len / slices));
    if (next) step = Math.min(step, Math.max(1, Math.ceil(next.start - c.age)));
    return step;
  }

  // ---------- race-specific settings ----------
  // Text and settings can be overridden per race in data.systems.race[raceId].
  function sys(c, data, key) {
    const r = data.systems.race && data.systems.race[c.race.id];
    return r && r[key] !== undefined ? r[key] : data.systems[key];
  }
  function orgFor(c, data) {
    const orgs = data.orgs || [];
    return (
      orgs.find((o) => o.races && o.races.includes(c.race.id)) ||
      orgs.find((o) => !o.races && o.tags && (c.race.tags || []).some((t) => o.tags.includes(t)))
    );
  }
  function orgDef(c, data) {
    return c.guild ? (data.orgs || []).find((o) => o.id === c.guild.org) : null;
  }
  function orgRankName(c, data) {
    const o = orgDef(c, data);
    if (!o) return "";
    return o.rankLabel ? `${o.rankLabel} ${o.ranks[c.guild.rank]}` : o.ranks[c.guild.rank];
  }
  function focusDef(c, data, id) {
    const base = (data.focus || []).find((f) => f.id === id);
    const over = data.focusRace && data.focusRace[c.race.id] && data.focusRace[c.race.id][id];
    if (!base) return null;
    return over ? Object.assign({}, base, over) : base;
  }

  // ---------- text ----------
  function jobDef(c, data) {
    return c.job ? (data.jobs || []).find((j) => j.id === c.job.id) : null;
  }
  // Ranks can have a female form (Priest → Thánh Nữ).
  function rankNames(c, j) {
    return c.gender === "female" && j.ranksF ? j.ranksF : j.ranks;
  }
  function jobTitle(c, data) {
    const j = jobDef(c, data);
    return j ? `${j.name} · ${rankNames(c, j)[c.job.rank]}` : "";
  }
  function aliveParty(c) {
    return c.party.filter((m) => m.alive);
  }
  function raceTitle(c) {
    return c.form ? `${c.race.name} → ${c.form}` : c.race.name;
  }
  function parentName(c, who) {
    const p = c.parents && c.parents[who];
    if (!p || !p.name) return who === "father" ? "cha bạn" : who === "mother" ? "mẹ bạn" : "kẻ đã tạo ra bạn";
    return p.name;
  }

  function fmt(text, c, extra, data) {
    const ctx = c.ctx || {};
    const j = data ? jobDef(c, data) : null;
    const kid = ctx.child || (c.children.length ? c.children[c.children.length - 1].name : "đứa con");
    const vars = Object.assign(
      {
        name: c.name,
        race: c.race.name,
        age: c.age,
        origin: c.origin ? c.origin.name : "",
        stage: currentStage(c).name,
        ally: ctx.ally ? ctx.ally.name : "kẻ đồng hành",
        allyJob: ctx.ally ? ctx.ally.jobName : "",
        partner: ctx.partner ? ctx.partner.name : "",
        child: kid,
        job: j ? j.name : "kẻ lang bạt",
        rank: j ? rankNames(c, j)[c.job.rank] : "",
        guild: data && c.guild ? orgRankName(c, data) : "",
        spouse: c.spouse ? c.spouse.name : ctx.partner ? ctx.partner.name : "người ấy",
        quest: ctx.quest ? ctx.quest.name : "",
        father: parentName(c, "father"),
        mother: parentName(c, "mother"),
        maker: parentName(c, "maker"),
      },
      extra || {}
    );
    // a placeholder that starts a sentence ("kẻ đã tạo ra bạn ra lệnh…") gets a capital letter
    return String(text).replace(/([.!?…:]\s+|["“]\s*|)\{(\w+)\}/g, (m, pre, k, at) => {
      if (!(k in vars)) return m;
      const v = String(vars[k]);
      return pre || at === 0 ? pre + v.charAt(0).toUpperCase() + v.slice(1) : v;
    });
  }

  function randomName(data, rng, raceId, gender) {
    const names = data.names[raceId] || data.names.default;
    const list = (gender && names[gender]) || names.any || names.male || data.names.default.any || data.names.default.male;
    const first = pick(rng, list);
    const fam = names.family && names.family.length ? " " + pick(rng, names.family) : "";
    return first + fam;
  }

  // ---------- parents ----------
  // Origins from a race pack describe the parents; other races get plain generated ones.
  function makeParents(c, data, rng) {
    const o = c.origin;
    const out = {};
    const famName = (c.name.split(" ").slice(1).join(" ") || "").trim();
    const lifeLeft = () => {
      if (!c.race.lifespan) return null;
      const parentAge = adultStart(c.race) * (1 + rng() * 0.6);
      return Math.max(1, randInt(rng, c.race.lifespan[0], c.race.lifespan[1]) - parentAge);
    };
    for (const who of ["father", "mother", "maker"]) {
      const p = o[who];
      if (p) {
        out[who] = Object.assign({}, p, { alive: p.status === "alive", dieAt: p.status === "alive" ? lifeLeft() : null });
        // the script left the name to the game ("{father} · Vampire · Bá tước"): give one from that parent's race
        if (!p.name && p.status !== "unknown") {
          const pr = (data.races || []).find((r) => p.race && (r.name.toLowerCase() === p.race.toLowerCase() || r.id === p.race.toLowerCase()));
          const g = who === "father" ? "male" : who === "mother" ? "female" : null;
          const first = randomName(data, rng, pr ? pr.id : c.race.id, g).split(" ")[0];
          out[who].name = who !== "maker" && famName && (!pr || pr.id === c.race.id) ? `${first} ${famName}` : first;
        }
      } else if (who !== "maker" && !o.noParents) {
        const orphan = c.flags.some((f) => /orphan|mo_coi/.test(f));
        const g = who === "father" ? "male" : "female";
        const first = randomName(data, rng, c.race.id, g).split(" ")[0];
        out[who] = { name: famName ? `${first} ${famName}` : first, race: c.race.name, status: orphan ? "dead" : "alive", alive: !orphan, dieAt: orphan ? null : lifeLeft(), generated: true };
      }
    }
    return out;
  }

  function parentsTick(c, data, rng) {
    if (!c.parents) return;
    for (const who of ["father", "mother"]) {
      const p = c.parents[who];
      if (p && p.alive && p.dieAt != null && c.age >= p.dieAt) {
        p.alive = false;
        p.status = "dead";
        const lines = sys(c, data, "parentDeath") || ["{who} qua đời. Bạn đứng lặng rất lâu trước nấm mồ."];
        pushLog(c, "loss", fmt(pick(rng, lines), c, { who: p.name || (who === "father" ? "Cha bạn" : "Mẹ bạn") }, data));
        addMoment(c, `${who === "father" ? "Cha" : "Mẹ"} qua đời`, data);
      }
    }
  }

  // ---------- character ----------
  function createCharacter(data, rng, raceId) {
    rng = rng || Math.random;
    const race = raceId ? data.races.find((r) => r.id === raceId) : weightedPick(data.races, rng);
    const raceOrigins = data.origins.filter((o) => o.races && o.races.includes(race.id));
    const pool = raceOrigins.length ? raceOrigins : data.origins.filter((o) => !o.races || !o.races.length);
    const origin = weightedPick(pool, rng);

    const gender = race.genderless ? null : rng() < 0.5 ? "male" : "female";
    const names = data.names[race.id] || data.names.default;
    const firstList = gender ? names[gender] || names.any : names.any || names.male;
    const first = pick(rng, firstList);
    const family = names.family && names.family.length ? " " + pick(rng, names.family) : "";

    const stats = {};
    for (const k of STAT_KEYS) stats[k] = clamp(Math.round(randInt(rng, 1, 10) * (race.mult[k] || 1)), 0, 99);

    const era = data.eras && data.eras.length ? weightedPick(data.eras, rng) : null;

    const c = {
      race,
      origin,
      era,
      eraUntil: randInt(rng, 30, 120) * Math.max(1, yearScale(race) / 2),
      name: first + family,
      gender,
      age: 0,
      maxAge: race.lifespan ? randInt(rng, race.lifespan[0], race.lifespan[1]) : null,
      stats,
      bars: { health: randInt(rng, 75, 95), joy: 50, wealth: 20 },
      fame: 0,
      flags: [],
      used: [],
      log: [],
      moments: [],
      pending: null,
      alive: true,
      cause: null,
      // life profile
      form: null,
      parents: null,
      focus: null,
      job: null,
      pastJobs: [],
      nextJobOffer: 0,
      guild: null,
      party: [],
      spouse: null,
      children: [],
      quest: null,
      questsDone: 0,
      questLast: {},
      ctx: null,
      stageId: "infant",
      clicks: 0,
    };
    applyEffects(c, origin.effects, data, rng);
    c.parents = makeParents(c, data, rng);
    const org = orgFor(c, data);
    if (org && org.auto) c.guild = { org: org.id, rank: 0, pts: 0, since: 0 };
    const focusList = focusOptions(c, data);
    if (focusList.length) c.focus = focusList[0].id;
    if (era) pushLog(c, "era", era.text);
    pushLog(c, "intro", introLine(c));
    pushLog(c, "birth", fmt(origin.text, c, null, data));
    return c;
  }

  function introLine(c) {
    return `Bạn là ${c.name}, thuộc chủng tộc ${c.race.name}` + (c.race.gloss ? ` — ${c.race.gloss}.` : ".");
  }

  function pushLog(c, kind, text, ageFrom) {
    const st = currentStage(c);
    const entry = { age: c.age, stage: st.name, kind, text };
    if (ageFrom != null && ageFrom < c.age) entry.ageFrom = ageFrom;
    c.log.push(entry);
    return entry;
  }

  function addMoment(c, text, data) {
    if (text) c.moments.push({ age: c.age, text: fmt(text, c, null, data) });
  }

  // ---------- effects and requirements ----------
  function applyEffects(c, eff, data, rng) {
    if (!eff) return;
    rng = rng || Math.random;
    for (const k of STAT_KEYS) if (eff[k]) c.stats[k] = clamp(c.stats[k] + eff[k], 0, 99);
    for (const k of BAR_KEYS) if (eff[k]) c.bars[k] = clamp(c.bars[k] + eff[k], 0, 100);
    if (eff.fame) c.fame = clamp(c.fame + eff.fame, 0, 100);
    // In some organisations (a Goblin tribe) any renown also climbs the ladder.
    if (eff.fame > 0 && data && c.guild) {
      const o = orgDef(c, data);
      if (o && o.fameToPts) addGuildPoints(c, data, eff.fame * o.fameToPts);
    }
    if (eff.flags) for (const f of eff.flags) if (!c.flags.includes(f)) c.flags.push(f);
    if (eff.unflags) c.flags = c.flags.filter((f) => !eff.unflags.includes(f));
    if (!data) return;
    if (eff.jobXp && c.job) c.job.xp += eff.jobXp;
    if (eff.guildPts && c.guild) addGuildPoints(c, data, eff.guildPts);
    const ally = c.ctx && c.ctx.ally;
    if (eff.bond && ally) ally.bond = clamp(ally.bond + eff.bond, 0, 100);
    if (eff.partyBond) for (const m of aliveParty(c)) m.bond = clamp(m.bond + eff.partyBond, 0, 100);
    if (eff.allyHurt && ally) {
      ally.hurt = true;
      ally.bond = clamp(ally.bond - 5, 0, 100);
    }
    if (eff.allyDie && ally) killAlly(c, data, ally, rng);
    if (eff.allyLeave && ally && ally.alive) {
      ally.alive = false;
      ally.left = true;
      pushLog(c, "loss", fmt(pick(rng, sys(c, data, "allyLeave")), c, { ally: ally.name }, data));
    }
    if (eff.recruit && aliveParty(c).length < MAX_PARTY) {
      const m = makeCompanion(c, data, rng);
      c.party.push(m);
      addMoment(c, `${m.name} gia nhập ${sys(c, data, "bandName") || "tổ đội"}`, data);
    }
    if (eff.loseJob && c.job) {
      c.pastJobs.push(c.job);
      c.job = null;
      c.nextJobOffer = c.age + tickYears(c) * 2;
    }
    if (eff.jobPromote && c.job) {
      const j = jobDef(c, data);
      if (j && c.job.rank < j.ranks.length - 1) { c.job.rank++; c.job.xp = 0; }
    }
    if (eff.jobRankSet != null && c.job) {
      const j = jobDef(c, data);
      c.job.rank = clamp(eff.jobRankSet, 0, (j ? j.ranks.length : 5) - 1);
      c.job.xp = 0;
    }
    if (eff.orgRankUp && c.guild) {
      // "rank up +N" never skips past the ranks that only a story event can give
      const o = orgDef(c, data);
      let cap = o.ranks.length - 1;
      if (o.points) while (cap > 0 && o.points[cap] == null) cap--;
      const to = c.guild.rank + eff.orgRankUp;
      setOrgRank(c, data, eff.orgRankUp > 0 ? Math.max(c.guild.rank, Math.min(cap, to)) : to);
    }
    if (eff.loseSpouse && c.spouse) {
      c.formerSpouses = (c.formerSpouses || []).concat(c.spouse.name);
      c.spouse = null;
    }
    if (eff.parentDie && c.parents && c.parents[eff.parentDie] && c.parents[eff.parentDie].alive) {
      c.parents[eff.parentDie].alive = false;
      c.parents[eff.parentDie].status = "dead";
    }
    if (eff.demote && c.job) {
      c.job.rank = 0;
      c.job.xp = 0;
    }
    if (eff.setJob) takeJob(c, data, eff.setJob, rng);
    if (eff.joinGuild && !c.guild) joinGuild(c, data);
    if (eff.orgRankName && c.guild) {
      const o = orgDef(c, data);
      const want = String(eff.orgRankName).toLowerCase();
      let idx = o.ranks.findIndex((r) => r.toLowerCase().startsWith(want) || want.startsWith(r.toLowerCase()));
      if (idx < 0 && o.rankAliases) idx = o.rankAliases.findIndex((a) => a && (a.startsWith(want) || want.startsWith(a)));
      if (idx >= 0) setOrgRank(c, data, idx);
    }
    if (eff.orgRank != null && c.guild) setOrgRank(c, data, eff.orgRank);
    if (eff.marry && !c.spouse) {
      const p = (c.ctx && c.ctx.partner) || makePartner(c, data, rng);
      c.spouse = { name: p.name, race: p.race || c.race.name, since: c.age };
    }
    if (eff.child) addChild(c, data, rng);
    if (eff.loseChild && c.children.length) {
      const k = c.children.pop();
      c.lostChildren = (c.lostChildren || 0) + 1;
      k.lost = c.age;
    }
    if (eff.evolve) evolve(c, data, eff.evolve);
    if (eff.era && data.eras) {
      const e = data.eras.find((x) => x.id === eff.era);
      if (e && (!c.era || c.era.id !== e.id)) {
        c.era = e;
        c.eraUntil = c.age + randInt(rng, 30, 120) * Math.max(1, yearScale(c.race) / 2);
        pushLog(c, "era", e.change);
      }
    }
    if (eff.focus) c.focus = eff.focus;
  }

  function statValue(c, k) {
    if (k in c.stats) return c.stats[k];
    if (k in c.bars) return c.bars[k];
    if (k === "fame") return c.fame;
    return 0;
  }

  function meets(c, req, data) {
    if (!req) return true;
    if (req.any && !req.any.some((r) => meets(c, r, data))) return false;
    for (const k of STAT_KEYS) if (req[k] != null && c.stats[k] < req[k]) return false;
    for (const k of BAR_KEYS) if (req[k] != null && c.bars[k] < req[k]) return false;
    if (req.fame != null && c.fame < req.fame) return false;
    if (req.below) {
      for (const k of Object.keys(req.below)) {
        if (k === "bond") {
          if (!aliveParty(c).some((m) => m.bond < req.below.bond)) return false;
        } else if (statValue(c, k) >= req.below[k]) return false;
      }
    }
    if (req.flags && !req.flags.every((f) => c.flags.includes(f))) return false;
    if (req.anyFlags && !req.anyFlags.some((f) => c.flags.includes(f))) return false;
    if (req.notFlags && req.notFlags.some((f) => c.flags.includes(f))) return false;
    if (req.gender && req.gender !== c.gender) return false;
    if (req.job != null) {
      const jobs = [].concat(req.job);
      if (jobs.includes("none")) { if (c.job) return false; }
      else if (jobs.includes("any")) { if (!c.job) return false; }
      else if (!c.job || !jobs.includes(c.job.id)) return false;
    }
    if (req.jobRank != null && (!c.job || c.job.rank < req.jobRank)) return false;
    if (req.jobRankMax != null && (!c.job || c.job.rank > req.jobRankMax)) return false;
    if (req.guild === true && !c.guild) return false;
    if (req.guild === false && c.guild) return false;
    if (req.guildRank != null && (!c.guild || c.guild.rank < req.guildRank)) return false;
    if (req.guildRankMax != null && (!c.guild || c.guild.rank > req.guildRankMax)) return false;
    if (req.party != null && aliveParty(c).length < req.party) return false;
    if (req.noParty && aliveParty(c).length) return false;
    if (req.allyTrait && !aliveParty(c).some((m) => m.trait === req.allyTrait)) return false;
    if (req.spouse === true && !c.spouse) return false;
    if (req.spouse === false && c.spouse) return false;
    if (req.children != null && c.children.length < req.children) return false;
    if (req.noChildren && c.children.length) return false;
    if (req.focus && !(c.focus && [].concat(req.focus).includes(c.focus))) return false;
    if (req.fatherAlive != null && !!(c.parents && c.parents.father && c.parents.father.alive) !== req.fatherAlive) return false;
    if (req.motherAlive != null && !!(c.parents && c.parents.mother && c.parents.mother.alive) !== req.motherAlive) return false;
    if (req.makerAlive != null && !!(c.parents && c.parents.maker && c.parents.maker.alive) !== req.makerAlive) return false;
    if (req.form !== undefined) {
      if (req.form === "none" ? c.form : req.form === "any" ? !c.form : c.form !== req.form) return false;
    }
    return true;
  }

  // Human-readable reason why a requirement is not met (for locked choices).
  function unmetReason(c, req, data) {
    if (!req) return "";
    if (req.any) {
      const parts = req.any.map((r) => unmetReason(c, r, data).replace(/^Cần /, "")).filter(Boolean);
      return parts.length ? "Cần " + parts.join(" hoặc ") : "";
    }
    const out = [];
    for (const k of STAT_KEYS) if (req[k] != null && c.stats[k] < req[k]) out.push(`${STAT_LABEL[k]} ${req[k]}`);
    for (const k of BAR_KEYS) if (req[k] != null && c.bars[k] < req[k]) out.push(`${STAT_LABEL[k]} ${req[k]}`);
    if (req.fame != null && c.fame < req.fame) out.push(`Danh vọng ${req.fame}`);
    if (req.flags && !req.flags.every((f) => c.flags.includes(f))) out.push(req.flagHint || "một dấu ấn trong quá khứ");
    if (req.anyFlags && !req.anyFlags.some((f) => c.flags.includes(f))) out.push(req.flagHint || "xuất thân phù hợp");
    if (req.notFlags && req.notFlags.some((f) => c.flags.includes(f))) out.push("quá khứ của bạn không cho phép");
    return out.length ? "Cần " + out.join(", ") : "";
  }

  function eligible(e, c, stageId, data) {
    if (e.races && e.races.length && !e.races.includes(c.race.id)) return false;
    if (e.excludeRaces && e.excludeRaces.includes(c.race.id)) return false;
    if (e.tags && e.tags.length && !(c.race.tags || []).some((t) => e.tags.includes(t))) return false;
    if (e.stages && e.stages.length && !e.stages.includes(stageId)) return false;
    if (e.eras && e.eras.length && !(c.era && e.eras.includes(c.era.id))) return false;
    if (e.minAge != null && c.age < e.minAge) return false;
    if (e.maxAge != null && c.age > e.maxAge) return false;
    if (e.once !== false && c.used.includes(e.id)) return false;
    if (e.focus && !(c.focus && e.focus.includes(c.focus))) return false;
    return meets(c, e.require, data);
  }

  // ---------- jobs, organisations, party, family ----------
  function jobsFor(c, data) {
    return (data.jobs || []).filter(
      (j) =>
        (!j.races || j.races.includes(c.race.id)) &&
        (!j.tags || (c.race.tags || []).some((t) => j.tags.includes(t))) &&
        (!j.excludeRaces || !j.excludeRaces.includes(c.race.id))
    );
  }
  function canTakeJob(c, j, data) {
    return meets(c, j.require, data) || (j.alt && meets(c, j.alt, data));
  }

  function takeJob(c, data, id, rng) {
    const j = (data.jobs || []).find((x) => x.id === id);
    if (!j) return;
    if (c.job) c.pastJobs.push(c.job);
    c.job = { id, rank: 0, xp: 0, since: c.age };
    if (c.focus !== "adventure" || !j.combat) c.focus = "work";
  }

  function joinGuild(c, data) {
    const o = orgFor(c, data);
    if (!o) return;
    c.guild = { org: o.id, rank: 0, pts: 0, since: c.age };
    if (o.join && o.join.length) pushLog(c, "milestone", fmt(pick(Math.random, o.join), c, null, data));
    addMoment(c, o.joinMoment || `Gia nhập ${o.name}`, data);
  }

  function setOrgRank(c, data, idx) {
    const o = orgDef(c, data);
    idx = clamp(idx, 0, o.ranks.length - 1);
    if (idx === c.guild.rank) return;
    const up = idx > c.guild.rank;
    c.guild.rank = idx;
    if (o.points && o.points[idx] != null) c.guild.pts = Math.max(c.guild.pts, o.points[idx]);
    if (up) {
      c.fame = clamp(c.fame + 4 + idx * 2, 0, 100);
      const text = (o.rankUp && (o.rankUp[idx] || o.rankUp.default)) || `Bạn được thăng lên ${o.ranks[idx]}.`;
      pushLog(c, "milestone", fmt(text, c, null, data));
      addMoment(c, `Trở thành ${o.rankLabel ? o.rankLabel + " " : ""}${o.ranks[idx]}`, data);
    }
  }

  function addGuildPoints(c, data, pts) {
    const o = orgDef(c, data);
    c.guild.pts += pts;
    while (c.guild.rank < o.ranks.length - 1 && o.points[c.guild.rank + 1] != null && c.guild.pts >= o.points[c.guild.rank + 1]) {
      setOrgRank(c, data, c.guild.rank + 1);
    }
  }

  function makeCompanion(c, data, rng) {
    const traits = data.systems.traits;
    const custom = sys(c, data, "companions");
    let raceName, raceId, jobName, stat, jobId;
    if (custom && custom.length) {
      const t = weightedPick(custom, rng);
      raceName = t.race;
      raceId = t.names || c.race.id;
      jobName = t.job;
      stat = t.stat;
      jobId = t.id || "companion";
    } else {
      const ids = data.systems.companionRaces.filter((id) => data.races.some((r) => r.id === id));
      raceId = rng() < 0.45 && ids.includes(c.race.id) ? c.race.id : pick(rng, ids);
      raceName = data.races.find((r) => r.id === raceId).name;
      const job = pick(rng, (data.jobs || []).filter((j) => j.combat && j.tags));
      jobName = job.name;
      stat = job.stat;
      jobId = job.id;
    }
    const race = data.races.find((r) => r.id === raceId);
    const gender = race && race.genderless ? null : rng() < 0.5 ? "male" : "female";
    const trait = pick(rng, Object.keys(traits));
    const rank = c.guild ? c.guild.rank : 0;
    return {
      name: randomName(data, rng, raceId, gender).split(" ")[0],
      race: raceName,
      gender,
      job: jobId,
      jobName,
      stat,
      power: clamp(randInt(rng, 2, 6) + rank + (trait === "brave" ? 1 : 0), 1, 15),
      trait,
      bond: randInt(rng, 25, 45),
      alive: true,
      since: c.age,
    };
  }

  function makePartner(c, data, rng) {
    const g = c.gender === "male" ? "female" : c.gender === "female" ? "male" : null;
    return { name: randomName(data, rng, c.race.id, g).split(" ")[0], race: c.race.name };
  }

  function addChild(c, data, rng) {
    const g = rng() < 0.5 ? "male" : "female";
    const name = randomName(data, rng, c.race.id, g).split(" ")[0];
    c.children.push({ name, born: c.age });
    if (c.ctx) c.ctx.child = name;
    addMoment(c, `Đứa con ${name} chào đời`, data);
    return name;
  }

  function evolve(c, data, name) {
    const forms = (c.race.forms || {});
    const key = Object.keys(forms).find((k) => k.toLowerCase() === String(name).toLowerCase()) || name;
    const f = forms[key] || {};
    c.form = f.name || key;
    if (c.maxAge != null && f.life) c.maxAge += f.life;
    addMoment(c, `Tiến hóa thành ${c.form}`, data);
  }

  function killAlly(c, data, m, rng) {
    if (!m || !m.alive) return;
    m.alive = false;
    m.diedAt = c.age;
    c.bars.joy = clamp(c.bars.joy - 15 - Math.round(m.bond / 5), 0, 100);
    pushLog(c, "loss", fmt(pick(rng, sys(c, data, "allyDie")), c, { ally: m.name }, data));
    addMoment(c, `Mất đi ${m.name}`, data);
  }

  // Bonus a party gives to a check: everyone helps a little, those whose craft fits help a lot.
  function partyBonus(c, check) {
    if (!c.quest && !check.party) return 0;
    let b = 0;
    for (const m of aliveParty(c)) {
      const fit = m.stat === check.stat ? 0.015 : 0.005;
      b += m.power * fit * (m.hurt ? 0.5 : 1) * (0.7 + m.bond / 200);
    }
    return Math.min(0.25, b);
  }

  // Stats (about 1–15) move the odds 8% per point; bars and fame (0–100) about 1.5% per point.
  function successChance(c, check) {
    const v = statValue(c, check.stat);
    const slope = STAT_KEYS.includes(check.stat) ? 0.08 : 0.015;
    const base = 0.5 + (v - check.target) * slope + (c.stats.LUCK - 5) * 0.02;
    return clamp(base + partyBonus(c, check), 0.05, 0.95);
  }

  // ---------- focus (what you spend your years on) ----------
  function focusOptions(c, data) {
    const st = currentStage(c).id;
    const isLast = stageIndex(c) === stagesOf(c.race).length - 1;
    return (data.focus || [])
      .map((f) => focusDef(c, data, f.id))
      .filter((f) => {
        if (f.hidden) return false;
        if (f.stages && !f.stages.includes(st) && !(isLast && f.stages.includes("elder"))) return false;
        if (f.tags && !(c.race.tags || []).some((t) => f.tags.includes(t))) return false;
        if (f.id === "adventure" && !c.guild && !orgFor(c, data)) return false;
        if (f.id === "work" && !c.job && !["child", "teen"].includes(st) && !jobsFor(c, data).length) return false;
        return true;
      });
  }

  function setFocus(c, data, id) {
    const f = focusOptions(c, data).find((x) => x.id === id);
    if (!f || c.pending) return false;
    c.focus = id;
    if (id === "adventure" && !c.guild) joinGuild(c, data);
    return true;
  }

  // Yearly drift from what you focus on: stat gains (diminishing) and bar changes.
  function liveFocus(c, data, rng, years, quiet) {
    const per = (years / yearScale(c.race)) * lifePace(c.race);
    const f = c.focus ? focusDef(c, data, c.focus) : null;
    const gains = Object.assign({}, f ? f.gains : {});
    const bars = Object.assign({}, f ? f.bars : {});
    const j = jobDef(c, data);
    if (c.focus === "work" && j) {
      for (const k of Object.keys(j.gains || {})) gains[k] = (gains[k] || 0) + j.gains[k];
      c.job.xp += per * (0.8 + statValue(c, j.stat) / 25);
      bars.wealth = (bars.wealth || 0) + j.income[c.job.rank];
    }
    for (const k of Object.keys(gains)) {
      const cur = c.stats[k];
      const chance = gains[k] * per * (c.race.mult[k] || 1) * Math.max(0.12, 1 - cur / 22);
      let n = Math.floor(chance);
      if (rng() < chance - n) n++;
      if (n > 0) {
        c.stats[k] = clamp(cur + n, 0, 99);
        quiet.gains[k] = (quiet.gains[k] || 0) + n;
      }
    }
    for (const k of Object.keys(bars)) c.bars[k] = clamp(c.bars[k] + bars[k] * Math.min(per, 6), 0, 100);
    // Married life warms the heart; living costs money once grown.
    if (c.spouse) c.bars.joy = clamp(c.bars.joy + Math.min(per, 4), 0, 100);
    if (["adult", "middle", "elder"].includes(currentStage(c).id) && c.focus !== "work") c.bars.wealth = clamp(c.bars.wealth - Math.min(per, 6), 0, 100);
  }

  // ---------- death ----------
  function die(c, data, causeText, kind) {
    c.alive = false;
    c.pending = null;
    c.quest = null;
    c.causeKind = kind || "event";
    let t = fmt(causeText, c, null, data).trim();
    if (t && !/[.!?…]$/.test(t)) t += ".";
    c.cause = t;
    pushLog(c, "death", c.cause);
  }

  function pickDeath(c, data, rng, kind) {
    const st = currentStage(c).id;
    const pool = data.deaths.filter(
      (d) =>
        d.kind === kind &&
        (!d.races || !d.races.length || d.races.includes(c.race.id)) &&
        (!d.stages || !d.stages.length || d.stages.includes(st))
    );
    const specific = pool.filter((d) => d.races && d.races.length);
    const d = weightedPick(specific.length && rng() < 0.7 ? specific : pool, rng);
    return d ? d.text : "Bạn qua đời.";
  }

  function checkDeath(c, data, rng, years) {
    if (!c.alive) return;
    if (c.bars.health <= 0) return die(c, data, pickDeath(c, data, rng, "health"), "health");
    if (c.maxAge != null && c.age >= c.maxAge) return die(c, data, pickDeath(c, data, rng, "old"), "old");
    if (!years) return;
    const j = jobDef(c, data);
    let h = (c.race.hazard || 0) * (c.era ? c.era.hazard : 1);
    if (c.focus === "work" && j && j.hazard) h *= j.hazard;
    if (c.focus === "adventure") h *= 1.4;
    if (c.focus === "rest") h *= 0.7;
    const luckGuard = clamp(1 - (c.stats.LUCK - 5) * 0.04, 0.4, 1.4);
    const p = 1 - Math.pow(1 - h * luckGuard, years);
    if (rng() < p) die(c, data, pickDeath(c, data, rng, "violent"), "violent");
  }

  // ---------- system scenes (built by the engine, worded in data/systems.json) ----------
  function scene(c, kind, text, choices, extra, data) {
    if (data) choices = choices.map((ch) => (/\{\w+\}/.test(ch.label) ? Object.assign({}, ch, { label: fmt(ch.label, c, null, data) }) : ch));
    c.pending = Object.assign({ kind, text, choices }, extra || {});
    pushLog(c, "choice", text);
  }

  function crossroads(c, data) {
    const opts = focusOptions(c, data);
    if (opts.length < 2) {
      c.focus = opts[0] ? opts[0].id : null;
      return false;
    }
    const cr = sys(c, data, "crossroads");
    const text = fmt(cr[currentStage(c).id] || cr.default || data.systems.crossroads.default, c, null, data);
    scene(
      c,
      "crossroads",
      text,
      opts.map((f) => ({ label: f.name, hint: f.desc, act: { type: "focus", id: f.id } }))
    );
    return true;
  }

  function jobScene(c, data, rng) {
    const s = sys(c, data, "jobSelect");
    const choices = jobsFor(c, data).map((j) => {
      const ok = canTakeJob(c, j, data);
      return {
        label: j.name,
        hint: j.desc,
        disabled: !ok,
        reason: ok ? "" : unmetReason(c, j.require, data) + (j.alt && j.alt.hint ? ` (hoặc ${j.alt.hint})` : ""),
        text: j.start,
        act: { type: "job", id: j.id },
        moment: `Trở thành ${j.name}`,
      };
    });
    choices.push({ label: s.later, text: s.laterText, act: { type: "jobLater" } });
    const st = currentStage(c).id;
    scene(c, "job", fmt(pick(rng, ["infant", "child", "teen"].includes(st) ? s.teen : s.adult), c, null, data), choices);
  }

  function promotionScene(c, data, rng) {
    const j = jobDef(c, data);
    const r = c.job.rank;
    const s = sys(c, data, "promotion");
    const next = rankNames(c, j)[r + 1];
    scene(c, "promotion", fmt(j.promo[r], c, { next }, data), [
      {
        label: s.try,
        check: { stat: (j.promoStat && j.promoStat[r]) || j.stat, target: j.promoTarget[r] },
        success: { text: fmt(s.success, c, { next }, data), act: { type: "promote" }, moment: `Trở thành ${next}` },
        fail: { text: fmt(pick(rng, s.fail), c, null, data), effects: { joy: -8 }, act: { type: "promoteFail" } },
      },
      { label: s.wait, text: fmt(s.waitText, c, null, data), act: { type: "promoteWait" } },
    ]);
  }

  function recruitScene(c, data, rng) {
    const s = sys(c, data, "recruit");
    const traits = data.systems.traits;
    const cands = [makeCompanion(c, data, rng), makeCompanion(c, data, rng)];
    const choices = cands.map((m) => ({
      label: `${m.name} — ${m.race}, ${m.jobName}`,
      hint: `Sức chiến đấu ${m.power} · ${traits[m.trait].name}: ${traits[m.trait].desc}`,
      text: fmt(pick(rng, s.join), c, { ally: m.name }, data),
      act: { type: "recruit", member: m },
      moment: `Kết nạp ${m.name} vào ${sys(c, data, "bandName") || "tổ đội"}`,
    }));
    choices.push({ label: s.decline, text: fmt(s.declineText, c, null, data) });
    scene(c, "recruit", fmt(pick(rng, s.text), c, null, data), choices);
  }

  function questPool(c, data) {
    return (data.quests || []).filter(
      (q) =>
        (q.org || "guild") === c.guild.org &&
        (q.repeat ? !(c.questLast[q.id] != null && c.age - c.questLast[q.id] < (3 * yearScale(c.race)) / lifePace(c.race)) : !c.used.includes("quest:" + q.id)) &&
        (q.minRank || 0) <= c.guild.rank &&
        (q.maxRank == null || q.maxRank >= c.guild.rank) &&
        (!q.eras || (c.era && q.eras.includes(c.era.id))) &&
        meets(c, q.require, data)
    );
  }

  function boardScene(c, data, rng) {
    const o = orgDef(c, data);
    const s = (o && o.board) || data.systems.board;
    const pool = questPool(c, data).slice();
    const offered = [];
    // Story quests first when available, then fill with smaller jobs.
    const story = pool.filter((q) => !q.repeat);
    if (story.length) offered.push(weightedPick(story, rng));
    while (offered.length < 3) {
      const rest = pool.filter((q) => !offered.includes(q));
      if (!rest.length) break;
      offered.push(weightedPick(rest, rng));
    }
    if (!offered.length) return false;
    const choices = offered.map((q) => ({
      label: `${q.name} · ${o.rankLabel ? o.rankLabel + " " : ""}${o.ranks[q.minRank || 0]}`,
      hint: q.hint,
      act: { type: "quest", id: q.id },
    }));
    choices.push({ label: s.skip, text: fmt(s.skipText, c, null, data) });
    scene(c, "board", fmt(pick(rng, s.text), c, null, data), choices);
    return true;
  }

  // Difficulty of repeatable jobs grows with your rank.
  function questTarget(c, q, check) {
    const scale = STAT_KEYS.includes(check.stat) ? 1.5 : 6;
    return q.repeat ? check.target + c.guild.rank * scale : check.target;
  }

  function questStepScene(c, data, rng) {
    const q = (data.quests || []).find((x) => x.id === c.quest.id);
    const step = q.steps[c.quest.step];
    const party = aliveParty(c);
    c.ctx = Object.assign(c.ctx || {}, { quest: q, ally: party.length ? pick(rng, party) : null });
    // A scene with no choice simply happens, then the story moves on.
    if (step.auto) {
      if (step.text) pushLog(c, "quest", fmt(step.text, c, null, data));
      if (step.auto.text) pushLog(c, "result", fmt(step.auto.text, c, null, data));
      applyEffects(c, step.auto.effects, data, rng);
      return questAdvance(c, data, rng, step.auto, true, null);
    }
    const choices = step.choices
      .filter((ch) => !ch.require || meets(c, ch.require, data) || ch.showLocked)
      .map((ch) => {
        const out = Object.assign({}, ch);
        if (ch.require && !meets(c, ch.require, data)) {
          out.disabled = true;
          out.reason = unmetReason(c, ch.require, data);
        }
        if (ch.check) out.check = { stat: ch.check.stat, target: questTarget(c, q, ch.check) };
        out.act = { type: "questStep" };
        return out;
      });
    if (!choices.some((ch) => !ch.disabled)) return finishQuest(c, data, rng, false);
    scene(c, "quest", fmt(step.text, c, null, data), choices, { quest: q.name }, data);
  }

  // Move a quest on after a scene: explicit jump, instant win or loss, or the next scene.
  function questAdvance(c, data, rng, outcome, succeeded, ch) {
    if (!c.alive || !c.quest) return;
    const q = data.quests.find((x) => x.id === c.quest.id);
    const last = c.quest.step + 1 >= q.steps.length;
    if (outcome.end === "fail") return finishQuest(c, data, rng, false);
    if (outcome.end === "win") return finishQuest(c, data, rng, true);
    if (outcome.next != null) {
      c.quest.step = outcome.next;
      return questStepScene(c, data, rng);
    }
    // Failing the final scene fails the quest unless that outcome says otherwise.
    if (last) return finishQuest(c, data, rng, !(ch && ch.check && !succeeded));
    c.quest.step++;
    questStepScene(c, data, rng);
  }

  function romanceScene(c, data, rng) {
    const s = sys(c, data, "romance");
    const close = aliveParty(c).filter((m) => m.bond >= 55);
    let partner;
    let text;
    if (close.length) {
      partner = pick(rng, close);
      text = pick(rng, s.ally);
    } else {
      partner = makePartner(c, data, rng);
      text = pick(rng, s.stranger);
    }
    c.ctx = { partner };
    const bonus = partner.bond ? Math.round((partner.bond - 50) / 10) : 0;
    scene(c, "romance", fmt(text, c, null, data), [
      {
        label: s.confess,
        check: { stat: "LUCK", target: 5 - bonus },
        success: { text: fmt(pick(rng, s.yes), c, null, data), act: { type: "marry", partner }, effects: { joy: 20 }, moment: `Kết duyên cùng ${partner.name}` },
        fail: { text: fmt(pick(rng, s.no), c, null, data), effects: { joy: -10 } },
      },
      { label: s.pass, text: fmt(s.passText, c, null, data) },
    ]);
  }

  // Things that must happen when their time comes, before random events get a say.
  // Short-lived races live more per year: a Goblin year counts about three times.
  function lifePace(race) {
    return Math.max(1, Math.min(3, Math.round(19 / adultStart(race))));
  }

  function scheduled(c, data, rng, years) {
    const st = currentStage(c).id;
    const per = (years / yearScale(c.race)) * lifePace(c.race);
    const jobs = jobsFor(c, data);
    const st0 = stagesOf(c.race);
    const i = stageIndex(c);

    // Choosing a trade: late teens (apprenticeship) or any time as an adult without one.
    const teenLate = st === "teen" && st0[i + 1] && c.age >= st0[i].start + (st0[i + 1].start - st0[i].start) * 0.5;
    // some races take a role much earlier in life (systems.race[id].jobFrom = first stage)
    const jobFrom = sys(c, data, "jobFrom");
    const fromIdx = jobFrom ? st0.findIndex((s) => s.id === jobFrom) : -1;
    const jobAge = fromIdx >= 0 ? i >= fromIdx && st !== "elder" : teenLate || ["adult", "middle"].includes(st);
    if (jobs.length && !c.job && jobAge && c.age >= c.nextJobOffer) {
      jobScene(c, data, rng);
      return true;
    }
    const j = jobDef(c, data);
    if (j && c.job.rank < j.ranks.length - 1 && c.job.xp >= j.promoXp[c.job.rank]) {
      promotionScene(c, data, rng);
      return true;
    }
    // raids and companions start from the teens, or from systems.race[id].activeFrom
    const activeFrom = st0.findIndex((s) => s.id === (sys(c, data, "activeFrom") || "teen"));
    const active = activeFrom >= 0 ? i >= activeFrom : !["infant", "child"].includes(st);
    if (c.guild && aliveParty(c).length < MAX_PARTY && ["adventure", "social"].includes(c.focus) && active) {
      const p = aliveParty(c).length === 0 ? 0.5 : 0.15;
      if (rng() < Math.min(0.9, p * Math.min(per, 2))) {
        recruitScene(c, data, rng);
        return true;
      }
    }
    if (c.focus === "adventure" && c.guild && active && rng() < Math.min(0.85, 0.4 * Math.min(per, 2))) {
      if (boardScene(c, data, rng)) return true;
    }
    if (sys(c, data, "romance") && !c.spouse && c.gender && ["adult", "middle"].includes(st) && rng() < (c.focus === "social" ? 0.25 : 0.04) * Math.min(per, 2)) {
      romanceScene(c, data, rng);
      return true;
    }
    const childStages = sys(c, data, "childStages") || ["adult", "middle"];
    const childRate = sys(c, data, "childRate") || 0.12;
    const maxChildren = sys(c, data, "maxChildren") || 5;
    if (sys(c, data, "autoChildren") !== false && c.spouse && childStages.includes(st) && c.children.length < maxChildren && rng() < childRate * Math.min(per, 3)) {
      c.ctx = {};
      addChild(c, data, rng);
      pushLog(c, "milestone", fmt(pick(rng, sys(c, data, "child")), c, null, data));
      c.bars.joy = clamp(c.bars.joy + 12, 0, 100);
      c.ctx = null;
      return "logged";
    }
    return false;
  }

  // ---------- random events ----------
  function resolveEvent(c, data, e, rng) {
    c.used.push(e.id);
    const party = aliveParty(c);
    const fits = e.require && e.require.allyTrait ? party.filter((m) => m.trait === e.require.allyTrait) : party;
    c.ctx = { ally: fits.length ? pick(rng, fits) : null };
    // Events about winning a mate name the one being courted.
    if (!c.spouse && /\{spouse\}/.test(e.text)) c.ctx.partner = makePartner(c, data, rng);
    if (e.choices && e.choices.length) {
      const open = e.choices
        .filter((ch) => meets(c, ch.require, data) || ch.showLocked)
        .map((ch) => (meets(c, ch.require, data) ? ch : Object.assign({}, ch, { disabled: true, reason: unmetReason(c, ch.require, data) })));
      if (open.filter((ch) => !ch.disabled).length >= 1 && open.length >= 2) {
        scene(c, "event", fmt(e.text, c, null, data), open, null, data);
        return;
      }
    }
    pushLog(c, "event", fmt(e.text, c, null, data));
    if (e.result) pushLog(c, "result", fmt(e.result, c, null, data));
    applyEffects(c, e.effects, data, rng);
    if (e.moment) addMoment(c, e.moment, data);
    if (e.death) die(c, data, e.death);
    c.ctx = null;
  }

  function pickEvent(c, data, rng, stageId) {
    const all = data.events.filter((e) => eligible(e, c, stageId, data));
    const focused = all.filter((e) => e.focus);
    const general = all.filter((e) => !e.focus);
    // Race-made events (from a pack) are favoured over the old generic pool.
    const pool = focused.length && (rng() < 0.6 || !general.length) ? focused : general;
    return weightedPick(pool, rng, (e) => (e.weight == null ? 1 : e.weight) * (e.pack ? 3 : 1));
  }

  function quietText(c, data, rng, stageId) {
    const f = c.focus ? focusDef(c, data, c.focus) : null;
    const j = jobDef(c, data);
    let list = null;
    if (c.focus === "work" && j && j.quiet && ["teen", "adult", "middle", "elder", "ancient"].includes(stageId)) list = j.quiet;
    else if (f && f.quiet) list = f.quiet[stageId] || f.quiet.default;
    if (!list || !list.length) {
      const pool = data.fillers.filter((x) => (!x.stages || x.stages.includes(stageId)) && (!x.races || x.races.includes(c.race.id)));
      const x = weightedPick(pool, rng);
      return x ? x.text : "Thời gian lặng lẽ trôi qua.";
    }
    return pick(rng, list);
  }

  function gainsText(g) {
    const parts = Object.keys(g).filter((k) => g[k]).map((k) => `${STAT_LABEL[k]} +${g[k]}`);
    return parts.length ? parts.join(" · ") : "";
  }

  // ---------- the main loop ----------
  function advance(c, data, rng) {
    rng = rng || Math.random;
    if (!c.alive || c.pending) return c;
    c.clicks++;
    if (c.quest) {
      questStepScene(c, data, rng);
      return c;
    }
    let shown = 0;
    let quiet = { from: c.age, to: c.age, ticks: 0, gains: {} };
    // Fold the quiet years so far into one line, placed before anything logged after `mark`.
    const flushQuiet = (mark) => {
      const later = mark == null ? [] : c.log.splice(mark);
      if (quiet.ticks > 0) {
        const now = c.age;
        c.age = quiet.to;
        const entry = pushLog(c, "quiet", fmt(quietText(c, data, rng, currentStage(c).id), c, null, data), quiet.from + 1);
        c.age = now;
        const g = gainsText(quiet.gains);
        if (g) entry.gains = g;
        shown++;
      }
      for (const e of later) c.log.push(e);
      quiet = { from: c.age, to: c.age, ticks: 0, gains: {} };
    };

    for (let t = 0; t < MAX_TICKS_PER_CLICK; t++) {
      const mark = c.log.length;
      const years = tickYears(c);
      c.age += years;

      if (c.era && c.age >= c.eraUntil) {
        const others = data.eras.filter((x) => x.id !== c.era.id);
        c.era = weightedPick(others, rng);
        c.eraUntil = c.age + randInt(rng, 30, 120) * Math.max(1, yearScale(c.race) / 2);
        pushLog(c, "era", c.era.change);
      }
      if (c.era) applyEffects(c, c.era.perTurn);

      // aging: recovery while young, decline near the end of a mortal life
      if (c.maxAge != null && c.age > c.maxAge * 0.75) c.bars.health = clamp(c.bars.health - randInt(rng, 1, 4) * Math.min(years, 5), 0, 100);
      else c.bars.health = clamp(c.bars.health + 3, 0, 100);

      liveFocus(c, data, rng, years, quiet);
      parentsTick(c, data, rng);
      checkDeath(c, data, rng, years);

      let stop = !c.alive;
      if (!stop) {
        // A new stage of life is a natural place to stop and choose a direction.
        const stageId = currentStage(c).id;
        if (stageId !== c.stageId) {
          c.stageId = stageId;
          const s = sys(c, data, "stageEnter");
          pushLog(c, "stage", fmt(s[stageId] || s.default || data.systems.stageEnter.default, c, null, data));
          stop = crossroads(c, data);
        } else {
          const sch = scheduled(c, data, rng, years);
          if (sch === true) stop = true;
          else if (!sch) {
            let density = STAGE_DENSITY[stageId] != null ? STAGE_DENSITY[stageId] : 0.5;
            if (c.focus === "adventure" || c.focus === "social") density += 0.1;
            if (c.focus === "rest") density -= 0.15;
            // Short-lived races pack more life into each year (a Goblin year is worth ~3 human ones).
            const rolls = lifePace(c.race);
            for (let r = 0; r < rolls && !c.pending && c.alive; r++) {
              if (rng() < density) {
                const e = pickEvent(c, data, rng, stageId);
                if (e) resolveEvent(c, data, e, rng);
              }
            }
          }
        }
      }

      const produced = c.log.length - mark;
      if (produced > 0) {
        flushQuiet(mark);
        shown += produced;
      } else {
        quiet.ticks++;
        quiet.to = c.age;
      }
      if (stop || c.pending || !c.alive) break;
      if (shown >= MAX_EVENTS_PER_CLICK || (shown >= 2 && produced > 0 && rng() < 0.5)) break;
    }
    if (c.alive && !c.pending) flushQuiet();
    if (!c.pending) checkDeath(c, data, rng, 0);
    return c;
  }

  // ---------- choosing ----------
  function runAct(c, data, act, rng) {
    if (!act) return;
    switch (act.type) {
      case "focus":
        setFocus(c, data, act.id);
        break;
      case "job":
        takeJob(c, data, act.id, rng);
        break;
      case "jobLater":
        c.nextJobOffer = c.age + tickYears(c) * 3;
        break;
      case "promote": {
        c.job.rank++;
        c.job.xp = 0;
        c.fame = clamp(c.fame + 3 + c.job.rank * 2, 0, 100);
        break;
      }
      case "promoteFail":
        c.job.xp = (jobDef(c, data).promoXp[c.job.rank] || 3) * 0.5;
        break;
      case "promoteWait":
        c.job.xp = (jobDef(c, data).promoXp[c.job.rank] || 3) * 0.7;
        break;
      case "recruit":
        c.party.push(act.member);
        break;
      case "quest": {
        const q = data.quests.find((x) => x.id === act.id);
        c.used.push("quest:" + q.id);
        c.questLast[q.id] = c.age;
        c.quest = { id: q.id, step: 0 };
        c.ctx = { quest: q };
        pushLog(c, "quest", fmt(q.intro, c, null, data));
        questStepScene(c, data, rng);
        break;
      }
      case "marry":
        c.spouse = { name: act.partner.name, race: act.partner.race, since: c.age };
        if (act.partner.bond != null) act.partner.spouse = true;
        break;
    }
  }

  function finishQuest(c, data, rng, success) {
    const q = data.quests.find((x) => x.id === c.quest.id);
    c.ctx = Object.assign(c.ctx || {}, { quest: q });
    if (success) {
      const r = Object.assign({}, q.reward || {});
      const scale = q.repeat ? 1 + c.guild.rank * 0.5 : 1;
      const pts = (r.guildPts || 1) + (q.repeat ? 0 : 1);
      delete r.guildPts;
      if (r.wealth > 0) r.wealth = Math.round(r.wealth * scale);
      if (r.joy == null) r.joy = 5;
      r.partyBond = 6;
      pushLog(c, "result", fmt(q.complete, c, null, data));
      applyEffects(c, r, data, rng);
      if (c.guild) addGuildPoints(c, data, pts);
      c.questsDone++;
      if (q.moment) addMoment(c, q.moment, data);
      else if (!q.repeat) addMoment(c, `Hoàn thành "${q.name}"`, data);
    } else {
      const o = orgDef(c, data);
      pushLog(c, "result", fmt(q.failText || (o && o.failText) || data.systems.questFail, c, null, data));
    }
    c.quest = null;
    c.ctx = null;
  }

  function choose(c, data, index, rng) {
    rng = rng || Math.random;
    if (!c.pending) return c;
    const p = c.pending;
    const ch = p.choices[index];
    if (!ch || ch.disabled) return c;
    c.pending = null;
    let outcome = ch;
    let succeeded = true;
    if (ch.check) {
      succeeded = rng() < successChance(c, ch.check);
      outcome = succeeded ? ch.success : ch.fail;
    }
    pushLog(c, "picked", ch.label);
    if (outcome.text) pushLog(c, "result", fmt(outcome.text, c, null, data));

    // A quest scene that goes badly can wound or kill a companion.
    if (p.kind === "quest" && ch.check && !succeeded && c.ctx && c.ctx.ally && !(outcome.effects && (outcome.effects.allyDie || outcome.effects.allyHurt))) {
      const r = rng();
      if (r < 0.06) killAlly(c, data, c.ctx.ally, rng);
      else if (r < 0.3) {
        c.ctx.ally.hurt = true;
        pushLog(c, "result", fmt(pick(rng, sys(c, data, "allyHurt")), c, null, data));
      }
    }

    applyEffects(c, outcome.effects, data, rng);
    runAct(c, data, outcome.act || ch.act, rng);
    const moment = outcome.moment || ch.moment;
    if (moment) addMoment(c, moment, data);

    if (outcome.death) {
      // In a quest a healer may drag you back from the brink.
      const healer = c.quest && aliveParty(c).find((m) => m.job === "cleric");
      if (healer && rng() < 0.4) {
        c.bars.health = 10;
        healer.bond = clamp(healer.bond + 15, 0, 100);
        pushLog(c, "result", fmt(pick(rng, data.systems.saved), c, { ally: healer.name }, data));
        if (c.quest) finishQuest(c, data, rng, false);
      } else die(c, data, outcome.death);
    }

    if (c.alive && p.kind === "quest" && c.quest) questAdvance(c, data, rng, outcome, succeeded, ch);
    if (!c.quest && !c.pending) c.ctx = null;
    checkDeath(c, data, rng, 0);
    return c;
  }

  function summary(c, data, rng) {
    rng = rng || Math.random;
    const totalW = data.races.reduce((s, r) => s + r.weight, 0);
    const pct = Math.round((c.race.weight / totalW) * 1000) / 10;
    const ep = weightedPick(data.epitaphs.filter((e) => !e.races || e.races.includes(c.race.id)), rng);
    const profile = [];
    if (c.form) profile.push(`Tiến hóa: ${c.form}`);
    if (c.job) profile.push(jobTitle(c, data));
    const o = orgDef(c, data);
    if (o) profile.push(`${o.name}: ${orgRankName(c, data)}` + (c.questsDone ? ` · ${c.questsDone} ${o.missionWord || "nhiệm vụ"}` : ""));
    if (c.spouse) profile.push(`Bạn đời: ${c.spouse.name}` + (c.children.length ? ` · ${c.children.length} người con` : ""));
    if (c.party.length) profile.push("Đồng đội: " + c.party.map((m) => m.name + (m.alive ? "" : " †")).join(", "));
    if (c.fame) profile.push(`Danh vọng ${c.fame}`);
    return {
      pct,
      epitaph: ep ? fmt(ep.text, c, { pct, cause: c.cause }, data) : "",
      moments: c.moments.slice(-10),
      profile,
    };
  }

  const api = {
    STAT_KEYS,
    BAR_KEYS,
    STAT_LABEL,
    makeRng,
    weightedPick,
    stagesOf,
    currentStage,
    tickYears,
    yearScale,
    createCharacter,
    advance,
    choose,
    successChance,
    partyBonus,
    focusOptions,
    setFocus,
    jobTitle,
    introLine,
    raceTitle,
    orgDef,
    orgRankName,
    aliveParty,
    summary,
    eligible,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
