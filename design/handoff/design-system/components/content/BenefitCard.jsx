import React from 'react';
export function BenefitCard({ big, title, children, tone = 'family', style }) {
  return React.createElement('div', { style: { borderRadius: 24, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28, minHeight: 260, background: 'var(--div-' + tone + ')', color: 'var(--text-primary)', fontFamily: 'var(--font-ui)', ...style } },
    React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 500, letterSpacing: '-.03em', lineHeight: 1 } }, big),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } }, React.createElement('span', { style: { fontSize: 18, fontWeight: 600, letterSpacing: '-.01em' } }, title), React.createElement('span', { style: { fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)' } }, children)));
}
