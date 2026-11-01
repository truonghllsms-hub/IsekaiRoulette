// Rows for the sprite worksheet, by "identity": one row is one person of a race (or Beastman kin)
// and gender, drawn in every look that people can have (young, plain, each trade group used by
// the race, old). A life keeps one identity, so its pictures show the same face all its life.
// The number of identities follows how often that race and gender is on screen.
// Evolved forms get their own rows (evolution changes the body anyway).
// Run: node tools/image-sheet-rows.js <freq.json> <out.json> [target images] [cap]
const fs = require("fs");
const { loadData } = require("./load");
const { LOOKS, BODY, jobLook } = require("./looks");
const { SPRITES, STYLE } = require("./make-image-prompts");

const [freqFile, outFile] = process.argv.slice(2);
const TARGET = Number(process.argv[4] || 500);
const CAP = Number(process.argv[5] || 8);
const data = loadData();
const freq = JSON.parse(fs.readFileSync(freqFile, "utf8"));
const totalW = data.races.reduce((s, r) => s + r.weight, 0);
const jobsById = Object.fromEntries(data.jobs.map((j) => [j.id, j]));

const ORDER = ["thuongdan", "nho", "chienbinh", "phapsu", "thosan", "tho", "gia"];
const SPECIAL = {
  slime: {
    chienbinh: "a hard metallic silver slime with a tiny dented helmet on top",
    phapsu: "a purple magic slime with glowing runes floating inside its body",
    thosan: "a green poison slime dripping venom, sly eyes",
    tho: "a slime carrying small tools stuck inside its jelly body",
    thuongdan: "a plain blue slime, cute and calm",
    nho: "a tiny baby slime, very small and round",
    gia: "an old faded slime, cloudy grey jelly, droopy shape",
  },
  dragon: {
    chienbinh: "an armored war dragon with battle scars and spiked armor plates",
    phapsu: "a sage dragon with glowing runes on its scales and an ancient scroll",
    thosan: "a lean swift dragon with dark scales, built for ambush",
    tho: "a dragon with smith tools and a glowing ember forge in its claws",
    thuongdan: "a dragon sitting on a small pile of gold coins",
    nho: "a tiny baby dragon just out of the egg, eggshell pieces around",
    gia: "a very old dragon with faded scales, long white whiskers",
  },
};
const G = { nam: ["Nam", "male"], nu: ["Nữ", "female"], x: ["Vô tính", ""] };
const SAME = "Same character as the attached reference image: keep exactly the same face, body, skin, hair and color palette.";

function prompt(raceId, who, g, look, base) {
  const gEn = G[g][1];
  let what;
  if (SPECIAL[raceId]) what = SPECIAL[raceId][look] + (gEn && raceId !== "slime" ? `, ${gEn}` : "");
  else what = `${BODY[who]}${gEn ? `, ${gEn}` : ""}, ${LOOKS[look].en}`;
  if (base) return `${what}. ${STYLE}`;
  return `${SAME} Now draw this same character ${LOOKS[look].en.replace(/^as /, "as ")}. ${STYLE}`;
}

// trade looks each race really uses (seen in play, or one of its trades)
const usedLooks = {};
for (const k of Object.keys(freq.share)) {
  const m = k.match(/^(.+)_(nam|nu|x)_(.+)$/);
  if (LOOKS[m[3]]) (usedLooks[m[1]] = usedLooks[m[1]] || new Set()).add(m[3]);
}
for (const rj of freq.jobsSeen || []) {
  const [raceId, jobId] = rj.split("|");
  const j = jobsById[jobId];
  if (!j) continue;
  for (const who of Object.keys(usedLooks)) if (who === raceId || who.startsWith(raceId + "_")) usedLooks[who].add(jobLook(j));
}

// share of play per race/kin + gender (forms excluded: they have their own rows)
const groups = [];
for (const r of data.races) {
  const whos = r.subtypes && r.subtypes.length ? r.subtypes.map((s) => ({ who: `${r.id}_${s.id}`, name: `${r.name} ${s.name}` })) : [{ who: r.id, name: r.name }];
  for (const w of whos) for (const g of r.genderless ? ["x"] : ["nam", "nu"]) {
    let share = 0;
    for (const [k, v] of Object.entries(freq.share)) {
      const m = k.match(/^(.+)_(nam|nu|x)_(.+)$/);
      if (m[1] === w.who && m[2] === g && LOOKS[m[3]]) share += v;
    }
    const looks = ORDER.filter((l) => ["thuongdan", "nho", "gia"].includes(l) || (usedLooks[w.who] && usedLooks[w.who].has(l)));
    groups.push({ race: r, who: w.who, name: w.name, g, share, looks });
  }
}
// identities per group: in proportion to share, at least 1; scale found so the total is near TARGET
const count = (scale) => groups.reduce((s, x) => s + Math.min(CAP, Math.max(1, Math.round(x.share * scale))) * x.looks.length, 0);
let lo = 1, hi = 5000;
for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (count(mid) > TARGET) hi = mid; else lo = mid; }
const scale = lo;

const identities = [];
for (const x of groups) {
  const n = Math.min(CAP, Math.max(1, Math.round(x.share * scale)));
  for (let i = 1; i <= n; i++) {
    identities.push({
      code: `${x.who}_${x.g}_${i}`, raceId: x.race.id, race: x.name, raceShare: x.race.weight / totalW, gender: G[x.g][0],
      share: x.share / n, groupShare: x.share, idx: i, of: n, looks: x.looks,
      prompts: Object.fromEntries(x.looks.map((l) => [l, prompt(x.race.id, x.who, x.g, l, l === "thuongdan")])),
    });
  }
}
identities.sort((a, b) => b.raceShare - a.raceShare || a.race.localeCompare(b.race) || b.groupShare - a.groupShare || a.idx - b.idx);

// evolved forms: one picture per race/kin + gender
const forms = [];
for (const x of groups) {
  for (const [k, label, desc] of SPRITES.filter(([k]) => k.startsWith(x.race.id + "__"))) {
    const f = k.split("__")[1];
    forms.push({ code: `${x.who}_${x.g}_${f}`, raceId: x.race.id, race: x.name, raceShare: x.race.weight / totalW, gender: G[x.g][0], form: label,
      prompt: `${desc}${G[x.g][1] && x.race.id !== "slime" ? `, ${G[x.g][1]}` : ""}. ${STYLE}` });
  }
}
forms.sort((a, b) => b.raceShare - a.raceShare || a.race.localeCompare(b.race));

const LOOK_COLS = ORDER.map((l) => ({ id: l, vi: LOOKS[l].vi }));
fs.writeFileSync(outFile, JSON.stringify({ looks: LOOK_COLS, identities, forms }, null, 1));
const imgs = identities.reduce((s, x) => s + x.looks.length, 0);
console.log(`${identities.length} nhân dạng (${imgs} ảnh) + ${forms.length} ảnh tiến hóa = ${imgs + forms.length} ảnh`);
