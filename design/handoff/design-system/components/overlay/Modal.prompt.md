Centred dialog on a navy scrim, 28px radius, Fraunces title, close circle. For cancel/reschedule confirmations, consent detail, leaving-the-site notices.

```jsx
<Modal open={o} onClose={close} eyebrow="Reschedule" title="Move your appointment?" actions={<><Button variant="outline" onClick={close}>Keep it</Button><Button>Choose a new time</Button></>}>Your current slot is released once you pick a new one.</Modal>
```

Escape and scrim click close. One primary action. Never used for marketing.
