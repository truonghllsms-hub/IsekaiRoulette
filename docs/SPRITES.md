# Ảnh từ PDF gốc

69 bộ nhân vật, 1.588 khung từ 64 trang ảnh của 5 PDF người dùng cung cấp.
Giữ độ phân giải gốc, tách nền sang alpha, xuất WebP lossless; không thu nhỏ về
96px, giảm bảng màu hoặc vẽ lại. Giữ màu RGB gốc ở mọi pixel còn hiển thị.
Khung giao diện tính theo cả chiều rộng và chiều cao để chứa đủ vũ khí, cánh,
đuôi; bấm chân dung để phóng lớn. Có giao diện sáng/tối và giảm chuyển động.

## Tạo lại ảnh

Cài Python với Pillow, PyMuPDF, NumPy và SciPy, rồi chạy:

```sh
python3 tools/import-original-sheets.py --human human.pdf --beastman beastman.pdf \
  --dwarf dwarf.pdf --elf elf.pdf --monsters monsters.pdf --transparent
python3 tools/clean-sprite-labels.py
python3 tools/validate-sprites.py --originals img/source-sheets
npm run build
node tools/bundle.js
```

`atlas.json` chứa đường dẫn và khung hiển thị. `source-sheets.json` ghi PDF,
trang, kích thước và SHA-256 ảnh gốc; `sprite-provenance.json` ghi vùng nguồn.
Ảnh JPEG nguồn chỉ dùng kiểm tra, được bỏ qua bởi Git; không cần để chạy game.
Các PDF nguồn vẫn do người dùng giữ. Khi không có nguồn, `npm run validate:sprites`
kiểm tra đầy đủ khung, kích thước, alpha và đường dẫn tài nguyên.

`tools/sprite-labels.json` lưu tọa độ chữ in từ các trang nguồn; công cụ làm sạch
chỉ xóa alpha ở những vùng này, không vẽ lại hình.

Kiểm tra có nguồn còn đối chiếu mã băm 64 JPEG và RGB của từng pixel hiển thị.
Kiểm tra pixel không thay thế việc rà hình trực quan: vùng alpha cần được xem
trên cả nền sáng và tối để nhận ra viền nền hay chi tiết bị mất.
