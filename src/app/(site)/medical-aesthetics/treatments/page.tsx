import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, Faq, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { images } from "@/content/images";
import { draft } from "@/content/review";
import { bookFor } from "@/lib/routes";
import { AesMenu } from "@/components/pages/aesthetics/AesMenu";
import { AesFinder } from "@/components/pages/aesthetics/AesFinder";
import { EventPlanner } from "@/components/pages/aesthetics/EventPlanner";
import { AesCandidacy, AesTools } from "@/components/pages/aesthetics/AesSections";
import { aesPricing } from "@/content/aes-pricing";

const title = draft("The menu.");
const lead = draft("Every treatment we offer, with how long it takes. Your price and plan are set at a complimentary consult with our nurse, after screening, with a physician when your concern needs one.");

const baseMetadata: Metadata = { title: "Aesthetic treatments", description: `${title} ${lead}` };

export async function generateMetadata() {
  return pageMetadata("aesMenu", baseMetadata);
}

/** Funnel: the full menu (filterable), a goal planner for people who do not know the names, pricing, candidacy, then book. Combined programs live on Skin health plans. */
export default function AestheticsMenuPage() {
  const div = divisions.aesthetics;
  return (
    <>
      <SubPageHero
        crumb={div.label}
        crumbTo="aesthetics"
        page={draft("Treatments")}
        title={title}
        lead={lead}
        cta={div.cta ?? "Book a consult"}
        ctaTo={bookFor("aesthetics", "consult")}
        cta2={draft("Not sure? Start here")}
        cta2To="#plan"
        coverage={draft("Elective, not covered by OHIP. Physician-led, delivered by nurses and physicians.")}
        tint={div.tint}
        accent={div.accent}
        img={images.services.aesthetics[1]}
        imgAlt=""
        pills={[draft("Screened first"), draft("Written plan"), draft("Care in English and Tiếng Việt")]}
      />
      <AesFinder />
      <AesMenu />
      <EventPlanner />
      {/* Pricing (was its own page until Nov 2026): prices in writing at the consult, before anything is done. */}
      <div id="pricing" className="scroll-mt-24">
        <Faq title={aesPricing.title} sub={aesPricing.lead} items={aesPricing.faq} />
      </div>
      <AesTools />
      <AesCandidacy />
      <CtaBand title={div.footCta ?? ""} sub={draft("A consult starts with screening. If a treatment is not right for you, we say so and suggest what is.")} cta={div.cta ?? "Book a consult"} ctaTo={bookFor("aesthetics", "consult")} />
    </>
  );
}
