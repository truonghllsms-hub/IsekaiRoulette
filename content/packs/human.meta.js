// Human pack: what the approved Gemini script (content/scripts/human.txt) cannot say by itself.
// Humans keep the shared civil life (life_* events, romance, children) and add the script's 14 trades,
// Guild Bình Minh missions, origins with parents and their own events.
const guild = require("../../data/orgs.json").find((o) => o.id === "guild");

module.exports = {
  race: "human",
  script: "content/scripts/human.txt",
  story: "content/scripts/human_story.txt",
  exclusive: true,
  // which biography opening ("con hoang", "thợ rèn"...) fits each origin
  storyBioOpen: { harlot: "con hoang", noble_bastard: "con hoang", priest_sin: "tội lỗi", cultist: "tà giáo", hero_descendant: "anh hùng", knight_orphan: "anh hùng",
    blacksmith: "thợ rèn", half_elf: "con lai", half_beast: "con lai", farmer: "nông dân", merchant: "thương gia", thief: "kẻ trộm" },

  // the script's ages: Thơ ấu 3–11, Thiếu niên 11–18, Thanh niên 18–41, Trung niên 41–60, Tuổi già 60+
  stages: [
    { id: "infant", name: "Sơ sinh", start: 0 },
    { id: "child", name: "Thơ ấu", start: 3 },
    { id: "teen", name: "Thiếu niên", start: 11 },
    { id: "adult", name: "Thanh niên", start: 18 },
    { id: "middle", name: "Trung niên", start: 41 },
    { id: "elder", name: "Tuổi già", start: 60 },
  ],

  rename: [
    ["Thuần Thú Sư", "Tamer"],
  ],

  stagePhrases: { "thanh niên": "adult", "trung niên": "middle", "tuổi già": "elder", "thơ ấu": "child", "thiếu niên": "teen" },
  diff: { stat: [3, 4, 6, 8, 10, 12], bar: [20, 35, 55, 70, 85, 95] },

  focusOrder: ["play", "study", "train", "work", "adventure", "social", "rest"],
  focus: {
    play: { name: "Rong chơi", stages: ["infant", "child"] },
    study: { name: "Học hành", stages: ["child", "teen", "adult", "middle", "elder"] },
    train: { name: "Khổ luyện", stages: ["child", "teen", "adult", "middle"] },
    work: { name: "Làm lụng", stages: ["teen", "adult", "middle", "elder"] },
    adventure: { name: "Mạo hiểm", stages: ["teen", "adult", "middle"] },
    social: { name: "Giao du", stages: ["teen", "adult", "middle", "elder"] },
    rest: { name: "An dưỡng", stages: ["infant", "child", "teen", "adult", "middle", "elder"] },
  },

  roles: [
    { title: "KIẾM SĨ", id: "human_swordsman", name: "Kiếm sĩ", stat: "STR", combat: true,
      require: { STR: 3 }, alt: { anyFlags: ["soldier_kin", "hero_blood"], hint: "con nhà lính hoặc mang dòng máu anh hùng" },
      desc: "Sức mạnh. Dùng ý chí con người chẻ đôi bầu trời", income: [1, 1.6, 2.4, 3.4, 4.5], hazard: 1.6, gains: { STR: 0.35 } },
    { title: "MA PHÁP SƯ", id: "human_mage", name: "Ma pháp sư", stat: "INT", combat: true,
      require: { INT: 4 }, alt: { anyFlags: ["educated", "alchemy_burn"], hint: "được đi học hoặc từng bị bỏng giả kim" },
      desc: "Trí tuệ. Mượn sức mạnh nguyên tố qua sách vở", income: [0.9, 1.6, 2.6, 3.8, 5], hazard: 1.3, gains: { INT: 0.35 } },
    { title: "ASSASSIN", id: "human_assassin", name: "Assassin", stat: "AGI", combat: true,
      require: { AGI: 4 }, alt: { anyFlags: ["thief_kin", "slum"], hint: "lớn lên ở khu ổ chuột hoặc con nhà trộm" },
      desc: "Nhanh nhẹn. Sát thủ của Guild Sát thủ Umbra", income: [1, 1.8, 2.8, 4, 5.2], hazard: 1.9, gains: { AGI: 0.35 } },
    { title: "PRIEST", id: "human_priest", name: "Priest", stat: "INT", combat: false,
      ranksF: ["Acolyte", "Sister", "Saintess", "Bishop", "Saint"],
      require: { INT: 3 }, alt: { anyFlags: ["church_secret", "holy_orphan"], hint: "trẻ mồ côi nhà thờ" },
      desc: "Trí tuệ. Tu sĩ Thánh Quang của Nữ thần Lumina", income: [0.8, 1.3, 2, 2.9, 4], hazard: 0.9, gains: { INT: 0.3 } },
    { title: "THƯƠNG NHÂN", id: "human_merchant", name: "Thương nhân", stat: "INT", combat: false,
      require: { INT: 4, wealth: 20 }, alt: { anyFlags: ["merchant_kin"], hint: "con nhà buôn" },
      desc: "Trí tuệ và Tài sản. Thương hội Sói Bạc", income: [1.2, 2, 3.2, 4.6, 6.2], hazard: 0.8, gains: { INT: 0.2, LUCK: 0.15 } },
    { title: "BLACKSMITH", id: "human_smith", name: "Blacksmith", stat: "STR", combat: false,
      require: { STR: 4 }, alt: { anyFlags: ["forge_born"], hint: "sinh ra bên lò rèn" },
      desc: "Sức mạnh. Thợ rèn bên Lò Rèn Vĩnh Cửu", income: [1, 1.6, 2.4, 3.4, 4.6], hazard: 0.9, gains: { STR: 0.25, INT: 0.1 } },
    { title: "RANGER", id: "human_ranger", name: "Ranger", stat: "AGI", combat: true,
      require: { AGI: 4 }, alt: { anyFlags: ["hunter_blood", "half_elf"], hint: "con nhà thợ săn hoặc mang máu Elf" },
      desc: "Nhanh nhẹn. Tuần lâm tiễn thủ, săn quái vật", income: [0.9, 1.4, 2.1, 3, 4], hazard: 1.5, gains: { AGI: 0.35 } },
    { title: "GLADIATOR", id: "human_gladiator", name: "Gladiator", stat: "STR", combat: true,
      require: { STR: 4 }, alt: { anyFlags: ["gladiator_seed", "mercenary_camp"], hint: "lớn lên ở đấu trường hoặc trại lính đánh thuê" },
      desc: "Sức mạnh. Đấu sĩ Huyết Sa", income: [0.8, 1.5, 2.5, 3.8, 5], hazard: 2.2, gains: { STR: 0.3, AGI: 0.1 } },
    { title: "THÁNH KỴ SĨ", id: "human_paladin", name: "Thánh Kỵ Sĩ", stat: "STR", combat: true,
      require: { STR: 4, INT: 3 }, alt: { anyFlags: ["holy_orphan", "hero_blood"], hint: "trẻ mồ côi nhà thờ hoặc dòng máu anh hùng" },
      desc: "Sức mạnh và Trí tuệ. Tấm khiên thép của nhân loại", income: [1, 1.6, 2.5, 3.6, 4.8], hazard: 1.6, gains: { STR: 0.25, INT: 0.1 } },
    { title: "HỌC GIẢ THÁP NGÀ", id: "human_scholar", name: "Học giả Tháp Ngà", stat: "INT", combat: false,
      require: { INT: 4 }, alt: { anyFlags: ["educated", "fallen_scholar"], hint: "được đi học hoặc con nhà học giả sa cơ" },
      desc: "Trí tuệ. Giải mã bí ẩn của Vực Thẳm Cổ Thần", income: [0.8, 1.4, 2.2, 3.2, 4.4], hazard: 0.8, gains: { INT: 0.35 } },
    { title: "NÔNG DÂN", id: "human_farmer", name: "Nông dân", stat: "STR", combat: false,
      require: {},
      desc: "Không yêu cầu. Bám rễ vào Đồng Bằng Thánh Quang", income: [0.7, 1.1, 1.7, 2.6, 3.6], hazard: 0.6, gains: { STR: 0.2, LUCK: 0.05 } },
    { title: "TAMER", id: "human_tamer", name: "Tamer", stat: "LUCK", combat: true,
      require: { LUCK: 4 }, alt: { anyFlags: ["hunter_blood", "half_beast"], hint: "con nhà thợ săn hoặc mang máu Beastman" },
      desc: "May mắn. Thuần phục ma vật bằng roi và thịt tẩm ma dược", income: [0.8, 1.3, 2, 3, 4], hazard: 1.4, gains: { LUCK: 0.2, AGI: 0.15 } },
    { title: "BARD", id: "human_bard", name: "Bard", stat: "LUCK", combat: false,
      require: { LUCK: 4 }, alt: { anyFlags: ["fallen_scholar", "thief_kin"], hint: "con nhà học giả sa cơ hoặc con nhà trộm" },
      desc: "May mắn. Du ca lang thang qua các quán trọ", income: [0.6, 1.1, 1.8, 2.8, 4], hazard: 0.9, gains: { LUCK: 0.25, INT: 0.1 } },
    { title: "LÍNH ĐÁNH THUÊ", id: "human_mercenary", name: "Lính đánh thuê", stat: "STR", combat: true,
      require: { STR: 4 }, alt: { anyFlags: ["mercenary_camp", "gladiator_seed"], hint: "lớn lên ở trại lính đánh thuê hoặc đấu trường" },
      desc: "Sức mạnh. Lưỡi gươm vô chủ, chém giết vì tiền", income: [1, 1.6, 2.4, 3.4, 4.4], hazard: 2, gains: { STR: 0.3, AGI: 0.1 } },
  ],
  promoXp: [5, 6, 8, 10],
  roleByPrefix: {
    human_job_swordsman_: "human_swordsman", human_job_mage_: "human_mage", human_job_assassin_: "human_assassin", human_job_priest_: "human_priest",
    human_job_merchant_: "human_merchant", human_job_smith_: "human_smith", human_job_ranger_: "human_ranger", human_job_gladiator_: "human_gladiator",
    human_job_paladin_: "human_paladin", human_job_scholar_: "human_scholar", human_job_farmer_: "human_farmer", human_job_tamer_: "human_tamer",
    human_job_bard_: "human_bard", human_job_mercenary_: "human_mercenary",
  },
  focusByPrefix: { human_play_: "play", human_study_: "study", human_train_: "train", human_work_: "work", human_adv_: "adventure", human_soc_: "social", human_rest_: "rest" },

  // Guild Bình Minh for Humans: the shared guild's texts, the script's missions (rewards +5 … +50 points)
  org: Object.assign({}, guild, {
    id: "human_guild",
    tags: undefined,
    points: [0, 15, 40, 80, 140, 220, 320],
    fameToPts: 0.5,
  }),
  decline: { label: "Thôi, để lần sau", text: "Bạn hít một hơi sâu và lùi lại. Cơ hội này sẽ còn quay lại." },
  evos: [],

  systems: {},

  overrides: {},
};
