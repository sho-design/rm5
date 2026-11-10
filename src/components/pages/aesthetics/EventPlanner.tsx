"use client";

import { useEffect, useMemo, useState } from "react";
import { Display, Eyebrow, Section, SmartLink, TextLink } from "@/components/ui";
import { eventPlan as c } from "@/content/programs";
import { torontoDate } from "@/lib/hours";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

const DAY = 86400000;
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d: Date) => `${WD[d.getUTCDay()]} ${MON[d.getUTCMonth()]} ${d.getUTCDate()}`;
const iso = (d: Date) => d.toISOString().slice(0, 10);
/** Fridays the clinic is closed: a single-day step moves to the Thursday before. */
const open = (d: Date) => (d.getUTCDay() === 5 ? new Date(d.getTime() - DAY) : d);

/**
 * Event ready, from the event date back: pick the date and each step of the program lands on the calendar, with
 * the no-laser window marked. Steps whose time has passed say so instead of showing a date. A planning guide only;
 * nothing is booked or stored, and the consult sets the real dates.
 */
export function EventPlanner() {
  const [today, setToday] = useState<Date | null>(null);
  const [value, setValue] = useState("");
  // Dates depend on today, so they are worked out after hydration.
  useEffect(() => setToday(torontoDate()), []);
  const event = useMemo(() => (value ? new Date(`${value}T00:00:00Z`) : null), [value]);
  const daysLeft = event && today ? Math.round((event.getTime() - today.getTime()) / DAY) : null;

  const rows = useMemo(() => {
    if (!event || !today) return null;
    return c.steps.map((s) => {
      const from = new Date(event.getTime() - s.from * DAY);
      // A window ending on a Friday ends on the Thursday instead; the event day itself never moves.
      const end = new Date(event.getTime() - s.to * DAY);
      const to = s.to > 0 ? open(end) : end;
      const first = new Date(Math.max(from.getTime(), today.getTime() + DAY));
      if (to.getTime() <= today.getTime()) return { ...s, when: c.tooLate, late: true };
      const when = s.from === s.to ? fmt(s.k === "event" ? first : open(first)) : first.getTime() >= to.getTime() ? fmt(to) : c.between(fmt(first), fmt(to));
      return { ...s, when, late: false };
    });
  }, [event, today]);

  const reason = event ? c.reason(fmt(event)) : c.reasonNoDate;
  const book = `${bookFor("aesthetics", "consult")}&reason=${encodeURIComponent(reason)}`;

  return (
    <Section id="event-plan" className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-8 rounded-block bg-lilac-tint p-6 text-ink md:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-lilac-deep">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>
          <label className="flex flex-col gap-2 text-[14px] font-semibold">
            {c.dateLabel}
            <input
              type="date"
              value={value}
              min={today ? iso(new Date(today.getTime() + DAY)) : undefined}
              onChange={(e) => setValue(e.target.value)}
              className="w-full max-w-[260px] rounded-field border-[1.5px] border-border bg-white px-3.5 py-3 text-[16px] font-semibold focus:border-sky"
            />
          </label>
          {daysLeft != null && daysLeft > 0 ? (
            <p className="pretty text-[15px] leading-[1.5]" aria-live="polite">
              {c.left(daysLeft)} {daysLeft < 42 ? c.short : ""}
            </p>
          ) : null}
          <SmartLink to={book} className="w-fit">
            <TextLink className="text-[15px]">{c.cta}</TextLink>
          </SmartLink>
          <p className="pretty text-[13px] leading-[1.5] text-muted">{c.fine}</p>
        </div>

        <ol className="flex flex-col gap-2.5">
          {c.steps.map((s, i) => {
            const r = rows?.[i];
            return (
              <li
                key={s.k}
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 rounded-card-sm bg-white px-5 py-4",
                  s.k === "nolaser" && "border-[1.5px] border-dashed border-lilac-deep/40 bg-white/60",
                  r?.late && "opacity-70",
                )}
              >
                <span aria-hidden className="row-span-2 mt-1 h-3 w-3 rounded-full" style={{ background: s.color }} />
                <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span className="text-[16px] font-semibold">{s.t}</span>
                  <span className="text-[13px] font-semibold text-muted">{s.rel}</span>
                </span>
                <span className={cn("text-[14px] leading-[1.45]", r?.late ? "text-secondary" : r ? "font-semibold text-lilac-deep" : "text-secondary")}>
                  {r ? r.when : s.d}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
