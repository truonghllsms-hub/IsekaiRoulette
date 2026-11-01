// Reads the parts of a "mạch truyện" script (prompts/v3) that are not events:
// origin arcs (opening line, endings), the recurring cast (description, recall lines), chapter openers,
// biography lines, quiet-year memories, bands (members, rules) and minion kinds.
// The events themselves (nodes) are read by tools/script-parse.js.
const strip = (s) => s.replace(/\*\*/g, "").replace(/^\s*#+\s*/, "").replace(/^\s*[*\-•]\s+/, "").trim();
const condLine = (l) => l.match(/^\(([^)]+)\)\s*(.+)$/);

function scanStory(text, stages) {
  const out = { arcs: {}, cast: {}, chapters: {}, bio: { open: {}, end: [] }, memories: [], bands: {}, minions: {}, recruits: {} };
  const lines = text.split(/\r?\n/).map(strip).filter(Boolean);
  let mode = null;
  let arc = null, kind = null, band = null, minion = null, stage = null;
  const stageFor = (age) => {
    let best = stages[0];
    for (const s of stages) if (s.start <= age + 0.01) best = s;
    return best.id;
  };
  for (let raw of lines) {
    let m;
    // section headers
    if ((m = raw.match(/^KIỂU \d+:\s*(.+?)\s*\((?:Mã mạch:\s*)?((?:rival|mentor|friend)_[a-z])\)/i))) {
      kind = out.cast[m[2]] = { id: m[2], role: m[2].split("_")[0], title: m[1], desc: "", recall: [] };
      mode = "cast"; arc = band = minion = null; continue;
    }
    if ((m = raw.match(/^MẠCH (?:\d+|XUẤT THÂN):\s*(.+?)\s*\(([a-z_]+)\)\s*$/i))) {
      arc = out.arcs[m[2]] = { id: m[2], title: m[1], opening: "", unfinished: "", endings: [] };
      mode = "arc"; kind = band = minion = null; continue;
    }
    if ((m = raw.match(/^(?:BĂNG|TỔ ĐỘI) \d+:\s*(.+?)\s*\((?:Mã:\s*)?((?:band|party)_[a-z])\)/i))) {
      band = out.bands[m[2]] = { id: m[2], title: m[1], name: "", rule: "", lair: "", members: [], condition: "", recall: [] };
      mode = "band"; kind = arc = minion = null; continue;
    }
    if (/^[aA][).]\s*MỞ CHƯƠNG/.test(raw)) { mode = "chapter"; continue; }
    if (/^[bB][).]\s*TIỂU SỬ/.test(raw)) { mode = "bio"; continue; }
    if (/^[cC][).]\s*NHỮNG NĂM YÊN Ả/.test(raw)) { mode = "memory"; continue; }
    if (/^\d+\.\s*MƯỜI ỨNG VIÊN|^\d+\.\s*CẢNH LẬP|^\d+\.\s*SÁU NÚT/i.test(raw)) { mode = null; continue; }
    if (/LOẠI THUỘC HẠ/i.test(raw)) { mode = "minion"; continue; }
    if (/^\[[a-z]/.test(raw)) {
      // an event node: recall lines of a cast kind or a band end here; arc lines (Kết đời) may follow later
      if (mode === "cast" || mode === "band") mode = mode + "-events";
      if (mode === "minion" && minion) minion = null;
      continue;
    }
    // "Ứng viên: Garr · Beastman tộc Sói · Gladiator (Bậc 3) · Tính cách: Cuồng bạo, khát máu. Yêu cầu: ..."
    if ((m = raw.match(/^Ứng viên:\s*([^·]+)·\s*([^·]+)·\s*([^·]+?)\s*·\s*Tính cách:\s*([^.]+)/i))) {
      out.recruits[m[1].trim()] = { name: m[1].trim(), race: m[2].trim(), position: m[3].trim(), desc: m[4].trim() };
      continue;
    }
    if (/^Dưới đây là/i.test(raw)) { if (mode === "memory") mode = null; continue; }

    if (mode === "arc" && arc) {
      if ((m = raw.match(/^Câu mở mạch:\s*(.+)$/i))) { arc.opening = m[1]; continue; }
      if ((m = raw.match(/^Kết dở dang:\s*(.+)$/i))) { arc.unfinished = m[1]; continue; }
    }
    if (arc && (m = raw.match(/^Kết đời\s*\(([^)]+)\)\s*:\s*(.+)$/i))) {
      arc.endings.push({ flags: m[1].split(/\s*\/\s*|\s*,\s*|\s+hoặc\s+/).map((f) => f.trim()).filter(Boolean), text: m[2] });
      continue;
    }
    if (mode === "cast" && kind) {
      if ((m = raw.match(/^Mô tả:\s*(.+)$/i))) { kind.desc = m[1].replace(/\s*\d+\s*câu\s*["“]?Nhắc lại.*$/i, "").trim(); continue; }
      if (!/:$/.test(raw) && raw.length > 15 && !/^\d+\.\s/.test(raw)) kind.recall.push(raw.replace(/^Nhắc lại:\s*/i, "").replace(/^\([a-z][a-z0-9_]*\)\s*/, ""));
      continue;
    }
    if (mode === "band" && band) {
      if ((m = raw.match(/Tên băng:\s*([^·]+)·\s*Luật lệ:\s*([^·]+)·\s*Hang ổ:\s*([^.]+)/i))) {
        band.name = m[1].trim(); band.rule = m[2].trim().replace(/\.$/, ""); band.lair = m[3].trim(); continue;
      }
      if ((m = raw.match(/Tên tổ đội:\s*([^·]+)·.*?Tôn chỉ:\s*([^·]+)·\s*Nơi tụ họp:\s*(.+?)\.?$/i))) {
        band.name = m[1].trim(); band.rule = m[2].trim().replace(/^["“]|["”]$/g, ""); band.lair = m[3].trim(); band.party = true; continue;
      }
      if ((m = raw.match(/^Điều kiện gia nhập:\s*(.+)$/i))) { band.condition = m[1]; continue; }
      if ((m = raw.match(/^(\p{Lu}[^:·(]{1,20}?):\s*([^·]+)·\s*([^·]+?)\s*(?:·\s*([^.·]+?))?\.\s*(.*)$/u)) && !/^(Thành viên|Tên tổ đội|Mô tả)/.test(m[1])) {
        // "Kael: Human · Kiếm sĩ (Bậc 1) · Đội trưởng. Lạc quan, ... Bí mật: ... Quan hệ: ..."
        const lead = m[4] && /trưởng|phó|thủ lĩnh|lãnh đạo/i.test(m[4]);
        const pos = lead ? `${m[3]} · ${m[4]}` : m[3];
        const rest = lead || !m[4] ? m[5] : `${m[4]}. ${m[5]}`;
        band.members.push({ name: m[1].trim(), race: m[2].trim(), position: pos.trim(), desc: rest.replace(/\s*Bí mật:.*$/, "").trim(), secret: (rest.match(/Bí mật:\s*([^]*?)(?:\s*Quan hệ:|$)/) || [])[1] || "" });
        continue;
      }
      if ((m = raw.match(/^(\p{Lu}[^:(]{1,20}?):\s*([^(]+)\(([^)]+)\)\.\s*(.*)$/u))) {
        if (/^Bạn$/i.test(m[1].trim())) continue;
        let desc = m[4];
        const cond = desc.match(/\d\.\s*Điều kiện gia nhập:\s*(.+?)(?:\d\.\s*Nhắc lại.*)?$/i);
        if (cond) { band.condition = cond[1].trim(); desc = desc.slice(0, desc.indexOf(cond[0])).trim(); }
        band.members.push({ name: m[1], race: m[2].trim(), position: m[3].trim(), desc: desc.replace(/\s*\d\.\s*$/, "").trim() });
        continue;
      }
      if ((m = raw.match(/^Điều kiện gia nhập:\s*(.+)$/i))) { band.condition = m[1]; continue; }
      if (!/:$/.test(raw) && raw.length > 15 && !/^\d+\.\s/.test(raw)) band.recall.push(raw.replace(/^Nhắc lại:\s*/i, ""));
      continue;
    }
    if (mode === "minion") {
      if ((m = raw.match(/^(?:\d+\.\s*)?([^:()]+?)\s*\(([^)]+)\)\s*$/)) && !/[{}]/.test(raw) && m[1] !== m[1].toUpperCase()) {
        const id = "minion_" + String.fromCharCode(97 + Object.keys(out.minions).length);
        minion = out.minions[id] = { id, name: m[1].trim(), en: m[2].trim(), how: "", strength: "", needs: "" };
        continue;
      }
      if (minion) {
        if ((m = raw.match(/^Cách có được:\s*(.+)$/i))) { minion.how = m[1]; continue; }
        if ((m = raw.match(/^Điểm mạnh:\s*(.+)$/i))) { minion.strength = m[1]; continue; }
        if ((m = raw.match(/^Điều nó cần để trung thành:\s*(.+)$/i))) { minion.needs = m[1]; continue; }
      }
      continue;
    }
    if (mode === "chapter") {
      if ((m = raw.match(/^([^()]+?)\s*\((\d+)\s*(?:[–-]\s*\d+)?\s*\+?\s*tuổi\)\s*$/i))) { const nm = m[1].trim().toLowerCase(); const byName = stages.find((x) => x.name && x.name.toLowerCase() === nm);
        const GENERIC = { "sơ sinh": "infant", "thơ ấu": "child", "thiếu niên": "teen", "trưởng thành": "adult", "thanh niên": "adult", "trung niên": "middle", "tuổi già": "elder" };
        stage = byName ? byName.id : GENERIC[nm] && stages.some((x) => x.id === GENERIC[nm]) ? GENERIC[nm] : stageFor(Number(m[2])); out.chapters[stage] = out.chapters[stage] || []; continue; }
      if (stage && (m = condLine(raw))) { out.chapters[stage].push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
    }
    if (mode === "bio") {
      if (/^Mở đầu|câu mở đầu/i.test(raw)) { mode = "bio-open"; continue; }
    }
    if (mode === "bio-open") {
      if (/^Kết thúc|câu kết đời/i.test(raw)) { mode = "bio-end"; continue; }
      if ((m = condLine(raw))) { out.bio.open[m[1].trim()] = m[2].trim(); continue; }
    }
    if (mode === "bio-end" && (m = condLine(raw))) { out.bio.end.push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
    if (mode === "memory" && (m = condLine(raw))) { out.memories.push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
  }
  return out;
}

module.exports = { scanStory };
