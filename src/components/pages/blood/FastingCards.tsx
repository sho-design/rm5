"use client";

import { useState } from "react";
import { bloodPrep as c } from "@/content/subpages";
import { clock } from "@/lib/fasting";

/** Draw times people can pick: every half hour the clinic is open on some day, 8am to 8:30pm. */
const TIMES = Array.from({ length: 26 }, (_, i) => 8 + i / 2);

/** "the night before" (midnight counts), "that morning" or "that day", for a stop time `t` hours after midnight of the draw day. */
const when = (t: number) => (t <= 0 ? c.whenBefore : t < 12 ? c.whenMorning : c.whenDay);

/**
 * The four fasting rules, each with the time to stop eating (or drinking) for the appointment time picked above
 * them. 9am is picked to start, the most common fasting draw.
 */
export function FastingCards() {
  const [slot, setSlot] = useState(9);
  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-wrap items-center gap-2.5 text-[15px] font-semibold">
        {c.timeLabel}
        <select
          value={slot}
          onChange={(e) => setSlot(Number(e.target.value))}
          className="rounded-field border-[1.5px] border-border bg-raised px-3 py-2 text-[15px] font-semibold focus:border-sky"
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>
              {clock(t)}
            </option>
          ))}
        </select>
      </label>
      {slot >= 12 ? <p className="pretty max-w-[720px] rounded-[12px] bg-sun-tint px-4 py-3 text-[14px] font-semibold leading-[1.5] text-sun-ink">{c.afternoon}</p> : null}
      <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {c.fasting.map((f) => {
          const [from, to] = f.window;
          const stop =
            from === to ? c.stopBy(clock(slot - to), when(slot - to), f.dry) : c.stopBetween(clock(slot - from), clock(slot - to), when(slot - to));
          return (
            <li key={f.k} className="flex flex-col gap-3 rounded-card-sm border border-border p-6 text-ink" style={{ background: f.bg }}>
              <span className="display text-[24px] leading-[1.05] tracking-[-.02em]">{f.t}</span>
              <span className="pretty text-[14px] font-semibold leading-[1.45]">{f.rule}</span>
              <span className="pretty rounded-[12px] bg-white/70 px-3 py-2 text-[14px] leading-[1.45]">{stop}</span>
              {f.tests.length ? (
                <ul className="flex flex-col gap-1 text-[14px] leading-[1.45] text-secondary">
                  {f.tests.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span aria-hidden>•</span>
                      {t}
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-[13px] text-secondary">{c.noList}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
