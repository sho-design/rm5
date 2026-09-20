"use client";

import { useState } from "react";
import { Button, Display, Eyebrow, FactGrid, OptionList } from "@/components/ui";
import type { CoverageOption } from "@/content/deep";
import { deepModuleCopy } from "@/content/deep";

/**
 * Rehab & Recovery deep dive: pick how you are covered on the left, see the
 * upfront cost, explanation, facts and CTA on the navy card to the right.
 */
export function CoverageChecker({ options }: { options: CoverageOption[] }) {
  const c = deepModuleCopy.coverage;
  const [pick, setPick] = useState(0);
  const cov = options[pick] ?? options[0];
  return (
    <section className="grid grid-cols-1 gap-block px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.3fr] lg:items-stretch">
      <div className="flex flex-col gap-5 rounded-block border border-border bg-card p-6 md:p-10">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="inherit" className="text-amber-deep">
            {c.eyebrow}
          </Eyebrow>
          <Display size="2xs">{c.title}</Display>
        </div>
        <OptionList options={options.map((o) => ({ label: o.label }))} value={pick} onChange={setPick} onWhite ariaLabel={c.title} />
      </div>
      <div className="flex flex-col justify-between gap-7 rounded-block bg-inverse p-6 text-on-inverse md:p-10">
        <div className="flex flex-col gap-[18px]">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-white/60">{c.payLabel}</span>
            <span className="display-tight text-[48px] text-sun md:text-[64px]" aria-live="polite">
              {cov.upfront}
            </span>
          </div>
          <p className="pretty text-[16px] leading-[1.55] text-white/80">{cov.p}</p>
        </div>
        <FactGrid facts={cov.facts} inverse />
        <Button to="book" variant="inverse" fullWidth>
          {cov.cta}
        </Button>
      </div>
    </section>
  );
}
