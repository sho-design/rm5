# Checkbox

Consent checkbox with long-form label. Used for CASL reminders opt-in and PHIPA collection consent.

```jsx
<Checkbox checked={ok} onChange={setOk}>Send me appointment reminders by email or text. Unsubscribe any time.</Checkbox>
```

Label text is 13/1.5 secondary ink. Consent copy always states purpose and that it is optional / can be withdrawn. Never pre-checked.

**You provide:** the props listed in `index.d.ts` (`CheckboxProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Form.tsx`; this React version is the reference it was built from.
