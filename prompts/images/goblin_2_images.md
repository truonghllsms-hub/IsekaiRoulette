# Prompt ảnh 2: toàn bộ ảnh của Goblin

**Làm sau khi đã chọn phong cách ở file 1.**

## Danh sách ảnh (16 ảnh, thêm 2 nếu muốn)

| # | Tên file lưu | Nội dung | Kích thước | Tài khoản |
|---|---|---|---|---|
| 1 | `goblin_young.png` | Goblin nhỏ (Ấu tể, Goblin con) | chân dung 64×64 | 1 |
| 2 | `goblin_adult.png` | Goblin trưởng thành (Goblin thiếu niên, trưởng thành) | chân dung 64×64 | 1 |
| 3 | `goblin_old.png` | Goblin già (lão luyện, lão làng) | chân dung 64×64 | 1 |
| 4 | `goblin_form_hobgoblin.png` | Tiến hóa: Hobgoblin | chân dung 64×64 | 1 |
| 5 | `goblin_form_shaman_lord.png` | Tiến hóa: Goblin Shaman Lord | chân dung 64×64 | 2 |
| 6 | `goblin_form_king.png` | Tiến hóa: Goblin King | chân dung 64×64 | 2 |
| 7 | `icon_goblin_warrior.png` | Icon vai trò Goblin Warrior | icon 32×32 | 2 |
| 8 | `icon_goblin_scout.png` | Icon vai trò Goblin Scout | icon 32×32 | 2 |
| 9 | `icon_goblin_shaman.png` | Icon vai trò Goblin Shaman | icon 32×32 | 2 |
| 10 | `icon_goblin_tinker.png` | Icon vai trò Goblin Tinker | icon 32×32 | 2 |
| 11 | `icon_goblin_rider.png` | Icon vai trò Goblin Wolf Rider | icon 32×32 | 2 |
| 12–16 | `badge_tribe_1.png` … `badge_tribe_5.png` | Huy hiệu bậc bộ lạc (gộp 7 bậc thành 5 hình) | icon 32×32 | 1 |
| *17* | *`npc_goblin_chief.png`* | *(tùy chọn) Goblin Chief, dùng cho cha ở xuất thân Hang ổ Goblin Chief* | *64×64* | *1* |
| *18* | *`npc_goblin_shaman.png`* | *(tùy chọn) Goblin Shaman già, dùng cho cha ở xuất thân Con của Goblin Shaman* | *64×64* | *2* |

Mỗi tài khoản khoảng 8–9 ảnh. Nếu một ảnh lỗi, bấm tạo lại tối đa 3 lần rồi chọn ảnh đẹp nhất.

## Cách giữ phong cách đồng nhất giữa 2 tài khoản

1. Ở **cả hai tài khoản**, mở cuộc trò chuyện mới và **đính kèm ảnh phong cách bạn đã chọn** (ảnh Goblin warrior ở file 1).
2. Dán **PHẦN CHUNG**, nhưng thay dòng `[STYLE]` bằng đoạn STYLE A/B/C/D bạn đã chọn (bỏ câu "Draw the subject now").
3. Dán từng prompt ảnh, mỗi lần một ảnh.
4. Lưu đúng tên file trong bảng, rồi gửi Claude cả thư mục. Claude sẽ thu về đúng lưới pixel, ép bảng màu, xóa nền hồng và gắn vào game.

---

## PHẦN CHUNG (dán trước, kèm ảnh tham chiếu)

```
I am making a fantasy life-simulator game and need a consistent set of pixel art images for the GOBLIN race.
The attached image is the approved style reference: match its pixel size, outline style, shading and palette exactly.

STYLE: [STYLE]

FIXED RULES FOR EVERY IMAGE:
- True pixel art: square pixels, hard edges, no anti-aliasing, no blur, no gradients, no painterly strokes.
- Limited palette of about 24-32 colors, the same palette family as the reference.
- Solid flat background of pure magenta #FF00FF, nothing else in the background.
- No text, no letters, no logo, no border, no frame.
- Generate exactly ONE image per request.

PORTRAITS: look like a 64x64 sprite scaled up 8x, chest-up, three-quarter view facing right,
head and shoulders fill about 80% of the frame, nothing cut off at the top.
ICONS: look like a 32x32 sprite scaled up 16x, a single centered object with a 1-pixel dark outline,
readable at small size, no character.

GOBLIN RACE TRAITS (all goblin portraits): olive-green skin with grime, long pointed ears,
small yellow slit-pupil eyes, crooked yellow fangs, short and scrawny, sly cowardly look,
clothes made of scraps, rope, rusty metal and bones. They live in caves and swamp dungeons.

Reply "Ready" and wait for each image request.
```

---

## Chân dung theo tuổi

**1. goblin_young.png**
```
Portrait: a tiny goblin child. Oversized head and ears on a skinny body, huge curious yellow eyes,
two small baby fangs, a smear of mud on the cheek, wearing a torn rag as a tunic,
clutching a gnawed bone like a treasure. Mischievous and hungry, not cute-pretty: still a goblin.
```

**2. goblin_adult.png**
```
Portrait: an adult goblin in its prime (the same individual as the style reference is fine, but plain:
no rank symbols). Wiry muscles, a few small scars, a dirty leather vest with rope belt,
a rusty dagger tucked at the shoulder strap, a sly confident grin. This is the default goblin look.
```

**3. goblin_old.png**
```
Portrait: a very old goblin elder. Wrinkled sagging skin turning grey-green, one milky blind eye,
only two teeth left, long drooping ears with torn edges, a patchwork cloak of rat furs,
leaning on a crooked stick. A small round clay bomb with a short fuse hangs from the belt,
hinting he will go out with a bang. Cunning, bitter smile.
```

## Tiến hóa

**4. goblin_form_hobgoblin.png**
```
Portrait: a HOBGOBLIN, the evolved goblin warrior. Much taller and broader, bulging muscles with a reddish
tint over green skin, veins visible, a heavy jaw with longer tusks, skin torn at the joints from sudden growth,
crude iron chest armor that is too small for him, a spiked club on the shoulder. Wild, powerful, intimidating.
```

**5. goblin_form_shaman_lord.png**
```
Portrait: a GOBLIN SHAMAN LORD, evolved goblin dark mage. Floating slightly, eyes completely black and glowing
faint violet, ritual scars and painted runes on the face, a tall staff crowned with screaming skulls,
wisps of black cocoon threads still clinging to the shoulders, a robe of stitched hides and feathers.
Eerie and powerful, dark violet magic glow as the only bright color.
```

**6. goblin_form_king.png**
```
Portrait: the GOBLIN KING, the rarest evolution, a tyrant monster. Emerald-green skin hard like dragon scales,
burning orange eyes, a crown of melted iron spikes fused into the skull, a cloak made of a stolen royal banner,
necklaces of adventurer guild badges and elf ears, a regal and terrifying sneer. Large and imposing,
this goblin looks like a threat to the whole continent.
```

## Icon vai trò

**7. icon_goblin_warrior.png**
```
Icon: a chipped rusty short sword crossed with a small dented wooden shield painted with a crude goblin skull.
```

**8. icon_goblin_scout.png**
```
Icon: an open rusty bear trap with a small curved dagger lying across it.
```

**9. icon_goblin_shaman.png**
```
Icon: a short bone staff topped with a small skull, a glowing purple mushroom growing from the skull's eye.
```

**10. icon_goblin_tinker.png**
```
Icon: a round black scrap bomb wrapped with copper wire and a gear, the fuse lit with a tiny spark.
```

**11. icon_goblin_rider.png**
```
Icon: the head of a snarling grey dire wolf wearing a crude leather harness with a ring.
```

## Huy hiệu bậc bộ lạc

Game có 7 bậc. Gộp thành 5 hình: bậc 1–2 dùng chung, bậc 3–4 dùng chung.

**12. badge_tribe_1.png** (Goblin Peon, Goblin Grunt)
```
Icon: a crude badge made of a single rat skull tied with string. Poor and pathetic.
```

**13. badge_tribe_2.png** (Goblin Leader, Goblin Elite)
```
Icon: a crude badge of a wolf fang and two small rusty iron rings tied together with leather.
```

**14. badge_tribe_3.png** (Goblin Lord)
```
Icon: a badge made of a dwarf helmet fragment decorated with three red-painted fangs.
```

**15. badge_tribe_4.png** (Goblin Chief)
```
Icon: a bone throne seen from the front, made of skulls, with a torn red banner behind it.
```

**16. badge_tribe_5.png** (Goblin King)
```
Icon: a crown of melted, twisted iron spikes with a single green gem in the center, glowing faintly.
```

## (Tùy chọn) Nhân vật phụ

**17. npc_goblin_chief.png**
```
Portrait: a fat, brutal GOBLIN CHIEF, Ragnok the Butcher. Big belly, thick neck, wolf-pelt mantle,
a necklace of human teeth, a meat cleaver, greasy face, arrogant suspicious glare.
```

**18. npc_goblin_shaman.png**
```
Portrait: an old crazed GOBLIN SHAMAN missing a finger, wild eyes, face painted with rat blood,
holding a cracked mana crystal, wearing a hood of feathers and small bones, muttering madly.
```
