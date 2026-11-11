import { BenefitStrip, CtaBand, Display, Faq, PathSteps, Section } from "@/components/ui";
import type { DeepDive as DeepDiveData } from "@/content/deep";
import { aestheticsLadder, deepFootDefaults, deepFootFallback, infusionCompareRows, rehabCoverage } from "@/content/deep";
import { infusionLinks } from "@/content/home";
import type { Division, DivisionKey } from "@/content/types";
import { bookFor } from "@/lib/routes";
import { AmIDue } from "./AmIDue";
import { CoverageChecker } from "./CoverageChecker";
import { CompareTable, InfusionHandoff } from "./InfusionExtras";
import { Ladder } from "./Ladder";
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

      {k === "family" ? <AmIDue /> : null}
      {/* Infusion funnel: how you feel, then the menu, then how it works here. The build-a-drip box was removed: its fixed prices did not match the drips page. */}
      {k === "infusion" ? (
        <>
          <InfusionDoors />
          <InfusionHandoff links={infusionLinks} />
          <CompareTable rows={infusionCompareRows} />
        </>
      ) : null}
      {k === "aesthetics" ? (
        <>
          <Ladder rungs={aestheticsLadder} />
          <AesFamilies />
        </>
      ) : null}
      {k === "rehab" ? <CoverageChecker options={rehabCoverage} /> : null}

      <Section className="flex flex-col gap-5">
        <Display size="xs">{dive.benefitsTitle}</Display>
        <BenefitStrip items={dive.benefits} />
      </Section>

      <PathSteps title={dive.pathTitle} steps={dive.path} />

      <Faq items={dive.faq} />

      <CtaBand title={footCta} sub={dive.closing} cta={cta} ctaTo={ctaTo} />
    </>
  );
}
