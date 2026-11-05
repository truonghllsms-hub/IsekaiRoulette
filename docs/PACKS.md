# Từ kịch bản Gemini đến dữ liệu game

1. Bạn chạy prompt `prompts/v2/<tộc>.md` với Gemini, đọc và sửa kịch bản.
2. Lưu kịch bản đã duyệt vào `content/scripts/<tộc>.txt`.
3. Claude viết `content/packs/<tộc>.meta.js`: tên gọi kiểu manga (theo `docs/NAMING.md`), vai trò, tổ chức,
   tên việc chính, câu chữ riêng, và những điều kiện kịch bản chỉ nói bằng lời.
4. `node tools/build-pack.js <tộc> --report` đọc kịch bản (`tools/script-parse.js`) và tạo `data/packs/<tộc>.json`.
   `--report` in điều kiện của từng sự kiện để rà.
5. `npm test`: dựng gói, kiểm tra dữ liệu, mô phỏng hàng nghìn kiếp, build.

`npm run test:stories` dựng lại các gói và kiểm tra các nhánh nhân quả qua engine: dấu ấn nối chuỗi,
kết cục sống/chết, lựa chọn chỉ còn một nhánh hợp lệ và điều kiện người thân/thuộc hạ.
Sau khi sửa kịch bản, chạy `npm run build` để cập nhật dữ liệu dùng bởi `index.html`.

`npm run simulate:ratings -- 300 12345` đo phân phối Hạng S/A/B/C trên 300 vòng đời,
với seed cố định và tỉ lệ đầu thai thật. Bot chọn ngẫu nhiên trong các lựa chọn mở;
kết quả này không đại diện cho chiến thuật tối ưu hay tỉ lệ của người chơi thực tế.

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
