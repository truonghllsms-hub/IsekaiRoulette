# Cast theo xuất thân và giam giữ

Mỗi vai được bốc độc lập khi khởi tạo: bạn thân 50%, đối thủ 40%, ân sư 30%.
Cấu hình ở `data/systems.json:castChances`; từng tộc có thể ghi đè trong systems
của metadata. Xác suất chỉ áp dụng khi có ứng viên phù hợp, không bảo đảm mọi đời
đều gặp đủ ba vai. Khi tự do trở lại, engine không tự sinh thêm bạn thuở nhỏ.

## Bối cảnh

Cast có `contexts` gồm `free`, `prison`, `slave`, `arena`, `bound`. Nguồn biên tập
là `castContexts` trong `content/packs/<race>.meta.js`; bỏ trống mặc định `free`.
Người bị giam chỉ được bốc ứng viên có đúng loại giam giữ và mô tả vai trong ngục
(bạn tù, cai ngục, lão tù, chủ nô…). Không có ứng viên thì vai để trống; Human sinh
ở đấu trường hiện có `cast = {}`. Chưa bổ sung dàn Cast hay hệ thống thứ bậc ngục mới.

Sự kiện Cast được build với `require.free: true`. Một cảnh ngục cần khai báo
`require.captiveKinds`, ví dụ `["slave"]`, và Cast cũng phải có context tương ứng.
Build bỏ `free` cho ngoại lệ này; validator từ chối hai điều kiện mâu thuẫn.
Chuỗi Human `friend_b` đã có cảnh gặp bạn tù mỏ nên được khai báo `free/slave`;
chỉ cảnh đầu yêu cầu nô lệ, các cảnh ngoài xã hội tiếp theo yêu cầu tự do.

Bộ lọc runtime vẫn chặn cảnh ngoài xã hội nếu bản lưu cũ đã có đủ Cast hoặc
nhân vật bị bắt giữa đời. Cast cũ được giữ nhưng cảnh không đúng bối cảnh tạm
ngừng. Thiếu vai thì không dùng lời thay thế để tạo một người quen chưa tồn tại;
lựa chọn nhắc vai thiếu cũng bị bỏ. Lời mở đầu, chuyển chương và hồi tưởng có
kiểm tra tương tự.

Slime và các xuất thân Ghoul tự thức tỉnh trong nghĩa địa, hố chôn, chiến trường,
hầm ngục không được bốc Cast thuộc chủng tộc hình người khác. Cast cùng loài hoặc
sinh vật không hình người đã viết sẵn vẫn có thể xuất hiện.

## Nghề và nhiệm vụ

Mọi dạng giam giữ đều chặn lời mời nghề, bài thi thăng bậc, nhiệm vụ nghề và các
lời mời sinh hoạt ngoài xã hội. Lựa chọn nghề đã mở trong bản lưu cũng không thể
được nhận sau khi bị giam. Nghề, bậc và XP hiện có được giữ; khi tự do, lịch nghề
hoạt động lại.

Nhiệm vụ ngoài xã hội đang chạy dừng ngay khi bị giam, trước dòng thoại/lựa chọn
tiếp theo, không tính hoàn thành và không trừ hình phạt thất bại ngoài xã hội.
Chỉ nhiệm vụ có `require.captiveKinds` phù hợp được tiếp tục trong ngục. Nhiệm vụ
đã nhận vẫn giữ dấu đã nhận; engine không tự khởi động lại chuỗi đã dừng.

## Kiểm tra

`node tools/test-captivity-cast.js`: xác suất trên 2.000 lượt sinh có seed, lọc
xuất thân giam giữ, ngoại lệ bạn tù mỏ, Cast trong bản lưu cũ, vai thiếu, chặn nghề
và nhiệm vụ khi bị bắt, khôi phục lịch nghề sau tự do. Bộ này chạy trong cả
`npm test` và `npm run test:stories`.
