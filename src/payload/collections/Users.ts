import { APIError, type CollectionConfig } from "payload";
import { isAdmin, isAdminField, isAdminOrSelf } from "../access";
import { auditAfterChange, auditAfterDelete } from "../hooks/audit";

const MIN_PASSWORD = 12;

/**
 * Staff accounts. Two roles: admin (users, settings, everything) and editor
 * (content only). Five failed logins lock the account for 15 minutes.
 * Sessions expire after two hours. New accounts are created by an admin
 * from the admin panel; there is no public sign-up.
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
    afterChange: [auditAfterChange],
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
  ],
};
