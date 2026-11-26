"""Draws the Netpress bug (the ribbon N) and writes every icon into public/. Usage: python3 bin/bug_png.py [outdir]"""
import sys
from PIL import Image, ImageDraw

OUT = sys.argv[1] if len(sys.argv) > 1 else "public"
BG = (11, 15, 26)  # the page's dark navy, for icons that can't be transparent
K = 1024           # drawing size; every icon is scaled down from it

# The ribbon's centerline as cubic Beziers: up the left leg, fold, down the diagonal, round the bottom, up the right leg.
SEGS = [
    ((0.15, 1.00), (0.20, 0.66), (0.27, 0.34), (0.34, 0.22)),
    ((0.34, 0.22), (0.41, 0.10), (0.47, 0.34), (0.56, 0.64)),
    ((0.56, 0.64), (0.62, 0.84), (0.70, 0.88), (0.76, 0.66)),
    ((0.76, 0.66), (0.80, 0.46), (0.83, 0.20), (0.86, 0.00)),
]
TOP, BOTTOM = 0.08, 0.92  # the ends are cut level here, like the original
# Colors along the ribbon: sky blue face, violet underside on the diagonal, teal face up the right.
STOPS = [(0.00, (40, 110, 220)), (0.24, (72, 178, 240)), (0.34, (98, 92, 214)),
         (0.62, (88, 70, 196)), (0.72, (24, 150, 190)), (1.00, (70, 220, 190))]


def bez(p, t):
    a, b, c, d = p
    u = 1 - t
    return tuple(u**3 * a[i] + 3 * u * u * t * b[i] + 3 * u * t * t * c[i] + t**3 * d[i] for i in (0, 1))


def color(t):
    for (t0, c0), (t1, c1) in zip(STOPS, STOPS[1:]):
        if t <= t1:
            f = (t - t0) / (t1 - t0)
            return tuple(round(c0[i] + (c1[i] - c0[i]) * f) for i in range(3))
    return STOPS[-1][1]


def width(t):
    # Broad where the legs meet the ground and the top right, narrow through the twist.
    return 0.055 + 0.075 * (abs(t - 0.5) * 2) ** 1.6


def ribbon():
    # Discs stamped along the centerline make a smooth stroke even through the tight fold.
    n = 3000
    stamps = []
    for i in range(n + 1):
        t = i / n
        k = min(int(t * 4), 3)
        stamps.append((t, bez(SEGS[k], t * 4 - k), width(t)))
    # The left leg passes in front of the fold, so it's drawn last.
    return sorted(stamps, key=lambda q: (q[0] < 0.3, q[0]))


def draw(size, bg=None, pad=0.0):
    img = Image.new("RGBA", (K, K), bg + (255,) if bg else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    s = K * (1 - 2 * pad)
    o = K * pad
    for t, (x, y), w in ribbon():
        x, y, r = x * s + o, y * s + o, w * s
        d.ellipse((x - r, y - r, x + r, y + r), fill=color(t))
    if not bg:
        img.paste((0, 0, 0, 0), (0, 0, K, round(TOP * s + o)))
        img.paste((0, 0, 0, 0), (0, round(BOTTOM * s + o), K, K))
    else:
        img.paste(bg + (255,), (0, 0, K, round(TOP * s + o)))
        img.paste(bg + (255,), (0, round(BOTTOM * s + o), K, K))
    return img.resize((size, size), Image.LANCZOS)


draw(512).save(f"{OUT}/bug.png")
draw(180, BG, 0.08).convert("RGB").save(f"{OUT}/apple-touch-icon.png")
draw(192, BG, 0.08).save(f"{OUT}/icon-192.png")
draw(512, BG, 0.08).save(f"{OUT}/icon-512.png")
draw(256).save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
