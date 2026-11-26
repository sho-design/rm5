# Field

Label + control + helper/error wrapper. Every Input, Textarea, Select, Segmented sits inside one.

```jsx
<Field label="Email" helper="We only use this for reminders" error={err}>{({ invalid }) => <Input invalid={invalid} />}</Field>
```

Label 12 semibold muted; error text replaces helper and is announced. Mark `optional` in the label rather than starring required fields.

**You provide:** the props listed in `index.d.ts` (`FieldProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
