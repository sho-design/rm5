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
export function EmergencyNote({ className, id, headingLevel = 2, crisisFirst = false }: { className?: string; id?: string; headingLevel?: 2 | 3; crisisFirst?: boolean }) {
  const H = headingLevel === 3 ? "h3" : "h2";
  return (
    <aside id={id} tabIndex={id ? -1 : undefined} aria-labelledby={id ? `${id}-title` : undefined} aria-label={id ? undefined : c.title} className={cn("flex scroll-mt-28 flex-col gap-2 rounded-tile border border-border bg-[color:var(--div-pain)] px-5 py-4 text-ink outline-none", className)}>
      <H id={id ? `${id}-title` : undefined} className="text-[16px] font-semibold">
        {c.title}
      </H>
      {/* Searching "hopeless": 988 comes first, as a button, not third as a text link under chest pain and stroke. */}
      {crisisFirst ? (
        <>
          <p className="pretty text-[15px] font-semibold leading-[1.5]">{c.crisisLead}</p>
          <a href="tel:988" className={buttonClass("primary", "md", "self-start")}>
            {c.call988Button}
          </a>
          <p className="pretty pt-1 text-[14px] leading-[1.5] text-ink-2">{c.crisisSafety}</p>
        </>
      ) : null}
      <p className="text-[20px] font-semibold leading-[1.25] text-ink">{c.dialLead}</p>
      <ul className="flex list-disc flex-col gap-1 pl-5 text-[15px] font-semibold leading-[1.45]">
        {c.signs.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <p className="text-[15px] font-semibold leading-[1.5]">{c.orEd}</p>
      {/* No tel:911 link anywhere on the site: the clinic does not want accidental emergency calls. 911 is plain text. */}
      {crisisFirst ? null : (
      <p className="pretty pt-1 text-[14px] leading-[1.5] text-ink-2">
        {c.crisis}{" "}
        <a href="tel:988" className="font-semibold text-link underline underline-offset-2">
          {c.call988}
        </a>
      </p>
      )}
      <p className="pretty pt-1 text-[14px] leading-[1.5] text-ink-2">{c.unsure}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* A text link, not a button: with 911 as plain text, the 811 button was the only big control in the
            box and a tester with chest symptoms said he would have pressed it (round 18). */}
        <a href="tel:811" className="text-[14px] font-semibold text-link underline underline-offset-2">
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
