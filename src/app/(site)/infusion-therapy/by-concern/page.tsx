import type { Metadata } from "next";
import { Button, Display, Eyebrow, Section } from "@/components/ui";
import {
  InfusionBand,
  InfusionHeader,
  InfusionSmallPrint,
} from "@/components/pages/infusion/InfusionBits";
import { ConcernPath } from "@/components/pages/infusion/extra/concern/ConcernPath";
import { infusionCopy } from "@/content/infusion-site";
import { bookFor } from "@/lib/routes";
import { draft } from "@/content/review";
import { pageMetadata } from "@/lib/seo";

const c = infusionCopy.concerns;

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("concerns", {
    title: "Infusions by concern",
    description: c.lead,
  });
}

export default function ByConcernPage() {
  return (
    <>
      <InfusionHeader
        pageKey="concerns"
        page="By concern"
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        action={
          <Button to="#concern-route" variant="outline">
            {draft("Pick your concern")}
          </Button>
        }
      />
      {/* Each concern draws its own route through the clinic (November 2026); each route ends in one next step. */}
      <ConcernPath />
      <Section>
        <div className="flex flex-col items-start gap-4 rounded-card border border-border bg-card p-6 md:p-10">
          <Eyebrow>{c.unsureEyebrow}</Eyebrow>
          <Display size="xs">{c.unsureTitle}</Display>
          <p className="pretty max-w-[640px] text-[16px] leading-[1.55] text-secondary">
            {c.unsureP}
          </p>
          <Button to={bookFor("infusion")}>{infusionCopy.band.cta}</Button>
        </div>
      </Section>
      <InfusionSmallPrint />
      <InfusionBand />
    </>
  );
}
