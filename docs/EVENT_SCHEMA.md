# Schema sự kiện

Mỗi file trong `data/events/` là một mảng JSON. Gemini phải trả về đúng dạng này.
Kiểm tra bằng `node tools/validate.js`.

## Sự kiện thường

```json
{
  "id": "goblin_child_trap",
  "races": ["goblin"],
  "stages": ["child"],
  "weight": 8,
  "require": { "STR": 5, "flags": ["raider"], "notFlags": ["chief"], "below": { "health": 50 } },
  "text": "Bạn học cách đặt bẫy bằng dây leo. Cái bẫy đầu tiên bắt được chính bạn.",
  "effects": { "AGI": 1, "health": -5, "flags": ["trapper"] },
  "moment": "Đặt cái bẫy đầu tiên"
}
```

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `id` | có | viết thường, không dấu, duy nhất. Dạng `<tộc>_<giai đoạn>_<tên>` |
| `races` | | chỉ các tộc này gặp. Bỏ trống = mọi tộc |
| `excludeRaces` | | các tộc không bao giờ gặp |
| `tags` | | chỉ tộc có tag này gặp: `civil`, `monster`, `humanoid`, `undead`, `immortal`, `legend` |
| `stages` | | `infant`, `child`, `teen`, `adult`, `middle`, `elder`, `ancient` (tộc bất tử) |
| `minAge`, `maxAge` | | giới hạn tuổi thực |
| `weight` | | độ hay xảy ra, mặc định 1. Thường 2–12 |
| `once` | | mặc định `true` (mỗi đời 1 lần). `false` cho sự kiện lặp lại |
| `require` | | chỉ số tối thiểu, `below` (phải thấp hơn), `flags`, `notFlags`, `gender` |
| `text` | có | 1–2 câu, ngôi thứ hai. Được dùng `{name}` `{race}` `{age}` `{origin}` `{stage}` |
| `effects` | | `STR` `INT` `AGI` `LUCK` (thường ±1..3), `health` `joy` `wealth` (±5..30), `flags`, `unflags` |
| `moment` | | dòng ngắn ghi vào màn tổng kết cuộc đời |
| `death` | | câu mô tả cái chết, sự kiện này giết nhân vật |

## Sự kiện có lựa chọn

Không có `effects` ở ngoài, mỗi lựa chọn tự có kết quả. 2–4 lựa chọn.

```json
{
  "id": "goblin_teen_raid",
  "races": ["goblin"],
  "stages": ["teen"],
  "weight": 12,
  "text": "Bộ lạc chuẩn bị tập kích một xe hàng của con người.",
  "choices": [
    { "label": "Xông lên đầu", "check": { "stat": "STR", "target": 5 },
      "success": { "text": "...", "effects": { "wealth": 15 }, "moment": "Cuộc tập kích đầu tiên" },
      "fail":    { "text": "...", "effects": { "health": -30 } } },
    { "label": "Đi sau cùng nhặt đồ", "text": "...", "effects": { "wealth": 5 } }
  ]
}
```

- `check`: tỉ lệ thành công ≈ 50% + 8% × (chỉ số − target), có cộng thêm May mắn. Target 3 = dễ, 6 = vừa, 9+ = khó.
- Lựa chọn có thể có `require` (vd. chỉ hiện khi INT ≥ 6).
- `success`/`fail` hoặc lựa chọn thường có thể có `death` thay cho `effects`.

## Thời đại (`eras`)
Thêm `"eras": ["peace" | "holy_war" | "dark_age" | "demon_lord"]` để sự kiện chỉ xảy ra trong thời đại đó.
Bỏ trống = mọi thời đại. Thời đại được bốc lúc sinh (40/30/20/10%) và đổi sau mỗi 30–120 năm.

## Giọng văn: Epic RPG (đã chốt)
- Sử thi, trang trọng, tự sự cổ điển, đậm màu thần thoại phương Tây. Ngôi thứ hai.
- 1–2 câu chau chuốt; câu sau là hình ảnh hoặc chi tiết định mệnh.
- Dùng địa danh và tổ chức của Aethelgard (xem `content/WORLD.md`).
- Không dùng tên riêng, câu chữ hay tình huống của game/truyện có thật.
