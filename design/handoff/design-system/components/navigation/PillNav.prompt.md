Site header: R tile wordmark, pill nav group, controls and an ink Book button. Sits under the navy UtilityBar.

```jsx
<PillNav items={['Family Medicine', 'Pain Centre', 'Infusion Therapy', 'Medical Aesthetics', 'Rehab & Recovery', 'About']} active={page} onSelect={go} onBook={book} />
```

Mega menu opens on hover in the site; this primitive is the bar only. On mobile replace with hamburger IconButton and a sticky Book button.
