"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/components/ui";
import { openStatus } from "@/lib/hours";

/** Lead line with the live "Thornhill open now until 4pm" status, refreshed each minute. */
export function HoursLead({ suffix }: { suffix: string }) {
  const [status, setStatus] = useState("Thornhill");
  useEffect(() => {
    const tick = () => setStatus(openStatus().text);
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <Lead tone="muted" className="text-[16px] lg:text-[18px]">
      <span aria-live="polite">{status}</span>. {suffix}
    </Lead>
  );
}
