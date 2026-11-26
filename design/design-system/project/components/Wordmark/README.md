# Wordmark

The clinic's logo lockup: the RM monogram tile from the supplied artwork beside "Restoration Medical" set in Fraunces 500 at -0.02em. Never redraw the monogram.

| Size | Tile | Name | Gap | Where |
|---|---|---|---|---|
| sm | 24px | 16px | 8px | Phone menu |
| md | 26px | 17px | 9px | Phone header |
| lg | 30px | 20px | 10px | Desktop header, footer |

- The name is `rm-logo-navy` (#2C326D) on light surfaces and white on navy surfaces and in the dark theme. The tile stays navy with white letters everywhere.
- When space runs short (a scrolled header on a small phone, larger text), the name hides and the tile stays, still linking home with the label "Restoration Medical home".
- The floating page bar, the favicon and the home-screen icon use the tile alone.
- The website builds this in `src/components/chrome/Wordmark.tsx` from `public/logos/rm-mark.png`. Handouts use the same lockup (see Patient handouts).
