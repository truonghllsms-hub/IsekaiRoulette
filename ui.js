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

  function startLife() {
    c = E.createCharacter(D);
    rendered = 0;
    $("reveal-race").textContent = c.race.name;
    $("reveal-odds").textContent = `Chỉ ${pctOf(c.race)}% linh hồn được đầu thai làm ${c.race.name}.`;
    $("reveal-origin").textContent = c.origin.name + (c.era ? ` · ${c.era.name}` : "");
    $("reveal-desc").textContent = c.race.desc || "";
    show("screen-reveal");
  }

  // ---------- life ----------
  function renderHud() {
    const genderTxt = c.gender === "male" ? "Nam" : c.gender === "female" ? "Nữ" : "Vô tính";
    $("hud-name").textContent = c.name;
    $("hud-meta").textContent = `${c.race.name} · ${genderTxt} · ${c.era ? c.era.name : c.origin.name}`;
    $("hud-age").textContent = fmtAge(c.age);
    $("hud-stage").textContent = E.currentStage(c).name;

    $("hud-bars").innerHTML = E.BAR_KEYS.map(
      (k) => `<div class="bar">${BAR_LABEL[k]}<div class="track"><div class="fill" style="width:${c.bars[k]}%;background:${BAR_COLOR[k]}"></div></div></div>`
    ).join("");
    $("hud-stats").innerHTML = E.STAT_KEYS.map((k) => `<span class="stat">${STAT_LABEL[k]} <b>${c.stats[k]}</b></span>`).join("");
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
      li.innerHTML = `<div class="when"><b>${fmtAge(e.age)}</b>${e.stage}</div><div class="text"><p></p></div>`;
      li.querySelector(".text p").textContent = e.text;
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
      if (ch.check) {
        const s = document.createElement("small");
        s.textContent = `Dựa vào ${STAT_LABEL[ch.check.stat] || ch.check.stat} · khoảng ${Math.round(E.successChance(c, ch.check) * 100)}% thành công`;
        b.appendChild(s);
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
    const btn = $("btn-next");
    if (!c.alive) {
      btn.textContent = "Xem tổng kết";
      btn.disabled = false;
    } else if (c.pending) {
      btn.textContent = "Hãy đưa ra lựa chọn";
      btn.disabled = true;
    } else {
      const y = E.stepYears(c);
      btn.textContent = y === 1 ? "Sống tiếp 1 năm" : `Sống tiếp ${fmtAge(y)} năm`;
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
    $("death-meta").textContent = `${c.race.name} · ${fmtAge(c.age)} tuổi · ${c.origin.name}`;
    $("death-cause").textContent = c.cause;
    $("death-epitaph").textContent = s.epitaph;
    const ul = $("death-moments");
    ul.innerHTML = "";
    const moments = s.moments.length ? s.moments : [{ age: c.age, text: "Một cuộc đời lặng lẽ." }];
    for (const m of moments) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="m-age">${fmtAge(m.age)} tuổi</span><span></span>`;
      li.lastElementChild.textContent = m.text;
      ul.appendChild(li);
    }
    store.add({ name: c.name, race: c.race.name, age: c.age });
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
