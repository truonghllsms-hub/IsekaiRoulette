// Slime pack: what the approved Gemini script (content/scripts/slime.txt) cannot say by itself.
module.exports = {
  race: "slime",
  script: "content/scripts/slime.txt",

  // The script's timeline: Khối bùn trượt 5+, Slime trưởng thành 15+, Quái vật dẻo 50+, Slime khổng lồ 200+, Vua Bùn Nhão 500+.
  useScriptStages: true,
  // Low-tier monster with little intelligence: short life, few reach old age, evolution is rare and hard.
  tier: "low",
  // a common Slime lives a few decades; the script's later stages (200+, 500+) are for evolved ones
  lifespan: [60, 100],
  hazard: 0.018,

  rename: [
    ["Slime Hình Người", "Humanoid Slime"],
    ["Slime hình người", "Humanoid Slime"],
  ],

  stageNames: { infant: "Giọt Nhầy Nhỏ", child: "Khối Bùn Trượt", teen: "Slime Trưởng Thành", adult: "Quái Vật Dẻo", middle: "Slime Khổng Lồ", ancient: "Vua Bùn Nhão" },
  stagePhrases: { "sự kiện kết thúc đời": "ancient" },
  // Slimes are weak in body (STR ×0.5) but lucky: checks on the Goblin scale.
  diff: { stat: [2, 3, 5, 7, 9, 11], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["work", "study", "train", "adventure", "social", "rest"],
  focus: {
    play: { hidden: true },
    work: { name: "Hấp thụ", desc: "Làm vai trò của mình: nuốt, tiêu hóa, lớn lên", stages: ["infant", "child", "teen", "adult", "middle", "ancient"], bars: { health: 1 } },
    study: { name: "Ẩn nấp", desc: "Nhanh nhẹn, Trí tuệ; trốn khỏi Mạo hiểm giả", stages: ["infant", "child", "teen", "adult", "middle", "ancient"], gains: { AGI: 0.2, INT: 0.1 } },
    train: { name: "Khổ luyện", desc: "Sức mạnh; nén chặt cơ thể nhầy", stages: ["child", "teen", "adult", "middle"] },
    adventure: { name: "Lang thang", desc: "Đi săn mồi, mở rộng lãnh địa, leo thứ bậc", stages: ["child", "teen", "adult", "middle", "ancient"], tags: null },
    social: { name: "Bắt chước", desc: "Trí tuệ, May mắn; học dáng hình của kẻ khác", stages: ["teen", "adult", "middle", "ancient"], gains: { INT: 0.2, LUCK: 0.15 } },
    rest: { name: "Ngủ đông", desc: "Ngủ hàng chục năm; hồi sức, thời gian trôi nhanh", stages: ["infant", "child", "teen", "adult", "middle", "ancient"], bars: { health: 2, joy: 0.5 } },
  },

  roles: [
    { title: "METAL SLIME", id: "slime_metal", name: "Metal Slime", stat: "STR", combat: true,
      require: { STR: 4 }, alt: { anyFlags: ["mimic_potential"], hint: "xuất thân Đáy rương rỗng" },
      desc: "Sức mạnh. Ăn kim loại, cứng như thép", income: [0.4, 0.8, 1.3, 2, 2.8], hazard: 1.2, gains: { STR: 0.3 } },
    { title: "MAGIC SLIME", id: "slime_magic", name: "Magic Slime", stat: "INT", combat: true,
      require: { INT: 4 }, alt: { anyFlags: ["magic_slime", "pure_slime"], hint: "xuất thân Bình thí nghiệm vỡ hoặc Cặn ma lực đọng lại" },
      desc: "Trí tuệ. Hấp thụ ma lực", income: [0.4, 0.8, 1.4, 2.2, 3], hazard: 1.3, gains: { INT: 0.3 } },
    { title: "POISON SLIME", id: "slime_poison", name: "Poison Slime", stat: "AGI", combat: true,
      require: { AGI: 4 }, alt: { anyFlags: ["blood_slime"], hint: "xuất thân Nuôi dưỡng bằng xác thối hoặc Máu Thịt Ác Quỷ" },
      desc: "Nhanh nhẹn. Kịch độc, axit, dịch bệnh", income: [0.4, 0.8, 1.3, 2, 2.8], hazard: 1.4, gains: { AGI: 0.3 } },
    { title: "MIMIC SLIME", id: "slime_mimic", name: "Mimic Slime", stat: "LUCK", combat: false,
      require: { LUCK: 4 }, alt: { anyFlags: ["mimic_potential"], hint: "xuất thân Đáy rương rỗng" },
      desc: "May mắn. Giả dạng rương báu, đồ vật, con người", income: [0.6, 1, 1.6, 2.4, 3.4], hazard: 1.2, gains: { LUCK: 0.2, INT: 0.1 } },
    { title: "TAMER'S PET SLIME", id: "slime_pet", name: "Tamer's Pet Slime", stat: "LUCK", combat: false,
      require: {},
      desc: "Không cần điều kiện. Thú cưng của một Tamer", income: [0.3, 0.6, 1, 1.6, 2.4], hazard: 1, gains: { LUCK: 0.2 } },
  ],
  promoXp: [5, 6, 8, 10],
  focusByPrefix: { slime_absorb_: "work", slime_hide_: "study", slime_train_: "train", slime_wander_: "adventure", slime_hibernate_: "rest" },

  org: {
    id: "slime_domain",
    name: "Lãnh địa",
    auto: true,
    // ranks from the script: Stagnant Puddle … Floor Lord (taken in slime_domain_lord_ascension)
    points: [0, 10, 25, 45, 70, 100, null],
    missionWord: "cuộc săn mồi",
    fameToPts: 0.3,
    board: {
      text: [
        "Rung động truyền qua nền đá ẩm. Có thứ gì đó ngon lành đang lạc vào hầm ngục.",
        "Một mùi hương béo ngậy trôi xuống từ khe nứt phía trên. Cơ thể nhầy của bạn rung lên vì đói.",
      ],
      skip: "Co mình lại, nằm im",
      skipText: "Bạn dẹt mình xuống thành một vũng nước vô hại. Con mồi đi qua mà không hề biết.",
    },
    failText: "Bạn trườn về góc tối, nhỏ đi một vòng. Lần sau sẽ khác.",
  },
  decline: { label: "Ổn định cơ thể, chờ dịp khác", text: "Bạn ép khối nhầy đang sôi sục lắng xuống. Lõi vẫn còn nguyên. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "king", name: "Slime King", match: ["slime king"], life: 400, minAge: 40, require: { STR: 10, anyFlags: ["usurper_slime", "royal_slime"] } },
    { key: "elemental", name: "Elemental Slime", match: ["elemental"], life: 250, minAge: 30, require: { INT: 7, any: [{ flags: ["magic_slime"] }, { job: "slime_magic", jobRank: 1 }] } },
    { key: "humanoid", name: "Humanoid Slime", match: ["hình người", "humanoid"], life: 150, minAge: 40, require: { LUCK: 16, flags: ["taste_of_adventurer"], job: "slime_mimic" } },
  ],

  systems: {
    bandName: "bầy",
    activeFrom: "child",
    jobFrom: "child",
    romance: false,
    autoChildren: false,
    companions: [
      { race: "Slime", names: "slime", job: "Poison Slime", stat: "AGI", weight: 3 },
      { race: "Slime", names: "slime", job: "Metal Slime", stat: "STR", weight: 2 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 1 },
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Slime nhỏ màu xanh lá lăn đến cạnh bạn, rung rinh như muốn nói: \"Cho tớ đi với.\"",
        "Một Goblin đói lả nhìn bạn, rồi nhìn đống xương bạn vừa nhả ra. \"Ta... làm bạn được không?\"",
      ],
      join: ["{ally} dính vào thân bạn một chút rồi tách ra. Ở Slime, đó là cái bắt tay.", "{ally} theo sau bạn, để lại một vệt nhầy song song với vệt của bạn."],
      decline: "Trườn đi chỗ khác",
      declineText: "Bạn lặng lẽ trườn đi. Đi một mình thì không phải chia mồi.",
    },
    jobSelect: {
      teen: ["Cơ thể bạn bắt đầu biến đổi theo những gì bạn đã nuốt. Bạn sẽ trở thành loại Slime nào?"],
      adult: ["Bạn đã lớn nhưng vẫn chỉ là một khối nhầy vô định. Có lẽ nên chọn một hình thái."],
      later: "Cứ nhầy nhụa thêm một thời gian",
      laterText: "Bạn chảy loang ra sàn đá. Hình thái có thể chờ.",
    },
    promotion: {
      try: "Nuốt chửng thử thách",
      wait: "Chưa, tiêu hóa thêm đã",
      waitText: "Bạn chậm rãi tiêu hóa. Slime không vội.",
      success: "Cơ thể bạn rung lên và đổi màu. Từ nay, bạn là {next}.",
      fail: ["Bạn bị văng ra thành từng mảnh nhỏ. Phải mất cả tháng mới gom lại được.", "Thử thách thất bại. Lõi của bạn đau nhói."],
    },
    crossroads: {
      child: "Bạn đã đủ lớn để trườn khỏi vũng nước. Những năm tới, bạn sẽ làm gì?",
      teen: "Bạn đã là một Slime trưởng thành. Bạn sẽ dồn sức vào đâu?",
      adult: "Bạn đã là Quái Vật Dẻo, nỗi sợ của Mạo hiểm giả tân thủ. Bạn sẽ làm gì tiếp?",
      middle: "Bạn đã khổng lồ. Bạn sẽ dùng những năm này ra sao?",
      ancient: "Bạn đã là Vua Bùn Nhão. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Bạn không còn là giọt nhầy nhỏ. Bạn đã biết trườn, biết nuốt, biết trốn.",
      teen: "Bạn đã to bằng một con chó. Lũ Goblin bắt đầu tránh xa vũng của bạn.",
      adult: "Năm mươi năm. Bạn đã là Quái Vật Dẻo, nuốt được cả một Mạo hiểm giả.",
      middle: "Hai trăm năm. Bạn khổng lồ đến mức lấp kín cả một hành lang hầm ngục.",
      ancient: "Năm trăm năm. Bạn đã là Vua Bùn Nhão, một truyền thuyết của hầm ngục.",
      default: "Một chương mới của cuộc đời Slime mở ra.",
    },
    parentDeath: ["Bạn cảm nhận được {who} đã tan biến. Một mảnh nhầy nhỏ trong bạn cũng lạnh đi.", "{who} đã không còn. Bạn trườn qua chỗ cũ, hấp thụ chút dịch còn sót lại."],
  },

  overrides: {
    slime_chain3_reunion: { require: { flags: ["magic_slime"] } },
    // the script writes both branches on single lines; one choice per mark
    slime_chain3_karma: { choices: [
      { label: "Bỏ trốn khỏi sự bao bọc ngu ngốc", require: { flags: ["elara_savior"] }, check: { stat: "LUCK", target: 7 },
        success: { text: "Elara giờ là Đại Giả Kim Thuật Sư, dẫn cả một đội mạo hiểm giả đến \"bắt con Slime cưng về nuôi\". Bạn trườn qua khe nứt, thoát khỏi cái ách \"thú cưng\".", effects: { joy: 10 } },
        fail: { text: "Elara giờ là Đại Giả Kim Thuật Sư, dẫn cả một đội mạo hiểm giả đến bắt bạn về nuôi. Bạn bị nhốt vào một bình pha lê cao cấp, sống những năm lười biếng nhưng mất tự do.", effects: { joy: -20, health: 10 } } },
      { label: "Dùng sức mạnh áp chế nội hỏa", require: { flags: ["creator_consumed"] }, check: { stat: "health", target: 85 },
        success: { text: "Tàn dư oán niệm của Elara trong dạ dày bạn bộc phát thành nội hỏa. Bạn luyện hóa hoàn toàn tàn hồn ấy, biến oán khí thành sức mạnh cốt lõi.", effects: { STR: 3, INT: 2 } },
        fail: { text: "Tàn dư oán niệm của Elara trong dạ dày bạn bộc phát thành nội hỏa, xé toạc một mảng dạ dày. Bạn nôn ra máu đen, suy yếu tột độ.", effects: { health: -30 } } },
    ] },
    slime_domain_lord_ascension: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
