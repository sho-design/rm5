import type { Metadata } from "next";
import { CtaBand, Display, Section, SubPageHero } from "@/components/ui";
import { ViFacts, ViSteps } from "@/components/vi/ViBits";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viPain as c } from "@/content/vi";
import { bookFor, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.pain}`, languages: langAlternates(routes.pain, viRoutes.pain) },
};

/**
 * The Pain Centre in Vietnamese: physician-led procedures, OHIP-covered with a physician referral. Referred
 * patients wait for our call; anyone without a referral starts with our family doctors. Never "self-referral".
 */
export default function ViPainPage() {
  const assess = `${bookFor("family", "concern")}&reason=Pain%20Centre%20referral&lang=vi`;
  return (
    <>
      <SubPageHero
        crumb="Trang chủ"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={c.cta}
        ctaTo={assess}
        cta2={viChrome.orCall}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.pain.tint}
        accent="var(--rm-ink)"
        img={images.division.pain}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />
      <Section className="grid grid-cols-1 gap-card md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-block rm-ink-surface bg-ink p-6 text-white md:p-8">
          <span className="font-display text-[28px] leading-tight tracking-[-.02em]">{c.referredTitle}</span>
          <p className="pretty text-[15px] leading-[1.6] text-white/85">{c.referredBody}</p>
        </div>
        <div className="flex flex-col gap-3 rounded-block p-6 md:p-8" style={{ background: divisions.pain.tint }}>
          <span className="font-display text-[28px] leading-tight tracking-[-.02em]">{c.noReferralTitle}</span>
          <p className="pretty text-[15px] leading-[1.6] text-secondary">{c.noReferralBody}</p>
          <a href={assess} className="mt-auto w-fit text-[15px] font-semibold text-link">
            {c.cta} ›
          </a>
        </div>
      </Section>
      <Section className="flex flex-col gap-6">
        <Display size="sm">{c.procTitle}</Display>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
          {c.procs.map((p, i) => (
            <li key={p.t} className="rm-rise flex flex-col gap-2 rounded-card border border-border bg-card p-6" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-[17px] font-semibold">{p.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{p.d}</span>
            </li>
          ))}
        </ul>
        <p className="pretty text-[14px] leading-[1.55] text-muted">{c.procNote}</p>
      </Section>
      <ViSteps title={c.stepsTitle} steps={c.steps} />
      <Section>
        <ViFacts title={c.bringTitle} rows={c.bring} tint="var(--rm-sun-tint)" />
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.cta} ctaTo={assess} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
