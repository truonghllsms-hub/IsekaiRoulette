// Ghoul pack: what the approved Gemini script (content/scripts/ghoul.txt) cannot say by itself.
module.exports = {
  race: "ghoul",
  script: "content/scripts/ghoul.txt",
  story: "content/scripts/ghoul_story.txt",
  exclusive: true,

  // The script's timeline: Ác quỷ thèm thịt 11+, Thợ săn đêm 51+, Tai ương nghĩa trang 151+, Ghoul chúa 301+, Khô cốt 1.000+.
  useScriptStages: true,
  noChildhood: true,
  hazard: 0.0004,
  lifespan: [1150, 1400],

  rename: [
    ["Tử linh sư", "Necromancer"],
    ["Tử Linh Sư", "Necromancer"],
  ],

  // "Kẻ tạo ra bạn" is prose in the script, and often not a person at all (status "none": no alive/dead label)
  parents: {
    ghoul_origin_graveyard: { maker: { name: "Tà khí Đầm Lầy Tử Khí", status: "none", note: "Không có kẻ điều khiển; bạn chỉ là một xác chết hoang dại." } },
    ghoul_origin_massgrave: { maker: { name: "Oán khí của hàng vạn người chết dịch", status: "none", note: "Hội đồng thành phố đã đốt xác không triệt để." } },
    ghoul_origin_lab: { maker: { name: "Zeras", race: "Human", role: "Necromancer của Hắc Nguyệt Hội", trait: "Cuồng tín, coi bạn là con rối thịt", status: "alive" } },
    ghoul_origin_battlefield: { maker: { name: "Lời nguyền chiến trường", status: "none", note: "Sinh ra từ cuộc đụng độ giữa Thánh Kỵ Sĩ Đoàn và Quân đoàn Ma Vương." } },
    ghoul_origin_altar: { maker: { name: "Giáo chủ Hắc Nguyệt Hội", race: "Human", role: "Kẻ thờ phụng Vực Thẳm Cổ Thần", trait: "Tàn nhẫn, hiến tế người sống", status: "alive" } },
    ghoul_origin_dungeon: { maker: { name: "Lõi Mana của Hầm ngục", status: "none", note: "Hầm ngục tái chế xác của những kẻ xâm nhập." } },
  },

  stageNames: { infant: "Xác Chết Thức Tỉnh", child: "Ác Quỷ Thèm Thịt", teen: "Thợ Săn Đêm", adult: "Tai Ương Nghĩa Trang", middle: "Ghoul Chúa", elder: "Khô Cốt Diệt Vong" },
  stagePhrases: {},
  diff: { stat: [2, 3, 5, 7, 9, 11], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["adventure", "play", "train", "work", "study", "rest"],
  focus: {
    adventure: { name: "Lang thang tìm xác", desc: "Đi săn đêm theo lệnh bầy, leo thứ bậc", stages: ["infant", "child", "teen", "adult", "middle", "elder"], tags: null },
    play: { name: "Ăn xác phục hồi", desc: "Sức mạnh, Sức khỏe; gặm xác để vá thân thể", stages: ["infant", "child", "teen", "adult", "middle", "elder"], gains: { STR: 0.2 }, bars: { health: 2 } },
    train: { name: "Khổ luyện (săn mồi sống)", desc: "Sức mạnh, Nhanh nhẹn; săn kẻ còn sống", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Phục vụ Necromancer", desc: "Làm vai trò của mình dưới trướng chủ nhân", stages: ["child", "teen", "adult", "middle", "elder"] },
    study: { name: "Lẩn trốn ánh sáng", desc: "Nhanh nhẹn, Trí tuệ; ẩn mình khỏi Thánh quang", stages: ["infant", "child", "teen", "adult", "middle", "elder"], gains: { AGI: 0.2, INT: 0.15 } },
    rest: { name: "Nằm im dưới mộ", desc: "Ngủ dưới đất; hồi sức, thời gian trôi nhanh", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 0.5 } },
    social: { hidden: true },
  },

  roles: [
    { title: "NIGHT STALKER", id: "ghoul_stalker", name: "Night Stalker", stat: "AGI", combat: true,
      require: { AGI: 5 }, alt: { anyFlags: ["dungeon_spawn"], hint: "xuất thân Chiến trường đẫm máu hoặc Hầm ngục lãng quên" },
      desc: "Nhanh nhẹn. Rình rập và săn mồi trong đêm", income: [0.5, 0.9, 1.4, 2, 2.8], hazard: 1.8, gains: { AGI: 0.35 } },
    { title: "GRAVE SENTINEL", id: "ghoul_sentinel", name: "Grave Sentinel", stat: "STR", combat: true,
      require: { STR: 5 }, alt: { anyFlags: ["mass_grave"], hint: "xuất thân Hố chôn tập thể" },
      desc: "Sức mạnh. Canh giữ hầm mộ như một bức tường thịt", income: [0.5, 0.9, 1.4, 2, 2.8], hazard: 1.6, gains: { STR: 0.35 } },
    { title: "AWAKENED GHOUL", id: "ghoul_awakened", name: "Awakened Ghoul", stat: "INT", combat: false,
      require: { INT: 6 }, alt: { anyFlags: ["necromancer_puppet"], hint: "xuất thân Bàn thí nghiệm Tử linh hoặc Tế đàn hắc ám" },
      desc: "Trí tuệ. Ghoul tìm lại được ý thức", income: [0.5, 1, 1.6, 2.4, 3.2], hazard: 1.2, gains: { INT: 0.35 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: { ghoul_job_stalker_: "ghoul_stalker", ghoul_job_sentinel_: "ghoul_sentinel", ghoul_job_awakened_: "ghoul_awakened" },
  focusByPrefix: { ghoul_action_wander_: "adventure", ghoul_action_eat_: "play", ghoul_action_hunt_: "train", ghoul_action_serve_: "work", ghoul_action_hide_: "study", ghoul_action_grave_: "rest" },

  org: {
    id: "ghoul_horde",
    name: "Bầy xác sống",
    auto: true,
    // ranks from the script: Meat Shield … Necropolis Sovereign (only through ghoul_rank_sovereign)
    points: [0, 10, 25, 45, 70, 100, null],
    missionWord: "cuộc săn đêm",
    fameToPts: 0.3,
    board: {
      text: [
        "Tiếng tru tréo vọng lên từ hầm mộ. Bầy xác sống đang tụ lại, ngửi thấy mùi thịt tươi ở phía xa.",
        "Necromancer gõ cây trượng xương xuống nền đá. Những hốc mắt trống rỗng đồng loạt quay về phía bạn.",
      ],
      skip: "Rúc sâu xuống đất, mặc kệ",
      skipText: "Bạn vùi mình vào lớp đất ẩm. Bầy kéo đi mà không có bạn.",
    },
    failText: "Bạn lết về hầm mộ với một cánh tay đứt lìa và cái bụng rỗng. Cả bầy chẳng buồn nhìn.",
  },
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn nghiến chặt hàm răng mục, ép cơn biến đổi lắng xuống. Thân xác này còn chịu được thêm vài năm. Cơ hội sẽ quay lại." },

  evos: [
    { key: "ghast", name: "Ghast", match: ["ghast"], life: 200, minAge: 151, require: { STR: 9, AGI: 7 } },
    { key: "lich", name: "Lich", match: ["lich"], life: 2000, minAge: 301, require: { INT: 10, anyFlags: ["dark_magic_adept", "black_bone_evolution"] } },
  ],

  systems: {
    noRecruit: true,
    activeFrom: "infant",
    bandName: "bầy",
    romance: false,
    // the script has events about children but no birth event: births happen on their own, rarely
    autoChildren: true,
    childStages: ["child", "teen", "adult", "middle"],
    childRate: 0.05,
    maxChildren: 3,
    child: ["Bạn cắn một kẻ hấp hối. Ba đêm sau, {child} bò lên khỏi mộ và lẽo đẽo theo bạn như một đứa con.", "Một cái xác bạn chôn dở bỗng cựa mình. {child} trỗi dậy, coi bạn là kẻ đầu đàn."],
    companions: [
      { race: "Ghoul", names: "ghoul", job: "Night Stalker", stat: "AGI", weight: 3 },
      { race: "Ghoul", names: "ghoul", job: "Grave Sentinel", stat: "STR", weight: 3 },
      { race: "Ghoul", names: "ghoul", job: "Awakened Ghoul", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Ghoul cụt tay lê bước theo bạn suốt ba đêm, gầm gừ khe khẽ như muốn nói điều gì.",
        "Sau cuộc săn, một xác sống khác ngồi xuống cạnh bạn và chia nửa cái đùi người. Ở Ghoul, đó là lời đề nghị đi cùng.",
      ],
      join: ["{ally} khò khè một tiếng rồi lặng lẽ đi sau bạn. Từ nay hai xác chết chung một hầm mộ.", "{ally} gặm nốt miếng thịt rồi đứng dậy theo bạn. Không cần lời nào cả."],
      decline: "Gầm lên đuổi đi",
      declineText: "Bạn nhe hàm răng mục gầm gừ. Kẻ kia lùi lại rồi biến vào bóng tối.",
    },
    jobSelect: {
      teen: ["Cơn đói đã bớt điên dại. Necromancer dồn lũ Ghoul lại, chia việc bằng roi xương. Bạn phải chọn chỗ đứng của mình."],
      adult: ["Không có vai trò, bạn chỉ là một cái xác biết đi. Đã đến lúc chọn con đường."],
      later: "Rúc xuống đất, mặc kệ tất cả",
      laterText: "Bạn vùi mình xuống lớp đất lạnh. Một cái xác vô dụng chẳng ai tìm.",
    },
    promotion: {
      try: "Liều một phen để leo lên",
      wait: "Nằm im chờ thời",
      waitText: "Bạn nằm im dưới mộ. Xác chết có thừa thời gian.",
      success: "Cả bầy im lặng nhìn bạn. Từ nay, bạn là {next}.",
      fail: ["Bạn thất bại, và cái xác của bạn lại rụng thêm vài mảnh.", "Mọi thứ đổ bể. Bạn bò về hầm mộ, chờ dịp khác."],
    },
    crossroads: {
      child: "Cơn đói đầu tiên đã qua. Bạn sẽ dành những năm tới để làm gì?",
      teen: "Bạn đã thành một Thợ săn đêm. Bạn sẽ dồn sức vào đâu?",
      adult: "Một trăm năm mươi năm. Nghĩa trang này đã là của bạn. Bạn sẽ làm gì tiếp?",
      middle: "Ba trăm năm. Rất ít Ghoul tồn tại lâu đến thế. Bạn sẽ dùng nó ra sao?",
      elder: "Thân xác bạn đã khô thành xương. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Mười năm sau khi trỗi dậy, cơn đói trong bạn đã thành bản năng.",
      teen: "Năm mươi năm. Bạn đã là một Thợ săn đêm, biết rình mồi thay vì lao vào cắn xé.",
      adult: "Một trăm năm mươi năm. Dân làng gần đó gọi bạn là tai ương của nghĩa trang.",
      middle: "Ba trăm năm. Cả bầy xác sống cúi đầu khi bạn đi qua.",
      elder: "Một ngàn năm. Thịt trên người bạn đã khô hết, chỉ còn xương và một chút ký ức.",
      default: "Một chương mới của cái xác này mở ra.",
    },
    parentDeath: ["Bạn nghe tin {who} đã chết. Ký ức về con người đó chỉ còn là một vệt mờ trong đầu bạn.", "{who} đã qua đời. Bạn đứng lặng một lúc, rồi quay lại với cơn đói."],
  },

  overrides: {
    ghoul_action_serve_defend: { keep: true },
    ghoul_rank_sovereign: { require: { guildRank: 5 }, unrequire: { job: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
  },
};
