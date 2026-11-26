# UtilityBar

36px navy strip above the header: phone, live open/closed status with next opening, referring-doctor link, text size and contrast controls.

```jsx
<UtilityBar status="Open until 4pm" open links={[{ label: 'For referring doctors ›', accent: true }]} />
```

Status logic: if closed, say so and name the next opening slot. Green dot when open, terracotta when closed.

**You provide:** the props listed in `index.d.ts` (`UtilityBarProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/chrome`; this React version is the reference it was built from.
