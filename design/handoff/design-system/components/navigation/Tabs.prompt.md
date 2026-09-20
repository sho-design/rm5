Tab strip for switching content in place: pill tabs (Care pathways, team filters, location tabs) or underline tabs for sub-navigation.

```jsx
<Tabs tabs={['Low energy', 'Back or neck pain', 'Turning 50']} value={t} onChange={setT} inverse />
```

Pill tabs on navy use inverse (sunshine selection). Underline tabs for page-level sections. Content below changes instantly; no fade.
