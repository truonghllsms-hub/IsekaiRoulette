// The illustrated Human artbook: each image becomes a one-frame sheet "pt/<template>/<look>" in
// data.sprites, and data.portraits says which looks each template has.
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
function addPortraits(data) {
  data.sprites = data.sprites || {};
  data.spritePresentation = data.spritePresentation || { people: {} };
  data.spritePresentation.people = data.spritePresentation.people || {};
  const portraitDir = path.join(ROOT, "img", "portraits");
  const portraitManifest = path.join(portraitDir, "manifest.json");
  if (fs.existsSync(portraitManifest)) {
    const manifest = JSON.parse(fs.readFileSync(portraitManifest, "utf8"));
    // every content/portraits/<race>.json adds its templates; a template names its race, else the file does
    const templates = {};
    for (const f of fs.readdirSync(path.join(ROOT, "content", "portraits")).filter((f) => f.endsWith(".json")).sort()) {
      const race = f.replace(/\.json$/, "");
      for (const [T, t] of Object.entries(JSON.parse(fs.readFileSync(path.join(ROOT, "content", "portraits", f), "utf8")).templates)) templates[T] = { race, ...t };
    }
    data.portraits = { templates, looks: {} };
    for (const [T, looks] of Object.entries(manifest)) {
      if (!templates[T]) throw new Error(`img/portraits: mẫu ${T} không có trong content/portraits/*.json`);
      data.portraits.looks[T] = Object.keys(looks);
      for (const [look, [w, h]] of Object.entries(looks)) {
        const rel = `img/portraits/${T}/${look}.webp`;
        const hash = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, rel))).digest("hex").slice(0, 12);
        const key = `pt/${T}/${look}`;
        data.sprites[key] = { _src: `${rel}?v=${hash}`, _size: [w, h], [look]: [0, 0, w, h] };
        const tall = look !== "age1"; // the head and shoulders, except the baby, who is drawn whole
        data.spritePresentation.people[key] = { frames: { [look]: { full: [0, 0, w, h], portrait: tall ? [0, 0, w, Math.round(h * 0.5)] : [0, 0, w, h], kind: tall ? "portrait" : "full" } } };
      }
    }
  }
  return data;
}
module.exports = { addPortraits };
