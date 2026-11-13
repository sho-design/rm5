import {
  Display,
  Eyebrow,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import { skinAftercare as a, skinWait as w } from "@/content/aes-skin";
import { bookFor, routes } from "@/lib/routes";

/** After your treatment, and who should wait (Nov 2026). General guidance; the nurse gives aftercare per treatment. */
export function SkinCare() {
  return (
    <Section
      id="skin-aftercare"
      className="rm-paper grid scroll-mt-24 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {a.eyebrow}
          </Eyebrow>
          <Display size="2xs">{a.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {a.lead}
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {a.cards.map((x, i) => (
            <li
              key={x.t}
              className="flex flex-col gap-1.5 rounded-card-sm border border-border bg-card p-5"
            >
              <span className="text-[13px] font-semibold text-lilac-text">
                {i + 1}
              </span>
              <h3 className="text-[17px] font-semibold leading-[1.25]">
                {x.t}
              </h3>
              <p className="pretty text-[14px] leading-[1.5] text-secondary">
                {x.d}
              </p>
            </li>
          ))}
        </ul>
        <SmartLink
          to={`${routes.aesPlans}#regimen-recovery`}
          className="flex flex-col gap-1 rounded-card-sm bg-lilac-tint p-5 transition-colors hover:bg-[color:var(--rm-lilac)]/30"
        >
          <span className="text-[16px] font-semibold">{a.kitTitle}</span>
          <span className="pretty text-[14px] leading-[1.5] text-secondary">
            {a.kitD}
          </span>
          <TextLink className="mt-1 text-[14px]">{a.kitLink}</TextLink>
        </SmartLink>
      </div>

      <div className="flex flex-col gap-5 rounded-block bg-sun-tint p-6 md:p-8">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit">{w.eyebrow}</Eyebrow>
          <Display size="2xs">{w.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {w.lead}
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {w.items.map((x) => (
            <li
              key={x.t}
              className="flex gap-3 rounded-[16px] bg-white/80 px-4 py-3.5"
            >
              <span
                aria-hidden
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-deep"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-[16px] font-semibold">{x.t}</span>
                <span className="pretty text-[14px] leading-[1.5] text-secondary">
                  {x.d}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <SmartLink to={bookFor("family", "concern")} className="w-fit">
          <TextLink className="text-[15px]">{w.link}</TextLink>
        </SmartLink>
      </div>
    </Section>
  );
}
