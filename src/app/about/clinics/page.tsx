import type { Metadata } from "next";
import { Display, Eyebrow, Lead } from "@/components/ui";
import { locationsCopy } from "@/content/about";
import { divisions, divisionOrder, tints } from "@/content/divisions";
import { images } from "@/content/images";
import { getLocations } from "@/lib/cms";
import { LocationsView } from "@/components/pages/locations/LocationsView";
import type { LocationView } from "@/components/pages/locations/types";

export const metadata: Metadata = {
  title: locationsCopy.h1,
  description: locationsCopy.lead,
};

export default async function ClinicsPage() {
  const locations: LocationView[] = (await getLocations()).map((l) => ({
    ...l,
    tiles: divisionOrder
      .filter((k) => l.services.includes(k))
      .map((k, i) => ({ key: k, label: divisions[k].label, tag: divisions[k].tag, tint: tints[i % tints.length], img: images.location[k] })),
  }));
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-10 md:px-content md:pt-16">
        <Eyebrow tone="sky">{locationsCopy.eyebrow}</Eyebrow>
        <Display as="h1" size="lg">
          {locationsCopy.h1}
        </Display>
        <Lead size="md" tone="muted">
          {locationsCopy.lead}
        </Lead>
      </header>
      <LocationsView locations={locations} />
    </>
  );
}
