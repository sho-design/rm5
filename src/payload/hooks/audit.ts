import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

/** Keys whose values differ between two documents (shallow, by JSON value). */
function changedKeys(before: Record<string, unknown> | undefined, after: Record<string, unknown>): string[] {
  const skip = new Set(["updatedAt", "createdAt", "id"]);
  const keys = new Set([...Object.keys(before ?? {}), ...Object.keys(after)]);
  return [...keys].filter((k) => !skip.has(k) && JSON.stringify(before?.[k]) !== JSON.stringify(after[k]));
}

type ReqLike = Parameters<CollectionAfterChangeHook>[0]["req"];

async function write(req: ReqLike, entry: { collection: string; docId: string | number | null; operation: string; changes: string[]; title?: string }) {
  const user = req.user as { id?: string | number; email?: string } | null | undefined;
  try {
    await req.payload.create({
      collection: "audit-log",
      data: {
        user: typeof user?.id === "number" ? user.id : null,
        userEmail: user?.email ?? "system",
        collection: entry.collection,
        docId: entry.docId == null ? "" : String(entry.docId),
        docTitle: entry.title ?? "",
        operation: entry.operation,
        changes: entry.changes,
        ip: req.headers?.get?.("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
      },
      overrideAccess: true,
      req,
    });
  } catch (err) {
    req.payload.logger.error({ err }, "audit log write failed");
  }
}

/** Records who changed what, on every content collection. */
export const auditAfterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, operation, req, collection }) => {
  const d = doc as Record<string, unknown>;
  await write(req, {
    collection: collection.slug,
    docId: (d.id as string | number) ?? null,
    operation,
    changes: changedKeys(previousDoc as Record<string, unknown> | undefined, d),
    title: String(d.title ?? d.name ?? d.question ?? d.text ?? d.route ?? ""),
  });
  return doc;
};

export const auditAfterDelete: CollectionAfterDeleteHook = async ({ doc, req, collection }) => {
  const d = doc as Record<string, unknown>;
  await write(req, { collection: collection.slug, docId: (d.id as string | number) ?? null, operation: "delete", changes: [], title: String(d.title ?? d.name ?? "") });
  return doc;
};

export const auditGlobalAfterChange: GlobalAfterChangeHook = async ({ doc, previousDoc, req, global }) => {
  await write(req, { collection: `global:${global.slug}`, docId: null, operation: "update", changes: changedKeys(previousDoc as Record<string, unknown>, doc as Record<string, unknown>) });
  return doc;
};
