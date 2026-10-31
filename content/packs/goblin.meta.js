// Goblin pack: what the approved Gemini script (content/scripts/goblin.txt) cannot say by itself.
// tools/build-pack.js combines the two into data/packs/goblin.json.
module.exports = {
  race: "goblin",
  script: "content/scripts/goblin.txt",
  // story layer (prompts/v3): arcs per origin, recurring cast, bands, minions, chapters, biography
  story: "content/scripts/goblin_story.txt",
  // only this race's own events: no old pre-script events, no shared filler
  exclusive: true,
  // the story script asks "Sức mạnh > 15" on a race that usually has 2–10
  storyStatScale: 0.6,

  // Manga-style naming (docs/NAMING.md), applied to every text of the script.
  rename: [
    ["Hang Ổ Tù Trưởng", "Hang ổ Goblin Chief"],
    ["Đứa con của Pháp Sư", "Con của Goblin Shaman"],
    ["Tù trưởng", "Goblin Chief"],
    ["Tù Trưởng", "Goblin Chief"],
    ["tù trưởng", "Goblin Chief"],
    ["lão Pháp sư", "lão Goblin Shaman"],
    ["Lão Pháp sư", "Lão Goblin Shaman"],
    ["Pháp sư bộ lạc", "Goblin Shaman của bộ lạc"],
    ["Hiệp sĩ đoàn", "Thánh Kỵ Sĩ Đoàn"],
    ["Guild Mạo hiểm giả", "Guild Bình Minh"],
    ["Guild Umbra", "Guild Sát thủ Umbra"],
    ["Vua Quỷ Lùn", "Goblin King"],
    ["quỷ lùn", "Goblin"],
    ["người lùn", "Dwarf"],
    ["Người lùn", "Dwarf"],
    ["Kén Kén", "Kén"],
  ],

  stageNames: { infant: "Ấu tể", child: "Goblin con", teen: "Goblin thiếu niên", adult: "Goblin trưởng thành", middle: "Goblin lão luyện", elder: "Goblin lão làng" },
  // Phrases the script uses for each stage in "Khi nào".
  stagePhrases: { "ấu tể": "infant", "yêu tinh nhí": "child", "tiểu yêu": "teen", "chiến binh hang động": "adult", "yêu tinh già dặn": "middle", "lão làng": "elder", "bất kỳ lúc trưởng thành": "adult,middle,elder", "trưởng thành": "adult" },
  // Check targets for DỄ..RẤT KHÓ: Goblins are weak (stats about 2–8), so the scale is lower than Human's.
  diff: { stat: [2, 3, 5, 7, 9, 11], bar: [20, 35, 55, 70, 85, 95] },

  // Order of the "việc chính" sections in the script.
  focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"],
  focus: {
    play: { name: "Bới rác", desc: "Nhanh nhẹn, May mắn; nhặt nhạnh của rơi", stages: ["child", "teen", "adult", "middle"], gains: { AGI: 0.25, LUCK: 0.2 }, bars: { wealth: 0.5 } },
    study: { name: "Học lỏm", desc: "Trí tuệ; theo dõi Goblin Shaman và kẻ thù", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", desc: "Sức mạnh, Nhanh nhẹn; đau và nguy hiểm", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Phục dịch bộ lạc", desc: "Làm vai trò của mình, tích kinh nghiệm thăng bậc", stages: ["child", "teen", "adult", "middle", "elder"] },
    adventure: { name: "Đi cướp", desc: "Nhận lệnh cướp phá của Goblin Chief, leo thứ bậc bộ lạc", stages: ["teen", "adult", "middle"], tags: null },
    social: { name: "Tranh quyền", desc: "Kết bè, nịnh bợ, âm mưu, giành bạn tình", stages: ["teen", "adult", "middle", "elder"] },
    rest: { name: "Trốn ngủ", desc: "Hồi sức; đêm đen đầy bí mật", stages: ["child", "teen", "adult", "middle", "elder"], bars: { health: 2, joy: 1 } },
  },

  roles: [
    { title: "GOBLIN WARRIOR", id: "goblin_warrior", name: "Goblin Warrior", stat: "STR", combat: true,
      ranks: ["Goblin Fodder", "Goblin Soldier", "Goblin Vanguard", "Goblin Berserker", "Goblin Warlord"],
      require: { STR: 3 }, alt: { anyFlags: ["orphan", "orc_slave"], hint: "xuất thân Bia tập chém Tân thủ hoặc Tù binh trại Orc" },
      desc: "Sức mạnh. Bia đỡ đòn tuyến đầu", income: [0.8, 1.2, 1.8, 2.5, 3.2], hazard: 2.2, gains: { STR: 0.35 } },
    { title: "GOBLIN SCOUT", id: "goblin_scout", name: "Goblin Scout", stat: "AGI", combat: true,
      ranks: ["Goblin Runner", "Goblin Scout", "Goblin Trapper", "Goblin Shadow", "Goblin Assassin"],
      require: { AGI: 4 }, alt: { anyFlags: ["forest_goblin"], hint: "xuất thân Rừng Tân Thủ" },
      desc: "Nhanh nhẹn. Trinh sát, gài bẫy, chạy trước", income: [0.8, 1.2, 1.8, 2.5, 3.2], hazard: 1.6, gains: { AGI: 0.35 } },
    { title: "GOBLIN SHAMAN APPRENTICE", id: "goblin_shaman", name: "Goblin Shaman", stat: "INT", combat: true,
      ranks: ["Goblin Acolyte", "Goblin Hexer", "Goblin Dark Shaman", "Goblin Blood Priest", "Goblin High Shaman"],
      require: { INT: 4 }, alt: { anyFlags: ["shaman_apprentice"], hint: "là con của Goblin Shaman" },
      desc: "Trí tuệ. Nấm độc, bùa nguyền, ma lực tạp nham", income: [0.6, 1, 1.6, 2.4, 3.4], hazard: 1.4, gains: { INT: 0.35 } },
    { title: "GOBLIN TINKER", id: "goblin_tinker", name: "Goblin Tinker", stat: "INT", combat: false,
      ranks: ["Goblin Scrapper", "Goblin Tinker", "Goblin Sapper", "Goblin Mad Engineer", "Goblin Mecha-Tinker"],
      require: { any: [{ INT: 3 }, { LUCK: 3 }] }, alt: { anyFlags: ["dungeon_scavenger"], hint: "xuất thân Đống rác Hầm ngục" },
      desc: "Trí tuệ hoặc May mắn. Chế bom từ phế liệu", income: [0.8, 1.3, 2, 2.8, 3.6], hazard: 1.5, gains: { INT: 0.25, LUCK: 0.1 } },
    { title: "WOLF RIDER", id: "goblin_rider", name: "Goblin Wolf Rider", stat: "AGI", combat: true,
      ranks: ["Goblin Wolf Bait", "Goblin Stablehand", "Goblin Wolf Rider", "Goblin Pack Leader", "Goblin Dire-Rider"],
      require: { STR: 3, AGI: 3 }, alt: { anyFlags: ["hobgoblin_blood", "chief_son"], hint: "dòng máu Hobgoblin hoặc con của Goblin Chief" },
      desc: "Nhanh nhẹn và Sức mạnh. Kỵ binh cưỡi sói", income: [0.8, 1.2, 1.8, 2.6, 3.4], hazard: 2, gains: { AGI: 0.2, STR: 0.2 } },
  ],
  promoXp: [5, 6, 8, 10],

  org: {
    id: "goblin_tribe",
    name: "Bộ lạc",
    auto: true,
    ranks: ["Goblin Peon", "Goblin Grunt", "Goblin Leader", "Goblin Elite", "Goblin Lord", "Goblin Chief", "Goblin King"],
    // Goblin King is reached only through the crowning event.
    points: [0, 2, 5, 9, 14, 20, null],
    missionWord: "cuộc cướp phá",
    fameToPts: 0.25,
    board: {
      text: [
        "Tiếng trống da chuột dồn dập. Goblin Chief nhổ một bãi nước bọt xuống đất và chỉ tay về phía những con mồi tiếp theo.",
        "Cả bầy tụ tập quanh đống lửa. Goblin Chief vạch lên vách hang mấy nét nguệch ngoạc: đó là kế hoạch cướp phá mới.",
      ],
      skip: "Giả vờ bị đau bụng, ở lại hang",
      skipText: "Bạn ôm bụng rên rỉ đến khi cả bầy đi khuất. Sống sót là một nghệ thuật.",
    },
    failText: "Bạn lết về hang tay không. Goblin Chief đá vào mông bạn một cái, coi như xong chuyện.",
  },
  decline: { label: "Kìm nén lại, chờ dịp khác", text: "Bạn cắn răng ép cơn biến đổi lắng xuống. Thân xác Goblin rên rỉ, nhưng vẫn còn nguyên vẹn. Cơ hội này sẽ còn quay lại." },
  repeatRaids: ["goblin_raid_melon", "goblin_raid_cart", "goblin_raid_slime_pit", "goblin_raid_orc_beer", "goblin_raid_dwarf_goat"],
  eraWords: { "Kỷ Nguyên Tăm Tối": "dark_age", "Ma Vương": "demon_lord", "Chiến Tranh": "holy_war", "Thời Bình": "peace" },

  // Evolution branches, in the order the script lists them.
  evos: [
    { key: "hob", name: "Hobgoblin", life: 6, minAge: 6, require: { any: [{ STR: 7, health: 50 }, { flags: ["hobgoblin_blood"], STR: 5 }, { job: "goblin_warrior", jobRank: 2 }] } },
    { key: "shaman", name: "Goblin Shaman Lord", life: 8, minAge: 8, require: { any: [{ INT: 8 }, { job: "goblin_shaman", jobRank: 2 }, { flags: ["dark_pact"] }] } },
    { key: "king", name: "Goblin King", life: 10, minAge: 13, require: { fame: 40, wealth: 70, guildRank: 5 } },
  ],

  systems: {
    bandName: "băng nhóm",
    // companions come from bands (and later minions), not from strangers met on the road
    noRecruit: true,
    romance: false,
    autoChildren: false,
    companions: [
      { race: "Goblin", names: "goblin", job: "Goblin Warrior", stat: "STR", weight: 4 },
      { race: "Goblin", names: "goblin", job: "Goblin Scout", stat: "AGI", weight: 3 },
      { race: "Goblin", names: "goblin", job: "Goblin Shaman", stat: "INT", weight: 1 },
      { race: "Hobgoblin", names: "goblin", job: "Goblin Warrior", stat: "STR", weight: 1 },
      { race: "Kobold", names: "kobold", job: "Kobold Trapper", stat: "INT", weight: 1 },
    ],
    recruit: {
      text: [
        "Một Goblin gầy nhom lẽo đẽo theo bạn suốt ba ngày, chìa ra nửa con chuột: \"Cho tao theo với.\"",
        "Sau trận cướp, hai kẻ sống sót cùng nhìn về phía bạn. Chúng cần một kẻ đủ ranh ma để bám theo.",
      ],
      join: ["{ally} nhe hàm răng ố vàng cười khùng khục. Từ nay hai đứa chung một cái hố ngủ.", "{ally} nhổ nước bọt vào lòng bàn tay rồi chìa ra. Kiểu bắt tay của Goblin là thế."],
      decline: "Đuổi đi, đi một mình an toàn hơn",
      declineText: "Bạn ném đá đuổi chúng đi. Ở cái hang này, đồng bọn hôm nay là kẻ đâm sau lưng ngày mai.",
    },
    jobSelect: {
      teen: ["Goblin Chief dồn lũ Goblin choai choai ra giữa hang, chia việc bằng những cú đá. Bạn phải chọn chỗ đứng của mình trước khi bị chọn thay."],
      adult: ["Không có vai trò, bạn chỉ là miệng ăn thừa trong mắt cả bầy. Đã đến lúc chọn một chỗ đứng trong bộ lạc."],
      later: "Lẩn đi, làm kẻ ăn bám thêm một thời gian",
      laterText: "Bạn chui vào góc tối và giả vờ ngủ. Chẳng ai buồn tìm một kẻ vô dụng.",
    },
    promotion: {
      try: "Liều một phen để leo lên",
      wait: "Chưa dám, cúi đầu chờ thời",
      waitText: "Bạn rụt cổ lại. Trong hang Goblin, kẻ ngẩng đầu quá sớm thường mất đầu.",
      success: "Cả bầy im bặt nhìn bạn. Từ hôm nay, bạn là {next}.",
      fail: ["Bạn thất bại thảm hại trước tiếng cười hô hố của cả bầy.", "Mọi thứ đổ bể. Bạn bò về góc hang liếm vết thương và chờ cơ hội khác."],
    },
    crossroads: {
      child: "Bạn đã đủ lớn để không bị giẫm bẹp. Những năm tới, bạn sẽ sống sót bằng cách nào?",
      teen: "Lũ Goblin choai choai bắt đầu tranh giành chỗ đứng. Bạn sẽ dồn sức vào đâu?",
      adult: "Bạn đã là một Goblin trưởng thành, nghĩa là một nửa đời đã trôi qua. Bạn sẽ làm gì với nửa còn lại?",
      middle: "Ít Goblin nào sống được đến tuổi này. Bạn sẽ dùng những năm hiếm hoi ấy ra sao?",
      elder: "Bạn đã già, theo cách mà Goblin hiếm khi được già. Những ngày cuối, bạn muốn làm gì?",
      default: "Bạn sẽ dồn sức vào đâu?",
    },
    stageEnter: {
      child: "Bạn sống sót qua mùa đói đầu tiên. Ở hang Goblin, chừng ấy đã là một chiến công.",
      teen: "Răng nanh mọc dài, móng vuốt cứng lại. Bạn không còn là miếng mồi dễ nuốt nữa.",
      adult: "Bạn đã là một Goblin trưởng thành, nghĩa là bạn đã sống lâu hơn một nửa số anh em cùng lứa.",
      middle: "Lưng bạn còng xuống, sẹo chồng lên sẹo. Lũ trẻ trong hang bắt đầu gọi bạn là lão.",
      elder: "Bạn đã sống quá tuổi thọ của hầu hết đồng loại. Mỗi bình minh giờ là một món quà ăn cắp được.",
      default: "Một chương mới của cuộc đời Goblin mở ra.",
    },
    parentDeath: ["{who} chết vào một đêm mưa. Sáng hôm sau, thứ duy nhất còn lại là đôi ủng rách đã bị kẻ khác lột mất.", "Bạn nghe tin {who} đã chết trong một trận càn. Bạn gặm nốt khúc xương trên tay rồi đi ngủ."],
  },

  // Requirements and fixes that the script states in words.
  overrides: {
    goblin_event_shaman_test: { require: { anyFlags: ["shaman_apprentice", "chief_son"], fatherAlive: true } },
    goblin_event_warrior_duel: { require: { job: "goblin_warrior", jobRank: 3, any: [{ flags: ["chief_son"] }, { fame: 15 }] } },
    goblin_event_scout_hunter: { require: { job: "goblin_scout", jobRank: 3 } },
    goblin_event_king_ascension: { stages: ["elder", "middle"], focus: ["social"], require: { guildRank: 5, fame: 30 } },
    goblin_evo_king_ascend: { choiceEffects: { 0: { success: { orgRank: 6 } } } },
    goblin_old_teeth: { stages: ["elder"], require: { form: "none" } },
    goblin_old_cold: { stages: ["elder"] },
    goblin_old_usurped: { stages: ["elder"], require: { any: [{ guildRank: 3 }, { jobRank: 3 }] }, choiceEffects: { 1: { success: { orgRank: 0, demote: true, wealth: -100 } } } },
    goblin_old_legacy: { asDeath: "old" },
    goblin_chain_guild_assassin: { choiceEffects: { 0: { success: { unflags: ["guild_enemy", "bounty_survivor"] } } } },
    goblin_chain_nature_roots: { stages: ["adult", "middle"] },
    goblin_chain_parent_secret: { require: { anyFlags: ["shaman_apprentice"] } },
    goblin_chain_merchant_captive: { focus: ["adventure"] },
    goblin_chain_merchant_payback: { stages: ["adult", "middle"], choiceEffects: { 0: { success: { flags: ["merchant_blackmail"] } } } },
    goblin_chain_merchant_betrayal: { require: { flags: ["merchant_blackmail"] } },
    goblin_child_rebel: { require: { guildRank: 4, children: 1 } },
    goblin_mate_bribe: { require: { wealth: 30 } },
  },
};
