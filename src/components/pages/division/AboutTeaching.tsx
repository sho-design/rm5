import Image from "next/image";
import { Block, Display, Eyebrow, Icon, SmartLink } from "@/components/ui";
import { aboutTeaching as t } from "@/content/divisions";

/** The paragraph's sentences: the first introduces the learners, the rest are what it means for your visit. */
const sentences = t.p.split(/(?<=\.)\s+/);
const [intro, ...promises] = sentences;
const promiseIcons = ["team", "contact", "check"];

/**
 * About only: the teaching clinic block (November 2026 redesign). The introduction sits beside the placement
 * partners' logos; what a learner means for your visit gets three tiles of its own; the preceptors and the
 * supervision standard close the block in one strip. Copy is the approved paragraph, split by sentence.
 */
export function AboutTeaching() {
  return (
    <Block id="teaching" tone="tint" className="scroll-mt-24 flex flex-col gap-8 bg-sky-soft p-6 md:gap-10 md:p-10 lg:px-12 lg:py-14">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-12">
        <div className="flex flex-col gap-4">
          <Eyebrow tone="sky">{t.eyebrow}</Eyebrow>
          <Display size="xs">{t.title}</Display>
          <p className="pretty max-w-[56ch] text-[17px] leading-[1.55] text-secondary">{intro}</p>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-semibold text-muted">{t.partnersLabel}</span>
          <ul className="grid grid-cols-2 gap-3">
            {t.partners.map((p) => (
              <li key={p.name} className="flex h-[96px] items-center justify-center rounded-tile bg-white px-5 shadow-[0_2px_10px_rgba(15,31,46,.06)]">
                <div className="relative w-full" style={{ height: Math.min(p.maxHeight, 56) }}>
                  <Image src={p.logo} alt={p.name} fill sizes="220px" className="object-contain" />
                </div>
              </li>
            ))}
          </ul>
          <span className="pretty text-[13px] leading-[1.5] text-muted">{t.partnersNote}</span>
        </div>
      </div>

      {/* What it means for your visit. */}
      <ul className={`grid grid-cols-1 gap-3 ${promises.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {promises.map((s, i) => (
          <li key={s} className="flex flex-col gap-3 rounded-card bg-raised p-5 md:p-6">
            <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft text-[color:var(--rm-sky-text)]">
              <Icon name={promiseIcons[i] ?? "check"} size={22} />
            </span>
            <p className="pretty text-[15px] leading-[1.5]">{s}</p>
          </li>
        ))}
      </ul>

      {/* Who supervises, and the standard behind it. */}
      <div className="flex flex-col gap-4 border-t border-[color:var(--border-default)] pt-6 md:flex-row md:items-center md:justify-between">
        <dl className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          {t.cards.map((c) => (
            <div key={c.k} className="flex flex-col gap-0.5">
              <dt className="text-[13px] font-semibold text-muted">{c.k}</dt>
              <dd className="text-[15px] font-medium">{c.v}</dd>
            </div>
          ))}
        </dl>
        <SmartLink to="standards" className="w-fit shrink-0 text-[15px] font-semibold text-link">
          {t.link} ›
        </SmartLink>
      </div>
    </Block>
  );
}
