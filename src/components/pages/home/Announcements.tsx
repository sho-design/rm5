import type { Announcement } from "@/content/types";
import { SmartLink } from "@/components/ui";

/**
 * Navy "What's new" strip: sunshine pill and three short announcements.
 * On phones they stack and wrap (a sideways scroller cut the first one off
 * mid-word); from md up they sit in one scrolling row.
 */
export function Announcements({ items }: { items: Announcement[] }) {
  return (
    <div className="mx-4 mt-card flex flex-col items-start gap-3 rounded-tile md:flex-row md:items-center md:gap-4 bg-inverse px-5 py-3.5 text-on-inverse md:mx-content">
      <span className="shrink-0 rounded-chip bg-sun px-2.5 py-[5px] text-[12px] font-semibold text-sun-ink">What&rsquo;s new</span>
      <ul className="scroll-x flex min-w-0 flex-1 flex-col gap-2 text-[14px] md:flex-row md:gap-7">
        {items.map((an) => (
          <li key={an.text} className="md:shrink-0">
            <SmartLink to={an.page} className="flex items-baseline gap-2 hover:opacity-90 md:items-center md:whitespace-nowrap">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-sage md:translate-y-0" />
              <span>{an.text}</span>
              <span aria-hidden className="text-white/60">›</span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
