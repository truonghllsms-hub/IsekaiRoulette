# Đa dạng nghề, lời dẫn chọn nghề và cái kết

Mục tiêu: hai đời cùng tộc, cùng nghề không đọc giống nhau. Nội dung nằm ở
`content/career-variety-<tộc>.js` (Human, Beastman, Elf, Demon, Dwarf) và
`content/endings.js`; `content/career-variety.js` gắn chúng vào dữ liệu khi tải.

## Mỗi nghề có gì

| Trường | Ý nghĩa |
|---|---|
| `start` | Thêm cách bước vào nghề. Khi chọn nghề, engine bốc một trong các lời này (`startAlt`). |
| `promo` | Bài thi thăng bậc thay thế cho bốn bậc. Nghề đã có bài thi riêng thì giữ cả hai; nghề chỉ có lời chung (thủ công, thương mại, nghề ngầm, tộc trường thọ) thì dùng lời mới. Mỗi đời gặp một bài cho mỗi bậc và giữ nguyên khi thi lại (`c.promoPick`). |
| `arcs` | Nhiệm vụ nghề thứ hai cho mốc bậc 2 và bậc 4, id `career_<nghề>_r2b` / `_r4b`, `career.alt: true`. Mỗi đời chỉ được mời **một** trong hai nhiệm vụ của mỗi mốc (`c.careerPick`); làm xong một cái thì cái kia không xuất hiện. Số lần làm nhiệm vụ nghề vẫn là hai lần mỗi đời. |
| `events` | Sự kiện ngẫu nhiên theo nghề, id `jx_<nghề>_<n>`, mở từ bậc thấp để lấp khoảng giữa các lần thăng bậc. |
| `quiet` | Thêm câu “năm yên ả” cho tộc sống lâu. |

Một sự kiện viết gọn: `{ r:[bậc tối thiểu, tối đa], t: lời dẫn, a:[nhãn, chỉ số, độ khó, thành công, thất bại, hiệu ứng thắng, hiệu ứng thua], b:[nhãn, kết quả, hiệu ứng] }`.
Không đặt tên riêng cho NPC trong các sự kiện này (chưa có khai báo `npcs`).

Lựa chọn trong ba chặng nhiệm vụ nghề được viết theo chỉ số chính của nghề
(`WORDS` trong `content/career-variety.js`: STR, INT, AGI, LUCK) thay cho một bộ
lời dùng chung cho mọi nghề.

## Lời dẫn đến lúc chọn nghề

`lead.teen`, `lead.adult` là lời dẫn riêng của tộc; `lead.origins` là lời dẫn
riêng cho từng xuất thân. Khi có lời theo xuất thân, engine dùng nó 60% số lần,
còn lại dùng lời chung của tộc.

## Cái chết và dòng kết trên Thẻ Cuộc Đời

`content/endings.js` thêm cái chết kể theo hoàn cảnh lúc cuối đời. Mỗi dòng là
`[loại, when, lời]`, loại gồm `o` (già), `h` (sức khỏe), `v` (bạo lực). Khóa `when`:
`frail` (đã qua 3/4 tuổi thọ), `prime`, `poor`, `rich`, `sad`, `glad`, `work`,
`adventure`, `rest`, `spouse`, `children`, `alone`, `party`, `famous`, `captive`,
`free`. Mỗi nghề của năm tộc chính có một dòng kết riêng cho người chết già trong
nghề (`byJob`, cần bậc 2 trở lên). Khi có dòng hợp hoàn cảnh, engine dùng nó 70%
số lần. Elf và Demon vẫn chết vì cạn ma lực, không vì cảm sốt.

Dòng kết (`epitaphs`) nhận thêm `when`: `old`, `violent`, `rich`, `poor`, `famous`,
`unknown`, `master`, `jobless`, `party`, `glad`, `sad`; có thể ghép nhiều khóa.

Kiểm tra: `node tools/test-variety.js`.
