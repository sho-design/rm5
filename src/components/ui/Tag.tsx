import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small pill tag: 12px semibold, 999 radius. */
export function Tag({ children, className, style, tone = "tint" }: { children: ReactNode; className?: string; style?: CSSProperties; tone?: "tint" | "white" | "ink" | "sun" | "line" }) {
  const t = {
    tint: "bg-card text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-white",
    sun: "bg-sun text-sun-ink",
    line: "bg-white border border-border text-ink",
  }[tone];
  return (
    <span style={style} className={cn("inline-flex items-center rounded-chip px-3 py-1.5 text-[12px] font-semibold leading-none", t, className)}>
      {children}
    </span>
  );
}

/** Status dot (7px) used for open-now and location status. */
export function Dot({ color = "var(--status-open)", size = 7, className }: { color?: string; size?: number; className?: string }) {
  return <span aria-hidden className={cn("inline-block shrink-0 rounded-full", className)} style={{ width: size, height: size, background: color }} />;
}
