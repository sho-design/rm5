# Chip

Pill chip for filters, service picks and multi-select symptom checkers.

```jsx
<Chip selected={f === 'All'} onClick={() => setF('All')} size="sm">All</Chip>
<Chip tone="sage" check selected={on} onClick={toggle}>Brain fog</Chip>
```

Single-select filters use `size="sm"` ink. Multi-select uses `check` with sage tone. Hover turns the border sky.

**You provide:** the props listed in `index.d.ts` (`ChipProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/OptionList.tsx`; this React version is the reference it was built from.
