# Prompt Gemini v3: MẠCH TRUYỆN — IMP

**Mục tiêu:** biến một kiếp Imp (trung bình 25 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 2 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 4 nút.
2. **Mạch truyện theo xuất thân**: 6 xuất thân × 4 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Bè lũ có sẵn** để gia nhập.
5. **Thuộc hạ**: khi làm Fiend Overseer trở lên hoặc tiến hóa thành Greater Demon.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 6** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 85 sự kiện cho chủng tộc
IMP, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Imp. Không viết lại sự kiện cũ.

=== IMP LÀ AI ===
Imp (tiểu quỷ có cánh, làm tạp dịch ở Ma giới, sống khoảng 25 năm). Lắm mồm, láu cá, sợ chủ.
Một đời trung bình khoảng 25 năm (rất ngắn: mỗi năm dồn dập như vài năm của Human).
Chủ đề: kẻ hầu hạ khao khát tự do, khế ước và lỗ hổng khế ước, láu cá để sống sót, mơ thành Greater Demon.
Giọng: hài đen nhanh nhảu, lắm chuyện; bi hài.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Imp) ===
Sơ sinh 0–1 · Thơ ấu 1–5 · Thiếu niên 5–9 · Trưởng thành 9–19 · Trung niên 19–28 · Tuổi già 28+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Chơi khăm · Học lỏm · Khổ luyện · Hầu hạ chủ nhân · Lẻn lên mặt đất phá phách · Nịnh bợ kẻ mạnh · Trốn việc.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Hell Drudge, Imp Messenger, Dark Scribe, Familiar, Imp Trickster.
- Ma giới: Abyss Drudge → Branded Errand-Imp → Gate Imp → Dark Servant → Fiend Overseer → Furnace Steward → Baelgor's Imp Guard.
- Tiến hóa: Greater Demon, Free Imp. Mạch truyện ĐƯỢC PHÉP dẫn tới dấu ấn mở đường tiến hóa.
- Bè lũ tối đa 3 đồng bọn đi cùng.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Ma giới, Vạc Dầu Sôi, lò luyện ngục, chủ nhân Demon, pháp sư Human triệu hồi Imp làm linh thú, Hắc Nguyệt Hội.
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Imp còn sống tới
   (đời trung bình 25 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {maker} kẻ tạo ra/chủ nhân · {spouse} bạn đời · {child} con · {ally} một đồng đội
{rival} kẻ thù truyền kiếp · {mentor} người dẫn dắt · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).
{party} tên bè lũ hiện tại · {leader} người cầm đầu · {member} một thành viên.

=== MẪU TRÌNH BÀY NÚT TRUYỆN (dùng đúng mẫu, không in đậm, không gạch đầu dòng) ===

[MÃ NÚT] Tên nút
Mạch: mã mạch · Nút: 2/4
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

Mỗi kiếp Imp có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 2 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: Imp cùng lò luôn mách chủ; học viên Tháp Ngà triệu hồi bạn rồi hành hạ)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: lão Imp sống sót qua chín đời chủ; Demon cụt sừng dạy bạn đọc khế ước)
3. {friend} TRI KỶ (ví dụ: Imp nhát nhất bè lũ; con mèo đen của pháp sư)

Lưu ý riêng: Imp có thể không có cha mẹ mà có {maker} (chủ nhân/kẻ triệu hồi). Đời ngắn: mỗi kiểu 4 nút.

Định dạng mỗi kiểu:
KIỂU <số>: <TÊN KIỂU VIẾT HOA> (<mã mạch>)
Mô tả: giới tính, tộc, 1–2 câu với một chi tiết dễ nhớ (vết sẹo, câu cửa miệng, món đồ luôn mang theo).
Rồi 3 câu "Nhắc lại" dùng chung cho cả mạch, mỗi câu một dòng.
Rồi 4 nút truyện theo mẫu:
  Nút 1 (Thơ ấu): Gặp gỡ
  Nút 2 (Thiếu niên): Gắn bó hoặc va chạm
  Nút 3 (Trưởng thành): Bước ngoặt
  Nút 4 (Trung niên): Khép lại
Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người dẫn dắt có thể chết vì bạn.
Nút cuối có 2–3 kết; được phép "{rival} CHẾT", "{friend} CHẾT"...

Mã mạch: rival_a, rival_b, mentor_a, mentor_b, friend_a, friend_b. Mã nút: imp_cast_<mã mạch>_<số>, ví dụ imp_cast_rival_a_3.
Tổng: 6 kiểu × 4 nút = 24 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 3 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ hoặc kẻ tạo ra mình ({maker}) và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch 4 nút:
Nút 1 (Thơ ấu): biến cố gieo mầm từ gia cảnh hoặc cha mẹ hoặc kẻ tạo ra mình ({maker})
Nút 2 (Thiếu niên): hậu quả đầu tiên; nhân vật tự quyết định
Nút 3 (Trưởng thành): bước ngoặt lớn; quá khứ tìm đến
Nút 4 (Trung niên): khép lại
Nút cuối có 2–3 kết khác nhau tùy dấu ấn. Một nhánh có thể mở đường tiến hóa (Greater Demon, Free Imp).

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi 4 nút theo mẫu. Mã nút: imp_arc_<mã mạch>_<số>; nhánh: imp_arc_<mã mạch>_3a, imp_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "cauldron" · imp_origin_cauldron · Vạc Dầu Sôi Ma giới · dấu ấn sẵn có: hellborn · Cha: Grug, Tạp dịch dọn hố xỉ, còn sống · Mẹ: Kraz, Nhặt rác chiến trường, còn sống
- mạch "summon" · imp_origin_summon · Vòng Tròn Triệu Hồi · dấu ấn sẵn có: familiar_pet · Kẻ tạo ra/chủ nhân: Aldric, Pháp sư tập sự tại Học viện Ma pháp Tháp Ngà, còn sống
- mạch "ashes" · imp_origin_ashes · Tro Tàn Khế Ước · dấu ấn sẵn có: unbound_imp · Kẻ tạo ra/chủ nhân: Elara, Pháp sư lang bạt, đã mất
- mạch "table" · imp_origin_table · Gầm Bàn Ác Quỷ · dấu ấn sẵn có: hellborn · Cha: game tự đặt tên, không rõ tung tích · Mẹ: Vex, Tỳ nữ dọn bàn tiệc, còn sống
```

PHẦN 3
```
- mạch "jar" · imp_origin_jar · Bình Ngâm Tháp Ngà · dấu ấn sẵn có: familiar_pet, trauma_jar · Kẻ tạo ra/chủ nhân: Giáo sư Morzan, Học giả lập dị của Học viện Ma pháp Tháp Ngà, còn sống
- mạch "cult" · imp_origin_cult · Tế Đàn Lừa Lọc · dấu ấn sẵn có: familiar_pet, fake_abyssal_lord · Kẻ tạo ra/chủ nhân: Kaelen, Tế tư Hắc Nguyệt Hội, còn sống
```

---

## PHẦN 4 — Chương đời và tiểu sử

```
PHẦN 4: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Trưởng thành, Trung niên, Tuổi già), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có bè lũ) (đã tiến hóa) (có thuộc hạ)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Thơ ấu (1–5 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 6 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(cauldron) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): bị chủ đốt thành tro · chết khi khế ước hết hạn · bị pháp sư trục xuất · chết vì nói nhiều · chết khi đã tự do · chết khi đã thành Greater Demon · chết già (hiếm) · chết trước khi kịp lớn · chết mà mạch truyện còn dở dang · hy sinh cho chủ (hoặc cho bè lũ).

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 5 — Bè lũ có sẵn

```
PHẦN 5: BÈ LŨ CÓ SẴN

LUẬT VỀ ĐỒNG BỌN: Imp sống theo bè lũ. Từ khi đủ lớn, nhân vật bị lùa vào, xin vào, hoặc giành chỗ trong một
BÈ LŨ CÓ SẴN gồm 3–6 thành viên có tên, có kẻ cầm đầu, có thứ bậc, có kẻ bị bắt nạt.
Mỗi lúc chỉ ở một bè lũ; có thể bị đuổi, bỏ trốn, bè lũ bị xóa sổ, hoặc lật đổ kẻ cầm đầu.

Thiết kế 5 bè lũ khác hẳn nhau, ví dụ: bè lũ Imp tạp dịch cùng lò; nhóm Imp đưa thư; băng Imp trộm vặt trong Ma giới; nhóm linh thú của học viên Tháp Ngà; bè lũ Imp trốn khế ước.

Định dạng mỗi bè lũ (dùng ĐÚNG chữ "BĂNG" và "Tên băng" để game đọc được):
BĂNG <số>: <TÊN KIỂU VIẾT HOA> (Mã: band_<a..e>)
Tên băng: <tên> · Luật lệ: <1 câu> · Hang ổ: <nơi>.
Mỗi thành viên một dòng: <Tên>: <Tộc> (<vị trí: đầu băng, tay chân, kẻ bị bắt nạt...>). <tính cách, tật xấu hoặc bí mật>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi 3 câu "Nhắc lại" về bè lũ, mỗi câu một dòng.
Rồi các nút:
- Nút 1 vào bè lũ: imp_band_band_<x>_1 (2–3 lựa chọn; vào thì ghi "gia nhập băng band_<x>").
- Nút 2–5 đời sống: imp_band_band_<x>_2 … _5 (chia phần → bắt nạt hoặc bị bắt nạt → một thành viên bị bỏ lại →
  tranh ngôi cầm đầu → khép lại).
- Mỗi thành viên quan trọng 1 nút riêng: imp_band_band_<x>_m1, _m2… với "Mạch: band_<x> · Nút: m1 (<Tên>)".
```

---

## PHẦN 6 — Thuộc hạ

```
PHẦN 6: THUỘC HẠ

Điều kiện: khi làm Fiend Overseer trở lên hoặc tiến hóa thành Greater Demon. Khi đó nhân vật không còn đồng đội ngang hàng mà có THUỘC HẠ (cùng tộc hoặc khác tộc),
có lòng trung thành thay cho độ thân thiết.

1. Dòng tiêu đề "LOẠI THUỘC HẠ", rồi 8 loại thuộc hạ, mỗi loại:
   <số>. <Tên gọi tiếng Việt> (<tên tiếng Anh>)
   Cách có được: <...>
   Điểm mạnh: <...>
   Điều nó cần để trung thành: <...>
   Ví dụ loại: Imp non; chó địa ngục con; Goblin bị lừa ký khế ước; hồn ma nhỏ; Human theo tà giáo.
   Mỗi loại 1 cảnh thu phục (mã imp_minion_rec_<a..h>), thu phục thì ghi "thu phục thuộc hạ minion_<a..h>".
2. 8 nút quản lý thuộc hạ (mã imp_minion_<1..8>): chia phần mùa đói, thuộc hạ bất tuân, đem thuộc hạ làm mồi,
   thuộc hạ lập công, thuộc hạ nổi loạn, kẻ trên đòi lấy thuộc hạ giỏi nhất, kẻ thù tàn sát thuộc hạ, thuộc hạ già đi cùng bạn.
3. Riêng cho từng dạng tiến hóa, 2 nút (mã imp_minion_f<số>_<1..2>, với f1 = Greater Demon, f2 = Free Imp).
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: cauldron = imp_origin_cauldron, summon = imp_origin_summon, ashes = imp_origin_ashes, table = imp_origin_table, jar = imp_origin_jar, cult = imp_origin_cult (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 4 nút mỗi kiểu, mạch xuất thân 4 nút (đời ngắn).
- Nút thuộc hạ theo dạng tiến hóa dùng mã imp_minion_f<n>_*: cần ánh xạ f<n> → form trong build-pack (f1 = Greater Demon).
