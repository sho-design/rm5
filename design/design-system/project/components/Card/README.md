# Card

The rounded card: 24px radius, 1px line on paper tones, tinted for divisions, navy inverse, sunshine accent. Optional 16:10 photo on top.

```jsx
<Card division="pain" eyebrow="Pain Centre" title="Image-guided treatment" footer={<><Button size="sm">Book</Button><Button variant="ghost" trailing>Learn more</Button></>}>A targeted injection if it fits.</Card>
```

Hover with onClick turns the border sky. Footer order is always Book then Learn more. Size lg is for feature cards with 36px titles.

**You provide:** the props listed in `index.d.ts` (`CardProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Card.tsx`; this React version is the reference it was built from.
