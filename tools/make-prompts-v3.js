// Writes the v3 "mạch truyện" Gemini prompts for every race that does not have one yet
// (prompts/v3/<race>.md), from the game data plus tools/race-profiles-v3.js.
// Run: node tools/make-prompts-v3.js [race ...]
const fs = require("fs");
const path = require("path");
const E = require("../engine");
const PROFILES = require("./race-profiles-v3");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "prompts", "v3");
const races = require(path.join(ROOT, "data", "races.json"));
// average age at death in 1000 simulated lives (tools/simulate.js)
const AVG_AGE = { beastman: 43, dwarf: 115, demon: 251, elf: 1003, slime: 429, kobold: 15, lizardman: 40, vampire: 1614, imp: 25, orc: 28, minotaur: 50, troll: 54, ghoul: 672, dragon: 7556, high_demon: 6971 };
const STATUS = { alive: "còn sống", dead: "đã mất", gone: "đã bỏ đi", unknown: "không rõ tung tích", none: "" };

const wanted = process.argv.slice(2);
const todo = Object.keys(PROFILES).filter((id) => !wanted.length || wanted.includes(id));
const arcCodes = fs.existsSync(path.join(OUT, "arc-codes.json")) ? JSON.parse(fs.readFileSync(path.join(OUT, "arc-codes.json"), "utf8")) : {};

const block = (s) => "```\n" + s.trim() + "\n```";
const fmtRange = (stages, i) => {
  const s = stages[i], n = stages[i + 1];
  const a = Math.round(s.start), b = n ? Math.round(n.start) : null;
  return `${s.name} ${a}${b != null ? "–" + b : "+"}`;
};

// readable arc codes where the origin id is only a number
const CODE_OVERRIDE = {
  dwarf_bg_1: "forge", dwarf_bg_2: "exile", dwarf_bg_3: "merchant", dwarf_bg_4: "arena", dwarf_bg_5: "miner",
  dwarf_bg_6: "lumina", dwarf_bg_7: "captive", dwarf_bg_8: "nomad", dwarf_bg_9: "cursed", dwarf_bg_10: "nature",
  orc_origin_1: "warborn", orc_origin_2: "chief", orc_origin_3: "gladiator", orc_origin_4: "cursed", orc_origin_5: "outcast", orc_origin_6: "exile",
  hd_origin_01: "throne", hd_origin_02: "void", hd_origin_03: "bloodmoon", hd_origin_04: "crown",
};

// a readable arc code for each origin; ids like dwarf_bg_1 get one from their mark
function arcCode(o, used) {
  if (CODE_OVERRIDE[o.id]) { used.add(CODE_OVERRIDE[o.id]); return CODE_OVERRIDE[o.id]; }
  let code = o.id.replace(/^.*?_(bg|origin)_/, "").toLowerCase();
  if (!/^[a-z][a-z_]*$/.test(code)) {
    const flag = ((o.effects && o.effects.flags) || [])[0] || "arc";
    code = flag.split("_").slice(0, 2).join("_").replace(/[^a-z_]/g, "");
  }
  let c = code, k = 2;
  while (used.has(c)) c = code + k++;
  used.add(c);
  return c;
}

function originLine(o, code) {
  const who = (k, word) => {
    const p = o[k];
    if (!p) return null;
    const bits = [p.name || "game tự đặt tên", p.role, STATUS[p.status] != null ? STATUS[p.status] : p.status].filter(Boolean);
    return `${word}: ${bits.join(", ")}`;
  };
  const name = o.name || (o.home || o.text || "").split(/[.,]/)[0].slice(0, 60);
  const parents = [who("father", "Cha"), who("mother", "Mẹ"), who("maker", "Kẻ tạo ra/chủ nhân")].filter(Boolean);
  if (!parents.length && o.noParents) parents.push("không có cha mẹ");
  const flags = ((o.effects && o.effects.flags) || []).join(", ") || "không có";
  return `- mạch "${code}" · ${o.id} · ${name} · dấu ấn sẵn có: ${flags} · ${parents.join(" · ")}`;
}

function makeRace(id) {
  const prof = PROFILES[id];
  const race = races.find((r) => r.id === id);
  const pack = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "packs", id + ".json"), "utf8"));
  const stages = (pack.stages || E.stagesOf(race)).filter((s) => s.id !== "infant" || true);
  const avg = AVG_AGE[id] || 60;
  const short = avg < 40;
  const long = avg > 200;
  const kinds = short ? 2 : 3;
  const castNodes = short ? 4 : 5;
  const arcNodes = short ? 4 : 5;
  const R = race.name;
  const org = pack.orgs && pack.orgs[0];
  const ranks = org ? (org.ranks || []).map((r) => r.name || r) : [];
  const forms = Object.keys(pack.forms || {});
  const focus = Object.values(pack.focus || {}).map((f) => f.name).filter(Boolean);
  const jobs = (pack.jobs || []).map((j) => j.name);
  const used = new Set();
  const origins = pack.origins.map((o) => ({ o, code: arcCode(o, used) }));
  arcCodes[id] = Object.fromEntries(origins.map(({ o, code }) => [code, o.id]));
  const stageLine = stages.map((s, i) => fmtRange(stages, i)).join(" · ");
  const life = stages.filter((s) => s.id !== "infant").map((s) => s.name);
  // story nodes go in the stages most lives reach (start before ~90% of the average age)
  const reach = stages.filter((s) => s.id !== "infant" && s.start < avg * 0.9).map((s) => s.name);
  const nodeStages = (n) => {
    const pool = reach.length >= 2 ? reach : life.slice(0, Math.max(2, reach.length + 1));
    return Array.from({ length: n }, (_, i) => pool[Math.min(pool.length - 1, Math.round((i * (pool.length - 1)) / Math.max(1, n - 1)))]);
  };
  const castPlan = nodeStages(castNodes);
  const arcPlan = nodeStages(arcNodes);
  const parentsWord = pack.origins.some((o) => o.maker) ? "cha mẹ hoặc kẻ tạo ra mình ({maker})" : "cha mẹ";
  const hasBand = prof.group === "band", hasParty = prof.group === "party";
  const groupCode = hasParty ? "party" : "band";
  const parts = [];

  // ---------- KHỐI CHUNG ----------
  const common = `Bạn là biên kịch chính cho web game chữ tiếng Việt "Luân Hồi Dị Giới", văn phong isekai manga/light novel dịch.
Người chơi đầu thai vào thế giới Aethelgard và sống trọn một kiếp. Game đã có sẵn khoảng ${pack.events.length} sự kiện cho chủng tộc
${R.toUpperCase()}, nhưng người chơi phàn nàn: cả đời không thành MỘT CÂU CHUYỆN, sự kiện rời rạc, nhân vật phụ xuất hiện
một lần rồi biến mất.

NHIỆM VỤ LẦN NÀY: viết LỚP CỐT TRUYỆN XUYÊN SUỐT cho ${R}. Không viết lại sự kiện cũ.

=== ${R.toUpperCase()} LÀ AI ===
${prof.who}
Một đời trung bình khoảng ${avg} năm${long ? " (rất dài: dùng thời gian, thời đại và hậu duệ để kể)" : short ? " (rất ngắn: mỗi năm dồn dập như vài năm của Human)" : ""}.
Chủ đề: ${prof.theme}
Giọng: ${prof.tone}

=== GIAI ĐOẠN ĐỜI (tuổi theo năm của ${R}) ===
${stageLine}.

=== GAME VẬN HÀNH THẾ NÀO ===
- VIỆC CHÍNH mỗi năm: ${focus.join(" · ")}.
- Chỉ số: Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn. Thanh: Sức khỏe, Hạnh phúc, Tài sản (0–100). Danh vọng (0–100).
- Vai trò/nghề (mỗi vai 5 bậc): ${jobs.join(", ")}.
${org ? `- ${org.name}: ${ranks.join(" → ")}.` : ""}
${forms.length ? `- Tiến hóa: ${forms.join(", ")}. Mạch truyện ĐƯỢC PHÉP dẫn tới dấu ấn mở đường tiến hóa.` : ""}
- ${hasParty ? `Tổ đội tối đa 3 đồng đội.` : hasBand ? `${prof.groupWord[0].toUpperCase() + prof.groupWord.slice(1)} tối đa 3 đồng bọn đi cùng.` : `Không đi theo nhóm ngang hàng; có thuộc hạ khi đủ mạnh.`}
- DẤU ẤN: lựa chọn để lại dấu ấn (mã tiếng Anh viết thường, có gạch dưới). Sự kiện sau chỉ xảy ra nếu có dấu ấn đó.
  ĐÂY LÀ CÔNG CỤ CHÍNH ĐỂ NỐI CÂU CHUYỆN.

=== THẾ GIỚI ===
${prof.world}
Chung cho Aethelgard: tiền Đồng Cẩm Thạch → Tinh Bạc → Huyết Kim → Lõi Mana. 4 thời đại: Thời Bình · Chiến Tranh Tuyến Đầu ·
Kỷ Nguyên Tăm Tối · Ma Vương Giáng Thế.

=== TÊN GỌI KIỂU MANGA (BẮT BUỘC) ===
Tên chủng tộc giữ tiếng Anh: Human, Elf, Dwarf, Beastman tộc Sói, Goblin, Orc, Kobold, Lizardman, Demon, Vampire, Imp,
Slime, Minotaur, Troll, Ghoul, Dragon. Không viết "người lùn", "yêu tinh", "tiên tộc". Văn kể tiếng Việt, ngôi thứ hai ("bạn").
Không dùng tên, câu chữ, tình huống của game/truyện/phim có thật.

=== NGUYÊN TẮC VIẾT MẠCH TRUYỆN ===
1. NHÂN QUẢ: mỗi nút bắt nguồn từ điều đã xảy ra trước (xuất thân, ${parentsWord}, lựa chọn ở nút trước) và để lại
   hậu quả cho nút sau. Người chơi phải nhận ra: "Chuyện này xảy ra VÌ năm đó mình đã...".
2. NHẮC CHI TIẾT CŨ: nút sau nhắc lại cụ thể đồ vật, vết sẹo, câu nói, tên người của nút trước.
3. CÙNG MỘT NGƯỜI: nhân vật phụ quay lại nhiều lần và thay đổi theo thời gian.
4. RẼ NHÁNH THẬT: mỗi nút 2–3 hướng, hướng nào cũng có giá phải trả.
5. CÓ KẾT, kể cả kết bi thảm.
6. KHÔNG TỰ MÂU THUẪN: người đã chết hoặc không rõ tung tích chỉ xuất hiện qua ký ức, tin đồn, di vật.

=== LỖI ĐÃ GẶP Ở KỊCH BẢN TRƯỚC, TUYỆT ĐỐI TRÁNH ===
a) KHÔNG viết điều kiện vào lời kể. Sai: "Ruk chia phần cho bạn (nếu bạn từng thắng Blor)", "(Nếu trốn thoát) Thủ lĩnh...",
   "thưởng cho bạn (và mẹ, nếu còn)". Game in nguyên văn. Điều kiện chỉ ghi ở dòng "Khi nào"; nếu tình huống khác nhau
   theo nhánh thì viết 2 phiên bản [MÃ_a] và [MÃ_b], mỗi bản một điều kiện.
b) KHÔNG giả định điều chưa chắc có. Sai: nhắc "băng nhóm của bạn" khi nhân vật có thể chưa có băng; nhắc bạn đời, con,
   nghề khi chưa chắc có. Nếu cần thì ghi CẦN ở dòng "Khi nào".
c) GIỚI TÍNH: ghi rõ nam hay nữ trong Mô tả của mỗi kiểu nhân vật và giữ nhất quán. Không viết "cậu bé/cô bé", "ông/bà".
d) Mỗi lựa chọn có tung xúc xắc PHẢI có cả "Thành công:" và "Thất bại:". Lựa chọn không tung thì ghi "(không tung xúc xắc)".
e) Không chế hệ quả mới. Chỉ dùng chỉ số, thanh, dấu ấn và danh sách hệ quả đặc biệt bên dưới. Không viết "→ An toàn".
f) Tên nhân vật phụ có tên riêng không trùng nhau và không trùng tên cha mẹ trong danh sách xuất thân.
g) Độ dài mạch vừa với tuổi thọ: nút cuối phải nằm ở giai đoạn mà phần lớn ${R} còn sống tới
   (đời trung bình ${avg} năm). Nút muộn hơn chỉ dành cho nhánh hiếm.

=== TÊN GỌI TRONG CÂU CHỮ ===
{name} nhân vật · {father} cha · {mother} mẹ${pack.origins.some((o) => o.maker) ? " · {maker} kẻ tạo ra/chủ nhân" : ""} · {spouse} bạn đời · {child} con · {ally} một đồng đội
{rival} kẻ thù truyền kiếp · {mentor} người dẫn dắt · {friend} tri kỷ (game đặt tên một lần mỗi đời, dùng suốt đời).
${hasBand || hasParty ? `{party} tên ${prof.groupWord} hiện tại · {leader} người cầm đầu · {member} một thành viên.` : ""}

=== MẪU TRÌNH BÀY NÚT TRUYỆN (dùng đúng mẫu, không in đậm, không gạch đầu dòng) ===

[MÃ NÚT] Tên nút
Mạch: mã mạch · Nút: 2/${castNodes}
Khi nào: tuổi a–b · việc chính (nếu cần) · CẦN dấu ấn x, y hoặc z · điều kiện khác
Tình huống: 2–3 câu, nhắc lại chi tiết của nút trước.
A. "Nhãn lựa chọn" — [Chỉ số], ĐỘ KHÓ
Thành công: 1–2 câu. → Sức mạnh +1, Danh vọng +5, dấu ấn x
Thất bại: 1–2 câu. → Sức khỏe −15, dấu ấn y
B. "Nhãn lựa chọn" — (không tung xúc xắc) 1–2 câu. → Tài sản −10, dấu ấn z
Nhắc lại: (x) 1 câu ngắn game chèn vào những năm sau · (y) ... · (z) ...
Khoảnh khắc: 1 dòng ghi vào tiểu sử.

Quy ước:
- Mỗi lựa chọn để lại ĐÚNG MỘT dấu ấn, mã dạng <mã mạch>_<số nút>_<từ khóa>. Nút sau ghi "CẦN dấu ấn a, b hoặc c".
- Độ khó: DỄ, VỪA, KHÓ, RẤT KHÓ. Tung xúc xắc bằng Sức mạnh, Trí tuệ, Nhanh nhẹn, May mắn hoặc Sức khỏe.
- Hệ quả ghi số: Sức mạnh +1, Tài sản +10, Sức khỏe −20, Danh vọng +5, Thân thiết với {friend} +10. Thưởng thường +5..+30.
- Hệ quả đặc biệt (viết đúng chữ): "có {spouse}", "có {child}", "{rival} CHẾT", "{mentor} CHẾT", "{friend} CHẾT",
  "{friend} gia nhập ${hasParty ? "tổ đội" : "băng"}", "{father} CHẾT", "{mother} CHẾT", "CHẾT (lý do)"${hasParty ? `,
  "gia nhập tổ đội <mã>", "tổ đội tan rã", "bị đuổi khỏi tổ đội", "trở thành đội trưởng", "<Tên> gia nhập tổ đội"` : hasBand ? `,
  "gia nhập băng <mã>", "bị đuổi khỏi băng", "băng bị xóa sổ", "băng tan rã", "trở thành đầu băng"` : ""},
  "<Tên> CHẾT", "<Tên> rời đội", "<Tên> phản bội", "Thân thiết với <Tên> +10"${prof.minions ? `,
  "thu phục thuộc hạ <mã>", "mất thuộc hạ <mã>", "thuộc hạ nổi loạn", "Thân thiết với thuộc hạ +10"` : ""}.
- Mỗi nút ít nhất 2 lựa chọn; luôn có một lựa chọn an toàn/hèn nhát với cái giá riêng.

Hãy trả lời "Đã hiểu" và chờ tôi gửi từng phần.`;

  // ---------- PHẦN 1: cast ----------
  const castCodes = ["rival", "mentor", "friend"].flatMap((r) => Array.from({ length: kinds }, (_, i) => `${r}_${"abc"[i]}`));
  const p1 = `PHẦN 1: DÀN NHÂN VẬT XUYÊN SUỐT

Mỗi kiếp ${R} có 3 nhân vật đi cùng suốt đời. Game tự đặt tên; bạn viết vai trò và câu chuyện.
Viết cho MỖI vai ${kinds} "kiểu" khác nhau (game chọn ngẫu nhiên một kiểu mỗi đời):

1. {rival} KẺ THÙ TRUYỀN KIẾP (ví dụ: ${prof.cast.rival})
2. {mentor} NGƯỜI DẪN DẮT (ví dụ: ${prof.cast.mentor})
3. {friend} TRI KỶ (ví dụ: ${prof.cast.friend})
${prof.castNote ? "\nLưu ý riêng: " + prof.castNote + "\n" : ""}
Định dạng mỗi kiểu:
KIỂU <số>: <TÊN KIỂU VIẾT HOA> (<mã mạch>)
Mô tả: giới tính, tộc, 1–2 câu với một chi tiết dễ nhớ (vết sẹo, câu cửa miệng, món đồ luôn mang theo).
Rồi 3 câu "Nhắc lại" dùng chung cho cả mạch, mỗi câu một dòng.
Rồi ${castNodes} nút truyện theo mẫu:
${castPlan.map((s, i) => `  Nút ${i + 1} (${s}): ${["Gặp gỡ", "Gắn bó hoặc va chạm", "Bước ngoặt", "Thử thách sống còn", "Hệ quả", "Khép lại"][i === castNodes - 1 ? 5 : i]}`).join("\n")}
Nhánh phải thật: kẻ thù có thể thành bạn, tri kỷ có thể phản bội, người dẫn dắt có thể chết vì bạn.
Nút cuối có 2–3 kết; được phép "{rival} CHẾT", "{friend} CHẾT"...

Mã mạch: ${castCodes.join(", ")}. Mã nút: ${id}_cast_<mã mạch>_<số>, ví dụ ${id}_cast_rival_a_3.
Tổng: ${castCodes.length} kiểu × ${castNodes} nút = ${castCodes.length * castNodes} nút. Viết {rival} trước rồi chờ tôi gõ "viết tiếp".`;

  // ---------- PHẦN 2..: origin arcs ----------
  const perPart = 4;
  const groups = [];
  for (let i = 0; i < origins.length; i += perPart) groups.push(origins.slice(i, i + perPart));
  const arcFrame = `PHẦN <số>: MẠCH TRUYỆN THEO XUẤT THÂN

Mỗi xuất thân dưới đây đã có trong game, kèm ${parentsWord} và dấu ấn sẵn có. Với MỖI xuất thân, viết một mạch ${arcNodes} nút:
${arcPlan.map((s, i) => `Nút ${i + 1} (${s}): ${["biến cố gieo mầm từ gia cảnh hoặc " + parentsWord, "hậu quả đầu tiên; nhân vật tự quyết định", "bước ngoặt lớn; quá khứ tìm đến", "đối mặt; có thể mất mát lớn", "khép lại"][i === arcNodes - 1 ? 4 : i]}`).join("\n")}
Nút cuối có 2–3 kết khác nhau tùy dấu ấn.${forms.length ? ` Một nhánh có thể mở đường tiến hóa (${forms.join(", ")}).` : ""}

Định dạng mỗi mạch:
MẠCH XUẤT THÂN: <TÊN XUẤT THÂN VIẾT HOA> (<mã mạch>)
Câu mở mạch: 1–2 câu game chèn sau đoạn ra đời, gieo một câu hỏi lớn.
Kết dở dang: 1–2 câu cho trường hợp chết trước khi mạch khép lại (không tả cách chết cụ thể, vì cách chết thật do game quyết).
Rồi ${arcNodes} nút theo mẫu. Mã nút: ${id}_arc_<mã mạch>_<số>; nhánh: ${id}_arc_<mã mạch>_3a, ${id}_arc_<mã mạch>_3b.
Sau nút cuối, với MỖI kết, một dòng:
Kết đời (<dấu ấn của kết>): 2 câu tổng kết cả đời để game đọc khi nhân vật chết.

Nút 1 ghi "CẦN dấu ấn <dấu ấn sẵn có của xuất thân>" để chỉ người có xuất thân này mới gặp.

Các xuất thân của phần này (dùng ĐÚNG mã mạch đã cho):
<dán danh sách>`;

  // ---------- chapters & biography ----------
  const pBio = `PHẦN ${groups.length + 2}: CHƯƠNG ĐỜI VÀ TIỂU SỬ

a) MỞ CHƯƠNG: với mỗi giai đoạn (${life.join(", ")}), viết 8 câu mở chương, mỗi câu gắn với một tình trạng ghi ở đầu dòng
   trong ngoặc. Tình trạng dùng đúng chữ: (mồ côi) (cha mẹ còn đủ) (nghèo) (giàu) (có nghề) (chưa có nghề) (có bạn đời)
   (cô độc) (nổi danh) (mang thương tật) (có con)${hasBand || hasParty ? ` (có ${prof.groupWord})` : ""}${forms.length ? " (đã tiến hóa)" : ""}${prof.minions ? " (có thuộc hạ)" : ""}
   (có {rival}) (có {mentor}) (có {friend}).
   Định dạng: dòng tên giai đoạn kèm tuổi, ví dụ "${fmtRange(stages, 1).replace(/ (\d+)/, " ($1").replace(/([\d+]+)$/, "$1 tuổi)")}", rồi 8 dòng "(tình trạng) câu".

b) TIỂU SỬ KHI CHẾT:
   - Dòng "Mở đầu theo xuất thân:" rồi ${origins.length} câu, mỗi câu một dòng bắt đầu bằng (mã mạch), ví dụ "(${origins[0].code}) ...".
   - Dòng "Kết thúc theo cách chết:" rồi 10 câu, mỗi câu bắt đầu bằng (cách chết): ${prof.deaths}.

c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC: 20 câu ngắn cho những năm không có biến cố, mỗi câu nhắc tới một người hay một chuyện,
   điều kiện ghi đầu dòng: (có {father}) ({mother} còn sống) ({mother} đã mất) (có {spouse}) (có {child}) ({rival} còn sống)
   ({mentor} còn sống) ({friend} còn sống) ({friend} đã mất) (cô độc).

Ba mục đặt tiêu đề đúng chữ: "a) MỞ CHƯƠNG", "b) TIỂU SỬ KHI CHẾT", "c) NHỮNG NĂM YÊN Ả CÓ KÝ ỨC".`;

  // ---------- group part ----------
  let pGroup = null;
  if (hasParty) {
    pGroup = `PHẦN ${groups.length + 3}: ${prof.groupWord.toUpperCase()} CÓ SẴN

LUẬT VỀ ĐỒNG ĐỘI: ${R} không gom đồng đội lẻ tẻ. Nhân vật được MỜI hoặc XIN GIA NHẬP một ${prof.groupWord.toUpperCase()} CÓ SẴN
gồm 2–5 thành viên có tên, vai trò, tính cách, quá khứ và quan hệ với nhau. Mỗi lúc chỉ ở một ${prof.groupWord}; có thể rời đi,
bị đuổi, ${prof.groupWord} tan rã, hoặc về sau tự lập.

Thiết kế 6 ${prof.groupWord} khác hẳn nhau, ví dụ: ${prof.groupExamples}

Định dạng mỗi ${prof.groupWord} (dùng ĐÚNG chữ "TỔ ĐỘI" và "Tên tổ đội" để game đọc được):
TỔ ĐỘI <số>: <TÊN KIỂU VIẾT HOA> (party_<a..f>)
Tên tổ đội: <tên> · Hạng: <hạng hoặc cấp> · Tôn chỉ: "<1 câu>" · Nơi tụ họp: <nơi>.
Thành viên (<số> người):
<Tên>: <Tộc> · <Nghề> (Bậc <n>) · <Đội trưởng nếu là đội trưởng>. <tính cách>. Bí mật: <...>. Quan hệ: <...>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi các nút:
- 1 nút gia nhập: ${id}_party_party_<x>_join (2–3 lựa chọn; gia nhập thì ghi "gia nhập tổ đội party_<x>").
- 6 nút đời sống: ${id}_party_party_<x>_1 … _6 (nhiệm vụ đầu tiên → mâu thuẫn nội bộ → bí mật lộ ra → mất mát →
  ngã rẽ lớn → khép lại). Nút sau ghi CẦN dấu ấn của nút trước.
- Mỗi thành viên 1 nút riêng: ${id}_party_party_<x>_m1, _m2… với "Khi nào: ... · CẦN <Tên> còn trong đội".
Viết 2 ${prof.groupWord} rồi chờ tôi gõ "viết tiếp".`;
  } else if (hasBand) {
    pGroup = `PHẦN ${groups.length + 3}: ${prof.groupWord.toUpperCase()} CÓ SẴN

LUẬT VỀ ĐỒNG BỌN: ${R} sống theo ${prof.groupWord}. Từ khi đủ lớn, nhân vật bị lùa vào, xin vào, hoặc giành chỗ trong một
${prof.groupWord.toUpperCase()} CÓ SẴN gồm 3–6 thành viên có tên, có kẻ cầm đầu, có thứ bậc, có kẻ bị bắt nạt.
Mỗi lúc chỉ ở một ${prof.groupWord}; có thể bị đuổi, bỏ trốn, ${prof.groupWord} bị xóa sổ, hoặc lật đổ kẻ cầm đầu.

Thiết kế 5 ${prof.groupWord} khác hẳn nhau, ví dụ: ${prof.groupExamples}

Định dạng mỗi ${prof.groupWord} (dùng ĐÚNG chữ "BĂNG" và "Tên băng" để game đọc được):
BĂNG <số>: <TÊN KIỂU VIẾT HOA> (Mã: band_<a..e>)
Tên băng: <tên> · Luật lệ: <1 câu> · Hang ổ: <nơi>.
Mỗi thành viên một dòng: <Tên>: <Tộc> (<vị trí: đầu băng, tay chân, kẻ bị bắt nạt...>). <tính cách, tật xấu hoặc bí mật>.
Điều kiện gia nhập: <giai đoạn, chỉ số, dấu ấn>.
Rồi 3 câu "Nhắc lại" về ${prof.groupWord}, mỗi câu một dòng.
Rồi các nút:
- Nút 1 vào ${prof.groupWord}: ${id}_band_band_<x>_1 (2–3 lựa chọn; vào thì ghi "gia nhập băng band_<x>").
- Nút 2–5 đời sống: ${id}_band_band_<x>_2 … _5 (chia phần → bắt nạt hoặc bị bắt nạt → một thành viên bị bỏ lại →
  tranh ngôi cầm đầu → khép lại).
- Mỗi thành viên quan trọng 1 nút riêng: ${id}_band_band_<x>_m1, _m2… với "Mạch: band_<x> · Nút: m1 (<Tên>)".`;
  }

  let pLead = null;
  if (prof.lead && hasParty) {
    pLead = `PHẦN ${groups.length + 4}: TỰ LẬP ${prof.groupWord.toUpperCase()}

Khi đã đủ mạnh (nghề bậc 3 trở lên hoặc bậc cao trong ${org ? org.name : "tổ chức"}), nhân vật có thể tự lập ${prof.groupWord}.
1. Cảnh lập ${prof.groupWord} (1 nút, mã ${id}_lead_1): lựa chọn dẫn tới "trở thành đội trưởng".
2. 10 ứng viên chiêu mộ, mỗi người một nút (mã ${id}_recruit_<số>), ngay dưới tiêu đề có dòng:
   Ứng viên: <Tên> · <Tộc> · <Nghề> (Bậc <n>) · Tính cách: <...>. Yêu cầu: <điều họ đòi hỏi>.
   Lựa chọn thành công ghi "<Tên> gia nhập tổ đội".
3. 6 nút làm người cầm đầu (mã ${id}_lead_2 … ${id}_lead_7): chia chiến lợi phẩm, thành viên bất mãn, hy sinh một người,
   đối thủ cướp nhiệm vụ, thành viên muốn rời đi, truyền lại khi về già.
4. 4 nút nối với dàn nhân vật (mã ${id}_lead_link_1 … _4): {friend} xin gia nhập, {rival} lập ${prof.groupWord} đối địch,
   {mentor} về già xin đi theo, trận đối đầu cuối với {rival}. Ghi "CẦN {friend} còn sống" v.v. ở dòng Khi nào.`;
  }

  let pMinion = null;
  if (prof.minions) {
    const formCodes = forms.map((f, i) => `f${i + 1} = ${f}`).join(", ");
    pMinion = `PHẦN ${groups.length + (pLead ? 5 : pGroup ? 4 : 3)}: THUỘC HẠ

Điều kiện: ${prof.minions}. Khi đó nhân vật không còn đồng đội ngang hàng mà có THUỘC HẠ (cùng tộc hoặc khác tộc),
có lòng trung thành thay cho độ thân thiết.

1. Dòng tiêu đề "LOẠI THUỘC HẠ", rồi 8 loại thuộc hạ, mỗi loại:
   <số>. <Tên gọi tiếng Việt> (<tên tiếng Anh>)
   Cách có được: <...>
   Điểm mạnh: <...>
   Điều nó cần để trung thành: <...>
   Ví dụ loại: ${prof.minionExamples}.
   Mỗi loại 1 cảnh thu phục (mã ${id}_minion_rec_<a..h>), thu phục thì ghi "thu phục thuộc hạ minion_<a..h>".
2. 8 nút quản lý thuộc hạ (mã ${id}_minion_<1..8>): chia phần mùa đói, thuộc hạ bất tuân, đem thuộc hạ làm mồi,
   thuộc hạ lập công, thuộc hạ nổi loạn, kẻ trên đòi lấy thuộc hạ giỏi nhất, kẻ thù tàn sát thuộc hạ, thuộc hạ già đi cùng bạn.
${forms.length ? `3. Riêng cho từng dạng tiến hóa, 2 nút (mã ${id}_minion_f<số>_<1..2>, với ${formCodes}).` : ""}`;
  }

  // ---------- assemble ----------
  const out = [];
  out.push(`# Prompt Gemini v3: MẠCH TRUYỆN — ${R.toUpperCase()}`);
  out.push("");
  out.push(`**Mục tiêu:** biến một kiếp ${R} (trung bình ${avg} năm) thành **một câu chuyện có đầu có cuối**. Lớp mới KHÔNG thay kịch bản cũ, chỉ thêm trục chính:`);
  out.push("");
  out.push(`1. **Dàn nhân vật xuyên suốt**: ${kinds} kiểu cho mỗi vai {rival}, {mentor}, {friend}, mỗi kiểu ${castNodes} nút.`);
  out.push(`2. **Mạch truyện theo xuất thân**: ${origins.length} xuất thân × ${arcNodes} nút.`);
  out.push(`3. **Chương đời, năm yên ả có ký ức, tiểu sử khi chết.**`);
  if (pGroup) out.push(`4. **${prof.groupWord[0].toUpperCase() + prof.groupWord.slice(1)} có sẵn** để gia nhập${pLead ? ", và tự lập " + prof.groupWord : ""}.`);
  if (pMinion) out.push(`${pGroup ? 5 : 4}. **Thuộc hạ**: ${prof.minions}.`);
  const nParts = 1 + groups.length + 1 + (pGroup ? 1 : 0) + (pLead ? 1 : 0) + (pMinion ? 1 : 0);
  out.push("");
  out.push(`**Cách dùng:** cuộc trò chuyện mới với Gemini → dán **KHỐI CHUNG** → gửi lần lượt **PHẦN 1 → PHẦN ${nParts}** (dừng giữa chừng thì gõ "viết tiếp") → gửi lại toàn bộ cho Claude.`);
  out.push("", "---", "", "## KHỐI CHUNG (dán đầu tiên)", "", block(common), "", "---", "", "## PHẦN 1 — Dàn nhân vật xuyên suốt", "", block(p1), "", "---", "");
  out.push(`## PHẦN 2 → PHẦN ${groups.length + 1} — Mạch truyện theo xuất thân`, "", "Dán khung dưới, thay danh sách theo từng phần.", "", block(arcFrame), "");
  groups.forEach((g, i) => { out.push(`PHẦN ${i + 2}`, block(g.map(({ o, code }) => originLine(o, code)).join("\n")), ""); });
  out.push("---", "", `## PHẦN ${groups.length + 2} — Chương đời và tiểu sử`, "", block(pBio), "");
  if (pGroup) out.push("---", "", `## PHẦN ${groups.length + 3} — ${prof.groupWord[0].toUpperCase() + prof.groupWord.slice(1)} có sẵn`, "", block(pGroup), "");
  if (pLead) out.push("---", "", `## PHẦN ${groups.length + 4} — Tự lập ${prof.groupWord}`, "", block(pLead), "");
  if (pMinion) out.push("---", "", `## PHẦN ${nParts} — Thuộc hạ`, "", block(pMinion), "");
  out.push("---", "", "## Ghi chú cho Claude khi nhập");
  out.push(`- Mã mạch → xuất thân: ${origins.map(({ o, code }) => `${code} = ${o.id}`).join(", ")} (cũng ở prompts/v3/arc-codes.json; mã nào không trùng đuôi id thì đặt meta.storyOrigins).`);
  out.push(`- Dàn nhân vật ${castNodes} nút mỗi kiểu, mạch xuất thân ${arcNodes} nút (${short ? "đời ngắn" : long ? "đời dài" : "đời trung bình"}).`);
  if (pMinion && forms.length) out.push(`- Nút thuộc hạ theo dạng tiến hóa dùng mã ${id}_minion_f<n>_*: cần ánh xạ f<n> → form trong build-pack (f1 = ${forms[0]}).`);
  if (prof.group === "none") out.push(`- ${R} không có băng/tổ đội: chỉ dàn nhân vật, mạch xuất thân và thuộc hạ.`);
  out.push("");
  fs.writeFileSync(path.join(OUT, id + ".md"), out.join("\n"));
  return { id, R, parts: nParts, cast: castCodes.length * castNodes, arcs: origins.length, arcNodes, group: prof.group, minions: !!prof.minions, lead: !!pLead, avg };
}

const rows = todo.map(makeRace);
fs.writeFileSync(path.join(OUT, "arc-codes.json"), JSON.stringify(arcCodes, null, 1));
for (const r of rows) console.log(`${r.id.padEnd(11)} ${r.parts} phần · dàn nhân vật ${r.cast} nút · ${r.arcs} xuất thân × ${r.arcNodes} · ${r.group}${r.lead ? "+tự lập" : ""}${r.minions ? " · thuộc hạ" : ""}`);
module.exports = { rows };
