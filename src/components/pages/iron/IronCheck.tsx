"use client";

import { useState } from "react";
import { ironTally, type IronSymptom } from "@/content/iron";
import { CheckChip, Display, Eyebrow, Section } from "@/components/ui";

/**
 * "Is this you?" symptom check: sticky intro left with the live tally line,
 * eight tappable symptom chips right (two columns on desktop).
 */
export function IronCheck({ symptoms, accent }: { symptoms: IronSymptom[]; accent: string }) {
  const [sel, setSel] = useState<number[]>([]);
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  const tally = ironTally(sel.length);
  return (
    <Section id="iron-check" className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-12">
      <div className="flex flex-col gap-3.5 lg:sticky lg:top-6">
        <Eyebrow tone="inherit" style={{ color: accent }}>
          Is this you?
        </Eyebrow>
        <Display size="sm">Low iron hides in everyday feelings.</Display>
        <p className="pretty text-[16px] leading-[1.55] text-muted">Tap what sounds familiar. Three or more is a good reason to check your ferritin. A blood test is the only way to know.</p>
        <span className="min-h-[20px] text-[15px] font-semibold text-ink" aria-live="polite">
          {tally}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {symptoms.map((sy, i) => (
          <CheckChip key={sy.label} label={sy.label} sub={sy.sub} on={sel.includes(i)} onToggle={() => toggle(i)} />
        ))}
      </div>
    </Section>
  );
}
