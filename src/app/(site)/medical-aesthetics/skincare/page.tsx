import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, PageHeader } from "@/components/ui";
import { SkincareList } from "@/components/pages/aesthetics/SkincareList";
import { divisions } from "@/content/divisions";
import { skincareCopy as c } from "@/content/skincare";
import { bookFor } from "@/lib/routes";

const baseMetadata: Metadata = { title: "SkinCeuticals skincare", description: `${c.title} ${c.lead}` };

export async function generateMetadata() {
  return pageMetadata("aesSkincare", baseMetadata);
}

/** Every SkinCeuticals retail product the clinic sells, with suggested retail prices. Nothing is sold online. */
export default function SkincarePage() {
  const div = divisions.aesthetics;
  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} className="pb-8" />
      <SkincareList />
      <CtaBand title={div.footCta ?? ""} sub={c.bandSub} cta={c.bookConsult} ctaTo={bookFor("aesthetics", "consult")} />
    </>
  );
}
