// Demon pack: what the approved Gemini script (content/scripts/demon.txt) cannot say by itself.
const C = require("./_civil");

module.exports = {
  // demons grow up fast; their long life is spent grown
  scriptStages: "engine", // the script was written with the old, lifespan-based ages
  stages: [
    { id: "infant", name: "Sơ sinh", start: 0 },
    { id: "child", name: "Thơ ấu", start: 3 },
    { id: "teen", name: "Thiếu niên", start: 12 },
    { id: "adult", name: "Trưởng thành", start: 22 },
    { id: "middle", name: "Trung niên", start: 220 },
    { id: "elder", name: "Tuổi già", start: 320 },
  ],
  race: "demon",
  script: "content/scripts/demon.txt",
  story: "content/scripts/demon_story.txt",
  exclusive: true,
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },
  focusOrder: C.focusOrder,
  focus: Object.assign({}, C.FOCUS, { adventure: Object.assign({}, C.FOCUS.adventure, { tags: null }) }),
  roles: C.roles("demon", [
    ["dk", "Dark Knight", "STR", true, ["Recruit", "Dark Knight", "Blood Knight", "Death Knight", "Abyss Knight"], "Sức mạnh. Kỵ sĩ giáp đen lửa hỏa ngục"],
    ["wl", "Warlock", "INT", true, ["Dark Disciple", "Hexer", "Abyssal Mage", "Curse Lord", "Archmage of Chaos"], "Trí tuệ. Ma pháp nguyên thủy của Vực Thẳm"],
    ["bu", "Chấp Sự Ma Giới", "INT", false, ["Petty Tax Collector", "Logistics Deacon", "Inspector", "Grand Advisor", "Minister of the Demon Realm"], "Trí tuệ. Quan lại cai trị bằng mưu kế"],
    ["me", "Blood Merchant", "INT", false, ["Peddler", "Black Market Dealer", "Magic-tool Shopkeeper", "Smuggling Boss", "Merchant Lord"], "Trí tuệ và Nhanh nhẹn. Buôn lõi mana và ma cụ cấm"],
    ["bs", "Hell Forge Blacksmith", "STR", false, ["Bellows Boy", "Apprentice Smith", "Hellfire Artisan", "Demon-arms Master", "Forge Lord"], "Sức mạnh. Thợ rèn ma khí"],
    ["bh", "Bounty Hunter", "AGI", true, ["Tracker", "Night Hunter", "Exiled Assassin", "Abyss Phantom", "Reaper on the Hunt"], "Nhanh nhẹn. Săn tiền thưởng của Ma Vương"],
    ["spy", "Parasite Spy", "AGI", false, ["Village Shade", "Impostor", "Infiltrated Noble", "Spy of Light", "Master Parasite"], "Nhanh nhẹn. Điệp viên nằm vùng trong lốt Human"],
  ]),
  promoXp: [4, 8, 14, 22],
  roleByPrefix: { demon_dk_: "demon_dk", demon_wl_: "demon_wl", demon_bu_: "demon_bu", demon_me_: "demon_me", demon_bs_: "demon_bs", demon_bh_: "demon_bh", demon_spy_: "demon_spy" },
  focusByPrefix: { demon_play_: "play", demon_study_: "study", demon_train_: "train", demon_work_: "work", demon_adv_: "adventure", demon_soc_: "social", demon_rest_: "rest" },
  org: C.guildOrg("demon_army", {
    name: "Quân đoàn Ma Vương",
    auto: true,
    missionWord: "quân lệnh",
    join: [],
    joinMoment: undefined,
    rankUp: {
      1: "Hạng E. Bạn được phát bộ giáp đen đầu tiên, vẫn còn vết máu của kẻ mặc trước.",
      2: "Hạng D. Bạn được giao chỉ huy một tiểu đội Imp và lũ Goblin ma hóa.",
      3: "Hạng C. Tên bạn được ghi vào sổ quân công của Quân đoàn Ma Vương.",
      4: "Hạng B. Các tướng lĩnh bắt đầu gọi bạn vào lều chỉ huy.",
      5: "Hạng A. Cờ hiệu riêng của bạn tung bay trên tiền tuyến.",
      6: "Hạng S. Ma Vương đích thân gọi tên bạn giữa ngai điện.",
    },
    board: {
      text: ["Một Imp đưa tin thả xuống trước mặt bạn cuộn quân lệnh niêm sáp đen.", "Tù và rúc lên khắp doanh trại. Quân đoàn có việc cần đến bạn."],
      skip: "Cáo bệnh, ở lại doanh trại",
      skipText: "Bạn quấn băng lên một vết thương không có thật. Sĩ quan nhìn bạn đầy khinh bỉ rồi bỏ đi.",
    },
    failText: "Bạn trở về doanh trại tay trắng. Sĩ quan ghi tên bạn vào sổ phạt.",
  }),
  decline: { label: "Thôi, để lần sau", text: "Bạn nghiến răng lùi lại. Ở Ma giới, kẻ kiên nhẫn sống lâu hơn." },
  evos: [],
  systems: {
    // the Legion recruits from the Abyss, not from the Church's knights
    companions: [
      { race: "Demon", names: "demon", job: "Dark Knight", stat: "STR", weight: 4 },
      { race: "Demon", names: "demon", job: "Warlock", stat: "INT", weight: 2 },
      { race: "Demon", names: "demon", job: "Bounty Hunter", stat: "AGI", weight: 2 },
      { race: "Imp", names: "imp", job: "Imp Trickster", stat: "AGI", weight: 3 },
      { race: "Imp", names: "imp", job: "Familiar", stat: "LUCK", weight: 1 },
      { race: "Orc", names: "orc", job: "Orc Berserker", stat: "STR", weight: 2 },
      { race: "Goblin", names: "goblin", job: "Goblin Shaman", stat: "INT", weight: 1 },
      { race: "Ghoul", names: "ghoul", job: "Grave Sentinel", stat: "STR", weight: 1 },
    ],
    noRecruit: true,},
  overrides: {},
};
