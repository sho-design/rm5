"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Button, Display, Input, Lead, Select, SmartLink, StateCard, Textarea } from "@/components/ui";
import { bookingConfirmLabel, bookingCopy, bookingCoverageFallback, bookingSteps, bookingTitleFor, bookingWho, registerCopy, registerLanguages, type BookingState } from "@/content/booking";
import { bookingExtra as x } from "@/content/booking-extra";
import type { BookingConfig, BookingService, BookingVisit } from "@/content/booking-visits";
import { site } from "@/content/site";
import { bookingDays, fmtTime, womensDayBookingDays, DOW, MON, type BookingDay } from "@/lib/hours";
import { submitForm } from "@/lib/forms";
import { radioKeys, rovingTab, useRevealOnChange } from "@/lib/a11y";
import { errorProps, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { cn } from "@/lib/cn";
import { linkPhones } from "@/components/ui/Phones";
import { Choice, ConsentRow, FieldError, FieldLabel, OutcomeTile, Panel, PillChip, selClass, SubmitButton } from "./FormBits";

type Details = Record<string, string | boolean>;

/** Ink text action beside the pills in an outcome card. */
const ghost = "inline-flex h-12 items-center px-1 text-[14px] font-semibold text-ink hover:opacity-80 sm:px-[22px]";

/** Step indicator: done steps show ✓ on sage, the current step sits on ink with a sunshine dot. */
function Steps({ state, className }: { state: BookingState; className?: string }) {
  const current = state === "w" ? 2 : state === "e" ? 3 : state === "c" ? 0 : state;
  return (
    <ol className={cn("flex items-center gap-1 text-[12px] font-semibold md:gap-1.5 md:text-[13px]", className)} aria-label="Booking steps">
      {bookingSteps.map(({ n, label }) => {
        const on = n === current;
        const done = state === "c" || n < current;
        return (
          <li
            key={n}
            aria-current={on ? "step" : undefined}
            className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-chip px-2 py-2 md:flex-none md:gap-2 md:px-3.5", on ? "bg-ink text-white" : done ? "bg-sage-tint text-ink" : "bg-white text-ink")}
          >
            <span className={cn("flex h-[18px] w-[18px] items-center justify-center rounded-full text-[10px] md:h-5 md:w-5 md:text-[11px]", on ? "bg-sun text-sun-ink" : done ? "bg-sage-deep text-white" : "bg-line text-muted")} aria-hidden>
              {done ? "✓" : n}
            </span>
            {done ? <span className="sr-only">Done: </span> : on ? <span className="sr-only">{x.current}</span> : null}
            {label}
          </li>
        );
      })}
    </ol>
  );
}

/** Visible label over a group of choices (the group carries the same text as its accessible name). */
function GroupLabel({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden className="text-[12px] font-semibold text-muted">
      {children}
    </span>
  );
}

function icsFor(day: BookingDay, slot: number, summary: string): string {
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
    `SUMMARY:Restoration Medical, ${summary}`,
    `LOCATION:${bookingCopy.confirmed.whereValue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/**
 * Booking flow: Details (service, visit type, who it is for, contact),
 * Time, Review, then the confirmed, waitlist or error outcome. Only
 * "Confirm booking" on the review step sends anything; the outcome comes
 * from the booking destination's response. ?service= and ?visit= preselect
 * the service and visit type (bookFor in lib/routes). Text fields are
 * uncontrolled so anything typed before the page finishes loading is kept.
 * Days and slots are computed on the client in Toronto time.
 */
export function BookFlow({ config }: { config: BookingConfig }) {
  const { services, payments } = config;
  const [state, setState] = useState<BookingState>(1);
  const [serviceKey, setServiceKey] = useState<string>(services[0]?.key ?? "family");
  const [visitKey, setVisitKey] = useState<string>(services[0]?.visits[0]?.key ?? "");
  const [forOther, setForOther] = useState(0);
  const [who, setWho] = useState(0);
  /** -1 until chosen: no default, so a rushed self-payer cannot send "insurance" by accident. */
  const [payment, setPayment] = useState(-1);
  const [language, setLanguage] = useState(0);
  /** 0 Ontario health card, 1 card from another province, 2 no health card. */
  const [card, setCard] = useState(0);
  /** Province or territory of a card from another province ("" until chosen). */
  const [province, setProvince] = useState("");
  /** Why they are coming, carried from the page they booked from (?reason=Perimenopause and menopause). */
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState<Details>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [days, setDays] = useState<BookingDay[]>([]);
  const [womensDays, setWomensDays] = useState<BookingDay[]>([]);
  const [dayIdx, setDayIdx] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  // On each step change, scroll the whole flow (so the step title stays visible) and focus the step heading.
  const root = useRef<HTMLDivElement>(null);
  const reveal = useRevealOnChange<HTMLElement>(state, root);
  const setReveal = (el: HTMLElement | null) => {
    reveal.current = el;
  };

  const service: BookingService = services.find((s) => s.key === serviceKey) ?? services[0];
  const visit: BookingVisit = service.visits.find((v) => v.key === visitKey) ?? service.visits[0];

  const chooseService = (key: string, visitPick?: string) => {
    const s = services.find((v) => v.key === key);
    if (!s) return;
    setServiceKey(s.key);
    setVisitKey(s.visits.find((v) => v.key === visitPick)?.key ?? s.visits[0]?.key ?? "");
  };

  useEffect(() => {
    setDays(bookingDays());
    setWomensDays(womensDayBookingDays());
    // Links pass ?service=<division key>&visit=<visit key> (bookFor in lib/routes). Unknown keys are ignored.
    const params = new URLSearchParams(window.location.search);
    const key = params.get("service");
    if (key && services.some((s) => s.key === key)) chooseService(key, params.get("visit") ?? undefined);
    const why = params.get("reason")?.trim().slice(0, 80);
    if (why) setReason(why);
    // Links from children's pages pass &for=someone: the booking is for a child, not the parent.
    if (params.get("for") === "someone") setForOther(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const str = (k: string) => (typeof details[k] === "string" ? (details[k] as string) : "");
  // Women's health day is only on the last Sunday of the month: offer those dates instead of the next 7 days.
  const dayList = visit?.days === "womensday" ? womensDays : days;
  const day = dayList[dayIdx];
  useEffect(() => {
    setDayIdx(0);
    setSlot(null);
  }, [visit?.key]);
  const slots = useMemo(() => day?.slots ?? [], [day]);
  const baseCoverage = visit?.coverage ?? (visit?.payment ? (payment === 1 && visit.selfPay ? visit.selfPay : payments[payment]?.coverage) : service.coverage) ?? bookingCoverageFallback;
  // Without an Ontario health card, OHIP does not pay: never show "OHIP-insured" on their booking.
  // Quebec does not take part in reciprocal billing for doctor visits: pay and claim back from RAMQ.
  const quebec = card === 1 && province === "Quebec";
  const coverage = card > 0 && /OHIP/.test(baseCoverage) ? (quebec ? x.quebecCoverage : x.card.coverage[card - 1]) : baseCoverage;
  const slotLabel = day && slot != null && day.open ? `${DOW[day.date.getDay()]} ${MON[day.date.getMonth()]} ${day.date.getDate()}, ${fmtTime(slot)}` : bookingConfirmLabel.slotNotChosen;
  const serviceLine = [visit ? `${service.label}, ${visit.label}` : service.label, reason ? `(${reason})` : ""].filter(Boolean).join(" ");
  const patientName = forOther ? `${str("patientFirst")} ${str("patientLast")}`.trim() : "";
  const contactName = `${str("first")} ${str("last")}`.trim();
  const reminders = details.reminders === true;
  const titles = bookingTitleFor(state);
  const { title } = titles;
  // Women's health day dates run over several months, not "the next seven days".
  const lead = state === 2 && visit?.days === "womensday" ? x.womensDayLead : titles.lead;

  // Do not ask people to bring what they already typed (claim number, insurer, employer, date),
  // and no Ontario card line for someone without one.
  const typed = (line: string) =>
    (!!str("claimNumber") && /claim number/i.test(line)) || (!!str("employer") && /employer/i.test(line)) || (!!str("eventDate") && /date of the/i.test(line));
  const ontarioLine = (line: string) => card > 0 && /Ontario health card/i.test(line);
  const bring = [
    ...(visit?.bring ?? []).filter((l) => !typed(l) && !ontarioLine(l)),
    ...(card > 0 ? [x.card.bring] : []),
    ...(visit?.payment ? (payments[payment]?.bring ?? []) : []),
    ...(visit?.fasting && slot != null ? [slot < 10 ? config.fasting.early : config.fasting.late] : []),
    ...(visit?.fastingMaybe && slot != null && slot < 10 ? [`${x.fastingIf} ${config.fasting.early}`] : []),
    ...(who === 0 ? [config.firstVisit] : []),
  ];

  const claimDetails = () => {
    if (!visit?.claim) return undefined;
    return visit.claim === "mva"
      ? { type: "mva", claimNumber: str("claimNumber"), insurer: str("insurer"), accidentDate: str("eventDate") }
      : { type: "wsib", claimNumber: str("claimNumber"), employer: str("employer"), injuryDate: str("eventDate") };
  };
  const claimLine = () => {
    const c = claimDetails();
    if (!c) return "";
    const date = ("accidentDate" in c ? c.accidentDate : c.injuryDate) ?? "";
    // Same date style as the appointment ("Oct 21, 2026"), not the raw form value.
    const nice = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${MON[Number(date.slice(5, 7)) - 1]} ${Number(date.slice(8, 10))}, ${date.slice(0, 4)}` : date;
    return [c.claimNumber, "insurer" in c ? c.insurer : c.employer, nice].filter(Boolean).join(", ");
  };

  const payload = () => ({
    division: service.label,
    service: service.key,
    visit: visit?.label ?? null,
    visitKey: visit?.key ?? null,
    forSomeoneElse: forOther === 1,
    patient: forOther ? { first: str("patientFirst"), last: str("patientLast"), relationship: str("relationship") } : null,
    who: bookingWho[who],
    language: registerLanguages[language],
    healthCard: card === 1 && province ? `${x.card.options[1]}: ${province}` : x.card.options[card],
    reason: reason || null,
    day: day ? day.iso : null,
    slot: slot != null ? fmtTime(slot) : null,
    name: contactName,
    phone: str("phone"),
    email: str("email"),
    healthCardLast4: str("card"),
    notes: str("notes"),
    claim: claimDetails() ?? null,
    payment: visit?.payment && payment >= 0 ? (payments[payment]?.label ?? null) : null,
    benefitsInsurer: visit?.payment && payment === 0 ? str("benefitsInsurer") : null,
    reminders,
    updates: details.updates === true,
  });

  const onDetails = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const errs = formErrors(form);
    const needPayment = !!visit?.payment && payment < 0;
    if (needPayment) errs["book-payment"] = x.paymentError;
    setErrors(errs);
    if (Object.keys(errs).length) {
      if (needPayment && Object.keys(errs).length === 1) form.querySelector<HTMLElement>('#book-payment [role="radio"]')?.focus();
      else focusFirstError(form, errs);
      return;
    }
    setDetails(readForm(form));
    setState(2);
  };

  // Clear a field's error as soon as it is edited.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    const id = (e.target as HTMLElement).id;
    if (!id || !errors[id]) return;
    setErrors((all) => Object.fromEntries(Object.entries(all).filter(([k]) => k !== id)));
  };

  const confirm = async () => {
    if (slot == null || !day) return;
    setBusy(true);
    const res = await submitForm("book", payload());
    setBusy(false);
    // "Just taken" only when the booking system says so (HTTP 409); any other failure offers a retry.
    setFailed(!res.ok && !res.taken);
    setState(res.ok ? "c" : "e");
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

  /** Uncontrolled text field with its label, inline error and hint. */
  const field = (k: string, label: string, props: InputHTMLAttributes<HTMLInputElement> = {}, opts: { hint?: string; className?: string } = {}) => {
    const id = `book-${k}`;
    const err = errorProps(errors, id);
    const described = [opts.hint ? `${id}-hint` : "", err["aria-describedby"] ?? ""].filter(Boolean).join(" ") || undefined;
    return (
      <FieldLabel label={label} htmlFor={id} hint={opts.hint} error={errors[id]} className={opts.className}>
        <Input id={id} name={k} defaultValue={str(k)} {...props} aria-invalid={err["aria-invalid"]} aria-describedby={described} />
      </FieldLabel>
    );
  };

  const callLine = <span className="text-[12px] leading-[1.5] text-muted md:text-[13px]">{linkPhones(bookingCopy.callLine)}</span>;
  const stepBox = (label: string) => ({ ref: setReveal, tabIndex: -1, role: "group" as const, "aria-label": label, className: "flex scroll-mt-20 flex-col gap-4 outline-none" });

  const reviewRows: [string, string][] = [
    [x.review.keys.service, serviceLine],
    ...(forOther ? ([[x.review.keys.for, [patientName ? `${patientName}.` : "", str("relationship") ? x.youAreTheir(str("relationship")) : ""].filter(Boolean).join(" ")]] as [string, string][]) : []),
    [x.review.keys.status, bookingWho[who]],
    [registerCopy.fields.language, registerLanguages[language]],
    [x.card.label, card === 0 && str("card") ? `${x.card.options[0]}, ${x.card.endsIn} ${str("card")}` : x.card.options[card]],
    [x.review.keys.time, slotLabel],
    [x.review.keys.clinic, bookingCopy.clinic],
    [x.review.keys.coverage, coverage],
    ...(visit?.payment && payment === 0 && str("benefitsInsurer") ? ([[x.review.keys.insurer, str("benefitsInsurer")]] as [string, string][]) : []),
    ...(visit?.claim && claimLine() ? ([[x.review.keys.claim, claimLine()]] as [string, string][]) : []),
    [x.review.keys.contact, [contactName, str("phone"), str("email")].filter(Boolean).join(", ")],
    ...(str("notes") ? ([[x.review.keys.notes, str("notes")]] as [string, string][]) : []),
    [x.review.keys.reminders, reminders ? x.review.yes : x.review.no],
  ];

  return (
    <div ref={root} className="grid grid-cols-1 gap-4 px-4 pb-8 pt-5 md:px-content md:pt-16 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
      {/* Left: title, lead, live summary */}
      <div className="flex flex-col gap-3 lg:sticky lg:top-[80px] lg:gap-3.5">
        <Steps state={state} className="lg:hidden" />
        <Display as="h1" size="lg" className="pt-1 lg:pt-0">
          {title}
        </Display>
        <Lead size="md" tone="muted">
          {lead}
        </Lead>
        <dl aria-labelledby="book-summary" className={cn("mt-3 hidden flex-col gap-2.5 rounded-card-sm border border-border bg-card px-6 py-[22px] text-[14px] leading-[1.5]", (state === 1 || state === 2) && "lg:flex")}>
          <h2 id="book-summary" className="text-[12px] font-semibold text-muted">
            {bookingCopy.summaryTitle}
          </h2>
          {[
            [bookingCopy.summaryKeys.service, service.label],
            [x.review.keys.visit, visit?.label ?? ""],
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
            <form method="post" onSubmit={onDetails} onInput={onInput} noValidate className="flex flex-col gap-[14px] md:gap-[22px]">
              <Steps state={state} className="hidden lg:flex" />
              <h2 ref={setReveal} tabIndex={-1} className="scroll-mt-20 text-[13px] font-semibold outline-none md:font-display md:text-[26px] md:font-medium md:tracking-[-.02em]">
                {bookingCopy.step1Title}
              </h2>
              <div role="radiogroup" aria-label="Service" onKeyDown={radioKeys} className="flex flex-wrap gap-1.5 md:gap-2">
                {services.map((s, i) => (
                  <PillChip key={s.key} on={service.key === s.key} tabIndex={rovingTab(service.key === s.key, i, true)} onClick={() => chooseService(s.key)}>
                    {s.label}
                  </PillChip>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <GroupLabel>{x.visitTitle}</GroupLabel>
                <div role="radiogroup" aria-label={x.visitTitle} onKeyDown={radioKeys} className="flex flex-wrap gap-1.5">
                  {service.visits.map((v, i) => (
                    <PillChip key={v.key} size="sm" on={visit?.key === v.key} tabIndex={rovingTab(visit?.key === v.key, i, true)} onClick={() => setVisitKey(v.key)}>
                      {v.label}
                    </PillChip>
                  ))}
                </div>
                {visit?.hint ? (
                  <p className="text-[13px] leading-[1.5] text-secondary">
                    {visit.hint.text}{" "}
                    {visit.hint.link && visit.hint.href ? (
                      <SmartLink to={visit.hint.href} className="font-semibold text-link">
                        {visit.hint.link} ›
                      </SmartLink>
                    ) : null}
                  </p>
                ) : null}
                {service.note ? (
                  <div className="flex flex-col gap-2 rounded-row bg-[color:var(--div-pain)] px-4 py-3.5 text-[13px] leading-[1.5] text-ink">
                    <span>{service.note.text}</span>
                    {service.note.action && service.note.switchTo ? (
                      <button type="button" onClick={() => chooseService(service.note!.switchTo!.service, service.note!.switchTo!.visit)} className="self-start border-b-[1.5px] border-ink font-semibold">
                        {service.note.action} ›
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <GroupLabel>{x.forTitle}</GroupLabel>
                <Choice options={x.forOptions} value={forOther} onChange={setForOther} ariaLabel={x.forTitle} />
              </div>
              <div className="flex flex-col gap-2">
                <GroupLabel>{x.statusLabel}</GroupLabel>
                <Choice options={bookingWho} value={who} onChange={setWho} ariaLabel={x.statusLabel} />
                <span className="text-[12px] text-muted">{x.statusHint}</span>
              </div>
              <div className="flex flex-col gap-2">
                <GroupLabel>{registerCopy.fields.language}</GroupLabel>
                <Choice options={registerLanguages} value={language} onChange={setLanguage} ariaLabel={registerCopy.fields.language} />
                {language === 1 ? <span className="text-[12px] text-muted">{x.languageHint}</span> : null}
              </div>

              {forOther ? (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-[13px] font-semibold text-primary">{x.patientTitle}</legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                    {field("patientFirst", x.fields.patientFirst, { required: true, autoComplete: "off", "data-error": x.missing.patientFirst } as InputHTMLAttributes<HTMLInputElement>)}
                    {field("patientLast", x.fields.patientLast, { required: true, autoComplete: "off", "data-error": x.missing.patientLast } as InputHTMLAttributes<HTMLInputElement>)}
                    {field("relationship", x.fields.relationship, { autoComplete: "off" }, { hint: x.fields.relationshipHint, className: "sm:col-span-2" })}
                  </div>
                </fieldset>
              ) : null}

              <fieldset className="flex flex-col gap-2">
                <legend className={cn("mb-2 text-[13px] font-semibold text-primary", !forOther && "sr-only")}>{forOther ? x.contactTitle : x.contactTitleSelf}</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {field("first", forOther ? x.fields.first : bookingCopy.fields.first, { autoComplete: "given-name", required: true, "data-error": x.missing.first } as InputHTMLAttributes<HTMLInputElement>)}
                  {field("last", forOther ? x.fields.last : bookingCopy.fields.last, { autoComplete: "family-name", required: true, "data-error": x.missing.last } as InputHTMLAttributes<HTMLInputElement>)}
                  {field("email", bookingCopy.fields.email, { type: "email", autoComplete: "email", inputMode: "email", required: true })}
                  {field("phone", bookingCopy.fields.phone, { type: "tel", autoComplete: "tel", inputMode: "tel", required: true })}
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <GroupLabel>{x.card.label}</GroupLabel>
                  <Choice options={x.card.options} value={card} onChange={setCard} ariaLabel={x.card.label} className="flex-wrap" />
                  {card === 0 ? (
                    field("card", forOther ? x.fields.cardSomeoneElse : bookingCopy.fields.card, { inputMode: "numeric", pattern: "[0-9]{4}", maxLength: 4, autoComplete: "off", "data-error": x.cardError } as InputHTMLAttributes<HTMLInputElement>)
                  ) : (
                    <>
                      {card === 1 ? (
                        <FieldLabel label={x.provinceLabel} htmlFor="book-province">
                          <Select id="book-province" value={province} onChange={(e) => setProvince(e.target.value)}>
                            <option value="" />
                            {x.provinces.map((pv) => (
                              <option key={pv}>{pv}</option>
                            ))}
                          </Select>
                        </FieldLabel>
                      ) : null}
                      <p className="text-[13px] leading-[1.5] text-secondary" aria-live="polite">
                        {quebec ? x.quebecNote : x.card.notes[card - 1]}
                      </p>
                    </>
                  )}
                </div>
              </fieldset>

              {visit?.claim ? (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-1 text-[13px] font-semibold text-primary">{x.claimTitle[visit.claim]}</legend>
                  <p className="mb-1 text-[12px] leading-[1.5] text-muted">{x.claimHint}</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                    {field("claimNumber", x.fields.claimNumber, { autoComplete: "off" })}
                    {visit.claim === "mva" ? field("insurer", x.fields.insurer, { autoComplete: "off" }) : field("employer", x.fields.employer, { autoComplete: "organization" })}
                    {field("eventDate", visit.claim === "mva" ? x.fields.accidentDate : x.fields.injuryDate, { type: "date", autoComplete: "off" })}
                  </div>
                </fieldset>
              ) : null}

              {visit?.payment ? (
                <div className="flex flex-col gap-2">
                  <GroupLabel>{x.paymentTitle}</GroupLabel>
                  <div id="book-payment" aria-describedby={errors["book-payment"] ? "book-payment-error" : undefined}>
                    <Choice
                      options={payments.map((p) => p.label)}
                      value={payment}
                      onChange={(i) => {
                        setPayment(i);
                        setErrors((er) => {
                          const next = { ...er };
                          delete next["book-payment"];
                          return next;
                        });
                      }}
                      ariaLabel={x.paymentTitle}
                    />
                  </div>
                  <FieldError id="book-payment" error={errors["book-payment"]} />
                  {payment === 0 ? field("benefitsInsurer", x.fields.benefitsInsurer, { autoComplete: "off" }, { hint: x.benefitsHint }) : null}
                </div>
              ) : null}

              <FieldLabel label={bookingCopy.fields.notes} htmlFor="book-notes">
                <Textarea id="book-notes" name="notes" defaultValue={str("notes")} rows={4} className="resize-y" />
              </FieldLabel>
              <div className="flex flex-col gap-2.5">
                <ConsentRow name="reminders" defaultChecked={details.reminders === true}>
                  {x.reminders}
                </ConsentRow>
                <ConsentRow name="updates" defaultChecked={details.updates === true}>
                  {x.updates}
                  <SmartLink to="privacy" className="font-semibold text-link">
                    {bookingCopy.consentLink}
                  </SmartLink>
                  .
                </ConsentRow>
              </div>
              <SubmitButton>{bookingCopy.next}</SubmitButton>
            </form>
          </Panel>
        ) : null}

        {state === 2 ? (
          <Panel>
            <Steps state={state} className="hidden lg:flex" />
            <div className="flex items-baseline justify-between gap-4">
              <h2 ref={setReveal} tabIndex={-1} className="display-tight scroll-mt-20 text-[26px] outline-none">
                {bookingCopy.step2Title}
              </h2>
              <span className="text-[13px] text-muted">{visit?.days === "womensday" ? x.womensDaySub : bookingCopy.step2Sub}</span>
            </div>
            <div role="radiogroup" aria-label="Day" onKeyDown={radioKeys} className="rm-day-strip scroll-x -mx-1 flex gap-1 px-1 py-0.5 md:gap-1.5">
              {dayList.map((d, i) => {
                const on = dayIdx === i;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={rovingTab(on, i, true)}
                    aria-label={`${d.today ? `${x.todayShort}, ` : ""}${d.dow} ${MON[d.date.getMonth()]} ${d.num}${d.open ? "" : `, ${x.closedShort.toLowerCase()}`}`}
                    onClick={() => {
                      setDayIdx(i);
                      setSlot(null);
                    }}
                    className={cn("flex min-w-[40px] flex-1 flex-col items-center gap-0.5 rounded-[12px] border-[1.5px] px-0.5 py-2 transition-all duration-[250ms] md:rounded-[14px] md:px-1 md:py-2.5", selClass(on), !d.open && !on && "border-dashed text-muted")}
                  >
                    <span className="text-[10px] font-semibold opacity-70 md:text-[11px]">{d.today ? x.todayShort : d.dow}</span>
                    <span className="font-display text-[17px] md:text-[20px]">{d.num}</span>
                    {visit?.days === "womensday" ? <span className="text-[10px] font-semibold md:text-[11px]">{MON[d.date.getMonth()]}</span> : null}
                    <span className="text-[9px] font-semibold md:text-[10px]">{d.open ? " " : x.closedShort}</span>
                  </button>
                );
              })}
            </div>
            {day && !day.open ? (
              <div role="status" className="flex flex-col gap-2 rounded-row border border-border bg-white p-4 text-[13px] leading-[1.5] text-muted md:p-6 md:text-[14px]">
                <span className="font-semibold text-primary">{bookingCopy.closedTitle}</span>
                {bookingCopy.closedBody}
              </div>
            ) : (
              <div role="radiogroup" aria-label="Time" onKeyDown={radioKeys} className="grid grid-cols-3 gap-1.5 md:grid-cols-4 md:gap-2">
                {slots.map((t, i) => {
                  const on = slot === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      tabIndex={rovingTab(on, i, slot != null && slots.includes(slot))}
                      onClick={() => setSlot(t)}
                      className={cn("rounded-field border-[1.5px] px-1 py-[11px] text-center text-[13px] font-semibold transition-all duration-[250ms] md:p-3 md:text-[14px]", selClass(on))}
                    >
                      {fmtTime(t)}
                    </button>
                  );
                })}
              </div>
            )}
            {visit?.fasting ? <p className="text-[13px] leading-[1.5] text-secondary">{config.fasting.late}</p> : null}
            <div className="flex gap-2 md:gap-2.5">
              <button type="button" onClick={() => setState(1)} className="min-w-[52px] shrink-0 self-center rounded-chip border-[1.5px] border-ink px-[18px] py-[14px] text-[14px] font-semibold transition-all hover:bg-white active:scale-[.98] md:px-[22px] md:py-4 md:text-[15px]">
                ‹ <span className="sr-only md:not-sr-only">{bookingCopy.back}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (slot != null) setState(3);
                }}
                aria-disabled={slot == null || undefined}
                className={cn("flex-1 rounded-chip py-[14px] text-center text-[14px] font-semibold transition-all md:py-4 md:text-[15px]", slot == null ? "cursor-not-allowed bg-line text-muted" : "bg-sky text-white hover:opacity-90 active:scale-[.98]")}
              >
                {slot == null ? bookingConfirmLabel.noSlot : bookingConfirmLabel.review}
              </button>
            </div>
            <div className="flex flex-col gap-2.5 rounded-row bg-sun-tint px-5 py-[18px] text-[14px] leading-[1.5] text-ink">
              <span className="font-semibold">{bookingCopy.waitlistTitle}</span>
              <span className="text-secondary">{bookingCopy.waitlistBody}</span>
              <button type="button" onClick={waitlist} disabled={busy} className="self-start border-b-[1.5px] border-ink font-semibold text-ink disabled:opacity-60">
                {bookingCopy.waitlistLink} ›
              </button>
            </div>
          </Panel>
        ) : null}

        {state === 3 ? (
          <Panel>
            <Steps state={state} className="hidden lg:flex" />
            <div className="flex flex-col gap-1">
              <h2 ref={setReveal} tabIndex={-1} className="display-tight scroll-mt-20 text-[26px] outline-none">
                {x.review.title}
              </h2>
              <span className="text-[13px] text-muted">{x.review.sub}</span>
            </div>
            <dl className="flex flex-col divide-y divide-border rounded-row border border-border bg-white text-[14px] leading-[1.5]">
              {reviewRows.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="shrink-0 text-muted">{k}</dt>
                  <dd className={cn("font-semibold", v.length < 60 && "sm:text-right")}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
              <button type="button" onClick={() => setState(1)} className="border-b-[1.5px] border-ink text-ink">
                {x.review.editDetails}
              </button>
              <button type="button" onClick={() => setState(2)} className="border-b-[1.5px] border-ink text-ink">
                {x.review.changeTime}
              </button>
            </div>
            <button
              type="button"
              onClick={confirm}
              disabled={busy}
              aria-busy={busy || undefined}
              className="rounded-chip bg-sky py-[14px] text-center text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60 md:py-4 md:text-[15px]"
            >
              {bookingConfirmLabel.ready}
            </button>
          </Panel>
        ) : null}

        {state === "c" && day && slot != null ? (
          <div {...stepBox(bookingCopy.confirmed.title)}>
            <StateCard
              state="success"
              title={bookingCopy.confirmed.title}
              actions={
                <>
                  <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsFor(day, slot, serviceLine))}`} download="restoration-medical.ics" className="inline-flex h-12 items-center rounded-chip bg-ink px-6 text-[14px] font-semibold text-white hover:opacity-90 active:scale-[.98]">
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
              <p>{reminders ? (day?.today ? `${bookingCopy.confirmed.body.split(". ")[0]}. ${x.todayReminder}` : bookingCopy.confirmed.body) : x.confirmed.noReminders}</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <OutcomeTile k={x.confirmed.service}>
                  <span className="text-[16px] font-semibold">{service.label}</span>
                  {visit ? <span className="text-[13px] text-muted">{visit.label}</span> : null}
                </OutcomeTile>
                <OutcomeTile k={bookingCopy.confirmed.when}>
                  <span className="text-[16px] font-semibold">{slotLabel}</span>
                  {forOther && patientName ? <span className="text-[13px] text-muted">{`${x.confirmed.for} ${patientName}`}</span> : null}
                  <span className="text-[13px] text-muted">{`${registerCopy.fields.language}: ${registerLanguages[language]}`}</span>
                </OutcomeTile>
                <OutcomeTile k={bookingCopy.confirmed.where}>
                  <span className="text-[16px] font-semibold">{bookingCopy.confirmed.whereValue}</span>
                  <span className="text-[13px] text-muted">{bookingCopy.confirmed.whereSub}</span>
                </OutcomeTile>
                <OutcomeTile k={x.confirmed.coverage}>
                  <span className="text-[16px] font-semibold">{coverage}</span>
                </OutcomeTile>
              </div>
              {str("notes") ? (
                <OutcomeTile k={x.confirmNote}>
                  <span className="whitespace-pre-line text-[14px] leading-[1.5]">{str("notes")}</span>
                </OutcomeTile>
              ) : null}
              <OutcomeTile k={bookingCopy.confirmed.bring}>
                <ul className="flex list-disc flex-col gap-1 pl-5 text-[14px] leading-[1.5]">
                  {bring.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </OutcomeTile>
            </StateCard>
          </div>
        ) : null}

        {state === "w" ? (
          <div {...stepBox(bookingCopy.waitlisted.title)}>
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
              <p>{bookingCopy.waitlisted.body(service.label)}</p>
              <OutcomeTile k={bookingCopy.summaryKeys.service}>
                <span className="text-[16px] font-semibold">{serviceLine}</span>
                <span className="text-[13px] text-muted">{bookingCopy.waitlisted.listLabel}</span>
              </OutcomeTile>
            </StateCard>
          </div>
        ) : null}

        {state === "e" ? (
          <div {...stepBox(failed ? bookingCopy.failed.title : bookingCopy.taken.title)}>
            <StateCard
              state="error"
              title={failed ? bookingCopy.failed.title : bookingCopy.taken.title}
              actions={
                <>
                  <Button onClick={() => setState(failed && slot != null ? 3 : 2)}>{failed ? bookingCopy.failed.retry : bookingCopy.taken.another}</Button>
                  <Button to={site.phoneHref} variant="inverse">
                    {bookingCopy.taken.call}
                  </Button>
                </>
              }
            >
              <p>{failed ? bookingCopy.failed.body : bookingCopy.taken.body}</p>
            </StateCard>
          </div>
        ) : null}

        <div className="lg:hidden">{callLine}</div>
      </div>
    </div>
  );
}
