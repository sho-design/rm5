import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Display, Eyebrow, Section } from "@/components/ui";
import {
  laserCopy as c,
  laserDevices,
  type LaserDeviceKey,
} from "@/content/aes-laser";
import { devicePath } from "@/content/aes-laser-devices";

/**
 * The six devices as cards (November 2026 redesign). Each card is tinted in its device colour, carries a small
 * picture of how that device works (a pulse, two beams, a grid of columns, radio waves, sparks, a glow), the
 * concerns as chips and downtime as a three-step meter. The whole card opens the device page. On hover or
 * keyboard focus the card lifts, its border takes the device colour and the little picture plays; still with
 * reduced motion.
 */
export function DeviceCards() {
  return (
    <Section id="devices" className="rm-paper flex scroll-mt-24 flex-col gap-6">
      <style>{`
        .lx-card { transition: transform 300ms cubic-bezier(.2,.8,.2,1), box-shadow 300ms cubic-bezier(.2,.8,.2,1), border-color 300ms; }
        .lx-card:hover, .lx-card:focus-within { transform: translateY(-4px); box-shadow: 0 16px 36px rgba(15,31,46,.10); border-color: var(--c); }
        .lx-anim { animation-play-state: paused !important; }
        .lx-card:hover .lx-anim, .lx-card:focus-within .lx-anim { animation-play-state: running !important; }
        .lx-arrow { display: inline-block; transition: transform 250ms cubic-bezier(.2,.8,.2,1); }
        .lx-card:hover .lx-arrow, .lx-card:focus-within .lx-arrow { transform: translateX(4px); }
        @keyframes lx-pulse { 0%, 100% { opacity: .25; } 50% { opacity: 1; } }
        @keyframes lx-drop { 0% { transform: translateY(-10px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(12px); opacity: 0; } }
        @keyframes lx-wave { 0% { transform: scale(.6); opacity: .9; } 100% { transform: scale(1.25); opacity: 0; } }
        @keyframes lx-scatter { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(var(--dx), var(--dy)); } }
        .lx-pulse { animation: lx-pulse 1.2s ease-in-out infinite; }
        .lx-drop { animation: lx-drop 1.1s cubic-bezier(.4,0,.6,1) infinite; }
        .lx-wave { transform-box: fill-box; transform-origin: center; animation: lx-wave 1.8s cubic-bezier(.2,.8,.2,1) infinite; }
        .lx-scatter { animation: lx-scatter 1.2s cubic-bezier(.2,.8,.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lx-card, .lx-arrow { transition: none; }
          .lx-card:hover, .lx-card:focus-within { transform: none; }
          .lx-pulse, .lx-drop, .lx-wave, .lx-scatter { animation: none; }
        }
        .lx-card:has(a:focus-visible) { outline: 3px solid var(--focus-ring); outline-offset: 3px; }
        :root[data-theme="contrast"] .lx-card { border: 2px solid var(--rm-ink); }
      `}</style>
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.devicesEyebrow}
        </Eyebrow>
        <Display size="sm">{c.devicesTitle}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.devicesLead}
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-card md:grid-cols-2 xl:grid-cols-3">
        {laserDevices.map((d) => (
          <li
            key={d.k}
            className="lx-card relative flex flex-col overflow-hidden rounded-card border border-border bg-card"
            style={{ "--c": d.color } as CSSProperties}
          >
            {/* Header in the device colour, with its picture. */}
            <div
              className="flex items-start justify-between gap-4 px-6 pb-4 pt-5"
              style={{
                background: `linear-gradient(150deg, color-mix(in srgb, ${d.color} 22%, var(--surface-card)), color-mix(in srgb, ${d.color} 6%, var(--surface-card)))`,
              }}
            >
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="font-display text-[26px] font-medium leading-[1.05]">
                  {/* The whole card opens the device page. */}
                  <Link
                    href={devicePath(d.k)}
                    className="after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:outline-none"
                  >
                    {d.name}
                  </Link>
                </h3>
                <span className="text-[13px] font-semibold text-secondary">
                  {d.kind}
                </span>
              </div>
              <span
                aria-hidden
                className="grid h-16 w-16 shrink-0 place-items-center rounded-[16px] bg-[color:var(--surface-card)] shadow-[0_4px_14px_rgba(15,31,46,.08)]"
              >
                <Emblem k={d.k} color={d.color} />
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-4">
              <p className="pretty text-[15px] leading-[1.5]">{d.plain}</p>

              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-secondary">
                  {c.usedFor}
                </span>
                <ul className="flex flex-wrap gap-1.5">
                  {d.usedFor.map((u) => (
                    <li
                      key={u}
                      className="rounded-chip px-2.5 py-1 text-[13px] font-medium"
                      style={{
                        background: `color-mix(in srgb, ${d.color} 12%, var(--surface-card))`,
                      }}
                    >
                      {u}
                    </li>
                  ))}
                </ul>
              </div>

              <dl className="grid grid-cols-1 gap-3 border-t border-border pt-4 text-[14px] leading-[1.45] sm:grid-cols-2">
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <dt className="flex items-center justify-between gap-3 text-[13px] font-semibold text-secondary">
                    {c.downtime}
                    <span aria-hidden className="flex gap-1">
                      {[0, 1, 2].map((n) => (
                        <span
                          key={n}
                          className="h-1.5 w-6 rounded-full"
                          style={{
                            // A ruler: none, a day or two, several days. Lit up to this device's level.
                            background:
                              n > d.level
                                ? "var(--border-default)"
                                : n === 0
                                  ? `color-mix(in srgb, ${d.color} 45%, var(--surface-card))`
                                  : d.color,
                          }}
                        />
                      ))}
                    </span>
                  </dt>
                  <dd>{d.downtime}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] font-semibold text-secondary">
                    {c.feels}
                  </dt>
                  <dd className="pretty">{d.feels}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-[13px] font-semibold text-secondary">
                    {c.sessions}
                  </dt>
                  <dd className="pretty">{d.sessions}</dd>
                </div>
              </dl>

              <span
                aria-hidden
                className="mt-auto flex items-center gap-1 pt-1 text-[14px] font-semibold text-link"
              >
                More about {d.name}
                <span className="lx-arrow">›</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** A small picture of how each device works. Plays while its card is hovered or focused. */
function Emblem({ k, color }: { k: LaserDeviceKey; color: string }) {
  const skin = (
    <rect x="8" y="34" width="32" height="8" rx="2" fill={color} opacity=".3" />
  );
  const svg = (children: ReactNode) => (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none">
      {children}
    </svg>
  );
  switch (k) {
    case "picosure":
      // Very short pulses break pigment into pieces.
      return svg(
        <>
          {skin}
          <path d="M24 6v20" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="3 4" className="lx-anim lx-pulse" />
          {[
            [-6, -3],
            [6, -4],
            [-3, 5],
            [5, 4],
          ].map(([dx, dy], i) => (
            <circle
              key={i}
              cx="24"
              cy="36"
              r="2"
              fill={color}
              className="lx-anim lx-scatter"
              style={{ "--dx": `${dx}px`, "--dy": `${dy}px` } as CSSProperties}
            />
          ))}
        </>,
      );
    case "clarity":
      // Two beams, one shorter and one deeper.
      return svg(
        <>
          <rect x="8" y="26" width="32" height="16" rx="2" fill={color} opacity=".24" />
          <path d="M18 6v22" stroke={color} strokeWidth="3" strokeLinecap="round" className="lx-anim lx-pulse" />
          <path d="M30 6v34" stroke={color} strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" className="lx-anim lx-pulse" style={{ animationDelay: ".6s" }} />
        </>,
      );
    case "eco2":
      // A grid of tiny columns, skin left between them.
      return svg(
        <>
          <rect x="8" y="18" width="32" height="24" rx="2" fill={color} opacity=".24" />
          {[14, 20, 26, 32].map((x, i) => (
            <path key={x} d={`M${x} 18v14`} stroke={color} strokeWidth="2.6" strokeLinecap="round" className="lx-anim lx-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
          <path d="M8 18h32" stroke={color} strokeOpacity=".5" strokeWidth="1.5" />
        </>,
      );
    case "xerf":
      // Radio waves warming the deeper skin.
      return svg(
        <>
          {skin}
          {[0, 0.6, 1.2].map((dl) => (
            <circle key={dl} cx="24" cy="30" r="12" stroke={color} strokeWidth="2" className="lx-anim lx-wave" style={{ animationDelay: `${dl}s` }} />
          ))}
          <circle cx="24" cy="30" r="3" fill={color} />
        </>,
      );
    case "plexr":
      // Tiny sparks just above the skin.
      return svg(
        <>
          {skin}
          <path d="M24 6v14" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M24 20l-4 5 6 2-4 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="lx-anim lx-pulse" />
        </>,
      );
    case "healite":
      // A lit panel with gentle light falling.
      return svg(
        <>
          <rect x="10" y="6" width="28" height="6" rx="3" fill={color} />
          {skin}
          {[16, 24, 32].map((x, i) => (
            <circle key={x} cx={x} cy="22" r="2.2" fill={color} className="lx-anim lx-drop" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </>,
      );
  }
}
