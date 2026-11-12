# Schema sự kiện

Mỗi file nguồn trong `data/events/` là một mảng JSON; kiểm tra game bằng
`node tools/validate.js`. Khi nhận bản thảo từ Gemini, dùng wrapper
`{"origins": [], "events": []}` và `tools/check-content-draft.js` theo hướng dẫn cuối tài liệu.

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
| `require` | | chỉ số tối thiểu, `below` (phải thấp hơn), `flags`, `notFlags`, `gender`; `subtype` chỉ phân loài được gặp, `notSubtypes` là mảng phân loài bị loại trừ |
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

## NPC xuất hiện lần đầu

Sự kiện có `{rival}`, `{mentor}`, `{friend}` tự thêm lời diện kiến lấy từ Cast
`desc`/`title` trước phần tình huống, chỉ một lần cho mỗi vai trò. Việc kiểm tra
điều kiện hoặc gọi `fmt()` để xem trước không đánh dấu đã gặp. Tên NPC tuyển mộ,
thành viên tổ đội có race/position trong metadata sẽ được định danh ngay lần
nhắc đầu. Nội dung đã có ngoặc giới thiệu không bị thêm ngoặc lặp.

NPC mới ngoài các danh sách này cần khai báo trên event hoặc quest:

```json
"npcs": [{ "name": "Garosh", "race": "Beastman tộc Sói", "position": "Thợ săn kỳ cựu" }]
```

Lần đầu sẽ hiển thị `Garosh (Beastman tộc Sói, Thợ săn kỳ cựu)`. Những lần sau
chỉ dùng tên. Đặt NPC nhiệm vụ trong `questOverrides` của pack để giữ sau build;
NPC riêng của event đặt trong `overrides` tương ứng.

## Chuyên môn và thọ nguyên

`jobChoices` chứa tối đa bốn lựa chọn bổ sung, mỗi lựa chọn bắt buộc có
`require.job` trỏ đến ID nghề thật (hoặc danh sách ID). Chúng chỉ xuất hiện khi
đúng nghề, cùng các lựa chọn thường, nên không tạo một bảng lựa chọn dài cho
mọi nhân vật. Cấu trúc check/success/fail giống lựa chọn thường.

`lifeCost` trong effects là số năm thọ nguyên chuẩn bị tiêu hao, nhân với
`yearScale` của tộc. Nó giảm `maxAge`, không được hồi lại bằng an dưỡng. Đốt hết
phần đời còn lại gây tử vong do cấm thuật. Xem [nghề nghiệp](PROFESSIONS.md) để
biên tập nhiệm vụ tại hai mốc bậc nghề.

## Cảnh Cast và giam giữ

`require.free: true` chỉ cho người tự do. `require.captiveKinds` là mảng không
rỗng trong `prison`, `slave`, `arena`, `bound`, chỉ cho đúng loại giam giữ; không
khai báo đồng thời với `free`. Điều kiện này dùng được cho sự kiện và nhiệm vụ.

Các cảnh Cast thông thường mặc định yêu cầu tự do khi build pack. Muốn viết
cảnh bạn tù phải khai báo context của Cast trong metadata **và** `captiveKinds`
của sự kiện; chỉ sửa mô tả thành “bạn tù” chưa đủ. Xem
[quy tắc Cast theo xuất thân](CAST_CONTEXT.md) để biết nguồn cấu hình và ngoại lệ.

## Biến cố kỷ nguyên

`epoch: true` đánh dấu cảnh được ghi vào bộ nhớ ba cảnh gần nhất.
`once: false` cho phép gặp lại; `cooldownYears` là số năm thực tối thiểu giữa
hai lần xuất hiện. `variants` là mảng lời dẫn thay thế cho `text`, được chọn
khi mở cảnh. Cả `text` và các biến thể đều phải giữ đúng bối cảnh, điều kiện.

Effect `epochChange` là object với các khóa `domain`, `insight`, `legacy`,
`ruin`; giá trị là thay đổi trong khoảng −20..20. Các dấu ấn được lưu trong
`c.epoch` và giới hạn 0–100. Xem `content/epoch-events.js` và
[Nhịp kỷ nguyên](CHRONOLOGY.md) để biên tập nội dung tái diễn.

## Loại thưởng tài sản

Effect `wealthKind` có thể là `ordinary`, `commerce`, `windfall`, `refund`.
Mặc định là thưởng thường. Thương vụ cần nghề đủ điều kiện mới nhận nguyên
phần tăng; kho báu một lần và hoàn vốn có thể vượt trần tích lũy thường.
Giá mua và phần trừ tài sản không bị nhân giảm. Xem [Kinh tế](ECONOMY.md)
và `tools/economy.js` về cách đánh dấu dữ liệu có sẵn khi build.

## Thoát khỏi giam giữ và bản thảo bổ sung

`effects.setFree: true` chỉ đặt trên kết quả thực sự thoát thân. Engine xóa
`c.captive` và ghi nhận tự do; không cần gắn đúng cụm từ để bộ đoán văn bản
nhận ra. Event mở đầu vẫn cần `require.captiveKinds` đúng loại.

`require.form: "none"` yêu cầu chưa tiến hóa; `"any"` yêu cầu đã có hình thái;
các chuỗi còn lại khớp đúng tên form. Không có `noForm`.

An dưỡng không kích hoạt các cảnh tạo/gia nhập nhóm mới, dù hiệu ứng nằm trong
nhánh `success`/`fail`. Cảnh chăm sóc đồng đội hiện có vẫn dùng `partyBond` và
các token có điều kiện phù hợp. Đồng đội đã mất không còn là đối tượng `{ally}`.

Bản thảo Gemini dùng wrapper `{ "origins": [], "events": [] }` để trao đổi,
**không** phải file tự nạp. Kiểm tra bằng
`node tools/check-content-draft.js /đường/dẫn/ban-thao.json`, sau đó đọc và
tích hợp vào nguồn chuẩn. Xem [bộ prompt](gemini-prompts/README.md).

## Nguồn bổ sung đã duyệt

`content/expansions/*.json` dùng wrapper `{ "origins": [], "events": [] }`;
loader nạp sau pack tộc và từ chối ID trùng. Chỉ đưa bản đã đọc, chỉnh và kiểm tra
vào thư mục này. Đây là nguồn biên tập, không phải tải bản thảo người chơi tự động.
Xuất thân có `captiveKind` tùy chọn trong `prison`, `slave`, `arena`, `bound`;
kết quả thoát ràng buộc dùng `setFree:true`.

Sự kiện lặp có `cooldownYears` không còn chịu trần hai lần của cảnh lặp cũ.
Khi dùng `variants`, mọi chuỗi phải phù hợp cùng tập lựa chọn và kết quả.

## Đồng đội và băng nhóm

`require.band` nhận ID nhóm, `true` (đang thuộc một nhóm), hoặc `false`
(không thuộc nhóm). `memberDie` và `memberLeave` nhận tên hoặc mảng tên;
`"{ally}"` trỏ đúng đồng đội trong ngữ cảnh hiện tại, không bốc người thay thế
khi người đó đã mất. Hai hiệu ứng được xử lý trước đổi thủ lĩnh/rời nhóm.
Sự kiện nhóm trong lúc An dưỡng cần ghi rõ `focus: ["rest"]` nếu thích hợp
với nghỉ ngơi; không thêm tag này cho trận đánh nhằm vượt bộ lọc.

## Cảnh nối tiếp và cuối đời

`require.after: { "event": "<id>", "years": N }` chỉ mở khi cảnh kia đã xảy ra ít nhất N năm trước.
`require.lateLife: true` chỉ mở ở 1/5 cuối tuổi thọ (tộc bất tử: giai đoạn cuối). Trường `story` do
`tools/storylines.js` gắn, không viết tay; xem [Đa dạng nghề và tuyến truyện](VARIETY.md).
