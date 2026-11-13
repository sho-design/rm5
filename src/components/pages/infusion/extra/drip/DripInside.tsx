"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import {
  dripFamilies,
  dripInside,
  signatureDrips,
} from "@/content/infusion-site";
import { dripInsideCopy as c } from "@/content/inf-drip";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Phases of one drip: 0 screened, 1 mixed (tiles drop in, then the stamp), 2 into a vein, 3 the 45 minutes. */
type Phase = 0 | 1 | 2 | 3;
const TILE_MS = 650;
const PHASE_MS: Record<Phase, number> = { 0: 2200, 1: 2600, 2: 3400, 3: 4200 };
const RING = 2 * Math.PI * 46;

function itemsFor(slug: string): string[] {
  const x = dripInside[slug];
  if (!x) return [c.consult];
  return [...x.items, ...(x.consult || !x.items.length ? [c.consult] : [])];
}

/**
 * "Inside your drip": an IV bag that starts empty. Pick a drip and its ingredient tiles drop into the bag one by
 * one, a "Mixed at your appointment, after screening" stamp lands, the fluid runs down the line through the drip
 * chamber (falling drops) to a vein in the forearm, and a calm ring counts the 45 minutes. Only ingredients the
 * menu states are shown; the rest reads "Confirmed at your consult". Plays only on screen, Pause stops it, a still
 * finished frame with reduced motion, full strength in high contrast. With `drip` (a drip's own page) it shows
 * that drip only; without it, it tours the menu until someone picks one.
 */
export function DripInside({
  drip,
  className,
}: {
  drip?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [slug, setSlug] = useState(
    drip ?? signatureDrips[1]?.slug ?? signatureDrips[0].slug,
  );
  const [phase, setPhase] = useState<Phase>(0);
  const [tiles, setTiles] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [tour, setTour] = useState(!drip);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);

  const d = signatureDrips.find((x) => x.slug === slug) ?? signatureDrips[0];
  const items = itemsFor(d.slug);
  const color = dripFamilies[d.f];
  const moving = playing && inView && !reduced;
  // Reduced motion: the finished picture, everything in place.
  const shownPhase: Phase = reduced ? 3 : phase;
  const shownTiles = reduced || shownPhase >= 2 ? items.length : tiles;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.3,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // SMIL loops (drops, flowing line) follow Pause and leaving the screen.
  useEffect(() => {
    const s = svg.current;
    if (!s || typeof s.pauseAnimations !== "function") return;
    if (moving) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [moving, phase]);

  // Tiles drop in one by one during the "mixed" phase.
  useEffect(() => {
    if (!moving || phase !== 1 || tiles >= items.length) return;
    const t = window.setTimeout(
      () => setTiles((n) => n + 1),
      tiles === 0 ? 300 : TILE_MS,
    );
    return () => window.clearTimeout(t);
  }, [moving, phase, tiles, items.length]);

  // The phase clock. After the last phase: the next drip when touring, else the same drip again.
  useEffect(() => {
    if (!moving) return;
    const wait =
      phase === 1 ? PHASE_MS[1] + items.length * TILE_MS : PHASE_MS[phase];
    const t = window.setTimeout(() => {
      if (phase < 3) {
        setPhase((p) => (p + 1) as Phase);
        return;
      }
      if (tour) {
        const i = signatureDrips.findIndex((x) => x.slug === slug);
        setSlug(signatureDrips[(i + 1) % signatureDrips.length].slug);
      }
      setTiles(0);
      setPhase(0);
      setCycle((n) => n + 1);
    }, wait);
    return () => window.clearTimeout(t);
  }, [moving, phase, tour, slug, items.length]);

  const pick = (s: string) => {
    setTour(false);
    setSlug(s);
    setTiles(0);
    setPhase(0);
    setCycle((n) => n + 1);
  };
  const jump = (p: Phase) => {
    setPlaying(false);
    setTour(false);
    setPhase(p);
    setTiles(p >= 1 ? items.length : 0);
  };

  const fill =
    shownPhase === 0
      ? 0.06
      : 0.1 + 0.72 * (shownTiles / Math.max(1, items.length));
  const flowing = shownPhase >= 2;
  const ring = shownPhase === 3 ? 0 : RING;
  const label = c.figure(d.t, c.steps[shownPhase].t, items.join(", "));
  const anim = !reduced;

  return (
    <Section id="inside-your-drip" className={cn("scroll-mt-6", className)}>
      <style>{`
        @keyframes dr-drop { from { opacity: 0; transform: translateY(-46px) scale(.96) } 60% { opacity: 1 } to { opacity: 1; transform: none } }
        @keyframes dr-stamp { from { opacity: 0; transform: rotate(-8deg) scale(1.35) } to { opacity: 1; transform: rotate(-8deg) scale(1) } }
        .dr-tile { animation: dr-drop 520ms cubic-bezier(.2,.8,.2,1) both; }
        .dr-stamp { animation: dr-stamp 380ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .dr-tile, .dr-stamp { animation: none; } .dr-stamp { transform: rotate(-8deg); } }
        :root[data-theme="contrast"] .dr-fig [data-dim] { opacity: 1 !important; }
        :root[data-theme="contrast"] .dr-step { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-sage-tint p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex min-w-0 flex-col gap-5">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>

          {drip ? null : (
            <div
              role="radiogroup"
              aria-label={c.pickLabel}
              onKeyDown={radioKeys}
              className="flex flex-wrap gap-2"
            >
              {signatureDrips.map((x, i) => {
                const on = !tour && x.slug === slug;
                const showing = x.slug === slug;
                return (
                  <button
                    key={x.slug}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={rovingTab(on, i, !tour)}
                    onClick={() => pick(x.slug)}
                    className={cn(
                      "flex min-h-[44px] items-center gap-2 rounded-chip border px-3.5 text-[14px] font-semibold transition-colors",
                      on
                        ? "border-ink bg-ink text-white"
                        : showing
                          ? "border-ink bg-page"
                          : "border-[color:var(--border-default)] bg-page hover:border-ink",
                    )}
                  >
                    <span
                      aria-hidden
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: dripFamilies[x.f] }}
                    />
                    {x.t}
                  </button>
                );
              })}
            </div>
          )}

          <ol className="flex flex-col gap-2">
            {c.steps.map((s, i) => {
              const on = shownPhase === i;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    onClick={() => jump(i as Phase)}
                    aria-current={on ? "step" : undefined}
                    className={cn(
                      "dr-step flex w-full items-start gap-3 rounded-card-sm px-4 py-3 text-left transition-[background-color,opacity] duration-300",
                      on
                        ? "bg-page shadow-card"
                        : "opacity-70 hover:opacity-100",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-bold",
                        on ? "bg-ink text-white" : "bg-page text-ink",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-0.5">
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
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[13px] font-semibold text-sage-text">
              {c.note}
            </span>
            {reduced ? null : (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="flex min-h-[44px] items-center gap-2 rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold hover:border-ink"
              >
                <svg
                  aria-hidden
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  {playing ? (
                    <>
                      <rect x="1.5" y="1" width="3" height="10" rx="1" />
                      <rect x="7.5" y="1" width="3" height="10" rx="1" />
                    </>
                  ) : (
                    <path d="M2.5 1.2v9.6L10.5 6z" />
                  )}
                </svg>
                {playing ? c.pause : c.play}
              </button>
            )}
          </div>

          <div
            role="img"
            aria-label={label}
            className="dr-fig relative flex flex-col items-center overflow-hidden rounded-card bg-page px-4 pb-4 pt-6"
          >
            {/* The bag, as markup so its words stay readable at any size. */}
            <div aria-hidden className="flex flex-col items-center">
              <span className="h-3 w-10 rounded-t-[8px] border-2 border-b-0 border-[color:var(--rm-ink-3)]" />
              <div className="relative flex min-h-[230px] w-[188px] flex-col overflow-hidden rounded-[30px] border-2 border-[color:var(--rm-ink-3)] bg-[color:var(--rm-paper-2)] sm:w-[210px]">
                <span
                  className="absolute inset-x-0 bottom-0 transition-[height] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
                  style={{
                    height: `${fill * 100}%`,
                    background: `color-mix(in srgb, ${color} 34%, transparent)`,
                  }}
                />
                <span className="absolute inset-x-0 top-3 text-center text-[13px] font-semibold text-muted">
                  {d.t}
                </span>
                <ul className="relative mt-auto flex flex-col-reverse gap-1.5 p-3 pt-10">
                  {items.slice(0, shownTiles).map((it) => (
                    <li
                      key={`${cycle}-${d.slug}-${it}`}
                      className={cn(
                        "dr-tile rounded-[10px] px-2.5 py-1.5 text-center text-[13px] font-semibold leading-[1.25] shadow-[0_2px_6px_rgba(15,31,46,.08)]",
                        it === c.consult
                          ? "border border-dashed border-[color:var(--rm-ink-3)] bg-page text-secondary"
                          : "bg-page text-ink",
                      )}
                      style={{
                        borderLeft:
                          it === c.consult ? undefined : `4px solid ${color}`,
                      }}
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                {shownPhase >= 1 && (reduced || shownTiles >= items.length) ? (
                  <span
                    key={`stamp-${cycle}-${d.slug}`}
                    className="dr-stamp absolute inset-x-0 top-[34%] mx-auto w-[150px] rounded-[10px] border-2 border-[color:var(--rm-sage-text)] bg-page/95 px-2 py-1.5 text-center text-[12px] font-bold uppercase leading-[1.2] tracking-[.03em] text-sage-text"
                  >
                    {c.stamp}
                  </span>
                ) : null}
              </div>
              <span className="h-3 w-5 rounded-b-[6px] border-2 border-t-0 border-[color:var(--rm-ink-3)] bg-[color:var(--rm-paper-2)]" />
            </div>

            {/* The line, the drip chamber, the forearm and the 45 minute ring. */}
            <svg
              ref={svg}
              aria-hidden
              viewBox="0 0 600 250"
              className="-mt-1 block h-auto w-full"
            >
              {/* Timer ring, bottom left. */}
              <g transform="translate(118 150)">
                <circle
                  r="46"
                  fill="none"
                  stroke="var(--rm-line)"
                  strokeWidth="9"
                />
                <circle
                  r="46"
                  fill="none"
                  stroke={color}
                  strokeWidth="9"
                  strokeLinecap="round"
                  transform="rotate(-90)"
                  strokeDasharray={RING}
                  strokeDashoffset={ring}
                  style={{
                    transition: anim
                      ? `stroke-dashoffset ${PHASE_MS[3] - 400}ms linear`
                      : "none",
                  }}
                />
                <text
                  textAnchor="middle"
                  y="-2"
                  fontSize="26"
                  fontWeight="700"
                  fill="var(--rm-ink)"
                >
                  45
                </text>
                <text
                  textAnchor="middle"
                  y="20"
                  fontSize="15"
                  fill="var(--rm-ink-2)"
                >
                  min
                </text>
              </g>
              {/* Drip chamber under the bag. */}
              <g
                data-dim
                style={{
                  opacity: shownPhase >= 1 ? 1 : 0.6,
                  transition: "opacity 350ms cubic-bezier(.2,.8,.2,1)",
                }}
              >
                <rect
                  x="286"
                  y="4"
                  width="28"
                  height="54"
                  rx="8"
                  fill="var(--rm-paper-2)"
                  stroke="var(--rm-ink-3)"
                  strokeWidth="2"
                />
                <rect
                  x="288"
                  y={58 - 18}
                  width="24"
                  height="16"
                  rx="5"
                  fill={color}
                  opacity={flowing ? 0.55 : 0.18}
                />
                {flowing && anim ? (
                  <circle cx="300" r="3.6" fill={color}>
                    <animate
                      attributeName="cy"
                      values="12;40"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="1;1;0"
                      keyTimes="0;.85;1"
                      dur="1.1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                ) : flowing ? (
                  <circle cx="300" cy="26" r="3.6" fill={color} />
                ) : null}
              </g>
              {/* Tube from the chamber to the arm. */}
              <path
                id="dr-tube"
                d="M300 58 C 300 120 330 150 400 160 S 470 168 500 170"
                fill="none"
                stroke="var(--rm-line)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M300 58 C 300 120 330 150 400 160 S 470 168 500 170"
                fill="none"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="7 11"
                style={{
                  opacity: flowing ? 1 : 0,
                  transition: "opacity 400ms cubic-bezier(.2,.8,.2,1)",
                }}
              >
                {anim ? (
                  <animate
                    attributeName="stroke-dashoffset"
                    values="36;0"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </path>
              {/* Forearm with a vein, coming in from the right. */}
              <path
                d="M600 132 L 470 140 C 444 142 432 156 432 172 C 432 190 446 202 470 202 L 600 210 Z"
                fill="#F6DCCB"
                stroke="#C9A48F"
                strokeWidth="2"
              />
              <path
                d="M600 168 C 560 166 520 172 476 172"
                fill="none"
                stroke={flowing ? color : "#9DB4D3"}
                strokeWidth="4"
                strokeLinecap="round"
                style={{ transition: "stroke 600ms cubic-bezier(.2,.8,.2,1)" }}
              />
              {/* IV site with tape. */}
              <rect
                x="486"
                y="158"
                width="34"
                height="24"
                rx="5"
                fill="#FFFFFF"
                stroke="#C9D2DB"
                strokeWidth="2"
                opacity=".95"
              />
              <circle
                cx="500"
                cy="170"
                r="4"
                fill={flowing ? color : "#9DB4D3"}
              />
              <text
                x="520"
                y="232"
                textAnchor="middle"
                fontSize="15"
                fill="var(--rm-ink-2)"
              >
                {c.inArm}
              </text>
              <text
                x="118"
                y="226"
                textAnchor="middle"
                fontSize="15"
                fill="var(--rm-ink-2)"
              >
                {c.timer}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
