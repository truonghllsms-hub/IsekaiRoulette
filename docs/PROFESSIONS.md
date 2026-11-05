# Nghề nghiệp và gia đình

## Kết duyên và sinh con

Nhân vật có giới tính nam/nữ chỉ được chọn đồng đội khác giới có mức thân thiết
ít nhất 55 để tỏ tình. Nếu không có người phù hợp, engine tạo người lạ khác giới.
Giới tính được lưu trên bạn đời ở cả đường kết hôn bằng action và bằng effect.

Sinh con tự động và sự kiện sinh con viết sẵn đều kiểm tra cặp đôi. Trạng thái cũ
thiếu giới tính chỉ được đối chiếu với đồng đội đã biết, không đoán từ tên.
Lời văn mang thai/sinh con chuyển đúng chủ thể khi nhân vật chính là nữ. Các
sự kiện giao phối Rồng tạo ngữ cảnh bạn tình khác giới; Slime vẫn phân chia vô tính.

## Ưu tiên khi làm việc

Nếu có biến cố khả dụng với `require.job` trùng nghề đang làm, lượt chọn biến cố
ưu tiên nhóm này với xác suất **75%** trước nhánh truyện thông thường. Khi trượt
lượt ưu tiên, engine chọn mạch khác nếu có. Nếu chỉ còn sự kiện nghề khả dụng thì
vẫn dùng nó, không tạo lượt rỗng. Đây là xác suất chọn ưu tiên, không phải cam kết
75% mọi dòng nhật ký: thăng bậc, tiến hóa, nhiệm vụ và các mốc tuổi vẫn có lịch riêng.

## Nội dung

`content/careers.js` là nguồn biên tập xung đột và mốc nghề;
`tools/professions.js` gắn chúng với ID nghề thật sau khi tải các pack. 98 nghề
đang khả dụng có 196 biến cố công việc/hậu quả và 196 nhiệm vụ nghề. Các nhóm
chuyên môn dùng chung khung xung đột; 14 nghề Human có lời dẫn hai mốc riêng biệt.
Kiếm sĩ, đấu sĩ và lính đánh thuê có xung đột tương ứng về danh dự/chấn thương,
đấu dàn xếp và trách nhiệm trong hợp đồng.

Sự kiện Gargoyle mới, cửa rune của hầm ngục và phục kích Goblin có `jobChoices`.
Engine chỉ ghép lựa chọn phù hợp với nghề hiện tại, giữ các phương án chung.
Lựa chọn chuyên môn được đánh dấu trong giao diện; phá trận Gargoyle có thể
thưởng vật phẩm Lõi Ma Lực thực sự. Lựa chọn mới ở cửa rune vẫn cấp `dg_2` trên
cả nhánh thành công/thất bại để không cắt cụt hành trình hầm ngục.

## Mốc nghề

Hai mốc **bậc 2 và bậc 4 hiển thị** tương ứng `c.job.rank` bằng 1 và 3 (đếm từ 0).
Mỗi nhiệm vụ có ba chặng: khảo sát, lựa chọn nguyên tắc/thỏa hiệp, thử thách cuối.
Có thể nhận dù chưa gia nhập hội, và có thể hoãn để chuẩn bị. Mỗi mốc nhận một
lần trong đời; rời nghề sẽ dừng nhiệm vụ của nghề đó. Hoàn thành cho kinh nghiệm
nghề, danh vọng và dấu ấn, vẫn giữ cơ chế thi thăng bậc hiện có.

Ví dụ: Ma pháp sư tìm Mảnh vỡ Thần Khí rồi khám phá Di tích Đại Ngàn; Assassin
điều tra kẻ phản đồ Umbra rồi đối mặt sổ đen; Thương nhân mở tuyến hàng đầu tiên
rồi thiết lập thương lộ xuyên lục địa. Lựa chọn cấm thuật dùng `lifeCost`, làm mất
thọ nguyên thật và có thể gây tử vong vì ma thuật nếu thiêu hết phần đời còn lại.
Giao diện báo số năm phải trả theo chủng tộc trước khi người chơi chọn.
