import React from 'react';
export function Segmented({ options, value, onChange, inverse, size = 'md', style }) {
  return React.createElement('div', { role: 'radiogroup', style: { display: 'flex', gap: 8, ...style } }, options.map(o => {
    const opt = typeof o === 'string' ? { value: o, label: o } : o, on = opt.value === value;
    return React.createElement('button', { key: opt.value, role: 'radio', 'aria-checked': on, disabled: opt.disabled, onClick: () => onChange && onChange(opt.value),
      style: { flex: 1, padding: size === 'sm' ? '10px 12px' : '12px 14px', borderRadius: 12, textAlign: 'center', fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-ui)', cursor: opt.disabled ? 'not-allowed' : 'pointer', transition: 'var(--transition-all)', opacity: opt.disabled ? .5 : 1,
        background: on ? (inverse ? 'var(--rm-sun)' : 'var(--action-primary-bg)') : (inverse ? 'transparent' : 'var(--field-bg)'),
        color: on ? (inverse ? 'var(--rm-sun-ink)' : 'var(--action-primary-fg)') : (inverse ? '#fff' : 'var(--text-primary)'),
        border: '1.5px solid ' + (on ? (inverse ? 'var(--rm-sun)' : 'var(--border-strong)') : (inverse ? 'rgba(255,255,255,.25)' : 'var(--border-default)')) } },
      opt.label, opt.hint ? React.createElement('span', { style: { display: 'block', fontSize: 11, fontWeight: 500, opacity: .7, marginTop: 2 } }, opt.hint) : null);
  }));
}
