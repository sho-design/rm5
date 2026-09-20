import React from 'react';
export function Stepper({ steps, current, style }) {
  return React.createElement('ol', { style: { display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-ui)', ...style } },
    steps.map((label, i) => { const n = i + 1, on = n === current, done = n < current;
      return React.createElement('li', { key: label, 'aria-current': on ? 'step' : undefined, style: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 999, background: on ? 'var(--action-primary-bg)' : done ? 'var(--status-success-bg)' : 'var(--surface-raised)', color: on ? 'var(--action-primary-fg)' : 'var(--text-primary)', border: on || done ? '1.5px solid transparent' : '1.5px solid var(--border-default)' } },
        React.createElement('span', { style: { width: 20, height: 20, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, background: on ? 'var(--rm-sun)' : done ? 'var(--rm-sage-deep)' : 'var(--border-default)', color: on ? 'var(--rm-sun-ink)' : done ? '#fff' : 'var(--text-muted)' } }, done ? '✓' : n), label); }));
}
