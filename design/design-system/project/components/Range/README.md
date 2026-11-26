# Range

Slider with a big Fraunces readout. Used for "My age" in Am I due? and Your year.

```jsx
<Range label="My age" min={18} max={85} value={age} onChange={setAge} inverse />
```

Readout is Fraunces 32. On navy use `inverse` for a sunshine thumb.

**You provide:** the props listed in `index.d.ts` (`RangeProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.
