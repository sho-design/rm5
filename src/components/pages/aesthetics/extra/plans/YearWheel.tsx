"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { planMonths, plansCopy as c, seasons } from "@/content/aes-plans";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { torontoDate } from "@/lib/hours";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

/** Long enough to read a month's card at a calm pace. */
const STEP_MS = 5000;
const CX = 200;
const R_OUT = 182;
const R_IN = 118;

/** A ring segment from angle a to b (degrees, 0 at the top, clockwise). */
function arc(a: number, b: number, r1: number, r2: number) {
  const p = (r: number, deg: number) => {
    const t = ((deg - 90) * Math.PI) / 180;
    return `${(CX + r * Math.cos(t)).toFixed(2)} ${(CX + r * Math.sin(t)).toFixed(2)}`;
  };
  return `M${p(r2, a)} A${r2} ${r2} 0 0 1 ${p(r2, b)} L${p(r1, b)} A${r1} ${r1} 0 0 0 ${p(r1, a)} Z`;
}
const at = (r: number, deg: number) => {
  const t = ((deg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(t), y: CX + r * Math.sin(t) };
};

/**
 * "A year of care": a wheel of the twelve months in season colours. When it comes into view it turns to this
 * month (Toronto time), then walks through the year while on screen; Pause stops it, a month button picks one.
 * The card beside it says what usually fits that month. Still with reduced motion; full strength in high
 * contrast. Seasonal guidance is draft, for the nurse to confirm (content/aes-plans.ts).
 */
export function YearWheel() {
  const reduced = useReducedMotion();
  const [today, setToday] = useState(0);
  const [sel, setSel] = useState(0);
  const [rot, setRot] = useState(-15);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [shown, setShown] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // This month, in Toronto.
  useEffect(() => {
    const m = torontoDate().getUTCMonth();
    setToday(m);
    setSel(m);
    if (reduced) setRot(-(m * 30 + 15));
  }, [reduced]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Turn the wheel the short way round to the chosen month.
  const turnTo = (i: number) => {
    setRot((r) => {
      const target = -(i * 30 + 15);
      let d = ((((target - r) % 360) + 540) % 360) - 180;
      if (d === -180) d = 180;
      return r + d;
    });
    setSel(i);
  };

  // First time on screen: turn from January to this month.
  useEffect(() => {
    if (!inView || shown) return;
    setShown(true);
    turnTo(today);
  }, [inView, shown, today]);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => turnTo((sel + 1) % 12), STEP_MS);
    return () => window.clearInterval(t);
  }, [moving, sel]);

  const pick = (i: number) => {
    setPlaying(false);
    turnTo(i);
  };

  const month = planMonths[sel];
  const season = seasons[month.season];
  const ease = reduced ? "none" : "transform 900ms cubic-bezier(.2,.8,.2,1)";
  const todayAt = at(R_OUT + 10, today * 30 + 15);

  return (
    <Section id="year" className="scroll-mt-24">
      <style>{`
        @keyframes yr-pulse { 0%,100% { opacity: .9; transform: scale(1) } 50% { opacity: .35; transform: scale(1.8) } }
        .yr-pulse { transform-box: fill-box; transform-origin: center; animation: yr-pulse 2.4s ease-in-out infinite; }
        .yr-paused .yr-pulse { animation-play-state: paused; }
        @keyframes yr-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        .yr-card { animation: yr-in 360ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .yr-pulse, .yr-card { animation: none } }
        :root[data-theme="contrast"] .yr-seg { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className={cn(
          "grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-12",
          !moving && "yr-paused",
        )}
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
            role="radiogroup"
            aria-label={c.months}
            onKeyDown={radioKeys}
            className="grid grid-cols-4 gap-1.5 sm:grid-cols-6"
          >
            {planMonths.map((m, i) => {
              const on = i === sel;
              return (
                <button
                  key={m.short}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={rovingTab(on, i, true)}
                  aria-label={`${m.m}${i === today ? `, ${c.now}` : ""}`}
                  onClick={() => pick(i)}
                  className={cn(
                    "relative flex min-h-[44px] items-center justify-center rounded-[12px] border text-[14px] font-semibold transition-colors",
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-white/0 bg-white/70 hover:border-ink",
                  )}
                >
                  {m.short}
                  {i === today ? (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full",
                        on ? "bg-sun" : "bg-lilac-deep",
                      )}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            key={sel}
            className="yr-card flex flex-col gap-3 rounded-card bg-white p-5 md:p-6"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[24px] font-medium leading-[1.1]">
                {month.m}
              </h3>
              <span
                className="rounded-chip px-2.5 py-1 text-[13px] font-semibold"
                style={{ background: season.tint }}
              >
                {season.t}
              </span>
              {sel === today ? (
                <span className="rounded-chip bg-ink px-2.5 py-1 text-[13px] font-semibold text-white">
                  {c.now}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-lilac-text">
                {c.fits}
              </span>
              <ul className="flex flex-col gap-1.5 text-[15px] leading-[1.45]">
                {month.fits.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                      style={{ background: season.color }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="pretty text-[14px] leading-[1.5] text-secondary">
              <span className="font-semibold text-primary">{c.mind}: </span>
              {month.mind}
            </p>
            {month.review ? (
              <span className="w-fit rounded-chip bg-lilac-tint px-3 py-1.5 text-[13px] font-semibold text-lilac-text">
                {c.review}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-muted">
              {c.illustration}
            </span>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="min-h-[44px] rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[13px] font-semibold hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <div className="relative mx-auto w-full max-w-[460px]">
            <svg
              viewBox="0 0 400 400"
              className="h-auto w-full"
              role="img"
              aria-label={c.figure(month.m, season.t)}
            >
              {/* Pointer at the top: the month under it is the one shown. */}
              <path
                d="M200 6 L190 -8 L210 -8 Z"
                fill="var(--rm-ink)"
                transform="translate(0 14)"
              />
              <g
                style={{
                  transform: `rotate(${rot}deg)`,
                  transformOrigin: "200px 200px",
                  transition: ease,
                }}
              >
                {planMonths.map((m, i) => {
                  const s = seasons[m.season];
                  const on = i === sel;
                  const mid = at((R_OUT + R_IN) / 2, i * 30 + 15);
                  return (
                    <g key={m.short}>
                      <path
                        className="yr-seg"
                        d={arc(i * 30 + 1, i * 30 + 29, R_IN, R_OUT)}
                        fill={on ? s.ink : s.tint}
                        stroke={s.color}
                        strokeWidth={on ? 0 : 1.5}
                        opacity={on ? 1 : 0.92}
                        style={{
                          transition: reduced
                            ? "none"
                            : "fill 350ms cubic-bezier(.2,.8,.2,1)",
                        }}
                      />
                      <text
                        x={mid.x}
                        y={mid.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="17"
                        fontWeight="600"
                        fill={on ? "#FFFFFF" : "var(--rm-ink)"}
                        style={{
                          transform: `rotate(${-rot}deg)`,
                          transformBox: "fill-box",
                          transformOrigin: "center",
                          transition: ease,
                        }}
                      >
                        {m.short}
                      </text>
                      {m.review ? (
                        <circle
                          cx={at(R_IN - 10, i * 30 + 15).x}
                          cy={at(R_IN - 10, i * 30 + 15).y}
                          r="4"
                          fill="var(--rm-lilac-deep)"
                        />
                      ) : null}
                    </g>
                  );
                })}
                {/* This month: a small pulsing marker outside the ring. */}
                <circle
                  className="yr-pulse"
                  cx={todayAt.x}
                  cy={todayAt.y}
                  r="5"
                  fill="var(--rm-lilac-deep)"
                />
                <circle
                  cx={todayAt.x}
                  cy={todayAt.y}
                  r="4"
                  fill="var(--rm-lilac-deep)"
                />
              </g>
              {/* Centre: the chosen month and season, upright. */}
              <circle cx={CX} cy={CX} r={R_IN - 24} fill="#FFFFFF" />
              <text
                x={CX}
                y={CX - 10}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="34"
                fontWeight="500"
                fill="var(--rm-ink)"
              >
                {month.m}
              </text>
              <text
                x={CX}
                y={CX + 22}
                textAnchor="middle"
                fontSize="15"
                fontWeight="600"
                fill={season.ink}
              >
                {season.t}
              </text>
            </svg>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[13px] text-secondary">
            {Object.values(seasons).map((s) => (
              <span key={s.t} className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: s.color }}
                />
                {s.t}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full bg-lilac-deep"
              />
              {c.review}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <h3 className="text-[17px] font-semibold">{c.allYearTitle}</h3>
          <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
            {c.allYear.map((a) => (
              <li
                key={a.t}
                className="flex flex-col gap-1 rounded-card bg-white/80 p-4"
              >
                {a.link ? (
                  <a
                    href={a.link}
                    className="text-[16px] font-semibold text-link"
                  >
                    {a.t} ›
                  </a>
                ) : (
                  <span className="text-[16px] font-semibold">{a.t}</span>
                )}
                <span className="pretty text-[14px] leading-[1.45] text-secondary">
                  {a.d}
                </span>
              </li>
            ))}
          </ul>
          <Button to={bookFor("aesthetics", "consult")} className="self-start">
            {c.cta}
          </Button>
        </div>
      </div>
    </Section>
  );
}
