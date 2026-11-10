# Tích hợp các bản thảo Gemini

Ưu tiên hiện tại là **Human và Beastman**. Giữ nguyên 99 nghề khả dụng, trong đó Human có 14 nghề và Beastman có 11 nghề. Không yêu cầu viết bù nghề cho những tộc còn lại.

Đã nhận 8 tệp: 202 sự kiện và 4 xuất thân. Tệp nghề cuối chứa 6 khối JSON nối tiếp; chúng được tách, đọc và ghép thành một nguồn hợp lệ. Sau khi đọc và kiểm tra, bổ sung riêng 10 cảnh An dưỡng Beastman để hai tộc ưu tiên đều có 10 cảnh. Tổng đợt này: **212 sự kiện, 4 xuất thân**.

| Nguồn chuẩn trong `content/expansions/` | Sự kiện | Xuất thân |
|---|---:|---:|
| `human-rest.json` | 10 | 0 |
| `beastman-rest.json` | 10 | 0 |
| `careers.json` | 48 | 0 |
| `captivity.json` | 18 | 0 |
| `high-demon.json` | 24 | 4 |
| `dragon.json` | 24 | 0 |
| `ghoul.json` | 24 | 0 |
| `goblin-kobold.json` | 30 | 0 |
| `slime.json` | 24 | 0 |

`careers.json` bổ sung tình huống cho sáu nghề đã có: Beastman Courier, Imp Messenger, Poison Slime, Awakened Ghoul, Labyrinth Guardian và Kobold Overseer. Không tạo ID nghề mới. Những kịch bản tộc đã gửi vẫn được giữ và tích hợp; phạm vi **viết tiếp** tập trung vào Human/Beastman.

## Những điểm đã chỉnh trước khi nạp

- Đưa lời mở đầu từ `variants` vào `text`; đổi các biến thể dạng object thành chuỗi; bỏ hiệu ứng không hỗ trợ `notFlags`, chuyển thành cờ kết thúc đúng ý nghĩa.
- Thêm cờ khép nhánh, dọn cờ chờ; các chặng tiếp nối còn khả dụng khi vượt mốc tuổi. Cảnh chuộc lỗi cần một dấu thất bại thật, không tự dựng quá khứ tội lỗi cho người chơi.
- Thêm lối rút lui có kiểm soát ở các biến cố trứng Rồng và tuyến hình thành High Demon. Vật chủ trong tuyến ký sinh là High Demon trường thọ; tuyến giao ước Rồng dùng các thế hệ kế thừa thay cho một con người sống hàng trăm năm.
- Ghoul đã thanh tẩy mảnh hồn không bị ép đối đầu lại một Lich còn sống ở chặng sau. Slime qua trạm kiểm tra/hối lộ thành công không tự sinh lệnh truy nã. Các cảnh tiến hóa yêu cầu chưa có form, tránh ghi đè hình thái đang có.
- Sửa biến thể không khớp kết quả, như thuốc mỡ nhưng lại uống chén thuốc, mua đồ gốm nhưng lại ăn thức ăn; sửa địa danh mỏ ở Dãy Núi Răng Cưa bị chuyển sang Đảo Tro Tàn.
- Human/Beastman An dưỡng chỉ xảy ra khi tự do. Lựa chọn trả tiền có giá tối thiểu và vẫn có lối không trả tiền; cảnh hồi phục trong ngục không còn vừa báo lành vết thương vừa trừ máu trên thành công.

## Hỗ trợ dữ liệu trong engine

`tools/load.js` ghép các nguồn bổ sung sau pack tộc để xuất thân mới không bị ghi đè khi build. Trùng ID sẽ dừng build. File JSON ở đây là nguồn chuẩn; không chỉnh tay `data.js` hoặc pack được sinh từ script.

Xuất thân có thể khai báo `captiveKind` thuộc `prison`, `slave`, `arena`, `bound`. Bốn xuất thân High Demon mới bắt đầu bị ràng buộc với vật dẫn/Cội Nguồn; chưa có cha mẹ sinh học hoặc nghề tự do trong thời gian này. Kết quả kết thúc hoặc từ bỏ tuyến dùng `setFree:true` để mở cuộc sống bên ngoài. Một sự kiện có `require.captiveKinds` đúng loại được đánh giá theo bối cảnh đã khai báo, cho phép mô tả đường thoát thực tế mà không bị bộ đoán từ khóa cấm nhầm.

Sự kiện lặp có `cooldownYears` được tái diễn sau thời gian chờ, không bị chặn sau đúng hai lần. Những cảnh lặp cũ không có thời gian chờ vẫn giữ giới hạn cũ; bộ nhớ gần đây của kỷ nguyên vẫn hoạt động.

## Còn cần gì cho Human và Beastman?

Human đã có 14 nghề và Beastman có 11 nghề cùng các nhiệm vụ mốc sẵn có. Phần viết tiếp hữu ích là tăng số tình huống chuyên môn và xung đột riêng cho từng nghề, bắt đầu bằng Human Swordsman/Mage/Farmer hoặc Beastman Hunter/Mercenary; không cần tạo thêm nghề.

[Prompt Human/Beastman](gemini-prompts/09-human-beastman.md) là bản dùng tiếp. Gửi từng nghề một, mỗi lần 8 sự kiện. Gói An dưỡng hai tộc đã đủ cho vòng cập nhật này. Các prompt tộc khác chỉ giữ để tham khảo những bản thảo trước, không phải danh sách phải làm tiếp.

## Kiểm tra

- 196 kiểm tra hồi quy qua, gồm 10 kiểm tra mới cho nội dung bổ sung.
- Mọi sự kiện và mọi biến thể có ít nhất một bối cảnh đời sống hợp lệ; các lựa chọn thành công/thất bại được chạy qua engine, kiểm tra cờ, thoát giam và placeholder.
- Mô phỏng 100 đời mỗi tộc, tổng 1.700 đời, hoàn tất không lỗi.
- Chromium kiểm tra Human thiếu tiền An dưỡng, Beastman hồi phục và High Demon rời vật dẫn trên cả trang chính/bản đóng gói: không lỗi JavaScript, thiếu ảnh hay tràn ngang trên điện thoại.
- Build giữ toàn bộ nội dung bổ sung: 4.783 sự kiện, 153 xuất thân, 69 người có ảnh. Số nghề không đổi.

Kiểm tra tự động không thay thế việc đọc thử các tuyến dài; nếu gặp mâu thuẫn trong một ván cụ thể, cần giữ lại tên/tuổi, xuất thân, nghề và đoạn nhật ký liên quan để đối chiếu.
