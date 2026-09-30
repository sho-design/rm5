import type { CollectionConfig } from "payload";
import { anyone, isStaff } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";

/** Photos and logos. Images only, resized on upload. */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Images" },
  admin: { group: "Content", description: "Photos follow the dress and casting rules: black V-neck scrubs for nurses, navy for doctors, no text in images." },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isStaff },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/svg+xml"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 900, withoutEnlargement: true },
      { name: "hero", width: 1800, withoutEnlargement: true },
    ],
    formatOptions: { format: "webp", options: { quality: 82 } },
  },
  hooks: { afterChange: [auditAfterChange], afterDelete: [auditAfterDelete] },
  fields: [
    { name: "alt", type: "text", required: true, admin: { description: "What the photo shows, for screen readers. Leave the word 'photo' out." } },
    { name: "credit", type: "text" },
  ],
};
