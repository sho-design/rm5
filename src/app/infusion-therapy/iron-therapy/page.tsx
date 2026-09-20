import type { Metadata } from "next";
import { CtaBand, Faq, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { ironFaq, ironPrices, ironSteps, ironSymptoms, ironVisit, ironVisitImg, ironWho } from "@/content/iron";
import { noteRoute } from "@/lib/routes";
import { IronCheck } from "@/components/pages/iron/IronCheck";
import { IronPrices, IronSteps, IronVisit, IronWho } from "@/components/pages/iron/IronSections";

const title = "Tired of being tired?";
const lead =
  "Low iron is one of the most common reasons people feel drained, foggy and cold. When tablets have not worked, an iron infusion course restores your iron over three visits, with a physician reviewing your bloodwork first.";

export const metadata: Metadata = { title: "Iron therapy", description: `${title} ${lead}` };

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
        cta2="Do I need one?"
        cta2To="#iron-check"
        coverage="Physician-led. Nurse-administered. Thornhill, Tue, Sat and Sun."
        tint={div.tint}
        accent={div.accent}
        img={images.ironHero}
        imgAlt=""
        pills={["3 visits, about 90 minutes each", "Bloodwork on site", "Care in English and Tiếng Việt"]}
      />

      <IronCheck symptoms={ironSymptoms} accent={div.accent} />

      <IronWho cards={ironWho} />

      <IronSteps steps={ironSteps} />

      <IronVisit items={ironVisit} img={ironVisitImg} noteHref={noteRoute("iron-infusion")} accent={div.accent} />

      <IronPrices prices={ironPrices} />

      <Faq title="Quick answers." sub="Anything else, ask at your assessment." items={ironFaq} />

      <CtaBand
        title="Find out in one blood test."
        sub="Book an iron assessment. If your levels are low and tablets are not the answer, we can usually infuse the same week."
        cta="Book an iron assessment"
      />
    </>
  );
}
