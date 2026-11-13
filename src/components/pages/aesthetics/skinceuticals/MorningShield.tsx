"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { scShield as c } from "@/content/aes-skinceuticals";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Long enough to read a step at a calm pace. */
const STEP_MS = 6000;
/** Illustration tones (the skin is not a brand colour). */
const SKIN = "#F4D9C8";
const DERMIS = "#ECC3AE";
const FIBRE = "#D9A68F";
const SURFACE = 270;
const SERUM_TOP = 257;
const SCREEN_TOP = 236;

/** Sun rays: from near the sun to a point on the skin surface. */
const rays = [
  { x0: 128, y0: 96, x1: 214 },
  { x0: 140, y0: 86, x1: 318 },
  { x0: 136, y0: 104, x1: 420 },
  { x0: 122, y0: 112, x1: 150 },
];
/** Where a ray meets a given height. */
const at = (r: (typeof rays)[number], y: number) =>
  r.x0 + ((r.x1 - r.x0) * (y - r.y0)) / (SURFACE - r.y0);

const particles = [
  { x: 470, y: 40, r: 5, d: 0 },
  { x: 520, y: 70, r: 3.5, d: 1.2 },
  { x: 560, y: 30, r: 4.5, d: 2.1 },
  { x: 600, y: 80, r: 3, d: 0.6 },
  { x: 500, y: 110, r: 4, d: 2.8 },
  { x: 585, y: 130, r: 3.5, d: 1.7 },
];
const sparks = [
  { x: 196, y: 286, d: 0 },
  { x: 236, y: 296, d: 0.4 },
  { x: 300, y: 284, d: 0.9 },
  { x: 344, y: 300, d: 0.2 },
  { x: 404, y: 288, d: 0.7 },
  { x: 470, y: 296, d: 1.1 },
  { x: 540, y: 285, d: 0.5 },
];

/** A gentle wave along the skin, offset vertically. */
const wave = (y: number) =>
  `M0 ${y} C 80 ${y - 6}, 160 ${y + 6}, 240 ${y} S 400 ${y - 6}, 480 ${y} S 600 ${y + 4}, 640 ${y}`;
/** A layer from a wavy top down to a straight line just inside the layer below. */
const band = (top: number, bottom: number) =>
  `${wave(top)} L640 ${bottom} L0 ${bottom} Z`;

const css = `
@keyframes sc-ray { to { stroke-dashoffset: -48; } }
@keyframes sc-drift { 0% { transform: translate(0, 0); opacity: 0; } 15% { opacity: .85; } 85% { opacity: .85; } 100% { transform: translate(-60px, 120px); opacity: 0; } }
@keyframes sc-spark { 0%, 100% { transform: scale(.7) rotate(0deg); } 50% { transform: scale(1.15) rotate(25deg); } }
@keyframes sc-catch { 0% { r: 3; opacity: .9; } 100% { r: 16; opacity: 0; } }
@keyframes sc-reflect { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 36; } }
@keyframes sc-drop { 0% { transform: translateY(-70px); opacity: 0; } 60% { opacity: 1; } 100% { transform: translateY(0); opacity: 0; } }
.sc-shield .sc-a-ray { animation: sc-ray 1.1s linear infinite; }
.sc-shield .sc-a-drift { animation: sc-drift 5.5s cubic-bezier(.2,.8,.2,1) infinite; }
.sc-shield .sc-a-spark { animation: sc-spark 1.4s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
.sc-shield .sc-a-catch { animation: sc-catch 1.8s cubic-bezier(.2,.8,.2,1) infinite; }
.sc-shield .sc-a-reflect { animation: sc-reflect 1.1s linear infinite; }
.sc-shield .sc-a-drop { animation: sc-drop 1.6s cubic-bezier(.2,.8,.2,1) both; }
.sc-shield .sc-layer { transition: transform 600ms cubic-bezier(.2,.8,.2,1), opacity 600ms cubic-bezier(.2,.8,.2,1); }
.sc-shield .sc-fade { transition: opacity 500ms cubic-bezier(.2,.8,.2,1); }
@media (prefers-reduced-motion: reduce) { .sc-shield .sc-layer, .sc-shield .sc-fade { transition: none; } }
:root[data-theme="contrast"] .sc-shield [data-dim] { opacity: 1 !important; }
`;

/**
 * "The morning shield": why a vitamin C serum goes under sunscreen. Bare skin takes sun rays and pollution, which set
 * off sparks (free radicals). Step 1 drops a serum layer in that catches the sparks; step 2 adds a mineral sunscreen
 * that reflects the rays. Buttons choose a step; it also plays on its own while on screen. Pause stops it; still with
 * reduced motion; full strength in high contrast. Education only, not a measure of protection.
 */
export function MorningShield() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(
      () => setStep((s) => (s + 1) % c.steps.length),
      STEP_MS,
    );
    return () => window.clearInterval(t);
  }, [moving]);

  const anim = !reduced && inView;
  const serum = step >= 1;
  const screen = step >= 2;
  const rayEnd = screen ? SCREEN_TOP : SURFACE;

  return (
    <Section id="morning-shield" className="sc-shield scroll-mt-24">
      <style>{css}</style>
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label={c.title}
          >
            {c.steps.map((s, i) => (
              <button
                key={s.label}
                type="button"
                aria-pressed={step === i}
                onClick={() => {
                  setStep(i);
                  setPlaying(false);
                }}
                className={cn(
                  "min-h-[44px] rounded-chip border-[1.5px] px-4 text-[14px] font-semibold transition-colors",
                  step === i
                    ? "border-ink bg-ink text-white"
                    : "border-border bg-white text-primary hover:border-ink",
                )}
              >
                {s.label}
              </button>
            ))}
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="min-h-[44px] rounded-chip px-3 text-[14px] font-semibold text-link underline-offset-4 hover:underline"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <ol className="flex flex-col gap-3">
            {c.steps.map((s, i) => (
              <li
                key={s.t}
                data-dim
                className={cn(
                  "sc-fade flex gap-3 rounded-[16px] p-3.5",
                  step === i && "bg-white",
                )}
                style={{ opacity: step === i ? 1 : 0.6 }}
                aria-current={step === i ? "step" : undefined}
              >
                <span
                  aria-hidden
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-lilac-deep text-[13px] font-semibold text-white"
                >
                  {i === 0 ? "0" : i}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[16px] font-semibold">{s.t}</span>
                  <span className="pretty text-[14px] leading-[1.5] text-secondary">
                    {s.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <figure className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-[24px] bg-white">
            <svg
              viewBox="0 0 640 380"
              role="img"
              aria-label={`${c.figure} ${c.steps[step].t}.`}
              className="block h-auto w-full"
            >
              <defs>
                <linearGradient id="sc-sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FFF6DA" />
                  <stop offset="1" stopColor="#FBF8FD" />
                </linearGradient>
                <radialGradient id="sc-glow">
                  <stop
                    offset="0"
                    stopColor="var(--rm-sun)"
                    stopOpacity=".55"
                  />
                  <stop offset="1" stopColor="var(--rm-sun)" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="sc-mineral"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="10" height="10" fill="#FFFFFF" />
                  <circle cx="3" cy="3" r="1.4" fill="#D7DEE6" />
                  <circle cx="8" cy="7" r="1" fill="#E4E9EF" />
                </pattern>
              </defs>
              <rect width="640" height="380" fill="url(#sc-sky)" />

              {/* Sun */}
              <circle cx="96" cy="72" r="70" fill="url(#sc-glow)" />
              <circle cx="96" cy="72" r="34" fill="var(--rm-sun)" />

              {/* Pollution drifting in */}
              <g aria-hidden>
                {particles.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={p.r}
                    fill="#8A949E"
                    className={anim ? "sc-a-drift" : undefined}
                    style={{
                      animationDelay: `${p.d}s`,
                      opacity: anim ? undefined : 0.7,
                    }}
                  />
                ))}
              </g>

              {/* Rays: stop at the sunscreen once it is on, and bounce back */}
              <g aria-hidden>
                {rays.map((r, i) => {
                  const xe = at(r, rayEnd);
                  return (
                    <g key={i}>
                      <line
                        x1={r.x0}
                        y1={r.y0}
                        x2={xe}
                        y2={rayEnd}
                        stroke="#F2B134"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="10 14"
                        className={anim ? "sc-a-ray" : undefined}
                      />
                      {screen ? (
                        <line
                          x1={xe}
                          y1={rayEnd}
                          x2={xe + 34}
                          y2={rayEnd - 58}
                          stroke="#F2B134"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeDasharray="8 10"
                          opacity=".8"
                          className={anim ? "sc-a-reflect" : undefined}
                        />
                      ) : null}
                    </g>
                  );
                })}
              </g>

              {/* Skin: surface layer and the deeper layer with collagen fibres */}
              <path d={`${wave(SURFACE)} L640 380 L0 380 Z`} fill={SKIN} />
              <path d={`${wave(314)} L640 380 L0 380 Z`} fill={DERMIS} />
              <g
                aria-hidden
                fill="none"
                stroke={FIBRE}
                strokeWidth="2"
                strokeLinecap="round"
                opacity=".7"
              >
                <path d="M30 340 C 90 326, 140 352, 200 338 S 300 330, 340 344" />
                <path d="M300 360 C 360 346, 420 370, 480 354 S 580 350, 620 362" />
                <path d="M120 366 C 170 356, 220 372, 260 362" />
              </g>

              {/* Free radicals: sparks in the skin, caught once the serum is on */}
              <g
                aria-hidden
                className="sc-fade"
                style={{ opacity: serum ? 0 : 1 }}
              >
                {sparks.map((s, i) => (
                  <path
                    key={i}
                    d={`M${s.x} ${s.y - 9} L${s.x + 2.5} ${s.y - 2.5} L${s.x + 9} ${s.y} L${s.x + 2.5} ${s.y + 2.5} L${s.x} ${s.y + 9} L${s.x - 2.5} ${s.y + 2.5} L${s.x - 9} ${s.y} L${s.x - 2.5} ${s.y - 2.5} Z`}
                    fill="#E0533A"
                    className={anim ? "sc-a-spark" : undefined}
                    style={{ animationDelay: `${s.d}s` }}
                  />
                ))}
              </g>

              {/* Step 1: vitamin C serum, a thin golden layer */}
              <g
                className="sc-layer"
                style={{
                  opacity: serum ? 1 : 0,
                  transform: serum ? "translateY(0)" : "translateY(-40px)",
                }}
              >
                <path
                  d={band(SERUM_TOP, SURFACE + 3)}
                  fill="var(--rm-sun)"
                  opacity=".7"
                />
                <path
                  d={wave(SERUM_TOP)}
                  fill="none"
                  stroke="#E2A800"
                  strokeWidth="1.5"
                  opacity=".8"
                />
                {serum && anim && step === 1
                  ? [220, 330, 440].map((x, i) => (
                      <circle
                        key={x}
                        cx={x}
                        cy={SERUM_TOP - 6}
                        r="6"
                        fill="var(--rm-sun)"
                        className="sc-a-drop"
                        style={{ animationDelay: `${i * 0.25}s` }}
                      />
                    ))
                  : null}
                {serum
                  ? sparks.map((s, i) => (
                      <circle
                        key={i}
                        cx={s.x}
                        cy={SERUM_TOP + 6}
                        r={anim ? 3 : 5}
                        fill="none"
                        stroke="#C98F00"
                        strokeWidth="2"
                        className={anim ? "sc-a-catch" : undefined}
                        style={{ animationDelay: `${s.d + 0.3}s` }}
                      />
                    ))
                  : null}
              </g>

              {/* Step 2: mineral sunscreen on top */}
              <g
                className="sc-layer"
                style={{
                  opacity: screen ? 1 : 0,
                  transform: screen ? "translateY(0)" : "translateY(-40px)",
                }}
              >
                <path
                  d={band(SCREEN_TOP, SERUM_TOP + 3)}
                  fill="url(#sc-mineral)"
                />
                <path
                  d={wave(SCREEN_TOP)}
                  fill="none"
                  stroke="var(--rm-lilac-deep)"
                  strokeWidth="2"
                  opacity=".55"
                />
              </g>
            </svg>
          </div>
          <figcaption className="flex flex-col gap-2.5">
            <ul
              aria-hidden
              className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-secondary"
            >
              <li className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#F2B134" }}
                />
                Sun rays
              </li>
              <li className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#8A949E" }}
                />
                Pollution
              </li>
              <li className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#E0533A" }}
                />
                Free radicals
              </li>
              <li className="flex items-center gap-1.5">
                <span
                  className="h-3 w-3 rounded-[3px]"
                  style={{ background: "var(--rm-sun)" }}
                />
                Vitamin C serum
              </li>
              <li className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-[3px] border border-ink-3 bg-white" />
                Sunscreen
              </li>
            </ul>
            <span className="text-[13px] text-muted">{c.note}</span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
