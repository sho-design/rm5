import { draft } from "./review";

/** "On this page" links on /family-medicine/children-youth (new wording, docs/content-review.md). */
export const kidsJumpLinks = {
  label: draft("On this page"),
  items: [
    { label: draft("Sick visits"), href: "#sick" },
    { label: draft("Care by age"), href: "#ages" },
    { label: draft("Vaccines by age"), href: "#immunizations" },
    { label: draft("School forms"), href: "#forms" },
    { label: draft("Our doctors"), href: "#doctors" },
  ],
};
