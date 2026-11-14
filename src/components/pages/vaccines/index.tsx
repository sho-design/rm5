import type { ComponentType } from "react";
import { VaccineLifetime } from "./VaccineLifetime";
import { CardToChart } from "./CardToChart";
import { FamilyLineUp } from "./FamilyLineUp";
import { FluYear } from "./FluYear";
import { TwoTeams } from "@/components/pages/pregnancy/TwoTeams";
import { WhenToCall } from "@/components/pages/pregnancy/WhenToCall";
import { ChartToTwo } from "@/components/pages/pregnancy/ChartToTwo";

/** The Vaccines page's own sections (November 2026), in reading order, after the "What we give." cards. */
function VaccinesExtra() {
  return (
    <>
      <VaccineLifetime />
      <FluYear />
      <FamilyLineUp />
      <CardToChart />
    </>
  );
}

/** The Pregnancy care page's own sections (November 2026), in the order a patient lives them. */
function PregnancyExtra() {
  return (
    <>
      <TwoTeams />
      <WhenToCall />
      <ChartToTwo />
    </>
  );
}

/** Extra sections for Family Medicine topic pages, rendered by TopicPage like the aesthetics extras. */
export const familyExtra: Partial<Record<string, ComponentType>> = {
  vaccines: VaccinesExtra,
  pregnancy: PregnancyExtra,
};
