# Stepper

Pill stepper for 3-step flows: Details, Time, Confirm.

```jsx
<Stepper steps={['Details', 'Time', 'Confirm']} current={2} />
```

Current is ink with a sunshine numeral; done is sage with a check. Keep to 3 or 4 steps.

**You provide:** the props listed in `index.d.ts` (`StepperProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.
