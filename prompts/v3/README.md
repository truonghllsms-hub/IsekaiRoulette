# Prompt Gemini v3 — mạch truyện

Lớp cốt truyện xuyên suốt, thêm lên trên kịch bản v2 (không viết lại kịch bản cũ):
- **Dàn nhân vật xuyên suốt**: {rival} kẻ thù truyền kiếp, {mentor} người dẫn dắt, {friend} tri kỷ: cùng một người đi theo cả đời.
- **Mạch truyện theo xuất thân**: mỗi xuất thân 4–5 nút nối nhau bằng dấu ấn, có rẽ nhánh và có kết.
- **Tổ đội / băng / đàn có sẵn**: tộc có trí tuệ gia nhập tổ đội 2–5 người có tên; ma vật vào băng, bầy, chiến đoàn.
- **Thuộc hạ**: tộc cao cấp hoặc đã leo cao có thuộc hạ, kể cả khác tộc.
- **Kể chuyện**: câu nhắc lại chuyện cũ, mở chương theo giai đoạn đời, năm yên ả có ký ức, tiểu sử khi chết.

Human và Goblin viết tay; 15 tộc còn lại sinh bằng `node tools/make-prompts-v3.js` từ dữ liệu game
và `tools/race-profiles-v3.js` (mô tả, giọng văn, thế giới, ví dụ nhân vật của từng tộc). Sửa profile rồi chạy lại để sinh lại.

| Tộc | File | Phần | Dàn nhân vật | Mạch xuất thân | Nhóm | Thuộc hạ | Trạng thái |
|---|---|---|---|---|---|---|---|
| Human | [human.md](human.md) | 9 | 9 kiểu × 6 | 20 × 5 | tổ đội + tự lập | | đã nhập |
| Goblin | [goblin.md](goblin.md) | 6 | 6 kiểu × 5 | 7 × 4 | băng | có | đã nhập |
| Beastman | [beastman.md](beastman.md) | 10 | 9 kiểu × 5 | 23 × 5 | tổ đội |  | chờ Gemini |
| Dwarf | [dwarf.md](dwarf.md) | 7 | 9 kiểu × 5 | 10 × 5 | tổ đội |  | chờ Gemini |
| Demon | [demon.md](demon.md) | 7 | 9 kiểu × 5 | 10 × 5 | tổ đội |  | chờ Gemini |
| Elf | [elf.md](elf.md) | 7 | 9 kiểu × 5 | 10 × 5 | tổ đội |  | chờ Gemini |
| Slime | [slime.md](slime.md) | 6 | 9 kiểu × 5 | 6 × 5 | bầy | có | chờ Gemini |
| Kobold | [kobold.md](kobold.md) | 6 | 6 kiểu × 4 | 6 × 4 | tổ đào | có | đã nhập |
| Lizardman | [lizardman.md](lizardman.md) | 6 | 9 kiểu × 5 | 6 × 5 | bầy săn | có | đã nhập |
| Vampire | [vampire.md](vampire.md) | 7 | 9 kiểu × 5 | 6 × 5 | tổ đội | có | đã nhập (thiếu tổ đội party_a, party_b) |
| Imp | [imp.md](imp.md) | 6 | 6 kiểu × 4 | 6 × 4 | bè lũ | có | đã nhập |
| Orc | [orc.md](orc.md) | 6 | 6 kiểu × 4 | 6 × 4 | chiến đoàn | có | mới có tri kỷ (8 nút), thiếu phần còn lại |
| Minotaur | [minotaur.md](minotaur.md) | 6 | 9 kiểu × 5 | 7 × 5 | bầy | có | đã nhập |
| Troll | [troll.md](troll.md) | 6 | 9 kiểu × 5 | 7 × 5 | đám | có | đã nhập |
| Ghoul | [ghoul.md](ghoul.md) | 6 | 9 kiểu × 5 | 6 × 5 | bầy | có | đã nhập |
| Dragon | [dragon.md](dragon.md) | 5 | 9 kiểu × 5 | 6 × 5 | — | có | đã nhập |
| High Demon | [high_demon.md](high_demon.md) | 4 | 9 kiểu × 5 | 4 × 5 | — | có | đã nhập |

Thứ tự bảng theo tỉ lệ đầu thai: tộc gặp nhiều nên làm trước.
