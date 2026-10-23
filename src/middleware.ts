import { NextResponse, type NextRequest } from "next/server";
import { MFA_COOKIE, mfaEnabled, tokenClaims, verifyMfa } from "@/lib/mfa-cookie";

/**
 * Admin hardening at the edge of the app:
 * - login and password-reset endpoints are rate limited per IP
 *   (10 attempts a minute) on top of Payload's own account lockout;
 * - admin and CMS API responses are never indexed or cached.
 * - every signed-in request to /admin or /cms-api needs the second factor
 *   (an authenticator code, checked at /admin-mfa) for this sign-in.
 * The counter is per server instance. Add a WAF rate-limit rule on
 * /admin and /cms-api at the hosting layer for a shared limit.
 */
const WINDOW_MS = 60_000;
const LIMIT = 10;
const buckets = new Map<string, { count: number; reset: number }>();

/**
 * On Vercel the admin needs PAYLOAD_SECRET and a Postgres DATABASE_URL.
 * Until both exist, answer /admin and /cms-api with a short setup notice
 * instead of a 500. The public site is unaffected: it renders from the
 * built-in content when the CMS is not configured.
 */
const configured = Boolean(process.env.PAYLOAD_SECRET) && (Boolean(process.env.DATABASE_URL) || !process.env.VERCEL);

const setupHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Admin not set up yet</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f8fb;color:#12233b;font:16px/1.6 system-ui,sans-serif}main{max-width:36rem;padding:2rem}h1{font-size:1.5rem;margin:0 0 .5rem}code{background:#e6edf5;padding:.1em .35em;border-radius:4px}ol{padding-left:1.25rem}</style></head><body><main><h1>Admin not set up yet</h1><p>The content admin needs three environment variables on this deployment before it can start.</p><ol><li><code>PAYLOAD_SECRET</code>, a long random string.</li><li><code>DATABASE_URL</code>, a Postgres connection string (Neon).</li><li><code>BLOB_READ_WRITE_TOKEN</code>, for image uploads.</li></ol><p>Add them in the hosting dashboard, redeploy, and this page becomes the sign-in screen. Steps are in <code>docs/cms.md</code>.</p></main></body></html>`;

const sensitive = [/^\/cms-api\/users\/login/, /^\/cms-api\/users\/forgot-password/, /^\/cms-api\/users\/reset-password/, /^\/cms-api\/users\/first-register/, /^\/admin-mfa\/verify/];

/** Reachable with a password-only sign-in: signing in and out, password reset, first account, the code step itself. */
const beforeSecondFactor = [
  /^\/admin\/(login|logout|forgot|reset|create-first-user)(\/|$)/,
  /^\/cms-api\/users\/(login|logout|forgot-password|reset-password|first-register|init)(\/|$)/,
  /^\/admin-mfa(\/|$)/,
];

/** The Payload sign-in token from the cookie or an Authorization header ("JWT x" or "Bearer x"). */
function signInToken(req: NextRequest): string | undefined {
  const auth = req.headers.get("authorization");
  const m = auth?.match(/^(?:JWT|Bearer)\s+(.+)$/i);
  return m?.[1] ?? req.cookies.get("payload-token")?.value;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!configured) {
    const isApi = pathname.startsWith("/cms-api");
    return new NextResponse(isApi ? JSON.stringify({ errors: [{ message: "CMS is not configured on this deployment." }] }) : setupHtml, {
      status: 503,
      headers: { "Content-Type": isApi ? "application/json" : "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  // Second factor: a signed-in request needs rm-mfa for this sign-in.
  if (mfaEnabled() && !beforeSecondFactor.some((r) => r.test(pathname))) {
    const claims = tokenClaims(signInToken(req));
    if (claims && !(await verifyMfa(req.cookies.get(MFA_COOKIE)?.value, claims.id, claims.sid))) {
      const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
      if (pathname.startsWith("/admin") && req.method === "GET") {
        return NextResponse.redirect(new URL("/admin-mfa", req.url), { headers });
      }
      return new NextResponse(JSON.stringify({ errors: [{ message: "Two-factor verification required." }] }), { status: 401, headers: { ...headers, "Content-Type": "application/json" } });
    }
  }

  const res = NextResponse.next();
  if (/^\/admin\/logout(\/|$)/.test(pathname)) res.cookies.delete(MFA_COOKIE);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");

  if (req.method === "POST" && sensitive.some((r) => r.test(pathname))) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const now = Date.now();
    const b = buckets.get(ip);
    if (!b || b.reset < now) {
      buckets.set(ip, { count: 1, reset: now + WINDOW_MS });
    } else if (b.count >= LIMIT) {
      return new NextResponse(JSON.stringify({ errors: [{ message: "Too many attempts. Try again in a minute." }] }), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": String(Math.ceil((b.reset - now) / 1000)), "Cache-Control": "no-store" },
      });
    } else {
      b.count += 1;
    }
    if (buckets.size > 5000) {
      for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
    }
  }
  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*", "/cms-api/:path*", "/admin-mfa", "/admin-mfa/:path*"] };
