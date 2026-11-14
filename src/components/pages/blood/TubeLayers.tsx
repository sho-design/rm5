"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { tubeCopy as c, type TubeLayer } from "@/content/blood-prep";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/*
 * "What is in one tube" (Bloodwork & ECG page, November 2026). EDUCATIONAL: a nurse or our lab team must check the
 * wording in content/blood-prep.ts (tubeCopy) before it is published.
 *
 * A tube fills, spins for a moment and settles into three layers; then each common test lights the layer it is
 * usually read from, in turn. Plays only on screen, Pause stops it; with reduced motion the settled, labelled tube
 * is shown and you pick a test yourself. Full strength in high contrast.
 */

const PHASE = { fill: 1600, spin: 1300, settle: 1100, test: 2600 };
type Phase = "fill" | "spin" | "settled";

/* Tube geometry (viewBox 0 0 260 380). Liquid from y=70 to y=330; layers once settled. */
const TOP = 70;
const BOTTOM = 330;
const PLASMA_END = 188; // plasma 70 to 188
const BUFFY_END = 198; // thin pale layer 188 to 198
const COLOURS = { plasma: "#F4D58D", buffy: "#F6F2EA", cells: "#B3261E", whole: "#9E2A22" };

export function TubeLayers() {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("fill");
  const [test, setTest] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  const shown: Phase = reduced ? "settled" : phase;

  // Fill, then spin, then settle; once settled, step through the tests, then start again.
  useEffect(() => {
    if (!moving) return;
    let t: number;
    if (phase === "fill") t = window.setTimeout(() => setPhase("spin"), PHASE.fill);
    else if (phase === "spin") t = window.setTimeout(() => setPhase("settled"), PHASE.spin);
    else
      t = window.setTimeout(() => {
        if (test < c.tests.length - 1) setTest((n) => n + 1);
        else {
          setTest(0);
          setPhase("fill");
          setCycle((n) => n + 1);
        }
      }, PHASE.settle + PHASE.test);
    return () => window.clearTimeout(t);
  }, [moving, phase, test]);

  const pick = (i: number) => {
    setTest(i);
    setPhase("settled");
    setPlaying(false);
  };

  const lit = c.tests[test].layers;
  const isLit = (l: TubeLayer) => shown === "settled" && lit.includes(l);
  const whole = isLit("whole");
  const dim = (l: TubeLayer) => (shown === "settled" && !lit.includes(l) && !whole ? 0.35 : 1);

  return (
    <Section id="tube" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes tl-fill { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes tl-spin { 0% { transform: rotate(0); } 70% { transform: rotate(720deg); } 100% { transform: rotate(720deg); } }
        @keyframes tl-glow { 0%, 100% { opacity: .35; } 50% { opacity: .9; } }
        .tl-fill { transform-box: view-box; transform-origin: 130px ${BOTTOM}px; animation: tl-fill ${PHASE.fill}ms cubic-bezier(.2,.8,.2,1) both; }
        .tl-spin { transform-box: view-box; transform-origin: 130px 200px; animation: tl-spin ${PHASE.spin}ms cubic-bezier(.45,0,.2,1) both; }
        .tl-layer { transition: opacity 300ms cubic-bezier(.2,.8,.2,1), height 900ms cubic-bezier(.2,.8,.2,1), y 900ms cubic-bezier(.2,.8,.2,1); }
        .tl-glow { animation: tl-glow 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .tl-fill, .tl-spin, .tl-glow { animation: none; } .tl-layer { transition: none; } }
        :root[data-theme="contrast"] .tl-fig [data-line] { stroke: var(--rm-ink) !important; }
        :root[data-theme="contrast"] .tl-chip { border: 2px solid var(--rm-ink) !important; }
        :root[data-theme="contrast"] .tl-layer { opacity: 1 !important; }
      `}</style>
      <div ref={box} className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-[color:var(--div-family)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="sky">{c.eyebrow}</Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty max-w-[56ch] text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          </div>

          <div role="radiogroup" aria-label={c.pickLabel} onKeyDown={radioKeys} className="flex flex-col gap-2">
            {c.tests.map((t, i) => {
              const on = i === test && shown === "settled";
              return (
                <button
                  key={t.k}
                  type="button"
                  role="radio"
                  aria-checked={i === test}
                  tabIndex={rovingTab(i === test, i, true)}
                  onClick={() => pick(i)}
                  className={cn(
                    "tl-chip flex min-h-[56px] flex-col items-start gap-0.5 rounded-[14px] border-2 bg-page px-4 py-3 text-left transition-[border-color,box-shadow] duration-300",
                    on ? "border-ink shadow-[0_6px_18px_rgba(15,31,46,.10)]" : "border-transparent hover:border-[color:var(--border-default)]",
                  )}
                >
                  <span className="text-[16px] font-semibold">{t.t}</span>
                  <span className={cn("pretty text-[14px] leading-[1.45] text-secondary", !on && "sr-only")}>{t.d}</span>
                </button>
              );
            })}
          </div>
          {/* Every test and its layer, as text. */}
          <ul className="sr-only">
            {c.tests.map((t) => (
              <li key={t.k}>
                {t.t}: {t.d}
              </li>
            ))}
          </ul>
        </div>

        <figure className="tl-fig m-0 flex flex-col items-center gap-3">
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[44px] self-end rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[13px] font-semibold hover:border-ink"
            >
              {playing ? c.pause : c.play}
            </button>
          ) : null}
          <svg viewBox="0 0 260 380" role="img" aria-label={c.alt} className="h-auto w-full max-w-[340px]">
            <defs>
              <clipPath id="tl-inside">
                <path d={`M98 ${TOP - 20} H162 V${BOTTOM - 10} a32 32 0 0 1 -64 0 Z`} />
              </clipPath>
            </defs>

            {/* Stage label */}
            <text x="130" y="24" textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A6B7B">
              {shown === "fill" ? c.stages.drawn : shown === "spin" ? c.stages.spun : c.stages.settled}
            </text>

            <g key={`spin-${cycle}-${shown === "spin"}`} className={shown === "spin" ? "tl-spin" : undefined}>
              {/* Liquid */}
              <g clipPath="url(#tl-inside)">
                {shown === "settled" ? (
                  <>
                    <rect className="tl-layer" x="90" y={TOP} width="80" height={PLASMA_END - TOP} fill={COLOURS.plasma} opacity={dim("plasma")} />
                    <rect className="tl-layer" x="90" y={PLASMA_END} width="80" height={BUFFY_END - PLASMA_END} fill={COLOURS.buffy} opacity={dim("buffy")} />
                    <rect className="tl-layer" x="90" y={BUFFY_END} width="80" height={BOTTOM + 40 - BUFFY_END} fill={COLOURS.cells} opacity={dim("cells")} />
                  </>
                ) : (
                  <rect
                    key={`fill-${cycle}`}
                    className={shown === "fill" ? "tl-fill" : undefined}
                    x="90"
                    y={TOP}
                    width="80"
                    height={BOTTOM + 40 - TOP}
                    fill={COLOURS.whole}
                  />
                )}
              </g>
              {/* Glass, cap and label */}
              <path data-line d={`M98 ${TOP - 20} V${BOTTOM - 10} a32 32 0 0 0 64 0 V${TOP - 20}`} fill="none" stroke="#5A6B7B" strokeWidth="3" />
              <rect x="90" y={TOP - 46} width="80" height="30" rx="6" fill="#7A2BBF" />
              <rect x="104" y="226" width="52" height="58" rx="4" fill="#FFFFFF" opacity=".85" />
              <path d="M112 242h36M112 254h28M112 266h32" stroke="#9AA6B1" strokeWidth="2" strokeLinecap="round" />
              {/* Whole-blood highlight (A1c): a ring around the whole tube. */}
              {whole ? (
                <path
                  className="tl-glow"
                  d={`M90 ${TOP - 28} V${BOTTOM - 8} a40 40 0 0 0 80 0 V${TOP - 28}`}
                  fill="none"
                  stroke="#2F7FD1"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                />
              ) : null}
            </g>

            {/* Layer labels once settled, with the lit ones bold. */}
            {shown === "settled"
              ? (
                  [
                    ["plasma", (TOP + PLASMA_END) / 2],
                    ["buffy", (PLASMA_END + BUFFY_END) / 2],
                    ["cells", (BUFFY_END + BOTTOM) / 2 - 10],
                  ] as const
                ).map(([l, y], i) => {
                  const on = isLit(l);
                  const lx = i % 2 ? 22 : 238;
                  const anchor = i % 2 ? "start" : "end";
                  return (
                    <g key={l} opacity={on || whole ? 1 : 0.55}>
                      <line data-line x1={i % 2 ? 90 : 170} y1={y} x2={i % 2 ? 70 : 190} y2={y} stroke="#5A6B7B" strokeWidth="1.5" />
                      <text x={lx} y={y - 4} textAnchor={anchor} fontSize="13" fontWeight={on ? 700 : 500} fill="#0F1F2E">
                        {c.layers[l].short}
                      </text>
                      {on ? <circle cx={i % 2 ? 80 : 180} cy={y} r="5" fill="#2F7FD1" className="tl-glow" /> : null}
                    </g>
                  );
                })
              : null}
          </svg>
          <dl className="grid w-full grid-cols-1 gap-1.5 text-[13px] leading-[1.45] sm:grid-cols-3">
            {(["plasma", "buffy", "cells"] as const).map((l) => (
              <div key={l} className="flex gap-2">
                <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-[#D5DEE6]" style={{ background: COLOURS[l] }} />
                <span>
                  <dt className="inline font-semibold">{c.layers[l].t}. </dt>
                  <dd className="inline text-secondary">{c.layers[l].d}</dd>
                </span>
              </div>
            ))}
          </dl>
          <figcaption className="text-center text-[13px] text-muted">{c.note}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
