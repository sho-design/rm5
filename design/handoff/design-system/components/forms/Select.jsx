import React from 'react';
export function Select({ options, value, onChange, placeholder, invalid, disabled, style }) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', { style: { position: 'relative', width: '100%' } },
    React.createElement('select', { value: value ?? '', disabled, 'aria-invalid': invalid || undefined, onFocus: () => setFocus(true), onBlur: () => setFocus(false), onChange: e => onChange && onChange(e.target.value),
      style: { ...{ height: 'var(--field-height)', borderRadius: 12, background: disabled ? 'var(--field-disabled-bg)' : 'var(--field-bg)', border: '1.5px solid ' + (invalid ? 'var(--field-border-error)' : focus ? 'var(--field-border-focus)' : 'var(--field-border)'), padding: '0 14px', fontSize: 15, fontFamily: 'var(--font-ui)', color: disabled ? 'var(--field-disabled-fg)' : 'var(--text-primary)', outline: 'none', boxShadow: focus ? '0 0 0 3px ' + (invalid ? 'rgba(196,87,58,.18)' : 'rgba(47,127,209,.18)') : 'none', transition: 'var(--transition-color)', width: '100%', boxSizing: 'border-box' }, appearance: 'none', paddingRight: 40, cursor: disabled ? 'not-allowed' : 'pointer', color: value ? (disabled ? 'var(--field-disabled-fg)' : 'var(--text-primary)') : 'var(--field-placeholder)', ...style } },
      placeholder ? React.createElement('option', { value: '', disabled: true }, placeholder) : null,
      options.map(o => { const opt = typeof o === 'string' ? { value: o, label: o } : o; return React.createElement('option', { key: opt.value, value: opt.value }, opt.label); })),
    React.createElement('span', { 'aria-hidden': true, style: { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%) rotate(90deg)', fontSize: 16, color: 'var(--text-muted)', pointerEvents: 'none' } }, '›'));
}
