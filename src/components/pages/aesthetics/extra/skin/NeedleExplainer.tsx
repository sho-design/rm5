"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { needleExplainer as c } from "@/content/aes-skin";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Six weeks play over 12 seconds, then the picture rests before starting again. */
const WEEKS = 6;
const RUN_MS = 12000;
const REST_MS = 2600;
const DEEP = "#5E4782";
const GOLD = "#E2B33C";

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - (1 - clamp(x)) ** 3;
const CHANNELS = [140, 200, 260, 320, 380, 440, 500];
/** Repair cells: where they start, and the channel they move to. */
const CELLS: [number, number, number][] = [
  [90, 300, 0],
  [170, 320, 1],
  [230, 290, 2],
  [300, 330, 3],
  [350, 300, 4],
  [420, 326, 5],
  [520, 296, 6],
  [470, 340, 5],
  [250, 340, 2],
];

/**
 * "Microneedling, up close" (Nov 2026): the needles make fine channels that close within hours, repair cells
 * gather, and over the following weeks collagen fibres weave across the deeper skin. A weeks slider scrubs it;
 * "Add PRP" shows golden platelets going into the open channels first. Plays only on screen, pauses on any
 * interaction, rests on a still frame with reduced motion. Education only, not results.
 */
export function NeedleExplainer() {
  const reduced = useReducedMotion();
  const [w, setW] = useState(0.2);
  const [prp, setPrp] = useState(false);
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

  useEffect(() => {
    if (reduced) setW(4);
  }, [reduced]);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    let raf = 0;
    let last = performance.now();
    let rest = 0;
    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      setW((v) => {
        if (v >= WEEKS) {
          rest += dt;
          if (rest < REST_MS) return WEEKS;
          rest = 0;
          return 0;
        }
        return Math.min(WEEKS, v + (dt / RUN_MS) * WEEKS);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [moving]);

  // Needles press in, then lift away.
  const press =
    w < 0.12 ? ease(w / 0.12) : w < 0.3 ? 1 - ease((w - 0.12) / 0.18) : 0;
  const needleO = w < 0.36 ? 1 : clamp(1 - (w - 0.36) / 0.1);
  // Channels open with the needles and close by about a week.
  const open =
    w < 0.12 ? ease(w / 0.12) : w < 0.4 ? 1 : clamp(1 - (w - 0.4) / 0.6);
  const platelets = prp ? clamp((w - 0.12) / 0.5) : 0;
  const plateletO = prp ? (w < 1.1 ? 1 : clamp(1 - (w - 1.1) / 0.5)) : 0;
  const gather = ease((w - 0.5) / 1.5);
  const cellsO =
    w < 0.5 ? 0.25 : w < 3 ? 1 : clamp(1 - (w - 3) / 1.5) * 0.7 + 0.3;
  const collagen = ease((w - 1.2) / (WEEKS - 1.4));

  const weekNo = Math.round(w);
  const stages = c.stages.filter((s) => !s.prp || prp);
  const activeStage = stages.reduce((a, s, i) => (w >= s.at ? i : a), 0);

  const set = (v: number) => {
    setPlaying(false);
    setW(v);
  };

  return (
    <Section id="microneedling" className="scroll-mt-24">
      <div
        ref={box}
        className="sk-needle grid grid-cols-1 gap-8 rounded-block border border-border bg-card p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] lg:gap-12 lg:p-12"
      >
        <figure className="m-0 flex flex-col gap-3">
          <svg
            viewBox="0 0 640 380"
            role="img"
            aria-label={c.alt(w, prp)}
            className="h-auto w-full rounded-[24px] bg-white"
          >
            <defs>
              <linearGradient id="sk-n-dermis" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F7DED2" />
                <stop offset="1" stopColor="#EDC4B4" />
              </linearGradient>
              <clipPath id="sk-n-card">
                <rect x="0" y="0" width="640" height="380" rx="24" />
              </clipPath>
              <clipPath id="sk-n-skin">
                <rect x="0" y="110" width="640" height="270" />
              </clipPath>
            </defs>
            <g clipPath="url(#sk-n-card)">
              <rect
                x="0"
                y="110"
                width="640"
                height="270"
                fill="url(#sk-n-dermis)"
              />
              <rect x="0" y="110" width="640" height="52" fill="#F9E6DC" />
              <line
                x1="0"
                y1="110"
                x2="640"
                y2="110"
                stroke="#E7BFAE"
                strokeWidth="2.5"
              />
              <line
                x1="0"
                y1="162"
                x2="640"
                y2="162"
                stroke="#EBCBBD"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />

              {/* Collagen fibres, weaving across over the weeks */}
              <g clipPath="url(#sk-n-skin)">
                {[0, 1, 2, 3, 4, 5].map((n) => {
                  const y = 196 + n * 28;
                  const d = `M -10 ${y} C 80 ${y - 16}, 150 ${y + 18}, 240 ${y} S 400 ${y - 18}, 480 ${y} S 600 ${y + 14}, 660 ${y}`;
                  const own = clamp(collagen * 1.35 - n * 0.07);
                  return (
                    <path
                      key={n}
                      d={d}
                      fill="none"
                      stroke={n % 2 ? "#C9A0DC" : "#D98FA0"}
                      strokeWidth={3.2 - n * 0.2}
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      strokeDashoffset={1 - own}
                      opacity={0.85}
                    />
                  );
                })}
              </g>

              {/* Repair cells, gathering where the channels were */}
              {CELLS.map(([x, y, ch], i) => {
                const tx = CHANNELS[ch];
                const cx = x + (tx - x) * gather;
                const cy = y + (176 - y) * gather * 0.85;
                return (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="8"
                    fill="#B9C9F0"
                    stroke="#7F98D6"
                    strokeWidth="1.5"
                    opacity={cellsO}
                  />
                );
              })}

              {/* The channels */}
              {CHANNELS.map((x) => (
                <rect
                  key={x}
                  x={x - 2.5}
                  y="110"
                  width="5"
                  height={4 + 74 * open}
                  rx="2.5"
                  fill="#C98C78"
                  opacity={0.2 + 0.8 * open}
                />
              ))}

              {/* PRP platelets, flowing into the open channels */}
              {prp
                ? CHANNELS.map((x, k) =>
                    [0, 1, 2].map((j) => {
                      const ph = clamp(platelets * 1.3 - j * 0.15);
                      return (
                        <circle
                          key={`${k}-${j}`}
                          cx={x + (j - 1) * 5}
                          cy={86 + ph * (52 + j * 10)}
                          r="4.2"
                          fill={GOLD}
                          stroke="#B8860B"
                          strokeWidth="1"
                          opacity={plateletO}
                        />
                      );
                    }),
                  )
                : null}
              {prp ? (
                <rect
                  x="0"
                  y="104"
                  width="640"
                  height="6"
                  fill={GOLD}
                  opacity={0.5 * plateletO * clamp(platelets * 2)}
                />
              ) : null}

              {/* The needle tip, pressing in on treatment day */}
              <g
                transform={`translate(0 ${-34 + 46 * press})`}
                opacity={needleO}
              >
                <rect
                  x="110"
                  y="20"
                  width="420"
                  height="30"
                  rx="15"
                  fill="#FFFFFF"
                  stroke="#CDBBDD"
                  strokeWidth="2"
                />
                {CHANNELS.map((x) => (
                  <path
                    key={x}
                    d={`M ${x - 3} 50 L ${x} 70 L ${x + 3} 50 Z`}
                    fill="#9AA6B1"
                  />
                ))}
              </g>

              {/* Week label */}
              <g transform="translate(22 22)">
                <rect
                  width={c.week(weekNo).length * 9 + 30}
                  height="34"
                  rx="17"
                  fill="#FFFFFF"
                  stroke="#E6D8F0"
                  strokeWidth="1.5"
                />
                <text
                  x="15"
                  y="22"
                  fontSize="15"
                  fontWeight="700"
                  fill="#2B1E3A"
                >
                  {c.week(weekNo)}
                </text>
              </g>
            </g>
          </svg>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">
            {c.weeksLabel}
            <input
              type="range"
              min={0}
              max={WEEKS * 10}
              step={1}
              value={Math.round(w * 10)}
              aria-valuetext={c.week(weekNo)}
              onChange={(e) => set(Number(e.target.value) / 10)}
              className="sk-range w-full"
            />
          </label>
          <figcaption className="text-[13px] text-muted">{c.note}</figcaption>
        </figure>

        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="2xs">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
          <div className="flex flex-wrap gap-2">
            {reduced ? null : (
              <button
                type="button"
                onClick={() => setPlaying((v) => !v)}
                className="rounded-chip border-[1.5px] border-border bg-white px-4 py-2 text-[13px] font-semibold hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            )}
            <button
              type="button"
              aria-pressed={prp}
              onClick={() => {
                setPrp((v) => !v);
                setPlaying(false);
                setW(reduced ? (prp ? 4 : 0.5) : 0.1);
                if (!reduced) setPlaying(true);
              }}
              className={cn(
                "rounded-chip border-[1.5px] px-4 py-2 text-[13px] font-semibold",
                prp
                  ? "border-[#B8860B] bg-sun-tint"
                  : "border-border bg-white hover:border-ink",
              )}
            >
              <span
                aria-hidden
                className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full align-middle"
                style={{ background: GOLD }}
              />
              {c.prpLabel}
            </button>
          </div>
          <ol className="flex flex-col gap-1.5">
            {stages.map((s, i) => {
              const active = activeStage === i;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => set(s.at === 0 ? 0.1 : s.at + 0.2)}
                    className={cn(
                      "flex w-full gap-3 rounded-[16px] px-3.5 py-2.5 text-left motion-safe:transition-colors",
                      active
                        ? "bg-white shadow-[0_10px_30px_-18px_rgba(15,31,46,0.45)]"
                        : "hover:bg-white/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 h-3 w-3 shrink-0 rounded-full",
                        active ? "" : "bg-border",
                      )}
                      style={
                        active ? { background: s.prp ? GOLD : DEEP } : undefined
                      }
                    />
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] font-semibold">{s.t}</span>
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
      </div>
    </Section>
  );
}
