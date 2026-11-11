"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { painGuide as c } from "@/content/deep";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Long enough to read the longest step at a calm pace (as on the iron diagram, round 29). */
const STEP_MS = 8000;
const CORAL = "#C4573A";
const SKY = "#2F7FD1";

/**
 * "How a guided injection works": an animated picture of an ultrasound-guided procedure. A referral arrives, a
 * wireless handheld scanner on the skin sends sound waves and shows the joint live on a tablet, the needle is
 * guided to the target (on the body and on the screen at once), and a note goes back to the family doctor.
 * Four steps beside it light up their part. Advances only while on screen; Pause or a tapped step stops it;
 * still with reduced motion; full strength in high contrast. Education only (copy in content/deep.ts).
 */
export function PainGuide() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const moving = playing && inView && !reduced;
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % c.steps.length), STEP_MS);
    return () => window.clearInterval(t);
  }, [moving]);

  const on = (...steps: number[]) => ({ opacity: steps.includes(step) ? 1 : 0.6, transition: "opacity 350ms cubic-bezier(.2,.8,.2,1)" });
  const anim = !reduced;
  // The needle draws in on step 3 (index 2) and stays in place after it; before that it is hidden.
  const needle = step >= 2 ? (anim && step === 2 ? "pgNeedle 2.4s cubic-bezier(.2,.8,.2,1) both" : undefined) : undefined;
  const needleShown = step >= 2;

  return (
    <Section id="pain-guide" className="scroll-mt-6">
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-[#F6F1EE] p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:p-12"
      >
        {/* Phone order: heading, picture, steps. Desktop: heading and steps on the left, picture on the right. */}
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-[#C4573A]">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
        </div>

        <figure className="pg-figure relative m-0 flex flex-col gap-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-center">
          <svg viewBox="0 0 640 440" role="img" aria-label={c.figure} className="h-auto w-full">
            <defs>
              <linearGradient id="pg-skin" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#F2D2BF" />
                <stop offset="1" stopColor="#F7E4D8" />
              </linearGradient>
              <radialGradient id="pg-screen" cx="0.5" cy="0" r="1">
                <stop offset="0" stopColor="#4A5560" />
                <stop offset="1" stopColor="#1B232B" />
              </radialGradient>
              <pattern id="pg-speckle" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="4" r="1.1" fill="#9AA6B1" opacity="0.55" />
                <circle cx="10" cy="9" r="0.9" fill="#C3CCD4" opacity="0.45" />
                <circle cx="6" cy="12" r="0.7" fill="#7D8893" opacity="0.5" />
                {anim ? <animateTransform attributeName="patternTransform" type="translate" values="0 0; 3 2; 0 0" dur="1.6s" repeatCount="indefinite" /> : null}
              </pattern>
              <clipPath id="pg-fan">
                <path d="M 480 104 L 398 300 A 210 210 0 0 0 562 300 Z" />
              </clipPath>
            </defs>

            {/* 1. Referral */}
            <g style={on(0)}>
              <rect x="24" y="22" width="120" height="78" rx="14" fill="#FFFFFF" stroke="#E3D6CE" strokeWidth="2" />
              <rect x="40" y="40" width="54" height="7" rx="3.5" fill={CORAL} />
              <rect x="40" y="56" width="86" height="6" rx="3" fill="#E9DED7" />
              <rect x="40" y="70" width="70" height="6" rx="3" fill="#E9DED7" />
              <text x="84" y="124" textAnchor="middle" fontSize="17" fontWeight="600" fill="#6B3A2A">{c.labels.referral}</text>
              {anim && step === 0 ? (
                <rect x="24" y="22" width="120" height="78" rx="14" fill="none" stroke={CORAL} strokeWidth="2">
                  <animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite" />
                </rect>
              ) : null}
            </g>

            {/* The body: skin, tissue, two bones and the joint space */}
            <rect x="24" y="190" width="300" height="230" rx="28" fill="#FBEFE8" />
            <rect x="24" y="190" width="300" height="34" rx="17" fill="url(#pg-skin)" />
            <ellipse cx="170" cy="300" rx="120" ry="34" fill="#EFE6D8" stroke="#DCCFBD" strokeWidth="2" />
            <ellipse cx="176" cy="378" rx="122" ry="30" fill="#EFE6D8" stroke="#DCCFBD" strokeWidth="2" />
            <g style={on(2)}>
              <circle cx="186" cy="340" r="9" fill={CORAL} opacity="0.9" />
              <circle cx="186" cy="340" r="9" fill="none" stroke={CORAL} strokeWidth="2">
                {anim ? <animate attributeName="r" values="9;22;9" dur="2s" repeatCount="indefinite" /> : null}
                {anim ? <animate attributeName="opacity" values="0.8;0;0.8" dur="2s" repeatCount="indefinite" /> : null}
              </circle>
              <text x="246" y="346" fontSize="15" fontWeight="600" fill="#6B3A2A">{c.labels.target}</text>
            </g>

            {/* 2. Wireless scanner on the skin, sound waves, wireless link to the tablet */}
            <g style={on(1, 2)}>
              <g transform="translate(150 118)">
                <rect x="-26" y="0" width="52" height="84" rx="22" fill="#FFFFFF" stroke="#C9D6E3" strokeWidth="2" />
                <rect x="-20" y="72" width="40" height="14" rx="5" fill="#9BB0C9" />
                <circle cx="0" cy="22" r="5" fill={SKY} />
              </g>
              {[0, 1, 2].map((n) => (
                <path key={n} d="M 120 214 Q 150 232 180 214" fill="none" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" opacity={anim ? 0 : 0.5 - n * 0.12} transform={anim ? undefined : `translate(0 ${16 + n * 18})`}>
                  {anim ? <animateTransform attributeName="transform" type="translate" values="0 6; 0 96" dur="2.1s" begin={`-${n * 0.7}s`} repeatCount="indefinite" /> : null}
                  {anim ? <animate attributeName="opacity" values="0.75;0" dur="2.1s" begin={`-${n * 0.7}s`} repeatCount="indefinite" /> : null}
                </path>
              ))}
              <path d="M 176 128 C 240 80, 300 80, 360 96" fill="none" stroke={SKY} strokeWidth="2" strokeDasharray="5 8" strokeLinecap="round">
                {anim ? <animate attributeName="stroke-dashoffset" values="26;0" dur="1.2s" repeatCount="indefinite" /> : null}
              </path>
              <text x="210" y="70" fontSize="15" fontWeight="600" fill="#1F5FA3">{c.labels.probe}</text>
            </g>

            {/* Needle on the body (steps 3 and 4) */}
            {needleShown ? (
              <line x1="52" y1="214" x2="182" y2="336" stroke="#5A6B7B" strokeWidth="3" strokeLinecap="round" pathLength={1} strokeDasharray="1" style={{ animation: needle }} />
            ) : null}

            {/* The tablet with the live ultrasound image */}
            <g>
              <rect x="362" y="64" width="240" height="300" rx="24" fill="#0F1F2E" />
              <rect x="374" y="78" width="216" height="272" rx="14" fill="#151C23" />
              <g style={on(1, 2)}>
                <path d="M 480 104 L 398 300 A 210 210 0 0 0 562 300 Z" fill="url(#pg-screen)" />
                <rect x="380" y="100" width="200" height="220" fill="url(#pg-speckle)" clipPath="url(#pg-fan)" />
                <path d="M 418 240 Q 480 214 548 240" fill="none" stroke="#E7ECF1" strokeWidth="5" strokeLinecap="round" opacity="0.85" clipPath="url(#pg-fan)" />
                <path d="M 420 276 Q 480 296 546 272" fill="none" stroke="#E7ECF1" strokeWidth="5" strokeLinecap="round" opacity="0.8" clipPath="url(#pg-fan)" />
                <circle cx="486" cy="258" r="7" fill="none" stroke="#FFD84D" strokeWidth="2" strokeDasharray="3 3" />
                {needleShown ? (
                  <line x1="414" y1="150" x2="484" y2="256" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" pathLength={1} strokeDasharray="1" style={{ animation: needle }} clipPath="url(#pg-fan)" />
                ) : null}
              </g>
              <circle cx="482" cy="356" r="4" fill="#3C4A57" />
              <text x="482" y="388" textAnchor="middle" fontSize="17" fontWeight="600" fill="#1F5FA3">{c.labels.screen}</text>
            </g>

            {/* 4. Note back to the family doctor */}
            <g style={on(3)}>
              <rect x="402" y="400" width="216" height="36" rx="18" fill="#E6F4EA" stroke="#7FC8A9" strokeWidth="2" />
              <path d="M 420 418 L 427 425 L 439 411" fill="none" stroke="#2C4A3A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <text x="450" y="424" fontSize="15" fontWeight="600" fill="#2C4A3A">{c.labels.report}</text>
            </g>
          </svg>
          <figcaption className="text-[12px] text-muted">{c.note}</figcaption>
        </figure>

        <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
          {reduced ? null : (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="self-start rounded-chip border-[1.5px] border-border bg-white px-4 py-2 text-[13px] font-semibold hover:border-sky"
            >
              {playing ? c.pause : c.play}
            </button>
          )}
          <ol className="flex flex-col gap-1.5">
            {c.steps.map((s, i) => {
              const active = step === i;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setStep(i);
                      setPlaying(false);
                    }}
                    className={cn(
                      "flex w-full gap-3.5 rounded-[18px] px-4 py-3 text-left motion-safe:transition-colors motion-safe:duration-300",
                      active ? "bg-white shadow-[0_10px_30px_-18px_rgba(15,31,46,0.45)]" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold", active ? "text-white" : "bg-white text-ink-2")}
                      style={active ? { background: i === 1 || i === 2 ? SKY : CORAL } : undefined}
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold">{s.t}</span>
                      {active ? <span className="pretty text-[14px] leading-[1.5] text-secondary">{s.d}</span> : null}
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
