"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { cardCopy as c } from "@/content/vaccines-extra";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const INK = "#0F1F2E";
const LINE = "#C9D2DB";
const SUN = "#FFD84D";
const SAGE = "#3D9B78";

/**
 * "From card to chart" (Vaccines, November 2026). The yellow immunization card and the health card slide in; after the
 * shot the entry travels from the yellow card into the chart, which gets a check mark. Then a record from another
 * country takes a slower, dotted path into the same chart. Loops while on screen (Pause stops it); with reduced
 * motion the finished picture shows. Every element's resting style is its final state; keyframes only add the build.
 */
export function CardToChart() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && inView && !reduced;

  return (
    <Section id="record" className="rm-paper scroll-mt-24">
      <style>{`
        .cc-fig * { animation-duration: 9s; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(.2,.8,.2,1); animation-fill-mode: both; }
        .cc-stop * { animation-play-state: paused !important; }
        @keyframes cc-in { 0% { opacity: 0; transform: translateX(-26px); } 10%, 100% { opacity: 1; transform: none; } }
        @keyframes cc-shot { 0%, 14% { opacity: 0; transform: scale(.4); } 18% { opacity: 1; transform: scale(1.15); } 24%, 100% { opacity: 1; transform: scale(1); } }
        @keyframes cc-move { 0%, 22% { opacity: 0; transform: translate(0, 0); } 25% { opacity: 1; transform: translate(0, 0); } 44% { opacity: 1; transform: translate(296px, -18px); } 48%, 100% { opacity: 0; transform: translate(296px, -18px); } }
        @keyframes cc-line { 0%, 44% { transform: scaleX(0); } 52%, 100% { transform: scaleX(1); } }
        @keyframes cc-check { 0%, 50% { opacity: 0; transform: scale(.3); } 56% { opacity: 1; transform: scale(1.15); } 60%, 100% { opacity: 1; transform: scale(1); } }
        @keyframes cc-paper { 0%, 58% { opacity: 0; transform: translateY(14px); } 64%, 100% { opacity: 1; transform: none; } }
        @keyframes cc-route { 0%, 64% { stroke-dashoffset: 1; } 88%, 100% { stroke-dashoffset: 0; } }
        @keyframes cc-line2 { 0%, 88% { transform: scaleX(0); } 94%, 100% { transform: scaleX(1); } }
        .cc-in { animation-name: cc-in; }
        .cc-in2 { animation-name: cc-in; animation-delay: .25s; }
        .cc-shot { animation-name: cc-shot; transform-box: fill-box; transform-origin: center; }
        .cc-move { animation-name: cc-move; }
        .cc-line { animation-name: cc-line; transform-box: fill-box; transform-origin: left center; }
        .cc-check { animation-name: cc-check; transform-box: fill-box; transform-origin: center; }
        .cc-paper { animation-name: cc-paper; }
        .cc-route { animation-name: cc-route; stroke-dasharray: 1; }
        .cc-line2 { animation-name: cc-line2; transform-box: fill-box; transform-origin: left center; }
        @media (prefers-reduced-motion: reduce) { .cc-fig * { animation: none !important; } }
        :root[data-theme="contrast"] .cc-fig [data-soft] { opacity: 1 !important; }
        :root[data-theme="contrast"] .cc-panel { border: 2px solid var(--rm-ink); }
      `}</style>

      <div ref={box} className="grid grid-cols-1 gap-8 rounded-block bg-[color:var(--rm-sun-tint)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-[color:var(--rm-amber-text)]">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          </div>
          <ol className="flex flex-col gap-3">
            {c.steps.map((s, i) => (
              <li key={s.t} className="flex gap-3">
                <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5 pt-0.5">
                  <span className="text-[16px] font-semibold leading-[1.3]">{s.t}</span>
                  <span className="pretty text-[14px] leading-[1.5] text-secondary">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          {/* Records from elsewhere: the clinic's own note (Nov 2026). */}
          <div className="cc-panel flex flex-col gap-1.5 rounded-card bg-page p-5">
            <span className="text-[16px] font-semibold">{c.abroadTitle}</span>
            <p className="pretty text-[15px] leading-[1.5]">{c.abroadBody}</p>
            <p className="pretty text-[14px] leading-[1.5] text-secondary">{c.abroadTip}</p>
          </div>
        </div>

        <figure className="m-0 flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="text-[13px] font-semibold text-secondary">{c.illustration}</figcaption>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="min-h-[44px] shrink-0 rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <svg
            role="img"
            aria-label={c.alt}
            viewBox="0 0 640 380"
            className={cn("cc-fig h-auto w-full rounded-[18px] bg-page", !running && "cc-stop")}
          >
            {/* Yellow immunization card */}
            <g className="cc-in">
              <g transform="rotate(-4 120 100)">
                <rect x="40" y="48" width="170" height="108" rx="12" fill={SUN} stroke={INK} strokeWidth="2" />
                <rect x="56" y="64" width="70" height="8" rx="4" fill={INK} opacity=".8" />
                {[88, 106, 124].map((y) => (
                  <g key={y}>
                    <rect x="56" y={y} width="12" height="10" rx="2" fill="#fff" stroke={INK} strokeWidth="1.5" />
                    <rect x="76" y={y + 2} width="110" height="6" rx="3" fill={INK} opacity=".3" data-soft />
                  </g>
                ))}
              </g>
              <text x="125" y="182" textAnchor="middle" fontSize="15" fontWeight="600" fill={INK}>
                {c.labels.yellow}
              </text>
            </g>

            {/* Health card: a plain card with a chip shape, no real design. */}
            <g className="cc-in2">
              <rect x="40" y="208" width="170" height="104" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
              <rect x="56" y="232" width="30" height="24" rx="5" fill="#E9C46A" stroke={INK} strokeWidth="1.5" />
              <rect x="100" y="234" width="92" height="7" rx="3.5" fill={INK} opacity=".3" data-soft />
              <rect x="100" y="250" width="70" height="7" rx="3.5" fill={INK} opacity=".3" data-soft />
              <rect x="56" y="280" width="136" height="8" rx="4" fill={INK} opacity=".2" data-soft />
              <text x="125" y="338" textAnchor="middle" fontSize="15" fontWeight="600" fill={INK}>
                {c.labels.health}
              </text>
            </g>

            {/* The shot: a small plus marker on the yellow card */}
            <g className="cc-shot">
              <circle cx="196" cy="58" r="15" fill={SAGE} />
              <path d="M196 50v16M188 58h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </g>

            {/* The entry travelling from the yellow card to the chart */}
            <g className="cc-move">
              <rect x="150" y="108" width="54" height="12" rx="6" fill={INK} />
            </g>

            {/* Your chart */}
            <g>
              <rect x="430" y="40" width="180" height="250" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
              <rect x="490" y="30" width="60" height="18" rx="6" fill={INK} />
              <rect x="450" y="66" width="80" height="9" rx="4.5" fill={INK} opacity=".75" />
              {[96, 120].map((y) => (
                <rect key={y} x="450" y={y} width="140" height="8" rx="4" fill={LINE} />
              ))}
              {/* New entry from the yellow card */}
              <rect className="cc-line" x="446" y="88" width="120" height="14" rx="7" fill={INK} />
              <rect x="450" y="150" width="140" height="8" rx="4" fill={LINE} />
              {/* Entry from the record from elsewhere */}
              <rect className="cc-line2" x="446" y="176" width="120" height="14" rx="7" fill="#7A8794" />
              {[206, 230, 254].map((y) => (
                <rect key={y} x="450" y={y} width="140" height="8" rx="4" fill={LINE} />
              ))}
              <text x="520" y="318" textAnchor="middle" fontSize="15" fontWeight="600" fill={INK}>
                {c.labels.chart}
              </text>
              {/* Check mark: recorded */}
              <g className="cc-check">
                <circle cx="602" cy="52" r="20" fill={SAGE} stroke="#fff" strokeWidth="3" />
                <path d="M592 52l7 7 13-14" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </g>

            {/* A record from another country: generic paper, a slower dotted route into the same chart */}
            <g className="cc-paper">
              <g transform="rotate(5 290 312)">
                <rect x="250" y="276" width="82" height="70" rx="6" fill="#F4F6F8" stroke={INK} strokeWidth="1.5" />
                {[292, 306, 320].map((y) => (
                  <rect key={y} x="262" y={y} width="58" height="5" rx="2.5" fill={INK} opacity=".3" data-soft />
                ))}
              </g>
              <text x="292" y="370" textAnchor="middle" fontSize="14" fontWeight="600" fill={INK}>
                {c.labels.abroad}
              </text>
            </g>
            <path
              className="cc-route"
              pathLength={1}
              d="M334 300 C 380 300, 380 230, 400 210 S 420 186, 444 183"
              fill="none"
              stroke="#7A8794"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path d="M334 300 C 380 300, 380 230, 400 210 S 420 186, 444 183" fill="none" stroke="#7A8794" strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" opacity=".35" data-soft />
          </svg>
        </figure>
      </div>
    </Section>
  );
}
