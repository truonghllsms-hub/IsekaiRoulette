# Prompt Gemini v3: MẠCH TRUYỆN — DWARF

**Mục tiêu:** biến một kiếp Dwarf (trung bình 115 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 10 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Tổ đội có sẵn** để gia nhập, và tự lập tổ đội.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 7** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 155 sự kiện cho chủng tộc
DWARF, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Dwarf. Không viết lại sự kiện cũ.

=== DWARF LÀ AI ===
Dwarf (tộc thợ rèn lùn chắc nịch dưới núi, sống khoảng 150 năm). Cứng đầu, trọng lời thề, mê bia và kim loại.
Một đời trung bình khoảng 115 năm.
Chủ đề: lời thề và món nợ máu, tay nghề truyền đời, vinh dự gia tộc, lòng tham vàng bạc dưới lòng núi.
Giọng: chắc nịch, hài hước kiểu thô ráp, nặng lời thề và tiếng búa; buồn thì buồn trong im lặng.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Dwarf) ===
Sơ sinh 0–7 · Thơ ấu 7–26 · Thiếu niên 26–44 · Trưởng thành 44–96 · Trung niên 96–140 · Tuổi già 140+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Rong chơi · Học hành · Khổ luyện · Làm lụng · Mạo hiểm · Giao du · An dưỡng.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Rune Smith, Master Miner, Shield Warrior, Brewmaster, Mech Engineer, Stone Carver, Gem Merchant, Mountain Guard, Treasure Hunter.
- Guild Bình Minh: F → E → D → C → B → A → S.

- Tổ đội tối đa 3 đồng đội.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Dãy Núi Răng Cưa, Lò Rèn Vĩnh Cửu, các hội thợ rèn, Sổ Oán Hận (ghi mọi món nợ của gia tộc). Kẻ thù: Orc, Goblin trong đường hầm, rồng chiếm mỏ. Buôn bán với Human Sanctus; thù cũ với Elf.
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Dwarf còn sống tới
   (đời trung bình 115 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {spouse} bạn đời · {child} con · {ally} một đồng đội
{rival} kẻ thù truyền kiếp · {mentor} người dẫn dắt · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).
{party} tên tổ đội hiện tại · {leader} người cầm đầu · {member} một thành viên.

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
  "{friend} gia nhập tổ đội", "{father} CHẾT", "{mother} CHẾT", "CHẾT (lý do)",
  "gia nhập tổ đội <mã>", "tổ đội tan rã", "bị đuổi khỏi tổ đội", "trở thành đội trưởng", "<Tên> gia nhập tổ đội",
  "<Tên> CHẾT", "<Tên> rời đội", "<Tên> phản bội", "Thân thiết với <Tên> +10".
- Mỗi nút ít nhất 2 lựa chọn; luôn có một lựa chọn an toàn/hèn nhát với cái giá riêng.

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
```

---

## PHẦN 1 — Dàn nhân vật xuyên suốt

```
PHẦN 1: DÀN NHÂN VẬT XUYÊN SUỐT

Mỗi kiếp Dwarf có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: con trai gia tộc thợ rèn đối địch; Dwarf phản bội bị trục xuất; thợ rèn Human trẻ dám rèn đẹp hơn bạn)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: lão thợ rèn chột mắt chỉ nói bằng tiếng búa; nữ chiến binh giữ cổng già; ông chú nghiện bia mang Sổ Oán Hận của gia tộc)
3. {friend} TRI KỶ (ví dụ: bạn thợ mỏ cùng lứa; Dwarf mê thơ ca bị cả hội chê cười; Human lùn nhất làng được nhận làm anh em kết nghĩa)

Lưu ý riêng: Dwarf trọng lời thề: nhiều nút nên xoay quanh một lời thề được giữ hoặc bị phá, một món nợ được ghi vào Sổ Oán Hận.

Định dạng mỗi kiểu:
KIỂU <số>: <TÊN KIỂU VIẾT HOA> (<mã mạch>)
Mô tả: giới tính, tộc, 1–2 câu với một chi tiết dễ nhớ (vết sẹo, câu cửa miệng, món đồ luôn mang theo).
Rồi 3 câu "Nhắc lại" dùng chung cho cả mạch, mỗi câu một dòng.
Rồi 5 nút truyện theo mẫu:
  Nút 1 (Thơ ấu): Gặp gỡ
  Nút 2 (Thiếu niên): Gắn bó hoặc va chạm
  Nút 3 (Trưởng thành): Bước ngoặt
  Nút 4 (Trưởng thành): Thử thách sống còn
  Nút 5 (Trung niên): Khép lại
Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người dẫn dắt có thể chết vì bạn.
Nút cuối có 2–3 kết; được phép "{rival} CHẾT", "{friend} CHẾT"...

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: dwarf_cast_<mã mạch>_<số>, ví dụ dwarf_cast_rival_a_3.
Tổng: 9 kiểu × 5 nút = 45 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 4 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch 5 nút:
Nút 1 (Thơ ấu): biến cố gieo mầm từ gia cảnh hoặc cha mẹ
Nút 2 (Thiếu niên): hậu quả đầu tiên; nhân vật tự quyết định
Nút 3 (Trưởng thành): bước ngoặt lớn; quá khứ tìm đến
Nút 4 (Trưởng thành): đối mặt; có thể mất mát lớn
Nút 5 (Trung niên): khép lại
Nút cuối có 2–3 kết khác nhau tùy dấu ấn.

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi 5 nút theo mẫu. Mã nút: dwarf_arc_<mã mạch>_<số>; nhánh: dwarf_arc_<mã mạch>_3a, dwarf_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "forge" · dwarf_bg_1 · Hậu duệ Lò Rèn Vĩnh Cửu · dấu ấn sẵn có: huyet_mach_tho_ren · Cha: game tự đặt tên, Nghệ nhân rèn bậc thầy, còn sống · Mẹ: game tự đặt tên, Thợ khảm ngọc, còn sống
- mạch "exile" · dwarf_bg_2 · Kẻ lưu vong Đầm Lầy Tử Khí · dấu ấn sẵn có: con_cua_ke_luu_vong · Cha: game tự đặt tên, Chiến binh bảo vệ trại, đã mất · Mẹ: game tự đặt tên, Người tìm cỏ dại sinh tồn, còn sống
- mạch "merchant" · dwarf_bg_3 · Mầm non Thương hội Sói Bạc · dấu ấn sẵn có: nhay_ben_thuong_mai · Cha: game tự đặt tên, Thương nhân vũ khí, còn sống · Mẹ: game tự đặt tên, Kế toán Thương hội, còn sống
- mạch "arena" · dwarf_bg_4 · Cô nhi Đấu trường Huyết Sa · dấu ấn sẵn có: chien_binh_nhi · Cha: game tự đặt tên, Có lẽ là một đấu sĩ đã bỏ mạng trên cát đỏ, không rõ tung tích · Mẹ: game tự đặt tên, Nô lệ đấu sĩ, đã mất
```

PHẦN 3
```
- mạch "miner" · dwarf_bg_5 · Con nhà thợ mỏ Răng Cưa · dấu ấn sẵn có: không có · Cha: game tự đặt tên, Thợ mỏ bậc trung, còn sống · Mẹ: game tự đặt tên, Thợ nấu bia thủ công, còn sống
- mạch "lumina" · dwarf_bg_6 · Đứa trẻ được Thánh Quang cưu mang · dấu ấn sẵn có: an_dien_thanh_quang · Cha: game tự đặt tên, Không rõ., không rõ tung tích · Mẹ: game tự đặt tên, Không rõ., không rõ tung tích
- mạch "captive" · dwarf_bg_7 · Tù binh Hắc Nguyệt Hội · dấu ấn sẵn có: dau_an_hac_am · Cha: game tự đặt tên, Mạo hiểm giả, đã mất · Mẹ: game tự đặt tên, Tu sĩ đi lạc, còn sống
- mạch "nomad" · dwarf_bg_8 · Dân du mục Thảo Nguyên Gió Hú · dấu ấn sẵn có: không có · Cha: game tự đặt tên, Người đánh xe, thợ sửa đồ dạo, còn sống · Mẹ: game tự đặt tên, Thợ săn bẫy thú, còn sống
```

PHẦN 4
```
- mạch "cursed" · dwarf_bg_9 · Kẻ mang lời nguyền Đá Đen · dấu ấn sẵn có: loi_nguyen_da_den · Cha: game tự đặt tên, Thợ khắc đá, còn sống · Mẹ: game tự đặt tên, Vợ thợ mỏ, còn sống
- mạch "nature" · dwarf_bg_10 · Chồi non của Tự Nhiên Giáo · dấu ấn sẵn có: tinh_ban_cua_rung · Cha: game tự đặt tên, Tu sĩ Tự Nhiên Giáo, còn sống · Mẹ: game tự đặt tên, Chuyên gia thảo dược, còn sống
```

---

## PHẦN 5 — Chương đời và tiểu sử

```
PHẦN 5: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Trưởng thành, Trung niên, Tuổi già), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có tổ đội)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Thơ ấu (7–26 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 10 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(forge) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): chết già bên lò rèn · chết trong sập hầm mỏ · tử trận giữ cổng núi · chết vì bị phản bội · chết khi đòi xong món nợ cuối · chết trong nghèo khó · chết khi giàu vàng · chết trẻ · chết mà mạch truyện còn dở dang · chết khi là anh hùng của tộc.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 6 — Tổ đội có sẵn

```
PHẦN 6: TỔ ĐỘI CÓ SẴN

LUẬT VỀ ĐỒNG ĐỘI: Dwarf không gom đồng đội lẻ tẻ. Nhân vật được MỜI hoặc XIN GIA NHẬP một TỔ ĐỘI CÓ SẴN
gồm 2–5 thành viên có tên, vai trò, tính cách, quá khứ và quan hệ với nhau. Mỗi lúc chỉ ở một tổ đội; có thể rời đi,
bị đuổi, tổ đội tan rã, hoặc về sau tự lập.

Thiết kế 6 tổ đội khác hẳn nhau, ví dụ: đội thợ mỏ thám hiểm tầng sâu; đội cận vệ Lò Rèn; tổ đội lính đánh thuê Dwarf trên mặt đất; nhóm thợ rèn lang thang tìm quặng huyền thoại; tổ đội báo thù đi đòi nợ trong Sổ Oán Hận; tổ đội hỗn chủng của Guild Bình Minh.

Định dạng mỗi tổ đội (dùng ĐÚNG chữ "TỔ ĐỘI" và "Tên tổ đội" để game đọc được):
TỔ ĐỘI <số>: <TÊN KIỂU VIẾT HOA> (party_<a..f>)
Tên tổ đội: <tên> · Hạng: <hạng hoặc cấp> · Tôn chỉ: "<1 câu>" · Nơi tụ họp: <nơi>.
Thành viên (<số> người):
<Tên>: <Tộc> · <Nghề> (Bậc <n>) · <Đội trưởng nếu là đội trưởng>. <tính cách>. Bí mật: <...>. Quan hệ: <...>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi các nút:
- 1 nút gia nhập: dwarf_party_party_<x>_join (2–3 lựa chọn; gia nhập thì ghi "gia nhập tổ đội party_<x>").
- 6 nút đời sống: dwarf_party_party_<x>_1 … _6 (nhiệm vụ đầu tiên → mâu thuẫn nội bộ → bí mật lộ ra → mất mát →
  ngã rẽ lớn → khép lại). Nút sau ghi CẦN dấu ấn của nút trước.
- Mỗi thành viên 1 nút riêng: dwarf_party_party_<x>_m1, _m2… với "Khi nào: ... · CẦN <Tên> còn trong đội".
Viết 2 tổ đội rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 7 — Tự lập tổ đội

```
PHẦN 7: TỰ LẬP TỔ ĐỘI

Khi đã đủ mạnh (nghề bậc 3 trở lên hoặc bậc cao trong Guild Bình Minh), nhân vật có thể tự lập tổ đội.
1. Cảnh lập tổ đội (1 nút, mã dwarf_lead_1): lựa chọn dẫn tới "trở thành đội trưởng".
2. 10 ứng viên chiêu mộ, mỗi người một nút (mã dwarf_recruit_<số>), ngay dưới tiêu đề có dòng:
   Ứng viên: <Tên> · <Tộc> · <Nghề> (Bậc <n>) · Tính cách: <...>. Yêu cầu: <điều họ đòi hỏi>.
   Lựa chọn thành công ghi "<Tên> gia nhập tổ đội".
3. 6 nút làm người cầm đầu (mã dwarf_lead_2 … dwarf_lead_7): chia chiến lợi phẩm, thành viên bất mãn, hy sinh một người,
   đối thủ cướp nhiệm vụ, thành viên muốn rời đi, truyền lại khi về già.
4. 4 nút nối với dàn nhân vật (mã dwarf_lead_link_1 … _4): {friend} xin gia nhập, {rival} lập tổ đội đối địch,
   {mentor} về già xin đi theo, trận đối đầu cuối với {rival}. Ghi "CẦN {friend} còn sống" v.v. ở dòng Khi nào.
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: forge = dwarf_bg_1, exile = dwarf_bg_2, merchant = dwarf_bg_3, arena = dwarf_bg_4, miner = dwarf_bg_5, lumina = dwarf_bg_6, captive = dwarf_bg_7, nomad = dwarf_bg_8, cursed = dwarf_bg_9, nature = dwarf_bg_10 (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời trung bình).
