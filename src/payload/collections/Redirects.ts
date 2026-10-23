import { APIError, type CollectionConfig } from "payload";
import { isStaff } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const path = /^\/[^\s?#]*$/;

/**
 * Old address to new address, for links from the previous website, print
 * material or social posts. Checked only when no page matches the address,
 * just before the 404, so a redirect can never hide a real page. Changes
 * apply within minutes, no deploy needed.
 */
export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: { singular: "Redirect", plural: "Redirects" },
  admin: {
    useAsTitle: "from",
    defaultColumns: ["from", "to", "permanent", "updatedAt"],
    group: "Search",
    description: "Send an old address to a page on this site. Use for links from the previous website or printed material.",
  },
  access: { read: isStaff, create: isStaff, update: isStaff, delete: isStaff },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data;
        const from = String(data.from ?? "").trim().replace(/\/+$/, "") || "/";
        const to = String(data.to ?? "").trim();
        if (!path.test(from)) throw new APIError('"Old address" must be a path starting with /, for example /contact-us', 400);
        if (!(to.startsWith("/") || /^https:\/\//.test(to))) throw new APIError('"New address" must start with / or https://', 400);
        if (from === to) throw new APIError("The old and new addresses are the same.", 400);
        return { ...data, from: from.toLowerCase(), to };
      },
    ],
    afterChange: [auditAfterChange, revalidateAfterChange],
    afterDelete: [auditAfterDelete, revalidateAfterDelete],
  },
  fields: [
    { name: "from", type: "text", label: "Old address", required: true, unique: true, index: true, admin: { description: "Path only, for example /contact-us" } },
    { name: "to", type: "text", label: "New address", required: true, admin: { description: "A path on this site, for example /about/contact, or a full https:// link" } },
    { name: "permanent", type: "checkbox", defaultValue: true, admin: { description: "Leave on for moved pages (tells search engines to update)." } },
    { name: "note", type: "text", admin: { description: "Why this exists, for example: old site page" } },
  ],
};
