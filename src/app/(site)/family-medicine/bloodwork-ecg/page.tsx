import { bookFor } from "@/lib/routes";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Faq, SubChooser, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { bloodFaq, bloodOptions, subpageHero } from "@/content/subpages";
import { VisitJourney } from "@/components/pages/blood/VisitJourney";
import { HeroPulse } from "@/components/pages/blood/HeroPulse";
import { EcgExplainer } from "@/components/pages/blood/EcgExplainer";
import { RequisitionPeek } from "@/components/pages/blood/RequisitionPeek";
import { Prepare } from "@/components/pages/blood/Prepare";
import { draft } from "@/content/review";
import { faqItems } from "@/content/faq";
import { TintBand } from "@/components/pages/blood/TintBand";

const title = "Bloodwork and ECG, before you leave.";
const lead =
  "Our lab technician draws blood and runs 12-lead ECGs in clinic, so a requisition does not mean a second trip. Results go straight to the doctor who ordered them.";

const baseMetadata: Metadata = { title: "Bloodwork and ECG on site", description: `${title} ${lead}` };

export async function generateMetadata() {
  return pageMetadata("blood", baseMetadata);
}

export default function BloodworkPage() {
  const div = divisions.family;
  const tint = divisions.infusion.tint;
  const accent = divisions.infusion.accent;
  return (
    <>
      <SubPageHero
        crumb={div.label}
        crumbTo="family"
        page="Bloodwork on site"
        title={title}
        lead={lead}
        cta="Book a blood draw"
        ctaTo={bookFor("family", "bloodwork")}
        cta2={draft("How to prepare")}
        cta2To="#prepare"
        coverage="OHIP-insured tests are covered. Fasting tests are best booked before 10am."
        tint={tint}
        accent={accent}
        img={subpageHero.blood}
        imgAlt="Lab technician preparing a blood draw"
        pills={["No second trip", "Fasting slots before 10am", "ECG read the same day"]}
      />
      <HeroPulse color={accent} />

      <SubChooser
        ctaTo={bookFor("family", "bloodwork")}
        eyebrow="Which kind of test?"
        title="Know what to expect before you come in."
        intro="Pick the closest match. We show whether to fast, how long it takes and when results arrive."
        items={bloodOptions}
        tint={tint}
        accent={accent}
        link={draft("How to prepare for tests")}
        linkTo="#prepare"
        titleSize="md"
      />

      {/* The visit and what comes after, as one route; the needle note and breathing circle sit in its header. */}
      <VisitJourney />

      <Prepare accent={accent} />

      <EcgExplainer />
      <RequisitionPeek />

      {/* Lab results (its own page until Nov 2026): how results reach you, and getting a copy. */}
      <section id="results" className="scroll-mt-24">
        <Faq
          title="Questions about bloodwork."
          sub="Your doctor explains every result at the follow-up. Nothing is left to guess."
          items={[
            ...bloodFaq,
            ...["How do I get my results?", "Can I get a copy of my records?"].flatMap((q) => {
              const f = faqItems.find((x) => x.q === q);
              return f ? [{ q: f.q, a: f.a }] : [];
            }),
          ]}
        />
      </section>

      <TintBand
        title="One trip. Doctor, requisition, draw."
        sub={draft("Most checkups end at the lab chair down the hall.")}
        cta="Book a checkup"
        tint={tint}
        subClassName="text-sage-ink"
      />
    </>
  );
}
