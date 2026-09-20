Native select styled like Input, for lists of 6+ (reason for visit, insurer, previous clinic).

```jsx
<Select placeholder="Insurer" options={['Sun Life', 'Manulife', 'Canada Life']} value={v} onChange={setV} />
```

Prefer Segmented for 2 to 4 options and Chip for filters. Same focus / invalid / disabled states as Input.
