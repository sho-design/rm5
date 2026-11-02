import { emergencyCopy as c } from "@/content/patient-help";
import { buttonClass } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/**
 * "Is this an emergency?" note: 911 first, as a call button, then Health811
 * for people who are not sure (a phone button and a separately named website
 * link, so it is clear which one dials), then when online requests are read.
 * The title is a real heading so screen reader users can jump to it.
 * Used on booking, renewals, contact and in search for emergency words.
 */
export function EmergencyNote({ className, id, headingLevel = 2 }: { className?: string; id?: string; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 3 ? "h3" : "h2";
  return (
    <aside id={id} tabIndex={id ? -1 : undefined} aria-labelledby={id ? `${id}-title` : undefined} aria-label={id ? undefined : c.title} className={cn("flex scroll-mt-28 flex-col gap-2 rounded-tile border border-border bg-[color:var(--div-pain)] px-5 py-4 text-ink outline-none", className)}>
      <H id={id ? `${id}-title` : undefined} className="text-[16px] font-semibold">
        {c.title}
      </H>
      <p className="pretty text-[15px] font-semibold leading-[1.5]">{c.urgent}</p>
      <a href="tel:911" className={buttonClass("primary", "md", "self-start")}>
        {c.call911}
      </a>
      <p className="pretty pt-1 text-[14px] leading-[1.5] text-ink-2">
        {c.crisis}{" "}
        <a href="tel:988" className="font-semibold text-link underline underline-offset-2">
          {c.call988}
        </a>
      </p>
      <p className="pretty pt-1 text-[14px] leading-[1.5] text-ink-2">{c.unsure}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href="tel:811" className={buttonClass("outline", "md", "border-ink")}>
          {c.call811}
        </a>
        <a href={c.link} target="_blank" rel="noopener" className="text-[14px] font-semibold text-link underline-offset-2 hover:underline">
          {c.siteLabel} ›<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="pretty text-[13px] leading-[1.5] text-muted">{c.requests}</p>
    </aside>
  );
}
