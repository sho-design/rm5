"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { familyCopy as c } from "@/content/vaccines-extra";
import { bookFor } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const INK = "#0F1F2E";

/** Four simple family figures: height, skin tone, top colour. Kept friendly and plain. */
const PEOPLE = [
  { h: 1, skin: "#E8B98F", top: "#2F7FD1" },
  { h: 0.92, skin: "#C68B59", top: "#B98AD9" },
  { h: 0.86, skin: "#F2D2B6", top: "#3D9B78" },
  { h: 0.66, skin: "#8D5524", top: "#E07A5F" },
];

const SLOT_W = 128;
const GAP = 22;
const X0 = 32;
const SLOT_Y = 196;

/**
 * "The family lines up" (Vaccines, November 2026). Four family members drop one by one into their own booking, in
 * back-to-back slots; the slots then close up into one visit, framed as "seen together". Loops while on screen
 * (Pause stops it); with reduced motion the joined visit shows. Resting styles are the final state.
 */
export function FamilyLineUp() {
  const reduced = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && inView && !reduced;
  // Joined positions: the four slots side by side with no gap, centred in the same width.
  const joinedX0 = X0 + ((SLOT_W + GAP) * 4 - GAP - SLOT_W * 4) / 2;

  return (
    <Section id="family" className="rm-paper scroll-mt-24">
      <style>{`
        .fl-fig * { animation-duration: 8s; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(.2,.8,.2,1); animation-fill-mode: both; }
        .fl-stop * { animation-play-state: paused !important; }
        ${PEOPLE.map((_, i) => `@keyframes fl-drop-${i} { 0%, ${6 + i * 9}% { opacity: 0; transform: translateY(-90px); } ${14 + i * 9}%, 100% { opacity: 1; transform: none; } } .fl-drop-${i} { animation-name: fl-drop-${i}; }`).join("\n")}
        @keyframes fl-join { 0%, 58% { transform: translateX(var(--fl-dx)); } 70%, 100% { transform: none; } }
        @keyframes fl-frame { 0%, 70% { opacity: 0; transform: scale(.96); } 78%, 100% { opacity: 1; transform: none; } }
        .fl-join { animation-name: fl-join; }
        .fl-frame { animation-name: fl-frame; transform-box: fill-box; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) { .fl-fig * { animation: none !important; } }
        :root[data-theme="contrast"] .fl-fig [data-soft] { opacity: 1 !important; }
      `}</style>

      <div ref={box} className="grid grid-cols-1 gap-8 rounded-block bg-[color:var(--rm-sky-soft)] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="inherit" className="text-[color:var(--rm-sky-text)]">
              {c.eyebrow}
            </Eyebrow>
            <Display size="sm">{c.title}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.rule}</p>
          </div>
          <ol className="flex flex-col gap-3">
            {c.steps.map((s, i) => (
              <li key={s.t} className="flex gap-3">
                <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-[13px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5 pt-0.5">
                  <span className="text-[16px] font-semibold leading-[1.3]">{s.t}</span>
                  <span className="pretty text-[14px] leading-[1.5] text-secondary">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>
          <Button to={bookFor("family", "vaccine")} className="self-start">
            {c.cta}
          </Button>
        </div>

        <figure className="m-0 flex min-w-0 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <figcaption className="text-[13px] font-semibold text-secondary">{c.illustration}</figcaption>
            {!reduced ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="min-h-[44px] shrink-0 rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>
          <svg
            role="img"
            aria-label={c.alt}
            viewBox="0 0 640 340"
            className={cn("fl-fig h-auto w-full rounded-[18px] bg-page", !running && "fl-stop")}
          >
            {/* The day's timeline */}
            <path d={`M${X0 - 8} ${SLOT_Y + 92} H ${640 - X0 + 8}`} stroke="#C9D2DB" strokeWidth="2" />

            {/* "Seen together" frame around the joined slots */}
            <g className="fl-frame">
              <rect x={joinedX0 - 10} y={SLOT_Y - 150} width={SLOT_W * 4 + 20} height={250} rx="22" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="7 7" />
              <rect x={320 - 74} y={SLOT_Y - 166} width="148" height="32" rx="16" fill={INK} />
              <text x="320" y={SLOT_Y - 145} textAnchor="middle" fontSize="15" fontWeight="600" fill="#fff">
                {c.together}
              </text>
            </g>

            {PEOPLE.map((p, i) => {
              const spreadX = X0 + i * (SLOT_W + GAP);
              const joinedX = joinedX0 + i * SLOT_W;
              const cx = SLOT_W / 2;
              const bodyH = 92 * p.h;
              const headR = 17 * (0.8 + 0.2 * p.h);
              const bodyTop = SLOT_Y + 70 - bodyH;
              return (
                <g key={i} transform={`translate(${joinedX} 0)`}>
                  {/* Each slot starts at its spread position and slides to its joined place. */}
                  <g className="fl-join" style={{ "--fl-dx": `${spreadX - joinedX}px` } as CSSProperties}>
                    <rect x="0" y={SLOT_Y - 120} width={SLOT_W} height={210} rx="16" fill="#F4F7FA" stroke="#C9D2DB" strokeWidth="1.5" data-soft />
                    <text x={cx} y={SLOT_Y + 112} textAnchor="middle" fontSize="13" fontWeight="600" fill="#5A6B7B">
                      {c.slot(i + 1)}
                    </text>
                    {/* Each person drops in turn (keyframes fl-drop-0 to 3 above). */}
                    <g className={`fl-drop-${i}`}>
                      {/* Body, then head */}
                      <rect x={cx - 26 * p.h} y={bodyTop} width={52 * p.h} height={bodyH} rx={22 * p.h} fill={p.top} />
                      <circle cx={cx} cy={bodyTop - headR - 4} r={headR} fill={p.skin} stroke={INK} strokeWidth="1.5" />
                      <text x={cx} y={SLOT_Y + 86} textAnchor="middle" fontSize="14" fontWeight="600" fill={INK}>
                        {c.people[i]}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}

          </svg>
        </figure>
      </div>
    </Section>
  );
}
