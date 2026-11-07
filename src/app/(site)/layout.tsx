import type { Metadata, Viewport } from "next";
import "../globals.css";
import { site } from "@/content/site";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { defaultShareImage } from "@/lib/seo";
import { fraunces, instrument } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Restoration Medical", template: "%s | Restoration Medical" },
  description: site.description,
  applicationName: "Restoration Medical",
  openGraph: { siteName: "Restoration Medical", type: "website", locale: "en_CA", images: [{ url: defaultShareImage.url, width: 1200, height: 630, alt: defaultShareImage.alt }] },
  twitter: { card: "summary_large_image", images: [defaultShareImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1F2E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${fraunces.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <JsonLd data={siteGraph()} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
