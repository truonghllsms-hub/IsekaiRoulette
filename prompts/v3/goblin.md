# Prompt Gemini v3: MẠCH TRUYỆN — GOBLIN

**Mục tiêu:** biến một kiếp Goblin (15–20 năm, ngắn và tàn khốc) thành **một câu chuyện có đầu có cuối**.
Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: đối thủ cùng hang, kẻ dẫn dắt, đồng bọn thân nhất.
2. **Mạch truyện theo xuất thân**: 7 xuất thân, mỗi xuất thân 4 nút truyện, nút sau rẽ nhánh theo lựa chọn ở nút trước.
3. **Câu nhắc lại**, **mở chương** và **tiểu sử khi chết**.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 4** → đọc, sửa, gửi lại cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 90 sự kiện cho chủng tộc
GOBLIN, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện một lần
rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Goblin. Không viết lại sự kiện cũ.

=== GOBLIN LÀ AI ===
Goblin (tiểu yêu da xanh sống theo bầy, yếu ớt nhưng ranh mãnh). Đời ngắn 15–20 năm, phần lớn chết sớm vì đói,
vì mạo hiểm giả, vì chính đồng loại. Xã hội bộ lạc: kẻ mạnh ăn trước, kẻ yếu làm bia đỡ đòn.
Chủ đề: sinh tồn, lòng tham, phản bội trong bầy, những giây phút trung thành hiếm hoi, khát vọng leo lên làm Goblin King.
Giọng: hài đen, tàn nhẫn, đôi khi buồn đến bất ngờ.

=== GIAI ĐOẠN ĐỜI (tính theo năm Goblin) ===
Ấu tể 0–2 · Goblin con 2–4 · Goblin thiếu niên 4–6 · Goblin trưởng thành 6–11 · Goblin lão luyện 11–16 · Goblin lão làng 16+.
Mỗi năm của Goblin dồn dập như vài năm của Human.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Bới rác · Học lỏm · Khổ luyện · Phục dịch bộ lạc · Đi cướp · Tranh quyền · Trốn ngủ.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn (Goblin thường 2–10). Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng.
- 5 vai trò: Goblin Warrior, Goblin Scout, Goblin Shaman, Goblin Tinker, Goblin Wolf Rider (mỗi vai 5 bậc).
- Bộ lạc 7 bậc: Goblin Peon → Grunt → Leader → Elite → Lord → Goblin Chief → Goblin King.
- Tiến hóa: Hobgoblin (dấu ấn "hobgoblin_blood" giúp), Goblin Shaman Lord (dấu ấn "dark_pact" giúp), Goblin King.
  Mạch truyện ĐƯỢC PHÉP dẫn tới các dấu ấn này để mở đường tiến hóa.
- Băng nhóm tối đa 3 đồng bọn. Goblin không cưới hỏi kiểu người: có "bạn tình" ({spouse}) và lứa con ({child}).
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Goblin sống ở Đầm Lầy Tử Khí, Rừng Tân Thủ, hầm ngục (Dungeon). Kẻ thù: mạo hiểm giả Guild Bình Minh, Thánh Kỵ Sĩ Đoàn,
Elf của Đội Ranger Đại Ngàn, Dwarf, bầy Orc. Thương hội Sói Bạc buôn nô lệ Goblin. Hắc Nguyệt Hội đôi khi lợi dụng Goblin.

=== TÊN GỌI KIỂU MANGA (BẮT BUỘC) ===
Tên chủng tộc giữ tiếng Anh: Goblin, Hobgoblin, Orc, Elf, Dwarf, Human, Kobold. Không viết "yêu tinh", "quỷ lùn",
"người lùn". Chức danh: Goblin Chief, Goblin Shaman, Goblin King. Văn kể tiếng Việt, ngôi thứ hai ("bạn").

=== NGUYÊN TẮC VIẾT MẠCH TRUYỆN (QUAN TRỌNG NHẤT) ===
1. NHÂN QUẢ: mỗi nút truyện bắt nguồn từ điều đã xảy ra trước (xuất thân, cha mẹ, lựa chọn ở nút trước) và để lại
   hậu quả cho nút sau. Người chơi phải nhận ra: "Chuyện này xảy ra VÌ năm đó mình đã...".
2. NHẮC CHI TIẾT CŨ: nút sau nhắc lại cụ thể đồ vật, vết sẹo, câu nói, tên kẻ cũ.
3. CÙNG MỘT KẺ: đối thủ, kẻ dẫn dắt, đồng bọn quay lại nhiều lần và thay đổi (thằng nhóc giành xương với bạn
   giờ là Goblin Elite cầm roi).
4. RẼ NHÁNH THẬT: mỗi nút 2–3 hướng; hướng nào cũng có giá phải trả.
5. CÓ KẾT, kể cả kết bi thảm. Đời Goblin ngắn: nhiều kết là cái chết, nhưng phải là cái chết CÓ NGHĨA với câu chuyện.
6. KHÔNG TỰ MÂU THUẪN: cha/mẹ đã chết hoặc không rõ thì chỉ xuất hiện qua ký ức, tin đồn, di vật.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {spouse} bạn tình · {child} một đứa con · {ally} một đồng bọn
MỚI: {rival} đối thủ truyền kiếp · {mentor} kẻ dẫn dắt · {friend} đồng bọn thân nhất (đặt tên một lần, dùng suốt đời).

=== MẪU TRÌNH BÀY NÚT TRUYỆN ===

### [MÃ] Tên nút
- **Mạch:** mã mạch · **Nút:** 2/4
- **Khi nào:** tuổi 4–6 · việc chính (nếu cần) · CẦN dấu ấn "x" (hoặc "y") · điều kiện khác
- **Tình huống:** 2–3 câu, nhắc lại chi tiết của nút trước.
- **A. "Nhãn lựa chọn"** — dựa vào [chỉ số], [độ khó]
  - Thành công: 1–2 câu. → hệ quả, dấu ấn "x"
  - Thất bại: 1–2 câu. → hệ quả, dấu ấn "y"
- **B. "Nhãn lựa chọn"** — (không tung xúc xắc) 1–2 câu. → hệ quả, dấu ấn "z"
- **Nhắc lại:** (nếu có "x") 1 câu ngắn game chèn vào những năm sau · (nếu có "y") ... · (nếu có "z") ...
- **Khoảnh khắc:** 1 dòng ghi vào tiểu sử.

Quy ước bắt buộc:
- Mỗi lựa chọn để lại ĐÚNG MỘT dấu ấn của mạch, mã dạng <mã mạch>_<số nút>_<từ khóa>, ví dụ "chief_2_poisoned".
  Nút sau ghi rõ CẦN dấu ấn nào. Nhánh khác hẳn thì viết nhiều phiên bản: [MÃ_a], [MÃ_b].
- Độ khó: DỄ, VỪA, KHÓ, RẤT KHÓ. Tung xúc xắc bằng Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn hoặc Sức khỏe.
- Hệ quả ghi số (Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +3, Thân thiết với {friend} +10).
  Hệ quả đặc biệt: "có {spouse}", "có {child}", "mất {ally}", "{rival} CHẾT", "{mentor} CHẾT", "{friend} CHẾT",
  "{friend} gia nhập băng", "thăng bậc <tên bậc bộ lạc>", "giáng chức về Goblin Peon", "CHẾT (lý do)".
- Tài sản, Danh vọng thang 0–100: thưởng +5..+30.
- Mỗi nút ít nhất 2 lựa chọn; luôn có lựa chọn hèn nhát/an toàn với cái giá riêng.
- Các nút cách nhau ít nhất 1–2 năm Goblin.

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
```

---

## PHẦN 1 — Dàn nhân vật xuyên suốt

```
PHẦN 1: DÀN NHÂN VẬT XUYÊN SUỐT

Mỗi kiếp Goblin có 3 kẻ đi cùng suốt đời. Viết cho MỖI vai 2 "kiểu" khác nhau (game chọn ngẫu nhiên mỗi đời):

1. {rival} — ĐỐI THỦ TRUYỀN KIẾP (ví dụ: thằng to xác cùng lứa luôn cướp phần ăn; con riêng được Goblin Chief cưng chiều)
2. {mentor} — KẺ DẪN DẮT (ví dụ: lão Goblin cụt chân sống sót qua ba cuộc thảm sát; mụ Shaman điên)
3. {friend} — ĐỒNG BỌN THÂN NHẤT (ví dụ: con nhóc gầy nhom chia xác chuột với bạn; Goblin hèn nhát luôn bám đuôi)

Với mỗi kiểu, viết:
- Mô tả 1–2 câu với một chi tiết dễ nhớ (tai bị cắn mất một nửa, câu cửa miệng, cái răng vàng ăn cắp được).
- 5 nút truyện: Nút 1 Gặp gỡ (Goblin con) → Nút 2 Gắn bó hoặc va chạm (thiếu niên) → Nút 3 Bước ngoặt (trưởng thành) →
  Nút 4 Thử thách sống còn (trưởng thành muộn) → Nút 5 Khép lại (lão luyện/lão làng, hoặc khi nhân vật sắp chết).
  Nhánh phải thật: đối thủ có thể thành đồng minh, đồng bọn có thể bán bạn cho Orc, kẻ dẫn dắt có thể chết thay bạn.
- 3 câu "Nhắc lại" dùng chung cho cả mạch.

Mã mạch: rival_a, rival_b, mentor_a, mentor_b, friend_a, friend_b. Mã nút: goblin_cast_<mã mạch>_<số>.
Tổng: 6 kiểu × 5 nút = 30 nút.
```

---

## PHẦN 2 và PHẦN 3 — Mạch truyện theo xuất thân

Dán khung dưới, thay danh sách xuất thân theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch truyện 4 nút:

Nút 1 (Goblin con, 2–4): biến cố gieo mầm từ gia cảnh hoặc cha mẹ.
Nút 2 (thiếu niên, 4–6): hậu quả đầu tiên; nhân vật tự quyết định.
Nút 3 (trưởng thành, 6–11): bước ngoặt lớn; quá khứ tìm đến. Có thể mở đường tiến hóa (dấu ấn "hobgoblin_blood"
  hoặc "dark_pact") hoặc đường lên ngôi Goblin Chief.
Nút 4 (lão luyện, 11+ hoặc khi nhân vật đã mạnh): khép lại; 2–3 kết khác nhau tùy dấu ấn.

Mỗi mạch còn có:
- Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
- Kết đời: với MỖI kết của nút 4, 2 câu tổng kết cả đời để game đọc khi nhân vật chết.
- Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (rất hay xảy ra với Goblin).

Mã mạch: mã xuất thân bỏ chữ "goblin_origin_", ví dụ mạch "chief", nút goblin_arc_chief_1 ... goblin_arc_chief_4
(nhánh: goblin_arc_chief_3a, goblin_arc_chief_3b).

Các xuất thân của phần này:
<dán danh sách xuất thân>
```

PHẦN 2
```
- goblin_origin_forest · Bụi rậm Rừng Tân Thủ · dấu ấn forest_goblin · Cha: không rõ (thợ săn cặn bã) · Mẹ: Grel, thợ hái lượm, đã bỏ đi
- goblin_origin_dungeon · Đống rác Hầm ngục · dấu ấn dungeon_scavenger · Cha: không rõ (kẻ dọn xác) · Mẹ: Snik, kẻ bới rác, còn sống
- goblin_origin_chief · Hang ổ Goblin Chief · dấu ấn hated, chief_son · Cha: Ragnok Đồ Tể, Goblin Chief, còn sống · Mẹ: Lura, vợ lẽ, còn sống
- goblin_origin_orphan · Bia tập chém Tân thủ · dấu ấn orphan · Cha: chiến binh vô danh, đã chết · Mẹ: Tixa, kẻ đẻ thuê của bộ lạc, đã chết
```

PHẦN 3
```
- goblin_origin_shaman · Con của Goblin Shaman · dấu ấn shaman_apprentice · Cha: Zikzak Cụt Ngón, Goblin Shaman của bộ lạc, còn sống · Mẹ: Nyla, trợ thủ pha thuốc, đã chết
- goblin_origin_mutant · Đột biến dị thường · dấu ấn hobgoblin_blood · Cha: kẻ lang thang, đã bỏ đi · Mẹ: Vrex, kẻ lượm nhặt, còn sống
- goblin_origin_slave · Tù Binh Trại Orc · dấu ấn orc_slave · Cha: nô lệ vô danh, đã chết · Mẹ: Grukia, nô lệ xay lúa, còn sống
```

---

## PHẦN 4 — Chương đời và tiểu sử

```
PHẦN 4: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Goblin con, thiếu niên, trưởng thành, lão luyện, lão làng), viết 6 câu mở chương,
   mỗi câu gắn với một tình trạng, ghi ở đầu dòng: mồ côi · còn cha hoặc mẹ · đói khổ (Tài sản dưới 15) ·
   có của ăn của để (Tài sản trên 50) · có vai trò · bậc cao trong bộ lạc (Leader trở lên) · có băng nhóm · cô độc ·
   mang thương tật (Sức khỏe dưới 30) · có lứa con · đã tiến hóa.
   Có thể nhắc {rival}, {mentor}, {friend}.

b) TIỂU SỬ KHI CHẾT:
   - 7 câu mở đầu tiểu sử theo xuất thân (mỗi xuất thân một câu).
   - 10 câu kết theo cách chết: chết già (hiếm, đáng tự hào) · chết đói · bị mạo hiểm giả giết · bị đồng loại đâm sau lưng ·
     chết trong cuộc cướp phá · chết khi đã là Goblin Chief/King · chết khi đã tiến hóa · chết vì thí nghiệm của Shaman ·
     chết mà mạch truyện còn dở dang · chết trước khi kịp lớn.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 15 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một kẻ hay một chuyện
   (dùng {father}, {mother}, {spouse}, {child}, {rival}, {mentor}, {friend}), ghi điều kiện ở đầu dòng nếu cần,
   ví dụ: ({friend} còn sống) "Bạn và {friend} chia nhau con chuột cuối cùng của mùa đông. Không ai nói gì."
```

---

## Ghi chú cho Claude khi nhập
- Mạch xuất thân chọn theo `origin.id`; nút truyện có ưu tiên cao trong cửa sổ tuổi, nút sau chỉ mở khi có dấu ấn nút trước.
- Dàn nhân vật: mỗi đời chọn 1 kiểu {rival}, 1 {mentor}, 1 {friend}; đặt tên Goblin khi sinh ra.
- Dấu ấn "hobgoblin_blood", "dark_pact", và các nút lên Goblin Chief nối vào hệ tiến hóa và bộ lạc đang có.
