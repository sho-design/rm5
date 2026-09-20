Pill button for every call to action; primary is ink, secondary is sky (booking flows), accent is sunshine (on navy), outline and ghost for secondary paths.

```jsx
<Button onClick={book}>Book an appointment</Button>
<Button variant="ghost" trailing>Learn more</Button>
```

Variants: primary, secondary, accent, outline, ghost, inverse. Sizes sm 38, md 48, lg 56. `trailing` adds the › chevron used on all text links. Never uppercase, never more than one primary per block.
