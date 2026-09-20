"use client";

import { useState } from "react";
import { Chooser, OptionList } from "@/components/ui";
import type { DeepDive } from "@/content/deep";
import { bodySpots, deepModuleCopy } from "@/content/deep";
import type { ChooserOption, DivisionKey } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * Pain Centre body map: a 220 x 460 silhouette drawn from six ink-12% shapes
 * with eight 44px hotspots positioned absolutely at the prototype's
 * coordinates. The compact option list beside it stays in sync. The figure
 * is hidden below the sm breakpoint, where the list alone does the job.
 */
function PainMap({ options, value, onChange }: { options: ChooserOption[]; value: number; onChange: (i: number) => void }) {
  return (
    <div className="flex flex-col items-start gap-5 pt-1.5 sm:flex-row sm:items-center">
      <div role="radiogroup" aria-label={deepModuleCopy.painMapLabel} className="relative hidden h-[460px] w-[220px] flex-none sm:block">
        <div aria-hidden className="absolute left-1/2 top-0 -ml-8 h-16 w-16 rounded-full bg-ink/12" />
        <div aria-hidden className="absolute left-1/2 top-[66px] -ml-[75px] h-[190px] w-[150px] rounded-[60px_60px_40px_40px] bg-ink/12" />
        <div aria-hidden className="absolute left-3 top-20 h-[180px] w-[34px] rotate-[8deg] rounded-[20px] bg-ink/12" />
        <div aria-hidden className="absolute right-3 top-20 h-[180px] w-[34px] -rotate-[8deg] rounded-[20px] bg-ink/12" />
        <div aria-hidden className="absolute left-1/2 top-[250px] -ml-[66px] h-[210px] w-[60px] rounded-[30px] bg-ink/12" />
        <div aria-hidden className="absolute left-1/2 top-[250px] ml-1.5 h-[210px] w-[60px] rounded-[30px] bg-ink/12" />
        {bodySpots.map((b) => {
          const on = value === b.optionIndex;
          return (
            <button
              key={b.label}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={b.label}
              title={b.label}
              onClick={() => onChange(b.optionIndex)}
              className={cn(
                "absolute -m-[22px] flex h-11 w-11 items-center justify-center rounded-full border-2 text-[11px] font-semibold shadow-hotspot transition-all duration-[250ms]",
                on ? "scale-[1.15] border-ink bg-ink text-white" : "border-terracotta bg-white text-ink hover:scale-105",
              )}
              style={{ left: b.x, top: b.y }}
            >
              {b.short}
            </button>
          );
        })}
      </div>
      <div className="flex w-full flex-1 flex-col gap-1.5">
        <span className="hidden pb-1 text-[12px] font-semibold text-muted sm:block">{deepModuleCopy.painHint}</span>
        <OptionList options={options} value={value} onChange={onChange} compact ariaLabel={deepModuleCopy.painMapLabel} />
      </div>
    </div>
  );
}

/** Deep-dive chooser for a division. Pain swaps the option list for the body map plus a compact list. */
export function DeepDiveChooser({ k, dive }: { k: DivisionKey; dive: DeepDive }) {
  const [pick, setPick] = useState(0);
  return (
    <Chooser
      id="chooser"
      eyebrow={dive.chooser.eyebrow}
      title={dive.chooser.title}
      intro={dive.chooser.intro}
      options={dive.chooser.options}
      results={dive.results}
      tint={dive.tint}
      accent={dive.accent}
      value={pick}
      onChange={setPick}
      left={k === "pain" ? <PainMap options={dive.chooser.options} value={pick} onChange={setPick} /> : undefined}
    />
  );
}
