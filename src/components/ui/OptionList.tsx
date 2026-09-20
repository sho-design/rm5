"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface OptionItem {
  label: string;
  sub?: string;
}

/**
 * Chooser option list: rows on rgba white .6, selected row fills ink with a
 * 1.5px ink border. Radio semantics.
 */
export function OptionList({
  options,
  value,
  onChange,
  compact,
  onWhite,
  className,
  ariaLabel = "Options",
}: {
  options: OptionItem[];
  value: number;
  onChange: (i: number) => void;
  /** 12/14 padding and single-line labels (pain body-map list). */
  compact?: boolean;
  /** Rows sit on a white/paper card instead of a tint: use white rows with a line border. */
  onWhite?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn("flex flex-col gap-1.5", className)}>
      {options.map((o, i) => {
        const on = value === i;
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(i)}
            className={cn(
              "flex items-center justify-between gap-3.5 text-left transition-all duration-[250ms]",
              compact ? "rounded-[14px] px-3.5 py-3" : "rounded-row px-5 py-4",
              on ? "bg-ink text-white border-[1.5px] border-ink" : onWhite ? "bg-white text-primary border-[1.5px] border-border hover:border-sky" : "bg-white/60 text-primary border-[1.5px] border-transparent hover:bg-white/80",
            )}
          >
            <span className="flex flex-col gap-0.5">
              <span className={cn("font-semibold leading-[1.3]", compact ? "text-[14px]" : "text-[16px]")}>{o.label}</span>
              {o.sub && !compact ? <span className="text-[13px] opacity-70">{o.sub}</span> : null}
            </span>
            <span aria-hidden className={cn("opacity-60", compact ? "text-[14px]" : "text-[16px]")}>
              ›
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Row of pill chips, one selected (filters, age chips, tabs). */
export function ChipRow({
  items,
  value,
  onChange,
  className,
  inverse,
  scroll = true,
  ariaLabel = "Filter",
  size = "md",
}: {
  items: string[] | { label: string; count?: number }[];
  value: number;
  onChange: (i: number) => void;
  className?: string;
  /** Sunshine selection on navy. */
  inverse?: boolean;
  scroll?: boolean;
  ariaLabel?: string;
  size?: "sm" | "md";
}) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("flex gap-1.5", scroll ? "scroll-x -mx-4 px-4 md:mx-0 md:flex-wrap md:px-0" : "flex-wrap", className)}>
      {items.map((it, i) => {
        const label = typeof it === "string" ? it : it.label;
        const count = typeof it === "string" ? undefined : it.count;
        const on = value === i;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className={cn(
              "shrink-0 rounded-chip border-[1.5px] font-semibold transition-all duration-[250ms]",
              size === "sm" ? "px-3.5 py-2 text-[13px]" : "px-[18px] py-[11px] text-[14px]",
              inverse
                ? on
                  ? "border-sun bg-sun text-sun-ink"
                  : "border-white/30 bg-transparent text-white hover:border-white/60"
                : on
                  ? "border-ink bg-ink text-white"
                  : "border-border bg-white text-primary hover:border-sky",
            )}
          >
            {label}
            {count !== undefined ? <span className={cn("ml-1.5 text-[12px]", on ? "opacity-70" : "text-muted")}>{count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

/** Tappable symptom / add-on chip with a check dot and live selection state. */
export function CheckChip({ label, sub, on, onToggle, right, tone = "sage" }: { label: string; sub?: string; on: boolean; onToggle: () => void; right?: ReactNode; tone?: "sage" | "ink" }) {
  const onBorder = tone === "sage" ? "border-sage-deep bg-sage-tint" : "border-ink bg-card";
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      onClick={onToggle}
      className={cn("flex w-full items-center gap-3.5 rounded-row border-[1.5px] px-4 py-3.5 text-left transition-all duration-[250ms]", on ? onBorder : "border-border bg-white hover:border-sky")}
    >
      <span
        aria-hidden
        className={cn("flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] text-[13px] font-semibold text-white", on ? "border-sage-deep bg-sage-deep" : "border-border bg-white")}
      >
        {on ? "✓" : ""}
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-[15px] font-semibold leading-[1.3]">{label}</span>
        {sub ? <span className="text-[13px] text-muted">{sub}</span> : null}
      </span>
      {right}
    </button>
  );
}
