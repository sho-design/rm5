import React from 'react';
export function Modal({ open, onClose, title, eyebrow, children, actions, width = 520, inline }) {
  React.useEffect(() => { if (!open) return; const k = e => { if (e.key === 'Escape' && onClose) onClose(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [open, onClose]);
  if (!open) return null;
  return React.createElement('div', { onClick: onClose, style: { position: inline ? 'absolute' : 'fixed', inset: 0, background: 'var(--overlay-scrim)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100, fontFamily: 'var(--font-ui)' } },
    React.createElement('div', { role: 'dialog', 'aria-modal': true, 'aria-label': title, onClick: e => e.stopPropagation(), style: { width: '100%', maxWidth: width, borderRadius: 28, background: 'var(--surface-raised)', color: 'var(--text-primary)', padding: 36, display: 'flex', flexDirection: 'column', gap: 20, boxShadow: 'var(--shadow-card)' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 } }, React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } }, eyebrow ? React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: 'var(--text-link)' } }, eyebrow) : null, React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.05 } }, title)),
        React.createElement('button', { 'aria-label': 'Close', onClick: onClose, style: { width: 38, height: 38, borderRadius: 999, border: '1.5px solid var(--border-default)', background: 'transparent', cursor: 'pointer', fontSize: 18, color: 'var(--text-primary)', flexShrink: 0 } }, '×')),
      React.createElement('div', { style: { fontSize: 15, lineHeight: 1.55, color: 'var(--text-secondary)' } }, children),
      actions ? React.createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' } }, actions) : null));
}
