# PathSteps

Numbered horizontal path (3 or 4 steps) with sunshine numerals and a hairline connector. "Your first month", "How a referral moves".

```jsx
<PathSteps steps={[{ time: 'Week 1', title: 'Assessment', body: 'History, examination, imaging review.' }, { time: 'Week 2', title: 'Plan', body: 'Options explained plainly.' }]} />
```

Sits inside a navy Card (tone inverse) with a heading and a Button. Stack vertically on mobile.

**You provide:** the props listed in `index.d.ts` (`PathStepsProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/PathSteps.tsx`; this React version is the reference it was built from.
