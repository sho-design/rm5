# Accordion

FAQ accordion: hairline rows, 18px question, rotating plus circle, one open at a time.

```jsx
<Accordion items={[{ q: 'How much notice do I need to cancel?', a: '24 hours, so we can offer the time to someone else.' }]} />
```

Pair with a sticky "Good to know." heading on the left. Five questions is the sweet spot.

**You provide:** the props listed in `index.d.ts` (`AccordionProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Faq.tsx`; this React version is the reference it was built from.
