#!/usr/bin/env python3
"""Writes the sprite worksheet (xlsx) from the rows made by tools/image-sheet-rows.js.
    python3 tools/make-image-sheet.py <rows.json> <out.xlsx>"""
import json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

rows = json.load(open(sys.argv[1], encoding="utf8"))
CAP = max(r["count"] for r in rows)
F = "Arial"
YEL = PatternFill("solid", fgColor="FFFF00")
TODO = PatternFill("solid", fgColor="FFF8D6")
OFF = PatternFill("solid", fgColor="EDEDED")
BAND = PatternFill("solid", fgColor="F5F9FF")
thin = Side(style="thin", color="C8C8C8")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap = Alignment(wrap_text=True, vertical="center")
mid = Alignment(horizontal="center", vertical="center")

wb = Workbook()
ws = wb.active
ws.title = "Danh sách ảnh"
head = ["Mã ảnh", "Tộc", "Nhân vật", "Giới tính", "Số lượng ảnh", "Tỉ lệ gặp"] + [f"Ảnh {i}" for i in range(1, CAP + 1)] + ["Prompt (dán vào công cụ tạo ảnh)"]
ws.append(head)
for c in ws[1]:
    c.font = Font(name=F, bold=True)
    c.fill = YEL
    c.alignment = mid
    c.border = BOX
first_img = 7
prompt_col = first_img + CAP
race_prev, band = None, False
for i, r in enumerate(rows, start=2):
    if r["race"] != race_prev:
        band, race_prev = not band, r["race"]
    vals = [r["code"], r["race"], r["lookVi"], r["gender"], r["count"], r["share"]] + [None] * CAP + [r["prompt"]]
    ws.append(vals)
    ws.row_dimensions[i].height = 78
    for j, c in enumerate(ws[i], start=1):
        c.font = Font(name=F, size=10, color="0000FF" if j == 5 else "000000")
        c.border = BOX
        c.alignment = wrap if j in (3, prompt_col) else mid
        if j < first_img and band:
            c.fill = BAND
        if first_img <= j < prompt_col:
            c.fill = TODO if j - first_img < r["count"] else OFF
    ws.cell(i, 1).alignment = Alignment(vertical="center")
    ws.cell(i, 6).number_format = "0.00%"
    ws.cell(i, prompt_col).font = Font(name=F, size=8, color="555555")
widths = [30, 20, 22, 9, 10, 9] + [13] * CAP + [70]
for k, w in enumerate(widths, start=1):
    ws.column_dimensions[get_column_letter(k)].width = w
ws.freeze_panes = ws.cell(2, first_img)
last = len(rows) + 1
ws.auto_filter.ref = f"A1:{get_column_letter(prompt_col)}{last}"
total_row = last + 2
ws.cell(total_row, 3, "Tổng số ảnh").font = Font(name=F, bold=True)
ws.cell(total_row, 5, f"=SUM(E2:E{last})").font = Font(name=F, bold=True)
ws.cell(total_row, 5).alignment = mid
ws.cell(total_row + 1, 3, "Tổng tỉ lệ gặp").font = Font(name=F, bold=True)
ws.cell(total_row + 1, 6, f"=SUM(F2:F{last})").number_format = "0.0%"

# ---- per race ----
sr = wb.create_sheet("Tổng theo tộc")
sr.append(["Tộc", "Số nhóm hình", "Số ảnh cần tạo", "Tỉ lệ gặp", "Tỉ lệ số ảnh"])
for c in sr[1]:
    c.font = Font(name=F, bold=True)
    c.fill = YEL
    c.alignment = mid
    c.border = BOX
races = []
for r in rows:
    if r["race"] not in races:
        races.append(r["race"])
for i, name in enumerate(races, start=2):
    sr.append([name, f"=COUNTIF('Danh sách ảnh'!$B$2:$B${last},A{i})", f"=SUMIF('Danh sách ảnh'!$B$2:$B${last},A{i},'Danh sách ảnh'!$E$2:$E${last})",
               f"=SUMIF('Danh sách ảnh'!$B$2:$B${last},A{i},'Danh sách ảnh'!$F$2:$F${last})", f"=C{i}/$C${len(races) + 2}"])
    for j, c in enumerate(sr[i], start=1):
        c.font = Font(name=F, size=10, color="008000" if j in (2, 3, 4) else "000000")
        c.border = BOX
    sr.cell(i, 4).number_format = "0.0%"
    sr.cell(i, 5).number_format = "0.0%"
t = len(races) + 2
sr.append(["Tổng", f"=SUM(B2:B{t - 1})", f"=SUM(C2:C{t - 1})", f"=SUM(D2:D{t - 1})", f"=SUM(E2:E{t - 1})"])
for c in sr[t]:
    c.font = Font(name=F, bold=True)
    c.border = BOX
sr.cell(t, 4).number_format = "0.0%"
sr.cell(t, 5).number_format = "0.0%"
for k, w in enumerate([24, 14, 16, 12, 14], start=1):
    sr.column_dimensions[get_column_letter(k)].width = w
sr.freeze_panes = "A2"

# ---- guide ----
g = wb.create_sheet("Hướng dẫn", 0)
lines = [
    ("Bảng ảnh nhân vật — Luân Hồi Dị Giới", True),
    ("", False),
    ("Cần làm gì", True),
    ("1. Sheet 'Danh sách ảnh': mỗi dòng là một nhóm hình (tộc · giới tính · độ tuổi / nhóm nghề / dạng tiến hóa).", False),
    ("2. Copy ô Prompt (cột cuối) dán vào công cụ tạo ảnh. Đính kèm ảnh goblin mẫu nếu công cụ cho phép, chọn khung vuông 1:1.", False),
    ("3. Tạo đủ số ảnh ở cột 'Số lượng ảnh' (mỗi ảnh là một biến thể khác nhau: mặt, màu tóc, vũ khí…).", False),
    ("4. Ô màu vàng nhạt = ô cần điền ảnh. Ô xám = không cần.", False),
    ("", False),
    ("Gửi ảnh lại (chọn 1 trong 2 cách)", True),
    ("Cách A: chèn ảnh thẳng vào ô vàng (Insert → Picture → Place in cell, hoặc kéo thả vào ô) rồi gửi lại file Excel này.", False),
    ("Cách B: lưu ảnh với tên  <Mã ảnh>_<số thứ tự>.png  (vd goblin_nam_chienbinh_1.png), nén zip rồi gửi.", False),
    ("Không cần đủ cả bảng: gửi từng đợt cũng được. Tộc nào chưa có ảnh, game vẫn chạy bình thường.", False),
    ("Không cần xóa nền: script tự xóa nền xám, cắt sát nhân vật, đưa về đúng lưới pixel. Nền phải phẳng một màu.", False),
    ("", False),
    ("Số lượng ảnh được tính thế nào", True),
    ("Mô phỏng 120 kiếp mỗi tộc (chọn ngẫu nhiên như người chơi), đo tỉ lệ thời gian người chơi nhìn thấy từng nhóm hình,", False),
    ("nhân với tỉ lệ đầu thai của tộc → cột 'Tỉ lệ gặp'. Số ảnh = Tỉ lệ gặp × 400, làm tròn, ít nhất 1, nhiều nhất 8.", False),
    ("Dạng tiến hóa và nhóm hiếm gặp vẫn có 1 ảnh để game luôn có hình. Có thể sửa tay cột 'Số lượng ảnh' (chữ xanh).", False),
    ("Bảng xếp theo tộc (tộc gặp nhiều nhất lên đầu), trong tộc theo tỉ lệ gặp: làm từ trên xuống là có lợi nhất.", False),
    ("", False),
    ("Nhóm nghề", True),
    ("Chiến binh: Kiếm sĩ, Warrior, Berserker, Gladiator, Kỵ sĩ, lính đánh thuê, vệ binh…", False),
    ("Pháp sư: Ma pháp sư, Priest, Shaman, Warlock, học giả…   Thợ săn / sát thủ: Ranger, Scout, Thief, Assassin, Rider…", False),
    ("Thợ / lao động: Blacksmith, thương nhân, nông dân, thợ mỏ…   Thường dân: chưa có nghề, quý tộc, bard…", False),
    ("Lúc nhỏ / Tuổi già: theo giai đoạn đời, không theo nghề. Dạng tiến hóa (Hobgoblin, Lich…) thay mọi hình khác khi đã tiến hóa.", False),
]
for k, (t, b) in enumerate(lines, start=1):
    c = g.cell(k, 1, t)
    c.font = Font(name=F, bold=b, size=14 if k == 1 else 11 if b else 10)
g.column_dimensions["A"].width = 130
wb.active = 1
wb.save(sys.argv[2])
print("ok", len(rows), "dòng")
