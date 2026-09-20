import { Display, Eyebrow, SmartLink } from "@/components/ui";
import type { LegalPage as LegalPageData } from "@/content/types";
import { legalOrder } from "@/content/legal";
import { cn } from "@/lib/cn";

/**
 * Legal page: sticky column left (eyebrow, title, last updated, side nav of
 * the four legal pages with the current one bold), 720px prose right with
 * hairline-topped sections and a contact card.
 */
export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 pb-12 pt-8 md:px-content md:pt-16 lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12">
      <div className="flex flex-col gap-4 lg:sticky lg:top-[80px] lg:gap-5">
        <Eyebrow tone="sky">{page.eyebrow}</Eyebrow>
        <Display as="h1" size="sm" className="lg:leading-[1]">
          {page.title}
        </Display>
        <span className="text-[13px] text-muted">{page.updated}</span>
        <nav aria-label="Legal pages" className="border-t border-border pt-2">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 lg:flex-col lg:gap-1.5">
            {legalOrder.map((l) => {
              const on = l.slug === page.slug;
              return (
                <li key={l.slug}>
                  <SmartLink to={l.key} aria-current={on ? "page" : undefined} className={cn("block py-1.5 text-[14px] transition-colors hover:text-ink", on ? "font-semibold text-ink" : "font-medium text-muted")}>
                    {l.label}
                  </SmartLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex max-w-[720px] flex-col gap-7 lg:gap-8">
        <p className="pretty text-[17px] leading-[1.55] text-muted lg:text-[18px]">{page.intro}</p>
        {page.sections.map((s) => (
          <section key={s.h} className="flex flex-col gap-2.5 border-t border-border pt-6">
            <Display as="h2" size="title-sm" balance={false}>
              {s.h}
            </Display>
            {s.p.map((para, i) => (
              <p key={i} className="pretty text-[15px] leading-[1.6]">
                {para}
              </p>
            ))}
          </section>
        ))}
        <div className="flex flex-col gap-1.5 rounded-[20px] border border-border bg-card px-6 py-6 md:px-7">
          <span className="text-[15px] font-semibold">{page.contactTitle}</span>
          <span className="text-[14px] leading-[1.55] text-muted">{page.contact}</span>
        </div>
      </div>
    </div>
  );
}
