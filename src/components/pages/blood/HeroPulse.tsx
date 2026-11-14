/**
 * A thin heart tracing under the Bloodwork & ECG hero (November 2026): it draws once, left to right, in about 1.2
 * seconds and then rests. Decorative only. With reduced motion it is simply drawn.
 */
export function HeroPulse({ color, className }: { color: string; className?: string }) {
  // A flat line with one heartbeat a third of the way along: small bump, sharp spike, dip, rounded wave.
  const d =
    "M0 32 H330 q8 -6 16 0 H362 l6 4 l10 -30 l10 40 l6 -14 H404 q12 -12 24 0 H1200";
  return (
    <div aria-hidden className={`px-4 pt-4 md:px-content md:pt-6 ${className ?? ""}`}>
      <style>{`
        @keyframes hp-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .hp-line { stroke-dasharray: 1; stroke-dashoffset: 0; animation: hp-draw 1200ms cubic-bezier(.2,.8,.2,1) 200ms both; }
        @media (prefers-reduced-motion: reduce) { .hp-line { animation: none; } }
        :root[data-theme="contrast"] .hp-line { stroke: var(--rm-ink); }
      `}</style>
      <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="block h-10 w-full md:h-12">
        <path
          d={d}
          pathLength={1}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          className="hp-line"
        />
      </svg>
    </div>
  );
}
