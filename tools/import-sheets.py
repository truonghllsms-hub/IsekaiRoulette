#!/usr/bin/env python3
"""Cuts character sprites out of the design-sheet PDFs (one person per page, tiles for each life
stage, each trade new/veteran, each evolution) and packs one atlas per person:
img/<person>.png + img/atlas.json {person: {column: [x, y, w, h]}}.

    python3 tools/import-sheets.py <folder with human.pdf beastman.pdf dwarf.pdf elf.pdf monsters.pdf>

Which tile is which was read off the pages by eye: PAGES below. Tile numbers are those of
tools/sheet-tiles.py (reading order); MANUAL adds tiles that detector misses (in page pixels).
A tile only says roughly where a sprite is: the sprite is taken whole around it, so a box that is a
little off, or a sprite that spills over its tile, still comes out right.
"""
import json, os, subprocess, sys, tempfile, importlib.util, glob
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("st", os.path.join(ROOT, "tools", "sheet-tiles.py"))
st = importlib.util.module_from_spec(spec)
spec.loader.exec_module(st)
spec2 = importlib.util.spec_from_file_location("ii", os.path.join(ROOT, "tools", "import-images.py"))
ii = importlib.util.module_from_spec(spec2)
spec2.loader.exec_module(ii)

LIFE = ["beti", "hoilon", "thieunien", "thuongdan", "gia"]


def life(start=0, n=5, cols=LIFE):
    return {c: start + i for i, c in enumerate(cols[:n])}


def jobs(order, start):
    out = {}
    for i, j in enumerate(order):
        out[f"{j}_moi"] = start + 2 * i
        out[f"{j}_kycuu"] = start + 2 * i + 1
    return out


def evo(**kw):
    return {f"tienhoa_{k}": v for k, v in kw.items()}


HUMAN_JOBS = ["swordsman", "paladin", "gladiator", "mercenary", "mage", "priest", "scholar", "bard", "assassin", "ranger", "tamer", "smith", "merchant", "farmer"]
BEAST_JOBS = ["berserker", "hunter", "gladiator", "scout", "merc", "thief", "courier", "shaman", "mage", "leather", "herder"]
BEAST_PAGES = ["cat_nam", "cat_nu", "wolf_nam", "wolf_nu", "tiger_nam", "tiger_nu", "fox_nam", "fox_nu", "bear_nam", "bear_nu",
               "dog_nam", "dog_nu", "rabbit_nam", "rabbit_nu", "rat_nam", "rat_nu", "hawk_nam", "hawk_nu"]
DWARF_JOBS = ["runesmith", "miner", "shield", "brew", "eng", "carver", "merchant", "guard", "hunter"]
ELF_JOBS = ["ranger", "spirit", "herb", "bard", "guard", "wood", "envoy"]

# (pdf, page) -> [(person, {column: tile or [tiles]})]
PAGES = {}
for i in range(8):
    PAGES[("human", 2 + i)] = [(f"human_nam_{i + 1}", {**life(), **jobs(HUMAN_JOBS, 5)})]
    PAGES[("human", 10 + i)] = [(f"human_nu_{i + 1}", {**life(), **jobs(HUMAN_JOBS, 5)})]
for i, who in enumerate(BEAST_PAGES):
    PAGES[("beastman", 2 + i)] = [(f"beastman_{who}_1", {**life(), **jobs(BEAST_JOBS, 5)})]
# Mèo nam: two extra pairs on the page (9-10, 15-16)
PAGES[("beastman", 2)] = [("beastman_cat_nam_1", {**life(), "berserker_moi": 5, "berserker_kycuu": 6, "hunter_moi": 7, "hunter_kycuu": 8,
    "gladiator_moi": 11, "gladiator_kycuu": 12, "scout_moi": 13, "scout_kycuu": 14, "merc_moi": 17, "merc_kycuu": 18,
    "thief_moi": 19, "thief_kycuu": 20, "courier_moi": 21, "courier_kycuu": 22, "shaman_moi": 23, "shaman_kycuu": 24,
    "mage_moi": 25, "mage_kycuu": 26, "leather_moi": 27, "leather_kycuu": 28, "herder_moi": 29, "herder_kycuu": 30})]
for i, who in enumerate(["dwarf_nam_1", "dwarf_nam_2", "dwarf_nam_3", "dwarf_nu_1", "dwarf_nu_2", "dwarf_nu_3"]):
    PAGES[("dwarf", i)] = [(who, {**life(), **jobs(DWARF_JOBS, 5)})]
# Dwarf nữ 1 and 3: one Mountain Guard tile only
for p, who in ((3, "dwarf_nu_1"), (5, "dwarf_nu_3")):
    m = {**life(), **jobs(DWARF_JOBS[:7], 5), "guard_moi": 19, "hunter_moi": 20, "hunter_kycuu": 21}
    PAGES[("dwarf", p)] = [(who, m)]
for i, who in enumerate(["elf_nam_1", "elf_nam_2"]):
    PAGES[("elf", i)] = [(who, {**life(), **jobs(ELF_JOBS, 5)})]
PAGES[("elf", 2)] = [("elf_nu_1", {**life(), **jobs(ELF_JOBS[:6], 5), "envoy_moi": 17, "envoy_kycuu": 19})]
PAGES[("elf", 3)] = [("elf_nu_2", {**life(), **jobs(ELF_JOBS[:6], 5), "envoy_moi": 17, "envoy_kycuu": "m0"})]

M = {}
M[1] = [("goblin_nam_1", {**life(), **jobs(["warrior", "scout", "shaman", "tinker", "rider"], 5), **evo(hobgoblin=15, goblin_shaman_lord=16, goblin_king=17)})]
M[2] = [("goblin_nu_1", {**life(), **jobs(["warrior", "scout", "shaman", "tinker", "rider"], 5), **evo(hobgoblin=[15, 16], goblin_shaman_lord=[17, 18], goblin_king=19)})]
M[3] = [("slime_x_1", {**life(), **jobs(["metal", "magic", "poison", "mimic", "pet"], 5), **evo(slime_king=15, elemental_slime=16, humanoid_slime=17, bloodbloom_slime=18)})]
M[4] = [("orc_nam_1", {**life(), **jobs(["berserker", "ranger", "shaman", "smith", "rider"], 5), **evo(high_orc=15, orc_warlord=16)})]
M[5] = [("orc_nu_1", {**life(), **jobs(["berserker", "ranger", "shaman", "smith", "rider"], 5), **evo(high_orc=[15, 16], orc_warlord=[17, 18])})]
M[6] = [("demon_nam_1", {**life(), **jobs(["dk", "wl", "bu", "me", "bs", "bh", "spy"], 5)})]
M[7] = [("demon_nu_1", {**life(), **jobs(["dk", "wl"], 5), "bh_moi": 9, "bu_kycuu": 10}),
        ("demon_nam_2", {**life(11, 4), "spy_moi": 15, "spy_kycuu": 16, **jobs(["dk", "bu"], 17)})]
VAMP = {**life(), **jobs(["noble", "blade", "mage", "hunter"], 5), "hidden_moi": 13, "hidden_kycuu": 15}
M[8] = [("vampire_nam_1", {**VAMP, **evo(vampire_noble=[16, 17], true_ancestor=[18, 19], daywalker=[20, 21])})]
M[9] = [("vampire_nu_1", {**VAMP, **evo(vampire_noble=[16, 17], true_ancestor=[18, 19, 20], daywalker=21)})]
M[10] = [("kobold_nam_1", {**life(), **jobs(["miner", "trapper", "sniffer", "priest", "overseer"], 5), **evo(kobold_elite=15, dragonblood_kobold=16)})]
M[11] = [("lizardman_nam_1", {**life(), **jobs(["warrior", "hunter", "priest", "venom", "egg"], 5), **evo(swamp_dragonewt=15, high_serpent_priest=[16, 17])})]
M[12] = [("kobold_nu_1", {**life(), **jobs(["sniffer", "miner", "trapper"], 5), **evo(kobold_elite=11, dragonblood_kobold=12)}),
         ("lizardman_nu_1", {**life(13, 3), **jobs(["warrior"], 16), "hunter_kycuu": 18, **jobs(["priest", "venom", "egg"], 19), **evo(swamp_dragonewt=25, high_serpent_priest=26)})]
M[13] = [("dragon_nam_1", {**life(), **jobs(["hoard", "war", "sage"], 5), **evo(ancient_dragon=[11, 12], dragon_god=[13, 14])})]
M[14] = [("high_demon_nam_1", {**life(0, 4), "gia": 5, **jobs(["general", "archmage", "lord"], 6), **evo(demon_king=12, demon_god=13)})]
M[15] = [("dragon_nu_1", {**life(), **jobs(["hoard", "war"], 10), "sage_kycuu": 14}),
         ("high_demon_nu_1", {**life(5), **jobs(["general", "archmage", "lord"], 20), **evo(demon_king=26, demon_god=27)})]
M[16] = [("imp_nam_1", {**life(), **jobs(["custodian", "messenger", "secretary", "familiar", "trickster"], 5), **evo(greater_demon=15, free_imp="m0")})]
M[17] = [("minotaur_nam_1", {**life(), **jobs(["guardian", "gladiator", "shaman"], 5), **evo(golden_minotaur=[11, 12], mythical_minotaur=[13, 14])})]
M[18] = [("troll_nam_1", {"beti": "m0", "hoilon": "m1", "thieunien": "m2", "thuongdan": "m3", "gia": "m4", **jobs(["bridge", "merc", "scholar"], 0), **evo(stone_troll=6, ancient_ice_troll="m5")})]
M[19] = [("imp_nu_1", {**life(), "custodian_moi": 5, "messenger_kycuu": 6, "familiar_moi": 7, "trickster_moi": 8, **evo(greater_demon=9, free_imp="m0")}),
         ("minotaur_nu_1", {**life(10, 4), "guardian_moi": 14, "gladiator_moi": 15, "shaman_moi": 16, **evo(golden_minotaur=[17, 18], mythical_minotaur=19)}),
         ("troll_nu_1", {**life(20, 4), "gia": 25, **jobs(["bridge"], 27), "merc_moi": 29, "scholar_kycuu": 30, **evo(stone_troll=31, ancient_ice_troll=32)})]
M[20] = [("ghoul_x_1", {**life(), **jobs(["stalker", "sentinel", "awakened"], 5), **evo(ghast=[11, 12], lich=[13, 14])})]
for k, v in M.items():
    PAGES[("monsters", k)] = v


def disp(box, offset=(0, 0), scale=1.0, k=1.1):
    """A box read off a contact sheet shown scaled (k) back to page pixels."""
    x0, x1, y0, y1 = box
    return tuple(int(round((v * k - o) / scale)) for v, o in ((x0, offset[0]), (y0, offset[1]), (x1, offset[0]), (y1, offset[1])))


MANUAL = {
    ("elf", 3): [disp((1765, 1870, 970, 1100), (1100, 614), 0.7994)],
    ("monsters", 16): [disp((1215, 1360, 612, 740), (1100, 0), 0.9167)],
    ("monsters", 18): [disp(b, (1100, 0), 0.7994) for b in [(1028, 1145, 115, 170), (1165, 1282, 115, 170), (1303, 1420, 115, 170), (1440, 1558, 115, 170), (1578, 1695, 115, 170), (1853, 1970, 222, 283)]],
    ("monsters", 19): [disp((888, 958, 85, 147), (0, 0), 0.7994)],
}

TARGET_TILE = 96  # a tile is brought to this height: sprites keep their size relative to one another


def sprite_from(a, face, bg, boxes):
    """The sprite of one tile (or of several boxes covering one big tile), as an RGBA crop.
    First the inside of the tile, background peeled off from its edge; if the figure runs into
    that edge (it spills over its tile), the whole figure is taken around the tile instead."""
    x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes); x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
    ins = max(2, int(min(x1 - x0, y1 - y0) * 0.06))
    inner = a[y0 + ins:y1 - ins, x0 + ins:x1 - ins]
    if inner.shape[0] > 20 and inner.shape[1] > 20:
        rgba = ii.remove_background(Image.fromarray(inner), tol=36)
        al = clean(rgba[:, :, 3])
        op = al > 0
        edge = np.concatenate([op[0], op[-1], op[:, 0], op[:, -1]]).mean()
        if op.mean() > 0.02 and edge < 0.06 and op.mean() < 0.75:
            ys, xs = np.where(op)
            first = np.dstack([inner[ys.min():ys.max() + 1, xs.min():xs.max() + 1], al[ys.min():ys.max() + 1, xs.min():xs.max() + 1]])
            # the peel can eat into a figure the colour of its tile: the other way may keep more of it
            other = sprite_around(a, face, bg, boxes)
            if other is not None:
                o = other[0][:, :, 3] > 0
                if o.sum() > 1.5 * op.sum() and o.mean() < 0.7:
                    return other
            return first, None
    return sprite_around(a, face, bg, boxes)


def sprite_around(a, face, bg, boxes):
    """The whole sprite around one or more tile boxes, as an RGBA crop."""
    h, w = a.shape[:2]
    rgb = a.astype(np.int32)
    x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes); x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
    bw, bh = x1 - x0, y1 - y0
    # this tile's own face colour (tiles differ: a glow, a lighter frame): the commonest colour just
    # inside its edge, where sprites rarely reach
    t = max(3, int(min(bw, bh) * 0.07))
    ring = np.concatenate([rgb[y0 + t:y0 + 2 * t, x0:x1].reshape(-1, 3), rgb[y1 - 2 * t:y1 - t, x0:x1].reshape(-1, 3),
                           rgb[y0:y1, x0 + t:x0 + 2 * t].reshape(-1, 3), rgb[y0:y1, x1 - 2 * t:x1 - t].reshape(-1, 3)])
    from collections import Counter
    local = np.array(Counter(map(tuple, (ring // 8) * 8 + 4)).most_common(1)[0][0], dtype=np.int32)
    X0, Y0, X1, Y1 = max(0, x0 - bw // 3), max(0, y0 - bh // 3), min(w, x1 + bw // 3), min(h, y1 + bh // 3)
    reg = rgb[Y0:Y1, X0:X1]
    near = lambda c, tol: np.abs(reg - c).sum(axis=2) <= tol
    # background = smooth areas (tile face, page, glow) that reach the edge of the region or look like
    # the tile face; the sprite's dark outline and pixel edges break smoothness, so it stays apart
    d = np.zeros(reg.shape[:2], np.int32)
    for dy, dx in ((0, 1), (1, 0), (0, -1), (-1, 0)):
        d = np.maximum(d, np.abs(reg - np.roll(np.roll(reg, dy, 0), dx, 1)).sum(axis=2))
    smooth = d <= 24
    lab_s, ns = ndimage.label(smooth)
    border_ids = set(np.unique(np.concatenate([lab_s[0], lab_s[-1], lab_s[:, 0], lab_s[:, -1]]))) - {0}
    if ns:
        idx = range(1, ns + 1)
        cnt = ndimage.sum(np.ones_like(lab_s), lab_s, idx)
        mean = np.stack([ndimage.mean(reg[:, :, k], lab_s, idx) for k in range(3)], axis=1)
        facey = np.abs(mean - local).sum(axis=1) <= 60
        big = cnt >= bw * bh * 0.01
        # a smooth area spanning most of the tile is the tile face, whatever its colour (lit, vignetted)
        objs_s = ndimage.find_objects(lab_s)
        wide = [o is not None and (o[1].stop - o[1].start) >= bw * 0.6 and (o[0].stop - o[0].start) >= bh * 0.6 for o in objs_s]
        bg_ids = border_ids | {i + 1 for i in range(ns) if (facey[i] and big[i]) or wide[i]}
    else:
        bg_ids = border_ids
    bgm = np.isin(lab_s, list(bg_ids)) | near(local, 30) | near(bg, 30)
    # thin lines left over (tile rims, label underlines) go; sprite pixels are several screen pixels wide
    sub = ndimage.binary_opening(~bgm, structure=np.ones((3, 3)))
    # (the region looks a little beyond the tile: sprites spill over, and the next tile is far enough away)
    lab, n = ndimage.label(sub, structure=np.ones((3, 3)))
    if n == 0:
        return None
    inside = np.zeros_like(sub)
    ix0, iy0, ix1, iy1 = x0 - X0 + int(bw * 0.04), y0 - Y0 + int(bh * 0.04), x1 - X0 - int(bw * 0.04), y1 - Y0 - int(bh * 0.04)
    inside[iy0:iy1, ix0:ix1] = True
    sizes = ndimage.sum(np.ones_like(lab), lab, index=range(1, n + 1))
    ins = ndimage.sum(inside, lab, index=range(1, n + 1))
    objs = ndimage.find_objects(lab)
    keep = []
    for i in range(n):
        if sizes[i] < max(12, bw * bh * 0.0004):
            continue
        sl = objs[i]
        cw, ch = sl[1].stop - sl[1].start, sl[0].stop - sl[0].start
        # the tile's own rim, a bracket, a "vs": thin and sparse
        dens = sizes[i] / (cw * ch)
        if cw > bw * 0.85 and ch > bh * 0.85 and dens < 0.12:
            continue
        if dens < 0.1 and max(cw / bw, ch / bh) > 0.45:
            continue
        if ins[i] / sizes[i] >= 0.35:
            keep.append(i + 1)
    if not keep:
        return None
    sel = np.isin(lab, keep)
    # a label under the tile is text: drop pieces whose top is below the tile
    ys, xs = np.where(sel)
    cy0, cy1, cx0, cx1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = a[Y0 + cy0:Y0 + cy1, X0 + cx0:X0 + cx1]
    m = sel[cy0:cy1, cx0:cx1]
    # holes inside the sprite (grey armour, eyes) stay: transparent is only what the border reaches
    outside = ~m
    lab2, n2 = ndimage.label(outside)
    edge = set(np.unique(np.concatenate([lab2[0], lab2[-1], lab2[:, 0], lab2[:, -1]]))) - {0}
    trans = np.isin(lab2, list(edge))
    alpha = np.where(trans, 0, 255).astype(np.uint8)
    # a whole tile came along (its face was lit or vignetted): drop the frame and peel the face off
    # from the edge inwards, step by step, as tools/import-images.py does
    op = alpha > 0
    sides = [op[0].mean(), op[-1].mean(), op[:, 0].mean(), op[:, -1].mean()]
    if min(sides) > 0.6 and crop.shape[0] > 20 and crop.shape[1] > 20:
        ins = max(2, int(min(crop.shape[:2]) * 0.06))
        inner = crop[ins:-ins, ins:-ins]
        rgba = ii.remove_background(Image.fromarray(inner), tol=40)
        crop, alpha = inner, rgba[:, :, 3]
    alpha = clean(alpha)
    ys, xs = np.where(alpha > 0)
    if not len(ys):
        return None
    y0c, y1c, x0c, x1c = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    out = np.dstack([crop[y0c:y1c, x0c:x1c], alpha[y0c:y1c, x0c:x1c]])
    return out, (bh, w)


def clean(alpha):
    """Keep the figure: drop thin strokes (rims, brackets, letters) and specks away from it."""
    # 1-2 pixel strokes (a tile rim touching the figure) go first; sprite pixels are wider
    m = ndimage.binary_opening(alpha > 0, structure=np.ones((3, 3)))
    alpha = np.where(m, alpha, 0).astype(np.uint8)
    lab, n = ndimage.label(m, structure=np.ones((3, 3)))
    if n <= 1:
        return alpha
    idx = range(1, n + 1)
    size = ndimage.sum(m, lab, idx)
    thick = ndimage.sum(ndimage.binary_opening(m, structure=np.ones((5, 5))), lab, idx)
    main = int(np.argmax(size)) + 1
    objs = ndimage.find_objects(lab)
    mo = objs[main - 1]
    my0, my1 = mo[0].start, mo[0].stop
    mh = my1 - my0

    def label_like(i):
        # a word of the sheet's caption: flat and wide, above the head or under the feet
        o = objs[i]
        h_, w_ = o[0].stop - o[0].start, o[1].stop - o[1].start
        return h_ < 0.3 * mh and w_ > 1.8 * h_ and (o[0].stop <= my0 + 0.15 * mh or o[0].start >= my1 - 0.15 * mh)

    keep = [main] + [i + 1 for i in range(n) if i + 1 != main and size[i] >= size[main - 1] * 0.02 and thick[i] >= size[i] * 0.35 and not label_like(i)]
    return np.where(np.isin(lab, keep), alpha, 0).astype(np.uint8)


def page_images(pdf, folder):
    out = sorted(glob.glob(os.path.join(folder, "p-*.jpg")))
    if not out:
        os.makedirs(folder, exist_ok=True)
        subprocess.run(["pdfimages", "-j", pdf, os.path.join(folder, "p")], check=True)
        out = sorted(glob.glob(os.path.join(folder, "p-*.jpg")))
    return out


def main(src, out_dir, report=None):
    os.makedirs(out_dir, exist_ok=True)
    work = tempfile.mkdtemp()
    frames = {}  # person -> {col: Image}
    problems = []
    for name in ["human", "beastman", "dwarf", "elf", "monsters"]:
        pdf = os.path.join(src, name + ".pdf")
        pages = page_images(pdf, os.path.join(work, name))
        for pi, path in enumerate(pages):
            plan = PAGES.get((name, pi))
            if not plan:
                continue
            img = Image.open(path).convert("RGB")
            tiles, _ = st.tiles(img)
            a = np.asarray(img)
            bg = st.page_bg(a.astype(np.int32))
            q = (a.astype(np.int32) // 6) * 6
            far = np.abs(a.astype(np.int32) - bg).sum(axis=2) > 18
            from collections import Counter
            face = np.array(Counter(map(tuple, q[far][::7])).most_common(1)[0][0], dtype=np.int32)
            manual = MANUAL.get((name, pi), [])
            tile_h = np.median([t[3] - t[1] for t in tiles]) if tiles else 100
            scale = TARGET_TILE / tile_h
            for person, cols in plan:
                for col, ref in cols.items():
                    refs = ref if isinstance(ref, list) else [ref]
                    boxes = []
                    for r in refs:
                        if isinstance(r, str) and r.startswith("m"):
                            boxes.append(manual[int(r[1:])])
                        elif r < len(tiles):
                            boxes.append(tiles[r])
                    if not boxes:
                        problems.append(f"{name} p{pi} {person}.{col}: tile {ref} not found")
                        continue
                    got = sprite_from(a, face, bg, boxes)
                    if got is None:
                        problems.append(f"{name} p{pi} {person}.{col}: no sprite")
                        continue
                    arr, _ = got
                    # still a full block (a lit tile the first passes kept): one harder peel
                    if (arr[:, :, 3] > 0).mean() > 0.7:
                        peel = ii.remove_background(Image.fromarray(arr[:, :, :3]), tol=60)
                        al = clean(peel[:, :, 3])
                        if 0.03 < (al > 0).mean() < 0.7:
                            ys, xs = np.where(al > 0)
                            arr = np.dstack([arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1, :3], al[ys.min():ys.max() + 1, xs.min():xs.max() + 1]])
                    # a tile frame left around the figure: shave the outer band away and tidy up again
                    for _ in range(3):
                        al = arr[:, :, 3] > 0
                        if min(al.shape) < 12:
                            break
                        sides = sorted([al[:3].mean(), al[-3:].mean(), al[:, :3].mean(), al[:, -3:].mean()])
                        if sides[1] < 0.45:
                            break
                        b = max(3, int(min(al.shape) * 0.05))
                        arr = arr[b:-b, b:-b].copy()
                        arr[:, :, 3] = clean(arr[:, :, 3])
                        ys, xs = np.where(arr[:, :, 3] > 0)
                        if not len(ys):
                            break
                        arr = arr[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
                    im = Image.fromarray(arr, "RGBA")
                    im = im.resize((max(1, round(im.width * scale)), max(1, round(im.height * scale))), Image.LANCZOS)
                    # crisp edge after the shrink: alpha is on or off
                    al = im.getchannel("A").point(lambda v: 255 if v > 110 else 0)
                    im.putalpha(al)
                    frames.setdefault(person, {})[col] = im
    # one atlas per person: frames side by side, bottoms aligned
    atlas = {}
    for person, cols in frames.items():
        H = max(f.height for f in cols.values())
        W = sum(f.width + 2 for f in cols.values())
        sheet = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        x = 0
        atlas[person] = {}
        for col, f in cols.items():
            y = H - f.height
            sheet.paste(f, (x, y), f)
            atlas[person][col] = [x, y, f.width, f.height]
            x += f.width + 2
        atlas[person]["_size"] = [W, H]
        sheet = sheet.quantize(colors=255, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
        sheet.save(os.path.join(out_dir, person + ".png"), optimize=True)
    json.dump(atlas, open(os.path.join(out_dir, "atlas.json"), "w"), separators=(",", ":"))
    size = sum(os.path.getsize(os.path.join(out_dir, p + ".png")) for p in atlas)
    print(f"{len(atlas)} người, {sum(len(v) - 1 for v in atlas.values())} ảnh, {size // 1024} KB")
    for p in problems:
        print("  ! " + p)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "img"))
