import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The clinic's mark: the "RM" monogram tile from the supplied logo artwork (public/logos/rm-mark.png) beside
 * "Restoration Medical" set in Fraunces 500 (clinic decision, November 2026). The name hides on its own when space
 * is short (scrolled header, larger text) and the monogram stays. The name is the logo navy on light surfaces and
 * white on navy (`inverse`, and the dark theme). Never redraw the monogram.
 */
const sizes = {
  sm: { tile: 24, text: "text-[16px]", gap: 8 },
  md: { tile: 26, text: "text-[17px]", gap: 9 },
  lg: { tile: 30, text: "text-[20px]", gap: 10 },
} as const;

export function Wordmark({ size = "md", inverse, className, href = "/", label = "Restoration Medical home" }: { size?: "sm" | "md" | "lg"; inverse?: boolean; className?: string; href?: string; label?: string }) {
  const s = sizes[size];
  return (
    <Link href={href} aria-label={label} className={cn("flex min-h-[44px] items-center", className)} style={{ gap: s.gap }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size logo file, no optimisation needed */}
      <img src="/logos/rm-mark.png" alt="" width={s.tile} height={s.tile} className="block shrink-0" />
      <span className={cn("rm-wordmark-text whitespace-nowrap font-display font-medium leading-none tracking-[-.02em]", s.text, inverse ? "text-white" : "rm-logo-name")}>Restoration Medical</span>
    </Link>
  );
}
