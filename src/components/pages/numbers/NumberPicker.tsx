"use client";

import { useState } from "react";
import type { NumberCard } from "@/content/prevention";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

/**
 * Know your numbers: a picker list (320px column on desktop, a horizontal
 * chip scroller on mobile) and a tinted detail card with the range band,
 * what it measures, low / high notes, how often and a CTA.
 */
export function NumberPicker({ numbers }: { numbers: NumberCard[] }) {
  const [pick, setPick] = useState(0);
  const num = numbers[pick] ?? numbers[0];
  return (
    <div className="grid grid-cols-1 items-start gap-block px-0 pt-8 md:px-content md:pt-10 lg:grid-cols-[320px_1fr]">
      <div
        role="radiogroup"
        aria-label="Pick a number"
        className="scroll-x flex gap-1.5 px-4 md:mx-0 md:px-0 lg:flex-col lg:gap-1 lg:rounded-card-sm lg:border lg:border-border lg:p-2.5"
      >
        {numbers.map((n, i) => {
          const on = i === pick;
          return (
            <button
              key={n.name}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPick(i)}
              className={cn(
                "flex shrink-0 items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-left text-[15px] font-semibold transition-all duration-[250ms] lg:py-3.5",
                on ? "bg-ink text-white" : "bg-card text-ink hover:bg-white lg:bg-transparent lg:hover:bg-card",
              )}
            >
              <span>{n.name}</span>
              <span className="text-[12px] opacity-60">{n.unit}</span>
            </button>
          );
        })}
      </div>

      <div className="mx-4 flex min-h-[520px] flex-col gap-6 rounded-card p-6 text-ink md:mx-0 md:p-8 lg:p-10" style={{ background: num.tint }} aria-live="polite">
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-muted">{num.full}</span>
          <span className="display-tight text-[36px] leading-none lg:text-[44px]">{num.name}</span>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">{num.what}</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between text-[12px] font-semibold text-muted">
            <span>{num.lowLabel}</span>
            <span>Typical target</span>
            <span>{num.highLabel}</span>
          </div>
          <div className="relative h-[14px] rounded-chip" style={{ background: `linear-gradient(90deg,${num.gradient})` }}>
            <div aria-hidden className="absolute -bottom-1.5 -top-1.5 rounded-chip border-[2.5px] border-ink transition-all duration-300" style={{ left: `${num.bandL}%`, width: `${num.bandW}%` }} />
          </div>
          <div className="flex justify-center font-display text-[24px] tracking-[-.02em] lg:text-[28px]">{num.target}</div>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-row bg-white/75 px-5 py-[18px]">
            <span className="text-[12px] font-semibold text-muted">If it is low</span>
            <span className="text-[14px] leading-[1.45]">{num.ifLow}</span>
          </div>
          <div className="flex flex-col gap-1 rounded-row bg-white/75 px-5 py-[18px]">
            <span className="text-[12px] font-semibold text-muted">If it is high</span>
            <span className="text-[14px] leading-[1.45]">{num.ifHigh}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-ink/10 pt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <span className="text-[14px] text-secondary">
            <strong className="font-semibold text-ink">How often:</strong> {num.often}
          </span>
          <Button to={num.page} size="sm" className="h-[44px] px-[22px]">
            {num.cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
