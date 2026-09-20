import React from 'react';
export function Tag({ tone = 'neutral', children, dot, style }) {
  const T = { neutral: ['var(--surface-card)', 'var(--text-primary)'], sun: ['var(--rm-sun)', 'var(--rm-sun-ink)'], success: ['var(--status-success-bg)', 'var(--status-success-fg)'], warning: ['var(--status-warning-bg)', 'var(--status-warning-fg)'], error: ['var(--status-error-bg)', 'var(--status-error-fg)'], info: ['var(--status-info-bg)', 'var(--status-info-fg)'], inverse: ['rgba(255,255,255,.12)', '#fff'], family: ['var(--div-family)', 'var(--div-family-accent)'], pain: ['var(--div-pain)', 'var(--div-pain-accent)'], infusion: ['var(--div-infusion)', 'var(--div-infusion-accent)'], aesthetics: ['var(--div-aesthetics)', 'var(--div-aesthetics-accent)'], rehab: ['var(--div-rehab)', 'var(--div-rehab-accent)'] };
  const [bg, fg] = T[tone] || T.neutral;
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-ui)', background: bg, color: fg, whiteSpace: 'nowrap', ...style } },
    dot ? React.createElement('span', { style: { width: 6, height: 6, borderRadius: 999, background: 'currentColor' } }) : null, children);
}
