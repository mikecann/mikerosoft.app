"""Cuts the magenta sheets from generate.py into 256px transparent icons.

usage: python3 slice.py [tool-name ...]   (needs pillow and numpy)
Pass a tool name to cut only that icon, leaving existing icons untouched.
"""
import os, re, sys, numpy as np
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', '..', 'public', 'icons')
names = re.findall(r"^\s+\('([a-z0-9-]+)', ", open(os.path.join(HERE, 'generate.py')).read(), re.M)
selected = set(sys.argv[1:]) or set(names)
unknown = selected - set(names)
if unknown:
    raise SystemExit(f"Unknown icons: {', '.join(sorted(unknown))}")
K = np.array([255, 0, 255], float)
SIZE, PAD = 256, 0.06
for sheet in range((len(names) + 8) // 9):
    if not selected.intersection(names[sheet * 9:(sheet + 1) * 9]):
        continue
    im = np.asarray(Image.open(os.path.join(HERE, f'sheet-{sheet}.png')).convert('RGB'), float)
    h, w, _ = im.shape
    for i, name in enumerate(names[sheet * 9:(sheet + 1) * 9]):
        if name not in selected:
            continue
        r, c = divmod(i, 3)
        cell = im[r*h//3:(r+1)*h//3, c*w//3:(c+1)*w//3]
        d = np.linalg.norm(cell - K, axis=2)
        a = np.clip((d - 60) / 110, 0, 1)
        safe = np.maximum(a, 1e-3)[..., None]
        rgb = np.clip((cell - (1 - a)[..., None] * K) / safe, 0, 255)
        rgba = np.dstack([rgb, a * 255]).astype(np.uint8)
        img = Image.fromarray(rgba, 'RGBA')
        # drop faint specks before trimming
        mask = Image.fromarray(((a > 0.5) * 255).astype(np.uint8))
        box = mask.getbbox()
        img = img.crop(box)
        side = int(max(img.size) * (1 + 2 * PAD))
        canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
        canvas.alpha_composite(img, ((side - img.size[0]) // 2, (side - img.size[1]) // 2))
        name = names[sheet * 9 + i]
        canvas.resize((SIZE, SIZE), Image.LANCZOS).save(f'{OUT}/{name}.png', optimize=True)
if len(sys.argv) > 1:
    print('ok: ' + ', '.join(sorted(selected)))
    sys.exit(0)
# contact sheet on grey and white to check edges
tiles = [Image.open(f'{OUT}/{n}.png') for n in names]
sheet = Image.new('RGBA', (9 * 136, ((len(names) + 8) // 9) * 2 * 136), (192, 192, 192, 255))
for i, t in enumerate(tiles):
    bg = (192, 192, 192, 255) if (i // 9) % 2 == 0 else (0, 128, 128, 255)
    x, y = (i % 9) * 136, (i // 9) * 2 * 136
    for dy, col in ((0, (192, 192, 192, 255)), (136, (0, 128, 128, 255))):
        tile = Image.new('RGBA', (136, 136), col)
        tile.alpha_composite(t.resize((120, 120), Image.LANCZOS), (8, 8))
        sheet.paste(tile, (x, y + dy))
sheet.convert('RGB').save(os.path.join(HERE, 'check.jpg'), quality=85)
print('ok')
