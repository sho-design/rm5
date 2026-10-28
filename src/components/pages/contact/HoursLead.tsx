"use client";

import { Lead } from "@/components/ui";
import { useOpenStatus } from "@/lib/use-open-status";

/** Lead line with the live "Thornhill open now until 4pm" status, refreshed each minute. */
export function HoursLead({ suffix }: { suffix: string }) {
  const status = useOpenStatus().text;
  return (
    <Lead tone="muted" className="text-[16px] lg:text-[18px]">
      <span aria-live="polite">{status}</span>. {suffix}
    </Lead>
  );
}
