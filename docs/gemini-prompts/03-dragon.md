# Dragon — từ trứng tới quyền lực kỷ nguyên

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
Tạo 24 events, không origins. 8 events infant (0–99) TRONG TRỨNG: nghe rung động, nhiệt vỏ, lũ cướp trứng, lựa chọn giữ năng lượng/đáp lại ma lực, ký ức huyết thống. Không tự nở, không đổi stage bằng effects, không có hành động chân/tay/cánh hay hội thoại của rồng đã nở. Cảm nhận/giữ vỏ/điều hòa lõi là lựa chọn hợp lý. Không đặt require.free:true nếu tình huống có thể xảy ra cho trứng bị lấy trộm.
8 events child/teen về học bay, chọn nơi trú, giao ước với sinh vật bản địa, giữ lời thề với người nuôi, nhận thức sự khác biệt tuổi thọ. Không đồng nhất trứng nhân vật (nở tuổi100) với trứng con cái do engine theo dõi (ấp200 năm).
8 events adult/middle/elder, epoch:true, once:false, cooldownYears:250, variants ba câu cho mỗi event. Chia đều hướng thống trị/cống nạp, thiên tai/Dũng Giả, khởi nguyên/lõi hành tinh, di sản/giao ước nhiều triều đại. Mỗi tình huống ít nhất 3 hướng gồm bảo hộ, can thiệp, rút khỏi tranh chấp; trả giá và dấu ấn phải khác nhau. Không người anh hùng/nô bộc phàm nhân cố định sống qua các lượt 250 năm; mô tả hậu duệ/thế hệ mới. Không biến Rồng thành chủ sạp hương liệu.

DANH MỤC HIỆN TẠI (chỉ dùng ID có thật; stages.start là ranh giới năm thực tham chiếu):
[
  {
    "id": "dragon",
    "name": "Dragon",
    "lifespan": [
      9600,
      10400
    ],
    "stages": [
      {
        "id": "infant",
        "start": 0,
        "name": "Dragon Egg"
      },
      {
        "id": "child",
        "start": 100,
        "name": "Hatchling"
      },
      {
        "id": "teen",
        "start": 500,
        "name": "Wyvern-age"
      },
      {
        "id": "adult",
        "start": 2000,
        "name": "Great Dragon"
      },
      {
        "id": "middle",
        "start": 5000,
        "name": "Elder Dragon"
      },
      {
        "id": "elder",
        "start": 9000,
        "name": "Primordial Dragon"
      }
    ],
    "forms": {
      "Ancient Dragon": {
        "name": "Ancient Dragon",
        "life": 5000
      },
      "Dragon God": {
        "name": "Dragon God",
        "life": 10000
      }
    },
    "origins": [
      "dragon_origin_inferno",
      "dragon_origin_stolen",
      "dragon_origin_half",
      "dragon_origin_abyss",
      "dragon_origin_forest",
      "dragon_origin_ice"
    ],
    "jobs": [
      {
        "id": "dragon_hoard",
        "name": "Hoard Dragon",
        "stat": "LUCK",
        "family": "merchant"
      },
      {
        "id": "dragon_war",
        "name": "War Dragon",
        "stat": "STR",
        "family": "warrior"
      },
      {
        "id": "dragon_sage",
        "name": "Sage Dragon",
        "stat": "INT",
        "family": "mage"
      }
    ],
    "racialPool": 169
  }
]
