# Prompt bổ sung kịch bản cho Gemini

**Ưu tiên hiện tại:** [viết tiếp cho Human và Beastman](09-human-beastman.md). Không cần viết bù nghề cho các tộc khác. Các gói 1–8 bên dưới giữ làm tham khảo cho bản thảo đã gửi; xem [báo cáo tích hợp](../CONTENT_IMPORT.md).

Mở một file bên dưới, sao chép **toàn bộ nội dung**, gửi Gemini. Mỗi prompt đã kèm bối cảnh, luật JSON và danh mục ID của bản hiện tại; không cần ghép thêm prompt chung. Gói nghề và An dưỡng nên chạy từng nghề/tộc một để tránh đầu ra quá dài hoặc văn bản bị rập khuôn. Khi Gemini trả JSON, giữ nguyên file và gửi lại để tích hợp.

| Thứ tự | Prompt | Phạm vi mỗi lần chạy |
|---|---|---|
| 1 | [Nghề chuyên biệt](01-nghe-chuyen-biet.md) | 8 sự kiện cho **một** nghề; mặc định `bm_courier` |
| 2 | [An dưỡng](07-an-duong.md) | 10 sự kiện cho **một** tộc; mặc định Human |
| 3 | [Ngục tù và đấu trường](08-nguc-tu-dau-truong.md) | 18 sự kiện, gồm 3 tuyến thoát thân |
| 4 | [Rồng](03-dragon.md) | 24 sự kiện, gồm trứng và biến cố kỷ nguyên |
| 5 | [High Demon](02-high-demon.md) | 4 xuất thân + 24 sự kiện |
| 6 | [Ghoul](04-ghoul.md) | 24 sự kiện về bản ngã, Ghast và Lich |
| 7 | [Goblin và Kobold](05-goblin-kobold.md) | 30 sự kiện cho hai tộc đoản mệnh |
| 8 | [Slime](06-slime.md) | 24 sự kiện mô phỏng, thâm nhập và lõi ma lực |

Để đổi nghề hoặc tộc mặc định, thêm một dòng ở đầu lần gửi, ví dụ: **“Lần này viết cho `imp_messenger`.”** Chỉ đổi sang ID có trong danh mục kèm theo. Những gói lớn có thể yêu cầu Gemini xuất từng phần 6–8 sự kiện và giữ cùng sơ đồ cờ; ghép các mảng JSON trước khi kiểm tra để không báo nhầm cờ ở phần chưa gửi.

## Đã sửa trong code, không giao Gemini sửa lại

- Phân nhóm chính xác 20 nghề; thêm hai tuyến giao liên cùng các tình huống đúng chuyên môn cho bí thư, giám sát mỏ, shaman, Ghoul thức tỉnh, độc và mô phỏng.
- Rút thời gian chờ thăng bậc của nhóm không dùng nhịp kỷ nguyên; bổ sung XP thực hành có giới hạn cho những lựa chọn dùng chuyên môn.
- An dưỡng chặn sự kiện kéo người chơi vào nhóm mới, kể cả hiệu ứng lồng trong nhánh lựa chọn; vẫn chăm sóc được đồng đội đang có.
- Người đã mất chuyển sang kỷ niệm, không ở danh sách đồng hành; dọn `{ally}`, chặn nhắc tên trong cảnh hành động và chặn tuyển lại chính NPC đã chết.

Gemini chỉ mở rộng văn bản và nhánh lựa chọn. Không yêu cầu nó viết lại toàn bộ `engine.js`, `data.js`, nghề, hình thái hay cơ chế kinh tế.

## Kiểm tra bản thảo mà chưa đưa vào game

Lưu JSON Gemini trả về, ví dụ `/tmp/ban-thao.json`, rồi chạy từ thư mục game:

```sh
node tools/check-content-draft.js /tmp/ban-thao.json
```

Công cụ chỉ ghép trong bộ nhớ để kiểm tra, không ghi đè bất kỳ kịch bản nào. Nó kiểm tra schema hiện có, ID trùng, cờ `gm_*` thiếu nơi cấp, khung tuổi, lựa chọn thiếu kết quả và sự kiện lặp thiếu thời gian chờ. Kết quả đạt **không bảo đảm** mọi nhánh đều hợp lý, không có vòng cờ hoặc NPC được dùng đúng; cần đọc nội dung và mô phỏng sau khi tích hợp.

Đầu ra thống nhất là `{"origins": [], "events": []}`. Đây là **bản thảo trao đổi**, chưa phải định dạng tự động nạp của game. Không chép đè cả pack bằng JSON Gemini; nguồn chuẩn phải được tích hợp vào `content/` hoặc `data/events/`, build và kiểm tra lại.

[Danh mục máy đọc](current-schema.json) ghi số lượng dữ liệu được tải và ID hiện tại. `racialPool` chỉ đếm theo tộc/tag/loại trừ, **chưa** xét tuổi, xuất thân, nghề, cờ truyện hay trạng thái đồng đội; không phải số sự kiện một cuộc đời chắc chắn gặp. Dữ liệu thô còn bao gồm nghề/sự kiện cũ bị pack loại trừ, nên số thô không đồng nghĩa nội dung đang khả dụng.
