"use client";

import { useEffect, useRef, useState } from "react";
import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import {
  menConcerns as list,
  menCopy as c,
  type MenArea,
} from "@/content/aes-men";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { MaleFace } from "@/components/pages/aesthetics/AesFaces";

const LILAC = "var(--rm-lilac-deep)";

/** Where each concern sits on the drawing (viewBox 400 x 540) and how the view turns toward it. */
const view: Record<
  MenArea,
  {
    glows: [number, number, number, number][];
    ox: number;
    oy: number;
    scale: number;
    ry: number;
    rx: number;
  }
> = {
  forehead: {
    glows: [[200, 138, 72, 26]],
    ox: 50,
    oy: 26,
    scale: 1.4,
    ry: 0,
    rx: 0,
  },
  eyes: {
    glows: [
      [157, 210, 30, 14],
      [243, 210, 30, 14],
    ],
    ox: 50,
    oy: 38,
    scale: 1.55,
    ry: 0,
    rx: 0,
  },
  scalp: {
    glows: [[200, 92, 92, 40]],
    ox: 50,
    oy: 16,
    scale: 1.35,
    ry: 0,
    rx: 16,
  },
  jaw: {
    glows: [
      [200, 352, 66, 24],
      [150, 318, 22, 26],
      [250, 318, 22, 26],
    ],
    ox: 50,
    oy: 62,
    scale: 1.4,
    ry: 0,
    rx: -8,
  },
  cheeks: {
    glows: [
      [150, 246, 30, 24],
      [250, 246, 30, 24],
    ],
    ox: 50,
    oy: 45,
    scale: 1.45,
    ry: 0,
    rx: 0,
  },
  beard: {
    glows: [
      [200, 330, 84, 40],
      [200, 392, 34, 16],
    ],
    ox: 50,
    oy: 62,
    scale: 1.35,
    ry: 0,
    rx: 0,
  },
  scars: {
    glows: [
      [146, 262, 26, 30],
      [254, 262, 26, 30],
    ],
    ox: 50,
    oy: 48,
    scale: 1.45,
    ry: 0,
    rx: 0,
  },
  masseter: {
    glows: [
      [138, 292, 20, 36],
      [262, 292, 20, 36],
    ],
    ox: 32,
    oy: 54,
    scale: 1.45,
    ry: -22,
    rx: 0,
  },
  underarm: {
    glows: [
      [88, 466, 34, 22],
      [312, 466, 34, 22],
    ],
    ox: 50,
    oy: 90,
    scale: 1.25,
    ry: 12,
    rx: -6,
  },
};

/**
 * "Pick what's bothering you": a line drawing of a man's head and shoulders that turns slowly while idle.
 * Choosing a concern turns and zooms the drawing toward that area, a soft lilac glow marks it, and a card
 * slides in with the usual options, time off and links. Thinning hair tilts to the top of the head; jaw
 * clenching makes the jaw muscles pulse. The idle turn plays only on screen and stops with Pause; still with
 * reduced motion; full strength in high contrast. Education only (copy in content/aes-men.ts).
 */
export function MenConcerns() {
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cur = sel === null ? null : list[sel];
  const v = cur ? view[cur.k] : null;
  const swaying = !reduced && playing && inView && !cur;
  const motion = reduced ? "none" : "transform 800ms cubic-bezier(.2,.8,.2,1)";
  const turn = v
    ? `perspective(1100px) rotateY(${v.ry}deg) rotateX(${v.rx}deg) scale(${v.scale})`
    : "perspective(1100px) rotateY(0deg) scale(1)";

  return (
    <Section id="men-concerns" className="scroll-mt-24">
      <style>{`
        @keyframes mn-sway { 0% { transform: perspective(1100px) rotateY(-11deg) } 100% { transform: perspective(1100px) rotateY(11deg) } }
        @keyframes mn-glow { 0%, 100% { opacity: .55 } 50% { opacity: .95 } }
        @keyframes mn-clench { 0%, 100% { transform: scale(1) } 45% { transform: scale(1.14, 1.08) } }
        @keyframes mn-in { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        .mn-sway { animation: mn-sway 7s cubic-bezier(.45,0,.55,1) infinite alternate; }
        .mn-glow { animation: mn-glow 2.6s ease-in-out infinite; }
        .mn-clench { transform-box: fill-box; transform-origin: center; animation: mn-clench 1.6s ease-in-out infinite; }
        .mn-in { animation: mn-in 450ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .mn-sway, .mn-glow, .mn-clench, .mn-in { animation: none !important; } }
        :root[data-theme="contrast"] #men-concerns .mn-glow { opacity: 1 !important; animation: none; }
        :root[data-theme="contrast"] #men-concerns .mn-soft { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-lilac-tint p-5 text-ink sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex min-w-0 flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
          <div
            role="radiogroup"
            aria-label={c.chipsLabel}
            onKeyDown={radioKeys}
            className="flex flex-wrap gap-2"
          >
            {list.map((x, i) => {
              const on = sel === i;
              return (
                <button
                  key={x.k}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={rovingTab(on, i, sel !== null)}
                  onClick={() => setSel(on ? null : i)}
                  className={cn(
                    "min-h-[44px] rounded-chip border px-4 text-left text-[14px] font-semibold transition-colors",
                    on
                      ? "border-ink bg-ink text-white"
                      : "border-[color:var(--border-default)] bg-page text-primary hover:border-ink",
                  )}
                >
                  {x.t}
                </button>
              );
            })}
          </div>
          {/* The card for the chosen concern; keyed so it slides in again on each change. */}
          <div aria-live="polite" className="min-h-[220px]">
            {cur ? (
              <article
                key={cur.k}
                className="mn-in flex flex-col gap-4 rounded-card bg-page p-5 shadow-card md:p-6"
              >
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[24px] font-medium leading-[1.1]">
                    {cur.t}
                  </h3>
                  <p className="pretty text-[15px] leading-[1.5] text-secondary">
                    {cur.d}
                  </p>
                </div>
                {cur.first ? (
                  <SmartLink
                    to={cur.first.page}
                    className="flex flex-col gap-1 rounded-row bg-sky-soft px-4 py-3 text-[14px] leading-[1.45]"
                  >
                    <span className="text-[13px] font-semibold text-link">
                      {c.firstLabel}
                    </span>
                    <span>{cur.first.t} ›</span>
                  </SmartLink>
                ) : null}
                <div className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-muted">
                    {c.optionsLabel}
                  </span>
                  <ul className="flex flex-col gap-2">
                    {cur.options.map((o) => (
                      <li
                        key={o.t}
                        className="flex gap-3 text-[14px] leading-[1.45]"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                          style={{ background: LILAC }}
                        />
                        <span>
                          <span className="font-semibold">{o.t}. </span>
                          {o.d}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-0.5 rounded-row bg-lilac-tint px-4 py-3">
                  <span className="text-[13px] font-semibold text-lilac-text">
                    {c.downtimeLabel}
                  </span>
                  <span className="text-[14px] font-semibold leading-[1.4]">
                    {cur.downtime}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <SmartLink
                    to={c.bookTo}
                    className="inline-flex min-h-[44px] items-center rounded-chip bg-ink px-5 text-[14px] font-semibold text-white hover:opacity-90"
                  >
                    {c.book}
                  </SmartLink>
                  <SmartLink
                    to={cur.more.page}
                    className="inline-flex min-h-[44px] items-center"
                  >
                    <TextLink>{cur.more.t}</TextLink>
                  </SmartLink>
                </div>
              </article>
            ) : (
              <div className="flex flex-col gap-1.5 rounded-card border border-dashed border-[color:var(--rm-lilac)] px-5 py-5">
                <span className="text-[16px] font-semibold">{c.idle}</span>
                <span className="pretty text-[14px] leading-[1.5] text-secondary">
                  {c.idleSub}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* The drawing. Phones: below the card, shorter. */}
        <div className="relative flex min-w-0 flex-col gap-3">
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
          <div
            className="relative overflow-hidden rounded-card bg-page"
            style={{ aspectRatio: "400 / 470" }}
          >
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full bg-lilac-tint"
            />
            <div
              className="absolute inset-0"
              style={{
                transformOrigin: v ? `${v.ox}% ${v.oy}%` : "50% 50%",
                transform: turn,
                transition: motion,
              }}
            >
              <div
                className={cn("h-full w-full", swaying && "mn-sway")}
                style={{ transformOrigin: "50% 50%" }}
              >
                <Face
                  area={cur?.k ?? null}
                  label={cur ? `${c.figure} ${cur.alt}` : c.figure}
                />
              </div>
            </div>
            {cur ? (
              <span className="absolute bottom-3 left-3 rounded-chip bg-ink px-3 py-1.5 text-[13px] font-semibold text-white">
                {cur.t}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Line drawing of a man's head and shoulders (ink strokes), with a glow on the chosen area. */
function Face({ area, label }: { area: MenArea | null; label: string }) {
  const g = area ? view[area].glows : [];
  const ink = "var(--text-primary)";
  const soft = {
    stroke: ink,
    strokeWidth: 2.2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg
      viewBox="0 30 400 500"
      className="h-full w-full"
      role="img"
      aria-label={label}
    >
      <defs>
        <radialGradient id="mn-g">
          <stop offset="0%" stopColor="#8E5FB5" stopOpacity=".55" />
          <stop offset="70%" stopColor="#C9A0DC" stopOpacity=".28" />
          <stop offset="100%" stopColor="#C9A0DC" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Glow under the lines so the drawing stays crisp. */}
      {g.map(([cx, cy, rx, ry], i) => (
        <ellipse
          key={`${area}-${i}`}
          className="mn-glow"
          cx={cx}
          cy={cy}
          rx={rx * 1.35}
          ry={ry * 1.35}
          fill="url(#mn-g)"
        />
      ))}
      {/* The same calm line drawing as the face map on the aesthetics pages (it replaced a darker, stiffer
          drawing, Nov 2026), placed so the concern marks below line up with it. */}
      <g transform="translate(26 15) scale(1.16)">
        <MaleFace />
      </g>
      {/* Forehead and frown lines: faint, stronger when chosen. */}
      <path
        {...soft}
        d="M160 132 Q200 126 240 132 M168 146 Q200 141 232 146"
        strokeWidth="1.4"
        className="mn-soft"
        opacity={area === "forehead" ? 0.9 : 0.3}
      />
      <path
        {...soft}
        d="M196 176 L194 190 M204 176 L206 190"
        strokeWidth="1.4"
        className="mn-soft"
        opacity={area === "forehead" ? 0.9 : 0.25}
      />
      {/* Soft under-eye lines. */}
      <path
        {...soft}
        d="M142 224 Q157 230 172 224 M228 224 Q243 230 258 224"
        strokeWidth="1.3"
        className="mn-soft"
        opacity={area === "eyes" ? 0.9 : 0.3}
      />
      {/* Masseter muscles: shown, and pulsing, only for jaw clenching. */}
      {area === "masseter" ? (
        <g>
          <path
            className="mn-clench"
            d="M130 262 C 122 286 126 314 142 328 C 150 312 152 284 146 262 Z"
            fill="#8E5FB5"
            opacity=".42"
            stroke="#8E5FB5"
            strokeWidth="1.5"
          />
          <path
            className="mn-clench"
            d="M270 262 C 278 286 274 314 258 328 C 250 312 248 284 254 262 Z"
            fill="#8E5FB5"
            opacity=".42"
            stroke="#8E5FB5"
            strokeWidth="1.5"
          />
        </g>
      ) : null}
      {/* Small marks for spots and scars, only when chosen. */}
      {area === "cheeks"
        ? [
            [142, 240],
            [156, 252],
            [150, 232],
            [246, 238],
            [258, 250],
            [252, 230],
          ].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3.2"
              fill="#8A5A3B"
              opacity=".55"
            />
          ))
        : null}
      {area === "scars"
        ? [
            [140, 258],
            [152, 270],
            [146, 280],
            [250, 258],
            [262, 270],
            [254, 282],
          ].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3.4"
              fill="none"
              stroke={ink}
              strokeWidth="1.3"
              opacity=".6"
            />
          ))
        : null}
      {area === "beard"
        ? [
            [170, 340],
            [186, 352],
            [214, 352],
            [230, 340],
            [196, 388],
            [206, 396],
          ].map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2.6"
              fill="#C4573A"
              opacity=".6"
            />
          ))
        : null}
    </svg>
  );
}
