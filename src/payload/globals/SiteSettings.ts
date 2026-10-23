import type { GlobalConfig } from "payload";
import { anyone, isAdmin } from "../access";
import { auditGlobalAfterChange } from "../hooks/audit";
import { revalidateSiteAfterChange } from "../hooks/revalidate";

/** Site-wide facts and search defaults. Admins only. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: { group: "Administration", description: "Contact details, social links and search defaults used across the site. Clinic facts must match the signage and the OHIP registration." },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [auditGlobalAfterChange, revalidateSiteAfterChange] },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            { type: "row", fields: [{ name: "phone", type: "text", defaultValue: "905-709-3222", admin: { width: "50%" } }, { name: "fax", type: "text", defaultValue: "905-761-7306", admin: { width: "50%" } }] },
            { type: "row", fields: [{ name: "contactEmail", type: "email", defaultValue: "contact@restorationmedical.ca", admin: { width: "50%" } }, { name: "referralsEmail", type: "email", defaultValue: "referrals@restorationmedical.ca", admin: { width: "50%" } }] },
            { type: "row", fields: [{ name: "careersEmail", type: "email", defaultValue: "careers@restorationmedical.ca", admin: { width: "50%" } }, { name: "placementsEmail", type: "email", defaultValue: "placements@restorationmedical.ca", admin: { width: "50%" } }] },
            { name: "closures", type: "text", defaultValue: "Fridays, Thanksgiving (Oct 12), Dec 25 and 26, Jan 1", admin: { description: "Shown under the health calendar" } },
          ],
        },
        {
          label: "Social",
          fields: [
            { name: "instagram", type: "text", defaultValue: "https://www.instagram.com/restorationmedicalofficial/" },
            { name: "facebook", type: "text", defaultValue: "https://www.facebook.com/restorationmedicalofficial/" },
            { name: "googleMaps", type: "text", label: "Google Business Profile (Thornhill)" },
            { name: "googleMapsMaple", type: "text", label: "Google Business Profile (Maple)", admin: { description: "Leave blank until the Maple profile exists" } },
          ],
        },
        {
          label: "Fees",
          description: "Uninsured services and their fees, shown on /about/fees. Leave empty to show \"ask the front desk\" instead.",
          fields: [
            {
              name: "uninsuredFees",
              type: "array",
              labels: { singular: "Fee", plural: "Fees" },
              fields: [
                { type: "row", fields: [{ name: "service", type: "text", required: true, admin: { width: "60%", description: "For example: Sick note for work" } }, { name: "fee", type: "text", required: true, admin: { width: "40%", description: "For example: $25, HST included" } }] },
                { name: "note", type: "text", admin: { description: "Optional short line, for example: Free for medical care" } },
              ],
            },
          ],
        },
        {
          label: "Search defaults",
          fields: [
            { name: "siteName", type: "text", defaultValue: "Restoration Medical" },
            { name: "titleSuffix", type: "text", defaultValue: " | Restoration Medical", admin: { description: "Added after every page title" } },
            { name: "defaultDescription", type: "textarea", defaultValue: "Family medicine, pain care, infusion therapy, aesthetics and rehab, under one physician-led standard of care. Care in English and Tiếng Việt." },
            { name: "defaultOgImage", type: "upload", relationTo: "media", label: "Default social share image" },
            { name: "gtmId", type: "text", label: "Google Tag Manager container ID", admin: { description: "GTM-XXXXXXX. Leave blank to keep analytics off. Never loads on booking, register, contact, referral, careers or renewal pages." } },
            { name: "gaId", type: "text", label: "Google Analytics 4 measurement ID", admin: { description: "G-XXXXXXXXXX. Use this or Tag Manager, not both. Loads only after a visitor accepts analytics in the cookie banner." } },
          ],
        },
      ],
    },
  ],
};
