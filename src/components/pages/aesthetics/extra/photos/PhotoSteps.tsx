"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { photosCopy as c } from "@/content/aes-photos";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** One beat of the loop; ten beats from setting up to the chart locking. */
const TICK_MS = 1300;
const TICKS = 10;
/** First beat of each step, for the step buttons. */
const STEP_START = [0, 2, 7];

const INK = "var(--rm-ink)";
const LILAC = "var(--rm-lilac-deep)";
const ease = "cubic-bezier(.2,.8,.2,1)";

/** Head and shoulders, straight on. */
function Front() {
  return (
    <g
      stroke={INK}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M232 304 C 242 266 274 252 310 252 C 346 252 378 266 388 304"
        fill="var(--rm-lilac-tint)"
      />
      <path d="M292 214 L292 254 M328 214 L328 254" fill="none" />
      <ellipse cx="310" cy="152" rx="54" ry="66" fill="#FFFFFF" />
      <path
        d="M258 128 C 262 98 284 84 310 84 C 338 84 360 100 362 128 C 346 112 330 106 310 106 C 290 106 272 112 258 128 Z"
        fill="var(--rm-lilac)"
        fillOpacity=".55"
      />
      <path
        d="M288 150 Q296 146 304 150 M316 150 Q324 146 332 150 M310 156 L306 176 Q310 180 316 177 M296 194 Q310 200 324 194"
        fill="none"
      />
    </g>
  );
}

/** Head and shoulders in profile, facing left. Mirrored for the right side. */
function Side({ mirror }: { mirror?: boolean }) {
  return (
    <g
      transform={mirror ? "translate(620 0) scale(-1 1)" : undefined}
      stroke={INK}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M240 304 C 252 268 280 254 316 252 C 346 252 372 266 382 304"
        fill="var(--rm-lilac-tint)"
      />
      <path
        d="M330 88 C 300 86 278 102 272 128 L264 148 L272 152 C 270 162 272 170 278 174 L274 182 C 276 190 284 196 292 198 C 296 210 300 220 304 228 L304 254 L346 254 L346 214 C 362 198 372 176 372 150 C 372 112 356 90 330 88 Z"
        fill="#FFFFFF"
      />
      <path
        d="M330 88 C 356 90 372 112 372 140 C 360 120 344 110 322 108 C 304 106 290 110 280 118 C 290 98 308 88 330 88 Z"
        fill="var(--rm-lilac)"
        fillOpacity=".55"
      />
      <path
        d="M288 146 Q294 143 300 146 M330 150 C 338 146 344 152 342 160 C 340 166 334 168 330 164"
        fill="none"
      />
    </g>
  );
}

/**
 * "How we take your photos" for the before-and-after page: a soft light and a camera frame with a grid line up on a
 * face, the same set-up photographs the front and both sides, and the three photos slide into a folder marked
 * "Your chart", which locks. The site shows no patient photos; this only explains how consult photos are taken
 * and kept. Plays only on screen, Pause stops it, a step can be picked; still with reduced motion; full strength
 * in high contrast. New details are draft, for the clinic to confirm (content/aes-photos.ts).
 */
export function PhotoSteps() {
  const reduced = useReducedMotion();
  const [t, setT] = useState(0);
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
    const id = window.setInterval(() => setT((x) => (x + 1) % TICKS), TICK_MS);
    return () => window.clearInterval(id);
  }, [moving]);

  // Reduced motion: one still picture with the three photos taken and filed.
  const tick = reduced ? 9 : t;
  const step = tick < 2 ? 0 : tick < 7 ? 1 : 2;
  const angle = reduced ? 0 : tick < 3 ? 0 : tick < 5 ? 1 : 2;
  const taken = (tick >= 2 ? 1 : 0) + (tick >= 4 ? 1 : 0) + (tick >= 6 ? 1 : 0);
  const flash = !reduced && (tick === 2 || tick === 4 || tick === 6);
  const filed = tick >= 8;
  const locked = tick >= 9;

  const pick = (i: number) => {
    setPlaying(false);
    setT(STEP_START[i] + (i === 2 ? 2 : 0));
  };

  return (
    <Section id="photo-steps" className="scroll-mt-24">
      <style>{`
        @keyframes ph-flash { 0% { opacity: .9 } 100% { opacity: 0 } }
        .ph-flash { animation: ph-flash 700ms ${ease} both; }
        @keyframes ph-glow { 0%,100% { opacity: .55 } 50% { opacity: .85 } }
        .ph-glow { animation: ph-glow 3.2s ease-in-out infinite; }
        .ph-paused .ph-glow { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .ph-glow, .ph-flash { animation: none } }
        :root[data-theme="contrast"] .ph-dim { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className={cn(
          "grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12 lg:p-12",
          !moving && "ph-paused",
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
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[44px] w-fit rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[13px] font-semibold hover:border-ink"
            >
              {playing ? c.pause : c.play}
            </button>
          ) : null}
          <ol className="flex flex-col gap-2">
            {c.steps.map((s, i) => {
              const on = i === step;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "flex w-full gap-3 rounded-[16px] p-3.5 text-left transition-colors",
                      on ? "bg-white shadow-card" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                        on
                          ? "bg-lilac-deep text-white"
                          : "bg-white text-lilac-text",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold">{s.t}</span>
                      <span className="pretty text-[14px] leading-[1.45] text-secondary">
                        {s.d}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="pretty rounded-card bg-white/70 p-4 text-[15px] leading-[1.5]">
            {c.choice}
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <span className="text-[13px] font-semibold text-muted">
            {c.illustration}
          </span>
          <div className="overflow-hidden rounded-card bg-white">
            <svg
              viewBox="0 0 560 380"
              className="h-auto w-full"
              role="img"
              aria-label={c.figure[step]}
            >
              {/* Soft light, the same for every photo. */}
              <g>
                <ellipse
                  className="ph-glow"
                  cx="150"
                  cy="150"
                  rx="70"
                  ry="90"
                  fill="#FFF3C4"
                />
                <rect
                  x="56"
                  y="80"
                  width="56"
                  height="120"
                  rx="10"
                  fill="#FFFFFF"
                  stroke={INK}
                  strokeWidth="2"
                />
                <rect
                  x="64"
                  y="88"
                  width="40"
                  height="104"
                  rx="6"
                  fill="#FFF3C4"
                />
                <path
                  d="M84 200 L84 262 M66 262 L102 262"
                  stroke={INK}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <text
                  x="84"
                  y="290"
                  textAnchor="middle"
                  fontSize="13"
                  fill="var(--rm-ink-2)"
                >
                  {c.light}
                </text>
              </g>

              {/* The person, turning for each angle. */}
              <g key={angle}>
                {angle === 0 ? (
                  <Front />
                ) : angle === 1 ? (
                  <Side />
                ) : (
                  <Side mirror />
                )}
              </g>

              {/* Camera frame with a thirds grid, fixed in place. */}
              <g
                fill="none"
                stroke={LILAC}
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M222 56 L222 36 L242 36 M378 36 L398 36 L398 56 M398 268 L398 288 L378 288 M242 288 L222 288 L222 268" />
              </g>
              <g
                className="ph-dim"
                stroke={LILAC}
                strokeWidth="1"
                opacity=".35"
                strokeDasharray="4 6"
              >
                <path d="M274 36 L274 288 M346 36 L346 288 M222 120 L398 120 M222 204 L398 204" />
              </g>
              <rect
                x="226"
                y="296"
                width="168"
                height="24"
                rx="12"
                fill="var(--rm-lilac-tint)"
              />
              <text
                x="310"
                y="312"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--rm-ink)"
              >
                {c.angles[angle]}
              </text>
              {flash ? (
                <rect
                  key={`f${tick}`}
                  className="ph-flash"
                  x="222"
                  y="36"
                  width="176"
                  height="252"
                  fill="#FFFFFF"
                />
              ) : null}

              {/* Your chart: a folder that the three photos slide into, then a lock. */}
              <g>
                <path
                  d="M432 226 L466 226 L476 236 L536 236 Q542 236 542 242 L542 318 Q542 324 536 324 L438 324 Q432 324 432 318 Z"
                  fill="var(--rm-lilac-tint)"
                  stroke={INK}
                  strokeWidth="2"
                />
                <text
                  x="487"
                  y="346"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="600"
                  fill="var(--rm-ink)"
                >
                  {c.chart}
                </text>
                <g
                  style={{
                    opacity: locked ? 1 : 0,
                    transition: `opacity 300ms ${ease}`,
                  }}
                >
                  <rect
                    x="474"
                    y="262"
                    width="26"
                    height="22"
                    rx="4"
                    fill={INK}
                  />
                  <path
                    d="M479 262 L479 254 Q479 244 487 244 Q495 244 495 254 L495 262"
                    fill="none"
                    stroke={INK}
                    strokeWidth="3"
                  />
                </g>
              </g>
              {[0, 1, 2].map((i) => {
                const shownNow = i < taken;
                const x = filed ? 452 + i * 10 : 446 + i * 32;
                const y = filed ? 290 - i * 4 : 150;
                return (
                  <g
                    key={i}
                    style={{
                      opacity: shownNow ? (filed && locked ? 0 : 1) : 0,
                      transform: `translate(${x}px, ${y}px) scale(${filed ? 0.7 : 1})`,
                      transition: reduced
                        ? "none"
                        : `transform 700ms ${ease}, opacity 400ms ${ease}`,
                    }}
                  >
                    <rect
                      width="28"
                      height="36"
                      rx="4"
                      fill="#FFFFFF"
                      stroke={INK}
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="14"
                      cy="15"
                      r="6"
                      fill="var(--rm-lilac)"
                      fillOpacity=".7"
                    />
                    <path
                      d="M6 32 Q14 24 22 32"
                      fill="none"
                      stroke={INK}
                      strokeWidth="1.4"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
