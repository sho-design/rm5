"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import {
  concernPathCopy as c,
  concernRoutes,
  type RouteKind,
} from "@/content/inf-concern";
import { site } from "@/content/site";
import { bookFor } from "@/lib/routes";
import { radioKeys, rovingTab, useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";

/** Colour of each route: clinical in sky, wellness in sage, the program in amber, a stop in coral. */
const TONE: Record<RouteKind, { line: string; soft: string; text: string }> = {
  clinical: {
    line: "var(--rm-sky)",
    soft: "var(--rm-sky-soft)",
    text: "var(--rm-sky-text)",
  },
  wellness: {
    line: "var(--rm-sage-deep)",
    soft: "var(--rm-sage-tint)",
    text: "var(--rm-sage-text)",
  },
  program: {
    line: "var(--rm-amber-deep)",
    soft: "var(--rm-sun-tint)",
    text: "var(--rm-amber-text)",
  },
  stop: {
    line: "var(--rm-terracotta-deep)",
    soft: "var(--rm-terracotta-tint)",
    text: "var(--rm-terracotta-text)",
  },
};

/** How long each step stays lit while the route plays, and how long the line takes to draw between two steps. */
const STEP_MS = 2200;
const DRAW_MS = 520;

/**
 * "Where your concern goes first": pick a concern and its route through the clinic draws itself, step by step,
 * as a line joining linked cards. Clinical concerns start with a doctor and bloodwork, wellness drips with
 * screening, and "unwell" stops at "see a doctor first". The line draws when the section comes on screen;
 * after that a ring moves along the steps on a loop (Pause stops it). With reduced motion the route is shown
 * whole and still; in high contrast every part is full strength. Copy: content/inf-concern.ts.
 */
export function ConcernPath() {
  const reduced = useReducedMotion();
  const [sel, setSel] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  const [lit, setLit] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setSeen(true);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const route = concernRoutes[sel];
  const tone = TONE[route.kind];
  const n = route.steps.length;
  const moving = playing && inView && !reduced && n > 1;

  // A new route starts its ring at the first step.
  useEffect(() => setLit(0), [sel]);
  useEffect(() => {
    if (!moving) return;
    const t = window.setInterval(() => setLit((i) => (i + 1) % n), STEP_MS);
    return () => window.clearInterval(t);
  }, [moving, n]);

  // The line draws once the section has been on screen (and again for each new route).
  const draw = seen && !reduced;

  return (
    <Section id="concern-route" className="scroll-mt-6">
      <style>{`
        @keyframes cp-draw { from { stroke-dashoffset: 100 } to { stroke-dashoffset: 0 } }
        @keyframes cp-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
        @keyframes cp-ring { 0% { transform: scale(.9); opacity: .9 } 100% { transform: scale(1.5); opacity: 0 } }
        .cp-line { stroke-dasharray: 100; stroke-dashoffset: 100; }
        .cp-line.cp-run { animation: cp-draw ${DRAW_MS}ms cubic-bezier(.2,.8,.2,1) both; }
        .cp-line.cp-done { stroke-dashoffset: 0; }
        .cp-step.cp-run { animation: cp-in 380ms cubic-bezier(.2,.8,.2,1) both; }
        .cp-ring { transform-origin: center; animation: cp-ring 1.4s cubic-bezier(.2,.8,.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cp-line, .cp-line.cp-run { animation: none; stroke-dashoffset: 0; }
          .cp-step.cp-run { animation: none; }
          .cp-ring { animation: none; opacity: 0; }
        }
        :root[data-theme="contrast"] .cp-step { border: 2px solid var(--rm-ink) !important; }
        :root[data-theme="contrast"] .cp-line { stroke: var(--rm-ink) !important; opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className="flex flex-col gap-8 overflow-hidden rounded-block bg-[color:var(--div-infusion)] p-6 text-ink md:p-10 lg:p-12"
      >
        <div className="flex max-w-[760px] flex-col gap-4">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>

        <div
          role="radiogroup"
          aria-label={c.pickLabel}
          onKeyDown={radioKeys}
          className="flex flex-wrap gap-2"
        >
          {concernRoutes.map((r, i) => {
            const on = i === sel;
            return (
              <button
                key={r.key}
                type="button"
                role="radio"
                aria-checked={on}
                tabIndex={rovingTab(on, i, true)}
                onClick={() => setSel(i)}
                className={cn(
                  "flex min-h-[44px] items-center gap-2 rounded-chip border px-4 text-[14px] font-semibold transition-colors",
                  on
                    ? "border-ink bg-ink text-white"
                    : "border-[color:var(--border-default)] bg-page hover:border-ink",
                )}
              >
                <span
                  aria-hidden
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: TONE[r.kind].line }}
                />
                {r.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 rounded-card bg-page p-5 md:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="flex items-center gap-2 text-[13px] font-semibold"
              style={{ color: tone.text }}
            >
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: tone.line }}
              />
              {c.kinds[route.kind]}
            </span>
            {!reduced && n > 1 ? (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-pressed={!playing}
                className="min-h-[44px] rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[13px] font-semibold hover:border-ink"
              >
                {playing ? c.pause : c.play}
              </button>
            ) : null}
          </div>

          {route.kind === "stop" ? (
            <div
              key={route.key}
              className={cn(
                "cp-step flex flex-col gap-3 rounded-card p-5 md:p-6",
                draw && "cp-run",
              )}
              style={{ background: tone.soft }}
            >
              <h3 className="font-display text-[24px] font-medium leading-[1.1]">
                {route.steps[0].t}
              </h3>
              <p className="pretty max-w-[640px] text-[15px] leading-[1.55]">
                {route.steps[0].d}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  to={
                    bookFor("family", "concern") +
                    "&reason=" +
                    encodeURIComponent("Unwell")
                  }
                  size="sm"
                >
                  {c.bookFamily}
                </Button>
                <a
                  href={site.phoneHref}
                  className="flex min-h-[44px] items-center text-[14px] font-semibold text-link"
                >
                  {c.call}
                </a>
              </div>
              <p className="text-[14px] font-semibold">{c.emergency}</p>
            </div>
          ) : (
            <ol
              key={route.key}
              aria-label={c.routeLabel(route.label)}
              className="flex flex-col md:flex-row md:items-stretch"
            >
              {route.steps.map((s, i) => {
                const on = lit === i && !reduced;
                return (
                  <Fragment key={s.t + i}>
                    {i > 0 ? (
                      <li
                        aria-hidden
                        className="flex shrink-0 items-center justify-center md:w-10"
                      >
                        {/* Vertical joiner on phones, horizontal from tablet up. */}
                        <svg
                          viewBox="0 0 12 40"
                          className="h-9 w-3 md:hidden"
                          fill="none"
                        >
                          <path
                            d="M6 2 V38"
                            pathLength={100}
                            stroke={tone.line}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className={cn(
                              "cp-line",
                              draw ? "cp-run" : reduced ? "cp-done" : "",
                            )}
                            style={{ animationDelay: `${i * DRAW_MS}ms` }}
                          />
                        </svg>
                        <svg
                          viewBox="0 0 40 12"
                          className="hidden h-3 w-10 md:block"
                          fill="none"
                        >
                          <path
                            d="M2 6 H38"
                            pathLength={100}
                            stroke={tone.line}
                            strokeWidth="3"
                            strokeLinecap="round"
                            className={cn(
                              "cp-line",
                              draw ? "cp-run" : reduced ? "cp-done" : "",
                            )}
                            style={{ animationDelay: `${i * DRAW_MS}ms` }}
                          />
                        </svg>
                      </li>
                    ) : null}
                    <li
                      className={cn(
                        "cp-step relative flex min-w-0 flex-1 flex-col",
                        draw && "cp-run",
                      )}
                      style={{ animationDelay: `${i * DRAW_MS}ms` }}
                    >
                      <div
                        className={cn(
                          "relative flex h-full flex-col gap-2 rounded-card border p-4 transition-[border-color,box-shadow,background-color] duration-300 md:p-5",
                          on ? "shadow-[0_8px_24px_rgba(15,31,46,.10)]" : "",
                        )}
                        style={{
                          borderColor: on ? tone.line : "var(--border-default)",
                          background: on ? tone.soft : "var(--bg-page)",
                        }}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                            {on ? (
                              <span
                                aria-hidden
                                className="cp-ring absolute inset-0 rounded-full"
                                style={{ background: tone.line }}
                              />
                            ) : null}
                            <span
                              className="relative flex h-8 w-8 items-center justify-center rounded-full text-[14px] font-bold text-white"
                              style={{ background: tone.line }}
                            >
                              {i + 1}
                            </span>
                          </span>
                          {s.tag ? (
                            <span
                              className="rounded-chip bg-page px-2.5 py-1 text-[13px] font-semibold"
                              style={{ color: tone.text }}
                            >
                              {s.tag}
                            </span>
                          ) : null}
                        </span>
                        <span className="sr-only">{c.stepOf(i + 1, n)}: </span>
                        <h3 className="text-[17px] font-semibold leading-[1.25]">
                          {s.t}
                        </h3>
                        <p className="pretty text-[14px] leading-[1.45] text-secondary">
                          {s.d}
                        </p>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ol>
          )}
          <p className="text-[13px] text-muted">{c.illustration}</p>
          {route.next ? (
            <div
              key={`next-${route.key}`}
              className="mt-1 flex flex-col gap-4 rounded-card p-5 md:flex-row md:items-center md:justify-between md:gap-8 md:p-6"
              style={{ background: tone.soft }}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: tone.text }}
                >
                  {c.nextEyebrow}
                </span>
                <p className="pretty text-[17px] font-semibold leading-[1.35]">
                  {route.next.lead}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
                <Button to={route.next.to}>{route.next.cta}</Button>
                <SmartLink
                  to={route.next.more.to}
                  className="flex min-h-[44px] items-center text-[15px] font-semibold text-link"
                >
                  {route.next.more.t} ›
                </SmartLink>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
