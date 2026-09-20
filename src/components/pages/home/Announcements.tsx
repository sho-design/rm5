import type { Announcement } from "@/content/types";
import { SmartLink } from "@/components/ui";

/** Navy "What's new" strip: sunshine pill and three short announcements. */
export function Announcements({ items }: { items: Announcement[] }) {
  return (
    <div className="mx-4 mt-card flex items-center gap-4 rounded-tile bg-inverse px-5 py-3.5 text-on-inverse md:mx-content">
      <span className="shrink-0 rounded-chip bg-sun px-2.5 py-[5px] text-[12px] font-semibold text-sun-ink">What&rsquo;s new</span>
      <ul className="scroll-x flex min-w-0 flex-1 gap-7 text-[14px]">
        {items.map((an) => (
          <li key={an.text} className="shrink-0">
            <SmartLink to={an.page} className="flex items-center gap-2 whitespace-nowrap hover:opacity-90">
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
              <span>{an.text}</span>
              <span aria-hidden className="text-white/60">›</span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
