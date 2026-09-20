import { quickActions } from "@/content/home";
import { SmartLink } from "@/components/ui";

/** Four paper tiles under the hero: book, renew, refer, Maple waitlist. */
export function QuickActions() {
  return (
    <nav aria-label="Quick actions" className="grid grid-cols-1 gap-card px-4 pt-6 sm:grid-cols-2 md:px-content lg:grid-cols-4">
      {quickActions.map((qa) => (
        <SmartLink key={qa.label} to={qa.page} className="flex items-center gap-3.5 rounded-tile border border-border bg-card px-5 py-[18px] transition-colors hover:border-sky hover:bg-sky-soft active:scale-[.98]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-field border border-border bg-raised text-sky">
            <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {qa.icon.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </svg>
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[15px] font-semibold">{qa.label}</span>
            <span className="text-[12px] text-muted">{qa.sub}</span>
          </span>
        </SmartLink>
      ))}
    </nav>
  );
}
