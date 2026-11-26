# Select

Native select styled like Input, for lists of 6+ (reason for visit, insurer, previous clinic).

```jsx
<Select placeholder="Insurer" options={['Sun Life', 'Manulife', 'Canada Life']} value={v} onChange={setV} />
```

Prefer Segmented for 2 to 4 options and Chip for filters. Same focus / invalid / disabled states as Input.

**You provide:** the props listed in `index.d.ts` (`SelectProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
