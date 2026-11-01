// Minotaur pack: what the approved Gemini script (content/scripts/minotaur.txt) cannot say by itself.
module.exports = {
  race: "minotaur",
  script: "content/scripts/minotaur.txt",
  story: "content/scripts/minotaur_story.txt",
  exclusive: true,
  useScriptStages: true,

  rename: [
    ["Minotaur Hoàng Kim", "Golden Minotaur"],
    ["Minotaur Thần thú", "Mythical Minotaur"],
    ["Minotaur Thần Thú", "Mythical Minotaur"],
  ],

  stageNames: { infant: "Bê Con Cuồng Nộ", child: "Kẻ Lạc Lối", teen: "Đấu Sĩ Sừng Nhọn", adult: "Ác Thú Gác Cổng", middle: "Bạo Chúa Mê Cung", elder: "Lão Ngưu Mù Lòa" },
  stagePhrases: {},
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "train", "work", "adventure", "study", "rest"],
  focus: {
    play: { name: "Húc phá", desc: "Sức mạnh; húc đổ mọi thứ trên đường", stages: ["infant", "child", "teen"], gains: { STR: 0.3 }, bars: { joy: 1 } },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; rèn sừng và rìu", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Canh giữ mê cung", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["teen", "adult", "middle", "elder"] },
    adventure: { name: "Giác đấu", desc: "Những trận chiến sinh tử, leo thứ bậc Mê cung", stages: ["teen", "adult", "middle", "elder"], tags: null },
    study: { name: "Lang thang tìm lãnh thổ", desc: "Nhanh nhẹn, May mắn; đi tìm một mê cung của riêng mình", stages: ["child", "teen", "adult", "middle"], gains: { AGI: 0.2, LUCK: 0.15 } },
    rest: { name: "Ngủ trên đống xương", desc: "Hồi sức giữa đống xương con mồi", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 1 } },
    social: { hidden: true },
  },

  roles: [
    { title: "LABYRINTH GUARDIAN", id: "minotaur_guardian", name: "Labyrinth Guardian", stat: "STR", combat: true,
      require: { STR: 5 }, alt: { anyFlags: ["maze_guardian"], hint: "sinh ra ở Tâm điểm Mê cung hoặc Đáy Vực Thẳm" },
      desc: "Sức mạnh. Hộ vệ Mê cung, canh giữ vĩnh hằng trong bóng tối", income: [0.8, 1.3, 2, 2.8, 3.8], hazard: 1.5, gains: { STR: 0.35 } },
    { title: "GLADIATOR", id: "minotaur_gladiator", name: "Gladiator", stat: "STR", combat: true,
      require: { STR: 4, AGI: 4 }, alt: { anyFlags: ["gladiator_bull", "enslaved"], hint: "xuất thân Đấu trường sinh tử hoặc Phòng tra tấn" },
      desc: "Sức mạnh và Nhanh nhẹn. Đấu sĩ Huyết Sa", income: [0.8, 1.4, 2.2, 3.2, 4.2], hazard: 2, gains: { STR: 0.2, AGI: 0.2 } },
    { title: "ABYSSAL SHAMAN", id: "minotaur_shaman", name: "Abyssal Shaman", stat: "INT", combat: true,
      require: { INT: 6 }, alt: { anyFlags: ["cult_god"], hint: "xuất thân Tế đàn dị giáo hoặc Tàn tích đền thờ cổ" },
      desc: "Trí tuệ. Vu sư Vực Thẳm", income: [0.6, 1.1, 1.8, 2.8, 3.8], hazard: 1.3, gains: { INT: 0.35 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { minota_event_guard: "minotaur_guardian", minota_event_glad: "minotaur_gladiator", minota_event_sham: "minotaur_shaman" },
  focusByPrefix: { minota_act_smash: "play", minota_act_train: "train", minota_act_guard: "work", minota_act_duel: "adventure", minota_act_wander: "study", minota_act_sleep: "rest" },

  org: {
    id: "minotaur_labyrinth",
    name: "Mê cung",
    auto: true,
    // the script names no hierarchy: these ranks follow its stages and the "bậc 7" throne event
    ranks: ["Stray Calf", "Maze Sentry", "Horned Gladiator", "Labyrinth Brute", "Labyrinth Warden", "Labyrinth Tyrant", "Labyrinth Sovereign"],
    points: [0, 2, 5, 9, 14, 20, null],
    missionWord: "trận chiến",
    fameToPts: 0.25,
    board: {
      text: [
        "Tiếng chiêng đồng vang dội khắp các hành lang đá. Có kẻ đang thách thức sức mạnh của bạn.",
        "Mùi mồ hôi và thép lạnh bay vào mê cung. Một trận chiến mới đang chờ chiếc rìu của bạn.",
      ],
      skip: "Khịt mũi, nằm lại trên đống xương",
      skipText: "Bạn phì hơi nóng ra lỗ mũi rồi nhắm mắt lại. Lũ sâu bọ có thể chờ.",
    },
    failText: "Bạn lê về mê cung, sừng mẻ và đầy vết chém. Đám Minotaur trẻ nhìn bạn với ánh mắt khác.",
  },
  hierarchy: [
    { name: "Stray Calf", text: "Bạn chỉ là một con bê lạc giữa những hành lang đá lạnh." },
    { name: "Maze Sentry", text: "Bạn được giao canh một ngã rẽ của mê cung. Kẻ nào lạc vào đó là con mồi của bạn." },
    { name: "Horned Gladiator", text: "Tiếng hò reo của đấu trường gọi tên bạn. Cặp sừng nhọn đã nếm đủ máu." },
    { name: "Labyrinth Brute", text: "Cả một tầng mê cung run lên mỗi khi bạn dậm chân." },
    { name: "Labyrinth Warden", text: "Bạn nắm chìa khóa của những cánh cửa đá sâu nhất. Kẻ lạc đường cầu xin bạn tha mạng." },
    { name: "Labyrinth Tyrant", text: "Bạn là Bạo chúa của Mê cung. Mạo hiểm giả đặt tên bạn vào những bản đồ cảnh báo." },
    { name: "Labyrinth Sovereign", text: "Ngai vàng vấy máu giờ là của bạn. Toàn bộ Mê cung cúi đầu trước tiếng gầm của bạn." },
  ],
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn khịt mũi, ép cơn biến đổi lắng xuống. Cặp sừng còn chịu được thêm vài mùa. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "gold", name: "Golden Minotaur", match: ["golden", "hoàng kim"], life: 10, minAge: 35, require: { STR: 10, wealth: 70, anyFlags: ["bloody_axe", "sovereign_blood"] } },
    { key: "myth", name: "Mythical Minotaur", match: ["thần thú", "mythical"], life: 20, minAge: 35, require: { INT: 8, STR: 9, anyFlags: ["abyss_stare", "cult_god"] } },
  ],

  systems: {
    noRecruit: true,
    bandName: "bầy",
    romance: false,
    autoChildren: false,
    companions: [
      { race: "Minotaur", names: "minotaur", job: "Gladiator", stat: "STR", weight: 3 },
      { race: "Minotaur", names: "minotaur", job: "Labyrinth Guardian", stat: "STR", weight: 2 },
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 2 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Minotaur trẻ bị đuổi khỏi đàn đứng chắn trước mặt bạn, khịt mũi: \"Cho tôi đi cùng.\"",
        "Sau trận giác đấu, một bầy Kobold quỳ rạp trước móng guốc bạn, xin được làm tay sai.",
      ],
      join: ["{ally} húc nhẹ sừng vào vai bạn. Ở Minotaur, đó là lời thề trung thành.", "{ally} lặng lẽ đi theo sau bạn. Từ nay hai kẻ chung một mê cung."],
      decline: "Gầm lên đuổi đi",
      declineText: "Bạn rống lên một tiếng. Kẻ kia lùi lại rồi biến mất vào hành lang tối.",
    },
    jobSelect: {
      teen: ["Cặp sừng của bạn đã đủ nhọn. Mỗi Minotaur phải chọn con đường của mình: canh giữ, giác đấu, hay nghe tiếng thì thầm của Vực Thẳm."],
      adult: ["Một Minotaur không có chỗ đứng chỉ là một con thú lạc. Đã đến lúc chọn con đường."],
      later: "Húc tường thêm vài năm rồi tính",
      laterText: "Bạn húc đổ thêm một bức tường. Con đường có thể chờ.",
    },
    promotion: {
      try: "Lao vào chứng minh sức mạnh",
      wait: "Chưa đến lúc, mài sừng chờ thời",
      waitText: "Bạn mài cặp sừng vào vách đá. Lần sau sẽ khác.",
      success: "Mê cung rung chuyển. Từ nay, bạn là {next}.",
      fail: ["Bạn bị đánh gục trước những tiếng cười chế nhạo.", "Bạn thất bại, và vết thương này sẽ thành sẹo."],
    },
    crossroads: {
      child: "Bạn đã đủ lớn để không húc vào mọi thứ. Những năm tới, bạn sẽ dồn sức vào đâu?",
      teen: "Cặp sừng đã nhọn. Bạn sẽ dùng nó vào việc gì?",
      adult: "Bạn đã là một Ác Thú Gác Cổng. Những năm tới, bạn sẽ làm gì?",
      middle: "Bạn đã là Bạo Chúa Mê Cung. Bạn sẽ dùng những năm này ra sao?",
      elder: "Mắt bạn đã mờ, nhưng tai vẫn nghe rõ tiếng bước chân trong mê cung. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Bạn không còn là con bê húc loạn. Mê cung bắt đầu trở thành nhà.",
      teen: "Cặp sừng của bạn đã nhọn như mũi giáo. Bạn đã là một Đấu Sĩ Sừng Nhọn.",
      adult: "Bạn đã trưởng thành. Những kẻ lạc vào mê cung giờ phải đi qua bạn.",
      middle: "Bạn đã là Bạo Chúa của Mê cung. Tiếng gầm của bạn vang khắp các tầng đá.",
      elder: "Đôi mắt bạn mờ dần. Bạn đã là một Lão Ngưu, nhưng vẫn chưa ai dám bước qua cửa của bạn.",
      default: "Một chương mới của cuộc đời Minotaur mở ra.",
    },
    parentDeath: ["{who} đã chết. Bạn kéo xác về mê cung và chôn dưới phiến đá lớn nhất.", "Tin {who} ngã xuống đến tai bạn. Bạn rống một tiếng dài rồi im lặng suốt nhiều ngày."],
  },

  questOverrides: {
    lenh_trieu_tap_dam_mau: { minRank: 4 },
  },
  overrides: {
    minota_mate_maze: { require: { free: true } },
    minota_rank_sovereign: { require: { guildRank: 5 }, unrequire: { job: true, jobRank: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
