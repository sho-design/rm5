"use client";

import { useTextSize, useTheme } from "@/lib/prefs";
import { cn } from "@/lib/cn";

/**
 * Text size A- / A / A+ and the high-contrast toggle. Used in the footer,
 * the utility bar (compact, on navy) and the phone menu (on navy).
 */
export function TextControls({ inverse, compact, className }: { inverse?: boolean; compact?: boolean; className?: string }) {
  const { step, up, down, reset } = useTextSize();
  const { theme, toggleContrast } = useTheme();
  // Larger targets outside the 38px bar: a tester with a hand tremor had to aim twice.
  const btn = cn("inline-flex items-center justify-center rounded-[6px] border transition-colors", compact ? "min-h-7 min-w-8 px-1.5" : "min-h-10 min-w-10 px-2.5", inverse ? "border-white/35 hover:border-white" : "border-border hover:border-sky");
  return (
    <div role="group" aria-label="Text size and contrast" className={cn("flex items-center gap-1.5", inverse ? "text-white" : "text-muted", className)}>
      <span className="mr-1 whitespace-nowrap">Text size</span>
      <button type="button" onClick={down} aria-label="Decrease text size" disabled={step === 0} className={cn(btn, "disabled:opacity-50")}>
        A-
      </button>
      <button type="button" onClick={reset} aria-label="Reset text size" aria-pressed={step === 0} className={btn}>
        A
      </button>
      <button type="button" onClick={up} aria-label={step === 2 ? "Increase text size (already the largest)" : "Increase text size"} aria-disabled={step === 2 || undefined} className={cn(btn, step === 2 && (inverse ? "bg-white text-ink" : "bg-ink text-white"))}>
        A+
      </button>
      <button
        type="button"
        onClick={toggleContrast}
        aria-pressed={theme === "contrast"}
        className={cn("whitespace-nowrap rounded-[6px] border transition-colors", compact ? "px-2 py-0.5" : "px-2.5 py-1", theme === "contrast" ? (inverse ? "border-white bg-white text-ink" : "border-ink bg-ink text-white") : inverse ? "border-white/35 hover:border-white" : "border-border hover:border-sky")}
      >
        High contrast
      </button>
    </div>
  );
}
