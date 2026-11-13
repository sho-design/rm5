"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import {
  laserCopy as c,
  laserDevices,
  type LaserDeviceKey,
} from "@/content/aes-laser";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

type Frame = keyof typeof c.frames;

/** Frames in auto-play order. Clarity II shows both wavelengths, one after the other. */
const FRAMES: Frame[] = [
  "picosure",
  "clarity755",
  "clarity1064",
  "eco2",
  "xerf",
  "plexr",
  "healite",
];
const STEP_MS = 7000;

/** Where each frame works, in the picture's units (surface at 92, fat from 322). */
const DEPTH: Record<Frame, number> = {
  picosure: 118,
  clarity755: 236,
  clarity1064: 278,
  eco2: 204,
  xerf: 282,
  plexr: 94,
  healite: 140,
};

const frameDevice = (f: Frame): LaserDeviceKey =>
  f.startsWith("clarity") ? "clarity" : (f as LaserDeviceKey);
const colorOf = (k: LaserDeviceKey) =>
  laserDevices.find((d) => d.k === k)?.color ?? "#8E5FB5";

const SURFACE = 92;
const FAT = 322;

/**
 * "How light finds its target": a cross-section of skin (surface, epidermis, dermis, a hair root, a small vessel, a
 * cluster of pigment, collagen fibres and fat) with a device switcher. Each device shows where it works and what it
 * does there; a marker on the depth scale moves with it. Plays only while on screen, Pause stops every loop
 * (SMIL timeline paused), still with reduced motion, full strength in high contrast. Education only: no results
 * are shown. Copy in content/aes-laser.ts.
 */
/** `start`: on a device's own page, open on that device and do not tour the others. */
export function LightTarget({ start }: { start?: LaserDeviceKey } = {}) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState<Frame>(
    () => FRAMES.find((f) => frameDevice(f) === start) ?? "picosure",
  );
  const [playing, setPlaying] = useState(true);
  const [auto, setAuto] = useState(!start);
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

  // The picture's own loops follow Pause and leave the screen.
  useEffect(() => {
    const s = svg.current;
    if (!s || typeof s.pauseAnimations !== "function") return;
    if (moving) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [moving, frame]);

  // Auto-play walks through the devices until someone picks one.
  useEffect(() => {
    if (!moving || !auto) return;
    const t = window.setInterval(
      () => setFrame((f) => FRAMES[(FRAMES.indexOf(f) + 1) % FRAMES.length]),
      STEP_MS,
    );
    return () => window.clearInterval(t);
  }, [moving, auto]);

  const device = frameDevice(frame);
  const color = colorOf(device);
  const anim = !reduced;
  const pick = (k: LaserDeviceKey) => {
    setAuto(false);
    setFrame(
      k === "clarity"
        ? frame === "clarity1064"
          ? "clarity1064"
          : "clarity755"
        : k,
    );
  };
  const f = c.frames[frame];

  return (
    <Section id="how-light-works" className="scroll-mt-24">
      <style>{`
        .lx-marker { transition: transform 400ms cubic-bezier(.2,.8,.2,1); }
        @media (prefers-reduced-motion: reduce) { .lx-marker { transition: none; } }
        :root[data-theme="contrast"] .lx-fig [data-dim] { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-[#F7F3FA] p-5 text-ink md:p-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12 lg:p-12"
      >
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-lilac-text">
              {c.figEyebrow}
            </Eyebrow>
            <Display size="sm">{c.figTitle}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">
              {c.figLead}
            </p>
          </div>

          {/* Device switcher: a row of chips on phones, a list on wide screens. */}
          <div
            role="radiogroup"
            aria-label={c.pickLabel}
            onKeyDown={radioKeys}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0 lg:flex-col lg:flex-nowrap lg:gap-1.5 lg:overflow-visible"
          >
            {laserDevices.map((d, i) => {
              const on = d.k === device;
              return (
                <button
                  key={d.k}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={rovingTab(on, i, true)}
                  onClick={() => pick(d.k)}
                  className={cn(
                    "flex min-h-[44px] shrink-0 items-center gap-3 rounded-chip border px-4 text-left text-[15px] transition-colors duration-[250ms] lg:rounded-[14px] lg:py-2.5",
                    on
                      ? "border-ink bg-white font-semibold shadow-card"
                      : "border-transparent bg-white/60 hover:bg-white",
                  )}
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: d.color }}
                  />
                  <span className="flex flex-col">
                    <span>{d.name}</span>
                    <span className="hidden text-[13px] font-normal text-secondary lg:block">
                      {c.frames[d.k === "clarity" ? "clarity755" : d.k].short}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {device === "clarity" ? (
            <div
              role="radiogroup"
              aria-label={c.waveLabel}
              onKeyDown={radioKeys}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="text-[13px] font-semibold text-secondary">
                {c.waveLabel}
              </span>
              {(["clarity755", "clarity1064"] as const).map((w, i) => {
                const on = frame === w;
                return (
                  <button
                    key={w}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={rovingTab(on, i, true)}
                    onClick={() => {
                      setAuto(false);
                      setFrame(w);
                    }}
                    className={cn(
                      "min-h-[40px] rounded-chip border px-4 text-[14px] transition-colors",
                      on
                        ? "border-ink bg-ink text-white"
                        : "border-border bg-white",
                    )}
                  >
                    {w === "clarity755" ? c.wave755 : c.wave1064}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div
            aria-live="polite"
            className="flex flex-col gap-1.5 rounded-[16px] bg-white p-4 md:p-5"
          >
            <span
              className="text-[13px] font-semibold"
              style={{
                color: `color-mix(in srgb, ${color} 70%, var(--text-primary))`,
              }}
            >
              {laserDevices.find((d) => d.k === device)?.name}: {f.short}
            </span>
            <p className="pretty text-[15px] leading-[1.5]">{f.d}</p>
          </div>
        </div>

        <figure className="lx-fig m-0 flex min-w-0 flex-col gap-3">
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="flex min-h-[40px] items-center gap-2 self-start rounded-chip border border-border bg-white px-4 text-[14px] font-semibold"
            >
              <span aria-hidden>{playing ? "❚❚" : "▶"}</span>
              {playing ? c.pause : c.play}
            </button>
          ) : null}
          <svg
            ref={svg}
            viewBox="-48 0 688 440"
            role="img"
            aria-label={f.alt}
            className="h-auto w-full rounded-[18px] bg-white"
          >
            <defs>
              <linearGradient id="lx-epi" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#EFC9B6" />
                <stop offset="1" stopColor="#F5DACC" />
              </linearGradient>
              <linearGradient id="lx-derm" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F9E7DE" />
                <stop offset="1" stopColor="#F4DBCE" />
              </linearGradient>
              <linearGradient id="lx-beam" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor={color} stopOpacity="0.95" />
                <stop offset="1" stopColor={color} stopOpacity="0.15" />
              </linearGradient>
              <radialGradient id="lx-glow">
                <stop offset="0" stopColor="#FFC24D" stopOpacity="0.95" />
                <stop offset="1" stopColor="#FFC24D" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="lx-led" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F28C9A" stopOpacity="0.55" />
                <stop offset="1" stopColor="#F28C9A" stopOpacity="0" />
              </linearGradient>
              <clipPath id="lx-skin">
                <rect x="112" y={SURFACE} width="512" height={440 - SURFACE} />
              </clipPath>
            </defs>

            {/* Skin layers */}
            <g clipPath="url(#lx-skin)">
              <rect
                x="112"
                y={SURFACE}
                width="512"
                height="50"
                fill="url(#lx-epi)"
              />
              <rect
                x="112"
                y={SURFACE + 50}
                width="512"
                height={FAT - SURFACE - 50}
                fill="url(#lx-derm)"
              />
              <rect
                x="112"
                y={FAT}
                width="512"
                height={440 - FAT}
                fill="#FBF1DF"
              />
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <ellipse
                  key={n}
                  cx={140 + n * 76}
                  cy={FAT + 44 + (n % 2) * 26}
                  rx="34"
                  ry="22"
                  fill="#F6E6C8"
                  stroke="#EEDBB6"
                  strokeWidth="1.5"
                />
              ))}
              {/* Collagen fibres in the dermis */}
              <g
                data-dim
                style={{
                  opacity: device === "eco2" || device === "xerf" ? 1 : 0.6,
                }}
              >
                {[176, 206, 236, 300].map((y, n) => (
                  <path
                    key={y}
                    d={`M 112 ${y} q 32 -10 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0 t 64 0`}
                    fill="none"
                    stroke="#E7BFAE"
                    strokeWidth={n === 3 ? 2 : 2.5}
                    strokeLinecap="round"
                  />
                ))}
              </g>
              <line
                x1="112"
                y1={SURFACE}
                x2="624"
                y2={SURFACE}
                stroke="#D9A992"
                strokeWidth="3"
              />
            </g>

            {/* Hair follicle and root */}
            <g data-dim style={{ opacity: frame === "clarity755" ? 1 : 0.6 }}>
              <path
                d={`M 500 30 L 500 ${SURFACE}`}
                stroke="#3E2A22"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d={`M 492 ${SURFACE} L 492 226 Q 500 250 508 226 L 508 ${SURFACE}`}
                fill="#F1D3C4"
                stroke="#DDB19C"
                strokeWidth="2"
              />
              <line
                x1="500"
                y1={SURFACE}
                x2="500"
                y2="228"
                stroke="#5B3A2E"
                strokeWidth="3.5"
              />
              <circle cx="500" cy="236" r="11" fill="#5B3A2E" />
            </g>

            {/* A small vessel */}
            <g data-dim style={{ opacity: frame === "clarity1064" ? 1 : 0.6 }}>
              <rect
                x="318"
                y="270"
                width="132"
                height="16"
                rx="8"
                fill="#D9576A"
              >
                {anim && frame === "clarity1064" ? (
                  <>
                    <animate
                      attributeName="height"
                      values="16;16;9;16"
                      keyTimes="0;0.4;0.75;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="y"
                      values="270;270;273.5;270"
                      keyTimes="0;0.4;0.75;1"
                      dur="3.5s"
                      repeatCount="indefinite"
                    />
                  </>
                ) : null}
              </rect>
              <rect
                x="318"
                y="274"
                width="132"
                height="3"
                rx="1.5"
                fill="#F08A98"
                opacity="0.7"
              />
            </g>

            {/* A cluster of pigment near the surface */}
            <g data-dim style={{ opacity: device === "picosure" ? 1 : 0.6 }}>
              {[
                [222, 112],
                [232, 118],
                [228, 126],
                [240, 112],
                [244, 124],
                [216, 122],
                [236, 104],
              ].map(([x, y], n) => (
                <circle key={n} cx={x} cy={y} r="5" fill="#6B4433">
                  {anim && device === "picosure" ? (
                    <animate
                      attributeName="opacity"
                      values="1;1;0;0;1"
                      keyTimes="0;0.25;0.35;0.9;1"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  ) : null}
                </circle>
              ))}
            </g>

            {/* Device scenes */}
            <Scene show={device === "picosure"}>
              <Emitter x={230} color={color} />
              <rect
                x="223"
                y="58"
                width="14"
                height="60"
                rx="7"
                fill="url(#lx-beam)"
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0;1;0;0"
                    keyTimes="0;0.12;0.3;1"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </rect>
              {/* Particles: pigment shatters and drifts away */}
              {Array.from({ length: 16 }).map((_, n) => {
                const a = (n / 16) * Math.PI * 2;
                const dist = 26 + (n % 4) * 9;
                const dx = Math.cos(a) * dist;
                const dy = Math.sin(a) * dist * 0.6 + 8;
                return (
                  <circle
                    key={n}
                    cx="230"
                    cy="118"
                    r={1.6 + (n % 3) * 0.6}
                    fill="#6B4433"
                    opacity={anim ? 0 : 0.55}
                    transform={
                      anim ? undefined : `translate(${dx * 0.6} ${dy * 0.6})`
                    }
                  >
                    {anim ? (
                      <>
                        <animateTransform
                          attributeName="transform"
                          type="translate"
                          values={`0 0;0 0;${dx} ${dy};${dx * 1.4} ${dy * 1.6}`}
                          keyTimes="0;0.28;0.7;1"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;0;1;0"
                          keyTimes="0;0.28;0.45;1"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </>
                    ) : null}
                  </circle>
                );
              })}
              <Ring x={230} y={118} color={color} anim={anim} />
            </Scene>

            <Scene show={frame === "clarity755"}>
              <Emitter x={500} color={color} />
              <rect
                x="493"
                y="58"
                width="14"
                height="178"
                rx="7"
                fill="url(#lx-beam)"
                opacity={anim ? 0 : 0.8}
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0;1;0.2;0"
                    keyTimes="0;0.15;0.5;1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </rect>
              <circle
                cx="500"
                cy="236"
                r="30"
                fill="url(#lx-glow)"
                opacity={anim ? 0 : 0.8}
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0;0;1;0"
                    keyTimes="0;0.15;0.45;1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </circle>
              <Ring x={500} y={236} color={color} anim={anim} />
            </Scene>

            <Scene show={frame === "clarity1064"}>
              <Emitter x={384} color="#8E3B28" />
              <rect
                x="377"
                y="58"
                width="14"
                height="220"
                rx="7"
                fill="url(#lx-beam)"
                opacity={anim ? 0 : 0.8}
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0;1;0.2;0"
                    keyTimes="0;0.15;0.5;1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </rect>
              <ellipse
                cx="384"
                cy="278"
                rx="70"
                ry="22"
                fill="url(#lx-glow)"
                opacity={anim ? 0 : 0.7}
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0;0;0.9;0"
                    keyTimes="0;0.15;0.45;1"
                    dur="3.5s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </ellipse>
              <Ring x={384} y={278} color={color} anim={anim} />
            </Scene>

            <Scene show={device === "eco2"}>
              <rect
                x="150"
                y="34"
                width="210"
                height="22"
                rx="11"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
              />
              {Array.from({ length: 9 }).map((_, n) => {
                const x = 160 + n * 23;
                return (
                  <g key={n}>
                    <rect
                      x={x}
                      y={SURFACE}
                      width="7"
                      height={anim ? 0 : 112}
                      rx="3"
                      fill={color}
                      opacity="0.75"
                    >
                      {anim ? (
                        <animate
                          attributeName="height"
                          values="0;112;112;112;0"
                          keyTimes="0;0.2;0.45;0.92;1"
                          dur="6s"
                          begin={`${n * 0.05}s`}
                          repeatCount="indefinite"
                        />
                      ) : null}
                    </rect>
                    {/* New collagen fills the column as it heals */}
                    <path
                      d={`M ${x + 3.5} ${SURFACE + 8} q 5 9 0 18 t 0 18 t 0 18 t 0 18 t 0 18`}
                      fill="none"
                      stroke="#C9787F"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      opacity={anim ? 0 : 0.9}
                    >
                      {anim ? (
                        <animate
                          attributeName="opacity"
                          values="0;0;1;1;0"
                          keyTimes="0;0.45;0.7;0.92;1"
                          dur="6s"
                          repeatCount="indefinite"
                        />
                      ) : null}
                    </path>
                  </g>
                );
              })}
              <rect
                x="160"
                y={SURFACE}
                width="191"
                height="112"
                fill="none"
                stroke={color}
                strokeDasharray="4 6"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </Scene>

            <Scene show={device === "xerf"}>
              <rect
                x="400"
                y="62"
                width="140"
                height="26"
                rx="13"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
              />
              {[0, 1, 2].map((n) => (
                <ellipse
                  key={n}
                  cx="470"
                  cy="282"
                  rx={anim ? 10 : 40 + n * 30}
                  ry={anim ? 4 : 14 + n * 9}
                  fill="none"
                  stroke="#E79A2F"
                  strokeWidth="3"
                  opacity={anim ? 0 : 0.5 - n * 0.12}
                >
                  {anim ? (
                    <>
                      <animate
                        attributeName="rx"
                        values="10;130"
                        dur="3s"
                        begin={`${n}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="ry"
                        values="4;40"
                        dur="3s"
                        begin={`${n}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.85;0"
                        dur="3s"
                        begin={`${n}s`}
                        repeatCount="indefinite"
                      />
                    </>
                  ) : null}
                </ellipse>
              ))}
              {/* Fibres in the deep layer draw tighter */}
              {[262, 286, 306].map((y) => {
                const loose = `M 360 ${y} q 30 -16 60 0 t 60 0 t 60 0 t 60 0`;
                const tight = `M 360 ${y} q 30 -4 60 0 t 60 0 t 60 0 t 60 0`;
                return (
                  <path
                    key={y}
                    d={anim ? loose : tight}
                    fill="none"
                    stroke="#B25F4A"
                    strokeWidth="3"
                    strokeLinecap="round"
                  >
                    {anim ? (
                      <animate
                        attributeName="d"
                        values={`${loose};${loose};${tight};${tight};${loose}`}
                        keyTimes="0;0.3;0.6;0.9;1"
                        dur="6s"
                        repeatCount="indefinite"
                      />
                    ) : null}
                  </path>
                );
              })}
            </Scene>

            <Scene show={device === "plexr"}>
              <g>
                <path
                  d="M 0 0 L 70 -46"
                  stroke="#5A6B7B"
                  strokeWidth="6"
                  strokeLinecap="round"
                  transform={`translate(180 ${SURFACE - 12})`}
                >
                  {anim ? (
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values={`180 ${SURFACE - 12};216 ${SURFACE - 12};252 ${SURFACE - 12};288 ${SURFACE - 12};324 ${SURFACE - 12};180 ${SURFACE - 12}`}
                      dur="4s"
                      calcMode="discrete"
                      repeatCount="indefinite"
                    />
                  ) : null}
                </path>
                {[180, 216, 252, 288, 324].map((x, n) => (
                  <g key={x}>
                    <circle
                      cx={x}
                      cy={SURFACE - 6}
                      r="5"
                      fill="#FFFFFF"
                      stroke={color}
                      strokeWidth="2.5"
                      opacity={anim ? 0 : 0.9}
                    >
                      {anim ? (
                        <animate
                          attributeName="opacity"
                          values="0;1;0.25"
                          dur="4s"
                          begin={`${n * 0.8}s`}
                          repeatCount="indefinite"
                          keyTimes="0;0.05;1"
                        />
                      ) : null}
                    </circle>
                    <circle
                      cx={x}
                      cy={SURFACE + 3}
                      r="3"
                      fill="#B8786A"
                      opacity={anim ? 0 : 0.8}
                    >
                      {anim ? (
                        <animate
                          attributeName="opacity"
                          values="0;0.9;0.9"
                          keyTimes="0;0.1;1"
                          dur="4s"
                          begin={`${n * 0.8}s`}
                          repeatCount="indefinite"
                        />
                      ) : null}
                    </circle>
                  </g>
                ))}
              </g>
              {/* The surface draws slightly upward under the sparks */}
              <path
                d={`M 160 ${SURFACE} Q 252 ${anim ? SURFACE : SURFACE - 7} 344 ${SURFACE}`}
                fill="none"
                stroke={color}
                strokeWidth="3"
              >
                {anim ? (
                  <animate
                    attributeName="d"
                    values={`M 160 ${SURFACE} Q 252 ${SURFACE} 344 ${SURFACE};M 160 ${SURFACE} Q 252 ${SURFACE - 9} 344 ${SURFACE};M 160 ${SURFACE} Q 252 ${SURFACE} 344 ${SURFACE}`}
                    dur="4s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </path>
            </Scene>

            <Scene show={device === "healite"}>
              <rect
                x="150"
                y="18"
                width="440"
                height="22"
                rx="11"
                fill="#FFFFFF"
                stroke={color}
                strokeWidth="2"
              />
              {Array.from({ length: 12 }).map((_, n) => (
                <circle key={n} cx={168 + n * 37} cy="29" r="4" fill={color} />
              ))}
              <rect
                x="150"
                y="40"
                width="440"
                height="128"
                fill="url(#lx-led)"
                opacity={anim ? 0.5 : 0.75}
              >
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0.35;0.8;0.35"
                    dur="3.2s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </rect>
            </Scene>

            {/* Depth scale with a marker that follows the device */}
            <g>
              <rect x="-48" y="0" width="160" height="440" fill="#FFFFFF" />
              <line
                x1="96"
                y1={SURFACE}
                x2="96"
                y2="430"
                stroke="#C9D2DB"
                strokeWidth="2"
              />
              {(
                [
                  [SURFACE, c.layers.surface],
                  [118, c.layers.epidermis],
                  [196, c.layers.dermis],
                  [282, c.layers.deep],
                  [380, c.layers.fat],
                ] as const
              ).map(([y, t]) => (
                <g key={t}>
                  <line
                    x1="90"
                    y1={y}
                    x2="102"
                    y2={y}
                    stroke="#C9D2DB"
                    strokeWidth="2"
                  />
                  <text
                    x="84"
                    y={y + 5}
                    textAnchor="end"
                    fontSize="15"
                    fill="#3C4A57"
                  >
                    {t}
                  </text>
                </g>
              ))}
              <text
                x="96"
                y="70"
                textAnchor="middle"
                fontSize="15"
                fontWeight="600"
                fill="#3C4A57"
              >
                {c.depth}
              </text>
              <g
                className="lx-marker"
                style={{ transform: `translateY(${DEPTH[frame]}px)` }}
              >
                <path d="M 104 0 L 118 -8 L 118 8 Z" fill={color} />
                <circle
                  cx="96"
                  cy="0"
                  r="6"
                  fill={color}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              </g>
            </g>
          </svg>
          <figcaption className="text-[13px] text-secondary">
            {c.note}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

function Scene({ show, children }: { show: boolean; children: ReactNode }) {
  return show ? <g>{children}</g> : null;
}

/** A handpiece above the skin. */
function Emitter({ x, color }: { x: number; color: string }) {
  return (
    <g>
      <rect
        x={x - 22}
        y="14"
        width="44"
        height="40"
        rx="12"
        fill="#FFFFFF"
        stroke="#C9D2DB"
        strokeWidth="2"
      />
      <rect x={x - 9} y="50" width="18" height="10" rx="4" fill={color} />
    </g>
  );
}

/** A soft ring that marks the target. */
function Ring({
  x,
  y,
  color,
  anim,
}: {
  x: number;
  y: number;
  color: string;
  anim: boolean;
}) {
  return (
    <circle
      cx={x}
      cy={y}
      r="16"
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      opacity={anim ? 0 : 0.7}
    >
      {anim ? (
        <>
          <animate
            attributeName="r"
            values="12;28"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.9;0"
            dur="2s"
            repeatCount="indefinite"
          />
        </>
      ) : null}
    </circle>
  );
}
