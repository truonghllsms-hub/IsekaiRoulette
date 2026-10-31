# Prompt Gemini v3: MẠCH TRUYỆN — HUMAN

**Mục tiêu:** biến một kiếp Human thành **một câu chuyện có đầu có cuối**, thay vì chuỗi sự kiện rời rạc.
Lớp mới này KHÔNG thay kịch bản cũ. Nó thêm **trục chính** để game bám theo:

1. **Dàn nhân vật xuyên suốt**: kẻ thù truyền kiếp, người thầy, tri kỷ. Cùng một người xuất hiện lại nhiều lần trong đời.
2. **Mạch truyện theo xuất thân**: mỗi xuất thân có 5 nút truyện, rải từ tuổi thơ tới tuổi già. Nút sau rẽ nhánh theo lựa chọn ở nút trước.
3. **Câu nhắc lại** chuyện cũ (hiện ở đầu chương, năm yên ả) và **đoạn kết đời** để game kể lại tiểu sử khi nhân vật chết.

**Cách dùng**
1. Mở cuộc trò chuyện **mới** với Gemini (Pro, tư duy trung bình là đủ). Dán **KHỐI CHUNG** trước.
2. Gửi lần lượt **PHẦN 1 → PHẦN 9**, mỗi lần một phần. Gemini dừng giữa chừng thì gõ "viết tiếp".
3. Đọc, sửa theo ý bạn, rồi gửi lại toàn bộ cho Claude để chuyển thành dữ liệu game.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn hàng trăm sự kiện ngẫu nhiên
cho chủng tộc HUMAN, nhưng người chơi phàn nàn: cả đời nhân vật không thành MỘT CÂU CHUYỆN, sự kiện rời rạc,
không liên quan nhau, nhân vật phụ xuất hiện một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho Human. Không viết lại sự kiện cũ.

=== HUMAN LÀ AI ===
Loài người tuổi thọ ngắn (70–80 năm) nhưng tham vọng không đáy. Chủ đề: tham vọng, giai cấp, chiến tranh,
thăng tiến từ hèn mọn lên quyền quý, cái giá của lựa chọn, những mối ràng buộc gia đình.

=== GIAI ĐOẠN ĐỜI ===
Sơ sinh 0–3 · Thơ ấu 3–11 · Thiếu niên 11–18 · Thanh niên 18–41 · Trung niên 41–60 · Tuổi già 60+.

=== GAME VẬN HÀNH THẾ NÀO (để viết cho khớp) ===
- Mỗi năm người chơi chọn VIỆC CHÍNH: Rong chơi (thơ ấu) · Học hành · Khổ luyện · Làm lụng · Mạo hiểm · Giao du · An dưỡng.
- 4 chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn (thường 1–15). Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng.
- 14 nghề (Kiếm sĩ, Ma pháp sư, Assassin, Priest, Thương nhân, Blacksmith, Ranger, Gladiator, Thánh Kỵ Sĩ,
  Học giả Tháp Ngà, Nông dân, Tamer, Bard, Lính đánh thuê), mỗi nghề 5 bậc. Guild Bình Minh hạng F → S.
- Tổ đội tối đa 3 đồng đội. Gia đình: cha, mẹ, bạn đời, con.
- DẤU ẤN: một lựa chọn để lại dấu ấn (mã tiếng Anh, viết thường, có gạch dưới). Nhiều năm sau, sự kiện khác chỉ
  xảy ra nếu có dấu ấn đó. ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN: mọi nút truyện phải để lại dấu ấn,
  và nút sau phải đọc dấu ấn của nút trước.

=== THẾ GIỚI AETHELGARD ===
Tiền: Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana.
Đồng Bằng Thánh Quang (thủ đô Sanctus, Học viện Ma pháp Tháp Ngà), Thảo Nguyên Gió Hú, Đại Ngàn Lục Bảo (Elf, Yggdrasil),
Dãy Núi Răng Cưa (Dwarf, Lò Rèn Vĩnh Cửu), Đầm Lầy Tử Khí, Vực Thẳm Phân Tầng (Cửa Ngục Than Khóc), Đảo Tro Tàn.
Giáo hội Thánh Quang (Nữ thần Lumina), Tự Nhiên Giáo, Hắc Nguyệt Hội (tà giáo). Guild Bình Minh, Thánh Kỵ Sĩ Đoàn,
Quân đoàn Ma Vương, Thương hội Sói Bạc, Guild Sát thủ Umbra, Đấu trường Huyết Sa, Đội Ranger Đại Ngàn.
4 thời đại: Thời Bình · Chiến Tranh Tuyến Đầu · Kỷ Nguyên Tăm Tối · Ma Vương Giáng Thế.

=== TÊN GỌI KIỂU MANGA (BẮT BUỘC) ===
Tên chủng tộc giữ tiếng Anh (Human, Elf, Dwarf, Beastman tộc Sói, Goblin...). Không dịch thuần Việt
("Người lùn", "Tiên tộc", "Yêu tinh"). Chức danh theo Hán Việt chuẩn (Kiếm Thánh, Hiền Giả, Dũng Giả, Thánh Nữ)
hoặc tiếng Anh (Assassin, Ranger, Necromancer). Văn kể tiếng Việt, ngôi thứ hai ("bạn").

=== GIỌNG VĂN ===
Epic RPG: sử thi, trang trọng, mỗi đoạn 1–2 câu, câu sau là một hình ảnh hoặc chi tiết định mệnh.
Không dùng tên, câu chữ, tình huống của game/truyện/phim có thật.

=== NGUYÊN TẮC VIẾT MẠCH TRUYỆN (QUAN TRỌNG NHẤT) ===
1. NHÂN QUẢ: mỗi nút truyện phải bắt nguồn từ điều đã xảy ra trước đó (xuất thân, cha mẹ, lựa chọn ở nút trước)
   và để lại hậu quả cho nút sau. Người chơi phải nhận ra: "À, chuyện này xảy ra VÌ năm đó mình đã...".
2. NHẮC TÊN, NHẮC CHUYỆN CŨ: trong tình huống của nút sau, nhắc lại cụ thể chi tiết của nút trước
   (đồ vật, câu nói, vết sẹo, tên người). Không viết chung chung.
3. CÙNG MỘT NGƯỜI: nhân vật phụ quan trọng phải quay lại nhiều lần, thay đổi theo thời gian
   (cậu bé ăn trộm năm xưa trở thành đội trưởng Guild Umbra; người thầy già đi rồi mất).
4. RẼ NHÁNH THẬT: mỗi nút có 2–3 hướng đi dẫn tới các phiên bản khác nhau của nút sau.
   Không có nhánh nào "đúng"; nhánh nào cũng có cái được và cái mất.
5. CÓ KẾT: nút cuối khép lại mạch truyện (trả thù xong, tha thứ, thất bại, truyền lại cho con...).
6. KHÔNG TỰ MÂU THUẪN: cha/mẹ đã mất thì không xuất hiện bằng xương bằng thịt (chỉ qua ký ức, di vật, hồn ma).
   Nút có cha/mẹ thì ghi "khi {father} còn sống" hoặc viết thêm bản dự phòng "nếu {father} đã mất".

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ · {spouse} bạn đời · {child} con · {ally} một đồng đội
MỚI: {rival} kẻ thù truyền kiếp · {mentor} người thầy · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).

=== MẪU TRÌNH BÀY NÚT TRUYỆN (dùng đúng mẫu) ===

### [MÃ] Tên nút
- **Mạch:** mã mạch · **Nút:** 2/5
- **Khi nào:** tuổi 12–16 · việc chính (nếu cần) · CẦN dấu ấn "x" (hoặc "y") · điều kiện khác
- **Tình huống:** 2–3 câu, nhắc lại chi tiết của nút trước.
- **A. "Nhãn lựa chọn"** — dựa vào [chỉ số], [độ khó]
  - Thành công: 1–2 câu. → hệ quả, dấu ấn "x"
  - Thất bại: 1–2 câu. → hệ quả, dấu ấn "y"
- **B. "Nhãn lựa chọn"** — (không tung xúc xắc) 1–2 câu. → hệ quả, dấu ấn "z"
- **Nhắc lại:** (nếu có "x") 1 câu ngắn để game chèn vào những năm sau · (nếu có "y") ... · (nếu có "z") ...
- **Khoảnh khắc:** 1 dòng ghi vào tiểu sử.

Quy ước bắt buộc:
- Mỗi lựa chọn của nút truyện để lại ĐÚNG MỘT dấu ấn của mạch (đặt mã theo dạng <mã mạch>_<số nút>_<từ khóa>,
  ví dụ "thief_2_betrayed"). Nút sau ghi rõ CẦN dấu ấn nào.
- Nếu nút sau khác hẳn tùy nhánh, viết nhiều phiên bản: [MÃ_a] cần dấu ấn "x", [MÃ_b] cần dấu ấn "y".
- Độ khó: DỄ, VỪA, KHÓ, RẤT KHÓ. Chỉ tung xúc xắc bằng Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn, Sức khỏe.
- Hệ quả ghi số: Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +5, Thân thiết với {friend} +10.
  Hệ quả đặc biệt dùng đúng chữ: "có {spouse}", "có {child}", "mất {ally}", "{rival} CHẾT", "{mentor} CHẾT",
  "{friend} CHẾT", "{friend} gia nhập tổ đội", "{father} CHẾT", "CHẾT (lý do)".
- Tài sản, Danh vọng thang 0–100: thưởng thường +5..+30, tối đa +100.
- Mỗi nút có ít nhất 2 lựa chọn; luôn có một lựa chọn an toàn/hèn nhát với cái giá riêng.
- Khoảng cách tuổi giữa các nút đủ xa để đời còn chỗ cho chuyện khác (ít nhất 4–5 năm).

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
```

---

## PHẦN 1 — Dàn nhân vật xuyên suốt

```
PHẦN 1: DÀN NHÂN VẬT XUYÊN SUỐT

Mỗi kiếp Human có 3 người đi cùng nhân vật suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện của họ.
Viết cho MỖI vai dưới đây 3 "kiểu người" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} — KẺ THÙ TRUYỀN KIẾP (ví dụ: con nhà quyền quý khinh bạn từ nhỏ; đứa trẻ cùng xóm mà đố kỵ; thiên tài cùng lứa)
2. {mentor} — NGƯỜI THẦY (ví dụ: cựu Mạo hiểm giả hạng S nghiện rượu; nữ tu già; lão thợ rèn câm)
3. {friend} — TRI KỶ (ví dụ: bạn chơi từ thuở nhỏ; người cùng chạy trốn; kẻ từng là đối thủ)

Với mỗi kiểu người, viết:
- Mô tả 1–2 câu (ngoại hình, tính cách, một chi tiết dễ nhớ như vết sẹo, câu cửa miệng, món đồ luôn mang theo).
- 6 nút truyện theo mẫu, rải qua các giai đoạn:
  Nút 1 Gặp gỡ (thơ ấu hoặc thiếu niên) → Nút 2 Gắn bó hoặc va chạm → Nút 3 Bước ngoặt (thanh niên) →
  Nút 4 Thử thách lớn (thanh niên/trung niên) → Nút 5 Hệ quả (trung niên) → Nút 6 Khép lại (trung niên/tuổi già).
  Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người thầy có thể chết vì bạn.
- 3 câu "Nhắc lại" dùng chung cho cả mạch (ví dụ: "Bạn vẫn giữ con dao gỗ {friend} khắc tặng năm nào.").

Mã mạch: rival_a, rival_b, rival_c, mentor_a, mentor_b, mentor_c, friend_a, friend_b, friend_c.
Mã nút: human_cast_<mã mạch>_<số>, ví dụ human_cast_rival_a_3.
Tổng: 9 kiểu người × 6 nút = 54 nút. Nếu dài, viết {rival} trước rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 2 → PHẦN 6 — Mạch truyện theo xuất thân

Gửi **mỗi phần 4 xuất thân**. Dán khung dưới đây, thay danh sách xuất thân theo từng phần.

```
PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm cha mẹ và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch truyện 5 nút
bám vào chính xuất thân đó, để cả đời nhân vật có một trục chính:

Nút 1 (thơ ấu): biến cố gieo mầm, đến từ gia cảnh hoặc cha mẹ.
Nút 2 (thiếu niên): hậu quả đầu tiên; nhân vật bắt đầu tự quyết định.
Nút 3 (thanh niên): bước ngoặt lớn; quá khứ tìm đến.
Nút 4 (thanh niên muộn hoặc trung niên): đối mặt; có thể mất mát lớn.
Nút 5 (trung niên hoặc tuổi già): khép lại; có 2–3 kết khác nhau tùy dấu ấn.

Mỗi mạch còn có:
- Câu mở mạch: 1–2 câu game chèn ngay sau đoạn ra đời, gieo một câu hỏi lớn (ví dụ: "Mẹ bạn không bao giờ nói
  vì sao trên cổ bà có hình xăm con rắn của Guild Sát thủ Umbra.").
- Kết đời: với MỖI kết của nút 5, viết 2 câu tổng kết cả đời để game đọc khi nhân vật chết (ví dụ:
  "Đứa con của kẻ trộm đã trả hết món nợ máu của mẹ. Người ta khắc tên bạn trên cổng thành Sanctus.").
- Kết dở dang: 1–2 câu cho trường hợp nhân vật chết trước khi mạch khép lại.

Mã mạch dùng đúng mã xuất thân bỏ chữ "human_bg_", ví dụ mạch "thief", nút human_arc_thief_1 ... human_arc_thief_5.
Nếu nút sau có nhiều phiên bản theo nhánh: human_arc_thief_3a, human_arc_thief_3b.

Các xuất thân của phần này:
<dán 4 dòng xuất thân của phần này>
```

**Danh sách xuất thân để dán (mỗi phần 4 dòng):**

PHẦN 2
```
- human_bg_harlot · Con của kỹ nữ · dấu ấn poor · Cha: không rõ là ai (khách làng chơi) · Mẹ: Elara, kỹ nữ, còn sống
- human_bg_hunter · Con thợ săn Thảo Nguyên · dấu ấn hunter_blood · Cha: Kaelen, thợ săn quái vật, còn sống · Mẹ: Lyra, người thuộc da, còn sống
- human_bg_mercenary · Trẻ trại lính Sói Bạc · dấu ấn mercenary_camp · Cha: Jarek, lính đánh thuê, còn sống · Mẹ: Tasha, hậu cần quân đội, còn sống
- human_bg_refugee · Tị nạn Đầm Lầy Tử Khí · dấu ấn refugee · Cha: Varian, nông dân, đã mất · Mẹ: Celin, thợ dệt, còn sống
```

PHẦN 3
```
- human_bg_cultist · Hạt giống Hắc Nguyệt Hội · dấu ấn cultist_kin · Cha: Malakor, tu sĩ hắc ám, còn sống · Mẹ: Xara, tín đồ bị hiến tế, đã mất
- human_bg_servant · Con người hầu Tháp Ngà · dấu ấn educated · Cha: Thomas, quản gia, còn sống · Mẹ: Martha, hầu gái, còn sống
- human_bg_merchant · Thương gia nhỏ Sanctus · dấu ấn merchant_kin · Cha: Galdric, thương nhân, còn sống · Mẹ: Livia, quản lý sổ sách, còn sống
- human_bg_noble_bastard · Con hoang quý tộc · dấu ấn bastard_blood · Cha: Lord Valerius, quý tộc hiệp sĩ, đã bỏ đi · Mẹ: Rina, cô gái bán hoa, còn sống
```

PHẦN 4
```
- human_bg_half_elf · Con lai Elf Đại Ngàn · dấu ấn half_elf · Cha: Elandorr, cung thủ Đội Ranger (Elf), đã mất · Mẹ: Myra, dược sư, còn sống
- human_bg_half_beast · Con lai Beastman · dấu ấn half_beast · Cha: Garosh, chiến binh Beastman, còn sống · Mẹ: Elin, nữ tu bỏ giáo hội, còn sống
- human_bg_farmer · Nông dân Đồng Bằng · dấu ấn peasant · Cha: Dovan, nông nô, còn sống · Mẹ: Mila, nông nô, còn sống
- human_bg_blacksmith · Thợ rèn Dãy Núi Răng Cưa · dấu ấn forge_born · Cha: Korin, thợ rèn học việc, còn sống · Mẹ: Helga, thợ quai búa, còn sống
```

PHẦN 5
```
- human_bg_knight_orphan · Trẻ mồ côi Thánh Kỵ Sĩ Đoàn · dấu ấn holy_orphan · Cha: Roland, Thánh Kỵ Sĩ, đã mất · Mẹ: Seraphina, tu sĩ hồi phục, đã mất
- human_bg_thief · Con kẻ trộm Sanctus · dấu ấn thief_kin · Cha: không rõ · Mẹ: Nera, đạo chích của Guild Sát thủ Umbra, còn sống
- human_bg_gladiator · Mầm non Đấu trường Huyết Sa · dấu ấn gladiator_seed · Cha: Kratos, nô lệ giác đấu hạng S, còn sống · Mẹ: Lira, vũ nữ đấu trường, đã mất
- human_bg_priest_sin · Đứa con tội lỗi của Giáo hội · dấu ấn church_secret · Cha: Lucius, Hồng y Giáo hội Thánh Quang, đã bỏ đi · Mẹ: Maria, nữ tu, còn sống
```

PHẦN 6
```
- human_bg_scholar · Gia đình học giả sa sút · dấu ấn fallen_scholar · Cha: Aldous, học giả ngôn ngữ cổ, còn sống · Mẹ: Elenor, người chép sách, còn sống
- human_bg_soldier · Con binh nhì Tuyến Đầu · dấu ấn soldier_kin · Cha: Halen, lính tiên phong, còn sống · Mẹ: Bess, thợ nấu ăn quân đội, còn sống
- human_bg_alchemist · Lò thí nghiệm giả kim · dấu ấn alchemy_burn · Cha: Zik, giả kim thuật sư, còn sống · Mẹ: Vanna, trợ lý giả kim, còn sống
- human_bg_hero_descendant · Hậu duệ Dũng Giả · dấu ấn hero_blood · Cha: Leon, cựu Mạo hiểm giả, còn sống · Mẹ: Aria, dân thường, còn sống
```

---

## PHẦN 7 — Chương đời và tiểu sử

```
PHẦN 7: CHƯƠNG ĐỜI VÀ TIỂU SỬ

Game chia mỗi kiếp thành các chương theo giai đoạn đời. Viết các câu để game ghép thành một câu chuyện liền mạch.

a) MỞ CHƯƠNG: với mỗi giai đoạn (Thơ ấu, Thiếu niên, Thanh niên, Trung niên, Tuổi già), viết 8 câu mở chương,
   mỗi câu gắn với một tình trạng của nhân vật. Ghi tình trạng ở đầu dòng, ví dụ:
   (mồ côi) "Bạn bước vào tuổi thiếu niên với không ai để gọi là nhà."
   Các tình trạng dùng: mồ côi · cha mẹ còn đủ · nghèo (Tài sản dưới 20) · giàu (Tài sản trên 70) · có nghề · chưa có nghề ·
   có bạn đời · cô độc · nổi danh (Danh vọng trên 50) · mang thương tật (Sức khỏe dưới 30) · có con.
   Có thể nhắc {rival}, {mentor}, {friend} nếu hợp.

b) TIỂU SỬ KHI CHẾT: game ghép tiểu sử theo thứ tự: câu mở đầu → các khoảnh khắc lớn → câu kết.
   - 10 câu mở đầu tiểu sử theo xuất thân hoặc tình trạng (ví dụ: "Sinh ra dưới gác xép quán trọ, {name} chưa bao giờ
     có gì ngoài đôi tay và lòng tham.").
   - 12 câu kết theo cách chết và tình trạng cuối đời: chết già bên con cháu · chết già cô độc · tử trận khi còn trẻ ·
     chết vì bệnh · chết trong nhiệm vụ · chết vì bị phản bội · chết khi đang giàu sang · chết trong nghèo khó ·
     chết khi là anh hùng (Danh vọng trên 70) · chết khi mang tiếng xấu · chết mà mạch truyện còn dở dang · chết trẻ.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện
   (dùng {father}, {mother}, {spouse}, {child}, {rival}, {mentor}, {friend}), ví dụ:
   "Mùa đông năm ấy, {mentor} ho nhiều hơn. Bạn giả vờ không để ý."
   Ghi điều kiện ở đầu dòng nếu cần: (có {spouse}) (có {child}) ({mentor} còn sống) ({rival} còn sống).
```

---

## PHẦN 8 — Tổ đội có sẵn để gia nhập

```
PHẦN 8: TỔ ĐỘI CÓ SẴN

LUẬT MỚI VỀ ĐỒNG ĐỘI (thay cho cách cũ "nhặt từng người lạ"):
- Human không tự gom đồng đội lẻ tẻ. Từ tuổi thiếu niên muộn, nhân vật được MỜI hoặc XIN GIA NHẬP một TỔ ĐỘI CÓ SẴN
  gồm 2–5 thành viên, mỗi người có tên riêng, vai trò, tính cách, quá khứ và quan hệ với nhau.
- Mỗi đời chỉ ở một tổ đội tại một thời điểm. Có thể rời đi, bị đuổi, tổ đội tan rã, hoặc về sau tự lập tổ đội riêng
  và trở thành đội trưởng.
- Trong câu chữ: {party} là tên tổ đội hiện tại, {leader} là đội trưởng, {member} là một thành viên được game chọn,
  {ally} vẫn dùng được như cũ. Khi muốn nhắc đúng một người cụ thể, viết thẳng tên người đó.

Hãy thiết kế 6 TỔ ĐỘI khác hẳn nhau về hạng Guild, tôn chỉ và không khí, ví dụ: tổ đội tân binh hạng F ồn ào;
tổ đội hạng B kỷ luật thép do một cựu Thánh Kỵ Sĩ dẫn dắt; tổ đội đánh thuê chỉ biết tiền; tổ đội săn quái vật
toàn kẻ bị xã hội ruồng bỏ; tổ đội quý tộc đi "trải nghiệm"; tổ đội huyền thoại hạng S đang già đi.

Với MỖI tổ đội, viết:
1. Tên tổ đội (kiểu manga: "Nanh Bạc", "Đuốc Bình Minh"...), hạng Guild, tôn chỉ 1 câu, nơi tụ họp.
2. Thành viên (2–5 người): Tên · tộc (có thể có Elf, Dwarf, Beastman tộc nào) · nghề và bậc · tính cách (dũng cảm,
   trung thành, tham lam, nhút nhát, vui tính, lạnh lùng) · một bí mật hoặc mục tiêu riêng · quan hệ với người khác
   trong đội (ví dụ: "yêu thầm đội trưởng", "nợ máu với tên Assassin").
3. Điều kiện để được mời: giai đoạn, hạng Guild hoặc nghề, chỉ số tối thiểu, dấu ấn liên quan (nếu có).
4. Cảnh gia nhập (1 nút theo mẫu): thử thách hoặc lời mời, 2–3 lựa chọn (gia nhập theo cách nào, hoặc từ chối).
   Gia nhập thì ghi "gia nhập tổ đội <mã tổ đội>".
5. 6 nút đời sống tổ đội, theo trình tự: nhiệm vụ đầu tiên cùng nhau → mâu thuẫn nội bộ → bí mật của một thành viên
   lộ ra → mất mát (một người bị thương nặng, chết hoặc bỏ đi) → tổ đội đứng trước ngã rẽ lớn (thăng hạng, tan rã,
   phản bội) → khép lại (thành huyền thoại, giải tán, bạn lên làm đội trưởng...). Nút sau đọc dấu ấn của nút trước.
6. Mỗi thành viên 1 nút riêng (chuyện cá nhân của người đó, cần bạn giúp hoặc lựa chọn đứng về phía ai).
7. 3 câu "Nhắc lại" về tổ đội cho những năm yên ả.

Mã tổ đội: party_a ... party_f. Mã nút: human_party_<mã tổ đội>_<số> và human_party_<mã tổ đội>_m<số thành viên>.
Hệ quả đặc biệt dùng đúng chữ: "gia nhập tổ đội <mã>", "rời tổ đội", "bị đuổi khỏi tổ đội", "tổ đội tan rã",
"trở thành đội trưởng", "<Tên thành viên> CHẾT", "<Tên thành viên> rời đội", "<Tên thành viên> phản bội",
"Thân thiết với <Tên thành viên> +10", "có {spouse} là <Tên thành viên>".
Viết 2 tổ đội rồi chờ tôi gõ "viết tiếp".
```

---

## PHẦN 9 — Tự lập tổ đội và chiêu mộ

```
PHẦN 9: TỰ LẬP TỔ ĐỘI

Khi đã đủ mạnh (hạng Guild C trở lên, hoặc nghề bậc 3 trở lên, hoặc tổ đội cũ tan rã), nhân vật có thể tự lập tổ đội.
Viết:
1. Cảnh lập tổ đội (1 nút): đặt tên, lý do, ai đi theo bạn từ tổ đội cũ (nếu có).
2. 10 "ứng viên" có thể chiêu mộ, mỗi người: tên · tộc · nghề · tính cách · điều họ đòi hỏi (tiền, báo thù, chỗ dung thân)
   · 1 cảnh chiêu mộ có 2–3 lựa chọn (thuyết phục bằng Trí tuệ, thắng tay đôi bằng Sức mạnh, trả tiền, từ chối).
3. 6 nút "làm đội trưởng": chia chiến lợi phẩm, thành viên bất mãn, quyết định hy sinh một người để cứu cả đội,
   đối thủ Guild cướp nhiệm vụ, thành viên muốn rời đi, truyền lại tổ đội khi về già.
4. Liên kết với PHẦN 1: {rival}, {mentor}, {friend} có thể xuất hiện trong tổ đội (ví dụ {friend} xin gia nhập,
   {rival} lập tổ đội đối địch). Viết 4 nút cho các trường hợp này.

Mã nút: human_lead_<số>, human_recruit_<số>.
```

---

## Ghi chú cho Claude khi nhập
- Mạch xuất thân: game chọn mạch theo `origin.id`. Nút truyện ưu tiên cao trong cửa sổ tuổi, nút kế tiếp chỉ mở khi có dấu ấn của nút trước.
- Dàn nhân vật: mỗi đời chọn 1 kiểu {rival}, 1 kiểu {mentor}, 1 kiểu {friend}; đặt tên khi sinh ra.
- "Nhắc lại", mở chương, năm yên ả có ký ức, tiểu sử: dùng cho phần kể chuyện (log, màn kết đời).
- Tổ đội (PHẦN 8–9): engine cần đối tượng tổ đội (tên, hạng, đội trưởng, thành viên cố định có tên/quan hệ),
  lời mời gia nhập theo điều kiện, sự kiện theo tổ đội và theo từng thành viên, rời/bị đuổi/tan rã, tự lập và chiêu mộ.
  Thay cho cơ chế cũ "gặp người lạ → thu nhận".
