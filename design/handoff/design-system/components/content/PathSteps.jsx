import React from 'react';
export function PathSteps({ steps, inverse = true, style }) {
  const fg = inverse ? '#fff' : 'var(--text-primary)', muted = inverse ? 'rgba(255,255,255,.55)' : 'var(--text-muted)', body = inverse ? 'rgba(255,255,255,.75)' : 'var(--text-secondary)';
  return React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + steps.length + ',1fr)', position: 'relative', color: fg, fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', left: 24, right: 24, top: 22, height: 1, background: inverse ? 'rgba(255,255,255,.18)' : 'var(--border-default)' } }),
    steps.map((s, i) => React.createElement('div', { key: i, style: { display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 24, position: 'relative' } },
      React.createElement('span', { style: { width: 44, height: 44, borderRadius: 999, background: 'var(--rm-sun)', color: 'var(--rm-sun-ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 } }, i + 1),
      React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 6 } }, s.time ? React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: muted } }, s.time) : null, React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.05 } }, s.title), React.createElement('span', { style: { fontSize: 14, lineHeight: 1.5, color: body } }, s.body)))));
}
