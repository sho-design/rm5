# PriceCard

Price card with a Fraunces 52 price and an HST-inclusive note. Rows of three.

```jsx
<PriceCard kicker="All-in" title="Monoferric 500 mg" price="$550" tone="infusion">A higher dose in one sitting.</PriceCard>
```

Always state HST-inclusive and what OHIP covers nearby. No strikethrough or "save" language.

**You provide:** the props listed in `index.d.ts` (`PriceCardProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.
