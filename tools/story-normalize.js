// Gemini answers pasted from its web page often lose their line breaks: a whole node, or a whole
// chapter list, arrives on one line. This puts every field back on its own line so that
// tools/script-parse.js and tools/story-parse.js can read it. Text already laid out is left alone.
const MARKERS = [
  "KIỂU \\d+:", "MẠCH XUẤT THÂN:", "MẠCH \\d+:", "BĂNG \\d+:", "TỔ ĐỘI \\d+:", "LOẠI THUỘC HẠ",
  "\\[[a-z_]+_(?:cast|arc|band|party|lead|recruit|minion)_[a-z0-9_]*\\]",
  "Mạch:", "Khi nào:", "Tình huống:", "Ứng viên:", "Nhắc lại:", "Khoảnh khắc:", "Mô tả:",
  "Câu mở mạch:", "Kết dở dang:", "Kết đời \\(", "Thành công(?: \\([^)]*\\))?:", "Thất bại(?: \\([^)]*\\))?:",
  "Tên băng:", "Tên tổ đội:", "Thành viên \\(", "Điều kiện gia nhập:", "Cách có được:", "Điểm mạnh:", "Điều nó cần để trung thành:",
  "Mở đầu theo xuất thân:", "Kết thúc theo cách chết:", "[a-c]\\) MỞ CHƯƠNG", "[a-c]\\) TIỂU SỬ", "[a-c]\\) NHỮNG NĂM",
];
const MARK_RE = new RegExp(`\\s+(?=(?:${MARKERS.join("|")}))`, "g");
// "... chưa từng thấy. A. "Nghiền nát" — [Sức mạnh]" : a choice glued after the situation
const CHOICE_RE = /(?<=\S)\s+(?=[A-D]\.\s+(?:["“][^"”\n]{2,100}["”]\s*(?:\([^)]*\)\s*)?[—–]|[^\n—–"“]{2,100}?\s[—–]\s))/g;
// "(cha mẹ còn đủ) câu… (mồ côi) câu…": a condition starts a new entry after a sentence ends
const COND_RE = /(?<=[.!?…"”)]|:)\s+(?=\((?!\d)[^()]{2,80}\)\s)/g;
// "Barnos: Minotaur (đầu băng). … Gruk: Minotaur (tay chân). …": band members glued together
const MEMBER_RE = /(?<=\.)\s+(?=\p{Lu}[^\s:.,()]{0,20}(?: [\p{Lu}\p{Ll}][^\s:.,()]{0,20}){0,2}: [^.()]{2,60}\([^)]{2,60}\)[.:])/gu;
const PARTY_MEMBER_RE = /(?<=\.)\s+(?=\p{Lu}[^\s:.,()]{0,20}(?: \p{Lu}[^\s:.,()]{0,20})?: [^.·()]{2,40} · )/gu;

function normalizeStory(text) {
  const lines = text.replace(/\r/g, "").split("\n").flatMap((l) => l.replace(MARK_RE, "\n").split("\n"));
  const out = [];
  let mode = null;
  for (let line of lines) {
    const t = line.trim();
    if (/^\[[a-z]/.test(t)) mode = "node";
    else if (/^KIỂU \d+:/.test(t)) mode = "cast";
    else if (/^(BĂNG|TỔ ĐỘI) \d+:/.test(t)) mode = "band";
    else if (/^MẠCH (XUẤT THÂN|\d+):/.test(t)) mode = "arc";
    else if (/^[a-c]\) (MỞ CHƯƠNG|TIỂU SỬ|NHỮNG NĂM)/i.test(t)) mode = "story";
    else if (/^LOẠI THUỘC HẠ/.test(t)) mode = "minion";

    if (mode === "node") line = line.replace(CHOICE_RE, "\n");
    if (mode === "story") {
      // the section title, then one entry per line; stage headers "Tên (a–b tuổi)" keep their own line
      line = line.replace(/^(\s*[a-c]\) (?:MỞ CHƯƠNG|TIỂU SỬ KHI CHẾT|NHỮNG NĂM YÊN Ả CÓ KÝ ỨC))(?:\s*\([^)]*\))?\s+/i, "$1\n");
      line = line.replace(COND_RE, "\n").replace(/(\(\d+[^)]*tuổi\))\s+(?=\()/g, "$1\n");
    }
    if (mode === "cast") line = line.replace(/(Nhắc lại:)\s+/, "$1\n").replace(/(?<=[.!?…"”])\s+(?=\([a-z][a-z0-9_]*\)\s)/g, "\n");
    if (mode === "band") {
      line = line.replace(/^(\s*Thành viên \(\d+ [^)]*\):)\s+/, "$1\n").replace(MEMBER_RE, "\n").replace(PARTY_MEMBER_RE, "\n");
      // "Điều kiện gia nhập: …. Câu nhắc lại 1. Câu nhắc lại 2." : what follows the condition is recall
      const nr = line.match(/^\s*Nhắc lại:\s*(.+)$/);
      if (nr) line = nr[1].split(/(?<=[.!?…])\s+(?=[\p{Lu}"“])/u).join("\n");
      const m = line.match(/^(\s*Điều kiện gia nhập:[^]*?\.)\s+([A-ZĐÀ-Ỹ"“][^]*)$/);
      if (m) line = m[1] + "\n" + m[2].split(/(?<=[.!?…])\s+(?=[A-ZĐÀ-Ỹ"“])/).join("\n");
    }
    if (mode === "minion") line = line.replace(/(?<=[.!?…])\s+(?=(?:\d+\.\s*)?[A-ZĐÀ-Ỹ][^.()\n]{2,60}\([A-Za-z][^)]{2,60}\)\s*$)/gm, "\n");
    out.push(...line.split("\n"));
  }
  return out.join("\n");
}

module.exports = { normalizeStory };
