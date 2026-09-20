Inline notice or toast: tinted ground, coloured icon circle, optional action and dismiss. Same component fixed bottom-right for toasts.

```jsx
<Notice tone="warning" title="Nothing that works?" action={{ label: 'Join the waitlist', onClick }}>We call in order when a cancellation opens.</Notice>
```

Tones map to status tokens. Toasts: position fixed, bottom 24 right 24, max-width 420, auto-dismiss 6s except errors. Never stack more than two.
