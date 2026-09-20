"use client";

import { useState } from "react";
import { Block, Button, CheckChip, Display, Eyebrow, FactGrid, Lead } from "@/components/ui";
import { deepDives, dripBuilderCopy as c, dripCopy, dripIronIndex, drips } from "@/content/deep";

/** Prototype `dripTime`: "1h 30m" past the hour, otherwise "45 min"; "0 min" with nothing picked. */
function formatTime(mins: number, any: boolean): string {
  if (!any) return "0 min";
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h ${m}m` : `${h}h`;
  }
  return `${mins} min`;
}

/**
 * Infusion only: build-your-own-drip picker. Tap drips and add-ons on the
 * left; the white card totals the time (plus the nurse screening) and price.
 * The prototype carries this state but no markup, so the layout follows the
 * iron symptom chips and the deep-dive result card.
 */
export function DripBuilder() {
  const [sel, setSel] = useState<number[]>([]);
  const chosen = drips.filter((_, i) => sel.includes(i));
  const mins = chosen.reduce((a, d) => a + d.mins, 0) + (chosen.length ? dripCopy.screeningMinutes : 0);
  const total = chosen.reduce((a, d) => a + d.price, 0);
  const toggle = (i: number) => setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  const tint = deepDives.infusion.tint;
  return (
    <Block tone="tint" style={{ background: tint }} className="grid grid-cols-1 gap-8 p-5 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-12 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-5">
        <Eyebrow tone="inherit" style={{ color: deepDives.infusion.accent }}>
          {c.eyebrow}
        </Eyebrow>
        <Display size="sm">{c.title}</Display>
        <Lead size="base">{c.intro}</Lead>
        <div className="flex flex-col gap-1.5 pt-1.5">
          {drips.map((d, i) => (
            <CheckChip
              key={d.name}
              label={d.name}
              sub={d.desc}
              on={sel.includes(i)}
              onToggle={() => toggle(i)}
              right={
                <span className="flex shrink-0 flex-col items-end gap-0.5">
                  <span className="text-[14px] font-semibold">${d.price}</span>
                  <span className="text-[12px] text-muted">{d.mins ? `${d.mins} min` : c.addOn}</span>
                </span>
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-card bg-raised p-6 shadow-card md:p-8 lg:sticky lg:top-6">
        <span className="text-[12px] font-semibold text-muted">{c.summary}</span>
        {chosen.length ? (
          <ul className="flex flex-col">
            {chosen.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3 border-b border-border py-3 text-[15px]">
                <span className="font-semibold">{d.name}</span>
                <span>${d.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[15px] leading-[1.5] text-muted">{dripCopy.empty}</p>
        )}
        <FactGrid
          facts={[
            { k: c.time, v: formatTime(mins, chosen.length > 0) },
            { k: c.total, v: `$${total}` },
          ]}
        />
        <p className="text-[13px] leading-[1.5] text-muted" aria-live="polite">
          {sel.includes(dripIronIndex) ? dripCopy.ironNote : dripCopy.note}
        </p>
        <div className="border-t border-border pt-4">
          <Button to="book">{c.cta}</Button>
        </div>
      </div>
    </Block>
  );
}
