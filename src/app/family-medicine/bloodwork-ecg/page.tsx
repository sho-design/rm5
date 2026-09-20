import type { Metadata } from "next";
import { Faq, SubChooser, SubPageHero } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { bloodFaq, bloodOptions, bloodPath, bloodTips, subpageHero } from "@/content/subpages";
import { Path } from "@/components/pages/blood/Path";
import { Tips } from "@/components/pages/blood/Tips";
import { TintBand } from "@/components/pages/blood/TintBand";

const title = "Bloodwork and ECG, before you leave.";
const lead =
  "Our lab technician draws blood and runs 10-lead ECGs in clinic, so a requisition does not mean a second trip. Results go straight to your doctor and to you.";

export const metadata: Metadata = { title: "Bloodwork and ECG on site", description: `${title} ${lead}` };

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
        cta2="Bring an outside requisition"
        cta2To="contact"
        coverage="OHIP-insured tests are covered. Fasting tests are best booked before 10am."
        tint={tint}
        accent={accent}
        img={subpageHero.blood}
        imgAlt="Lab technician preparing a blood draw"
        pills={["No second trip", "Fasting slots before 10am", "ECG read the same day"]}
      />

      <SubChooser
        eyebrow="Which kind of test?"
        title="Know what to expect before you come in."
        intro="Pick the closest match. We show whether to fast, how long it takes and when results arrive."
        items={bloodOptions}
        tint={tint}
        accent={accent}
        link="What the numbers mean"
        linkTo="numbers"
        titleSize="md"
      />

      <Path
        eyebrow="The visit"
        title="About ten minutes, start to finish."
        note="Nervous about needles? Tell the technician. We can have you lie down and take it slowly."
        steps={bloodPath}
      />

      <Tips eyebrow="Good to know" title="Before you come in." note="Small things that make the draw easier and the results cleaner." tips={bloodTips} accent={accent} />

      <Faq title="Questions about bloodwork." sub="Your doctor explains every result at the follow-up. Nothing is left to guess." items={bloodFaq} />

      <TintBand
        title="One trip. Doctor, requisition, draw."
        sub="Most checkups end at the lab chair down the hall. Results reach your doctor in about a week, and you hear either way."
        cta="Book a checkup"
        link="Know your numbers"
        linkTo="numbers"
        tint={tint}
        subClassName="text-sage-ink"
      />
    </>
  );
}
