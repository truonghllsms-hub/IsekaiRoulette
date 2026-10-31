// Orc pack: what the approved Gemini script (content/scripts/orc.txt) cannot say by itself.
module.exports = {
  race: "orc",
  script: "content/scripts/orc.txt",
  story: "content/scripts/orc_story.txt",
  useScriptStages: true,

  rename: [
    ["Thượng Quỷ Da Xanh", "High Orc"],
  ],

  stageNames: { infant: "Orc Non Nớt", child: "Tân Binh Bộ Lạc", teen: "Chiến Binh Máu Nóng", adult: "Huyết Kỵ Sĩ", middle: "Tướng Lĩnh Chiến Trường", elder: "Tù Trưởng Già Cỗi" },
  stagePhrases: { "giai đoạn cuối đời": "elder" },
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"],
  focus: {
    play: { name: "Đánh nhau", desc: "Sức mạnh, Nhanh nhẹn; ẩu đả với lũ Orc cùng lứa", stages: ["infant", "child", "teen"], gains: { STR: 0.25, AGI: 0.15 }, bars: { joy: 1 } },
    study: { name: "Học lời tổ tiên", desc: "Trí tuệ; nghe Thầy cúng kể chuyện cũ", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; rèn rìu và thân thể", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Phục dịch bộ lạc", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["child", "teen", "adult", "middle", "elder"] },
    adventure: { name: "Chinh phạt", desc: "Theo Tù trưởng đi chinh phạt, leo thứ bậc bộ lạc", stages: ["teen", "adult", "middle"], tags: null },
    social: { name: "Thách đấu và tranh quyền", desc: "Tranh chỗ đứng, kết bè, giành bạn đời", stages: ["teen", "adult", "middle", "elder"] },
    rest: { name: "Uống rượu nghỉ ngơi", desc: "Hồi sức bên vò rượu nấm", stages: ["child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 1.5 } },
  },

  roles: [
    { title: "ORC BERSERKER", id: "orc_berserker", name: "Orc Berserker", stat: "STR", combat: true,
      require: { STR: 5 }, alt: { anyFlags: ["warborn", "gladiator"], hint: "sinh ra trong khói lửa hoặc từng là nô lệ giác đấu" },
      desc: "Sức mạnh. Cuồng Chiến Binh", income: [0.8, 1.2, 1.8, 2.6, 3.4], hazard: 2.2, gains: { STR: 0.35 } },
    { title: "ORC RANGER", id: "orc_ranger", name: "Orc Ranger", stat: "AGI", combat: true,
      require: { AGI: 5 }, alt: { anyFlags: ["orphan_orc"], hint: "xuất thân Mầm Mống Tàn Lụi" },
      desc: "Nhanh nhẹn. Thợ Săn Gió Khát", income: [0.8, 1.2, 1.8, 2.5, 3.2], hazard: 1.6, gains: { AGI: 0.35 } },
    { title: "ORC SHAMAN", id: "orc_shaman", name: "Orc Shaman", stat: "INT", combat: true,
      require: { INT: 5 }, alt: { anyFlags: ["blessed_orc"], hint: "là Đứa con của Tà Thần" },
      desc: "Trí tuệ. Thầy Cúng Huyết Tế", income: [0.6, 1, 1.6, 2.4, 3.4], hazard: 1.4, gains: { INT: 0.35 } },
    { title: "ORC SMITH", id: "orc_smith", name: "Orc Smith", stat: "STR", combat: false,
      require: { STR: 4, INT: 4 }, alt: { anyFlags: ["exiled_blood"], hint: "là Hậu duệ Kẻ Lưu Đày" },
      desc: "Sức mạnh và Trí tuệ. Thợ Rèn Chiến Địa", income: [0.9, 1.4, 2.1, 3, 4], hazard: 1.1, gains: { STR: 0.2, INT: 0.15 } },
    { title: "WOLF RIDER", id: "orc_rider", name: "Orc Wolf Rider", stat: "AGI", combat: true,
      require: {},
      desc: "May mắn và Nhanh nhẹn. Kỵ Sĩ Sói Điên, ai cũng có thể gia nhập", income: [0.8, 1.2, 1.8, 2.6, 3.4], hazard: 2, gains: { AGI: 0.2, LUCK: 0.15 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { orc_job_berserker: "orc_berserker", orc_job_hunter: "orc_ranger", orc_job_shaman: "orc_shaman", orc_job_smith: "orc_smith", orc_job_rider: "orc_rider" },
  focusByPrefix: { orc_act_brawl: "play", orc_act_learn: "study", orc_act_train: "train", orc_act_serve: "work", orc_act_raid: "adventure", orc_act_duel: "social", orc_act_rest: "rest" },

  org: {
    id: "orc_tribe",
    name: "Bộ lạc",
    auto: true,
    // ranks from the script: Green Fang … Warchief (only through the throne duel)
    points: [0, 2, 5, 9, 14, 20, null],
    missionWord: "cuộc chinh phạt",
    fameToPts: 0.2,
    board: {
      text: [
        "Trống trận nện thình thịch. Tù trưởng giơ cao chiếc rìu: một cuộc chinh phạt mới!",
        "Lửa trại bùng lên giữa thảo nguyên. Cả bộ lạc gào thét đòi máu.",
      ],
      skip: "Ở lại uống rượu",
      skipText: "Bạn nốc cạn vò rượu nấm và lăn ra ngủ. Bộ lạc đi mà không có bạn.",
    },
    failText: "Bạn quay về trại với vết thương đầy người và hai bàn tay trắng. Lũ Orc trẻ cười khẩy sau lưng.",
  },
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn nghiến răng, ép cơn sôi sục trong máu lắng xuống. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "high", name: "High Orc", match: ["high orc"], life: 15, minAge: 20, require: { INT: 7, fame: 20 } },
    { key: "warlord", name: "Orc Warlord", match: ["warlord", "lãnh chúa cuồng nộ"], life: 10, minAge: 25, require: { STR: 10, fame: 20 } },
  ],

  systems: {
    bandName: "chiến hữu",
    romance: false,
    // the script has child events but no birth event
    autoChildren: true,
    childRate: 0.08,
    maxChildren: 3,
    child: ["{child} chào đời giữa tiếng trống trận. Đứa bé gào to đến mức cả trại phải ngoái lại.", "Bạn giơ {child} lên trước lửa trại. Cả bộ lạc gầm vang chào đón một chiến binh mới."],
    companions: [
      { race: "Orc", names: "orc", job: "Orc Berserker", stat: "STR", weight: 4 },
      { race: "Orc", names: "orc", job: "Orc Ranger", stat: "AGI", weight: 2 },
      { race: "Orc", names: "orc", job: "Orc Shaman", stat: "INT", weight: 1 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 1 },
    ],
    recruit: {
      text: [
        "Sau trận ẩu đả, gã Orc vừa bị bạn đấm gãy nanh đứng dậy, nhổ máu và chìa tay ra: \"Mày mạnh. Tao theo mày.\"",
        "Một Orc lang thang bị đuổi khỏi bộ lạc khác quỳ trước lửa trại của bạn, xin được chiến đấu dưới ngọn cờ của bạn.",
      ],
      join: ["{ally} đập rìu vào khiên của bạn. Từ nay hai kẻ là chiến hữu.", "{ally} rạch tay, nhỏ máu vào vò rượu chung. Huyết thệ đã thành."],
      decline: "Đá nó đi, kẻ yếu không đáng đi cùng",
      declineText: "Bạn đá kẻ kia lăn ra đất. Ở bộ lạc, chỉ kẻ mạnh mới được đi cùng kẻ mạnh.",
    },
    jobSelect: {
      teen: ["Tù trưởng gọi lũ Orc trẻ ra giữa trại. Mỗi đứa phải chọn cho mình một con đường: rìu, cung, trống cúng, búa rèn hay lưng sói."],
      adult: ["Một Orc trưởng thành mà chưa có vai trò là nỗi nhục của bộ lạc. Đã đến lúc chọn."],
      later: "Đánh nhau thêm vài năm đã",
      laterText: "Bạn quay lại với những trận ẩu đả. Con đường có thể chờ.",
    },
    promotion: {
      try: "Lao vào chứng minh sức mạnh",
      wait: "Chưa đến lúc",
      waitText: "Bạn nhổ nước bọt xuống đất. Lần sau.",
      success: "Cả bộ lạc gầm vang tên bạn. Từ nay, bạn là {next}.",
      fail: ["Bạn bị đánh gục trước tiếng cười của cả trại.", "Bạn thất bại. Vết sẹo này sẽ nhắc bạn mãi."],
    },
    crossroads: {
      child: "Bạn đã là Tân binh của bộ lạc. Những năm tới, bạn sẽ dồn sức vào đâu?",
      teen: "Máu bạn đang sôi. Bạn sẽ dùng nó vào việc gì?",
      adult: "Bạn đã là Huyết Kỵ Sĩ. Bạn sẽ làm gì với những năm tới?",
      middle: "Ít Orc nào sống đến khi thành Tướng lĩnh. Bạn sẽ dùng những năm này ra sao?",
      elder: "Bạn đã già, điều hiếm hoi với một Orc. Những ngày cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Nanh bạn đã nhú. Bộ lạc trao cho bạn chiếc rìu gỗ đầu tiên.",
      teen: "Máu bạn sôi lên trước mỗi trận chiến. Bạn đã là Chiến binh máu nóng.",
      adult: "Bạn đã trưởng thành. Một con sói chiến gầm gừ nhận bạn làm chủ.",
      middle: "Bạn đã là Tướng lĩnh chiến trường. Những Orc trẻ nhìn bạn với ánh mắt kính sợ.",
      elder: "Nanh bạn đã mòn, lưng đã còng. Bộ lạc vẫn nhường bạn chỗ ngồi gần lửa nhất.",
      default: "Một chương mới của cuộc đời Orc mở ra.",
    },
    parentDeath: ["{who} đã chết. Bộ lạc đốt xác trên giàn lửa cao, và bạn gầm lên cùng tiếng trống.", "{who} ngã xuống trong một trận chiến xa. Bạn mài rìu suốt đêm đó."],
  },

  questOverrides: {
    tieng_goi_tu_to_tien: { minRank: 2 },
    bong_canh_che_khuat_thao_nguyen: { minRank: 3 },
    dap_nat_cong_thanh_quang: { minRank: 5 },
    huyen_thoai_dinh_hoa_nguc: { minRank: 6 },
  },
  overrides: {
    orc_rank_warchief_duel: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
