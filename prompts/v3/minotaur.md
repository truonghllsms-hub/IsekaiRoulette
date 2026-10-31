# Prompt Gemini v3: MẠCH TRUYỆN — MINOTAUR

**Mục tiêu:** biến một kiếp Minotaur (trung bình 50 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 7 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Bầy có sẵn** để gia nhập.
5. **Thuộc hạ**: khi làm Labyrinth Warden trở lên hoặc tiến hóa thành Golden Minotaur, Mythical Minotaur.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 6** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 55 sự kiện cho chủng tộc
MINOTAUR, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Minotaur. Không viết lại sự kiện cũ.

=== MINOTAUR LÀ AI ===
Minotaur (ngưu đầu nhân sống trong mê cung, khoảng 50–60 năm). Cuồng nộ, gắn với lãnh địa, bị coi là quái vật canh cửa.
Một đời trung bình khoảng 50 năm.
Chủ đề: bị giam trong mê cung (thật và trong lòng), cuồng nộ đối đầu với lý trí, khát khao thoát ra hoặc làm chủ mê cung.
Giọng: nặng, dồn dập, tiếng vó và tiếng thở phì phò; cô độc.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Minotaur) ===
Bê Con Cuồng Nộ 0–7 · Kẻ Lạc Lối 7–14 · Đấu Sĩ Sừng Nhọn 14–23 · Ác Thú Gác Cổng 23–35 · Bạo Chúa Mê Cung 35–53 · Lão Ngưu Mù Lòa 53+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Húc phá · Khổ luyện · Canh giữ mê cung · Giác đấu · Lang thang tìm lãnh thổ · Ngủ trên đống xương.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Labyrinth Guardian, Gladiator, Abyssal Shaman.
- Mê cung: Stray Calf → Maze Sentry → Horned Gladiator → Labyrinth Brute → Labyrinth Warden → Labyrinth Tyrant → Labyrinth Sovereign.
- Tiến hóa: Golden Minotaur, Mythical Minotaur. Mạch truyện ĐƯỢC PHÉP dẫn tới dấu ấn mở đường tiến hóa.
- Bầy tối đa 3 đồng bọn đi cùng.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Mê cung cổ, phòng tra tấn, Đấu trường Huyết Sa, mạo hiểm giả đi chinh phục mê cung, pháp sư dựng mê cung để giam quái vật.
Chung cho Aethelgard: tiền Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana. 4 thời đại: Thời Bình · Chiến Tranh Tuyến Đầu ·
Kỷ Nguyên Tăm Tối · Ma Vương Giáng Thế.

=== TÊN GỌI KIỂU MANGA (BẮT BUỘC) ===
Tên chủng tộc giữ tiếng Anh: Human, Elf, Dwarf, Beastman tộc Sói, Goblin, Orc, Kobold, Lizardman, Demon, Vampire, Imp,
Slime, Minotaur, Troll, Ghoul, Dragon. Không viết "người lùn", "yêu tinh", "tiên tộc". Văn kể tiếng Việt, ngôi thứ hai ("bạn").
Không dùng tên, câu chữ, tình huống của game/truyện/phim có thật.

=== NGUYÊN TẮC VIẾT MẠCH TRUYỆN ===
1. NHÂN QUẢ: mỗi nút bắt nguồn từ điều đã xảy ra trước (xuất thân, cha mẹ, lựa chọn ở nút trước) và để lại
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Minotaur còn sống tới
   (đời trung bình 50 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {spouse} bạn đời · {child} con · {ally} một đồng đội
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

Mỗi kiếp Minotaur có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: mạo hiểm giả lần nào cũng vào mê cung tìm bạn; Minotaur khác tranh tầng; quản ngục đấu trường)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: lão Minotaur mù thuộc từng ngã rẽ; một tù nhân Human bị nhốt cùng; giọng nói của mê cung)
3. {friend} TRI KỶ (ví dụ: Minotaur non theo bạn; cô gái lạc trong mê cung; con chuột trắng)

Định dạng mỗi kiểu:
KIỂU <số>: <TÊN KIỂU VIẾT HOA> (<mã mạch>)
Mô tả: giới tính, tộc, 1–2 câu với một chi tiết dễ nhớ (vết sẹo, câu cửa miệng, món đồ luôn mang theo).
Rồi 3 câu "Nhắc lại" dùng chung cho cả mạch, mỗi câu một dòng.
Rồi 5 nút truyện theo mẫu:
  Nút 1 (Kẻ Lạc Lối): Gặp gỡ
  Nút 2 (Đấu Sĩ Sừng Nhọn): Gắn bó hoặc va chạm
  Nút 3 (Ác Thú Gác Cổng): Bước ngoặt
  Nút 4 (Ác Thú Gác Cổng): Thử thách sống còn
  Nút 5 (Bạo Chúa Mê Cung): Khép lại
Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người dẫn dắt có thể chết vì bạn.
Nút cuối có 2–3 kết; được phép "{rival} CHẾT", "{friend} CHẾT"...

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: minotaur_cast_<mã mạch>_<số>, ví dụ minotaur_cast_rival_a_3.
Tổng: 9 kiểu × 5 nút = 45 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 3 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch 5 nút:
Nút 1 (Kẻ Lạc Lối): biến cố gieo mầm từ gia cảnh hoặc cha mẹ
Nút 2 (Đấu Sĩ Sừng Nhọn): hậu quả đầu tiên; nhân vật tự quyết định
Nút 3 (Ác Thú Gác Cổng): bước ngoặt lớn; quá khứ tìm đến
Nút 4 (Ác Thú Gác Cổng): đối mặt; có thể mất mát lớn
Nút 5 (Bạo Chúa Mê Cung): khép lại
Nút cuối có 2–3 kết khác nhau tùy dấu ấn. Một nhánh có thể mở đường tiến hóa (Golden Minotaur, Mythical Minotaur).

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi 5 nút theo mẫu. Mã nút: minotaur_arc_<mã mạch>_<số>; nhánh: minotaur_arc_<mã mạch>_3a, minotaur_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "maze" · minota_origin_maze · Tâm điểm Mê cung · dấu ấn sẵn có: maze_guardian · Cha: Asterion, Bạo chúa Mê cung, còn sống · Mẹ: Taurus, Ác thú gác cổng, còn sống
- mạch "torture" · minota_origin_torture · Phòng tra tấn · dấu ấn sẵn có: enslaved · Cha: game tự đặt tên, Nô lệ hầm mỏ, đã mất · Mẹ: Grea, Nô lệ giác đấu, còn sống
- mạch "arena" · minota_origin_arena · Đấu trường sinh tử · dấu ấn sẵn có: gladiator_bull · Cha: Gore, Quán quân Đấu trường, còn sống · Mẹ: Tộc nhân Beastman tộc Bò, Nữ nô lệ mua vui, còn sống
- mạch "cult" · minota_origin_cult · Tế đàn dị giáo · dấu ấn sẵn có: cult_god · Cha: Ma thần Vực Thẳm, Tồn tại khái niệm vô hình, còn sống · Mẹ: Nữ tế sư tối cao, Cuồng tín Hắc Nguyệt Hội, còn sống
```

PHẦN 3
```
- mạch "abyss" · minota_origin_abyss · Đáy Vực Thẳm · dấu ấn sẵn có: maze_guardian · Cha: Kẻ đồ tể, Kẻ lang thang Vực Thẳm, đã bỏ đi · Mẹ: Khuyết danh, Ác thú gác cổng, còn sống
- mạch "ruins" · minota_origin_ruins · Tàn tích đền thờ cổ · dấu ấn sẵn có: cult_god · Cha: Khổng lồ đá, Hộ vệ vô tri, còn sống · Mẹ: Lời nguyền Tự nhiên, Kẻ bị nguyền rủa, còn sống
- mạch "volcano" · minota_origin_volcano · Lò ấp Đỉnh Hỏa Ngục · dấu ấn sẵn có: ash_born · Cha: Chiến binh vô danh, Kẻ săn rồng, còn sống · Mẹ: Rồng lửa Đảo Tro Tàn, Hung thần bầu trời, đã bỏ đi
```

---

## PHẦN 4 — Chương đời và tiểu sử

```
PHẦN 4: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Kẻ Lạc Lối, Đấu Sĩ Sừng Nhọn, Ác Thú Gác Cổng, Bạo Chúa Mê Cung, Lão Ngưu Mù Lòa), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có bầy) (đã tiến hóa) (có thuộc hạ)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Kẻ Lạc Lối (7–14 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 7 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(maze) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): bị mạo hiểm giả hạ trong mê cung · chết già (hiếm) · chết trên đấu trường · chết khi thoát ra ngoài · chết vì cơn cuồng nộ · chết khi làm chủ mê cung · bị phản bội · chết trẻ · chết mà mạch truyện còn dở dang · chết khi đã tiến hóa.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 5 — Bầy có sẵn

```
PHẦN 5: BẦY CÓ SẴN

LUẬT VỀ ĐỒNG BỌN: Minotaur sống theo bầy. Từ khi đủ lớn, nhân vật bị lùa vào, xin vào, hoặc giành chỗ trong một
BẦY CÓ SẴN gồm 3–6 thành viên có tên, có kẻ cầm đầu, có thứ bậc, có kẻ bị bắt nạt.
Mỗi lúc chỉ ở một bầy; có thể bị đuổi, bỏ trốn, bầy bị xóa sổ, hoặc lật đổ kẻ cầm đầu.

Thiết kế 5 bầy khác hẳn nhau, ví dụ: bầy Minotaur gác các tầng mê cung; nhóm đấu sĩ Minotaur nô lệ; bầy quái vật cùng tầng; đàn Minotaur hoang ngoài thảo nguyên; nhóm Minotaur trốn khỏi mê cung.

Định dạng mỗi bầy (dùng ĐÚNG chữ "BĂNG" và "Tên băng" để game đọc được):
BĂNG <số>: <TÊN KIỂU VIẾT HOA> (Mã: band_<a..e>)
Tên băng: <tên> · Luật lệ: <1 câu> · Hang ổ: <nơi>.
Mỗi thành viên một dòng: <Tên>: <Tộc> (<vị trí: đầu băng, tay chân, kẻ bị bắt nạt...>). <tính cách, tật xấu hoặc bí mật>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi 3 câu "Nhắc lại" về bầy, mỗi câu một dòng.
Rồi các nút:
- Nút 1 vào bầy: minotaur_band_band_<x>_1 (2–3 lựa chọn; vào thì ghi "gia nhập băng band_<x>").
- Nút 2–5 đời sống: minotaur_band_band_<x>_2 … _5 (chia phần → bắt nạt hoặc bị bắt nạt → một thành viên bị bỏ lại →
  tranh ngôi cầm đầu → khép lại).
- Mỗi thành viên quan trọng 1 nút riêng: minotaur_band_band_<x>_m1, _m2… với "Mạch: band_<x> · Nút: m1 (<Tên>)".
```

---

## PHẦN 6 — Thuộc hạ

```
PHẦN 6: THUỘC HẠ

Điều kiện: khi làm Labyrinth Warden trở lên hoặc tiến hóa thành Golden Minotaur, Mythical Minotaur. Khi đó nhân vật không còn đồng đội ngang hàng mà có THUỘC HẠ (cùng tộc hoặc khác tộc),
có lòng trung thành thay cho độ thân thiết.

1. Dòng tiêu đề "LOẠI THUỘC HẠ", rồi 8 loại thuộc hạ, mỗi loại:
   <số>. <Tên gọi tiếng Việt> (<tên tiếng Anh>)
   Cách có được: <...>
   Điểm mạnh: <...>
   Điều nó cần để trung thành: <...>
   Ví dụ loại: Minotaur non; quái vật trong mê cung; nô lệ Human bị lạc; Kobold sửa bẫy; Golem đá.
   Mỗi loại 1 cảnh thu phục (mã minotaur_minion_rec_<a..h>), thu phục thì ghi "thu phục thuộc hạ minion_<a..h>".
2. 8 nút quản lý thuộc hạ (mã minotaur_minion_<1..8>): chia phần mùa đói, thuộc hạ bất tuân, đem thuộc hạ làm mồi,
   thuộc hạ lập công, thuộc hạ nổi loạn, kẻ trên đòi lấy thuộc hạ giỏi nhất, kẻ thù tàn sát thuộc hạ, thuộc hạ già đi cùng bạn.
3. Riêng cho từng dạng tiến hóa, 2 nút (mã minotaur_minion_f<số>_<1..2>, với f1 = Golden Minotaur, f2 = Mythical Minotaur).
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: maze = minota_origin_maze, torture = minota_origin_torture, arena = minota_origin_arena, cult = minota_origin_cult, abyss = minota_origin_abyss, ruins = minota_origin_ruins, volcano = minota_origin_volcano (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời trung bình).
- Nút thuộc hạ theo dạng tiến hóa dùng mã minotaur_minion_f<n>_*: cần ánh xạ f<n> → form trong build-pack (f1 = Golden Minotaur).
