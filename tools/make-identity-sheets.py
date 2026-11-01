#!/usr/bin/env python3
"""Sprite worksheet by identity, one sheet per race: each row is one person (8 men and 8 women
for Human, fewer for rarer races), the first picture is that person as a commoner, then every
trade of the race twice (new to the trade, veteran), then young and old.
    python3 tools/make-identity-sheets.py <race-data.json> <identity-rows.json> <out.xlsx> "<title>"
race-data.json: tools/race-sheet-data.js · identity-rows.json: prompts/image-rows.json (counts)."""
import json, sys
from collections import Counter
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter as L

FULL = "--full-stages" in sys.argv  # every life stage as its own column (baby, child, teen, adult, old)
sys.argv = [x for x in sys.argv if x != "--full-stages"]
races = json.load(open(sys.argv[1], encoding="utf8"))
idrows = json.load(open(sys.argv[2], encoding="utf8"))["identities"]
OUT, TITLE = sys.argv[3], sys.argv[4]
OVERRIDE = {("human", "nam"): 8, ("human", "nu"): 8}  # asked for: 8 men, 8 women

F = "Arial"
YEL = PatternFill("solid", fgColor="FFFF00")
JOBH = PatternFill("solid", fgColor="D9E2F3")
BASE = PatternFill("solid", fgColor="FFD98A")
IMG = PatternFill("solid", fgColor="FFF8D6")
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
mid = Alignment(horizontal="center", vertical="center", wrap_text=True)

# how many people per race/kin + gender (from the share of play), e.g. ("dwarf", "nam") -> 3
count = Counter()
for x in idrows:
    who, g = x["code"].rsplit("_", 2)[0], x["code"].rsplit("_", 2)[1]
    count[(who, g)] += 1

wb = Workbook()
over = wb.active
over.title = "Tổng quan"
summary = []

for r in races:
    ws = wb.create_sheet(r["name"][:31])
    whos = [(f'{r["id"]}_{k["id"]}', k["name"].replace("tộc ", "")) for k in r["kins"]] or [(r["id"], "")]
    genders = [("x", "Vô tính")] if r["genderless"] else [("nam", "Nam"), ("nu", "Nữ")]
    people = []
    for g, gvi in genders:
        for who, kin in whos:
            n = OVERRIDE.get((who, g), count.get((who, g), 1))
            for i in range(1, n + 1):
                people.append((f"{who}_{g}_{i}", kin, gvi, i))
    # picture columns: commoner first, then every trade new + veteran, then young and old
    if FULL:
        st = {x["id"]: x for x in r["stages"]}
        old = r["stages"][-1]
        def sc(sid, vi, code, fill=IMG, extra=""):
            x = st.get(sid)
            return (vi, f'{x["name"]}\n{x["ages"]}{extra}' if x else vi, code, fill)
        cols = [sc("infant", "Bé tí", "beti"), sc("child", "Hơi lớn", "hoilon"), sc("teen", "Thiếu niên", "thieunien"),
                sc("adult", "Trưởng thành", "thuongdan", BASE, "\nẢnh gốc · tạo trước"), (f"Về già", f'{old["name"]}\n{old["ages"]}', "gia", IMG)]
    else:
        cols = [("Thường dân", "Ảnh gốc · tạo trước", "thuongdan", BASE)]
    for jb in r["jobs"]:
        short = jb["id"].split("_", 1)[1]
        cols.append((jb["name"], f'Mới vào nghề\n{jb["first"]}', f"{short}_moi", IMG))
        cols.append((jb["name"], f'Kỳ cựu\n{jb["top"]}', f"{short}_kycuu", IMG))
    if not FULL:
        cols += [("Lúc nhỏ", "Thơ ấu", "nho", IMG), ("Tuổi già", "Về già", "gia", IMG)]
    for fm in r["forms"]:
        slug = "".join(ch if ch.isalnum() else "_" for ch in fm["name"].lower()).strip("_")
        cols.append(("Tiến hóa", fm["name"], f"tienhoa_{slug}", IMG))

    fixed = ["STT", "Mã nhân dạng"] + (["Tộc thú"] if r["kins"] else []) + ["Giới tính"]
    c0 = len(fixed) + 1
    ws.cell(1, 1, f'{r["name"]} — {len(people)} nhân dạng · {len(r["jobs"])} nghề · {len(r["forms"])} nhánh tiến hóa').font = Font(name=F, bold=True, size=14)
    ws.cell(2, 1, "Mỗi dòng là MỘT người. Tạo ô " + ("Trưởng thành" if FULL else "Thường dân") + " (cam) trước, rồi đính kèm ảnh đó khi tạo các ô còn lại của cùng dòng để giữ nguyên gương mặt. "
            "Gửi lại: chèn ảnh vào ô, hoặc zip với tên <Mã nhân dạng>_<mã cột>.png (mã cột ở dòng 5, vd "
            f'{people[0][0]}_{cols[1][2]}.png).').font = Font(name=F, size=9, color="555555")
    H1, H2, H3 = 3, 4, 5
    for j, h in enumerate(fixed, start=1):
        ws.merge_cells(start_row=H1, start_column=j, end_row=H3, end_column=j)
        c = ws.cell(H1, j, h)
        c.font = Font(name=F, bold=True)
        c.fill = YEL
        c.alignment = mid
    j = c0
    k = 0
    while k < len(cols):
        top, sub, code, fill = cols[k]
        span = 2 if k + 1 < len(cols) and cols[k + 1][0] == top and top not in ("Tiến hóa",) else 1
        if span == 2:
            ws.merge_cells(start_row=H1, start_column=j, end_row=H1, end_column=j + 1)
        c = ws.cell(H1, j, top)
        c.font = Font(name=F, bold=True)
        c.fill = BASE if fill is BASE else JOBH
        c.alignment = mid
        for t in range(span):
            _, s2, cd, fl = cols[k + t]
            a = ws.cell(H2, j + t, s2)
            a.font = Font(name=F, size=9, bold=True)
            a.fill = BASE if fl is BASE else YEL
            a.alignment = mid
            b = ws.cell(H3, j + t, cd)
            b.font = Font(name=F, size=8, color="777777")
            b.alignment = mid
        j += span
        k += span
    for rr in (H1, H2, H3):
        for cc in range(1, c0 + len(cols)):
            ws.cell(rr, cc).border = BOX
    ws.row_dimensions[H2].height = 44 if FULL else 30
    row = H3 + 1
    for n, (code, kin, gvi, i) in enumerate(people, start=1):
        vals = [n, code] + ([kin] if r["kins"] else []) + [gvi]
        for jj, v in enumerate(vals, start=1):
            c = ws.cell(row, jj, v)
            c.font = Font(name=F, size=10, bold=(jj == 2))
            c.alignment = mid
            c.border = BOX
        for t, col in enumerate(cols):
            c = ws.cell(row, c0 + t)
            c.fill = col[3]
            c.border = BOX
        ws.row_dimensions[row].height = 80
        row += 1
    last = row - 1
    row += 1
    ws.cell(row, 2, "Số nhân dạng").font = Font(name=F, bold=True)
    ws.cell(row, c0 - 1, f"=COUNTA(B{H3 + 1}:B{last})").font = Font(name=F, bold=True)
    ws.cell(row + 1, 2, "Ảnh mỗi người").font = Font(name=F, bold=True)
    ws.cell(row + 1, c0 - 1, f"=COUNTA({L(c0)}{H3}:{L(c0 + len(cols) - 1)}{H3})").font = Font(name=F, bold=True)
    ws.cell(row + 2, 2, "Tổng số ảnh").font = Font(name=F, bold=True)
    ws.cell(row + 2, c0 - 1, f"={L(c0 - 1)}{row}*{L(c0 - 1)}{row + 1}").font = Font(name=F, bold=True)
    summary.append((r, ws.title, f"{L(c0 - 1)}{row}", f"{L(c0 - 1)}{row + 1}", f"{L(c0 - 1)}{row + 2}"))
    widths = [5, 22] + ([10] if r["kins"] else []) + [9] + [14] * len(cols)
    for kk, w in enumerate(widths, start=1):
        ws.column_dimensions[L(kk)].width = w
    ws.freeze_panes = f"{L(c0 if FULL else c0 + 1)}{H3 + 1}"  # keeps the person (and the reference picture) in view

# ---- overview ----
over.cell(1, 1, TITLE).font = Font(name=F, bold=True, size=14)
over.cell(2, 1, ("Mỗi sheet một tộc. Mỗi dòng là một người: bé tí, hơi lớn, thiếu niên, trưởng thành (ảnh gốc), về già, rồi toàn bộ nghề (mới vào nghề, kỳ cựu) và các nhánh tiến hóa." if FULL else "Mỗi sheet một tộc. Mỗi dòng là một người: ảnh Thường dân trước, rồi lần lượt các nghề (mới vào nghề, kỳ cựu), lúc nhỏ, tuổi già, tiến hóa.")).font = Font(name=F, size=10)
hdr = ["Tộc", "Số nghề", "Nhánh tiến hóa", "Số nhân dạng", "Ảnh mỗi người", "Tổng số ảnh"]
for j, h in enumerate(hdr, start=1):
    c = over.cell(4, j, h)
    c.font = Font(name=F, bold=True)
    c.fill = YEL
    c.alignment = mid
    c.border = BOX
for i, (r, title, a, b, t) in enumerate(summary, start=5):
    q = f"'{title}'"
    for j, v in enumerate([r["name"], len(r["jobs"]), len(r["forms"]), f"={q}!{a}", f"={q}!{b}", f"={q}!{t}"], start=1):
        c = over.cell(i, j, v)
        c.font = Font(name=F, size=10, color="008000" if j >= 4 else "000000")
        c.border = BOX
        c.alignment = mid if j > 1 else Alignment(vertical="center")
end = 4 + len(summary)
over.cell(end + 1, 1, "Tổng").font = Font(name=F, bold=True)
for j in (2, 3, 4, 6):
    c = over.cell(end + 1, j, f"=SUM({L(j)}5:{L(j)}{end})")
    c.font = Font(name=F, bold=True)
    c.alignment = mid
notes = [
    "",
    "Số nhân dạng: Human 8 nam + 8 nữ; Slime, Ghoul vô tính; các tộc khác theo tỉ lệ người chơi gặp tộc đó (ít nhất 1 mỗi giới).",
    "Mới vào nghề = cấp bậc đầu của nghề (đồ nghề đơn sơ). Kỳ cựu = cấp bậc cao nhất (trang bị xịn, khí chất bậc thầy).",
    "Tên giai đoạn và độ tuổi ghi theo đúng từng tộc trong game (vd Goblin: Ấu tể 0–2 tuổi). Về già = giai đoạn cuối đời của tộc.",
    "Tộc không có tiến hóa (Demon) thì không có cột tiến hóa.",
    "Ô cam = ảnh gốc của người đó, tạo trước. Ô vàng = các ảnh còn lại, đính kèm ảnh gốc khi tạo để giữ nguyên gương mặt.",
    "Phong cách: pixel art 16-bit như ảnh goblin mẫu, toàn thân, nghiêng 3/4 quay phải, nền xám phẳng (script tự xóa nền).",
    "Gửi lại: chèn ảnh thẳng vào ô rồi gửi file, hoặc zip với tên <Mã nhân dạng>_<mã cột>.png. Gửi từng đợt cũng được.",
]
for kk, t in enumerate(notes, start=end + 2):
    over.cell(kk, 1, t).font = Font(name=F, size=10)
for kk, w in enumerate([22, 10, 15, 14, 14, 13], start=1):
    over.column_dimensions[L(kk)].width = w
wb.save(OUT)
print("ok")
