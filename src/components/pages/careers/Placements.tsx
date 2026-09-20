import { Block, Display, Eyebrow, Lead } from "@/components/ui";
import { careersCopy } from "@/content/about";
import { site } from "@/content/site";

/** Placements and preceptorship: sun-tint block with three white rows and a mailto pill. */
export function Placements() {
  const p = careersCopy.placements;
  return (
    <Block tone="none" className="grid grid-cols-1 items-center gap-8 bg-sun-tint p-6 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:p-12">
      <div className="flex flex-col gap-3.5">
        <Eyebrow tone="inherit" className="text-amber-deep">
          {p.eyebrow}
        </Eyebrow>
        <Display size="2xs">{p.title}</Display>
        <Lead size="base">{p.body}</Lead>
      </div>
      <div className="flex flex-col gap-2.5">
        {p.rows.map((r) => (
          <div key={r.t} className="grid grid-cols-1 items-center gap-1.5 rounded-tile bg-white px-5 py-[18px] text-ink sm:grid-cols-[1fr_auto] sm:gap-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold">{r.t}</span>
              <span className="text-[13px] text-ink-3">{r.sub}</span>
            </div>
            <span className="text-[12px] font-semibold text-ink-3">{r.where}</span>
          </div>
        ))}
        <a
          href={`mailto:${site.placementsEmail}`}
          className="mt-1.5 inline-flex max-w-full self-start rounded-chip bg-ink px-5 py-3 text-[14px] font-semibold leading-[1.3] text-white transition-opacity hover:opacity-90 active:scale-[.98]"
        >
          <span className="break-all">
            {p.cta}
            {site.placementsEmail}
          </span>
        </a>
      </div>
    </Block>
  );
}
