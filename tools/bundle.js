// Packs the whole game (page, styles, engine, data, UI) into one file for sharing: dist/game.html.
// Run after tools/build.js. The file has no <html>/<head>/<body> tags because the Artifact host
// wraps it in its own skeleton.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const safeJs = (s) => s.replace(/<\/(script)/gi, "<\\/$1");

const html = read("index.html");
const body = html.slice(html.indexOf("<main"), html.indexOf("</main>") + "</main>".length);
const fontLink = (html.match(/<link href="https:\/\/fonts\.googleapis\.com[^>]+>/) || [""])[0];

const out = `<title>Luân Hồi Dị Giới</title>
<base href="../">
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
${fontLink}
<style>
${read("style.css")}
</style>
${body}
<script>
${safeJs(read("engine.js"))}
</script>
<script>
${safeJs(read("data.js"))}
</script>
<script>
${safeJs(read("portraits.js"))}
</script>
<script>
${safeJs(read("ui.js"))}
</script>
`;

fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "dist", "game.html"), out, "utf8");
const atlas = JSON.parse(read("img/atlas.json"));
if (!fs.existsSync(path.join(ROOT, "img/maps/aethelgard-01.png"))) throw new Error("Thiếu bản đồ Aethelgard");
const assets = new Set(Object.entries(atlas).map(([person, frames]) => frames._src || `img/${person}.png`));
for (const asset of assets) if (!fs.existsSync(path.join(ROOT, asset))) throw new Error(`Thiếu ảnh chân dung: ${asset}`);
if (assets.size) console.log(`Ảnh nhân vật: ${assets.size} tệp trong img/. Giữ thư mục này cạnh index.html khi chia sẻ.`);
console.log(`Đã đóng gói dist/game.html (${(Buffer.byteLength(out) / 1024).toFixed(0)} KB)`);
