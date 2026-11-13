import { DeviceCards } from "./laser/DeviceCards";
import { ConcernGrid, DowntimeRuler, SafetyCare } from "./laser/LaserGuide";
import { LightTarget } from "./laser/LightTarget";

/**
 * Laser page additions (Nov 2026): the devices we use, the "How light finds its target" explainer, which device
 * fits which concern, downtime, skin tone and safety, and care before and after. Copy in content/aes-laser.ts.
 */
export function LaserExtra() {
  return (
    <>
      <DeviceCards />
      <LightTarget />
      <ConcernGrid />
      <DowntimeRuler />
      <SafetyCare />
    </>
  );
}
