# Luân Hồi Dị Giới — Kế hoạch

Web game mô phỏng cuộc đời sau khi đầu thai sang dị giới. Chơi bằng chữ và nút lựa chọn.
Mở `index.html` hoặc chạy `node tools/serve.js` rồi vào http://localhost:5173.

## Tiêu chí "xong" (kiểm tra tự động: `npm test`)
- [x] Tỉ lệ đầu thai khớp bảng 17 tộc, sai số dưới 1% (100.000 lần bốc)
- [x] 1.000 kiếp mỗi tộc chạy hết đời, không lỗi, không kẹt
- [x] Mọi file dữ liệu đúng schema
- [ ] Mỗi tộc có ít nhất 40 sự kiện riêng và 6 cảnh lựa chọn
- [ ] Câu lấp chỗ ("một năm bình thường") dưới 15% số dòng của mỗi kiếp
- [ ] Mỗi tộc có ít nhất 4 cách chết riêng

## Mốc

### M1 — Khung game (Claude) ✅
- [x] Engine: bốc tộc theo tỉ lệ, xuất thân, chỉ số × hệ số tộc, giai đoạn đời theo tuổi thọ
- [x] Nhịp thời gian: khoảng 10 lượt mỗi giai đoạn, tộc sống lâu tua theo thập kỷ hoặc thế kỷ
- [x] Sự kiện lọc theo tộc, tag, giai đoạn, tuổi, chỉ số, cờ; cảnh lựa chọn có tung xúc xắc theo chỉ số
- [x] Cái chết: tuổi già, sức khỏe, tai nạn theo nguy cơ của tộc, hoặc do sự kiện
- [x] Giao diện web: đầu thai → lộ tộc → dòng đời → lựa chọn → tổng kết và văn bia
- [x] Công cụ: `validate`, `simulate`, `build`, `serve`, `ask-gemini.ps1`
- [x] Nội dung mẫu: 26 sự kiện chung, Human 16, Goblin 11, Slime 12

### M2 — Nền nội dung (Gemini, Claude duyệt) — chờ API key
- [ ] G1 giọng văn → bạn chọn → `docs/STYLE_GUIDE.md`
- [ ] G2 thế giới · G3 hồ sơ tộc · G4 giai đoạn đời · G5 xuất thân · G6 tên

### M3 — Nội dung 3 tộc mẫu (Gemini)
- [ ] Human, Goblin, Slime: mỗi tộc lên 40+ sự kiện, 6+ cảnh lựa chọn
- [ ] Viết lại sự kiện mẫu theo giọng văn đã chọn

### M4 — 14 tộc còn lại (Gemini, chạy song song theo nhóm)
- [ ] Nhóm văn minh: Beastman, Dwarf, Elf, Vampire
- [ ] Nhóm ma vật nhỏ: Kobold, Imp, Lizardman, Orc
- [ ] Nhóm ma vật lớn: Minotaur, Troll, Ghoul, Demon
- [ ] Nhóm huyền thoại: Dragon, High Demon

### M5 — Cân bằng và chơi thử
- [ ] Chỉnh hệ số và nguy cơ theo kết quả `simulate`
- [ ] Bạn chơi thử, góp ý; đăng bản web để chia sẻ

## Vấn đề đã biết
- Rồng chưa có cảnh lựa chọn nào, vì các cảnh chung chỉ dành cho tộc hình người.
- 14 tộc chưa có nội dung riêng, nên chỉ gặp sự kiện chung và hay lặp lại.
