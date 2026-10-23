import type { Metadata } from "next";
import { Display, Section } from "@/components/ui";
import { EvidenceChip, InfusionBand, InfusionHeader, InfusionSmallPrint, ShotGrid } from "@/components/pages/infusion/InfusionBits";
import { infusionCopy, infusionPages, ingredients, shots, signatureDrips, type Evidence } from "@/content/infusion-site";
import { pageMetadata } from "@/lib/seo";
import { dripRoute } from "@/lib/routes";
import { SmartLink } from "@/components/ui";

const c = infusionCopy.ingredients;
const meta = infusionPages.find((p) => p.key === "ingredients");
const labels: Evidence[] = ["Established", "Supported", "Emerging", "Supervised"];

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("ingredients", { title: "Ingredient library", description: meta?.description });
}

export default function IngredientsPage() {
  return (
    <>
      <InfusionHeader pageKey="ingredients" page="Ingredient library" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="flex flex-col gap-5 pt-10 md:pt-12">
        <Display size="xs">{c.coreTitle}</Display>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((i) => (
            <div key={i.t} className="flex flex-col gap-1.5 rounded-card border border-border bg-card p-6">
              <span className="text-[18px] font-semibold">{i.t}</span>
              <span className="text-[15px] leading-[1.5] text-secondary">{i.d}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section className="flex flex-col gap-5">
        <Display size="xs">{c.shotsTitle}</Display>
        <ShotGrid shots={shots} />
      </Section>
      <Section className="flex flex-col gap-5">
        <Display size="xs">{c.byEvidenceTitle}</Display>
        <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-4">
          {labels.map((ev) => (
            <div key={ev} className="flex flex-col gap-3 rounded-card border border-border p-6">
              <EvidenceChip ev={ev} className="self-start" />
              <ul className="flex flex-col gap-1.5 text-[15px]">
                {signatureDrips
                  .filter((d) => d.ev === ev)
                  .map((d) => (
                    <li key={d.slug}>
                      <SmartLink to={dripRoute(d.slug)} className="font-semibold hover:text-sky">
                        {d.t}
                      </SmartLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
