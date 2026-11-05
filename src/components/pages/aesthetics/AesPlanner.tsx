"use client";

import { useState } from "react";
import { aesCopy as c, aesFamilies, aesGoalGroups, aesTreatment, type AesTreatment } from "@/content/aesthetics-menu";
import { Display, Eyebrow, SmartLink } from "@/components/ui";
import { buttonClass } from "@/components/ui/Button";
import { bookFor } from "@/lib/routes";
import { cn } from "@/lib/cn";

/**
 * "Plan your treatment": tick goals, pick a downtime comfort, and starting points rank by how many goals they cover.
 * Nothing leaves the page; the consult link carries no goals.
 */
export function AesPlanner() {
  const [goals, setGoals] = useState<string[]>([]);
  const [down, setDown] = useState(2);
  const toggle = (g: string) => setGoals((v) => (v.includes(g) ? v.filter((x) => x !== g) : [...v, g]));

  const score = new Map<string, number>();
  for (const grp of aesGoalGroups) for (const g of grp.goals) if (goals.includes(g.t)) g.ids.forEach((id, i) => score.set(id, (score.get(id) ?? 0) + 3 - Math.min(i, 2)));
  const ranked = [...score.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => aesTreatment(id)).filter((t): t is AesTreatment => Boolean(t));
  const fits = ranked.filter((t) => t.downtime <= down);
  const hidden = ranked.length - fits.length;

  return (
    <section id="plan" className="scroll-mt-6 px-4 pt-10 md:px-content md:pt-16">
      <div className="grid grid-cols-1 gap-8 rounded-block bg-lilac-tint p-6 md:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Eyebrow>{c.planEyebrow}</Eyebrow>
            <Display size="sm">{c.planTitle}</Display>
            <p className="pretty text-[16px] leading-[1.55] text-secondary">{c.planLead}</p>
          </div>
          {aesGoalGroups.map((grp) => (
            <fieldset key={grp.t} className="flex flex-col gap-2.5">
              <legend className="mb-2.5 text-[13px] font-semibold text-secondary">{grp.t}</legend>
              <div className="flex flex-wrap gap-1.5">
                {grp.goals.map((g) => {
                  const on = goals.includes(g.t);
                  return (
                    <button
                      key={g.t}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(g.t)}
                      className={cn(
                        "rounded-chip border-[1.5px] px-3.5 py-2 text-[14px] font-semibold motion-safe:transition-colors motion-safe:duration-200",
                        on ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky",
                      )}
                    >
                      {g.t}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <div role="radiogroup" aria-label={c.downtimeLabel} className="flex flex-col gap-2.5">
            <span className="text-[13px] font-semibold text-secondary">{c.downtimeLabel}</span>
            <div className="flex flex-wrap gap-1.5">
              {c.downtime.map((d, i) => (
                <button
                  key={d}
                  type="button"
                  role="radio"
                  aria-checked={down === i}
                  onClick={() => setDown(i)}
                  className={cn("rounded-chip border-[1.5px] px-3.5 py-2 text-[14px] font-semibold", down === i ? "border-ink bg-ink text-white" : "border-border bg-white text-primary hover:border-sky")}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-4 self-start rounded-card bg-white p-6 lg:sticky lg:top-6" aria-live="polite">
          <span className="font-display text-[24px] font-medium tracking-[-.02em]">{c.planOut}</span>
          {fits.length ? (
            <ol className="flex flex-col gap-2">
              {fits.slice(0, 5).map((t) => (
                <li key={t.id} className="rm-fade flex items-center gap-3 rounded-card-sm bg-raised px-4 py-3">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: aesFamilies[t.family].color }} />
                  <span className="flex flex-col">
                    <span className="text-[15px] font-semibold">{t.brand ? `${t.name}, ${t.brand}` : t.name}</span>
                    <span className="text-[12px] text-muted">{aesFamilies[t.family].t}</span>
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-[14px] text-muted">{c.planEmpty}</p>
          )}
          {hidden ? <span className="text-[13px] text-muted">{c.planDowntimeHidden(hidden)}</span> : null}
          <p className="pretty text-[13px] leading-[1.5] text-secondary">{c.planNote}</p>
          <SmartLink to={bookFor("aesthetics", "consult")} className={buttonClass("primary", "md", "self-start")}>
            {c.planCta}
          </SmartLink>
        </aside>
      </div>
    </section>
  );
}
