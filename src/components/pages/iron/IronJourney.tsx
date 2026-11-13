"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { ironJourney as c } from "@/content/iron";
import { cn } from "@/lib/cn";

/** Long enough to read the longest step (about 27 words) at a calm pace (round 29, Nadia). */
const STEP_MS = 8000;
const IRON = "#8A4B2A";
const RED = "#E07A5F";

/** True when the visitor asked for less motion; then the diagram is still and does not advance. */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * "Where the iron goes": an animated diagram of an iron infusion, from the IV bag into the arm, through the
 * bloodstream to the iron stores, into new red cells, and back to bloodwork. Five steps beside it; the active
 * step lights its part of the picture. It advances by itself only while on screen, pauses on Pause or when a
 * step is picked, and is a still picture with reduced motion. Education only (copy in content/iron.ts).
 */
export function IronJourney() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
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
    const t = window.setInterval(
      () => setStep((s) => (s + 1) % c.steps.length),
      STEP_MS,
    );
    return () => window.clearInterval(t);
  }, [moving]);

  // Each part of the picture is bright when its step is active, soft otherwise.
  const part = (i: number) => ({
    opacity: step === i ? 1 : 0.62,
    transition: "opacity 350ms cubic-bezier(.2,.8,.2,1)",
  });
  const anim = !reduced;

  return (
    <Section id="iron-journey" className="scroll-mt-6">
      <div
        ref={box}
        className="grid grid-cols-1 gap-8 overflow-hidden rounded-block bg-[#F7F4EF] p-6 text-ink md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:p-12"
      >
        {/* Phone order: heading, picture, steps. Desktop: heading and steps on the left, picture on the right. */}
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-[#8A4B2A]">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>
        <figure className="relative m-0 flex flex-col gap-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-center">
          <svg
            viewBox="0 0 640 440"
            role="img"
            aria-label={c.figure}
            className="h-auto w-full"
          >
            <defs>
              <linearGradient id="ij-fluid" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#A9623B" />
                <stop offset="1" stopColor={IRON} />
              </linearGradient>
              <radialGradient id="ij-cell" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0.45" stopColor="#C9533B" />
                <stop offset="1" stopColor={RED} />
              </radialGradient>
              <path id="ij-tube" d="M 92 150 C 92 200, 100 230, 150 250" />
              <path id="ij-vessel" d="M 250 262 C 340 262, 330 140, 420 132" />
              <path id="ij-marrow" d="M 520 188 C 530 260, 500 300, 440 322" />
            </defs>

            {/* Soft guide line through the whole journey */}
            <path
              d="M 92 150 C 92 200, 100 230, 150 250 L 250 262 C 340 262, 330 140, 420 132"
              fill="none"
              stroke="#E7DED3"
              strokeWidth="2"
              strokeDasharray="4 7"
            />

            {/* 1. IV bag and line into the arm */}
            <g style={part(0)}>
              <rect
                x="56"
                y="26"
                width="72"
                height="112"
                rx="16"
                fill="#FFFFFF"
                stroke="#D8CFC4"
                strokeWidth="2"
              />
              <rect
                x="64"
                y="58"
                width="56"
                height="72"
                rx="10"
                fill="url(#ij-fluid)"
                opacity="0.92"
              >
                {anim ? (
                  <animate
                    attributeName="height"
                    values="72;60;72"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                ) : null}
                {anim ? (
                  <animate
                    attributeName="y"
                    values="58;70;58"
                    dur="8s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </rect>
              <rect
                x="84"
                y="16"
                width="16"
                height="14"
                rx="4"
                fill="#D8CFC4"
              />
              <text
                x="92"
                y="46"
                textAnchor="middle"
                fontSize="17"
                fontWeight="600"
                fill="#5A4636"
              >
                {c.labels.bag}
              </text>
              <use
                href="#ij-tube"
                fill="none"
                stroke="#D8CFC4"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {anim
                ? [0, 1, 2].map((n) => (
                    <circle key={n} r="4.5" fill={IRON}>
                      <animateMotion
                        dur="2.4s"
                        begin={`-${n * 0.8}s`}
                        repeatCount="indefinite"
                      >
                        <mpath href="#ij-tube" />
                      </animateMotion>
                    </circle>
                  ))
                : null}
              {/* Arm */}
              <rect
                x="120"
                y="232"
                width="150"
                height="58"
                rx="29"
                fill="#F2D9C7"
              />
              <rect
                x="138"
                y="252"
                width="40"
                height="16"
                rx="6"
                fill="#FFFFFF"
                opacity="0.9"
              />
            </g>

            {/* 2. Bloodstream */}
            <g style={part(1)}>
              <use
                href="#ij-vessel"
                fill="none"
                stroke="#F6C9BC"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <use
                href="#ij-vessel"
                fill="none"
                stroke="#FBE3DB"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {anim
                ? [0, 1, 2, 3, 4].map((n) => (
                    <g key={n}>
                      <circle r="5" fill={IRON}>
                        <animateMotion
                          dur="3.2s"
                          begin={`-${n * 0.64}s`}
                          repeatCount="indefinite"
                          rotate="auto"
                        >
                          <mpath href="#ij-vessel" />
                        </animateMotion>
                      </circle>
                    </g>
                  ))
                : [0.2, 0.5, 0.8].map((k) => (
                    <circle
                      key={k}
                      cx={250 + 170 * k}
                      cy={262 - 128 * k}
                      r="5"
                      fill={IRON}
                    />
                  ))}
              <text
                x="318"
                y="236"
                fontSize="17"
                fontWeight="600"
                fill="#8A3F2B"
              >
                {c.labels.blood}
              </text>
            </g>

            {/* 3. Iron stores filling */}
            <g style={part(2)}>
              <rect
                x="420"
                y="72"
                width="190"
                height="116"
                rx="40"
                fill="#FFF6EE"
                stroke="#E9C9A8"
                strokeWidth="2"
              />
              <text
                x="515"
                y="104"
                textAnchor="middle"
                fontSize="17"
                fontWeight="600"
                fill="#5A4636"
              >
                {c.labels.stores}
              </text>
              <rect
                x="448"
                y="120"
                width="134"
                height="22"
                rx="11"
                fill="#EFE3D6"
              />
              <rect
                x="448"
                y="120"
                width="134"
                height="22"
                rx="11"
                fill={IRON}
                style={
                  anim
                    ? {
                        transformOrigin: "448px 131px",
                        animation:
                          "ijFill 9s cubic-bezier(.2,.8,.2,1) infinite",
                      }
                    : {
                        transformOrigin: "448px 131px",
                        transform: "scaleX(0.66)",
                      }
                }
              />
              {[0, 1, 2].map((n) => (
                <line
                  key={n}
                  x1={448 + 44.7 * (n + 1)}
                  x2={448 + 44.7 * (n + 1)}
                  y1="120"
                  y2="142"
                  stroke="#FFF6EE"
                  strokeWidth="2"
                />
              ))}
              <text
                x="515"
                y="166"
                textAnchor="middle"
                fontSize="15"
                fill="#7A6656"
              >
                Visit 1, 2, 3
              </text>
            </g>

            {/* 4. New red cells */}
            <g style={part(3)}>
              <use
                href="#ij-marrow"
                fill="none"
                stroke="#F3D2C7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="2 8"
              />
              {[
                [350, 340, 0],
                [392, 366, 0.4],
                [436, 344, 0.8],
                [470, 378, 1.2],
                [330, 386, 1.6],
                [410, 404, 2],
              ].map(([x, y, d]) => (
                <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
                  <g
                    style={
                      anim
                        ? {
                            animation: `ijCell 3.6s cubic-bezier(.2,.8,.2,1) ${d}s infinite`,
                            transformOrigin: "0 0",
                          }
                        : undefined
                    }
                  >
                    <ellipse rx="19" ry="17" fill="url(#ij-cell)" />
                    <ellipse rx="8" ry="6" fill="#F7A99A" opacity="0.8" />
                  </g>
                </g>
              ))}
              <text
                x="400"
                y="320"
                textAnchor="middle"
                fontSize="17"
                fontWeight="600"
                fill="#8A3F2B"
              >
                {c.labels.cells}
              </text>
            </g>

            {/* 5. Repeat bloodwork */}
            <g style={part(4)}>
              <g transform="translate(556 300)">
                <rect
                  x="-11"
                  y="-6"
                  width="22"
                  height="78"
                  rx="11"
                  fill="#FFFFFF"
                  stroke="#C9D6E3"
                  strokeWidth="2"
                />
                <rect x="-7" y="30" width="14" height="38" rx="7" fill={RED} />
                <rect
                  x="-14"
                  y="-12"
                  width="28"
                  height="10"
                  rx="4"
                  fill="#9BB0C9"
                />
                <circle cx="30" cy="10" r="16" fill="#3D9B78" />
                <path
                  d="M 22 10 L 28 16 L 38 4"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <text
                x="566"
                y="404"
                textAnchor="middle"
                fontSize="17"
                fontWeight="600"
                fill="#2C4A3A"
              >
                {c.labels.check}
              </text>
            </g>
          </svg>
          <figcaption className="text-[13px] text-muted">{c.note}</figcaption>
        </figure>
        <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
          {/* Pause sits above the steps, where a reader sees it before the text moves on (round 29). */}
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
              const on = step === i;
              return (
                <li key={s.t}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setStep(i);
                      setPlaying(false);
                    }}
                    className={cn(
                      "flex w-full gap-3.5 rounded-[18px] px-4 py-3 text-left motion-safe:transition-colors motion-safe:duration-300",
                      on
                        ? "bg-white shadow-[0_10px_30px_-18px_rgba(15,31,46,0.45)]"
                        : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[13px] font-semibold",
                        on ? "text-white" : "bg-white text-ink-2",
                      )}
                      style={
                        on ? { background: i === 3 ? RED : IRON } : undefined
                      }
                    >
                      {i + 1}
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold">{s.t}</span>
                      {on ? (
                        <span className="pretty text-[14px] leading-[1.5] text-secondary">
                          {s.d}
                        </span>
                      ) : null}
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
