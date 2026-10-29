# Prompt Gemini: kịch bản đời người — HUMAN (Con người)

**Cách dùng**
1. Mở một cuộc trò chuyện mới với Gemini. Dán **KHỐI CHUNG** trước.
2. Sau đó dán từng **PHẦN** (1 → 6), mỗi lần một phần. Đọc xong phần này mới gửi phần sau.
3. Kết quả là **kịch bản bằng chữ** để bạn đọc và sửa. Chưa cần JSON.
4. Khi bạn duyệt xong, gửi lại toàn bộ kịch bản cho Claude để chuyển thành dữ liệu game.

---

## KHỐI CHUNG (dán đầu tiên)

```
Bạn là biên kịch cho một web game chữ tiếng Việt tên "Luân Hồi Dị Giới": người chơi đầu thai
vào thế giới giả tưởng Aethelgard và sống trọn một kiếp, từ lúc sinh đến lúc chết, qua từng năm.
Lần này bạn viết kịch bản cho tộc CON NGƯỜI (Human).

=== CÁCH GAME VẬN HÀNH (để bạn viết cho khớp) ===
- Mỗi năm người chơi chọn một VIỆC CHÍNH: Rong chơi (chỉ tuổi thơ), Học hành, Khổ luyện,
  Làm lụng (làm nghề), Mạo hiểm (nhận nhiệm vụ ở Bình Minh Hội), Giao du, An dưỡng.
  Việc chính quyết định loại sự kiện xảy ra và chỉ số nào tăng.
- 4 chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn (thường 1–15).
  3 thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Thêm Danh vọng (0–100).
- NGHỀ: đến cuối tuổi thiếu niên người chơi chọn nghề. Mỗi nghề có 5 bậc. Làm lâu thì có
  cơ hội thăng bậc bằng một thử thách dựa vào chỉ số chính của nghề.
- BÌNH MINH HỘI (hội mạo hiểm giả): hạng F → E → D → C → B → A → S. Nhận nhiệm vụ từ bảng.
  Nhiệm vụ có 1 đến 5 CẢNH nối tiếp, mỗi cảnh 2–3 lựa chọn. Hoàn thành thì lên hạng dần.
- TỔ ĐỘI: tối đa 3 đồng đội có tên, nghề và một TÍNH CÁCH trong 6 loại:
  Dũng cảm, Trung thành, Tham lam, Nhút nhát, Vui tính, Lạnh lùng. Đồng đội có độ thân thiết,
  có thể bị thương, chết, bỏ đi, phản bội, hoặc trở thành bạn đời.
  Trong câu chữ, gọi đồng đội bằng {ally}.
- GIA ĐÌNH: tỏ tình → cưới → sinh con. Gọi bạn đời là {spouse}, con là {child}.
- DẤU ẤN: một lựa chọn có thể để lại dấu ấn (ví dụ "tha mạng tên cướp"). Nhiều năm sau, một
  sự kiện khác chỉ xảy ra nếu có dấu ấn đó. Đây là cách tạo HỆ QUẢ cho cuộc đời.
- Năm yên ả được gộp lại. Vì vậy mỗi sự kiện phải ĐÁNG KỂ: có biến cố, có lựa chọn, hoặc có
  một chi tiết khó quên. Không viết kiểu "một năm bình thường trôi qua".

=== GIAI ĐOẠN ĐỜI CỦA CON NGƯỜI (tuổi thọ 70–80) ===
Sơ sinh 0–3 · Thơ ấu 3–11 · Thiếu niên 11–19 · Trưởng thành 19–41 · Trung niên 41–60 · Tuổi già 60+
Tuổi thơ, thiếu niên và trưởng thành là những năm nhiều biến cố nhất: hãy viết nhiều cho các giai đoạn này.

=== THẾ GIỚI AETHELGARD ===
Lịch Kỷ Nguyên Khai Hoang. Tiền: Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana.
Vùng đất: Đồng Bằng Thánh Quang (thủ đô Sanctus, Tháp Ngà Ma Pháp), Thảo Nguyên Gió Hú,
Đại Ngàn Lục Bảo (tiên tộc), Dãy Núi Răng Cưa (người lùn), Đầm Lầy Tử Khí,
Vực Thẳm Phân Tầng (ma tộc), Đảo Tro Tàn (rồng).
Tôn giáo: Giáo hội Thánh Quang (Nữ thần Lumina), Tự Nhiên Giáo, Hắc Nguyệt Hội (tà giáo).
Tổ chức: Bình Minh Hội, Tháp Ngà Ma Pháp, Thánh Vệ Quân, Quân Đoàn Hủy Diệt (của Ma Vương),
Thương Đoàn Sói Bạc, Hội Bóng Đêm, Đấu Trường Huyết Sa, Tuần Lâm Trọng Vệ.
4 thời đại: Thời Bình, Chiến Tranh Tuyến Đầu, Kỷ Nguyên Tăm Tối (dịch bệnh, đói), Ma Vương Giáng Thế.

=== GIỌNG VĂN: EPIC RPG ===
Sử thi, trang trọng, tự sự cổ điển, ngôi thứ hai ("bạn"). Mỗi đoạn 1–2 câu. Câu sau là một hình
ảnh hoặc chi tiết định mệnh. Được phép hài hước khô khan hoặc u tối khi hợp cảnh.
Ví dụ đạt: "Một kỵ sĩ quý tộc ném găng xuống chân bạn giữa quảng trường, chỉ vì bạn không cúi chào."
Ví dụ đạt: "{ally} quỳ bên bạn suốt đêm, đôi tay phát sáng ánh thánh quang. Sáng hôm sau, bạn mở mắt."
KHÔNG dùng tên, câu chữ hay tình huống của game, truyện, phim có thật.

=== LỰA CHỌN PHẢI CÓ Ý NGHĨA ===
- Mỗi lựa chọn nên dựa vào MỘT chỉ số khác nhau, để người mạnh, người khôn, người nhanh, người
  may mắn đều có lối đi riêng.
- Có thể thêm một lựa chọn BỊ KHÓA nếu thiếu chỉ số (ví dụ "chỉ mở khi Trí tuệ từ 7").
  Người chơi vẫn thấy nó và biết mình thiếu gì.
- Luôn có ít nhất một lựa chọn an toàn hoặc hèn nhát nhưng có cái giá riêng.
- Độ khó dùng 4 mức: DỄ, VỪA, KHÓ, RẤT KHÓ.
- Hệ quả ghi rõ con số: Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +3,
  Thân thiết với {ally} +10, dấu ấn "ten_dau_an". Nếu chết thì ghi CHẾT và viết câu mô tả cái chết.

=== MẪU TRÌNH BÀY (dùng đúng mẫu này cho mọi sự kiện) ===

### [MÃ] Tên ngắn
- **Khi nào:** giai đoạn · việc chính · nghề và bậc (nếu có) · điều kiện khác (chỉ số, dấu ấn, có tổ đội...)
- **Tình huống:** 1–2 câu.
- **A. "Nhãn lựa chọn"** — dựa vào [chỉ số], [độ khó]
  - Thành công: 1–2 câu. → hệ quả
  - Thất bại: 1–2 câu. → hệ quả
- **B. "Nhãn lựa chọn"** — (không tung xúc xắc) 1–2 câu. → hệ quả
- **C. "Nhãn lựa chọn"** — KHÓA nếu Trí tuệ dưới 7 — 1–2 câu. → hệ quả
- **Khoảnh khắc:** (tùy chọn) một dòng ngắn ghi vào tổng kết cuộc đời.

Sự kiện KHÔNG có lựa chọn thì chỉ cần: Khi nào, Tình huống, Hệ quả.
MÃ viết thường, không dấu, ví dụ h_warrior_duel, h_quest_bandit_king_2.

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
```

---

## PHẦN 1 — Bảy nghề và thử thách thăng bậc

```
PHẦN 1: Viết hồ sơ cho 7 nghề của Con người, rồi viết sự kiện nghề.

7 nghề: Kiếm sĩ (Sức mạnh), Pháp sư (Trí tuệ), Thích khách (Nhanh nhẹn), Giáo sĩ (Trí tuệ,
có thể cứu đồng đội), Thợ rèn (Sức mạnh), Thương nhân (Trí tuệ, cần vốn), Nông dân (không cần gì).
Bạn được đề xuất thêm 1 nghề thứ 8 hợp với Con người (ví dụ Thợ săn, Du ca, Thủy thủ) nếu thấy hay.

Với MỖI nghề, viết:
1. Điều kiện vào nghề (chỉ số tối thiểu) và một lối vào phụ cho người có xuất thân đặc biệt.
2. Tên 5 bậc, từ thấp đến cao.
3. Câu mở đầu khi bước vào nghề (1–2 câu).
4. 4 thử thách thăng bậc (bậc 1→2, 2→3, 3→4, 4→5): mỗi cái 1–2 câu, độ khó tăng dần.
5. 3 câu "năm yên ả" mô tả nhiều năm làm nghề trôi qua (không có biến cố).
6. 6 SỰ KIỆN NGHỀ theo mẫu: ít nhất 4 sự kiện có lựa chọn; trải đều các bậc
   (2 sự kiện cho người mới vào nghề, 2 cho bậc giữa, 2 cho bậc cao).
   Ít nhất 1 sự kiện có thể khiến mất nghề (bị đuổi, phá sản, bỏ đạo...).
   Ít nhất 1 sự kiện chỉ xảy ra trong thời đại Chiến Tranh hoặc Ma Vương.
```

## PHẦN 2 — Sự kiện theo việc chính

```
PHẦN 2: Sự kiện theo VIỆC CHÍNH của năm. Mỗi việc chính viết số sự kiện như sau, ít nhất một nửa có lựa chọn:
- Rong chơi (Thơ ấu): 6
- Học hành (Thơ ấu → Tuổi già, chia đều): 6
- Khổ luyện (Thiếu niên → Trung niên): 6
- Làm lụng khi CHƯA có nghề (Thơ ấu, Thiếu niên, phụ giúp gia đình, làm thuê): 5
- Mạo hiểm (sự kiện dọc đường, KHÔNG phải nhiệm vụ trên bảng): 6
- Giao du: 6
- An dưỡng: 4

Với mỗi việc chính, viết thêm 3 câu "năm yên ả" cho từng giai đoạn phù hợp
(ví dụ Học hành: 3 câu cho Thơ ấu, 3 cho Thiếu niên, 3 cho Trưởng thành trở đi).
```

## PHẦN 3 — Nhiệm vụ Bình Minh Hội

```
PHẦN 3: Nhiệm vụ trên bảng của Bình Minh Hội. Mỗi nhiệm vụ gồm: tên, hạng tối thiểu, một gợi ý
ngắn hiện trên bảng (ví dụ "Vừa. Hay có bẫy"), đoạn mở đầu, các CẢNH, đoạn kết khi hoàn thành,
phần thưởng (Tài sản, Danh vọng, điểm Hội) và khoảnh khắc.

Mỗi CẢNH viết theo mẫu sự kiện (tình huống + 2–3 lựa chọn). Ghi rõ lựa chọn nào khiến nhiệm vụ
THẤT BẠI NGAY, lựa chọn nào THẮNG NGAY (bỏ qua các cảnh sau), và lựa chọn nào gây CHẾT.

a) 8 VIỆC VẶT lặp lại được, 1–2 cảnh, rải từ hạng F đến C
   (khác với: diệt chuột cống, hái Nguyệt Quang Thảo, hộ tống đoàn buôn, quét ổ yêu tinh, truy nã cướp).
b) 6 NHIỆM VỤ CỐT TRUYỆN chỉ làm một lần, 3–5 cảnh, mỗi cái một hạng: E, D, C, B, A, S.
   Nhiệm vụ hạng S phải mang tầm vóc huyền thoại (ví dụ đối đầu tướng của Ma Vương).
   Ít nhất 2 nhiệm vụ để lại DẤU ẤN mà sự kiện ở PHẦN 6 sẽ dùng lại.
c) 2 nhiệm vụ chỉ xuất hiện trong thời đại cụ thể (một cho Kỷ Nguyên Tăm Tối, một cho Ma Vương Giáng Thế).
```

## PHẦN 4 — Tổ đội

```
PHẦN 4: Sự kiện TỔ ĐỘI. Dùng {ally} để gọi đồng đội.
a) Với mỗi tính cách (Dũng cảm, Trung thành, Tham lam, Nhút nhát, Vui tính, Lạnh lùng):
   2 sự kiện riêng. Tính cách phải thể hiện rõ trong tình huống.
b) 6 sự kiện chung cho mọi tổ đội: cãi vã, cứu nhau, chia chiến lợi phẩm, một đồng đội muốn
   giải nghệ, một đồng đội bị nguyền, một bí mật quá khứ của đồng đội bị lộ.
c) 3 sự kiện TÌNH CẢM: đồng đội thân thiết trở thành người yêu.
d) 4 câu khi đồng đội CHẾT, 4 câu khi đồng đội BỊ THƯƠNG, 4 câu khi đồng đội BỎ ĐI.
```

## PHẦN 5 — Tình duyên, gia đình, tuổi già

```
PHẦN 5: Gia đình và cuối đời.
a) 4 cảnh gặp gỡ người lạ dẫn đến tỏ tình (lễ hội, chợ, chiến trường, đền thờ...),
   mỗi cảnh có câu đồng ý và câu từ chối.
b) 8 sự kiện đời sống vợ chồng: hạnh phúc, cãi vã, ngoại tình, {spouse} lâm bệnh,
   {spouse} qua đời...
c) 8 sự kiện về con cái {child}: con tập đi, con hỏi về thế giới, con bỏ nhà đi mạo hiểm,
   con nối nghề, con phản bội, con đưa cháu về...
d) 6 sự kiện Tuổi già: truyền nghề, nhìn lại đời, một kẻ thù cũ tìm đến, lập di chúc...
```

## PHẦN 6 — Chuỗi hệ quả

```
PHẦN 6: 8 CHUỖI HỆ QUẢ, mỗi chuỗi 2–3 sự kiện cách nhau nhiều năm.
- Sự kiện đầu (thường ở Thơ ấu hoặc Thiếu niên) để lại một DẤU ẤN.
- Sự kiện sau (Trưởng thành hoặc Trung niên) CHỈ xảy ra nếu có dấu ấn đó, và kết quả khác nhau
  tùy lựa chọn năm xưa.
Ví dụ: tha cho một tên trộm nhỏ năm 12 tuổi → 20 năm sau hắn là thủ lĩnh Hội Bóng Đêm và trả ơn.
Ít nhất 2 chuỗi dùng dấu ấn từ nhiệm vụ ở PHẦN 3.
Ghi tên dấu ấn rõ ràng, ví dụ dấu ấn "tha_ten_trom".
```
