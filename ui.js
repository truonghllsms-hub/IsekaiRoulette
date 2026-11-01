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
  // img/<race>.png, img/beastman_<kin>.png, img/<race>__<form>.png; whatever exists in D.images.
  const slug = (t) => String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
  function spriteOf(ch) {
    const have = new Set(D.images || []);
    const base = ch.subtype && have.has(`${ch.race.id}_${ch.subtype}`) ? `${ch.race.id}_${ch.subtype}` : ch.race.id;
    const keys = [ch.form ? `${ch.race.id}__${slug(ch.form)}` : null, base].filter(Boolean);
    const k = keys.find((x) => have.has(x));
    return k ? `img/${k}.png` : null;
  }
  function setSprite(id, ch) {
    const el = $(id);
    if (!el) return;
    const src = spriteOf(ch);
    el.hidden = !src;
    if (src && el.getAttribute("src") !== src) el.setAttribute("src", src);
  }

  function startLife() {
    c = E.createCharacter(D);
    rendered = 0;
    setSprite("reveal-sprite", c);
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

  function renderLog() {
    const log = $("log");
    for (; rendered < c.log.length; rendered++) {
      const e = c.log[rendered];
      const prev = log.lastElementChild;
      // Attach picks and results to the choice entry they answer.
      if ((e.kind === "picked" || e.kind === "result") && prev) {
        const p = document.createElement("p");
        if (e.kind === "picked") p.className = "picked";
        p.textContent = e.text;
        prev.querySelector(".text").appendChild(p);
        continue;
      }
      const li = document.createElement("li");
      li.className = "entry kind-" + e.kind;
      const when = e.ageFrom != null ? `${fmtAge(e.ageFrom)}–${fmtAge(e.age)}` : fmtAge(e.age);
      li.innerHTML = `<div class="when"><b>${when}</b>${e.stage}</div><div class="text"><p></p></div>`;
      li.querySelector(".text p").textContent = e.text;
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
        const pb = Math.round(E.partyBonus(c, ch.check) * 100);
        note(`Dựa vào ${E.STAT_LABEL[ch.check.stat] || ch.check.stat} · khoảng ${Math.round(E.successChance(c, ch.check) * 100)}% thành công` + (pb ? ` (đồng đội +${pb}%)` : ""));
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
    setSprite("death-sprite", c);
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
    store.add({ name: c.name, race: E.raceTitle(c), age: c.age });
    show("screen-death");
  }

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
