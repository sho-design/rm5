"use client";

import { useOpenStatus } from "@/lib/use-open-status";
import { cn } from "@/lib/cn";

/**
 * Live Thornhill open or closed badge with a status dot. Renders nothing
 * until the browser has the Toronto time, so it never shows a stale state.
 */
export function OpenBadge({ className, inverse }: { className?: string; inverse?: boolean }) {
  const s = useOpenStatus();
  if (!s.ready) return <span className={className} />;
  const dot = s.open ? "var(--status-open)" : inverse ? "rgba(255,255,255,.45)" : "var(--text-muted)";
  return (
    <span className={cn("flex items-center gap-1.5 text-[12px] font-semibold", className)}>
      <span aria-hidden className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: dot }} />
      {s.short}
    </span>
  );
}
