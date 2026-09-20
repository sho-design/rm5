import React from 'react';
export function Input({ invalid, disabled, style, onFocus, onBlur, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('input', { disabled, 'aria-invalid': invalid || undefined, onFocus: e => { setFocus(true); onFocus && onFocus(e); }, onBlur: e => { setFocus(false); onBlur && onBlur(e); }, ...rest, style: { ...{ height: 'var(--field-height)', borderRadius: 12, background: disabled ? 'var(--field-disabled-bg)' : 'var(--field-bg)', border: '1.5px solid ' + (invalid ? 'var(--field-border-error)' : focus ? 'var(--field-border-focus)' : 'var(--field-border)'), padding: '0 14px', fontSize: 15, fontFamily: 'var(--font-ui)', color: disabled ? 'var(--field-disabled-fg)' : 'var(--text-primary)', outline: 'none', boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'rgba(196,87,58,.18)' : 'rgba(47,127,209,.18)') : 'none', transition: 'var(--transition-color)', width: '100%', boxSizing: 'border-box' }, ...style } });
}
