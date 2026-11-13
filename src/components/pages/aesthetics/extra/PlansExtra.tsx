import { routes } from "@/lib/routes";
import { AesPrograms } from "../AesPrograms";
import { YearWheel } from "./plans/YearWheel";

/**
 * Plans page: "A year of care", the month wheel and what usually fits each season, then the combined programs
 * ("Treatments that work together", moved here from the treatment menu in Nov 2026). The event program links to the
 * event planner, which stays on the menu.
 */
export function PlansExtra() {
  return (
    <>
      <YearWheel />
      <AesPrograms eventHref={`${routes.aesMenu}#event-plan`} />
    </>
  );
}
