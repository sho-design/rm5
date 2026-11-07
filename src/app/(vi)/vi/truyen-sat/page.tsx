import type { Metadata } from "next";
import { CtaBand, Display, Section, SubPageHero } from "@/components/ui";
import { ViFacts, ViSteps } from "@/components/vi/ViBits";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viHome, viIron as c } from "@/content/vi";
import { bookFor, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.iron}`, languages: langAlternates(routes.iron, viRoutes.iron) },
};

/** Iron therapy in Vietnamese: assessment first (OHIP), then the course, the three fees and the last start times. */
export default function ViIronPage() {
  const book = bookFor("infusion", "iron");
  return (
    <>
      <SubPageHero
        crumb="Trang chủ"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={c.cta}
        ctaTo={book}
        cta2={viHome.cta2}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.infusion.tint}
        accent="var(--rm-ink)"
        img={images.ironHero}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />
      <ViSteps title={c.stepsTitle} steps={c.steps} />
      <Section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Display size="sm">{c.priceTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.priceLead}</p>
        </div>
        <div className="grid grid-cols-1 gap-card lg:grid-cols-[1.6fr_1fr]">
          <ul className="grid grid-cols-1 gap-card sm:grid-cols-3">
            {c.prices.map((p, i) => (
              <li key={p.t} className="flex flex-col gap-2 rounded-card p-6" style={{ background: i === 0 ? "var(--rm-sage-tint)" : "var(--rm-paper-2)" }}>
                <span className="font-display text-[40px] leading-none tracking-[-.02em]">{p.p}</span>
                <span className="text-[13px] font-semibold text-muted">{c.perVisit}</span>
                <span className="pt-2 text-[16px] font-semibold">{p.t}</span>
                <span className="pretty text-[14px] leading-[1.5] text-secondary">{p.d}</span>
              </li>
            ))}
          </ul>
          <ViFacts title={c.timesTitle} rows={c.times} tint="var(--rm-sun-tint)" />
        </div>
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.cta} ctaTo={book} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
