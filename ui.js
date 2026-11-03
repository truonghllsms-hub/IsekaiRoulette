// Browser UI. Reads window.GAME_DATA (built by tools/build.js) and drives window.Engine.
(function () {
  "use strict";
  const E = window.Engine;
  const D = window.GAME_DATA;
  const $ = (id) => document.getElementById(id);

  const STAT_LABEL = { STR: "Sức mạnh", INT: "Trí tuệ", AGI: "Nhanh nhẹn", LUCK: "May mắn" };
  const BAR_LABEL = { health: "Sức khỏe", joy: "Hạnh phúc", wealth: "Tài sản" };
  const BAR_COLOR = { health: "var(--good)", joy: "var(--accent)", wealth: "var(--warn)" };

  let c = null;
  const esc = (t) => String(t).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
  let rendered = 0;

  const store = {
    get() { try { return JSON.parse(localStorage.getItem("lhdg_lives") || "[]"); } catch (e) { return []; } },
    add(life) {
      try {
        const all = store.get();
        all.unshift(life);
        localStorage.setItem("lhdg_lives", JSON.stringify(all.slice(0, 10)));
      } catch (e) { /* storage unavailable */ }
    },
  };

  function show(id) {
    for (const s of document.querySelectorAll(".screen")) s.hidden = s.id !== id;
    window.scrollTo(0, 0);
  }

  function pctOf(race) {
    const total = D.races.reduce((s, r) => s + r.weight, 0);
    return Math.round((race.weight / total) * 1000) / 10;
  }

  function fmtAge(a) {
    return a.toLocaleString("vi-VN");
  }

  // ---------- start ----------
  function renderStart() {
    const list = $("odds-list");
    list.innerHTML = "";
    for (const r of [...D.races].sort((a, b) => b.weight - a.weight)) {
      const li = document.createElement("li");
      li.innerHTML = `<span>${r.name}</span><span>${pctOf(r)}%</span>`;
      list.appendChild(li);
    }
    const lives = store.get();
    const box = $("past-lives");
    box.innerHTML = "";
    if (lives.length) {
      box.innerHTML = "<h2>Các kiếp trước</h2>";
      const ul = document.createElement("ul");
      for (const l of lives) {
        const li = document.createElement("li");
        li.textContent = `${l.name} · ${l.race} · ${fmtAge(l.age)} tuổi`;
        ul.appendChild(li);
      }
      box.appendChild(ul);
    }
    show("screen-start");
  }

  const upper = (t) => (t ? t.charAt(0).toUpperCase() + t.slice(1) : "");

  // ---------- sprites ----------
  // One atlas per person (img/<person>.png, frames in D.sprites[person]): person n of a race or
  // Beastman kin and gender, drawn as baby, child, teen, adult, old, each trade new (moi) and veteran
  // (kycuu), each evolution. A life keeps one person; a Human is picked by where they were born.
  const slug = (t) => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  // Human people by background (the design sheets): men 1 village, 2 street, 3 noble, 4 highland,
  // 5 scholarly, 6 harbour, 7 nomad, 8 townsfolk; women 1 townsfolk, 2 scholarly, 3 noble,
  // 4 merchant, 5 convent, 6 harbour, 7 street, 8 highland
  const HUMAN_BG = {
    nam: { thonque: 1, duongpho: 2, quytoc: 3, soncuoc: 4, thuhuong: 5, haicang: 6, dumuc: 7, thidan: 8 },
    nu: { thidan: 1, thuhuong: 2, quytoc: 3, thuonggia: 4, tuvien: 5, haicang: 6, duongpho: 7, soncuoc: 8 },
  };
  const HUMAN_ORIGIN = {
    thief: ["duongpho"], hunter: ["soncuoc", "thonque"], servant: ["thidan", "duongpho"], soldier: ["thidan", "thonque"],
    mercenary: ["dumuc", "haicang"], gladiator: ["duongpho", "dumuc"], merchant: ["thuonggia", "thidan", "haicang"],
    knight_orphan: ["tuvien", "thuhuong"], half_beast: ["soncuoc", "dumuc"], hero_descendant: ["quytoc", "thonque"],
    blacksmith: ["thidan", "soncuoc"], refugee: ["thonque", "dumuc", "duongpho"], noble_bastard: ["duongpho", "quytoc"],
    half_elf: ["dumuc", "soncuoc"], scholar: ["thuhuong"], cultist: ["duongpho", "tuvien"], priest_sin: ["tuvien", "thuhuong"],
    harlot: ["duongpho", "haicang"], farmer: ["thonque", "soncuoc"], alchemist: ["thuhuong", "thidan"],
  };
  const hashName = (t) => { let h = 0; for (const x of t) h = (h * 31 + x.charCodeAt(0)) >>> 0; return h; };
  function personOf(ch) {
    const S = D.sprites || {};
    const who = ch.subtype ? `${ch.race.id}_${ch.subtype}` : ch.race.id;
    const g = ch.gender === "male" ? "nam" : ch.gender === "female" ? "nu" : "x";
    const og = g === "nam" ? "nu" : "nam";
    let pool = Object.keys(S).filter((p) => p.startsWith(`${who}_${g}_`));
    if (!pool.length) pool = Object.keys(S).filter((p) => p.startsWith(`${who}_${og}_`) || p.startsWith(`${who}_x_`));
    if (!pool.length) return null;
    pool.sort();
    if (ch.race.id === "human" && HUMAN_BG[g]) {
      const bgs = HUMAN_ORIGIN[ch.origin.id.replace(/^human_(bg|origin)_/, "")] || [];
      const fit = bgs.map((b) => HUMAN_BG[g][b]).filter(Boolean).map((n) => `human_${g}_${n}`).filter((p) => S[p]);
      if (fit.length) return fit[hashName(ch.name) % fit.length];
    }
    return pool[hashName(ch.name) % pool.length];
  }
  // peak: the strongest look of a whole life (evolved form, veteran gear) instead of the present one
  function spriteOf(ch, peak) {
    const person = personOf(ch);
    if (!person) return null;
    const P = D.sprites[person];
    const st = E.currentStage(ch).id;
    const want = [];
    if (peak) {
      if (ch.form) want.push(`tienhoa_${slug(ch.form)}`);
      for (const j of [ch.job, ...(ch.pastJobs || []).slice().reverse()].filter(Boolean)) {
        const t = j.id.slice(j.id.indexOf("_") + 1);
        want.push(`${t}_kycuu`, `${t}_moi`);
      }
      want.push("thuongdan", "thieunien", "hoilon", "beti");
      const col = want.find((k) => P[k]);
      return col ? { person, rect: P[col], size: P._size } : null;
    }
    if (ch.form) want.push(`tienhoa_${slug(ch.form)}`);
    if (st === "infant") want.push("beti", "hoilon");
    else if (st === "child") want.push("hoilon", "beti");
    else if (st === "elder" || st === "ancient") want.push("gia");
    if (st === "teen" && !ch.job) want.push("thieunien");
    if (ch.job && !["infant", "child"].includes(st)) {
      const t = ch.job.id.slice(ch.job.id.indexOf("_") + 1);
      // newcomer until the veteran mark (rank B of the guild or tribe, or the 4th of 5 trade ranks)
      const vet = E.isVeteran(ch, D);
      want.push(`${t}_${vet ? "kycuu" : "moi"}`, `${t}_${vet ? "moi" : "kycuu"}`);
    }
    want.push("thuongdan", "thieunien", "gia");
    const col = want.find((k) => P[k]);
    return col ? { person, rect: P[col], size: P._size } : null;
  }
  function setSprite(id, ch, peak) {
    const box = $(id);
    if (!box) return;
    const s = spriteOf(ch, peak);
    box.hidden = !s;
    if (!s) return;
    const el = box.firstElementChild;
    // one scale for the whole person: a child is drawn smaller than the adult it becomes
    // the adult frame fills the box; a big veteran or an evolution may grow a little past it
    const P = D.sprites[s.person];
    const boxH = box.clientHeight || 52;
    const ref = (P.thuongdan || P.thieunien || s.rect)[3];
    const k = Math.min(boxH / ref, (boxH * 1.25) / s.rect[3]);
    const [x, y, w, h] = s.rect;
    el.style.width = `${Math.round(w * k)}px`;
    el.style.height = `${Math.round(h * k)}px`;
    el.style.backgroundImage = `url(img/${s.person}.png)`;
    el.style.backgroundSize = `${Math.round(s.size[0] * k)}px ${Math.round(s.size[1] * k)}px`;
    el.style.backgroundPosition = `${-Math.round(x * k)}px ${-Math.round(y * k)}px`;
  }


  function startLife() {
    c = E.createCharacter(D);
    rendered = 0;
    $("reveal-name").textContent = c.name;
    $("reveal-race").textContent = c.subtypeName ? `${c.race.name} ${c.subtypeName}` : c.race.name;
    $("reveal-gloss").textContent = c.race.gloss ? `(${c.race.gloss})` : "";
    $("reveal-odds").textContent = `Chỉ ${pctOf(c.race)}% linh hồn được đầu thai làm ${c.race.name}.`;
    $("reveal-origin").textContent = c.origin.name + (c.era ? ` · ${c.era.name}` : "");
    renderFamily();
    $("reveal-desc").textContent = c.race.desc || "";
    show("screen-reveal");
  }

  // Parents (or whoever made you), siblings and home, shown when you are born.
  const STATUS = { alive: "còn sống", dead: "đã mất", gone: "đã bỏ đi", unknown: "không rõ tung tích" };
  function personLine(label, p) {
    if (!p) return "";
    const name = p.name || "Không rõ là ai";
    // "Không rõ" roles and traits say nothing more than the name already does
    const bits = [p.role, p.trait].filter((x) => x && !/^không rõ/i.test(x)).join(", ");
    const status = STATUS[p.status] || "";
    return `<li><span class="fam-k">${label}</span><span><b>${esc(name)}</b>${p.race && p.race !== c.race.name ? ` · ${esc(p.race)}` : ""}${bits ? ` — ${esc(bits)}` : ""}${status ? ` <i>(${status})</i>` : ""}</span></li>`;
  }
  function renderFamily() {
    const box = $("reveal-family");
    const p = c.parents || {};
    let html = personLine("Cha", p.father) + personLine("Mẹ", p.mother) + personLine("Kẻ tạo ra bạn", p.maker);
    if (c.origin.siblings) html += `<li><span class="fam-k">Anh chị em</span><span>${esc(c.origin.siblings)}</span></li>`;
    if (c.origin.home) html += `<li><span class="fam-k">Gia cảnh</span><span>${esc(c.origin.home)}</span></li>`;
    box.innerHTML = html;
    box.hidden = !html;
  }

  // ---------- life ----------
  function renderHud() {
    const genderTxt = c.gender === "male" ? "Nam" : c.gender === "female" ? "Nữ" : "Vô tính";
    setSprite("hud-sprite", c);
    $("hud-name").textContent = c.name;
    $("hud-meta").textContent = `${E.raceTitle(c)} · ${genderTxt} · ${c.captive ? upper(E.CAPTIVE_WORD[c.captive.kind]) : c.era ? c.era.name : c.origin.name}`;
    $("hud-age").textContent = fmtAge(c.age);
    $("hud-stage").textContent = E.currentStage(c).name;

    $("hud-bars").innerHTML = E.BAR_KEYS.map(
      (k) => `<div class="bar">${BAR_LABEL[k]}<div class="track"><div class="fill" style="width:${c.bars[k]}%;background:${BAR_COLOR[k]}"></div></div></div>`
    ).join("");
    $("hud-stats").innerHTML = E.STAT_KEYS.map((k) => `<span class="stat">${STAT_LABEL[k]} <b>${c.stats[k]}</b></span>`).join("");
    $("hud-profile").innerHTML = profileHtml();
  }


  function profileHtml() {
    const out = [];
    if (c.job) out.push(`<span>Nghề <b>${esc(E.jobTitle(c, D))}</b></span>`);
    const org = E.orgDef(c, D);
    if (org) out.push(`<span>${esc(org.name)} <b>${esc(E.orgRankName(c, D))}</b></span>`);
    if (c.fame) out.push(`<span>Danh vọng <b>${c.fame}</b></span>`);
    if (c.party.length)
      out.push(`<span>Tổ đội ${c.party.filter((m) => !m.left).map((m) => `<b class="${m.alive ? "" : "dead"}" title="${esc(m.race + ", " + m.jobName)}">${esc(m.name)}</b>`).join(", ")}</span>`);
    if (c.spouse) out.push(`<span>Bạn đời <b>${esc(c.spouse.name)}</b>${c.children.length ? ` · ${c.children.length} con` : ""}</span>`);
    // what you carry: weapon, armour, keepsakes (hover for what it is and what it adds)
    if (c.items && c.items.length) {
      const order = { weapon: 0, armor: 1, charm: 2 };
      const items = c.items.slice().sort((a, b) => order[a.slot] - order[b.slot]);
      const bonus = (it) => Object.entries(it.bonus || {}).map(([k, v]) => `${STAT_LABEL[k] || k} +${v}`).join(", ");
      out.push(`<span>Trang bị ${items.map((it) => `<b class="item ${it.slot}" title="${esc((it.desc ? it.desc + " " : "") + "(" + bonus(it) + ")")}">${esc(it.name)}</b>`).join(", ")}</span>`);
    }
    return out.join("");
  }

  function renderFocus() {
    const bar = $("focus-bar");
    bar.innerHTML = "";
    if (!c.alive || c.pending) return;
    const opts = E.focusOptions(c, D);
    if (opts.length < 2) return;
    bar.appendChild(document.createTextNode("Việc chính:"));
    for (const f of opts) {
      const b = document.createElement("button");
      b.className = "chip";
      b.textContent = f.name;
      b.title = f.desc;
      b.setAttribute("aria-pressed", String(c.focus === f.id));
      b.onclick = () => {
        E.setFocus(c, D, f.id);
        render();
      };
      bar.appendChild(b);
    }
  }

  // ---------- who is who: hover (or tap) a name in the story to be reminded ----------
  const ROLE_WORD = { rival: "Đối thủ", mentor: "Người thầy", friend: "Bạn thân" };
  function whoIndex() {
    const idx = new Map();
    const add = (name, text) => { if (name && String(name).length > 1 && !idx.has(name) && name !== c.name.split(" ")[0]) idx.set(String(name), text); };
    const P = c.parents || {};
    const PW = { father: "Cha của bạn", mother: "Mẹ của bạn", maker: "Kẻ tạo ra bạn" };
    for (const w of ["father", "mother", "maker"]) {
      const p = P[w];
      if (!p || !p.name) continue;
      const st = p.alive ? "" : p.status === "dead" ? " · đã mất" : p.status === "gone" ? " · đã bỏ đi" : p.status === "unknown" ? " · không rõ tung tích" : "";
      add(p.name.split(" ")[0], `${PW[w]}${p.role ? " · " + p.role : ""}${st}`);
    }
    const story = (D.story || {})[c.race.id];
    for (const x of Object.values(c.cast || {})) {
      const def = story && story.cast && story.cast[x.kind];
      const title = def && def.title ? def.title.charAt(0) + def.title.slice(1).toLowerCase() : "";
      add(x.name, `${ROLE_WORD[x.role] || "Người quen"}${title ? " · " + title : ""}${x.mortal ? " · " + x.mortal.race : ""}${!x.alive ? " · đã mất" : x.left ? " · đã rời xa" : ""}`);
    }
    if (c.spouse) add(c.spouse.name, `Bạn đời của bạn · nên duyên năm ${Math.floor(c.spouse.since)} tuổi`);
    for (const n of c.formerSpouses || []) add(n, "Người bạn đời cũ");
    for (const k of c.children || []) add(k.name, `Con của bạn · chào đời khi bạn ${Math.floor(k.born)} tuổi`);
    for (const m of c.party || []) add(m.name, `Đồng đội · ${[m.race, m.jobName].filter(Boolean).join(" · ")}${!m.alive ? " · đã mất" : m.left ? " · đã rời đi" : ""}`);
    for (const f of c.fallen || []) add(f.name, `Đồng đội đã khuất · mất khi bạn ${Math.floor(f.at)} tuổi`);
    if (c.band && c.band.name) add(c.band.name, `Tổ đội của bạn · từ năm ${Math.floor(c.band.since)} tuổi`);
    return idx;
  }
  // the text with each known name wrapped in a note; everything else stays plain text
  function setRich(el, text, idx) {
    const names = [...idx.keys()].sort((a, b) => b.length - a.length).map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    if (!names.length) { el.textContent = text; return; }
    const re = new RegExp(`(?<!\\p{L})(${names.join("|")})(?!\\p{L})`, "gu");
    let html = "", last = 0, m;
    while ((m = re.exec(text))) {
      html += esc(text.slice(last, m.index)) + `<span class="npc" tabindex="0" data-who="${esc(idx.get(m[1]))}">${esc(m[1])}</span>`;
      last = m.index + m[1].length;
    }
    el.innerHTML = html + esc(text.slice(last));
  }

  function renderLog() {
    const log = $("log");
    const idx = whoIndex();
    for (; rendered < c.log.length; rendered++) {
      const e = c.log[rendered];
      const prev = log.lastElementChild;
      // Attach picks and results to the choice entry they answer.
      if ((e.kind === "picked" || e.kind === "result") && prev) {
        const p = document.createElement("p");
        if (e.kind === "picked") p.className = "picked";
        setRich(p, e.text, idx);
        prev.querySelector(".text").appendChild(p);
        continue;
      }
      const li = document.createElement("li");
      li.className = "entry kind-" + e.kind;
      const when = e.ageFrom != null ? `${fmtAge(e.ageFrom)}–${fmtAge(e.age)}` : fmtAge(e.age);
      li.innerHTML = `<div class="when"><b>${when}</b>${e.stage}</div><div class="text"><p></p></div>`;
      setRich(li.querySelector(".text p"), e.text, idx);
      if (e.gains) {
        const g = document.createElement("p");
        g.className = "gains";
        g.textContent = e.gains;
        li.querySelector(".text").appendChild(g);
      }
      log.appendChild(li);
    }
  }

  function renderChoices() {
    const box = $("choices");
    box.innerHTML = "";
    if (!c.pending) return;
    c.pending.choices.forEach((ch, i) => {
      const b = document.createElement("button");
      b.className = "btn choice";
      b.textContent = ch.label;
      const note = (text, cls) => {
        const s = document.createElement("small");
        s.textContent = text;
        if (cls) s.className = cls;
        b.appendChild(s);
      };
      if (ch.hint) note(ch.hint);
      if (ch.disabled) {
        b.disabled = true;
        note(ch.reason || "Chưa đủ điều kiện", "locked");
      } else if (ch.check) {
        // the odds in words, not numbers
        const ascending = ch.success && ch.success.effects && ch.success.effects.evolve;
        const p = Math.min(0.95, E.successChance(c, ch.check) + (ascending ? 0.2 : 0));
        const word = p >= 0.8 ? "rất cao" : p >= 0.62 ? "cao" : p >= 0.42 ? "vừa phải" : p >= 0.25 ? "thấp" : "rất thấp";
        const pb = E.partyBonus(c, ch.check) > 0.02;
        note(`Dựa vào ${E.STAT_LABEL[ch.check.stat] || ch.check.stat} · tỉ lệ thành công ${word}` + (pb ? " (có đồng đội trợ giúp)" : ""), "odds odds-" + word.replace(/\s/g, "-"));
      }
      b.onclick = () => {
        E.choose(c, D, i);
        render();
      };
      box.appendChild(b);
    });
  }

  function render() {
    renderHud();
    renderLog();
    renderChoices();
    renderFocus();
    const btn = $("btn-next");
    if (!c.alive) {
      btn.textContent = "Xem tổng kết";
      btn.disabled = false;
    } else if (c.pending) {
      btn.textContent = "Hãy đưa ra lựa chọn";
      btn.disabled = true;
    } else {
      btn.textContent = c.quest ? "Tiếp tục nhiệm vụ" : "Sống tiếp";
      btn.disabled = false;
    }
    requestAnimationFrame(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
  }

  function beginLife() {
    $("log").innerHTML = "";
    rendered = 0;
    show("screen-life");
    render();
  }

  function next() {
    if (!c.alive) return renderDeath();
    E.advance(c, D);
    render();
  }

  // ---------- death ----------
  function renderDeath() {
    const s = E.summary(c, D);
    $("death-name").textContent = c.name;
    $("death-meta").textContent = `${E.raceTitle(c)} · ${fmtAge(c.age)} tuổi · ${c.origin.name}`;
    $("death-cause").textContent = c.cause;
    $("death-epitaph").textContent = s.epitaph;
    const bio = $("death-bio");
    bio.innerHTML = "";
    bio.hidden = !(c.biography && c.biography.length);
    for (const t of c.biography || []) {
      const p = document.createElement("p");
      p.textContent = t;
      bio.appendChild(p);
    }
    const prof = $("death-profile");
    prof.innerHTML = "";
    for (const line of s.profile) {
      const li = document.createElement("li");
      li.textContent = line;
      prof.appendChild(li);
    }
    const ul = $("death-moments");
    ul.innerHTML = "";
    const moments = s.moments.length ? s.moments : [{ age: c.age, text: "Một cuộc đời lặng lẽ." }];
    for (const m of moments) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="m-age">${fmtAge(m.age)} tuổi</span><span></span>`;
      li.lastElementChild.textContent = m.text;
      ul.appendChild(li);
    }
    renderCard(s.card);
    store.add({ name: c.name, race: E.raceTitle(c), age: c.age });
    show("screen-death");
    setSprite("lc-sprite", c, true); // after show: the box needs its real height
  }

  // ---------- the life card (to copy or save and show around) ----------
  let card = null;
  let cardSprite = null;
  function renderCard(k) {
    card = k;
    const sp = spriteOf(c, true);
    cardSprite = null;
    if (sp) { const im = new Image(); im.onload = () => { cardSprite = { im, rect: sp.rect }; }; im.src = `img/${sp.person}.png`; }
    $("lc-name").textContent = k.name;
    $("lc-line").textContent = k.line + (k.origin ? " · " + k.origin : "");
    const ul = $("lc-marks");
    ul.innerHTML = "";
    for (const m of k.marks) {
      const li = document.createElement("li");
      li.textContent = m;
      ul.appendChild(li);
    }
    $("lc-epitaph").textContent = k.epitaph ? `“${k.epitaph}”` : "";
    $("lc-cause").textContent = k.cause || "";
    $("lc-note").hidden = true;
    const old = $("lc-image");
    if (old) old.remove();
  }
  function cardText(k) {
    return [`${k.name} — ${k.line}`, k.marks.join(" · "), k.epitaph ? `“${k.epitaph}”` : "", k.cause, "— Luân Hồi Dị Giới"].filter(Boolean).join("\n");
  }
  function say(t) { const n = $("lc-note"); n.textContent = t; n.hidden = false; }
  $("btn-copy-life").onclick = () => {
    if (!card) return;
    const t = cardText(card);
    const done = () => say("Đã sao chép. Dán vào đâu cũng được.");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, () => fallbackCopy(t, done));
    else fallbackCopy(t, done);
  };
  function fallbackCopy(t, done) {
    const ta = document.createElement("textarea");
    ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { say("Trình duyệt chặn sao chép."); }
    ta.remove();
  }
  function wrap(ctx, text, maxW) {
    const words = text.split(/\s+/), lines = [];
    let line = "";
    for (const w of words) {
      const tryL = line ? line + " " + w : w;
      if (ctx.measureText(tryL).width > maxW && line) { lines.push(line); line = w; } else line = tryL;
    }
    if (line) lines.push(line);
    return lines;
  }
  function cardImage(k) {
    const W = 1080, pad = 90, inner = W - pad * 2;
    const cv = document.createElement("canvas");
    const ctx = cv.getContext("2d");
    const serif = '"Noto Serif", Georgia, serif', sans = '"Be Vietnam Pro", system-ui, sans-serif';
    // measure first, then draw
    const plan = [];
    let y = pad + 20;
    const add = (font, color, text, gap, lh, align) => {
      ctx.font = font;
      for (const l of wrap(ctx, text, inner)) { plan.push({ font, color, text: l, y, align }); y += lh; }
      y += gap;
    };
    add(`500 30px ${sans}`, "#a88fd8", "LUÂN HỒI DỊ GIỚI · MỘT KIẾP NGƯỜI", 30, 40, "center");
    // the character at the height of their life
    let spr = null;
    if (cardSprite) {
      const [, , sw, sh] = cardSprite.rect;
      const k = Math.min(300 / sh, 360 / sw);
      spr = { y, w: Math.round(sw * k), h: Math.round(sh * k) };
      y += spr.h + 30;
    }
    add(`600 76px ${serif}`, "#f3ead8", k.name, 10, 88, "center");
    add(`400 34px ${sans}`, "#c9bfae", k.line + (k.origin ? " · " + k.origin : ""), 50, 46, "center");
    for (const m of k.marks) add(`400 36px ${sans}`, "#efe6d4", "✦  " + m, 6, 48, "left");
    y += 30;
    if (k.epitaph) add(`italic 400 40px ${serif}`, "#f3ead8", `“${k.epitaph}”`, 30, 56, "center");
    if (k.cause) add(`400 30px ${sans}`, "#a49a8a", k.cause, 0, 42, "center");
    cv.width = W; cv.height = Math.max(W, y + pad);
    const g = ctx.createLinearGradient(0, 0, 0, cv.height);
    g.addColorStop(0, "#221d2e"); g.addColorStop(1, "#14121a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, cv.height);
    ctx.strokeStyle = "#5a4a7a"; ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, cv.height - 72);
    if (spr) {
      const [sx, sy, sw, sh] = cardSprite.rect;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(cardSprite.im, sx, sy, sw, sh, Math.round((W - spr.w) / 2), spr.y, spr.w, spr.h);
    }
    ctx.textBaseline = "top";
    for (const p of plan) {
      ctx.font = p.font; ctx.fillStyle = p.color; ctx.textAlign = p.align;
      ctx.fillText(p.text, p.align === "center" ? W / 2 : pad, p.y);
    }
    return cv;
  }
  // the artifact viewer saves files through its downloads capability; elsewhere a plain link works
  let dl = null;
  try { if (window.claude && window.claude.use) window.claude.use("downloads").then((d) => { dl = d; }, () => {}); } catch (e) {}
  function showCardImage(url, msg) {
    let img = $("lc-image");
    if (!img) { img = document.createElement("img"); img.id = "lc-image"; img.className = "lc-image"; img.alt = "Thẻ cuộc đời"; $("lc-note").after(img); }
    img.src = url;
    say(msg);
  }
  $("btn-save-card").onclick = () => {
    if (!card) return;
    let cv = cardImage(card);
    const name = `luan-hoi-${card.name.replace(/\s+/g, "-")}.png`;
    let url;
    try { url = cv.toDataURL("image/png"); } catch (e) {
      // the browser would not let the picture of the character out: the card without it
      cardSprite = null; cv = cardImage(card); url = cv.toDataURL("image/png");
    }
    const fallback = "Nhấn giữ hoặc chuột phải vào ảnh bên dưới để lưu.";
    if (dl) {
      cv.toBlob((blob) => {
        dl.save({ filename: name, data: blob }).then(
          () => say("Đã lưu ảnh thẻ cuộc đời."),
          (err) => { if (!err || err.code !== "declined") showCardImage(url, fallback); }
        );
      }, "image/png");
      return;
    }
    if (!window.claude) {
      try {
        const a = document.createElement("a");
        a.href = url; a.download = name;
        document.body.appendChild(a); a.click(); a.remove();
      } catch (e) {}
    }
    showCardImage(url, window.claude ? fallback : "Nếu ảnh chưa tải về: " + fallback.toLowerCase());
  };

  $("btn-start").onclick = startLife;
  $("btn-begin").onclick = beginLife;
  $("btn-next").onclick = next;
  $("btn-again").onclick = startLife;
  $("btn-review").onclick = () => show("screen-life");
  document.addEventListener("keydown", (ev) => {
    if (ev.key !== " " && ev.key !== "Enter") return;
    if ($("screen-life").hidden || (c && c.pending)) return;
    if (document.activeElement && document.activeElement.tagName === "BUTTON") return;
    ev.preventDefault();
    next();
  });

  renderStart();
})();

// Background music: "Adventure" by Alexander Nakarada (royalty-free). Browsers block autoplay,
// so it starts on the first click anywhere unless the player turned it off before.
(function () {
  const audio = document.getElementById("bgm");
  const btn = document.getElementById("btn-music");
  if (!audio || !btn) return;
  audio.volume = 0.4;
  let on = true;
  try { on = localStorage.getItem("lhdg-music") !== "off"; } catch (e) {}
  const show = () => { btn.classList.toggle("off", !on); btn.title = on ? "Tắt nhạc nền (Adventure – Alexander Nakarada)" : "Bật nhạc nền"; };
  const play = () => { if (on) audio.play().catch(() => {}); };
  btn.onclick = (ev) => {
    ev.stopPropagation();
    on = !on;
    try { localStorage.setItem("lhdg-music", on ? "on" : "off"); } catch (e) {}
    if (on) play(); else audio.pause();
    show();
  };
  const first = () => { play(); document.removeEventListener("click", first, true); };
  document.addEventListener("click", first, true);
  show();
})();
