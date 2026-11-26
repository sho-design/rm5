# Input

48px text input with sky focus ring, terracotta invalid state, grey disabled.

```jsx
<Input placeholder="First name" />
<Input invalid value="905" />
```

States: default, focus (sky border + 3px ring), invalid (terracotta), disabled. Wrap in Field for label and messages.

**You provide:** the props listed in `index.d.ts` (`InputProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
