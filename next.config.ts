import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { infusionHost, infusionRedirects, legacyRedirects } from "./src/content/redirects";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://restorationmedical.ca").replace(/\/$/, "");

const isDev = process.env.NODE_ENV === "development";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://d8j0ntlcm91z4.cloudfront.net https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async redirects() {
    return [
      // The old Infusion subdomain, path by path, onto the main site.
      ...infusionRedirects.map(([source, to]) => ({ source, has: [{ type: "host" as const, value: infusionHost }], destination: `${siteUrl}${to}`, permanent: true })),
      // Likely old main-site addresses. More can be added in the admin under Redirects.
      ...legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true })),
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Forms never persist on the site and never cache.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
