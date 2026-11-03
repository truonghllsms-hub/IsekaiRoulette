// Applies content/english-names.js: group, guild and people names in English.
const EN = require("../content/english-names");

const PLACE_WORDS = "Đảo|Dãy Núi|Núi|Bạo Chúa|Cội Nguồn|Đống|Vùng|Thành|Mỏ|Sông|Hồ|Rừng|Đèo|Thung lũng|Thung Lũng|Biển|Vịnh|Sa mạc|Sa Mạc|Đầm|đống|đảo|núi";
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function textRules(race) {
  const rules = EN.global.map(([a, b]) => [new RegExp(esc(a), "g"), b]);
  for (const [a, b] of (EN.people[race] || [])) rules.push([new RegExp(esc(a), "g"), b]);
  for (const [a, b] of (EN.bands[race] || [])) {
    // capitalised in the middle of a sentence it is the band; after a place word it is a place
    // ("Đảo Tro Tàn", "Dãy Núi Răng Cưa") and stays
    rules.push([new RegExp(`(?<!(?:${PLACE_WORDS}) )(?<![\\p{L}])${esc(a)}(?![\\p{L}])`, "gu"), b]);
  }
  return rules;
}

// "… thổi bay đầu bạn. ." (a sentence end the script wrote twice): one stop is enough
const tidyDots = (t) => t.replace(/([.!?…])\s+\.(?!\.)/g, "$1");

function renameText(t, rules) {
  for (const [re, b] of rules) t = t.replace(re, b);
  return t;
}

function deep(o, fn) {
  if (typeof o === "string") return fn(o);
  if (Array.isArray(o)) return o.map((x) => deep(x, fn));
  if (o && typeof o === "object") { const r = {}; for (const [k, v] of Object.entries(o)) r[k] = deep(v, fn); return r; }
  return o;
}

// the whole pack of one race
function englishPack(race, pack) {
  const rules = textRules(race);
  const bandMap = new Map(EN.bands[race] || []);
  if (pack.story && pack.story.bands)
    for (const b of Object.values(pack.story.bands)) {
      if (bandMap.has(b.name)) {
        const en = bandMap.get(b.name);
        if (b.title) b.title = en.toUpperCase();
        b.name = en;
      }
    }
  for (const o of pack.orgs || []) {
    if (EN.orgs[race]) o.name = EN.orgs[race];
    if (EN.ranks[race] && o.ranks && o.ranks.length === EN.ranks[race].length) o.ranks = EN.ranks[race].slice();
  }
  return deep(pack, (s) => tidyDots(renameText(s, rules)));
}

// a hand-written data file shared by all races: only the global names
function englishData(obj) {
  const rules = textRules("__none__");
  return deep(obj, (s) => renameText(s, rules));
}

module.exports = { englishPack, englishData, renameText, textRules };
