// Dwarf pack: what the approved Gemini script (content/scripts/dwarf.txt) cannot say by itself.
const C = require("./_civil");

module.exports = {
  // a dwarf child grows like a human one; the long years come after
  scriptStages: "engine", // the script was written with the old, lifespan-based ages
  stages: [
    { id: "infant", name: "Sơ sinh", start: 0 },
    { id: "child", name: "Thơ ấu", start: 3 },
    { id: "teen", name: "Thiếu niên", start: 13 },
    { id: "adult", name: "Trưởng thành", start: 25 },
    { id: "middle", name: "Trung niên", start: 96 },
    { id: "elder", name: "Tuổi già", start: 140 },
  ],
  race: "dwarf",
  script: "content/scripts/dwarf.txt",
  story: "content/scripts/dwarf_story.txt",
  exclusive: true,
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },
  focusOrder: C.focusOrder,
  focus: C.FOCUS,
  // ranks: the script's English names (Apprentice … Divine Smith)
  roles: C.roles("dwarf", [
    ["runesmith", "Rune Smith", "STR", false, null, "Sức mạnh và Trí tuệ. Thợ rèn khắc cổ ngữ"],
    ["miner", "Master Miner", "STR", false, null, "Sức mạnh. Thợ mỏ Răng Cưa"],
    ["shield", "Shield Warrior", "STR", true, null, "Sức mạnh. Chiến binh khiên"],
    ["brew", "Brewmaster", "LUCK", false, null, "May mắn. Thợ nấu bia"],
    ["eng", "Mech Engineer", "INT", false, null, "Trí tuệ. Kỹ sư cơ khí hơi nước"],
    ["carver", "Stone Carver", "INT", false, null, "Trí tuệ. Nghệ nhân khắc đá"],
    ["merchant", "Gem Merchant", "INT", false, null, "Trí tuệ. Thương gia đá quý"],
    ["guard", "Mountain Guard", "STR", true, null, "Sức mạnh và Nhanh nhẹn. Lính gác cổng núi"],
    ["hunter", "Treasure Hunter", "AGI", true, null, "Nhanh nhẹn. Thợ săn kho báu hầm ngục"],
  ]).map((r) => (r.ranks ? r : (delete r.ranks, r))),
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { dwarf_runesmith_: "dwarf_runesmith", dwarf_miner_: "dwarf_miner", dwarf_shield_: "dwarf_shield", dwarf_brew_: "dwarf_brew", dwarf_eng_: "dwarf_eng", dwarf_carver_: "dwarf_carver", dwarf_merchant_: "dwarf_merchant", dwarf_guard_: "dwarf_guard", dwarf_hunter_: "dwarf_hunter" },
  focusByPrefix: { dwarf_play_: "play", dwarf_study_: "study", dwarf_train_: "train", dwarf_work_: "work", dwarf_adv_: "adventure", dwarf_social_: "social", dwarf_rest_: "rest" },
  org: C.guildOrg("dwarf_guild"),
  decline: { label: "Thôi, để lần sau", text: "Bạn vuốt râu, nốc cạn vại bia. Việc này để mai tính." },
  evos: [],
  systems: {
    noRecruit: true,},
  overrides: {},
};
