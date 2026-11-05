// Dragon pack: what the approved Gemini script (content/scripts/dragon.txt) cannot say by itself.
module.exports = {
  race: "dragon",
  script: "content/scripts/dragon.txt",
  story: "content/scripts/dragon_story.txt",
  exclusive: true,

  // The script's timeline: Ấu long 100+, Phi long 500+, Cự long 2.000+, Cổ long 5.000+, Thủy tổ long 9.000+.
  useScriptStages: true,
  lifespan: [9600, 10400],
  // 0–100: still an egg
  defaultStages: ["child", "teen", "adult", "middle", "elder"],

  rename: [
    ["Long Thần (Dragon God)", "Dragon God"],
    ["Rồng Cổ Đại Bất Hoại", "Ancient Dragon"],
  ],

  stageNames: { infant: "Dragon Egg", child: "Hatchling", teen: "Wyvern-age", adult: "Great Dragon", middle: "Elder Dragon", elder: "Primordial Dragon" },
  stagePhrases: {},
  diff: { stat: [3, 5, 8, 11, 14, 17], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["work", "rest", "train", "adventure", "study", "social"],
  focus: {
    play: { hidden: true },
    work: { name: "Vơ vét kho báu", desc: "Làm vai trò của mình, gom vàng bạc châu báu", stages: ["child", "teen", "adult", "middle", "elder"], bars: { wealth: 1 } },
    rest: { name: "Ngủ trên núi vàng", desc: "Ngủ hàng thế kỷ; hồi sức, thời gian trôi nhanh", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 0.5 } },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; luyện hơi thở rồng", stages: ["child", "teen", "adult", "middle"] },
    adventure: { name: "Chinh phạt lãnh thổ", desc: "Mở rộng lãnh thổ, thu cống nạp, leo thứ bậc", stages: ["child", "teen", "adult", "middle", "elder"], tags: null },
    study: { name: "Học cổ ngữ và ma pháp", desc: "Trí tuệ; ma pháp cổ đại", stages: ["child", "teen", "adult", "middle", "elder"] },
    social: { name: "Giao du với Rồng khác", desc: "Kết giao, tranh hùng, tìm bạn đời", stages: ["teen", "adult", "middle", "elder"] },
  },

  roles: [
    { title: "HOARD DRAGON", id: "dragon_hoard", name: "Hoard Dragon", stat: "LUCK", combat: false,
      require: { LUCK: 5 }, alt: { anyFlags: ["inferno_blood", "stolen_egg"], hint: "xuất thân Đỉnh Hỏa Ngục hoặc Bị Đánh Cắp" },
      desc: "May mắn. Đạo Tích Trữ: gom kho báu", income: [2, 3, 4.5, 6, 8], hazard: 1, gains: { LUCK: 0.25, INT: 0.1 } },
    { title: "WAR DRAGON", id: "dragon_war", name: "War Dragon", stat: "STR", combat: true,
      require: { STR: 6 }, alt: { anyFlags: ["inferno_blood", "abyssal_taint"], hint: "xuất thân Đỉnh Hỏa Ngục hoặc Trứng Rồng Vực Thẳm" },
      desc: "Sức mạnh. Đạo Hủy Diệt: chinh phạt", income: [1.5, 2.2, 3.2, 4.5, 6], hazard: 1.8, gains: { STR: 0.35 } },
    { title: "SAGE DRAGON", id: "dragon_sage", name: "Sage Dragon", stat: "INT", combat: false,
      require: { INT: 6 }, alt: { anyFlags: ["half_dragon", "wild_wind", "stolen_egg"], hint: "xuất thân Trứng Rồng Lai, Hơi Thở Đại Ngàn hoặc Bị Đánh Cắp" },
      desc: "Trí tuệ. Đạo Hiền Triết: tri thức cổ đại", income: [1.2, 2, 3, 4.2, 5.5], hazard: 1, gains: { INT: 0.35 } },
  ],
  promoXp: [4, 8, 14, 22],
  roleByPrefix: { dragon_hoard_: "dragon_hoard", dragon_war_: "dragon_war", dragon_sage_: "dragon_sage" },
  focusByPrefix: { dragon_act_hoard_: "work", dragon_act_sleep_: "rest", dragon_act_train_: "train", dragon_act_conquer_: "adventure", dragon_act_magic_: "study", dragon_act_social_: "social" },

  org: {
    id: "dragon_domain",
    name: "Lãnh thổ và kho báu",
    auto: true,
    // ranks come from the script: Nameless Hatchling … Primordial Dragon God (only through dragon_rank_primordial_clash)
    points: [0, 10, 30, 60, 100, 160, null],
    missionWord: "cuộc chinh phạt",
    fameToPts: 0.3,
    board: {
      text: [
        "Gió mang về mùi của vàng và máu. Ở phía chân trời, có kẻ đang lấn vào lãnh thổ của bạn.",
        "Một con quạ bay về đỉnh núi, đậu lên móng vuốt bạn: tin tức về một kho báu chưa có chủ.",
      ],
      skip: "Cuộn mình ngủ tiếp trên núi vàng",
      skipText: "Bạn khẽ phì một làn khói rồi nhắm mắt lại. Lũ sâu bọ dưới kia có thể chờ thêm vài thế kỷ.",
    },
    failText: "Bạn bay về hang ổ với đôi cánh rách và lòng tự tôn bị tổn thương. Kho báu vẫn nằm đó, nhưng không thuộc về bạn.",
  },
  decline: { label: "Kìm nén lại, chờ thêm vài thế kỷ", text: "Bạn ép luồng long lực đang sôi trào lắng xuống. Với một con rồng, vài thế kỷ chỉ là một giấc ngủ ngắn. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "ancient", name: "Ancient Dragon", match: ["ancient", "cổ đại"], life: 5000, minAge: 5000, require: { STR: 12 } },
    { key: "god", name: "Dragon God", match: ["long thần", "dragon god"], life: 10000, minAge: 9000, require: { INT: 15, STR: 15, anyFlags: ["god_slayer", "abyss_conqueror"] } },
  ],

  systems: {
    earlyHazard: 4e-06,
    earlyUntil: "adult",
    noRecruit: true,
    activeFrom: "child",
    jobFrom: "teen",
    bandName: "đám thuộc hạ",
    romance: false,
    autoChildren: false,
    companions: [
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 3 },
      { race: "Minotaur", names: "minotaur", job: "Minotaur Guardian", stat: "STR", weight: 2 },
      { race: "Human", names: "human", job: "Dragon Rider", stat: "AGI", weight: 1 },
    ],
    recruit: {
      text: [
        "Một bầy Kobold bò đến chân núi, dâng lên một rương đồng xu méo mó và xin được phụng sự Long chủ.",
        "Một kẻ phàm trần dũng cảm (hoặc ngu ngốc) leo lên tận hang ổ, quỳ xuống xin được trở thành Kỵ sĩ Rồng của bạn.",
      ],
      join: ["{ally} quỳ rạp trước móng vuốt bạn. Từ nay kẻ đó sống trong bóng cánh của bạn.", "Bạn cho phép {ally} canh giữ cửa hang. Một vinh dự mà kẻ đó sẽ nhớ suốt đời."],
      decline: "Phì lửa đuổi đi",
      declineText: "Một làn lửa nhỏ quét qua. Kẻ kia chạy mất dép. Rồng không cần thuộc hạ.",
    },
    jobSelect: {
      teen: ["Đôi cánh đã đủ cứng để bay qua những rặng núi. Mỗi con rồng phải chọn Đạo của mình: tích trữ, hủy diệt hay hiền triết."],
      adult: ["Bạn đã là Cự Long mà vẫn chưa chọn Đạo. Những con rồng khác bắt đầu coi thường bạn."],
      later: "Ngủ thêm vài trăm năm rồi tính",
      laterText: "Bạn cuộn mình trên đống vàng. Đạo có thể chờ.",
    },
    promotion: {
      try: "Chứng minh sức mạnh của mình",
      wait: "Chờ thêm vài thế kỷ",
      waitText: "Bạn kiên nhẫn chờ đợi. Thời gian đứng về phía rồng.",
      success: "Mặt đất rung chuyển. Từ nay, bạn là {next}.",
      fail: ["Bạn thất bại, và tiếng gầm của bạn vang lên đầy cay đắng giữa các đỉnh núi.", "Kế hoạch đổ vỡ. Bạn trở về hang ổ, chờ vài thế kỷ nữa."],
    },
    crossroads: {
      child: "Bạn đã phá vỏ và sống sót qua trăm năm đầu. Bạn sẽ dành những thế kỷ tới cho điều gì?",
      teen: "Bạn đã đủ lớn để bay qua cả vương quốc. Bạn sẽ dồn sức vào đâu?",
      adult: "Bạn đã là Cự Long. Thế giới bên dưới bắt đầu sợ cái bóng của bạn. Bạn sẽ làm gì?",
      middle: "Năm ngàn năm. Rất ít sinh vật sống lâu hơn bạn. Bạn sẽ dùng thời gian còn lại ra sao?",
      elder: "Chín ngàn năm. Long hồn của bạn bắt đầu mỏi mệt. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Vỏ trứng vỡ tan. Bạn bò ra, phun đốm lửa đầu tiên của đời mình.",
      teen: "Năm trăm năm. Đôi cánh của bạn giờ đã che kín cả một thung lũng.",
      adult: "Hai ngàn năm. Bạn đã là một Cự Long, cái tên được kể trong truyền thuyết của Human.",
      middle: "Năm ngàn năm. Vảy bạn cứng như Huyết Kim, mắt bạn đã thấy các đế chế mọc lên rồi sụp đổ.",
      elder: "Chín ngàn năm. Bạn đã già hơn hầu hết các ngọn núi.",
      default: "Một thiên niên kỷ mới mở ra.",
    },
    parentDeath: ["{who} đã ngã xuống. Xác rồng hóa thành một dãy núi mới, và bạn bay qua nó trong im lặng.", "Tin {who} qua đời đến với bạn sau vài thế kỷ. Với rồng, tang thương cũng đến chậm."],
  },

  overrides: {
    dragon_old_last_breath: { asDeath: "old" },
    dragon_rank_primordial_clash: { require: { guildRank: 5 }, unrequire: { job: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
