import { Display, Eyebrow, Section } from "@/components/ui";
import { menWeek as c, type DayState } from "@/content/aes-men";
import { cn } from "@/lib/cn";

const cell: Record<DayState, string> = {
  visit: "bg-ink text-white",
  visible: "bg-[color:var(--rm-lilac)] text-ink",
  clear: "bg-page text-muted",
};

/**
 * Time off as a week: each treatment's days laid on Monday to Sunday (treatment, may show, usual day), so a
 * busy man can see what to plan around. The cells fill in left to right once (none with reduced motion).
 */
export function MenWeek() {
  return (
    <Section id="men-week" className="flex scroll-mt-24 flex-col gap-6">
      <style>{`
        @keyframes mn-fill { from { opacity: 0; transform: scaleX(.6) } to { opacity: 1; transform: none } }
        .mn-fill { transform-origin: left center; animation: mn-fill 420ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .mn-fill { animation: none; } }
      `}</style>
      <div className="flex max-w-[720px] flex-col gap-3">
        <Eyebrow tone="inherit" className="text-lilac-text">
          {c.eyebrow}
        </Eyebrow>
        <Display size="2xs">{c.title}</Display>
        <p className="pretty text-[16px] leading-[1.55] text-secondary">
          {c.lead}
        </p>
      </div>
      <div className="overflow-x-auto rounded-card bg-lilac-tint p-4 md:p-6">
        <table className="w-full min-w-[620px] border-separate border-spacing-1.5 text-[13px]">
          <caption className="sr-only">{c.title}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="w-[30%] text-left text-[13px] font-semibold text-muted"
              >
                <span className="sr-only">Treatment</span>
              </th>
              {c.days.map((d) => (
                <th
                  key={d}
                  scope="col"
                  className="text-center text-[13px] font-semibold text-muted"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r, ri) => (
              <tr key={r.t}>
                <th scope="row" className="pr-2 text-left align-middle">
                  <span className="block text-[15px] font-semibold text-primary">
                    {r.t}
                  </span>
                  <span className="block text-[13px] font-normal leading-[1.35] text-secondary">
                    {r.note}
                  </span>
                </th>
                {r.days.map((s, di) => (
                  <td key={di} className="h-12 p-0">
                    <span
                      className={cn(
                        "mn-fill flex h-12 items-center justify-center rounded-[10px] text-[13px] font-semibold",
                        cell[s],
                      )}
                      style={{ animationDelay: `${ri * 90 + di * 45}ms` }}
                    >
                      <span className={s === "clear" ? "sr-only" : undefined}>
                        {c.legend[s]}
                      </span>
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <ul
          className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-secondary"
          aria-label="Key"
        >
          {(["visit", "visible", "clear"] as DayState[]).map((s) => (
            <li key={s} className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "h-3.5 w-5 rounded-[4px] border border-[color:var(--border-default)]",
                  cell[s],
                )}
              />
              {c.legend[s]}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
