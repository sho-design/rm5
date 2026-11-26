# StateCard

Full outcome card ending a flow: You are booked / You are on the waitlist / That time was just taken. Also used for Registration received and Message sent.

```jsx
<StateCard title="You are booked." lead="A confirmation is on its way." facts={[{ k: 'When', v: 'Sat Dec 6, 9am' }, { k: 'Where', v: '700 Centre St', sub: 'Inside Walmart' }]} actions={<><Button>Add to calendar</Button><Button variant="ghost">Reschedule</Button></>} />
```

Title is Fraunces 40. Error copy says what happened, that details are saved, and offers a phone fallback. Waitlist shows position as a fact.

**You provide:** the props listed in `index.d.ts` (`StateCardProps`). The component reads only the system's CSS variables, so it follows the light, dark and high contrast themes set by `data-theme` on an ancestor.

On the website this is built in Tailwind at `src/components/ui/StateCard.tsx`; this React version is the reference it was built from.
