import type { CollectionConfig } from "payload";
import { anyone, isStaff } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";
import { pathOptions } from "../fields";

/**
 * Per-page search settings. Anything left blank falls back to the page's
 * built-in title and description, so an empty collection changes nothing.
 */
export const PageSeo: CollectionConfig = {
  slug: "page-seo",
  labels: { singular: "Page SEO", plural: "Page SEO" },
  admin: { useAsTitle: "path", defaultColumns: ["path", "title", "noIndex", "updatedAt"], group: "Search", description: "Title tags, descriptions and social images per page. Blank fields keep the built-in defaults." },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  hooks: { afterChange: [auditAfterChange, revalidateAfterChange], afterDelete: [auditAfterDelete, revalidateAfterDelete] },
  fields: [
    { name: "path", type: "select", required: true, unique: true, options: pathOptions, admin: { description: "The page this applies to" } },
    { name: "title", type: "text", maxLength: 70, admin: { description: "Title tag, up to 60 to 70 characters. The site name is added automatically." } },
    { name: "description", type: "textarea", maxLength: 170, admin: { description: "Meta description, 120 to 160 characters." } },
    { name: "ogImage", type: "upload", relationTo: "media", label: "Social share image", admin: { description: "1200 by 630 works everywhere." } },
    { name: "canonical", type: "text", admin: { description: "Only if this page should point search engines to a different URL." } },
    { name: "noIndex", type: "checkbox", defaultValue: false, label: "Hide from search engines" },
    { name: "notes", type: "textarea", admin: { description: "Internal notes for the team. Not shown on the site." } },
  ],
};
