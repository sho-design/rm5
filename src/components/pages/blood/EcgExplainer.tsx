"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { ecgCopy as c } from "@/content/blood-ecg";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const STEP_MS = 2800;
const INK = "var(--rm-ink)";
const PAPER = "#FFFFFF";
const STICKER = "var(--rm-sky)";
const WAVE: Record<"p" | "qrs" | "t", string> = {
  p: "var(--rm-sky)",
  qrs: "var(--rm-terracotta-deep)",
  t: "var(--rm-sage-deep)",
};

/** Limbs first (one on each wrist and ankle), then the six across the chest. */
const STICKERS: [number, number][] = [
  [172, 236],
  [348, 236],
  [231, 436],
  [289, 436],
  [248, 150],
  [272, 150],
  [281, 166],
  [291, 182],
  [303, 186],
  [315, 186],
];

/** One heartbeat as a path segment starting at x on the baseline y. */
const beat = (x: number, y: number) =>
  `L${x + 20} ${y} Q${x + 30} ${y - 12} ${x + 40} ${y} L${x + 52} ${y} L${x + 56} ${y + 6} L${x + 62} ${y - 46} L${x + 68} ${y + 14} L${x + 74} ${y} L${x + 92} ${y} C${x + 102} ${y} ${x + 106} ${y - 18} ${x + 116} ${y - 18} C${x + 126} ${y - 18} ${x + 128} ${y} ${x + 136} ${y} L${x + 150} ${y}`;
const BASE = 552;
const TRACE = `M24 ${BASE} ${beat(24, BASE)} ${beat(174, BASE)} ${beat(324, BASE)} L496 ${BASE}`;
/** Where each part of the middle beat sits on the strip, for its highlight and label. */
const PART: Record<"p" | "qrs" | "t", [number, number]> = {
  p: [194, 216],
  qrs: [226, 246],
  t: [262, 314],
};

/**
 * "Where the stickers go" on the Bloodwork & ECG page. A calm outline of a person; the ten stickers appear one by
 * one (limbs, then the chest); a heart tracing draws across a paper strip; then the three parts of one beat light
 * up in turn with plain words. Plays only on screen, with Pause; tapping a step shows it and stops the loop.
 * With reduced motion it shows the finished picture. Copy: content/blood-ecg.ts.
 */
export function EcgExplainer() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const n = c.stages.length;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => {
      setStage((s) => {
        if (s + 1 >= n) {
          setCycle((k) => k + 1);
          return 0;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => window.clearInterval(t);
  }, [moving, n]);

  // Reduced motion: the finished picture, every part labelled.
  const s = reduced ? n - 1 : stage;
  const anim = !reduced;
  const showTrace = s >= 1;
  const parts = (["p", "qrs", "t"] as const).filter((_, i) => s >= i + 2 || reduced);
  const current = c.stages[s];

  const pick = (i: number) => {
    setStage(i);
    setPlaying(false);
  };

  return (
    <Section id="ecg" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes ecg-pop { 0% { transform: scale(0); opacity: 0 } 70% { transform: scale(1.25); opacity: 1 } 100% { transform: scale(1); opacity: 1 } }
        @keyframes ecg-ring { 0% { r: 7; opacity: .6 } 100% { r: 16; opacity: 0 } }
        @keyframes ecg-in { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .ecg-pop { transform-box: fill-box; transform-origin: center; animation: ecg-pop 420ms cubic-bezier(.2,.8,.2,1) both; }
        .ecg-ring { animation: ecg-ring 1.2s cubic-bezier(.2,.8,.2,1) 1 both; }
        .ecg-label { animation: ecg-in 360ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .ecg-pop, .ecg-ring, .ecg-label { animation: none !important; } }
        :root[data-theme="contrast"] .ecg-fig { border: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .ecg-step[aria-current="step"] { outline: 2px solid var(--rm-ink); }
      `}</style>
      <div ref={box} className="grid grid-cols-1 items-start gap-8 rounded-block bg-[color:var(--div-family)] p-6 md:p-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-sky-text">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          </div>

          {/* The steps, also the text version of the picture. */}
          <ol className="flex flex-col gap-1.5">
            {c.stages.map((st, i) => {
              const on = i === s;
              const color = st.k === "p" || st.k === "qrs" || st.k === "t" ? WAVE[st.k] : STICKER;
              return (
                <li key={st.k}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "ecg-step flex w-full items-start gap-3 rounded-[14px] px-3.5 py-2.5 text-left transition-colors duration-300",
                      on ? "bg-[color:var(--bg-page)] shadow-[0_6px_18px_rgba(15,31,46,.08)]" : "hover:bg-[color:var(--bg-page)]",
                    )}
                  >
                    <span
                      aria-hidden
                      className="mt-1 h-3 w-3 shrink-0 rounded-full"
                      style={{ background: i <= s ? color : "var(--border-default)" }}
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold leading-[1.3]">{st.t}</span>
                      <span className="pretty text-[14px] leading-[1.45] text-secondary">{st.d}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="flex flex-col gap-2 border-t border-[color:var(--border-default)] pt-4">
            <p className="flex items-center gap-2 text-[15px] font-semibold">
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5 16 5v4.5c0 4-2.7 6.7-6 8-3.3-1.3-6-4-6-8V5l6-2.5Z" />
                <path d="m7.2 10 2 2 3.6-3.8" />
              </svg>
              {c.records}
            </p>
            <p className="text-[14px] text-secondary">{c.readBy}</p>
            <a href="#prepare" className="w-fit text-[15px] font-semibold text-link">
              {c.prepare} ›
            </a>
          </div>
        </div>

        <figure className="m-0 flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="text-[13px] font-semibold text-sky-text">{c.note}</figcaption>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="flex min-h-[44px] items-center gap-2 rounded-chip border border-[color:var(--border-default)] bg-[color:var(--bg-page)] px-4 text-[14px] font-semibold"
              >
                <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <div className="ecg-fig overflow-hidden rounded-[20px] bg-white">
            <svg role="img" aria-label={c.alt} viewBox="0 0 520 610" className="block h-auto w-full">
              {/* The person: legs and arms as outlined tubes, then the body over the joins. */}
              <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                {["M236 262 L231 446", "M284 262 L289 446", "M204 118 C186 130 178 150 176 176 L170 246", "M316 118 C334 130 342 150 344 176 L350 246"].map((d) => (
                  <Fragment key={d}>
                    <path d={d} stroke={INK} strokeWidth="27" />
                    <path d={d} stroke={PAPER} strokeWidth="22.6" />
                  </Fragment>
                ))}
                <path
                  d="M206 108 C230 98 290 98 314 108 C324 112 328 122 326 136 L318 236 C316 250 306 258 292 260 L228 260 C214 258 204 250 202 236 L194 136 C192 122 196 112 206 108 Z"
                  fill={PAPER}
                  stroke={INK}
                  strokeWidth="2.2"
                />
                <path d="M248 82 L248 100 M272 82 L272 100" stroke={INK} strokeWidth="2.2" />
                <circle cx="260" cy="54" r="30" fill={PAPER} stroke={INK} strokeWidth="2.2" />
              </g>

              {/* The stickers, one by one. */}
              <g key={`st-${cycle}`}>
                {STICKERS.map(([x, y], i) => (
                  <g key={i} className={anim && s === 0 ? "ecg-pop" : undefined} style={anim && s === 0 ? { animationDelay: `${i * 190}ms` } : undefined}>
                    {anim && s === 0 ? (
                      <circle className="ecg-ring" cx={x} cy={y} r="7" fill="none" stroke={STICKER} strokeWidth="2" style={{ animationDelay: `${i * 190 + 200}ms` }} />
                    ) : null}
                    <circle cx={x} cy={y} r="7.5" fill={PAPER} stroke={STICKER} strokeWidth="2.4" />
                    <circle cx={x} cy={y} r="2.6" fill={STICKER} />
                  </g>
                ))}
              </g>

              {/* The paper strip and the tracing. */}
              <defs>
                <pattern id="ecg-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M12 0 L0 0 0 12" fill="none" stroke="#F3C9BE" strokeWidth=".8" />
                </pattern>
              </defs>
              <rect x="16" y="478" width="488" height="116" rx="12" fill="#FFF5F2" />
              <rect x="16" y="478" width="488" height="116" rx="12" fill="url(#ecg-grid)" />
              <text x="30" y="500" fontSize="13" fontWeight="600" fill="var(--rm-ink-2)">
                {c.stripLabel}
              </text>

              {/* Highlights for the three parts of one beat. */}
              {(["p", "qrs", "t"] as const).map((k) => {
                const [a, b] = PART[k];
                const on = parts.includes(k);
                const now = current?.k === k;
                return (
                  <g key={k} style={{ opacity: on ? 1 : 0, transition: anim ? "opacity 300ms cubic-bezier(.2,.8,.2,1)" : undefined }}>
                    <rect x={a} y={BASE - 58} width={b - a} height="76" rx="8" fill={WAVE[k]} opacity={now || reduced ? 0.2 : 0.1} />
                    <text
                      key={`${k}-${cycle}`}
                      className={on && anim ? "ecg-label" : undefined}
                      x={(a + b) / 2}
                      // The spike's label sits above the strip line; the two softer parts are labelled below.
                      y={k === "qrs" ? BASE - 62 : BASE + 33}
                      textAnchor="middle"
                      fontSize="12.5"
                      fontWeight="700"
                      fill={WAVE[k]}
                    >
                      {c.waveLabels[k]}
                    </text>
                  </g>
                );
              })}

              <path
                d={TRACE}
                pathLength={100}
                fill="none"
                stroke={INK}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: showTrace ? 0 : 100,
                  transition: anim && s === 1 ? `stroke-dashoffset ${STEP_MS - 500}ms linear` : "none",
                }}
              />
            </svg>
          </div>
          {/* What the picture is showing right now, for everyone. */}
          <p className="text-[14px] text-secondary">
            <span className="font-semibold text-primary">{current?.t}.</span> {current?.d}
          </p>
        </figure>
      </div>
    </Section>
  );
}
