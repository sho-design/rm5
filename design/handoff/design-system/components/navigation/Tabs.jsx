import React from 'react';
export function Tabs({ tabs, value, onChange, variant = 'pill', inverse, style }) {
  const line = inverse ? 'rgba(255,255,255,.18)' : 'var(--border-default)';
  return React.createElement('div', { role: 'tablist', style: { display: 'flex', gap: variant === 'pill' ? 6 : 28, flexWrap: 'wrap', borderBottom: variant === 'underline' ? '1px solid ' + line : 'none', ...style } },
    tabs.map(t => {
      const tab = typeof t === 'string' ? { value: t, label: t } : t, on = tab.value === value;
      const selBg = inverse ? 'var(--rm-sun)' : 'var(--action-primary-bg)', selFg = inverse ? 'var(--rm-sun-ink)' : 'var(--action-primary-fg)', fg = inverse ? '#fff' : 'var(--text-primary)';
      const pill = { padding: '11px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600, background: on ? selBg : 'transparent', color: on ? selFg : fg, border: '1.5px solid ' + (on ? (inverse ? 'var(--rm-sun)' : 'var(--border-strong)') : (inverse ? 'rgba(255,255,255,.3)' : 'var(--border-default)')) };
      const under = { padding: '0 0 14px', fontSize: 15, fontWeight: 600, marginBottom: -1, background: 'transparent', border: 0, borderBottom: '2px solid ' + (on ? (inverse ? 'var(--rm-sun)' : 'var(--rm-ink)') : 'transparent'), color: on ? fg : (inverse ? 'rgba(255,255,255,.6)' : 'var(--text-muted)') };
      return React.createElement('button', { key: tab.value, role: 'tab', 'aria-selected': on, onClick: () => onChange && onChange(tab.value), style: { fontFamily: 'var(--font-ui)', cursor: 'pointer', transition: 'var(--transition-all)', display: 'inline-flex', alignItems: 'center', gap: 8, ...(variant === 'pill' ? pill : under) } }, tab.label, tab.count != null ? React.createElement('span', { style: { fontSize: 11, opacity: .6 } }, tab.count) : null);
    }));
}
