# Prompt ảnh 1: thử phong cách (Goblin)

**Mục đích:** vẽ cùng một nhân vật Goblin theo 4 phong cách khác nhau. Bạn chọn 1 phong cách, phong cách đó sẽ dùng cho cả 17 tộc.

**Cách dùng**
1. Mở một cuộc trò chuyện mới với Gemini Pro (chế độ tạo ảnh).
2. Dán **PHẦN CHUNG**, rồi dán lần lượt **A**, **B**, **C**, **D**. Mỗi lần một phong cách, mỗi lần ra 1 ảnh.
3. Mỗi phong cách nên bấm tạo lại 2–3 lần để thấy độ ổn định.
4. Gửi Claude ảnh bạn thích nhất kèm chữ cái phong cách. Có thể pha, ví dụ "nét của A, màu của C".

> Prompt viết bằng tiếng Anh vì mô hình vẽ hiểu thuật ngữ pixel art bằng tiếng Anh chính xác hơn.
> Nền màu hồng sáng (#FF00FF) là cố ý: Claude dùng màu đó để tách nền trong suốt.
> Có 2 tài khoản thì chia: tài khoản 1 vẽ A, B; tài khoản 2 vẽ C, D.

---

## PHẦN CHUNG (dán trước)

```
I am making a text-based fantasy life-simulator game. I need a pixel art character portrait.
Generate exactly ONE image per request.

SUBJECT (keep identical across all style variants):
An adult male goblin warrior, shown from the chest up, three-quarter view facing right.
Green-olive skin with dirty patches, long pointed ears (one ear notched by an old cut),
small yellow eyes with slit pupils, crooked yellowed fangs, a sly and cowardly grin.
Wears a torn leather strap across the chest and a rusty iron pauldron tied with rope.
Holds a chipped rusty short sword resting on his shoulder.

FIXED RULES:
- True pixel art: visible square pixels, hard edges, no anti-aliasing, no blur, no gradients, no painterly brushstrokes.
- Canvas looks like a 64x64 pixel sprite scaled up 8x (square image).
- Limited palette, about 24-32 colors total.
- Solid flat background of pure magenta #FF00FF, nothing else in the background.
- Character centered, head and shoulders fill about 80% of the frame, nothing cut off at the top.
- No text, no letters, no logo, no border, no frame, no signature.

Reply "Ready" and wait for the style.
```

---

## A — Cổ điển 16-bit (JRPG thập niên 90)

```
STYLE A: classic 16-bit console RPG portrait. Bold dark outline around the silhouette,
2-3 shade cel shading per color, slightly saturated colors, clean readable shapes, heroic fantasy mood.
Draw the subject now.
```

## B — Dark fantasy u tối

```
STYLE B: grim dark fantasy pixel art. Muted, desaturated palette (moss green, rust, bone, dried blood),
strong single light source from the upper left with deep shadows, gritty textures made with dithering,
the goblin looks dangerous and filthy. Draw the subject now.
```

## C — Manga / anime pixel

```
STYLE C: anime / manga style pixel art portrait like a light-novel character card.
Slightly larger expressive eyes, clean thin outlines, bright but not neon colors,
soft 3-tone shading, a bit cute and mischievous while still clearly a goblin. Draw the subject now.
```

## D — HD pixel chi tiết

```
STYLE D: modern high-detail pixel art (HD-2D look). Fine pixel details, rich shading with subtle hue shifts
(shadows shift toward purple, highlights toward yellow), rim light on the edges, small specular highlights
on metal and eyes. Still strictly pixel art with hard edges. Draw the subject now.
```
