# Đối chiếu hai báo cáo rà soát tiếp theo

Bản được đối chiếu ban đầu là `03acb3d`: 4.783 sự kiện được build, 99 nghề khả dụng. Con số 95 nghề trong báo cáo không phản ánh danh sách hiện hành. Các số bên dưới về An dưỡng là nhóm theo tộc/tag/loại trừ và focus; chưa tính mọi điều kiện tuổi, nghề hay cờ truyện của một ván cụ thể.

## Nghề đặc thù

Các ID được phân nhóm trực tiếp, không tạo nghề mới:

| ID | Nhóm đúng |
|---|---|
| `slime_pet` | `circus_pet`: biểu diễn bằng hình thể Slime, bảo vệ lõi và quyền lựa chọn người chăm sóc |
| `imp_familiar` | `familiar_contract`: đường dẫn ma lực, điều khoản và nghi thức hỗ trợ |
| `imp_trickster` | `trickster`: tráo dấu, ảo ảnh và hậu quả lừa lọc |
| `lizard_egg` | `brood_guard`: nhiệt bùn ấp, kẻ săn trứng và an toàn bờ tổ |
| `troll_scholar` | `cave_scholar`: hình khắc, dấu nước và tri thức kiểm chứng từ hang động |
| `vampire_noble` | `intrigue`, tiếp tục dùng hệ kỷ nguyên/quyền mưu |

Báo cáo đúng về năm khuôn mẫu đầu cần sửa. Riêng Vampire Noble vốn đã có lời dẫn kỷ nguyên thay cho Bard trước đợt này; sửa nhãn phân loại để tránh lệ thuộc fallback LUCK, giữ nội dung quyền mưu và cơ chế kinh tế đã có. Hai nhiệm vụ ba chặng mỗi nghề giữ nguyên ID, bậc và phần thưởng, đổi ngữ cảnh cho phù hợp bản chất nhân vật.

## Bản đồ cảm ứng

Cho phép pointer loại touch/pen khi đã phóng to, chỉ chặn nút chuột phụ. Lưu ID ngón tay đang kéo, bỏ qua ngón khác và dọn trạng thái khi kết thúc/hủy/mất capture. `touch-action:none` chỉ áp dụng trong vùng bản đồ đang phóng to; các phần khác của trang vẫn cuộn bình thường. Nút zoom, xem toàn cảnh và điều khiển bàn phím vẫn dùng được. Bản đóng gói cũng có viewport di động chuẩn.

## An dưỡng

Thêm 11 sự kiện trong `data/events/rest-wild.json`, không ảnh hưởng số lượng nguồn Gemini đã duyệt trước đó:

- Sáu cảnh dùng chung cho Goblin/Kobold/Orc/Minotaur/Troll/Imp/Lizardman: chỗ trú khô, đá ấm, nước sạch, quan sát dấu vết, vật đánh dấu nơi nghỉ, thả lỏng cơ thể.
- Ba cảnh Rồng về kho báu qua các triều đại, cánh/vảy và nhìn lịch sử vận hành mà không chinh phạt.
- Hai cảnh riêng cho Slime/Ghoul về ổn định ma lực và hình thể, không dùng phổi, mồ hôi hay gặm xương như sinh vật sống.

Mỗi cảnh có ba biến thể, hai lựa chọn, yêu cầu tự do và focus An dưỡng, lặp sau thời gian chờ tương ứng tộc. Các cảnh nghỉ cá nhân không chiếm ba vị trí bộ nhớ biến cố kỷ nguyên, tránh tự khóa khi chỉ còn ba cảnh nghỉ Rồng. Nhóm ít nội dung được bổ sung mà không viết thêm nghề cho các tộc khác; Human và Beastman vẫn giữ ưu tiên viết nội dung nghề tiếp theo.

## Lãng mạn và hôn nhân chính trị

Luồng tỏ tình định kỳ vốn yêu cầu `c.gender`, nên nhân vật Slime/Ghoul được tạo đúng dữ liệu đã không gặp cảnh này. Bổ sung chặn chủ động theo `genderless` ở lịch tỏ tình, hàm dựng cảnh, bộ lọc sự kiện và thao tác kết hôn để các nhánh script hoặc trạng thái cũ cũng không lách qua được. Phân tách Slime và phân thân High Demon vẫn hoạt động.

`hd_politic_marriage` đúng là bị khóa bởi `child` và nội dung đêm tân hôn. Override ở metadata chuyển sang teen/adult/middle, chỉ khi tự do và chưa có bạn đời; build lại không làm mất sửa đổi.

## Lượt chơi dở

Đã bổ sung tự lưu và nút Tiếp tục. Chi tiết, giới hạn lưu cục bộ và cách xử lý lỗi ở [Lưu hành trình](SESSION.md).

## Kết quả kiểm tra bản sửa

- 211 kiểm tra hồi quy qua, gồm kiểm tra mới cho lưu/tải, các nhóm nghề, hôn nhân chính trị và An dưỡng dùng chung.
- Mô phỏng 1.700 vòng đời trên 17 tộc hoàn tất không lỗi.
- Chromium thử tải lại ở màn hé lộ, lựa chọn, nhiệm vụ; xác nhận phần thưởng/lịch sử không ghi trùng, bản lưu lỗi được giữ, và thông báo khi hết quyền/dung lượng lưu.
- Cảm ứng Chromium kéo được bản đồ theo cả trục ngang/dọc, thả tay dọn trạng thái, nút toàn cảnh đưa vị trí về đầu; cả `index.html` và `dist/game.html` đều qua.

Build hiện có 4.794 sự kiện, 153 xuất thân, 99 nghề khả dụng và 69 người có ảnh.
