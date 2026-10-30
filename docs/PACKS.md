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
