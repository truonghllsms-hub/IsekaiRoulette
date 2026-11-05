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
đang khả dụng có 196 biến cố công việc/hậu quả, 8 thương vụ và 196 nhiệm vụ nghề. Các nhóm
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

## Khi bị giam giữ

Mọi `c.captive` đều chặn nhận nghề, thăng bậc và nhiệm vụ nghề, bao gồm nô lệ
đấu trường từ xuất thân. Nghề và kinh nghiệm đã có được giữ để tiếp tục sau khi
tự do. Nhiệm vụ ngoài xã hội đang chạy sẽ dừng khi bị bắt; lựa chọn nghề đang mở
trong bản lưu cũng bị chặn. Xem [Cast và bối cảnh giam giữ](CAST_CONTEXT.md).

## Nhịp thăng tiến và bảng nhiệm vụ

Mốc XP của nghề được cập nhật ở cả dữ liệu chung và metadata các pack thành
`[4, 8, 14, 22]`. Thăng bậc thành công (kể cả qua sự kiện cấp bậc) đặt
`nextPromo = age + tickYears * (4 + rank * 2)`, đồng thời buộc qua **hai lượt bấm**
trước bài thi kế tiếp. Một lượt bấm có thể gộp nhiều nhịp năm nên cần kiểm tra
cả tuổi và số lượt; chỉ dùng mốc tuổi chưa bảo đảm khoảng nghỉ cho người chơi.

Sau nhiệm vụ thành công hoặc thất bại, bảng nhiệm vụ nghỉ ít nhất một lượt bấm,
cùng mốc `age + tickYears * 2`. Từ chối bảng cũng áp dụng khoảng nghỉ này.
Tỷ lệ mở bảng khi đủ điều kiện là **30% mỗi nhịp xét lịch**, không nhân theo số
năm hay độ trường thọ. Đây không phải cam kết 30% toàn bộ lần bấm, vì mỗi lần
bấm có thể gộp nhiều nhịp xét lịch. Lời mời nhiệm vụ nghề cũng có khoảng nghỉ
chung sau thăng bậc, hoãn hoặc kết thúc nhiệm vụ.

## Buôn bán và thăng tiến tư nhân

Tám nghề thuộc nhóm thương mại có thêm thương vụ khi focus `work`: đầu tư 20
tài sản, kiểm tra INT để thu về 60 (lãi ròng 40), hoặc mất 20 nếu thất bại.
Yêu cầu vốn được hiển thị và khóa khi không đủ; lựa chọn môi giới nhận 5, còn
bỏ qua không tốn tiền. Cả vốn lẫn doanh thu được quyết toán trong một kết quả,
không cộng 60 rồi quên trừ 20. Tài sản là thanh 0–100 nên vẫn chịu giới hạn 100.

Khi làm việc trong tự do, vốn hiện có trên 30 sinh thêm `floor(wealth * 0.05)`
mỗi năm quy đổi của engine, tính trên vốn trước thu nhập nhịp đó. Tiền lời dùng
cùng thang thời gian và giới hạn gộp như thu nhập, tránh nhân hàng nghìn năm thực
của Elf/Rồng vào tài sản. Không sinh lời khi an dưỡng hoặc bị giam.

`content/progression.js` là nguồn lời dẫn và kết quả thăng tiến của nhóm thương
mại, nghề ngầm và thủ công: thương vụ/mở rộng cơ ngơi, phi vụ tự thực hiện, đơn
hàng thử tay nghề. Các nghề tổ chức vẫn dùng bài thi đã biên tập. Các mốc tư nhân
này không tự trừ thêm vốn ngoài những gì giao diện thông báo.

Kiểm tra: `node tools/test-career-pacing.js` bao phủ khoảng nghỉ theo lượt/tuổi,
biên thời gian, thăng bậc qua sự kiện, lãi vốn, lời/lỗ thương vụ và lời văn từng nhóm.
