import { emergencyCopy as c } from "@/content/patient-help";
import { cn } from "@/lib/cn";

/**
 * "Is this an emergency?" note: 911 first, as a call button, then Health811,
 * then when online requests are read. Used on booking, renewals, contact and
 * in search for emergency words.
 */
export function EmergencyNote({ className, id }: { className?: string; id?: string }) {
  return (
    <aside id={id} aria-label={c.title} className={cn("flex flex-col gap-2 rounded-tile border border-border bg-[color:var(--div-pain)] px-5 py-4 text-ink", className)}>
      <span className="text-[15px] font-semibold">{c.title}</span>
      <p className="pretty text-[14px] font-semibold leading-[1.5]">{c.urgent}</p>
      <a href="tel:911" className="inline-flex h-11 items-center self-start rounded-chip bg-ink px-5 text-[15px] font-semibold text-white hover:opacity-90">
        {c.call911}
      </a>
      <p className="pretty text-[14px] leading-[1.5] text-ink-2">
        <a href="tel:811" className="font-semibold text-link">
          {c.advice}
        </a>{" "}
        <a href={c.link} target="_blank" rel="noopener" className="font-semibold text-link">
          {c.linkLabel} ›
        </a>{" "}
        {c.requests}
      </p>
    </aside>
  );
}
