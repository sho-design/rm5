import { NextResponse } from "next/server";

export type FormKind = "book" | "register" | "contact" | "referral" | "careers";

const envKey: Record<FormKind, string> = {
  book: "FORM_ENDPOINT_BOOK",
  register: "FORM_ENDPOINT_REGISTER",
  contact: "FORM_ENDPOINT_CONTACT",
  referral: "FORM_ENDPOINT_REFERRAL",
  careers: "FORM_ENDPOINT_CAREERS",
};

const noStore = { "Cache-Control": "no-store" };

/**
 * Forward a form submission to its destination system. The site stores
 * nothing: no database, no logging of the body. When the destination is not
 * configured (local development) the handler answers with a simulated
 * success so the flows can be exercised.
 */
export async function forwardForm(kind: FormKind, request: Request): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400, headers: noStore });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400, headers: noStore });
  }
  const size = JSON.stringify(body).length;
  if (size > 64_000) {
    return NextResponse.json({ ok: false, error: "Request too large" }, { status: 413, headers: noStore });
  }
  const endpoint = process.env[envKey[kind]];
  if (!endpoint) {
    return NextResponse.json({ ok: true, simulated: true }, { headers: noStore });
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.FORM_ENDPOINT_TOKEN ? { Authorization: `Bearer ${process.env.FORM_ENDPOINT_TOKEN}` } : {}),
      },
      body: JSON.stringify({ kind, submittedAt: new Date().toISOString(), data: body }),
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "Destination rejected the request" }, { status: 502, headers: noStore });
    }
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch {
    return NextResponse.json({ ok: false, error: "Destination unavailable" }, { status: 502, headers: noStore });
  }
}

/** Client helper: POST JSON to /api/<kind>. Resolves to { ok, simulated? } and never throws. */
export async function submitForm(kind: FormKind, data: Record<string, unknown>): Promise<{ ok: boolean; simulated?: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/${kind}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data), cache: "no-store" });
    const json = (await res.json()) as { ok: boolean; simulated?: boolean; error?: string };
    return json;
  } catch {
    return { ok: false, error: "Network error" };
  }
}
