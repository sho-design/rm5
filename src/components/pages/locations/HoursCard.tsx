"use client";

import { useEffect, useState } from "react";
import { Dot } from "@/components/ui";
import { cn } from "@/lib/cn";
import { locationsCopy } from "@/content/about";
import { openStatus, shortRange, torontoNow } from "@/lib/hours";

/**
 * Hours table. For the open clinic it also shows a live open-now dot and
 * status line, computed on the client so static pages never go stale.
 */
export function HoursCard({ hours, live }: { hours: [string, string][]; live: boolean }) {
  const [status, setStatus] = useState<{ text: string; open: boolean; today: number } | null>(null);

  useEffect(() => {
    if (!live) {
      setStatus(null);
      return;
    }
    const tick = () => {
      const now = torontoNow();
      setStatus({ ...openStatus(now), today: (now.getDay() + 6) % 7 });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <div id={live ? "hours" : undefined} className="flex scroll-mt-24 flex-col gap-2.5 rounded-card border border-border bg-card px-5 py-5 md:px-7 md:py-6">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="text-[13px] font-semibold text-muted">{locationsCopy.hours}</span>
        {status ? (
          <span className="flex items-center gap-2 text-[13px] font-semibold" aria-live="polite">
            <Dot color={status.open ? "var(--status-open)" : "var(--border-strong)"} />
            {status.text}
          </span>
        ) : null}
      </div>
      {hours.map(([d, t], i) => {
        const today = status?.today === i;
        return (
          <div key={d} className={cn("flex justify-between gap-4 text-[14px]", today && "font-semibold")}>
            <span className="font-medium">
              {d}
              {/* Bold alone did not mark today for a low-vision tester (round 25, Rosa). */}
              {today ? <span className="ml-2 rounded-chip bg-sun px-2 py-0.5 text-[11px] font-semibold text-ink">{locationsCopy.today}</span> : null}
            </span>
            <span className={cn("whitespace-nowrap text-right", today && t !== "Closed" ? "text-primary" : "text-muted")}>{shortRange(t)}</span>
          </div>
        );
      })}
    </div>
  );
}
