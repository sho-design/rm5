"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import {
  injCopy as c,
  injFamilies,
  type InjFamilyKey,
} from "@/content/aes-injectables";
import { tabKeys, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const MODES: InjFamilyKey[] = ["neuro", "filler", "bio"];
const MAX_WEEKS = 12;
/** In auto play, the neuromodulator view swaps between before and after treatment at this pace. */
const SWAP_MS = 7000;

const SKIN = "#F2D2BF";
const DERMIS = "#FBEFE8";
const LILAC = "#8E5FB5";
const INK = "#0F1F2E";

// Skin surface shapes (the top edge of the skin). Same number of points so SMIL can morph between them.
const FLAT = "M 30 120 C 190 120, 260 120, 320 120 C 380 120, 450 120, 610 120";
const FOLD = "M 30 120 C 190 120, 272 122, 320 150 C 368 122, 450 120, 610 120";
const SOFT = "M 30 120 C 190 120, 272 120, 320 128 C 368 120, 450 120, 610 120";
const HOLLOW =
  "M 30 112 C 180 114, 238 156, 320 164 C 402 156, 460 114, 610 112";
const LIFTED =
  "M 30 112 C 180 108, 238 104, 320 104 C 402 104, 460 108, 610 112";

const body = (surface: string) => `${surface} L 610 380 L 30 380 Z`;

/** Particle positions for the biostimulator view, and collagen threads joining neighbours. */
const PARTICLES: [number, number][] = [
  [196, 196],
  [238, 222],
  [270, 184],
  [306, 230],
  [338, 196],
  [372, 224],
  [404, 190],
  [440, 218],
  [226, 252],
  [292, 262],
  [356, 258],
  [420, 250],
  [470, 186],
  [168, 230],
];
const THREADS: string[] = [
  "M 168 230 C 180 208, 186 200, 196 196",
  "M 196 196 C 214 200, 226 214, 238 222",
  "M 238 222 C 250 200, 258 190, 270 184",
  "M 270 184 C 288 200, 296 214, 306 230",
  "M 306 230 C 318 214, 326 204, 338 196",
  "M 338 196 C 352 208, 362 216, 372 224",
  "M 372 224 C 384 208, 394 198, 404 190",
  "M 404 190 C 418 204, 430 210, 440 218",
  "M 440 218 C 452 204, 462 194, 470 186",
  "M 226 252 C 254 262, 270 264, 292 262",
  "M 292 262 C 318 262, 336 260, 356 258",
  "M 356 258 C 384 256, 402 252, 420 250",
  "M 238 222 C 234 236, 230 244, 226 252",
  "M 306 230 C 300 244, 296 254, 292 262",
  "M 372 224 C 366 238, 360 250, 356 258",
  "M 440 218 C 432 232, 426 242, 420 250",
];

/**
 * "What each one actually does": an animated cross-section of the skin for the three injectable families.
 * Neuromodulator: a nerve sends signals to a forehead muscle that tightens and folds the skin into a line; the
 * "after treatment" view slows the signal and softens the line. Filler: a soft gel fills a hollow under the
 * cheek and the surface lifts. Biostimulator: a "weeks" slider grows collagen threads around tiny particles.
 * Plays only on screen; Pause stops it; a still picture with reduced motion. Education only.
 */
export function HowItWorks() {
  const reduced = useReducedMotion();
  const [mode, setMode] = useState(0);
  const [treated, setTreated] = useState(false);
  const [manual, setManual] = useState(false);
  const [weeks, setWeeks] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  const k = MODES[mode];

  // SMIL runs on the SVG's own clock: pause it when off screen, paused, or motion is reduced.
  useEffect(() => {
    const s = svg.current;
    if (!s) return;
    if (moving) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [moving, mode, treated]);

  // Neuromodulator: swap before and after on its own until the visitor picks one.
  useEffect(() => {
    if (!moving || k !== "neuro" || manual) return;
    const t = window.setInterval(() => setTreated((v) => !v), SWAP_MS);
    return () => window.clearInterval(t);
  }, [moving, k, manual]);

  // Biostimulator: the weeks count up, hold, then start again.
  useEffect(() => {
    if (!moving || k !== "bio") return;
    const t = window.setInterval(
      () => setWeeks((w) => (w >= MAX_WEEKS + 2 ? 0 : w + 1)),
      650,
    );
    return () => window.clearInterval(t);
  }, [moving, k]);

  // With reduced motion the still picture shows the "after" state of each view.
  const shownWeeks =
    reduced && k === "bio" && weeks === 0 ? 8 : Math.min(weeks, MAX_WEEKS);
  const grow = shownWeeks / MAX_WEEKS;
  const anim = !reduced;
  const fam = injFamilies[mode];
  const m = c.modes[k];

  return (
    <Section id="injectables-how" className="scroll-mt-24">
      <style>{`
        .ij-thread { transition: stroke-dashoffset 600ms cubic-bezier(.2,.8,.2,1), opacity 400ms; }
        .ij-fade { transition: opacity 500ms cubic-bezier(.2,.8,.2,1); }
        @media (prefers-reduced-motion: reduce) { .ij-thread, .ij-fade { transition: none; } }
        :root[data-theme="contrast"] .ij-figure svg [data-dim] { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-5 text-ink sm:p-6 md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.35fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.howEyebrow}
          </Eyebrow>
          <Display size="sm">{c.howTitle}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.howLead}
          </p>

          <div
            role="tablist"
            aria-label={c.modesLabel}
            onKeyDown={tabKeys(MODES.length, mode, setMode)}
            className="flex flex-wrap gap-2"
          >
            {MODES.map((key, i) => (
              <button
                key={key}
                type="button"
                role="tab"
                id={`ij-tab-${key}`}
                aria-selected={mode === i}
                aria-controls="ij-panel"
                tabIndex={mode === i ? 0 : -1}
                onClick={() => setMode(i)}
                className={cn(
                  "min-h-[44px] rounded-chip px-4 text-[15px] font-semibold transition-colors",
                  mode === i
                    ? "bg-ink text-white"
                    : "border border-ink/15 bg-white text-ink hover:border-ink",
                )}
              >
                {c.modes[key].tab}
              </button>
            ))}
          </div>

          <div
            id="ij-panel"
            role="tabpanel"
            aria-labelledby={`ij-tab-${k}`}
            className="flex flex-col gap-4 rounded-card bg-white/80 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-display text-[22px] font-medium leading-tight">
                {fam.short}
              </span>
              {fam.brand ? (
                <span className="text-[13px] font-semibold text-muted">
                  {fam.brand}
                </span>
              ) : null}
            </div>
            <ol className="flex flex-col gap-2.5">
              {m.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[15px] leading-[1.45]">
                  <span
                    aria-hidden
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lilac-tint text-[13px] font-semibold text-lilac-text"
                  >
                    {i + 1}
                  </span>
                  <span className="pretty pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
            {k === "neuro" ? (
              <button
                type="button"
                aria-pressed={treated}
                onClick={() => {
                  setManual(true);
                  setTreated((v) => !v);
                }}
                className="flex min-h-[44px] w-fit items-center gap-3 rounded-chip border border-ink/15 bg-white px-4 text-[15px] font-semibold"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative h-6 w-10 rounded-full transition-colors",
                    treated ? "bg-lilac-deep" : "bg-ink/20",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition-[left]",
                      treated ? "left-5" : "left-1",
                    )}
                  />
                </span>
                {c.treated}
              </button>
            ) : null}
            {k === "bio" ? (
              <label className="flex flex-col gap-2 text-[15px] font-semibold">
                <span className="flex items-baseline justify-between gap-3">
                  {c.weeks}
                  <span className="font-normal text-secondary" aria-hidden>
                    {c.weeksValue(shownWeeks)}
                  </span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={MAX_WEEKS}
                  step={1}
                  value={shownWeeks}
                  aria-valuetext={c.weeksValue(shownWeeks)}
                  onChange={(e) => {
                    setPlaying(false);
                    setWeeks(Number(e.target.value));
                  }}
                  className="h-11 w-full accent-[#8E5FB5]"
                />
              </label>
            ) : null}
          </div>
        </div>

        <figure className="ij-figure m-0 flex flex-col gap-3 lg:justify-center">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-lilac-text">
              {c.illustration}
            </span>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="min-h-[44px] rounded-chip border border-ink/15 bg-white px-4 text-[14px] font-semibold"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <div className="overflow-hidden rounded-card bg-white shadow-card">
            <svg
              key={`${k}-${treated}`}
              ref={svg}
              viewBox="0 0 640 400"
              role="img"
              aria-label={m.figure}
              className="block h-auto w-full"
            >
              <defs>
                <linearGradient id="ij-skin" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor={SKIN} />
                  <stop offset="0.16" stopColor="#F6DFD1" />
                  <stop offset="0.17" stopColor={DERMIS} />
                  <stop offset="1" stopColor="#FFF8F4" />
                </linearGradient>
                <radialGradient id="ij-gel" cx="0.45" cy="0.35" r="0.7">
                  <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
                  <stop offset="0.45" stopColor="#D9C2EA" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#B48DD3" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient id="ij-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#FFD84D" stopOpacity="1" />
                  <stop offset="1" stopColor="#FFD84D" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="ij-fibre"
                  width="18"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 0 5 Q 4.5 2, 9 5 T 18 5"
                    fill="none"
                    stroke="#B5584C"
                    strokeWidth="1.2"
                    opacity="0.55"
                  />
                </pattern>
              </defs>
              <rect width="640" height="400" fill="#FCF9FE" />

              {k === "neuro" ? (
                <NeuroScene anim={anim} treated={treated} />
              ) : null}
              {k === "filler" ? <FillerScene anim={anim} /> : null}
              {k === "bio" ? <BioScene grow={grow} /> : null}
            </svg>
          </div>
          <figcaption className="sr-only">{m.figure}</figcaption>
        </figure>
      </div>
    </Section>
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  color = INK,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize="17"
      fontWeight="600"
      fill={color}
      style={{ paintOrder: "stroke" }}
      stroke="#FFFFFF"
      strokeWidth="5"
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

function NeuroScene({ anim, treated }: { anim: boolean; treated: boolean }) {
  // Untreated: a strong signal every 2.4s and a deep fold. Treated: a faint, slow signal and a soft fold.
  const dur = treated ? "4.8s" : "2.4s";
  const peak = treated ? SOFT : FOLD;
  const squeeze = treated ? "1 1; 0.95 1; 1 1" : "1 1; 0.84 1.12; 1 1";
  const still = treated ? SOFT : FOLD;
  return (
    <g>
      <path d={body(anim ? FLAT : still)} fill="url(#ij-skin)">
        {anim ? (
          <animate
            attributeName="d"
            values={`${body(FLAT)};${body(peak)};${body(FLAT)}`}
            keyTimes="0;0.45;1"
            dur={dur}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines=".2 .8 .2 1;.2 .8 .2 1"
          />
        ) : null}
      </path>
      <path
        d={anim ? FLAT : still}
        fill="none"
        stroke="#D9A88F"
        strokeWidth="3"
      >
        {anim ? (
          <animate
            attributeName="d"
            values={`${FLAT};${peak};${FLAT}`}
            keyTimes="0;0.45;1"
            dur={dur}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines=".2 .8 .2 1;.2 .8 .2 1"
          />
        ) : null}
      </path>
      <Label x={40} y={100}>
        {c.labels.skin}
      </Label>
      <g data-dim style={{ opacity: treated ? 0.45 : 1 }} className="ij-fade">
        <line
          x1="320"
          y1="164"
          x2="388"
          y2="196"
          stroke={INK}
          strokeWidth="1.5"
        />
        <Label x={392} y={204}>
          {c.labels.line}
        </Label>
      </g>

      {/* The forehead muscle: squeezes in time with the fold. */}
      <g transform="translate(320 246)">
        <g>
          <rect
            x="-190"
            y="-26"
            width="380"
            height="52"
            rx="26"
            fill="#E39A8E"
          />
          <rect
            x="-190"
            y="-26"
            width="380"
            height="52"
            rx="26"
            fill="url(#ij-fibre)"
          />
          {anim ? (
            <animateTransform
              attributeName="transform"
              type="scale"
              values={squeeze}
              keyTimes="0;0.45;1"
              dur={dur}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines=".2 .8 .2 1;.2 .8 .2 1"
            />
          ) : null}
        </g>
      </g>
      <Label x={520} y={252}>
        {c.labels.muscle}
      </Label>

      {/* The nerve and its signal. */}
      <path
        id="ij-nerve"
        d="M 48 372 C 120 360, 150 320, 206 300 S 290 282, 300 262"
        fill="none"
        stroke="#E2B13C"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 206 300 C 230 318, 250 330, 268 352"
        fill="none"
        stroke="#E2B13C"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <Label x={56} y={350}>
        {c.labels.nerve}
      </Label>
      {anim ? (
        <g opacity={treated ? 0.35 : 1}>
          <circle r="16" fill="url(#ij-glow)" />
          <circle r="6" fill="#FFD84D" stroke="#B8860B" strokeWidth="1.5" />
          <animateMotion
            dur={dur}
            repeatCount="indefinite"
            keyPoints="0;1;1"
            keyTimes="0;0.4;1"
            calcMode="linear"
          >
            <mpath href="#ij-nerve" />
          </animateMotion>
        </g>
      ) : (
        <g opacity={treated ? 0.35 : 1}>
          <circle cx="206" cy="300" r="16" fill="url(#ij-glow)" />
          <circle
            cx="206"
            cy="300"
            r="6"
            fill="#FFD84D"
            stroke="#B8860B"
            strokeWidth="1.5"
          />
        </g>
      )}
      <Label x={150} y={300} color="#6B4B00">
        {c.labels.signal}
      </Label>
    </g>
  );
}

function FillerScene({ anim }: { anim: boolean }) {
  // One 7s loop: the hollow, the gel growing in, the lifted surface held, then back.
  const kt = "0;0.18;0.55;0.9;1";
  const ks = ".2 .8 .2 1;.2 .8 .2 1;.2 .8 .2 1;.2 .8 .2 1";
  return (
    <g>
      <path d={body(anim ? HOLLOW : LIFTED)} fill="url(#ij-skin)">
        {anim ? (
          <animate
            attributeName="d"
            values={`${body(HOLLOW)};${body(HOLLOW)};${body(LIFTED)};${body(LIFTED)};${body(HOLLOW)}`}
            keyTimes={kt}
            dur="7s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines={ks}
          />
        ) : null}
      </path>
      <path
        d={anim ? HOLLOW : LIFTED}
        fill="none"
        stroke="#D9A88F"
        strokeWidth="3"
      >
        {anim ? (
          <animate
            attributeName="d"
            values={`${HOLLOW};${HOLLOW};${LIFTED};${LIFTED};${HOLLOW}`}
            keyTimes={kt}
            dur="7s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines={ks}
          />
        ) : null}
      </path>
      {/* Where the surface was, so the change reads in the still picture too. */}
      <path
        d={HOLLOW}
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
        strokeDasharray="5 6"
        opacity="0.4"
      />
      <Label x={40} y={92}>
        {c.labels.skin}
      </Label>
      <Label x={330} y={92} anchor="middle" color="#5A6B7B">
        {c.labels.hollow}
      </Label>

      <ellipse
        cx="320"
        cy="300"
        rx="210"
        ry="46"
        fill="#F6E3B8"
        stroke="#E8CF94"
        strokeWidth="2"
      />
      <Label x={540} y={346} anchor="end" color="#6B4B00">
        {c.labels.fat}
      </Label>

      <g>
        <ellipse
          cx="320"
          cy="200"
          rx={anim ? 0 : 128}
          ry={anim ? 0 : 42}
          fill="url(#ij-gel)"
          stroke="#B48DD3"
          strokeWidth="1.5"
        >
          {anim ? (
            <animate
              attributeName="rx"
              values="0;0;128;128;0"
              keyTimes={kt}
              dur="7s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={ks}
            />
          ) : null}
          {anim ? (
            <animate
              attributeName="ry"
              values="0;0;42;42;0"
              keyTimes={kt}
              dur="7s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines={ks}
            />
          ) : null}
        </ellipse>
        <ellipse cx="292" cy="186" rx="26" ry="8" fill="#FFFFFF" opacity="0.7">
          {anim ? (
            <animate
              attributeName="opacity"
              values="0;0;0.7;0.7;0"
              keyTimes={kt}
              dur="7s"
              repeatCount="indefinite"
            />
          ) : null}
        </ellipse>
      </g>
      <line
        x1="430"
        y1="206"
        x2="476"
        y2="226"
        stroke={INK}
        strokeWidth="1.5"
      />
      <Label x={480} y={234} color={LILAC}>
        {c.labels.gel}
      </Label>
    </g>
  );
}

function BioScene({ grow }: { grow: number }) {
  const surface = `M 30 118 C 190 ${128 - grow * 10}, 260 ${132 - grow * 14}, 320 ${132 - grow * 14} C 380 ${132 - grow * 14}, 450 ${128 - grow * 10}, 610 118`;
  return (
    <g>
      <path d={body(surface)} fill="url(#ij-skin)" className="ij-fade" />
      <path d={surface} fill="none" stroke="#D9A88F" strokeWidth="3" />
      <Label x={40} y={98}>
        {c.labels.skin}
      </Label>

      {/* The gel cloud thins as it is absorbed. */}
      <ellipse
        cx="318"
        cy="222"
        rx="196"
        ry="66"
        fill="#D9C2EA"
        opacity={0.55 - grow * 0.4}
        className="ij-fade"
      />

      {THREADS.map((d, i) => {
        const start = (i % 4) * 0.12;
        const p = Math.max(0, Math.min(1, (grow - start) / (1 - start)));
        return (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={LILAC}
            strokeWidth="3.2"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - p}
            opacity={p > 0 ? 0.9 : 0}
            className="ij-thread"
          />
        );
      })}
      {PARTICLES.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={grow > 0.85 ? 4 : 6}
          fill="#FFFFFF"
          stroke="#8E5FB5"
          strokeWidth="2"
          opacity={1 - grow * 0.45}
          className="ij-fade"
        />
      ))}
      <line
        x1="470"
        y1="186"
        x2="512"
        y2="158"
        stroke={INK}
        strokeWidth="1.5"
      />
      <Label x={516} y={156}>
        {c.labels.particles}
      </Label>
      <line
        x1="420"
        y1="250"
        x2="470"
        y2="300"
        stroke={INK}
        strokeWidth="1.5"
        opacity={grow > 0.2 ? 1 : 0.3}
        className="ij-fade"
      />
      <Label x={474} y={312} color={LILAC}>
        {c.labels.collagen}
      </Label>
    </g>
  );
}
