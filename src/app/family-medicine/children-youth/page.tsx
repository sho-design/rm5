import type { Metadata } from "next";
import { Faq, SubPageHero } from "@/components/ui";
import { immunizations, kidsAges, kidsCopy, kidsFaq } from "@/content/kids";
import { subpageHero } from "@/content/subpages";
import { divisions, divisionAccent, divisionTint } from "@/content/divisions";
import { KidsSick } from "@/components/pages/kids/KidsSick";
import { KidsInteractive } from "@/components/pages/kids/KidsInteractive";
import { KidsForms } from "@/components/pages/kids/KidsForms";
import { KidsDocs } from "@/components/pages/kids/KidsDocs";
import { KidsPath } from "@/components/pages/kids/KidsPath";
import { KidsLanguage } from "@/components/pages/kids/KidsLanguage";
import { TintBand } from "@/components/pages/kids/FamilySubBits";

export const metadata: Metadata = {
  title: kidsCopy.hero.title,
  description: kidsCopy.hero.lead,
};

export default function ChildrenYouthPage() {
  const family = divisions.family;
  return (
    <>
      <SubPageHero
        crumb={family.label}
        crumbTo="family"
        page={kidsCopy.hero.page}
        title={kidsCopy.hero.title}
        lead={kidsCopy.hero.lead}
        cta={kidsCopy.hero.cta}
        ctaTo="register"
        cta2={kidsCopy.hero.cta2}
        cta2To="book"
        coverage={kidsCopy.hero.coverage}
        tint={divisionTint.family}
        accent={divisionAccent.family}
        img={subpageHero.kids}
        imgAlt={kidsCopy.hero.alt}
        pills={[...kidsCopy.hero.pills]}
      />
      <KidsSick />
      <KidsInteractive ages={kidsAges} stages={immunizations} tint="var(--rm-sun-tint)" accent="var(--rm-amber-deep)" copy={kidsCopy.ages} />
      <KidsForms />
      <KidsDocs />
      <KidsPath />
      <KidsLanguage />
      <Faq title={kidsCopy.faq.title} sub={kidsCopy.faq.sub} items={kidsFaq} />
      <TintBand tint="var(--rm-sage-tint)" title={kidsCopy.band.title} body={kidsCopy.band.body} bodyClass="text-sage-ink" cta={kidsCopy.band.cta} ctaTo="register" link={kidsCopy.band.link} linkTo="year" />
    </>
  );
}
