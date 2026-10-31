# Prompt Gemini v3: MẠCH TRUYỆN — BEASTMAN

**Mục tiêu:** biến một kiếp Beastman (trung bình 43 năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:

1. **Dàn nhân vật xuyên suốt**: 3 kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu 5 nút.
2. **Mạch truyện theo xuất thân**: 23 xuất thân × 5 nút.
3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**
4. **Tổ đội có sẵn** để gia nhập, và tự lập tổ đội.

**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN 10** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng 272 sự kiện cho chủng tộc
BEASTMAN, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Beastman. Không viết lại sự kiện cũ.

=== BEASTMAN LÀ AI ===
Beastman (thú nhân, có 9 tộc: Sói, Hổ, Cáo, Thỏ, Gấu, Mèo, Chim, Rắn, Sư Tử; sống khoảng 50 năm). Bản năng mạnh, trọng sức mạnh và bầy đàn.
Một đời trung bình khoảng 43 năm.
Chủ đề: bản năng đối đầu với lý trí, bị Human kỳ thị và bắt làm nô lệ, tự do của thảo nguyên, danh dự bộ tộc.
Giọng: hoang dã, nóng, nhiều hình ảnh giác quan (mùi, tiếng hú, máu); thô nhưng có lúc rất ấm.

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của Beastman) ===
Sơ sinh 0–2 · Thơ ấu 2–8 · Thiếu niên 8–14 · Trưởng thành 14–30 · Trung niên 30–44 · Tuổi già 44+.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: Rong chơi · Học hành · Khổ luyện · Làm lụng · Mạo hiểm · Giao du · An dưỡng.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): Berserker, Steppe Hunter, Gladiator, Scout, Shaman, Silver Wolf Mercenary, Leatherworker, Beast Herder, Thief, Tribal Mage, Courier.
- Guild Bình Minh: F → E → D → C → B → A → S.

- Tổ đội tối đa 3 đồng đội.
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
Thảo Nguyên Gió Hú, các bộ tộc theo loài, Đấu trường Huyết Sa (nhiều Beastman bị bắt làm đấu sĩ), Thương hội Sói Bạc buôn nô lệ, Guild Bình Minh (nơi duy nhất trả công ngang Human).
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
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn Beastman còn sống tới
   (đời trung bình 43 năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

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

Mỗi kiếp Beastman có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai 3 "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: Beastman khác tộc tranh lãnh thổ; con của tù trưởng coi bạn là đồ lai tạp; thợ săn nô lệ Human biết mùi của bạn)
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: lão Sói già mất một tai từng là đấu sĩ vô địch; bà đồng gọi hồn thú; cựu nô lệ Human đã dạy bạn đọc chữ)
3. {friend} TRI KỶ (ví dụ: Beastman tộc Thỏ nhút nhát; anh em cùng bầy; đứa trẻ Human từng cởi xiềng cho bạn)

Lưu ý riêng: Tộc của nhân vật do game chọn; viết sao cho dùng được với mọi tộc, hoặc ghi rõ nút chỉ dành cho một tộc bằng 'Khi nào: tộc Sói'.

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

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c. Mã nút: beastman_cast_<mã mạch>_<số>, ví dụ beastman_cast_rival_a_3.
Tổng: 9 kiểu × 5 nút = 45 nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 7 — Mạch truyện theo xuất thân

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
Rồi 5 nút theo mẫu. Mã nút: beastman_arc_<mã mạch>_<số>; nhánh: beastman_arc_<mã mạch>_3a, beastman_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>
```

PHẦN 2
```
- mạch "nomad" · bm_bg_nomad · Con Của Gió Hú · dấu ấn sẵn có: nomad_blood · Cha: Rugar, Thợ săn của bộ tộc, còn sống · Mẹ: Lyra, Phù thủy gọi hồn thú, còn sống
- mạch "arena" · bm_bg_arena · Sôi Sục Huyết Sa · dấu ấn sẵn có: arena_born · Cha: Kael, Đấu sĩ nô lệ, còn sống · Mẹ: game tự đặt tên, Nô lệ phục dịch, đã mất
- mạch "forest" · bm_bg_forest · Mầm Non Đại Ngàn · dấu ấn sẵn có: forest_child · Cha: Sylas, Người thu thập thảo dược, còn sống · Mẹ: Elara, Thợ dệt lưới, còn sống
- mạch "merchant" · bm_bg_merchant · Bánh Xe Bạc · dấu ấn sẵn có: merchant_guard · Cha: Borm, Bảo tiêu đánh thuê, còn sống · Mẹ: Cilla, Người giữ sổ sách, còn sống
```

PHẦN 3
```
- mạch "wolf" · bm_bg_wolf · Đứa Con Của Sói · dấu ấn sẵn có: wolf_raised · Cha: Fenrir, Alpha của bầy, còn sống · Mẹ: Lupa, Thợ săn tiền phong, còn sống
- mạch "slum" · bm_bg_slum · Bóng Tối Thủ Đô · dấu ấn sẵn có: slum_rat · Cha: game tự đặt tên, không rõ tung tích · Mẹ: Nera, Kẻ móc túi, đã mất
- mạch "darkmoon" · bm_bg_darkmoon · Dị Đoan Hắc Nguyệt · dấu ấn sẵn có: dark_moon_mark · Cha: Malakor, Tư tế Hắc Nguyệt Hội, đã bỏ đi · Mẹ: Vex, Đồ tể hiến tế, còn sống
- mạch "swamp" · bm_bg_swamp · Đóa Hoa Chướng Khí · dấu ấn sẵn có: swamp_resist · Cha: Rusk, Kẻ nhặt rác đầm lầy, còn sống · Mẹ: Tasha, Dược sư hoang dã, còn sống
```

PHẦN 4
```
- mạch "forge" · bm_bg_forge · Nôi Lửa Lò Rèn · dấu ấn sẵn có: forge_adopted · Cha: Vulcan, Thợ quai búa phụ việc, còn sống · Mẹ: game tự đặt tên, còn sống
- mạch "ranger" · bm_bg_ranger · Truyền Nhân Tuần Lâm · dấu ấn sẵn có: ranger_blood · Cha: Talon, Chiến binh Đội Ranger Đại Ngàn, còn sống · Mẹ: Zira, Thợ săn bẫy, đã mất
- mạch "demon" · bm_bg_demon · Ấn Chú Hủy Diệt · dấu ấn sẵn có: demon_tainted · Cha: Zurg, Kẻ đào ngũ, còn sống · Mẹ: Daelia, Bị nhiễm ma khí, còn sống
- mạch "lumina" · bm_bg_lumina · Vạt Nắng Thánh Quang · dấu ấn sẵn có: lumina_blessed · Cha: Arthur, Kẻ gác cổng tu viện, còn sống · Mẹ: Maria, Người quét dọn, còn sống
```

PHẦN 5
```
- mạch "taboo" · bm_bg_taboo · Lai Tạp Cấm Kỵ · dấu ấn sẵn có: taboo_hybrid · Cha: Kord, Chiến binh du mục, còn sống · Mẹ: Sila, Kẻ hái lượm, còn sống
- mạch "halfblood" · bm_bg_halfblood · Đứa Con Dòng Máu Nhạt · dấu ấn sẵn có: half_human · Cha: Leon, Thương nhân lụa, đã bỏ đi · Mẹ: Myra, Thợ may mướn, còn sống
- mạch "cat_roof" · bm_bg_cat_roof · Mèo Hoang Gác Mái · dấu ấn sẵn có: stray_cat · Cha: Jinx, Kẻ trộm vặt, đã bỏ đi · Mẹ: Cleo, Vũ nữ quán rượu, còn sống
- mạch "dog_guard" · bm_bg_dog_guard · Người Gác Cổng Trung Thành · dấu ấn sẵn có: guard_dog · Cha: K9, Lính gác cổng, còn sống · Mẹ: Bella, Phụ bếp trại lính, còn sống
```

PHẦN 6
```
- mạch "wolf_alpha" · bm_bg_wolf_alpha · Dòng Máu Thủ Lĩnh · dấu ấn sẵn có: alpha_blood · Cha: Hati, Tù trưởng, còn sống · Mẹ: Skoll, Chiến binh tinh nhuệ, còn sống
- mạch "fox_shrine" · bm_bg_fox_shrine · Bóng Cáo Lạc Thần · dấu ấn sẵn có: fox_trickster · Cha: game tự đặt tên, không rõ tung tích · Mẹ: Kumi, Tư tế mạo danh, còn sống
- mạch "rabbit_warren" · bm_bg_rabbit_warren · Hang Thỏ Nơm Nớp · dấu ấn sẵn có: rabbit_hole · Cha: Thumper, Thợ đào hang, còn sống · Mẹ: Daisy, Thợ làm bánh, còn sống
- mạch "tiger_peak" · bm_bg_tiger_peak · Chúa Tể Rừng Già · dấu ấn sẵn có: tiger_pride · Cha: Raikou, Kẻ độc hành, đã bỏ đi · Mẹ: Shere, Chúa tể lãnh thổ, còn sống
```

PHẦN 7
```
- mạch "bear_cave" · bm_bg_bear_cave · Tiếng Ngáy Hang Sâu · dấu ấn sẵn có: hibernation_born · Cha: Bjorn, Thợ đốn gỗ, còn sống · Mẹ: Ursa, Người ủ bia mồi mật, còn sống
- mạch "rat_sewer" · bm_bg_rat_sewer · Mầm Bệnh Cống Ngầm · dấu ấn sẵn có: sewer_rat · Cha: Squeak, Móc túi, còn sống · Mẹ: Rina, Phân loại rác ma thuật, còn sống
- mạch "hawk_cliff" · bm_bg_hawk_cliff · Tổ Ấm Cheo Leo · dấu ấn sẵn có: born_to_fly · Cha: Zephyr, Trinh sát bầu trời, còn sống · Mẹ: Aera, Xạ thủ bão táp, còn sống
```

---

## PHẦN 8 — Chương đời và tiểu sử

```
PHẦN 8: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Trưởng thành, Trung niên, Tuổi già), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con) (có tổ đội)
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "Thơ ấu (2–8 tuổi)", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi 23 câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(nomad) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): chết già giữa bầy · tử trận trên thảo nguyên · chết trên Đấu trường Huyết Sa · chết khi đang làm nô lệ · chết vì bị phản bội · chết vì bệnh · chết trong nhiệm vụ · chết trẻ · chết mà mạch truyện còn dở dang · chết khi là anh hùng của bộ tộc.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".
```

---

## PHẦN 9 — Tổ đội có sẵn

```
PHẦN 9: TỔ ĐỘI CÓ SẴN

LUẬT VỀ ĐỒNG ĐỘI: Beastman không gom đồng đội lẻ tẻ. Nhân vật được MỜI hoặc XIN GIA NHẬP một TỔ ĐỘI CÓ SẴN
gồm 2–5 thành viên có tên, vai trò, tính cách, quá khứ và quan hệ với nhau. Mỗi lúc chỉ ở một tổ đội; có thể rời đi,
bị đuổi, tổ đội tan rã, hoặc về sau tự lập.

Thiết kế 6 tổ đội khác hẳn nhau, ví dụ: bầy săn của bộ tộc Sói; tổ đội nô lệ đấu sĩ trốn khỏi Huyết Sa; tổ đội Guild Bình Minh hỗn chủng; đội lính đánh thuê toàn thú nhân; nhóm du mục buôn bán trên thảo nguyên; tổ đội báo thù săn bọn buôn nô lệ.

Định dạng mỗi tổ đội (dùng ĐÚNG chữ "TỔ ĐỘI" và "Tên tổ đội" để game đọc được):
TỔ ĐỘI <số>: <TÊN KIỂU VIẾT HOA> (party_<a..f>)
Tên tổ đội: <tên> · Hạng: <hạng hoặc cấp> · Tôn chỉ: "<1 câu>" · Nơi tụ họp: <nơi>.
Thành viên (<số> người):
<Tên>: <Tộc> · <Nghề> (Bậc <n>) · <Đội trưởng nếu là đội trưởng>. <tính cách>. Bí mật: <...>. Quan hệ: <...>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi các nút:
- 1 nút gia nhập: beastman_party_party_<x>_join (2–3 lựa chọn; gia nhập thì ghi "gia nhập tổ đội party_<x>").
- 6 nút đời sống: beastman_party_party_<x>_1 … _6 (nhiệm vụ đầu tiên → mâu thuẫn nội bộ → bí mật lộ ra → mất mát →
  ngã rẽ lớn → khép lại). Nút sau ghi CẦN dấu ấn của nút trước.
- Mỗi thành viên 1 nút riêng: beastman_party_party_<x>_m1, _m2… với "Khi nào: ... · CẦN <Tên> còn trong đội".
Viết 2 tổ đội rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 10 — Tự lập tổ đội

```
PHẦN 10: TỰ LẬP TỔ ĐỘI

Khi đã đủ mạnh (nghề bậc 3 trở lên hoặc bậc cao trong Guild Bình Minh), nhân vật có thể tự lập tổ đội.
1. Cảnh lập tổ đội (1 nút, mã beastman_lead_1): lựa chọn dẫn tới "trở thành đội trưởng".
2. 10 ứng viên chiêu mộ, mỗi người một nút (mã beastman_recruit_<số>), ngay dưới tiêu đề có dòng:
   Ứng viên: <Tên> · <Tộc> · <Nghề> (Bậc <n>) · Tính cách: <...>. Yêu cầu: <điều họ đòi hỏi>.
   Lựa chọn thành công ghi "<Tên> gia nhập tổ đội".
3. 6 nút làm người cầm đầu (mã beastman_lead_2 … beastman_lead_7): chia chiến lợi phẩm, thành viên bất mãn, hy sinh một người,
   đối thủ cướp nhiệm vụ, thành viên muốn rời đi, truyền lại khi về già.
4. 4 nút nối với dàn nhân vật (mã beastman_lead_link_1 … _4): {friend} xin gia nhập, {rival} lập tổ đội đối địch,
   {mentor} về già xin đi theo, trận đối đầu cuối với {rival}. Ghi "CẦN {friend} còn sống" v.v. ở dòng Khi nào.
```

---

## Ghi chú cho Claude khi nhập
- Mã mạch → xuất thân: nomad = bm_bg_nomad, arena = bm_bg_arena, forest = bm_bg_forest, merchant = bm_bg_merchant, wolf = bm_bg_wolf, slum = bm_bg_slum, darkmoon = bm_bg_darkmoon, swamp = bm_bg_swamp, forge = bm_bg_forge, ranger = bm_bg_ranger, demon = bm_bg_demon, lumina = bm_bg_lumina, taboo = bm_bg_taboo, halfblood = bm_bg_halfblood, cat_roof = bm_bg_cat_roof, dog_guard = bm_bg_dog_guard, wolf_alpha = bm_bg_wolf_alpha, fox_shrine = bm_bg_fox_shrine, rabbit_warren = bm_bg_rabbit_warren, tiger_peak = bm_bg_tiger_peak, bear_cave = bm_bg_bear_cave, rat_sewer = bm_bg_rat_sewer, hawk_cliff = bm_bg_hawk_cliff (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).
- Dàn nhân vật 5 nút mỗi kiểu, mạch xuất thân 5 nút (đời trung bình).
