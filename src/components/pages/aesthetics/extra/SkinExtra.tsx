import { HydraExplainer } from "./skin/HydraExplainer";
import { NeedleExplainer } from "./skin/NeedleExplainer";
import { SeriesPlanner } from "./skin/SeriesPlanner";
import { SkinCare } from "./skin/SkinCare";
import { SkinLadder } from "./skin/SkinLadder";

/**
 * Skin treatments page, added sections (Nov 2026): the ladder from gentle to deeper with goal chips, "Inside a
 * HydraFacial", "Microneedling, up close", a series planner, then aftercare and who should wait. Copy lives in
 * content/aes-skin.ts.
 */
export function SkinExtra() {
  return (
    <>
      <SkinLadder />
      <HydraExplainer />
      <NeedleExplainer />
      <SeriesPlanner />
      <SkinCare />
    </>
  );
}
