/**
 * Placeholder photography from the prototype. Every image on the site is
 * generated placeholder art and must be replaced with real clinic
 * photography before launch (see design/handoff/README.md, "Assets", and the
 * dress and casting rules in CLAUDE.md). Swap the URL here; nothing else
 * references the CDN.
 */
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_2vgr4LDcTnBdquYG4fMZ396AWcW/";
const u = (f: string) => CDN + f;

export const images = {
  /** Home hero slide 1 and Maple placeholder */
  heroFamilyPark: u("hf_20260909_211042_a7b5fb6e-1495-4937-b800-a600b041bfa1.png"),

  division: {
    family: u("hf_20260910_054249_bd7a3056-7a1d-4dbe-a847-bc8b6f8a47be.png"),
    pain: u("hf_20260909_211043_05a3377c-e39a-48b9-a370-cc57ac35b4ff.png"),
    infusion: u("hf_20260903_065035_4eb86c4d-cbea-4406-bab0-68391c4f0fe6.png"),
    aesthetics: u("hf_20260909_210338_1f84abb8-ac77-4c13-9c48-3229a771d31d.png"),
    rehab: u("hf_20260910_054249_a518bfca-7f1e-4738-913f-636c0be7311a.png"),
    about: u("hf_20260910_054249_827089e8-0c06-4cd4-8bf6-a5c62209099d.png"),
  },

  /** Service photo sets per division (index matches the services list). */
  services: {
    family: [
      u("hf_20260910_060105_8329f471-e16c-4599-a5fd-eff9f29e5099.png"),
      u("hf_20260910_060105_9b4d161b-dd26-4b8e-924b-c14a0b0b4781.png"),
      u("hf_20260910_060501_0a575c64-3c00-4281-b6fa-284409f91a6b.png"),
      u("hf_20260903_071606_44b313fa-3033-44bf-a024-17701e5927ec.png"),
      u("hf_20260910_073149_153c186f-0341-4d36-8958-e6247e19e5a6.png"),
      u("hf_20260910_073149_293484ff-e14d-4d0f-972a-1b668d03266f.png"),
      u("hf_20260910_060106_c7475602-29ee-4141-a321-16e71b5c1059.png"),
    ],
    pain: [
      u("hf_20260910_060105_c154b387-2385-491a-ac68-dc6b9755e457.png"),
      u("hf_20260910_061842_d0319aa0-35a0-42ca-96da-4b1503a2b0a2.png"),
      u("hf_20260910_060106_abc95505-83c9-45ac-ab5b-ce03c3234ff9.png"),
      u("hf_20260910_060106_6bb59618-c559-4e39-8d6f-7730e6ba007b.png"),
    ],
    infusion: [] as string[],
    aesthetics: [
      u("hf_20260910_060106_5521c7a3-3ad2-47ac-aa52-1dc48b081adb.png"),
      u("hf_20260910_060105_0cb3ed00-0123-4bf6-9412-d03a4ea9b74b.png"),
      u("hf_20260910_060106_9b258e31-bb6b-4f3d-9382-a799be178147.png"),
      u("hf_20260910_060105_1363ae38-7a9d-4eea-bee9-380731ae86bf.png"),
    ],
    rehab: [
      u("hf_20260910_060114_91d3748a-8c8f-4201-97bc-6399fa640864.png"),
      u("hf_20260910_060114_18963610-7ef5-4074-a2c4-a5552f995238.png"),
      u("hf_20260910_060502_dffa0d22-df5a-43d6-806c-09483a0b5cbe.png"),
      u("hf_20260910_060114_b8564f6d-ac50-4094-9446-7e43874aa6e0.png"),
    ],
    about: [
      u("hf_20260910_060114_48022622-60ae-4334-b848-c5833f31d3bf.png"),
      u("hf_20260910_060114_9c154cfc-4fa9-419b-bda9-78a539a4966b.png"),
      u("hf_20260910_060114_c23376f0-56e3-45ee-b544-365dcbe6b173.png"),
      u("hf_20260910_060114_b788a1d8-7536-4324-a8ef-ab33e2246cc4.png"),
    ],
  },

  /** Location page service tiles */
  location: {
    family: u("hf_20260910_054249_6d69b0c5-bf4a-409b-a4cc-f300008e4ff6.png"),
    pain: u("hf_20260910_053343_a16fe24a-bef4-4a55-8c39-e33b4e4d46a5.png"),
    infusion: u("hf_20260910_054249_92d534a6-fc85-47a1-b2d4-dfa0c042669f.png"),
    aesthetics: u("hf_20260910_054249_b8452288-39db-4136-a01b-83d24d05d61e.png"),
    rehab: u("hf_20260910_054249_b106cbee-9ab4-4e8b-94f3-8de24911a742.png"),
  },

  /** Health note heroes */
  notes: {
    "iron-infusion": u("hf_20260911_055325_6dbe2234-4d5c-4269-a3d5-594369bb3cf3.png"),
    "iron-infusion-alt": u("hf_20260911_055325_a52ad731-f02d-4327-9bce-9b5e8afcade3.png"),
    "flu-shot-faq": u("hf_20260911_055045_591c23b8-3c47-4870-8094-5c450ffd40e4.png"),
    "headache-when-to-see": u("hf_20260911_055045_19619b82-9710-4027-8657-aecaea97a565.png"),
    "nerve-block-prep": u("hf_20260911_055045_a31ae451-66b1-4b04-ba30-f12fb98b233a.png"),
    "reading-requisition": u("hf_20260911_055046_8500143f-3de6-40a8-967d-0d7eef0f24fe.png"),
    "physio-first-visit": u("hf_20260911_055045_a6946224-757a-40fc-95f9-7771e3565307.png"),
  },

  /** Iron therapy page hero photo */
  ironHero: u("hf_20260912_074608_821f2bd7-99fa-4c0a-91f9-20c88e407960.png"),

  /** Iron therapy page visit photo */
  ironVisit: u("hf_20260911_055325_6dbe2234-4d5c-4269-a3d5-594369bb3cf3.png"),

  logos: {
    tmu: "/logos/tmu-logo.webp",
    anderson: "/logos/anderson-horizontal-dark.png",
    andersonWhite: "/logos/anderson-white.png",
  },
} as const;

export type ImageKey = keyof typeof images;
