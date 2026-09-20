import React from 'react';
export function Notice({ tone = 'info', title, children, action, onDismiss, style }) {
  const icon = { info: 'i', success: '✓', warning: '!', error: '!' }[tone];
  return React.createElement('div', { role: tone === 'error' ? 'alert' : 'status', style: { display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 18px', borderRadius: 18, background: 'var(--status-' + tone + '-bg)', fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.5, color: 'var(--text-primary)', ...style } },
    React.createElement('span', { 'aria-hidden': true, style: { width: 26, height: 26, borderRadius: 999, background: 'var(--status-' + tone + '-fg)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--font-display)' } }, icon),
    React.createElement('div', { style: { flex: 1, display: 'flex', flexDirection: 'column', gap: 2 } }, title ? React.createElement('span', { style: { fontWeight: 600 } }, title) : null, children ? React.createElement('span', { style: { color: 'var(--text-secondary)' } }, children) : null,
      action ? React.createElement('a', { onClick: action.onClick, style: { fontWeight: 600, color: 'var(--text-primary)', borderBottom: '1.5px solid currentColor', alignSelf: 'flex-start', cursor: 'pointer', marginTop: 6 } }, action.label, ' ›') : null),
    onDismiss ? React.createElement('button', { 'aria-label': 'Dismiss', onClick: onDismiss, style: { border: 0, background: 'transparent', fontSize: 18, cursor: 'pointer', color: 'var(--text-muted)', lineHeight: 1 } }, '×') : null);
}
