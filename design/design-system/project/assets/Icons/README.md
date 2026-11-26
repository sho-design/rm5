# Icons

81 line pictograms copied from the website's icon set (`src/components/ui/Icon.tsx`): one 24px grid, a single round-capped, round-joined stroke, no fills.

- These files are drawn in `rm-ink` (#0F1F2E) at a 1.6 stroke so they show as images. On the website the stroke is `currentColor`, so an icon takes the text colour around it: white on navy, the division accent on a tint. Recolour the stroke when you place an SVG on another ground.
- Size them 20 to 28px beside text, up to 40px on cards. Keep the 1.6 stroke at 24px; use 1.4 when drawn larger and 2 when drawn at 16px.
- On the site each icon has one small hover animation (a drip falls, a calendar flips). Keep motion off when `prefers-reduced-motion` is set.
- Utility glyphs are text, not icons: ✓ + › ‹ × ☰ ⌕. No emoji and no icon font.
- New icons match this set: 24 grid, one stroke weight, no fills, no text.
