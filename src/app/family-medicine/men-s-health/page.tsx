import type { Metadata } from "next";
import { Faq, SubChooser, SubPageHero } from "@/components/ui";
import { menCopy, menFaq, menOptions, subpageHero } from "@/content/subpages";
import { divisions, divisionAccent, divisionTint } from "@/content/divisions";
import { MenDecades } from "@/components/pages/men/MenDecades";
import { TintBand } from "@/components/pages/kids/FamilySubBits";

export const metadata: Metadata = {
  title: menCopy.hero.title,
  description: menCopy.hero.lead,
};

export default function MensHealthPage() {
  const tint = divisionTint.family;
  const accent = divisionAccent.family;
  return (
    <>
      <SubPageHero
        crumb={divisions.family.label}
        crumbTo="family"
        page={menCopy.hero.page}
        title={menCopy.hero.title}
        lead={menCopy.hero.lead}
        cta={menCopy.hero.cta}
        ctaTo="book"
        cta2={menCopy.hero.cta2}
        cta2To="register"
        coverage={menCopy.hero.coverage}
        tint={tint}
        accent={accent}
        img={subpageHero.men}
        imgAlt={menCopy.hero.alt}
        pills={[...menCopy.hero.pills]}
      />
      <SubChooser id="visit" eyebrow={menCopy.chooser.eyebrow} title={menCopy.chooser.title} intro={menCopy.chooser.intro} items={menOptions} tint={tint} accent={accent} link={menCopy.chooser.link} linkTo="numbers" titleSize="md" />
      <MenDecades />
      <Faq title={menCopy.faq.title} sub={menCopy.faq.sub} items={menFaq} />
      <TintBand tint={tint} title={menCopy.band.title} body={menCopy.band.body} bodyClass="text-secondary" cta={menCopy.band.cta} ctaTo="book" link={menCopy.band.link} linkTo="year" />
    </>
  );
}
