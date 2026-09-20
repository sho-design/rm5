"use client";

import { useId, useState } from "react";
import { Button, Display, Eyebrow } from "@/components/ui";
import { amIDueTitle, deepModuleCopy } from "@/content/deep";
import { screeningDue } from "@/content/prevention";
import { cn } from "@/lib/cn";

/**
 * Family Medicine deep dive: "Am I due?" Navy control card (Female / Male,
 * age slider 18 to 85) beside a white card listing the screenings that apply.
 */
export function AmIDue() {
  const c = deepModuleCopy.amIDue;
  const [age, setAge] = useState<number>(c.ageDefault);
  const [sex, setSex] = useState(0);
  const id = useId();
  const rows = screeningDue(age, sex === 0);
  return (
    <section className="grid grid-cols-1 gap-block px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
      <div className="flex flex-col gap-7 rounded-block bg-inverse p-6 text-on-inverse md:p-10">
        <div className="flex flex-col gap-2.5">
          <Eyebrow tone="sun">{c.eyebrow}</Eyebrow>
          <Display size="2xs">{c.title}</Display>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] text-white/60">{c.iAm}</span>
          <div role="radiogroup" aria-label={c.iAm} className="flex gap-1.5">
            {c.sexes.map((label, i) => {
              const on = sex === i;
              return (
                <button
                  key={label}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setSex(i)}
                  className={cn("flex-1 rounded-chip border-[1.5px] border-white/25 py-3 text-center text-[14px] font-semibold transition-colors duration-[250ms]", on ? "bg-sun text-sun-ink" : "bg-transparent text-white hover:border-white/50")}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-end justify-between text-[13px] text-white/60">
            <label htmlFor={id}>{c.age}</label>
            <span className="font-display text-[32px] leading-none text-white" aria-live="polite">
              {age}
            </span>
          </div>
          <input id={id} type="range" min={c.ageMin} max={c.ageMax} value={age} onChange={(e) => setAge(Number(e.target.value))} />
        </div>
        <span className="text-[13px] leading-[1.5] text-white/60">{c.note}</span>
      </div>

      <div className="flex flex-col gap-[18px] rounded-block border border-border bg-raised p-6 md:p-10">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="display-tight text-[24px] md:text-[28px]">{amIDueTitle(rows.length, age)}</span>
          <span className="text-[13px] text-muted">{c.coverage}</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.t} className="flex flex-col gap-1.5 rounded-tile bg-sky-soft px-5 py-[18px]">
              <span className="text-[16px] font-semibold">{r.t}</span>
              <span className="text-[13px] leading-[1.45] text-secondary">{r.d}</span>
              <span className="pt-1 text-[12px] font-semibold text-link">{r.how}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <Button to="book">{c.cta}</Button>
        </div>
      </div>
    </section>
  );
}
