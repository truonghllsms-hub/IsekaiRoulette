# Cân bằng sinh tồn

Không còn hồi +3 máu tự động khi qua năm. Focus An dưỡng là nguồn hồi chủ động;
nghèo ở xã hội dùng tiền (tài sản ≤ 5) hoặc bị giam giới hạn lượng hồi còn 1 mỗi lượt.
Ma vật hoang dã/tự cấp không bị xem là đói chỉ vì không có tiền người phàm.
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

## Tai nạn có lựa chọn sinh tồn

`earlyHazard` của Goblin/Kobold/Imp là **0,05** (cũ: 0,285); Human giữ 0,02,
Beastman giữ 0,025. Đây là xác suất tai nạn nền mỗi năm, còn được điều chỉnh theo
thời đại, focus và may mắn; không phải xác suất chết trực tiếp.

Khi trúng tai nạn, lượt dừng ở cảnh `crisis`. Người chơi chọn né/trốn (AGI),
kêu cứu (LUCK khi nhỏ, INT khi lớn) hoặc mở đường thoát thân (STR). Engine chỉ có
STR/INT/AGI/LUCK, nên không tạo thêm chỉ số CHA/WIL không tồn tại. Kêu cứu chỉ mở
khi có phụ huynh/đồng đội còn sống có thể hỗ trợ; cha mẹ không xuất hiện để giải
cứu từ bên ngoài nơi giam giữ. Thất bại mới gây tử vong do bạo lực. Thành công
không tăng tuổi; một mốc tuổi bị ngắt sẽ tiếp tục ở đúng tuổi đó.

Chết do cạn máu, tuổi già và kết quả tử vong viết sẵn trong kịch bản vẫn được giữ.
Nội dung cảnh phân biệt trẻ nhỏ, giam giữ, chiến loạn và tai họa ma pháp.

## Mẫu đo sau điều chỉnh sinh tồn, trước bản nhiệm vụ nghề

`npm run simulate:survival -- 200 12345`: 1.600 cuộc đời, 200/chủng tộc.
Bot chọn ngẫu nhiên phương án mở, có 5% cơ hội đổi focus mỗi bước thời gian.

| Tộc | Chết trước thiếu niên | Chết trước trưởng thành | Tuổi chết TB |
|---|---:|---:|---:|
| Goblin | 1.5% | 6.5% | 9.2 |
| Kobold | 1.5% | 3.5% | 9.7 |
| Imp | 2.5% | 7.5% | 9.3 |
| Human | 7.5% | 18% | 39.5 |
| Beastman | 5.5% | 17% | 25.2 |
| Elf | 0.5% | 8% | 798.7 |
| Dragon | 1.5% | 24% | 4983.1 |
| High Demon | 1.5% | 21% | 6284.5 |

Trước thay đổi này, cùng công cụ/seed cho mẫu 200 đời mỗi tộc có 66% Goblin,
70,5% Kobold và 70% Imp chết trước trưởng thành; mẫu mới lần lượt 6,5%, 3,5%,
7,5%. Các lần chạy không giữ cùng từng cuộc đời vì cơ chế mới tiêu thụ RNG khác.
Dragon trưởng thành ở 2.000, High Demon ở 5.000: cột trước trưởng thành bao gồm
thời thiếu niên dài, không đồng nghĩa chết sơ sinh. Đây là mô phỏng một seed và
chiến thuật, không phải thống kê người chơi hay tỉ lệ được đảm bảo.

## Cơ hội tiến hóa trong đời ngắn

Ở tuổi 3–6, Goblin/Kobold/Imp chưa có hình thái tiến hóa được xét một nhóm
biến cố tiến hóa khả dụng với xác suất 35% mỗi nhịp tự do, trước lời mời nghề
thường. Không thay thế biến cố đang chờ, tai nạn hoặc mốc chuyển giai đoạn.
Dấu hiệu đầu tiên của Hobgoblin/Kobold Elite/Greater Demon mở từ tuổi 3
(trước là 4/6/8). Các nhánh hiếm khác giữ tuổi mở cũ.

Điều kiện chỉ số, dấu ấn, lựa chọn và khả năng thất bại vẫn giữ nguyên.
Không tự cấp tiến hóa, không tự kéo dài tuổi thọ, không thay tuổi trưởng thành
hay thêm hôn nhân ở tuổi 1–2.
