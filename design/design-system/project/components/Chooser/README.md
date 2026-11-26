# Chooser

The signature interactive block: a question ("Where does it hurt?"), a vertical option list, and a floating result card with tags, facts and a CTA. One per division page.

```jsx
<Chooser tone="pain" eyebrow="Where does it hurt?" title="Start with the spot." options={[{ label: 'Low back', sub: 'Sciatica, disc' }]} results={[{ title: 'Low back pain', body: '...', tags: ['OHIP'], facts: [{ k: 'Visit', v: 'About 20 minutes' }] }]} cta={<Button>Book an assessment</Button>} />
```

Results answer: what the visit is, time, coverage, what to bring. Facts grid is 2x2. Keep 4 to 6 options.

**You provide:** the props listed in `index.d.ts` (`ChooserProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Chooser.tsx`; this React version is the reference it was built from.
