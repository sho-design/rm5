import type { Metadata } from "next";
import { Faq, SubChooser, SubPageHero } from "@/components/ui";
import { subpageHero, womenCopy, womenFaq, womenOptions } from "@/content/subpages";
import { divisions } from "@/content/divisions";
import { WomenScreening } from "@/components/pages/women/WomenScreening";
import { TintBand } from "@/components/pages/kids/FamilySubBits";

const tint = "var(--rm-terracotta-tint)";
const accent = "var(--rm-terracotta-deep)";

export const metadata: Metadata = {
  title: womenCopy.hero.title,
  description: womenCopy.hero.lead,
};

export default function WomensHealthPage() {
  return (
    <>
      <SubPageHero
        crumb={divisions.family.label}
        crumbTo="family"
        page={womenCopy.hero.page}
        title={womenCopy.hero.title}
        lead={womenCopy.hero.lead}
        cta={womenCopy.hero.cta}
        ctaTo="book"
        cta2={womenCopy.hero.cta2}
        cta2To="register"
        coverage={womenCopy.hero.coverage}
        tint={tint}
        accent={accent}
        img={subpageHero.women}
        imgAlt={womenCopy.hero.alt}
        pills={[...womenCopy.hero.pills]}
      />
      <SubChooser id="stage" eyebrow={womenCopy.chooser.eyebrow} title={womenCopy.chooser.title} intro={womenCopy.chooser.intro} items={womenOptions} tint={tint} accent={accent} link={womenCopy.chooser.link} linkTo="year" titleSize="md" />
      <WomenScreening />
      <Faq title={womenCopy.faq.title} sub={womenCopy.faq.sub} items={womenFaq} />
      <TintBand tint={tint} title={womenCopy.band.title} body={womenCopy.band.body} bodyClass="text-secondary" cta={womenCopy.band.cta} ctaTo="register" link={womenCopy.band.link} linkTo="kids" />
    </>
  );
}
