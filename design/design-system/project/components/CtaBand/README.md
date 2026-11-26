# CtaBand

Closing band for every page: sunshine (default), navy or card. Title, one line, one Button and a phone fallback.

```jsx
<CtaBand title="Find out in one blood test." lead="Book an iron assessment." actions={<><Button size="lg">Book an iron assessment</Button><a href="tel:9057093222">or call 905-709-3222</a></>} />
```

One per page, always last before the footer. compact for mid-page prompts.

**You provide:** the props listed in `index.d.ts` (`CtaBandProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/CtaBand.tsx`; this React version is the reference it was built from.
