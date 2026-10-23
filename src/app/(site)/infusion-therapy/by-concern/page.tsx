import type { Metadata } from "next";
import { Button, Display, Eyebrow, Section, SmartLink } from "@/components/ui";
import { InfusionBand, InfusionHeader, InfusionSmallPrint } from "@/components/pages/infusion/InfusionBits";
import { concerns, infusionCopy } from "@/content/infusion-site";
import { tints } from "@/content/divisions";
import { bookFor } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.concerns;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("concerns", { title: "Infusions by concern", description: c.lead });
}

export default function ByConcernPage() {
  return (
    <>
      <InfusionHeader pageKey="concerns" page="By concern" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <Section className="pt-10 md:pt-12">
        <div className="grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-4">
          {concerns.map((x, i) => {
            const clinical = x.tag === "Clinical";
            return (
              <SmartLink
                key={x.t}
                to={x.page}
                className={"flex min-h-[220px] flex-col justify-between gap-6 rounded-card p-6 transition-opacity hover:opacity-95 " + (clinical ? "bg-inverse text-on-inverse" : "text-ink")}
                style={clinical ? undefined : { background: tints[i % tints.length] }}
              >
                <span className="flex items-center justify-between text-[12px] font-semibold opacity-75">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{x.tag}</span>
                </span>
                <span className="flex flex-col gap-2">
                  <span className="display-tight text-[24px] leading-[1.1]">{x.t}</span>
                  <span className="text-[14px] leading-[1.45] opacity-80">{x.d}</span>
                  <span className="pt-1 text-[14px] font-semibold">{x.cta} ›</span>
                </span>
              </SmartLink>
            );
          })}
        </div>
      </Section>
      <Section>
        <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-card p-6 md:p-10">
          <Eyebrow>{c.unsureEyebrow}</Eyebrow>
          <Display size="xs">{c.unsureTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">{c.unsureP}</p>
          <Button to={bookFor("infusion")}>{infusionCopy.band.cta}</Button>
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
