"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button, Display, Input, Lead, SmartLink, StateCard, Textarea } from "@/components/ui";
import { bookingConfirmLabel, bookingCopy, bookingCoverage, bookingCoverageFallback, bookingSteps, bookingTitleFor, bookingWho, type BookingState } from "@/content/booking";
import { site } from "@/content/site";
import { bookingDays, fmtTime, DOW, MON, type BookingDay } from "@/lib/hours";
import { submitForm } from "@/lib/forms";
import { cn } from "@/lib/cn";
import { Choice, ConsentRow, FieldLabel, OutcomeTile, Panel, PillChip, selClass, SubmitButton } from "./FormBits";

interface Details {
  first: string;
  last: string;
  email: string;
  phone: string;
  card: string;
  notes: string;
}

/** Ink text action beside the pills in an outcome card. */
const ghost = "inline-flex h-12 items-center px-[22px] text-[14px] font-semibold text-ink hover:opacity-80";

const emptyDetails: Details = { first: "", last: "", email: "", phone: "", card: "", notes: "" };

/** Step indicator: done steps show ✓ on sage, the current step sits on ink with a sunshine dot. */
function Steps({ state, className }: { state: BookingState; className?: string }) {
  return (
    <ol className={cn("flex items-center gap-1 text-[12px] font-semibold md:gap-1.5 md:text-[13px]", className)} aria-label="Booking steps">
      {bookingSteps.map(({ n, label }) => {
        const on = state === n || (state === 3 && n === 3) || ((state === "w" || state === "e") && n === 2);
        const done = typeof state === "number" && n < state;
        return (
          <li
            key={n}
            aria-current={on ? "step" : undefined}
            className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-chip px-2 py-2 md:flex-none md:gap-2 md:px-3.5", on ? "bg-ink text-white" : done ? "bg-sage-tint text-ink" : "bg-white text-ink")}
          >
            <span className={cn("flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] md:h-5 md:w-5 md:text-[11px]", on ? "bg-sun text-sun-ink" : done ? "bg-sage-deep text-white" : "bg-line text-muted")} aria-hidden>
              {done ? "✓" : n}
            </span>
            {done ? <span className="sr-only">Done: </span> : null}
            {label}
          </li>
        );
      })}
    </ol>
  );
}

function icsFor(day: BookingDay, slot: number, division: string): string {
  const start = new Date(day.date);
  start.setHours(Math.floor(slot), slot % 1 ? 30 : 0, 0, 0);
  const end = new Date(start.getTime() + 30 * 60_000);
  const stamp = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Restoration Medical//Booking//EN",
    "BEGIN:VEVENT",
    `DTSTART;TZID=America/Toronto:${stamp(start)}`,
    `DTEND;TZID=America/Toronto:${stamp(end)}`,
    `SUMMARY:Restoration Medical, ${division}`,
    `LOCATION:${bookingCopy.confirmed.whereValue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Three-step booking flow (Details, Time, Confirm) with confirmed, waitlist
 * and slot-taken outcomes, as the prototype's book page. Days and slots are
 * computed on the client so the calendar follows the Toronto date.
 */
export function BookFlow({ divisions }: { divisions: string[] }) {
  const [state, setState] = useState<BookingState>(1);
  const [division, setDivision] = useState(divisions[0] ?? "");
  const [who, setWho] = useState(0);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [consent, setConsent] = useState(false);
  const [days, setDays] = useState<BookingDay[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setDays(bookingDays());
  }, []);

  const day = days[dayIdx];
  const slots = useMemo(() => day?.slots ?? [], [day]);
  const coverage = bookingCoverage[division] ?? bookingCoverageFallback;
  const slotLabel = day && slot != null && day.open ? `${DOW[day.date.getDay()]} ${MON[day.date.getMonth()]} ${day.date.getDate()}, ${fmtTime(slot)}` : bookingConfirmLabel.slotNotChosen;
  const { title, lead } = bookingTitleFor(state);

  const payload = () => ({
    division,
    who: bookingWho[who],
    day: day ? day.date.toISOString().slice(0, 10) : null,
    slot: slot != null ? fmtTime(slot) : null,
    name: `${details.first} ${details.last}`.trim(),
    phone: details.phone,
    email: details.email,
    healthCardLast4: details.card,
    notes: details.notes,
    reminders: consent,
  });

  const onDetails = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(2);
  };

  const confirm = async () => {
    if (slot == null || !day) return;
    // Prototype demo: the second slot of the third day is always "just taken".
    if (dayIdx === 2 && slot === slots[1]) {
      setFailed(false);
      setState("e");
      return;
    }
    setBusy(true);
    const res = await submitForm("book", payload());
    setBusy(false);
    setFailed(!res.ok);
    setState(res.ok ? 3 : "e");
  };

  const waitlist = async () => {
    setBusy(true);
    const res = await submitForm("book", { ...payload(), waitlist: true });
    setBusy(false);
    setFailed(!res.ok);
    setState(res.ok ? "w" : "e");
  };

  const reset = () => {
    setState(1);
    setSlot(null);
    setFailed(false);
  };

  const field = (k: keyof Details) => ({
    id: `book-${k}`,
    value: details[k],
    onChange: (e: { target: { value: string } }) => setDetails((d) => ({ ...d, [k]: e.target.value })),
  });

  const callLine = <span className="text-[12px] leading-[1.5] text-muted md:text-[13px]">{bookingCopy.callLine}</span>;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 pb-8 pt-5 md:px-content md:pt-16 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
      {/* Left: title, lead, live summary */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-[80px] lg:gap-3.5">
        <Steps state={state} className="lg:hidden" />
        <Display as="h1" size="lg" className="pt-1 lg:pt-0">
          {title}
        </Display>
        <Lead size="md" tone="muted">
          {lead}
        </Lead>
        <dl className="mt-3 hidden flex-col gap-2.5 rounded-card-sm border border-border bg-card px-6 py-[22px] text-[14px] leading-[1.5] lg:flex" aria-live="polite">
          <span className="text-[12px] font-semibold text-muted">{bookingCopy.summaryTitle}</span>
          {[
            [bookingCopy.summaryKeys.service, division],
            [bookingCopy.summaryKeys.clinic, bookingCopy.clinic],
            [bookingCopy.summaryKeys.time, slotLabel],
            [bookingCopy.summaryKeys.coverage, coverage],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="hidden lg:block">{callLine}</div>
      </div>

      {/* Right: the current step */}
      <div className="flex flex-col gap-4">
        {state === 1 ? (
          <Panel>
            <form onSubmit={onDetails} className="flex flex-col gap-[14px] md:gap-[22px]">
              <Steps state={state} className="hidden lg:flex" />
              <h2 className="text-[13px] font-semibold md:font-display md:text-[26px] md:font-medium md:tracking-[-.02em]">{bookingCopy.step1Title}</h2>
              <div role="radiogroup" aria-label="Service" className="flex flex-wrap gap-1.5 md:gap-2">
                {divisions.map((d) => (
                  <PillChip key={d} on={division === d} onClick={() => setDivision(d)}>
                    {d}
                  </PillChip>
                ))}
              </div>
              <Choice options={bookingWho} value={who} onChange={setWho} ariaLabel="Patient status" />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                <FieldLabel label={bookingCopy.fields.first} htmlFor="book-first">
                  <Input {...field("first")} autoComplete="given-name" required />
                </FieldLabel>
                <FieldLabel label={bookingCopy.fields.last} htmlFor="book-last">
                  <Input {...field("last")} autoComplete="family-name" required />
                </FieldLabel>
                <FieldLabel label={bookingCopy.fields.email} htmlFor="book-email">
                  <Input {...field("email")} type="email" autoComplete="email" inputMode="email" required />
                </FieldLabel>
                <FieldLabel label={bookingCopy.fields.phone} htmlFor="book-phone">
                  <Input {...field("phone")} type="tel" autoComplete="tel" inputMode="tel" required />
                </FieldLabel>
                <FieldLabel label={bookingCopy.fields.card} htmlFor="book-card" className="sm:col-span-2">
                  <Input {...field("card")} inputMode="numeric" pattern="[0-9]{4}" maxLength={4} autoComplete="off" />
                </FieldLabel>
              </div>
              <FieldLabel label={bookingCopy.fields.notes} htmlFor="book-notes">
                <Textarea {...field("notes")} style={{ minHeight: 80, height: 80 }} />
              </FieldLabel>
              <ConsentRow checked={consent} onChange={(e) => setConsent(e.target.checked)}>
                {bookingCopy.consent}
                <SmartLink to="privacy" className="font-semibold text-link">
                  {bookingCopy.consentLink}
                </SmartLink>
                .
              </ConsentRow>
              <SubmitButton>{bookingCopy.next}</SubmitButton>
            </form>
          </Panel>
        ) : null}

        {state === 2 ? (
          <Panel>
            <Steps state={state} className="hidden lg:flex" />
            <div className="flex items-baseline justify-between gap-4">
              <Display as="h2" size="title-md" balance={false}>
                {bookingCopy.step2Title}
              </Display>
              <span className="text-[13px] text-muted">{bookingCopy.step2Sub}</span>
            </div>
            <div role="radiogroup" aria-label="Day" className="flex gap-1 md:gap-1.5">
              {days.map((d, i) => {
                const on = dayIdx === i;
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    aria-label={`${d.dow} ${d.num}${d.open ? "" : ", closed"}`}
                    onClick={() => {
                      setDayIdx(i);
                      setSlot(null);
                    }}
                    className={cn("flex flex-1 flex-col items-center gap-0.5 rounded-[12px] border-[1.5px] px-0.5 py-2 transition-all duration-[250ms] md:rounded-[14px] md:px-1 md:py-2.5", selClass(on), !d.open && "opacity-45")}
                  >
                    <span className="text-[10px] font-semibold opacity-70 md:text-[11px]">{d.dow}</span>
                    <span className="font-display text-[17px] md:text-[20px]">{d.num}</span>
                  </button>
                );
              })}
            </div>
            {day && !day.open ? (
              <div className="flex flex-col gap-2 rounded-row border border-border bg-white p-4 text-[13px] leading-[1.5] text-muted md:p-6 md:text-[14px]">
                <span className="font-semibold text-primary">{bookingCopy.closedTitle}</span>
                {bookingCopy.closedBody}
              </div>
            ) : (
              <div role="radiogroup" aria-label="Time" className="grid grid-cols-3 gap-1.5 md:grid-cols-4 md:gap-2">
                {slots.map((t) => {
                  const on = slot === t;
                  return (
                    <button key={t} type="button" role="radio" aria-checked={on} onClick={() => setSlot(t)} className={cn("rounded-field border-[1.5px] px-1 py-[11px] text-center text-[13px] font-semibold transition-all duration-[250ms] md:p-3 md:text-[14px]", selClass(on))}>
                      {fmtTime(t)}
                    </button>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col gap-2.5 rounded-row bg-sun-tint px-5 py-[18px] text-[14px] leading-[1.5] text-ink">
              <span className="font-semibold">{bookingCopy.waitlistTitle}</span>
              <span className="text-secondary">{bookingCopy.waitlistBody}</span>
              <button type="button" onClick={waitlist} disabled={busy} className="self-start border-b-[1.5px] border-ink font-semibold text-ink disabled:opacity-60">
                {bookingCopy.waitlistLink} ›
              </button>
            </div>
            <div className="flex gap-2 md:gap-2.5">
              <button type="button" onClick={() => setState(1)} className="rounded-chip border-[1.5px] border-ink px-[18px] py-[14px] text-[14px] font-semibold transition-all hover:bg-white active:scale-[.98] md:px-[22px] md:py-4 md:text-[15px]">
                ‹ <span className="sr-only md:not-sr-only">{bookingCopy.back}</span>
              </button>
              <button
                type="button"
                onClick={confirm}
                disabled={slot == null || busy}
                aria-busy={busy || undefined}
                className={cn("flex-1 rounded-chip py-[14px] text-center text-[14px] font-semibold transition-all md:py-4 md:text-[15px]", slot == null ? "cursor-not-allowed bg-line text-muted" : "bg-sky text-white hover:opacity-90 active:scale-[.98]")}
              >
                {slot == null ? bookingConfirmLabel.noSlot : bookingConfirmLabel.ready}
              </button>
            </div>
          </Panel>
        ) : null}

        {state === 3 && day && slot != null ? (
          <StateCard
            state="success"
            title={bookingCopy.confirmed.title}
            actions={
              <>
                <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsFor(day, slot, division))}`} download="restoration-medical.ics" className="inline-flex h-12 items-center rounded-chip bg-ink px-6 text-[14px] font-semibold text-white hover:opacity-90 active:scale-[.98]">
                  {bookingCopy.confirmed.calendar}
                </a>
                <Button to="locations" variant="inverse">
                  {bookingCopy.confirmed.directions}
                </Button>
                <button type="button" onClick={reset} className={ghost}>
                  {bookingCopy.confirmed.reset}
                </button>
              </>
            }
          >
            <p>{bookingCopy.confirmed.body}</p>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <OutcomeTile k={bookingCopy.confirmed.when}>
                <span className="text-[16px] font-semibold">{slotLabel}</span>
              </OutcomeTile>
              <OutcomeTile k={bookingCopy.confirmed.where}>
                <span className="text-[16px] font-semibold">{bookingCopy.confirmed.whereValue}</span>
                <span className="text-[13px] text-muted">{bookingCopy.confirmed.whereSub}</span>
              </OutcomeTile>
            </div>
            <OutcomeTile k={bookingCopy.confirmed.bring}>
              <span className="text-[14px] leading-[1.5]">{bookingCopy.confirmed.bringValue}</span>
            </OutcomeTile>
          </StateCard>
        ) : null}

        {state === "w" ? (
          <StateCard
            state="waitlist"
            title={bookingCopy.waitlisted.title}
            actions={
              <>
                <Button onClick={() => setState(2)}>{bookingCopy.waitlisted.bookAnyway}</Button>
                <button type="button" onClick={reset} className={ghost}>
                  {bookingCopy.waitlisted.leave}
                </button>
              </>
            }
          >
            <p>{bookingCopy.waitlisted.body(division)}</p>
            <OutcomeTile k={bookingCopy.summaryKeys.service}>
              <span className="text-[16px] font-semibold">{division}</span>
              <span className="text-[13px] text-muted">{bookingCopy.waitlisted.listLabel}</span>
            </OutcomeTile>
          </StateCard>
        ) : null}

        {state === "e" ? (
          <StateCard
            state="error"
            title={failed ? bookingCopy.failed.title : bookingCopy.taken.title}
            actions={
              <>
                <Button onClick={() => setState(2)}>{failed ? bookingCopy.failed.retry : bookingCopy.taken.another}</Button>
                <Button to={site.phoneHref} variant="inverse">
                  {bookingCopy.taken.call}
                </Button>
              </>
            }
          >
            <p>{failed ? bookingCopy.failed.body : bookingCopy.taken.body}</p>
          </StateCard>
        ) : null}

        <div className="lg:hidden">{callLine}</div>
      </div>
    </div>
  );
}
