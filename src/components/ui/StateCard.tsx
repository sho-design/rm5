import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Display } from "./Text";

/**
 * Outcome card for forms and booking: success (sage), waitlist (sun) or
 * error (terracotta). Big glyph, Fraunces title, body and actions.
 */
export function StateCard({ state, title, children, actions, className }: { state: "success" | "waitlist" | "error"; title: string; children?: ReactNode; actions?: ReactNode; className?: string }) {
  const tone = {
    success: { bg: "var(--status-success-bg)", fg: "var(--status-success-fg)", glyph: "✓" },
    waitlist: { bg: "var(--status-warning-bg)", fg: "var(--status-warning-fg)", glyph: "⏱" },
    error: { bg: "var(--status-error-bg)", fg: "var(--status-error-fg)", glyph: "×" },
  }[state];
  return (
    <div role="status" className={cn("flex flex-col gap-5 rounded-card p-7 md:p-10", className)} style={{ background: tone.bg }}>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[22px] font-semibold" style={{ color: tone.fg }} aria-hidden>
        {tone.glyph}
      </span>
      <Display size="xs">{title}</Display>
      {children ? <div className="flex flex-col gap-3 text-[16px] leading-[1.55] text-secondary">{children}</div> : null}
      {actions ? <div className="flex flex-wrap gap-2.5 pt-2">{actions}</div> : null}
    </div>
  );
}
