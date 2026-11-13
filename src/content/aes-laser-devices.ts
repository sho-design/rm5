import { draft } from "./review";
import {
  laserConcerns,
  laserDevices,
  type LaserDevice,
  type LaserDeviceKey,
} from "./aes-laser";

/*
 * One page per laser and energy device (November 2026), for patients who search a device by name and for the
 * clinic's own before and after photos. Facts come from content/aes-laser.ts so each device is described once.
 */

/** Address of each device page, under /medical-aesthetics/laser/. */
export const deviceSlug: Record<LaserDeviceKey, string> = {
  picosure: "picosure",
  clarity: "clarity-ii",
  eco2: "eco2",
  xerf: "xerf",
  plexr: "plexr-plus",
  healite: "healite-ii",
};

export const devicePath = (k: LaserDeviceKey) =>
  `/medical-aesthetics/laser/${deviceSlug[k]}`;

/** Search title (the template adds " | Restoration Medical") and the plain words people search with. */
export const deviceSeo: Record<
  LaserDeviceKey,
  { title: string; description: string; keys: string }
> = {
  picosure: {
    title: "PicoSure laser in Thornhill",
    description: draft(
      "PicoSure picosecond laser at Restoration Medical in Thornhill, for sun spots, uneven tone, texture and tattoo removal. Planned at a complimentary consult.",
    ),
    keys: "picosure pico laser picosecond pigment sun spots tattoo removal",
  },
  clarity: {
    title: "Clarity II laser in Thornhill",
    description: draft(
      "Clarity II dual-wavelength laser at Restoration Medical in Thornhill, for redness, small vessels, hair removal and pigment. Planned at a complimentary consult.",
    ),
    keys: "clarity ii clarity 2 lutronic laser hair removal redness veins vessels alexandrite nd yag",
  },
  eco2: {
    title: "Fractional CO₂ laser (eCO₂) in Thornhill",
    description: draft(
      "eCO₂ fractional CO₂ laser at Restoration Medical in Thornhill, for texture, acne scars and fine lines. Planned at a complimentary consult.",
    ),
    keys: "eco2 co2 fractional co2 laser resurfacing acne scars texture baby co2",
  },
  xerf: {
    title: "XERF radiofrequency skin tightening in Thornhill",
    description: draft(
      "XERF radiofrequency skin tightening at Restoration Medical in Thornhill, for loose skin and texture, with no needles. Planned at a complimentary consult.",
    ),
    keys: "xerf radiofrequency rf skin tightening loose skin",
  },
  plexr: {
    title: "PlexR Plus plasma in Thornhill",
    description: draft(
      "PlexR Plus plasma at Restoration Medical in Thornhill, for eyelid skin, skin tags and small lesions. Planned at a complimentary consult.",
    ),
    keys: "plexr plexr plus plasma eyelid skin tags lesions blepharoplasty non surgical",
  },
  healite: {
    title: "Healite II LED light in Thornhill",
    description: draft(
      "Healite II LED light at Restoration Medical in Thornhill, often added at the end of another treatment. Planned at a complimentary consult.",
    ),
    keys: "healite healite ii led light therapy",
  },
};

/**
 * Before and after photos per device. EMPTY ON PURPOSE: the site does not show patient photos today (see the
 * Before & after page). Add photos only once the clinic has decided to show them, with the patient's written
 * consent on file for each photo and the caption the clinic's advertising rules require. The page shows the
 * gallery only when a device has photos here.
 */
export type DevicePhoto = {
  before: string;
  after: string;
  alt: string;
  caption: string;
  consentOnFile: true;
};
export const devicePhotos: Record<LaserDeviceKey, DevicePhoto[]> = {
  picosure: [],
  clarity: [],
  eco2: [],
  xerf: [],
  plexr: [],
  healite: [],
};

export const deviceCopy = {
  factsTitle: draft("At a glance"),
  usedFor: draft("Often used for"),
  feels: draft("How a visit feels"),
  downtime: draft("Downtime"),
  sessions: draft("How many visits"),
  howTitle: draft("How it works"),
  concernsTitle: draft("Concerns it is often considered for"),
  concernsNote: draft(
    "A starting point. Your consult decides what fits your skin, and it may be another option or nothing at all.",
  ),
  photosTitle: draft("Before and after"),
  photosNote: draft(
    "Photos of our own patients, shown with their written consent. Individual results vary.",
  ),
  faqTitle: draft("Questions about"),
  othersTitle: draft("Our other lasers and devices"),
  allDevices: draft("Compare every device on the laser page"),
  book: draft("Book a laser consult"),
  covered: {
    q: draft("Is it covered by OHIP?"),
    a: draft(
      "No. Aesthetic treatments are elective and not covered by OHIP. Your price is given in writing at a complimentary consult, before you decide.",
    ),
  },
  consult: {
    q: draft("Do I need a consult first?"),
    a: draft(
      "Yes. A complimentary consult with our nurse comes first, with screening for your skin, medications and health. A physician joins when your concern needs one.",
    ),
  },
};

/** Questions for a device page, answered from the device's own facts. */
export function deviceFaq(d: LaserDevice) {
  return [
    { q: draft(`What is ${d.name}?`), a: d.plain },
    { q: draft("Does it hurt?"), a: d.feels },
    { q: draft("Is there downtime?"), a: d.downtime },
    { q: draft("How many visits will I need?"), a: d.sessions },
    deviceCopy.consult,
    deviceCopy.covered,
  ];
}

export const deviceConcerns = (k: LaserDeviceKey) =>
  laserConcerns.filter((c) => c.devices.includes(k)).map((c) => c.t);
export const deviceBySlug = (slug: string) =>
  laserDevices.find((d) => deviceSlug[d.k] === slug);
