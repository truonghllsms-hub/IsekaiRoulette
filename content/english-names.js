// English names for groups, guilds and people (the player asked for all names in English).
// tools/build-pack.js applies them to every pack; tools/rename-data.js to the hand-written data files.
//   orgs: the race's organisation (shown as "<name>: <rank>")
//   bands: band / party names. A name that is also an ordinary phrase ("Tro Tàn" = ashes) is only
//          replaced in the text where it follows a group word (băng, tổ đội, bầy…) or stands in a name field.
//   people: named characters
//   family / any: the race's surname and single-name lists
module.exports = {
  global: [
    ["Guild Bình Minh", "Dawnbreak Guild"],
    ["Quân đoàn Ma Vương", "Demon Lord's Legion"],
    ["Triều đình Ma giới", "Abyssal Court"],
    ["Gia tộc Huyết Tộc", "Bloodline Clan"],
    ["Guild Sát thủ Umbra", "Umbra Assassins' Guild"],
    ["Thánh Kỵ Sĩ Đoàn", "Order of Holy Knights"],
    ["Thương hội Sói Bạc", "Silver Wolf Company"],
    ["Đội Ranger Đại Ngàn", "Greatwood Rangers"],
  ],
  orgs: {
    dragon: "Hoard & Dominion", ghoul: "Carrion Horde", goblin: "Goblin Tribe", high_demon: "Abyssal Court",
    imp: "Infernal Service", kobold: "The Mines", lizardman: "Lizardfolk Tribe", minotaur: "The Labyrinth",
    orc: "Orc Horde", slime: "Slime Domain", troll: "Troll Territory", vampire: "Bloodline Clan", demon: "Demon Lord's Legion",
  },
  ranks: {
    high_demon: ["Demon Peer", "Dark Viscount", "Abyssal Count", "Blood Marquis", "Archduke", "Layer King", "Demon King"],
    vampire: ["The Infected", "Fledgling", "Blood Retainer", "Night Baron", "Enchanting Marquis", "Blood King", "True Ancestor"],
  },
  bands: {
    beastman: [["Huyết Nha", "Bloodfang"], ["Xiềng Xích Đen", "Black Chains"], ["Bình Minh Lạc Lối", "Lost Dawn"], ["Nanh Vuốt Hoang Vu", "Wild Fang"], ["Thương đoàn Gió Cát", "Sandwind Caravan"], ["Bóng Ma Đêm", "Night Phantoms"]],
    demon: [["Hắc Quạ", "Black Crows"], ["Cuồng Hỏa", "Wildfire"], ["Huyết Cốt", "Bloodbone"], ["Bóng Đêm Lưu Lạc", "Wandering Night"], ["Nanh Vuốt", "Fang & Claw"], ["Giáo Phái Tinh Huyết", "Cult of Pure Blood"]],
    dwarf: [["Móng Vuốt Đá", "Stoneclaw"], ["Huyết Phán", "Blood Verdict"], ["Khiên Thép Vĩnh Cửu", "Eternal Steel Shield"], ["Búa Lang Thang", "Wandering Hammer"], ["Mũi Khoan Mặt Trời", "Sun Drill"], ["Bình Minh Hỗn Huyết", "Mixed-Blood Dawn"]],
    elf: [["Mũi Tên Xanh", "Green Arrow"], ["Lữ Đoàn Chạng Vạng", "Twilight Brigade"], ["Bạch Ngọc", "White Jade"], ["Quạ Đen", "Black Raven"], ["Suối Tơ", "Silkstream"], ["Chân Trời Cũ", "Old Horizon"]],
    ghoul: [["Bầy Hắc Cốt", "Blackbone Pack"], ["Đội Quân Sương Mù", "Mist Legion"], ["Nhóm Khất Thực", "The Beggars"], ["Thực Khách Chiến Trường", "Battlefield Diners"], ["Hội Ái Tử", "Necrophile Society"]],
    goblin: [["Đuôi Chuột Cháy", "Burnt Rat-Tail"], ["Rìu Máu", "Blood Axe"], ["Mắt Trắng", "White Eye"], ["Nanh Cuồng", "Mad Fang"], ["Sẹo Đỏ", "Red Scar"]],
    human: [["Đuốc Bình Minh", "Dawn Torch"], ["Thiết Huyết Đoàn", "Iron Blood Company"], ["Thiết Huyết", "Iron Blood"], ["Hắc Kim", "Black Gold"], ["Dạ Hành", "Nightwalkers"], ["Hoa Hồng Vàng", "Golden Rose"], ["Bức Tường Hoàng Hôn", "Dusk Wall"]],
    imp: [["Hội Đổ Xỉ", "Slag Dumpers' Club"], ["Cánh Lủng", "Torn Wings"], ["Móng Chồn", "Weasel Claw"], ["Hội Đội Bình", "Jar Bearers' Club"], ["Liên Minh Cắt Xích", "Chainbreaker Alliance"]],
    kobold: [["Đội Xuyên Sơn", "Mountain Borers"], ["Nhóm Chuột Trắng", "White Rats"], ["Hội Mầm Mống", "The Seedlings"], ["Bóng Đêm Sườn Núi", "Ridge Shadows"], ["Vảy Bụi Than", "Coal-Dust Scales"]],
    lizardman: [["Nanh Lởm Chởm", "Jagged Fang"], ["Nọc Xanh", "Green Venom"], ["Vuốt Tự Do", "Free Claw"], ["Vảy Huyết", "Blood Scale"], ["Bùn Đen", "Black Mud"]],
    minotaur: [["Huyết Giác", "Blood Horn"], ["Xích Sắt", "Iron Chain"], ["Vuốt Bóng Tối", "Shadow Claw"], ["Vó Ngựa Bão Táp", "Storm Hooves"], ["Kẻ Bất Tuân", "The Defiant"]],
    orc: [["Răng Cưa", "Sawtooth"], ["Móng Vuốt Cụt", "Stub Claw"], ["Bão Bụi", "Dust Storm"], ["Cát Đỏ", "Red Sand"], ["Tro Tàn", "Ashes"]],
    slime: [["Vũng Nước Đục", "Murky Puddle"], ["Góc Tối Nhe Nanh", "Grinning Dark Corner"], ["Vòng Cổ Gãy", "Broken Collar"], ["Vũng Độc Xanh", "Green Poison Pool"], ["Cổng Địa Ngục", "Hellgate"]],
    troll: [["Hắc Cước", "Black Foot"], ["Cuồng Chiến", "Berserk"], ["Hút Bùn", "Mudsuckers"], ["Băng Phong", "Frostbound"], ["Hắc Kim", "Black Gold"]],
    vampire: [["Hội Kính Đỏ", "Red Mirror Society"], ["Hừng Đông Tội Lỗi", "Sinful Dawn"], ["Mặc Huyết Viện", "Ink-Blood Hall"], ["Lưỡi Dao Huyết Nguyệt", "Blood Moon Blade"], ["Huyết Hồng Đen", "Black Blood Rose"], ["Giao Ước Bụi Phai", "Faded Dust Pact"]],
  },
  people: {
    ghoul: [["Ông lão Ren", "Old Ren"], ["Bọc Nhỏ", "Little Bundle"], ["Thống soái Kark", "Marshal Kark"], ["Nanh Nhọn", "Sharpfang"], ["Cỏ Úa", "Witherweed"], ["Bá tước Valerius", "Count Valerius"], ["Tiểu thư Lilith", "Lady Lilith"], ["Răng Sứt", "Chiptooth"]],
    goblin: [["Huyết Tinh", "Bloodshard"], ["Ragnok Đồ Tể", "Ragnok the Butcher"], ["Zikzak Cụt Ngón", "Zikzak Stubfinger"]],
    imp: [["Giáo sư Morzan", "Professor Morzan"]],
    troll: [["Míp", "Mip"]],
  },
  family: {
    "Gãy Răng": "Brokentooth", "Răng Gãy": "Brokentooth", "Tai Sứt": "Nickear", "Mũi Tẹt": "Flatnose", "Da Ghẻ": "Mangehide", "Đớp Rác": "Trashbiter", "Mũi Thối": "Stinknose",
    "Nhầy Nhụa": "the Slimy", "Bọt Nước": "Foam", "Không Xương": "the Boneless", "Trơn Tuột": "Slipslide",
    "Nhầy": "Goo", "Bọt": "Bubble", "Giọt": "Drip", "Bủm": "Plop", "Lóc": "Slick", "Xanh Lè": "Greenie",
    "Vô Danh": "Nameless", "Kẻ Lạ": "Stranger", "Bóng": "Shade", "Tro": "Ash", "Sương": "Mist",
    "Vuốt Sắt": "Ironclaw", "Bờm Lửa": "Firemane", "Huyết Dạ": "Bloodnight", "Cuồng Phong": "Galewind", "Mắt Sói": "Wolfeye", "Răng Bạc": "Silvertooth",
    "Huyết Dực": "Bloodwing", "Hắc Dạ": "Darknight", "Tử Hỏa": "Deathfire", "Bóng Đêm": "Nightshade", "Vực Thẳm": "Abyssborn", "Tro Tàn": "Ashen",
    "Kẻ Tàn Phá": "the Ravager", "Cánh Của Sự Tuyệt Vọng": "Wings of Despair", "Tai Ương Lửa Đỏ": "the Red Calamity", "Kẻ Ngủ Trên Vàng": "Goldsleeper", "Đế Vương Bầu Trời": "Sky Emperor",
    "Thiết Huyết": "Ironblood", "Hỏa Nham": "Firerock", "Đồng Cốt": "Bronzebone", "Trùng Sơn": "Deepmount", "Ngân Phủ": "Silveraxe", "Hắc Kim": "Blackgold",
    "Thạch Diệp": "Stoneleaf", "Tinh Ca": "Starsong", "Nguyệt Ảnh": "Moonshadow", "Phong Lĩnh": "Windridge", "Băng Kiếm": "Frostblade", "Dạ Điệp": "Nightmoth",
    "Kẻ Ăn Xác": "Corpse-Eater", "Móng Vuốt Đen": "Blackclaw", "Hơi Thở Thối": "Rotbreath", "Xác Chết Lạc Lối": "Lostcorpse", "Tai Ương Bóng Đêm": "Nightbane", "Tiếng Lết Chân": "Shuffler", "Khô Cốt": "Drybone",
    "Chúa Tể Vực Thẳm": "Lord of the Abyss", "Kẻ Cám Dỗ": "the Tempter", "Kẻ Hủy Diệt Các Vì Sao": "Starbreaker", "Ánh Sáng Lụi Tàn": "Dying Light",
    "Lừa Lọc": "Trickster", "Đuôi Độc": "Venomtail", "Răng Nhọn": "Sharptooth", "Lén Lút": "Sneak", "Xảo Quyệt": "the Sly",
    "Đuôi Cụt": "Stubtail", "Mũi Than": "Coalnose", "Vuốt Mòn": "Wornclaw", "Tai Rách": "Tornear", "Răng Đen": "Blacktooth",
    "Vảy Độc": "Venomscale", "Đuôi Gai": "Spiketail", "Mắt Rắn": "Snake-eye", "Lưỡi Chẻ": "Forktongue", "Bóng Đầm Lầy": "Marshshadow",
    "Móng Sắt": "Ironhoof", "Sừng Rạn": "Crackhorn", "Kẻ Nghiền Xương": "Bonegrinder", "Kẻ Gác Cửa": "Gatekeeper", "Mắt Đỏ": "Redeye",
    "Huyết Rìu": "Bloodaxe", "Nanh Sắt": "Irontusk", "Phá Lọ": "Jarbreaker", "Chùy Gỗ": "Woodclub", "Da Đỏ": "Redhide",
    "Kẻ Ngáy To": "Loudsnore", "Hôi Hám": "Stinker", "Chặn Cầu": "Bridgeblock", "Ngu Ngốc": "Dimwit", "Đập Phá": "Smasher",
    "Huyết Nguyệt": "Bloodmoon", "Tội Lỗi": "Sinful",
  },
};
