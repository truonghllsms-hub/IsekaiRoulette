# Trường thọ, kỷ nguyên và gia đình

`data/chronology.json` điều khiển nhịp thời gian. Mỗi lần Tiếp tục xử lý tối đa
một nhịp đối với các tộc sau; các cảnh đang mở có thể không tăng tuổi.

| Tộc | Nhịp trưởng thành |
|---|---|
| Dwarf | 5–10 năm |
| Demon, Elf | 5–20 năm |
| Dragon, High Demon, Vampire | 50–200 năm |

Tuổi nhỏ của nhóm nhân hình vẫn dùng nhịp tối đa ba năm. Mốc chuyển giai đoạn,
tuổi già/qua đời của người thân, hạn sống đồng đội và ngày nở trứng có thể chia
nhịp ngắn hơn để không bỏ qua chúng. Giới hạn tuổi thọ tự nhiên không thay đổi.
Nhịp sắp tới xuất hiện trong hồ sơ. Thời gian kể trong câu đệm dùng số năm thực;
lời dẫn Elf bị gắn cứng “nửa ngàn năm sau” đã đổi sang câu không ấn định thời gian.

## Đạo thống và di sản

`content/long-lives.js` cung cấp nội dung riêng cho 35 nghề thuộc sáu tộc trên:
24 nhánh di sản nhân hình và 11 đạo thống cổ tộc. Các nhánh này không dùng
`commerce`/`craft` hoặc thương vụ gia vị của người phàm. Rune Dwarf, bí thuật
Ma tộc và mạch sống Yggdrasil có công trình, xung đột và thăng tiến riêng.
Cổ tộc không nhận thu nhập tiền công từ nghề hoặc focus làm việc; tài nguyên
đến từ lựa chọn như cống nạp, lãnh địa, khế ước và quyền năng.

`content/epoch-events.js` thêm 50 biến cố có thể tái diễn:

- 36 biến cố Dragon/High Demon/Vampire theo ba đạo Thống Trị, Thiên Tai,
  Khởi Nguyên; mỗi biến cố có ba lời dẫn và thời gian chờ 300 năm.
- 12 biến cố chuyển giao thế hệ của Dwarf/Demon/Elf, chờ 60 năm.
- Một biến cố kết đôi/ấp trứng Rồng và một biến cố tạo phân thân High Demon.

Nghề quyết định đạo thống tương ứng; nhân vật chưa chọn đạo có thể gặp các
nhánh. Lựa chọn thay đổi sức khỏe, tài nguyên, danh vọng và các dấu ấn lưu trong
`c.epoch`: lãnh địa, ngộ đạo, di sản, tàn phá (0–100). Engine ghi ba cảnh gần nhất
và thời điểm từng cảnh để tránh lặp ngay. Khi một nhịp cổ tộc không còn tạo nội
dung, engine thử một biến cố kỷ nguyên khả dụng thay cho câu đệm. Các truyện
gốc vẫn được giữ; đây không phải bản viết lại toàn bộ nội dung các pack.

## Tuổi thọ người thân

Bạn đời có chủng tộc riêng, tuổi khi kết duyên, tuổi hiện tại, tuổi thọ và mốc
qua đời. Tuổi già được báo trước; một lần mất người thân dừng gộp thời gian.
Bạn đời vốn là đồng đội giữ hạn sống đã biết thay vì nhận lại tuổi thọ mới.
Đồng đội cùng tên cũng được cập nhật qua đời để không xuất hiện hai trạng thái.

Con có năm sinh và tuổi thọ riêng. Các biến cố con nhỏ/thiếu niên/trưởng thành
kiểm tra tuổi theo tộc của người con, có cả giới hạn trên. Người đã mất chuyển
sang `familyHistory`; hồ sơ và thẻ tổng kết giữ dấu vết gia đình. Câu chia ly
Ghoul/Slime dùng hình thái tương ứng.

Quy ước hiện tại cho con lai là tuổi thọ của tộc cha/mẹ ngắn ngày hơn. Trứng
Rồng cần 200 năm để nở, chưa tham gia các biến cố trẻ nhỏ khi còn là trứng.
High Demon tạo phân thân có tuổi thọ riêng bằng khế ước, không dùng lời sinh nở
hoặc tập đi của em bé.

Bản lưu cũ được bổ sung lịch khi tiếp tục hoặc chọn hành động. Engine dùng
năm kết hôn/năm sinh đã lưu; con thiếu tộc được đối chiếu với bạn đời hoặc lịch
hôn nhân cũ. Nếu thiếu toàn bộ thông tin tộc, dùng tộc nhân vật chính; không suy
đoán từ tên. Người đã quá hạn sống được ghi nhận một lần, không hồi sinh khi tải.

Kiểm tra: `node tools/test-long-lives.js` và `npm test`.

## Cống hiến và xếp hạng

Chỉ Dragon/High Demon/Vampire cộng `domain + insight + legacy` thành cống hiến
kỷ nguyên; `ruin` không cộng. Tổng này đem lại tối đa 10 điểm xếp hạng
(`min(10, tổng / 2)`), mở điều kiện chiến tích A từ 6, S từ 12. Vẫn phải đạt
ngưỡng tổng điểm 72/90; không có cơ chế tự phong S chỉ vì sống lâu. Xem
[Xếp hạng](RATINGS.md).
