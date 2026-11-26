# IconButton

Round 38px icon button for search, menu, text-size (A− A A+) and contrast toggles.

```jsx
<IconButton label="Search"><SearchIcon /></IconButton>
<IconButton label="Larger text" active>A+</IconButton>
```

Always pass `label`. Use `inverse` on the navy utility bar. Hit target never below 38; use size 44 on mobile.

**You provide:** the props listed in `index.d.ts` (`IconButtonProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.
