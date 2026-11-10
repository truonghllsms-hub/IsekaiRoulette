// Kobold pack: what the approved Gemini script (content/scripts/kobold.txt) cannot say by itself.
const scriptStages = require("../races/kobold.json").stages;

module.exports = {
  race: "kobold",
  script: "content/scripts/kobold.txt",
  story: "content/scripts/kobold_story.txt",
  exclusive: true,
  lifespan: [8, 12],
  scriptStages,
  stages: scriptStages.map((s, i) => ({ ...s, start: [0, 1, 2, 4, 7, 9][i] })),
  useScriptStages: true,

  rename: [
    ["Huyết Mạch Rồng", "Dragonblood"],
    ["Người Lùn", "Dwarf"],
  ],

  stageNames: { infant: "Cún Thằn Lằn", child: "Thợ Đào Nhí", teen: "Kỹ Sư Bẫy Rập", adult: "Chiến Binh Sừng Vảy", middle: "Giám Sát Mỏ", elder: "Trưởng Lão Vuốt Cùn" },
  stagePhrases: {},
  diff: { stat: [2, 3, 5, 7, 9, 11], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"],
  focus: {
    play: { name: "Đào hầm", desc: "Sức mạnh, May mắn; đào bới tìm quặng", stages: ["infant", "child", "teen", "adult", "middle"], gains: { STR: 0.2, LUCK: 0.15 }, bars: { wealth: 0.5 } },
    study: { name: "Học lỏm", desc: "Trí tuệ; nghe trộm thầy tế và tù binh Dwarf", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; tập vuốt và giáo", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Phục dịch bầy", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["child", "teen", "adult", "middle", "elder"] },
    adventure: { name: "Đi đặt bẫy", desc: "Nhận việc của bầy, leo thứ bậc trong mỏ", stages: ["teen", "adult", "middle"], tags: null },
    social: { name: "Tranh quyền", desc: "Kết bè, đầu độc, giành ngách mỏ và bạn đời", stages: ["teen", "adult", "middle", "elder"] },
    rest: { name: "Trốn ngủ", desc: "Lén lút ban đêm; hồi sức và giấu của", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 1 } },
  },

  roles: [
    { title: "KOBOLD MINER", id: "kobold_miner", name: "Kobold Miner", stat: "STR", combat: false,
      ranks: ["Apprentice Digger", "Rusty Pickaxe", "Rock Breaker", "Tunnel Piercer", "Master Miner"],
      require: { STR: 4 }, alt: { anyFlags: ["overworld_kobold", "dwarf_slave"], hint: "xuất thân Mỏ hoang Sườn Núi hoặc Cũi sắt Người Lùn" },
      desc: "Sức mạnh. Thợ đào hầm", income: [0.7, 1.1, 1.7, 2.4, 3.2], hazard: 1.5, gains: { STR: 0.3 } },
    { title: "KOBOLD TRAPPER", id: "kobold_trapper", name: "Kobold Trapper", stat: "INT", combat: true,
      ranks: ["Bait", "Rope Tier", "Spike Setter", "Trap Engineer", "Death Artisan"],
      require: { INT: 4 }, alt: { anyFlags: ["trapset_talent"], hint: "có năng khiếu đặt bẫy" },
      desc: "Trí tuệ. Kỹ sư bẫy rập", income: [0.7, 1.1, 1.7, 2.5, 3.3], hazard: 1.4, gains: { INT: 0.3 } },
    { title: "KOBOLD SNIFFER", id: "kobold_sniffer", name: "Kobold Sniffer", stat: "LUCK", combat: false,
      ranks: ["Dust Sniffer", "Keen Nose", "Vein Seeker", "Geomancer", "Dragon's Eye Below"],
      require: { LUCK: 4 }, alt: { anyFlags: ["dungeon_miner"], hint: "xuất thân Tổ ấp Quặng Lưu Huỳnh hoặc Đáy mỏ Vực Thẳm" },
      desc: "May mắn. Đánh hơi mạch quặng và nguy hiểm", income: [0.8, 1.3, 2, 2.8, 3.8], hazard: 1.2, gains: { LUCK: 0.25 } },
    { title: "KOBOLD PRIEST", id: "kobold_priest", name: "Kobold Priest", stat: "INT", combat: false,
      ranks: ["Temple Sweeper", "Novice Acolyte", "Chanter", "High Priest", "Voice of the Dragon"],
      require: { INT: 5 }, alt: { anyFlags: ["dragon_blessed"], hint: "sinh ra gần hang Rồng Cổ Đại" },
      desc: "Trí tuệ. Thầy tế thờ Rồng", income: [0.6, 1, 1.6, 2.5, 3.5], hazard: 1, gains: { INT: 0.3 } },
    { title: "KOBOLD OVERSEER", id: "kobold_overseer", name: "Kobold Overseer", stat: "STR", combat: true,
      ranks: ["Mine Guard", "Whip Holder", "Warden", "Foreman", "Mine Lord"],
      require: { any: [{ STR: 6 }, { AGI: 5 }] },
      desc: "Sức mạnh hoặc Nhanh nhẹn. Giám sát mỏ cầm roi", income: [0.8, 1.3, 2, 2.8, 3.8], hazard: 1.3, gains: { STR: 0.2, AGI: 0.15 } },
  ],
  promoXp: [4, 8, 14, 22],
  roleByPrefix: { kobold_miner_: "kobold_miner", kobold_trapper_: "kobold_trapper", kobold_sniffer_: "kobold_sniffer", kobold_priest_: "kobold_priest", kobold_overseer_: "kobold_overseer" },
  focusByPrefix: { kobold_mine_: "play", kobold_learn_: "study", kobold_train_: "train", kobold_serve_: "work", kobold_trap_: "adventure", kobold_power_: "social", kobold_nosleep_: "rest" },

  org: {
    id: "kobold_mine",
    name: "Mỏ",
    auto: true,
    // the script's names (Mồi nhử bẫy … Chúa Mỏ) stay as aliases for its conditions
    ranks: ["Trap Bait", "Scrap Picker", "Hardscale", "Dig-crew Boss", "Tunnel Master", "Mine Steward", "Kobold Lord"],
    points: [0, 2, 4, 7, 11, 16, null],
    missionWord: "chuyến đào sâu",
    fameToPts: 0.25,
    board: {
      text: [
        "Tiếng chuông đồng rè rè vang khắp đường hầm. Đốc công đang gọi kẻ nào muốn kiếm thêm khẩu phần.",
        "Một tấm da chuột đóng đinh trên vách hầm, vẽ nguệch ngoạc một nhiệm vụ mới.",
      ],
      skip: "Chui vào ngách, giả vờ ngủ",
      skipText: "Bạn cuộn tròn trong một ngách tối. Không ai để ý thêm một Kobold vắng mặt.",
    },
    failText: "Bạn bò về hang với cái đuôi cụt một khúc. Đốc công vụt cho bạn một roi rồi bỏ đi.",
  },
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn ép cơn nóng rực dưới lớp vảy lắng xuống. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "elite", name: "Kobold Elite", match: ["elite", "vảy sừng"], life: 8, minAge: 3, require: { STR: 10, AGI: 8 } },
    { key: "dragon", name: "Dragonblood Kobold", match: ["dragonblood", "huyết mạch rồng"], life: 15, minAge: 8, require: { INT: 10, anyFlags: ["dragon_blessed", "blood_sword", "dragon_scale"] } },
  ],

  systems: {
    earlyHazard: 0.05,
    earlyUntil: "adult",
    noRecruit: true,
    bandName: "tổ đào",
    romance: false,
    // the script has child events but no birth event
    autoChildren: true,
    childRate: 0.08,
    maxChildren: 3,
    child: ["Một quả trứng trong lò ấp lưu huỳnh nứt ra. {child} bò ra, kêu chí chóe đòi ăn.", "{child} nở ra từ quả trứng bạn canh suốt mùa đông. Nó cắn ngay vào ngón tay bạn."],
    companions: [
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 3 },
      { race: "Kobold", names: "kobold", job: "Kobold Miner", stat: "STR", weight: 3 },
      { race: "Kobold", names: "kobold", job: "Kobold Sniffer", stat: "LUCK", weight: 2 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Kobold gầy gò lẽo đẽo theo bạn suốt ba ca đào, chìa ra một cục quặng sáng: \"Cho em theo với.\"",
        "Sau vụ sập hầm, một kẻ sống sót bò lại gần bạn. Nó cần một cái đuôi để bám theo.",
      ],
      join: ["{ally} vẫy đuôi lia lịa. Từ nay hai đứa chung một ngách ngủ.", "{ally} chia cho bạn nửa con chuột nướng. Ở Kobold, thế là kết nghĩa."],
      decline: "Đuổi đi, khẩu phần không đủ chia",
      declineText: "Bạn gầm gừ đuổi nó đi. Khẩu phần đã ít, chia thêm thì đói.",
    },
    jobSelect: {
      teen: ["Đốc công lùa lũ Kobold nhỏ ra giữa hầm, chia việc bằng roi da. Bạn phải chọn chỗ đứng trước khi bị chọn thay."],
      adult: ["Không có việc, bạn chỉ là một miệng ăn trong mỏ. Đã đến lúc chọn."],
      later: "Trốn vào ngách thêm ít lâu",
      laterText: "Bạn chui vào ngách tối. Không ai đi tìm một Kobold vô dụng.",
    },
    promotion: {
      try: "Liều một phen để leo lên",
      wait: "Chưa dám, chờ thời",
      waitText: "Bạn rụt cổ lại. Trong mỏ, kẻ ngẩng đầu sớm hay bị đá rơi trúng.",
      success: "Cả tổ đào nhìn bạn khác hẳn. Từ hôm nay, bạn là {next}.",
      fail: ["Bạn thất bại trước tiếng cười khành khạch của cả tổ.", "Mọi thứ đổ bể. Bạn liếm vết thương và chờ cơ hội khác."],
    },
    crossroads: {
      child: "Bạn đã đủ lớn để cầm cuốc. Những năm tới, bạn sẽ làm gì?",
      teen: "Lũ Kobold choai choai bắt đầu tranh chỗ trong mỏ. Bạn sẽ dồn sức vào đâu?",
      adult: "Bạn đã là một chiến binh sừng vảy. Bạn sẽ làm gì với những năm tới?",
      middle: "Ít Kobold nào sống đến tuổi này. Bạn sẽ dùng những năm hiếm hoi ấy ra sao?",
      elder: "Vuốt bạn đã cùn, mắt đã mờ. Những ngày cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Bạn sống sót qua những năm đầu trong lò ấp. Bạn đã biết cầm cuốc.",
      teen: "Bạn đã đủ khéo để buộc dây bẫy. Đốc công bắt đầu để mắt đến bạn.",
      adult: "Lớp vảy sừng đã cứng. Bạn là một chiến binh của tổ đào.",
      middle: "Bạn đã sống lâu hơn một nửa số Kobold cùng lứa.",
      elder: "Vuốt bạn cùn, đuôi bạn nặng. Lũ Kobold trẻ gọi bạn là trưởng lão.",
      default: "Một chương mới của cuộc đời Kobold mở ra.",
    },
    parentDeath: ["{who} đã chết trong một vụ sập hầm. Bạn đào suốt hai ngày mới tìm thấy cái đuôi.", "Tin {who} chết đến tai bạn giữa ca đào. Bạn cúi đầu, rồi tiếp tục cuốc."],
  },

  overrides: {
    kobold_rank_lord: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
