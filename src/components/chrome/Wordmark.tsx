import Link from "next/link";
import { cn } from "@/lib/cn";

/** Wordmark: Instrument Sans 600 with the Fraunces "R" tile. No logo asset exists; do not draw one. */
export function Wordmark({ size = "md", inverse, className }: { size?: "sm" | "md" | "lg"; inverse?: boolean; className?: string }) {
  const tile = { sm: "h-6 w-6 rounded-[7px] text-[14px]", md: "h-[26px] w-[26px] rounded-[8px] text-[15px]", lg: "h-[30px] w-[30px] rounded-[9px] text-[16px]" }[size];
  const text = { sm: "text-[14px]", md: "text-[15px]", lg: "text-[18px]" }[size];
  return (
    <Link href="/" aria-label="Restoration Medical home" className={cn("flex items-center gap-2.5", className)}>
      <span className={cn("flex items-center justify-center font-display font-medium", tile, inverse ? "bg-white text-ink" : "bg-ink text-white")}>R</span>
      <span className={cn("whitespace-nowrap font-semibold tracking-[-.02em]", text)}>Restoration Medical</span>
    </Link>
  );
}
