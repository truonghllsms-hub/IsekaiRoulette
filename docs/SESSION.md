# Lưu và tiếp tục hành trình

Game tự lưu lượt đang sống trong `lhdg_active_run` trên trình duyệt hiện tại. Trạng thái được ghi sau khi đầu thai, bước vào cuộc đời, đổi hướng sống, đưa ra lựa chọn và tiến thời gian. Khi trang chuyển sang nền hoặc đóng, game cũng thử lưu lại trạng thái hiện tại.

Màn hình chính có nút **Tiếp tục hành trình** kèm tên, tộc và tuổi nếu bản lưu còn hợp lệ. Nếu tải lại ngay ở màn hé lộ nhân vật, game trở về đúng nhân vật đó. Nếu còn lựa chọn hoặc nhiệm vụ dở, game mở lại đúng chỗ; không tạo nhân vật mới hoặc tự nhận thưởng lần nữa.

## Phạm vi dữ liệu

`session.js` lưu một bản ghi có phiên bản, màn hình hiện tại và toàn bộ trạng thái nhân vật: chỉ số, hướng sống, nhật ký, cờ truyện, mốc thời gian chờ, nhiệm vụ, lựa chọn đang mở, gia đình, đồng đội và kỷ niệm. Định nghĩa tộc/xuất thân/nhiệm vụ được đối chiếu với dữ liệu hiện hành khi tải; tham chiếu đồng đội được nối lại với người còn sống. Định dạng giữ được các mốc chờ vô hạn thay vì đổi chúng thành `null` trong JSON.

Khi nhân vật qua đời, bản đang chơi được xóa và kiếp đã kết thúc được ghi một lần vào `lhdg_lives`. Việc xem lại nhật ký hoặc tổng kết không tạo thêm một bản lịch sử trùng.

Bấm **Đầu thai** khi đang có bản lưu sẽ bắt đầu một cuộc đời mới và thay thế bản đang chơi; màn hình chính ghi rõ điều này cạnh nút Tiếp tục.

## Khi không lưu được

Bản lưu hỏng, sai phiên bản hoặc tham chiếu nội dung không còn tồn tại không làm game treo. Màn hình chính thông báo không đọc được và giữ nguyên dữ liệu cũ, thay vì tự xóa. Nếu trình duyệt chặn lưu hoặc hết dung lượng, game tiếp tục chạy và hiện thông báo trong màn chơi.

Đây là lưu cục bộ theo trình duyệt và địa chỉ trang. Nó không đồng bộ giữa thiết bị; xóa dữ liệu trang hoặc dùng chế độ không giữ dữ liệu có thể làm mất bản lưu. `index.html` và `dist/game.html` trên cùng một website dùng chung lượt đang chơi.

## Kiểm tra

`node tools/test-session.js` kiểm tra lưu/tải, lựa chọn và phần thưởng, nhiệm vụ, tham chiếu đồng đội, dữ liệu hỏng và dung lượng bị chặn. Kiểm tra Chromium tải lại trang thật cho cả trang chính/bản đóng gói, bao gồm màn hé lộ, lựa chọn dở, nhiệm vụ và xóa lượt đã chết.
