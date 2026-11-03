import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, Faq, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { ironFaq, ironPrices, ironSteps, ironSymptoms, ironVisit, ironVisitImg, ironWho, ironVisitPill, ironCta } from "@/content/iron";
import { bookFor, noteRoute } from "@/lib/routes";
import { IronCheck } from "@/components/pages/iron/IronCheck";
import { IronPrices, IronSteps, IronVisit, IronWho } from "@/components/pages/iron/IronSections";

const title = "Tired of being tired?";
const lead =
  "Low iron is one of the most common reasons people feel drained, foggy and cold. When tablets have not worked, an iron infusion course restores your iron over three visits, with a physician reviewing your bloodwork first.";

const baseMetadata: Metadata = { title: "Iron therapy", description: `${title} ${lead}` };

export async function generateMetadata() {
  return pageMetadata("iron", baseMetadata);
}

export default function IronTherapyPage() {
  const div = divisions.infusion;
  return (
    <>
      <SubPageHero
        crumb={div.label}
        crumbTo="infusion"
        page="Iron therapy"
        title={title}
        lead={lead}
        cta="Book an iron assessment"
        ctaTo={bookFor("infusion", "iron")}
        cta2="Do I need one?"
        cta2To="#iron-check"
        coverage="Physician-led. Nurse-administered. Thornhill, Tue, Sat and Sun."
        tint={div.tint}
        accent={div.accent}
        img={images.ironHero}
        imgAlt=""
        pills={[ironVisitPill, "Bloodwork on site", "Care in English and Tiếng Việt"]}
      />

      {/* The symptom self-check sits after prices and the FAQ, not next to a named prescription iron and its
          price (compliance review, round 17). */}
      <IronWho cards={ironWho} />

      <IronSteps steps={ironSteps} />

      <IronVisit items={ironVisit} img={ironVisitImg} noteHref={noteRoute("iron-infusion")} accent={div.accent} />

      <IronPrices prices={ironPrices} />

      <Faq title="Quick answers." sub="Anything else, ask at your assessment." items={ironFaq} />

      <IronCheck symptoms={ironSymptoms} accent={div.accent} />

      <CtaBand
        title={ironCta.title}
        sub={ironCta.sub}
        cta="Book an iron assessment"
        ctaTo={bookFor("infusion", "iron")}
      />
    </>
  );
}
