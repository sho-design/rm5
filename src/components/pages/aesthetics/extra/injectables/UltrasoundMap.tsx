"use client";

import { useEffect, useRef, useState } from "react";
import { injCopy as c } from "@/content/aes-injectables";
import { useReducedMotion } from "@/lib/a11y";

const SWEEP = "5s";
const CORAL = "#C4573A";
const SKY = "#2F7FD1";

/**
 * Ultrasound vessel mapping: a wireless handheld scanner (Clarius-style, no cable, no cart) glides across the
 * cheek while the tablet beside it shows the vessels underneath lighting up as the scanner passes over them.
 * Plays only on screen; Pause stops it; a still picture with reduced motion.
 */
export function UltrasoundMap() {
  const reduced = useReducedMotion();
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
  useEffect(() => {
    const s = svg.current;
    if (!s) return;
    if (moving) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [moving]);
  const anim = !reduced;

  // The scanner sweeps between x 70 and x 230 (its centre). Each vessel lights when the scanner is over it.
  const glow = (from: number) => {
    // Fraction of the sweep at which the scanner sits over x = from (there and back).
    const f = Math.max(0, Math.min(1, (from - 70) / 160));
    const a = f / 2;
    const lo = 0.15;
    // Peaks at a (going) and 1 - a (coming back). Points whose time would not increase are dropped, so the
    // two peaks merge into one at the far end of the sweep.
    const pts: [number, "lo" | "hi"][] = [
      [0, "lo"],
      [a - 0.07, "lo"],
      [a, "hi"],
      [a + 0.08, "lo"],
      [1 - a - 0.08, "lo"],
      [1 - a, "hi"],
      [1 - a + 0.07, "lo"],
      [1, "lo"],
    ];
    const kept: [number, "lo" | "hi"][] = [];
    for (const [t, v] of pts) {
      const tt = Math.max(0, Math.min(1, t));
      if (kept.length === 0 ? tt === 0 : tt > kept[kept.length - 1][0] + 0.001)
        kept.push([tt, v]);
    }
    if (kept[kept.length - 1][0] < 1) kept.push([1, "lo"]);
    return {
      values: (hi: number) =>
        kept.map(([, v]) => (v === "hi" ? hi : lo)).join(";"),
      keyTimes: kept.map(([t]) => t.toFixed(3)).join(";"),
    };
  };
  const vessels: { d: string; x: number; screen: string }[] = [
    {
      d: "M 60 150 C 96 168, 104 208, 92 250",
      x: 92,
      screen: "M 392 140 C 430 170, 444 230, 428 300",
    },
    {
      d: "M 150 130 C 168 176, 156 214, 172 262",
      x: 162,
      screen: "M 486 120 C 506 190, 490 240, 512 310",
    },
    {
      d: "M 232 150 C 214 190, 236 222, 222 268",
      x: 228,
      screen: "M 572 140 C 548 200, 574 250, 556 312",
    },
  ];

  return (
    <div ref={box} className="flex flex-col gap-3">
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
          ref={svg}
          viewBox="0 0 640 380"
          role="img"
          aria-label={c.usFigure}
          className="block h-auto w-full"
        >
          <defs>
            <linearGradient id="ij-us-skin" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#F2D2BF" />
              <stop offset="1" stopColor="#FBEFE8" />
            </linearGradient>
            <radialGradient id="ij-us-screen" cx="0.5" cy="0" r="1.1">
              <stop offset="0" stopColor="#4A5560" />
              <stop offset="1" stopColor="#141C23" />
            </radialGradient>
            <pattern
              id="ij-us-speckle"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="3" cy="4" r="1.1" fill="#9AA6B1" opacity="0.5" />
              <circle cx="10" cy="9" r="0.9" fill="#C3CCD4" opacity="0.4" />
              <circle cx="6" cy="12" r="0.7" fill="#7D8893" opacity="0.45" />
              {anim ? (
                <animateTransform
                  attributeName="patternTransform"
                  type="translate"
                  values="0 0; 3 2; 0 0"
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              ) : null}
            </pattern>
            <clipPath id="ij-us-fan">
              <path d="M 480 100 L 376 330 A 250 250 0 0 0 584 330 Z" />
            </clipPath>
          </defs>
          <rect width="640" height="380" fill="#FCF9FE" />

          {/* The cheek, in side view: skin on top, vessels underneath. */}
          <path
            d="M 24 120 C 90 104, 220 104, 300 120 L 300 350 L 24 350 Z"
            fill="url(#ij-us-skin)"
          />
          <path
            d="M 24 120 C 90 104, 220 104, 300 120"
            fill="none"
            stroke="#D9A88F"
            strokeWidth="3"
          />
          {vessels.map((v) => (
            <path
              key={v.d}
              d={v.d}
              fill="none"
              stroke={CORAL}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.28"
            />
          ))}
          <text x="40" y="330" fontSize="16" fontWeight="600" fill="#6B3A2A">
            {c.usVessel}
          </text>

          {/* The scanner, gliding on the skin. */}
          <g transform={anim ? undefined : "translate(150 0)"}>
            {anim ? (
              <animateTransform
                attributeName="transform"
                type="translate"
                values="70 0; 230 0; 70 0"
                dur={SWEEP}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines=".45 0 .55 1;.45 0 .55 1"
              />
            ) : null}
            <g transform="translate(0 22)">
              <rect
                x="-24"
                y="0"
                width="48"
                height="84"
                rx="20"
                fill="#FFFFFF"
                stroke="#C9D6E3"
                strokeWidth="2"
              />
              <rect
                x="-18"
                y="72"
                width="36"
                height="14"
                rx="5"
                fill="#9BB0C9"
              />
              <circle cx="0" cy="22" r="5" fill={SKY} />
            </g>
            {[0, 1, 2].map((n) => (
              <path
                key={n}
                d="M -26 124 Q 0 140 26 124"
                fill="none"
                stroke={SKY}
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={anim ? 0 : 0.5 - n * 0.12}
                transform={anim ? undefined : `translate(0 ${14 + n * 18})`}
              >
                {anim ? (
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0 4; 0 90"
                    dur="2s"
                    begin={`-${n * 0.66}s`}
                    repeatCount="indefinite"
                  />
                ) : null}
                {anim ? (
                  <animate
                    attributeName="opacity"
                    values="0.75;0"
                    dur="2s"
                    begin={`-${n * 0.66}s`}
                    repeatCount="indefinite"
                  />
                ) : null}
              </path>
            ))}
          </g>
          <text x="40" y="64" fontSize="16" fontWeight="600" fill="#1F5FA3">
            {c.usScanner}
          </text>

          {/* Wireless link: no cable. */}
          <path
            d="M 240 70 C 290 40, 330 40, 368 60"
            fill="none"
            stroke={SKY}
            strokeWidth="2"
            strokeDasharray="5 8"
            strokeLinecap="round"
          >
            {anim ? (
              <animate
                attributeName="stroke-dashoffset"
                values="26;0"
                dur="1.2s"
                repeatCount="indefinite"
              />
            ) : null}
          </path>

          {/* The tablet with the live image: vessels light up as the scanner passes over them. */}
          <rect
            x="356"
            y="56"
            width="248"
            height="300"
            rx="24"
            fill="#0F1F2E"
          />
          <rect
            x="370"
            y="74"
            width="220"
            height="264"
            rx="14"
            fill="url(#ij-us-screen)"
          />
          <g clipPath="url(#ij-us-fan)">
            <rect
              x="370"
              y="74"
              width="220"
              height="264"
              fill="url(#ij-us-speckle)"
            />
            {vessels.map((v) => {
              const g = glow(v.x);
              return (
                <g key={v.screen}>
                  <path
                    d={v.screen}
                    fill="none"
                    stroke="#FF8A70"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity={anim ? 0.15 : 0.35}
                  >
                    {anim ? (
                      <animate
                        attributeName="opacity"
                        values={g.values(0.45)}
                        keyTimes={g.keyTimes}
                        dur={SWEEP}
                        repeatCount="indefinite"
                      />
                    ) : null}
                  </path>
                  <path
                    d={v.screen}
                    fill="none"
                    stroke="#FFC2B3"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity={anim ? 0.15 : 1}
                  >
                    {anim ? (
                      <animate
                        attributeName="opacity"
                        values={g.values(1)}
                        keyTimes={g.keyTimes}
                        dur={SWEEP}
                        repeatCount="indefinite"
                      />
                    ) : null}
                  </path>
                </g>
              );
            })}
          </g>
          <text
            x="480"
            y="372"
            textAnchor="middle"
            fontSize="16"
            fontWeight="600"
            fill="#1F5FA3"
          >
            {c.usTablet}
          </text>
        </svg>
      </div>
    </div>
  );
}
