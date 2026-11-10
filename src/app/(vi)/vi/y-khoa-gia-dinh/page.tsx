import type { Metadata } from "next";
import { CtaBand, Display, Section, SubPageHero } from "@/components/ui";
import { ViFacts, ViSteps } from "@/components/vi/ViBits";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { viChrome, viFamily as c } from "@/content/vi";
import { oceanRegisterUrl } from "@/lib/ocean";
import { bookFor, routes, viRoutes } from "@/lib/routes";
import { langAlternates } from "@/lib/seo";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: `${site.url}${viRoutes.family}`, languages: langAlternates(routes.family, viRoutes.family) },
};

/** Family medicine in Vietnamese: what we look after, how to join, and the facts people ask first. */
export default function ViFamilyPage() {
  const register = oceanRegisterUrl ?? routes.register;
  return (
    <>
      <SubPageHero
        crumb="Trang chủ"
        crumbTo={viRoutes.home}
        page={c.eyebrow}
        title={c.h1}
        lead={c.lead}
        cta={c.cta}
        ctaTo={register}
        cta2={c.cta2}
        cta2To={`${bookFor("family")}&lang=vi`}
        coverage={viChrome.formsNote}
        tint={divisions.family.tint}
        accent="var(--rm-ink)"
        img={images.division.family}
        imgAlt={c.imgAlt}
        pills={c.pills}
      />
      <Section className="flex flex-col gap-6">
        <Display size="sm">{c.helpTitle}</Display>
        <ul className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-3">
          {c.help.map((h, i) => (
            <li key={h.t} className="rm-rise flex flex-col gap-2 rounded-card p-6" style={{ background: divisions.family.tint, animationDelay: `${i * 60}ms` }}>
              <span className="text-[17px] font-semibold">{h.t}</span>
              <span className="pretty text-[15px] leading-[1.55] text-secondary">{h.d}</span>
            </li>
          ))}
        </ul>
      </Section>
      <ViSteps title={c.stepsTitle} steps={c.steps} />
      <Section>
        <ViFacts title={c.factsTitle} rows={c.facts} />
      </Section>
      <CtaBand title={c.bandTitle} sub={c.bandSub} cta={c.cta} ctaTo={register} callLine={false}>
        <a href={site.phoneHref} className="text-[15px] font-semibold">
          {viChrome.orCall}
        </a>
      </CtaBand>
    </>
  );
}
