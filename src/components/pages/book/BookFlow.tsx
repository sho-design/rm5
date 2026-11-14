"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { Button, Display, Input, Lead, Select, SmartLink, StateCard, Textarea } from "@/components/ui";
import { bookingConfirmLabel, bookingCopy, bookingCoverageFallback, bookingSteps, bookingTitleFor, bookingWho, registerCopy, registerLanguages, type BookingState } from "@/content/booking";
import { bookingExtra as x } from "@/content/booking-extra";
import { clock } from "@/lib/fasting";
import { registerExtraCopy as rx } from "@/content/forms-copy";
import type { BookingConfig, BookingService, BookingVisit } from "@/content/booking-visits";
import { site } from "@/content/site";
import { bookingDays, fmtTime, womensDayBookingDays, DOW, MON, SLOT_MINUTES, type BookingDay } from "@/lib/hours";
import { openingHours } from "@/content/site";
import { submitForm } from "@/lib/forms";
import { radioKeys, rovingTab, useRevealOnChange } from "@/lib/a11y";
import { errorProps, fmtPhone, focusFirstError, formErrors, readForm, type FormErrors } from "@/lib/validate";
import { cn } from "@/lib/cn";
import { isEmergencyNote, isInfantFever } from "@/lib/search";
import { EmergencyNote } from "@/components/pages/help/EmergencyNote";
import { readReason, SENSITIVE_REASON } from "@/lib/routes";
import { buttonClass } from "@/components/ui/Button";
import { linkPhones } from "@/components/ui/Phones";
import { oceanBookingUrl } from "@/lib/ocean";
import { OceanHandoff } from "./OceanHandoff";
import { Choice, ConsentRow, DobInput, FieldError, FieldLabel, OutcomeTile, Panel, PillChip, selClass, SubmitButton } from "./FormBits";

type Details = Record<string, string | boolean>;

/** Ink text action beside the pills in an outcome card. */
const ghost = buttonClass("outline", "md");

/** Step indicator: done steps show ✓ on sage, the current step sits on ink with a sunshine dot. */
function Steps({ state, className }: { state: BookingState; className?: string }) {
  const current = state === "w" ? 2 : state === "e" ? 3 : state === "c" ? 0 : state;
  return (
    <ol className={cn("flex items-center gap-1 text-[13px] font-semibold md:gap-1.5 md:text-[13px]", className)} aria-label="Booking steps">
      {bookingSteps.map(({ n, label }) => {
        const on = n === current;
        const done = state === "c" || n < current;
        return (
          <li
            key={n}
            aria-current={on ? "step" : undefined}
            className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-chip px-2 py-2 md:flex-none md:gap-2 md:px-3.5", on ? "bg-ink text-white" : done ? "bg-sage-tint text-ink" : "bg-white text-ink")}
          >
            <span className={cn("flex h-[18px] w-[18px] items-center justify-center rounded-full text-[12px] md:h-5 md:w-5 md:text-[12px]", on ? "bg-sun text-sun-ink" : done ? "bg-sage-deep text-white" : "bg-line text-muted")} aria-hidden>
              <span aria-hidden>{done ? "✓" : n}</span>
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
    <span aria-hidden className="text-[13px] font-semibold text-secondary">
      {children}
    </span>
  );
}

/** The fasting line for a morning slot, with the stop times worked out (round 28 follow-up). */
const fastLine = (slot: number) => x.fastingBooked(clock(slot - 10), clock(slot - 12));

/** Text for an iCalendar property: backslash, semicolon, comma and line breaks escaped (RFC 5545). */
const icsText = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

function icsFor(day: BookingDay, slot: number, summary: string, mins = SLOT_MINUTES, note?: string): string {
  const start = new Date(day.date);
  start.setHours(0, Math.round(slot * 60), 0, 0);
  // The visit length when known (a 45-minute assessment showed as 30 in calendars, round 27).
  const end = new Date(start.getTime() + mins * 60_000);
  const stamp = (d: Date) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Restoration Medical//Booking//EN",
    // Some calendar apps (Outlook) need the time zone spelled out, a UID and a DTSTAMP (round 28, Linh).
    "BEGIN:VTIMEZONE",
    "TZID:America/Toronto",
    "BEGIN:STANDARD",
    "DTSTART:19701101T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19700308T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${stamp(start)}-${Math.random().toString(36).slice(2, 10)}@restorationmedical.ca`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;TZID=America/Toronto:${stamp(start)}`,
    `DTEND;TZID=America/Toronto:${stamp(end)}`,
    `SUMMARY:Restoration Medical, ${summary}`,
    `LOCATION:${bookingCopy.confirmed.whereValue}`,
    ...(note ? [`DESCRIPTION:${icsText(note)}`] : []),
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
  const [noteUrgent, setNoteUrgent] = useState(false);
  /** A note that reads like an emergency pauses the booking once: the warning alone did not stop a tester
   *  with heartburn-like chest tightness and sweating from booking a visit for later today (round 20). */
  const [urgentHold, setUrgentHold] = useState(false);
  /** A baby under 3 months with a fever: a hard stop, with no way to continue (a 10-week-old with 38.4 was
   *  booked for 11am after one tap, round 23). Changing the note or the date of birth lifts it. */
  const [infantFever, setInfantFever] = useState(false);
  const urgentOk = useRef(false);
  const [who, setWho] = useState(0);
  const autoWho = useRef<number | null>(null);
  /** -1 until chosen: no default, so a rushed self-payer cannot send "insurance" by accident. */
  const [payment, setPayment] = useState(-1);
  /** 0 English, 1 Tiếng Việt, 2 another language (named in a text box). */
  const [language, setLanguage] = useState(0);
  /** Came from a Vietnamese page (?lang=vi): the form is English, so the key safety and help lines show in Vietnamese. */
  const [fromVi, setFromVi] = useState(false);
  /** Results and follow-ups: 0 at the clinic, 1 by phone, 2 by video. */
  const [mode, setMode] = useState(0);
  /** This tab already booked (Back then Forward remounts the page on an empty form). Only a flag, no details. */
  const [bookedBefore, setBookedBefore] = useState(false);
  /** 0 Ontario health card, 1 card from another province, 2 no health card. */
  const [card, setCard] = useState(0);
  /** Province or territory of a card from another province ("" until chosen). */
  const [province, setProvince] = useState("");
  /** Why they are coming, carried from the page they booked from (?reason=Perimenopause and menopause). */
  const [reasonText, setReason] = useState("");
  /** The service and visit the reason came with. Switching to another one drops it, so a jawline program does not
   *  follow someone into a Family Medicine visit marked OHIP-insured (round 28, Daniel); switching back restores it. */
  const [reasonFor, setReasonFor] = useState<{ service: string; visit: string } | null>(null);
  const [details, setDetails] = useState<Details>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [days, setDays] = useState<BookingDay[]>([]);
  const [womensDays, setWomensDays] = useState<BookingDay[]>([]);
  const [signs, setSigns] = useState(false);
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
    // One spare day, so a visit that cannot start today still shows seven days (round 27, Derek).
    setDays(bookingDays(undefined, 8));
    setWomensDays(womensDayBookingDays());
    // Links pass ?service=<division key>&visit=<visit key> (bookFor in lib/routes). Unknown keys are ignored.
    const params = new URLSearchParams(window.location.search);
    const key = params.get("service");
    if (key && services.some((s) => s.key === key)) chooseService(key, params.get("visit") ?? undefined);
    const why = readReason(params.get("reason")?.trim() ?? "").slice(0, 80);
    if (why) {
      setReason(why);
      const sk = key && services.some((s) => s.key === key) ? key : (services[0]?.key ?? "");
      const sv = services.find((s) => s.key === sk);
      const vk = sv?.visits.find((v) => v.key === params.get("visit"))?.key ?? sv?.visits[0]?.key ?? "";
      setReasonFor({ service: sk, visit: vk });
      // Keep the reason out of the address bar and history (a 15-year-old's family iPad showed "Sexual health").
      try {
        const u = new URL(window.location.href);
        u.searchParams.delete("reason");
        window.history.replaceState(window.history.state, "", u.pathname + (u.search ? u.search : "") + u.hash);
      } catch {}
    }
    // Links from children's pages pass &for=someone: the booking is for a child, not the parent.
    if (params.get("for") === "someone") setForOther(1);
    // Links from the Vietnamese pages pass &lang=vi so Tiếng Việt is already chosen (round 25, Anh).
    if (params.get("lang") === "vi") {
      setLanguage(1);
      setFromVi(true);
    }
    try {
      setBookedBefore(sessionStorage.getItem("rm-booked") === "1");
      setBookedWhat(sessionStorage.getItem("rm-booked-what") ?? "");
    } catch {
      /* storage blocked: no notice */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  // The tab title says when the booking is done, so it is not still "Book an appointment".
  useEffect(() => {
    if (state !== "c") return;
    const before = document.title;
    document.title = `${bookingCopy.confirmed.title} ${before}`;
    return () => {
      document.title = before;
    };
  }, [state]);

  const str = (k: string) => (typeof details[k] === "string" ? (details[k] as string) : "");
  // Women's health day is only on the last Sunday of the month: offer those dates instead of the next 7 days.
  // Clinic rule: only lab testing, aesthetics and IV wellness can be booked for today.
  const noToday = !!visit && !visit.sameDay && visit.days !== "womensday" && days.some((d) => d.today && d.open && d.slots.length > 0);
  const dayList = visit?.days === "womensday" ? womensDays : (noToday ? days.filter((d) => !d.today) : days).slice(0, 7);
  const day = dayList[dayIdx];
  useEffect(() => {
    setDayIdx(0);
    setSlot(null);
    setMode(0);
    // Follow-ups and procedures are for people already seen here. Arrowing past one of them used to leave
    // "Existing patient" set silently (a screen reader tester found it on review), so put the status back after.
    if (visit?.existing) {
      setWho((w) => {
        if (w !== 1) autoWho.current = w;
        return 1;
      });
    } else if (autoWho.current != null) {
      const back = autoWho.current;
      autoWho.current = null;
      setWho(back);
    }
  }, [visit?.key, visit?.existing]);
  // "Van Tran" alone, or "Van Tran. Born 3 May 1956. You are their son." (a lone name had a stray full stop, round 25).
  const forWhoLine = () => {
    const extra = [niceDob(str("patientDob")) ? `${x.bornOn} ${niceDob(str("patientDob"))}.` : "", str("relationship") ? x.youAreTheir(str("relationship")) : ""].filter(Boolean);
    return [patientName ? (extra.length ? `${patientName}.` : patientName) : "", ...extra].filter(Boolean).join(" ");
  };
  const languageName = language === 2 ? str("languageOther") || x.otherLanguage : registerLanguages[language];
  // A visit longer than a slot must finish by closing (a 45 minute first visit at 8:30pm ran past 9pm).
  const closeAt = day ? openingHours[day.date.getDay()]?.[1] : undefined;
  const slots = useMemo(() => (day?.slots ?? []).filter((t) => !visit?.mins || closeAt === undefined || t + visit.mins / 60 <= closeAt), [day, visit?.mins, closeAt]);
  // Insured rehab visits also say what it costs if the plan does not pay (a tester never saw the price in booking).
  const insuredWithFallback = visit?.payment && payment === 0 && visit.selfPay ? `${payments[0]?.coverage}. ${x.notCovered} ${visit.selfPay.replace(/^Self-pay:\s*/, "")}` : undefined;
  const baseCoverage = visit?.coverage ?? (visit?.payment ? (payment === 1 && visit.selfPay ? visit.selfPay : insuredWithFallback ?? payments[payment]?.coverage) : service.coverage) ?? bookingCoverageFallback;
  // Without an Ontario health card, OHIP does not pay: never show "OHIP-insured" on their booking.
  // Quebec does not take part in reciprocal billing for doctor visits: pay and claim back from RAMQ.
  const quebec = card === 1 && province === "Quebec";
  const coverage = card > 0 && /OHIP|health card/i.test(baseCoverage) ? (quebec ? x.quebecCoverage : x.card.coverage[card - 1]) : baseCoverage;
  const slotLabel = day && slot != null && day.open ? `${DOW[day.date.getDay()]} ${MON[day.date.getMonth()]} ${day.date.getDate()}, ${fmtTime(slot)}` : bookingConfirmLabel.slotNotChosen;
  const reason = reasonText && (!reasonFor || (reasonFor.service === serviceKey && reasonFor.visit === visitKey)) ? reasonText : "";
  const serviceLine = [visit ? `${service.label}, ${visit.label}` : service.label, reason ? `(${reason})` : ""].filter(Boolean).join(" ");
  /** Sensitive reasons stay off what remains on screen or in this tab after booking (a teen on a family iPad,
   *  round 19); other reasons, such as the drip name, stay so the confirmation says what was booked (round 20). */
  const sensitive = SENSITIVE_REASON.test(reason ?? "");
  const ocean = oceanBookingUrl(service.key, visit?.key);
  const shownReason = reason && !sensitive ? reason : "";
  const serviceShort = [visit ? `${service.label}, ${visit.label}` : service.label, shownReason ? `(${shownReason})` : ""].filter(Boolean).join(" ");
  const patientName = forOther ? `${str("patientFirst")} ${str("patientLast")}`.trim() : "";
  const contactName = `${str("first")} ${str("last")}`.trim();
  const reminders = details.reminders === true;
  const titles = bookingTitleFor(state);
  const { title } = titles;
  // Women's health day dates run over several months, not "the next seven days".
  // "Who you are. Two minutes" promised fields that are in Ocean when the hand-off is on (round 23).
  const lead = state === 2 && visit?.days === "womensday" ? x.womensDayLead : ocean && state === 1 ? x.ocean.lead : titles.lead;

  // Do not ask people to bring what they already typed (claim number, insurer, employer, date),
  // and no Ontario card line for someone without one.
  const typed = (line: string) =>
    (!!str("claimNumber") && /claim number/i.test(line)) || (!!str("employer") && /employer/i.test(line)) || (!!str("eventDate") && /date of the/i.test(line));
  const ontarioLine = (line: string) => card > 0 && /Ontario health card/i.test(line);
  const bring = [
    ...(visit?.bring ?? []).filter((l) => !typed(l) && !ontarioLine(l)),
    ...(card === 1 ? [x.card.bring] : card === 2 ? [x.card.bringNone] : []),
    ...(visit?.payment ? (payments[payment]?.bring ?? []) : []),
    ...(visit?.fasting && slot != null ? [slot < 10 ? fastLine(slot) : x.fastingLate(clock(slot - 4))] : []),
    ...(visit?.fastingMaybe && slot != null && slot < 10 ? [`${x.fastingIf} ${fastLine(slot)}`] : []),
    ...(who === 0 ? [forOther ? x.firstVisitTheirs : config.firstVisit] : []),
  ].map((l) => (forOther ? l.replace(/^(?:Your )?(Ontario )?health card/i, (_m, on: string | undefined) => `Their ${on ?? ""}health card`) : l));

  const claimDetails = () => {
    if (!visit?.claim) return undefined;
    return visit.claim === "mva"
      ? { type: "mva", claimNumber: str("claimNumber"), insurer: str("insurer"), accidentDate: str("eventDate") }
      : { type: "wsib", claimNumber: str("claimNumber"), employer: str("employer"), injuryDate: str("eventDate") };
  };
  /** "Mar 14, 1997" from YYYY-MM-DD: a mother typed her son's birth date and never saw it again (round 22). */
  const niceDob = (v: string) => (/^\d{4}-\d{2}-\d{2}$/.test(v) ? `${MON[Number(v.slice(5, 7)) - 1]} ${Number(v.slice(8, 10))}, ${v.slice(0, 4)}` : "");
  const claimLine = () => {
    const c = claimDetails();
    if (!c) return "";
    const date = ("accidentDate" in c ? c.accidentDate : c.injuryDate) ?? "";
    // Same date style as the appointment ("Oct 21, 2026"), not the raw form value.
    const nice = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${MON[Number(date.slice(5, 7)) - 1]} ${Number(date.slice(8, 10))}, ${date.slice(0, 4)}` : date;
    // "Intact, Oct 30, 2026" read as a claim dated Oct 30 (round 21): name the date.
    const when = nice ? `${"insurer" in c ? x.claimDateMva : x.claimDateWsib} ${nice}` : "";
    return [c.claimNumber, "insurer" in c ? c.insurer : c.employer, when].filter(Boolean).join(", ");
  };

  /** "Jordan (he/him)": testers gave a preferred name and pronouns and never saw them again (round 18). */
  const preferredLine = () => {
    const n = str(forOther ? "patientPreferred" : "preferredName");
    const pr = str(forOther ? "patientPronouns" : "pronouns");
    // Pronouns alone used to show as "Preferred name: (she/her)" (round 21).
    return n ? [n, pr ? `(${pr})` : ""].filter(Boolean).join(" ") : "";
  };
  const payload = () => ({
    division: service.label,
    service: service.key,
    visit: visit?.label ?? null,
    visitKey: visit?.key ?? null,
    forSomeoneElse: forOther === 1,
    patient: forOther ? { first: str("patientFirst"), last: str("patientLast"), dob: str("patientDob") || null, preferredName: str("patientPreferred") || null, pronouns: str("patientPronouns") || null, relationship: str("relationship") } : null,
    preferredName: forOther ? null : str("preferredName") || null,
    pronouns: forOther ? null : str("pronouns") || null,
    who: bookingWho[who],
    language: languageName,
    mode: visit?.modes ? x.modes[mode] : null,
    healthCard: card === 1 && province ? `${x.card.options[1]}: ${province}` : x.card.options[card],
    reason: reason || null,
    day: day ? day.iso : null,
    slot: slot != null ? fmtTime(slot) : null,
    name: contactName,
    phone: str("phone"),
    email: str("email"),
    healthCardLast4: str("card"),
    notes: str("notes"),
    femaleNurse: service.key === "family" && details.femaleNurse === true,
    claim: claimDetails() ?? null,
    payment: visit?.payment && payment >= 0 ? (payments[payment]?.label ?? null) : null,
    benefitsInsurer: visit?.payment && payment === 0 ? str("benefitsInsurer") : null,
    reminders,
    updates: details.updates === true,
  });

  /** Age in days from the date of birth given for the patient, if any (YYYY-MM-DD in the hidden DOB input). */
  const ageDaysIn = (form: HTMLFormElement | null) => {
    const v = (form?.elements.namedItem("patientDob") as HTMLInputElement | null)?.value ?? "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return undefined;
    return Math.floor((Date.now() - new Date(`${v}T12:00:00`).getTime()) / 86400000);
  };

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
    // The date of birth may be typed after the note: check again with it (a 6-week-old with 38.2, round 22).
    const notes = (form.elements.namedItem("notes") as HTMLTextAreaElement | null)?.value ?? "";
    const urgentNow = isEmergencyNote(notes, ageDaysIn(form));
    if (urgentNow !== noteUrgent) setNoteUrgent(urgentNow);
    if (isInfantFever(notes, ageDaysIn(form))) {
      setInfantFever(true);
      requestAnimationFrame(() => document.getElementById("book-notes-urgent")?.focus());
      return;
    }
    if (urgentNow && !urgentOk.current) {
      setUrgentHold(true);
      requestAnimationFrame(() => document.getElementById("book-notes-urgent")?.focus());
      return;
    }
    setDetails(readForm(form));
    setState(2);
  };

  // Clear a field's error as soon as it is edited.
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    // Re-check on every field: the date of birth is often typed after the note.
    // After a frame: the date of birth's hidden YYYY-MM-DD value updates on the next render.
    const f = e.currentTarget;
    requestAnimationFrame(() => {
      const notesNow = (f.elements.namedItem("notes") as HTMLTextAreaElement | null)?.value ?? "";
      const infant = isInfantFever(notesNow, ageDaysIn(f));
      setInfantFever(infant);
      if (infant) setNoteUrgent(true);
    });
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
    if (res.ok) {
      try {
        sessionStorage.setItem("rm-booked", "1");
        sessionStorage.setItem("rm-booked-what", `${serviceShort}, ${slotLabel}`);
      } catch {
        /* storage blocked */
      }
    }
  };

  const waitlist = async () => {
    setBusy(true);
    const res = await submitForm("book", { ...payload(), waitlist: true });
    setBusy(false);
    setFailed(!res.ok);
    setState(res.ok ? "w" : "e");
  };

  /** "Book another visit": the first booking stands, so say this one is a second visit. */
  const [another, setAnother] = useState(false);
  /** The visit already booked in this tab, named in the "another visit" and "already booked" notes. */
  const [bookedWhat, setBookedWhat] = useState("");
  const reset = () => {
    setAnother(true);
    setBookedBefore(false);
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

  const callLine = <span className="text-[13px] leading-[1.5] text-muted md:text-[13px]">{linkPhones(bookingCopy.callLine)}</span>;
  const stepBox = (label: string) => ({ ref: setReveal, tabIndex: -1, role: "group" as const, "aria-label": label, className: "flex scroll-mt-20 flex-col gap-4 outline-none" });

  const reviewRows: [string, string][] = [
    [x.review.keys.service, serviceLine],
    ...(forOther ? ([[x.review.keys.for, forWhoLine()]] as [string, string][]) : []),
    ...(preferredLine() ? ([[x.review.keys.preferred, preferredLine()]] as [string, string][]) : []),
    [x.review.keys.status, bookingWho[who]],
    // Review said only "Mandarin"; the interpreter appeared first on the confirmation (round 23).
    [registerCopy.fields.language, language === 2 ? `${languageName}, ${x.interpreterShort}` : languageName],
    ...(visit?.modes ? ([[x.modeLabel, x.modes[mode]]] as [string, string][]) : []),
    [x.card.label, card === 0 && str("card") ? `${x.card.options[0]}, ${x.card.endsIn} ${str("card")}` : card === 1 && province ? `${x.card.options[1]}: ${province}` : x.card.options[card]],
    [x.review.keys.time, slotLabel],
    // "Clinic: Thornhill" on a video visit made a tester think she had to go in (round 23).
    [x.review.keys.clinic, visit?.modes && mode > 0 ? x.modes[mode] : bookingCopy.clinic],
    [x.review.keys.coverage, coverage],
    ...(visit?.payment && payment === 0 && str("benefitsInsurer") ? ([[x.review.keys.insurer, str("benefitsInsurer")]] as [string, string][]) : []),
    ...(visit?.claim && claimLine() ? ([[x.review.keys.claim, claimLine()]] as [string, string][]) : []),
    // The preferred name leads the contact row; a tester saw her health card name right under her preferred name.
    [x.review.keys.contact, [!forOther && str("preferredName") ? `${str("preferredName")} ${str("last")}`.trim() : contactName, fmtPhone(str("phone")), str("email")].filter(Boolean).join(", ")],
    ...(str("notes") ? ([[x.review.keys.notes, str("notes")]] as [string, string][]) : []),
    ...(service.key === "family" && details.femaleNurse === true ? ([[x.review.keys.chaperone, x.femaleNurseYes]] as [string, string][]) : []),
    [x.review.keys.reminders, reminders ? x.review.yes : x.review.no],
  ];

  return (
    <div ref={root} className="grid grid-cols-1 gap-4 px-4 pb-8 pt-5 md:px-content md:pt-16 md:pb-10 lg:grid-cols-2 lg:items-start lg:gap-8">
      {/* Left: title, lead, live summary */}
      <div className={cn("flex flex-col gap-3 lg:gap-3.5", !signs && "lg:sticky lg:top-[80px]")}>
        {ocean ? null : <Steps state={state} className="lg:hidden" />}
        <Display as="h1" size="lg" className="pt-1 lg:pt-0">
          {title}
        </Display>
        <Lead size="md" tone="muted">
          {lead}
        </Lead>
        {state === 1 ? (
          <p className="pretty rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink">
            {bookingCopy.urgentLine}{" "}
            {/* The full list opens here, beside the form, instead of a second box under it (it looked stranded). */}
            <button type="button" aria-expanded={signs} aria-controls="emergency" onClick={() => setSigns((v) => !v)} className="whitespace-nowrap font-semibold text-link">
              {bookingCopy.urgentMore}
              <span aria-hidden> {signs ? "‹" : "›"}</span>
            </button>
            <a href="tel:988" className="mt-1 block font-semibold underline underline-offset-2">
              {bookingCopy.urgentCrisis}
            </a>
          </p>
        ) : null}
        {fromVi && state === 1 ? (
          <div lang="vi" className="pretty flex flex-col gap-1.5 rounded-tile border-[1.5px] border-[color:var(--rm-coral,#E0675A)] bg-card px-4 py-3 text-[14px] leading-[1.5]">
            <strong className="text-[15px]">{x.vi.emergency}</strong>
            <span className="font-semibold">{x.vi.crisis}</span>
            <span>{x.vi.help}</span>
          </div>
        ) : null}
        {state === 1 && signs ? <EmergencyNote id="emergency" headingLevel={3} /> : null}
        <dl aria-labelledby="book-summary" className={cn("mt-3 hidden flex-col gap-2.5 rounded-card-sm border border-border bg-card px-6 py-[22px] text-[14px] leading-[1.5]", (state === 1 || state === 2) && "lg:flex")}>
          <h2 id="book-summary" className="text-[13px] font-semibold text-muted">
            {bookingCopy.summaryTitle}
          </h2>
          {[
            [bookingCopy.summaryKeys.service, service.label],
            // The reason from the page and a phone or video choice show while choosing, not only at review.
            [x.review.keys.visit, visit ? (reason ? `${visit.label} (${reason})` : visit.label) : ""],
            visit?.modes && mode > 0 ? [x.summaryWhere, x.modes[mode]] : [bookingCopy.summaryKeys.clinic, bookingCopy.clinic],
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
              {ocean ? null : <Steps state={state} className="hidden lg:flex" />}
              {another ? (
                <p role="status" className="rounded-row border border-border bg-white px-4 py-3 text-[13px] leading-[1.5] text-secondary">
                  {linkPhones(`${x.anotherBooking(bookedWhat)} ${site.phone}.`)}
                </p>
              ) : null}
              {bookedBefore ? (
                <p role="status" className="rounded-row border border-border bg-white px-4 py-3 text-[13px] leading-[1.5] text-secondary">
                  {linkPhones(`${x.alreadyBooked(bookedWhat)} ${site.phone}.`)}
                </p>
              ) : null}
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
                {/* Say it on the first step, not after the whole form (round 27, Owen). */}
                {noToday ? <p className="pretty text-[13px] leading-[1.5] text-secondary">{linkPhones(x.noSameDay)}</p> : null}
                {visit?.modes ? (
                  <div className="flex flex-col gap-2 pt-1">
                    <GroupLabel>{x.modeLabel}</GroupLabel>
                    <Choice options={[...x.modes]} value={mode} onChange={setMode} ariaLabel={x.modeLabel} />
                  </div>
                ) : null}
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
                {/* The reason carried from search or a page ("Memory or dementia") shows here too, not only at review. */}
                {reason ? (
                  <p className="text-[13px] leading-[1.5] text-secondary">
                    <span className="font-semibold text-ink">{x.reasonLabel}:</span> {reason}
                  </p>
                ) : null}
                {/* A new patient booked an injectables treatment for today with no consult (round 27, Lisa). */}
                {visit?.key === "injectables" && who === 0 && service.visits.some((v) => v.key === "consult") ? (
                  <p className="text-[13px] leading-[1.5] text-secondary">
                    {x.aesNewHint}{" "}
                    <button type="button" onClick={() => setVisitKey("consult")} className="border-b-[1.5px] border-ink font-semibold text-ink">
                      {x.aesNewAction}<span aria-hidden> ›</span>
                    </button>
                  </p>
                ) : null}
                {/* A new patient picked Chiropractic and never saw that a first visit is an assessment. */}
                {(visit?.key === "physio" || visit?.key === "chiro") && who === 0 && service.visits.some((v) => v.key === "assessment") ? (
                  <p className="text-[13px] leading-[1.5] text-secondary">
                    {x.rehabNewHint}{" "}
                    <button type="button" onClick={() => setVisitKey("assessment")} className="border-b-[1.5px] border-ink font-semibold text-ink">
                      {x.rehabNewAction} ›
                    </button>
                  </p>
                ) : null}
                {service.note && !visit?.noServiceNote ? (
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

              {/* With Ocean set up for this visit, details are entered there and go straight into OSCAR Pro. */}
              {ocean ? (
                <OceanHandoff url={ocean} kind="book" privateNote={sensitive ? x.ocean.privateNote : undefined} />
              ) : (
              <>
              <div className="flex flex-col gap-2">
                <GroupLabel>{x.forTitle}</GroupLabel>
                <Choice options={x.forOptions} value={forOther} onChange={setForOther} ariaLabel={x.forTitle} />
              </div>
              <div className="flex flex-col gap-2">
                <GroupLabel>{x.statusLabel}</GroupLabel>
                <Choice options={bookingWho} value={who} onChange={setWho} ariaLabel={x.statusLabel} />
                <span className="text-[13px] text-muted">{x.statusHint}</span>
                {/* Booking is one visit; registering makes us your family doctor. New patients asked which to do. */}
                {who === 0 && service.key === "family" ? (
                  <span className="text-[13px] text-muted">
                    {x.registerHint}{" "}
                    <SmartLink to="register" className="font-semibold text-link">
                      {x.registerLink}<span aria-hidden> ›</span>
                    </SmartLink>
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <GroupLabel>{registerCopy.fields.language}</GroupLabel>
                <Choice options={[...registerLanguages, x.otherLanguage]} value={language} onChange={setLanguage} ariaLabel={registerCopy.fields.language} />
                {language === 1 ? <span className="text-[13px] text-muted">{x.languageHint}</span> : null}
                {language === 2 ? field("languageOther", x.otherLanguageField, { autoComplete: "off" }, { hint: x.otherLanguageHint }) : null}
              </div>

              {forOther ? (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-2 text-[13px] font-semibold text-primary">{x.patientTitle}</legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                    {field("patientFirst", x.fields.patientFirst, { required: true, autoComplete: "off", "data-error": x.missing.patientFirst } as InputHTMLAttributes<HTMLInputElement>)}
                    {field("patientLast", x.fields.patientLast, { required: true, autoComplete: "off", "data-error": x.missing.patientLast } as InputHTMLAttributes<HTMLInputElement>)}
                    {field("patientPreferred", rx.preferredName, { autoComplete: "off" }, { hint: rx.preferredHintOther })}
                    {field("patientPronouns", rx.pronouns, { autoComplete: "off" }, { hint: rx.pronounsHint })}
                    {/* "Lan Nguyen" is a common name: a son booking for his mother had no way to say which chart (round 21). */}
                    <FieldLabel label={x.fields.patientDob} htmlFor="book-patientDob" hint={x.fields.patientDobHint} className="sm:col-span-2">
                      <DobInput id="book-patientDob" name="patientDob" label={x.fields.patientDob} autoComplete="off" />
                    </FieldLabel>
                    {field("relationship", x.fields.relationship, { autoComplete: "off" }, { hint: x.fields.relationshipHint, className: "sm:col-span-2" })}
                  </div>
                </fieldset>
              ) : null}

              <fieldset className="flex flex-col gap-2">
                <legend className={cn("mb-2 text-[13px] font-semibold text-primary", !forOther && "sr-only")}>{forOther ? x.contactTitle : x.contactTitleSelf}</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
                  {field("first", forOther ? x.fields.first : bookingCopy.fields.first, { autoComplete: "given-name", required: true, "data-error": x.missing.first } as InputHTMLAttributes<HTMLInputElement>)}
                  {field("last", forOther ? x.fields.last : bookingCopy.fields.last, { autoComplete: "family-name", required: true, "data-error": x.missing.last } as InputHTMLAttributes<HTMLInputElement>)}
                  {forOther ? null : field("preferredName", rx.preferredName, { autoComplete: "nickname" }, { hint: rx.preferredHint })}
                  {forOther ? null : field("pronouns", rx.pronouns, { autoComplete: "off" }, { hint: rx.pronounsHint })}
                  {field("email", bookingCopy.fields.email, { type: "email", autoComplete: "email", inputMode: "email", required: true })}
                  {field("phone", bookingCopy.fields.phone, { type: "tel", autoComplete: "tel", inputMode: "tel", required: true })}
                </div>
                <div className="mt-2 flex flex-col gap-2">
                  <GroupLabel>{x.card.label}</GroupLabel>
                  <Choice options={x.card.options} value={card} onChange={setCard} ariaLabel={x.card.label} className="flex-wrap" />
                  {card === 0 ? (
                    field("card", forOther ? x.fields.cardSomeoneElse : bookingCopy.fields.card, { inputMode: "numeric", pattern: "[0-9]{4}", maxLength: 4, autoComplete: "off", "data-error": x.cardError } as InputHTMLAttributes<HTMLInputElement>, { hint: x.cardDigitsHint })
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
                        {quebec ? x.quebecNote : card === 2 && service.key !== "family" ? x.card.noneOther : x.card.notes[card - 1]}
                      </p>
                    </>
                  )}
                </div>
              </fieldset>

              {visit?.claim ? (
                <fieldset className="flex flex-col gap-2">
                  <legend className="mb-1 text-[13px] font-semibold text-primary">{x.claimTitle[visit.claim]}</legend>
                  <p className="mb-1 text-[13px] leading-[1.5] text-muted">{who === 1 ? x.claimHintExisting : x.claimHint}</p>
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
                <Textarea id="book-notes" name="notes" defaultValue={str("notes")} rows={4} className="resize-y" aria-describedby={noteUrgent ? "book-notes-urgent" : undefined} onInput={(e) => {
                    setNoteUrgent(isEmergencyNote(e.currentTarget.value, ageDaysIn(e.currentTarget.form)));
                    urgentOk.current = false;
                    setUrgentHold(false);
                  }} />
              </FieldLabel>
              {noteUrgent ? (
                <div id="book-notes-urgent" role="status" tabIndex={-1} className="pretty flex flex-col gap-2.5 rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink outline-none">
                  <p>{linkPhones(infantFever ? x.infantFever : bookingCopy.noteUrgent)}</p>
                  {infantFever ? null : urgentHold ? (
                    <>
                      <p className="text-[16px]">{bookingCopy.urgentHold}</p>
                      <button
                        type="button"
                        className="self-start border-b-[1.5px] border-ink text-left font-semibold"
                        onClick={(e) => {
                          urgentOk.current = true;
                          e.currentTarget.closest("form")?.requestSubmit();
                        }}
                      >
                        {bookingCopy.urgentContinue}
                      </button>
                    </>
                  ) : null}
                </div>
              ) : null}
              <div className="flex flex-col gap-2.5">
                {/* Both physicians are men; the FAQ offers a female nurse for examinations, so it can be asked for here
                    (a tester wrote it in the note and could not tell whether anyone would see it). */}
                {service.key === "family" && visit?.key !== "pap" && !(visit?.modes && mode > 0) ? (
                  <ConsentRow name="femaleNurse" defaultChecked={details.femaleNurse === true}>
                    {x.femaleNurse}
                  </ConsentRow>
                ) : null}
                {/* Reminders are care messages, not marketing (CASL), so they start ticked: four testers missed an empty box. */}
                <ConsentRow name="reminders" defaultChecked={details.reminders !== false}>
                  {x.reminders}
                </ConsentRow>
                {/* A 15-year-old booking birth control worried what a reminder on a shared phone would say (round 20). */}
                {sensitive ? <p className="text-[13px] leading-[1.5] text-muted">{x.remindersPrivate}</p> : null}
                <ConsentRow name="updates" defaultChecked={details.updates === true}>
                  {x.updates}
                  <SmartLink to="privacy" target="_blank" rel="noopener" className="font-semibold text-link">
                    {bookingCopy.consentLink}
                  </SmartLink>
                  .
                </ConsentRow>
              </div>
              <SubmitButton>{bookingCopy.next}</SubmitButton>
              </>
              )}
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
            {noToday ? <p id="no-same-day" className="pretty -mt-2 text-[13px] leading-[1.5] text-muted">{linkPhones(x.noSameDay)}</p> : null}
            <div role="radiogroup" aria-label="Day" aria-describedby={noToday ? "no-same-day" : undefined} onKeyDown={radioKeys} className="rm-day-strip scroll-x -mx-1 flex gap-1 px-1 py-0.5 md:gap-1.5">
              {dayList.map((d, i) => {
                const on = dayIdx === i;
                return (
                  <button
                    key={d.iso}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    aria-disabled={d.open ? undefined : true}
                    tabIndex={rovingTab(on, i, true)}
                    aria-label={`${d.today ? `${x.todayShort}, ` : ""}${d.dow} ${MON[d.date.getMonth()]} ${d.num}${d.open ? "" : `, ${x.closedShort.toLowerCase()}`}`}
                    onClick={() => {
                      setDayIdx(i);
                      setSlot(null);
                    }}
                    className={cn("flex min-w-[40px] flex-1 flex-col items-center gap-0.5 rounded-[12px] border-[1.5px] px-0.5 py-2 transition-all duration-[250ms] md:rounded-[14px] md:px-1 md:py-2.5", selClass(on), !d.open && !on && "border-dashed text-muted")}
                  >
                    <span className="text-[13px] font-semibold opacity-70 md:text-[13px]">{d.today ? x.todayShort : d.dow}</span>
                    <span className="font-display text-[17px] md:text-[20px]">{d.num}</span>
                    {visit?.days === "womensday" ? <span className="text-[13px] font-semibold md:text-[13px]">{MON[d.date.getMonth()]}</span> : null}
                    <span className="text-[11px] font-semibold md:text-[13px]">{d.open ? " " : x.closedShort}</span>
                  </button>
                );
              })}
            </div>
            <span className="sr-only" aria-live="polite">
              {day && day.open ? x.timesFor(`${day.dow} ${MON[day.date.getMonth()]} ${day.num}`, slots.length) : ""}
            </span>
            {day && day.open ? (
              <span aria-hidden className="text-[13px] font-semibold text-secondary">
                {x.timesOn(day.today ? `${x.todayShort.toLowerCase()}, ${MON[day.date.getMonth()]} ${day.num}` : `${day.dow} ${MON[day.date.getMonth()]} ${day.num}`)}
              </span>
            ) : null}
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
            {/* Fasting since midnight, 9:20am, and the first time today was 11am (round 23). */}
            {visit?.fasting && dayIdx === 0 && day && !day.slots.some((t) => t < 10) ? <p className="text-[13px] font-semibold leading-[1.5] text-ink">{linkPhones(x.fastingNoneToday)}</p> : null}
            <div className="flex gap-2 md:gap-2.5">
              <button type="button" onClick={() => setState(1)} className={buttonClass("outline", "md", "shrink-0")}>
                <span aria-hidden>‹</span> {bookingCopy.back}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (slot != null) setState(3);
                }}
                aria-disabled={slot == null || undefined}
                // No time yet: an outline with readable text, not grey on grey (a low-vision tester thought the page had stopped).
                className={buttonClass(slot == null ? "outline" : "secondary", "md", "flex-1", slot == null && "cursor-not-allowed")}
              >
                {slot == null ? bookingConfirmLabel.noSlot : bookingConfirmLabel.review}
              </button>
            </div>
            <div className="flex flex-col gap-2.5 rounded-row bg-sun-tint px-5 py-[18px] text-[14px] leading-[1.5] text-ink">
              <span className="font-semibold">{bookingCopy.waitlistTitle}</span>
              <span className="text-secondary">{bookingCopy.waitlistBody}</span>
              <button type="button" onClick={waitlist} disabled={busy} className="self-start border-b-[1.5px] border-ink font-semibold text-ink disabled:opacity-60">
                {bookingCopy.waitlistLink}<span aria-hidden> ›</span>
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
              {noteUrgent && urgentOk.current ? <p className="pretty rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink">{linkPhones(x.urgentAfter)}</p> : null}
            </div>
            <dl className="flex flex-col divide-y divide-border rounded-row border border-border bg-white text-[14px] leading-[1.5]">
              {reviewRows.map(([k, v]) => (
                <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
                  <dt className="shrink-0 text-muted">{k}</dt>
                  <dd className={cn("min-w-0 break-words font-semibold", v.length < 60 && "sm:text-right")}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
              {/* Text links end in " ›", as everywhere else. */}
              <button type="button" onClick={() => setState(1)} className="text-link hover:opacity-80">
                {x.review.editDetails}<span aria-hidden> ›</span>
              </button>
              <button type="button" onClick={() => setState(2)} className="text-link hover:opacity-80">
                {x.review.changeTime}<span aria-hidden> ›</span>
              </button>
            </div>
            <button
              type="button"
              onClick={confirm}
              disabled={busy}
              aria-busy={busy || undefined}
              className={buttonClass("secondary", "md")}
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
                  <a href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsFor(day, slot, bookingCopy.calendarTitle, visit?.mins, (visit?.fasting || visit?.fastingMaybe) && slot < 10 ? fastLine(slot) : undefined))}`} download="restoration-medical.ics" className={buttonClass("primary", "md")}>
                    {bookingCopy.confirmed.calendar}
                  </a>
                  {/* No directions for a phone or video visit. Outline next to the one primary (it was a borderless white pill). */}
                  {visit?.modes && mode > 0 ? null : (
                    <Button to="contact#clinics" variant="outline">
                      {bookingCopy.confirmed.directions}
                    </Button>
                  )}
                  {/* Was "Reschedule or cancel", which only started a new booking: people could not tell whether their visit still stood. */}
                  <button type="button" onClick={reset} className={ghost}>
                    {x.bookAnother}
                  </button>
                </>
              }
            >
              <p>{reminders ? (day?.today ? `${bookingCopy.confirmed.body.split(". ")[0]}. ${x.todayReminder}` : day?.tomorrow ? `${bookingCopy.confirmed.body.split(". ")[0]}. ${x.tomorrowReminder}` : bookingCopy.confirmed.body) : x.confirmed.noReminders}</p>
              <p className="text-[14px]">{linkPhones(day?.today ? x.changeOrCancelToday : slot != null && slot < 12 ? x.changeOrCancelMorning : x.changeOrCancel)}</p>
              {language === 2 ? <p className="text-[14px]">{x.interpreterBooked(languageName)}</p> : null}
              {service.key === "family" && details.femaleNurse === true && visit?.key !== "pap" ? <p className="text-[14px]">{x.femaleNurseBooked}</p> : null}
              {/* A Pap visit is with a nurse; say it again on the last page (a tester was 85% sure before). */}
              {visit?.key === "pap" ? <p className="text-[14px]">{x.papBooked}</p> : null}
              {noteUrgent && urgentOk.current ? <p className="pretty rounded-tile bg-[color:var(--div-pain)] px-4 py-3 text-[14px] font-semibold leading-[1.5] text-ink">{linkPhones(x.urgentAfter)}</p> : null}
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <OutcomeTile k={x.confirmed.service}>
                  <span className="text-[16px] font-semibold">
                    {service.label}
                    <span className="sr-only">,</span>
                  </span>
                  {/* Sensitive reasons stay on the review only: the confirmation stays on screen (a 16-year-old on a
                      family iPad, round 19). Drip names and other plain reasons show (round 20). */}
                  {visit ? <span className="text-[13px] text-muted">{shownReason ? `${visit.label} (${shownReason})` : visit.label}</span> : null}
                </OutcomeTile>
                <OutcomeTile k={bookingCopy.confirmed.when}>
                  <span className="text-[16px] font-semibold">
                    {slotLabel}
                    <span className="sr-only">,</span>
                  </span>
                  {forOther && patientName ? <span className="text-[13px] text-muted">{`${x.confirmed.for} ${patientName}`}</span> : null}
                  <span className="text-[13px] text-muted">{`${registerCopy.fields.language}: ${languageName}`}</span>
                </OutcomeTile>
                <OutcomeTile k={bookingCopy.confirmed.where}>
                  {visit?.modes && mode > 0 ? (
                    <>
                      <span className="text-[16px] font-semibold">{x.modeWhere[mode]}</span>
                      <span className="text-[13px] text-muted">{x.modeHow[mode]}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[16px] font-semibold">
                        {bookingCopy.confirmed.whereValue}
                        <span className="sr-only">,</span>
                      </span>
                      <span className="text-[13px] text-muted">{bookingCopy.confirmed.whereSub}</span>
                    </>
                  )}
                </OutcomeTile>
                <OutcomeTile k={x.confirmed.coverage}>
                  <span className="text-[16px] font-semibold">{coverage}</span>
                  {visit?.claim && claimLine() ? <span className="text-[13px] text-muted">{`${x.review.keys.claim}: ${claimLine()}`}</span> : null}
                  {/* The insurer showed on review, then vanished here: a tester wondered if it was saved. */}
                  {visit?.payment && payment === 0 && str("benefitsInsurer") ? <span className="text-[13px] text-muted">{`${x.review.keys.insurer}: ${str("benefitsInsurer")}`}</span> : null}
                </OutcomeTile>
              </div>
              {str("notes") ? (
                <OutcomeTile k={x.confirmNote}>
                  <span className="whitespace-pre-line text-[14px] leading-[1.5]">{str("notes")}</span>
                </OutcomeTile>
              ) : null}
              <OutcomeTile k={visit?.modes && mode > 0 ? x.haveReady : bookingCopy.confirmed.bring}>
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
                <span className="text-[16px] font-semibold">{serviceShort}</span>
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
