// Reads the parts of a "mạch truyện" script (prompts/v3) that are not events:
// origin arcs (opening line, endings), the recurring cast (description, recall lines), chapter openers,
// biography lines, quiet-year memories, bands (members, rules) and minion kinds.
// The events themselves (nodes) are read by tools/script-parse.js.
const strip = (s) => s.replace(/\*\*/g, "").replace(/^\s*#+\s*/, "").replace(/^\s*[*\-•]\s+/, "").trim();
const condLine = (l) => l.match(/^\(([^)]+)\)\s*(.+)$/);

function scanStory(text, stages) {
  const out = { arcs: {}, cast: {}, chapters: {}, bio: { open: {}, end: [] }, memories: [], bands: {}, minions: {} };
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
    if ((m = raw.match(/^KIỂU \d+:\s*(.+?)\s*\(Mã mạch:\s*([a-z_]+)\)/i))) {
      kind = out.cast[m[2]] = { id: m[2], role: m[2].split("_")[0], title: m[1], desc: "", recall: [] };
      mode = "cast"; arc = band = minion = null; continue;
    }
    if ((m = raw.match(/^MẠCH \d+:\s*(.+?)\s*\(([a-z_]+)\)\s*$/i))) {
      arc = out.arcs[m[2]] = { id: m[2], title: m[1], opening: "", unfinished: "", endings: [] };
      mode = "arc"; kind = band = minion = null; continue;
    }
    if ((m = raw.match(/^BĂNG \d+:\s*(.+?)\s*\(Mã:\s*(band_[a-z])\)/i))) {
      band = out.bands[m[2]] = { id: m[2], title: m[1], name: "", rule: "", lair: "", members: [], condition: "", recall: [] };
      mode = "band"; kind = arc = minion = null; continue;
    }
    if (/^a\)\s*MỞ CHƯƠNG/i.test(raw)) { mode = "chapter"; continue; }
    if (/^b\)\s*TIỂU SỬ/i.test(raw)) { mode = "bio"; continue; }
    if (/^c\)\s*NHỮNG NĂM YÊN Ả/i.test(raw)) { mode = "memory"; continue; }
    if (/LOẠI THUỘC HẠ/i.test(raw)) { mode = "minion"; continue; }
    if (/^\[[a-z]/.test(raw)) {
      // an event node: recall lines of a cast kind or a band end here; arc lines (Kết đời) may follow later
      if (mode === "cast" || mode === "band") mode = mode + "-events";
      if (mode === "minion" && minion) minion = null;
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
      if (!/:$/.test(raw) && raw.length > 15 && !/^\d+\.\s/.test(raw)) kind.recall.push(raw);
      continue;
    }
    if (mode === "band" && band) {
      if ((m = raw.match(/Tên băng:\s*([^·]+)·\s*Luật lệ:\s*([^·]+)·\s*Hang ổ:\s*([^.]+)/i))) {
        band.name = m[1].trim(); band.rule = m[2].trim().replace(/\.$/, ""); band.lair = m[3].trim(); continue;
      }
      if ((m = raw.match(/^([A-ZĐ][^:(]{1,20}?):\s*([^(]+)\(([^)]+)\)\.\s*(.*)$/))) {
        let desc = m[4];
        const cond = desc.match(/\d\.\s*Điều kiện gia nhập:\s*(.+?)(?:\d\.\s*Nhắc lại.*)?$/i);
        if (cond) { band.condition = cond[1].trim(); desc = desc.slice(0, desc.indexOf(cond[0])).trim(); }
        band.members.push({ name: m[1], race: m[2].trim(), position: m[3].trim(), desc: desc.replace(/\s*\d\.\s*$/, "").trim() });
        continue;
      }
      if (!/:$/.test(raw) && raw.length > 15 && !/^\d+\.\s/.test(raw)) band.recall.push(raw);
      continue;
    }
    if (mode === "minion") {
      if ((m = raw.match(/^\d+\.\s*(.+?)\s*\(([^)]+)\)\s*$/)) && !/[{}]/.test(raw) && m[1] !== m[1].toUpperCase()) {
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
      if ((m = raw.match(/^(.+?)\s*\((\d+)\s*(?:[–-]\s*\d+)?\s*\+?\s*tuổi\)\s*$/i))) { stage = stageFor(Number(m[2])); out.chapters[stage] = out.chapters[stage] || []; continue; }
      if (stage && (m = condLine(raw))) { out.chapters[stage].push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
    }
    if (mode === "bio") {
      if (/^Mở đầu/i.test(raw)) { mode = "bio-open"; continue; }
    }
    if (mode === "bio-open") {
      if (/^Kết thúc/i.test(raw)) { mode = "bio-end"; continue; }
      if ((m = condLine(raw))) { out.bio.open[m[1].trim()] = m[2].trim(); continue; }
    }
    if (mode === "bio-end" && (m = condLine(raw))) { out.bio.end.push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
    if (mode === "memory" && (m = condLine(raw))) { out.memories.push({ cond: m[1].trim(), text: m[2].trim() }); continue; }
  }
  return out;
}

module.exports = { scanStory };
