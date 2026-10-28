# Việc chuẩn bị Gemini cần làm (trước khi viết sự kiện)

> Game là **web game** (xem PLAN.md). Mọi sự kiện Gemini viết phải theo `docs/EVENT_SCHEMA.md`.
> Claude gửi prompt bằng `tools/ask-gemini.ps1`, kiểm tra bằng `node tools/validate.js`,
> rồi chuyển nội dung đạt yêu cầu từ `content/` vào `data/`.
> Làm trước 3 tộc mẫu (Human, Goblin, Slime), xong mới mở rộng sang 14 tộc còn lại.

Mục tiêu: có đủ "nền móng nội dung" để mọi sự kiện sau này viết thống nhất.
Gemini chỉ viết nội dung (JSON / văn bản). Claude kiểm tra, cân bằng số liệu và ghép vào game.
Phong cách: nhịp sống từng năm, câu ngắn, ngôi thứ hai, thỉnh thoảng có lựa chọn lớn —
cùng thể loại với 1in8b nhưng mọi câu chữ phải là nội dung mới, không chép của game đó.

## Thứ tự

| # | Việc | Phụ thuộc | Ai duyệt |
|---|---|---|---|
| G1 | 3 mẫu giọng văn | — | **Bạn chọn 1** |
| G2 | Bối cảnh thế giới | — | Claude |
| G3 | Hồ sơ 17 tộc | G2 | Claude |
| G4 | Giai đoạn đời theo tộc | G3 | Claude (chỉnh số) |
| G5 | Hoàn cảnh xuất thân | G2, G3 | Claude |
| G6 | Danh sách tên | G3 | Claude |
| G7 | Cảnh lựa chọn lớn | G1, G4 | Bạn xem mẫu, Claude duyệt |
| G8 | Danh mục cái chết + văn bia | G1, G3 | Claude |

G1 và G2 chạy ngay song song. Chỉ khi G1 được bạn chọn, Gemini mới viết các việc có câu chữ (G7, G8).

---

## G1 — 3 mẫu giọng văn

> Viết cùng 1 đoạn đời (một Goblin từ lúc sinh đến 3 tuổi, mỗi năm 1–2 câu, có 1 lựa chọn A/B)
> theo 3 giọng: (a) điềm tĩnh, hơi buồn, câu rất ngắn; (b) hài hước khô khan; (c) u tối, tàn khốc.
> Ngôi thứ hai ("bạn"). Tiếng Việt. Không dùng tên riêng của game có thật.

Đầu ra: `content/style_samples.md` → bạn chọn → Claude viết `content/STYLE_GUIDE.md`.

## G2 — Bối cảnh thế giới

> Tạo bối cảnh cho một thế giới isekai: tên thế giới, 6–8 vùng/quốc gia (mỗi vùng: khí hậu,
> tộc chiếm đa số, chế độ, mức nguy hiểm 1–5), 3 tôn giáo, đơn vị tiền tệ, lịch (năm, mùa),
> các tổ chức (hội mạo hiểm giả, học viện ma pháp, giáo hội, quân đội ma vương...).
> Trả về JSON đúng schema: { "world": {...}, "regions": [...], "religions": [...], "currency": {...}, "factions": [...] }

Đầu ra: `content/world.json`

## G3 — Hồ sơ 17 tộc

> Với mỗi tộc trong danh sách [Human, Beastman, Dwarf, Demon, Elf, Goblin, Slime, Kobold,
> Lizardman, Vampire, Imp, Orc, Minotaur, Troll, Ghoul, Dragon, High Demon], viết:
> mô tả 2 câu, vùng sinh sống (lấy từ world.json), cấu trúc xã hội, thái độ của nhân loại với tộc này,
> 3 điểm mạnh, 3 điểm yếu, 3 "khoảnh khắc đặc trưng" chỉ tộc đó mới có (vd. Slime: hấp thụ, phân bào),
> và đề xuất hệ số STR/INT/AGI/LUCK (0.3–2.0). Trả về JSON mảng, mỗi phần tử có "id" viết thường.

Đầu ra: `content/races_lore.json`. Claude giữ quyền chốt hệ số cuối cùng sau khi mô phỏng.

## G4 — Giai đoạn đời theo tộc

Tộc sống 15 năm và tộc sống hàng vạn năm không thể dùng chung mốc tuổi.

> Với mỗi tộc, chia đời thành các giai đoạn: sơ sinh, thơ ấu, thiếu niên, trưởng thành, trung niên, già
> (tộc bất tử: thay "già" bằng giai đoạn riêng, vd. Dragon: "ngủ đông", Vampire: "cổ huyết").
> Mỗi giai đoạn: tuổi bắt đầu (năm thực), 1 câu mô tả, các chủ đề sự kiện nên có.

Đầu ra: `content/life_stages.json`. Claude dùng nó để quyết định nhịp thời gian
(tộc sống lâu sẽ tua theo thập kỷ/thế kỷ ở giai đoạn dài).

## G5 — Hoàn cảnh xuất thân

Tương đương việc 1in8b bốc ngẫu nhiên quốc gia theo thống kê.

> Mỗi tộc 5–8 hoàn cảnh sinh ra (vùng, gia cảnh, địa vị), mỗi hoàn cảnh có "weight", 1 câu mở đầu,
> và chỉ số khởi đầu cộng/trừ (vd. "con quý tộc": LUCK+2, "sinh trong hầm ngục": STR+1, LUCK-2).

Đầu ra: `content/origins.json`

## G6 — Danh sách tên

> Mỗi tộc: 30 tên (chia giới tính nếu tộc có giới tính; Slime/Ghoul dùng biệt danh), 15 họ hoặc tên bộ lạc,
> phù hợp âm hưởng của tộc.

Đầu ra: `content/names.json`

## G7 — Cảnh lựa chọn lớn

Các bước ngoặt đời người: học hành, nghề nghiệp, tình yêu, gia đình, di cư, bệnh tật, chiến tranh.

> Viết 40 cảnh lựa chọn dùng chung + mỗi tộc 3 cảnh riêng. Mỗi cảnh: giai đoạn đời, điều kiện (tộc, chỉ số),
> đoạn dẫn 1–2 câu, 2–3 lựa chọn, mỗi lựa chọn có kết quả 1 câu và hiệu ứng chỉ số/cờ (flag).
> Theo đúng STYLE_GUIDE.md và schema event của Claude.

Đầu ra: `content/choices/*.json`

## G8 — Cái chết và văn bia

> Mỗi tộc 8–12 cách chết (tuổi già, bệnh, bị giết, tai nạn, nguyên nhân đặc trưng tộc),
> mỗi cách có điều kiện và 1 câu mô tả. Thêm 30 mẫu "văn bia" tổng kết cuộc đời theo kiểu
> "Bạn là 1 trong {N} linh hồn đầu thai làm {race} năm đó..."

Đầu ra: `content/deaths.json`, `content/epitaphs.json`

---

## Quy tắc chung cho mọi prompt gửi Gemini
- Chỉ trả về JSON hợp lệ (trừ G1), không kèm giải thích.
- Mỗi lần tối đa ~20 mục để tránh bị cắt và giới hạn của gói miễn phí.
- `id` viết thường, không dấu, có tiền tố theo tộc/giai đoạn.
- Claude chạy kiểm tra schema; sai thì gửi lại kèm danh sách lỗi (tối đa 2 lần), sau đó Claude tự sửa.
