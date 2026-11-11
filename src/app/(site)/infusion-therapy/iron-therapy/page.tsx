import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, Faq, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { ironFaq, ironPrices, ironSteps, ironSymptoms, ironWho, ironVisitPill, ironCta } from "@/content/iron";
import { bookFor, noteRoute } from "@/lib/routes";
import { IronCheck } from "@/components/pages/iron/IronCheck";
import { IronPrices, IronSteps, IronWho } from "@/components/pages/iron/IronSections";
import { IronDay } from "@/components/pages/iron/IronDay";
import { IronPlanner } from "@/components/pages/iron/IronPlanner";
import { IronJourney } from "@/components/pages/iron/IronJourney";

const title = "Tired of being tired?";
const lead =
  "Low iron is one of the most common reasons people feel drained, foggy and cold. When tablets have not worked, your doctor may suggest an iron infusion course, usually three visits, with a physician reviewing your bloodwork first.";

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
        cta2="Is this you?"
        cta2To="#iron-check"
        coverage="Physician-led. Nurse-administered. Infusions on Tuesday, Saturday and Sunday at Thornhill."
        tint={div.tint}
        accent={div.accent}
        img={images.ironHero}
        imgAlt=""
        pills={[ironVisitPill, "Bloodwork on site", "Care in English and Tiếng Việt"]}
      />

      {/* Funnel, top to bottom: is this me, who it is for, how it works, one visit, cost, plan, questions, book.
          The symptom check leads; the named irons and their prices come four sections later (compliance, round 17). */}
      <IronCheck symptoms={ironSymptoms} accent={div.accent} />

      <IronWho cards={ironWho} />

      <IronSteps steps={ironSteps} />

      <IronJourney />

      <IronDay noteHref={noteRoute("iron-infusion")} />

      <IronPrices prices={ironPrices} />

      <IronPlanner />

      <Faq title="Quick answers." sub="Anything else, ask at your assessment." items={ironFaq} />

      <CtaBand
        title={ironCta.title}
        sub={ironCta.sub}
        cta="Book an iron assessment"
        ctaTo={bookFor("infusion", "iron")}
      />
    </>
  );
}
