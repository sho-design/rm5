import React from 'react';
export function Checkbox({ checked, onChange, children, disabled, invalid, style }) {
  return React.createElement('label', { style: { display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13, lineHeight: 1.5, color: disabled ? 'var(--field-disabled-fg)' : 'var(--text-secondary)', fontFamily: 'var(--font-ui)', cursor: disabled ? 'not-allowed' : 'pointer', ...style } },
    React.createElement('input', { type: 'checkbox', checked, disabled, 'aria-invalid': invalid || undefined, onChange: e => onChange && onChange(e.target.checked), style: { width: 18, height: 18, marginTop: 2, accentColor: invalid ? 'var(--field-border-error)' : 'var(--rm-sky)', flexShrink: 0, outline: invalid ? '2px solid var(--field-border-error)' : undefined, outlineOffset: 2, borderRadius: 4 } }),
    React.createElement('span', null, children));
}
