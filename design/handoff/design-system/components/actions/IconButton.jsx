import React from 'react';
export function IconButton({ label, children, onClick, active, size = 38, inverse, style }) {
  const [h, setH] = React.useState(false);
  return React.createElement('button', { 'aria-label': label, title: label, onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: { width: size, height: size, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, transition: 'var(--transition-all)',
      border: '1.5px solid ' + (inverse ? 'rgba(255,255,255,.35)' : active ? 'var(--border-strong)' : 'var(--border-default)'),
      background: active ? 'var(--action-primary-bg)' : h ? (inverse ? 'rgba(255,255,255,.1)' : 'var(--surface-card)') : 'transparent',
      color: active ? 'var(--action-primary-fg)' : inverse ? '#fff' : 'var(--text-primary)', ...style } }, children);
}
