import { NextResponse, type NextRequest } from "next/server";

/**
 * Admin hardening at the edge of the app:
 * - login and password-reset endpoints are rate limited per IP
 *   (10 attempts a minute) on top of Payload's own account lockout;
 * - admin and CMS API responses are never indexed or cached.
 * The counter is per server instance. Add a WAF rate-limit rule on
 * /admin and /cms-api at the hosting layer for a shared limit.
 */
const WINDOW_MS = 60_000;
const LIMIT = 10;
const buckets = new Map<string, { count: number; reset: number }>();

const sensitive = [/^\/cms-api\/users\/login/, /^\/cms-api\/users\/forgot-password/, /^\/cms-api\/users\/reset-password/, /^\/cms-api\/users\/first-register/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();
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

export const config = { matcher: ["/admin/:path*", "/cms-api/:path*"] };
