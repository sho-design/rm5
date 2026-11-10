import { draft } from "./review";
import type { LinkTarget } from "./types";

export interface YearItem {
  t: string;
  svc: string;
  page: LinkTarget;
}

export interface YearSeason {
  name: string;
  months: string;
  bg: string;
  items: YearItem[];
}

export interface ScreeningRow {
  t: string;
  d: string;
  how: string;
}

/**
 * Your year of staying well: four seasons, with items that apply to the
 * given age and sex (the prototype's Y(t, svc, page, ok) rows).
 */
export function yearSeasons(age: number, female: boolean): YearSeason[] {
  const Y = (t: string, svc: string, page: LinkTarget, ok = true): YearItem[] => (ok ? [{ t, svc, page }] : []);
  const fem = female;
  return [
    {
      name: "Fall",
      months: "Sep to Nov",
      bg: "#FFF3C4",
      items: [
        ...Y("Flu shot", "Family Medicine, from October", "family"),
        ...Y("Annual checkup", "Family Medicine, OHIP", "family"),
        ...Y("Shingles vaccine", "Family Medicine, funded 65 to 70", "family", age >= 65 && age <= 70),
      ],
    },
    {
      name: "Winter",
      months: "Dec to Feb",
      bg: "#EEF5FC",
      items: [
        ...Y("Fasting bloodwork", "On site, cholesterol and sugars", "blood", age >= 40),
        ...Y("Iron and vitamin D check", "Bloodwork on site", "iron"),
        ...Y("Joint and back check-in", "Pain Centre or Rehab", "pain"),
      ],
    },
    {
      name: "Spring",
      months: "Mar to May",
      bg: "#E6F4EA",
      items: [
        ...Y("Cervical screening", "Every 3 years, 25 to 69", "family", fem && age >= 25 && age <= 69),
        ...Y("Mammogram requisition", "Every 2 years, 40 to 74", "family", fem && age >= 40 && age <= 74),
        ...Y("Prostate conversation", "From 50, your call", "family", !fem && age >= 50),
        ...Y("Skin check", "Family Medicine or Aesthetics", "aesthetics"),
        ...Y("Allergy plan", "Family Medicine", "family"),
      ],
    },
    {
      name: "Summer",
      months: "Jun to Aug",
      bg: "#FDE8E4",
      items: [
        ...Y("Colon screening (FIT)", "Every 2 years, 50 to 74", "family", age >= 50 && age <= 74),
        ...Y("Bone density", "Once at 65", "family", age >= 65),
        ...Y("Movement and balance plan", "Rehab & Recovery", "rehab"),
        ...Y("Travel health visit", "Family Medicine", "family"),
      ],
    },
  ];
}

/** Screenings that apply at the given age and sex (the prototype's SCR rows). */
export function screeningDue(age: number, female: boolean): ScreeningRow[] {
  const fem = female;
  const rows: (ScreeningRow & { ok: boolean })[] = [
    { t: "Blood pressure", d: "Checked at every visit, at least every 2 years.", how: "Any visit", ok: age >= 18 },
    { t: "Cholesterol and diabetes screen", d: "Fasting bloodwork every 3 to 5 years, sooner with risk factors.", how: "Bloodwork on site", ok: age >= 40 },
    { t: "Cervical screening (Pap)", d: "Every 3 years for anyone with a cervix, 25 to 69.", how: draft("Book a Pap with our nurses"), ok: fem && age >= 25 && age <= 69 },
    { t: "Breast screening", d: "Mammogram every 2 years, 40 to 74. We give you the requisition.", how: "Requisition from us", ok: fem && age >= 40 && age <= 74 },
    { t: "Colon cancer screening", d: "FIT stool test every 2 years, 50 to 74.", how: "Kit from your doctor", ok: age >= 50 && age <= 74 },
    { t: "Shingles vaccine", d: "Publicly funded 65 to 70.", how: "In clinic", ok: age >= 65 && age <= 70 },
    { t: "Bone density", d: "Once at 65, sooner with risk factors.", how: "Requisition from us", ok: age >= 65 },
    { t: "Prostate conversation", d: "A talk about PSA testing, 50 and up. It is your call.", how: "Book with your doctor", ok: !fem && age >= 50 },
    { t: "Yearly flu shot", d: "Everyone, every fall.", how: "From October", ok: true },
  ];
  return rows.filter((s) => s.ok).map(({ t, d, how }) => ({ t, d, how }));
}
