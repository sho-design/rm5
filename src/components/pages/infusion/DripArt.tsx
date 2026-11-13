import { useId, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * The one IV bag (November 2026). Every bag on the site is drawn from this: the same outline (square shoulders,
 * a rounded base, a hanging tab and an outlet), the same fluid with a slowly moving surface, and the same drop
 * falling in the drip chamber. Drawn at a base width of 52 units and scaled, so a card bag and a hero bag match.
 * Motion: `.rm-bag-*` in globals.css, off with reduced motion.
 */

const W = 52;
/** Bag body, 52 wide and 66 tall, flat top with small corners and a rounded base. */
const BODY =
  "M4 0h44a4 4 0 0 1 4 4v46c0 9-7 16-16 16H16C7 66 0 59 0 50V4a4 4 0 0 1 4-4z";
/** Fluid with a wavy surface at y=0, wide enough to slide one wave (26 units) and still cover the bag. */
export const BAG_FLUID =
  "M-30 0 Q-23.5 -2.6 -17 0 T-4 0 T9 0 T22 0 T35 0 T48 0 T61 0 T74 0 T87 0 V80 H-30 Z";

/** Where the line leaves the bag: under the drip chamber (or the neck when there is none), in the caller's units. */
export function ivBagOutlet(x: number, y: number, w: number, chamber = true) {
  const s = w / W;
  return { x: x + 26 * s, y: y + (chamber ? 90 : 72) * s };
}

export function IvBag({
  id,
  x = 0,
  y = 0,
  w = W,
  color,
  level = 0.6,
  filling = false,
  chamber = true,
  paused = false,
  still = false,
  paper = "#FFFFFF",
  stroke = "var(--rm-ink)",
  strokeOpacity = 0.25,
  strokeWidth = 2,
  lines = true,
  className,
  children,
}: {
  /** Unique within the page, for the clip path. */
  id: string;
  x?: number;
  y?: number;
  /** Width in the caller's units; the bag is 66/52 as tall, 90/52 to the bottom of the chamber. */
  w?: number;
  color: string;
  /** How full, 0 to 1. Changes ease in. */
  level?: number;
  /** Loop the bag filling from empty to `level` (the "mixed for you" step). */
  filling?: boolean;
  chamber?: boolean;
  paused?: boolean;
  /** No surface or drop motion at all (a finished drip). */
  still?: boolean;
  paper?: string;
  stroke?: string;
  strokeOpacity?: number;
  strokeWidth?: number;
  /** The two short label lines on the front. */
  lines?: boolean;
  className?: string;
  /** Drawn over the bag in its 52-unit space, e.g. a label. */
  children?: ReactNode;
}) {
  // Unique per instance: a drawing can render twice (phone and desktop copies), and a clip path id that
  // points into the hidden copy stops clipping.
  const uid = `${id}-${useId().replace(/[^a-z0-9]/gi, "")}`;
  const s = w / W;
  const play: CSSProperties | undefined = paused
    ? { animationPlayState: "paused" }
    : undefined;
  const line = {
    stroke,
    strokeOpacity,
    strokeWidth,
    vectorEffect: "non-scaling-stroke" as const,
  };
  const top = (1 - level) * 66;
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      className={cn("rm-bag", className)}
    >
      <defs>
        <clipPath id={`${uid}-clip`}>
          <path d={BODY} />
        </clipPath>
      </defs>
      <rect
        x="21"
        y="-8"
        width="10"
        height="9"
        rx="2"
        fill={stroke}
        opacity=".8"
      />
      <path d={BODY} fill={paper} {...line} />
      <g clipPath={`url(#${uid}-clip)`}>
        <g
          className={filling && !still ? "rm-bag-filling" : "rm-bag-fluid"}
          style={
            {
              transform: `translateY(${top}px)`,
              "--rm-bag-top": `${top}px`,
              ...play,
            } as CSSProperties
          }
        >
          <path
            d={BAG_FLUID}
            fill={color}
            className={still ? undefined : "rm-bag-wave"}
            style={play}
          />
        </g>
      </g>
      {lines ? (
        <path d="M9 10h12M9 16h7" {...line} strokeLinecap="round" />
      ) : null}
      {children}
      <path d="M26 66v6" {...line} strokeLinecap="round" />
      {chamber ? (
        <>
          <rect x="20" y="72" width="12" height="18" rx="4" fill={paper} {...line} />
          <rect x="21.5" y="83" width="9" height="5.5" rx="2.5" fill={color} opacity=".75" />
          {still ? null : (
            <circle
              className="rm-bag-drop"
              cx="26"
              cy="75.5"
              r="1.9"
              fill={color}
              style={play}
            />
          )}
        </>
      ) : null}
    </g>
  );
}

/** Small IV bag for cards. Its surface moves while its card (a `group`) is hovered or focused. */
export function Bag({ color, className }: { color: string; className?: string }) {
  const id = `bag-${color.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 106"
      className={cn("rm-bag-card h-[84px] w-[51px] shrink-0", className)}
    >
      <IvBag id={id} x={6} y={10} color={color} level={0.6} />
      <path
        d="M32 100v6"
        stroke="var(--rm-ink)"
        strokeOpacity=".25"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Large hero art for a drip page: the bag on a stand, its surface moving and drops falling in the chamber.
 * Decorative; still when the visitor reduces motion.
 */
export function DripHeroArt({ color, className }: { color: string; className?: string }) {
  const id = `hero-${color.replace(/[^a-z0-9]/gi, "")}`;
  const out = ivBagOutlet(42, 38, 136);
  return (
    <svg aria-hidden viewBox="0 0 220 300" className={cn("h-auto w-full max-w-[260px]", className)}>
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={color} stopOpacity=".35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="110" cy="130" r="110" fill={`url(#${id}-glow)`} />
      <path d="M110 4v14" stroke="var(--rm-ink)" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
      <IvBag id={id} x={42} y={38} w={136} color={color} level={0.62} strokeWidth={2.5} />
      <path
        d={`M${out.x} ${out.y}v${296 - out.y}`}
        stroke="var(--rm-ink)"
        strokeOpacity=".35"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
