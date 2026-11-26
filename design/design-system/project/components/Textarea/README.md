# Textarea

Multi-line input, same states as Input. Used for "Anything we should know?" and contact messages.

```jsx
<Textarea rows={4} placeholder="Please do not include test results" />
```

No resize handle. Pair with a helper line about not sending medical details.

**You provide:** the props listed in `index.d.ts` (`TextareaProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
