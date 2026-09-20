import { menCopy, menDecades } from "@/content/subpages";
import { MetaTileSection } from "@/components/pages/kids/FamilySubBits";

/** By decade: four tinted cards with the checkup cadence as meta. */
export function MenDecades() {
  return <MetaTileSection id="decades" eyebrow={menCopy.decades.eyebrow} accentClass="text-sky" title={menCopy.decades.title} note={menCopy.decades.note} items={menDecades} />;
}
