# Prompt Gemini v2 — 17 tộc

Mỗi file là một prompt hoàn chỉnh: dán **KHỐI CHUNG** trước, rồi gửi từng **PHẦN**.
Gemini trả về **kịch bản bằng chữ** để duyệt; duyệt xong gửi lại Claude để chuyển thành dữ liệu game.

**Quy mô:** tộc văn minh (Human, Beastman, Dwarf, Elf, Demon) có hệ số tăng theo tỉ lệ đầu thai: tộc càng hay gặp càng cần
nhiều nội dung để không lặp. Các tộc ma vật giữ mức vừa phải (×1 với tộc 2–4%, ×0,6 với tộc hiếm dưới 2%).

| Tộc | Tỉ lệ | Nhóm | Hệ số | Nghề / vai trò | Nhiệm vụ | Xuất thân | Tổng mục | Số phần | File |
|---|---|---|---|---|---|---|---|---|---|
| Human | 33% | văn minh | ×4 | 14 nghề | 32 | 20 | 408 | 18 | [human.md](human.md) |
| Beastman | 18% | văn minh | ×2.5 | 11 nghề | 21 | 14 | 318 | 17 | [beastman.md](beastman.md) |
| Dwarf | 12% | văn minh | ×1.7 | 9 nghề | 14 | 10 | 184 | 14 | [dwarf.md](dwarf.md) |
| Demon | 7% | văn minh | ×1 | 7 nghề | 10 | 10 | 126 | 11 | [demon.md](demon.md) |
| Elf | 7% | văn minh | ×1 | 7 nghề | 10 | 10 | 126 | 11 | [elf.md](elf.md) |
| Goblin | 4% | ma vật | ×1 | 5 vai trò | 11 | 7 | 110 | 10 | [goblin.md](goblin.md) |
| Slime | 3% | ma vật | ×1 | 5 vai trò | 11 | 6 | 109 | 10 | [slime.md](slime.md) |
| Kobold | 3% | ma vật | ×1 | 5 vai trò | 11 | 6 | 105 | 10 | [kobold.md](kobold.md) |
| Lizardman | 3% | ma vật | ×1 | 5 vai trò | 11 | 6 | 105 | 10 | [lizardman.md](lizardman.md) |
| Vampire | 2.5% | ma vật | ×1 | 5 vai trò | 11 | 6 | 109 | 10 | [vampire.md](vampire.md) |
| Imp | 2% | ma vật | ×1 | 5 vai trò | 11 | 6 | 105 | 10 | [imp.md](imp.md) |
| Orc | 2% | ma vật | ×1 | 5 vai trò | 11 | 6 | 105 | 10 | [orc.md](orc.md) |
| Minotaur | 1.5% | ma vật | ×0.6 | 3 vai trò | 7 | 7 | 73 | 9 | [minotaur.md](minotaur.md) |
| Troll | 0.8% | ma vật | ×0.6 | 3 vai trò | 7 | 7 | 73 | 9 | [troll.md](troll.md) |
| Ghoul | 0.5% | ma vật | ×0.6 | 3 vai trò | 7 | 6 | 72 | 9 | [ghoul.md](ghoul.md) |
| Dragon | 0.5% | ma vật | ×0.6 | 3 vai trò | 7 | 6 | 72 | 9 | [dragon.md](dragon.md) |
| High Demon | 0.2% | ma vật | ×0.6 | 3 vai trò | 7 | 4 | 70 | 9 | [high_demon.md](high_demon.md) |

Tạo lại các file này: `node tools/make-prompts-v2.js` (sửa thiết kế từng tộc trong `tools/race-design.js`).
