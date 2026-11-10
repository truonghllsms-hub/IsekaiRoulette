// High Demon pack: what the approved Gemini script (content/scripts/high_demon.txt) cannot say by itself.
module.exports = {
  race: "high_demon",
  script: "content/scripts/high_demon.txt",
  story: "content/scripts/high_demon_story.txt",
  exclusive: true,

  // The script's timeline: Ma tướng trẻ tuổi 500+, Kẻ chinh phạt 2.000+, Bạo chúa 5.000+, Ma Vương 7.000+, Thực thể tà ác 9.000+.
  useScriptStages: true,
  noChildhood: true,
  lifespan: [9600, 10400],
  // one "human year" of progress per century: the script gives ranks 2–3 already at 500–2.000
  yearScale: 100,

  rename: [
    ["Đội trưởng Tiên phong", "Vanguard"],
  ],

  stageNames: { infant: "Hạt Giống Tai Ương", child: "Ma Tướng Trẻ Tuổi", teen: "Kẻ Chinh Phạt", adult: "Bạo Chúa Vực Thẳm", middle: "Đại Ma", elder: "Thực Thể Tà Ác" },
  stagePhrases: { "ma vương": "middle", "kẻ chinh phạt": "teen", "cuối đời": "elder" },
  diff: { stat: [3, 5, 8, 11, 14, 17], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["study", "social", "train", "adventure", "work", "rest"],
  focus: {
    play: { hidden: true },
    study: { name: "Học hắc ma pháp", desc: "Trí tuệ; cấm thuật Vực Thẳm", stages: ["infant", "child", "teen", "adult", "middle", "elder"] },
    social: { name: "Mưu đồ chính trị", desc: "Liên minh, ám sát, hôn nhân chính trị", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; thuần ma thú, rèn ý chí", stages: ["infant", "child", "teen", "adult", "middle"] },
    adventure: { name: "Chinh phạt mặt đất", desc: "Đem quân lên mặt đất, leo thứ bậc triều đình", stages: ["child", "teen", "adult", "middle", "elder"], tags: null },
    work: { name: "Thiết triều", desc: "Làm vai trò của mình, cai trị thần dân", stages: ["child", "teen", "adult", "middle", "elder"] },
    rest: { name: "Ngủ say trong phong ấn", desc: "Ngủ hàng thế kỷ; hồi sức, thời gian trôi nhanh", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 0.5 } },
  },

  roles: [
    { title: "ĐẠI TƯỚNG QUÂN ĐOÀN", id: "hd_general", name: "Legion General", stat: "STR", combat: true,
      ranks: ["Vanguard", "Siege Commander", "Demon General", "Legion Grand General", "Abyssal Marshal"],
      require: { STR: 6 }, alt: { anyFlags: ["royal_demon", "exiled_noble"], hint: "xuất thân Ngai vàng rỉ máu hoặc Vương Miện Lưu Đày" },
      desc: "Sức mạnh. Thống lĩnh quân đoàn ác quỷ", income: [1.5, 2.2, 3.2, 4.5, 6], hazard: 1.8, gains: { STR: 0.35 } },
    { title: "DARK ARCHMAGE", id: "hd_archmage", name: "Dark Archmage", stat: "INT", combat: true,
      ranks: ["Dark Apprentice", "Curser", "Warlock", "Dark Archmage", "Abyssal Sage"],
      require: { INT: 6 }, alt: { anyFlags: ["void_born"], hint: "xuất thân Vực Thẳm Hư Vô hoặc Trăng Máu Vực Thẳm" },
      desc: "Trí tuệ. Hắc ma pháp và cấm thuật", income: [1.2, 2, 3, 4.2, 5.5], hazard: 1.4, gains: { INT: 0.35 } },
    { title: "LÃNH CHÚA VỰC THẲM", id: "hd_lord", name: "Abyssal Lord", stat: "LUCK", combat: false,
      ranks: ["Village Lord", "Abyssal Count", "Archduke", "Layer King", "Demon Lord"],
      require: { LUCK: 6 }, alt: { anyFlags: ["royal_demon"], hint: "xuất thân Ngai vàng rỉ máu hoặc Trăng Máu Vực Thẳm" },
      desc: "May mắn. Cai trị một vùng của Vực Thẳm", income: [2, 3, 4.5, 6, 8], hazard: 1.1, gains: { LUCK: 0.2, INT: 0.15 } },
  ],
  promoXp: [4, 8, 14, 22],
  roleByPrefix: { hd_job_: "hd_general", hd_archmage_: "hd_archmage", hd_lord_: "hd_lord" },
  focusByPrefix: { hd_magic_: "study", hd_politic_: "social", hd_train_: "train", hd_conquer_: "adventure", hd_court_: "work", hd_seal_: "rest" },

  org: {
    id: "hd_court",
    name: "Triều đình Ma giới",
    auto: true,
    ranks: ["Ma Tước", "Tử Tước Hắc Ám", "Bá Tước Vực Thẳm", "Huyết Hầu Tước", "Đại Công Tước", "Vua Tầng", "Ma Vương"],
    // Ma Vương is taken only by the throne event or the "Hoàng Hôn Của Tháp Ngà" campaign.
    points: [0, 2, 4, 7, 11, 16, null],
    missionWord: "cuộc chinh phạt",
    fameToPts: 0.1,
    board: {
      text: [
        "Sứ giả của Ma Vương quỳ trước ngai bạn, dâng lên cuộn sắc lệnh viết bằng máu rồng: Triều đình có việc cần đến bạn.",
        "Tiếng tù và vọng lên từ Vực Thẳm. Mặt đất phía trên lại có kẻ dám thách thức quyền uy của Ma giới.",
      ],
      skip: "Gạt sắc lệnh sang một bên",
      skipText: "Bạn đốt cuộn sắc lệnh thành tro. Triều đình có thể chờ; bạn thì không cần chúng.",
    },
    failText: "Bạn trở về Vực Thẳm trong im lặng. Các Đại Công Tước đã bắt đầu thì thầm sau lưng bạn.",
  },
  decline: { label: "Kìm nén lại, chờ thêm vài thế kỷ", text: "Bạn ép ma lực đang cuồn cuộn lắng xuống. Kẻ sống vạn năm không cần vội. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "king", name: "Demon King", match: ["ma vương", "demon king"], life: 3000, minAge: 7000, require: { STR: 12, fame: 50 } },
    { key: "god", name: "Demon God", match: ["ma thần", "demon god"], life: 10000, minAge: 9000, require: { INT: 13, anyFlags: ["void_born", "god_defier"] } },
  ],

  systems: {
    earlyHazard: 3e-06,
    earlyUntil: "adult",
    noRecruit: true,
    activeFrom: "child",
    jobFrom: "child",
    bandName: "đám thuộc hạ",
    romance: false,
    // the script has events about children but no birth event: births happen on their own, rarely
    autoChildren: true,
    childStages: ["child", "teen", "adult", "middle"],
    childRate: 0.05,
    maxChildren: 3,
    child: ["Một hạt giống tai ương mới nảy mầm trong Vực Thẳm: {child}, đứa con mang ma huyết của bạn.", "{child} chào đời giữa tiếng sấm của Ma giới. Các Đại Công Tước gửi quà mừng, và thầm tính chuyện ám sát."],
    companions: [
      { race: "Demon", names: "demon", job: "Demon Knight", stat: "STR", weight: 3 },
      { race: "Vampire", names: "vampire", job: "Blood Mage", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Demon Knight quỳ một gối trước ngai của bạn, dâng thanh kiếm đen: \"Xin cho thuộc hạ được phục vụ ngài.\"",
        "Một Imp ranh mãnh lượn quanh bạn: \"Ngài cần kẻ đưa tin không? Tiểu nhân bay nhanh nhất Ma giới!\"",
      ],
      join: ["{ally} cúi đầu nhận ấn của bạn. Từ nay kẻ đó sống chết vì bạn.", "Bạn khắc một ma văn lên trán {ally}. Khế ước phục tùng đã thành."],
      decline: "Phẩy tay cho lui",
      declineText: "Bạn không cần thêm kẻ hầu. Kẻ kia lui ra, không dám ngẩng đầu.",
    },
    jobSelect: {
      teen: ["Triều đình Ma giới triệu bạn đến. Một High Demon không có chức phận chỉ là hoàng tộc ăn bám. Đã đến lúc chọn con đường."],
      adult: ["Hàng ngàn năm đã trôi qua mà bạn chưa có chỗ đứng trong Triều đình. Các Đại Công Tước bắt đầu cười cợt sau lưng bạn."],
      later: "Chưa vội, ngủ thêm vài thế kỷ",
      laterText: "Bạn khép mắt trên ngai đá. Triều đình có thể chờ.",
    },
    promotion: {
      try: "Ra tay để giành lấy vị trí",
      wait: "Kiên nhẫn chờ thêm vài thế kỷ",
      waitText: "Bạn nhếch mép chờ đợi. Kẻ vội vàng ở Ma giới thường chết sớm.",
      success: "Cả Triều đình cúi đầu. Từ nay, bạn là {next}.",
      fail: ["Bạn thất bại trước ánh mắt chế giễu của cả Ma giới.", "Kế hoạch đổ vỡ. Bạn lui về Vực Thẳm, chờ thời cơ khác."],
    },
    crossroads: {
      child: "Năm trăm năm đầu đời đã qua. Bạn sẽ dành những thế kỷ tới cho điều gì?",
      teen: "Hai ngàn năm. Bạn đã đủ mạnh để đem quân lên mặt đất. Bạn sẽ dồn sức vào đâu?",
      adult: "Năm ngàn năm. Cả một tầng Vực Thẳm run sợ trước tên bạn. Bạn sẽ làm gì tiếp?",
      middle: "Bảy ngàn năm. Rất ít ác quỷ sống đến tuổi này. Bạn sẽ dùng nó ra sao?",
      elder: "Chín ngàn năm. Ma lực của bạn bắt đầu mục rữa. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Năm trăm năm. Bạn không còn là hạt giống tai ương nữa; bạn đã là một Ma tướng trẻ tuổi.",
      teen: "Hai ngàn năm. Bạn đã sẵn sàng chinh phạt.",
      adult: "Năm ngàn năm. Bạn đã là một Bạo chúa của Vực Thẳm.",
      middle: "Bảy ngàn năm. Ma lực trong bạn đủ để sánh với Ma Vương.",
      elder: "Chín ngàn năm. Bạn đã là một thực thể tà ác mà cả thần linh cũng phải dè chừng.",
      default: "Một thiên niên kỷ mới mở ra.",
    },
    parentDeath: ["{who} đã ngã xuống. Ở Ma giới, cái chết của một High Demon được đánh dấu bằng một cuộc tranh giành di sản đẫm máu.", "Tin {who} qua đời đến tai bạn. Bạn nâng ly rượu máu, rồi tiếp tục thiết triều."],
  },

  overrides: {
    hd_politic_marriage: { stages: ["teen", "adult", "middle"], require: { free: true, spouse: false } },
    hd_parent_test: { require: { any: [{ fatherAlive: true }, { makerAlive: true }] }, unrequire: { makerAlive: true } },
    hd_ally_loot: { require: { party: 1 } },
    hd_ally_past: { require: { party: 1 } },
    hd_ally_save: { require: { party: 1 } },
    hd_rank_king: { require: { guildRank: 5 }, unrequire: { job: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
