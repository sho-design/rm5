import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { MFA_COOKIE, MFA_TTL_SECONDS, signMfa, tokenClaims } from "@/lib/mfa-cookie";
import { openSecret, verifyTotp } from "@/payload/totp";

export const dynamic = "force-dynamic";

const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;
const noStore = { "Cache-Control": "no-store" };
const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status, headers: noStore });

/**
 * Check a six-digit code for the signed-in user. Five wrong codes lock the
 * second step for 15 minutes; a code can only be used once. On success the
 * first-time secret becomes active, and the rm-mfa cookie is set for this
 * sign-in only.
 */
export async function POST(req: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return fail("Your sign-in has expired. Sign in again.", 401);

  let code = "";
  try {
    code = String(((await req.json()) as { code?: unknown }).code ?? "");
  } catch {
    return fail("Enter the six-digit code.", 400);
  }

  const u = await payload.findByID({ collection: "users", id: user.id, overrideAccess: true, depth: 0 });
  const now = Date.now();
  if (u.totpLockedUntil && new Date(u.totpLockedUntil).getTime() > now) {
    return fail("Too many wrong codes. Wait 15 minutes, or ask a clinic admin to reset two-factor.", 429);
  }

  const sealed = u.twoFactorEnabled ? u.totpSecret : u.totpPending;
  const secret = sealed ? openSecret(sealed) : null;
  if (!secret) return fail("Two-factor is not set up yet. Reload this page to get a new code.", 400);

  const step = verifyTotp(secret, code, now);
  if (step === null || (u.totpLastStep != null && step <= u.totpLastStep)) {
    const failures = (u.totpFailures ?? 0) + 1;
    const locked = failures >= MAX_FAILURES;
    await payload.update({
      collection: "users",
      id: u.id,
      data: locked ? { totpFailures: 0, totpLockedUntil: new Date(now + LOCK_MS).toISOString() } : { totpFailures: failures },
      overrideAccess: true,
      context: { resettingTwoFactor: true },
    });
    return locked ? fail("Too many wrong codes. Wait 15 minutes, or ask a clinic admin to reset two-factor.", 429) : fail("That code did not work. Try the newest code in your app.", 401);
  }

  await payload.update({
    collection: "users",
    id: u.id,
    data: {
      totpLastStep: step,
      totpFailures: 0,
      totpLockedUntil: null,
      ...(u.twoFactorEnabled ? {} : { twoFactorEnabled: true, totpSecret: sealed, totpPending: null }),
    },
    overrideAccess: true,
    context: { resettingTwoFactor: true },
  });

  const cookieToken = req.headers.get("cookie")?.match(/(?:^|;\s*)payload-token=([^;]+)/)?.[1];
  const claims = tokenClaims(cookieToken ? decodeURIComponent(cookieToken) : undefined);
  if (!claims) return fail("Your sign-in has expired. Sign in again.", 401);

  const res = NextResponse.json({ ok: true }, { headers: noStore });
  res.cookies.set(MFA_COOKIE, await signMfa(claims.id, claims.sid), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MFA_TTL_SECONDS,
  });
  return res;
}
