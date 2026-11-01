// Rows for the sprite worksheet: every sprite group a player can meet (race or Beastman kin ×
// gender × look), how often it is on screen, how many variants to draw, and the prompt.
// Run: node tools/image-sheet-rows.js <freq.json> <out.json> [budget] [cap]
// freq.json comes from a simulation of many lives (share of clicks per sprite key).
const fs = require("fs");
const { loadData } = require("./load");
const { LOOKS, BODY, slug } = require("./looks");
const { SPRITES, STYLE } = require("./make-image-prompts");

const [freqFile, outFile] = process.argv.slice(2);
const BUDGET = Number(process.argv[4] || 400);
const CAP = Number(process.argv[5] || 8);
const data = loadData();
const freq = JSON.parse(fs.readFileSync(freqFile, "utf8")).share;
const formDesc = Object.fromEntries(SPRITES.filter(([k]) => k.includes("__")).map(([k, , d]) => [k, d]));
const totalW = data.races.reduce((s, r) => s + r.weight, 0);

// races whose body does not wear clothes: the trade shows another way
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

function parse(key) {
  // <who>_<g>_<look>; who may be "beastman_cat" or "high_demon"
  const m = key.match(/^(.+)_(nam|nu|x)_(.+)$/);
  return { who: m[1], g: m[2], look: m[3] };
}

const rows = {};
for (const [key, share] of Object.entries(freq)) rows[key] = { key, share, ...parse(key) };
// every race or kin also gets its young, plain and old look and each evolved form, even when rare
for (const r of data.races) {
  const whos = r.subtypes && r.subtypes.length ? r.subtypes.map((s) => `${r.id}_${s.id}`) : [r.id];
  const gs = r.genderless ? ["x"] : ["nam", "nu"];
  const forms = SPRITES.filter(([k]) => k.startsWith(r.id + "__")).map(([k]) => k.split("__")[1]);
  for (const who of whos) for (const g of gs) for (const look of ["nho", "thuongdan", "gia", ...forms]) {
    const key = `${who}_${g}_${look}`;
    if (!rows[key]) rows[key] = { key, share: 0, who, g, look };
  }
}

const out = [];
for (const row of Object.values(rows)) {
  const race = data.races.find((r) => row.who === r.id || row.who.startsWith(r.id + "_"));
  const sub = race.subtypes && race.subtypes.find((s) => row.who === `${race.id}_${s.id}`);
  const form = SPRITES.find(([k]) => k === `${race.id}__${row.look}`);
  const lookVi = form ? form[1] : LOOKS[row.look].vi;
  const raceVi = sub ? `${race.name} ${sub.name}` : race.name;
  const [gVi, gEn] = G[row.g];
  let what;
  if (form) what = `${formDesc[form[0]]}${gEn ? `, ${gEn}` : ""}`;
  else if (SPECIAL[race.id]) what = SPECIAL[race.id][row.look] + (gEn && race.id !== "slime" ? `, ${gEn}` : "");
  else what = `${BODY[row.who]}${gEn ? `, ${gEn}` : ""}, ${LOOKS[row.look].en}`;
  const count = Math.min(CAP, Math.max(1, Math.round(row.share * BUDGET)));
  out.push({
    code: row.key, raceId: race.id, race: raceVi, raceShare: race.weight / totalW, look: row.look, lookVi, gender: gVi,
    who: `${raceVi} · ${lookVi}`, share: row.share, count, prompt: `${what}. ${STYLE}`,
  });
}
// by race (most rolled first), then by how often the look is seen
out.sort((a, b) => b.raceShare - a.raceShare || a.race.localeCompare(b.race) || b.share - a.share);
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log(`${out.length} dòng, ${out.reduce((s, r) => s + r.count, 0)} ảnh`);
