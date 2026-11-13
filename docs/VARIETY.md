# Đa dạng nghề, lời dẫn chọn nghề và cái kết

Mục tiêu: hai đời cùng tộc, cùng nghề không đọc giống nhau. Nội dung nằm ở
`content/career-variety-<tộc>.js` (Human, Beastman, Elf, Demon, Dwarf) và
`content/endings.js`; `content/career-variety.js` gắn chúng vào dữ liệu khi tải.

## Mỗi nghề có gì

| Trường | Ý nghĩa |
|---|---|
| `start` | Thêm cách bước vào nghề. Khi chọn nghề, engine bốc một trong các lời này (`startAlt`). |
| `promo` | Bài thi thăng bậc thay thế cho bốn bậc. Nghề đã có bài thi riêng thì giữ cả hai; nghề chỉ có lời chung (thủ công, thương mại, nghề ngầm, tộc trường thọ) thì dùng lời mới. Mỗi đời gặp một bài cho mỗi bậc và giữ nguyên khi thi lại (`c.promoPick`). |
| `arcs` | Nhiệm vụ nghề thứ hai cho mốc bậc 2 và bậc 4, id `career_<nghề>_r2b` / `_r4b`, `career.alt: true`. Mỗi đời chỉ được mời **một** trong hai nhiệm vụ của mỗi mốc (`c.careerPick`); làm xong một cái thì cái kia không xuất hiện. Số lần làm nhiệm vụ nghề vẫn là hai lần mỗi đời. |
| `events` | Sự kiện ngẫu nhiên theo nghề, id `jx_<nghề>_<n>`, mở từ bậc thấp để lấp khoảng giữa các lần thăng bậc. |
| `quiet` | Thêm câu “năm yên ả” cho tộc sống lâu. |

Một sự kiện viết gọn: `{ r:[bậc tối thiểu, tối đa], t: lời dẫn, a:[nhãn, chỉ số, độ khó, thành công, thất bại, hiệu ứng thắng, hiệu ứng thua], b:[nhãn, kết quả, hiệu ứng] }`.
Không đặt tên riêng cho NPC trong các sự kiện này (chưa có khai báo `npcs`).

Lựa chọn trong ba chặng nhiệm vụ nghề được viết theo chỉ số chính của nghề
(`WORDS` trong `content/career-variety.js`: STR, INT, AGI, LUCK) thay cho một bộ
lời dùng chung cho mọi nghề.

## Lời dẫn đến lúc chọn nghề

`lead.teen`, `lead.adult` là lời dẫn riêng của tộc; `lead.origins` là lời dẫn
riêng cho từng xuất thân. Khi có lời theo xuất thân, engine dùng nó 60% số lần,
còn lại dùng lời chung của tộc.

## Cái chết và dòng kết trên Thẻ Cuộc Đời

`content/endings.js` thêm cái chết kể theo hoàn cảnh lúc cuối đời. Mỗi dòng là
`[loại, when, lời]`, loại gồm `o` (già), `h` (sức khỏe), `v` (bạo lực). Khóa `when`:
`frail` (đã qua 3/4 tuổi thọ), `prime`, `poor`, `rich`, `sad`, `glad`, `work`,
`adventure`, `rest`, `spouse`, `children`, `alone`, `party`, `famous`, `captive`,
`free`. Mỗi nghề của năm tộc chính có một dòng kết riêng cho người chết già trong
nghề (`byJob`, cần bậc 2 trở lên). Khi có dòng hợp hoàn cảnh, engine dùng nó 70%
số lần. Elf và Demon vẫn chết vì cạn ma lực, không vì cảm sốt.

Dòng kết (`epitaphs`) nhận thêm `when`: `old`, `violent`, `rich`, `poor`, `famous`,
`unknown`, `master`, `jobless`, `party`, `glad`, `sad`; có thể ghép nhiều khóa.

Kiểm tra: `node tools/test-variety.js`.

## Tuyến truyện nghề: thứ tự, danh hiệu và kết cục

`tools/storylines.js` chạy khi tải dữ liệu và giữ cho mỗi tuyến truyện nghề
(`content/expansions/career-*.json`) mạch lạc:

- **Chương.** Mỗi cảnh được gắn `story: { job, chapter, kind }` theo id: gặp thầy
  (`_c1_`), bước đầu (`_c2_`), ngã ba (`_c2_crossroads`), các cảnh của con đường đã
  chọn (có cờ `_path_`), hồi tính sổ (`_c4_`), kết (`_c5_`). Engine đưa cảnh chương
  nhỏ nhất đang đủ điều kiện lên trước sự kiện ngẫu nhiên (80% khi Làm việc, 55% với
  hướng sống khác, 30% khi An dưỡng), cách nhau ít nhất một nhịp. Cảnh chương 1–4
  không còn trần bậc nghề, nên thăng bậc nhanh không làm đứt tuyến.
- **Cảnh nối tiếp.** Cảnh thứ hai trên cùng một con đường cần cảnh trước đã xảy ra:
  `require.after = { event, years }`. Lời dẫn mở bằng khoảng thời gian (“Một trăm
  năm sau…”) được đọc thành số năm thật phải trôi qua.
- **Kết phải được chuẩn bị.** Cảnh của một con đường chỉ đòi đúng cờ con đường đó là cảnh
  *bắt buộc* (`story.must`); cảnh còn cần một lựa chọn trước đó là cảnh tùy chọn. Cảnh kết
  mang `require.after` là danh sách mọi cảnh bắt buộc của con đường mình, và cảnh bắt buộc
  cuối phải cách đó một quãng: nửa kỷ của tộc sống lâu, 2 năm với tộc thường, hoặc số năm
  ghi ngay trong lời kết. Cảnh bắt buộc không bao giờ chờ một cảnh tùy chọn. Thứ tự chương
  chỉ giữ nhịp kể; chính điều kiện này mới bảo đảm câu chuyện liền mạch.
- **Danh hiệu.** Cảnh kết nhắc danh hiệu nào thì chỉ mở khi nhân vật giữ danh hiệu
  đó. Các bản sao kết cho bậc thấp (`_late`) bị bỏ. Biệt danh trao sớm (“Người ta gọi
  bạn là…”) được kể thành lời hứa hẹn.
- **Kết dang dở.** Mỗi nghề có một cảnh `<cờ kết>_unfinished` cho đời sắp khép lại
  mà chưa có kết (`require.lateLife`: 1/5 cuối tuổi thọ, hoặc giai đoạn cuối của tộc
  bất tử). Lời kể dùng `{job}` và `{rank}` nên luôn đúng bậc thật. Nó không khóa kết
  thật: ai lên được đỉnh sau đó vẫn gặp cảnh kết của con đường mình.
- **Thẻ cuối đời.** Lựa chọn ở ngã ba và ở cảnh kết luôn để lại một dòng (lấy nhãn
  lựa chọn nếu kịch bản chưa viết `moment`). Dòng ấy mang `story: "path" | "end"`,
  được đưa vào ba dấu ấn của thẻ ngay sau chức nghiệp và có mục riêng “Con đường đã
  chọn và kết cục” trong biên niên, không bị sự kiện xảy ra sau đẩy xuống.

## Lời lựa chọn trong nhiệm vụ nghề

Thứ tự ưu tiên: lời viết riêng cho một nhiệm vụ (`QUEST` theo id trong
`content/career-variety.js`), rồi lời của nhóm nghề (`FAMILY`: Rồng và Thượng Ma,
đưa thư, buôn bán, thủ công, pháp sư, shaman/tu sĩ, nghề ngầm, thợ săn, thuần thú,
hát rong, học giả, nông dân/thợ mỏ), cuối cùng là lời theo chỉ số (`WORDS`). Lời nhóm nghề chỉ
áp cho những nghề ghi trong `FITS`; nghề không có trong đó dùng lời theo chỉ số, vì lời
mượn của nghề khác sẽ sai bối cảnh (tu sĩ không phải shaman, thợ mỏ không phải nông dân).
Hiện có lời riêng cho 6 nhiệm vụ của Rồng, 4 của người đưa thư, 4 của tu sĩ Human và 6 của
thợ mỏ Dwarf/Kobold; thêm nhiệm vụ
khác bằng cách thêm khóa vào `QUEST`.

Phần lớn kịch bản viết chặng cuối như một kết quả (“Bạn thắng trận đấu trên mây…”).
Câu ấy giờ là lời khi **thành công**; lời dẫn trước lựa chọn là câu `finale` của
nhóm nghề.

## Nối xuất thân, bậc nghề, thời đại và cái chết

`content/life-texture.js` (nạp sau `endings.js`):

- **Xuất thân mở nghề.** `originTrades` thêm cờ xuất thân vào `alt.anyFlags` của nghề hợp
  với nó. Mọi cờ xuất thân của 15 tộc giờ mở ít nhất một nghề (test kiểm tra điều này).
- **Bài thi riêng.** `promo` thay lời mẫu chung cho 14 nghề cuối còn dùng nó (Rồng, Thượng
  Ma, Vampire, Goblin Tinker, Orc Smith, Metal Slime). Nghề nào đã có bài riêng thì trường
  `promo` cũng mang bài đó, không còn câu mẫu.
- **“Năm yên ả” theo bậc.** `quiet[nghề] = [bậc thấp, bậc cao]`: bậc 1–2 thêm các câu
  tập sự, hai bậc cuối thêm các câu của người đứng đỉnh; các câu sẵn có dùng chung.
- **Chết khi đang hành nghề.** `workDeaths`: mỗi nghề của năm tộc chính có một cái chết
  bạo lực riêng (`require.job`).
- **Hội theo tộc.** `guilds` viết lại lời ghi danh, bảng nhiệm vụ và lời thất bại của
  Dawnbreak cho Beastman, Dwarf và Elf.
- **Thời đại bẻ lái nghề.** `civilIncome` trong `data/eras.json` giảm thu nhập của nghề
  không cầm vũ khí (chiến tranh 0,7; tăm tối 0,6; Ma Vương 0,5). Sự kiện `era_draft_<tộc>`
  (trưng binh: xin miễn, nhập ngũ và đổi sang nghề chiến đấu bằng `setJob`, hoặc nộp tiền
  thế thân) và `era_requisition_<tộc>` (trưng dụng xưởng, kho, gia súc) chỉ xảy ra trong
  thời chiến.
- **Giọng văn tử vong.** `deathRewrites` viết lại các câu chết cũ còn giọng bông đùa.
