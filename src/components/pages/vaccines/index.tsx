import type { ComponentType } from "react";
import { VaccineLifetime } from "./VaccineLifetime";
import { CardToChart } from "./CardToChart";
import { FamilyLineUp } from "./FamilyLineUp";
import { FluYear } from "./FluYear";

/** The Vaccines page's own sections (November 2026), in reading order, after the "What we give." cards. */
function VaccinesExtra() {
  return (
    <>
      <VaccineLifetime />
      <FluYear />
      <CardToChart />
      <FamilyLineUp />
    </>
  );
}

/** Extra sections for Family Medicine topic pages, rendered by TopicPage like the aesthetics extras. */
export const familyExtra: Partial<Record<string, ComponentType>> = {
  vaccines: VaccinesExtra,
};
