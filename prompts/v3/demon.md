# Prompt Gemini v3: MẠCH TRUYỆN — DEMON

**Mục tiêu:** biến một kiếp Demon (trung bình 251 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 10 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Tiểu đội có sẵn** để gia nhập, và tự lập tiểu đội.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 7** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 101 sự kiện cho chủng tộc
DEMON, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Demon. Không viết lại sự kiện cũ.

=== DEMON LÀ AI ===
Demon (ma tộc có sừng của Vực Thẳm, sống khoảng 300 năm). Sức mạnh là luật, khế ước là danh dự.
Một đời trung bình khoảng 251 năm (rất dài: dùng thời gian, thời đại và hậu duệ để kể).
Chủ đề: quyền lực và khế ước, phản bội trong Quân đoàn Ma Vương, khao khát được công nhận, ranh giới giữa ác và trung thành.
Giọng: tối, sắc, kiêu ngạo; mỉa mai lạnh; thỉnh thoảng lộ ra nỗi cô đơn.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Demon) ===
Sơ sinh 0–16 · Thơ ấu 16–60 · Thiếu niên 60–100 · Trưởng thành 100–220 · Trung niên 220–320 · Tuổi già 320+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Rong chơi · Học hành · Khổ luyện · Làm lụng · Mạo hiểm · Giao du · An dưỡng.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Dark Knight, Warlock, Chấp Sự Ma Giới, Blood Merchant, Hell Forge Blacksmith, Bounty Hunter, Parasite Spy.
- Quân đoàn Ma Vương: F → E → D → C → B → A → S.

- Tổ đội tối đa 3 đồng đội.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Vực Thẳm Phân Tầng, Cửa Ngục Than Khóc, Đảo Tro Tàn, Quân đoàn Ma Vương (tiểu đội, đại đội, tướng quân), Hắc Nguyệt Hội (tay sai trên mặt đất). Kẻ thù: Thánh Kỵ Sĩ Đoàn, Dũng Giả, Giáo hội Thánh Quang.
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Demon còn sống tới
   (đời trung bình 251 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {maker} kẻ tạo ra/chủ nhân · {spouse} bạn đời · {child} con · {ally} một đồng đội
{rival} kẻ thù truyền kiếp · {mentor} người dẫn dắt · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).
{party} tên tiểu đội hiện tại · {leader} người cầm đầu · {member} một thành viên.

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

Mỗi kiếp Demon có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: Demon quý tộc cùng lứa thăng chức nhờ dòng máu; Thánh Kỵ Sĩ săn bạn từ khi còn trẻ; anh em ruột tranh khế ước của cha)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: Ma tướng cụt sừng bị giáng chức; nữ pháp sư khế ước luôn đòi giá; một Dũng Giả già bị bắt làm tù binh)
3. {friend} TRI KỶ (ví dụ: Imp lắm mồm theo bạn từ nhỏ; Demon cùng tiểu đội; một Human theo Hắc Nguyệt Hội mà bạn lỡ thương)

Lưu ý riêng: Demon sống lâu hơn Human nhiều: bạn bè Human sẽ già đi; khế ước có thể ràng buộc qua nhiều thế hệ.

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

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: demon_cast_<mã mạch>_<số>, ví dụ demon_cast_rival_a_3.
Tổng: 9 kiểu × 5 nút = 45 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 4 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ hoặc kẻ tạo ra mình ({maker}) và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch 5 nút:
Nút 1 (Thơ ấu): biến cố gieo mầm từ gia cảnh hoặc cha mẹ hoặc kẻ tạo ra mình ({maker})
Nút 2 (Thiếu niên): hậu quả đầu tiên; nhân vật tự quyết định
Nút 3 (Trưởng thành): bước ngoặt lớn; quá khứ tìm đến
Nút 4 (Trưởng thành): đối mặt; có thể mất mát lớn
Nút 5 (Trung niên): khép lại
Nút cuối có 2–3 kết khác nhau tùy dấu ấn.

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi 5 nút theo mẫu. Mã nút: demon_arc_<mã mạch>_<số>; nhánh: demon_arc_<mã mạch>_3a, demon_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "abyss" · demon_origin_abyss · Tầng lớp bình dân ở Ma giới · dấu ấn sẵn có: con_cua_vuc · Cha: Zargath, Đội trưởng lính gác cổng Vực Thẳm, còn sống · Mẹ: Lilith, Thợ dệt vảy rồng, còn sống
- mạch "ash" · demon_origin_ash · Bị vứt bỏ giữa bầy hỏa quỷ · dấu ấn sẵn có: không có · Cha: game tự đặt tên, không rõ tung tích · Mẹ: Morana, Lính đánh thuê Đảo Tro Tàn, đã bỏ đi
- mạch "cult" · demon_origin_cult · Được tôn thờ như một thánh tử hắc ám · dấu ấn sẵn có: thanh_tu_hac_nguyet · Cha: Xanthus, Đại tư tế Hắc Nguyệt Hội, còn sống · Mẹ: Không có., còn sống
- mạch "war" · demon_origin_war · Mồ côi và trắng tay · dấu ấn sẵn có: tre_mo_coi · Cha: Kael, Tướng tiên phong Quân đoàn Ma Vương, đã mất · Mẹ: Vanya, Nữ pháp sư quân y, đã mất
```

PHẦN 3
```
- mạch "forest" · demon_origin_forest · Một đứa trẻ con lai bị cả hai tộc nguyền rủa · dấu ấn sẵn có: con_lai_tu_nhien · Cha: Thrandor, Ranger Đại Ngàn, đã bỏ đi · Mẹ: Xalythia, Gián điệp Ma giới, còn sống
- mạch "swamp" · demon_origin_swamp · Nghèo khổ nhưng gắn kết · dấu ấn sẵn có: không có · Cha: Grok, Thợ săn đầm lầy, còn sống · Mẹ: Lidia, Kẻ lưu đày, còn sống
- mạch "forge" · demon_origin_forge · Sống kiếp nô lệ không nhìn thấy ánh mặt trời · dấu ấn sẵn có: no_le_nguoi_lun · Cha: game tự đặt tên, không rõ tung tích · Mẹ: game tự đặt tên, không rõ tung tích · Kẻ tạo ra/chủ nhân: Thorek, Thợ rèn bậc thầy, còn sống
- mạch "noble" · demon_origin_noble · Giàu nứt đố đổ vách nhưng tình thân lạnh lẽo như băng giá · dấu ấn sẵn có: dong_mau_quy_toc · Cha: Valerius, Bá tước Vực Thẳm, còn sống · Mẹ: Seraphina, Phu nhân quý tộc, còn sống
```

PHẦN 4
```
- mạch "contract" · demon_origin_contract · Bị nhốt trong tầng hầm của một dinh thự xa hoa · dấu ấn sẵn có: không có · Cha: Arthur, Quý tộc sa ngã, còn sống · Mẹ: Carmilla, Mị ma cấp cao, đã mất
- mạch "prisoner" · demon_origin_prisoner · Lớn lên nhờ những ổ bánh mì mốc của ngục tốt và lòng thù hận · dấu ấn sẵn có: ke_thu_thanh_quang · Cha: game tự đặt tên, không rõ tung tích · Mẹ: Azura, Tù nhân chiến tranh, còn sống
```

---

## PHẦN 5 — Chương đời và tiểu sử

```
PHẦN 5: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Trưởng thành, Trung niên, Tuổi già), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có tiểu đội)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Thơ ấu (16–60 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 10 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(abyss) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): chết già trong lâu đài đá · tử trận dưới tay Thánh Kỵ Sĩ · bị đồng loại đâm sau lưng · bị khế ước nuốt chửng · chết khi đã là Ma tướng · chết trên mặt đất xa Vực Thẳm · chết trong nhiệm vụ · chết trẻ · chết mà mạch truyện còn dở dang · chết khi mang tiếng phản bội Quân đoàn.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 6 — Tiểu đội có sẵn

```
PHẦN 6: TIỂU ĐỘI CÓ SẴN

LUẬT VỀ ĐỒNG ĐỘI: Demon không gom đồng đội lẻ tẻ. Nhân vật được MỜI hoặc XIN GIA NHẬP một TIỂU ĐỘI CÓ SẴN
gồm 2–5 thành viên có tên, vai trò, tính cách, quá khứ và quan hệ với nhau. Mỗi lúc chỉ ở một tiểu đội; có thể rời đi,
bị đuổi, tiểu đội tan rã, hoặc về sau tự lập.

Thiết kế 6 tiểu đội khác hẳn nhau, ví dụ: tiểu đội trinh sát của Quân đoàn; nhóm lính đánh thuê Demon trên Đảo Tro Tàn; tiểu đội cảm tử ở tiền tuyến; nhóm Demon lưu vong trốn lên mặt đất; đội cận vệ của một Ma tướng; tiểu đội hỗn tạp có Imp và Human theo tà giáo.

Định dạng mỗi tiểu đội (dùng ĐÚNG chữ "TỔ ĐỘI" và "Tên tổ đội" để game đọc được):
TỔ ĐỘI <số>: <TÊN KIỂU VIẾT HOA> (party_<a..f>)
Tên tổ đội: <tên> · Hạng: <hạng hoặc cấp> · Tôn chỉ: "<1 câu>" · Nơi tụ họp: <nơi>.
Thành viên (<số> người):
<Tên>: <Tộc> · <Nghề> (Bậc <n>) · <Đội trưởng nếu là đội trưởng>. <tính cách>. Bí mật: <...>. Quan hệ: <...>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi các nút:
- 1 nút gia nhập: demon_party_party_<x>_join (2–3 lựa chọn; gia nhập thì ghi "gia nhập tổ đội party_<x>").
- 6 nút đời sống: demon_party_party_<x>_1 … _6 (nhiệm vụ đầu tiên → mâu thuẫn nội bộ → bí mật lộ ra → mất mát →
  ngã rẽ lớn → khép lại). Nút sau ghi CẦN dấu ấn của nút trước.
- Mỗi thành viên 1 nút riêng: demon_party_party_<x>_m1, _m2… với "Khi nào: ... · CẦN <Tên> còn trong đội".
Viết 2 tiểu đội rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 7 — Tự lập tiểu đội

```
PHẦN 7: TỰ LẬP TIỂU ĐỘI

Khi đã đủ mạnh (nghề bậc 3 trở lên hoặc bậc cao trong Quân đoàn Ma Vương), nhân vật có thể tự lập tiểu đội.
1. Cảnh lập tiểu đội (1 nút, mã demon_lead_1): lựa chọn dẫn tới "trở thành đội trưởng".
2. 10 ứng viên chiêu mộ, mỗi người một nút (mã demon_recruit_<số>), ngay dưới tiêu đề có dòng:
   Ứng viên: <Tên> · <Tộc> · <Nghề> (Bậc <n>) · Tính cách: <...>. Yêu cầu: <điều họ đòi hỏi>.
   Lựa chọn thành công ghi "<Tên> gia nhập tổ đội".
3. 6 nút làm người cầm đầu (mã demon_lead_2 … demon_lead_7): chia chiến lợi phẩm, thành viên bất mãn, hy sinh một người,
   đối thủ cướp nhiệm vụ, thành viên muốn rời đi, truyền lại khi về già.
4. 4 nút nối với dàn nhân vật (mã demon_lead_link_1 … _4): {friend} xin gia nhập, {rival} lập tiểu đội đối địch,
   {mentor} về già xin đi theo, trận đối đầu cuối với {rival}. Ghi "CẦN {friend} còn sống" v.v. ở dòng Khi nào.
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: abyss = demon_origin_abyss, ash = demon_origin_ash, cult = demon_origin_cult, war = demon_origin_war, forest = demon_origin_forest, swamp = demon_origin_swamp, forge = demon_origin_forge, noble = demon_origin_noble, contract = demon_origin_contract, prisoner = demon_origin_prisoner (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời dài).
