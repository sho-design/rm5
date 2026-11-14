"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { teamsCopy as c } from "@/content/pregnancy-extra";
import { bookFor, routes } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/* Lane colours: our care in sky, obstetrics or midwifery in lilac, your baby in sage. */
const SKY = "var(--rm-sky)";
const LILAC = "var(--rm-lilac-deep)";
const SAGE = "var(--rm-sage-deep)";

/** Rail columns (px from the left of the 104px rail) and the height of each row's dot. */
const A = 18;
const B = 54;
const C = 88;
const DOT = 30;

type Seg = { x: number; from: "top" | "dot"; to: "dot" | "bottom"; color: string; thin?: boolean };
type Row = {
  k: string;
  time: string;
  title: string;
  body: string;
  /** Vertical line pieces in this row's rail. */
  segs: Seg[];
  /** Horizontal joins at the dot, from x to x. */
  joins?: { x1: number; x2: number; color: string }[];
  /** Dots at the row's dot height. */
  dots: { x: number; color: string; hollow?: boolean }[];
  extra?: "who" | "choices";
};

/** The route, row by row: one line with us, a branch to obstetrics or midwifery at 12 weeks while a thin line stays
 *  with us, then the baby's own short line joined to the same family doctor. */
const ROWS: Row[] = [
  {
    k: "find",
    time: c.findTime,
    title: c.findTitle,
    body: c.findBody,
    segs: [{ x: A, from: "dot", to: "bottom", color: SKY }],
    dots: [{ x: A, color: SKY, hollow: true }],
  },
  {
    k: "first",
    time: c.firstTime,
    title: c.firstTitle,
    body: c.firstBody,
    segs: [{ x: A, from: "top", to: "bottom", color: SKY }],
    dots: [{ x: A, color: SKY }],
  },
  {
    k: "tests",
    time: c.testsTime,
    title: c.testsTitle,
    body: c.testsBody,
    segs: [{ x: A, from: "top", to: "bottom", color: SKY }],
    dots: [{ x: A, color: SKY }],
    extra: "who",
  },
  {
    k: "referral",
    time: c.referralTime,
    title: c.referralTitle,
    body: c.referralBody,
    segs: [
      { x: A, from: "top", to: "dot", color: SKY },
      { x: A, from: "dot", to: "bottom", color: SKY, thin: true },
      { x: B, from: "dot", to: "bottom", color: LILAC },
    ],
    joins: [{ x1: A, x2: B, color: LILAC }],
    dots: [
      { x: A, color: SKY },
      { x: B, color: LILAC },
    ],
    extra: "choices",
  },
  {
    k: "throughout",
    time: c.throughoutTime,
    title: c.throughoutTitle,
    body: c.throughoutBody,
    segs: [
      { x: A, from: "top", to: "bottom", color: SKY, thin: true },
      { x: B, from: "top", to: "bottom", color: LILAC },
    ],
    dots: [{ x: A, color: SKY }],
  },
  {
    k: "baby",
    time: c.babyTime,
    title: c.babyTitle,
    body: c.babyBody,
    segs: [
      { x: A, from: "top", to: "dot", color: SKY, thin: true },
      { x: B, from: "top", to: "dot", color: LILAC },
      { x: C, from: "dot", to: "bottom", color: SAGE },
    ],
    joins: [{ x1: A, x2: C, color: SAGE }],
    dots: [
      { x: B, color: LILAC, hollow: true },
      { x: C, color: SAGE },
    ],
  },
];

/**
 * "Two teams, one pregnancy" (Pregnancy care, November 2026). Replaces the "What to expect" box and the first
 * trimester steps, carrying their wording. A route runs down the page: one line with us from the day you find out,
 * a branch to obstetrics or midwifery at 12 weeks while a thin line stays with us as your family doctor, then your
 * baby's own short line, joined to the same family doctor. Each row draws its piece of the route as it scrolls into
 * view; with reduced motion the whole route is drawn. The rows are the text version; the lines are decorative and
 * named in the key above them.
 */
export function TwoTeams() {
  const reduced = useReducedMotion();
  const [lit, setLit] = useState<Set<string>>(new Set());
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        setLit((prev) => {
          let next = prev;
          for (const e of entries) {
            const k = (e.target as HTMLElement).dataset.k;
            if (e.isIntersecting && k && !prev.has(k)) {
              if (next === prev) next = new Set(prev);
              next.add(k);
            }
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );
    el.querySelectorAll<HTMLElement>("[data-k]").forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const on = (k: string) => reduced || lit.has(k);

  return (
    <Section id="two-teams" className="rm-paper scroll-mt-24">
      <style>{`
        .tt-seg { transform-origin: top; transform: scaleY(0); transition: transform 600ms cubic-bezier(.2,.8,.2,1); }
        .tt-seg.tt-on { transform: scaleY(1); }
        .tt-join { transform-origin: left; transform: scaleX(0); transition: transform 400ms cubic-bezier(.2,.8,.2,1) 200ms; }
        .tt-join.tt-on { transform: scaleX(1); }
        .tt-dot { transform: scale(.4); opacity: .35; transition: transform 300ms cubic-bezier(.2,.8,.2,1), opacity 300ms; }
        .tt-dot.tt-on { transform: scale(1); opacity: 1; }
        .tt-card { transition: border-color 300ms, box-shadow 300ms, opacity 300ms; }
        @media (prefers-reduced-motion: reduce) {
          .tt-seg, .tt-join, .tt-dot, .tt-card { transition: none; }
        }
        :root[data-theme="contrast"] .tt-card { border: 2px solid var(--rm-ink) !important; }
        :root[data-theme="contrast"] .tt-seg, :root[data-theme="contrast"] .tt-join { opacity: 1 !important; }
      `}</style>
      <div className="flex flex-col gap-8 rounded-block bg-[color:var(--div-family)] p-6 md:p-10 lg:p-12">
        <div className="flex max-w-[760px] flex-col gap-4">
          <Eyebrow tone="inherit" className="text-sky-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[17px] leading-[1.55] text-secondary">{c.lead}</p>
          <div className="flex flex-wrap gap-2.5 pt-1">
            <Button to={bookFor("family", "pregnancy")}>{c.book}</Button>
            <Button to={routes.register} variant="outline">
              {c.register}
            </Button>
          </div>
        </div>

        {/* Key to the lines: the lines carry no words of their own. */}
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold text-muted">{c.legendLabel}</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
            {[
              { t: c.lanes.us, color: SKY },
              { t: c.lanes.obs, color: LILAC },
              { t: c.lanes.family, color: SKY, thin: true },
              { t: c.lanes.baby, color: SAGE },
            ].map((l) => (
              <li key={l.t} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block w-6 rounded-full"
                  style={{
                    height: l.thin ? 2 : 4,
                    background: l.thin ? "transparent" : l.color,
                    borderTop: l.thin ? `2px dashed ${l.color}` : undefined,
                  }}
                />
                {l.t}
              </li>
            ))}
          </ul>
          <span className="text-[13px] text-muted">{c.illustration}</span>
        </div>

        <ol ref={list} className="flex flex-col">
          {ROWS.map((r) => {
            const lit = on(r.k);
            return (
              <li key={r.k} data-k={r.k} className="grid grid-cols-[76px_minmax(0,1fr)] gap-3 [--u:.74] md:grid-cols-[104px_minmax(0,1fr)] md:gap-5 md:[--u:1]">
                {/* This row's piece of the route. */}
                <div aria-hidden className="relative min-h-[132px]">
                  {r.segs.map((s, i) => (
                    <span
                      key={i}
                      className={cn("tt-seg absolute block", lit && "tt-on")}
                      style={
                        {
                          left: `calc(${s.x}px * var(--u) - ${s.thin ? 1 : 2}px)`,
                          width: s.thin ? 0 : 4,
                          top: s.from === "top" ? 0 : DOT,
                          bottom: s.to === "bottom" ? 0 : undefined,
                          height: s.to === "dot" ? (s.from === "top" ? DOT : 0) : undefined,
                          background: s.thin ? undefined : s.color,
                          borderLeft: s.thin ? `2px dashed ${s.color}` : undefined,
                          borderRadius: 2,
                          transitionDelay: s.from === "dot" ? "250ms" : "0ms",
                        } as CSSProperties
                      }
                    />
                  ))}
                  {r.joins?.map((j, i) => (
                    <span
                      key={`j${i}`}
                      className={cn("tt-join absolute block h-[3px] rounded-full", lit && "tt-on")}
                      style={{ left: `calc(${j.x1}px * var(--u))`, width: `calc(${j.x2 - j.x1}px * var(--u))`, top: DOT - 1.5, background: j.color }}
                    />
                  ))}
                  {r.dots.map((d, i) => (
                    <span
                      key={`d${i}`}
                      className={cn("tt-dot absolute block h-4 w-4 rounded-full border-[3px]", lit && "tt-on")}
                      style={{
                        left: `calc(${d.x}px * var(--u) - 8px)`,
                        top: DOT - 8,
                        borderColor: d.color,
                        background: d.hollow ? "var(--bg-page)" : d.color,
                      }}
                    />
                  ))}
                </div>

                {/* The words: these are the content; the lines only illustrate them. */}
                <div className="pb-4">
                  <div
                    className={cn(
                      "tt-card flex flex-col gap-1.5 rounded-card border bg-[color:var(--bg-page)] p-4 md:p-5",
                      lit ? "border-[color:var(--rm-sky)] shadow-[0_8px_22px_rgba(15,31,46,.07)]" : "border-[color:var(--border-default)] opacity-80",
                    )}
                  >
                    <span className="text-[13px] font-semibold text-sky-text">{r.time}</span>
                    <h3 className="text-[18px] font-semibold leading-[1.25]">{r.title}</h3>
                    <p className="pretty max-w-[62ch] text-[15px] leading-[1.55] text-secondary">{r.body}</p>
                    {r.extra === "who" ? (
                      <p className="text-[14px] leading-[1.5]">
                        <span className="font-semibold">{c.whoLabel}: </span>
                        {c.whoValue}
                      </p>
                    ) : null}
                    {r.extra === "choices" ? (
                      <ul className="flex flex-wrap gap-2 pt-1">
                        {c.referralChoices.map((x) => (
                          <li key={x} className="rounded-chip bg-[color:var(--rm-lilac-tint)] px-3 py-1 text-[13px] font-semibold text-lilac-text">
                            {x}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
