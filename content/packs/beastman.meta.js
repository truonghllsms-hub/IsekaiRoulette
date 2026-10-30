// Beastman pack: what the approved Gemini script (content/scripts/beastman.txt) cannot say by itself.
const C = require("./_civil");

module.exports = {
  race: "beastman",
  script: "content/scripts/beastman.txt",

  // nine animal kins, rolled at birth with the script's shares and suggested stats ("Sức khỏe +1" = +5 health)
  subtypes: [
    { id: "cat", word: "Mèo", name: "tộc Mèo", weight: 18, stats: { AGI: 2, LUCK: 1, STR: -1 } },
    { id: "dog", word: "Chó", name: "tộc Chó", weight: 18, stats: { STR: 1, INT: -1 }, health: 5 },
    { id: "wolf", word: "Sói", name: "tộc Sói", weight: 14, stats: { STR: 1, AGI: 1, INT: -1 } },
    { id: "fox", word: "Cáo", name: "tộc Cáo", weight: 10, stats: { INT: 2, LUCK: 1, STR: -2 } },
    { id: "rabbit", word: "Thỏ", name: "tộc Thỏ", weight: 10, stats: { AGI: 3, LUCK: 1, STR: -2, INT: -1 } },
    { id: "tiger", word: "Hổ", name: "tộc Hổ", weight: 8, stats: { STR: 3, INT: -1, AGI: -1 }, health: 5 },
    { id: "bear", word: "Gấu", name: "tộc Gấu", weight: 8, stats: { STR: 2, AGI: -2, INT: -1 }, health: 15 },
    { id: "rat", word: "Chuột", name: "tộc Chuột", weight: 8, stats: { LUCK: 2, AGI: 2, STR: -2 }, health: -5 },
    { id: "hawk", word: "Ưng", name: "tộc Ưng", weight: 6, stats: { AGI: 3, LUCK: 1 }, health: -10 },
  ],

  rename: [
    ["Beastman cùng dạng với bạn", "Beastman"],
  ],
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },
  focusOrder: C.focusOrder,
  focus: C.FOCUS,
  roles: C.roles("bm", [
    ["berserker", "Berserker", "STR", true, ["Frenzied One", "Bloodthirsty Warrior", "Ripper", "Battlefield Butcher", "Blood General"], "Sức mạnh. Cuồng Chiến Sĩ"],
    ["hunter", "Steppe Hunter", "AGI", true, ["Hunter Apprentice", "Trapper", "One-eyed Archer", "Steppe Phantom", "King of the Hunt"], "Nhanh nhẹn. Thợ săn thảo nguyên"],
    ["gladiator", "Gladiator", "STR", true, ["Sand Slave", "Bloodletter", "Sellsword Duelist", "Nightmare of the Crowd", "Arena King"], "Sức mạnh. Đấu sĩ Huyết Sa"],
    ["scout", "Scout", "AGI", true, ["Camp Sentry", "Eyes of the Pack", "Steppe Shade", "Night Hawk", "Battlefield Phantom"], "Nhanh nhẹn. Trinh sát đột kích"],
    ["shaman", "Shaman", "INT", false, ["Wind Listener", "Tribal Shaman", "Spirit Communer", "Wild High Priest", "Envoy of Yggdrasil"], "Trí tuệ. Vu sư tinh linh"],
    ["merc", "Silver Wolf Mercenary", "STR", true, ["Spearman", "Veteran Mercenary", "Caravan Guard", "Vanguard Captain", "Silver Wolf Bloodeye"], "Sức mạnh. Lính đánh thuê Sói Bạc"],
    ["leather", "Leatherworker", "STR", false, ["Hide Scraper", "Veteran Tanner", "Stitch Artisan", "Dragonscale Master", "Blood-rite Armorer"], "Sức mạnh. Thợ thuộc da"],
    ["herder", "Beast Herder", "LUCK", false, ["Shepherd Kid", "Herd Caller", "Tamer", "Lord of the Steppe", "Envoy of All Beasts"], "May mắn. Kẻ chăn thú du mục"],
    ["thief", "Thief", "AGI", true, ["Pickpocket", "Alley Ghost", "Full-moon Thief", "Shadow Blade", "King of the Underworld"], "Nhanh nhẹn. Đạo tặc thành thị"],
    ["mage", "Tribal Mage", "INT", true, ["Rune Initiate", "Tribal Mage", "Hexer", "Wild Elemental Master", "Mountain Sage"], "Trí tuệ. Pháp sư chú thuật"],
    ["courier", "Courier", "AGI", false, ["Flag Runner", "Steppe Courier", "Cross-line Carrier", "Stormwing", "Divine Runner"], "Nhanh nhẹn. Người đưa tin xuyên lục địa"],
  ]),
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { bm_berserker_: "bm_berserker", bm_hunter_: "bm_hunter", bm_gladiator_: "bm_gladiator", bm_scout_: "bm_scout", bm_shaman_: "bm_shaman", bm_merc_: "bm_merc", bm_leather_: "bm_leather", bm_herder_: "bm_herder", bm_thief_: "bm_thief", bm_mage_: "bm_mage", bm_courier_: "bm_courier" },
  focusByPrefix: { bm_play_: "play", bm_study_: "study", bm_train_: "train", bm_work_: "work", bm_adv_: "adventure", bm_soc_: "social", bm_rest_: "rest" },
  // the script's missions give no rank points: fame does the climbing
  org: C.guildOrg("bm_guild", { fameToPts: 0.35 }),
  decline: { label: "Thôi, để lần sau", text: "Bạn vẫy đuôi lùi lại. Bản năng mách bảo chưa phải lúc." },
  evos: [],
  systems: {},
  overrides: {},
};
