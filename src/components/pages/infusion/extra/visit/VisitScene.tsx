"use client";

import { IvBag } from "@/components/pages/infusion/DripArt";
import { useEffect, useRef } from "react";
import { visitStory as c, type VisitStep } from "@/content/inf-visit";

const SAGE = "#3D9B78";
const SAGE_INK = "#2C4A3A";
const TINT = "#E6F4EA";
const INK = "#0F1F2E";
const LINE = "#D5DEE6";
const SKY = "#2F7FD1";

/**
 * One drip visit step as a small drawing (check-in, screening, mixing, the drip, back to your day). The picture
 * fades and rises in when its step arrives; its loops (a ticking clock, a heartbeat, falling drops, a filling bag,
 * the timer) run only while `moving`, so they stop off screen, on Pause and with reduced motion.
 */
export function VisitScene({
  k,
  moving,
  animate,
  className,
}: {
  k: VisitStep["k"];
  moving: boolean;
  animate: boolean;
  className?: string;
}) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const s = svg.current;
    if (!s || typeof s.pauseAnimations !== "function") return;
    if (moving) s.unpauseAnimations();
    else s.pauseAnimations();
  }, [moving, k]);

  const a = animate;
  return (
    <svg
      ref={svg}
      viewBox="0 0 400 300"
      role="img"
      aria-label={c.figure[k]}
      className={className}
    >
      <rect x="0" y="0" width="400" height="300" rx="24" fill={TINT} />
      <g key={k} className={a ? "vs-in" : undefined}>
        {k === "checkin" ? <CheckIn a={a} /> : null}
        {k === "screen" ? <Screen a={a} /> : null}
        {k === "mix" ? <Mix a={a} /> : null}
        {k === "drip" ? <Drip a={a} /> : null}
        {k === "home" ? <Home a={a} /> : null}
      </g>
    </svg>
  );
}

function Tick({
  x,
  y,
  r = 22,
  delay = 0,
  a,
}: {
  x: number;
  y: number;
  r?: number;
  delay?: number;
  a: boolean;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={SAGE} />
      <path
        d={`M${x - r * 0.42} ${y + r * 0.02} l${r * 0.3} ${r * 0.3} l${r * 0.55} -${r * 0.6}`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={r * 0.18}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1"
        className={a ? "vs-draw" : undefined}
        style={a ? { animationDelay: `${delay}ms` } : undefined}
      />
    </g>
  );
}

/** Front desk: a counter, a tablet with your check-in, a tick and a wall clock. */
function CheckIn({ a }: { a: boolean }) {
  return (
    <g>
      {/* Wall clock */}
      <circle
        cx="320"
        cy="70"
        r="30"
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth="3"
      />
      <line
        x1="320"
        y1="70"
        x2="320"
        y2="52"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="320"
        y1="70"
        x2="334"
        y2="70"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
      >
        {a ? (
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 320 70"
            to="360 320 70"
            dur="8s"
            repeatCount="indefinite"
          />
        ) : null}
      </line>
      <circle cx="320" cy="70" r="3.5" fill={INK} />
      {/* Counter */}
      <rect
        x="40"
        y="196"
        width="320"
        height="76"
        rx="14"
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth="2"
      />
      <rect x="40" y="186" width="320" height="18" rx="9" fill={SAGE_INK} />
      {/* Tablet on the counter */}
      <g transform="translate(120 98) rotate(-6 80 50)">
        <rect x="0" y="0" width="160" height="100" rx="14" fill={INK} />
        <rect x="8" y="8" width="144" height="84" rx="8" fill="#FFFFFF" />
        <rect x="22" y="24" width="70" height="8" rx="4" fill={SAGE} />
        <rect x="22" y="42" width="110" height="6" rx="3" fill={LINE} />
        <rect x="22" y="56" width="92" height="6" rx="3" fill={LINE} />
        <rect x="22" y="70" width="60" height="6" rx="3" fill={LINE} />
      </g>
      <Tick x={282} y={168} delay={500} a={a} />
    </g>
  );
}

/** Screening: a blood pressure cuff, a heartbeat line and a short checklist that ticks itself off. */
function Screen({ a }: { a: boolean }) {
  const rows = [0, 1, 2];
  return (
    <g>
      {/* Clipboard */}
      <rect
        x="44"
        y="46"
        width="150"
        height="208"
        rx="16"
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth="2"
      />
      <rect x="92" y="36" width="54" height="20" rx="8" fill={SAGE_INK} />
      {rows.map((n) => (
        <g key={n}>
          <rect
            x="64"
            y={86 + n * 52}
            width="22"
            height="22"
            rx="6"
            fill="#FFFFFF"
            stroke={LINE}
            strokeWidth="2"
          />
          <path
            d={`M68 ${97 + n * 52} l5 5 l9 -10`}
            fill="none"
            stroke={SAGE}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            className={a ? "vs-draw" : undefined}
            style={a ? { animationDelay: `${400 + n * 450}ms` } : undefined}
          />
          <rect
            x="98"
            y={90 + n * 52}
            width={70 - n * 12}
            height="7"
            rx="3.5"
            fill={INK}
            opacity=".75"
          />
          <rect
            x="98"
            y={102 + n * 52}
            width={52}
            height="5"
            rx="2.5"
            fill={LINE}
          />
        </g>
      ))}
      {/* Monitor with a heartbeat */}
      <rect x="218" y="64" width="146" height="100" rx="16" fill={INK} />
      <path
        d="M228 118 h26 l8 -22 l10 40 l8 -28 l6 10 h22 l8 -16 l8 24 l6 -8 h26"
        fill="none"
        stroke="#7FC8A9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="0.55 0.45"
      >
        {a ? (
          <animate
            attributeName="stroke-dashoffset"
            values="1;0"
            dur="2.2s"
            repeatCount="indefinite"
          />
        ) : null}
      </path>
      {/* Cuff on an arm */}
      <rect x="230" y="196" width="150" height="38" rx="19" fill="#F2D6C6" />
      <rect
        x="268"
        y="188"
        width="60"
        height="54"
        rx="12"
        fill={SKY}
        opacity=".9"
      />
      <path
        d="M298 242 C 298 262 272 266 258 260"
        fill="none"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle
        cx="252"
        cy="258"
        r="9"
        fill="#FFFFFF"
        stroke={INK}
        strokeWidth="2.5"
      />
    </g>
  );
}

/** Mixed for you: small vials drip into an empty bag, which fills; a "Mixed now" tag. */
function Mix({ a }: { a: boolean }) {
  const vials = [118, 168, 218];
  return (
    <g>
      {vials.map((x, n) => (
        <g key={x}>
          <rect
            x={x - 12}
            y="30"
            width="24"
            height="44"
            rx="6"
            fill="#FFFFFF"
            stroke={LINE}
            strokeWidth="2"
          />
          <rect
            x={x - 12}
            y="24"
            width="24"
            height="10"
            rx="3"
            fill={n === 1 ? SAGE : n === 0 ? "#FFD84D" : SKY}
          />
          <rect
            x={x - 8}
            y="50"
            width="16"
            height="20"
            rx="3"
            fill={n === 1 ? "#7FC8A9" : n === 0 ? "#FFE58A" : "#9CC3EA"}
          />
          <circle cx={x} cy="86" r="4" fill="#7FC8A9" opacity={a ? 0 : 0.8}>
            {a ? (
              <animate
                attributeName="cy"
                values="82;150"
                dur="1.4s"
                begin={`${n * 0.45}s`}
                repeatCount="indefinite"
              />
            ) : null}
            {a ? (
              <animate
                attributeName="opacity"
                values="0.9;0"
                dur="1.4s"
                begin={`${n * 0.45}s`}
                repeatCount="indefinite"
              />
            ) : null}
          </circle>
        </g>
      ))}
      {/* Bag (the same bag as every drip on the site), filling as it is mixed */}
      <IvBag
        id="vs-mix"
        x={116}
        y={126}
        w={104}
        color="#BFE6D3"
        level={0.62}
        filling={a}
        still={!a}
        chamber={false}
        stroke={SAGE_INK}
        strokeOpacity={1}
        strokeWidth={3}
      />
      {/* Tag */}
      <g transform="translate(250 150)">
        <rect x="0" y="0" width="118" height="44" rx="22" fill={SAGE_INK} />
        <text
          x="59"
          y="28"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
          fill="#FFFFFF"
        >
          {c.labels.mixedNow}
        </text>
      </g>
      <Tick x={309} y={236} r={18} delay={900} a={a} />
    </g>
  );
}

/** The drip: a lounge chair, a drip stand with falling drops and a timer ring counting toward 45 minutes. */
function Drip({ a }: { a: boolean }) {
  const ring = 2 * Math.PI * 34;
  return (
    <g>
      {/* Stand and bag */}
      <line
        x1="96"
        y1="40"
        x2="96"
        y2="270"
        stroke="#9AA6B1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="70"
        y1="270"
        x2="122"
        y2="270"
        stroke="#9AA6B1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        x1="80"
        y1="40"
        x2="112"
        y2="40"
        stroke="#9AA6B1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <IvBag
        id="vs-drip"
        x={74}
        y={50}
        w={44}
        color="#7FC8A9"
        level={0.6}
        still={!a}
        stroke={SAGE_INK}
        strokeOpacity={1}
        strokeWidth={2.5}
      />
      {/* Tube to the chair arm */}
      <path
        d="M96 126 C 96 200 150 196 186 186"
        fill="none"
        stroke="#9CC3EA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Lounge chair */}
      <path
        d="M150 250 L 186 158 C 190 148 202 144 212 150 L 226 160"
        fill="none"
        stroke={INK}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M176 204 L 300 204 C 316 204 324 214 322 228"
        fill="none"
        stroke={INK}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <line
        x1="190"
        y1="210"
        x2="176"
        y2="262"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="300"
        y1="210"
        x2="312"
        y2="262"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* A resting person, simple shapes */}
      <circle cx="214" cy="132" r="16" fill="#E7C2AC" />
      <path
        d="M196 156 C 210 176 232 190 268 192 L 300 192"
        fill="none"
        stroke={SAGE}
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d="M300 192 L 328 214"
        fill="none"
        stroke="#2C3E50"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Timer */}
      <g transform="translate(322 74)">
        <circle r="34" fill="#FFFFFF" stroke={LINE} strokeWidth="6" />
        <circle
          r="34"
          fill="none"
          stroke={SAGE}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={ring}
          strokeDashoffset={a ? ring : ring * 0.25}
          transform="rotate(-90)"
        >
          {a ? (
            <animate
              attributeName="stroke-dashoffset"
              values={`${ring};0`}
              dur="9s"
              repeatCount="indefinite"
            />
          ) : null}
        </circle>
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontSize="18"
          fontWeight="700"
          fill={INK}
        >
          45
        </text>
        <text
          x="0"
          y="20"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill={SAGE_INK}
        >
          {c.labels.minutes}
        </text>
      </g>
    </g>
  );
}

/** Back to your day: a small bandage on the arm, a tick and an open door with daylight. */
function Home({ a }: { a: boolean }) {
  return (
    <g>
      {/* Door */}
      <rect x="232" y="40" width="120" height="226" rx="10" fill="#FFF3C4" />
      <path
        d="M232 40 L 300 58 L 300 284 L 232 266 Z"
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth="2"
      />
      <circle cx="288" cy="168" r="5" fill={INK} />
      {[0, 1, 2].map((n) => (
        <line
          key={n}
          x1="352"
          y1={90 + n * 50}
          x2="392"
          y2={80 + n * 50}
          stroke="#FFD84D"
          strokeWidth="4"
          strokeLinecap="round"
          opacity={a ? 0.3 : 0.8}
        >
          {a ? (
            <animate
              attributeName="opacity"
              values="0.25;0.9;0.25"
              dur="2.4s"
              begin={`${n * 0.4}s`}
              repeatCount="indefinite"
            />
          ) : null}
        </line>
      ))}
      {/* Arm with a bandage */}
      <rect x="30" y="170" width="190" height="46" rx="23" fill="#E7C2AC" />
      <rect
        x="104"
        y="178"
        width="46"
        height="30"
        rx="9"
        fill="#FFFFFF"
        stroke={LINE}
        strokeWidth="2"
      />
      <rect x="118" y="186" width="18" height="14" rx="4" fill="#F7E4D8" />
      <Tick x={128} y={110} r={26} delay={400} a={a} />
    </g>
  );
}
