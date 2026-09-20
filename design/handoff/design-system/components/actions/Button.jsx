import React from 'react';
const V = {
  primary: { background: 'var(--action-primary-bg)', color: 'var(--action-primary-fg)', border: '1.5px solid transparent' },
  secondary: { background: 'var(--action-secondary-bg)', color: 'var(--action-secondary-fg)', border: '1.5px solid transparent' },
  accent: { background: 'var(--action-accent-bg)', color: 'var(--action-accent-fg)', border: '1.5px solid transparent' },
  outline: { background: 'transparent', color: 'var(--text-primary)', border: '1.5px solid var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--text-link)', border: '1.5px solid transparent', padding: '0' },
  inverse: { background: '#fff', color: 'var(--rm-ink)', border: '1.5px solid transparent' },
};
const S = { sm: { height: 38, padding: '0 16px', fontSize: 14 }, md: { height: 48, padding: '0 24px', fontSize: 15 }, lg: { height: 56, padding: '0 32px', fontSize: 16 } };
export function Button({ variant = 'primary', size = 'md', disabled, fullWidth, trailing, children, onClick, href, style, ...rest }) {
  const [hover, setHover] = React.useState(false), [press, setPress] = React.useState(false);
  const Tag = href ? 'a' : 'button';
  return React.createElement(Tag, { href, onClick: disabled ? undefined : onClick, disabled, 'aria-disabled': disabled || undefined,
    onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); }, onMouseDown: () => setPress(true), onMouseUp: () => setPress(false), ...rest,
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 999, fontFamily: 'var(--font-ui)', fontWeight: 600, lineHeight: 1, cursor: disabled ? 'not-allowed' : 'pointer', textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box', width: fullWidth ? '100%' : undefined, transition: 'var(--transition-all)', opacity: disabled ? .45 : hover && variant !== 'ghost' ? .9 : 1, transform: press ? 'var(--press-scale)' : 'none', ...S[size], ...V[variant], ...(variant === 'ghost' ? { height: 'auto' } : {}), ...style } },
    children, trailing ? React.createElement('span', { 'aria-hidden': true }, trailing === true ? '›' : trailing) : null);
}
