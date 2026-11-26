# Tag

Small pill label: OHIP, Same week, Coming soon, What's new, division names, Open status.

```jsx
<Tag tone="sun">Coming soon</Tag>
<Tag tone="success" dot>Open now</Tag>
<Tag tone="pain">Pain Centre</Tag>
```

12px semibold. Division tones colour the eyebrow on cards. Never more than two tags per card.

**You provide:** the props listed in `index.d.ts` (`TagProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Tag.tsx`; this React version is the reference it was built from.
