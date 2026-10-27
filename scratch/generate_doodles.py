# Generate cohesive hand-drawn SVG doodle assets for Divyanshi's portfolio

# 1. Doodle Arrow: Curved hand-drawn arrow with subtle dotted trail
arrow_svg = '''<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Hand-drawn curved dotted arrow shaft -->
  <path d="M 8 18 Q 45 4 82 32" stroke="#356C80" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 4" opacity="0.85" />
  <!-- Solid arrow head with sketch feel -->
  <path d="M 72 26 L 86 34 L 80 46" stroke="#356C80" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-arrow.svg", "w", encoding="utf-8") as f:
    f.write(arrow_svg)

# 2. Doodle Heart: Delicate hand-drawn imperfect sketch heart
heart_svg = '''<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M 18 10 C 14 3, 4 4, 4 14 C 4 22, 14 27, 18 32 C 22 27, 32 22, 32 14 C 32 4, 22 3, 18 10 Z" 
        stroke="#B9C8F0" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="rgba(185, 200, 240, 0.18)" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-heart.svg", "w", encoding="utf-8") as f:
    f.write(heart_svg)

# 3. Doodle Starburst: Hand-drawn 8-ray radiant sparkle
starburst_svg = '''<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g stroke="#356C80" stroke-width="2" stroke-linecap="round" opacity="0.85">
    <line x1="20" y1="4" x2="20" y2="36" />
    <line x1="4" y1="20" x2="36" y2="20" />
    <line x1="9" y1="9" x2="31" y2="31" stroke-dasharray="2 3" stroke-width="1.6" />
    <line x1="9" y1="31" x2="31" y2="9" stroke-dasharray="2 3" stroke-width="1.6" />
  </g>
  <circle cx="20" cy="20" r="2.5" fill="#F9D976" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-starburst.svg", "w", encoding="utf-8") as f:
    f.write(starburst_svg)

# 4. Doodle Curved Trail: Whimsical dashed wave/trail
trail_svg = '''<svg viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M 4 28 Q 24 6 44 26 T 76 16" stroke="#B9C8F0" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 5" opacity="0.8" />
  <circle cx="76" cy="16" r="2" fill="#E8DCC8" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-trail.svg", "w", encoding="utf-8") as f:
    f.write(trail_svg)

print("Generated all doodle SVG assets successfully!")
