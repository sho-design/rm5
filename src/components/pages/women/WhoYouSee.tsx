"use client";

import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui";
import { womensHealthDay } from "@/content/womens-day";
import { whoCopy as c } from "@/content/women-extra";
import { useReducedMotion } from "@/lib/a11y";

const NAVY = "#1F3A5F";
const BLACK = "#1B1F24";
/** Skin tones for the figures, varied. */
const SKIN = ["#F2D2B6", "#C98E62", "#E8B994", "#8D5A3B", "#F5DCC6", "#B57A52"];

/** A simple standing figure in scrubs: head, V-neck top, legs, white sneakers. */
type Hair = "short" | "long" | "bun" | "bob" | "ponytail";

/** Hair drawn behind and over the head (centre 0,16, radius 14), so the figures read as different people. */
function HairShape({ style, fill }: { style: Hair; fill: string }) {
  const cap = <path d="M-15 17 a15 15 0 0 1 30 0 q-3 -7 -15 -8 q-12 1 -15 8z" fill={fill} />;
  if (style === "short") return <path d="M-15 16 a15 15 0 0 1 30 -1 q-2 -5 -6 -6 q-9 -3 -18 1 q-5 2 -6 6z" fill={fill} />;
  if (style === "long")
    return (
      <>
        <path d="M-16 14 a16 16 0 0 1 32 0 v26 q-5 3 -9 0 v-18 h-14 v18 q-4 3 -9 0z" fill={fill} />
        {cap}
      </>
    );
  if (style === "bob")
    return (
      <>
        <path d="M-16 15 a16 16 0 0 1 32 0 v12 q-4 3 -8 0 v-8 h-16 v8 q-4 3 -8 0z" fill={fill} />
        {cap}
      </>
    );
  if (style === "bun")
    return (
      <>
        <circle cx="0" cy="-2" r="7" fill={fill} />
        {cap}
      </>
    );
  return (
    <>
      <path d="M13 10 q12 6 6 24 q-3 -10 -9 -14z" fill={fill} />
      {cap}
    </>
  );
}

function Person({ x, scrub, skin, hair, hairStyle = "short", delay, shown, tall = 1 }: { x: number; scrub: string; skin: string; hair: string; hairStyle?: Hair; delay: number; shown: boolean; tall?: number }) {
  const h = 120 * tall;
  return (
    <g className="wy-person" style={{ transitionDelay: `${delay}ms`, opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(14px)" }}>
      <g transform={`translate(${x} ${150 - h})`}>
        {hairStyle === "long" || hairStyle === "bob" ? <HairShape style={hairStyle} fill={hair} /> : null}
        <circle cx="0" cy="16" r="14" fill={skin} />
        {hairStyle === "long" || hairStyle === "bob" ? (
          <path d="M-15 17 a15 15 0 0 1 30 0 q-3 -7 -15 -8 q-12 1 -15 8z" fill={hair} />
        ) : (
          <HairShape style={hairStyle} fill={hair} />
        )}
        <path d={`M-20 36 q20 -8 40 0 v${h * 0.42} h-40z`} fill={scrub} />
        <path d="M-6 36 l6 10 l6 -10" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
        <rect x="-16" y={36 + h * 0.42} width="13" height={h * 0.4} rx="5" fill={scrub} />
        <rect x="3" y={36 + h * 0.42} width="13" height={h * 0.4} rx="5" fill={scrub} />
        <rect x="-18" y={34 + h * 0.82} width="16" height="7" rx="3.5" fill="#fff" stroke="#C9D2DB" />
        <rect x="2" y={34 + h * 0.82} width="16" height="7" rx="3.5" fill="#fff" stroke="#C9D2DB" />
      </g>
    </g>
  );
}

/**
 * "Who you'll see" (November 2026): two physicians in navy and our nurses in black, with the clinic's own line
 * that both physicians are men and the nurses, who are women, do the Pap tests. Figures rise in once on screen;
 * still with reduced motion.
 */
export function WhoYouSee() {
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const shown = reduced || seen;
  const nurses = [0, 1, 2, 3];
  return (
    <section id="who-you-see" className="rm-paper scroll-mt-24 px-4 pt-12 md:px-content md:pt-section">
      <style>{`
        .wy-person { transition: opacity 400ms cubic-bezier(.2,.8,.2,1), transform 400ms cubic-bezier(.2,.8,.2,1); transform-box: fill-box; }
        @media (prefers-reduced-motion: reduce) { .wy-person { transition: none; } }
        :root[data-theme="contrast"] .wy-art { border: 2px solid var(--rm-ink); }
      `}</style>
      <div ref={box} className="grid grid-cols-1 items-center gap-8 rounded-block border border-[color:var(--rm-line)] bg-white p-6 text-ink md:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-sky-text">
            {c.eyebrow}
          </Eyebrow>
          <h2 className="display-tight text-[30px] leading-[1.05] md:text-[40px]">{c.title}</h2>
          <p className="pretty max-w-[520px] text-[17px] leading-[1.55]">{womensHealthDay.who}</p>
        </div>
        <svg role="img" aria-label={c.alt} viewBox="0 0 560 210" className="wy-art h-auto w-full rounded-card bg-[color:var(--rm-sky-soft)]">
          <path d="M20 166 H540" stroke="#C9D2DB" strokeWidth="2" />
          <Person x={80} scrub={NAVY} skin={SKIN[0]} hair="#2A1E16" delay={0} shown={shown} tall={1.06} />
          <Person x={150} scrub={NAVY} skin={SKIN[4]} hair="#1B1F24" delay={90} shown={shown} tall={1.02} />
          {nurses.map((n) => (
            <Person key={n} x={270 + n * 72} scrub={BLACK} skin={SKIN[(n + 1) % SKIN.length]} hair={n % 2 ? "#3B2A20" : "#1B1F24"} hairStyle={(["long", "bun", "bob", "ponytail"] as const)[n % 4]} delay={220 + n * 90} shown={shown} tall={n % 2 ? 0.94 : 0.98} />
          ))}
          <text x="115" y="196" textAnchor="middle" fontSize="15" fontWeight="600" fill="#0F1F2E">
            {c.physicians}
          </text>
          <text x="378" y="196" textAnchor="middle" fontSize="15" fontWeight="600" fill="#0F1F2E">
            {c.nurses}
          </text>
        </svg>
      </div>
    </section>
  );
}
