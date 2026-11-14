"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { lifetimeCopy as c } from "@/content/vaccines-extra";
import { bookFor, routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

const INK = "#0F1F2E";
const SAGE = "#3D9B78";
const SKY = "#2F7FD1";

/** Where each stop links: the children's age chooser, booking a vaccine visit, or booking a flu shot. */
const linkFor = (k: string) =>
  k === "baby" || k === "child" || k === "teen"
    ? `${routes.kids}#immunizations`
    : k === "flu"
      ? bookFor("family", "flu")
      : bookFor("family", "vaccine");

/**
 * A simple line figure for each stage: baby, child, teen, adult, older adult, and a small leaf ring for the yearly flu
 * shot. Drawn in a 120 by 160 box; the figure grows as the stages go on.
 */
function Figure({ k }: { k: string }) {
  const s = { fill: "none", stroke: INK, strokeWidth: 2.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (k === "flu") {
    // A calendar page with October's leaf: the yearly return.
    return (
      <g {...s}>
        <rect x="30" y="46" width="60" height="62" rx="10" fill="#FFFFFF" />
        <path d="M30 64h60M44 40v12M76 40v12" />
        <path d="M60 78c10 0 16 8 12 20c-10 2-18-4-16-14c1-4 2-6 4-6z" fill="#F5C77E" stroke="#B8860B" />
        <path d="M60 98l-6 6" stroke="#B8860B" />
        <path d="M18 120a44 44 0 1 0 8 -58" stroke={SKY} strokeDasharray="4 6" />
        <path d="M24 54l2 9 9-3" stroke={SKY} />
      </g>
    );
  }
  // Head size, body height and leg length by stage.
  const f = {
    baby: { head: 15, top: 70, body: 26, leg: 14, arm: 12 },
    child: { head: 14, top: 52, body: 34, leg: 26, arm: 18 },
    teen: { head: 12, top: 30, body: 44, leg: 40, arm: 24 },
    adult: { head: 12, top: 22, body: 48, leg: 46, arm: 26 },
    older: { head: 12, top: 26, body: 46, leg: 44, arm: 24 },
  }[k as "baby"] ?? { head: 12, top: 22, body: 48, leg: 46, arm: 26 };
  const cx = 60;
  const neck = f.top + f.head * 2 + 2;
  const hip = neck + f.body;
  if (k === "baby") {
    // A baby, held in a soft blanket.
    return (
      <g {...s}>
        <circle cx={cx} cy={f.top + f.head} r={f.head} fill="#FFFFFF" />
        <path d={`M${cx - 26} ${neck + 4} q26 34 52 0 q-6 34 -26 40 q-20 -6 -26 -40z`} fill="#E6F4EA" />
        <path d={`M${cx - 7} ${f.top + f.head + 3} q7 5 14 0`} />
      </g>
    );
  }
  return (
    <g {...s}>
      <circle cx={cx} cy={f.top + f.head} r={f.head} fill="#FFFFFF" />
      <path d={`M${cx} ${neck}v${f.body}`} />
      <path d={`M${cx} ${neck + 8}l-${f.arm * 0.7} ${f.arm * 0.8}M${cx} ${neck + 8}l${f.arm * 0.7} ${f.arm * 0.8}`} />
      <path d={`M${cx} ${hip}l-${f.leg * 0.32} ${f.leg}M${cx} ${hip}l${f.leg * 0.32} ${f.leg}`} />
      {k === "older" ? <path d={`M${cx + f.arm * 0.7 + 4} ${neck + f.arm * 0.8}v${hip + f.leg - neck - f.arm * 0.8}`} stroke={SAGE} /> : null}
      {k === "teen" ? <path d={`M${cx - 10} ${neck + 6}h20v18h-20z`} stroke={SKY} strokeWidth={2} /> : null}
    </g>
  );
}

/**
 * "Vaccines through a lifetime" (Vaccines page, November 2026). One line runs down the page past six stops: baby,
 * 4 to 6 years, Grade 7 and high school, adults, 65 to 70, and the flu shot every fall. As each stop scrolls into
 * view it lights, the line fills to it and its figure grows in. The visible list is the text version; each stop
 * links on. Reduced motion: every stop lit, nothing moves. Facts from kids.ts and the vaccines topic only.
 */
export function VaccineLifetime() {
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState<number>(-1);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.i);
          setSeen((s) => Math.max(s, i));
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  const lit = (i: number) => reduced || i <= seen;
  const n = c.stops.length;
  const fill = reduced ? 1 : Math.max(0, seen) / (n - 1);

  return (
    <Section id="lifetime" className="rm-paper scroll-mt-24">
      <style>{`
        .vl-fig { transition: transform 400ms cubic-bezier(.2,.8,.2,1), opacity 400ms cubic-bezier(.2,.8,.2,1); }
        .vl-fig[data-on="false"] { opacity: .25; transform: translateY(10px) scale(.92); }
        .vl-dot { transition: background-color 300ms, box-shadow 300ms, transform 300ms cubic-bezier(.2,.8,.2,1); }
        .vl-fill { transition: transform 600ms cubic-bezier(.2,.8,.2,1); transform-origin: top; }
        @media (prefers-reduced-motion: reduce) { .vl-fig, .vl-dot, .vl-fill { transition: none; } .vl-fig[data-on="false"] { opacity: 1; transform: none; } }
        :root[data-theme="contrast"] .vl-fig[data-on="false"] { opacity: 1; }
        :root[data-theme="contrast"] .vl-card { border: 2px solid var(--rm-ink) !important; }
      `}</style>
      <div className="flex flex-col gap-8 rounded-block bg-[color:var(--div-family)] p-6 md:p-10 lg:p-12">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-sky-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          <span className="text-[13px] font-semibold text-sky-text">{c.illustration}</span>
        </div>

        <div className="relative">
          {/* The line through a lifetime: grey underneath, filling in sky as the stops are reached. */}
          <span aria-hidden className="absolute bottom-10 left-[19px] top-10 w-1 rounded-full bg-[color:var(--rm-line)] md:left-[27px]" />
          <span
            aria-hidden
            className="vl-fill absolute bottom-10 left-[19px] top-10 w-1 rounded-full md:left-[27px]"
            style={{ background: SKY, transform: `scaleY(${fill})` }}
          />
          <ol aria-label={c.alt} className="relative flex flex-col gap-4 md:gap-5">
            {c.stops.map((s, i) => {
              const on = lit(i);
              return (
                <li
                  key={s.k}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  data-i={i}
                  className="grid grid-cols-[40px_1fr] items-center gap-3 md:grid-cols-[56px_120px_1fr] md:gap-6"
                >
                  <span
                    aria-hidden
                    className="vl-dot z-[1] grid h-10 w-10 place-items-center justify-self-center rounded-full border-[3px] text-[14px] font-bold md:h-12 md:w-12"
                    style={{
                      background: on ? (s.k === "flu" ? "#F5C77E" : SKY) : "#FFFFFF",
                      borderColor: on ? (s.k === "flu" ? "#B8860B" : SKY) : "var(--rm-line)",
                      color: on ? (s.k === "flu" ? INK : "#FFFFFF") : "var(--rm-ink-3)",
                      boxShadow: on ? "0 0 0 6px rgba(47,127,209,.15)" : "none",
                    }}
                  >
                    {s.k === "flu" ? "↻" : i + 1}
                  </span>
                  <svg aria-hidden viewBox="0 0 120 160" className="vl-fig hidden h-[120px] w-[90px] md:block" data-on={on}>
                    <Figure k={s.k} />
                  </svg>
                  <div
                    className={cn(
                      "vl-card flex flex-col gap-1.5 rounded-card border bg-white p-4 transition-[border-color,box-shadow] duration-300 md:p-5",
                      on ? "border-[color:var(--rm-sky)] shadow-[0_8px_22px_rgba(15,31,46,.08)]" : "border-[color:var(--rm-line)]",
                    )}
                  >
                    <span className="text-[13px] font-semibold text-sky-text">{s.age}</span>
                    <h3 className="text-[18px] font-semibold leading-[1.25] text-ink">{s.t}</h3>
                    <p className="pretty text-[15px] leading-[1.5] text-secondary">{s.d}</p>
                    <SmartLink to={linkFor(s.k)} className="w-fit pt-0.5 text-[14px] font-semibold text-link">
                      {s.link} ›
                    </SmartLink>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <p className="pretty max-w-[720px] text-[13px] leading-[1.5] text-muted">{c.note}</p>
      </div>
    </Section>
  );
}
