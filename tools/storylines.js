// Keeps each trade's storyline (content/expansions/career-*.json) coherent once the data is loaded:
//  - every scene knows its chapter, so the engine can bring the next one due before random scenes;
//  - a scene that follows another on the same road needs that scene to have happened, and as long ago
//    as its own words say ("Một trăm năm sau…");
//  - an ending needs every scene its road requires to have been lived, the last of them some time ago:
//    bringing the earliest chapter first only sets the pace, this is what keeps the story whole;
//  - an ending that names a title is only for a life that holds that title; the copies once made for
//    lower ranks ("_late") are dropped, and a nickname given early is told as a promise, not a fact;
//  - a life that closes before its road is finished gets an ending of its own, worded by what it
//    really reached;
//  - the road taken and the ending always leave a line for the Life Card.
// Used by tools/load.js, so the game, the tests and the simulations all see the same storylines.

const CHAPTER = { c1: 1, c2: 2, crossroads: 3, path: 4, c4: 5, c5: 6, unfinished: 7 };

const NUM = { "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8, "chín": 9, "mười": 10, "vài": 3, "nhiều": 5 };
// "Một trăm năm sau", "Ba mươi năm sau", "Hai thế kỷ sau", "10 năm sau" → years; null when the text names no span
function yearsLater(text) {
  const m = String(text || "").match(/^(?:Rồi |Và )?((?:\p{L}+|\d+)(?: (?:mươi|trăm|nghìn|ngàn|chục))?) (năm|thập kỷ|thế kỷ|mùa đông|mùa trăng|mùa) (?:sau|trôi qua)/iu);
  if (!m) return null;
  const [first, scale] = m[1].toLowerCase().split(" ");
  let n = /^\d+$/.test(first) ? Number(first) : NUM[first];
  if (!n) return null;
  if (scale === "mươi" || scale === "chục") n *= 10;
  else if (scale === "trăm") n *= 100;
  else if (scale === "nghìn" || scale === "ngàn") n *= 1000;
  const unit = m[2].toLowerCase();
  return unit === "thế kỷ" ? n * 100 : unit === "thập kỷ" ? n * 10 : unit === "mùa trăng" ? Math.ceil(n / 12) : n;
}

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const outcomesOf = (ch) => [ch, ch.success, ch.fail].filter(Boolean);

// How a road closes when the life runs out before the story does, by the gift the trade leans on.
const UNFINISHED = {
  STR: "Tay bạn không còn nhấc nổi những thứ ngày trước vẫn nhấc.",
  INT: "Đầu óc bạn vẫn sáng, nhưng quỹ thời gian thì đã cạn.",
  AGI: "Đôi chân từng nhanh hơn mọi rắc rối giờ đã chậm lại.",
  LUCK: "Vận may theo bạn một quãng dài, rồi cũng đến lúc nó thở dốc.",
  endless: "Các kỷ nguyên cứ nối nhau, và bạn nhận ra mình sẽ không bước thêm bậc nào nữa.",
};
const UNFINISHED_TAIL = " Con đường {job} của bạn khép lại ở bậc {rank}, và câu chuyện lớn bạn từng theo đuổi vẫn còn dang dở. Chỉ còn một điều để chọn: khép nó lại thế nào.";

function unfinishedEnding(job, races, endFlag, endless) {
  // it does not close the road for good: a life that still reaches the top afterwards can have its true ending
  const done = (key) => [`${endFlag}_unfinished`, `${endFlag}_unfinished_${key}`];
  return {
    id: `${endFlag}_unfinished`, _file: "storylines", pack: true, races, weight: 60,
    require: { job: job.id, free: true, lateLife: true, notFlags: [endFlag, `${endFlag}_unfinished`] },
    story: { job: job.id, chapter: CHAPTER.unfinished, kind: "end", unfinished: true },
    text: (endless ? UNFINISHED.endless : UNFINISHED[job.stat] || UNFINISHED.INT) + UNFINISHED_TAIL,
    choices: [
      { label: "Truyền lại những gì mình biết cho người đến sau", text: "Bạn chọn một kẻ trẻ hơn, kiên nhẫn chỉ lại từng điều mình đã phải trả giá mới học được. Câu chuyện của bạn không có hồi kết lẫy lừng, nhưng nó có người kể tiếp.", effects: { joy: 10, fame: 3, flags: done("heir") }, moment: "Truyền nghề {job} cho người đến sau khi con đường còn dang dở" },
      { label: "Cứ làm việc như mọi ngày, đến chừng nào còn làm được", text: "Không có lễ tiễn, không có danh hiệu mới. Bạn làm công việc của một {rank} cho đến ngày cuối, và thấy như thế cũng trọn.", effects: { joy: 6, flags: done("quiet") }, moment: "Giữ nghề {job} ở bậc {rank} cho đến cuối đời" },
      { label: "Thừa nhận điều mình đã không làm được", text: "Bạn nói thành lời điều đã né suốt bao năm: có một đỉnh cao bạn từng nhắm tới và đã không chạm được. Nói ra rồi, nó nhẹ hơn bạn tưởng.", effects: { joy: -4, INT: 1, flags: done("regret") }, moment: "Khép lại con đường {job} với một điều còn dang dở" },
    ],
  };
}

function install(data) {
  const jobs = new Map(data.jobs.map((j) => [j.id, j]));
  const groups = new Map();
  for (const e of data.events) {
    if (!/^expansions\/career-/.test(e._file || "")) continue;
    (groups.get(e._file) || groups.set(e._file, []).get(e._file)).push(e);
  }
  const drop = new Set();
  const extra = [];
  for (const [, events] of groups) {
    const job = jobs.get([].concat(events[0].require && events[0].require.job || [])[0]);
    if (!job) continue;
    const top = job.ranks.length - 1;
    const titles = job.ranks.map((r, k) => [k, new RegExp(`(^|[^\\p{L}])${escape(r)}($|[^\\p{L}])`, "u"), r]);
    const allFlags = events.flatMap((e) => [].concat(e.require && e.require.notFlags || []));
    const endFlag = allFlags.find((f) => /_end$/.test(f)) || `${job.id}_story_end`;
    const lastOnRoad = {};
    const mustOnRoad = {};
    const endings = [];
    // how long a road must have been walked before it can end: an age for the long-lived, a couple of years otherwise
    const pace = data.races.find((r) => (job.races || []).includes(r.id) && r.pacing);
    const walked = pace ? Math.round(pace.pacing.period / 2) : 2;
    for (const e of events) {
      const q = e.require = e.require || {};
      if (/_late$/.test(e.id)) { drop.add(e.id); continue; }
      if (/_daily_/.test(e.id)) continue;
      const road = [].concat(q.flags || []).find((f) => /_path_/.test(f));
      const kind = /_c2_crossroads$/.test(e.id) ? "crossroads" : /_c1_/.test(e.id) ? "c1" : /_c2_/.test(e.id) ? "c2" : /_c4_/.test(e.id) ? "c4" : /_c5_/.test(e.id) ? "c5" : road ? "path" : null;
      if (!kind) continue;
      e.story = { job: job.id, chapter: CHAPTER[kind], kind: kind === "crossroads" ? "path" : kind === "c5" ? "end" : "scene" };
      // an early chapter missed while rising fast can still be caught up, or the road would dead-end
      if (CHAPTER[kind] <= CHAPTER.path) delete q.jobRankMax;
      if (kind === "path") {
        // A scene every life on this road can reach (it asks for nothing but the road itself) must be lived
        // before the road ends. One that also needs an earlier choice is optional: it may never come.
        const must = [].concat(q.flags || []).length === 1 && !q.anyFlags && !e.stages && !e.eras && ![].concat(q.notFlags || []).some((f) => f !== endFlag);
        const list = mustOnRoad[road] = mustOnRoad[road] || [];
        // it follows the scene before it; a scene that must happen never waits on one that may not
        const before = must ? list[list.length - 1] : lastOnRoad[road];
        const years = yearsLater(e.text);
        if (before) q.after = { event: before.id, years: years || 0 };
        lastOnRoad[road] = e;
        if (must) list.push(e);
        e.story.must = must;
      }
      if (kind === "c5") endings.push([e, road]);
      const said = JSON.stringify([e.text, e.choices]);
      const named = titles.filter(([k, re]) => k > (q.jobRank || 0) && re.test(said));
      if (kind === "c5" && named.length) q.jobRank = Math.max(...named.map(([k]) => k));
      else if (named.length) {
        // "người ta gọi bạn là <a title not yet held>": a promise, not a fact
        for (const ch of e.choices || []) for (const o of outcomesOf(ch)) {
          if (!o.text) continue;
          for (const [, , title] of named) o.text = o.text.replace(new RegExp(`Người ta (?:bắt đầu )?gọi bạn là ${escape(title)}([^.]*)\\.`, "u"), `Người ta nói sớm muộn gì bạn cũng sẽ mang danh ${title}$1.`);
        }
      }
      if (kind === "crossroads" || kind === "c5")
        for (const ch of e.choices || []) if (!outcomesOf(ch).some((o) => o.moment)) (ch.success || ch).moment = ch.label.replace(/[.…]+$/, "");
    }
    // An ending is prepared: every scene its road requires has been lived, the last of them long enough ago
    // for the ending's own words ("mười thế hệ Dũng Giả đã đến") to be true.
    for (const [e, road] of endings) {
      const must = mustOnRoad[road] || [];
      if (!must.length) continue;
      const span = Math.max(walked, yearsLater(e.text) || 0);
      e.require.after = must.map((m, i) => ({ event: m.id, years: i === must.length - 1 ? span : 0 }));
    }
    const endless = !data.races.some((r) => (job.races || []).includes(r.id) && r.lifespan);
    extra.push(unfinishedEnding(job, events[0].races, endFlag, endless));
  }
  data.events = data.events.filter((e) => !drop.has(e.id));
  data.events.push(...extra);
}

module.exports = { install, yearsLater, CHAPTER };
