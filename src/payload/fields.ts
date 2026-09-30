import type { Field, Option } from "payload";
import { routes } from "../lib/routes";

export const divisionOptions: Option[] = [
  { label: "Family Medicine", value: "Family Medicine" },
  { label: "Pain Centre", value: "Pain Centre" },
  { label: "Infusion Therapy", value: "Infusion Therapy" },
  { label: "Medical Aesthetics", value: "Medical Aesthetics" },
  { label: "Rehab & Recovery", value: "Rehab & Recovery" },
];

/** Every site route, for link and SEO pickers. */
export const routeOptions: Option[] = Object.entries(routes)
  .filter(([key]) => key !== "legal")
  .map(([key, path]) => ({ label: `${path}  (${key})`, value: key }));

/** Path options for per-page SEO, one per static page. */
export const pathOptions: Option[] = Array.from(new Set(Object.values(routes)))
  .sort()
  .map((p) => ({ label: p, value: p }));

/** A link target: a site page or an outside URL. */
export function linkFields(prefix = ""): Field[] {
  const n = (s: string) => (prefix ? `${prefix}${s[0].toUpperCase()}${s.slice(1)}` : s);
  return [
    {
      type: "row",
      fields: [
        { name: n("page"), type: "select", options: routeOptions, admin: { width: "50%", description: "A page on this site" } },
        { name: n("url"), type: "text", admin: { width: "50%", description: "Or an outside URL (overrides the page)" } },
      ],
    },
  ];
}

/** Image upload with a URL fallback for the placeholder photography. */
export function imageFields(name = "image", label = "Image"): Field[] {
  return [
    { name, type: "upload", relationTo: "media", label, admin: { description: "Upload a photo. Follow the dress and casting rules in CLAUDE.md." } },
    { name: `${name}Url`, type: "text", label: `${label} URL fallback`, admin: { description: "Used when no upload is set. Placeholder photography lives here until real photos are shot." } },
  ];
}

export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: { description: "Lower case, hyphens only. Changing it changes the page address." },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = (value as string | undefined) || (data?.[from] as string | undefined) || "";
        return source
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    ],
  },
});
