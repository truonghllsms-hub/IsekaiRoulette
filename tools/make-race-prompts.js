// Builds ONE ready-to-paste Gemini prompt per race: regular events + choice scenes + missing origins
// (+ deaths and names when the race has none), sized by tier (tools/tiers.js) minus what already exists.
// Run: node tools/make-race-prompts.js [raceId ...]   → prompts/race/<race>.md
const fs = require("fs");
const path = require("path");
const Engine = require("../engine");
const { loadData } = require("./load");
const { gap } = require("./tiers");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "prompts", "race");
const PART_SIZE = 25;
const data = loadData();
const only = process.argv.slice(2);

function profileOf(id) {
  const f = path.join(ROOT, "content", "races", id + ".json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null;
}

function knownFlags(raceId, profile) {
  const flags = new Set((profile && profile.flags) || []);
  const add = (eff) => eff && (eff.flags || []).forEach((f) => flags.add(f));
  for (const o of data.origins) if (o.races && o.races.includes(raceId)) add(o.effects);
  for (const e of data.events) {
    if (!e.races || !e.races.includes(raceId)) continue;
    add(e.effects);
    for (const ch of e.choices || []) [ch, ch.success, ch.fail].forEach((o) => o && add(o.effects));
  }
  return [...flags];
}

// Spread `total` over buckets in proportion to `weights` (largest remainder), so sums stay exact.
function apportion(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0);
  const raw = weights.map((w) => (total * w) / sum);
  const out = raw.map(Math.floor);
  let left = total - out.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { out[i]++; left--; } });
  return out;
}

// About how many clicks a player spends in each stage (mirrors engine.stepYears).
function turnsPerStage(race, stages) {
  const avg = race.lifespan ? (race.lifespan[0] + race.lifespan[1]) / 2 : null;
  return stages.map((s, i) => {
    const next = stages[i + 1];
    if (next) {
      const len = next.start - s.start;
      return Math.max(1, Math.min(10, len / Math.max(1, Math.round(len / 10))));
    }
    const step = race.lastStep || Math.max(1, Math.floor(avg * 0.02));
    return avg ? Math.max(1, Math.min(12, (avg - s.start) / step)) : 8;
  });
}

const fmtAge = (x) => (Math.round(x * 10) / 10).toLocaleString("vi-VN");

function build(race) {
  const profile = profileOf(race.id);
  const g = gap(data, race);
  const need = g.need;
  const stages = profile && profile.stages && profile.stages.length ? profile.stages : Engine.stagesOf(race);
  if (!need.events && !need.choices && !need.origins && !need.deaths && !need.names) return null;

  // Events follow how long the player stays in each stage; choices also lean toward the eventful middle of life.
  const turns = turnsPerStage(race, stages);
  const evPer = apportion(need.events, turns);
  const chPer = apportion(need.choices, turns.map((t, i) => t * (["teen", "adult", "middle"].includes(stages[i].id) ? 2 : 1)));

  const stageTable = stages
    .map((s, i) => {
      const next = stages[i + 1];
      const ages = next ? `${fmtAge(s.start)} đến dưới ${fmtAge(next.start)} tuổi` : `từ ${fmtAge(s.start)} tuổi trở đi`;
      const themes = s.themes && s.themes.length ? ` Chủ đề gợi ý: ${s.themes.join("; ")}.` : "";
      return `- "${s.id}" — ${s.name} (${ages}): ${evPer[i]} sự kiện thường, ${chPer[i]} cảnh lựa chọn.${themes}`;
    })
    .join("\n");

  const totalItems = need.events + need.choices + need.origins;
  const parts = Math.max(1, Math.ceil(totalItems / PART_SIZE));
  const existing = data.events.filter((e) => e.races && e.races.length === 1 && e.races[0] === race.id);
  const existingOrigins = data.origins.filter((o) => o.races && o.races.includes(race.id));
  const flags = knownFlags(race.id, profile);
  const life = race.lifespan ? `${race.lifespan[0]}–${race.lifespan[1]} năm` : "bất tử (chỉ chết khi bị giết)";
  const st0 = stages[0].id;

  const extras = [];
  if (need.origins) extras.push(`- ${need.origins} hoàn cảnh sinh ra MỚI (khác các hoàn cảnh đã có bên dưới), đặt trong mảng "origins".`);
  if (need.deaths) extras.push(`- 4 cách chết đặc trưng trong mảng "deaths": 1 "old" (chết già${race.lifespan ? "" : " — tộc bất tử thì thay bằng \"health\""}), 1 "health" (bệnh/kiệt sức), 2 "violent" (bị giết/tai nạn).`);
  if (need.names) extras.push(`- Bộ tên trong "names": {"male":[12 tên],"female":[12 tên],"family":[6 họ hoặc biệt danh]}.`);
  const needDesc = !(profile && profile.desc);
  if (needDesc) extras.push(`- "desc": 2 câu giới thiệu tộc, hiện ở màn hình đầu thai.`);

  return `Bạn là biên kịch cho web game mô phỏng cuộc đời bằng chữ, bối cảnh isekai trên lục địa Aethelgard. Người chơi đầu thai ngẫu nhiên; mỗi lượt bấm, đời nhân vật trôi thêm một khoảng thời gian và hiện 1 sự kiện ngắn; thỉnh thoảng gặp một bước ngoặt phải chọn.

GIỌNG VĂN — Epic RPG: sử thi, trang trọng, tự sự cổ điển, đậm màu thần thoại phương Tây; khơi gợi cảm giác định mệnh và cuộc phiêu lưu vĩ đại. Ngôi thứ hai ("bạn"). Ví dụ:
"Bánh xe định mệnh khẽ xoay, linh hồn bạn vượt qua cõi Hư Vô để cập bến lục địa linh thiêng."

TỘC: ${race.name} (id: ${race.id}) — tỉ lệ đầu thai ${race.weight}%, tuổi thọ ${life}.
${profile ? profile.desc + "\nXã hội: " + profile.society + "\nNét riêng: " + (profile.signature || []).map((s) => s.split(":")[0]).join("; ") : "(Chưa có hồ sơ chi tiết — hãy tự xây dựng nét văn hóa riêng phù hợp với bối cảnh bên dưới.)"}

THẾ GIỚI: Vùng đất: Đồng Bằng Thánh Quang (thủ đô Sanctus, Tháp Ma Pháp Bạch Ngà), Thảo Nguyên Gió Hú, Đại Ngàn Lục Bảo (Cây Thế Giới Yggdrasil), Dãy Núi Răng Cưa (Lò Rèn Vĩnh Cửu), Đầm Lầy Tử Khí, Vực Thẳm Phân Tầng, Đảo Tro Tàn. Tổ chức: Bình Minh Hội (mạo hiểm giả), Tháp Ngà Ma Pháp, Thánh Vệ Quân, Quân Đoàn Hủy Diệt (Ma Vương), Thương Đoàn Sói Bạc, Hội Bóng Đêm, Đấu Trường Huyết Sa, Tuần Lâm Trọng Vệ. Tôn giáo: Giáo hội Thánh Quang (Nữ thần Lumina, thù ghét ma vật), Tự Nhiên Giáo (Yggdrasil), Hắc Nguyệt Hội (tôn sùng ma vật). Tiền: Đồng Cẩm Thạch, Tinh Bạc, Huyết Kim, Lõi Mana. Mùa: Nảy Mầm, Lửa Trại, Lá Héo, Săn Bão.
Thời đại ("eras"): "peace" Thời Bình (học hành, giao thương, lễ hội, ngoại giao) · "holy_war" Chiến Tranh Tuyến Đầu (bắt lính, chạy nạn, lập công, gián điệp) · "dark_age" Kỷ Nguyên Tăm Tối (dịch bệnh, nạn đói, tà giáo) · "demon_lord" Ma Vương Giáng Thế (tập kết anh hùng, đánh Boss; ma vật bị chiêu mộ).

NHIỆM VỤ — tổng cộng ${need.events} sự kiện thường + ${need.choices} cảnh lựa chọn${need.origins ? " + " + need.origins + " hoàn cảnh sinh ra" : ""}, chia theo giai đoạn đời (tuổi thực của tộc này):
${stageTable}
${extras.join("\n")}

Yêu cầu nội dung:
- Ít nhất một nửa là chuyện CHỈ tộc này mới có. Đa dạng: gia đình, bạn bè, tình yêu, nghề nghiệp, sức khỏe, tiền bạc, hiểm nguy, tín ngưỡng.
- Khoảng 1/4 sự kiện gắn "eras" (rải đều cả 4 thời đại). Khoảng 1/5 có "once": false (chuyện thường ngày lặp lại). Khoảng 1/4 có "require" theo chỉ số hoặc cờ, để các lựa chọn trước đó dẫn tới hệ quả về sau.
- Cảnh lựa chọn: 2–3 hướng đi; hướng liều lĩnh dùng "check" (thành công/thất bại), hướng an toàn thì không. Nhiều nhất 1/4 số cảnh có nhánh "death".
- Cờ đã có, nên dùng lại: ${flags.join(", ") || "(chưa có)"}. Có thể tạo cờ mới (viết thường, không dấu).

ĐÃ CÓ — không viết trùng:
${existing.map((e) => `- ${e.id}: ${e.text.slice(0, 55)}…`).join("\n") || "- (chưa có)"}
${existingOrigins.length ? "Hoàn cảnh sinh ra đã có: " + existingOrigins.map((o) => o.name).join("; ") : ""}

CÁCH TRẢ LỜI — chia làm ${parts} phần, mỗi phần tối đa ${PART_SIZE} mục. Mỗi phần là DUY NHẤT một object JSON hợp lệ, không giải thích:
{
  "part": 1,${needDesc ? '\n  "desc": "2 câu giới thiệu tộc.",' : ""}
  "origins": [ { "id": "ten_ngan", "name": "Tên hoàn cảnh", "weight": 20, "text": "1–2 câu mở đầu cuộc đời.", "effects": { "STR": 1, "wealth": -5, "flags": ["co_moi"] } } ],
  "deaths": [ { "id": "ten_ngan", "kind": "violent", "text": "Câu mô tả cái chết, có {age}." } ],
  "names": { "male": [], "female": [], "family": [] },
  "events": [
    { "id": "${race.id}_${st0}_ten_ngan", "races": ["${race.id}"], "stages": ["${st0}"], "weight": 6,
      "text": "Câu thứ nhất kể việc xảy ra. Câu thứ hai là hình ảnh mang màu định mệnh.", "effects": { "STR": 1, "health": -5 } },
    { "id": "${race.id}_${st0}_vi_du", "races": ["${race.id}"], "stages": ["${st0}"], "eras": ["dark_age"], "once": false, "weight": 4,
      "require": { "flags": ["ten_co"], "below": { "health": 50 } }, "text": "...", "effects": { "joy": -5 }, "moment": "Dòng ngắn cho màn tổng kết đời" },
    { "id": "${race.id}_${st0}_lua_chon", "races": ["${race.id}"], "stages": ["${st0}"], "weight": 8, "text": "Tình huống bước ngoặt.",
      "choices": [
        { "label": "Hướng liều lĩnh", "check": { "stat": "STR", "target": 6 },
          "success": { "text": "...", "effects": { "wealth": 15, "flags": ["co_moi"] }, "moment": "..." },
          "fail": { "text": "...", "death": "Câu mô tả cái chết, có {age}." } },
        { "label": "Hướng an toàn", "text": "...", "effects": { "joy": -3 } }
      ] }
  ]
}
Chỉ phần 1 có ${needDesc ? '"desc", ' : ""}${need.origins ? '"origins"' : ""}${need.deaths ? ', "deaths"' : ""}${need.names ? ', "names"' : ""}; các phần sau chỉ có "part" và "events".
${!need.origins ? 'KHÔNG gửi "origins". ' : ""}${!need.deaths ? 'KHÔNG gửi "deaths". ' : ""}${!need.names ? 'KHÔNG gửi "names" (tộc này đã có tên). ' : ""}Mẫu JSON ở trên chỉ minh họa định dạng; chỉ gửi những mục được yêu cầu.
Kết thúc mỗi câu trả lời bằng một dòng riêng: "CÒN TIẾP" nếu chưa xong, hoặc "HẾT" ở phần cuối. Khi tôi gõ "tiếp", hãy viết phần kế tiếp.

LUẬT:
- id: chỉ a-z, 0-9 và _, không dấu, không trùng. Sự kiện bắt đầu bằng "${race.id}_<giai đoạn>_".
- "stages" chỉ dùng các id giai đoạn ở trên.
- "effects": STR, INT, AGI, LUCK (±1 đến ±4); health, joy, wealth (±3 đến ±40); flags, unflags (mảng). Không trường nào khác.
- "require": STR, INT, AGI, LUCK, health, joy, wealth (số tối thiểu); "below": {...} (phải thấp hơn); flags; notFlags.
- "check": stat là STR/INT/AGI/LUCK; target 3 = dễ, 6 = vừa, 9+ = khó (chỉ số tộc này thường từ 1 đến 12).
- Sự kiện có "choices" thì KHÔNG có "effects" ở ngoài. "weight" từ 2 đến 12.
- "once": false chỉ dùng cho chuyện thường ngày có thể lặp lại; sự kiện chỉ xảy ra một lần trong đời (bị xỏ khuyên, tiến hóa, mất sừng...) thì KHÔNG đặt "once".
- "deaths" → "kind" chỉ được là "old", "health" hoặc "violent".
- Tên nam và tên nữ phải khác nhau, không lấy tên nhân vật có thật trong game/truyện/phim.
- "text" 1–2 câu, tiếng Việt, được dùng {name}, {race}, {age}.
- Không dùng tên riêng, câu chữ hay tình huống của game/truyện/phim có thật.
`;
}

fs.mkdirSync(OUT, { recursive: true });
let made = 0;
for (const race of data.races) {
  if (only.length && !only.includes(race.id)) continue;
  const text = build(race);
  const file = path.join(OUT, race.id + ".md");
  if (!text) {
    if (fs.existsSync(file)) fs.unlinkSync(file);
    console.log(`${race.id}: đã đủ nội dung, không cần prompt`);
    continue;
  }
  fs.writeFileSync(file, text, "utf8");
  made++;
}
console.log(`Đã tạo ${made} prompt trong prompts/race/`);
