"use client";

import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { draft } from "@/content/review";
import { radioKeys, rovingTab } from "@/lib/a11y";
import { Input, Select } from "@/components/ui/Form";
import { buttonClass } from "@/components/ui/Button";

/** Selected / idle styles for the prototype's `sel()` chips: ink fill when on, white with a line border when off. */
export const selClass = (on: boolean) => (on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky");

/** 12px-radius segmented choice that fills its row (New patient / Existing patient, English / Tiếng Việt). */
export function Choice({ options, value, onChange, ariaLabel, className }: { options: readonly string[]; value: number; onChange: (i: number) => void; ariaLabel: string; className?: string }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} onKeyDown={radioKeys} className={cn("flex gap-1.5 md:gap-2", className)}>
      {options.map((o, i) => {
        const on = value === i;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={rovingTab(on, i, value >= 0)}
            onClick={() => onChange(i)}
            className={cn("flex-1 rounded-field border-[1.5px] px-2 py-[11px] text-center text-[13px] font-semibold transition-all duration-[250ms] md:py-3 md:text-[14px]", selClass(on))}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

/** Pill chip used for services, family members and contact topics. */
export function PillChip({ on, children, size = "md", role = "radio", ...rest }: ComponentProps<"button"> & { on: boolean; size?: "sm" | "md" }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      className={cn(
        "max-w-full shrink-0 rounded-chip border-[1.5px] text-left leading-tight transition-all duration-[250ms]",
        size === "md" ? "px-3.5 py-2.5 text-[13px] font-medium md:px-[18px] md:py-3 md:text-[14px]" : "px-3.5 py-[9px] text-[13px] font-semibold",
        selClass(on),
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/** 12px muted label over a control, as the prototype's form fields. */
export function FieldLabel({ label, hint, error, children, className, htmlFor }: { label: string; hint?: string; error?: string; children: ReactNode; className?: string; htmlFor: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* Secondary, not muted: a low-vision tester could not read pale labels on the panel. */}
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-secondary">
        {label}
      </label>
      {children}
      {hint ? (
        <span id={`${htmlFor}-hint`} className="text-[12px] text-muted">
          {hint}
        </span>
      ) : null}
      <FieldError id={htmlFor} error={error} />
    </div>
  );
}

/** Inline error under a field, linked to it by `${id}-error` (see errorProps in lib/validate). */
export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <span id={`${id}-error`} className="text-[12px] font-semibold text-[color:var(--status-error-fg)]">
      {error}
    </span>
  );
}

/** Consent row: 18px tile checkbox with rich label text (links inside). */
export function ConsentRow({ children, className, error, ...rest }: ComponentProps<"input"> & { children: ReactNode; error?: string }) {
  const row = (
    <label className={cn("flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-secondary", className)}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <span aria-hidden className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-border-strong bg-white text-[11px] text-white transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sky">
        ✓
      </span>
      <span>{children}</span>
    </label>
  );
  if (!error || !rest.id) return row;
  return (
    <div className="flex flex-col gap-1">
      {row}
      <FieldError id={rest.id} error={error} />
    </div>
  );
}

/** Sky submit pill (the booking-step colour), the shared Button shape and size, with the " ›" chevron. */
export function SubmitButton({ children, trailing = true, busy, className, ...rest }: ComponentProps<"button"> & { trailing?: boolean; busy?: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy}
      aria-busy={busy || undefined}
      className={buttonClass("secondary", "md", className)}
      {...rest}
    >
      {children}
      {trailing ? <span aria-hidden> ›</span> : null}
    </button>
  );
}

/** Rounded paper panel that holds a form step (36px padding desktop, 18px mobile). */
export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-[14px] rounded-[20px] border border-border bg-card p-[18px] md:gap-[22px] md:rounded-block md:p-9", className)}>{children}</div>;
}

/** White tile inside an outcome card ("When", "Where", "Bring"). */
export function OutcomeTile({ k, children, className }: { k: string; children: ReactNode; className?: string }) {
  return (
    <dl className={cn("flex flex-col gap-1 rounded-row bg-white px-5 py-[18px] text-primary", className)}>
      <dt className="text-[12px] font-semibold text-muted">{k}</dt>
      <dd className="flex flex-col gap-1">{children}</dd>
    </dl>
  );
}

/** Shown when a date of birth was started but is not a real date (new wording, docs/content-review.md). */
const dobCheck = draft("Check the date of birth: a day, a month and a 4-digit year, for example 14 March 1956.");

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Date of birth as Day, Month (named) and Year. Replaces the native date
 * input: a keyboard tester got stuck tabbing through its segments and typed
 * later answers into it, and phones showed MM/DD/YYYY, which Canadians
 * may read day first. A visually hidden input carries the YYYY-MM-DD value,
 * the name and the required rule, so validation and form reading work as
 * before; it hands focus to the Day field.
 */
export function DobInput({ id, name, label, required, autoComplete, error, ...rest }: { id: string; name: string; label: string; required?: boolean; autoComplete?: string; error?: boolean; "data-error"?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }) {
  const [d, setD] = useState("");
  const [m, setM] = useState("");
  const [y, setY] = useState("");
  const dayRef = useRef<HTMLInputElement>(null);
  const dd = d.replace(/\D/g, "");
  const yy = y.replace(/\D/g, "");
  // A real calendar date (no 31 February) with a 4-digit year.
  const real = (() => {
    if (!dd || !m || yy.length !== 4) return false;
    const dt = new Date(Number(yy), Number(m) - 1, Number(dd));
    // Not in the future, and not more than 125 years ago.
    const now = new Date();
    return dt.getFullYear() === Number(yy) && dt.getMonth() === Number(m) - 1 && dt.getDate() === Number(dd) && dt <= now && Number(yy) > now.getFullYear() - 125;
  })();
  const value = real ? `${yy}-${m.padStart(2, "0")}-${dd.padStart(2, "0")}` : "";
  /** Started but not a real date: say what is wrong instead of "Add your date of birth". */
  const partial = !real && !!(dd || m || yy);
  const bad = error || rest["aria-invalid"];
  const auto = autoComplete === "bday";
  // Wraps instead of squeezing: on a small phone the month box shrank to its arrow and hid the chosen month.
  return (
    <div className="flex flex-wrap gap-2">
      <input
        id={id}
        name={name}
        value={value}
        onChange={() => undefined}
        required={required}
        pattern="\d{4}-\d{2}-\d{2}"
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        onFocus={() => {
          dayRef.current?.focus({ preventScroll: true });
          dayRef.current?.scrollIntoView({ block: "center" });
        }}
        data-error={partial ? dobCheck : rest["data-error"]}
      />
      <Input
        ref={dayRef}
        id={`${id}-day`}
        inputMode="numeric"
        maxLength={2}
        placeholder="DD"
        autoComplete={auto ? "bday-day" : "off"}
        aria-label={`${label}, day`}
        aria-required={required || undefined}
        aria-invalid={bad || undefined}
        aria-describedby={rest["aria-describedby"]}
        value={d}
        onChange={(e) => setD(e.target.value.replace(/\D/g, ""))}
        className="flex-none px-3"
        style={{ width: "4rem" }}
      />
      <Select
        id={`${id}-month`}
        autoComplete={auto ? "bday-month" : "off"}
        aria-label={`${label}, month`}
        aria-required={required || undefined}
        aria-invalid={bad || undefined}
        aria-describedby={rest["aria-describedby"]}
        value={m}
        onChange={(e) => setM(e.target.value)}
        className="min-w-[8.5rem] flex-1 pl-3 pr-9"
        style={{ width: "auto" }}
      >
        <option value="">Month</option>
        {MONTHS.map((n, i) => (
          <option key={n} value={String(i + 1)}>
            {n}
          </option>
        ))}
      </Select>
      <Input
        id={`${id}-year`}
        inputMode="numeric"
        maxLength={4}
        placeholder="YYYY"
        autoComplete={auto ? "bday-year" : "off"}
        aria-label={`${label}, year`}
        aria-required={required || undefined}
        aria-invalid={bad || undefined}
        aria-describedby={rest["aria-describedby"]}
        value={y}
        onChange={(e) => setY(e.target.value.replace(/\D/g, ""))}
        className="flex-none px-3"
        style={{ width: "5.25rem" }}
      />
    </div>
  );
}
