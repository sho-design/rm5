"use client";

import { useId, useState } from "react";
import { ChipRow, Display, Eyebrow, Section } from "@/components/ui";
import { skinLadder as c, type SkinGoal } from "@/content/aes-skin";
import { cn } from "@/lib/cn";

/**
 * The skin treatments ladder, gentle to deeper (Nov 2026). Four rungs that step down like stairs on wide screens,
 * each with its treatments, downtime and usual visits. "Pick your goal" chips light up the treatments often
 * considered for that goal and soften the rest; nothing is hidden, so the whole ladder stays readable.
 */
export function SkinLadder() {
  const [goal, setGoal] = useState(0);
  const listId = useId();
  const picked: SkinGoal | null = goal === 0 ? null : c.goals[goal - 1].k;

  return (
    <Section id="skin-ladder" className="flex scroll-mt-24 flex-col gap-6">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.eyebrow}
        </Eyebrow>
        <Display size="sm">{c.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.lead}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[14px] font-semibold">{c.goalsLabel}</span>
        <ChipRow
          items={[c.all, ...c.goals.map((g) => g.t)]}
          value={goal}
          onChange={setGoal}
          ariaLabel={c.goalsLabel}
          controls={listId}
          size="sm"
        />
      </div>
      <ol
        id={listId}
        className="grid grid-cols-1 gap-3 lg:grid-cols-4 lg:items-start"
      >
        {c.rungs.map((r, i) => (
          <li
            key={r.n}
            className="sk-rung flex flex-col gap-3 rounded-card p-4 md:p-5"
            // Stairs on wide screens: each rung sits a little lower, and a little deeper in colour.
            style={{
              background: `color-mix(in srgb, var(--rm-lilac-tint) ${100 - i * 14}%, var(--rm-lilac))`,
              ["--sk-drop" as string]: `${i * 28}px`,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display text-[18px] font-medium text-lilac-text"
              >
                {r.n}
              </span>
              <div className="flex flex-col">
                <h3 className="font-display text-[22px] font-medium leading-[1.1]">
                  {r.t}
                </h3>
                <span className="text-[13px] leading-[1.4] text-secondary">
                  {r.d}
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-2">
              {r.items.map((t) => {
                const fits = picked ? t.goals.includes(picked) : false;
                const dim = picked ? !fits : false;
                return (
                  <li
                    key={t.id}
                    className={cn(
                      "flex flex-col gap-2 rounded-[16px] bg-white p-4 motion-safe:transition-[opacity,box-shadow,transform] motion-safe:duration-300",
                      fits &&
                        "shadow-[0_0_0_2px_var(--rm-lilac-deep)] motion-safe:-translate-y-0.5",
                      dim && "opacity-45",
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                      <span className="text-[16px] font-semibold">
                        {t.name}
                      </span>
                      {t.brand ? (
                        <span className="text-[13px] font-semibold text-muted">
                          {t.brand}
                        </span>
                      ) : null}
                    </div>
                    <p className="pretty text-[14px] leading-[1.45] text-secondary">
                      {t.d}
                    </p>
                    <dl className="grid grid-cols-2 gap-2 text-[13px]">
                      <div className="flex flex-col rounded-[10px] bg-lilac-tint px-2.5 py-1.5">
                        <dt className="text-muted">{c.downtimeLabel}</dt>
                        <dd className="font-semibold">{t.downtime}</dd>
                      </div>
                      <div className="flex flex-col rounded-[10px] bg-lilac-tint px-2.5 py-1.5">
                        <dt className="text-muted">{c.visitsLabel}</dt>
                        <dd className="font-semibold">{t.visits}</dd>
                      </div>
                    </dl>
                    {fits ? (
                      <span className="text-[13px] font-semibold text-lilac-text">
                        {c.fits}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>
      <style>{`
        @media (min-width: 1024px) { .sk-rung { margin-top: var(--sk-drop); } }
        :root[data-theme="contrast"] .sk-rung li { opacity: 1 !important; }
      `}</style>
    </Section>
  );
}
