import { BenefitStrip, CtaBand, Display, Faq, PathSteps, Section } from "@/components/ui";
import type { DeepDive as DeepDiveData } from "@/content/deep";
import { aestheticsLadder, deepFootDefaults, deepFootFallback, rehabCoverage } from "@/content/deep";
import { infusionLinks } from "@/content/home";
import type { Division, DivisionKey } from "@/content/types";
import { bookFor, routes } from "@/lib/routes";
import { SmartLink } from "@/components/ui";
import { draft } from "@/content/review";

const painReferredNote = draft(
  "Already referred? There is no need to book. We call you to book, and your first assessment is usually within two to four weeks of the referral arriving. Not heard from us after four weeks? Call 905-709-3222.",
);
import { AmIDue } from "./AmIDue";
import { YearNotes } from "./YearNotes";
import { CoverageChecker } from "./CoverageChecker";
import { InfusionHandoff } from "./InfusionExtras";
import { Ladder } from "./Ladder";
import { PainGuide } from "./PainGuide";
import { AesFamilies } from "@/components/pages/aesthetics/AesSections";
import { InfusionDoors } from "@/components/pages/infusion/InfusionDoors";

/**
 * The deep-dive sections that follow every division page: chooser, the
 * division's own module, benefits, path, FAQ and the closing band.
 */
export function DeepDive({ k, division, dive }: { k: DivisionKey; division: Division; dive: DeepDiveData }) {
  const foot = deepFootDefaults[k];
  const footCta = division.footCta ?? foot?.footCta ?? deepFootFallback.footCta;
  const cta = division.cta ?? foot?.cta ?? deepFootFallback.cta;
  const ctaTo = division.ctaPage ?? foot?.ctaPage ?? bookFor(k);
  return (
    <>
      {/* The concern chooser now opens the page (DivisionPage), ahead of the services. */}

      {k === "family" ? (
        <>
          <AmIDue />
          <YearNotes />
        </>
      ) : null}
      {k === "pain" ? <PainGuide /> : null}
      {/* Infusion funnel: how you feel, then the menu, then how it works here. The build-a-drip box was removed: its fixed prices did not match the drips page. */}
      {k === "infusion" ? (
        <>
          <InfusionDoors />
          <InfusionHandoff links={infusionLinks} />
          {/* The "How an infusion works here" table lives on How it works (Nov 2026). */}
        </>
      ) : null}
      {k === "aesthetics" ? (
        <>
          <Ladder rungs={aestheticsLadder} />
          <AesFamilies />
        </>
      ) : null}
      {k === "rehab" ? <CoverageChecker options={rehabCoverage} /> : null}

      {/* Pain: the facts carry the OHIP answer and the path is the first visit (they were their own pages until Nov 2026). */}
      <Section id={k === "pain" ? "ohip" : undefined} className="flex scroll-mt-24 flex-col gap-5">
        <Display size="xs">{dive.benefitsTitle}</Display>
        <BenefitStrip items={dive.benefits} />
      </Section>

      {k === "infusion" ? (
        // The visit, start to finish, is told in full on How it works (Nov 2026); here it is one line.
        <Section tight>
          <SmartLink to={routes.infusionHow} className="w-fit text-[16px] font-semibold text-link">
            {draft("About an hour, start to finish. See how a visit works")} ›
          </SmartLink>
        </Section>
      ) : (
        <PathSteps id={k === "pain" ? "first-visit" : undefined} className="scroll-mt-24" title={dive.pathTitle} steps={dive.path} />
      )}
      {k === "pain" ? (
        <Section tight>
          {/* A referred 77-year-old found "no need to book" only inside the booking form (round 20). */}
          <p className="pretty max-w-[720px] rounded-card bg-[color:var(--div-pain)] p-5 text-[16px] leading-[1.55] md:p-6">{painReferredNote}</p>
        </Section>
      ) : null}

      <Faq items={dive.faq} />

      <CtaBand title={footCta} sub={dive.closing} cta={cta} ctaTo={ctaTo} />
    </>
  );
}
