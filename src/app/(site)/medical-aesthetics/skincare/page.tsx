import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PageHeader } from "@/components/ui";
import { SkincareList } from "@/components/pages/aesthetics/SkincareList";
import { MorningShield } from "@/components/pages/aesthetics/skinceuticals/MorningShield";
import { RoutineBuilder } from "@/components/pages/aesthetics/skinceuticals/RoutineBuilder";
import {
  ApplyAndCompare,
  CleanseCorrectProtect,
} from "@/components/pages/aesthetics/skinceuticals/SkinGuide";
import { divisions } from "@/content/divisions";
import { skincareCopy as c } from "@/content/skincare";
import { bookFor } from "@/lib/routes";

const baseMetadata: Metadata = {
  title: "SkinCeuticals skincare",
  description: `${c.title} ${c.lead}`,
};

export async function generateMetadata() {
  return pageMetadata("aesSkincare", baseMetadata);
}

/**
 * SkinCeuticals at the clinic. For someone new to skincare (Nov 2026): the three jobs of a routine, why an
 * antioxidant serum goes under sunscreen (animated), a routine builder from our regimens, how to apply and the vitamin
 * C serums compared. Then every retail product we sell, with suggested retail prices and our sales disclosure.
 * Nothing is sold online.
 */
export default function SkincarePage() {
  const div = divisions.aesthetics;
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <CleanseCorrectProtect />
      <MorningShield />
      <RoutineBuilder />
      <ApplyAndCompare />
      <SkincareList />
      <CtaBand
        title={div.footCta ?? ""}
        sub={c.bandSub}
        cta={c.bookConsult}
        ctaTo={bookFor("aesthetics", "consult")}
      />
    </>
  );
}
