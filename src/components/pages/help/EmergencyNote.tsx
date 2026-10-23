import { emergencyCopy as c } from "@/content/patient-help";
import { cn } from "@/lib/cn";

/** "Is this an emergency?" note for pages where people send requests: 911, then Health811. */
export function EmergencyNote({ className }: { className?: string }) {
  return (
    <aside aria-label={c.title} className={cn("flex flex-col gap-1.5 rounded-tile border border-border bg-[color:var(--div-pain)] px-5 py-4 text-ink", className)}>
      <span className="text-[15px] font-semibold">{c.title}</span>
      <p className="pretty text-[14px] leading-[1.5] text-ink-2">
        {c.body}{" "}
        <a href={c.link} target="_blank" rel="noopener" className="font-semibold text-link">
          {c.linkLabel} ›
        </a>
      </p>
    </aside>
  );
}
