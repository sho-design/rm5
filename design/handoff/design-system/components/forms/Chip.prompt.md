Pill chip for filters, service picks and multi-select symptom checkers.

```jsx
<Chip selected={f === 'All'} onClick={() => setF('All')} size="sm">All</Chip>
<Chip tone="sage" check selected={on} onClick={toggle}>Brain fog</Chip>
```

Single-select filters use `size="sm"` ink. Multi-select uses `check` with sage tone. Hover turns the border sky.
