"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { fluCopy as c } from "@/content/vaccines-extra";
import { bookFor } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";

const OCT = 9; // October, zero-based
const SWEEP_MS = 6000;

/**
 * "Every fall, the flu shot" (Vaccines page, November 2026). Twelve months on a ring; October is lit, and a marker
 * goes around once a year, glowing as it passes October. Plays while on screen (Pause stops it); reduced motion
 * shows the marker resting on October. A cousin of the skin health plans year wheel, kept small.
 */
export function FluYear() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  const R = 92;
  const at = (m: number, r = R) => {
    const a = ((m + 0.5) / 12) * Math.PI * 2 - Math.PI / 2;
    return [130 + Math.cos(a) * r, 130 + Math.sin(a) * r];
  };
  // October's segment as an arc.
  const arc = (m: number) => {
    const a0 = (m / 12) * Math.PI * 2 - Math.PI / 2;
    const a1 = ((m + 1) / 12) * Math.PI * 2 - Math.PI / 2;
    const p = (a: number) => `${130 + Math.cos(a) * R} ${130 + Math.sin(a) * R}`;
    return `M ${p(a0)} A ${R} ${R} 0 0 1 ${p(a1)}`;
  };
  const restAngle = ((OCT + 0.5) / 12) * 360;

  return (
    <Section id="flu" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes fy-sweep { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fy-glow { 0%, 100% { opacity: .35; } 50% { opacity: 1; } }
        .fy-hand { transform-origin: 130px 130px; animation: fy-sweep ${SWEEP_MS}ms linear infinite; }
        .fy-oct { animation: fy-glow ${SWEEP_MS}ms ease-in-out infinite; animation-delay: ${(OCT / 12) * SWEEP_MS - SWEEP_MS / 2}ms; }
        @media (prefers-reduced-motion: reduce) { .fy-hand, .fy-oct { animation: none; } }
        :root[data-theme="contrast"] .fy-art [data-soft] { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="grid grid-cols-1 items-center gap-8 rounded-block bg-[color:var(--rm-sun-tint)] p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:gap-12 md:p-10 lg:p-12"
      >
        <div className="flex flex-col gap-4">
          <Eyebrow tone="inherit" className="text-amber-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="font-display text-[26px] leading-[1.15] tracking-[-.01em] text-ink md:text-[30px]">{c.line}.</p>
          <p className="pretty max-w-[52ch] text-[16px] leading-[1.55] text-secondary">{c.detail}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Button to={bookFor("family", "flu")} className="w-fit">
              {c.cta}
            </Button>
            <SmartLink to="/health-notes/flu-shot-faq" className="flex min-h-[44px] items-center text-[15px] font-semibold text-link">
              {c.more} ›
            </SmartLink>
          </div>
        </div>
        <figure className="m-0 flex flex-col items-center gap-2">
          {!reduced ? (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[40px] self-end rounded-chip border border-[color:var(--border-default)] bg-white px-4 text-[13px] font-semibold text-ink"
            >
              {playing ? c.pause : c.play}
            </button>
          ) : null}
          <svg role="img" aria-label={c.alt} viewBox="0 0 260 260" className="fy-art h-auto w-full max-w-[280px]">
            <circle cx="130" cy="130" r={R} fill="none" stroke="#FFFFFF" strokeWidth="26" />
            <circle data-soft cx="130" cy="130" r={R} fill="none" stroke="#E7DEC4" strokeWidth="26" strokeDasharray="1 47.17" opacity=".9" />
            <path d={arc(OCT)} fill="none" stroke="#F5C77E" strokeWidth="26" />
            <path className="fy-oct" style={{ animationPlayState: moving ? "running" : "paused" }} d={arc(OCT)} fill="none" stroke="#E0A84A" strokeWidth="26" />
            {c.months.map((m, i) => {
              const [x, y] = at(i, R + 30);
              return (
                <text
                  key={m}
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight={i === OCT ? 700 : 500}
                  fill={i === OCT ? "#0F1F2E" : "#5A6B7B"}
                >
                  {m}
                </text>
              );
            })}
            {/* The marker going round the year. */}
            <g
              className="fy-hand"
              style={reduced ? { transform: `rotate(${restAngle}deg)`, transformOrigin: "130px 130px" } : { animationPlayState: moving ? "running" : "paused" }}
            >
              <line x1="130" y1="130" x2="130" y2={130 - R + 4} stroke="#0F1F2E" strokeWidth="3" strokeLinecap="round" />
              <circle cx="130" cy={130 - R} r="9" fill="#0F1F2E" stroke="#FFFFFF" strokeWidth="3" />
            </g>
            <circle cx="130" cy="130" r="38" fill="#FFFFFF" />
            <text x="130" y="126" textAnchor="middle" fontSize="13" fill="#5A6B7B">
              {c.months[OCT]}
            </text>
            <text x="130" y="146" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0F1F2E">
              ↻
            </text>
          </svg>
          <figcaption className="text-[13px] text-secondary">{c.illustration}</figcaption>
        </figure>
      </div>
    </Section>
  );
}
