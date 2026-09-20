The signature interactive block: a question ("Where does it hurt?"), a vertical option list, and a floating result card with tags, facts and a CTA. One per division page.

```jsx
<Chooser tone="pain" eyebrow="Where does it hurt?" title="Start with the spot." options={[{ label: 'Low back', sub: 'Sciatica, disc' }]} results={[{ title: 'Low back pain', body: '...', tags: ['OHIP'], facts: [{ k: 'First visit', v: '30 min' }] }]} cta={<Button>Book an assessment</Button>} />
```

Results answer: what the visit is, time, coverage, what to bring. Facts grid is 2x2. Keep 4 to 6 options.
