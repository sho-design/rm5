"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { hydraExplainer as c } from "@/content/aes-skin";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Long enough to read each step at a calm pace, as on the iron and Pain Centre diagrams. */
const STEP_MS = 7000;
const LILAC = "#8E5FB5";
const DEEP = "#5E4782";
const SERUM = "#7FB8F0";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - (1 - clamp(x)) ** 3;

/** Skin flakes on the surface before the peel lifts them: x, tilt, size. */
const FLAKES: [number, number, number][] = [
  [70, -8, 26],
  [118, 6, 22],
  [170, -4, 28],
  [226, 9, 20],
  [262, -10, 18],
  [384, 7, 20],
  [426, -6, 26],
  [480, 8, 22],
  [532, -5, 28],
  [580, 6, 20],
];

/**
 * "Inside a HydraFacial" (Nov 2026): a magnified pore through the three passes of the treatment. Cleanse and
 * peel (a swirl lifts the dead cells off the surface), extract (a vortex draws the plug out and the pore
 * narrows) and hydrate (serum drops soak in and the surface smooths). One continuous position drives the whole
 * picture, so the slider scrubs it smoothly. Plays only while on screen; Pause, a step or the slider stops it;
 * a still key frame with reduced motion; full strength in high contrast. Education only, not results.
 */
export function HydraExplainer() {
  const reduced = useReducedMotion();
  const [p, setP] = useState(0.15);
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

  // Reduced motion: a still frame near the end of the current step, where its result shows.
  useEffect(() => {
    if (reduced) setP((v) => Math.min(2.9, Math.floor(v) + 0.85));
  }, [reduced]);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setP((v) => (v + dt / STEP_MS) % 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [moving]);

  const step = Math.min(2, Math.floor(p));
  const t = p - step;

  // Where each piece is at position p.
  const peel = step === 0 ? ease(t * 1.15) : 1; // flakes lifted
  const extract = step === 0 ? 0 : step === 1 ? ease((t - 0.1) / 0.75) : 1; // plug out
  const tighten = step === 0 ? 0 : step === 1 ? ease((t - 0.45) / 0.5) : 1;
  const smooth = step === 2 ? ease(t / 0.8) : 0;
  const pw = 1 - 0.32 * tighten;
  const tipX =
    step === 0 ? 150 + 340 * ease(t) : step === 1 ? 320 : 470 - 300 * t;
  const tipY = step === 1 ? 70 : 52;
  const spin = p * 820;
  const amp = 7 * (1 - smooth);

  // Skin surface: a gentle wave that flattens as it is hydrated.
  let surface = `M 0 214`;
  for (let x = 0; x <= 640; x += 20)
    surface += ` L ${x} ${214 + Math.sin(x / 26) * amp + Math.sin(x / 9) * amp * 0.35}`;

  const poreTop = 34 * pw;
  const poreBottom = 11 * pw;
  const pore = `M ${320 - poreTop} 212 C ${320 - poreTop * 0.7} 250, ${320 - poreBottom} 290, ${320 - poreBottom} 334 L ${320 + poreBottom} 334 C ${320 + poreBottom} 290, ${320 + poreTop * 0.7} 250, ${320 + poreTop} 212 Z`;

  const plugY = 276 - 190 * extract;
  const plugS = 1 - 0.65 * extract;
  const plugO = extract > 0.85 ? clamp(1 - (extract - 0.85) / 0.15) : 1;

  const pick = (i: number) => {
    setPlaying(false);
    setP(i + 0.85);
  };

  return (
    <Section id="inside-hydrafacial" className="scroll-mt-24">
      <div
        ref={box}
        className="sk-hydra grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:p-12"
      >
        <div className="flex flex-col gap-4">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>

        <figure className="m-0 flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-center">
          <svg
            viewBox="0 0 640 400"
            role="img"
            aria-label={c.steps[step].alt}
            className="h-auto w-full overflow-visible rounded-[24px] bg-white"
          >
            <defs>
              <linearGradient id="sk-dermis" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F6DCD0" />
                <stop offset="1" stopColor="#EFC9BA" />
              </linearGradient>
              <linearGradient id="sk-epi" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F9E5DA" />
                <stop offset="1" stopColor="#F4D7C9" />
              </linearGradient>
              <radialGradient id="sk-plug" cx="0.4" cy="0.35" r="0.7">
                <stop offset="0" stopColor="#FBE7A7" />
                <stop offset="1" stopColor="#D9B45E" />
              </radialGradient>
              <radialGradient id="sk-glow" cx="0.5" cy="0" r="0.8">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <clipPath id="sk-card">
                <rect x="0" y="0" width="640" height="400" rx="24" />
              </clipPath>
            </defs>

            <g clipPath="url(#sk-card)">
              {/* Skin: deeper layer, then the top layer with its surface wave. */}
              <rect
                x="0"
                y="200"
                width="640"
                height="200"
                fill="url(#sk-dermis)"
              />
              <path d={`${surface} L 640 262 L 0 262 Z`} fill="url(#sk-epi)" />
              <path
                d={surface}
                fill="none"
                stroke="#E7BFAE"
                strokeWidth="2.5"
              />
              {/* A soft sheen as the surface hydrates */}
              <path
                d={surface}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                opacity={0.85 * smooth}
              />
              <ellipse
                cx="320"
                cy="214"
                rx="300"
                ry="38"
                fill="url(#sk-glow)"
                opacity={0.6 * smooth}
              />

              {/* Little cells in the deeper layer, for texture */}
              {[60, 140, 210, 430, 500, 580].map((x, i) => (
                <circle
                  key={x}
                  cx={x}
                  cy={300 + (i % 2) * 40}
                  r="9"
                  fill="#F2CFC1"
                  stroke="#E5B9A7"
                  strokeWidth="1.5"
                />
              ))}

              {/* The pore, and the plug of oil and debris inside it */}
              <path d={pore} fill="#E3B7A6" stroke="#D9A592" strokeWidth="2" />
              <g
                transform={`translate(320 ${plugY}) scale(${plugS})`}
                opacity={plugO}
              >
                <ellipse cx="0" cy="0" rx="20" ry="34" fill="url(#sk-plug)" />
                <circle cx="-6" cy="-12" r="4" fill="#FFF4CF" opacity="0.8" />
              </g>

              {/* Dead cells on the surface, lifted away by the peel */}
              {FLAKES.map(([x, tilt, w], i) => {
                const lag = clamp(peel * 1.25 - (i % 5) * 0.06);
                return (
                  <rect
                    key={x}
                    x={x - w / 2}
                    y={206}
                    width={w}
                    height="7"
                    rx="3.5"
                    fill="#EFE3DA"
                    stroke="#D8C6B8"
                    strokeWidth="1.2"
                    opacity={1 - lag}
                    transform={`translate(${(tipX - x) * 0.25 * lag} ${-80 * lag}) rotate(${tilt + 160 * lag} ${x} 210)`}
                  />
                );
              })}

              {/* The swirl (cleanse and peel), then the vortex (extract) under the tip */}
              {step < 2 ? (
                <g
                  transform={`translate(${tipX} ${step === 1 ? 168 : 178}) rotate(${spin})`}
                  opacity={step === 0 ? 0.85 : 0.95}
                >
                  {[0, 1, 2].map((n) => (
                    <path
                      key={n}
                      d={
                        step === 1
                          ? "M 0 0 C 10 -4, 18 6, 12 16 C 4 28, -22 22, -24 2 C -26 -22, 6 -36, 30 -22"
                          : "M 0 0 C 14 -6, 26 8, 18 22 C 8 38, -30 32, -34 4 C -38 -30, 10 -48, 44 -30"
                      }
                      fill="none"
                      stroke={step === 1 ? DEEP : LILAC}
                      strokeWidth={step === 1 ? 3 : 2.5}
                      strokeLinecap="round"
                      opacity={1 - n * 0.28}
                      transform={`rotate(${n * 120})`}
                    />
                  ))}
                </g>
              ) : null}

              {/* Serum drops soaking in (hydrate) */}
              {step === 2
                ? [0, 1, 2, 3, 4, 5].map((j) => {
                    const ph = (t * 2.4 + j / 6) % 1;
                    const x = tipX - 50 + j * 20;
                    const y = 118 + ph * 96;
                    const sink = clamp((ph - 0.78) / 0.22);
                    return (
                      <path
                        key={j}
                        d={`M ${x} ${y - 9} C ${x + 6} ${y - 1}, ${x + 6} ${y + 6}, ${x} ${y + 6} C ${x - 6} ${y + 6}, ${x - 6} ${y - 1}, ${x} ${y - 9} Z`}
                        fill={SERUM}
                        opacity={(1 - sink) * 0.9}
                      />
                    );
                  })
                : null}

              {/* The handpiece tip */}
              <g transform={`translate(${tipX} ${tipY})`}>
                <rect
                  x="-26"
                  y="-60"
                  width="52"
                  height="88"
                  rx="20"
                  fill="#FFFFFF"
                  stroke="#CDBBDD"
                  strokeWidth="2"
                />
                <rect
                  x="-18"
                  y="18"
                  width="36"
                  height="24"
                  rx="10"
                  fill={step === 2 ? SERUM : LILAC}
                  opacity="0.85"
                />
                <rect
                  x="-10"
                  y="-46"
                  width="20"
                  height="6"
                  rx="3"
                  fill="#E6D8F0"
                />
                {step === 1 ? (
                  <ellipse
                    cx="0"
                    cy="34"
                    rx={6 + 10 * extract}
                    ry={3 + 4 * extract}
                    fill="#D9B45E"
                    opacity={0.35 + 0.4 * extract}
                  />
                ) : null}
              </g>

              {/* Step label */}
              <g transform="translate(22 22)">
                <rect
                  width={c.steps[step].t.length * 9.2 + 52}
                  height="34"
                  rx="17"
                  fill="#FFFFFF"
                  stroke="#E6D8F0"
                  strokeWidth="1.5"
                />
                <circle cx="17" cy="17" r="11" fill={DEEP} />
                <text
                  x="17"
                  y="22"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#FFFFFF"
                >
                  {step + 1}
                </text>
                <text
                  x="36"
                  y="22"
                  fontSize="15"
                  fontWeight="600"
                  fill="#2B1E3A"
                >
                  {c.steps[step].t}
                </text>
              </g>
            </g>
          </svg>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">
            {c.scrub}
            <input
              type="range"
              min={0}
              max={299}
              step={1}
              value={Math.round(p * 100)}
              aria-valuetext={`${c.steps[step].t}, step ${step + 1} of 3`}
              onChange={(e) => {
                setPlaying(false);
                setP(Number(e.target.value) / 100);
              }}
              className="sk-range w-full"
            />
          </label>
          <figcaption className="text-[13px] text-muted">{c.note}</figcaption>
        </figure>

        <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
          {reduced ? null : (
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              className="self-start rounded-chip border-[1.5px] border-border bg-white px-4 py-2 text-[13px] font-semibold hover:border-ink"
            >
              {playing ? c.pause : c.play}
            </button>
          )}
          <ol className="flex flex-col gap-1.5">
            {c.steps.map((s, i) => {
              const active = step === i;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => pick(i)}
                    className={cn(
                      "flex w-full gap-3.5 rounded-[18px] px-4 py-3 text-left motion-safe:transition-colors motion-safe:duration-300",
                      active
                        ? "bg-white shadow-[0_10px_30px_-18px_rgba(15,31,46,0.45)]"
                        : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                        active ? "text-white" : "bg-white text-ink-2",
                      )}
                      style={active ? { background: DEEP } : undefined}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold">{s.t}</span>
                      <span className="pretty text-[14px] leading-[1.5] text-secondary">
                        {s.d}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <style>{`
        .sk-range { accent-color: ${DEEP}; height: 28px; }
        :root[data-theme="contrast"] .sk-hydra { background: #FFFFFF; border: 2px solid #0F1F2E; }
      `}</style>
    </Section>
  );
}
