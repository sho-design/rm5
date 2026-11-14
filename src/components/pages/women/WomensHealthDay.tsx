"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { nextWomensDays, womensHealthDay as c } from "@/content/womens-day";
import { dayCopy as k } from "@/content/women-extra";
import { torontoNow, MON } from "@/lib/hours";
import { bookFor } from "@/lib/routes";
import { useReducedMotion } from "@/lib/a11y";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const PAGE_MS = 900;

/** One month page: weekday heads, the days, and the last Sunday lit. */
function MonthPage({ d, lit }: { d: Date; lit: boolean }) {
  const y = d.getFullYear();
  const m = d.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div className="flex flex-col gap-3">
      <span className="font-display text-[22px] font-medium tracking-[-.01em]">
        {MONTH[m]} {y}
      </span>
      <div aria-hidden className="grid grid-cols-7 gap-1 text-center text-[13px]">
        {k.weekdays.map((w, i) => (
          <span key={i} className="pb-1 font-semibold text-ink/50">
            {w}
          </span>
        ))}
        {cells.map((n, i) => {
          const on = n === d.getDate();
          return (
            <span
              key={i}
              className={`wd-cell grid aspect-square place-items-center rounded-full ${on ? "wd-on font-bold text-white" : "text-ink/75"} ${on && lit ? "wd-pop" : ""}`}
              style={on ? { background: "var(--rm-terracotta-deep)" } : undefined}
            >
              {n ?? ""}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Women's health day band: the last Sunday of every month (November 2026 redesign). A month calendar flips through
 * the next three months, lighting each last Sunday, then settles on the next one. Dates are worked out in the
 * browser in Toronto time, so the static page never shows a day that has passed. The "who you'll see" line lives in
 * WhoYouSee now. Plays once when on screen; reduced motion shows the settled month.
 */
export function WomensHealthDay() {
  const reduced = useReducedMotion();
  const [dates, setDates] = useState<Date[]>([]);
  const [page, setPage] = useState(0);
  const [run, setRun] = useState(0);
  const [seen, setSeen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDates(nextWomensDays(torontoNow(), 3));
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Flip forward through the months, then back to the next one.
  useEffect(() => {
    if (!seen || reduced || dates.length < 2) {
      setPage(0);
      return;
    }
    const order = [...dates.map((_, i) => i), 0];
    let i = 0;
    setPage(order[0]);
    const t = window.setInterval(() => {
      i += 1;
      if (i >= order.length) return window.clearInterval(t);
      setPage(order[i]);
    }, PAGE_MS);
    return () => window.clearInterval(t);
  }, [seen, reduced, dates, run]);

  const next = dates[0] ?? null;
  const shown = dates[page] ?? next;
  const nextLabel = next ? `${DAY[next.getDay()]}, ${MON[next.getMonth()]} ${next.getDate()}` : " ";

  return (
    <section id="womens-day" aria-labelledby="womens-day-title" className="rm-paper scroll-mt-20 px-4 pt-12 md:px-content md:pt-section">
      <style>{`
        @keyframes wd-flip { from { opacity: 0; transform: perspective(700px) rotateX(-70deg); } to { opacity: 1; transform: none; } }
        @keyframes wd-pop { 0% { transform: scale(.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        .wd-page { transform-origin: top center; animation: wd-flip 380ms cubic-bezier(.2,.8,.2,1) both; }
        .wd-pop { animation: wd-pop 400ms 200ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .wd-page, .wd-pop { animation: none; } }
        :root[data-theme="contrast"] .wd-cal { border: 2px solid var(--rm-ink); }
        :root[data-theme="contrast"] .wd-cell.wd-on { outline: 2px solid var(--rm-ink); outline-offset: 2px; }
      `}</style>
      <div ref={box} className="grid grid-cols-1 items-center gap-6 rounded-block bg-[color:var(--div-pain)] p-6 text-ink md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-terracotta-text">
            {c.eyebrow}
          </Eyebrow>
          <h2 id="womens-day-title" className="display-tight text-[30px] leading-[1.05] md:text-[40px]">
            {c.title}
          </h2>
          <p className="pretty max-w-[560px] text-[16px] leading-[1.55] text-ink-2">{c.body}</p>
          <p className="pretty max-w-[560px] text-[14px] leading-[1.5] text-ink-2">
            <span className="font-semibold text-ink">{k.bringLabel}: </span>
            {c.bring}
          </p>
          <div className="flex flex-col gap-1 pt-2">
            <span className="text-[13px] font-semibold text-ink/60">{c.next}</span>
            <span className="display-tight text-[26px] leading-[1.1]" aria-live="polite">
              {nextLabel}
            </span>
            <span className="text-[14px] text-ink-2">{c.when}</span>
          </div>
          <Button to={bookFor("family", "womensday")} className="mt-1 self-start">
            {c.cta}
          </Button>
        </div>

        {/* The calendar: decorative; the date above is the text version. */}
        <div className="wd-cal flex flex-col gap-3 rounded-card bg-white p-5 shadow-[0_10px_30px_rgba(15,31,46,.08)] md:p-6">
          <div role="img" aria-label={shown ? k.alt(`${MONTH[shown.getMonth()]} ${shown.getFullYear()}`, `${MON[shown.getMonth()]} ${shown.getDate()}`) : c.title} className="min-h-[300px]">
            {shown ? (
              <div key={`${run}-${page}`} className="wd-page">
                <MonthPage d={shown} lit={!reduced} />
              </div>
            ) : null}
          </div>
          {!reduced && dates.length > 1 ? (
            <button
              type="button"
              onClick={() => {
                setSeen(true);
                setRun((r) => r + 1);
              }}
              className="flex min-h-[40px] items-center self-start rounded-chip border border-[color:var(--rm-line)] px-4 text-[13px] font-semibold text-ink hover:border-ink"
            >
              {k.replay}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
