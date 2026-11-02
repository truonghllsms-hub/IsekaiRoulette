// Lizardman pack: what the approved Gemini script (content/scripts/lizardman.txt) cannot say by itself.
module.exports = {
  race: "lizardman",
  script: "content/scripts/lizardman.txt",
  story: "content/scripts/lizardman_story.txt",
  exclusive: true,
  useScriptStages: true,
  // the script's old-age events run to 60+ (Cổ thằn lằn from 45)
  lifespan: [55, 65],

  rename: [
    ["Bán Long Đầm Lầy", "Swamp Dragonewt"],
    ["bọn yêu tinh", "bọn Goblin"],
    ["Đại Tư Tế Tà Thần", "High Serpent Priest"],
  ],

  stageNames: { infant: "Nòng Nọc Vảy Sừng", child: "Thợ Săn Đầm Lầy", teen: "Chiến Binh Gai Độc", adult: "Thủ Lĩnh Bộ Lạc", middle: "Tư Tế Tà Thần", elder: "Cổ Thằn Lằn" },
  stagePhrases: { "con non": "infant,child" },
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"],
  focus: {
    play: { name: "Bơi lặn và săn cá", desc: "Nhanh nhẹn, Sức mạnh; lặn sâu dưới đầm lầy", stages: ["infant", "child", "teen", "adult"], gains: { AGI: 0.25, STR: 0.1 }, bars: { joy: 1 } },
    study: { name: "Học lời tiên tri của Tư tế", desc: "Trí tuệ; nghe lời Tà thần qua miệng Tư tế", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; giáo, đuôi và nanh vuốt", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Phục dịch bộ lạc", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["child", "teen", "adult", "middle", "elder"] },
    adventure: { name: "Đi săn người", desc: "Theo bộ lạc đi săn, leo thứ bậc", stages: ["teen", "adult", "middle"], tags: null },
    social: { name: "Tranh quyền", desc: "Thách đấu, kết bè, giành bạn đời", stages: ["teen", "adult", "middle", "elder"] },
    rest: { name: "Phơi nắng nghỉ ngơi", desc: "Hồi sức trên tảng đá ấm", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 1 } },
  },

  roles: [
    { title: "LIZARDMAN WARRIOR", id: "lizard_warrior", name: "Lizardman Warrior", stat: "STR", combat: true,
      require: { STR: 5 }, alt: { anyFlags: ["swamp_born", "escaped_slave"], hint: "sinh ra ở đầm lầy hoặc từng là nô lệ trốn chạy" },
      desc: "Sức mạnh. Chiến binh giáo vảy sừng", income: [0.8, 1.2, 1.8, 2.6, 3.4], hazard: 2, gains: { STR: 0.35 } },
    { title: "SWAMP HUNTER", id: "lizard_hunter", name: "Swamp Hunter", stat: "AGI", combat: true,
      require: { AGI: 5 }, alt: { anyFlags: ["escaped_slave"], hint: "từng là nô lệ trốn chạy" },
      desc: "Nhanh nhẹn. Thợ săn rình mồi dưới bùn", income: [0.8, 1.2, 1.8, 2.5, 3.2], hazard: 1.6, gains: { AGI: 0.35 } },
    { title: "SERPENT PRIEST", id: "lizard_priest", name: "Serpent Priest", stat: "INT", combat: false,
      require: { INT: 6 }, alt: { anyFlags: ["snake_blessed"], hint: "được Tà thần Rắn ban phước" },
      desc: "Trí tuệ. Tư tế thờ Tà thần Rắn", income: [0.6, 1.1, 1.8, 2.7, 3.7], hazard: 1.1, gains: { INT: 0.35 } },
    { title: "VENOM MASTER", id: "lizard_venom", name: "Venom Master", stat: "INT", combat: true,
      require: { INT: 4, health: 40 }, alt: { anyFlags: ["poison_blood"], hint: "sinh ra ở Hồ nước độc" },
      desc: "Trí tuệ và Sức khỏe. Pha chế kịch độc", income: [0.7, 1.2, 1.9, 2.7, 3.6], hazard: 1.5, gains: { INT: 0.25, STR: 0.1 } },
    { title: "EGG WATCHER", id: "lizard_egg", name: "Egg Watcher", stat: "LUCK", combat: false,
      require: {},
      desc: "Không cần chỉ số. Canh giữ bãi trứng của bộ lạc", income: [0.5, 0.9, 1.4, 2.1, 3], hazard: 0.9, gains: { LUCK: 0.15, STR: 0.1 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { lizard_war_: "lizard_warrior", lizard_hunt_: "lizard_hunter", lizard_priest_: "lizard_priest", lizard_venom_: "lizard_venom", lizard_egg_: "lizard_egg" },
  focusByPrefix: { lizard_swim_: "play", lizard_prophecy_: "study", lizard_train_: "train", lizard_serve_: "work", lizard_manhunt_: "adventure", lizard_power_: "social", lizard_sun_: "rest" },

  org: {
    id: "lizard_tribe",
    name: "Bộ lạc",
    auto: true,
    // ranks from the script: Mud Hatchling … Grand Warchief (only through the mud-pit duel)
    points: [0, 2, 4, 7, 11, 16, null],
    missionWord: "cuộc săn",
    fameToPts: 0.2,
    board: {
      text: [
        "Tiếng trống da cá sấu vang khắp đầm lầy. Tộc trưởng chỉ ngọn giáo về phía con mồi mới.",
        "Đàn quạ đen bay lên từ phía bìa rừng: có kẻ lạ đã bước vào lãnh thổ của bộ lạc.",
      ],
      skip: "Lặn xuống bùn, mặc kệ",
      skipText: "Bạn lặn sâu xuống bùn ấm và nằm im. Cuộc săn diễn ra mà không có bạn.",
    },
    failText: "Bạn trở về bãi đẻ với vảy rách và tay không. Tư tế lắc đầu, lẩm bẩm điều gì đó về ý Tà thần.",
  },
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn rít lên, ép luồng sức mạnh dưới vảy lắng xuống. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "dragon", name: "Swamp Dragonewt", match: ["dragonewt", "bán long"], life: 25, minAge: 30, require: { STR: 12, health: 60, anyFlags: ["ancient_blood", "dragon_slayer", "dragon_dreamer"] } },
    { key: "priest", name: "High Serpent Priest", match: ["serpent priest", "đại tư tế"], life: 20, minAge: 35, require: { INT: 12, fame: 40, anyFlags: ["snake_blessed", "abyss_watcher"] } },
  ],

  systems: {
    noRecruit: true,
    bandName: "bầy săn",
    romance: false,
    // the script has child events but no birth event
    autoChildren: true,
    childRate: 0.08,
    maxChildren: 3,
    child: ["Một quả trứng trong bãi đẻ ngập nước nở ra: {child}, con của bạn, quẫy đuôi lao ngay xuống bùn.", "{child} phá vỏ trứng dưới ánh trăng đầm lầy. Tư tế nói đó là điềm lành của Tà thần."],
    companions: [
      { race: "Lizardman", names: "lizardman", job: "Lizardman Warrior", stat: "STR", weight: 3 },
      { race: "Lizardman", names: "lizardman", job: "Swamp Hunter", stat: "AGI", weight: 3 },
      { race: "Lizardman", names: "lizardman", job: "Serpent Priest", stat: "INT", weight: 1 },
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Lizardman trẻ trườn ra từ bãi lau sậy, thè lưỡi đánh hơi bạn rồi cúi đầu: \"Cho ta săn cùng.\"",
        "Sau cuộc săn, một kẻ trong bầy chia cho bạn phần gan con mồi. Ở đầm lầy, đó là lời đề nghị kết bầy.",
      ],
      join: ["{ally} quẫy đuôi đập nhẹ vào đuôi bạn. Từ nay hai kẻ chung một bầy săn.", "{ally} rạch một vảy trên cổ tay, nhỏ máu xuống bùn. Huyết thệ đã thành."],
      decline: "Rít lên đuổi đi",
      declineText: "Bạn nhe nanh rít lên. Kẻ kia lặn mất xuống bùn.",
    },
    jobSelect: {
      teen: ["Tộc trưởng gọi lũ trẻ vừa lột vảy lần đầu ra bãi đá. Mỗi kẻ phải chọn con đường: giáo, bẫy, độc, Tà thần hay bãi trứng."],
      adult: ["Một Lizardman trưởng thành mà chưa có chỗ đứng là gánh nặng của bộ lạc. Đã đến lúc chọn."],
      later: "Phơi nắng thêm vài năm",
      laterText: "Bạn nằm dài trên tảng đá ấm. Con đường có thể chờ.",
    },
    promotion: {
      try: "Lao vào chứng minh bản thân",
      wait: "Chưa, chờ thời",
      waitText: "Bạn nằm im dưới bùn chờ thời. Thợ săn giỏi biết kiên nhẫn.",
      success: "Cả bộ lạc rít lên tán thưởng. Từ nay, bạn là {next}.",
      fail: ["Bạn thất bại, lớp vảy rách tả tơi.", "Bạn bị hạ gục trước ánh mắt khinh bỉ của cả bộ lạc."],
    },
    crossroads: {
      child: "Bạn đã biết bơi và săn. Những năm tới, bạn sẽ dồn sức vào đâu?",
      teen: "Lớp vảy gai đã cứng. Bạn sẽ dùng nó vào việc gì?",
      adult: "Bạn đã là một Lizardman trưởng thành. Bạn sẽ làm gì với những năm tới?",
      middle: "Tà thần bắt đầu thì thầm trong giấc mơ của bạn. Bạn sẽ dùng những năm này ra sao?",
      elder: "Vảy bạn đã bạc màu. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Đuôi bạn đã đủ khỏe để quẫy ngược dòng. Bạn là một Thợ săn đầm lầy nhỏ.",
      teen: "Bạn lột vảy lần đầu. Lớp vảy mới mọc lên đầy gai độc.",
      adult: "Bạn đã trưởng thành. Cả bầy bắt đầu nghe theo tiếng rít của bạn.",
      middle: "Đôi mắt bạn nhìn thấy những điều Tà thần muốn bạn thấy.",
      elder: "Vảy bạn bạc màu như đá cũ. Lũ trẻ trong bộ lạc gọi bạn là Cổ thằn lằn.",
      default: "Một chương mới của cuộc đời Lizardman mở ra.",
    },
    parentDeath: ["{who} đã chết. Bộ lạc thả xác xuống đầm lầy sâu nhất để Tà thần đón về.", "Tin {who} chết đến tai bạn. Bạn lặn xuống bùn suốt một ngày đêm không trồi lên."],
  },

  // the first hunt needs rank 2 in the script; open it from rank 1 so a new Lizardman has something to do
  questOverrides: { cuoc_san_moi_da_xanh_bat_goblin_lac_dan: { minRank: 0 } },
  overrides: {
    // the omens of evolution: stats or a sign of the blood, not both
    lizard_evo_dragon_1: { require: { any: [{ STR: 9, health: 50 }, { anyFlags: ["ancient_blood", "dragon_slayer", "dragon_dreamer"] }], form: "none", notFlags: ["evo_sign_dragon"] }, unrequire: { STR: 1, health: 1 } },
    lizard_evo_priest_1: { require: { any: [{ INT: 9 }, { anyFlags: ["snake_blessed", "abyss_watcher"] }], form: "none", notFlags: ["evo_sign_priest"] }, unrequire: { INT: 1, fame: 1 } },
    lizard_rank_warchief: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
    lizard_old_4: { asDeath: "old" },
  },
};
