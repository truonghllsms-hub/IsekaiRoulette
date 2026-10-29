// Builds the v2 Gemini prompts: one file per race in prompts/v2/<race>.md, plus prompts/v2/README.md.
// Each prompt asks for a human-readable SCRIPT (not JSON) so the owner can review it first.
// Run: node tools/make-prompts-v2.js [raceId ...]
const fs = require("fs");
const path = require("path");
const Engine = require("../engine");
const { loadData } = require("./load");
const DESIGN = require("./race-design");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "prompts", "v2");
const data = loadData();
const only = process.argv.slice(2);
const MAX_ITEMS_PER_PART = 30;

const n = (base, m, min) => Math.max(min, Math.round(base * m));
const fmtAge = (x) => (Math.round(x * 10) / 10).toLocaleString("vi-VN");

function counts(race, d) {
  const m = d.m;
  const origins = data.origins.filter((o) => o.races && o.races.includes(race.id));
  if (d.group === "civil") {
    return {
      oldOrigins: origins.length,
      origins: Math.max(origins.length + 2, n(5, m, 5)),
      parentEvents: n(6, m, 6),
      jobs: Math.round(5 + 2.2 * m),
      perJob: Math.round(3 + m),
      perFocus: n(3, m, 4),
      small: n(4, m, 4),
      story: n(3, m, 4),
      era: n(1, m, 2),
      perTrait: n(1, m, 1),
      partyGeneral: n(4, m, 4),
      partyRomance: n(1, m, 2),
      meet: n(2, m, 3),
      marriage: n(5, m, 5),
      children: n(5, m, 5),
      elder: n(3, m, 4),
      chains: n(4, m, 4),
      perSubtype: n(2, m, 3),
    };
  }
  return {
    oldOrigins: origins.length,
    origins: Math.max(origins.length + 1, n(6, m, 4)),
    parentEvents: n(4, m, 2),
    jobs: n(5, m, 3),
    perJob: n(4, m, 3),
    perFocus: n(3, m, 2),
    small: n(5, m, 3),
    story: n(4, m, 3),
    era: n(2, m, 1),
    perTrait: 1,
    partyGeneral: n(4, m, 3),
    meet: n(3, m, 2),
    children: n(5, m, 3),
    elder: n(4, m, 3),
    chains: n(4, m, 3),
  };
}

function totalItems(c, d) {
  const evo = d.evolution ? d.evolution.split("·").length * 4 : 0;
  const sub = d.subtypes ? d.subtypes.length * c.perSubtype : 0;
  return (
    c.origins + c.parentEvents + c.jobs * (c.perJob + 1) + 7 * c.perFocus + c.small + c.story + c.era +
    6 * c.perTrait + c.partyGeneral + (c.partyRomance || 0) + c.meet + (c.marriage || 0) + c.children + c.elder + c.chains * 2 + evo + sub
  );
}

// ---------- shared blocks ----------
const WORLD = `=== THẾ GIỚI AETHELGARD ===
Lịch Kỷ Nguyên Khai Hoang. Tiền: Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana.
Vùng đất: Đồng Bằng Thánh Quang (thủ đô Sanctus, Tháp Ngà Ma Pháp; Con người, Người lùn),
Thảo Nguyên Gió Hú (Thú nhân, Con người, Orc), Đại Ngàn Lục Bảo (Tiên tộc, Cây Thế Giới Yggdrasil),
Dãy Núi Răng Cưa (Người lùn, Kobold; Lò Rèn Vĩnh Cửu), Đầm Lầy Tử Khí (Lizardman, Slime, Goblin),
Vực Thẳm Phân Tầng (Ma tộc, Imp, Vampire, Ghoul, Troll; Cửa Ngục Than Khóc), Đảo Tro Tàn (Rồng, Minotaur; Đỉnh Hỏa Ngục).
Tôn giáo: Giáo hội Thánh Quang (Nữ thần Lumina, căm ghét ma vật), Tự Nhiên Giáo (trung lập),
Hắc Nguyệt Hội (tà giáo thờ Vực Thẳm Cổ Thần, hiến tế).
Tổ chức: Bình Minh Hội (mạo hiểm giả), Tháp Ngà Ma Pháp, Thánh Vệ Quân, Quân Đoàn Hủy Diệt (của Ma Vương),
Thương Đoàn Sói Bạc, Hội Bóng Đêm, Đấu Trường Huyết Sa, Tuần Lâm Trọng Vệ.
4 thời đại: Thời Bình · Chiến Tranh Tuyến Đầu · Kỷ Nguyên Tăm Tối (dịch bệnh, đói) · Ma Vương Giáng Thế.`;

const VOICE = `=== GIỌNG VĂN: EPIC RPG ===
Sử thi, trang trọng, tự sự cổ điển, ngôi thứ hai ("bạn"). Mỗi đoạn 1–2 câu. Câu sau là một hình ảnh
hoặc chi tiết định mệnh. Được phép hài hước khô khan hoặc u tối khi hợp cảnh.
Ví dụ đạt: "Một kỵ sĩ quý tộc ném găng xuống chân bạn giữa quảng trường, chỉ vì bạn không cúi chào."
Ví dụ đạt: "{ally} quỳ bên bạn suốt đêm, đôi tay phát sáng ánh thánh quang. Sáng hôm sau, bạn mở mắt."
KHÔNG dùng tên, câu chữ hay tình huống của game, truyện, phim có thật.`;

const RULES = `=== LỰA CHỌN PHẢI CÓ Ý NGHĨA ===
- Mỗi lựa chọn nên dựa vào MỘT chỉ số khác nhau, để người mạnh, người khôn, người nhanh, người may mắn
  đều có lối đi riêng.
- Có thể thêm một lựa chọn BỊ KHÓA nếu thiếu chỉ số hoặc dấu ấn (ví dụ "chỉ mở khi Trí tuệ từ 7").
  Người chơi vẫn thấy nó và biết mình thiếu gì.
- Luôn có ít nhất một lựa chọn an toàn hoặc hèn nhát nhưng có cái giá riêng.
- Độ khó dùng 4 mức: DỄ, VỪA, KHÓ, RẤT KHÓ.
- Hệ quả ghi rõ con số: Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +3,
  Thân thiết với {ally} +10, dấu ấn "ten_dau_an". Nếu chết thì ghi CHẾT và viết câu mô tả cái chết.
- Năm yên ả được game tự gộp lại. Vì vậy mỗi sự kiện phải ĐÁNG KỂ: có biến cố, có lựa chọn, hoặc một chi
  tiết khó quên. KHÔNG viết kiểu "một năm bình thường trôi qua".

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} tên nhân vật · {father} cha · {mother} mẹ · {maker} kẻ tạo ra/chủ nhân (cho tộc không có cha mẹ)
{ally} một đồng đội · {spouse} bạn đời · {child} một đứa con.`;

const TEMPLATE = `=== MẪU TRÌNH BÀY (dùng đúng mẫu này cho mọi sự kiện) ===

### [MÃ] Tên ngắn
- **Khi nào:** giai đoạn · việc chính · nghề và bậc (nếu có) · điều kiện khác (chỉ số, dấu ấn, có đồng đội, cha/mẹ còn sống...)
- **Tình huống:** 1–2 câu.
- **A. "Nhãn lựa chọn"** — dựa vào [chỉ số], [độ khó]
  - Thành công: 1–2 câu. → hệ quả
  - Thất bại: 1–2 câu. → hệ quả
- **B. "Nhãn lựa chọn"** — (không tung xúc xắc) 1–2 câu. → hệ quả
- **C. "Nhãn lựa chọn"** — KHÓA nếu Trí tuệ dưới 7 — 1–2 câu. → hệ quả
- **Khoảnh khắc:** (tùy chọn) một dòng ngắn ghi vào tổng kết cuộc đời.

Sự kiện KHÔNG có lựa chọn thì chỉ cần: Khi nào, Tình huống, Hệ quả.
MÃ viết thường, không dấu, bắt đầu bằng mã tộc, ví dụ {prefix}_job_duel, {prefix}_quest_ruins_2.`;

const PARENT_CARD = `Mỗi xuất thân viết theo mẫu:

### [MÃ] Tên xuất thân — tỉ lệ gặp (phần trăm, cộng các xuất thân lại khoảng 100)
- **Đoạn mở đầu:** 2–3 câu kể lúc bạn ra đời.
- **Cha:** tên · tộc · nghề hoặc vai trò · tính cách · tình trạng lúc bạn ra đời (còn sống / đã mất / bỏ đi / không rõ là ai)
- **Mẹ:** như trên
- **Anh chị em:** số lượng và một chi tiết đáng nhớ (hoặc "không có")
- **Gia cảnh:** 1 câu (giàu nghèo, được yêu thương hay bị ruồng bỏ)
- **Ảnh hưởng:** chỉ số cộng/trừ, Tài sản, dấu ấn`;

function stageLine(race) {
  const st = Engine.stagesOf(race);
  const parts = st.map((s, i) => `${s.name} ${fmtAge(s.start)}${st[i + 1] ? "–" + fmtAge(st[i + 1].start) : "+"}`);
  const life = race.lifespan ? `tuổi thọ ${race.lifespan[0].toLocaleString("vi-VN")}–${race.lifespan[1].toLocaleString("vi-VN")} năm` : "BẤT TỬ (chỉ chết vì bị giết hoặc tai họa)";
  return `${life}\n${parts.join(" · ")}`;
}

function profileOf(id) {
  const f = path.join(ROOT, "content", "races", id + ".json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : null;
}

// ---------- parts ----------
function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

function buildParts(race, d, c) {
  const civil = d.group === "civil";
  const org = d.org;
  const parts = [];
  if (d.subtypes) c.origins = Math.max(c.origins, c.oldOrigins + 2);
  const add = (title, body) => parts.push({ title, body });
  const focusList = d.focus.split("·").map((s) => s.replace(/\(.*?\)/g, "").trim()).filter(Boolean);
  const own = data.origins.filter((o) => o.races && o.races.includes(race.id));

  // 0) origins and parents (or makers, for races that are not born)
  const noParents = d.group === "monster" && /KHÔNG/.test(d.birth);
  const ownList = own.map((o) => `   - ${o.name}${o.effects && o.effects.flags && o.effects.flags.length ? ` (dấu ấn: ${o.effects.flags.join(", ")})` : ""}`).join("\n");
  if (noParents) {
    add(
      "Nguồn gốc và kẻ tạo ra",
      `Viết lại xuất thân, lần này kèm đầy đủ NGUỒN GỐC. Tộc này không được cha mẹ sinh ra:
${d.birth}

a) ${c.oldOrigins} xuất thân ĐÃ CÓ bên dưới: giữ tên và ý chính, bổ sung nguồn gốc.
${ownList}
b) Viết thêm ${c.origins - c.oldOrigins} xuất thân MỚI.

Mỗi xuất thân viết theo mẫu:

### [MÃ] Tên xuất thân — tỉ lệ gặp (phần trăm, cộng các xuất thân lại khoảng 100)
- **Đoạn mở đầu:** 2–3 câu kể lúc bạn xuất hiện trên đời.
- **Kẻ tạo ra bạn ({maker}):** là ai hoặc là gì · tính cách hoặc bản chất · còn tồn tại không · quan hệ với bạn
- **Nguồn gốc khác:** ${race.id === "ghoul" ? "kiếp trước (tên, tộc, nghề, cái chết) và những mảnh ký ức về cha mẹ, gia đình cũ" : "những thực thể cùng nguồn gốc (bản phân bào, sinh vật cùng ổ...)"}
- **Ảnh hưởng:** chỉ số cộng/trừ, Tài sản, dấu ấn

c) ${c.parentEvents} SỰ KIỆN VỀ NGUỒN GỐC trải khắp cuộc đời, theo mẫu sự kiện. Ví dụ: gặp lại {maker},
   ${race.id === "ghoul" ? "nhận ra người thân của kiếp trước, một mảnh ký ức trồi lên giữa lúc săn mồi," : "nuốt hoặc bị nuốt bởi kẻ cùng nguồn gốc,"}
   {maker} muốn thu hồi hoặc điều khiển bạn. Ghi rõ điều kiện (ví dụ "chỉ với xuất thân Bàn thí nghiệm Tử linh").`
    );
  } else {
    add(
      "Xuất thân và cha mẹ",
      `Viết lại xuất thân, lần này kèm đầy đủ thông tin CHA MẸ.
Cách ra đời của tộc này: ${d.birth}

a) ${c.oldOrigins} xuất thân ĐÃ CÓ bên dưới: giữ tên và ý chính, bổ sung cha mẹ, anh chị em, gia cảnh.
${ownList}
b) Viết thêm ${c.origins - c.oldOrigins} xuất thân MỚI.${
        d.subtypes
          ? `\nLưu ý: DẠNG THÚ được game bốc riêng theo tỉ lệ, độc lập với xuất thân. Vì vậy với mỗi xuất thân, cha mẹ mặc định CÙNG DẠNG THÚ
với nhân vật (viết "Cha: [tên] · Thú nhân cùng dạng với bạn · ..."). Nếu xuất thân chỉ hợp với vài dạng, ghi rõ "chỉ cho Lang nhân, Hổ nhân".
Ít nhất 2 xuất thân có cha mẹ KHÁC DẠNG hoặc một bên là Con người (con lai), ghi rõ con mang dạng nào.`
          : ""
      }

${PARENT_CARD}${
        d.group === "monster" && /Hai con đường|đánh cắp|Vực Thẳm Hư Vô/.test(d.birth)
          ? "\nVới những xuất thân không có cha mẹ đúng nghĩa (theo 'Cách ra đời' ở trên), thay dòng Cha/Mẹ bằng {maker}: kẻ tạo ra, chủ nhân hoặc người nuôi bạn."
          : ""
      }

c) ${c.parentEvents} SỰ KIỆN VỀ CHA MẸ trải khắp cuộc đời, theo mẫu sự kiện. Ví dụ: {father} dạy bạn điều đầu tiên,
   {mother} lâm bệnh, cha mẹ phản đối ${civil ? "nghề" : "vai trò"} hay người bạn chọn, bạn gặp lại người cha đã bỏ đi,
   cha mẹ qua đời và bạn thừa kế (hoặc gánh nợ), bạn trở thành người chăm sóc cha mẹ già.
   Ghi rõ điều kiện (ví dụ "chỉ khi cha còn sống", "chỉ khi xuất thân mồ côi").`
    );
  }

  if (d.subtypes) {
    const rows = d.subtypes.map(([name, animal, pct, note]) => `   - ${name} (${animal}) · ${pct}% · ${note}`).join("\n");
    add(
      "Các dạng Thú nhân",
      `Thú nhân có nhiều DẠNG THÚ. Mỗi nhân vật thuộc đúng một dạng, ghi rõ trong xuất thân và cha mẹ.
Các dạng và tỉ lệ gặp (bạn được chỉnh tỉ lệ hoặc thêm dạng nếu thấy hợp lý, tổng 100%):
${rows}

Với MỖI dạng, viết:
1. Ngoại hình (tai, đuôi, lông, mắt) và bản năng đặc trưng: 2–3 câu.
2. Chỉ số cộng/trừ đề xuất so với Thú nhân thường (ví dụ Miêu nhân: Nhanh nhẹn +2, Sức mạnh −1).
3. Loài người và các dạng thú khác nhìn họ thế nào: 1–2 câu.
4. 1 XUẤT THÂN RIÊNG của dạng đó, theo mẫu xuất thân kèm cha mẹ ở phần trước.
5. ${c.perSubtype} SỰ KIỆN RIÊNG cho dạng đó theo mẫu (ít nhất 2 có lựa chọn), ví dụ mèo bị cám dỗ bởi thứ lấp lánh,
   sói mất kiểm soát dưới trăng tròn, thỏ bị bắt làm nô lệ, chim ưng bị nhốt trong lồng.`
    );
  }

  // 1) jobs / roles
  const jobWord = civil ? "nghề" : "vai trò";
  const per = c.perJob + 2;
  const jobBatch = Math.max(2, Math.floor(MAX_ITEMS_PER_PART / per));
  const jobBatches = Math.ceil(c.jobs / jobBatch);
  const jobSpec = civil
    ? `Với MỖI nghề, viết:
1. Điều kiện vào nghề (chỉ số tối thiểu) và một lối vào phụ cho người có xuất thân đặc biệt.
2. Tên 5 bậc, từ thấp đến cao.
3. Câu mở đầu khi bước vào nghề.
4. 4 thử thách thăng bậc (bậc 1→2, 2→3, 3→4, 4→5), độ khó tăng dần.
5. 3 câu "năm yên ả" khi làm nghề nhiều năm không có biến cố.
6. ${c.perJob} SỰ KIỆN NGHỀ theo mẫu: ít nhất ${Math.ceil(c.perJob * 0.6)} có lựa chọn; trải đều người mới, bậc giữa, bậc cao.
   Ít nhất 1 sự kiện có thể khiến mất nghề. Ít nhất 1 sự kiện chỉ xảy ra trong thời Chiến Tranh hoặc Ma Vương.`
    : `Với MỖI vai trò, viết:
1. Điều kiện (chỉ số tối thiểu) và lối vào phụ theo xuất thân.
2. Tên 5 bậc, từ thấp đến cao.
3. Câu mở đầu khi nhận vai trò.
4. 4 thử thách thăng bậc, độ khó tăng dần.
5. 3 câu "năm yên ả".
6. ${c.perJob} SỰ KIỆN theo mẫu, ít nhất ${Math.ceil(c.perJob * 0.6)} có lựa chọn. Ít nhất 1 sự kiện có thể khiến bị giáng chức, bị đuổi hoặc mất mạng.`;
  for (let b = 0; b < jobBatches; b++) {
    const from = b * jobBatch + 1;
    const to = Math.min(c.jobs, (b + 1) * jobBatch);
    const head =
      b === 0
        ? `Tộc này có ${c.jobs} ${jobWord}. Gợi ý (được đổi tên, gộp, thay hoặc thêm nếu bạn có ý hay hơn, miễn đủ ${c.jobs}):
${d.jobs || d.roles}

Trước tiên, liệt kê đủ ${c.jobs} ${jobWord} bạn chọn (tên + chỉ số chính + 1 câu mô tả), đánh số 1 → ${c.jobs}.
Sau đó viết chi tiết ${jobWord} số ${from} → ${to}.`
        : `Viết chi tiết ${jobWord} số ${from} → ${to} trong danh sách bạn đã liệt kê.`;
    add(`${civil ? "Nghề" : "Vai trò"} ${jobBatches > 1 ? `(đợt ${b + 1}/${jobBatches})` : ""}`.trim(), `${head}\n\n${jobSpec}`);
  }

  // hierarchy / org for monsters, org-specific note for civil
  if (!civil) {
    add(
      `Thứ bậc: ${org.name}`,
      `Đặt tên 7 bậc của ${org.name} (${org.ranks}). Mỗi bậc viết 1 câu khi được thăng lên bậc đó.
Viết thêm 1 sự kiện đặc biệt để leo lên bậc cao nhất (thách đấu, lật đổ, được thừa nhận...), có 3 lựa chọn dựa vào 3 chỉ số khác nhau.`
    );
  } else if (org.name !== "Bình Minh Hội") {
    add(
      `Tổ chức: ${org.name}`,
      `Ngoài nghề, tộc này có tổ chức riêng: ${org.name}, với ${org.ranks}.
Đặt tên các bậc (nếu chưa có), mỗi bậc 1 câu khi được thăng lên. Viết 1 sự kiện gia nhập có lựa chọn và 1 sự kiện rời bỏ hoặc phản bội tổ chức.`
    );
  }

  // 2) focus events
  const fBatch = Math.max(1, Math.floor(MAX_ITEMS_PER_PART / (c.perFocus + 3)));
  const fGroups = chunk(focusList, fBatch);
  fGroups.forEach((g, i) => {
    add(
      `Sự kiện theo việc chính${fGroups.length > 1 ? ` (đợt ${i + 1}/${fGroups.length})` : ""}`,
      `Viết sự kiện theo VIỆC CHÍNH của năm. Mỗi việc chính dưới đây: ${c.perFocus} sự kiện (ít nhất một nửa có lựa chọn),
trải đều các giai đoạn đời mà việc đó có thể diễn ra, cộng thêm 3 câu "năm yên ả" cho mỗi giai đoạn phù hợp.
${g.map((x) => `- ${x}`).join("\n")}`
    );
  });

  // 3) missions
  add(
    `${civil ? "Nhiệm vụ" : "Các " + org.mission} nhỏ`,
    `${org.mission[0].toUpperCase() + org.mission.slice(1)} của ${org.name}. Mỗi cái gồm: tên, ${civil ? "hạng tối thiểu (F..S)" : "bậc tối thiểu"},
một gợi ý ngắn hiện trên bảng (ví dụ "Vừa. Hay có bẫy"), đoạn mở đầu, các CẢNH (mỗi cảnh viết theo mẫu sự kiện),
đoạn kết khi thành công, phần thưởng (Tài sản, Danh vọng, điểm thăng bậc) và khoảnh khắc.
Ghi rõ lựa chọn nào khiến THẤT BẠI NGAY, THẮNG NGAY, hoặc gây CHẾT.

Viết ${c.small} ${org.mission} NHỎ lặp lại được, 1–2 cảnh, rải đều từ bậc thấp đến bậc giữa.${
      race.id === "human" ? "\nKhông trùng với: diệt chuột cống, hái Nguyệt Quang Thảo, hộ tống đoàn buôn, quét ổ yêu tinh, truy nã cướp." : ""
    }`
  );
  const sBatch = 4;
  const storyGroups = Math.ceil(c.story / sBatch);
  for (let i = 0; i < storyGroups; i++) {
    const from = i * sBatch + 1;
    const to = Math.min(c.story, (i + 1) * sBatch);
    add(
      `${civil ? "Nhiệm vụ" : org.mission[0].toUpperCase() + org.mission.slice(1)} cốt truyện${storyGroups > 1 ? ` (đợt ${i + 1}/${storyGroups})` : ""}`,
      `${i === 0 ? `Tộc này có ${c.story} ${org.mission} CỐT TRUYỆN chỉ làm một lần, mỗi cái 3–5 cảnh, độ khó tăng dần từ bậc thấp đến bậc cao nhất.
Cái cuối cùng phải mang tầm vóc huyền thoại. Ít nhất 2 cái để lại DẤU ẤN mà phần "Chuỗi hệ quả" sẽ dùng lại.
Trước tiên liệt kê tên + bậc của cả ${c.story} cái. ` : ""}Viết chi tiết số ${from} → ${to}, cùng mẫu như phần ${org.mission} nhỏ.${
        i === storyGroups - 1
          ? `\n\nViết thêm ${c.era} ${org.mission} chỉ xuất hiện trong một thời đại cụ thể (Chiến Tranh Tuyến Đầu, Kỷ Nguyên Tăm Tối hoặc Ma Vương Giáng Thế).`
          : ""
      }`
    );
  }

  // 4) party / band
  add(
    civil ? "Tổ đội" : `${org.band[0].toUpperCase() + org.band.slice(1)}`,
    `Sự kiện về ${org.band}. Gọi đồng đội là {ally}. Mỗi đồng đội có một tính cách:
Dũng cảm, Trung thành, Tham lam, Nhút nhát, Vui tính, Lạnh lùng.
a) Với mỗi tính cách: ${c.perTrait} sự kiện riêng, tính cách phải thể hiện rõ.
b) ${c.partyGeneral} sự kiện chung: cãi vã, cứu nhau, chia chiến lợi phẩm, một người muốn rời đi, bí mật quá khứ bị lộ...
${civil ? `c) ${c.partyRomance} sự kiện đồng đội thân thiết trở thành người yêu.\nd)` : "c)"} 3 câu khi đồng đội CHẾT, 3 câu khi BỊ THƯƠNG, 3 câu khi BỎ ĐI hoặc PHẢN BỘI.`
  );

  // 5) family, evolution, old age
  if (civil) {
    add(
      "Tình duyên, gia đình, tuổi già",
      `a) ${c.meet} cảnh gặp gỡ dẫn đến tỏ tình (lễ hội, chợ, chiến trường, đền thờ...), mỗi cảnh có câu đồng ý và câu từ chối.
   Ghi rõ người kia thuộc tộc nào; ít nhất 1 mối tình khác tộc.
b) ${c.marriage} sự kiện đời sống vợ chồng: hạnh phúc, cãi vã, ngoại tình, {spouse} lâm bệnh, {spouse} qua đời...
c) ${c.children} sự kiện về con cái {child}: con tập đi, con bỏ nhà đi mạo hiểm, con nối nghề, con phản bội, con đưa cháu về...
d) ${c.elder} sự kiện tuổi già: truyền nghề, nhìn lại đời, kẻ thù cũ tìm đến, lập di chúc...`
    );
  } else {
    const evo = d.evolution ? d.evolution.split("·").map((s) => s.trim()) : [];
    add(
      `${org.mate[0].toUpperCase() + org.mate.slice(1)}, tiến hóa, tuổi già`,
      `a) ${c.meet} cảnh về ${org.mate}, mỗi cảnh có kết quả thành công và thất bại.
b) ${c.children} sự kiện về con cháu {child}${/không có/.test(org.mate) ? " (với tộc này là những kẻ bạn biến đổi hoặc tạo ra)" : ""}.
c) TIẾN HÓA, ${evo.length} nhánh: ${evo.join(", ")}. Mỗi nhánh viết: điều kiện (chỉ số, dấu ấn, tuổi),
   1 sự kiện báo hiệu, 1 sự kiện tiến hóa có lựa chọn (thành công thì tăng mạnh chỉ số và đổi hình dạng,
   thất bại có thể chết), và 2 sự kiện chỉ xảy ra SAU khi đã tiến hóa.
d) ${c.elder} sự kiện cuối đời${race.lifespan ? "" : " (với tộc bất tử: sau nhiều thế kỷ, mệt mỏi, bị lãng quên, đối diện kẻ có thể giết mình)"}.`
    );
  }

  // 6) chains
  const cGroups = Math.ceil(c.chains / 8);
  for (let i = 0; i < cGroups; i++) {
    const from = i * 8 + 1;
    const to = Math.min(c.chains, (i + 1) * 8);
    add(
      `Chuỗi hệ quả${cGroups > 1 ? ` (đợt ${i + 1}/${cGroups})` : ""}`,
      `${i === 0 ? `Tộc này có ${c.chains} CHUỖI HỆ QUẢ, mỗi chuỗi 2–3 sự kiện cách nhau nhiều năm.
- Sự kiện đầu để lại một DẤU ẤN. Sự kiện sau CHỈ xảy ra nếu có dấu ấn đó, và kết quả khác nhau tùy lựa chọn năm xưa.
- Ít nhất 2 chuỗi dùng dấu ấn từ ${org.mission} cốt truyện; ít nhất 1 chuỗi liên quan đến ${d.group === "monster" && /KHÔNG/.test(d.birth) ? "kẻ tạo ra bạn" : "cha mẹ"}.
- Ghi tên dấu ấn rõ ràng, ví dụ dấu ấn "tha_ten_trom".
` : ""}Viết chuỗi số ${from} → ${to}.`
    );
  }
  return parts;
}

function build(race) {
  const d = DESIGN[race.id];
  if (!d) throw new Error("Thiếu thiết kế cho tộc " + race.id);
  const c = counts(race, d);
  const p = profileOf(race.id) || {};
  const civil = d.group === "civil";
  const prefix = race.id.replace("high_demon", "hd").replace("beastman", "bm").slice(0, 6);
  const oldEvents = data.events.filter((e) => e.races && e.races.includes(race.id)).length;
  const pct = race.weight;
  const parts = buildParts(race, d, c);
  const totalW = data.races.reduce((s, r) => s + r.weight, 0);

  const mech = civil
    ? `- Mỗi năm người chơi chọn một VIỆC CHÍNH: ${d.focus}.
  Việc chính quyết định loại sự kiện xảy ra và chỉ số nào tăng.
- 4 chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn (thường 1–15). 3 thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Thêm Danh vọng.
- NGHỀ: chọn từ cuối tuổi thiếu niên. Mỗi nghề 5 bậc, thăng bậc bằng thử thách dựa vào chỉ số chính. Có thể mất nghề, đổi nghề.
- ${d.org.name.toUpperCase()}: ${d.org.ranks}. Nhận ${d.org.mission} gồm 1–5 CẢNH nối tiếp, mỗi cảnh 2–3 lựa chọn.
- ${d.org.band.toUpperCase()}: tối đa 3 đồng đội có tên, nghề, tính cách và độ thân thiết; có thể bị thương, chết, bỏ đi, phản bội, thành bạn đời.
- GIA ĐÌNH: cha mẹ (có thể sống, mất, bỏ đi), tỏ tình → ${d.org.mate} → con cái.
- DẤU ẤN: lựa chọn để lại dấu ấn; nhiều năm sau, sự kiện khác chỉ xảy ra nếu có dấu ấn đó.`
    : `- Mỗi năm người chơi chọn một VIỆC CHÍNH: ${d.focus}.
- 4 chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn (thường 1–15). 3 thanh: Sức khỏe, Hạnh phúc, Tài sản (với ma vật là chiến lợi phẩm, của cải). Thêm Danh vọng (tiếng tăm trong đồng loại).
- VAI TRÒ (thay cho nghề): mỗi vai trò 5 bậc, thăng bậc bằng thử thách dựa vào chỉ số chính.
- THỨ BẬC trong ${d.org.name}: ${d.org.ranks}.
- ${d.org.mission.toUpperCase()} (thay cho nhiệm vụ của mạo hiểm giả): 1–4 CẢNH nối tiếp, mỗi cảnh 2–3 lựa chọn.
- ${d.org.band.toUpperCase()} (thay cho tổ đội): tối đa 3 kẻ đồng hành có tên và tính cách.
- ${d.org.mate.toUpperCase()} (thay cho hôn nhân) và con cháu.
- TIẾN HÓA: ${d.evolution}.
- DẤU ẤN: lựa chọn để lại dấu ấn; nhiều năm sau, sự kiện khác chỉ xảy ra nếu có dấu ấn đó.`;

  const subtypeNote = d.subtypes
    ? `\n=== DẠNG THÚ ===\nMỗi Thú nhân thuộc một dạng thú: ${d.subtypes.map((s) => `${s[0]} (${s[1]})`).join(", ")}.\nKhi sự kiện chỉ hợp với một dạng, ghi rõ ở dòng "Khi nào" (ví dụ "chỉ Miêu nhân").\n`
    : "";

  const header = `# Prompt Gemini: kịch bản đời người — ${race.name.toUpperCase()} (${race.id})

Tỉ lệ đầu thai **${pct}%** · nhóm **${civil ? "văn minh (đủ nghề, Hội, tổ đội)" : "ma vật / dị tộc"}** · hệ số nội dung **×${d.m}**
Khoảng **${totalItems(c, d)}** mục nội dung, chia thành **${parts.length} phần**.

**Cách dùng**
1. Mở một cuộc trò chuyện mới với Gemini. Dán **KHỐI CHUNG** trước.
2. Dán lần lượt từng **PHẦN**, mỗi lần một phần. Đọc xong phần này mới gửi phần sau.
   Nếu Gemini dừng giữa chừng, gõ "viết tiếp".
3. Kết quả là **kịch bản bằng chữ** để bạn đọc và sửa. Chưa cần JSON.
4. Duyệt xong, gửi lại toàn bộ cho Claude để chuyển thành dữ liệu game.
${civil ? "" : "\n> Tộc này dùng các hệ thống riêng của ma vật (vai trò, thứ bậc, tiến hóa...). Claude sẽ nối vào engine sau khi bạn duyệt kịch bản.\n"}
---

## KHỐI CHUNG (dán đầu tiên)

\`\`\`
Bạn là biên kịch cho một web game chữ tiếng Việt tên "Luân Hồi Dị Giới": người chơi đầu thai vào thế giới
giả tưởng Aethelgard và sống trọn một kiếp, từ lúc sinh đến lúc chết, qua từng năm.
Lần này bạn viết kịch bản cho tộc ${race.name.toUpperCase()}. Chỉ ${pct}% linh hồn được đầu thai vào tộc này.

=== ${race.name.toUpperCase()} LÀ AI ===
${p.desc || ""}
${p.society && typeof p.society === "string" ? "Xã hội: " + p.society : ""}
Không khí riêng: ${d.tone}
Chủ đề nên khai thác: ${d.themes}
Cách ra đời: ${d.birth}

=== GIAI ĐOẠN ĐỜI ===
${stageLine(race)}
Những giai đoạn trẻ và sung sức là lúc nhiều biến cố nhất: viết nhiều cho các giai đoạn này.${
    race.lifespan && race.lifespan[1] > 300 ? "\nVới tộc sống lâu, một sự kiện có thể kéo dài hàng chục năm; hãy để thời gian cảm thấy dài." : ""
  }${!race.lifespan ? "\nTộc này bất tử: cuộc đời chỉ kết thúc khi bị giết hoặc gặp tai họa." : ""}
${subtypeNote}
=== CÁCH GAME VẬN HÀNH (để bạn viết cho khớp) ===
${mech}
- Game đã có sẵn ${oldEvents} sự kiện cũ cho tộc này (đời thường, ngẫu nhiên). Lần này bạn viết LỚP MỚI gắn với
  việc chính, ${civil ? "nghề" : "vai trò"}, ${d.org.mission}, ${d.org.band}, gia đình. Tránh lặp lại những ý quá quen.

${WORLD}

${VOICE}
Riêng tộc này: ${d.tone}

${RULES}

${TEMPLATE.replace("{prefix}", prefix).replace("{prefix}", prefix)}

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.
\`\`\`
`;

  const body = parts
    .map((pt, i) => `\n---\n\n## PHẦN ${i + 1} — ${pt.title}\n\n\`\`\`\nPHẦN ${i + 1}: ${pt.title}\n\n${pt.body}\n\`\`\`\n`)
    .join("");
  return { text: header + body, parts: parts.length, items: totalItems(c, d), c, d };
}

fs.mkdirSync(OUT, { recursive: true });
const rows = [];
for (const race of [...data.races].sort((a, b) => b.weight - a.weight)) {
  if (only.length && !only.includes(race.id)) continue;
  const r = build(race);
  fs.writeFileSync(path.join(OUT, race.id + ".md"), r.text, "utf8");
  rows.push({ race, ...r });
  console.log(`${race.id.padEnd(11)} ${String(race.weight).padStart(5)}%  ×${String(r.d.m).padEnd(4)} ${String(r.items).padStart(5)} mục  ${r.parts} phần`);
}

if (!only.length) {
  const table = rows
    .map(
      (r) =>
        `| ${r.race.name} | ${r.race.weight}% | ${r.d.group === "civil" ? "văn minh" : "ma vật"} | ×${r.d.m} | ${r.c.jobs} ${r.d.group === "civil" ? "nghề" : "vai trò"} | ${r.c.story + r.c.small + r.c.era} | ${r.c.origins} | ${r.items} | ${r.parts} | [${r.race.id}.md](${r.race.id}.md) |`
    )
    .join("\n");
  fs.writeFileSync(
    path.join(OUT, "README.md"),
    `# Prompt Gemini v2 — 17 tộc

Mỗi file là một prompt hoàn chỉnh: dán **KHỐI CHUNG** trước, rồi gửi từng **PHẦN**.
Gemini trả về **kịch bản bằng chữ** để duyệt; duyệt xong gửi lại Claude để chuyển thành dữ liệu game.

**Quy mô:** tộc văn minh (Human, Beastman, Dwarf, Elf, Demon) có hệ số tăng theo tỉ lệ đầu thai: tộc càng hay gặp càng cần
nhiều nội dung để không lặp. Các tộc ma vật giữ mức vừa phải (×1 với tộc 2–4%, ×0,6 với tộc hiếm dưới 2%).

| Tộc | Tỉ lệ | Nhóm | Hệ số | Nghề / vai trò | Nhiệm vụ | Xuất thân | Tổng mục | Số phần | File |
|---|---|---|---|---|---|---|---|---|---|
${table}

Tạo lại các file này: \`node tools/make-prompts-v2.js\` (sửa thiết kế từng tộc trong \`tools/race-design.js\`).
`,
    "utf8"
  );
}
