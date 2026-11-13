"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import {
  metabolicPath as c,
  type MetabolicStep,
} from "@/content/inf-metabolic";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const STEP_MS = 5200;
const SAGE = "#3D9B78";
const SAGE_INK = "#2C4A3A";
const LINE = "#C9DCCF";

/**
 * "What the program looks like" on the metabolic program page: six stops on a path, from screening to next steps.
 * Process only, never results. The path draws up to the current stop and a dot travels along it; the steps move
 * on by themselves only while the section is on screen and playing. Tapping a stop shows it and stops the
 * movement. With reduced motion everything is still. Copy: content/inf-metabolic.ts.
 */
export function MetabolicPath() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const n = c.steps.length;

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
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), STEP_MS);
    return () => window.clearInterval(t);
  }, [moving, n]);

  const pick = (i: number) => {
    setActive(i);
    setPlaying(false);
  };
  const step = c.steps[active];
  const frac = n > 1 ? active / (n - 1) : 0;
  const ease = reduced ? undefined : "cubic-bezier(.2,.8,.2,1)";

  return (
    <Section id="program" className="scroll-mt-24">
      <style>{`
        @keyframes mb-pulse { 0% { r: 14; opacity: .55 } 100% { r: 26; opacity: 0 } }
        @keyframes mb-rise { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        .mb-pulse { animation: mb-pulse 1600ms cubic-bezier(.2,.8,.2,1) infinite; }
        .mb-still .mb-pulse { animation-play-state: paused; opacity: 0; }
        .mb-rise { animation: mb-rise 350ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .mb-pulse, .mb-rise { animation: none !important; } .mb-pulse { opacity: 0; } }
        :root[data-theme="contrast"] .mb-figure { outline: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .mb-step { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className={cn(
          "flex flex-col gap-8 rounded-block bg-[color:var(--div-infusion)] p-6 text-ink md:p-10 lg:p-12",
          !moving && "mb-still",
        )}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-[720px] flex-col gap-3">
            <Eyebrow tone="inherit" className="text-sage-text">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">
              {c.lead}
            </p>
          </div>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[44px] w-fit shrink-0 rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold hover:border-ink"
            >
              {playing ? c.pause : c.play}
            </button>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-sage-text">
            {c.illustration}
          </span>
          <div className="mb-figure rounded-[24px] bg-page p-4 shadow-card md:p-6">
            {/* Wide: a horizontal path. */}
            <svg
              viewBox="0 0 720 120"
              role="img"
              aria-label={c.figure}
              className="hidden h-auto w-full md:block"
            >
              <PathRow n={n} active={active} frac={frac} ease={ease} />
            </svg>
            {/* Phones: the same path, upright. */}
            <svg
              viewBox="0 0 120 420"
              role="img"
              aria-label={c.figure}
              className="mx-auto block h-[300px] w-auto md:hidden"
            >
              <PathCol n={n} active={active} frac={frac} ease={ease} />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          <ol className="flex flex-col gap-2">
            {c.steps.map((s, i) => {
              const on = i === active;
              return (
                <li key={s.k}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "mb-step flex min-h-[48px] w-full items-center gap-3 rounded-card px-4 py-2.5 text-left transition-colors",
                      on ? "bg-page shadow-card" : "hover:bg-white/60",
                    )}
                    style={{
                      opacity: reduced || on ? 1 : 0.7,
                      transition: ease
                        ? `opacity 300ms ${ease}, background-color 300ms ${ease}`
                        : undefined,
                    }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold",
                        on || i < active
                          ? "bg-sage-deep text-white"
                          : "bg-white text-muted",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-[16px] font-semibold">{s.t}</span>
                      <span className="text-[13px] text-sage-text">
                        {s.tag}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <div
            aria-live="polite"
            className="flex flex-col gap-3 self-start rounded-card bg-page p-6 shadow-card md:p-8"
          >
            <div key={step.k} className={reduced ? undefined : "mb-rise"}>
              <span className="text-[13px] font-semibold text-sage-text">
                {step.tag}
              </span>
              <h3 className="mt-1 font-display text-[26px] font-medium leading-[1.1]">
                {step.t}
              </h3>
              <p className="pretty mt-3 text-[16px] leading-[1.55] text-secondary">
                {step.d}
              </p>
            </div>
          </div>
        </div>

        <p className="pretty border-t border-white/80 pt-5 text-[14px] leading-[1.5] text-secondary">
          {c.timing}
        </p>
      </div>
    </Section>
  );
}

type RowProps = { n: number; active: number; frac: number; ease?: string };

function Stop({
  x,
  y,
  i,
  active,
  k,
}: {
  x: number;
  y: number;
  i: number;
  active: number;
  k: MetabolicStep["k"];
}) {
  const on = i === active;
  const done = i < active;
  return (
    <g data-k={k}>
      {on ? (
        <circle cx={x} cy={y} r="14" fill={SAGE} className="mb-pulse" />
      ) : null}
      <circle
        cx={x}
        cy={y}
        r={on ? 15 : 11}
        fill={on || done ? SAGE : "#FFFFFF"}
        stroke={on || done ? SAGE_INK : LINE}
        strokeWidth="3"
      />
      <text
        x={x}
        y={y + 4.5}
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fill={on || done ? "#FFFFFF" : SAGE_INK}
      >
        {i + 1}
      </text>
    </g>
  );
}

function PathRow({ n, active, frac, ease }: RowProps) {
  const x0 = 50;
  const x1 = 670;
  const y = 60;
  const xs = Array.from(
    { length: n },
    (_, i) => x0 + ((x1 - x0) * i) / (n - 1),
  );
  const d = `M${x0} ${y} H${x1}`;
  return (
    <g>
      <path
        d={d}
        stroke={LINE}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={d}
        stroke={SAGE}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        style={{
          strokeDashoffset: 1 - frac,
          transition: ease ? `stroke-dashoffset 400ms ${ease}` : undefined,
        }}
      />
      {xs.map((x, i) => (
        <Stop key={i} x={x} y={y} i={i} active={active} k={c.steps[i].k} />
      ))}
      <circle
        r="5"
        cy={y - 26}
        cx={0}
        fill={SAGE_INK}
        style={{
          transform: `translateX(${xs[active]}px)`,
          transition: ease ? `transform 400ms ${ease}` : undefined,
        }}
      />
    </g>
  );
}

function PathCol({ n, active, frac, ease }: RowProps) {
  const y0 = 30;
  const y1 = 390;
  const x = 60;
  const ys = Array.from(
    { length: n },
    (_, i) => y0 + ((y1 - y0) * i) / (n - 1),
  );
  const d = `M${x} ${y0} V${y1}`;
  return (
    <g>
      <path
        d={d}
        stroke={LINE}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={d}
        stroke={SAGE}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        pathLength={1}
        strokeDasharray="1"
        style={{
          strokeDashoffset: 1 - frac,
          transition: ease ? `stroke-dashoffset 400ms ${ease}` : undefined,
        }}
      />
      {ys.map((y, i) => (
        <Stop key={i} x={x} y={y} i={i} active={active} k={c.steps[i].k} />
      ))}
      <circle
        r="5"
        cx={x + 28}
        cy={0}
        fill={SAGE_INK}
        style={{
          transform: `translateY(${ys[active]}px)`,
          transition: ease ? `transform 400ms ${ease}` : undefined,
        }}
      />
    </g>
  );
}
