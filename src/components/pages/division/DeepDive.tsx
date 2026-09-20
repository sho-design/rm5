import { BenefitCard, CtaBand, Display, Faq, Grid, PathSteps, Section } from "@/components/ui";
import type { DeepDive as DeepDiveData } from "@/content/deep";
import { aestheticsLadder, deepFootDefaults, deepFootFallback, infusionCompareRows, rehabCoverage } from "@/content/deep";
import { infusionLinks } from "@/content/home";
import type { Division, DivisionKey } from "@/content/types";
import { AmIDue } from "./AmIDue";
import { CoverageChecker } from "./CoverageChecker";
import { DeepDiveChooser } from "./DeepDiveChooser";
import { CompareTable, InfusionHandoff } from "./InfusionExtras";
import { Ladder } from "./Ladder";

/**
 * The deep-dive sections that follow every division page: chooser, the
 * division's own module, benefits, path, FAQ and the closing band.
 */
export function DeepDive({ k, division, dive }: { k: DivisionKey; division: Division; dive: DeepDiveData }) {
  const foot = deepFootDefaults[k];
  const footCta = division.footCta ?? foot?.footCta ?? deepFootFallback.footCta;
  const cta = division.cta ?? foot?.cta ?? deepFootFallback.cta;
  return (
    <>
      <DeepDiveChooser k={k} dive={dive} />

      {k === "family" ? <AmIDue /> : null}
      {k === "infusion" ? <CompareTable rows={infusionCompareRows} /> : null}
      {k === "aesthetics" ? <Ladder rungs={aestheticsLadder} /> : null}
      {k === "rehab" ? <CoverageChecker options={rehabCoverage} /> : null}
      {k === "infusion" ? <InfusionHandoff links={infusionLinks} /> : null}

      <Section className="flex flex-col gap-5">
        <Display size="xs">{dive.benefitsTitle}</Display>
        <Grid cols={3}>
          {dive.benefits.map((b) => (
            <BenefitCard key={b.t} {...b} />
          ))}
        </Grid>
      </Section>

      <PathSteps title={dive.pathTitle} steps={dive.path} cta={cta} />

      <Faq items={dive.faq} />

      <CtaBand title={footCta} sub={dive.closing} cta={cta} />
    </>
  );
}
