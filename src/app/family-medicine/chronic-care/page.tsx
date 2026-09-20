import type { Metadata } from "next";
import { Faq, SubChooser, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { chronicFaq, chronicOptions, chronicRhythm, chronicVsPain, subpageHero } from "@/content/subpages";
import { Rhythm } from "@/components/pages/chronic/Rhythm";
import { Compare } from "@/components/pages/chronic/Compare";
import { TintBand } from "@/components/pages/chronic/TintBand";

const title = "Long-term conditions, steadily managed.";
const lead =
  "Diabetes, blood pressure, asthma, thyroid, heart and kidney. One doctor who knows your history, bloodwork and ECG down the hall, and a plan that gets adjusted rather than restarted.";

export const metadata: Metadata = { title: "Chronic care", description: `${title} ${lead}` };

export default function ChronicCarePage() {
  const div = divisions.family;
  return (
    <>
      <SubPageHero
        crumb={div.label}
        crumbTo="family"
        page="Chronic care"
        title={title}
        lead={lead}
        cta="Book a review"
        cta2="Register as a new patient"
        cta2To="register"
        coverage="OHIP-insured. Bring every medication and supplement to the first visit."
        tint={div.tint}
        accent={div.accent}
        img={subpageHero.chronic}
        imgAlt="Physician reviewing a care plan with a patient"
        pills={["Same doctor every visit", "Bloodwork and ECG on site", "Tiếng Việt spoken"]}
      />

      <SubChooser
        eyebrow="What are you managing?"
        title="Pick a condition to see how we follow it."
        intro="How often we meet, what gets checked, what to bring and what is covered."
        items={chronicOptions}
        tint={div.tint}
        accent={div.accent}
        link="Know your numbers"
        linkTo="numbers"
        titleSize="md"
      />

      <Rhythm
        eyebrow="The rhythm"
        title="A plan that is adjusted, not restarted."
        note="Recall reminders come from us. You should never have to remember when your next bloodwork is due."
        steps={chronicRhythm}
      />

      <Compare
        eyebrow="Not sure which you need?"
        title="Chronic care and the Pain Centre are different doors."
        note="They share one chart and one hallway. Start with your family doctor if unsure."
        cards={chronicVsPain}
        accent={div.accent}
      />

      <Faq title="Questions about chronic care." sub="Ask anything else at your visit. Longer appointments are available for complex care." items={chronicFaq} />

      <TintBand
        title="Bring every bottle. We will sort the rest."
        sub="A first chronic care visit is 30 minutes. Medications reconciled, bloodwork and ECG done on the way out, targets agreed before you leave."
        cta="Book a first visit"
        link="Bloodwork and ECG on site"
        linkTo="blood"
        tint={div.tint}
      />
    </>
  );
}
