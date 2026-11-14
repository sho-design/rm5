"use client";

import { useEffect, useRef, useState } from "react";
import { Block, Display, Eyebrow } from "@/components/ui";
import { bloodPath } from "@/content/subpages";
import { journeyCopy as c } from "@/content/blood-journey";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { NeedleCalm } from "./NeedleCalm";

/** One loop: the visit takes the first 45% of the time, the weeks after the rest. */
const LOOP_MS = 10000;
const VISIT = 0.45;
/** Where each step sits along the route (fractions of its length): doctor, lab, your doctor, follow-up. */
const STOPS = [0, 0.366, 0.697, 1];
const START_X = 135;
const END_X = 860;
const ROUTE_Y = 206;

/** Share of the route covered at time t (0 to 1): the visit covers doctor to lab, the rest covers the weeks after. */
function along(t: number) {
  return t < VISIT ? (t / VISIT) * STOPS[1] : STOPS[1] + ((t - VISIT) / (1 - VISIT)) * (1 - STOPS[1]);
}
/** The step that is lit at time t. */
function stepAt(t: number) {
  if (t < 0.2) return 0;
  if (t < VISIT) return 1;
  if (t < 0.78) return 2;
  return 3;
}

/**
 * "One trip, start to finish" (Bloodwork & ECG, November 2026). Replaces the plain visit steps. A line drawing of the
 * clinic: a dot leaves the doctor's room with the requisition, goes down the hall to the lab chair while a clock ticks
 * to about ten minutes, then a dashed line carries on through the weeks after (results reach your doctor in about a
 * week, the follow-up 2 to 3 weeks after the test). Critical results flag the clinic right away (no separate branch, Nov 2026).
 * The four steps are written out below and light up with the dot. It plays while on screen (Pause stops it);
 * with reduced motion the whole route is shown still. The navy block keeps its own colours in dark mode.
 */
export function VisitJourney() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [t, setT] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  const offset = useRef(0);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) {
      start.current = null;
      return;
    }
    let raf = 0;
    const tick = (now: number) => {
      if (start.current === null) start.current = now - offset.current * LOOP_MS;
      const v = ((now - start.current) % LOOP_MS) / LOOP_MS;
      offset.current = v;
      setT(v);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [moving]);

  const shown = reduced ? 1 : t;
  const frac = along(shown);
  const x = START_X + frac * (END_X - START_X);
  const active = reduced ? -1 : stepAt(shown);
  const minutes = Math.min(10, Math.round((Math.min(shown, VISIT) / VISIT) * 10));
  const visitDone = reduced || shown >= VISIT;

  // Colours on navy.
  const LINE = "rgba(255,255,255,.35)";
  const SOFT = "rgba(255,255,255,.08)";
  const SUN = "#FFD84D";
  const SKY = "#7FB8F0";

  return (
    <Block tone="navy" className="flex flex-col gap-8 p-6 md:p-10 lg:gap-10 lg:px-12 lg:py-14">
      <style>{`
        .vj-step { transition: background-color 300ms cubic-bezier(.2,.8,.2,1), border-color 300ms cubic-bezier(.2,.8,.2,1); }
        :root[data-theme="contrast"] .vj-art path, :root[data-theme="contrast"] .vj-art rect, :root[data-theme="contrast"] .vj-art circle { stroke-opacity: 1 !important; }
        :root[data-theme="contrast"] .vj-step { border-color: #fff !important; }
      `}</style>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="sun">{c.eyebrow}</Eyebrow>
          <Display size="xs">{c.title}</Display>
        </div>
        <NeedleCalm />
      </div>

      <div ref={box} className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] font-semibold text-white/70">{c.illustration}</span>
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[44px] rounded-chip border border-white/40 px-4 text-[13px] font-semibold text-white hover:border-white"
            >
              {playing ? c.pause : c.play}
            </button>
          ) : null}
        </div>

        <svg role="img" aria-label={c.alt} viewBox="0 0 960 300" className="vj-art h-auto w-full">
          {/* Phase labels */}
          <text x="40" y="34" fontSize="17" fontWeight="600" fill={visitDone ? "rgba(255,255,255,.55)" : SUN}>
            {c.phaseVisit}
          </text>
          <text x="590" y="34" fontSize="17" fontWeight="600" fill={visitDone ? SUN : "rgba(255,255,255,.55)"}>
            {c.phaseAfter}
          </text>

          {/* The clinic: one corridor with two rooms. */}
          <rect x="20" y="52" width="520" height="228" rx="22" fill={SOFT} stroke={LINE} strokeWidth="2" />
          {/* Doctor's room: desk, two chairs, a requisition on the desk. */}
          <rect x="40" y="70" width="200" height="110" rx="14" fill="none" stroke={LINE} strokeWidth="2" />
          <text x="56" y="96" fontSize="15" fill="rgba(255,255,255,.8)">{c.rooms.doctor}</text>
          <rect x="70" y="128" width="100" height="10" rx="5" fill="rgba(255,255,255,.5)" />
          <rect x="74" y="138" width="6" height="26" rx="3" fill="rgba(255,255,255,.35)" />
          <rect x="160" y="138" width="6" height="26" rx="3" fill="rgba(255,255,255,.35)" />
          <circle cx="196" cy="150" r="12" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
          <g transform="translate(104 104)">
            <rect width="30" height="22" rx="3" fill={active === 0 ? SUN : "#fff"} opacity={active === 0 ? 1 : 0.8} />
            <path d="M6 7h18M6 12h12M6 17h15" stroke="#0F1F2E" strokeWidth="1.6" strokeLinecap="round" />
          </g>

          {/* Lab room: reclining chair, a small tube rack, the ECG on a cart-free side table. */}
          <rect x="300" y="70" width="220" height="110" rx="14" fill="none" stroke={LINE} strokeWidth="2" />
          <text x="316" y="96" fontSize="15" fill="rgba(255,255,255,.8)">{c.rooms.lab}</text>
          <path d="M342 160 L 362 128 Q 368 120 378 124 L 410 140 L 446 140" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M370 160 L 364 174 M 436 146 L 442 174" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
          {[470, 482, 494].map((tx, i) => (
            <g key={tx}>
              <rect x={tx} y="128" width="8" height="30" rx="4" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="1.6" />
              <rect x={tx + 1.5} y={146 - (active === 1 ? 6 : 0)} width="5" height={10 + (active === 1 ? 6 : 0)} rx="2.5" fill={i === 1 ? SKY : "#E07A5F"} opacity=".9" />
            </g>
          ))}

          {/* Clock: ticks to about ten minutes during the visit. */}
          <g transform="translate(270 244)">
            <circle r="22" fill="#0F1F2E" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
            <path d="M0 0 V-14" stroke={SUN} strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${minutes * 36})`} />
            <circle r="2.5" fill={SUN} />
            <text x="34" y="6" fontSize="16" fontWeight="600" fill="#fff">
              {visitDone ? c.clockDone : c.minutes(minutes)}
            </text>
          </g>

          {/* The route: solid through the clinic, dashed through the weeks after. */}
          <path d={`M${START_X} ${ROUTE_Y} H 400`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
          <path d={`M400 ${ROUTE_Y} H 540`} stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
          <path d={`M540 ${ROUTE_Y} H ${END_X}`} stroke="#fff" strokeOpacity=".45" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />

          {/* The weeks after: your doctor, then the follow-up. */}
          {[
            { sx: 697, label: c.rooms.results, time: bloodPath[2]?.time, i: 2 },
            { sx: 860, label: c.rooms.followUp, time: bloodPath[3]?.time, i: 3 },
          ].map((s) => (
            <g key={s.sx}>
              <rect x={s.sx - 62} y={ROUTE_Y + 22} width="124" height="54" rx="12" fill={active === s.i ? "rgba(255,216,77,.16)" : SOFT} stroke={active === s.i ? SUN : LINE} strokeWidth="2" />
              <text x={s.sx} y={ROUTE_Y + 45} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff">{s.label}</text>
              <text x={s.sx} y={ROUTE_Y + 66} textAnchor="middle" fontSize="14" fill="rgba(255,255,255,.75)">{s.time}</text>
            </g>
          ))}

          {/* Stop markers */}
          {STOPS.map((f, i) => {
            const sx = START_X + f * (END_X - START_X);
            const lit = reduced || frac >= f - 0.001;
            return <circle key={i} cx={sx} cy={ROUTE_Y} r="9" fill={lit ? "#fff" : "#0F1F2E"} stroke="#fff" strokeOpacity=".7" strokeWidth="2" />;
          })}

          {/* The traveller */}
          {!reduced ? (
            <g transform={`translate(${x} ${ROUTE_Y})`}>
              <circle r="16" fill={SUN} opacity=".25" />
              <circle r="8" fill={SUN} />
            </g>
          ) : null}
        </svg>
      </div>

      {/* The steps in words: everything the visit block always said. */}
      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        {bloodPath.map((s, i) => (
          <li
            key={s.n}
            aria-current={active === i ? "step" : undefined}
            className={cn(
              "vj-step flex flex-col gap-1.5 rounded-card border p-4 md:p-5",
              active === i ? "border-sun bg-white/10" : "border-white/15 bg-transparent",
            )}
          >
            <span className="sr-only">{c.stepLabel(i + 1, bloodPath.length)}: </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-sun text-[13px] font-bold text-sun-ink">
                {s.n}
              </span>
              <span className="text-[13px] font-semibold text-white/75">{s.time}</span>
            </span>
            <span className="text-[16px] font-semibold leading-[1.3] text-white">{s.t}</span>
            <span className="pretty text-[14px] leading-[1.5] text-white/80">{s.d}</span>
          </li>
        ))}
      </ol>
    </Block>
  );
}
