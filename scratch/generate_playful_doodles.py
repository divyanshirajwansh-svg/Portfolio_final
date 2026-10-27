# Generate cohesive playful hand-drawn doodles with thin navy/white strokes and yellow accents

# 1. Doodle Sun: Hand-drawn doodle sun with warm yellow center and thin navy sketch rays
sun_svg = '''<svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Warm yellow doodle sun disk -->
  <circle cx="35" cy="35" r="16" fill="#F9D976" stroke="#1B2230" stroke-width="1.8" stroke-linecap="round" />
  <!-- Playful imperfect hand-drawn sun rays in thin navy -->
  <g stroke="#1B2230" stroke-width="1.8" stroke-linecap="round">
    <line x1="35" y1="6" x2="35" y2="13" />
    <line x1="35" y1="57" x2="35" y2="64" />
    <line x1="6" y1="35" x2="13" y2="35" />
    <line x1="57" y1="35" x2="64" y2="35" />
    <line x1="14" y1="14" x2="19" y2="19" />
    <line x1="51" y1="51" x2="56" y2="56" />
    <line x1="14" y1="56" x2="19" y2="51" />
    <line x1="51" y1="19" x2="56" y2="14" />
    <!-- Secondary dotted ray accents -->
    <circle cx="35" cy="3" r="1.5" fill="#F9D976" />
    <circle cx="67" cy="35" r="1.5" fill="#F9D976" />
    <circle cx="35" cy="67" r="1.5" fill="#F9D976" />
    <circle cx="3" cy="35" r="1.5" fill="#F9D976" />
  </g>
</svg>'''

with open(r"c:\Portfolio\images\doodle-sun.svg", "w", encoding="utf-8") as f:
    f.write(sun_svg)

# 2. Doodle Dotted Trail (Left / Upper): Delicate curving dotted path in navy and white with yellow accent star
trail_svg = '''<svg viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Dotted sweeping path in thin navy -->
  <path d="M 8 58 Q 50 8 95 38 T 132 16" stroke="#1B2230" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="4 6" opacity="0.8" />
  <!-- Parallel white dotted mini-accent -->
  <path d="M 16 64 Q 54 18 98 44" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="3 5" opacity="0.9" />
  <!-- Yellow mini sparkle at trail end -->
  <circle cx="132" cy="16" r="3" fill="#F9D976" stroke="#1B2230" stroke-width="1.2" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-trail.svg", "w", encoding="utf-8") as f:
    f.write(trail_svg)

# 3. Doodle Heart: Hand-drawn sketch heart in thin navy with white inner glow
heart_svg = '''<svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- White highlight shadow -->
  <path d="M 19 11 C 15 4, 5 5, 5 15 C 5 23, 15 28, 19 33 C 23 28, 33 23, 33 15 C 33 5, 23 4, 19 11 Z" 
        stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />
  <!-- Thin navy doodle stroke -->
  <path d="M 19 10 C 15 3, 5 4, 5 14 C 5 22, 15 27, 19 32 C 23 27, 33 22, 33 14 C 33 4, 23 3, 19 10 Z" 
        stroke="#1B2230" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="rgba(249, 217, 118, 0.15)" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-heart.svg", "w", encoding="utf-8") as f:
    f.write(heart_svg)

# 4. Doodle Starburst: Radiant hand-drawn star with yellow glowing core and thin navy / white rays
starburst_svg = '''<svg viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" fill="none">
  <g stroke="#1B2230" stroke-width="1.8" stroke-linecap="round">
    <line x1="22" y1="4" x2="22" y2="40" />
    <line x1="4" y1="22" x2="40" y2="22" />
    <line x1="9" y1="9" x2="35" y2="35" stroke-dasharray="2 3" stroke-width="1.5" stroke="#FFFFFF" />
    <line x1="9" y1="35" x2="35" y2="9" stroke-dasharray="2 3" stroke-width="1.5" stroke="#FFFFFF" />
  </g>
  <circle cx="22" cy="22" r="3.5" fill="#F9D976" stroke="#1B2230" stroke-width="1.2" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-starburst.svg", "w", encoding="utf-8") as f:
    f.write(starburst_svg)

# 5. Doodle Arrow: Hand-drawn arrow with dotted trail and sketch tip
arrow_svg = '''<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg" fill="none">
  <!-- Dotted curved shaft in thin navy -->
  <path d="M 8 20 Q 48 4 84 30" stroke="#1B2230" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="3 5" opacity="0.85" />
  <!-- White parallel whisper stroke -->
  <path d="M 10 23 Q 48 7 82 32" stroke="#FFFFFF" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="2 4" opacity="0.8" />
  <!-- Sketch arrow head -->
  <path d="M 74 24 L 88 32 L 80 44" stroke="#1B2230" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
</svg>'''

with open(r"c:\Portfolio\images\doodle-arrow.svg", "w", encoding="utf-8") as f:
    f.write(arrow_svg)

print("Generated playful doodles (doodle-sun, doodle-trail, doodle-heart, doodle-starburst, doodle-arrow)!")
