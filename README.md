# Luân Hồi Dị Giới

Game mô phỏng một cuộc đời tại Aethelgard: quay chủng tộc, chọn hướng sống,
đưa ra quyết định và lưu Thẻ Cuộc Đời khi kết thúc.

## Chơi từ file ZIP

Giải nén toàn bộ thư mục, rồi mở `index.html` bằng Chrome, Edge hoặc Firefox mới.
Giữ nguyên thư mục `img/` và `audio/` cạnh trang HTML.
Bấm tên tổ đội trong lời mời để xem hồ sơ đầy đủ; bấm tên thành viên để xem ảnh.
Nút mặt trăng/mặt trời chuyển giao diện tối/sáng.

Để lưu ảnh thẻ ổn định và tránh giới hạn của trình duyệt với file cục bộ,
cài Node.js rồi chạy từ thư mục game:

```sh
node tools/serve.js
```

Mở **http://localhost:5173**. Game không cần cài thư viện npm để chạy.

## Phát triển và kiểm tra

```sh
npm run build            # Tạo pack và data.js
node tools/bundle.js      # Tạo dist/game.html, vẫn cần img/ và audio/
npm run test:stories      # Kiểm tra hồi quy kịch bản và cơ chế
npm run validate:sprites  # Python + Pillow + NumPy
npm test                 # Kiểm tra dữ liệu và mô phỏng 1.000 đời mỗi tộc
```

- [Tự lưu và tiếp tục hành trình](docs/SESSION.md)
- [Đối chiếu báo cáo rà soát tiếp theo](docs/FOLLOWUP_AUDIT.md)
- [Bản thảo Gemini đã tích hợp, ưu tiên Human/Beastman](docs/CONTENT_IMPORT.md)
- [Đợt sửa nội dung và cơ chế](docs/CONTENT_AUDIT.md)
- [Các prompt Gemini để viết thêm kịch bản](docs/gemini-prompts/README.md)
- [Giao diện chính Biên niên cổ thư](docs/HOMEPAGE.md)
- [Giao diện chơi, tổ đội và khung ảnh nhân vật](docs/INTERFACE.md)
- [Tài sản và bốn thanh trạng thái](docs/ECONOMY.md)
- [Bản đồ thế giới và cách xem](docs/MAP.md)
- [Nhịp kỷ nguyên và tuổi thọ gia đình](docs/CHRONOLOGY.md)
- [Ảnh gốc, tách nền và kiểm tra pixel](docs/SPRITES.md)
- [Sinh tồn và số liệu mô phỏng](docs/SURVIVAL.md)
- [Nghề nghiệp, nhiệm vụ thăng tiến và gia đình](docs/PROFESSIONS.md)
- [Giao liên, tử trận tổ đội và An dưỡng](docs/COURIER_PARTY.md)
- [Cast theo xuất thân và giam giữ](docs/CAST_CONTEXT.md)
- [Định danh NPC, câu đệm và lời kể tuổi thơ](docs/NARRATION.md)
- [Xếp hạng cuộc đời](docs/RATINGS.md)
- [Cách viết pack](docs/PACKS.md)

Chỉnh nguồn trong `content/` và `data/`, sau đó build lại. Không chỉnh thủ công
các file được sinh tự động như `data.js` và `dist/game.html`.
