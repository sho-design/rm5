import type { Metadata } from "next";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { EvidenceMeter } from "@/components/pages/infusion/extra/evidence/EvidenceMeter";
import {
  EvidenceChip,
  InfusionBand,
  InfusionHeader,
  InfusionSmallPrint,
  ShotGrid,
} from "@/components/pages/infusion/InfusionBits";
import {
  honestClaims,
  infusionCopy,
  infusionPages,
  ingredients,
  shots,
  showEvidenceLabels,
  signatureDrips,
  type Evidence,
} from "@/content/infusion-site";
import { draft } from "@/content/review";
import { dripRoute, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.honest;
const ing = infusionCopy.ingredients;
const labels: Evidence[] = ["Established", "Supported", "Emerging", "Supervised"];
const meta = infusionPages.find((p) => p.key === "honest");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("honest", {
    title: "The honest menu",
    description: meta?.description,
  });
}

export default function HonestMenuPage() {
  return (
    <>
      <InfusionHeader
        pageKey="honest"
        page="The honest menu"
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
      />
      <Section className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-card lg:grid-cols-3">
          {honestClaims.map((x) => (
            <div
              key={x.p}
              className="flex flex-col gap-5 rounded-card border border-border bg-card p-6 md:p-7"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold text-muted">
                  {c.theySay}
                </span>
                <span className="display-tight text-[24px] leading-[1.15] text-muted line-through decoration-[color:var(--text-muted)]/40">
                  {x.p}
                </span>
              </span>
              <span className="flex flex-col gap-1.5 border-t border-border pt-4">
                <span className="text-[13px] font-semibold text-sage-text">
                  {c.weSay}
                </span>
                <span className="pretty text-[16px] leading-[1.5]">{x.s}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
      {/* What is in each drip, sorted (Nov 2026). After the claims we will not make, before the comparison. */}
      <EvidenceMeter />
      {/* The ingredient library, merged in from its own page (Nov 2026). */}
      <Section id="ingredients" className="flex scroll-mt-24 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Eyebrow>{ing.title}</Eyebrow>
          <Display size="xs">{ing.coreTitle}</Display>
        </div>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((i) => (
            <div
              key={i.t}
              className="flex flex-col gap-1.5 rounded-card border border-border bg-card p-6"
            >
              <span className="text-[18px] font-semibold">{i.t}</span>
              <span className="text-[15px] leading-[1.5] text-secondary">
                {i.d}
              </span>
            </div>
          ))}
        </div>
      </Section>
      <Section className="flex flex-col gap-5">
        <Display size="xs">{ing.shotsTitle}</Display>
        <ShotGrid shots={shots} />
      </Section>
      {showEvidenceLabels ? (
        <Section className="flex flex-col gap-5">
          <Display size="xs">{ing.byEvidenceTitle}</Display>
          <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-4">
            {labels.map((ev) => (
              <div
                key={ev}
                className="flex flex-col gap-3 rounded-card border border-border p-6"
              >
                <EvidenceChip ev={ev} className="self-start" />
                <ul className="flex flex-col gap-1.5 text-[15px]">
                  {signatureDrips
                    .filter((d) => d.ev === ev)
                    .map((d) => (
                      <li key={d.slug}>
                        <SmartLink
                          to={dripRoute(d.slug)}
                          className="font-semibold hover:text-link"
                        >
                          {d.t}
                        </SmartLink>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ) : null}
      {/* "How an infusion works here" moved to How it works, the one place for the visit (Nov 2026). */}
      <Section tight>
        <SmartLink
          to={routes.infusionHow}
          className="w-fit text-[15px] font-semibold text-link"
        >
          {draft("How an infusion works here, compared side by side")} ›
        </SmartLink>
      </Section>
      <Section>
        <div className="flex flex-col gap-3 rounded-card bg-sun-soft p-6 text-ink md:p-10">
          <Eyebrow tone="inherit">{c.evidenceEyebrow}</Eyebrow>
          <Display size="xs">{c.evidenceTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-ink/75">
            {c.evidenceP}
          </p>
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
