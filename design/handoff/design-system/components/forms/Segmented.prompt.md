Equal-width segmented control for 2 to 4 mutually exclusive choices: Thornhill / Maple, New / Existing patient, Female / Male, English / Tiếng Việt.

```jsx
<Segmented options={['New patient', 'Existing patient']} value={who} onChange={setWho} />
```

Selected is ink on white; on navy use `inverse` (sunshine). `hint` adds a small sub-label like "(soon)". Use Chip for multi-select.
