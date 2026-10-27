import numpy as np
from PIL import Image, ImageFilter
import random

im = Image.open(r"c:\Portfolio\images\me-cutout.png")
w, h = im.size
alpha = np.array(im.split()[-1])

# Foreground mask
mask = alpha > 40
mask_img = Image.fromarray((mask * 255).astype(np.uint8))

# Dilate by 10px so the outline delicately hovers outside her silhouette
dilated = mask_img.filter(ImageFilter.MaxFilter(11))
dilated_arr = np.array(dilated) > 128

# Find start pixel: topmost row with foreground
dirs = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1)]
start = None
for y in range(h):
    xs = np.where(dilated_arr[y])[0]
    if len(xs) > 0:
        start = (y, xs[0])
        break

def trace_boundary(arr, start_pos):
    contour = [start_pos]
    current = start_pos
    current_dir = 7
    max_steps = 100000
    for _ in range(max_steps):
        found = False
        for d in range(8):
            check_d = (current_dir + d) % 8
            ny = current[0] + dirs[check_d][0]
            nx = current[1] + dirs[check_d][1]
            if 0 <= ny < h and 0 <= nx < w and arr[ny, nx]:
                current = (ny, nx)
                contour.append(current)
                current_dir = (check_d + 5) % 8
                found = True
                break
        if not found or current == start_pos:
            break
    return contour

raw_contour = trace_boundary(dilated_arr, start)

# Arrange contour from bottom-left up and around head down to bottom-right
# Leaving the bottom open so it doesn't draw a box edge across the torso
top_idx = 0
left_side = []
for i in range(len(raw_contour)):
    idx = (top_idx - i) % len(raw_contour)
    if raw_contour[idx][0] >= h - 18:
        break
    left_side.append(raw_contour[idx])
left_side.reverse()

right_side = []
for i in range(1, len(raw_contour)):
    idx = (top_idx + i) % len(raw_contour)
    if raw_contour[idx][0] >= h - 18:
        break
    right_side.append(raw_contour[idx])

body_contour = left_side + right_side
print(f"Body contour points: {len(body_contour)}")

# Subsample points (every 8px)
step = 8
sampled = body_contour[::step]

# Add subtle organic hand-drawn wobble
random.seed(42)
path_d = []
for i, pt in enumerate(sampled):
    cmd = "M" if i == 0 else "L"
    wobble_x = (random.random() - 0.5) * 2.2
    wobble_y = (random.random() - 0.5) * 2.2
    px = pt[1] + wobble_x
    py = pt[0] + wobble_y
    path_d.append(f"{cmd}{px:.1f},{py:.1f}")

# Tiny hand-drawn 4-point star helper
def make_star(cx, cy, r=14, fill="#FFFFFF"):
    r_in = r * 0.28
    d = (f"M {cx} {cy - r} "
         f"Q {cx + r_in*0.5} {cy - r_in*0.5} {cx + r} {cy} "
         f"Q {cx + r_in*0.5} {cy + r_in*0.5} {cx} {cy + r} "
         f"Q {cx - r_in*0.5} {cy + r_in*0.5} {cx - r} {cy} "
         f"Q {cx - r_in*0.5} {cy - r_in*0.5} {cx} {cy - r} Z")
    return f'<path d="{d}" fill="{fill}" opacity="0.95" />'

# Cute white & yellow sparkle doodles around the silhouette
sparkles = [
    make_star(440, 500, 14, "#FFFFFF"),
    make_star(755, 475, 17, "#F9D976"), # yellow sparkle near crown
    make_star(250, 840, 12, "#FFFFFF"), # white star near left shoulder
    make_star(980, 970, 15, "#F9D976"), # yellow star near right arm
    make_star(310, 1150, 11, "#FFFFFF") # white star near left waist
]

# Cute dotted curved arcs
doodle_arcs = '''
  <!-- Hand-drawn curved dotted trail near left shoulder -->
  <path d="M 220 780 Q 195 830 230 885" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 6" opacity="0.9" />
  <!-- Hand-drawn curved dotted trail near right crown -->
  <path d="M 780 430 Q 825 440 845 485" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="4 6" opacity="0.9" />
'''

svg_content = f'''<svg viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg" class="editorial-silhouette-doodle-svg" aria-hidden="true">
  <defs>
    <filter id="white-outline-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#FFFFFF" flood-opacity="0.95" />
      <feDropShadow dx="0" dy="3" stdDeviation="8" flood-color="#1B2230" flood-opacity="0.2" />
    </filter>
  </defs>

  <!-- White Hand-Drawn Dashed Silhouette Outline -->
  <path d="{' '.join(path_d)}" 
        class="silhouette-doodle-path"
        fill="none" 
        stroke="#FFFFFF" 
        stroke-width="3.2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-dasharray="5 7"
        filter="url(#white-outline-glow)" />

  {doodle_arcs}

  <!-- Accent White & Yellow Sparkles -->
  {''.join(sparkles)}
</svg>'''

with open(r"c:\Portfolio\images\silhouette-doodle.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

print("Saved white dashed silhouette outline to c:\\Portfolio\\images\\silhouette-doodle.svg!")
