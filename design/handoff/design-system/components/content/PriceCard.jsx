import React from 'react';
export function PriceCard({ kicker, title, price, children, note = 'Per visit, HST included', tone, featured, style }) {
  return React.createElement('div', { style: { borderRadius: 24, background: tone ? 'var(--div-' + tone + ')' : featured ? 'var(--surface-card)' : 'var(--surface-raised)', border: '1px solid var(--border-default)', padding: 28, display: 'flex', flexDirection: 'column', gap: 18, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 4 } }, kicker ? React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: 'var(--text-muted)' } }, kicker) : null, React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.05 } }, title)),
    React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1 } }, price),
    children ? React.createElement('span', { style: { fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', flex: 1 } }, children) : null,
    note ? React.createElement('span', { style: { fontSize: 13, color: 'var(--text-muted)', paddingTop: 12, borderTop: '1px solid var(--border-default)' } }, note) : null);
}
