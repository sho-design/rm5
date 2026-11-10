import type { Metadata } from "next";
import { CtaBand, Display, Section, SubPageHero } from "@/components/ui";
import { ViFacts, ViSteps } from "@/components/vi/ViBits";
import { AesPrograms, SkinRegimens } from "@/components/pages/aesthetics/AesPrograms";
import { viAesPrograms, viProgramsCopy, viRegimens } from "@/content/vi-programs";
import { aesFamilies, type AesFamily } from "@/content/aesthetics-menu";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viAesthetics as c, viChrome } from "@/content/vi";
import { bookFor, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.aesthetics}`, languages: langAlternates(routes.aesthetics, viRoutes.aesthetics) },
};

/** Medical Aesthetics in Vietnamese: the six families, how to start, and the facts people ask first. */
export default function ViAestheticsPage() {
  const book = `${bookFor("aesthetics", "consult")}&lang=vi`;
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
        cta2={viChrome.orCall}
        cta2To={site.phoneHref}
        coverage={viChrome.formsNote}
        tint={divisions.aesthetics.tint}
        accent="var(--rm-ink)"
        img={images.division.aesthetics}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />
      <Section className="flex flex-col gap-6">
        <Display size="sm">{c.famTitle}</Display>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-3">
          {c.fams.map((f, i) => (
            <li key={f.k} className="rm-rise flex flex-col gap-2 rounded-card p-6" style={{ background: divisions.aesthetics.tint, animationDelay: `${i * 60}ms` }}>
              <span className="flex items-center gap-2 text-[17px] font-semibold">
                <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: aesFamilies[f.k as AesFamily].color }} />
                {f.t}
              </span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{f.d}</span>
            </li>
          ))}
        </ul>
      </Section>
      <ViSteps title={c.stepsTitle} steps={c.steps} />
      <AesPrograms programs={viAesPrograms} c={viProgramsCopy} bookTo={book} routines={viRegimens} routinesAt="" />
      <SkinRegimens list={viRegimens} c={viProgramsCopy} />
      <Section>
        <ViFacts title={c.factsTitle} rows={c.facts} />
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.cta} ctaTo={book} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
