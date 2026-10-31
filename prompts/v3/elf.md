# Prompt Gemini v3: MẠCH TRUYỆN — ELF

**Mục tiêu:** biến một kiếp Elf (trung bình 1003 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 10 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Tổ đội có sẵn** để gia nhập, và tự lập tổ đội.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 7** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 103 sự kiện cho chủng tộc
ELF, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Elf. Không viết lại sự kiện cũ.

=== ELF LÀ AI ===
Elf (tộc tai nhọn của rừng thiêng, sống cả nghìn năm). Kiêu hãnh, chậm rãi, gắn với Yggdrasil và Tự Nhiên Giáo.
Một đời trung bình khoảng 1003 năm (rất dài: dùng thời gian, thời đại và hậu duệ để kể).
Chủ đề: thời gian dài vô tận, mất mát khi người phàm quanh mình già đi và chết, truyền thống đối đầu với đổi thay, nỗi cô độc của kẻ sống lâu.
Giọng: trữ tình, chậm, đẹp và buồn; câu văn như thơ cổ nhưng không sến.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Elf) ===
Sơ sinh 0–60 · Thơ ấu 60–225 · Thiếu niên 225–375 · Trưởng thành 375–825 · Trung niên 825–1200 · Tuổi già 1200+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Rong chơi · Học hành · Khổ luyện · Làm lụng · Mạo hiểm · Giao du · An dưỡng.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Ranger, Spirit Caller, Herbalist, Bard, Yggdrasil Guardian, Holy Woodcarver, Nature Envoy.
- Guild Bình Minh: F → E → D → C → B → A → S.

- Tổ đội tối đa 3 đồng đội.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Đại Ngàn Lục Bảo, Cây Thế Giới Yggdrasil, Đội Ranger Đại Ngàn, Hội đồng Trưởng lão, Tự Nhiên Giáo. Láng giềng: Human Sanctus chặt rừng, Dwarf thù cũ, Dark Elf lưu vong, Goblin quấy phá bìa rừng.
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Elf còn sống tới
   (đời trung bình 1003 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

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

Mỗi kiếp Elf có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: Elf hoàng tộc coi bạn là kẻ ngoại đạo; Dark Elf từng là bạn thân; Human cùng tuổi lúc nhỏ, già đi và trở thành vua của kẻ chặt rừng)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: Ranger già đã mù nhưng nghe được tiếng cây; tinh linh gió hay trêu chọc; pháp sư Human dạy bạn về thế giới loài người rồi chết vì tuổi già)
3. {friend} TRI KỶ (ví dụ: Human mồ côi bạn cứu ở bìa rừng (sẽ già đi trước mắt bạn); Elf nhút nhát cùng lứa; Dwarf cục cằn nợ bạn một mạng)

Lưu ý riêng: Với Elf, bạn bè và thầy là Human/Dwarf sẽ GIÀ VÀ CHẾT trong khi bạn vẫn trẻ; đó là cảm xúc chính. Nút cuối của họ có thể là cái chết vì tuổi già, hoặc con cháu họ tìm đến bạn.

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

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: elf_cast_<mã mạch>_<số>, ví dụ elf_cast_rival_a_3.
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
Rồi 5 nút theo mẫu. Mã nút: elf_arc_<mã mạch>_<số>; nhánh: elf_arc_<mã mạch>_3a, elf_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "royal" · elf_bg_royal · Nụ Hoa Hoàng Tộc · dấu ấn sẵn có: royal_blood · Cha: Aelien, Lãnh chúa Đại Ngàn, còn sống · Mẹ: Lyra, Tế tư tối cao Tự Nhiên Giáo, còn sống
- mạch "ranger" · elf_bg_ranger · Doanh Trại Tuần Lâm · dấu ấn sẵn có: ranger_born · Cha: Faenor, Đội trưởng Ranger, còn sống · Mẹ: Sylis, Trinh sát Ranger, đã mất
- mạch "exiled" · elf_bg_exiled · Kẻ Lưu Đày Sanctus · dấu ấn sẵn có: exiled · Cha: game tự đặt tên, Vô danh, không rõ tung tích · Mẹ: Elara, Kẻ chạy trốn của Đại Ngàn, còn sống
- mạch "nature" · elf_bg_nature · Lá Vàng Rơi · dấu ấn sẵn có: nature_child · Cha: Theron, Người hái lượm, còn sống · Mẹ: Nyla, Thợ dệt thảo mộc, còn sống
```

PHẦN 3
```
- mạch "mana" · elf_bg_mana · Kết Tinh Ma Thuật · dấu ấn sẵn có: mana_anomaly · Cha: Vael, Học giả ma pháp, còn sống · Mẹ: Ylis, Đại Ma pháp sư, đã bỏ đi
- mạch "war" · elf_bg_war · Cô Nhi Chiến Hỏa · dấu ấn sẵn có: war_orphan · Cha: game tự đặt tên, Chiến binh, đã mất · Mẹ: Luthien, Vệ binh phòng tuyến, đã mất
- mạch "merchant" · elf_bg_merchant · Hậu Duệ Thương Đoàn · dấu ấn sẵn có: merchant_born · Cha: Kaelen, Lãnh đạo chi nhánh thương hội, còn sống · Mẹ: Myra, Thương nhân, còn sống
- mạch "dark" · elf_bg_dark · Dấu Ấn Hắc Nguyệt · dấu ấn sẵn có: dark_mark · Cha: Zath, Tín đồ Hắc Nguyệt Hội, còn sống · Mẹ: Seline, Dân làng, còn sống
```

PHẦN 4
```
- mạch "wild" · elf_bg_wild · Con Lai Hoang Dã · dấu ấn sẵn có: wild_halfblood · Cha: Garm, Chiến binh du mục, đã bỏ đi · Mẹ: Fiora, Thợ săn, còn sống
- mạch "forge" · elf_bg_forge · Hỏa Lò Vĩnh Cửu · dấu ấn sẵn có: forge_born · Cha: Elrohir, Thợ rèn ma khí, còn sống · Mẹ: Helga, Thợ khảm ngọc, còn sống
```

---

## PHẦN 5 — Chương đời và tiểu sử

```
PHẦN 5: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Trưởng thành, Trung niên, Tuổi già), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có tổ đội)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Thơ ấu (60–225 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 10 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(royal) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): chết già sau nghìn năm · chết vì đau buồn (Elf có thể héo úa khi mất người thân) · tử trận bảo vệ rừng · bị Human săn giết · chết khi rừng bị đốt · hóa thành cây trở về với Yggdrasil · chết trẻ (trước 300 tuổi) · chết mà mạch truyện còn dở dang · chết cô độc khi mọi người quen đều đã mất · chết khi là anh hùng của Đại Ngàn.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 6 — Tổ đội có sẵn

```
PHẦN 6: TỔ ĐỘI CÓ SẴN

LUẬT VỀ ĐỒNG ĐỘI: Elf không gom đồng đội lẻ tẻ. Nhân vật được MỜI hoặc XIN GIA NHẬP một TỔ ĐỘI CÓ SẴN
gồm 2–5 thành viên có tên, vai trò, tính cách, quá khứ và quan hệ với nhau. Mỗi lúc chỉ ở một tổ đội; có thể rời đi,
bị đuổi, tổ đội tan rã, hoặc về sau tự lập.

Thiết kế 6 tổ đội khác hẳn nhau, ví dụ: tổ đội Ranger tuần biên giới; nhóm Bard lang thang đi khắp cõi người; tổ đội hỗn chủng có Human và Dwarf (Elf trẻ ở đó để học về người phàm); đội cận vệ Hoàng tộc; nhóm Elf lưu vong bị trục xuất; tổ đội huyền thoại mà các thành viên Human đã già khọm.

Định dạng mỗi tổ đội (dùng ĐÚNG chữ "TỔ ĐỘI" và "Tên tổ đội" để game đọc được):
TỔ ĐỘI <số>: <TÊN KIỂU VIẾT HOA> (party_<a..f>)
Tên tổ đội: <tên> · Hạng: <hạng hoặc cấp> · Tôn chỉ: "<1 câu>" · Nơi tụ họp: <nơi>.
Thành viên (<số> người):
<Tên>: <Tộc> · <Nghề> (Bậc <n>) · <Đội trưởng nếu là đội trưởng>. <tính cách>. Bí mật: <...>. Quan hệ: <...>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi các nút:
- 1 nút gia nhập: elf_party_party_<x>_join (2–3 lựa chọn; gia nhập thì ghi "gia nhập tổ đội party_<x>").
- 6 nút đời sống: elf_party_party_<x>_1 … _6 (nhiệm vụ đầu tiên → mâu thuẫn nội bộ → bí mật lộ ra → mất mát →
  ngã rẽ lớn → khép lại). Nút sau ghi CẦN dấu ấn của nút trước.
- Mỗi thành viên 1 nút riêng: elf_party_party_<x>_m1, _m2… với "Khi nào: ... · CẦN <Tên> còn trong đội".
Viết 2 tổ đội rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 7 — Tự lập tổ đội

```
PHẦN 7: TỰ LẬP TỔ ĐỘI

Khi đã đủ mạnh (nghề bậc 3 trở lên hoặc bậc cao trong Guild Bình Minh), nhân vật có thể tự lập tổ đội.
1. Cảnh lập tổ đội (1 nút, mã elf_lead_1): lựa chọn dẫn tới "trở thành đội trưởng".
2. 10 ứng viên chiêu mộ, mỗi người một nút (mã elf_recruit_<số>), ngay dưới tiêu đề có dòng:
   Ứng viên: <Tên> · <Tộc> · <Nghề> (Bậc <n>) · Tính cách: <...>. Yêu cầu: <điều họ đòi hỏi>.
   Lựa chọn thành công ghi "<Tên> gia nhập tổ đội".
3. 6 nút làm người cầm đầu (mã elf_lead_2 … elf_lead_7): chia chiến lợi phẩm, thành viên bất mãn, hy sinh một người,
   đối thủ cướp nhiệm vụ, thành viên muốn rời đi, truyền lại khi về già.
4. 4 nút nối với dàn nhân vật (mã elf_lead_link_1 … _4): {friend} xin gia nhập, {rival} lập tổ đội đối địch,
   {mentor} về già xin đi theo, trận đối đầu cuối với {rival}. Ghi "CẦN {friend} còn sống" v.v. ở dòng Khi nào.
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: royal = elf_bg_royal, ranger = elf_bg_ranger, exiled = elf_bg_exiled, nature = elf_bg_nature, mana = elf_bg_mana, war = elf_bg_war, merchant = elf_bg_merchant, dark = elf_bg_dark, wild = elf_bg_wild, forge = elf_bg_forge (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời dài).
