// Writes prompts/images.md: one prompt per character sprite (race, Beastman kin, evolved form),
// each with the exact file name to save it under. All prompts share one style block so the set
// looks like one game. Run: node tools/make-image-prompts.js
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

// The look of the reference sprite (goblin with sword and shield).
const STYLE =
  "16-bit pixel art game sprite, single character only, full body, standing idle pose, 3/4 view facing right, " +
  "holding its typical weapon or tool, thick dark outline, limited color palette, simple cel shading, crisp hard-edged pixels, " +
  "no anti-aliasing, retro SNES RPG style, centered, plain flat solid light grey background (#c8c8c8), " +
  "no ground, no shadow, no scenery, no text, no frame";

// key → [Vietnamese label, English description]. Keys become file names: <key>.png
const SPRITES = [
  ["human", "Human", "a young human adventurer, short brown hair, leather armor over a tunic, cloak, short sword and round wooden shield"],
  ["beastman_cat", "Beastman tộc Mèo", "a cat-folk beastman, cat ears and long tail, slim agile build, light leather vest, twin daggers"],
  ["beastman_dog", "Beastman tộc Chó", "a dog-folk beastman, floppy dog ears and tail, loyal sturdy build, padded armor, spear"],
  ["beastman_wolf", "Beastman tộc Sói", "a wolf-folk beastman, grey wolf head, muscular, fur cloak and tribal bone necklace, curved sword"],
  ["beastman_fox", "Beastman tộc Cáo", "a fox-folk beastman, orange fox ears and big bushy tail, sly smile, shrine robe, paper talisman and short staff"],
  ["beastman_rabbit", "Beastman tộc Thỏ", "a rabbit-folk beastman, long rabbit ears, small and quick, simple traveler clothes, sling and pouch"],
  ["beastman_tiger", "Beastman tộc Hổ", "a tiger-folk beastman, striped tiger head, huge muscles, bare chest with sash, heavy greatsword"],
  ["beastman_bear", "Beastman tộc Gấu", "a bear-folk beastman, round bear ears, very large and bulky, fur clothing, big wooden club"],
  ["beastman_rat", "Beastman tộc Chuột", "a rat-folk beastman, round rat ears and thin tail, hunched, ragged hooded cloak, rusty knife"],
  ["beastman_hawk", "Beastman tộc Ưng", "a hawk-folk beastman, hawk head with sharp beak, feathered wings on the arms, light armor, longbow"],
  ["dwarf", "Dwarf", "a stout dwarf, very short and broad, long braided red beard, iron helmet and chainmail, war hammer"],
  ["demon", "Demon", "a demon warrior, dark red skin, two curved horns, glowing yellow eyes, spiked black armor, jagged sword"],
  ["elf", "Elf", "a slender elf ranger, long pointed ears, long blond hair, green hooded cloak, wooden longbow"],
  ["goblin", "Goblin", "a small green goblin, big pointed ears, long nose, sharp teeth, ragged loincloth, rusty short sword and small round shield"],
  ["goblin__hobgoblin", "Hobgoblin", "a hobgoblin, taller and muscular green goblin warrior, crude iron armor plates, big notched sword and shield"],
  ["goblin__goblin_shaman_lord", "Goblin Shaman Lord", "a goblin shaman lord, green goblin in bone mask and feather headdress, tattered robe, skull-topped staff with green glow"],
  ["goblin__goblin_king", "Goblin King", "a goblin king, large green goblin with a crooked golden crown, fur mantle, heavy armor, big cleaver"],
  ["slime", "Slime", "a small round blue slime blob, translucent jelly body, two simple dot eyes, cute"],
  ["slime__slime_king", "Slime King", "a giant blue king slime, translucent jelly body with a small golden crown on top, glowing core inside"],
  ["slime__elemental_slime", "Elemental Slime", "an elemental slime, jelly body half fire half ice, glowing orange and cyan, sparks around it"],
  ["slime__humanoid_slime", "Humanoid Slime", "a humanoid slime, translucent blue jelly shaped like a young person, liquid hair, faint glowing core in the chest"],
  ["kobold", "Kobold", "a small kobold, dog-lizard creature with scaly snout and small horns, brown scales, miner clothes, pickaxe and candle helmet"],
  ["kobold__kobold_elite", "Kobold Elite", "a kobold elite, bigger kobold with scaly snout, scrap metal armor, spear and small shield"],
  ["kobold__dragonblood_kobold", "Dragonblood Kobold", "a dragonblood kobold, red scales, small dragon wings and horns, glowing ember eyes, fire in one hand"],
  ["lizardman", "Lizardman", "a lizardman warrior, green scaly reptile humanoid, long tail, bone necklace, fishing spear"],
  ["lizardman__swamp_dragonewt", "Swamp Dragonewt", "a swamp dragonewt, dark green dragon-like reptile warrior, small wings and horns, scale armor, heavy trident"],
  ["lizardman__high_serpent_priest", "High Serpent Priest", "a high serpent priest, lizardman in long purple robes, snake-headed staff, golden jewelry, glowing eyes"],
  ["vampire", "Vampire", "a young vampire, pale skin, red eyes, small fangs, black hair, dark coat with high collar, thin rapier"],
  ["vampire__vampire_noble", "Vampire Noble", "a vampire noble, aristocrat with slicked back hair, red and black cape, elegant suit, wine glass and rapier"],
  ["vampire__true_ancestor", "True Ancestor", "a true ancestor vampire lord, very pale, long silver hair, bat-wing cape, crimson armor, blood magic aura"],
  ["vampire__daywalker", "Daywalker", "a daywalker vampire hunter, pale skin, red eyes, wide hat and long leather coat, crossbow and silver sword"],
  ["imp", "Imp", "a tiny imp, red skin, small bat wings, short horns, pointed tail, mischievous grin, little pitchfork"],
  ["imp__greater_demon", "Greater Demon", "a greater demon grown from an imp, tall red demon with large bat wings, big horns, burning fists"],
  ["imp__free_imp", "Free Imp", "a free imp, grey skin, bat wings, broken chain cuff on one wrist, travel scarf, carrying a stolen coin bag"],
  ["orc", "Orc", "an orc warrior, green skin, big lower tusks, muscular, leather and fur armor, war axe"],
  ["orc__high_orc", "High Orc", "a high orc, dark green skin, tall and disciplined, iron armor with clan emblem, large two-handed axe"],
  ["orc__orc_warlord", "Orc Warlord", "an orc warlord, huge green orc with skull pauldrons, horned helmet, scarred, giant cleaver and war banner"],
  ["minotaur", "Minotaur", "a minotaur, bull head with large horns, giant muscular body, nose ring, loincloth, huge double-bladed axe"],
  ["minotaur__golden_minotaur", "Golden Minotaur", "a golden minotaur, shining golden fur and horns, ornate gold armor, glowing golden axe"],
  ["minotaur__mythical_minotaur", "Mythical Minotaur", "a mythical minotaur, dark bull titan with glowing rune tattoos, fiery eyes, chained labyrinth key, colossal axe"],
  ["troll", "Troll", "a troll, huge hunched grey-green giant, mossy warty skin, long arms, tiny dumb eyes, big tree-trunk club"],
  ["troll__stone_troll", "Stone Troll", "a stone troll, troll made of grey rock, cracked stone skin with moss, boulder fists"],
  ["troll__ancient_ice_troll", "Ancient Ice Troll", "an ancient ice troll, pale blue skin, icicles and frost beard, huge ice club"],
  ["ghoul", "Ghoul", "a ghoul, gaunt undead corpse with grey rotting skin, long sharp claws, torn rags, hungry hunched pose"],
  ["ghoul__ghast", "Ghast", "a ghast, stronger ghoul with dark purple-grey skin, glowing green eyes, long claws, toxic mist around it"],
  ["ghoul__lich", "Lich", "a lich, skeletal undead sorcerer in tattered black and purple robes, crown, glowing eyes, staff with a soul gem"],
  ["dragon", "Dragon", "a young red dragon, standing on hind legs, wings folded, horns, scaly belly, small flame from the mouth"],
  ["dragon__ancient_dragon", "Ancient Dragon", "an ancient dragon, massive old dragon with dark crimson scales, many horns, battle scars, wings spread"],
  ["dragon__dragon_god", "Dragon God", "a dragon god, majestic white and gold dragon, glowing runes on the scales, halo of light, wings spread"],
  ["high_demon", "High Demon", "a high demon noble, tall and elegant, black horns, purple skin, regal black armor with cape, dark flame sword"],
  ["high_demon__demon_king", "Demon King", "a demon king, imposing demon with huge horns and dark crown, heavy black and gold armor, cape, greatsword"],
  ["high_demon__demon_god", "Demon God", "a demon god, towering demon with six wings, burning crown, dark cosmic aura, glowing eyes"],
];

const lines = [
  "# Ảnh nhân vật (pixel art) — danh sách tạo ảnh",
  "",
  `Tổng: **${SPRITES.length} ảnh**. Mỗi mục: dán **prompt** vào công cụ tạo ảnh, lưu ảnh đúng **tên file** ghi bên cạnh.`,
  "",
  "Cách làm:",
  "1. Mở công cụ tạo ảnh (Gemini, ChatGPT, Midjourney…). Nếu công cụ cho đính kèm ảnh mẫu, đính kèm ảnh goblin mẫu để giữ phong cách.",
  "2. Dán prompt, chọn tỉ lệ vuông (1:1). Chưa ưng thì tạo lại, ảnh nào hợp nhất thì lưu.",
  "3. Lưu ảnh với **đúng tên file** (vd `goblin__hobgoblin.png`). Đuôi .png, .jpg hay .webp đều được.",
  "4. Xong một đợt (không cần đủ cả bộ): nén tất cả vào 1 file .zip rồi gửi vào khung chat.",
  "",
  "Không cần xóa nền: script sẽ tự xóa nền xám, cắt sát nhân vật và thu nhỏ.",
  "",
  "---",
  "",
];
let group = "";
for (const [key, label, desc] of SPRITES) {
  const race = key.split(/__|_(?=cat|dog|wolf|fox|rabbit|tiger|bear|rat|hawk)/)[0];
  if (race !== group) { group = race; lines.push(`## ${race}`, ""); }
  lines.push(`### ${label} → \`${key}.png\``, "", "```", `${desc}. ${STYLE}`, "```", "");
}
fs.writeFileSync(path.join(ROOT, "prompts", "images.md"), lines.join("\n"));
fs.writeFileSync(path.join(ROOT, "prompts", "images.json"), JSON.stringify(SPRITES.map(([key, label, desc]) => ({ key, label, prompt: `${desc}. ${STYLE}` })), null, 2));
console.log(`Đã viết prompts/images.md (${SPRITES.length} ảnh)`);

module.exports = { SPRITES };
