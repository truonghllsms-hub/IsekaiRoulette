# Prompt Gemini v3: MẠCH TRUYỆN — GHOUL

**Mục tiêu:** biến một kiếp Ghoul (trung bình 672 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 6 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Bầy có sẵn** để gia nhập.
5. **Thuộc hạ**: khi làm Crypt Commander trở lên hoặc tiến hóa thành Ghast, Lich.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 6** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 55 sự kiện cho chủng tộc
GHOUL, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Ghoul. Không viết lại sự kiện cũ.

=== GHOUL LÀ AI ===
Ghoul (xác chết thức tỉnh ăn thịt người, tồn tại hàng trăm năm). Đói triền miên, mảnh ký ức đời người còn sót lại.
Một đời trung bình khoảng 672 năm (rất dài: dùng thời gian, thời đại và hậu duệ để kể).
Chủ đề: ký ức của kiếp người trước, cơn đói đối đầu với nhân tính, bị cả thế giới xua đuổi, trở thành Lich hoặc Chúa Tể Nghĩa Địa.
Giọng: u ám, rùng rợn, nhưng có chất bi kịch của kẻ từng là người.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Ghoul) ===
Xác Chết Thức Tỉnh 0–11 · Ác Quỷ Thèm Thịt 11–51 · Thợ Săn Đêm 51–151 · Tai Ương Nghĩa Trang 151–301 · Ghoul Chúa 301–1000 · Khô Cốt Diệt Vong 1000+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Lang thang tìm xác · Ăn xác phục hồi · Khổ luyện (săn mồi sống) · Phục vụ Necromancer · Lẩn trốn ánh sáng · Nằm im dưới mộ.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Night Stalker, Grave Sentinel, Awakened Ghoul.
- Bầy xác sống: Meat Shield → Carrion Scavenger → Grave Walker → Flesh Ripper → Crypt Commander → Grave Lord → Necropolis Sovereign.
- Tiến hóa: Ghast, Lich. Mạch truyện ĐƯỢC PHÉP dẫn tới dấu ấn mở đường tiến hóa.
- Bầy tối đa 3 đồng bọn đi cùng.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
nghĩa trang hoang, hố chôn tập thể sau dịch bệnh, hầm mộ, Necromancer của Hắc Nguyệt Hội, Giáo hội Thánh Quang thanh tẩy, làng mạc Human.
Chung cho Aethelgard: tiền Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana. 4 thời đại: Thời Bình · Chiến Tranh Tuyến Đầu ·
Kỷ Nguyên Tăm Tối · Ma Vương Giáng Thế.

=== TÊN GỌI KIỂU MANGA (BẮT BUỘC) ===
Tên chủng tộc giữ tiếng Anh: Human, Elf, Dwarf, Beastman tộc Sói, Goblin, Orc, Kobold, Lizardman, Demon, Vampire, Imp,
Slime, Minotaur, Troll, Ghoul, Dragon. Không viết "người lùn", "yêu tinh", "tiên tộc". Văn kể tiếng Việt, ngôi thứ hai ("bạn").
Không dùng tên, câu chữ, tình huống của game/truyện/phim có thật.

=== NGUYÊN TẮC VIẾT MẠCH TRUYỆN ===
1. NHÂN QUẢ: mỗi nút bắt nguồn từ điều đã xảy ra trước (xuất thân, cha mẹ hoặc kẻ tạo ra mình ({maker}), lựa chọn ở nút trước) và để lại
   hậu quả cho nút sau. Người chơi phải nhận ra: "Chuyện này xảy ra VÌ năm đó mình đã...".
2. NHẮC CHI TIẾT CŨ: nút sau nhắc lại cụ thể đồ vật, vết sẹo, câu nói, tên người của nút trước.
3. CÙNG MỘT NGƯỜI: nhân vật phụ quay lại nhiều lần và thay đổi theo thời gian.
4. RẼ NHÁNH THẬT: mỗi nút 2–3 hướng, hướng nào cũng có giá phải trả.
5. CÓ KẾT, kể cả kết bi thảm.
6. KHÔNG TỰ MÂU THUẪN: người đã chết hoặc không rõ tung tích chỉ xuất hiện qua ký ức, tin đồn, di vật.

=== LỖI ĐÃ GẶP Ở KỊCH BẢN TRƯỚC, TUYỆT ĐỐI TRÁNH ===
a) KHÔNG viết điều kiện vào lời kể. Sai: "Ruk chia phần cho bạn (nếu bạn từng thắng Blor)", "(Nếu trốn thoát) Thủ lĩnh...",
   "thưởng cho bạn (và mẹ, nếu còn)". Game in nguyên văn. Điều kiện chỉ ghi ở dòng "Khi nào"; nếu tình huống khác nhau
   theo nhánh thì viết 2 phiên bản [MÃ_a] và [MÃ_b], mỗi bản một điều kiện.
b) KHÔNG giả định điều chưa chắc có. Sai: nhắc "băng nhóm của bạn" khi nhân vật có thể chưa có băng; nhắc bạn đời, con,
   nghề khi chưa chắc có. Nếu cần thì ghi CẦN ở dòng "Khi nào".
c) GIỚI TÍNH: ghi rõ nam hay nữ trong Mô tả của mỗi kiểu nhân vật và giữ nhất quán. Không viết "cậu bé/cô bé", "ông/bà".
d) Mỗi lựa chọn có tung xúc xắc PHẢI có cả "Thành công:" và "Thất bại:". Lựa chọn không tung thì ghi "(không tung xúc xắc)".
e) Không chế hệ quả mới. Chỉ dùng chỉ số, thanh, dấu ấn và danh sách hệ quả đặc biệt bên dưới. Không viết "→ An toàn".
f) Tên nhân vật phụ có tên riêng không trùng nhau và không trùng tên cha mẹ trong danh sách xuất thân.
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Ghoul còn sống tới
   (đời trung bình 672 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {maker} kẻ tạo ra/chủ nhân · {spouse} bạn đời · {child} con · {ally} một đồng đội
{rival} kẻ thù truyền kiếp · {mentor} người dẫn dắt · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).
{party} tên bầy hiện tại · {leader} người cầm đầu · {member} một thành viên.

=== MẪU TRÌNH BÀY NÚT TRUYỆN (dùng đúng mẫu, không in đậm, không gạch đầu dòng) ===

[MÃ NÚT] Tên nút
Mạch: mã mạch · Nút: 2/5
Khi nào: tuổi a–b · việc chính (nếu cần) · CẦN dấu ấn x, y hoặc z · điều kiện khác
Tình huống: 2–3 câu, nhắc lại chi tiết của nút trước.
A. "Nhãn lựa chọn" — [Chỉ số], ĐỘ KHÓ
Thành công: 1–2 câu. → Sức mạnh +1, Danh vọng +5, dấu ấn x
Thất bại: 1–2 câu. → Sức khỏe −15, dấu ấn y
B. "Nhãn lựa chọn" — (không tung xúc xắc) 1–2 câu. → Tài sản −10, dấu ấn z
Nhắc lại: (x) 1 câu ngắn game chèn vào những năm sau · (y) ... · (z) ...
Khoảnh khắc: 1 dòng ghi vào tiểu sử.

Quy ước:
- Mỗi lựa chọn để lại ĐÚNG MỘT dấu ấn, mã dạng <mã mạch>_<số nút>_<từ khóa>. Nút sau ghi "CẦN dấu ấn a, b hoặc c".
- Độ khó: DỄ, VỪA, KHÓ, RẤT KHÓ. Tung xúc xắc bằng Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn hoặc Sức khỏe.
- Hệ quả ghi số: Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +5, Thân thiết với {friend} +10. Thưởng thường +5..+30.
- Hệ quả đặc biệt (viết đúng chữ): "có {spouse}", "có {child}", "{rival} CHẾT", "{mentor} CHẾT", "{friend} CHẾT",
  "{friend} gia nhập băng", "{father} CHẾT", "{mother} CHẾT", "CHẾT (lý do)",
  "gia nhập băng <mã>", "bị đuổi khỏi băng", "băng bị xóa sổ", "băng tan rã", "trở thành đầu băng",
  "<Tên> CHẾT", "<Tên> rời đội", "<Tên> phản bội", "Thân thiết với <Tên> +10",
  "thu phục thuộc hạ <mã>", "mất thuộc hạ <mã>", "thuộc hạ nổi loạn", "Thân thiết với thuộc hạ +10".
- Mỗi nút ít nhất 2 lựa chọn; luôn có một lựa chọn an toàn/hèn nhát với cái giá riêng.

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
```

---

## PHẦN 1 — Dàn nhân vật xuyên suốt

```
PHẦN 1: DÀN NHÂN VẬT XUYÊN SUỐT

Mỗi kiếp Ghoul có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: nữ tu Thánh Quang thanh tẩy nghĩa trang; Ghoul to hơn cướp xác)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: Necromancer đã đánh thức bạn ({maker}); Ghoul già nhớ được tên mình)
3. {friend} TRI KỶ (ví dụ: con quạ đậu trên vai bạn; đứa trẻ sống ở làng gần nghĩa trang (sẽ lớn lên và già đi))

Lưu ý riêng: Ghoul có thể không cha mẹ: dùng {maker} và mảnh ký ức kiếp trước. Ghoul tồn tại lâu: người sống quanh bạn già và chết.

Định dạng mỗi kiểu:
KIỂU <số>: <TÊN KIỂU VIẾT HOA> (<mã mạch>)
Mô tả: giới tính, tộc, 1–2 câu với một chi tiết dễ nhớ (vết sẹo, câu cửa miệng, món đồ luôn mang theo).
Rồi 3 câu "Nhắc lại" dùng chung cho cả mạch, mỗi câu một dòng.
Rồi 5 nút truyện theo mẫu:
  Nút 1 (Ác Quỷ Thèm Thịt): Gặp gỡ
  Nút 2 (Thợ Săn Đêm): Gắn bó hoặc va chạm
  Nút 3 (Tai Ương Nghĩa Trang): Bước ngoặt
  Nút 4 (Tai Ương Nghĩa Trang): Thử thách sống còn
  Nút 5 (Ghoul Chúa): Khép lại
Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người dẫn dắt có thể chết vì bạn.
Nút cuối có 2–3 kết; được phép "{rival} CHẾT", "{friend} CHẾT"...

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: ghoul_cast_<mã mạch>_<số>, ví dụ ghoul_cast_rival_a_3.
Tổng: 9 kiểu × 5 nút = 45 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 3 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ hoặc kẻ tạo ra mình ({maker}) và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch 5 nút:
Nút 1 (Ác Quỷ Thèm Thịt): biến cố gieo mầm từ gia cảnh hoặc cha mẹ hoặc kẻ tạo ra mình ({maker})
Nút 2 (Thợ Săn Đêm): hậu quả đầu tiên; nhân vật tự quyết định
Nút 3 (Tai Ương Nghĩa Trang): bước ngoặt lớn; quá khứ tìm đến
Nút 4 (Tai Ương Nghĩa Trang): đối mặt; có thể mất mát lớn
Nút 5 (Ghoul Chúa): khép lại
Nút cuối có 2–3 kết khác nhau tùy dấu ấn. Một nhánh có thể mở đường tiến hóa (Ghast, Lich).

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi 5 nút theo mẫu. Mã nút: ghoul_arc_<mã mạch>_<số>; nhánh: ghoul_arc_<mã mạch>_3a, ghoul_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "graveyard" · ghoul_origin_graveyard · Nghĩa trang hoang tàn · dấu ấn sẵn có: undead_curse · Kẻ tạo ra/chủ nhân: Tà khí Đầm Lầy Tử Khí
- mạch "massgrave" · ghoul_origin_massgrave · Hố chôn tập thể · dấu ấn sẵn có: mass_grave · Kẻ tạo ra/chủ nhân: Oán khí của hàng vạn người chết dịch
- mạch "lab" · ghoul_origin_lab · Bàn thí nghiệm Tử linh · dấu ấn sẵn có: necromancer_puppet · Kẻ tạo ra/chủ nhân: Zeras, Necromancer của Hắc Nguyệt Hội, còn sống
- mạch "battlefield" · ghoul_origin_battlefield · Chiến trường đẫm máu · dấu ấn sẵn có: undead_curse · Kẻ tạo ra/chủ nhân: Lời nguyền chiến trường
```

PHẦN 3
```
- mạch "altar" · ghoul_origin_altar · Tế đàn hắc ám · dấu ấn sẵn có: necromancer_puppet · Kẻ tạo ra/chủ nhân: Giáo chủ Hắc Nguyệt Hội, Kẻ thờ phụng Vực Thẳm Cổ Thần, còn sống
- mạch "dungeon" · ghoul_origin_dungeon · Hầm ngục lãng quên · dấu ấn sẵn có: dungeon_spawn · Kẻ tạo ra/chủ nhân: Lõi Mana của Hầm ngục
```

---

## PHẦN 4 — Chương đời và tiểu sử

```
PHẦN 4: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Ác Quỷ Thèm Thịt, Thợ Săn Đêm, Tai Ương Nghĩa Trang, Ghoul Chúa, Khô Cốt Diệt Vong), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có bầy) (đã tiến hóa) (có thuộc hạ)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Ác Quỷ Thèm Thịt (11–51 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 6 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(graveyard) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): bị thanh tẩy bằng thánh quang · bị thiêu · chết đói thành tro · bị Necromancer hủy · tan rã sau trăm năm · chết khi đã là Lich · chết khi nhớ lại tên mình · chết trẻ · chết mà mạch truyện còn dở dang · bị dân làng chôn lại.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 5 — Bầy có sẵn

```
PHẦN 5: BẦY CÓ SẴN

LUẬT VỀ ĐỒNG BỌN: Ghoul sống theo bầy. Từ khi đủ lớn, nhân vật bị lùa vào, xin vào, hoặc giành chỗ trong một
BẦY CÓ SẴN gồm 3–6 thành viên có tên, có kẻ cầm đầu, có thứ bậc, có kẻ bị bắt nạt.
Mỗi lúc chỉ ở một bầy; có thể bị đuổi, bỏ trốn, bầy bị xóa sổ, hoặc lật đổ kẻ cầm đầu.

Thiết kế 5 bầy khác hẳn nhau, ví dụ: bầy Ghoul nghĩa trang; đàn xác sống của Necromancer; nhóm Ghoul còn giữ lý trí trốn trong hầm mộ; bầy ăn xác chiến trường; nhóm Ghoul giả làm người sống.

Định dạng mỗi bầy (dùng ĐÚNG chữ "BĂNG" và "Tên băng" để game đọc được):
BĂNG <số>: <TÊN KIỂU VIẾT HOA> (Mã: band_<a..e>)
Tên băng: <tên> · Luật lệ: <1 câu> · Hang ổ: <nơi>.
Mỗi thành viên một dòng: <Tên>: <Tộc> (<vị trí: đầu băng, tay chân, kẻ bị bắt nạt...>). <tính cách, tật xấu hoặc bí mật>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi 3 câu "Nhắc lại" về bầy, mỗi câu một dòng.
Rồi các nút:
- Nút 1 vào bầy: ghoul_band_band_<x>_1 (2–3 lựa chọn; vào thì ghi "gia nhập băng band_<x>").
- Nút 2–5 đời sống: ghoul_band_band_<x>_2 … _5 (chia phần → bắt nạt hoặc bị bắt nạt → một thành viên bị bỏ lại →
  tranh ngôi cầm đầu → khép lại).
- Mỗi thành viên quan trọng 1 nút riêng: ghoul_band_band_<x>_m1, _m2… với "Mạch: band_<x> · Nút: m1 (<Tên>)".
```

---

## PHẦN 6 — Thuộc hạ

```
PHẦN 6: THUỘC HẠ

Điều kiện: khi làm Crypt Commander trở lên hoặc tiến hóa thành Ghast, Lich. Khi đó nhân vật không còn đồng đội ngang hàng mà có THUỘC HẠ (cùng tộc hoặc khác tộc),
có lòng trung thành thay cho độ thân thiết.

1. Dòng tiêu đề "LOẠI THUỘC HẠ", rồi 8 loại thuộc hạ, mỗi loại:
   <số>. <Tên gọi tiếng Việt> (<tên tiếng Anh>)
   Cách có được: <...>
   Điểm mạnh: <...>
   Điều nó cần để trung thành: <...>
   Ví dụ loại: xác sống không lý trí; quạ ăn xác; chuột cống; Necromancer tập sự; hồn ma.
   Mỗi loại 1 cảnh thu phục (mã ghoul_minion_rec_<a..h>), thu phục thì ghi "thu phục thuộc hạ minion_<a..h>".
2. 8 nút quản lý thuộc hạ (mã ghoul_minion_<1..8>): chia phần mùa đói, thuộc hạ bất tuân, đem thuộc hạ làm mồi,
   thuộc hạ lập công, thuộc hạ nổi loạn, kẻ trên đòi lấy thuộc hạ giỏi nhất, kẻ thù tàn sát thuộc hạ, thuộc hạ già đi cùng bạn.
3. Riêng cho từng dạng tiến hóa, 2 nút (mã ghoul_minion_f<số>_<1..2>, với f1 = Ghast, f2 = Lich).
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: graveyard = ghoul_origin_graveyard, massgrave = ghoul_origin_massgrave, lab = ghoul_origin_lab, battlefield = ghoul_origin_battlefield, altar = ghoul_origin_altar, dungeon = ghoul_origin_dungeon (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời dài).
- Nút thuộc hạ theo dạng tiến hóa dùng mã ghoul_minion_f<n>_*: cần ánh xạ f<n> → form trong build-pack (f1 = Ghast).
