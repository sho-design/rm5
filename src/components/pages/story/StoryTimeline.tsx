import { Display, Eyebrow } from "@/components/ui";
import { storyPage, type TimelineEntry } from "@/content/about";

/** Sticky "How we got here" label left; year rows (Fraunces 28 sky year, title, description) right. */
export function StoryTimeline({ items }: { items: TimelineEntry[] }) {
  return (
    <section className="grid grid-cols-1 items-start gap-8 px-4 pt-12 md:px-content md:pt-section lg:grid-cols-[1fr_1.6fr] lg:gap-12">
      <div className="flex flex-col gap-3 lg:sticky lg:top-6">
        <Eyebrow tone="sky">{storyPage.timelineEyebrow}</Eyebrow>
        <Display size="xs">{storyPage.timelineTitle}</Display>
      </div>
      <ol className="flex flex-col">
        {items.map((s) => (
          <li key={s.y} className="grid grid-cols-[72px_1fr] gap-4 border-t border-border py-5 md:grid-cols-[90px_1fr] md:gap-6 md:py-6">
            <span className="display-tight text-[24px] tracking-[-.02em] text-link md:text-[28px]">{s.y}</span>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[17px] font-semibold md:text-[19px]">{s.t}</h3>
              <p className="text-[15px] leading-[1.55] text-secondary">{s.d}</p>
            </div>
          </li>
        ))}
        <li aria-hidden className="border-t border-border" />
      </ol>
    </section>
  );
}
