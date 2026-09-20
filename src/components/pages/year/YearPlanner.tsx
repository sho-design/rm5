"use client";

import { useState, type ReactNode } from "react";
import { yearSeasons } from "@/content/prevention";
import { SmartLink } from "@/components/ui";
import { cn } from "@/lib/cn";

const SEX = ["Female", "Male"] as const;

/**
 * Your year: navy controls card (Female / Male pills and an 18 to 85 age
 * slider with a Fraunces readout) beside the page header, driving the four
 * season cards below.
 */
export function YearPlanner({ header }: { header: ReactNode }) {
  const [age, setAge] = useState(45);
  const [sex, setSex] = useState<(typeof SEX)[number]>("Female");
  const seasons = yearSeasons(age, sex === "Female");
  return (
    <>
      <section className="grid grid-cols-1 items-end gap-8 px-4 pt-10 md:px-content md:pt-16 lg:grid-cols-2 lg:gap-10">
        {header}
        <div className="grid grid-cols-1 items-center gap-5 rounded-card bg-inverse p-6 text-on-inverse sm:grid-cols-2 lg:px-8 lg:py-7">
          <div className="flex flex-col gap-2">
            <span id="year-sex-label" className="text-[12px] text-white/60">
              I am
            </span>
            <div role="radiogroup" aria-labelledby="year-sex-label" className="flex gap-1.5">
              {SEX.map((s) => {
                const on = sex === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setSex(s)}
                    className={cn(
                      "flex-1 rounded-chip border-[1.5px] border-white/25 px-2.5 py-2.5 text-center text-[13px] font-semibold transition-all duration-[250ms]",
                      on ? "bg-sun text-sun-ink" : "bg-transparent text-white hover:border-white/60",
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[12px] text-white/60">
              <label htmlFor="year-age">My age</label>
              <span className="font-display text-[26px] leading-none text-white" aria-live="polite">
                {age}
              </span>
            </div>
            <input id="year-age" type="range" min={18} max={85} value={age} onChange={(e) => setAge(+e.target.value)} className="w-full" style={{ accentColor: "var(--rm-sun)" }} />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-card px-4 pt-8 md:grid-cols-2 md:px-content md:pt-10 lg:grid-cols-4" aria-live="polite">
        {seasons.map((s) => (
          <div key={s.name} className="flex min-h-[260px] flex-col gap-4 rounded-card p-6 text-ink lg:min-h-[340px] lg:p-7" style={{ background: s.bg }}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="display text-[28px] tracking-[-.02em] lg:text-[30px]">{s.name}</span>
              <span className="text-[12px] font-semibold text-muted">{s.months}</span>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              {s.items.map((i) => (
                <SmartLink key={i.t} to={i.page} className="flex flex-col gap-0.5 rounded-[14px] bg-white/75 px-3.5 py-3 transition-colors hover:bg-white">
                  <span className="text-[14px] font-semibold">{i.t}</span>
                  <span className="text-[12px] text-muted">{i.svc}</span>
                </SmartLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
