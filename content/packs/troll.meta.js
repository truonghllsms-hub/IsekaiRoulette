// Troll pack: what the approved Gemini script (content/scripts/troll.txt) cannot say by itself.
module.exports = {
  race: "troll",
  script: "content/scripts/troll.txt",
  useScriptStages: true,

  rename: [
    ["Troll Đá Tảng (Stone Troll)", "Stone Troll"],
  ],

  stageNames: { infant: "Bục Thịt Nhão", child: "Troll Nhí Ném Đá", teen: "Kẻ Đòi Nợ Cầu Đường", adult: "Tai Họa Rừng Sâu", middle: "Troll Đá Tảng", elder: "Hóa Thạch" },
  stagePhrases: { "bất kỳ giai đoạn trưởng thành": "adult,middle,elder", "mọi giai đoạn trưởng thành": "adult,middle,elder" },
  // Trolls are strong but slow-witted: checks a bit harder than for Goblins.
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "study", "train", "work", "adventure", "rest"],
  focus: {
    play: { name: "Nghịch bùn", desc: "Sức mạnh, May mắn; chơi đùa trong vũng lầy", stages: ["infant", "child"], gains: { STR: 0.2, LUCK: 0.15 }, bars: { joy: 1.5 } },
    study: { name: "Ăn", desc: "Sức mạnh, Sức khỏe; nhai mọi thứ nhai được", stages: ["infant", "child", "teen", "adult", "middle", "elder"], gains: { STR: 0.15 }, bars: { health: 2, wealth: -0.3 } },
    train: { name: "Khổ luyện (đập đá)", desc: "Sức mạnh; đập đá cho cứng tay", stages: ["teen", "adult", "middle"] },
    work: { name: "Giữ cầu thu phí", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["teen", "adult", "middle", "elder"] },
    adventure: { name: "Lang thang", desc: "Đi đòi nợ, đánh nhau, leo thứ bậc lãnh thổ", stages: ["teen", "adult", "middle"], tags: null },
    rest: { name: "Ngủ ngáy", desc: "Hồi sức; Troll ngủ để vết thương tự lành", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 3, joy: 1 } },
    social: { hidden: true },
  },

  roles: [
    { title: "BRIDGE TROLL", id: "troll_bridge", name: "Bridge Troll", stat: "STR", combat: true,
      ranks: ["Mud Blocker", "Snack Extortioner", "Big-Nose Tollmaster", "Bridge Nightmare", "Stone Bridge King"],
      require: { STR: 3 }, alt: { anyFlags: ["bridge_troll"], hint: "sinh ra Dưới gầm cầu đá" },
      desc: "Sức mạnh. Kẻ gác cầu thu phí", income: [0.6, 1, 1.6, 2.4, 3.2], hazard: 1.3, gains: { STR: 0.3 } },
    { title: "MERCENARY TROLL", id: "troll_merc", name: "Mercenary Troll", stat: "STR", combat: true,
      ranks: ["Meat Shield", "Smash Machine", "Blind Mercenary", "Dim-witted General", "Mercenary Lord"],
      require: { health: 40 }, alt: { anyFlags: ["gladiator_troll", "swamp_troll"], hint: "xuất thân Hầm ngầm Đấu trường hoặc Đầm lầy hôi thối" },
      desc: "Sức khỏe. Vệ sĩ đánh thuê, bia đỡ đòn biết đi", income: [0.8, 1.3, 2, 2.8, 3.6], hazard: 1.9, gains: { STR: 0.25 } },
    { title: "SCHOLAR TROLL", id: "troll_scholar", name: "Scholar Troll", stat: "INT", combat: false,
      ranks: ["Book Picker", "Upside-down Reader", "Rock-throwing Wizard", "Self-proclaimed Archmage", "Fool Sage"],
      require: { INT: 6 }, alt: { anyFlags: ["magic_resist", "cave_troll"], hint: "xuất thân Rừng sâu tĩnh lặng hoặc Hang động ẩm mốc" },
      desc: "Trí tuệ. Troll giả danh trí thức", income: [0.5, 0.9, 1.5, 2.3, 3.2], hazard: 1, gains: { INT: 0.3 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { troll_role_bridge: "troll_bridge", troll_role_merc: "troll_merc", troll_role_scholar: "troll_scholar" },
  focusByPrefix: { troll_act_mud: "play", troll_act_eat: "study", troll_act_train: "train", troll_act_bridge: "work", troll_act_wander: "adventure", troll_act_sleep: "rest" },

  org: {
    id: "troll_territory",
    name: "Lãnh thổ",
    auto: true,
    // the script's names (Troll Bùn Nhão … Troll King Độc Tôn) stay as aliases for its conditions
    ranks: ["Mud Troll", "Sneaky Rock Thrower", "Moss Boss", "Turf Bully", "Bridgehead Lord", "Terror of the Land", "Troll King"],
    points: [0, 2, 4, 7, 11, 16, null],
    missionWord: "chuyến đòi nợ",
    fameToPts: 0.25,
    board: {
      text: [
        "Bụng bạn sôi ùng ục. Phía bên kia khu rừng có mùi của thức ăn, và của những kẻ nợ bạn tiền.",
        "Một con quạ đậu lên đầu bạn, kêu quác quác. Bạn chẳng hiểu gì, nhưng quyết định đi đâu đó đánh nhau.",
      ],
      skip: "Gãi bụng, ngủ tiếp",
      skipText: "Bạn ngáp một cái thật to rồi lăn ra ngủ. Mai tính.",
    },
    failText: "Bạn lết về gầm cầu, đầu u một cục, không nhớ nổi mình vừa đi đâu.",
  },
  decline: { label: "Ngủ thêm, để sau", text: "Bạn gãi đầu, quên mất mình định làm gì. Cơ hội này sẽ quay lại, nếu bạn còn nhớ." },

  evos: [
    { key: "stone", name: "Stone Troll", match: ["stone troll", "đá tảng"], life: 20, minAge: 40, require: { STR: 22, health: 70 } },
    { key: "ice", name: "Ancient Ice Troll", match: ["ice troll", "băng"], life: 25, minAge: 40, require: { health: 60, flags: ["ice_troll"] } },
  ],

  systems: {
    bandName: "đám",
    romance: false,
    // the script has child events but no birth event
    autoChildren: true,
    childRate: 0.08,
    maxChildren: 3,
    child: ["Một cục thịt nhão lăn ra từ đống bùn cạnh bạn và bắt đầu khóc: {child}, con của bạn.", "{child} ra đời, to hơn mọi đứa trẻ Troll khác và đói hơn gấp đôi."],
    companions: [
      { race: "Troll", names: "troll", job: "Mercenary Troll", stat: "STR", weight: 3 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 2 },
      { race: "Orc", names: "orc", job: "Orc Berserker", stat: "STR", weight: 1 },
    ],
    recruit: {
      text: [
        "Một con Troll khác ngồi xuống cạnh bạn, chìa ra nửa con cừu sống. \"Bạn?\" nó hỏi.",
        "Một Goblin láu cá trèo lên vai bạn: \"Đại ca! Cho em theo, em đếm tiền giùm cho!\"",
      ],
      join: ["{ally} vỗ bụng cười hô hố. Từ nay hai đứa chung một gầm cầu.", "{ally} chia cho bạn một cục đá đẹp. Ở Troll, thế là kết nghĩa."],
      decline: "Đuổi đi, đồ ăn không đủ chia",
      declineText: "Bạn ném một tảng đá theo. Kẻ kia chạy mất. Đồ ăn là của bạn hết.",
    },
    jobSelect: {
      teen: ["Bạn đã đủ to để làm việc gì đó. Gác cầu, đánh thuê, hay đọc sách (ngược)?"],
      adult: ["Bạn vẫn chưa có việc gì làm ngoài ăn và ngủ. Có lẽ nên chọn một nghề."],
      later: "Ăn thêm vài năm đã",
      laterText: "Bạn nhai tiếp. Nghề nghiệp có thể chờ.",
    },
    promotion: {
      try: "Đập một phát cho xong",
      wait: "Chưa, ngủ đã",
      waitText: "Bạn ngáp và lăn ra ngủ. Lần sau vậy.",
      success: "Mọi kẻ xung quanh há hốc mồm. Từ nay, bạn là {next}.",
      fail: ["Bạn thất bại, rồi quên luôn mình vừa thất bại.", "Bạn bị đánh bẹp mũi. Nó sẽ mọc lại, như mọi lần."],
    },
    crossroads: {
      child: "Bạn đã biết ném đá. Những năm tới, bạn sẽ làm gì?",
      teen: "Bạn đã đủ to để đòi nợ người qua cầu. Bạn sẽ dồn sức vào đâu?",
      adult: "Bạn đã là Tai Họa Rừng Sâu. Bạn sẽ làm gì tiếp?",
      middle: "Da bạn bắt đầu cứng như đá. Bạn sẽ dùng những năm này ra sao?",
      elder: "Rêu mọc kín người bạn. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Bạn không còn là một bục thịt nhão. Bạn đã biết ném đá, và ném rất trúng.",
      teen: "Bạn đã đủ to để ngồi chắn giữa cầu và đòi tiền.",
      adult: "Bạn đã trưởng thành. Cả khu rừng biết tên bạn, dù bạn không nhớ tên mình.",
      middle: "Da bạn cứng lại như đá tảng. Vết thương lành chậm hơn, nhưng gươm đâm không thủng.",
      elder: "Bạn ngồi yên ngày càng lâu. Rêu bắt đầu mọc trên vai.",
      default: "Một chương mới của cuộc đời Troll mở ra.",
    },
    parentDeath: ["{who} đã chết. Bạn ngồi bên xác rất lâu, rồi đắp lên đó một ụ bùn thật to.", "Bạn nghe tin {who} không dậy nữa. Bạn khóc một trận to, rồi đi ăn."],
  },

  // the first errand needs rank 2 in the script; open it from rank 1 so a new Troll has something to do
  questOverrides: { troll_quest_goblin_toll: { minRank: 0 } },
  overrides: {
    // "Giai đoạn Troll nhí" here is the child's age
    troll_child_eating: { stages: ["adult", "middle", "elder"] },
    troll_child_lost: { stages: ["adult", "middle", "elder"] },
    troll_event_king_duel: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
