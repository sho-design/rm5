/**
 * The "second factor done" cookie. After a correct code, the server sets
 * rm-mfa = "<userId>.<sessionId>.<expiry>.<signature>", HMAC-SHA256 signed
 * with a key derived from PAYLOAD_SECRET. Middleware checks it against the
 * user id and session id inside the Payload sign-in token, so it is only
 * valid for the one sign-in that passed the code. Web Crypto only, so it
 * runs in middleware (edge) and route handlers alike.
 */
export const MFA_COOKIE = "rm-mfa";
export const MFA_TTL_SECONDS = 12 * 60 * 60;

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(data: string): Promise<string> {
  const secret = process.env.PAYLOAD_SECRET ?? "";
  const k = await crypto.subtle.importKey("raw", enc.encode(`rm-mfa:${secret}`), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(await crypto.subtle.sign("HMAC", k, enc.encode(data)));
}

/** Constant-time string comparison. */
function same(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signMfa(userId: string | number, sessionId: string, now = Date.now()): Promise<string> {
  const exp = Math.floor(now / 1000) + MFA_TTL_SECONDS;
  const body = `${userId}.${sessionId}.${exp}`;
  return `${body}.${await hmac(body)}`;
}

export async function verifyMfa(cookie: string | undefined, userId: string | number, sessionId: string, now = Date.now()): Promise<boolean> {
  if (!cookie || !process.env.PAYLOAD_SECRET) return false;
  const parts = cookie.split(".");
  if (parts.length !== 4) return false;
  const [uid, sid, exp, sig] = parts as [string, string, string, string];
  if (uid !== String(userId) || sid !== sessionId) return false;
  if (!/^\d+$/.test(exp) || Number(exp) * 1000 < now) return false;
  return same(sig, await hmac(`${uid}.${sid}.${exp}`));
}

/** User id and session id from a Payload JWT. Unverified: Payload checks the signature on every request it serves. */
export function tokenClaims(token: string | undefined): { id: string; sid: string } | null {
  if (!token) return null;
  const payload = token.split(".")[1];
  if (!payload) return null;
  try {
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as { id?: string | number; sid?: string };
    if (json.id === undefined) return null;
    return { id: String(json.id), sid: json.sid ?? "nosession" };
  } catch {
    return null;
  }
}

/** Two-factor is on unless ADMIN_2FA=off (an emergency switch, documented in docs/cms.md). */
export const mfaEnabled = () => process.env.ADMIN_2FA !== "off";
