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
    const base = c.subtypeName ? `${c.race.name} ${c.subtypeName}` : c.race.name;
    return c.form ? `${base} → ${c.form}` : base;
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
        rival: c.cast && c.cast.rival ? c.cast.rival.name : CAST_WORD.rival,
        mentor: c.cast && c.cast.mentor ? c.cast.mentor.name : CAST_WORD.mentor,
        friend: c.cast && c.cast.friend ? c.cast.friend.name : CAST_WORD.friend,
        party: c.band ? c.band.name : "băng",
        leader: c.band ? (c.band.lead ? "bạn" : c.band.leaderName || "đầu băng") : "đầu băng",
        member: ctx.ally ? ctx.ally.name : c.party.find((m) => m.alive && !m.left) ? c.party.find((m) => m.alive && !m.left).name : "một đồng bọn",
        minion: c.minions && c.minions.length ? c.minions[c.minions.length - 1].name : "đám thuộc hạ",
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
    // some races come in several forms (Beastman: cat, dog, wolf…): pick one first, it decides origins and events
    const subtype = race.subtypes && race.subtypes.length ? weightedPick(race.subtypes, rng) : null;
    const raceOrigins = data.origins.filter((o) => o.races && o.races.includes(race.id) && (!o.subtype || (subtype && o.subtype === subtype.id)));
    const pool = raceOrigins.length ? raceOrigins : data.origins.filter((o) => !o.races || !o.races.length);
    const origin = weightedPick(pool, rng);

    const gender = race.genderless ? null : rng() < 0.5 ? "male" : "female";
    const names = data.names[race.id] || data.names.default;
    const firstList = gender ? names[gender] || names.any : names.any || names.male;
    const first = pick(rng, firstList);
    const family = names.family && names.family.length ? " " + pick(rng, names.family) : "";

    const stats = {};
    for (const k of STAT_KEYS) stats[k] = clamp(Math.round(randInt(rng, 1, 10) * (race.mult[k] || 1)) + ((subtype && subtype.stats && subtype.stats[k]) || 0), 0, 99);

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
      bars: { health: clamp(randInt(rng, 75, 95) + ((subtype && subtype.health) || 0), 1, 100), joy: 50, wealth: 20 },
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
      subtype: subtype ? subtype.id : null,
      subtypeName: subtype ? subtype.name : null,
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
    makeCast(c, data, rng);
    c.minions = [];
    if (CAPTIVE[origin.id]) c.captive = { kind: CAPTIVE[origin.id], since: 0 };
    const st = storyOf(c, data);
    const arc = st && st.arcs && st.arcs[origin.id];
    if (arc && arc.opening) pushLog(c, "story", fmt(arc.opening, c, null, data));
    return c;
  }

  function introLine(c) {
    return `Bạn là ${c.name}, thuộc chủng tộc ${c.race.name}` + (c.subtypeName ? ` ${c.subtypeName}` : "") + (c.race.gloss ? ` — ${c.race.gloss}.` : ".");
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

  // ---------- the story layer: recurring cast, bands, minions ----------
  const CAST_ROLES = ["rival", "mentor", "friend"];
  const CAST_WORD = { rival: "kẻ thù cũ", mentor: "người dẫn dắt", friend: "đồng bọn thân nhất" };
  const storyOf = (c, data) => (data && data.story && data.story[c.race.id]) || null;

  // "Hèn nhát, gầy trơ xương…" → a companion trait the engine knows
  function genderGuess(name, text) {
    if (/cái\b|\bcô\b|cô gái|bà lão|\bbà\b|nữ|\bả\b|chị/i.test(text || "")) return "female";
    return /(a|ine)$/.test(name || "") ? "female" : "male";
  }

  function traitFrom(text) {
    const t = (text || "").toLowerCase();
    if (/hèn|nhát|sợ/.test(t)) return "timid";
    if (/tham|giấu|chôm|trộm|lấp lánh/.test(t)) return "greedy";
    if (/trung thành|tận tụy|bảo vệ/.test(t)) return "loyal";
    if (/lạnh|câm|lầm lì|tàn nhẫn/.test(t)) return "cold";
    if (/cười|vui|hài/.test(t)) return "cheerful";
    return "brave";
  }

  function makeCast(c, data, rng) {
    const st = storyOf(c, data);
    if (!st || !st.cast) return;
    c.cast = {};
    for (const role of CAST_ROLES) {
      const kinds = Object.values(st.cast).filter((k) => k.role === role);
      if (!kinds.length) continue;
      const k = pick(rng, kinds);
      // a name nobody else in this life already carries
      const taken = [c.name.split(" ")[0], ...Object.values(c.cast).map((x) => x.name), ...Object.values(c.parents || {}).map((p) => p && p.name)].filter(Boolean).map((x) => x.split(" ")[0]);
      for (const b of Object.values(st.bands || {})) for (const m of b.members || []) taken.push(m.name);
      let name = randomName(data, rng, c.race.id, null).split(" ")[0];
      for (let i = 0; i < 20 && taken.includes(name); i++) name = randomName(data, rng, c.race.id, null).split(" ")[0];
      c.cast[role] = { role, kind: k.id, name, alive: true, left: false, bond: 0 };
    }
  }

  // ---------- captivity: lives that begin in chains ----------
  // Origins where the character is born a slave, a prisoner or bound by a contract. Until freed, the life
  // cannot roam (no adventuring, no Guild, no free-world scenes), and only fighters' trades are open in an arena.
  const CAPTIVE = {
    bm_bg_arena: "arena", human_bg_gladiator: "arena", dwarf_bg_4: "arena", orc_origin_3: "arena", minota_origin_arena: "arena", troll_origin_arena: "arena",
    goblin_origin_slave: "slave", kobold_bg_slave: "slave", demon_origin_forge: "slave", minota_origin_torture: "slave",
    demon_origin_prisoner: "prison", dwarf_bg_7: "prison", dragon_origin_stolen: "prison",
    imp_origin_summon: "bound", imp_origin_cult: "bound", demon_origin_contract: "bound",
  };
  const CAPTIVE_WORD = { arena: "nô lệ đấu trường", slave: "nô lệ", prison: "bị giam cầm", bound: "bị khế ước trói buộc" };
  const FREE_FOCUS = ["adventure", "social"];
  const FREE_WORLD = /Guild Bình Minh|bảng nhiệm vụ|nhận nhiệm vụ|quán rượu|quán trọ|tửu quán|phiên chợ|khu chợ|mạo hiểm giả hạng|lữ hành|du ngoạn|buổi tuyển chọn|dạ tiệc|vũ hội|học viện|trường học|thuê một căn|mua một căn|dọn ra ở riêng|tổ đội của bạn|hộ tống|đoàn xe|thương đoàn|lên đường|chuyến đi|tiền lương|trừ (?:tiền|lương)|tiền công|chủ xưởng|làm thuê|phường hội|học việc|mời (?:đại )?tư tế|mua sắm|cửa hàng|tiệm/i;
  const FREED = /(?:chém|cắt|tháo|bẻ|đập|giật) (?:đứt |gãy |vỡ |tung )?(?:xiềng|gông|còng|vòng cổ)|thoát thân|phá sập cổng|hệ thống nô lệ|trốn thoát|thoát khỏi|phá (?:tan |nát |vỡ )?(?:xiềng|gông|cũi|lồng|ngục)|chặt đứt (?:xiềng|gông)|chuộc (?:thân|lại tự do)|được thả|trả tự do|giải phóng|vượt ngục|phá ngục|bỏ trốn|tự do/i;
  const NOT_FREED = /không (?:thể|bao giờ|được|kịp|còn)[^.]{0,25}(?:tự do|trốn|thoát)|mất (?:đi )?tự do|bị bắt lại|giấc mơ tự do|khao khát tự do|mơ (?:về|tới) tự do/i;
  const FIGHTER_JOB = /gladiator|đấu sĩ|giác đấu|berserker|fodder|smash|brute|meat shield|scrapper|pit|arena/i;
  const originFlags = (c) => (c.origin.effects && c.origin.effects.flags) || [];
  const designedFor = (e, c) => { const r = e.require || {}; const f = [...(r.flags || []), ...(r.anyFlags || [])]; return f.some((x) => originFlags(c).includes(x)); };
  function captiveJobs(c, data) {
    const jobs = jobsFor(c, data);
    if (!c.captive) return jobs;
    return c.captive.kind === "arena" ? jobs.filter((j) => FIGHTER_JOB.test(`${j.id} ${j.name}`)) : [];
  }
  function setFree(c, data, why) {
    if (!c.captive) return;
    const kind = c.captive.kind;
    c.captive = null;
    c.freedAt = c.age;
    addMoment(c, "Thoát khỏi kiếp " + CAPTIVE_WORD[kind], data);
    if (why) pushLog(c, "story", why);
  }
  // after a scene: did this outcome set the character free?
  function freedomCheck(c, data, eventId, text) {
    if (!c.captive || !eventId) return;
    const e = data.events.find((x) => x.id === eventId);
    if (!e || !e.arc) return;
    const ownLine = /_arc_/.test(e.id) || designedFor(e, c);
    if (ownLine && text && FREED.test(text) && !NOT_FREED.test(text)) setFree(c, data, "Từ ngày đó, không còn sợi xích nào trói buộc bạn.");
  }

  // ---------- telling the group's story: who they are, how long you have walked with them ----------
  const firstSentence = (t) => ((t || "").trim().match(/^[^.!?]*[.!?]?/) || [""])[0].trim().replace(/[.!?]$/, "");
  const lowerFirst = (t) => (t ? t.charAt(0).toLowerCase() + t.slice(1) : t);
  const upperFirst = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : t);
  const cleanEnd = (t) => (t || "").trim().replace(/^["“]|["”]$/g, "").replace(/[.\s"”]+$/, "");
  function groupWord(c, data) {
    if (!c.band) return "";
    return c.band.party ? "tổ đội" : sys(c, data, "bandName") || "băng";
  }
  function groupName(c, data) {
    return c.band ? `${groupWord(c, data)} ${c.band.name}` : "";
  }
  function memberLine(m) {
    const pos = (m.position || "").split("·").map((x) => x.trim()).filter(Boolean);
    const who = [m.race, ...pos].filter(Boolean).join(", ");
    const desc = firstSentence(m.desc);
    return `${m.name} (${who})${desc ? ": " + lowerFirst(desc) : ""}`;
  }
  function bandIntro(c, data, b) {
    let t = `Từ đây bạn là người của ${groupName(c, data)}.`;
    if (b.rule) t += ` Luật của họ chỉ có một: “${upperFirst(cleanEnd(b.rule))}.”`;
    if (b.lair) t += ` Nơi tụ họp: ${upperFirst(cleanEnd(b.lair))}.`;
    pushLog(c, "story", t);
    if (b.members && b.members.length) pushLog(c, "story", "Những gương mặt bạn sẽ đi cùng: " + b.members.map(memberLine).join(" · ") + ".");
  }
  // a short lead-in before a scene of the group, so it does not start out of nowhere
  function groupBridge(c, data, e, rng) {
    if (!c.band || !e.arc || !/_band_band_|_party_party_|_lead_|_recruit_/.test(e.id) || /_join$|_band_band_[a-z]_1$|_lead_1$/.test(e.id)) return;
    const n = Math.round(c.age - (c.band.since || c.age));
    const g = groupName(c, data);
    let t;
    if (/_recruit_/.test(e.id)) t = pick(rng, [`Tin ${g} đang tìm thêm người lan ra khắp nơi.`, `Ghế trống quanh đống lửa của ${g} khiến bạn để mắt tới những kẻ lạ.`, `Bạn đi tìm thêm người cho ${g}.`]);
    else if (n < 1) t = pick(rng, [`Chưa được bao lâu kể từ ngày bạn theo ${g}.`, `Những ngày đầu cùng ${g} chưa kịp quen thì chuyện đã tới.`]);
    else t = pick(rng, [`Đã ${n} năm bạn đi cùng ${g}.`, `Năm thứ ${n} theo ${g}.`, `${upperFirst(String(n))} năm qua, ${g} gần như đã là nhà của bạn.`]);
    if (c.band.lastBridge === c.age) return;
    c.band.lastBridge = c.age;
    pushLog(c, "story", t);
  }

  function joinBand(c, data, id) {
    const st = storyOf(c, data);
    const b = st && st.bands && st.bands[id];
    if (!b) return;
    leaveBand(c, false);
    const leader = b.members.find((m) => /đầu băng|đội trưởng|thủ lĩnh/i.test(m.position)) || b.members[0];
    c.band = { id, name: b.name || b.title, leaderName: leader ? leader.name : null, lead: false, gone: false, since: c.age, party: !!b.party };
    for (const m of b.members) {
      if (m === leader) continue;
      if (aliveParty(c).length >= MAX_PARTY) break;
      c.party.push({ name: m.name, race: m.race, gender: genderGuess(m.name, [m.race, m.position, m.desc, m.secret].join(" ")), job: "band", jobName: m.position,
        stat: "STR", power: 4, trait: traitFrom(m.desc), bond: 30, alive: true, since: c.age, band: id });
    }
    addMoment(c, `Gia nhập ${c.band.party ? "tổ đội" : "băng"} ${c.band.name}`, data);
    bandIntro(c, data, b);
  }

  function leaveBand(c, wiped) {
    if (!c.band) return;
    // members stay in the record of this life; those who are gone no longer walk with you
    for (const m of c.party) if (m.band === c.band.id && m.alive) { m.alive = false; if (wiped) m.died = c.age; else m.left = true; }
    c.formerBands = (c.formerBands || []).concat(c.band.name);
    c.band = null;
  }

  // The person a name in the script points at: a band member, the band leader, or one of the cast.
  function findPerson(c, name) {
    const m = c.party.find((x) => x.name === name);
    if (m) return { kind: "member", m };
    if (c.band && c.band.leaderName === name) return { kind: "leader" };
    return null;
  }

  // "(mồ côi)", "(có băng nhóm)", "({rival} còn sống)", "(có {spouse} và {child})": does the life fit?
  function storyCond(c, data, cond) {
    if (!cond) return true;
    return String(cond).split(/\s+và\s+/).every((partRaw) => {
      const p = partRaw.trim().toLowerCase();
      const parents = ["father", "mother"].map((w) => c.parents && c.parents[w]).filter(Boolean);
      const alive = (w) => !!(c.parents && c.parents[w] && c.parents[w].alive);
      let m;
      if ((m = p.match(/^\{(rival|mentor|friend)\} (còn sống|đã chết)/))) { const x = c.cast && c.cast[m[1]]; return !!x && (m[2] === "còn sống" ? x.alive && !x.left : !x.alive); }
      if ((m = p.match(/^(?:còn )?\{(father|mother)\}(?: còn sống)?$/))) return alive(m[1]);
      if ((m = p.match(/^\{(father|mother)\} đã (chết|mất)/))) return !!(c.parents && c.parents[m[1]] && !c.parents[m[1]].alive && c.parents[m[1]].status !== "unknown");
      if (/^\{spouse\} đã (chết|mất)/.test(p)) return !c.spouse && !!(c.formerSpouses && c.formerSpouses.length);
      if (/^có \{spouse\}|^có bạn đời|^có bạn tình/.test(p)) return !!c.spouse;
      if (/^có \{child\}|^có lứa con|^có con/.test(p)) return c.children.length > 0;
      if (/mồ côi/.test(p)) return parents.length > 0 ? parents.every((x) => !x.alive) : true;
      if (/còn đủ|cha mẹ còn sống/.test(p)) return parents.length >= 2 && parents.every((x) => x.alive);
      if (/còn cha|còn mẹ|cha mẹ còn/.test(p)) return parents.some((x) => x.alive);
      if ((m = p.match(/^có \{(father|mother)\}$/))) return alive(m[1]);
      if ((m = p.match(/^\{(rival|mentor|friend)\} đã mất/))) { const x = c.cast && c.cast[m[1]]; return !!x && !x.alive; }
      if ((m = p.match(/^có \{(rival|mentor|friend)\}$/))) { const x = c.cast && c.cast[m[1]]; return !!x && x.alive && c.used.some((id) => id.includes(`_cast_${x.kind}_`)); }
      if (/đói khổ|nghèo/.test(p)) return c.bars.wealth < 20;
      if (/của ăn của để|giàu/.test(p)) return c.bars.wealth > 50;
      if (/có vai trò|có nghề/.test(p)) return !!c.job;
      if (/chưa có nghề|chưa có vai trò/.test(p)) return !c.job;
      if (/bậc cao/.test(p)) return !!(c.guild && c.guild.rank >= 2);
      if (/có băng|có tổ đội|có đồng bọn/.test(p)) return !!c.band || aliveParty(c).length > 0;
      if (/cô độc/.test(p)) return !c.band && !aliveParty(c).length && !c.spouse;
      if (/thương tật/.test(p)) return c.bars.health < 30;
      if (/tiến hóa/.test(p)) return !!c.form;
      if (/nổi danh/.test(p)) return c.fame > 50;
      if (/có thuộc hạ/.test(p)) return !!(c.minions && c.minions.length);
      return false;
    });
  }

  // a line from the past for a quiet year: memories, recalled choices, the cast, the band
  function memoryLine(c, data, rng) {
    const st = storyOf(c, data);
    if (!st) return null;
    const pool = [];
    for (const mm of st.memories || []) if (storyCond(c, data, mm.cond)) pool.push(mm.text);
    for (const e of c.used.length ? data.events.filter((x) => x.recall && c.used.includes(x.id)) : []) {
      // memories of someone who is gone are told by the "đã mất" lines, not as if they were still here
      const cm = e.id.match(/_cast_(rival|mentor|friend)_/);
      if (cm && c.cast && c.cast[cm[1]] && (!c.cast[cm[1]].alive || c.cast[cm[1]].left)) continue;
      for (const r of e.recall) if (r.flags.some((f) => c.flags.includes(f))) pool.push(r.text);
    }
    if (c.cast)
      for (const role of CAST_ROLES) {
        const x = c.cast[role];
        const k = x && st.cast && st.cast[x.kind];
        if (k && x.alive && !x.left && c.used.some((id) => id.includes(`_cast_${x.kind}_`))) pool.push(...k.recall);
      }
    if (c.band && st.bands && st.bands[c.band.id]) pool.push(...st.bands[c.band.id].recall);
    return pool.length ? pick(rng, pool) : null;
  }

  function chapterLine(c, data, rng, stageId) {
    const st = storyOf(c, data);
    const list = st && st.chapters && st.chapters[stageId];
    if (!list || !list.length) return null;
    const fit = list.filter((x) => storyCond(c, data, x.cond));
    return fit.length ? pick(rng, fit).text : null;
  }

  // The life told back when it ends: where you came from, what you did, how the story closed, how you died.
  function biography(c, data) {
    const st = storyOf(c, data);
    if (!st || !st.bio) return null;
    const out = [];
    const arcKey = c.origin.id.replace(new RegExp(`^${c.race.id}_(origin|bg)_`), "");
    const opens = st.bio.open || {};
    let open = opens[arcKey];
    if (!open && st.bioMap && st.bioMap[arcKey]) { const k = Object.keys(opens).find((x) => x.includes(st.bioMap[arcKey])); if (k) open = opens[k]; }
    if (!open) { const k = Object.keys(opens).find((x) => /mồ côi|cha mẹ còn/.test(x) && storyCond(c, data, x)); if (k) open = opens[k]; }
    if (open) out.push(open);
    const arc = st.arcs && st.arcs[c.origin.id];
    const ending = arc && arc.endings.find((e) => e.flags.some((f) => c.flags.includes(f)));
    if (ending) out.push(ending.text);
    // a line about the people of this life
    const bits = [];
    if (c.band) {
      const b = (st.bands || {})[c.band.id];
      const w = c.band.party ? "tổ đội" : "băng";
      const nm = (b && b.name) || c.band.name;
      if (nm) bits.push(c.band.gone ? `${w} ${nm} giờ chỉ còn là chuyện kể` : c.band.lead ? `${w} ${nm} mất đi người cầm cờ` : `${w} ${nm} còn nhớ tên bạn`);
    }
    if (c.minions && c.minions.length) bits.push(`${c.minions.length} thuộc hạ đứng quanh nấm mồ`);
    const rival = c.cast && c.cast.rival;
    if (rival && !rival.alive) bits.push(`kẻ thù ${rival.name} đã nằm xuống trước bạn`);
    else if (rival && rival.alive) bits.push(`${rival.name} vẫn sống, và sẽ kể về bạn theo cách của hắn`);
    if (bits.length) out.push(bits.join("; ").replace(/^./, (x) => x.toUpperCase()) + ".");
    // the last line follows how the life really ended
    const cause = (c.cause || "").toLowerCase();
    const tags = [];
    const stg = (id) => (stagesOf(c.race).find((x) => x.id === id) || { start: 0 }).start;
    const young = c.age < stg("middle");
    if (c.causeKind === "old") tags.push(c.children.length ? "con cháu" : "cô độc", "già");
    if (/phản bội|sau lưng|đâm lén|anh em|đồng loại|đồng bọn|giành|tranh/.test(cause)) tags.push("phản bội", "đồng loại");
    if (/nhiệm vụ/.test(cause)) tags.push("nhiệm vụ");
    if (/cướp|đột kích|xung phong/.test(cause)) tags.push("cướp phá");
    if (/shaman|thí nghiệm|thuốc|phép|bùa/.test(cause)) tags.push("shaman");
    if (/đói|chết đói/.test(cause)) tags.push("đói");
    if (c.causeKind === "health") tags.push("bệnh");
    if (c.causeKind === "violent" || c.causeKind === "event") {
      if (young) tags.push("tử trận khi còn trẻ");
      if (/mạo hiểm giả|hiệp sĩ|tân thủ|thợ săn|mũi tên/.test(cause)) tags.push("mạo hiểm giả");
    }
    if (c.guild && c.guild.rank >= 5) tags.push("chief", "king");
    if (c.form) tags.push("tiến hóa");
    if (c.fame > 70) tags.push("anh hùng");
    if (c.bars.wealth > 60) tags.push("giàu");
    if (c.bars.wealth < 20) tags.push("nghèo", "đói");
    if (c.age < stg("adult")) tags.push("chết trẻ", "trước khi kịp lớn");
    let end = null;
    for (const t of tags) if ((end = (st.bio.end || []).find((x) => x.cond.toLowerCase().includes(t)))) break;
    if (!ending && !end) end = (st.bio.end || []).find((x) => /dở dang/i.test(x.cond));
    if (end) out.push(end.text);
    return out.map((t) => fmt(t, c, null, data));
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
    // story layer
    if (c.cast) {
      for (const role of [].concat(eff.castDie || [])) if (c.cast[role] && c.cast[role].alive) { c.cast[role].alive = false; c.cast[role].died = c.age; }
      if (eff.castLeave && c.cast[eff.castLeave]) c.cast[eff.castLeave].left = true;
      if (eff.castBond) for (const [role, v] of Object.entries(eff.castBond)) if (c.cast[role]) c.cast[role].bond += v;
      if (eff.castJoin && c.cast[eff.castJoin] && c.cast[eff.castJoin].alive && !c.party.some((m) => m.cast === eff.castJoin) && aliveParty(c).length < MAX_PARTY) {
        const x = c.cast[eff.castJoin];
        c.party.push({ name: x.name, race: c.race.name, job: "cast", jobName: CAST_WORD[eff.castJoin], stat: "STR", power: 5, trait: "loyal", bond: 60, alive: true, since: c.age, cast: eff.castJoin });
      }
    }
    if (eff.joinBand) joinBand(c, data, eff.joinBand);
    if (eff.leaveBand) leaveBand(c, false);
    if (eff.bandGone) leaveBand(c, true);
    if (eff.bandLead && c.band) { c.band.lead = true; c.band.leaderName = c.name; addMoment(c, `Trở thành ${c.race.id === "human" ? "đội trưởng" : "đầu băng"} ${c.band.name}`, data); }
    else if (eff.bandLead || eff.foundBand) {
      // founding one's own party: the closest friend from the old one may follow
      if (c.band) {
        const close = aliveParty(c).filter((m) => m.band === c.band.id && !m.cast).sort((a, b) => b.bond - a.bond)[0];
        leaveBand(c, false);
        if (close && close.bond >= 60) { close.alive = true; close.left = false; }
      }
      c.band = { id: "own", party: true, name: pick(rng, ["Hắc Ưng", "Sao Băng Đỏ", "Ngọn Đuốc Cuối", "Kiếm Gió Đông", "Lam Thạch", "Sói Bạc Tự Do"]), leaderName: c.name, lead: true, gone: false, since: c.age, own: true };
      for (const m of c.party) if (m.alive && !m.left) m.band = "own";
      addMoment(c, `Lập tổ đội ${c.band.name} của riêng mình`, data);
      const with_ = aliveParty(c).map((m) => m.name);
      pushLog(c, "story", `Bạn dựng ngọn cờ của riêng mình: tổ đội ${c.band.name}. ` + (with_.length ? `Bên bạn lúc này có ${with_.join(", ")}.` : "Lúc này mới chỉ có một mình bạn, phải đi tìm thêm người."));
    }
    if (eff.memberJoin && aliveParty(c).length < MAX_PARTY) {
      const st = storyOf(c, data);
      const r = st && st.recruits && st.recruits[eff.memberJoin];
      if (r && !c.party.some((m) => m.name === r.name)) {
        c.party.push({ name: r.name, race: r.race, gender: genderGuess(r.name, r.desc + " " + r.race), job: "band", jobName: r.position, stat: "STR", power: 6, trait: traitFrom(r.desc), bond: 30, alive: true, since: c.age, band: c.band ? c.band.id : null });
        addMoment(c, `${r.name} gia nhập tổ đội`, data);
        let t = `${r.name} (${r.race}, ${r.position}) chính thức theo bạn.`;
        if (r.desc) t += ` Người này ${lowerFirst(cleanEnd(r.desc))}.`;
        if (r.ask) t += ` Điều duy nhất ${r.name} đòi ở ${c.band ? groupName(c, data) : "bạn"}: ${lowerFirst(cleanEnd(r.ask))}.`;
        const now = aliveParty(c).map((m) => m.name);
        if (now.length > 1) t += ` Đội hình giờ có ${now.join(", ")}.`;
        pushLog(c, "story", t);
      }
    }
    for (const name of [].concat(eff.memberDie || [])) {
      const p = findPerson(c, name);
      if (p && p.kind === "member") { p.m.alive = false; p.m.died = c.age; }
      if (p && p.kind === "leader") { c.band.leaderGone = c.band.leaderName; c.band.leaderName = null; }
    }
    for (const name of [].concat(eff.memberLeave || [])) { const p = findPerson(c, name); if (p && p.kind === "member") { p.m.left = true; p.m.alive = false; } }
    if (eff.memberBond) for (const [name, v] of Object.entries(eff.memberBond)) { const p = findPerson(c, name); if (p && p.kind === "member") p.m.bond = clamp(p.m.bond + v, 0, 100); }
    if (eff.minionAdd) {
      const st = storyOf(c, data);
      const d = st && st.minions && st.minions[eff.minionAdd];
      c.minions = c.minions || [];
      if (d && !c.minions.some((x) => x.id === eff.minionAdd)) { c.minions.push({ id: eff.minionAdd, name: d.en || d.name, loyalty: 50, since: c.age }); addMoment(c, `Thu phục thuộc hạ: ${d.en || d.name}`, data); }
    }
    if (eff.minionLose && c.minions && c.minions.length) {
      if (eff.minionLose === true) c.minions.pop();
      else c.minions = c.minions.filter((x) => x.id !== eff.minionLose);
    }
    if (eff.minionRevolt && c.minions) c.minions = c.minions.filter((x) => x.loyalty >= 70);
    if (eff.minionLoyal && c.minions) for (const x of c.minions) x.loyalty = clamp(x.loyalty + eff.minionLoyal, 0, 100);
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
    // "your best stat" / "your trade's main stat"
    if (k === "best") return Math.max(...STAT_KEYS.map((s) => c.stats[s]));
    if (k === "jobstat") return c.job && c.job.stat ? c.stats[c.job.stat] || 0 : Math.max(...STAT_KEYS.map((s) => c.stats[s]));
    if (k in c.bars) return c.bars[k];
    if (k === "fame") return c.fame;
    return 0;
  }

  function meets(c, req, data) {
    if (req && req.subtype && c.subtype !== req.subtype) return false;
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
    if (req.cast && !(c.cast && Object.values(c.cast).some((x) => x.kind === req.cast))) return false;
    if (req.castAlive && !(c.cast && c.cast[req.castAlive] && c.cast[req.castAlive].alive && !c.cast[req.castAlive].left)) return false;
    if (req.origin && c.origin.id !== req.origin) return false;
    if (req.noBand && c.band) return false;
    if (req.bandLead && !(c.band && c.band.lead)) return false;
    if (req.bandLead === false && c.band && c.band.lead) return false;
    if (req.partyMax != null && aliveParty(c).length > req.partyMax) return false;
    if (req.band && !(c.band && c.band.id === req.band)) return false;
    if (req.bandMember && !(c.band && (c.band.leaderName === req.bandMember || c.party.some((m) => m.name === req.bandMember && m.alive && !m.left)))) return false;
    if (req.minionOk && !((c.band && c.band.lead) || (c.guild && c.guild.rank >= 2) || c.form)) return false;
    if (req.minions && !(c.minions && c.minions.length >= req.minions)) return false;
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
    if (!implicitOk(e, c)) return false;
    return meets(c, e.require, data);
  }

  // What a scene takes for granted without saying so in its conditions: a parent who is in the room,
  // a companion at your side, a life that is free to walk into a tavern.
  const REMEMBERS = /mộ|di vật|di ảnh|đã mất|qua đời|đã chết|cái chết|tang lễ|ký ức|kỷ vật|hồn ma|linh hồn|vong hồn|bóng ma|năm xưa|ngày xưa|thuở|nhớ (?:về|lại|tới|đến)|tưởng nhớ|nấm mồ|tro cốt|báo thù cho|trả thù cho|kẻ đã giết|bỏ rơi|bỏ đi|biệt tăm|mất tích|không rõ/i;
  function implicitOk(e, c) {
    const t = e.text || "";
    const r = e.require || {};
    if (t.indexOf("{") >= 0) {
      for (const who of ["father", "mother"]) {
        const key = who + "Alive";
        if (r[key] === undefined && t.includes(`{${who}}`) && !REMEMBERS.test(t)) {
          const p = c.parents && c.parents[who];
          if (p && !p.alive) return false;
        }
      }
      if (t.includes("{ally}") && !r.party && !r.bandLead && !r.band && !aliveParty(c).length) return false;
    }
    // a scene of the group may not lean on someone of that group who is gone
    if (c.band && e.arc && /_band_band_|_party_party_/.test(e.id)) {
      for (const m of c.party) if (m.band === c.band.id && (!m.alive || m.left) && t.includes(m.name)) return false;
      if (c.band.leaderGone && t.includes(c.band.leaderGone)) return false;
    }
    // scenes that may come back (a sign, a trial) come back twice at most
    if (e.once === false && c.used.filter((id) => id === e.id).length >= 2) return false;
    if (c.captive && !/_arc_/.test(e.id)) {
      if (e.focus && e.focus.some((f) => FREE_FOCUS.includes(f))) return false;
      if (FREE_WORLD.test(t)) return false;
      if (/_band_band_[a-z]_1$|_party_party_[a-z]_join$|_lead_|_recruit_/.test(e.id) && !designedFor(e, c)) return false;
    }
    return true;
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
    c.job = { id, rank: 0, xp: 0, since: c.age, stat: (data.jobs.find((x) => x.id === id) || {}).stat };
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

  // a first name nobody in this life already carries
  function freshName(c, data, rng, gender) {
    const taken = new Set([c.name, ...Object.values(c.cast || {}).map((x) => x.name), ...(c.party || []).map((m) => m.name), ...Object.values(c.parents || {}).map((p) => p && p.name),
      ...(c.children || []).map((k) => k.name), c.spouse && c.spouse.name].filter(Boolean).map((x) => String(x).split(" ")[0]));
    const st = storyOf(c, data);
    for (const b of Object.values((st && st.bands) || {})) for (const m of b.members || []) taken.add(m.name);
    let name = randomName(data, rng, c.race.id, gender).split(" ")[0];
    for (let i = 0; i < 20 && taken.has(name); i++) name = randomName(data, rng, c.race.id, gender).split(" ")[0];
    return name;
  }

  function makePartner(c, data, rng) {
    const g = c.gender === "male" ? "female" : c.gender === "female" ? "male" : null;
    return { name: freshName(c, data, rng, g), race: c.race.name };
  }

  function addChild(c, data, rng) {
    const g = rng() < 0.5 ? "male" : "female";
    const name = freshName(c, data, rng, g);
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
    const slope = STAT_KEYS.includes(check.stat) || check.stat === "best" || check.stat === "jobstat" ? 0.08 : 0.015;
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
        if (c.captive && FREE_FOCUS.includes(f.id)) return false;
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
    c.biography = biography(c, data);
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
    const choices = captiveJobs(c, data).map((j) => {
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
    const intro = c.captive
      ? pick(rng, ["Quản đấu trường không nuôi kẻ vô dụng. Bạn phải chọn cách cầm vũ khí để sống sót qua mùa đấu tới.", "Lũ giám thị chia đám nô lệ trẻ theo sức vóc. Đến lượt bạn bị lôi ra giữa sân cát để chọn một lối đánh."])
      : pick(rng, ["infant", "child", "teen"].includes(st) ? s.teen : s.adult);
    scene(c, "job", fmt(intro, c, null, data), choices);
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

  // taking up a trade and rising in it: these come before any story beat
  function careerScene(c, data, rng) {
    const st = currentStage(c).id;
    const jobs = captiveJobs(c, data);
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
    return false;
  }

  function scheduled(c, data, rng, years) {
    const st = currentStage(c).id;
    const per = (years / yearScale(c.race)) * lifePace(c.race);
    const st0 = stagesOf(c.race);
    const i = stageIndex(c);
    if (careerScene(c, data, rng)) return true;
    // raids and companions start from the teens, or from systems.race[id].activeFrom
    const activeFrom = st0.findIndex((s) => s.id === (sys(c, data, "activeFrom") || "teen"));
    const active = activeFrom >= 0 ? i >= activeFrom : !["infant", "child"].includes(st);
    if (c.guild && !sys(c, data, "noRecruit") && aliveParty(c).length < MAX_PARTY && ["adventure", "social"].includes(c.focus) && active) {
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
    groupBridge(c, data, e, rng);
    c.used.push(e.id);
    const party = aliveParty(c);
    const fits = e.require && e.require.allyTrait ? party.filter((m) => m.trait === e.require.allyTrait) : party;
    c.ctx = { ally: fits.length ? pick(rng, fits) : null, eventId: e.id };
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

  // story nodes (arc, cast, band, minion) that can happen now; the oldest thread first
  function storyNode(c, data, rng, stageId) {
    if (!storyOf(c, data)) return null;
    const due = data.events.filter((e) => e.arc && e.races && e.races.includes(c.race.id) && eligible(e, c, stageId, data));
    // the thread of one's own origin is the spine of the life: when it is due it usually comes first
    const own = due.filter((e) => /_arc_/.test(e.id));
    if (own.length && rng() < 0.45) return weightedPick(own, rng, (e) => e.weight || 10);
    return due.length ? weightedPick(due, rng, (e) => e.weight || 10) : null;
  }

  function pickEvent(c, data, rng, stageId) {
    const all = data.events.filter((e) => !e.arc && eligible(e, c, stageId, data));
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

  // Several quiet years told as a stretch of life: how long, what filled the days, who was there, one detail.
  function spanText(c, data, rng, years, memory) {
    const stageId = currentStage(c).id;
    const flavor = quietText(c, data, rng, stageId);
    const n = Math.round(years);
    if (n < 2) return memory || flavor;
    const f = c.focus ? focusDef(c, data, c.focus) : null;
    const j = jobDef(c, data);
    let act = f && f.name ? lowerFirst(f.name) : "những việc thường ngày";
    if (c.focus === "work" && j) act = `công việc ${j.name}`;
    let with_ = "";
    if (c.band && aliveParty(c).length) with_ = ` cùng ${groupName(c, data)}`;
    else if (c.spouse) with_ = ` bên ${c.spouse.name}`;
    const span = n <= 4 ? pick(rng, ["Vài năm sau đó", "Mấy năm tiếp theo"]) : `${n} năm sau đó`;
    const lead = pick(rng, [
      `${span} trôi qua không có biến cố lớn; phần lớn thời gian bạn dành cho ${act}${with_}.`,
      `${span}, ngày nào của bạn cũng xoay quanh ${act}${with_}.`,
      `${span} là chuỗi ngày ${act}${with_}, đều đặn và lặng lẽ.`,
    ]);
    const parts = [lead, flavor];
    if (memory) parts.push(memory);
    else if (n >= 6) { const more = quietText(c, data, rng, stageId); if (more !== flavor) parts.push(more); }
    return parts.map((x) => upperFirst(x.trim()).replace(/([^.!?…”"])$/, "$1.")).join(" ");
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
        const memory = rng() < 0.4 ? memoryLine(c, data, rng) : null;
        const entry = pushLog(c, "quiet", fmt(spanText(c, data, rng, quiet.to - quiet.from, memory), c, null, data), quiet.from + 1);
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
          // no life stays in chains forever: by middle age the chance to walk out comes
          if (c.captive && ["middle", "elder", "ancient"].includes(stageId)) {
            const LINES = {
              arena: ["Một đêm đấu trường bốc cháy sau cuộc nổi loạn của nô lệ. Bạn bước qua cánh cổng sắt đổ sập, lần đầu tiên không có ai cầm roi phía sau.", "Ông chủ đấu trường chết vì nợ nần, đám nô lệ bị bán tháo. Không ai đủ tiền mua một kẻ đã quá tuổi như bạn, và bạn cứ thế bước ra đường."],
              slave: ["Chủ nô bị đánh bại trong một cuộc tranh giành lãnh địa. Trong lúc hỗn loạn, bạn gỡ được chiếc vòng sắt và lẩn vào bóng tối.", "Năm ấy, trại nô lệ tan rã vì dịch bệnh. Những kẻ còn sống, trong đó có bạn, tản đi mỗi người một ngả."],
              prison: ["Ngục tù đổi chủ, sổ sách thất lạc. Một sáng nọ, cánh cửa phòng giam không còn ai khóa lại.", "Sau ngần ấy năm, kẻ giam giữ bạn đã chết. Không ai còn nhớ vì sao bạn bị nhốt, và bạn tự bước ra ngoài."],
              bound: ["Khế ước trói buộc bạn mục dần theo năm tháng rồi đứt hẳn. Lần đầu tiên, bạn có thể đi đâu tùy ý.", "Kẻ nắm khế ước của bạn qua đời. Sợi dây vô hình quấn quanh linh hồn bạn tan biến."],
            };
            setFree(c, data, pick(rng, LINES[c.captive.kind] || LINES.slave));
          }
          const s = sys(c, data, "stageEnter");
          const chapter = chapterLine(c, data, rng, stageId);
          pushLog(c, "stage", fmt(chapter || s[stageId] || s.default || data.systems.stageEnter.default, c, null, data));
          stop = crossroads(c, data);
        } else {
          // a story node whose time has come goes before anything random
          // short lives get a story beat more often, or the threads never meet
          const node = careerScene(c, data, rng) ? null : rng() < (lifePace(c.race) > 1 ? 0.85 : 0.6) ? storyNode(c, data, rng, stageId) : null;
          const sch = c.pending ? true : node ? (resolveEvent(c, data, node, rng), c.pending ? true : "logged") : scheduled(c, data, rng, years);
          if (sch === true) stop = true;
          else if (!sch) {
            let density = STAGE_DENSITY[stageId] != null ? STAGE_DENSITY[stageId] : 0.5;
            if (c.focus === "adventure" || c.focus === "social") density += 0.1;
            if (c.focus === "rest") density -= 0.15;
            // Short-lived races pack more life into each year (a Goblin year is worth ~3 human ones).
            const rolls = lifePace(c.race);
            for (let r = 0; r < rolls && !c.pending && c.alive; r++) {
              if (rng() < density) {
                const e = (r > 0 && rng() < 0.5 && storyNode(c, data, rng, stageId)) || pickEvent(c, data, rng, stageId);
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
    if (c.captive && p.kind === "event") {
      if (outcome.effects && outcome.effects.joinBand) setFree(c, data, "Đi theo nhóm mới, bạn bỏ lại sau lưng xiềng xích cũ.");
      else freedomCheck(c, data, c.ctx && c.ctx.eventId, outcome.text);
    }
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
    if (c.party.length) profile.push("Đồng đội: " + c.party.map((m) => m.name + (m.alive ? "" : m.left ? " (đã rời)" : " †")).join(", "));
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
    CAPTIVE_WORD,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
