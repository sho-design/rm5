"use client";

import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Selected / idle styles for the prototype's `sel()` chips: ink fill when on, white with a line border when off. */
export const selClass = (on: boolean) => (on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky");

/** 12px-radius segmented choice that fills its row (New patient / Existing patient, English / Tiếng Việt). */
export function Choice({ options, value, onChange, ariaLabel, className }: { options: readonly string[]; value: number; onChange: (i: number) => void; ariaLabel: string; className?: string }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn("flex gap-1.5 md:gap-2", className)}>
      {options.map((o, i) => {
        const on = value === i;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
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
        "shrink-0 rounded-chip border-[1.5px] transition-all duration-[250ms]",
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
export function FieldLabel({ label, hint, children, className, htmlFor }: { label: string; hint?: string; children: ReactNode; className?: string; htmlFor: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[12px] font-semibold text-muted">
        {label}
      </label>
      {children}
      {hint ? <span className="text-[12px] text-muted">{hint}</span> : null}
    </div>
  );
}

/** Consent row: 18px tile checkbox with rich label text (links inside). */
export function ConsentRow({ children, className, ...rest }: ComponentProps<"input"> & { children: ReactNode }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-[13px] leading-[1.5] text-secondary", className)}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <span aria-hidden className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border-[1.5px] border-border bg-white text-[11px] text-white transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sky">
        ✓
      </span>
      <span>{children}</span>
    </label>
  );
}

/** Full-width sky submit pill (16px padding, 15px semibold) with the " ›" chevron. */
export function SubmitButton({ children, trailing = true, busy, className, ...rest }: ComponentProps<"button"> & { trailing?: boolean; busy?: boolean }) {
  return (
    <button
      type="submit"
      disabled={busy}
      aria-busy={busy || undefined}
      className={cn("rounded-chip bg-sky px-4 py-[14px] text-center text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[.98] disabled:opacity-60 md:py-4 md:text-[15px]", className)}
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
    <div className={cn("flex flex-col gap-1 rounded-row bg-white px-5 py-[18px] text-primary", className)}>
      <span className="text-[12px] font-semibold text-muted">{k}</span>
      {children}
    </div>
  );
}
