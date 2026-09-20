import React from 'react';
export function Chip({ selected, onClick, children, tone = 'ink', size = 'md', check, style }) {
  const [h, setH] = React.useState(false);
  const tones = { ink: ['var(--action-primary-bg)', 'var(--action-primary-fg)', 'var(--border-strong)'], sage: ['var(--div-infusion)', 'var(--text-primary)', 'var(--rm-sage-deep)'], sun: ['var(--rm-sun)', 'var(--rm-sun-ink)', 'var(--rm-sun)'] };
  const [bg, fg, bd] = tones[tone];
  return React.createElement('button', { 'aria-pressed': selected, onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: size === 'sm' ? '9px 14px' : '12px 18px', borderRadius: 999, fontSize: size === 'sm' ? 13 : 14, fontWeight: selected || size === 'sm' ? 600 : 500, fontFamily: 'var(--font-ui)', cursor: 'pointer', transition: 'var(--transition-all)',
      background: selected ? bg : 'var(--field-bg)', color: selected ? fg : 'var(--text-primary)', border: '1.5px solid ' + (selected ? bd : h ? 'var(--rm-sky)' : 'var(--border-default)'), ...style } },
    check ? React.createElement('span', { 'aria-hidden': true, style: { width: 18, height: 18, borderRadius: 999, border: '1.5px solid ' + (selected ? bd : 'var(--border-default)'), background: selected ? bd : 'transparent', color: '#fff', fontSize: 11, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }, selected ? '✓' : '') : null,
    children);
}
