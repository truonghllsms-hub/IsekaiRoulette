// What a character looks like on screen, for picking a sprite: race (or Beastman kin), gender,
// and a "look": young, old, an evolved form, or one of five trade groups. Shared by the game
// (ui.js keeps a copy of spriteKey's rules) and the image tools.
const LOOKS = {
  nho: { vi: "Lúc nhỏ", en: "as a small child, plain simple clothes, no weapon, curious pose" },
  thuongdan: { vi: "Thường dân", en: "as an ordinary commoner, simple everyday clothes, carrying a small walking stick or bag" },
  chienbinh: { vi: "Chiến binh", en: "as a warrior, armor, melee weapon (sword, axe or spear) and shield" },
  phapsu: { vi: "Pháp sư", en: "as a mage or priest, long robe, magic staff or holy symbol, faint magic glow" },
  thosan: { vi: "Thợ săn / sát thủ", en: "as a hunter, scout or rogue, light leather armor, hood, bow or twin daggers" },
  tho: { vi: "Thợ / lao động", en: "as a craftsman or worker, apron or work clothes, hammer, pickaxe or tools" },
  gia: { vi: "Tuổi già", en: "as an old elder, wrinkled, grey or white hair, hunched, leaning on a staff" },
};

// trade → look, by name; the order matters (first match wins)
const RULES = [
  ["phapsu", /pháp|mage|priest|shaman|warlock|caller|scribe|scholar|học giả|archmage|sage|envoy|chấp sự|awakened|serpent priest|venom master|magic slime/i],
  ["thosan", /assassin|ranger|scout|thief|hunter|spy|blade|stalker|rider|trapper|sniffer|trickster|tamer|hidden one|poison slime/i],
  ["tho", /blacksmith|smith|thương nhân|merchant|nông dân|miner|leatherworker|herder|brewmaster|engineer|carver|herbalist|tinker|drudge|egg watcher/i],
  ["chienbinh", /kiếm sĩ|warrior|berserker|gladiator|knight|kỵ sĩ|lính|mercenary|guard|guardian|general|sentinel|overseer|bridge troll|war dragon|metal slime|abyssal lord/i],
];
function jobLook(job) {
  const t = `${job.id || ""} ${job.name || ""}`;
  for (const [look, re] of RULES) if (re.test(t)) return look;
  return "thuongdan"; // nobles, bards, familiars, hoarders: their everyday look
}

const AGE = { infant: "nho", child: "nho", teen: null, adult: null, middle: null, elder: "gia", ancient: "gia" };
const slug = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
const genderCode = (g) => (g === "male" ? "nam" : g === "female" ? "nu" : "x");

// the exact sprite group a character fits right now
function spriteKey(c, look) {
  const who = c.subtype ? `${c.race.id}_${c.subtype}` : c.race.id;
  return `${who}_${genderCode(c.gender)}_${look}`;
}
function lookOf(c, stageId, jobsById) {
  if (c.form) return slug(c.form);
  if (AGE[stageId]) return AGE[stageId];
  if (c.job) return jobLook(jobsById[c.job.id] || c.job);
  return "thuongdan";
}

module.exports = { LOOKS, jobLook, lookOf, spriteKey, slug, genderCode };

// body only (clothes and weapon come from the look)
const BODY = {
  human: "a human",
  beastman_cat: "a cat-folk beastman with cat ears and a long tail",
  beastman_dog: "a dog-folk beastman with floppy dog ears and a tail",
  beastman_wolf: "a wolf-folk beastman with a grey wolf head and tail",
  beastman_fox: "a fox-folk beastman with orange fox ears and a big bushy tail",
  beastman_rabbit: "a rabbit-folk beastman with long rabbit ears",
  beastman_tiger: "a tiger-folk beastman with a striped tiger head, very muscular",
  beastman_bear: "a bear-folk beastman with round bear ears, large and bulky",
  beastman_rat: "a rat-folk beastman with round rat ears and a thin tail, hunched",
  beastman_hawk: "a hawk-folk beastman with a hawk head, sharp beak and feathered arms",
  dwarf: "a stout dwarf, very short and broad, braided beard (for a woman: thick braids, no beard)",
  demon: "a demon with dark red skin, two curved horns and glowing yellow eyes",
  elf: "a slender elf with long pointed ears and long hair",
  goblin: "a small green goblin with big pointed ears, long nose and sharp teeth",
  slime: "a round blue slime blob, translucent jelly body, two simple dot eyes",
  kobold: "a small kobold, dog-lizard creature with a scaly snout, small horns and brown scales",
  lizardman: "a lizardman, green scaly reptile humanoid with a long tail",
  vampire: "a vampire with pale skin, red eyes and small fangs",
  imp: "a tiny imp with red skin, small bat wings, short horns and a pointed tail",
  orc: "an orc with green skin, big lower tusks and a muscular build",
  minotaur: "a minotaur, bull head with large horns on a giant muscular body",
  troll: "a troll, huge hunched grey-green giant with mossy warty skin and long arms",
  dragon: "a red dragon standing on its hind legs, wings folded, horns, scaly belly",
  high_demon: "a high demon, tall and elegant, black horns and purple skin",
};
module.exports.BODY = BODY;
