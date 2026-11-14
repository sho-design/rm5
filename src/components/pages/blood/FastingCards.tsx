"use client";

import { draft } from "@/content/review";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { bloodPrep as c } from "@/content/subpages";
import { fastingClockCopy as k } from "@/content/blood-prep";
import { clock } from "@/lib/fasting";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Draw times people can pick: every half hour the clinic is open on some day, 8am to 8:30pm. */
const TIMES = Array.from({ length: 26 }, (_, i) => 8 + i / 2);

/** "the night before" (midnight counts), "that morning" or "that day", for a stop time `t` hours after midnight of the draw day. */
const when = (t: number) => (t <= 0 ? c.whenBefore : t < 12 ? c.whenMorning : c.whenDay);

/* 24-hour dial: midnight at the top, noon at the bottom, clockwise. */
const CX = 130;
const CY = 130;
const R = 96;
const deg = (h: number) => (h / 24) * 360;
const polar = (r: number, d: number) => {
  const a = ((d - 90) * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
/** Arc from hour `from` back to hour `to` (to < from), drawn anticlockwise so it can sweep back in time. */
function backArc(r: number, from: number, to: number) {
  const span = Math.min(from - to, 23.99);
  const [x1, y1] = polar(r, deg(from));
  const [x2, y2] = polar(r, deg(from - span));
  return `M ${x1} ${y1} A ${r} ${r} 0 ${span > 12 ? 1 : 0} 0 ${x2} ${y2}`;
}

/**
 * "When to stop eating" (November 2026, replaces the four fasting cards). Pick your fasting rule and your
 * appointment time: on a 24-hour dial, the fasting arc sweeps back from the appointment to your last food, and a
 * hand follows it. Below: what is still fine, and every rule's stop time for that appointment as a table, so all
 * four rules stay readable without the picture. Still with reduced motion; full strength in high contrast.
 */
export function FastingCards() {
  const reduced = useReducedMotion();
  const [slot, setSlot] = useState(9);
  const [rule, setRule] = useState(0);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stopText = (f: (typeof c.fasting)[number]) => {
    const [from, to] = f.window;
    return from === to
      ? c.stopBy(clock(slot - to), when(slot - to), f.dry)
      : c.stopBetween(clock(slot - from), clock(slot - to), when(slot - to));
  };

  const f = c.fasting[rule];
  const [from, to] = f.window;
  const startDeg = deg(slot);
  // The hand turns back `to` hours from the appointment (15 degrees an hour).
  const handDeg = startDeg - to * 15;
  const big = from === to ? clock(slot - to) : `${clock(slot - from)} to ${clock(slot - to)}`;
  const stop = stopText(f);
  const play = seen && !reduced;
  const runKey = `${rule}-${slot}-${seen}`;
  const [ax, ay] = polar(R + 18, startDeg);

  return (
    <div ref={box} className="flex flex-col gap-5">
      <style>{`
        @keyframes fc-sweep { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        @keyframes fc-hand { from { transform: rotate(var(--fc-from)); } to { transform: rotate(var(--fc-to)); } }
        @keyframes fc-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .fc-arc { stroke-dasharray: 100; }
        .fc-arc.fc-run { animation: fc-sweep 1100ms cubic-bezier(.2,.8,.2,1) both; }
        .fc-hand { transform-box: view-box; transform-origin: ${CX}px ${CY}px; }
        .fc-hand.fc-run { animation: fc-hand 1100ms cubic-bezier(.2,.8,.2,1) both; }
        .fc-text.fc-run { animation: fc-in 400ms 700ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .fc-arc.fc-run, .fc-hand.fc-run, .fc-text.fc-run { animation: none; } }
        :root[data-theme="contrast"] .fc-dial [data-soft] { opacity: 1 !important; }
        :root[data-theme="contrast"] .fc-chip { border: 2px solid var(--rm-ink) !important; }
      `}</style>

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
        {/* Controls */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            <span id={`${id}-rule`} className="flex items-center gap-2 text-[15px] font-semibold">
              <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">1</span>
              {k.ruleLabel}
            </span>
            <div role="radiogroup" aria-labelledby={`${id}-rule`} onKeyDown={radioKeys} className="grid grid-cols-2 gap-2">
              {c.fasting.map((x, i) => {
                const on = i === rule;
                return (
                  <button
                    key={x.k}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={rovingTab(on, i, true)}
                    onClick={() => setRule(i)}
                    className={cn(
                      "fc-chip flex min-h-[64px] flex-col items-start justify-center gap-0.5 rounded-[14px] border-2 px-4 py-2.5 text-left text-ink transition-[border-color,box-shadow] duration-300",
                      on ? "border-ink shadow-[0_6px_18px_rgba(15,31,46,.10)]" : "border-transparent hover:border-[color:var(--border-default)]",
                    )}
                    style={{ background: x.bg }}
                  >
                    <span className="text-[16px] font-semibold leading-[1.2]">{x.t}</span>
                    <span className="text-[13px] leading-[1.3] text-ink/70">{x.dry ? k.waterNo : k.waterOk}</span>
                  </button>
                );
              })}
            </div>
            <p className="pretty max-w-[60ch] text-[14px] leading-[1.5] text-secondary">{f.rule}</p>
          </div>

          {/* Appointment time, made prominent: the time in large type with earlier and later buttons; tapping the
              time itself opens the full list. */}
          <div className="flex flex-col gap-2.5 rounded-[18px] border-2 border-ink bg-[color:var(--rm-sky-soft)] p-4 shadow-[0_8px_24px_rgba(15,31,46,.08)] md:p-5">
            <label htmlFor={`${id}-time`} className="flex items-center gap-2 text-[15px] font-semibold">
              <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">2</span>
              {c.timeLabel}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSlot(TIMES[Math.max(0, TIMES.indexOf(slot) - 1)])}
                disabled={slot === TIMES[0]}
                aria-label={draft("Earlier")}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-white text-[22px] font-semibold text-ink transition-opacity disabled:opacity-30"
              >
                <span aria-hidden>−</span>
              </button>
              <div className="relative min-w-0 flex-1">
                <select
                  id={`${id}-time`}
                  value={slot}
                  onChange={(e) => setSlot(Number(e.target.value))}
                  className="h-14 w-full cursor-pointer appearance-none rounded-[14px] border-[1.5px] border-[color:var(--border-default)] bg-white px-4 pr-10 text-center font-display text-[30px] font-medium leading-none tracking-[-.02em] text-ink focus:border-sky"
                >
                  {TIMES.map((t) => (
                    <option key={t} value={t}>
                      {clock(t)}
                    </option>
                  ))}
                </select>
                <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-ink/60">▾</span>
              </div>
              <button
                type="button"
                onClick={() => setSlot(TIMES[Math.min(TIMES.length - 1, TIMES.indexOf(slot) + 1)])}
                disabled={slot === TIMES[TIMES.length - 1]}
                aria-label={draft("Later")}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-white text-[22px] font-semibold text-ink transition-opacity disabled:opacity-30"
              >
                <span aria-hidden>+</span>
              </button>
            </div>
          </div>
          {slot >= 12 ? (
            <p className="pretty max-w-[62ch] rounded-[12px] bg-sun-tint px-4 py-3 text-[14px] font-semibold leading-[1.5] text-sun-ink">{c.afternoon}</p>
          ) : slot >= 10 && from >= 8 ? (
            <p className="pretty max-w-[62ch] rounded-[12px] bg-sun-tint px-4 py-3 text-[14px] font-semibold leading-[1.5] text-sun-ink">{k.lateMorning}</p>
          ) : null}

          {/* What is still fine while you fast. */}
          <div className="flex flex-col gap-2 rounded-card border border-border bg-card p-5">
            <span className="text-[13px] font-semibold text-muted">{k.stillFine}</span>
            <p className="pretty text-[15px] leading-[1.5]">{f.dry ? k.noWater : k.water}</p>
            {/* Coffee, tea, gum and the rest are in "Fasting means" just above, so they are not repeated here. */}
          </div>
        </div>

        {/* The dial */}
        <figure className="m-0 flex flex-col items-center gap-2">
          <svg viewBox="0 0 260 260" role="img" aria-label={k.clockAlt(stop)} className="fc-dial h-auto w-full max-w-[400px]">
            <circle cx={CX} cy={CY} r={R + 26} fill="#FFFFFF" stroke="#D5DEE6" strokeWidth="2" />
            {/* Night, 9pm to 6am, as a soft band. */}
            <path d={backArc(R, 30, 21)} stroke="#E4EAF1" strokeWidth="26" fill="none" data-soft />
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#EEF2F6" strokeWidth="26" opacity=".6" data-soft />
            {/* Hour ticks, and labels every 6 hours. */}
            {Array.from({ length: 24 }, (_, h) => {
              const [x1, y1] = polar(R + 15, deg(h));
              const [x2, y2] = polar(R + (h % 6 ? 19 : 23), deg(h));
              return <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#9AA6B1" strokeWidth={h % 6 ? 1.2 : 2} />;
            })}
            {[0, 6, 12, 18].map((h) => {
              const [x, y] = polar(R - 34, deg(h));
              return (
                <text key={h} x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#5A6B7B">
                  {clock(h)}
                </text>
              );
            })}

            {/* Last-food window (10 to 12 hours rule) and the fasting arc, sweeping back from the appointment. */}
            {(play || reduced) && from !== to ? (
              <path
                key={`w-${runKey}`}
                d={backArc(R, slot - to, slot - from)}
                pathLength={100}
                stroke="#9CC3EA"
                strokeWidth="26"
                strokeLinecap="butt"
                fill="none"
                className={cn("fc-arc", play && "fc-run")}
                style={{ animationDelay: "900ms" }}
                data-soft
              />
            ) : null}
            {play || reduced ? (
              <path
                key={`a-${runKey}`}
                d={backArc(R, slot, slot - to)}
                pathLength={100}
                stroke={f.dry ? "#C4573A" : "#2F7FD1"}
                strokeWidth="26"
                strokeLinecap="butt"
                fill="none"
                className={cn("fc-arc", play && "fc-run")}
              />
            ) : null}

            {/* Appointment marker. */}
            <circle cx={ax} cy={ay} r="7" fill="#0F1F2E" />
            {/* Hand: starts at the appointment, winds back to the last food. */}
            <g
              key={`h-${runKey}`}
              className={cn("fc-hand", play && "fc-run")}
              style={
                {
                  "--fc-from": `${startDeg}deg`,
                  "--fc-to": `${handDeg}deg`,
                  transform: `rotate(${seen || reduced ? handDeg : startDeg}deg)`,
                } as CSSProperties
              }
            >
              <line x1={CX} y1={CY} x2={CX} y2={CY - R + 6} stroke="#0F1F2E" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx={CX} cy={CY - R + 2} r="6" fill="#FFFFFF" stroke="#0F1F2E" strokeWidth="2.5" />
            </g>
            <circle cx={CX} cy={CY} r="5" fill="#0F1F2E" />
          </svg>
          {/* The answer, in words, under the dial (and announced when it changes). */}
          <figcaption key={`t-${runKey}`} className={cn("fc-text flex flex-col items-center gap-0.5 text-center", play && "fc-run")} aria-live="polite">
            <span className="text-[13px] font-semibold text-muted">{f.dry ? k.lastFoodDrink : k.lastFood}</span>
            <span className="font-display text-[30px] leading-[1.05] tracking-[-.02em]">{big}</span>
            <span className="pretty max-w-[34ch] text-[14px] leading-[1.45] text-secondary">{stop}</span>
          </figcaption>
          <span className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: f.dry ? "#C4573A" : "#2F7FD1" }} />
              {k.fasting}
            </span>
            {from !== to ? (
              <span className="flex items-center gap-1.5">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#9CC3EA]" />
                {k.window}
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#E4EAF1]" />
              {k.night}
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-ink" />
              {k.appointment}
            </span>
          </span>
          <span className="text-center text-[13px] text-muted">{k.illustration}</span>
        </figure>
      </div>

      {/* Every rule for this appointment time, as text: the four rules stay readable without the dial. */}
      <div className="overflow-x-auto rounded-card border border-border">
        <table className="w-full min-w-[480px] text-left text-[14px]">
          <caption className="bg-card px-5 py-3 text-left text-[14px] font-semibold">{k.allRules(clock(slot))}</caption>
          <thead className="text-[13px] text-muted">
            <tr className="border-t border-border">
              <th scope="col" className="px-5 py-2.5 font-semibold">
                {k.ruleCol}
              </th>
              <th scope="col" className="px-5 py-2.5 font-semibold">
                {k.stopCol}
              </th>
            </tr>
          </thead>
          <tbody>
            {c.fasting.map((x, i) => (
              <tr key={x.k} className={cn("border-t border-border align-top", i === rule && "bg-[color:var(--rm-sky-soft)]")}>
                <th scope="row" className="px-5 py-3 font-semibold">
                  {x.t}
                  <span className="block pt-0.5 text-[13px] font-normal text-secondary">{x.rule}</span>
                </th>
                <td className="pretty px-5 py-3">{stopText(x)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[13px] text-secondary">{c.noList}</p>
    </div>
  );
}
