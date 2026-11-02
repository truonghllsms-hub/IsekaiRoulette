#!/usr/bin/env python3
"""Finds the picture tiles on a design sheet page (a dark page with grey tiles holding one sprite
each) and returns them in reading order: rows top to bottom, left to right in a row."""
import numpy as np
from PIL import Image
from collections import Counter


def page_bg(a):
    border = np.concatenate([a[:6, :, :3].reshape(-1, 3), a[-6:, :, :3].reshape(-1, 3), a[:, :6, :3].reshape(-1, 3), a[:, -6:, :3].reshape(-1, 3)])
    return np.array(Counter(map(tuple, (border // 6) * 6)).most_common(1)[0][0], dtype=np.int32)


def tiles(img, min_frac=0.055):
    a = np.asarray(img.convert("RGB")).astype(np.int32)
    h, w = a.shape[:2]
    bg = page_bg(a)
    # the tile face: the most common flat colour that is not the page itself
    q = (a // 6) * 6
    far = np.abs(a - bg).sum(axis=2) > 18
    cnt = Counter(map(tuple, q[far][:: 7]))
    face = np.array(cnt.most_common(1)[0][0], dtype=np.int32)
    diff = np.abs(a - face).sum(axis=2) <= 30
    # the tile face is a flat grey: its row/column runs are long; text is thin and broken
    # label every connected blob of "not background" with a cheap two-pass union-find on a coarse grid
    step = 4
    small = diff[::step, ::step]
    H, W = small.shape
    lab = np.zeros((H, W), np.int32)
    parent = [0]
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    n = 0
    for y in range(H):
        row = small[y]
        for x in range(W):
            if not row[x]:
                continue
            up = lab[y - 1, x] if y else 0
            left = lab[y, x - 1] if x else 0
            if up and left:
                a1, b1 = find(up), find(left)
                lab[y, x] = min(a1, b1)
                if a1 != b1:
                    parent[max(a1, b1)] = min(a1, b1)
            elif up or left:
                lab[y, x] = up or left
            else:
                n += 1
                parent.append(n)
                lab[y, x] = n
    roots = np.array([find(i) for i in range(n + 1)])
    lab = roots[lab]
    boxes = []
    for r in np.unique(lab):
        if r == 0:
            continue
        ys, xs = np.where(lab == r)
        y0, y1, x0, x1 = ys.min(), ys.max(), xs.min(), xs.max()
        bw, bh = (x1 - x0 + 1) * step, (y1 - y0 + 1) * step
        if bw >= w * min_frac * 0.25 and bh >= w * min_frac * 0.5:
            boxes.append([x0 * step, y0 * step, x0 * step + bw, y0 * step + bh, len(ys) * step * step])
    # a big sprite can cut a tile face in two: pieces that overlap or touch side by side are one tile
    merged = True
    while merged:
        merged = False
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                a_, b_ = boxes[i], boxes[j]
                vo = min(a_[3], b_[3]) - max(a_[1], b_[1])
                gap = max(a_[0], b_[0]) - min(a_[2], b_[2])
                if vo > 0.6 * min(a_[3] - a_[1], b_[3] - b_[1]) and gap < 6:
                    boxes[i] = [min(a_[0], b_[0]), min(a_[1], b_[1]), max(a_[2], b_[2]), max(a_[3], b_[3]), a_[4] + b_[4]]
                    boxes.pop(j)
                    merged = True
                    break
            if merged:
                break
    cand = []
    for x0, y0, x1, y1, area in boxes:
        bw, bh = x1 - x0, y1 - y0
        if bw >= w * min_frac and bh >= w * min_frac and area / (bw * bh) > 0.3 and 0.45 < bw / bh < 2.2:
            cand.append((x0, y0, x1, y1))
    if not cand:
        return [], []
    face_mask = diff

    def ring(b):
        """Share of the tile-face colour on the outer band of a box: high on a real tile."""
        x0, y0, x1, y1 = [int(v) for v in b]
        x0, y0, x1, y1 = max(0, x0), max(0, y0), min(w, x1), min(h, y1)
        if x1 - x0 < 10 or y1 - y0 < 10:
            return 0
        t = max(3, int((x1 - x0) * 0.06))
        m = face_mask[y0:y1, x0:x1]
        band = np.concatenate([m[:t].ravel(), m[-t:].ravel(), m[:, :t].ravel(), m[:, -t:].ravel()])
        return band.mean()

    # "normal" tiles: near the common size; the rest (pieces, boxes swollen by a big sprite) are re-placed
    ws_, hs_ = np.median([b[2] - b[0] for b in cand]), np.median([b[3] - b[1] for b in cand])
    normal = [b for b in cand if 0.55 < (b[2] - b[0]) / ws_ < 1.7 and 0.55 < (b[3] - b[1]) / hs_ < 1.7]
    normal.sort(key=lambda b: (b[1] + b[3]) / 2)
    rows, cur = [], []
    for b in normal:
        if cur and (b[1] + b[3]) / 2 - np.mean([(c[1] + c[3]) / 2 for c in cur]) > (b[3] - b[1]) * 0.5:
            rows.append(cur)
            cur = []
        cur.append(b)
    if cur:
        rows.append(cur)
    fixed = []
    for r in rows:
        r = sorted(r, key=lambda b: b[0])
        tw = float(np.median([b[2] - b[0] for b in r]))
        th = float(np.median([b[3] - b[1] for b in r]))
        y0r = float(np.median([b[1] for b in r]))
        # every box of this row gets the row's size, kept where it was detected (its left edge, or its
        # right edge when the left one was swollen)
        reg = []
        for b in r:
            x0 = b[0] if abs((b[2] - b[0]) - tw) < tw * 0.12 or ring((b[0], y0r, b[0] + tw, y0r + th)) >= ring((b[2] - tw, y0r, b[2], y0r + th)) else b[2] - tw
            nb = (int(x0), int(y0r), int(x0 + tw), int(y0r + th))
            if reg and nb[0] < reg[-1][2] - tw * 0.3:
                continue  # a piece of the tile just placed
            reg.append(nb)
        gaps = [reg[k + 1][0] - reg[k][2] for k in range(len(reg) - 1)]
        small_gaps = [g for g in gaps if g < tw * 0.6]
        gap = float(np.median(small_gaps)) if small_gaps else tw * 0.15
        pitch = tw + gap
        # fill holes inside the row, then try one more tile at each end
        full = []
        for b in reg:
            while full and b[0] - full[-1][2] > tw * 0.8:
                nb = (int(full[-1][0] + pitch), b[1], int(full[-1][0] + pitch + tw), b[3])
                if ring(nb) < 0.25:
                    break
                full.append(nb)
            full.append(b)
        while full and full[0][0] - pitch >= -tw * 0.02:
            nb = (int(full[0][0] - pitch), full[0][1], int(full[0][0] - pitch + tw), full[0][3])
            if ring(nb) < 0.35:
                break
            full.insert(0, nb)
        while full and full[-1][2] + pitch <= w * 1.01:
            nb = (int(full[-1][0] + pitch), full[-1][1], int(full[-1][0] + pitch + tw), full[-1][3])
            if ring(nb) < 0.35:
                break
            full.append(nb)
        fixed.append([(max(0, b[0]), max(0, b[1]), min(w, b[2]), min(h, b[3])) for b in full])
    return [b for r in fixed for b in r], [len(r) for r in fixed]

def debug(path, out):
    from PIL import ImageDraw
    im = Image.open(path).convert("RGB")
    t, _ = tiles(im)
    d = ImageDraw.Draw(im)
    for i, b in enumerate(t):
        d.rectangle(b, outline=(255, 0, 0), width=3)
        d.text((b[0] + 4, b[1] + 2), str(i), fill=(255, 255, 0))
    im.thumbnail((1400, 1400))
    im.save(out)


if __name__ == "__main__":
    import sys
    for p in sys.argv[1:]:
        t, rows = tiles(Image.open(p))
        print(p, len(t), rows)
