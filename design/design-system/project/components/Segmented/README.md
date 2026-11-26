# Segmented

Equal-width segmented control for 2 to 4 mutually exclusive choices: Thornhill / Maple, New / Existing patient, Female / Male, English / Tiếng Việt.

```jsx
<Segmented options={['New patient', 'Existing patient']} value={who} onChange={setWho} />
```

Selected is ink on white; on navy use `inverse` (sunshine). `hint` adds a small sub-label like "(soon)". Use Chip for multi-select.

**You provide:** the props listed in `index.d.ts` (`SegmentedProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
