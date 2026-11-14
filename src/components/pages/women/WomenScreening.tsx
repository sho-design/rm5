"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { womenCopy, womenScreen } from "@/content/subpages";
import { lineCopy as c } from "@/content/women-extra";
import { routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const MIN = 20;
const MAX = 80;
const pct = (age: number) => ((age - MIN) / (MAX - MIN)) * 100;

/**
 * The four screenings as bands on an age ruler. Ages and intervals mirror the existing cards (womenScreen):
 * Pap every 3 years 25 to 69, mammogram every 2 years 40 to 74, FIT every 2 years 50 to 74, one bone density scan
 * at 65. Each band keeps its card (title, description, age range) from the data, by index.
 */
const BANDS = [
  { card: womenScreen[0], from: 25, to: 69, every: 3, color: "var(--rm-terracotta-deep)", tint: "#FDE8E4" },
  { card: womenScreen[1], from: 40, to: 74, every: 2, color: "var(--rm-amber-deep)", tint: "#FFF3C4" },
  { card: womenScreen[2], from: 50, to: 74, every: 2, color: "var(--rm-sage-deep)", tint: "#E6F4EA" },
  { card: womenScreen[3], from: 65, to: 65, every: 0, color: "var(--rm-sky)", tint: "#EEF5FC" },
] as const;

const ticks = (b: (typeof BANDS)[number]) => {
  if (!b.every) return [b.from];
  const out: number[] = [];
  for (let a = b.from; a <= b.to; a += b.every) out.push(a);
  return out;
};

/** Due at this age: inside the range; the one-time bone density scan counts from 65 on. */
const isDue = (b: (typeof BANDS)[number], age: number) => (b.every ? age >= b.from && age <= b.to : age >= b.from);

/**
 * "Your screening line" (women's health, November 2026). A ruler from 20 to 80 with a "your age" handle (a real
 * range input underneath, so arrow keys and screen readers work). The bands under the handle light up and the panel
 * shows what is due now and what comes up next, with each screening's existing description. On first view the bands
 * draw in left to right once; with reduced motion they are simply there. High contrast: full-strength bands.
 */
export function WomenScreening() {
  const reduced = useReducedMotion();
  const [age, setAge] = useState(45);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const due = BANDS.filter((b) => isDue(b, age));
  const next = BANDS.filter((b) => b.from > age).sort((a, b) => a.from - b.from)[0];
  const draw = seen && !reduced;

  return (
    <Section id="screening" className="rm-paper flex scroll-mt-24 flex-col gap-6">
      <style>{`
        @keyframes sl-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .sl-band { transform-origin: left center; transition: opacity 300ms cubic-bezier(.2,.8,.2,1); }
        .sl-band.sl-run { animation: sl-draw 700ms cubic-bezier(.2,.8,.2,1) both; }
        .sl-tick { transition: transform 300ms cubic-bezier(.2,.8,.2,1), opacity 300ms cubic-bezier(.2,.8,.2,1); }
        .sl-card { transition: opacity 300ms cubic-bezier(.2,.8,.2,1), transform 300ms cubic-bezier(.2,.8,.2,1); }
        .sl-range { -webkit-appearance: none; appearance: none; background: transparent; width: 100%; height: 44px; margin: 0; cursor: pointer; }
        .sl-range:focus-visible { outline: none; }
        .sl-range::-webkit-slider-runnable-track { height: 44px; background: transparent; }
        .sl-range::-moz-range-track { height: 44px; background: transparent; }
        .sl-range::-webkit-slider-thumb { -webkit-appearance: none; width: 30px; height: 30px; margin-top: 7px; border-radius: 999px; background: var(--rm-ink); border: 4px solid #fff; box-shadow: 0 4px 14px rgba(15,31,46,.25); }
        .sl-range::-moz-range-thumb { width: 22px; height: 22px; border-radius: 999px; background: var(--rm-ink); border: 4px solid #fff; box-shadow: 0 4px 14px rgba(15,31,46,.25); }
        .sl-range:focus-visible::-webkit-slider-thumb { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
        .sl-range:focus-visible::-moz-range-thumb { outline: 3px solid var(--focus-ring); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .sl-band.sl-run { animation: none; }
          .sl-band, .sl-tick, .sl-card { transition: none; }
        }
        :root[data-theme="contrast"] .sl-band, :root[data-theme="contrast"] .sl-tick { opacity: 1 !important; }
        :root[data-theme="contrast"] .sl-card { border: 2px solid var(--rm-ink) !important; }
      `}</style>

      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-terracotta-text">
          {womenCopy.screen.eyebrow}
        </Eyebrow>
        <Display size="sm">{womenCopy.screen.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">{womenCopy.screen.note}</p>
      </div>

      <div ref={box} className="flex flex-col gap-6 rounded-block bg-[color:var(--rm-lilac-tint)] p-5 md:p-8 lg:p-10">
        {/* Age readout */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          <label htmlFor={`${id}-age`} className="flex flex-col gap-0.5">
            <span className="text-[14px] font-semibold text-secondary">{c.ageLabel}</span>
            <span className="font-display text-[44px] font-medium leading-none tracking-[-.02em] text-ink md:text-[52px]" aria-hidden>
              {age}
            </span>
          </label>
          <span className="text-[13px] text-muted">{c.illustration}</span>
        </div>

        {/* The ruler: one row per screening, the age handle line across all of them. */}
        <div className="rounded-card bg-white p-4 md:p-6">
          <div role="img" aria-label={c.alt} className="relative">
            <ul className="flex flex-col gap-4">
              {BANDS.map((b, i) => {
                const on = isDue(b, age);
                return (
                  <li key={b.card.t} className="flex flex-col gap-1.5">
                    <span className="flex items-baseline justify-between gap-3 text-[13px]">
                      <span className="font-semibold text-ink">{b.card.t}</span>
                      <span className="text-muted">{b.card.meta}</span>
                    </span>
                    <span className="relative block h-5">
                      {/* Track */}
                      <span aria-hidden className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[color:var(--rm-line)]" />
                      {/* Band */}
                      {b.every ? (
                        <span
                          aria-hidden
                          className={cn("sl-band absolute top-1/2 h-2.5 -translate-y-1/2 rounded-full", draw && "sl-run")}
                          style={{
                            left: `${pct(b.from)}%`,
                            width: `${pct(b.to) - pct(b.from)}%`,
                            background: b.color,
                            opacity: on ? 0.9 : 0.28,
                            animationDelay: `${i * 140}ms`,
                          }}
                        />
                      ) : null}
                      {/* Ticks: each screening year, a dot for the one-time scan */}
                      {ticks(b).map((a) => (
                        <span
                          key={a}
                          aria-hidden
                          className="sl-tick absolute top-1/2 rounded-full border-2 border-white"
                          style={{
                            left: `${pct(a)}%`,
                            width: b.every ? 10 : 16,
                            height: b.every ? 10 : 16,
                            background: b.color,
                            transform: `translate(-50%, -50%) scale(${on && (b.every ? Math.abs(a - age) < b.every : true) ? 1.35 : 1})`,
                            opacity: on ? 1 : 0.45,
                          }}
                        />
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Age handle line across the rows */}
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 top-0 w-[2px] -translate-x-1/2 rounded-full bg-ink transition-[left] duration-100"
              style={{ left: `${pct(age)}%` }}
            />
          </div>

          {/* The control itself, aligned to the same scale. */}
          <input
            id={`${id}-age`}
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            aria-valuetext={c.ageValue(age)}
            className="sl-range mt-1"
          />
          <div aria-hidden className="relative h-5 text-[12px] text-muted">
            {[20, 30, 40, 50, 60, 70, 80].map((a) => (
              <span key={a} className="absolute -translate-x-1/2" style={{ left: `${pct(a)}%` }}>
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* What it means at this age */}
        <div aria-live="polite" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <span className="text-[14px] font-semibold">{c.dueNow}</span>
            {due.length ? (
              due.map((b) => (
                <div key={b.card.t} className="sl-card flex flex-col gap-1 rounded-card bg-white p-4" style={{ borderLeft: `4px solid ${b.color}` }}>
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[16px] font-semibold">{b.card.t}</span>
                    <span className="text-[13px] text-muted">{b.every ? b.card.meta : c.doneOnce}</span>
                  </span>
                  <p className="pretty text-[14px] leading-[1.5] text-secondary">{b.card.d}</p>
                </div>
              ))
            ) : (
              <p className="pretty rounded-card bg-white p-4 text-[14px] leading-[1.5] text-secondary">{c.noneNow}</p>
            )}
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-[14px] font-semibold">{c.next}</span>
            {next ? (
              <div className="sl-card flex flex-col gap-1 rounded-card p-4" style={{ background: next.tint, borderLeft: `4px solid ${next.color}` }}>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[16px] font-semibold text-ink">{next.card.t}</span>
                  <span className="text-[13px] text-ink/70">{next.every ? c.nextAt(next.from) : next.card.meta}</span>
                </span>
                <p className="pretty text-[14px] leading-[1.5] text-ink/80">{next.card.d}</p>
              </div>
            ) : (
              <p className="pretty rounded-card bg-white p-4 text-[14px] leading-[1.5] text-secondary">{c.noneNext}</p>
            )}
            <SmartLink to={`${routes.family}#am-i-due`} className="mt-1 w-fit text-[14px] font-semibold text-link">
              {c.someoneElse} ›
            </SmartLink>
          </div>
        </div>
      </div>

      {/* Every screening as text, for screen readers: the full list the old cards showed. */}
      <ul className="sr-only">
        {womenScreen.map((s) => (
          <li key={s.t}>
            {s.t}, {s.meta}: {s.d}
          </li>
        ))}
      </ul>
    </Section>
  );
}
