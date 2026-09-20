"use client";

import { useState, type CSSProperties } from "react";

/** Line pictogram paths (24 grid, 1.4 to 2.4 stroke, round caps) from the prototype's LA map. */
export const iconPaths: Record<string, string[]> = {
  drip: ["M12 2.5c3.5 4.5 6.5 8 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.5 8.5 7 12 2.5z", "M9 14.5a3 3 0 0 0 3 3"],
  shot: ["M3 21l3.5-3.5", "M6 15l3 3", "M7.5 16.5L15 9", "M13 7l4 4", "M15.5 4.5l4 4", "M17 3l4 4", "M11 11l1.5 1.5", "M13 9l1.5 1.5"],
  iron: ["M9 2.5h6", "M10 2.5v4.5L5.5 17a3.5 3.5 0 0 0 3.2 5h6.6a3.5 3.5 0 0 0 3.2-5L14 7V2.5", "M7 15h10", "M10 18.5h.01", "M13.5 19.5h.01"],
  steth: ["M6 3v6.5a6 6 0 0 0 12 0V3", "M4.5 3h3", "M16.5 3h3", "M12 15.5V18a3.5 3.5 0 0 0 7 0v-1.5", "M19 14.5a2 2 0 1 0 0 4a2 2 0 1 0 0-4z"],
  spine: ["M12 2v20", "M8.5 5h7", "M8 9h8", "M8 13h8", "M8.5 17h7", "M10 5v4", "M14 5v4", "M10 13v4", "M14 13v4"],
  skin: ["M8 3h8v3H8z", "M6.5 8.5h11l-1 11.5h-9z", "M10 13.5h4", "M3 6a2 2 0 0 0 0 4"],
  band: ["M3 12c4.5-7 13.5-7 18 0", "M3 12c4.5 7 13.5 7 18 0", "M3 12h18", "M12 5.5v13"],
  cal: ["M4 5.5h16v15H4z", "M4 10.5h16", "M8 3v4.5", "M16 3v4.5", "M8 14.5h3", "M13 14.5h3", "M8 17.5h3"],
  clinic: ["M3 21h18", "M5 21V8.5l7-5 7 5V21", "M10 21v-6h4v6", "M12 10v4", "M10 12h4"],
  kids: ["M4 20h7v-7H4z", "M13 20h7v-7h-7z", "M8.5 13V6h7v7", "M12 8.5v2", "M7 16.5h1", "M16 16.5h1"],
  price: ["M3 12l9-9h9v9l-9 9z", "M16.5 7.5h.01", "M15 7.5a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z"],
  heart: ["M12 21s-8.5-5.5-8.5-11.5a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2C20.5 15.5 12 21 12 21z", "M8 11h2l1.5-2.5 2 5 1.5-2.5h2"],
  checkup: ["M4 12h3l2-5 3 10 2.5-7 1.5 2h4", "M12 3.5v1.5", "M12 19v1.5"],
  chronic: ["M12 3a9 9 0 1 0 9 9", "M12 3v9h6", "M19 4l2 2-2 2"],
  women: ["M12 3a5.5 5.5 0 1 0 0 11a5.5 5.5 0 1 0 0-11z", "M12 14v7", "M9 18h6"],
  men: ["M10 21a6 6 0 1 0 0-12a6 6 0 1 0 0 12z", "M14.5 10.5L21 4", "M16 4h5v5"],
  blood: ["M12 3s-6 7-6 11a6 6 0 0 0 12 0c0-4-6-11-6-11z", "M9 14.5a3 3 0 0 0 3 3"],
  sameday: ["M12 4a8 8 0 1 0 8 8", "M12 8v4l3 2", "M17 3l3 3", "M20 3v3h-3"],
  joint: ["M7 3v5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V3", "M7 21v-5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v5", "M5 3h4", "M15 3h4", "M5 21h4", "M15 21h4"],
  nerve: ["M12 12h.01", "M12 12l-6-6", "M12 12l7-4", "M12 12l-5 7", "M12 12l6 6", "M6 6l-2-1", "M19 8l2-2", "M7 19l-1 2", "M18 18l2 1"],
  head: ["M8 21v-3.5A7 7 0 0 1 5 12a7 7 0 0 1 14 0c0 2-1 3-1 4.5V21", "M9.5 10.5l1.5 1.5 1.5-1.5 1.5 1.5", "M12 15l-1.5-1.5"],
  sports: ["M12 2.5a9.5 9.5 0 1 0 0 19a9.5 9.5 0 1 0 0-19z", "M12 2.5c-3 3-3 16 0 19", "M12 2.5c3 3 3 16 0 19", "M2.5 12h19"],
  referral: ["M4 6h10a3 3 0 0 1 3 3v9", "M20 6h-3", "M13 15l4 3 4-3", "M4 6l3-3", "M4 6l3 3"],
  laser: ["M4 20L14 10", "M14 10l-2-2 4-4 4 4-4 4-2-2z", "M17 3l1.5-1.5", "M21 7l1.5-1.5", "M19.5 4.5l2-2"],
  plan: ["M6 3h12v18H6z", "M9 8h6", "M9 12h6", "M9 16h3", "M4 6v12"],
  gift: ["M4 11h16v10H4z", "M3 7h18v4H3z", "M12 7v14", "M12 7c-3 0-4.5-1.5-4.5-3S9 2 12 7", "M12 7c3 0 4.5-1.5 4.5-3S15 2 12 7"],
  physio: ["M12 4a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3z", "M12 7v6", "M12 13l-4 7", "M12 13l4 7", "M12 9l-5 2", "M12 9l6-3"],
  massage: ["M3 12c3-4 6-4 9 0s6 4 9 0", "M3 17c3-4 6-4 9 0s6 4 9 0", "M3 7c3-4 6-4 9 0s6 4 9 0"],
  kines: ["M12 3a1.5 1.5 0 1 0 0 3a1.5 1.5 0 1 0 0-3z", "M12 6v5l-3 4 1 6", "M12 11l4 2 3-3", "M9 15l-4 1", "M12 11l-2 1"],
  mva: ["M3 15l2-6h14l2 6", "M3 15h18v4H3z", "M6 19v1.5", "M18 19v1.5", "M7 15h.01", "M17 15h.01"],
  wsib: ["M4 8h16v12H4z", "M9 8V5a3 3 0 0 1 6 0v3", "M12 12v4", "M10 14h4"],
  team: ["M9 8a3 3 0 1 0 0-6a3 3 0 1 0 0 6z", "M17 9a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5z", "M3 20v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2", "M17 12a4 4 0 0 1 4 4v3"],
  story: ["M4 4h7v16H4z", "M13 4h7v16h-7z", "M11 4c0 0 1-1 1-1s1 1 1 1", "M6.5 8h2", "M15.5 8h2", "M6.5 11h2", "M15.5 11h2"],
  standards: ["M12 2.5l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10v-6z", "M8.5 12l2.5 2.5 4.5-5"],
  contact: ["M4 6h16v12H4z", "M4 6l8 7 8-7"],
  careers: ["M4 8h16v12H4z", "M9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8", "M4 13h16", "M12 12v3"],
  concern: ["M12 21c-4-3.5-8-6.5-8-11a4.5 4.5 0 0 1 8-2.5", "M12 21c4-3.5 8-6.5 8-11a4.5 4.5 0 0 0-8-2.5", "M12 8v5", "M12 16h.01"],
  how: ["M5 12a7 7 0 0 1 12-5", "M17 4v3h-3", "M19 12a7 7 0 0 1-12 5", "M7 20v-3h3", "M12 10v4"],
  search: ["M4 11a7 7 0 1 0 14 0a7 7 0 1 0-14 0", "M20 20l-3.5-3.5"],
  phone: ["M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"],
  mail: ["M3 5h18v14H3z", "M3 7l9 6 9-6"],
  pin: ["M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z", "M12 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 1 0 0 5z"],
  arrow: ["M5 12h12", "M13 7l5 5-5 5"],
  renew: ["M6 3h9l3 3v15H6z", "M9 12h6", "M12 9v6"],
  check: ["M5 12.5l4.5 4.5L19 7"],
};

interface Anim {
  all?: string;
  origin?: string;
  paths?: Record<number, string>;
  pathOrigin?: Record<number, string>;
  dash?: Record<number, number>;
  extra?: "drip" | "bubbles";
}

/** One hover animation per icon (prototype LAA map). */
const anims: Record<string, Anim> = {
  drip: { paths: { 1: "rmDripFall .9s ease-in infinite" }, extra: "drip", origin: "50% 70%" },
  shot: { all: "rmShotPush .7s ease-in-out", origin: "50% 50%" },
  iron: { extra: "bubbles" },
  steth: { paths: { 4: "rmPulse 1s ease-in-out infinite" }, pathOrigin: { 4: "19px 16.5px" } },
  spine: { all: "rmSway .8s ease-in-out", origin: "50% 100%" },
  skin: { paths: { 3: "rmDash .6s ease-out" }, dash: { 3: 40 }, all: "rmSway .8s ease-in-out", origin: "50% 90%" },
  band: { paths: { 0: "rmStretch .7s ease-in-out", 1: "rmStretch .7s ease-in-out", 2: "rmStretch .7s ease-in-out" }, pathOrigin: { 0: "12px 12px", 1: "12px 12px", 2: "12px 12px" } },
  cal: { paths: { 4: "rmDrop .5s ease-out both", 5: "rmDrop .5s ease-out .1s both", 6: "rmDrop .5s ease-out .2s both" } },
  clinic: { paths: { 3: "rmGlow .8s ease-in-out infinite", 4: "rmGlow .8s ease-in-out infinite" } },
  kids: { paths: { 0: "rmStack .4s ease-out both", 1: "rmStack .4s ease-out .12s both", 2: "rmStack .4s ease-out .24s both" } },
  price: { all: "rmSwing .8s ease-in-out", origin: "20px 4px" },
  heart: { paths: { 0: "rmBeat 1s ease-in-out infinite", 1: "rmDash .8s ease-out" }, dash: { 1: 40 }, pathOrigin: { 0: "12px 12px" } },
  checkup: { paths: { 0: "rmDash .8s ease-out" }, dash: { 0: 40 } },
  chronic: { all: "rmSway .8s ease-in-out", origin: "50% 50%" },
  women: { all: "rmPulse 1s ease-in-out", origin: "12px 8.5px" },
  men: { all: "rmSway .8s ease-in-out", origin: "10px 15px" },
  blood: { all: "rmDripFall 1s ease-in-out" },
  sameday: { paths: { 1: "rmSway .6s ease-in-out" }, pathOrigin: { 1: "12px 12px" } },
  joint: { paths: { 0: "rmStack .5s ease-out both" }, all: "rmStretch .7s ease-in-out", origin: "50% 50%" },
  nerve: { paths: { 5: "rmGlow .6s ease-in-out infinite", 6: "rmGlow .6s ease-in-out infinite .15s", 7: "rmGlow .6s ease-in-out infinite .3s", 8: "rmGlow .6s ease-in-out infinite .45s" } },
  head: { paths: { 1: "rmGlow .5s ease-in-out infinite", 2: "rmGlow .5s ease-in-out infinite .25s" } },
  sports: { all: "rmSwing .8s ease-in-out", origin: "50% 50%" },
  referral: { paths: { 2: "rmDrop .5s ease-out both" } },
  laser: { paths: { 2: "rmGlow .4s ease-in-out infinite", 3: "rmGlow .4s ease-in-out infinite .13s", 4: "rmGlow .4s ease-in-out infinite .26s" } },
  plan: { paths: { 1: "rmDrop .5s ease-out both", 2: "rmDrop .5s ease-out .1s both", 3: "rmDrop .5s ease-out .2s both" } },
  gift: { paths: { 3: "rmSway .6s ease-in-out", 4: "rmSway .6s ease-in-out reverse" }, pathOrigin: { 3: "12px 7px", 4: "12px 7px" } },
  physio: { paths: { 4: "rmSway .7s ease-in-out", 5: "rmSway .7s ease-in-out reverse" }, pathOrigin: { 4: "12px 9px", 5: "12px 9px" } },
  massage: { paths: { 0: "rmStretch .8s ease-in-out", 1: "rmStretch .8s ease-in-out .1s", 2: "rmStretch .8s ease-in-out .2s" }, pathOrigin: { 0: "12px 12px", 1: "12px 12px", 2: "12px 12px" } },
  kines: { all: "rmBounce .6s cubic-bezier(.3,.7,.4,1.2)", origin: "50% 100%" },
  mva: { all: "rmShotPush .6s ease-in-out", origin: "50% 50%" },
  wsib: { paths: { 2: "rmDash .5s ease-out", 3: "rmDash .5s ease-out .2s" }, dash: { 2: 40, 3: 40 } },
  team: { paths: { 1: "rmStack .5s ease-out both", 3: "rmStack .5s ease-out .1s both" } },
  story: { paths: { 1: "rmFlip .7s ease-in-out" }, pathOrigin: { 1: "13px 12px" } },
  standards: { paths: { 1: "rmDash .6s ease-out" }, dash: { 1: 40 } },
  contact: { paths: { 1: "rmFlip .7s ease-in-out" }, pathOrigin: { 1: "12px 6px" } },
  careers: { all: "rmBounce .6s cubic-bezier(.3,.7,.4,1.2)", origin: "50% 100%" },
  concern: { paths: { 0: "rmBeat 1s ease-in-out infinite", 1: "rmBeat 1s ease-in-out infinite" }, pathOrigin: { 0: "12px 12px", 1: "12px 12px" } },
  how: { all: "rmSwing 1s ease-in-out", origin: "50% 50%" },
};

/**
 * Bare line pictogram. `animate` plays the icon's hover animation (pass the
 * hover state of the parent link so the whole tile triggers it).
 */
export function Icon({ name, size = 24, stroke = 1.6, className, style, animate, color = "currentColor" }: { name: string; size?: number | string; stroke?: number; className?: string; style?: CSSProperties; animate?: boolean; color?: string }) {
  const paths = iconPaths[name] ?? iconPaths.heart;
  const a = animate ? anims[name] ?? {} : {};
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      className={className}
      style={{ ...(a.all ? { animation: a.all, transformOrigin: a.origin ?? "50% 50%" } : {}), ...style }}
      aria-hidden
    >
      {paths.map((d, i) => {
        const pa = a.paths?.[i];
        return (
          <path
            key={i}
            d={d}
            style={pa ? { animation: pa, transformOrigin: a.pathOrigin?.[i] ?? "50% 50%", ...(a.dash?.[i] ? { strokeDasharray: a.dash[i] } : {}) } : undefined}
          />
        );
      })}
      {a.extra === "drip" ? <circle cx="12" cy="19" r="1.2" fill={color} stroke="none" style={{ animation: "rmDripFall .9s ease-in infinite .3s", transformOrigin: "12px 19px" }} /> : null}
      {a.extra === "bubbles" ? (
        <>
          <circle cx="10" cy="15" r=".9" fill={color} stroke="none" style={{ animation: "rmBubble 1s ease-out infinite" }} />
          <circle cx="14" cy="17" r=".8" fill={color} stroke="none" style={{ animation: "rmBubble 1s ease-out infinite .4s" }} />
          <circle cx="12" cy="13" r=".7" fill={color} stroke="none" style={{ animation: "rmBubble 1s ease-out infinite .7s" }} />
        </>
      ) : null}
    </svg>
  );
}

/** Hook: hover state for an icon tile. Returns props to spread on the tile and the flag. */
export function useHover() {
  const [on, setOn] = useState(false);
  return { on, bind: { onMouseEnter: () => setOn(true), onMouseLeave: () => setOn(false), onFocus: () => setOn(true), onBlur: () => setOn(false) } };
}
