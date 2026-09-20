import React from 'react';
export function Card({ tone = 'card', division, eyebrow, title, children, footer, image, size = 'md', onClick, style }) {
  const [h, setH] = React.useState(false);
  const bg = division ? 'var(--div-' + division + ')' : tone === 'inverse' ? 'var(--surface-inverse)' : tone === 'accent' ? 'var(--surface-accent)' : tone === 'raised' ? 'var(--surface-raised)' : 'var(--surface-card)';
  const fg = tone === 'inverse' ? 'var(--text-on-inverse)' : 'var(--text-primary)';
  const pad = { sm: 20, md: 26, lg: 32 }[size];
  return React.createElement('div', { onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), style: { borderRadius: size === 'lg' ? 28 : 24, background: bg, color: fg, border: tone === 'card' || tone === 'raised' ? '1px solid ' + (h && onClick ? 'var(--rm-sky)' : 'var(--border-default)') : '1px solid transparent', padding: image ? 0 : pad, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden', cursor: onClick ? 'pointer' : 'default', transition: 'var(--transition-color)', fontFamily: 'var(--font-ui)', ...style } },
    image ? React.createElement('div', { style: { position: 'relative', aspectRatio: '16/10', background: 'var(--surface-card)' } }, React.createElement('img', { src: image, alt: '', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } })) : null,
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12, padding: image ? pad : 0, flex: 1 } },
      eyebrow ? React.createElement('span', { style: { fontSize: 13, fontWeight: 600, color: division ? 'var(--div-' + division + '-accent)' : tone === 'inverse' ? 'var(--rm-sun)' : 'var(--text-muted)' } }, eyebrow) : null,
      title ? React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: { sm: 22, md: 26, lg: 36 }[size], fontWeight: 500, letterSpacing: '-.02em', lineHeight: 1.05, textWrap: 'balance' } }, title) : null,
      children ? React.createElement('div', { style: { fontSize: 14, lineHeight: 1.5, color: tone === 'inverse' ? 'var(--text-on-inverse-muted)' : 'var(--text-secondary)', flex: 1 } }, children) : null,
      footer ? React.createElement('div', { style: { display: 'flex', gap: 14, alignItems: 'center', fontSize: 14, fontWeight: 600, paddingTop: 6 } }, footer) : null));
}
