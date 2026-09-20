import React from 'react';
export function StateCard({ tone = 'success', title, lead, facts, actions, glyph, children, style }) {
  const bg = { success: 'var(--status-success-bg)', waitlist: 'var(--status-warning-bg)', error: 'var(--status-error-bg)' }[tone];
  const dot = { success: 'var(--rm-sage-deep)', waitlist: 'var(--rm-ink)', error: 'var(--rm-terracotta-deep)' }[tone];
  const g = glyph || { success: '✓', waitlist: '☏', error: '!' }[tone];
  return React.createElement('div', { role: tone === 'error' ? 'alert' : 'status', style: { padding: 40, borderRadius: 28, background: bg, display: 'flex', flexDirection: 'column', gap: 22, fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', ...style } },
    React.createElement('span', { 'aria-hidden': true, style: { width: 56, height: 56, borderRadius: 999, background: dot, color: tone === 'waitlist' ? 'var(--rm-sun)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 } }, g),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } }, React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 500, letterSpacing: '-.025em', lineHeight: 1 } }, title), lead ? React.createElement('span', { style: { fontSize: 16, lineHeight: 1.5, color: 'var(--text-secondary)' } }, lead) : null),
    facts && facts.length ? React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(' + Math.min(facts.length, 2) + ',1fr)', gap: 10 } }, facts.map((f, i) => React.createElement('div', { key: i, style: { padding: '18px 20px', borderRadius: 16, background: 'var(--surface-raised)', display: 'flex', flexDirection: 'column', gap: 4 } }, React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: 'var(--text-muted)' } }, f.k), React.createElement('span', { style: { fontSize: 16, fontWeight: 600 } }, f.v), f.sub ? React.createElement('span', { style: { fontSize: 13, color: 'var(--text-muted)' } }, f.sub) : null))) : null,
    children, actions ? React.createElement('div', { style: { display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' } }, actions) : null);
}
