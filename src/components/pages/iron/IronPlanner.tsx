"use client";

import { Flow } from "@/components/ui/Flow";
import { useEffect, useMemo, useState } from "react";
import { ironInfusionDays, ironPlanner as c } from "@/content/iron";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { Choice } from "@/components/pages/book/FormBits";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

const DAY = 86400000;
const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d: Date) => `${WD[d.getUTCDay()]} ${MON[d.getUTCMonth()]} ${d.getUTCDate()}`;
const short = (d: Date) => `${MON[d.getUTCMonth()]} ${d.getUTCDate()}`;
const infusion = (d: Date) => ironInfusionDays.find((x) => x.day === d.getUTCDay());

/** Today in Toronto as a UTC-midnight date, so weekday arithmetic is the same for every visitor. */
function torontoToday(): Date {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Toronto", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/** The next infusion days, starting a few days out so there is time for the assessment first. */
function nextInfusionDays(from: Date, count: number): Date[] {
  const out: Date[] = [];
  for (let t = from.getTime() + 3 * DAY; out.length < count; t += DAY) {
    const d = new Date(t);
    if (infusion(d)) out.push(d);
  }
  return out;
}

/**
 * Course planner: pick the iron, a first infusion day (Tuesday, Saturday or Sunday) the number of visits and the spacing, and the visits and
 * the repeat bloodwork window move along a timeline. A planning guide only; nothing is booked or stored.
 */
export function IronPlanner() {
  const [today, setToday] = useState<Date | null>(null);
  const [start, setStart] = useState(0);
  const [gap, setGap] = useState(0);
  const [iron, setIron] = useState(0);
  const [count, setCount] = useState(2);
  const n = count + 1;
  // Dates depend on today, so they are worked out after hydration.
  useEffect(() => setToday(torontoToday()), []);

  const starts = useMemo(() => (today ? nextInfusionDays(today, 6) : []), [today]);
  const first = starts[start];
  const visits = first ? Array.from({ length: n }, (_, i) => new Date(first.getTime() + i * (gap + 1) * 7 * DAY)) : [];
  const last = visits[n - 1];
  const labsFrom = last ? new Date(last.getTime() + 28 * DAY) : null;
  const labsTo = last ? new Date(last.getTime() + 56 * DAY) : null;
  // Visits spread over the first 62% of the track (to scale against the longest spacing, 2 weeks), so changing
  // the spacing visibly moves them; the bloodwork window keeps the last part.
  const pct = (d: Date) => (first ? ((d.getTime() - first.getTime()) / (28 * DAY)) * 62 : 0);
  // Course of 3 at the chosen iron's price per visit (Venofer $400, Monoferric $550, own iron $250).
  const total = c.perVisit[iron] * n;
  const time = c.time(n);

  return (
    <Section id="iron-plan" className="scroll-mt-6">
      <div className="grid grid-cols-1 gap-8 rounded-block bg-sage-tint p-6 text-ink md:p-10 lg:grid-cols-[1fr_1.35fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-5">
          <Eyebrow tone="inherit" className="text-sage-deep">
            {c.eyebrow}
          </Eyebrow>
          <Display size="sm">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.lead}</p>

          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-secondary" id="iron-plan-start">
              {c.startLabel}
            </span>
            <div role="radiogroup" aria-labelledby="iron-plan-start" className="flex flex-wrap gap-1.5">
              {starts.length
                ? starts.map((d, i) => (
                    <button
                      key={d.toISOString()}
                      type="button"
                      role="radio"
                      aria-checked={i === start}
                      onClick={() => setStart(i)}
                      className={cn(
                        "rounded-chip border-[1.5px] px-3.5 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200",
                        i === start ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky",
                      )}
                    >
                      {fmt(d)}
                    </button>
                  ))
                : // Placeholder chips keep the layout steady until the dates are known.
                  Array.from({ length: 6 }, (_, i) => <span key={i} className="h-[38px] w-[98px] rounded-chip bg-white/60" />)}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-secondary">{c.gapLabel}</span>
            <Choice options={c.gaps} value={gap} onChange={setGap} ariaLabel={c.gapLabel} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-secondary">{c.ironLabel}</span>
            <Choice options={c.ironOptions} value={iron} onChange={setIron} ariaLabel={c.ironLabel} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-secondary">{c.visitsLabel}</span>
            <Choice options={c.visitsOptions} value={count} onChange={setCount} ariaLabel={c.visitsLabel} />
            <span className="text-[12px] leading-[1.5] text-muted">{c.visitsHint}</span>
          </div>

          <dl className="grid grid-cols-1 gap-3 rounded-card-sm bg-white p-5 sm:grid-cols-2" aria-live="polite">
            <div className="flex flex-col gap-1">
              <dt className="text-[13px] font-semibold text-muted">{c.totalLabel(n)}</dt>
              <dd className="flex flex-col gap-0.5">
                <Flow value={total} prefix="$" className="font-display text-[30px] font-medium leading-none tracking-[-.03em]" />
                <span className="text-[13px] leading-[1.4] text-muted">{c.totalSub[iron]}</span>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-[13px] font-semibold text-muted">{c.timeLabel}</dt>
              <dd className="flex flex-col gap-0.5">
                <Flow value={time.hours} prefix={time.before} suffix={time.after} className="font-display text-[30px] font-medium leading-none tracking-[-.03em]" />
                <span className="text-[13px] leading-[1.4] text-muted">{time.sub}</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="flex flex-col gap-6">
          {/* Desktop: a track that spans the first visit to the end of the bloodwork window. The visits slide along it. */}
          <div className="relative hidden h-[86px] lg:block" aria-hidden>
            <div className="absolute inset-x-0 top-[38px] h-[3px] rounded-full bg-white" />
            <div className="absolute right-0 top-[30px] flex h-[19px] w-[26%] items-center justify-center rounded-chip bg-sun-tint text-[11px] font-semibold">{c.labsShort}</div>
            {visits.map((v, i) => (
              <div
                key={i}
                className="absolute top-[18px] flex -translate-x-1/2 flex-col items-center gap-2 motion-safe:transition-[left] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{ left: `calc(22px + (100% - 44px) * ${(pct(v) / 100).toFixed(4)})` }}
              >
                <span className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-ink font-display text-[18px] font-medium text-white ring-4 ring-sage-tint">{i + 1}</span>
                <span className="whitespace-nowrap text-[12px] font-semibold">{short(v)}</span>
              </div>
            ))}
          </div>

          <ol className="flex flex-col gap-2.5">
            {visits.length
              ? visits.map((v, i) => {
                  const d = infusion(v);
                  return (
                    <li key={i} className="flex items-center gap-4 rounded-card-sm bg-white px-5 py-4">
                      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-ink font-display text-[17px] font-medium text-white">{i + 1}</span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[16px] font-semibold">{`${c.visit(i + 1)}: ${fmt(v)}`}</span>
                        <span className="text-[13px] text-muted">{d ? `${c.visitSub}. Start by ${d.lastStart}.` : c.visitSub}</span>
                      </span>
                    </li>
                  );
                })
              : Array.from({ length: n }, (_, i) => <li key={i} className="h-[70px] rounded-card-sm bg-white/60" />)}
            <li className="flex items-center gap-4 rounded-card-sm border-[1.5px] border-dashed border-ink/20 px-5 py-4">
              <span aria-hidden className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-sun-tint text-[17px]">
                ✓
              </span>
              <span className="flex flex-col">
                <span className="text-[16px] font-semibold">{labsFrom && labsTo ? `${c.labs}: ${short(labsFrom)} to ${short(labsTo)}` : c.labs}</span>
                <span className="text-[13px] text-muted">{c.labsSub}</span>
              </span>
            </li>
          </ol>

          <p className="pretty text-[13px] leading-[1.55] text-secondary">{c.fine}</p>
          <SmartLink to={bookFor("infusion", "iron")} className="text-[15px] font-semibold text-link">
            {c.cta} ›
          </SmartLink>
        </div>
      </div>
    </Section>
  );
}
