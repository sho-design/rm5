import { draft } from "./review";

/*
 * Laser page extras (November 2026): the devices we use, which concern each is often chosen for, downtime, skin
 * tone and safety, care before and after, and the "How light finds its target" explainer.
 *
 * Device facts kept to well-known specifications and to what the treatment menu already says
 * (content/aesthetics-menu.ts). CLINIC TO CONFIRM: wavelengths and handpieces on the clinic's own units
 * (PicoSure 755 nm only, or also 532 nm), session counts, numbing, and the isotretinoin wait.
 */

export type LaserDeviceKey =
  "picosure" | "clarity" | "eco2" | "xerf" | "plexr" | "healite";

export type LaserDevice = {
  k: LaserDeviceKey;
  name: string;
  kind: string;
  plain: string;
  usedFor: string[];
  feels: string;
  downtime: string;
  /** Position on the downtime ruler: 0 none, 1 a day or two, 2 several days. */
  level: 0 | 1 | 2;
  sessions: string;
  color: string;
};

export const laserDevices: LaserDevice[] = [
  {
    k: "picosure",
    name: "PicoSure",
    kind: draft("Picosecond laser, 755 nm"),
    plain: draft(
      "Very short pulses of light, a trillionth of a second each, that break pigment into tiny pieces your body clears away.",
    ),
    usedFor: [
      draft("Sun spots and uneven tone"),
      draft("Texture and acne scars"),
      draft("Tattoo removal"),
    ],
    feels: draft(
      "Quick snaps on the skin, often compared to a rubber band. Numbing cream can be used.",
    ),
    downtime: draft(
      "A day or two of redness. Spots can darken before they fade.",
    ),
    level: 1,
    sessions: draft("A short series, set at your consult."),
    color: "#8E5FB5",
  },
  {
    k: "clarity",
    name: "Clarity II",
    kind: draft("Dual-wavelength laser, 755 nm and 1064 nm"),
    plain: draft(
      "Two lasers in one. The shorter wavelength stays near the surface; the longer one reaches deeper, to vessels and hair roots.",
    ),
    usedFor: [
      draft("Redness and small vessels"),
      draft("Unwanted hair"),
      draft("Pigment and acne"),
    ],
    feels: draft("A cooling burst with each pulse, then a warm snap."),
    downtime: draft("Usually back to your day. Some pinkness for a few hours."),
    level: 0,
    sessions: draft(
      "A series, spaced a few weeks apart. Hair removal needs more visits.",
    ),
    color: "#C4573A",
  },
  {
    k: "eco2",
    name: "eCO₂",
    kind: draft("Fractional CO₂ laser, 10,600 nm"),
    plain: draft(
      "Makes a grid of tiny columns in the skin and leaves the skin between them untouched, so it heals from all sides.",
    ),
    usedFor: [
      draft("Acne scars"),
      draft("Deep texture and lines"),
      draft("Loose skin"),
    ],
    feels: draft(
      "Numbing cream first, then warmth and prickling. Afterwards it feels like a sunburn.",
    ),
    downtime: draft(
      "Several days of redness and flaking. Baby CO₂ is lighter, with less downtime.",
    ),
    level: 2,
    sessions: draft("Often 1 to 3, set at your consult."),
    color: "#2F7FD1",
  },
  {
    k: "xerf",
    name: "XERF",
    kind: draft("Radiofrequency skin tightening"),
    plain: draft(
      "Not a laser: radio waves gently heat the deeper skin, with no needles, which prompts collagen to tighten and renew.",
    ),
    usedFor: [draft("Loose skin on the face, neck or body"), draft("Texture")],
    feels: draft("A warm, massage-like heat. No needles."),
    downtime: draft("None. Back to your day."),
    level: 0,
    sessions: draft("Usually a series of 3."),
    color: "#B8860B",
  },
  {
    k: "plexr",
    name: "PlexR Plus",
    kind: draft("Plasma"),
    plain: draft(
      "Tiny plasma sparks just above the skin, without touching it, that tighten and lift small areas such as eyelid skin.",
    ),
    usedFor: [draft("Eyelid skin"), draft("Skin tags and small lesions")],
    feels: draft("Numbing first. You may feel heat as the sparks pass."),
    downtime: draft("Several days. Small dots form and fall off on their own."),
    level: 2,
    sessions: draft("Usually 2 sessions."),
    color: "#4E9BD8",
  },
  {
    k: "healite",
    name: "Healite II",
    kind: draft("LED light"),
    plain: draft(
      "Gentle light from a panel above the skin. Often added at the end of another treatment.",
    ),
    usedFor: [draft("Added on after another treatment")],
    feels: draft(
      "You lie back under a lit panel with eye protection. Nothing touches the skin.",
    ),
    downtime: draft("None."),
    level: 0,
    sessions: draft("Added to a visit, as your nurse suggests."),
    color: "#D9707F",
  },
];

/** Which devices are often considered for each concern. A starting point; the consult decides. */
export const laserConcerns: { t: string; devices: LaserDeviceKey[] }[] = [
  { t: draft("Sun spots and uneven tone"), devices: ["picosure", "clarity"] },
  { t: draft("Redness and small vessels"), devices: ["clarity"] },
  { t: draft("Unwanted hair"), devices: ["clarity"] },
  { t: draft("Acne and acne scars"), devices: ["picosure", "clarity", "eco2"] },
  { t: draft("Texture and fine lines"), devices: ["picosure", "eco2", "xerf"] },
  { t: draft("Loose skin"), devices: ["eco2", "xerf", "plexr"] },
  { t: draft("Eyelid skin"), devices: ["plexr"] },
  { t: draft("Skin tags and small lesions"), devices: ["plexr", "clarity"] },
  { t: draft("Tattoos"), devices: ["picosure"] },
  { t: draft("Added on to another visit"), devices: ["healite"] },
];

export const laserCopy = {
  devicesEyebrow: draft("The devices we use"),
  devicesTitle: draft("Six tools, each for a different job."),
  devicesLead: draft(
    "Most are lasers. One uses radio waves, one uses plasma and one uses gentle LED light. Your nurse matches the tool to your skin and your concern.",
  ),
  usedFor: draft("Often used for"),
  feels: draft("How it feels"),
  downtime: draft("Downtime"),
  sessions: draft("Visits"),
  gridEyebrow: draft("Which device fits"),
  gridTitle: draft("Find your concern."),
  gridLead: draft(
    "Starting points only. Your consult decides what is right for your skin, and that may be skincare alone.",
  ),
  gridConcern: draft("Concern"),
  gridYes: draft("Often considered"),
  rulerEyebrow: draft("Downtime"),
  rulerTitle: draft("From back to work to a quiet week."),
  rulerStops: [
    draft("Back to your day"),
    draft("A day or two"),
    draft("Several days"),
  ],
  safetyEyebrow: draft("Skin tone and safety"),
  safetyTitle: draft("Lasers read colour, so we read your skin first."),
  safetyLead: draft(
    "Light is drawn to colour: pigment, blood and hair. Your skin tone guides which device and settings are safe for you. Some, such as PicoSure and the 1064 nm side of Clarity II, are often chosen for deeper skin tones.",
  ),
  safetyWait: draft(
    "Tell us, and we may wait or choose another option, if you:",
  ),
  safetyItems: [
    draft("Are pregnant or breastfeeding."),
    draft("Have a tan or self-tan, or plan time in the sun soon."),
    draft("Took isotretinoin (Accutane) recently."),
    draft("Get cold sores near the area."),
    draft("Take medication that makes you sensitive to light."),
    draft("Have a tattoo or permanent makeup in the area."),
  ],
  careEyebrow: draft("Before and after"),
  careTitle: draft("Simple care makes a difference."),
  before: draft("Before your visit"),
  beforeItems: [
    draft(
      "Stay out of the sun and skip tanning and self-tan in the weeks before.",
    ),
    draft("Your nurse tells you when to pause retinol and exfoliating acids."),
    draft("Come with clean skin, no makeup on the area."),
  ],
  after: draft("After your visit"),
  afterSteps: [
    {
      t: draft("The first day"),
      d: draft("Pink and warm, like a mild sunburn. Cool, gentle care only."),
    },
    {
      t: draft("The next few days"),
      d: draft(
        "Some dryness or flaking. Treated spots can look darker before they lift.",
      ),
    },
    {
      t: draft("About a week"),
      d: draft(
        "Lighter treatments have settled. Deeper ones take a little longer. Sunscreen every morning throughout.",
      ),
    },
  ],
  afterLink: draft("See the recovery kit routine"),
  // Explainer
  figEyebrow: draft("How light finds its target"),
  figTitle: draft("Each tool reaches a different depth."),
  figLead: draft(
    "Pick a device to see where it works in the skin and what it does there.",
  ),
  pause: draft("Pause"),
  play: draft("Play"),
  note: draft("Illustration, not your results."),
  pickLabel: draft("Device"),
  wave755: "755 nm",
  wave1064: "1064 nm",
  waveLabel: draft("Wavelength"),
  layers: {
    surface: draft("Surface"),
    epidermis: draft("Epidermis"),
    dermis: draft("Dermis"),
    deep: draft("Deep dermis"),
    fat: draft("Fat"),
  },
  depth: draft("Depth"),
  frames: {
    picosure: {
      short: draft("Breaks up pigment"),
      d: draft(
        "Very short pulses hit a cluster of pigment near the surface. It breaks into tiny pieces that your body clears over the following weeks.",
      ),
      alt: draft(
        "Diagram: a picosecond laser beam reaches a cluster of pigment in the top layer of skin, which breaks into small particles that drift apart.",
      ),
    },
    clarity755: {
      short: draft("Reaches the hair root"),
      d: draft(
        "The 755 nm beam is drawn to the dark pigment in a hair root, which warms up. Used for hair removal and pigment.",
      ),
      alt: draft(
        "Diagram: a 755 nanometre beam reaches a hair root in the dermis, which glows warm.",
      ),
    },
    clarity1064: {
      short: draft("Reaches a small vessel"),
      d: draft(
        "The 1064 nm beam travels deeper, to a small blood vessel, which warms and closes over time. Used for redness and small vessels.",
      ),
      alt: draft(
        "Diagram: a 1064 nanometre beam travels deeper to a small blood vessel, which glows and narrows.",
      ),
    },
    eco2: {
      short: draft("Makes tiny columns"),
      d: draft(
        "A grid of tiny columns opens in the skin, with untouched skin between them. New collagen fills them in as the skin heals.",
      ),
      alt: draft(
        "Diagram: a fractional laser makes a grid of narrow columns into the skin, which then fill with new collagen fibres.",
      ),
    },
    xerf: {
      short: draft("Warms the deep layer"),
      d: draft(
        "Radio waves warm the deeper skin without needles. The collagen fibres there tighten and renew over the following months.",
      ),
      alt: draft(
        "Diagram: waves of heat spread through the deep layer of skin and loose collagen fibres draw tighter.",
      ),
    },
    plexr: {
      short: draft("Sparks at the surface"),
      d: draft(
        "Tiny plasma sparks pass just above the surface without touching it. The skin there tightens and lifts slightly.",
      ),
      alt: draft(
        "Diagram: small plasma sparks hop along the skin surface, which draws slightly upward.",
      ),
    },
    healite: {
      short: draft("Gentle light"),
      d: draft(
        "Soft LED light from a panel above shines into the upper layers. Often added at the end of another treatment.",
      ),
      alt: draft(
        "Diagram: soft light from a panel above glows evenly into the upper layers of skin.",
      ),
    },
  },
};
