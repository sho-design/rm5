36px navy strip above the header: phone, live open/closed status with next opening, referring-doctor link, text size and contrast controls.

```jsx
<UtilityBar status="Open until 4pm" open links={[{ label: 'For referring doctors ›', accent: true }]} />
```

Status logic: if closed, say so and name the next opening slot. Green dot when open, terracotta when closed.
