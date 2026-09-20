import type { DivisionKey, Location } from "@/content/types";

export interface LocationService {
  key: DivisionKey;
  label: string;
  tag: string;
  tint: string;
  img: string;
}

/** Location plus the resolved service tiles for that site. */
export type LocationView = Location & { tiles: LocationService[] };
