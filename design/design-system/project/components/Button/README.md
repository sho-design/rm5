# Button

Pill button for every call to action; primary is ink, secondary is sky (booking flows), accent is sunshine (on navy), outline and ghost for secondary paths.

```jsx
<Button onClick={book}>Book an appointment</Button>
<Button variant="ghost" trailing>Learn more</Button>
```

Variants: primary, secondary, accent, outline, ghost, inverse. Sizes sm 38, md 48, lg 56. `trailing` adds the › chevron used on all text links. Never uppercase, never more than one primary per block.

**You provide:** the props listed in `index.d.ts` (`ButtonProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Button.tsx`; this React version is the reference it was built from.
