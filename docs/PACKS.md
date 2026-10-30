# Từ kịch bản Gemini đến dữ liệu game

1. Bạn chạy prompt `prompts/v2/<tộc>.md` với Gemini, đọc và sửa kịch bản.
2. Lưu kịch bản đã duyệt vào `content/scripts/<tộc>.txt`.
3. Claude viết `content/packs/<tộc>.meta.js`: tên gọi kiểu manga (theo `docs/NAMING.md`), vai trò, tổ chức,
   tên việc chính, câu chữ riêng, và những điều kiện kịch bản chỉ nói bằng lời.
4. `node tools/build-pack.js <tộc> --report` đọc kịch bản (`tools/script-parse.js`) và tạo `data/packs/<tộc>.json`.
   `--report` in điều kiện của từng sự kiện để rà.
5. `npm test`: dựng gói, kiểm tra dữ liệu, mô phỏng hàng nghìn kiếp, build.

Gói tộc mang theo: xuất thân kèm cha mẹ, vai trò (nghề), tổ chức với các bậc (Guild, bộ lạc...), nhiệm vụ / cướp phá
nhiều cảnh có rẽ nhánh, sự kiện, cái chết riêng, tên và câu "năm yên ả" của việc chính, câu chữ cho đồng đội.

## Tùy chọn trong `<tộc>.meta.js` (ngoài tên gọi, vai trò, tổ chức, tiến hóa)
- `useScriptStages: true`: dùng mốc tuổi của kịch bản (hồ sơ `content/races/<tộc>.json`) thay cho mốc mặc định.
- `lifespan`, `hazard`, `tags`, `yearScale`: tuổi thọ, rủi ro chết mỗi năm, nhãn tộc (bỏ `civil` để không lẫn nghề/Guild
  của Human), số năm thật cho một "năm tiến bộ" (High Demon: 100).
- `noChildhood: true`: tộc không sinh ra là em bé (Vampire vừa bị biến đổi, High Demon, Ghoul) — bỏ sự kiện tuổi thơ chung.
- `defaultStages`: giai đoạn cho sự kiện kịch bản không ghi giai đoạn (Dragon: bỏ thời còn là trứng).
- `parents: { <xuất thân>: { maker: {...} } }`: cha mẹ / kẻ tạo ra bạn khi kịch bản tả bằng văn xuôi.
  `status: "none"` khi đó không phải người (tà khí, Lõi Mana hầm ngục).
- `systems.jobFrom`, `systems.activeFrom`: giai đoạn bắt đầu chọn vai trò; bắt đầu nhận nhiệm vụ / tuyển đồng đội.
- `systems.autoChildren`, `childStages`, `childRate`, `maxChildren`, `child`: con cái tự đến khi kịch bản có sự kiện về con
  nhưng không có sự kiện sinh con.
- `overrides.<id>`: `require`, `unrequire`, `stages`, `focus`, `asDeath`, `keep` (không coi là cái chết),
  `choiceEffects` (thêm hiệu ứng), `choicePatch` (thay / xóa trường của lựa chọn).

## Builder tự hiểu thêm
- "Thành công (Nếu có "x")", "Hệ quả (Nếu có "x")": tách thành nhánh chỉ hiện khi có dấu ấn đó.
- "Cần dấu ấn: "x"": lựa chọn bị khóa (vẫn hiện) khi chưa có dấu ấn.
- "Thuộc chuỗi …": cần một trong các dấu ấn mà sự kiện ngay trước trao.
- "thăng bậc Ma Vương (Demon King)": quy ra đúng bậc của tổ chức, khớp cả tên Việt lẫn tên Anh.
- "Thăng bậc +N" không vượt qua bậc chỉ đạt được bằng sự kiện (Goblin King, Chân Tổ...).
- Sự kiện cưới thành công tự cho bạn đời; sự kiện `_ally_` luôn cần có đồng đội.

## Tầng chủng tộc (`tier` trong meta)
| Tầng | Tộc | Tuổi thọ | Tiến hóa (mô phỏng chơi ngẫu nhiên) |
|---|---|---|---|
| `low` — ma vật cấp thấp, ít trí tuệ | Slime, Goblin, Kobold, Ghoul, Troll | ngắn, rủi ro cao, chỉ ~15–35% chết già | ~0,5–1,5% số đời |
| `mid` — ma vật có bầy đàn / bộ lạc | Orc, Minotaur, Imp, Lizardman | trung bình | ~1,5–5% |
| (không ghi) — có trí tuệ, chọn nghề | Human, Elf, Dwarf, Beastman, Demon, Vampire, High Demon, Dragon | theo kịch bản | dễ hơn hẳn (Vampire, Dragon ~12%) |

- Tầng `low`: nghi thức tiến hóa khó hơn 2 bậc (Sức khỏe/Tài sản… +10); `mid`: khó hơn 1 bậc (+5).
- Ngưỡng ở sự kiện báo hiệu đặt ở mức top ~10% chỉ số của tộc ở tuổi đó, thường kèm danh vọng / bậc nghề / dấu ấn.
- Ma vật cấp thấp sống ngắn; tiến hóa mới mở ra tuổi thọ dài (Slime King +400 năm, Lich +1.500 năm),
  nên các giai đoạn muộn trong kịch bản (Slime 200+, Ghoul chúa 301+) chỉ dành cho kẻ đã tiến hóa.
- Đo bằng: `node tools/evo-report.js <tộc...>` hoặc `tools/simulate.js`.
