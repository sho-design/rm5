import { APIError, type CollectionConfig } from "payload";
import { isAdmin, isAdminField, isAdminOrSelf, nobodyField } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";

const MIN_PASSWORD = 12;

/** Hidden two-factor fields: never returned or written through the API. */
const secretField = { access: { read: nobodyField, create: nobodyField, update: nobodyField }, admin: { hidden: true } } as const;

/**
 * Staff accounts. Two roles: admin (users, settings, everything) and editor
 * (content only). Five failed logins lock the account for 15 minutes.
 * Sessions expire after two hours. New accounts are created by an admin
 * from the admin panel; there is no public sign-up.
 *
 * Two-factor sign-in (authenticator app codes) is required for everyone:
 * see src/app/(mfa) and src/middleware.ts. Secrets are stored encrypted in
 * the hidden totp* fields. An admin can tick "Reset two-factor" to make a
 * person set up their authenticator again.
 */
export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Staff account", plural: "Staff accounts" },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 2 * 60 * 60,
    useAPIKey: false,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role", "updatedAt"],
    group: "Administration",
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    admin: ({ req }) => !!req.user,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const pw = data?.password as string | undefined;
        if (pw !== undefined && pw.length < MIN_PASSWORD) {
          throw new APIError(`Password must be at least ${MIN_PASSWORD} characters.`, 400);
        }
        return data;
      },
    ],
    afterChange: [
      auditAfterChange,
      async ({ doc, req, context }) => {
        // "Reset two-factor" ticked by an admin: clear the secret so the person enrols again.
        if (!doc.resetTwoFactor || context.resettingTwoFactor) return doc;
        await req.payload.update({
          collection: "users",
          id: doc.id,
          data: { resetTwoFactor: false, twoFactorEnabled: false, totpSecret: null, totpPending: null, totpLastStep: null, totpFailures: 0, totpLockedUntil: null },
          overrideAccess: true,
          context: { resettingTwoFactor: true },
          req,
        });
        return { ...doc, resetTwoFactor: false, twoFactorEnabled: false };
      },
    ],
    afterDelete: [auditAfterDelete],
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Editor (content only)", value: "editor" },
        { label: "Admin (content, staff accounts, settings)", value: "admin" },
      ],
      access: { update: isAdminField, create: isAdminField },
      saveToJWT: true,
    },
    {
      name: "twoFactorEnabled",
      type: "checkbox",
      label: "Two-factor sign-in set up",
      defaultValue: false,
      access: { create: nobodyField, update: nobodyField },
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "resetTwoFactor",
      type: "checkbox",
      label: "Reset two-factor",
      defaultValue: false,
      access: { read: isAdminField, create: nobodyField, update: isAdminField },
      admin: { position: "sidebar", description: "Tick and save if this person has a new phone or lost their authenticator. They set it up again at their next sign-in." },
    },
    { name: "totpSecret", type: "text", ...secretField },
    { name: "totpPending", type: "text", ...secretField },
    { name: "totpLastStep", type: "number", ...secretField },
    { name: "totpFailures", type: "number", defaultValue: 0, ...secretField },
    { name: "totpLockedUntil", type: "date", ...secretField },
  ],
};
