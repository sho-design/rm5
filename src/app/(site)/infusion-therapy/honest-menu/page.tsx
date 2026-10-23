import type { Metadata } from "next";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { CompareTable } from "@/components/pages/division/InfusionExtras";
import { InfusionBand, InfusionHeader, InfusionSmallPrint } from "@/components/pages/infusion/InfusionBits";
import { infusionCompareRows } from "@/content/deep";
import { honestClaims, infusionCopy, infusionPages } from "@/content/infusion-site";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.honest;
const meta = infusionPages.find((p) => p.key === "honest");

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("honest", { title: "The honest menu", description: meta?.description });
}

export default function HonestMenuPage() {
  return (
    <>
      <InfusionHeader pageKey="honest" page="The honest menu" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-card lg:grid-cols-3">
          {honestClaims.map((x) => (
            <div key={x.p} className="flex flex-col gap-5 rounded-card border border-border bg-card p-6 md:p-7">
              <span className="flex flex-col gap-1.5">
                <span className="text-[12px] font-semibold text-muted">{c.theySay}</span>
                <span className="display-tight text-[24px] leading-[1.15] text-muted line-through decoration-[color:var(--text-muted)]/40">{x.p}</span>
              </span>
              <span className="flex flex-col gap-1.5 border-t border-border pt-4">
                <span className="text-[12px] font-semibold text-[color:var(--div-infusion-accent)]">{c.weSay}</span>
                <span className="pretty text-[16px] leading-[1.5]">{x.s}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>
      <CompareTable rows={infusionCompareRows} />
      <Section>
        <div className="flex flex-col gap-3 rounded-card bg-sun-soft p-6 text-ink md:p-10">
          <Eyebrow tone="inherit">{c.evidenceEyebrow}</Eyebrow>
          <Display size="xs">{c.evidenceTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-ink/75">{c.evidenceP}</p>
          <SmartLink to="ingredients" className="pt-1 text-[15px] font-semibold text-ink underline-offset-4 hover:underline">
            {infusionCopy.ingredients.title} ›
          </SmartLink>
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
