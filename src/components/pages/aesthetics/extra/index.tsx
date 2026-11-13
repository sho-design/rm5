import type { ComponentType } from "react";
import { InjectablesExtra } from "./InjectablesExtra";
import { LaserExtra } from "./LaserExtra";
import { MenExtra } from "./MenExtra";
import { PlansExtra } from "./PlansExtra";
import { SkinExtra } from "./SkinExtra";

/** Extra sections for aesthetics topic pages, rendered by TopicPage after the option cards (Nov 2026). */
export const aesExtra: Partial<Record<string, ComponentType>> = {
  aesLaser: LaserExtra,
  aesInjectables: InjectablesExtra,
  aesSkin: SkinExtra,
  aesMen: MenExtra,
  aesPlans: PlansExtra,
};
