# Cân bằng sinh tồn

Không còn hồi +3 máu tự động khi qua năm. Focus An dưỡng là nguồn hồi chủ động;
nghèo (tài sản ≤ 5) hoặc bị giam giới hạn lượng hồi còn 1 mỗi lượt.
Nếu không an dưỡng, đói nghèo/giam cầm gây hao mòn theo thời gian chuẩn hóa.
Các nguồn chữa trị từ sự kiện vẫn hoạt động.

Lựa chọn ghi `SINH TỬ`, thất bại gây chết hoặc đã có sát thương ≥ 30 được đánh dấu
`risk: "lethal"`. Thất bại không chết ngay ở nhóm này gây ít nhất 35–50 máu tùy độ
khó. Không áp dụng mức này cho thất bại giao tiếp, học tập thông thường.
Giao diện cảnh báo sát thương và nguy cơ tử vong trước khi chọn.

Dark Age và Demon Lord nhân sát thương sự kiện ×1,5, tăng rủi ro tai nạn.
Không nhân lại sát thương xuất thân, hao mòn thời đại hay phần thưởng nhiệm vụ.
Goblin/Kobold/Imp có tuổi thọ tự nhiên 8–12, trưởng thành ở 4; tiến hóa có thể
kéo dài đời. Tuổi thọ tự nhiên khác tuổi chết trung bình khi có tai nạn.

## Mẫu đo

`npm run simulate:survival -- 200 12345`: 1.600 cuộc đời, 200/chủng tộc.
Bot chọn ngẫu nhiên phương án mở, có 5% cơ hội đổi focus mỗi bước thời gian.

| Tộc | Chết trước thiếu niên | Chết trước trưởng thành | Tuổi chết TB |
|---|---:|---:|---:|
| Goblin | 36% | 66% | 4,3 |
| Kobold | 40% | 70,5% | 4,0 |
| Imp | 37% | 70% | 4,2 |
| Human | 21% | 30,5% | 32,6 |
| Beastman | 27,5% | 36% | 19,2 |
| Elf | 0,5% | 10% | 610,2 |
| Dragon | 3,5% | 31% | 3.639,3 |
| High Demon | 1,5% | 18,5% | 6.339,6 |

Chỉ 0–1,5% Goblin/Kobold/Imp vượt 15 tuổi trong mẫu này. Dragon trưởng thành ở
2.000, High Demon ở 5.000: cột trước trưởng thành bao gồm thời thiếu niên dài,
không đồng nghĩa chết sơ sinh. Đây là mô phỏng một seed/chiến thuật, không phải
thống kê người chơi và không đảm bảo các tỉ lệ này cho mọi lần chơi.
