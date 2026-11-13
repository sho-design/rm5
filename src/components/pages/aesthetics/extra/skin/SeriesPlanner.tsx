"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import { seriesPlanner as c } from "@/content/aes-skin";
import { torontoDate } from "@/lib/hours";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

const DAY = 86400000;
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const fmt = (d: Date) =>
  `${WD[d.getUTCDay()]} ${MON[d.getUTCMonth()]} ${d.getUTCDate()}`;
const iso = (d: Date) => d.toISOString().slice(0, 10);
/** The clinic is closed Fridays: a visit that lands on one moves to the Saturday. */
const open = (d: Date) =>
  d.getUTCDay() === 5
    ? { d: new Date(d.getTime() + DAY), moved: true }
    : { d, moved: false };

/**
 * Plan a series (Nov 2026): pick a skin treatment, how many visits and a first date, and see roughly when each
 * visit would fall, spaced as the menu describes (microneedling every 4 to 6 weeks shows a window; the facial
 * series about a month apart). A planning guide only: nothing is booked or stored.
 */
export function SeriesPlanner() {
  const [today, setToday] = useState<Date | null>(null);
  const [kind, setKind] = useState(0);
  const [visits, setVisits] = useState(c.kinds[0].visits[0]);
  const [value, setValue] = useState("");
  useEffect(() => setToday(torontoDate()), []);

  const k = c.kinds[kind];
  const start = useMemo(
    () => (value ? new Date(`${value}T00:00:00Z`) : null),
    [value],
  );
  const rows = useMemo(() => {
    if (!start) return null;
    return Array.from({ length: visits }, (_, i) => {
      if (i === 0) {
        const o = open(start);
        return { when: fmt(o.d), moved: o.moved };
      }
      const a = open(new Date(start.getTime() + i * k.gapWeeks[0] * 7 * DAY));
      const b = open(new Date(start.getTime() + i * k.gapWeeks[1] * 7 * DAY));
      return k.gapWeeks[0] === k.gapWeeks[1]
        ? { when: fmt(a.d), moved: a.moved }
        : { when: c.between(fmt(a.d), fmt(b.d)), moved: false };
    });
  }, [start, visits, k]);

  const book = `${bookFor("aesthetics", "skin")}&reason=${encodeURIComponent(start ? c.reason(k.t, fmt(start)) : k.t)}`;

  return (
    <Section id="series-planner" className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-[14px] font-semibold sm:col-span-2">
              {c.treatmentLabel}
              <select
                value={kind}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setKind(n);
                  setVisits(c.kinds[n].visits[0]);
                }}
                className="w-full rounded-field border-[1.5px] border-border bg-white px-3.5 py-3 text-[16px] font-semibold focus:border-sky"
              >
                {c.kinds.map((x, i) => (
                  <option key={x.k} value={i}>
                    {x.t}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-[14px] font-semibold">
              {c.visitsLabel}
              <select
                value={visits}
                onChange={(e) => setVisits(Number(e.target.value))}
                disabled={k.visits.length === 1}
                className="w-full rounded-field border-[1.5px] border-border bg-white px-3.5 py-3 text-[16px] font-semibold focus:border-sky disabled:opacity-70"
              >
                {k.visits.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-[14px] font-semibold">
              {c.dateLabel}
              <input
                type="date"
                value={value}
                min={today ? iso(new Date(today.getTime() + DAY)) : undefined}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-field border-[1.5px] border-border bg-white px-3.5 py-3 text-[16px] font-semibold focus:border-sky"
              />
            </label>
          </div>
          <p className="pretty text-[14px] leading-[1.5] text-secondary">
            {k.note}
          </p>
          <SmartLink to={book} className="w-fit">
            <TextLink className="text-[15px]">{c.cta}</TextLink>
          </SmartLink>
          <p className="pretty text-[13px] leading-[1.5] text-muted">
            {c.fine}
          </p>
        </div>

        <ol className="relative flex flex-col gap-2.5" aria-live="polite">
          <span
            aria-hidden
            className="absolute bottom-6 left-[27px] top-6 w-[2px] bg-[color:var(--rm-lilac)] opacity-60"
          />
          {Array.from({ length: visits }, (_, i) => {
            const r = rows?.[i];
            return (
              <li
                key={i}
                className={cn(
                  "sk-visit relative grid grid-cols-[auto_1fr] items-center gap-x-4 rounded-card-sm bg-white px-4 py-3.5",
                  !r && "opacity-80",
                )}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="z-[1] grid h-6 w-6 place-items-center rounded-full bg-lilac-deep text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="text-[16px] font-semibold">
                      {c.visit(i + 1)}
                    </span>
                    {r?.moved ? (
                      <span className="text-[13px] font-semibold text-muted">
                        {c.moved}
                      </span>
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "text-[14px] leading-[1.45]",
                      r ? "font-semibold text-lilac-text" : "text-secondary",
                    )}
                  >
                    {r ? r.when : i === 0 ? c.empty : " "}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .sk-visit { animation: sk-in 360ms cubic-bezier(.2,.8,.2,1) both; }
          @keyframes sk-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        }
      `}</style>
    </Section>
  );
}
