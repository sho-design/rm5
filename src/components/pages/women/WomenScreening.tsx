import { womenCopy, womenScreen } from "@/content/subpages";
import { MetaTileSection } from "@/components/pages/kids/FamilySubBits";

/** Screening timeline: four tinted cards with the age range as meta. */
export function WomenScreening() {
  return <MetaTileSection id="screening" eyebrow={womenCopy.screen.eyebrow} accentClass="text-terracotta-deep" title={womenCopy.screen.title} note={womenCopy.screen.note} items={womenScreen} />;
}
