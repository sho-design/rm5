"use client";

import { useEffect, useState } from "react";
import { Button, Eyebrow } from "@/components/ui";
import { nextWomensDays, womensHealthDay as c } from "@/content/womens-day";
import { torontoNow, MON } from "@/lib/hours";
import { bookFor } from "@/lib/routes";

const DAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * Women's health day band: the last Sunday of every month. The next date is
 * worked out in the browser in Toronto time, so the static page never shows
 * a day that has passed.
 */
export function WomensHealthDay() {
  const [next, setNext] = useState<Date | null>(null);
  useEffect(() => {
    setNext(nextWomensDays(torontoNow(), 1)[0] ?? null);
  }, []);
  return (
    <section id="womens-day" aria-labelledby="womens-day-title" className="scroll-mt-20 px-4 pt-12 md:px-content md:pt-section">
      <div className="grid grid-cols-1 items-center gap-6 rounded-block bg-[color:var(--div-pain)] p-6 text-ink md:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-[color:var(--div-pain-accent)]">
            {c.eyebrow}
          </Eyebrow>
          <h2 id="womens-day-title" className="display-tight text-[30px] leading-[1.05] md:text-[40px]">
            {c.title}
          </h2>
          <p className="pretty max-w-[560px] text-[16px] leading-[1.55] text-ink-2">{c.body}</p>
        </div>
        <div className="flex flex-col gap-4 rounded-card bg-white/70 p-6">
          <span className="text-[12px] font-semibold text-muted">{c.next}</span>
          <span className="display-tight text-[26px] leading-[1.1]" aria-live="polite">
            {next ? `${DAY[next.getDay()]}, ${MON[next.getMonth()]} ${next.getDate()}` : "\u00a0"}
          </span>
          <span className="text-[14px] text-ink-2">{c.when}</span>
          <Button to={bookFor("family", "womensday")} className="self-start">
            {c.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
