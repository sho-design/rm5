import React from 'react';
export function CtaBand({ title, lead, actions, tone = 'accent', compact, style }) {
  const bg = { accent: 'var(--surface-accent)', inverse: 'var(--surface-inverse)', card: 'var(--surface-card)' }[tone], fg = tone === 'inverse' ? '#fff' : 'var(--text-primary)', sub = tone === 'inverse' ? 'rgba(255,255,255,.75)' : 'rgba(15,31,46,.75)';
  return React.createElement('div', { style: { padding: compact ? '40px 48px' : 56, borderRadius: 28, background: bg, color: fg, border: tone === 'card' ? '1px solid var(--border-default)' : 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center', fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: compact ? 6 : 12 } }, React.createElement('h2', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: compact ? 30 : 48, letterSpacing: '-.025em', lineHeight: 1.02, textWrap: 'balance' } }, title), lead ? React.createElement('span', { style: { fontSize: compact ? 15 : 17, lineHeight: 1.5, color: sub, maxWidth: 560, textWrap: 'pretty' } }, lead) : null),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' } }, actions));
}
