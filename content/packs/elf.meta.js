// Elf pack: what the approved Gemini script (content/scripts/elf.txt) cannot say by itself.
const C = require("./_civil");

module.exports = {
  race: "elf",
  script: "content/scripts/elf.txt",
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },
  focusOrder: C.focusOrder,
  focus: C.FOCUS,
  roles: C.roles("elf", [
    ["ranger", "Ranger", "AGI", true, ["Ranger Novice", "Deep Forest Scout", "Gale Archer", "Master Ranger", "Legend of the Great Forest"], "Nhanh nhẹn. Tuần lâm Đại Ngàn"],
    ["spirit", "Spirit Caller", "INT", true, ["Wind Caller", "Spirit Contractor", "Elemental Master", "High Spirit Caller", "Avatar of Yggdrasil"], "Trí tuệ. Tinh Linh Sư khế ước với nguyên tố"],
    ["herb", "Herbalist", "INT", false, ["Herb Gatherer", "Apothecary", "Poison Master", "Forest Saint Healer", "Sage of Life"], "Trí tuệ. Thảo dược sư Yggdrasil"],
    ["bard", "Bard", "LUCK", false, ["Lute Strummer", "Storyteller", "Arcane Musician", "High Bard", "Heir of Poetry"], "May mắn. Hát rong tinh tuyến"],
    ["guard", "Yggdrasil Guardian", "STR", true, ["Forest Edge Sentry", "Emerald Guard", "Shield Knight", "High Guardian", "Undying Bastion"], "Sức mạnh. Hộ vệ Cây Thế Giới"],
    ["wood", "Holy Woodcarver", "AGI", false, ["Workshop Apprentice", "Spirit Carver", "Master Woodcarver", "Yggdrasil Artisan", "Hand of the Tree God"], "Nhanh nhẹn. Thợ điêu khắc gỗ thánh"],
    ["envoy", "Nature Envoy", "INT", false, ["Envoy Attendant", "Negotiator", "Ambassador of the Sacred Wood", "Council Advisor", "Voice of Yggdrasil"], "Trí tuệ. Sứ giả ngoại giao của rừng"],
  ]),
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { elf_ranger_: "elf_ranger", elf_spirit_: "elf_spirit", elf_herb_: "elf_herb", elf_bard_: "elf_bard", elf_guard_: "elf_guard", elf_wood_: "elf_wood", elf_envoy_: "elf_envoy" },
  focusByPrefix: { elf_play_: "play", elf_study_: "study", elf_train_: "train", elf_work_: "work", elf_adv_: "adventure", elf_soc_: "social", elf_rest_: "rest" },
  org: C.guildOrg("elf_guild"),
  decline: { label: "Thôi, để lần sau", text: "Bạn khẽ lắc đầu. Với một Elf, cơ hội luôn có thể chờ thêm vài thập kỷ." },
  evos: [],
  systems: {},
  overrides: {},
};
