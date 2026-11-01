#!/usr/bin/env python3
"""Per-race sprite frames: one sheet per race with its life stages, every trade (new and veteran)
and every evolved form, a picture cell per gender (and per kin for Beastman).
    python3 tools/make-race-sheets.py <data.json> <out.xlsx> "<title>"
data.json comes from tools/race-sheet-data.js."""
import json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter as L

races = json.load(open(sys.argv[1], encoding="utf8"))
TITLE = sys.argv[3] if len(sys.argv) > 3 else "Ảnh nhân vật"
F = "Arial"
YEL = PatternFill("solid", fgColor="FFFF00")
SEC = PatternFill("solid", fgColor="D9E2F3")
IMG = PatternFill("solid", fgColor="FFF8D6")
OFF = PatternFill("solid", fgColor="E3E3E3")
thin = Side(style="thin", color="BFBFBF")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
mid = Alignment(horizontal="center", vertical="center", wrap_text=True)
left = Alignment(horizontal="left", vertical="center", wrap_text=True)
LIFE = [("nho", "Lúc nhỏ", "Thơ ấu, chưa có nghề"), ("thuongdan", "Thường dân", "Trưởng thành, chưa có nghề"), ("gia", "Tuổi già", "Về già, nghỉ nghề")]

wb = Workbook()
over = wb.active
over.title = "Tổng quan"
totals = []

for r in races:
    ws = wb.create_sheet(r["name"][:31])
    if r["kins"]:
        cols = [(f'{k["name"].replace("tộc ", "")} · {g}', f'{k["id"]}_{gc}') for k in r["kins"] for g, gc in (("Nam", "nam"), ("Nữ", "nu"))]
    elif r["genderless"]:
        cols = [("Ảnh", "")]
    else:
        cols = [("Nam", "nam"), ("Nữ", "nu")]
    fixed = ["STT", "Mã ảnh", "Phần", "Nghề / Dạng", "Giai đoạn", "Cấp bậc trong game", "Nhóm ngoại hình"]
    ncol = len(fixed) + len(cols)
    ws.cell(1, 1, f'{r["name"]} — {len(r["jobs"])} nghề · {len(r["forms"])} nhánh tiến hóa' + (f' · {len(r["kins"])} tộc con' if r["kins"] else "")).font = Font(name=F, bold=True, size=14)
    rule = "<Mã ảnh>_<tộc con>_<nam|nu>.png  (vd bm_berserker_moi_cat_nam.png)" if r["kins"] else "<Mã ảnh>.png" if r["genderless"] else "<Mã ảnh>_<nam|nu>.png  (vd " + (r["jobs"][0]["id"] + "_moi_nam.png)" if r["jobs"] else "…)")
    ws.cell(2, 1, "Tên file khi gửi zip: " + rule + "   ·   Hoặc chèn ảnh thẳng vào ô vàng.").font = Font(name=F, size=9, color="555555")
    H = 4
    for j, h in enumerate(fixed + [c[0] for c in cols], start=1):
        c = ws.cell(H, j, h)
        c.font = Font(name=F, bold=True)
        c.fill = YEL
        c.alignment = mid
        c.border = BOX
    if r["kins"]:
        for j, (_, code) in enumerate(cols, start=len(fixed) + 1):
            ws.cell(H + 1, j, code).font = Font(name=F, size=8, color="777777")
            ws.cell(H + 1, j).alignment = mid
        H += 1
    row = H + 1
    stt = 0

    def section(title):
        global row
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=ncol)
        c = ws.cell(row, 1, title)
        c.font = Font(name=F, bold=True, color="1F3864")
        c.fill = SEC
        c.alignment = left
        ws.row_dimensions[row].height = 20
        row += 1

    def line(code, part, name, stage, rank, look, off=False):
        global row, stt
        stt += 1
        vals = [stt, code, part, name, stage, rank, look]
        for j, v in enumerate(vals, start=1):
            c = ws.cell(row, j, v)
            c.font = Font(name=F, size=10, bold=(j == 4))
            c.alignment = left if j in (2, 4, 6) else mid
            c.border = BOX
        for j in range(len(fixed) + 1, ncol + 1):
            c = ws.cell(row, j)
            c.fill = OFF if off else IMG
            c.border = BOX
        ws.row_dimensions[row].height = 80
        row += 1

    first_data = row
    section("A. Giai đoạn đời (chưa có nghề)")
    for key, vi, note in LIFE:
        line(f'{r["id"]}_{key}', "Giai đoạn đời", vi, note, "—", "—")
    section(f'B. Nghề nghiệp ({len(r["jobs"])} nghề × 2 giai đoạn)')
    for jb in r["jobs"]:
        start = row
        line(f'{jb["id"]}_moi', "Nghề", jb["name"], "Mới vào nghề", f'{jb["first"]}  (bậc 1/{jb["n"]})', jb["look"])
        line(f'{jb["id"]}_kycuu', "Nghề", jb["name"], "Kỳ cựu", f'{jb["top"]}  (bậc {jb["n"]}/{jb["n"]})', jb["look"])
        ws.merge_cells(start_row=start, start_column=4, end_row=start + 1, end_column=4)
        ws.merge_cells(start_row=start, start_column=7, end_row=start + 1, end_column=7)
    section(f'C. Nhánh tiến hóa ({len(r["forms"])})')
    if r["forms"]:
        for fm in r["forms"]:
            slug = "".join(ch if ch.isalnum() else "_" for ch in fm["name"].lower()).strip("_")
            line(f'{r["id"]}_tienhoa_{slug}', "Tiến hóa", fm["name"], "Sau tiến hóa", "—", "—")
    else:
        c = ws.cell(row, 1, "Tộc này không có nhánh tiến hóa trong game.")
        ws.merge_cells(start_row=row, start_column=1, end_row=row, end_column=ncol)
        c.font = Font(name=F, italic=True, color="777777")
        row += 1
    last = row - 1
    row += 1
    ws.cell(row, 4, "Số dòng ảnh").font = Font(name=F, bold=True)
    ws.cell(row, 5, f'=COUNTA(B{first_data}:B{last})').font = Font(name=F, bold=True)
    ws.cell(row + 1, 4, "Tổng số ảnh").font = Font(name=F, bold=True)
    ws.cell(row + 1, 5, f"=E{row}*{len(cols)}").font = Font(name=F, bold=True)
    ws.cell(row + 1, 6, f"({len(cols)} ảnh mỗi dòng)").font = Font(name=F, size=9, color="555555")
    totals.append((r, ws.title, row, row + 1, len(cols)))
    for k, w in enumerate([5, 26, 13, 20, 14, 30, 16] + [13] * len(cols), start=1):
        ws.column_dimensions[L(k)].width = w
    ws.freeze_panes = f"{L(len(fixed) + 1)}{H + 1}"

# ---- overview ----
over.cell(1, 1, TITLE).font = Font(name=F, bold=True, size=14)
over.cell(2, 1, "Mỗi sheet là một tộc: giai đoạn đời, đủ các nghề (mới vào nghề + kỳ cựu), các nhánh tiến hóa. Ô vàng = ô cần ảnh, ô xám = không cần.").font = Font(name=F, size=10)
hdr = ["Tộc", "Số nghề", "Nhánh tiến hóa", "Tộc con", "Ảnh mỗi dòng", "Số dòng ảnh", "Tổng số ảnh"]
for j, h in enumerate(hdr, start=1):
    c = over.cell(4, j, h)
    c.font = Font(name=F, bold=True)
    c.fill = YEL
    c.alignment = mid
    c.border = BOX
for i, (r, title, rr, tr, per) in enumerate(totals, start=5):
    q = f"'{title}'"
    vals = [r["name"], len(r["jobs"]), len(r["forms"]), len(r["kins"]) or "—", per, f"={q}!E{rr}", f"={q}!E{tr}"]
    for j, v in enumerate(vals, start=1):
        c = over.cell(i, j, v)
        c.font = Font(name=F, size=10, color="008000" if j >= 6 else "000000")
        c.border = BOX
        c.alignment = mid if j > 1 else left
end = 4 + len(totals)
over.cell(end + 1, 1, "Tổng").font = Font(name=F, bold=True)
for j in (2, 3, 6, 7):
    c = over.cell(end + 1, j, f"=SUM({L(j)}5:{L(j)}{end})")
    c.font = Font(name=F, bold=True)
    c.alignment = mid
notes = [
    "",
    "Cách gửi ảnh: chèn ảnh thẳng vào ô vàng rồi gửi lại file, HOẶC lưu file theo tên ghi ở dòng 2 mỗi sheet, nén zip rồi gửi.",
    "Mới vào nghề = cấp bậc đầu tiên của nghề (đồ nghề đơn sơ). Kỳ cựu = cấp bậc cao nhất (trang bị xịn, khí chất bậc thầy).",
    "Nhóm ngoại hình chỉ để tham khảo kiểu trang phục: Chiến binh, Pháp sư, Thợ săn / sát thủ, Thợ / lao động, Thường dân.",
    "Phong cách: pixel art 16-bit như ảnh goblin mẫu, toàn thân, nghiêng 3/4 quay phải, nền xám phẳng (script tự xóa nền).",
]
for k, t in enumerate(notes, start=end + 2):
    over.cell(k, 1, t).font = Font(name=F, size=10)
for k, w in enumerate([22, 10, 15, 10, 13, 13, 13], start=1):
    over.column_dimensions[L(k)].width = w
wb.save(sys.argv[2])
print("ok:", ", ".join(f"{t[1]}" for t in totals))
