Full outcome card ending a flow: You are booked / You are on the waitlist / That time was just taken. Also used for Registration received and Message sent.

```jsx
<StateCard title="You are booked." lead="A confirmation is on its way." facts={[{ k: 'When', v: 'Sat Sep 20, 9:00 am' }, { k: 'Where', v: '700 Centre St', sub: 'Inside Walmart' }]} actions={<><Button>Add to calendar</Button><Button variant="ghost">Reschedule</Button></>} />
```

Title is Fraunces 40. Error copy says what happened, that details are saved, and offers a phone fallback. Waitlist shows position as a fact.
