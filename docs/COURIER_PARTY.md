# Giao liên, tổ đội và An dưỡng

## Đối chiếu báo cáo

Trước đợt sửa, `bm_courier` có 16 sự kiện yêu cầu nghề, trong đó 12 không khóa
bậc tối thiểu; `imp_messenger` có 14. Tuy nhiên nhiều cảnh chỉ xuất hiện khi
Làm việc, hoặc còn cần cờ truyện/tổ đội. Bổ sung ba cảnh đời thường lặp lại cho
mỗi nghề, mở từ bậc 0 và nhiều hướng sống chủ động, giải quyết khoảng trống
ngoài công việc. Không thêm nghề mới.

Mốc XP của hai nghề là `[2, 5, 9, 14]`. Đưa thư không tự nhận dao găm hay
kỹ năng ám sát; trang phục thường dân vẫn dùng cột ảnh nghề gốc nếu có.
Vũ khí được người chơi chọn hoặc nhận trong kịch bản vẫn giữ nguyên.

## Người chết, người rời đi và đổi thủ lĩnh

Xử lý `memberDie` và `memberLeave` trước khi đổi thủ lĩnh hoặc rời nhóm.
Nhờ đó Karg, Krogar và Snaga được ghi nhận đúng theo kết quả lựa chọn.
Nhánh Rhino cùng chết với Krogar ghi cả hai. Bỏ đồng đội làm mồi dẫn đến
rời đội; hy sinh đồng đội trong vòng vây và thất bại ở đấu trường ghi nhận
người chết thực sự. `{ally}` dùng người đồng hành đang có trong ngữ cảnh.

Người chết chuyển vào kỷ niệm, không xuất hiện trong danh sách còn sống.
Người rời đi được chặn ở cảnh gọi đích danh cho đến khi thực sự trở lại.
Bản lưu cũ được sửa khi sự kiện đã dùng và cờ riêng của nhánh đủ chứng minh
cái chết; không suy đoán từ cờ dùng chung hoặc tên nạn nhân không xác định.
Nếu không khôi phục được tuổi mất, giao diện không tự ghi một tuổi giả.

## Nghỉ ngơi và mạch nhóm

Khi An dưỡng, tạm dừng cảnh yêu cầu băng nhóm hoặc arc tổ đội/chỉ huy, trừ
cảnh ghi rõ hỗ trợ `rest`. Không tiêu thụ sự kiện trong lúc tạm dừng. Khi quay
lại hướng sống khác, mạch đủ điều kiện được tiếp tục. Cảnh trao thư hỏi thăm
cho phép giữ liên hệ hoặc bình yên rời nhóm.

Nếu bản lưu cũ đang mở một trận đánh thuộc nhóm này trong lúc An dưỡng,
tải lại sẽ gác cảnh, hoàn lại dấu đã dùng và không tự nhận thưởng.

## Kiểm tra

`tools/test-courier-party-rest.js` có 18 kiểm tra về nhịp nghề, tử trận, rời nhóm,
đổi thủ lĩnh, tiếp nối Wild Fang và sửa bản lưu cũ. Tổng bộ hồi quy: 229 kiểm tra.
Mô phỏng 1.700 cuộc đời trên 17 tộc hoàn tất. Bản trang chính và bản đóng gói
được kiểm tra riêng trên Chromium với màn hình điện thoại.
