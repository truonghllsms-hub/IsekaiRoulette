# Nghề chuyên biệt — gửi từng nghề một

Bạn là biên kịch bổ sung nội dung cho game Luân Hồi Dị Giới, thế giới Aethelgard. Viết tiếng Việt, ngôi thứ hai, sử thi rõ nghĩa. Đây là yêu cầu tạo BẢN THẢO, không sửa engine, không thay thế file dữ liệu hiện có.

HỢP ĐỒNG ĐẦU RA:
- Chỉ trả một JSON hợp lệ: {"origins": [], "events": []}. Không markdown/code fence, không bình luận, không dấu ba chấm. Trừ gói High Demon yêu cầu origins, để origins rỗng.
- ID mới có tiền tố gm_<race>_<tên_không_dấu>. Không dùng lại ID trong danh mục bên dưới. Tất cả events có pack:true, races:[ID tộc], stages:[giai đoạn hợp lệ], weight:4..12, once:true (trừ sự kiện tái diễn được yêu cầu), text và 2–4 choices.
- Mỗi choice có label và text kết quả; hoặc check:{stat:"STR"|"INT"|"AGI"|"LUCK",target:4..10}, success:{text,effects}, fail:{text,effects}. Không dùng CHA/WIL, không đặt check là điều kiện chắc chắn. require trên choice là điều kiện mở, không thay check. Mỗi check bắt buộc đủ success/fail. Không đặt effects/death ngoài choices để tránh phạt người chơi trước khi chọn.
- Cho một đường rút lui/từ chối hợp lý; mọi kết quả phải giải thích nhân vật và biến cố, không dừng ở câu mở đầu. Mỗi kết quả 1–3 câu riêng, không lặp công thức 'bạn giải quyết chặng N'. Không tự động giết bằng xúc xắc ngoài lựa chọn; death chỉ trên kết quả nguy hiểm có cảnh báo rõ.
- effects hợp lệ dùng trong gói này: STR/INT/AGI/LUCK ±1..2, health thường -5..-20 (thất bại sinh tử -35..-50), joy ±3..10, wealth ±3..15, fame ±1..5, jobXp:0.5..2, flags:[...], unflags:[...], epochChange:{domain,insight,legacy,ruin}, setFree:true, evolve:"tên hình thái chính xác". Dùng đúng phần phù hợp nhiệm vụ; không thêm effects tưởng tượng. Không thêm bars.fame; fame là chỉ số riêng. epochChange mỗi trục ±1..2, không trao cả bốn trục một lúc; ruin không được coi là công trạng tích cực.
- require chỉ dùng những khóa cần thiết: free:true; captiveKinds:["prison"|"slave"|"arena"|"bound"]; focus:"rest"; job:"ID thật"; jobRank:0..4; flags:[tất cả cần có]; notFlags:[tất cả cần chưa có]; anyFlags:[ít nhất một]; form:"tên thật"|"none"|"any"; party:1; spouse:true; children:1; fatherAlive:true; motherAlive:true; makerAlive:true. Không dùng free cùng captiveKinds. Không tạo contexts/require.epoch/... chưa được hỗ trợ. focus ở cấp event là MẢNG, ví dụ ["rest"].
- Chuỗi ba chặng viết thành BA EVENT có ID riêng, liên kết bằng effects.flags và require.flags. Cờ gm_* của chặng sau phải được cấp từ ít nhất một kết quả trước. Dùng unflags dọn cờ đang chạy và notFlags cờ kết thúc để không bị kẹt/lặp; thất bại chấm dứt phải nói rõ và cấp cờ kết thúc. Chặng giữa bị hoãn giữ cờ chờ hợp lý, không tự nhảy bước. Không giả lập quest.steps vì đầu ra chỉ hỗ trợ origins/events. Không yêu cầu player vốn đã có cờ chỉ được cấp cuối cùng.
- Event tái diễn: once:false, cooldownYears dương theo nhịp tộc, variants:[3 lời mở đầu khác nhau cùng ngữ cảnh và cùng tập lựa chọn]. Không dùng lại tên cá nhân cố định qua hàng nghìn năm như thể bất tử. once:true không cần cooldownYears.
- Ngoài ảnh hưởng đời sống được chỉ định, không dùng joinBand/recruit/memberJoin/castJoin/foundBand/bandLead hay ép kết hôn/sinh con. Không thay job/rank/xp ngầm. Cộng jobXp chỉ khi thực sự sử dụng chuyên môn; không tặng XP chỉ vì ngủ nghỉ.
- {ally}/{allyJob} chỉ dùng khi require.party:1, người đó là đồng đội còn sống; {spouse} cần spouse:true; {child} cần children:1 và tình huống đúng tuổi con; {father}/{mother}/{maker} cần cờ còn sống tương ứng nếu đang hành động. Không mặc định ai cũng có mentor/rival/friend. NPC mới được giới thiệu vai trò/chủng tộc ngay lần đầu, và khai báo npcs:[{name,race,position}] trên event. Không ghi tên đồng đội có sẵn như Grom/Kael vào cảnh mới; dùng token hợp lệ hoặc NPC mới có tên khác.
- Tuổi trong minAge/maxAge là năm thực, phải giao stages của tộc. Không ép mốc '500 năm sau' vào một lượt 5–20 năm. Trẻ Rồng infant 0–99 là TRỨNG, không nói/chạy/đi săn. Slime không có tay, chân, quần áo, vũ khí người trừ khi require.form:"Humanoid Slime". Ghoul không chết vì tóc bạc, không ăn ngủ như người sống. Cha mẹ chết không được tái xuất như còn sống.
- Tiền là địa vị/tài sản 0–100. Không cộng vàng thường xuyên cho ma vật; chỉ dùng wealthKind:"windfall" trong một kho báu hữu hạn thật sự; không dùng để vượt cơ chế cân bằng. Không dùng wealthKind:"commerce" cho nghề không buôn bán.
- Kiểm tra nội bộ trước khi trả: đủ số lượng, ID duy nhất, mọi token hợp lệ, không cờ mồ côi, các nhánh success/fail hoàn chỉnh, không tăng rank/form miễn phí, không sửa lore, không dùng mẫu văn hàng loạt đổi mỗi tên.

MẪU EVENT ĐÚNG CẤU TRÚC (minh họa, KHÔNG tính vào số lượng cần viết):
{"id":"gm_human_mau_doc_lap","pack":true,"races":["human"],"stages":["adult","middle"],"once":true,"weight":6,"require":{"free":true},"text":"Tại rìa Đồng Bằng Thánh Quang, một dấu niêm phong bị cạo sửa trên thư lệnh sơ tán. Người gác trạm chặn đường và đòi bạn giao bản gốc.","choices":[{"label":"Đối chiếu mật dấu để chứng minh thư thật","check":{"stat":"INT","target":6},"success":{"text":"Bạn chỉ ra nét khắc còn sót dưới lớp sáp mới. Người gác trạm mở đường và cho người báo động tuyến dân cư.","effects":{"fame":2}},"fail":{"text":"Dấu khắc đã bị mài quá sâu. Bạn giữ thư, chịu đòn ở trạm gác rồi rút về tuyến dự phòng.","effects":{"health":-15,"joy":-3}}},{"label":"Lùi về trạm dự phòng, tránh xung đột","text":"Bạn đánh dấu nơi niêm phong bị sửa và chuyển thư qua trạm dự phòng. Đoàn người phải chờ thêm, nhưng thư gốc vẫn nguyên vẹn.","effects":{"joy":-3}}]}

BỐI CẢNH CHUẨN:
# Aethelgard — bối cảnh đã chốt (dán vào prompt Gemini khi cần)

**Giọng văn:** Epic RPG. Sử thi, trang trọng, tự sự cổ điển, đậm màu thần thoại phương Tây.
Ví dụ: "Bánh xe định mệnh khẽ xoay, linh hồn bạn vượt qua cõi Hư Vô để cập bến lục địa linh thiêng..."

**Thế giới:** Aethelgard (Lục Địa Vĩnh Hằng). Lịch: Kỷ Nguyên Khai Hoang (A.E.).
Bốn mùa: Mùa Nảy Mầm, Mùa Lửa Trại, Mùa Lá Héo, Mùa Săn Bão.
Tiền tệ: Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana.

## Thời đại khi đầu thai (`eras` trong sự kiện)
| id | Tên | Tỉ lệ | Trọng tâm sự kiện |
|---|---|---|---|
| `peace` | Thời Bình | 40% | học hành, giao thương, hầm ngục nhỏ, lễ hội, ngoại giao |
| `holy_war` | Chiến Tranh Tuyến Đầu | 30% | bắt lính, chạy nạn, lập công, gián điệp |
| `dark_age` | Kỷ Nguyên Tăm Tối | 20% | dịch bệnh, nạn đói, tà giáo; chết yểu cao |
| `demon_lord` | Ma Vương Giáng Thế | 10% | tập kết anh hùng, đánh Boss; ma vật theo Quân Đoàn |

## Bảy vùng đất
- `region_central` Đồng Bằng Thánh Quang: Human, Dwarf. Thủ đô Sanctus, Tháp Ma Pháp Bạch Ngà. Nguy hiểm 1.
- `region_beast` Thảo Nguyên Gió Hú: Beastman, Human, Orc. Trại Huyết Môn, Vực Móng Vuốt. Nguy hiểm 3.
- `region_elf` Đại Ngàn Lục Bảo: Elf. Cây Thế Giới Yggdrasil, Hồ Gương Tĩnh Lặng. Nguy hiểm 2 (4 với kẻ xâm nhập).
- `region_dwarf` Dãy Núi Răng Cưa: Dwarf, Kobold. Lò Rèn Vĩnh Cửu, Khu Mỏ Pha Lê Đen. Nguy hiểm 3.
- `region_swamp` Đầm Lầy Tử Khí: Lizardman, Slime, Goblin. Tế Đàn Xương Cốt, Sông Bùn Nhão. Nguy hiểm 4.
- `region_abyss` Vực Thẳm Phân Tầng: Demon, Imp, Vampire, Ghoul, Troll. Cửa Ngục Than Khóc, Thành Phố Dưới Lòng Đất. Nguy hiểm 5.
- `region_dragon` Đảo Tro Tàn: Dragon, Minotaur. Đỉnh Hỏa Ngục, Đấu Trường Khổng Lồ. Nguy hiểm 5.

## Tôn giáo
- Giáo hội Thánh Quang (Nữ thần Lumina): thù địch tuyệt đối với ma vật.
- Tự Nhiên Giáo (Tinh linh Vương Yggdrasil): trung lập, giữ cân bằng.
- Hắc Nguyệt Hội (Vực Thẳm Cổ Thần): tôn sùng ma vật, hiến tế.

## Tổ chức
Guild Bình Minh (mạo hiểm giả) · Học viện Ma pháp Tháp Ngà · Thánh Kỵ Sĩ Đoàn · Quân đoàn Ma Vương (Ma Vương) ·
Thương hội Sói Bạc · Guild Sát thủ Umbra (The Umbra) · Đấu trường Huyết Sa · Đội Ranger Đại Ngàn.

## Biến cố lớn
Chiến Tranh Chủng Tộc · Đại Dịch Miasma · Ma Vương Trỗi Dậy · Dũng Giả Được Triệu Hồi · Kỷ Nguyên Nạn Đói.


NHIỆM VỤ CỤ THỂ:
Chạy prompt này một lần cho MỘT job. Mặc định bm_courier; nếu tôi ghi job khác ở đầu yêu cầu, thay bằng đúng job đó.
Các nhóm đã được sửa logic và đã có hai mốc nghề; đừng viết lại 198 nhiệm vụ hay tạo nghề mới. Cần tăng chiều sâu bằng 8 events mới cho job đang chọn: 2 biến cố chuyên môn độc lập, 2 xung đột đạo đức độc lập, một chuỗi hậu quả ba chặng và 1 tình huống phục hồi danh dự. Gắn require.job chính xác, free:true; nghề chỉ xuất hiện ở giai đoạn tuổi phù hợp. 2/8 events được lặp với cooldown phù hợp (Human/Beastman/Imp/Kobold/Goblin 2 năm, Ghoul/Slime 30 năm); các chuỗi once:true. Có ít nhất 3 tình huống không nhận tiền mà nhận tri thức, uy tín hoặc an toàn.
Chọn đúng chuyên môn: bm_courier/imp_messenger = giao liên, thư sơ tán, mật ước, niêm phong, tuyến thư (không đàn/hát); imp_secretary = mật lục/chính trị Vực Thẳm; kobold_overseer = khẩu phần/an toàn hầm mỏ; goblin_shaman/kobold_priest/lizard_priest/minotaur_shaman/bm_shaman/orc_shaman = vật tổ/tổ tiên/nghi thức bộ tộc (không Giáo hội Thánh Quang); ghoul_awakened = ký ức/bản ngã/tử linh; lizard_venom/slime_poison = độc tố/trung hòa/hệ sinh thái (không đào quặng); slime_mimic = mô phỏng/lẩn trốn, không sân khấu.
Bậc hiển thị 2/4 tương ứng jobRank 1/3. Khi cần phân nhánh giữa các bậc, dùng jobRank tối thiểu; không giả định đã đạt bậc 4 từ bậc 0. Dùng cờ mới gm_* riêng, không chạm các cờ career_* hay *_professional_integrity/compromise cũ. Không bẻ nghề thủ thư thành thương nhân hay tư tế ma vật thành linh mục loài người.

DANH MỤC HIỆN TẠI (chỉ dùng ID có thật; stages.start là ranh giới năm thực tham chiếu):
[
  {
    "id": "beastman",
    "name": "Beastman",
    "lifespan": [
      50,
      60
    ],
    "stages": [
      {
        "id": "infant",
        "name": "Sơ sinh",
        "start": 0
      },
      {
        "id": "child",
        "name": "Thơ ấu",
        "start": 2.2
      },
      {
        "id": "teen",
        "name": "Thiếu niên",
        "start": 8.3
      },
      {
        "id": "adult",
        "name": "Trưởng thành",
        "start": 13.8
      },
      {
        "id": "middle",
        "name": "Trung niên",
        "start": 30.3
      },
      {
        "id": "elder",
        "name": "Tuổi già",
        "start": 44
      }
    ],
    "forms": {},
    "origins": [
      "bm_bg_nomad",
      "bm_bg_arena",
      "bm_bg_forest",
      "bm_bg_merchant",
      "bm_bg_wolf",
      "bm_bg_slum",
      "bm_bg_darkmoon",
      "bm_bg_swamp",
      "bm_bg_forge",
      "bm_bg_ranger",
      "bm_bg_demon",
      "bm_bg_lumina",
      "bm_bg_taboo",
      "bm_bg_halfblood",
      "bm_bg_cat_roof",
      "bm_bg_dog_guard",
      "bm_bg_wolf_alpha",
      "bm_bg_fox_shrine",
      "bm_bg_rabbit_warren",
      "bm_bg_tiger_peak",
      "bm_bg_bear_cave",
      "bm_bg_rat_sewer",
      "bm_bg_hawk_cliff"
    ],
    "jobs": [
      {
        "id": "bm_berserker",
        "name": "Berserker",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "bm_hunter",
        "name": "Steppe Hunter",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "bm_gladiator",
        "name": "Gladiator",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "bm_scout",
        "name": "Scout",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "bm_shaman",
        "name": "Shaman",
        "stat": "INT",
        "family": "shaman"
      },
      {
        "id": "bm_merc",
        "name": "Silver Wolf Mercenary",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "bm_leather",
        "name": "Leatherworker",
        "stat": "STR",
        "family": "smith"
      },
      {
        "id": "bm_herder",
        "name": "Beast Herder",
        "stat": "LUCK",
        "family": "tamer"
      },
      {
        "id": "bm_thief",
        "name": "Thief",
        "stat": "AGI",
        "family": "assassin"
      },
      {
        "id": "bm_mage",
        "name": "Tribal Mage",
        "stat": "INT",
        "family": "mage"
      },
      {
        "id": "bm_courier",
        "name": "Courier",
        "stat": "AGI",
        "family": "courier"
      }
    ],
    "racialPool": 573
  },
  {
    "id": "goblin",
    "name": "Goblin",
    "lifespan": [
      8,
      12
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Ấu tể"
      },
      {
        "id": "child",
        "start": 1,
        "name": "Goblin con"
      },
      {
        "id": "teen",
        "start": 2,
        "name": "Goblin thiếu niên"
      },
      {
        "id": "adult",
        "start": 4,
        "name": "Goblin trưởng thành"
      },
      {
        "id": "middle",
        "start": 7,
        "name": "Goblin lão luyện"
      },
      {
        "id": "elder",
        "start": 9,
        "name": "Goblin lão làng"
      }
    ],
    "forms": {
      "Hobgoblin": {
        "name": "Hobgoblin",
        "life": 6
      },
      "Goblin Shaman Lord": {
        "name": "Goblin Shaman Lord",
        "life": 8
      },
      "Goblin King": {
        "name": "Goblin King",
        "life": 10
      }
    },
    "origins": [
      "goblin_origin_forest",
      "goblin_origin_dungeon",
      "goblin_origin_chief",
      "goblin_origin_orphan",
      "goblin_origin_shaman",
      "goblin_origin_mutant",
      "goblin_origin_slave"
    ],
    "jobs": [
      {
        "id": "goblin_warrior",
        "name": "Goblin Warrior",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "goblin_scout",
        "name": "Goblin Scout",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "goblin_shaman",
        "name": "Goblin Shaman",
        "stat": "INT",
        "family": "shaman"
      },
      {
        "id": "goblin_tinker",
        "name": "Goblin Tinker",
        "stat": "INT",
        "family": "smith"
      },
      {
        "id": "goblin_rider",
        "name": "Goblin Wolf Rider",
        "stat": "AGI",
        "family": "tamer"
      }
    ],
    "racialPool": 236
  },
  {
    "id": "slime",
    "name": "Slime",
    "lifespan": [
      650,
      950
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Giọt Nhầy Nhỏ"
      },
      {
        "id": "child",
        "start": 5,
        "name": "Khối Bùn Trượt"
      },
      {
        "id": "teen",
        "start": 15,
        "name": "Slime Trưởng Thành"
      },
      {
        "id": "adult",
        "start": 50,
        "name": "Quái Vật Dẻo"
      },
      {
        "id": "middle",
        "start": 200,
        "name": "Slime Khổng Lồ"
      },
      {
        "id": "ancient",
        "start": 500,
        "name": "Vua Bùn Nhão"
      }
    ],
    "forms": {
      "Slime King": {
        "name": "Slime King",
        "life": 300
      },
      "Elemental Slime": {
        "name": "Elemental Slime",
        "life": 200
      },
      "Humanoid Slime": {
        "name": "Humanoid Slime",
        "life": 200
      }
    },
    "origins": [
      "slime_origin_pure",
      "slime_origin_rot",
      "slime_origin_flask",
      "slime_origin_chest",
      "slime_origin_demon",
      "slime_origin_division"
    ],
    "jobs": [
      {
        "id": "slime_metal",
        "name": "Metal Slime",
        "stat": "STR",
        "family": "smith"
      },
      {
        "id": "slime_magic",
        "name": "Magic Slime",
        "stat": "INT",
        "family": "mage"
      },
      {
        "id": "slime_poison",
        "name": "Poison Slime",
        "stat": "AGI",
        "family": "venom"
      },
      {
        "id": "slime_mimic",
        "name": "Mimic Slime",
        "stat": "LUCK",
        "family": "mimic"
      },
      {
        "id": "slime_pet",
        "name": "Tamer's Pet Slime",
        "stat": "LUCK",
        "family": "tamer"
      }
    ],
    "racialPool": 228
  },
  {
    "id": "kobold",
    "name": "Kobold",
    "lifespan": [
      8,
      12
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Cún Thằn Lằn"
      },
      {
        "id": "child",
        "start": 1,
        "name": "Thợ Đào Nhí"
      },
      {
        "id": "teen",
        "start": 2,
        "name": "Kỹ Sư Bẫy Rập"
      },
      {
        "id": "adult",
        "start": 4,
        "name": "Chiến Binh Sừng Vảy"
      },
      {
        "id": "middle",
        "start": 7,
        "name": "Giám Sát Mỏ"
      },
      {
        "id": "elder",
        "start": 9,
        "name": "Trưởng Lão Vuốt Cùn"
      }
    ],
    "forms": {
      "Kobold Elite": {
        "name": "Kobold Elite",
        "life": 8
      },
      "Dragonblood Kobold": {
        "name": "Dragonblood Kobold",
        "life": 15
      }
    },
    "origins": [
      "kobold_bg_mountain",
      "kobold_bg_abyss",
      "kobold_bg_slave",
      "kobold_bg_dragon",
      "kobold_bg_sulfur",
      "kobold_bg_sacrificial"
    ],
    "jobs": [
      {
        "id": "kobold_miner",
        "name": "Kobold Miner",
        "stat": "STR",
        "family": "miner"
      },
      {
        "id": "kobold_trapper",
        "name": "Kobold Trapper",
        "stat": "INT",
        "family": "ranger"
      },
      {
        "id": "kobold_sniffer",
        "name": "Kobold Sniffer",
        "stat": "LUCK",
        "family": "ranger"
      },
      {
        "id": "kobold_priest",
        "name": "Kobold Priest",
        "stat": "INT",
        "family": "shaman"
      },
      {
        "id": "kobold_overseer",
        "name": "Kobold Overseer",
        "stat": "STR",
        "family": "administrator"
      }
    ],
    "racialPool": 214
  },
  {
    "id": "lizardman",
    "name": "Lizardman",
    "lifespan": [
      55,
      65
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Nòng Nọc Vảy Sừng"
      },
      {
        "id": "child",
        "start": 5,
        "name": "Thợ Săn Đầm Lầy"
      },
      {
        "id": "teen",
        "start": 12,
        "name": "Chiến Binh Gai Độc"
      },
      {
        "id": "adult",
        "start": 20,
        "name": "Thủ Lĩnh Bộ Lạc"
      },
      {
        "id": "middle",
        "start": 35,
        "name": "Tư Tế Tà Thần"
      },
      {
        "id": "elder",
        "start": 45,
        "name": "Cổ Thằn Lằn"
      }
    ],
    "forms": {
      "Swamp Dragonewt": {
        "name": "Swamp Dragonewt",
        "life": 25
      },
      "High Serpent Priest": {
        "name": "High Serpent Priest",
        "life": 20
      }
    },
    "origins": [
      "lizard_origin_pool",
      "lizard_origin_slave",
      "lizard_origin_poison",
      "lizard_origin_snake",
      "lizard_origin_blood_mud",
      "lizard_origin_outcast"
    ],
    "jobs": [
      {
        "id": "lizard_warrior",
        "name": "Lizardman Warrior",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "lizard_hunter",
        "name": "Swamp Hunter",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "lizard_priest",
        "name": "Serpent Priest",
        "stat": "INT",
        "family": "shaman"
      },
      {
        "id": "lizard_venom",
        "name": "Venom Master",
        "stat": "INT",
        "family": "venom"
      },
      {
        "id": "lizard_egg",
        "name": "Egg Watcher",
        "stat": "LUCK",
        "family": "tamer"
      }
    ],
    "racialPool": 247
  },
  {
    "id": "imp",
    "name": "Imp",
    "lifespan": [
      8,
      12
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Imp sơ sinh"
      },
      {
        "id": "child",
        "start": 1,
        "name": "Imp nhãi ranh"
      },
      {
        "id": "teen",
        "start": 2,
        "name": "Imp tay sai"
      },
      {
        "id": "adult",
        "start": 4,
        "name": "Imp đưa tin"
      },
      {
        "id": "middle",
        "start": 7,
        "name": "Imp xảo quyệt"
      },
      {
        "id": "elder",
        "start": 9,
        "name": "Imp trụi cánh"
      }
    ],
    "forms": {
      "Greater Demon": {
        "name": "Greater Demon",
        "life": 10
      },
      "Free Imp": {
        "name": "Free Imp",
        "life": 5
      }
    },
    "origins": [
      "imp_origin_cauldron",
      "imp_origin_summon",
      "imp_origin_ashes",
      "imp_origin_table",
      "imp_origin_jar",
      "imp_origin_cult"
    ],
    "jobs": [
      {
        "id": "imp_custodian",
        "name": "Hell Drudge",
        "stat": "STR",
        "family": "miner"
      },
      {
        "id": "imp_messenger",
        "name": "Imp Messenger",
        "stat": "AGI",
        "family": "courier"
      },
      {
        "id": "imp_secretary",
        "name": "Dark Scribe",
        "stat": "INT",
        "family": "administrator"
      },
      {
        "id": "imp_familiar",
        "name": "Familiar",
        "stat": "LUCK",
        "family": "scholar"
      },
      {
        "id": "imp_trickster",
        "name": "Imp Trickster",
        "stat": "INT",
        "family": "bard"
      }
    ],
    "racialPool": 223
  },
  {
    "id": "orc",
    "name": "Orc",
    "lifespan": [
      40,
      45
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Orc Non Nớt"
      },
      {
        "id": "child",
        "start": 4,
        "name": "Tân Binh Bộ Lạc"
      },
      {
        "id": "teen",
        "start": 10,
        "name": "Chiến Binh Máu Nóng"
      },
      {
        "id": "adult",
        "start": 16,
        "name": "Huyết Kỵ Sĩ"
      },
      {
        "id": "middle",
        "start": 26,
        "name": "Tướng Lĩnh Chiến Trường"
      },
      {
        "id": "elder",
        "start": 36,
        "name": "Tù Trưởng Già Cỗi"
      }
    ],
    "forms": {
      "High Orc": {
        "name": "High Orc",
        "life": 15
      },
      "Orc Warlord": {
        "name": "Orc Warlord",
        "life": 10
      }
    },
    "origins": [
      "orc_origin_1",
      "orc_origin_2",
      "orc_origin_3",
      "orc_origin_4",
      "orc_origin_5",
      "orc_origin_6"
    ],
    "jobs": [
      {
        "id": "orc_berserker",
        "name": "Orc Berserker",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "orc_ranger",
        "name": "Orc Ranger",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "orc_shaman",
        "name": "Orc Shaman",
        "stat": "INT",
        "family": "shaman"
      },
      {
        "id": "orc_smith",
        "name": "Orc Smith",
        "stat": "STR",
        "family": "smith"
      },
      {
        "id": "orc_rider",
        "name": "Orc Wolf Rider",
        "stat": "AGI",
        "family": "tamer"
      }
    ],
    "racialPool": 217
  },
  {
    "id": "minotaur",
    "name": "Minotaur",
    "lifespan": [
      60,
      70
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Bê Con Cuồng Nộ"
      },
      {
        "id": "child",
        "start": 7,
        "name": "Kẻ Lạc Lối"
      },
      {
        "id": "teen",
        "start": 14,
        "name": "Đấu Sĩ Sừng Nhọn"
      },
      {
        "id": "adult",
        "start": 23,
        "name": "Ác Thú Gác Cổng"
      },
      {
        "id": "middle",
        "start": 35,
        "name": "Bạo Chúa Mê Cung"
      },
      {
        "id": "elder",
        "start": 53,
        "name": "Lão Ngưu Mù Lòa"
      }
    ],
    "forms": {
      "Golden Minotaur": {
        "name": "Golden Minotaur",
        "life": 10
      },
      "Mythical Minotaur": {
        "name": "Mythical Minotaur",
        "life": 20
      }
    },
    "origins": [
      "minota_origin_maze",
      "minota_origin_torture",
      "minota_origin_arena",
      "minota_origin_cult",
      "minota_origin_abyss",
      "minota_origin_ruins",
      "minota_origin_volcano"
    ],
    "jobs": [
      {
        "id": "minotaur_guardian",
        "name": "Labyrinth Guardian",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "minotaur_gladiator",
        "name": "Gladiator",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "minotaur_shaman",
        "name": "Abyssal Shaman",
        "stat": "INT",
        "family": "shaman"
      }
    ],
    "racialPool": 225
  },
  {
    "id": "ghoul",
    "name": "Ghoul",
    "lifespan": [
      1150,
      1400
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Xác Chết Thức Tỉnh"
      },
      {
        "id": "child",
        "start": 11,
        "name": "Ác Quỷ Thèm Thịt"
      },
      {
        "id": "teen",
        "start": 51,
        "name": "Thợ Săn Đêm"
      },
      {
        "id": "adult",
        "start": 151,
        "name": "Tai Ương Nghĩa Trang"
      },
      {
        "id": "middle",
        "start": 301,
        "name": "Ghoul Chúa"
      },
      {
        "id": "elder",
        "start": 1000,
        "name": "Khô Cốt Diệt Vong"
      }
    ],
    "forms": {
      "Ghast": {
        "name": "Ghast",
        "life": 200
      },
      "Lich": {
        "name": "Lich",
        "life": 2000
      }
    },
    "origins": [
      "ghoul_origin_graveyard",
      "ghoul_origin_massgrave",
      "ghoul_origin_lab",
      "ghoul_origin_battlefield",
      "ghoul_origin_altar",
      "ghoul_origin_dungeon"
    ],
    "jobs": [
      {
        "id": "ghoul_stalker",
        "name": "Night Stalker",
        "stat": "AGI",
        "family": "assassin"
      },
      {
        "id": "ghoul_sentinel",
        "name": "Grave Sentinel",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "ghoul_awakened",
        "name": "Awakened Ghoul",
        "stat": "INT",
        "family": "memory"
      }
    ],
    "racialPool": 205
  }
]
