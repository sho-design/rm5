# Table

Rounded comparison / fee table: first column is the row label, an optional highlighted column shows our answer with check marks.

```jsx
<Table columns={['Option', 'Per visit']} rows={[['Your own iron', '$250'], ['Venofer 300 mg', '$400']]} caption="HST included" />
```

Used for clinic-vs-lounge, fee lists and coverage. Keep to 3 or 4 columns; stack on mobile.

**You provide:** the props listed in `index.d.ts` (`TableProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.
