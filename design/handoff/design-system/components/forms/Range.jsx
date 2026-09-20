import React from 'react';
export function Range({ label, value, min = 0, max = 100, step = 1, onChange, format, inverse, style }) {
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 13, color: inverse ? 'rgba(255,255,255,.6)' : 'var(--text-muted)' } }, React.createElement('span', null, label), React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, lineHeight: 1, color: inverse ? '#fff' : 'var(--text-primary)' } }, format ? format(value) : value)),
    React.createElement('input', { type: 'range', min, max, step, value, 'aria-label': label, onChange: e => onChange && onChange(+e.target.value), style: { width: '100%', accentColor: inverse ? 'var(--rm-sun)' : 'var(--rm-sky)', cursor: 'pointer' } }));
}
