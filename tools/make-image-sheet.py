#!/usr/bin/env python3
"""Writes the sprite worksheet (xlsx) from prompts/image-rows.json (tools/image-sheet-rows.js).
    python3 tools/make-image-sheet.py <rows.json> <out.xlsx>"""
import json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter as L

src = json.load(open(sys.argv[1], encoding="utf8"))
LOOKS, IDS, FORMS = src["looks"], src["identities"], src["forms"]
F = "Arial"
YEL = PatternFill("solid", fgColor="FFFF00")
BASE = PatternFill("solid", fgColor="FFE9A8")   # the reference picture, made first
TODO = PatternFill("solid", fgColor="FFF8D6")
OFF = PatternFill("solid", fgColor="E3E3E3")
BAND = PatternFill("solid", fgColor="F5F9FF")
thin = Side(style="thin", color="C8C8C8")
BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
wrap = Alignment(wrap_text=True, vertical="top")
mid = Alignment(horizontal="center", vertical="center", wrap_text=True)


def header(ws, names):
    ws.append(names)
    for c in ws[1]:
        c.font = Font(name=F, bold=True)
        c.fill = YEL
        c.alignment = mid
        c.border = BOX
    ws.row_dimensions[1].height = 32


wb = Workbook()

# ---- identities ----
ws = wb.active
ws.title = "Nhân dạng"
fixed = ["Mã nhân dạng", "Tộc", "Giới tính", "Tỉ lệ gặp", "Số ảnh"]
img_cols = [("Ảnh: " + l["vi"] + (" (tạo trước)" if l["id"] == "thuongdan" else "")) for l in LOOKS]
prm_cols = [("Prompt: " + l["vi"]) for l in LOOKS]
header(ws, fixed + img_cols + prm_cols)
c_img, c_prm = len(fixed) + 1, len(fixed) + len(LOOKS) + 1
prev, band = None, False
for i, r in enumerate(IDS, start=2):
    if r["race"] != prev:
        band, prev = not band, r["race"]
    vals = [r["code"], r["race"], r["gender"], r["share"], None] + [None] * len(LOOKS) + [r["prompts"].get(l["id"], "") for l in LOOKS]
    ws.append(vals)
    ws.cell(i, 5, f'=COUNTIF({L(c_prm)}{i}:{L(c_prm + len(LOOKS) - 1)}{i},"?*")')
    ws.row_dimensions[i].height = 90
    for j, c in enumerate(ws[i], start=1):
        c.font = Font(name=F, size=10)
        c.border = BOX
        c.alignment = mid
        if j < c_img and band:
            c.fill = BAND
    for k, l in enumerate(LOOKS):
        used = l["id"] in r["looks"]
        ws.cell(i, c_img + k).fill = (BASE if l["id"] == "thuongdan" else TODO) if used else OFF
        p = ws.cell(i, c_prm + k)
        p.font = Font(name=F, size=7, color="555555")
        p.alignment = wrap
        if not used:
            p.fill = OFF
    ws.cell(i, 1).alignment = Alignment(vertical="center")
    ws.cell(i, 4).number_format = "0.00%"
last = len(IDS) + 1
for k, w in enumerate([22, 20, 9, 9, 7] + [14] * len(LOOKS) + [38] * len(LOOKS), start=1):
    ws.column_dimensions[L(k)].width = w
ws.freeze_panes = ws.cell(2, c_img)
ws.auto_filter.ref = f"A1:{L(c_prm + len(LOOKS) - 1)}{last}"
ws.cell(last + 2, 2, "Tổng số ảnh").font = Font(name=F, bold=True)
ws.cell(last + 2, 5, f"=SUM(E2:E{last})").font = Font(name=F, bold=True)

# ---- evolved forms ----
wf = wb.create_sheet("Tiến hóa")
header(wf, ["Mã ảnh", "Tộc", "Giới tính", "Dạng tiến hóa", "Ảnh", "Prompt"])
prev, band = None, False
for i, r in enumerate(FORMS, start=2):
    if r["race"] != prev:
        band, prev = not band, r["race"]
    wf.append([r["code"], r["race"], r["gender"], r["form"], None, r["prompt"]])
    wf.row_dimensions[i].height = 90
    for j, c in enumerate(wf[i], start=1):
        c.font = Font(name=F, size=10)
        c.border = BOX
        c.alignment = mid
        if j < 5 and band:
            c.fill = BAND
    wf.cell(i, 5).fill = TODO
    wf.cell(i, 6).font = Font(name=F, size=7, color="555555")
    wf.cell(i, 6).alignment = wrap
for k, w in enumerate([30, 20, 9, 22, 14, 60], start=1):
    wf.column_dimensions[L(k)].width = w
wf.freeze_panes = "E2"
flast = len(FORMS) + 1

# ---- per race ----
sr = wb.create_sheet("Tổng theo tộc")
header(sr, ["Tộc", "Số nhân dạng", "Ảnh nhân dạng", "Ảnh tiến hóa", "Tổng ảnh", "Tỉ lệ gặp", "Tỉ lệ số ảnh"])
races = []
for r in IDS + FORMS:
    if r["race"] not in races:
        races.append(r["race"])
N = "'Nhân dạng'"
T = "'Tiến hóa'"
t = len(races) + 2
for i, name in enumerate(races, start=2):
    sr.append([name, f"=COUNTIF({N}!$B$2:$B${last},A{i})", f"=SUMIF({N}!$B$2:$B${last},A{i},{N}!$E$2:$E${last})",
               f"=COUNTIF({T}!$B$2:$B${flast},A{i})", f"=C{i}+D{i}", f"=SUMIF({N}!$B$2:$B${last},A{i},{N}!$D$2:$D${last})", f"=E{i}/$E${t}"])
    for j, c in enumerate(sr[i], start=1):
        c.font = Font(name=F, size=10, color="008000" if j in (2, 3, 4, 6) else "000000")
        c.border = BOX
    sr.cell(i, 6).number_format = "0.0%"
    sr.cell(i, 7).number_format = "0.0%"
sr.append(["Tổng"] + [f"=SUM({L(k)}2:{L(k)}{t - 1})" for k in range(2, 8)])
for c in sr[t]:
    c.font = Font(name=F, bold=True)
    c.border = BOX
sr.cell(t, 6).number_format = "0.0%"
sr.cell(t, 7).number_format = "0.0%"
for k, w in enumerate([24, 13, 14, 13, 10, 11, 13], start=1):
    sr.column_dimensions[L(k)].width = w

# ---- guide ----
g = wb.create_sheet("Hướng dẫn", 0)
lines = [
    ("Bảng ảnh nhân vật — Luân Hồi Dị Giới", 1),
    ("", 0),
    ("Ý tưởng", 2),
    ("Mỗi dòng ở sheet 'Nhân dạng' là MỘT người cụ thể. Các cột là người đó lúc nhỏ, lúc thường, theo từng nhóm nghề và lúc già.", 0),
    ("Mỗi kiếp trong game được gán một nhân dạng và giữ nó cả đời: lúc nhỏ, đổi nghề hay về già vẫn là cùng một gương mặt.", 0),
    ("", 0),
    ("Cách tạo một dòng", 2),
    ("1. Tạo ô 'Thường dân (tạo trước)' (màu cam nhạt) bằng Prompt: Thường dân. Chọn tấm ưng nhất: đó là ảnh gốc của người này.", 0),
    ("2. Các ô còn lại: ĐÍNH KÈM ảnh gốc, rồi dán prompt của cột đó (đã có câu 'giữ nguyên nhân vật trong ảnh đính kèm').", 0),
    ("3. Ô xám = tộc này không dùng nhóm đó, bỏ qua.", 0),
    ("4. Tạo ảnh khung vuông 1:1. Lần đầu nên đính kèm thêm ảnh goblin mẫu để giữ phong cách pixel art.", 0),
    ("5. Sheet 'Tiến hóa': mỗi dạng tiến hóa 1 ảnh, tạo độc lập.", 0),
    ("", 0),
    ("Gửi ảnh lại (chọn 1 trong 2 cách, gửi từng đợt cũng được)", 2),
    ("Cách A: chèn ảnh thẳng vào ô (Excel: Insert → Pictures → Place in cell, hoặc kéo thả vào ô) rồi gửi lại file này.", 0),
    ("Cách B: lưu file tên  <Mã nhân dạng>_<cột>.png , nén zip rồi gửi. Tên cột viết không dấu:", 0),
    ("    thuongdan · nho · chienbinh · phapsu · thosan · tho · gia     (vd human_nam_3_chienbinh.png)", 0),
    ("    Ảnh tiến hóa: <Mã ảnh>.png  (vd goblin_nam_hobgoblin.png)", 0),
    ("Không cần xóa nền: script tự xóa nền xám phẳng, cắt sát nhân vật, đưa về lưới pixel.", 0),
    ("Chưa có ảnh ở ô nào thì game tự dùng ảnh gần nhất của cùng người đó (ưu tiên ô Thường dân).", 0),
    ("", 0),
    ("Số nhân dạng được tính thế nào", 2),
    ("Mô phỏng 120 kiếp mỗi tộc (chọn ngẫu nhiên như người chơi), đo tỉ lệ thời gian người chơi nhìn thấy mỗi tộc × giới tính,", 0),
    ("nhân với tỉ lệ đầu thai. Số nhân dạng tỉ lệ thuận với con số đó (ít nhất 1, nhiều nhất 8), tổng khoảng 500 ảnh.", 0),
    ("Bảng xếp tộc gặp nhiều lên đầu: làm từ trên xuống là có lợi nhất. Muốn bớt, xóa bớt dòng nhân dạng có số thứ tự cao.", 0),
    ("", 0),
    ("Nhóm nghề", 2),
    ("Chiến binh: Kiếm sĩ, Warrior, Berserker, Gladiator, Kỵ sĩ, lính… · Pháp sư: Ma pháp sư, Priest, Shaman, Warlock, học giả…", 0),
    ("Thợ săn / sát thủ: Ranger, Scout, Thief, Assassin, Rider… · Thợ / lao động: Blacksmith, thương nhân, nông dân, thợ mỏ…", 0),
    ("Thường dân: chưa có nghề, quý tộc, bard… · Lúc nhỏ / Tuổi già: theo giai đoạn đời, không theo nghề.", 0),
]
for k, (t_, lvl) in enumerate(lines, start=1):
    c = g.cell(k, 1, t_)
    c.font = Font(name=F, bold=lvl > 0, size=14 if lvl == 1 else 11 if lvl == 2 else 10)
g.column_dimensions["A"].width = 130
wb.active = 1
wb.save(sys.argv[2])
print("ok", len(IDS), "nhân dạng,", len(FORMS), "tiến hóa")
