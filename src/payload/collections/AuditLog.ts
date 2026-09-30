import type { CollectionConfig } from "payload";
import { isAdmin, nobody } from "../access";

/**
 * Append-only record of every change made through the admin panel. Written
 * by hooks only; nobody can create, edit or delete entries through the API
 * or the panel. Admins can read it.
 */
export const AuditLog: CollectionConfig = {
  slug: "audit-log",
  labels: { singular: "Audit entry", plural: "Audit log" },
  admin: {
    useAsTitle: "docTitle",
    defaultColumns: ["createdAt", "userEmail", "operation", "collection", "docTitle", "changes"],
    group: "Administration",
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
    description: "Who changed what, and when. Entries cannot be edited.",
  },
  access: { read: isAdmin, create: nobody, update: nobody, delete: nobody },
  timestamps: true,
  fields: [
    { name: "user", type: "relationship", relationTo: "users", admin: { readOnly: true } },
    { name: "userEmail", type: "text", admin: { readOnly: true } },
    { name: "operation", type: "text", admin: { readOnly: true } },
    { name: "collection", type: "text", admin: { readOnly: true } },
    { name: "docId", type: "text", admin: { readOnly: true } },
    { name: "docTitle", type: "text", admin: { readOnly: true } },
    { name: "changes", type: "json", admin: { readOnly: true } },
    { name: "ip", type: "text", admin: { readOnly: true } },
  ],
};
