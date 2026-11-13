"use client";

import { IvBag } from "@/components/pages/infusion/DripArt";
import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { shotDripCopy as c } from "@/content/inf-shot";
import { routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";

/** Real minutes for each, and the loop length: 45 real minutes plays in about 9 seconds, so 10 take 2. */
const SHOT_MIN = 10;
const DRIP_MIN = 45;
const LOOP_MS = 12000;
const PLAY_MS = 9000;
const TICK_MS = 100;

/**
 * "Shot or drip, side by side": a shot into the upper-arm muscle and a drip into a forearm vein, each with a clock.
 * Both clocks start together while the section is on screen; the shot's finishes first. Pause stops the loop.
 * With reduced motion both drawings are still and the clocks show the full time. High contrast draws every line
 * in ink. A comparison table follows. Copy: content/inf-shot.ts.
 */
export function ShotOrDrip() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [t, setT] = useState(0);
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
    const id = window.setInterval(
      () => setT((v) => (v + TICK_MS) % LOOP_MS),
      TICK_MS,
    );
    return () => window.clearInterval(id);
  }, [moving]);

  // Minutes of real time shown so far (still frame: the whole visit).
  const mins = reduced
    ? DRIP_MIN
    : Math.min(DRIP_MIN, (t / PLAY_MS) * DRIP_MIN);
  const shotP = Math.min(1, mins / SHOT_MIN);
  const dripP = Math.min(1, mins / DRIP_MIN);
  const anim = moving ? "running" : "paused";

  return (
    <div ref={box} className="flex flex-col gap-8">
      <style>{`
        @keyframes sb-drop { 0% { transform: translateY(0); opacity: 0 } 15% { opacity: 1 } 80% { transform: translateY(16px); opacity: 1 } 100% { transform: translateY(18px); opacity: 0 } }
        @keyframes sb-flow { from { stroke-dashoffset: 24 } to { stroke-dashoffset: 0 } }
        @keyframes sb-spread { 0% { transform: scale(1); opacity: .85 } 100% { transform: scale(5); opacity: 0 } }
        @keyframes sb-press { 0%, 100% { transform: translateY(0) } 40%, 70% { transform: translateY(10px) } }
        .sb-drop { animation: sb-drop 1.4s cubic-bezier(.2,.8,.2,1) infinite; }
        .sb-flow { stroke-dasharray: 4 8; animation: sb-flow .9s linear infinite; }
        .sb-spread { transform-box: fill-box; transform-origin: center; animation: sb-spread 2s cubic-bezier(.2,.8,.2,1) infinite; }
        .sb-press { animation: sb-press 2.4s cubic-bezier(.2,.8,.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sb-drop, .sb-flow, .sb-spread, .sb-press { animation: none; }
          .sb-spread { opacity: 0; }
        }
        :root[data-theme="contrast"] .sb-art [data-line] { stroke: var(--rm-ink) !important; }
        :root[data-theme="contrast"] .sb-art [data-fill] { opacity: 1 !important; }
        :root[data-theme="contrast"] .sb-panel { border: 2px solid var(--rm-ink); }
      `}</style>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="xs">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>
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

      <div className="grid grid-cols-1 gap-card md:grid-cols-2">
        <Panel
          title={c.shot.t}
          time={c.shot.time}
          where={c.shot.where}
          progress={shotP}
          total={SHOT_MIN}
          tone="var(--rm-sage-deep)"
        >
          <ShotArt alt={c.shot.alt} anim={anim} done={shotP >= 1 && !reduced} />
        </Panel>
        <Panel
          title={c.drip.t}
          time={c.drip.time}
          where={c.drip.where}
          progress={dripP}
          total={DRIP_MIN}
          tone="var(--rm-sky)"
        >
          <DripArt alt={c.drip.alt} anim={anim} done={dripP >= 1 && !reduced} />
        </Panel>
      </div>
      <p className="text-[13px] text-muted">{c.illustration}</p>

      <div className="flex flex-col gap-4">
        <Display as="h3" size="2xs">
          {c.compareTitle}
        </Display>
        <div className="overflow-hidden rounded-card border border-[color:var(--border-default)]">
          <table className="w-full border-collapse text-left text-[15px] leading-[1.45]">
            <thead className="bg-sage-tint">
              <tr>
                <th
                  scope="col"
                  className="w-[28%] px-4 py-3 text-[13px] font-semibold text-sage-text"
                >
                  <span className="sr-only">{c.compareTitle}</span>
                </th>
                <th scope="col" className="px-4 py-3 text-[15px] font-semibold">
                  {c.shotHead}
                </th>
                <th scope="col" className="px-4 py-3 text-[15px] font-semibold">
                  {c.dripHead}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr
                  key={r.k}
                  className="border-t border-[color:var(--border-default)] align-top"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 text-[13px] font-semibold text-sage-text"
                  >
                    {r.k}
                  </th>
                  <td className="pretty px-4 py-3">{r.shot}</td>
                  <td className="pretty px-4 py-3">{r.drip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <SmartLink
            to={routes.shots}
            className="flex min-h-[44px] items-center text-[15px] font-semibold text-link"
          >
            {c.shotsLink} ›
          </SmartLink>
          <SmartLink
            to={routes.drips}
            className="flex min-h-[44px] items-center text-[15px] font-semibold text-link"
          >
            {c.dripsLink} ›
          </SmartLink>
        </div>
      </div>
    </div>
  );
}

function Panel({
  title,
  time,
  where,
  progress,
  total,
  tone,
  children,
}: {
  title: string;
  time: string;
  where: string;
  progress: number;
  total: number;
  tone: string;
  children: React.ReactNode;
}) {
  const left = Math.max(0, Math.ceil(total * (1 - progress)));
  const R = 22;
  const L = 2 * Math.PI * R;
  return (
    <div className="sb-panel flex flex-col gap-4 rounded-card bg-card p-5 md:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-[19px] font-semibold leading-[1.2]">{title}</h3>
          <span className="text-[14px] text-secondary">
            {time}, {where.charAt(0).toLowerCase() + where.slice(1)}
          </span>
        </div>
        <div className="sb-art flex shrink-0 items-center gap-2" aria-hidden>
          <svg viewBox="0 0 56 56" className="h-14 w-14">
            <circle
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke="var(--border-default)"
              strokeWidth="5"
            />
            <circle
              data-line
              cx="28"
              cy="28"
              r={R}
              fill="none"
              stroke={tone}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={L}
              strokeDashoffset={L * (1 - progress)}
              transform="rotate(-90 28 28)"
            />
          </svg>
          <span className="w-[64px] text-[13px] font-semibold tabular-nums">
            {progress >= 1 ? c.done : c.minLeft(left)}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

function ShotArt({
  alt,
  anim,
  done,
}: {
  alt: string;
  anim: string;
  done: boolean;
}) {
  const st = { animationPlayState: anim } as const;
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 -50 320 230"
      className="sb-art h-auto w-full"
    >
      {/* Upper arm cross-section: skin, fat, muscle, layered left to right. */}
      <rect
        x="0"
        y="20"
        width="320"
        height="140"
        rx="14"
        fill="var(--rm-terracotta-tint)"
      />
      <rect
        data-fill
        x="0"
        y="34"
        width="320"
        height="34"
        fill="var(--rm-sun-tint)"
      />
      <rect
        data-fill
        x="0"
        y="68"
        width="320"
        height="92"
        rx="0"
        fill="var(--rm-terracotta-tint)"
        opacity=".9"
      />
      <path
        data-line
        d="M0 68 H320"
        stroke="var(--rm-terracotta-deep)"
        strokeWidth="1.5"
        opacity=".5"
      />
      <path
        data-line
        d="M0 34 H320"
        stroke="var(--rm-terracotta-deep)"
        strokeWidth="2"
      />
      {/* Muscle fibres. */}
      {[86, 102, 118, 134, 148].map((y) => (
        <path
          key={y}
          data-line
          d={`M12 ${y} Q160 ${y - 6} 308 ${y}`}
          stroke="var(--rm-terracotta-deep)"
          strokeWidth="1"
          opacity=".35"
          fill="none"
        />
      ))}
      {/* The dose spreading in the muscle. */}
      <circle
        className="sb-spread"
        cx="160"
        cy="104"
        r="3"
        fill="var(--rm-sage-deep)"
        style={st}
        opacity={done ? 0 : undefined}
      />
      {/* Syringe, coming in from the top; the plunger presses on a loop. */}
      <path
        data-line
        d="M160 6 V104"
        stroke="var(--rm-ink)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect
        data-line
        x="148"
        y="-30"
        width="24"
        height="36"
        rx="4"
        fill="var(--bg-page)"
        stroke="var(--rm-ink)"
        strokeWidth="2"
      />
      <rect
        data-fill
        x="151"
        y="-12"
        width="18"
        height="16"
        rx="2"
        fill="var(--rm-sage-deep)"
        opacity={done ? 0.15 : 0.55}
      />
      <g className={done ? undefined : "sb-press"} style={st}>
        <path
          data-line
          d="M160 -46 V-22"
          stroke="var(--rm-ink)"
          strokeWidth="2.5"
        />
        <rect
          data-line
          x="150"
          y="-50"
          width="20"
          height="5"
          rx="2"
          fill="var(--rm-ink)"
        />
        <rect
          x="150"
          y="-24"
          width="20"
          height="4"
          rx="1"
          fill="var(--rm-ink)"
        />
      </g>
      {/* Labels. */}
      <g fontSize="12" fontWeight="600" fill="var(--rm-ink)">
        <text x="12" y="30">
          {c.shot.skin}
        </text>
        <text x="12" y="56">
          {c.shot.fat}
        </text>
        <text x="200" y="128">
          {c.shot.muscle}
        </text>
      </g>
      <path
        data-line
        d="M172 104 L196 120"
        stroke="var(--rm-ink)"
        strokeWidth="1"
      />
    </svg>
  );
}

function DripArt({
  alt,
  anim,
  done,
}: {
  alt: string;
  anim: string;
  done: boolean;
}) {
  const st = { animationPlayState: anim } as const;
  return (
    <svg
      role="img"
      aria-label={alt}
      viewBox="0 -25 320 205"
      className="sb-art h-auto w-full"
    >
      {/* Bag (the same bag as every drip on the site). */}
      <IvBag
        id="sb-bag"
        x={24}
        y={12}
        w={52}
        color="color-mix(in srgb, var(--rm-sky) 40%, var(--rm-sky-soft))"
        level={done ? 0.15 : 0.6}
        still={done}
        paused={anim === "paused"}
        stroke="var(--rm-sky)"
        strokeOpacity={1}
        lines={false}
      />
      <text x="88" y="24" fontSize="12" fontWeight="600" fill="var(--rm-ink)">
        {c.drip.bag}
      </text>
      {/* Line down to the forearm. */}
      <path
        data-line
        d="M50 102 V128 Q50 140 62 140 H150"
        stroke="var(--rm-sky)"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        className="sb-flow"
        d="M50 102 V128 Q50 140 62 140 H150"
        stroke="var(--rm-sky-text)"
        strokeWidth="2.5"
        fill="none"
        style={st}
        opacity={done ? 0 : 1}
      />
      {/* Forearm with a vein; the cannula sits in the vein. */}
      <rect
        x="120"
        y="118"
        width="200"
        height="50"
        rx="24"
        fill="var(--rm-terracotta-tint)"
      />
      <path
        data-line
        d="M130 146 Q220 136 314 146"
        stroke="var(--rm-sky)"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity=".75"
      />
      <path
        className="sb-flow"
        d="M150 142 Q220 136 314 146"
        stroke="var(--bg-page)"
        strokeWidth="2"
        fill="none"
        style={st}
        opacity={done ? 0 : 0.9}
      />
      <rect
        data-line
        x="140"
        y="134"
        width="20"
        height="10"
        rx="3"
        fill="var(--bg-page)"
        stroke="var(--rm-ink)"
        strokeWidth="1.5"
      />
      <text x="244" y="132" fontSize="12" fontWeight="600" fill="var(--rm-ink)">
        {c.drip.vein}
      </text>
    </svg>
  );
}
