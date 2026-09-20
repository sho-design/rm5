import React from 'react';
export function Accordion({ items, defaultOpen = 0, style }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-ui)', color: 'var(--text-primary)', ...style } }, items.map((it, i) => {
    const on = open === i;
    return React.createElement('div', { key: i, style: { borderTop: '1px solid var(--border-default)' } },
      React.createElement('button', { 'aria-expanded': on, onClick: () => setOpen(on ? -1 : i), style: { width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, padding: '20px 0', background: 'transparent', border: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', color: 'inherit' } },
        React.createElement('span', { style: { fontSize: 18, fontWeight: 600, letterSpacing: '-.01em' } }, it.q),
        React.createElement('span', { 'aria-hidden': true, style: { width: 30, height: 30, borderRadius: 999, border: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, transition: 'transform var(--duration-base) var(--ease-standard)', transform: on ? 'rotate(45deg)' : 'none' } }, '+')),
      on ? React.createElement('p', { style: { margin: '0 0 22px', fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: 640, textWrap: 'pretty' } }, it.a) : null);
  }));
}
