import React from 'react';
export function Field({ label, helper, error, required, optional, children, style }) {
  return React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-ui)', ...style } },
    label ? React.createElement('span', { style: { fontSize: 12, fontWeight: 600, color: error ? 'var(--field-border-error)' : 'var(--text-muted)', display: 'flex', gap: 6 } }, label, required ? React.createElement('span', { 'aria-hidden': true }, '*') : null, optional ? React.createElement('span', { style: { fontWeight: 400 } }, '(optional)') : null) : null,
    typeof children === 'function' ? children({ invalid: !!error }) : children,
    error ? React.createElement('span', { role: 'alert', style: { fontSize: 12, color: 'var(--field-border-error)', lineHeight: 1.4 } }, error) : helper ? React.createElement('span', { style: { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 } }, helper) : null);
}
