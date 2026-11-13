"use client";

import { useEffect, useRef, useState } from "react";
import { Display, Eyebrow, Section } from "@/components/ui";
import { visitStory as c } from "@/content/inf-visit";
import { useReducedMotion } from "@/lib/a11y";
import { cn } from "@/lib/cn";
import { VisitScene } from "./VisitScene";

/**
 * "Your visit, minute by minute": a scroll story of a drip visit. On wide screens the steps scroll past on the
 * left while one picture stays beside them and changes as each step reaches the middle of the screen; a line
 * beside the steps fills as you go. On phones each step carries its own small picture. Loops run only on screen
 * and stop with Pause; with reduced motion the pictures are still and nothing slides. Copy: content/inf-visit.ts.
 */
export function VisitStory() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const [progress, setProgress] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const box = useRef<HTMLDivElement>(null);

  // The step nearest the middle of the screen is the current one.
  useEffect(() => {
    const els = items.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // The section is on screen: loops may run.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.05,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // How far through the steps you have scrolled, for the line beside them.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = list.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.5 - r.top) / Math.max(1, r.height);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const moving = playing && inView && !reduced;
  const step = c.steps[active];
  const pct = Math.round(progress * 100);

  return (
    <Section id="visit" className="rm-paper scroll-mt-24">
      <style>{`
        @keyframes vs-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes vs-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
        .vs-in { animation: vs-rise 400ms cubic-bezier(.2,.8,.2,1) both; }
        .vs-draw { stroke-dashoffset: 1; animation: vs-draw 500ms cubic-bezier(.2,.8,.2,1) forwards; }
        .vs-paused .vs-in, .vs-paused .vs-draw { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .vs-in, .vs-draw { animation: none !important; stroke-dashoffset: 0 !important; } }
        :root[data-theme="contrast"] .vs-figure { outline: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .vs-step { opacity: 1 !important; }
      `}</style>
      <div
        ref={box}
        className={cn(
          "flex flex-col gap-8 rounded-block bg-[color:var(--div-infusion)] p-6 text-ink md:p-10 lg:p-12",
          !playing && "vs-paused",
        )}
      >
        <div className="flex max-w-[720px] flex-col gap-3">
          <Eyebrow tone="inherit" className="text-sage-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          {/* Steps, with the line that fills as you scroll. */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute bottom-6 left-[19px] top-6 w-[3px] rounded-full bg-white/80"
            >
              <div
                className="w-full rounded-full bg-sage-deep"
                style={{
                  height: `${pct}%`,
                  transition: reduced ? "none" : "height 200ms linear",
                }}
              />
            </div>
            <ol ref={list} className="relative flex flex-col gap-6 lg:gap-0">
              {c.steps.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li
                    key={s.k}
                    ref={(el) => {
                      items.current[i] = el;
                    }}
                    data-i={i}
                    aria-current={on ? "step" : undefined}
                    className="vs-step flex gap-4 lg:min-h-[46vh] lg:items-center"
                    style={{
                      opacity: reduced || on ? 1 : 0.62,
                      transition: reduced
                        ? undefined
                        : "opacity 300ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[3px] text-[15px] font-semibold transition-colors",
                        on
                          ? "border-sage-deep bg-sage-deep text-white"
                          : done
                            ? "border-sage-deep bg-white text-sage-text"
                            : "border-white bg-white text-muted",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col gap-2 pt-1.5">
                      <h3 className="font-display text-[24px] font-medium leading-[1.1]">
                        {s.t}
                      </h3>
                      <p className="pretty text-[16px] leading-[1.55] text-secondary">
                        {s.d}
                      </p>
                      <dl className="flex flex-wrap gap-2 text-[13px]">
                        <div className="flex gap-1.5 rounded-chip bg-white/80 px-3 py-1.5">
                          <dt className="font-semibold text-sage-text">
                            {c.whenLabel}:
                          </dt>
                          <dd>{s.when}</dd>
                        </div>
                        <div className="flex gap-1.5 rounded-chip bg-white/80 px-3 py-1.5">
                          <dt className="font-semibold text-sage-text">
                            {c.whoLabel}:
                          </dt>
                          <dd>{s.who}</dd>
                        </div>
                      </dl>
                      {/* Phones: each step has its own picture. */}
                      <div className="pt-2 lg:hidden">
                        <VisitScene
                          k={s.k}
                          moving={moving && on}
                          animate={!reduced}
                          className="vs-figure h-auto w-full rounded-[24px]"
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Wide screens: one picture that stays beside the steps and changes with them. */}
          <div className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[13px] font-semibold text-sage-text">
                  {c.illustration}: {step.t}
                </span>
                {!reduced ? (
                  <button
                    type="button"
                    onClick={() => setPlaying((p) => !p)}
                    aria-pressed={!playing}
                    className="min-h-[44px] rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold hover:border-ink"
                  >
                    {playing ? c.pause : c.play}
                  </button>
                ) : null}
              </div>
              <div className="overflow-hidden rounded-[28px] bg-page p-3 shadow-card">
                <VisitScene
                  k={step.k}
                  moving={moving}
                  animate={!reduced}
                  className="vs-figure h-auto w-full rounded-[24px]"
                />
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-white/80"
                role="progressbar"
                aria-label={c.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
              >
                <div
                  className="h-full rounded-full bg-sage-deep"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pause for phones, under the steps. */}
        {!reduced ? (
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-pressed={!playing}
              className="min-h-[44px] rounded-chip border border-[color:var(--border-default)] bg-page px-4 text-[14px] font-semibold"
            >
              {playing ? c.pause : c.play}
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-3 border-t border-white/80 pt-6 md:grid-cols-[auto_1fr_1fr] md:items-start md:gap-6">
          <span className="text-[15px] font-semibold">{c.whoTitle}</span>
          {c.who.map((w) => (
            <div key={w.t} className="flex flex-col gap-1">
              <span className="text-[15px] font-semibold">{w.t}</span>
              <span className="pretty text-[14px] leading-[1.5] text-secondary">
                {w.d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
