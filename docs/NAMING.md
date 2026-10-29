# Bảng thuật ngữ: phong cách manga / light novel dịch

Áp dụng cho MỌI nội dung: dữ liệu game, prompt Gemini, và **kịch bản Gemini gửi về trước khi chuyển thành JSON**
(Claude rà và sửa theo bảng này khi nhận kịch bản).

## Nguyên tắc
1. **Tên chủng tộc giữ nguyên tiếng Anh** như trong manga: Goblin, Elf, Dwarf, Orc, Slime...
   Lần đầu giới thiệu kèm một câu giải thích: "Bạn là Gruum, thuộc chủng tộc **Goblin** (tiểu yêu da xanh, sống theo bầy...)".
2. **Chức danh, nghề, cấp bậc** dùng lối dịch quen thuộc của truyện isekai:
   - Hán Việt đã thành chuẩn trong truyện dịch: Kiếm Thánh, Hiền Giả, Dũng Giả, Ma Vương, Thánh Nữ, Ma pháp sư, Mạo hiểm giả hạng S.
   - Hoặc tên class tiếng Anh: Assassin, Priest, Blacksmith, Hobgoblin, Goblin Shaman, Goblin King.
   - Biến thể / tiến hóa của ma vật luôn theo tiếng Anh: Hobgoblin, Goblin Lord, High Orc, Slime King, Ancient Dragon, Lich.
3. **Tránh dịch thuần Việt** kiểu "Yêu tinh xanh", "Khổng lồ ngốc", "Cẩu đầu nhân", "Chằn tinh", "Người lùn".
4. **Hệ thống trò chơi** gọi như manga: Guild, hạng F→S, Skill, Status, Level up, tiến hóa, triệu hồi.
5. Văn kể vẫn là tiếng Việt Epic RPG, ngôi thứ hai. Chỉ tên riêng và thuật ngữ mang màu manga.

## Chủng tộc
| id | Tên hiển thị | Giải thích ngắn (hiện khi đầu thai) |
|---|---|---|
| human | Human | loài người: tuổi thọ ngắn, tham vọng không đáy |
| beastman | Beastman | thú nhân mang tai, đuôi và bản năng của loài thú |
| dwarf | Dwarf | tộc thợ rèn lùn và vạm vỡ, sống trong lòng núi |
| demon | Demon | ma tộc mang sừng và ma lực Vực Thẳm, sống hàng thế kỷ |
| elf | Elf | tộc tai nhọn của rừng thiêng, sống cả nghìn năm |
| goblin | Goblin | tiểu yêu da xanh sống theo bầy, yếu ớt nhưng ranh mãnh |
| slime | Slime | khối nhầy không hình dạng, nuốt mọi thứ để tiến hóa |
| kobold | Kobold | sinh vật nửa chó nửa thằn lằn, thợ đào hầm và thờ Rồng |
| lizardman | Lizardman | người thằn lằn của đầm lầy, khoác vảy như giáp |
| vampire | Vampire | huyết tộc bất tử, sống nhờ máu tươi |
| imp | Imp | tiểu quỷ có cánh dơi, ranh mãnh và láu lỉnh |
| orc | Orc | chiến binh da xanh nanh dài, trọng sức mạnh và danh dự |
| minotaur | Minotaur | đầu bò thân người khổng lồ, canh giữ mê cung |
| troll | Troll | gã khổng lồ hôi hám, tái sinh chi thể, đầu óc đơn giản |
| ghoul | Ghoul | xác chết sống dậy, ăn thịt người chết |
| dragon | Dragon | rồng: thực thể nguyên tố tối thượng, sống hàng vạn năm |
| high_demon | High Demon | thượng ma tộc, hoàng tộc của Ma giới |

Beastman ghi kèm dạng thú: **Beastman tộc Mèo**, tộc Chó, tộc Sói, tộc Cáo, tộc Thỏ, tộc Hổ, tộc Gấu, tộc Chuột, tộc Ưng.

## Tổ chức và thế lực
| Tên cũ (thuần Việt) | Tên mới |
|---|---|
| Bình Minh Hội | Guild Bình Minh (Hội Mạo hiểm giả) |
| Tháp Ngà Ma Pháp | Học viện Ma pháp Tháp Ngà |
| Thánh Vệ Quân | Thánh Kỵ Sĩ Đoàn |
| Quân Đoàn Hủy Diệt | Quân đoàn Ma Vương |
| Thương Đoàn Sói Bạc | Thương hội Sói Bạc |
| Hội Bóng Đêm | Guild Sát thủ Umbra |
| Đấu Trường Huyết Sa | Đấu trường Huyết Sa |
| Tuần Lâm Trọng Vệ | Đội Ranger Đại Ngàn |
| Anh Hùng được triệu hồi | Dũng Giả (Hero) được triệu hồi |

## Nghề của Human (đang có trong game)
| Nghề | 5 bậc |
|---|---|
| Kiếm sĩ | Kiếm sĩ tập sự → Kiếm sĩ → Kỵ sĩ → Kiếm Vương → Kiếm Thánh |
| Ma pháp sư | Học đồ → Ma pháp sư → Đại Ma pháp sư → Hiền Giả → Đại Hiền Giả |
| Assassin | Thief → Assassin → Sát thủ Bóng Đêm → Ám Sát Vương → Chúa tể Umbra |
| Priest | Tu sĩ tập sự → Priest → Thánh quan → Đại Giáo chủ → Thánh nhân / Thánh Nữ |
| Blacksmith | Thợ phụ → Blacksmith → Master Smith → Đại sư rèn → Rèn Thần |
| Thương nhân | Thương nhân dạo → Chủ tiệm → Thương nhân hạng sang → Đại Thương nhân → Thương Vương |
| Nông dân | Tá điền → Nông dân → Chủ trang trại → Địa chủ → Lãnh chúa đất đai |
