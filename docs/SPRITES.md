# Ảnh từ PDF gốc

69 bộ nhân vật, 1.588 khung từ 64 trang ảnh của 5 PDF người dùng cung cấp.
Giữ độ phân giải gốc, tách nền sang alpha, xuất WebP lossless; không thu nhỏ về
96px, giảm bảng màu hoặc vẽ lại. Giữ màu RGB gốc ở mọi pixel còn hiển thị.
Khung giao diện tính theo cả chiều rộng và chiều cao để chứa đủ vũ khí, cánh,
đuôi. Chân dung nhân vật chính không có thao tác phóng to. Tên thành viên trong
hồ sơ tổ đội mở ảnh minh họa từ atlas theo tộc, giới tính và nghề/bậc. Loài không
có ảnh phù hợp trong bộ gốc hiển thị thông báo, không gán bừa hình loài khác.
Có giao diện sáng/tối và giảm chuyển động.

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

## Rà chữ và phục hồi chi tiết lần hai

Đã rà toàn bộ 1.588 khung bằng bảng ảnh trên nền sáng/tối, kết hợp OCR phóng lớn.
Đợt sửa có **38 khung trong 17 atlas**: 15 khung nhãn chữ, 12 khung lọt mảnh hình
của ô bên cạnh và 11 khung bị bộ lọc nền/chữ cũ xóa nhầm chi tiết. Ví dụ: các nhãn
“Cuồng chiến”, “Đạo tặc”, “Tuổi (44+)”, “KHÔNG”, “Tiến”, số trang 24 và chữ dưới
chân ảnh Dwarf; các dải trên mặt/mũ, pháp trượng, vạt áo và thú đi cùng Beastman.

`tools/sprite-overlay-fixes.json` lưu vùng đã kiểm tra theo tọa độ JPEG nguồn.
`tools/sprite-repairs/*.png` chỉ chứa pixel gốc cần phục hồi cùng alpha, không
chứa một hình minh họa thay thế. Các điểm này có tọa độ nguồn riêng, nên atlas có
thể đóng gói lại mà bản vá vẫn đặt đúng chỗ. Không dùng kết quả OCR mới để tự động
xóa một hình chữ nhật xuyên qua nhân vật.

`clean-sprite-labels.py` áp dụng các vùng sửa sau lớp lọc cũ, giữ bản phục hồi làm
kết quả cuối. Có thể áp dụng lại trên atlas hiện tại bằng:

```sh
python3 tools/fix-reviewed-sprite-overlays.py
python3 tools/validate-sprites.py --originals /duong/dan/source-sheets
node tools/build.js
node tools/bundle.js
```

Validator kiểm tra vùng nhãn đã xóa không trở lại và từng pixel phục hồi còn đúng
màu/alpha, ngoài kiểm tra tọa độ của toàn bộ khung. Kiểm tra với nguồn đã đối chiếu
64 mã băm JPEG và mọi pixel RGB còn hiển thị. Bản làm sạch cũng đã được chạy lại
trên bản sao atlas để xác nhận không xóa mất các chi tiết phục hồi.

Build gắn SHA-256 rút gọn vào URL từng atlas (`?v=...`). Khi ảnh thay đổi, URL đổi
theo để trình duyệt tải đúng ảnh mới dù tên tệp giữ nguyên. Mỗi URL đã được kiểm
tra trong trình duyệt với byte ảnh tải về và kích thước trong atlas.

## Vùng hiển thị cho giao diện cổ thư

`img/presentation.json` lưu vùng toàn hình và vùng chân dung của 1.588 khung.
`tools/build-presentation.py` chỉ đọc alpha và ghi JSON; không ghi lại tệp ảnh.
Hình thái khó cắt an toàn được giữ toàn hình, gồm sừng/cánh lớn, Rồng, Slime,
quái vật, trẻ nhỏ và tiến hóa. Khung người có vùng chân dung dựa trên vị trí
khối thân, tránh lấy ngọn vũ khí cao làm tâm khuôn mặt.

`tools/presentation-overrides.json` chứa các khung cần canh tay. Hai khung
Troll nữ dùng cửa sổ hiển thị hẹp hơn để bỏ mảnh cột/chữ tách rời ở phía trái.
Tọa độ đều nằm trong khung atlas gốc. Khi chỉnh, cần xem cả toàn thân lẫn hồ sơ
nhỏ; không bỏ vũ khí, sừng, tai hoặc cánh thuộc về nhân vật.

`presentation.js` tính tỷ lệ đồng nhất theo kích thước khung thật. Vùng chân dung
phóng tối đa 1,8 lần, toàn hình tối đa 2,4 lần; phần nền giấy lấp khoảng trống.
Không kéo giãn ngang/dọc, không dùng filter đổi màu nhân vật. UI chờ giải mã ảnh
và tính lại vị trí khi hộp thoại hoặc kích thước màn hình thay đổi.

Sau khi thay đổi atlas:

```sh
python3 tools/build-presentation.py
npm run build
node tools/bundle.js
node tools/test-presentation.js
```

Build kiểm tra SHA-256 của mỗi atlas với metadata và dừng khi vùng hiển thị đã
lỗi thời. Game chạy từ ZIP vẫn chỉ cần trình duyệt; Python/Pillow/NumPy phục vụ
bước tạo lại metadata trong môi trường phát triển.
