"use client";

import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Label + control + hint/error wrapper. */
export function Field({ label, hint, error, required, htmlFor, children, className }: { label: string; hint?: string; error?: string; required?: boolean; htmlFor?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-primary">
        {label}
        {required ? <span className="text-muted"> (required)</span> : null}
      </label>
      {children}
      {error ? (
        <span role="alert" className="text-[12px] font-semibold text-[color:var(--status-error-fg)]">
          {error}
        </span>
      ) : hint ? (
        <span className="text-[12px] text-muted">{hint}</span>
      ) : null}
    </div>
  );
}

const control = "h-12 w-full rounded-field border-[1.5px] border-[color:var(--field-border)] bg-[var(--field-bg)] px-4 text-[15px] text-primary outline-none transition-colors placeholder:text-[var(--field-placeholder)] focus:border-[color:var(--field-border-focus)] disabled:bg-[var(--field-disabled-bg)] disabled:text-[var(--field-disabled-fg)] aria-[invalid=true]:border-[color:var(--field-border-error)]";

export const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(function Input({ className, ...rest }, ref) {
  return <input ref={ref} className={cn(control, className)} {...rest} />;
});

export const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(function Select({ className, children, ...rest }, ref) {
  return (
    <select ref={ref} className={cn(control, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230F1F2E%22 stroke-width=%222%22 stroke-linecap=%22round%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat pr-10", className)} {...rest}>
      {children}
    </select>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cn(control, "h-auto min-h-[120px] py-3 leading-[1.5]", className)} {...rest} />;
});

/** Checkbox row with a 1.5px border tile that fills ink when checked. */
export function Checkbox({ label, sub, className, ...rest }: ComponentProps<"input"> & { label: string; sub?: string }) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3 text-[15px]", className)}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-[1.5px] border-border bg-white text-[12px] text-white transition-colors peer-checked:border-ink peer-checked:bg-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sky">
        ✓
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-medium">{label}</span>
        {sub ? <span className="text-[13px] text-muted">{sub}</span> : null}
      </span>
    </label>
  );
}

/**
 * Segmented pill group (New patient / Existing patient, EN / VI). Selected
 * segment fills ink; the rest sit on white with a line border.
 */
export function Segmented({ options, value, onChange, className, ariaLabel, fullWidth }: { options: string[]; value: number; onChange: (i: number) => void; className?: string; ariaLabel?: string; fullWidth?: boolean }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((o, i) => {
        const on = value === i;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(i)}
            className={cn("rounded-chip border-[1.5px] px-[18px] py-[11px] text-[14px] font-semibold transition-all duration-[250ms]", fullWidth && "flex-1", on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky")}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
