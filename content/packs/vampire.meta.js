// Vampire pack: what the approved Gemini script (content/scripts/vampire.txt) cannot say by itself.
module.exports = {
  race: "vampire",
  script: "content/scripts/vampire.txt",
  story: "content/scripts/vampire_story.txt",
  exclusive: true,

  // Vampires live on the script's timeline (Bá tước 201+, Chân Tổ 801+, Tro tàn 2.900+), not the default one.
  useScriptStages: true,
  noChildhood: true,
  hazard: 0.00015,
  lifespan: [2950, 3150],
  // Not a "civil" race: no Guild Bình Minh, no human jobs or human childhood events.
  tags: ["humanoid", "undead", "immortal", "noble_monster"],

  rename: [
    ["Quý tộc Huyết Tộc", "Vampire Noble"],
    ["Kẻ Bước Dưới Nắng", "Daywalker"],
    ["Ma cà rồng", "Vampire"],
    ["ma cà rồng", "Vampire"],
    ["Huyết tộc", "Huyết Tộc"],
  ],

  stageNames: { infant: "Tân Sinh Huyết Tộc", child: "Huyết Đệ", teen: "Bá Tước Bóng Đêm", adult: "Cổ Huyết", middle: "Thượng Cổ Huyết", elder: "Tro Tàn Bất Tử" },
  stagePhrases: { "đời thường": "", "bất kỳ lúc nào ở cuối đời": "elder", "cuối đời": "elder" },
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["study", "train", "adventure", "social", "work", "rest"],
  focus: {
    play: { hidden: true },
    study: { name: "Học hành", desc: "Trí tuệ; nghệ thuật và huyết thuật", stages: ["infant", "child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; võ thuật bóng đêm", stages: ["infant", "child", "teen", "adult", "middle"] },
    adventure: { name: "Săn máu", desc: "Săn con mồi, nhận mệnh lệnh của gia tộc, leo thứ bậc", stages: ["infant", "child", "teen", "adult", "middle", "elder"], tags: null },
    social: { name: "Dạ tiệc giao du", desc: "Ngoại giao, tiệc máu, kết đồng minh", stages: ["child", "teen", "adult", "middle", "elder"] },
    work: { name: "Âm mưu trong gia tộc", desc: "Làm vai trò của mình, tranh giành, lật đổ", stages: ["child", "teen", "adult", "middle", "elder"] },
    rest: { name: "Ngủ trong quan tài", desc: "Giấc ngủ dài; hồi sức, thời gian trôi nhanh", stages: ["infant", "child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 0.5 } },
  },

  roles: [
    { title: "QUÝ TỘC DẠ TIỆC", id: "vampire_noble", name: "Night Noble", stat: "LUCK", combat: false,
      ranks: ["Uninvited Guest", "Night Diner", "Ball Manipulator", "Marquis of Splendor", "Night Monarch"],
      require: { LUCK: 5 }, alt: { anyFlags: ["pure_blood", "noble_pact"], hint: "xuất thân Lâu đài Chân Tổ hoặc Giao kèo quý tộc" },
      desc: "May mắn. Thao túng giới thượng lưu bằng dạ tiệc", income: [1, 1.6, 2.4, 3.4, 4.5], hazard: 1, gains: { LUCK: 0.2, INT: 0.15 } },
    { title: "NIGHT BLADE", id: "vampire_blade", name: "Night Blade", stat: "AGI", combat: true,
      ranks: ["Shadow Novice", "Nightwalker", "Blood Blade", "Reaper of the Night", "Night Lord"],
      require: { AGI: 5 }, alt: { anyFlags: ["infected_vampire", "fallen_knight"], hint: "xuất thân Vết cắn trong ngõ hẻm hoặc Huyết thệ chiến trường" },
      desc: "Nhanh nhẹn. Huyết Kiếm Sĩ ám sát trong đêm", income: [0.8, 1.3, 2, 2.8, 3.6], hazard: 1.8, gains: { AGI: 0.35 } },
    { title: "BLOOD MAGE", id: "vampire_mage", name: "Blood Mage", stat: "INT", combat: true,
      ranks: ["Blood Acolyte", "Vein Manipulator", "Crimson Magus", "Abyssal Archmage", "Blood Lord"],
      require: { INT: 5 }, alt: { anyFlags: ["cult_vampire", "pure_blood"], hint: "xuất thân Tế đàn Hắc Nguyệt hoặc Lâu đài Chân Tổ" },
      desc: "Trí tuệ. Huyết Pháp Sư điều khiển máu", income: [0.7, 1.2, 2, 3, 4], hazard: 1.4, gains: { INT: 0.35 } },
    { title: "NIGHT HUNTER", id: "vampire_hunter", name: "Night Hunter", stat: "STR", combat: true,
      ranks: ["Hunting Bat", "Night Beast", "Bloodthirsty Hunter", "Vengeful Blood Wolf", "Apex Predator"],
      require: { STR: 5 }, alt: { anyFlags: ["infected_vampire", "fallen_knight"], hint: "xuất thân Vết cắn trong ngõ hẻm hoặc Huyết thệ chiến trường" },
      desc: "Sức mạnh. Thợ Săn Màn Đêm, săn cả quái vật", income: [0.8, 1.2, 1.8, 2.6, 3.4], hazard: 2, gains: { STR: 0.35 } },
    { title: "KẺ ẨN MÌNH", id: "vampire_hidden", name: "Hidden One", stat: "INT", combat: false,
      ranks: ["Pale Traveler", "Mystery Merchant", "False Baron", "Shadow Master", "Imperial Advisor"],
      require: { INT: 4, LUCK: 4 }, alt: { anyFlags: ["noble_pact", "pure_blood"], hint: "xuất thân Giao kèo quý tộc hoặc Hầm Mộ Bạch Ngà" },
      desc: "Trí tuệ và May mắn. Trà trộn vào giới quý tộc Human", income: [1, 1.5, 2.3, 3.2, 4.2], hazard: 1.2, gains: { INT: 0.2, LUCK: 0.15 } },
  ],
  promoXp: [4, 8, 14, 22],
  roleByPrefix: { vampir_noble_: "vampire_noble", vampir_blade_: "vampire_blade", vampir_mage_: "vampire_mage", vampir_hunter_: "vampire_hunter", vampir_hidden_: "vampire_hidden" },
  focusByPrefix: { vampir_study_: "study", vampir_train_: "train", vampir_hunt_: "adventure", vampir_social_: "social", vampir_intrigue_: "work", vampir_sleep_: "rest" },

  org: {
    id: "vampire_clan",
    name: "Gia tộc Huyết Tộc",
    auto: true,
    ranks: ["Kẻ Lây Nhiễm", "Tân Huyết", "Huyết Hầu", "Nam Tước Bóng Đêm", "Hầu Tước Ma Mị", "Huyết Vương", "Chân Tổ"],
    // Chân Tổ is taken only by defeating the old True Ancestor (vampir_rank_ancestor).
    points: [0, 4, 10, 18, 28, 40, null],
    missionWord: "mệnh lệnh gia tộc",
    fameToPts: 0.2,
    board: {
      text: [
        "Một con dơi đỏ thả xuống bàn bạn phong thư niêm sáp máu: gia tộc có việc cần đến bạn.",
        "Trong dạ tiệc, vị Bá tước chủ nhà khẽ nghiêng ly rượu máu về phía bạn. Đó là một mệnh lệnh, không phải lời mời.",
      ],
      skip: "Viện cớ ánh trăng không thuận, từ chối",
      skipText: "Bạn gửi lại một lời cáo lỗi viết bằng mực bạc. Gia tộc ghi nhớ, nhưng không nói gì.",
    },
    failText: "Bạn trở về lâu đài trong im lặng. Ánh mắt lạnh lùng của các bậc trưởng lão nói thay mọi lời trách phạt.",
  },
  hierarchy: [
    { name: "Kẻ Lây Nhiễm", text: "Chút ma huyết rỉ ra từ nanh vuốt quỷ dữ giờ đây trói buộc linh hồn bạn vào một cơn khát nhục nhã và điên dại." },
    { name: "Tân Huyết", text: "Bạn được ban đặc ân bước vào bóng tối, khoác lên mình tấm áo choàng đen và vĩnh viễn từ bỏ cái tên phàm tục." },
    { name: "Huyết Hầu", text: "Dòng máu trong tĩnh mạch đã đủ đặc để bạn ngạo nghễ ngẩng cao đầu trước loài người và tự xưng là một Huyết Tộc chân chính." },
    { name: "Nam Tước Bóng Đêm", text: "Bạn được trao chìa khóa của một thái ấp ngầm, tàn nhẫn bắt đầu xây dựng chuồng trại chăn nuôi những \"bò sữa\" Human của riêng mình." },
    { name: "Hầu Tước Ma Mị", text: "Ngồi trên chiếc ghế bọc nhung đỏ thẫm, mọi lời thầm thì của bạn giờ đây đều là luật lệ tuyệt đối cai trị lãnh địa Vực Thẳm Phân Tầng." },
    { name: "Huyết Vương", text: "Vương miện đúc bằng Huyết Kim đặt lên đầu bạn, đánh dấu quyền lực thống trị hàng vạn tử linh dưới ánh trăng tàn bạo." },
    { name: "Chân Tổ", text: "Dòng máu của bạn đã tinh khiết đến mức sánh ngang với Cổ Thần, chỉ một nhịp tim cũng đủ tạo ra cả một Kỷ Nguyên Tăm Tối." },
  ],
  rankAliases: ["kẻ lây nhiễm", "tân huyết", "huyết hầu", "nam tước bóng đêm", "hầu tước ma mị", "huyết vương", "chân tổ"],
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn khép mắt, ép dòng máu đang sôi trào lắng xuống. Với kẻ bất tử, thời gian chẳng bao giờ thiếu. Cơ hội này sẽ quay lại." },

  evos: [
    { key: "noble", name: "Vampire Noble", match: ["noble", "quý tộc"], life: 300, minAge: 201, require: { fame: 30, wealth: 50 } },
    { key: "ancestor", name: "True Ancestor", match: ["ancestor", "chân tổ"], life: 1500, minAge: 801, require: { INT: 10, STR: 10, anyFlags: ["pure_blood", "god_eater"] } },
    { key: "daywalker", name: "Daywalker", match: ["daywalker"], life: 300, minAge: 201, require: { LUCK: 7, health: 60, anyFlags: ["sun_resistant", "yggdrasil_blood", "daylight_ring"] } },
  ],

  systems: {
    noRecruit: true,
    activeFrom: "infant",
    jobFrom: "child",
    bandName: "đoàn tùy tùng",
    romance: false,
    // the script has events about children but no birth event: births happen on their own, rarely
    autoChildren: true,
    childStages: ["teen", "adult", "middle", "elder"],
    childRate: 0.05,
    maxChildren: 3,
    child: ["Một đứa trẻ mang dòng máu của bạn ra đời trong lâu đài: {child}. Đôi mắt đỏ của nó mở ra giữa đêm trăng.", "Bạn ban cho một kẻ được chọn nụ hôn của bóng đêm. {child} trỗi dậy, trở thành hậu duệ huyết thống của bạn."],
    companions: [
      { race: "Human", names: "human", job: "Familiar", stat: "AGI", weight: 3 },
      { race: "Human", names: "human", job: "Familiar", stat: "INT", weight: 2 },
      { race: "Vampire", names: "vampire", job: "Night Blade", stat: "AGI", weight: 2 },
      { race: "Vampire", names: "vampire", job: "Blood Mage", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Human trẻ tuổi quỳ trước cửa lâu đài suốt ba đêm, xin được dâng cả máu lẫn linh hồn để phục vụ bạn.",
        "Một Huyết Tộc lang thang cúi chào bạn trong dạ tiệc: \"Tôi cần một chủ nhân đủ mạnh để đi theo.\"",
      ],
      join: ["{ally} quỳ xuống hôn lên nhẫn của bạn. Từ đêm nay, kẻ đó là người của bạn.", "Bạn nhỏ một giọt máu lên môi {ally}. Khế ước đã thành."],
      decline: "Phẩy tay xua đi",
      declineText: "Bạn không cần thêm một miệng ăn. Kẻ kia lùi vào bóng tối và biến mất.",
    },
    jobSelect: {
      // "(origin) …": only for that birth; the others have no clan hall to be called into
      teen: [
        "(vampir_bg_castle) Gia tộc gọi bạn đến đại sảnh. Một Huyết Tộc không có vị trí chỉ là ký sinh trùng của lâu đài. Đã đến lúc chọn con đường.",
        "(vampir_bg_pact) Gia tộc đã ký giao kèo với bạn gọi bạn đến đại sảnh. Một Huyết Tộc không có vị trí chỉ là món hàng trong bản giao kèo. Đã đến lúc chọn con đường.",
        "Không gia tộc nào dang tay đón một Huyết Tộc vô chủ. Muốn tồn tại giữa thế giới bóng đêm, bạn phải tự chọn lấy một con đường.",
      ],
      adult: [
        "(vampir_bg_castle) Hàng thế kỷ đã trôi qua mà bạn vẫn chưa có chỗ đứng. Các trưởng lão bắt đầu nhìn bạn bằng ánh mắt khinh miệt.",
        "Hàng thế kỷ đã trôi qua mà bạn vẫn chưa có chỗ đứng trong thế giới bóng đêm. Những Huyết Tộc khác bắt đầu nhìn bạn bằng ánh mắt khinh miệt.",
      ],
      later: "Lui vào quan tài, để mai tính",
      laterText: "Bạn kéo nắp quan tài lại. Vài chục năm nữa cũng chưa muộn.",
    },
    promotion: {
      try: "Ra tay để giành lấy vị trí",
      wait: "Kiên nhẫn chờ thêm vài thập kỷ",
      waitText: "Bạn mỉm cười chờ đợi. Kẻ bất tử không cần vội.",
      success: "Cả đại sảnh nghiêng mình. Từ đêm nay, bạn là {next}.",
      fail: ["Bạn thất bại trước ánh mắt chế giễu của cả gia tộc.", "Kế hoạch đổ vỡ. Bạn lui về bóng tối liếm vết thương và chờ thêm một thế kỷ."],
    },
    crossroads: {
      child: "Cơn khát đầu đời đã dịu xuống. Những thập kỷ tới, bạn sẽ dành cho điều gì?",
      teen: "Bạn đã sống qua hai thế kỷ. Huyết Tộc bắt đầu coi bạn là một kẻ ngang hàng. Bạn sẽ dồn sức vào đâu?",
      adult: "Tám thế kỷ. Các đế chế Human đã đổi chủ nhiều lần. Bạn sẽ làm gì với những thế kỷ tiếp theo?",
      middle: "Hai thiên niên kỷ. Rất ít Huyết Tộc sống được đến tuổi này. Bạn sẽ dùng nó ra sao?",
      elder: "Sự bất tử bắt đầu nặng như tro. Những năm cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Cơn khát máu điên dại thời Tân Sinh đã nguôi. Bạn bắt đầu học cách sống như một Huyết Tộc thực thụ.",
      teen: "Hai trăm năm trôi qua. Bạn đã đủ già để được gọi là một Bá Tước Bóng Đêm.",
      adult: "Tám trăm năm. Máu trong người bạn đặc lại như rượu vang ủ lâu năm.",
      middle: "Hai ngàn năm. Những Human bạn từng quen chỉ còn là tên khắc trên bia mộ đã mục.",
      elder: "Gần ba ngàn năm. Bạn bắt đầu thấy mệt mỏi với sự bất tử.",
      default: "Một thế kỷ mới của Huyết Tộc mở ra.",
    },
    parentDeath: ["{who} đã tan thành tro bụi. Bạn đứng nhìn gió cuốn đi chút tàn dư cuối cùng, mặt không đổi sắc.", "Tin {who} qua đời đến với bạn sau nhiều năm. Với Huyết Tộc, thời gian luôn đến muộn."],
  },

  overrides: {
    vampir_rank_ancestor: { require: { guildRank: 5 }, unrequire: { job: true }, choiceEffects: { 0: { success: { orgRank: 6 } }, 1: { success: { orgRank: 6 } }, 2: { success: { orgRank: 6 } } } },
    vampir_end_sun: { asDeath: "old" },
    // "CHẾT ngập trong gươm giáo nếu Sức khỏe dưới 50": the bloodbath costs health instead
    vampir_hidden_feast: { choicePatch: { 2: { death: null, effects: { STR: 4, health: -35, fame: -50, flags: ["royal_butcher"] } } } },
    vampir_child_hunt: { stages: ["child", "teen", "adult", "middle", "elder"] },
    vampir_child_rebel: { stages: ["teen", "adult", "middle", "elder"] },
    vampir_child_usurp: { stages: ["adult", "middle", "elder"] },
    vampir_marriage_human: { require: { spouse: false } },
    vampir_marriage_noble: { require: { spouse: false, guildRank: 3 } },
    vampir_marriage_demon: { require: { spouse: false, guildRank: 2 } },
  },
};
