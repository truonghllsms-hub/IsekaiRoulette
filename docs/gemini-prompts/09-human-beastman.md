# Prompt viết tiếp — Human và Beastman

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


NHIỆM VỤ ĐANG ƯU TIÊN:
Chỉ viết cho Human và Beastman. Giữ nguyên danh sách nghề hiện có. Lần này chọn MỘT job trong danh mục dưới đây; mặc định human_swordsman. Nếu đầu yêu cầu ghi job khác thì dùng đúng ID đó.

Viết 8 events cho job đã chọn: 2 tình huống dùng chuyên môn, 2 xung đột đạo đức, một chuỗi hậu quả 3 chặng, 1 kết cục đời thường phản ánh nghề. Đừng biến mọi nghề thành chiến binh: Nông dân quan tâm vụ mùa và nước tưới; thợ rèn quan tâm vật liệu/uy tín; tư tế quan tâm cứu chữa và đức tin; sát thủ quan tâm mục tiêu/hậu quả; thương nhân quan tâm vốn và hợp đồng; người đưa thư quan tâm tuyến thư, niêm phong và dân tị nạn. Khi viết Beastman, dùng chuyên môn nghề cùng hoàn cảnh bộ tộc/cư trú, không mặc định mọi người đều gầm, có nanh hay ăn thịt: rabbit/rat/hawk không có nanh. Dùng lời văn phù hợp chung các phân loài, hoặc require.subtype đúng phân loài nếu thật sự cần.

Cần require.job đúng ID và require.free:true cho cảnh nghề tự do. Không tạo nghề mới, không cần bổ sung kịch bản nghề cho các tộc khác. Cảnh làm nhiệm vụ nghề có focus:["work"]. Cho 2 events lặp với once:false, cooldownYears:2, variants ba lời mở đầu cùng tập choices; các sự kiện còn lại once:true. Ba chặng có cờ riêng, các kết thúc đều dọn cờ chờ. Nếu chặng2 cho giải quyết sạch mối nguy thì chặng3 phải nói về hệ quả hoặc khép chuyện, không hồi sinh chính mối nguy đã bị loại bỏ.

Không tự khẳng định nhân vật có vợ/chồng/con, bạn thân, từng đi lính hay từng phản bội. Muốn nói về quá khứ cụ thể phải có cờ thật được cấp trước đó. Điều kiện chuộc lỗi phải dựa trên một thất bại có trong gói. Các chặng sau mở từ giai đoạn bắt đầu tới elder để không mất truyện chỉ vì qua mốc tuổi; không ấn định 'vài tuần sau' khi engine đã tăng nhiều năm. Hãy dùng bậc nghề hiển thị 2/4 tương ứng jobRank 1/3 và không ép bậc cao ở tuổi thiếu niên.

Các lựa chọn trả tiền cần require.wealth >= khoản phải trả và showLocked:true, kèm ít nhất một lối xử lý không trả tiền. Thất bại chiến đấu có hậu quả rõ, nhưng tránh một loạt check bắt buộc không có quyền rút lui. Không thưởng chỉ số/XP đều đặn chỉ vì ngủ nghỉ; jobXp chỉ cho việc sử dụng chuyên môn. Mỗi kết quả 1–3 câu có chi tiết riêng và khép được biến cố nhỏ. Không viết lại các cảnh An dưỡng đã có (Human10, Beastman10) hoặc tuyến bm_courier đã nhập. Dùng ID gm_<race>_<job_suffix>_<tên> để tránh trùng; tránh toàn bộ ID đã nhập liệt kê sau danh mục.

Trước khi trả JSON, tự rà mọi biến thể có dùng cùng NPC/vật phẩm/kết quả hay không. Ví dụ lời mở đầu là thuốc mỡ thì không thể có kết quả uống chén thuốc; đã qua trạm êm thấm thì không tự sinh truy nã; hình thái đã tiến hóa không được ghi đè bằng hình thái khác. Chỉ trả {"origins":[],"events":[8 events]} hợp lệ.

DANH MỤC HUMAN VÀ BEASTMAN:
[
  {
    "id": "human",
    "name": "Human",
    "lifespan": [
      70,
      80
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Sơ sinh"
      },
      {
        "id": "child",
        "start": 3,
        "name": "Thơ ấu"
      },
      {
        "id": "teen",
        "start": 11,
        "name": "Thiếu niên"
      },
      {
        "id": "adult",
        "start": 18,
        "name": "Thanh niên"
      },
      {
        "id": "middle",
        "start": 41,
        "name": "Trung niên"
      },
      {
        "id": "elder",
        "start": 60,
        "name": "Tuổi già"
      }
    ],
    "forms": {},
    "origins": [
      "human_bg_harlot",
      "human_bg_hunter",
      "human_bg_mercenary",
      "human_bg_refugee",
      "human_bg_cultist",
      "human_bg_servant",
      "human_bg_merchant",
      "human_bg_noble_bastard",
      "human_bg_half_elf",
      "human_bg_half_beast",
      "human_bg_farmer",
      "human_bg_blacksmith",
      "human_bg_knight_orphan",
      "human_bg_thief",
      "human_bg_gladiator",
      "human_bg_priest_sin",
      "human_bg_scholar",
      "human_bg_soldier",
      "human_bg_alchemist",
      "human_bg_hero_descendant"
    ],
    "jobs": [
      {
        "id": "human_swordsman",
        "name": "Kiếm sĩ",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "human_mage",
        "name": "Ma pháp sư",
        "stat": "INT",
        "family": "mage"
      },
      {
        "id": "human_assassin",
        "name": "Assassin",
        "stat": "AGI",
        "family": "assassin"
      },
      {
        "id": "human_priest",
        "name": "Priest",
        "stat": "INT",
        "family": "priest"
      },
      {
        "id": "human_merchant",
        "name": "Thương nhân",
        "stat": "INT",
        "family": "merchant"
      },
      {
        "id": "human_smith",
        "name": "Blacksmith",
        "stat": "STR",
        "family": "smith"
      },
      {
        "id": "human_ranger",
        "name": "Ranger",
        "stat": "AGI",
        "family": "ranger"
      },
      {
        "id": "human_gladiator",
        "name": "Gladiator",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "human_paladin",
        "name": "Thánh Kỵ Sĩ",
        "stat": "STR",
        "family": "paladin"
      },
      {
        "id": "human_scholar",
        "name": "Học giả Tháp Ngà",
        "stat": "INT",
        "family": "scholar"
      },
      {
        "id": "human_farmer",
        "name": "Nông dân",
        "stat": "STR",
        "family": "farmer"
      },
      {
        "id": "human_tamer",
        "name": "Tamer",
        "stat": "LUCK",
        "family": "tamer"
      },
      {
        "id": "human_bard",
        "name": "Bard",
        "stat": "LUCK",
        "family": "bard"
      },
      {
        "id": "human_mercenary",
        "name": "Lính đánh thuê",
        "stat": "STR",
        "family": "warrior"
      }
    ],
    "racialPool": 647
  },
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
  }
]

ID ĐÃ NHẬP, KHÔNG DÙNG LẠI:
gm_beastman_an_duong_bang_vet_thuong
gm_beastman_an_duong_bua_an_am
gm_beastman_an_duong_chieu_yen
gm_beastman_an_duong_choi_nho
gm_beastman_an_duong_di_bo_nhe
gm_beastman_an_duong_ky_hieu_duong_cu
gm_beastman_an_duong_loi_moi_san
gm_beastman_an_duong_ngu_tron_giac
gm_beastman_an_duong_noi_lai_tam_phen
gm_beastman_an_duong_on_dinh_hoi_tho
gm_beastman_arena_arc_1
gm_beastman_arena_arc_2
gm_beastman_arena_arc_3
gm_beastman_bao_thao_nguyen
gm_beastman_chuoi_1_phuc_kich
gm_beastman_chuoi_2_bao_cao
gm_beastman_chuoi_3_hau_qua
gm_beastman_hide_medicine
gm_beastman_mat_ma_bi_lo
gm_beastman_phuc_hoi_danh_du
gm_beastman_sleep_corner
gm_beastman_thu_phan_boi
gm_beastman_thu_ty_nan
gm_human_an_duong_ban_cu
gm_human_an_duong_cho_chieu
gm_human_an_duong_giac_ngu
gm_human_an_duong_ky_vat
gm_human_an_duong_ngam_may
gm_human_an_duong_nghia_trang
gm_human_an_duong_suoi_khoang
gm_human_an_duong_thu_moi
gm_human_an_duong_thuoc_dang
gm_human_an_duong_tu_sua_den
gm_human_guard_bribe
gm_human_prison_arc_1
gm_human_prison_arc_2
gm_human_prison_arc_3
gm_human_rest_fever
