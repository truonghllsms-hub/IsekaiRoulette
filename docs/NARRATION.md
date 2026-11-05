# Tinh chỉnh lời kể và giao diện nghề

## Định danh NPC

`introduceNpcs` bỏ qua tên nhân vật chính, cha/mẹ/kẻ tạo ra nhân vật, bạn đời và
Cast đã xác định khi đối chiếu danh sách chiêu mộ hoặc thành viên băng. Cả tên đầy
đủ và tên gọi đầu được bảo vệ, chuẩn hóa Unicode và hoa/thường. Tên cha Kaelen
không còn bị chú thích thành Thánh Kỵ Sĩ chỉ vì trùng tên một tân binh định sẵn.
Các NPC mới khác vẫn được giới thiệu một lần.

Chức danh được làm phẳng khi đưa vào lời kể: `Kiếm sĩ (Bậc 1) · Đội trưởng`
thành `Kiếm sĩ bậc 1, Đội trưởng`. Áp dụng cả câu dẫn nhập NPC và mô tả thành viên
khi giới thiệu băng; không thay dữ liệu chức danh gốc trong hồ sơ.

`storyText` bỏ khoảng trắng thừa trước dấu câu và viết hoa đầu đoạn/đầu câu.
Không xóa hàng loạt từ láy tiếng Việt hợp lệ. Sự kiện `demon_lead_link_3` dùng
`{mentorPronoun}` theo giới tính **ân sư**, không theo giới tính người chơi.
Formatter còn hỗ trợ chuỗi cũ `Lão/Cô ta` trong bản lưu; validator từ chối chuỗi
biên tập này trong nội dung mới.

## Thời gian êm đềm

`content/childhood.js` có bảy câu mới cho mỗi giai đoạn sơ sinh và thơ ấu.
`data/focus.json` dùng chúng cho Rong chơi/An dưỡng; build pack bổ sung vào các
phần ghi đè theo tộc, không chỉ sửa dữ liệu chung. Các chi tiết mới tránh giả định
về tay chân hoặc gia đình để phù hợp nhiều giống loài. Ngục tù vẫn được lọc theo
bối cảnh riêng.

`c.lastQuiet` và `c.quietRecent` lưu những chi tiết thực sự vừa kể. Câu đệm và
hồi tưởng trong đoạn tiếp theo không được dùng lại chi tiết của đoạn trước;
chi tiết phụ cùng đoạn cũng khác câu chính. Khi kho phù hợp quá nhỏ, engine chọn
câu trung tính khác thay vì lặp câu cũ hoặc mượn cảnh tự do cho tù nhân. Trạng thái
này được giữ trong bản lưu.

## Chương tuổi thơ

Build đánh dấu `requiresShelter` cho các chương thơ ấu có điều kiện “chưa có
nghề/vai trò”. Chương này chỉ dùng khi nhân vật tự do, có người chăm sóc còn sống
và không trong cảnh nghèo cùng cực. Engine vẫn kiểm tra bản dữ liệu cũ chưa có tag.
Các lời kể “êm đềm”, “vô lo”, “bao bọc”, “nhung lụa” cũng bị loại trong hoàn cảnh
khó khăn. Chương ngục chỉ được dùng khi được khai báo đúng `captiveKinds`; nếu
không, lời chuyển tuổi nói rõ nơi giam giữ, không dùng câu xưởng rèn/đường phố.

## Kiểm tra

`node tools/test-narrative-polish.js` kiểm tra trùng tên, ngoặc chức danh, đại từ,
dấu câu, kho đệm và chống lặp sau lưu/tải, hoàn cảnh trẻ nghèo/mồ côi/bị giam.
`node tools/test-career-health-hud.js` kiểm tra dữ liệu thanh XP và cảnh báo sức khỏe.
Cả hai chạy trong `npm run test:stories` và `npm test`.
