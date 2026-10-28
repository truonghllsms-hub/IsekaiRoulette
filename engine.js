// Game engine. Pure logic, no DOM: runs in the browser and in Node (tools/simulate.js).
(function (root) {
  "use strict";

  const STAT_KEYS = ["STR", "INT", "AGI", "LUCK"];
  const BAR_KEYS = ["health", "joy", "wealth"];

  // Default life stages as a share of the race's average lifespan.
  const DEFAULT_STAGES = [
    ["infant", "Sơ sinh", 0],
    ["child", "Thơ ấu", 0.04],
    ["teen", "Thiếu niên", 0.15],
    ["adult", "Trưởng thành", 0.25],
    ["middle", "Trung niên", 0.55],
    ["elder", "Tuổi già", 0.8],
  ];
  const TURNS_PER_STAGE = 10;

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

  // ---------- race helpers ----------
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

  // How many years one click advances: about TURNS_PER_STAGE turns per stage.
  function stepYears(c) {
    const st = stagesOf(c.race);
    const i = stageIndex(c);
    const next = st[i + 1];
    if (next) {
      const len = next.start - st[i].start;
      const step = Math.max(1, Math.round(len / TURNS_PER_STAGE));
      return Math.max(1, Math.min(step, Math.ceil(next.start - c.age)));
    }
    if (c.race.lastStep) return c.race.lastStep;
    return Math.max(1, Math.floor(avgLifespan(c.race) * 0.02));
  }

  // ---------- text ----------
  function fmt(text, c, extra) {
    const vars = Object.assign(
      {
        name: c.name,
        race: c.race.name,
        age: c.age,
        origin: c.origin ? c.origin.name : "",
        stage: currentStage(c).name,
      },
      extra || {}
    );
    return String(text).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  }

  // ---------- character ----------
  function createCharacter(data, rng, raceId) {
    rng = rng || Math.random;
    const race = raceId ? data.races.find((r) => r.id === raceId) : weightedPick(data.races, rng);
    const raceOrigins = data.origins.filter((o) => o.races && o.races.includes(race.id));
    const pool = raceOrigins.length ? raceOrigins : data.origins.filter((o) => !o.races || !o.races.length);
    const origin = weightedPick(pool, rng);

    const names = data.names[race.id] || data.names.default;
    const gender = race.genderless ? null : rng() < 0.5 ? "male" : "female";
    const firstList = gender ? names[gender] || names.any : names.any || names.male;
    const first = firstList[randInt(rng, 0, firstList.length - 1)];
    const family = names.family && names.family.length ? " " + names.family[randInt(rng, 0, names.family.length - 1)] : "";

    const stats = {};
    for (const k of STAT_KEYS) stats[k] = clamp(Math.round(randInt(rng, 1, 10) * (race.mult[k] || 1)), 0, 99);

    const era = data.eras && data.eras.length ? weightedPick(data.eras, rng) : null;

    const c = {
      race,
      origin,
      era,
      eraUntil: randInt(rng, 30, 120),
      name: first + family,
      gender,
      age: 0,
      maxAge: race.lifespan ? randInt(rng, race.lifespan[0], race.lifespan[1]) : null,
      stats,
      bars: { health: randInt(rng, 75, 95), joy: 50, wealth: 20 },
      flags: [],
      used: [],
      log: [],
      moments: [],
      pending: null,
      alive: true,
      cause: null,
    };
    applyEffects(c, origin.effects);
    if (era) pushLog(c, "era", era.text);
    pushLog(c, "birth", fmt(origin.text, c));
    return c;
  }

  function pushLog(c, kind, text) {
    const st = currentStage(c);
    c.log.push({ age: c.age, stage: st.name, kind, text });
  }

  function applyEffects(c, eff) {
    if (!eff) return;
    for (const k of STAT_KEYS) if (eff[k]) c.stats[k] = clamp(c.stats[k] + eff[k], 0, 99);
    for (const k of BAR_KEYS) if (eff[k]) c.bars[k] = clamp(c.bars[k] + eff[k], 0, 100);
    if (eff.flags) for (const f of eff.flags) if (!c.flags.includes(f)) c.flags.push(f);
    if (eff.unflags) c.flags = c.flags.filter((f) => !eff.unflags.includes(f));
  }

  function meets(c, req) {
    if (!req) return true;
    for (const k of STAT_KEYS) if (req[k] != null && c.stats[k] < req[k]) return false;
    for (const k of BAR_KEYS) if (req[k] != null && c.bars[k] < req[k]) return false;
    if (req.below) {
      for (const k of Object.keys(req.below)) {
        const v = k in c.stats ? c.stats[k] : c.bars[k];
        if (v >= req.below[k]) return false;
      }
    }
    if (req.flags && !req.flags.every((f) => c.flags.includes(f))) return false;
    if (req.notFlags && req.notFlags.some((f) => c.flags.includes(f))) return false;
    if (req.gender && req.gender !== c.gender) return false;
    return true;
  }

  function eligible(e, c, stageId) {
    if (e.races && e.races.length && !e.races.includes(c.race.id)) return false;
    if (e.excludeRaces && e.excludeRaces.includes(c.race.id)) return false;
    if (e.tags && e.tags.length && !(c.race.tags || []).some((t) => e.tags.includes(t))) return false;
    if (e.stages && e.stages.length && !e.stages.includes(stageId)) return false;
    if (e.eras && e.eras.length && !(c.era && e.eras.includes(c.era.id))) return false;
    if (e.minAge != null && c.age < e.minAge) return false;
    if (e.maxAge != null && c.age > e.maxAge) return false;
    if (e.once !== false && c.used.includes(e.id)) return false;
    return meets(c, e.require);
  }

  function die(c, data, causeText, kind) {
    c.alive = false;
    c.pending = null;
    c.causeKind = kind || "event";
    c.cause = fmt(causeText, c);
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
    const h = (c.race.hazard || 0) * (c.era ? c.era.hazard : 1);
    const luckGuard = clamp(1 - (c.stats.LUCK - 5) * 0.04, 0.4, 1.4);
    const p = 1 - Math.pow(1 - h * luckGuard, years);
    if (rng() < p) die(c, data, pickDeath(c, data, rng, "violent"), "violent");
  }

  function resolveEvent(c, data, e, rng) {
    c.used.push(e.id);
    if (e.choices && e.choices.length) {
      const open = e.choices.filter((ch) => meets(c, ch.require));
      if (open.length >= 2) {
        c.pending = { event: e, choices: open };
        pushLog(c, "choice", fmt(e.text, c));
        return;
      }
    }
    pushLog(c, "event", fmt(e.text, c));
    applyEffects(c, e.effects);
    if (e.moment) c.moments.push({ age: c.age, text: fmt(e.moment, c) });
    if (e.death) die(c, data, e.death);
  }

  // One click: age up, run events, check death.
  function advance(c, data, rng) {
    rng = rng || Math.random;
    if (!c.alive || c.pending) return c;
    const years = stepYears(c);
    c.age += years;

    // The world's era shifts every few decades.
    if (c.era && c.age >= c.eraUntil) {
      const others = data.eras.filter((x) => x.id !== c.era.id);
      c.era = weightedPick(others, rng);
      c.eraUntil = c.age + randInt(rng, 30, 120);
      pushLog(c, "era", c.era.change);
    }
    if (c.era) applyEffects(c, c.era.perTurn);

    // aging: slow recovery while young, decline near the end of a mortal life
    if (c.maxAge != null && c.age > c.maxAge * 0.75) applyEffects(c, { health: -randInt(rng, 1, 4) * Math.min(years, 5) });
    else applyEffects(c, { health: 3 });

    const stageId = currentStage(c).id;
    const pool = data.events.filter((e) => eligible(e, c, stageId));
    const e = weightedPick(pool, rng);
    if (e) resolveEvent(c, data, e, rng);
    else pushLog(c, "filler", fmt(pickFiller(c, data, rng, stageId), c));

    if (!c.pending) checkDeath(c, data, rng, years);
    return c;
  }

  function pickFiller(c, data, rng, stageId) {
    const pool = data.fillers.filter(
      (f) => (!f.stages || f.stages.includes(stageId)) && (!f.races || f.races.includes(c.race.id))
    );
    const f = weightedPick(pool, rng);
    return f ? f.text : "Thời gian trôi qua.";
  }

  function successChance(c, check) {
    const v = c.stats[check.stat] != null ? c.stats[check.stat] : c.bars[check.stat];
    return clamp(0.5 + (v - check.target) * 0.08 + (c.stats.LUCK - 5) * 0.02, 0.05, 0.95);
  }

  function choose(c, data, index, rng) {
    rng = rng || Math.random;
    if (!c.pending) return c;
    const { event, choices } = c.pending;
    const ch = choices[index];
    c.pending = null;
    let outcome = ch;
    if (ch.check) outcome = rng() < successChance(c, ch.check) ? ch.success : ch.fail;
    pushLog(c, "picked", ch.label);
    if (outcome.text) pushLog(c, "result", fmt(outcome.text, c));
    applyEffects(c, outcome.effects);
    const moment = outcome.moment || ch.moment;
    if (moment) c.moments.push({ age: c.age, text: fmt(moment, c) });
    if (outcome.death) die(c, data, outcome.death);
    checkDeath(c, data, rng, 0);
    return c;
  }

  function summary(c, data, rng) {
    rng = rng || Math.random;
    const totalW = data.races.reduce((s, r) => s + r.weight, 0);
    const pct = Math.round((c.race.weight / totalW) * 1000) / 10;
    const ep = weightedPick(data.epitaphs.filter((e) => !e.races || e.races.includes(c.race.id)), rng);
    return {
      pct,
      epitaph: ep ? fmt(ep.text, c, { pct, cause: c.cause }) : "",
      moments: c.moments.slice(-8),
    };
  }

  const api = {
    STAT_KEYS,
    BAR_KEYS,
    makeRng,
    weightedPick,
    stagesOf,
    currentStage,
    stepYears,
    createCharacter,
    advance,
    choose,
    successChance,
    summary,
    eligible,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Engine = api;
})(typeof window !== "undefined" ? window : globalThis);
