# Tài sản và danh vọng

Tài sản là thang **địa vị kinh tế 0–100**, không phải số đồng vàng. Danh vọng
vẫn lưu riêng ở `c.fame`; không tạo thêm bản sao trong `c.bars`. `STATUS_KEYS`
phục vụ bốn thanh hiển thị; `BAR_KEYS` chỉ chứa sức khỏe, hạnh phúc, tài sản để
các phép tính hiệu ứng, sinh tồn và điều kiện cũ không cộng danh vọng hai lần.

## Khởi đầu

`data/economy.json` là nguồn cấu hình, được gắn sau khi tải các pack.

| Nhóm | Tài sản gia đình thông thường |
|---|---:|
| Slime, Goblin, Kobold, Ghoul, Troll, Lizardman, Imp | 0–5 |
| Elf, Demon, Orc, Minotaur | 5–15 |
| Human, Beastman, Dwarf | 15–25 |
| Dragon, High Demon, Vampire | 20–30 |
| Xuất thân thương nhân/quý tộc có cơ nghiệp | 40–60 |

Giam cầm từ xuất thân ưu tiên tài sản 0. Nghèo, sa cơ và bị bỏ rơi ưu tiên 0–5,
tránh hiểu nhầm người nô lệ trong lâu đài là người sở hữu lâu đài. Các ngoại lệ
cụ thể như con kỹ nữ, trẻ tị nạn và con người hầu nằm ở `originStarting`.
Tài sản lúc nhỏ phản ánh gia cảnh; trẻ nhỏ vẫn không kiếm được tiền cá nhân từ
phần thưởng ngẫu nhiên. Bản lưu cũ giữ tài sản hiện có, không bị cấp lại hay xóa.

## Thu nhập và nguồn thưởng

- Nghề thường giữ 25% thu nhập sau chi phí vật tư, sinh hoạt và bảo dưỡng.
  Tích lũy tự nhiên dừng tại `min(trần tộc, 25 + rank × 5)`; Human bình thường
  chủ yếu ở 25–35 trước bậc hiển thị 4, thưởng thường có thể đưa tới 40.
- Elf/Demon không làm thương mại dừng tại 30, kể cả bậc nghề cao.
- Nghề thương mại giữ 50% thu nhập. Khi làm việc và có trên 30 tài sản, thương
  nhân hoặc nhân vật bậc hiển thị 4–5 đủ điều kiện có lợi tức vốn 2% theo nhịp
  năm chuẩn hóa. Chỉ cần bị giam là dừng thu nhập và lợi tức.
- Bậc hiển thị 4/5 của nghề thường có trần tích lũy tự nhiên 75/90; nghề thương
  mại là 100. Phần thưởng vẫn có thể đưa người đủ điều kiện đến 100.
- Các khoản tăng tài sản thường từ phiêu lưu/sự kiện còn 25% giá trị chỉ số,
  làm tròn tối thiểu 1 và dừng ở trần thường của tộc. Thiệt hại và giá mua ghi
  rõ vẫn giữ nguyên, không giảm lén chi phí.
- Kho báu, thừa kế, bổng lộc lớn trong truyện một lần và nhiệm vụ không lặp có
  thưởng ít nhất 25 được đánh dấu `wealthKind: "windfall"`. Đây là ngoại lệ
  cho phép người bình thường có bước nhảy kinh tế. Không gắn loại này cho
  cảnh lặp để tránh tái tạo kho báu vô hạn.
- `wealthKind: "commerce"` quyết toán thương vụ theo đúng vốn/lãi được ghi.
  `refund` dùng cho hoàn vốn, không chia nhỏ khoản hoàn. Những loại này không
  tự tạo điều kiện gia nhập thương mại; engine vẫn xét nghề và bối cảnh.

Trần chỉ ngăn **khoản cộng mới**, không cắt tài sản đang có từ bản lưu hay
một lần tìm kho báu. Khi đổi nghề, cơ nghiệp không biến mất.

## Thương mại bản địa

`job.finance` xác định nghề kinh tế, độc lập với `job.progression` dùng để chọn
kịch bản thăng tiến. Các nghề thực sự có thương vụ gồm Human merchant, Dwarf
Gem Merchant, Demon Blood Merchant và **Thương nhân Đại Ngàn** mới của Elf.
Nghề thương nhân dùng chung `merchant` vẫn được đánh dấu cho dữ liệu nền.

Elf/Demon/Dwarf giữ nội dung giao ước, ma thảo, ma tinh và thành trì của riêng
mình; không chuyển lại sang mẫu thuê sạp gia vị của người phàm. Imp Dark Scribe
và Kobold Overseer không còn được coi là thương nhân chỉ vì mẫu thăng tiến cũ.
Dragon/High Demon/Vampire giữ đạo thống, không sinh lương hay lợi tức tiền công.

Ma vật hoang dã, nhóm tự cấp và cổ tộc không bị trừ máu hoặc hạn chế An dưỡng
chỉ vì không có tiền người phàm, cũng không bị trừ chi phí sinh hoạt kiểu người
phàm. Đói rét, giam cầm, chiến đấu và bệnh tật qua sự kiện vẫn có hậu quả thật.
Human/Beastman/Dwarf nghèo hoặc nhân vật bị giam vẫn chịu quy tắc suy kiệt cũ.

## Hiển thị

| Giá trị | Địa vị tài sản |
|---|---|
| 0–10 | Cơ hàn; ma vật hoang dã dùng nhãn Hoang dã |
| 11–35 | Bình dân |
| 36–60 | Khá giả |
| 61–85 | Phú hào |
| 86–100 | Cự phú đại lục |

Bốn thanh: Sức khỏe đỏ, Hạnh phúc vàng, Tài sản xanh, Danh vọng tím. Rồng,
High Demon, Demon, Imp và Vampire dùng tên **Uy danh**. Mỗi thanh có giá trị,
nhãn trợ năng và mô tả mức tài sản/danh vọng. Điện thoại dùng bố cục 2 × 2.
Danh vọng không tự tăng khi tài sản tăng: giàu ngầm và nổi danh thanh bạch là
hai hướng độc lập.

Kiểm tra: `node tools/test-economy-epoch.js`, `npm run test:stories`, `npm test`.
