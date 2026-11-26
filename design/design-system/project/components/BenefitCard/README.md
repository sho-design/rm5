# BenefitCard

Big-number benefit card used in rows of three: "1 doctor who knows you", "0 second trips", "MD does the procedure".

```jsx
<BenefitCard big="0" title="Second trips for bloodwork" tone="rehab">Our lab technician draws most requisitions in clinic.</BenefitCard>
```

The big token reads as a headline, so it must be a fact you can stand behind. No percentages or outcome numbers.

**You provide:** the props listed in `index.d.ts` (`BenefitCardProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/Card.tsx`; this React version is the reference it was built from.
