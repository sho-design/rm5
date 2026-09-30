import type { Access, FieldAccess, PayloadRequest } from "payload";

export type Role = "admin" | "editor";

type UserLike = { role?: Role } | null | undefined;

const roleOf = (req: PayloadRequest): Role | undefined => (req.user as UserLike)?.role;

/** Signed-in admin only. */
export const isAdmin: Access = ({ req }) => roleOf(req) === "admin";

/** Any signed-in staff account (admin or editor). */
export const isStaff: Access = ({ req }) => !!req.user;

/** Admins, or the user acting on their own account. */
export const isAdminOrSelf: Access = ({ req }) => {
  if (roleOf(req) === "admin") return true;
  if (req.user) return { id: { equals: req.user.id } };
  return false;
};

/** Public read of published documents; staff see drafts too. */
export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};

/** Public read (content the site renders); writes stay with staff. */
export const anyone: Access = () => true;

export const isAdminField: FieldAccess = ({ req }) => roleOf(req) === "admin";

/** Nobody through the API. Used for the audit log, which only hooks write. */
export const nobody: Access = () => false;
