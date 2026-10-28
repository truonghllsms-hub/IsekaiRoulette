# Prompt cho Gemini lên kịch bản

Cách dùng: copy nguyên khối trong ô code, dán vào Gemini (web hoặc CLI).
Mỗi prompt tự đầy đủ, Gemini không cần biết các prompt trước.
Thay các chỗ `<<...>>` trước khi gửi. Lưu kết quả vào đúng file ghi ở đầu mỗi mục, rồi gửi lại cho Claude kiểm tra.

Thứ tự: **P1 → (bạn chọn giọng) → P2 → P3 cho từng tộc → P4/P5 cho từng tộc × giai đoạn → P6**.

---

## P1 — Chọn giọng văn → `content/style_samples.md`

```
Bạn là biên kịch cho một web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai (đầu thai sang thế giới kỳ ảo).
Người chơi không chọn được mình là ai; mỗi lượt bấm, cuộc đời trôi thêm một năm (hoặc nhiều năm), mỗi lượt hiện 1–2 câu. Thỉnh thoảng có một bước ngoặt cho người chơi chọn.

Hãy viết CÙNG MỘT đoạn đời theo 3 giọng văn khác nhau để tôi chọn:
- Nhân vật: một Goblin, từ lúc sinh đến 4 tuổi (Goblin sống khoảng 15–20 năm).
- Mỗi năm 1–2 câu, ghi dạng "Tuổi X: ...".
- Ở tuổi 3 có một lựa chọn A/B, viết kết quả của cả hai.
- Kết thúc bằng 1 câu văn bia ngắn.

Giọng (a): điềm tĩnh, hơi buồn, câu rất ngắn, tả việc không tả cảm xúc.
Giọng (b): hài hước khô khan, chi tiết bất ngờ ở câu thứ hai.
Giọng (c): u tối, tàn khốc, thế giới không thương xót.

Yêu cầu: tiếng Việt, ngôi thứ hai ("bạn"), không dùng tên riêng, câu chữ hay tình huống của bất kỳ game/truyện có thật nào.
```

---

## P2 — Bối cảnh thế giới → `content/world.json`

```
Bạn là người thiết kế thế giới cho một web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai kỳ ảo.
Thế giới có 17 tộc: Human, Beastman, Dwarf, Demon, Elf, Goblin, Slime, Kobold, Lizardman, Vampire, Imp, Orc, Minotaur, Troll, Ghoul, Dragon, High Demon.
Ma vật (Goblin, Slime, Kobold, Imp, Orc, Minotaur, Troll, Ghoul, Demon, High Demon, Lizardman) thường bị con người săn; hội mạo hiểm giả sống bằng nghề đó.

Hãy tạo bối cảnh gồm:
- Tên thế giới, 1 đoạn giới thiệu 3 câu.
- 7 vùng đất: id, tên, khí hậu, các tộc sống chủ yếu, chế độ cai trị, độ nguy hiểm 1–5, 2 địa danh nổi bật.
- 3 tôn giáo: tên, thần thờ, thái độ với ma vật.
- Tiền tệ và lịch (tên năm, 4 mùa).
- 8 tổ chức: hội mạo hiểm giả, học viện ma pháp, giáo hội, quân đội của Ma Vương, hội thương nhân, v.v. Mỗi tổ chức: id, tên, mục tiêu, tộc nào được gia nhập.
- 5 biến cố lớn có thể xảy ra trong đời nhân vật (chiến tranh, dịch bệnh, Ma Vương trỗi dậy, anh hùng được triệu hồi, nạn đói).

Trả về DUY NHẤT một JSON hợp lệ, không giải thích, theo khung:
{"world":{"name":"","intro":""},"regions":[{"id":"","name":"","climate":"","races":[],"rule":"","danger":1,"landmarks":[]}],"religions":[],"currency":{},"calendar":{},"factions":[{"id":"","name":"","goal":"","races":[]}],"world_events":[{"id":"","name":"","desc":""}]}
id viết thường, không dấu, dùng dấu gạch dưới. Không dùng tên riêng của game/truyện có thật.
```

---

## P3 — Hồ sơ một tộc → `content/races/<<id>>.json`

Chạy 1 lần cho mỗi tộc. Dán kèm `world.json` nếu đã có.

```
Bạn là biên kịch cho web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai.
Hãy viết hồ sơ cho tộc: <<TÊN TỘC>> (id: <<id>>), tuổi thọ: <<tuổi thọ>>, tỉ lệ đầu thai: <<x%>>.
Bối cảnh thế giới (nếu có): <<dán world.json>>

Cần có:
1. "desc": mô tả 2 câu.
2. "society": cách tộc này sống, nuôi con, ai đứng đầu.
3. "stages": các giai đoạn đời theo TUỔI THỰC của tộc này. Dùng id: infant, child, teen, adult, middle, elder (tộc bất tử thay middle/elder bằng "ancient"). Mỗi giai đoạn: id, tên tiếng Việt hợp với tộc, start (tuổi bắt đầu), 5 chủ đề sự kiện nên có.
4. "origins": 4–6 hoàn cảnh sinh ra. Mỗi cái: id, name, weight (tổng 100), text (1–2 câu mở đầu cuộc đời, ngôi thứ hai), effects (vd {"STR":1,"wealth":-10,"flags":["orphan"]}).
5. "signature": 6 khoảnh khắc CHỈ tộc này mới có (vd Slime: hấp thụ, phân bào, tiến hóa).
6. "milestones": 5 bước ngoặt lớn có thể xảy ra, kèm 2–3 hướng đi cho mỗi bước ngoặt.
7. "deaths": 5 cách chết đặc trưng, mỗi cái: id, kind ("old" | "health" | "violent"), text (1 câu, được dùng {age}).
8. "names": {"male":[10 tên],"female":[10 tên],"family":[5 họ]} (tộc không giới tính dùng "any":[15 biệt danh]).
9. "flags": danh sách cờ trạng thái mà sự kiện của tộc này sẽ dùng (vd "chief", "evolved", "exiled").

Giọng văn: <<dán giọng đã chọn ở P1>>
Trả về DUY NHẤT một JSON hợp lệ. Tiếng Việt, ngôi thứ hai. Không dùng câu chữ hay tình huống của game/truyện có thật.
```

---

## P4 — Sự kiện thường của một tộc, một giai đoạn → `content/events/<<id>>_<<stage>>.json`

> **Đã thay bằng 1 prompt mỗi tộc: `prompts/race/<tộc>.md`** (gộp P4 + P5 + xuất thân; số lượng theo bậc tỉ lệ đầu thai).
> Tạo lại sau khi nhập thêm nội dung: `node tools/make-race-prompts.js`. Nhập kết quả: `node tools/import-race.js <file> <tộc>`.
> Mẫu chung bên dưới chỉ để tham khảo.

Đây là prompt chính, chạy nhiều lần nhất. Mỗi lần chỉ xin 1 tộc × 1 giai đoạn.

```
Bạn là biên kịch cho web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai. Mỗi lượt bấm, đời nhân vật trôi thêm vài năm và hiện 1 sự kiện ngắn.

Viết 15 sự kiện cho:
- Tộc: <<TÊN TỘC>> (id: <<id>>)
- Giai đoạn: <<stage id>> — <<tên giai đoạn>>, tuổi <<từ>>–<<đến>>
- Hồ sơ tộc (để giữ đúng chất): <<dán races/<<id>>.json hoặc tóm tắt>>
- Cờ đã có thể dùng: <<danh sách flags>>

Yêu cầu nội dung:
- 1–2 câu mỗi sự kiện, ngôi thứ hai. Câu đầu nêu việc xảy ra, câu sau là một chi tiết cụ thể, bất ngờ hoặc chua chát.
- Đa dạng: gia đình, bạn bè, sức khỏe, tiền bạc, nguy hiểm, nét riêng của tộc. Ít nhất 6/15 sự kiện phải chỉ tộc này mới có.
- 3 sự kiện lặp lại được ("once": false), loại chuyện thường ngày.
- 3 sự kiện có điều kiện ("require") theo chỉ số hoặc cờ.
- Không có cảnh lựa chọn trong lượt này.
- Giọng văn: <<dán giọng đã chọn>>
- Không dùng tên riêng, câu chữ hay tình huống của game/truyện có thật.

Định dạng — trả về DUY NHẤT một mảng JSON hợp lệ, không giải thích, không ```:
[
  {
    "id": "<<id>>_<<stage>>_ten_ngan",
    "races": ["<<id>>"],
    "stages": ["<<stage>>"],
    "weight": 6,
    "text": "Bạn học cách đặt bẫy bằng dây leo. Cái bẫy đầu tiên bắt được chính bạn.",
    "effects": { "AGI": 1 }
  },
  {
    "id": "<<id>>_<<stage>>_vi_du_2",
    "races": ["<<id>>"],
    "stages": ["<<stage>>"],
    "weight": 4,
    "once": false,
    "require": { "flags": ["raider"] },
    "text": "Bạn tìm thấy một thứ lấp lánh. Bạn giấu nó dưới tảng đá, cùng những thứ lấp lánh khác.",
    "effects": { "wealth": 3, "flags": ["hoarder"] },
    "moment": "Bắt đầu tích trữ đồ lấp lánh"
  }
]

Luật:
- id: viết thường, không dấu, chỉ a-z 0-9 và _, không trùng.
- effects chỉ dùng: STR, INT, AGI, LUCK (±1 đến ±3); health, joy, wealth (±3 đến ±30); flags, unflags (mảng).
- require chỉ dùng: STR, INT, AGI, LUCK, health, joy, wealth (giá trị tối thiểu), "below": {"health": 40} (phải thấp hơn), flags, notFlags.
- weight từ 2 đến 12. Sự kiện quan trọng weight cao, sự kiện hiếm weight thấp.
- "moment" (không bắt buộc): dòng ngắn để ghi vào màn tổng kết đời, chỉ dùng cho sự kiện đáng nhớ.
- "death" (không bắt buộc, tối đa 1 sự kiện): câu mô tả cái chết, sự kiện đó giết nhân vật.
- Trong text được dùng {name}, {race}, {age}.
```

---

## P5 — Cảnh lựa chọn của một tộc → `content/events/<<id>>_choices.json`

```
Bạn là biên kịch cho web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai. Đôi khi đời nhân vật gặp một bước ngoặt, người chơi chọn 1 trong 2–3 hướng.

Viết 8 cảnh lựa chọn cho tộc <<TÊN TỘC>> (id: <<id>>), trải đều các giai đoạn: <<danh sách stage id kèm tuổi>>.
Hồ sơ tộc: <<dán races/<<id>>.json hoặc phần milestones>>
Nên bao gồm: học hành/rèn luyện, nghề nghiệp/vai trò, tình yêu, xung đột với tộc khác, một lần đổi đời (tiến hóa, thăng cấp, lưu đày...), và một lựa chọn sống còn.

Định dạng — trả về DUY NHẤT một mảng JSON hợp lệ, không giải thích, không ```:
[
  {
    "id": "<<id>>_choice_tap_kich",
    "races": ["<<id>>"],
    "stages": ["teen"],
    "weight": 10,
    "text": "Bộ lạc chuẩn bị tập kích một xe hàng của con người.",
    "choices": [
      {
        "label": "Xông lên đầu",
        "check": { "stat": "STR", "target": 5 },
        "success": { "text": "Bạn là người đầu tiên trèo lên xe. Bạn ôm về một bao bột mì to hơn người.", "effects": { "wealth": 15, "flags": ["raider"] }, "moment": "Cuộc tập kích đầu tiên" },
        "fail": { "text": "Một người lính đá bạn văng vào bụi gai.", "effects": { "health": -30 } }
      },
      {
        "label": "Đi sau cùng nhặt đồ",
        "text": "Bạn nhặt được một cái nồi méo. Đó là tài sản lớn nhất đời bạn.",
        "effects": { "wealth": 5, "AGI": 1 }
      }
    ]
  }
]

Luật:
- 2–3 lựa chọn mỗi cảnh. label ngắn (2–5 chữ).
- Lựa chọn có rủi ro dùng "check": stat là STR/INT/AGI/LUCK, target 3 (dễ) / 6 (vừa) / 9 (khó), rồi có cả "success" và "fail".
- Lựa chọn an toàn không cần check, ghi thẳng "text" và "effects".
- Mỗi kết quả: "text" 1–2 câu, "effects" như luật bên dưới, có thể có "moment" và "flags" để mở sự kiện về sau.
- Tối đa 2 cảnh có kết quả "death" (thay cho effects) — chỉ ở nhánh fail của lựa chọn liều lĩnh.
- Lựa chọn có thể có "require" (vd {"INT": 6}) để chỉ hiện khi đủ điều kiện.
- KHÔNG đặt "effects" ở ngoài cấp cảnh, chỉ đặt trong từng lựa chọn.
- effects: STR/INT/AGI/LUCK ±1..±4; health/joy/wealth ±3..±40; flags/unflags là mảng.
- id viết thường, không dấu. Giọng văn: <<dán giọng đã chọn>>. Không dùng nội dung của game/truyện có thật.
```

---

## P6 — Cái chết và văn bia → `content/deaths.json`, `content/epitaphs.json`

```
Viết cho web game mô phỏng cuộc đời, bối cảnh isekai với 17 tộc (human, beastman, dwarf, demon, elf, goblin, slime, kobold, lizardman, vampire, imp, orc, minotaur, troll, ghoul, dragon, high_demon).

1. Cái chết: với MỖI tộc viết 4 câu: 1 "old" (chết già; tộc bất tử slime/vampire/ghoul thì bỏ qua), 1 "health" (kiệt sức/bệnh), 2 "violent" (bị giết, tai nạn — đặc trưng tộc). 
   Mảng JSON: [{"id":"death_<tộc>_<ngắn>","kind":"old|health|violent","races":["<tộc>"],"text":"..."}]
2. Văn bia: 25 câu tổng kết một đời, đọc ở màn hình cuối. 15 câu chung + 10 câu riêng cho các tộc hiếm (slime, vampire, ghoul, dragon, high_demon). Được dùng {name}, {race}, {age}, {pct} (tỉ lệ % đầu thai làm tộc này), {cause}.
   Mảng JSON: [{"id":"ep_<ngắn>","races":["<tộc>"] (bỏ trống nếu chung),"text":"..."}]

Trả về đúng 2 khối JSON, mỗi khối có tiêu đề "deaths" hoặc "epitaphs" ở dòng ngay trên. Tiếng Việt, ngôi thứ hai, 1 câu mỗi mục. Giọng văn: <<dán giọng đã chọn>>.
```

---

## Mẹo khi dùng
- Nếu Gemini trả về thiếu hoặc bị cắt: gửi "Tiếp tục từ mục còn dở, chỉ trả JSON".
- Nếu lỗi định dạng: gửi Claude file đó, Claude chạy `node tools/validate.js` và trả về danh sách lỗi để dán lại cho Gemini sửa.
- Mỗi tộc cần khoảng: P3 × 1, P4 × (số giai đoạn), P5 × 1 → khoảng 8 lần gửi một tộc.
