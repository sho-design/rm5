Label + control + helper/error wrapper. Every Input, Textarea, Select, Segmented sits inside one.

```jsx
<Field label="Email" helper="We only use this for reminders" error={err}>{({ invalid }) => <Input invalid={invalid} />}</Field>
```

Label 12 semibold muted; error text replaces helper and is announced. Mark `optional` in the label rather than starring required fields.
