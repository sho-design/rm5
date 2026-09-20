"use client";

import { useTextSize, useTheme } from "@/lib/prefs";
import { cn } from "@/lib/cn";

/** Footer accessibility controls: text size A- / A / A+ and the high-contrast theme toggle. */
export function TextControls() {
  const { up, down, reset } = useTextSize();
  const { theme, toggleContrast } = useTheme();
  const btn = "rounded-[6px] border border-border px-2 py-1 transition-colors hover:border-sky";
  return (
    <div className="flex items-center gap-1.5 text-muted">
      <span className="mr-1">Text size</span>
      <button type="button" onClick={down} aria-label="Decrease text size" className={btn}>
        A-
      </button>
      <button type="button" onClick={reset} aria-label="Reset text size" className={btn}>
        A
      </button>
      <button type="button" onClick={up} aria-label="Increase text size" className={btn}>
        A+
      </button>
      <button type="button" onClick={toggleContrast} aria-pressed={theme === "contrast"} className={cn("ml-1.5 rounded-[6px] border border-border px-2.5 py-1 transition-colors", theme === "contrast" ? "bg-ink text-white" : "hover:border-sky")}>
        High contrast
      </button>
    </div>
  );
}
