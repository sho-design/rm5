import React from 'react';
export function Table({ columns, rows, highlight, caption, style }) {
  return React.createElement('div', { style: { borderRadius: 24, border: '1px solid var(--border-default)', overflow: 'hidden', fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: 15, color: 'var(--text-primary)' } },
      caption ? React.createElement('caption', { style: { textAlign: 'left', padding: '16px 24px 0', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, letterSpacing: '-.02em' } }, caption) : null,
      React.createElement('thead', null, React.createElement('tr', { style: { background: 'var(--surface-card)' } }, columns.map((c, i) => React.createElement('th', { key: i, scope: 'col', style: { textAlign: 'left', padding: '16px 24px', fontSize: 13, fontWeight: 600, color: i === highlight ? 'var(--text-primary)' : 'var(--text-muted)' } }, c)))),
      React.createElement('tbody', null, rows.map((r, ri) => React.createElement('tr', { key: ri, style: { borderTop: '1px solid var(--border-default)' } }, r.map((cell, ci) => {
        const hl = ci === highlight && ci !== 0;
        return React.createElement(ci === 0 ? 'th' : 'td', { key: ci, scope: ci === 0 ? 'row' : undefined, style: { textAlign: 'left', padding: '18px 24px', fontWeight: ci === 0 ? 600 : 400, background: hl ? 'var(--status-success-bg)' : 'transparent', color: ci === 0 || hl ? 'var(--text-primary)' : 'var(--text-muted)', verticalAlign: 'top', lineHeight: 1.45 } },
          hl ? React.createElement('span', { style: { display: 'flex', gap: 8 } }, React.createElement('span', { style: { color: 'var(--rm-sage-deep)' } }, '✓'), React.createElement('span', null, cell)) : cell);
      }))))));
}
