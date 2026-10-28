import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { site } from "@/content/site";
import { SiteChrome } from "@/components/chrome/SiteChrome";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { defaultShareImage } from "@/lib/seo";

/*
  Fonts are compressed WOFF2 subsets built from the OFL variable TTFs in
  src/fonts (Latin, Latin Extended and Vietnamese, with the weights the site
  uses): about 175 KB in all instead of about 1.1 MB. Rebuild with
  `/usr/bin/python3 scripts/build-fonts.py` after changing the source fonts.
*/
const fraunces = localFont({
  src: [
    { path: "../../fonts/Fraunces.woff2", style: "normal", weight: "400 600" },
    { path: "../../fonts/Fraunces-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const instrument = localFont({
  src: [{ path: "../../fonts/InstrumentSans.woff2", style: "normal", weight: "400 700" }],
  variable: "--font-instrument",
  display: "swap",
});

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
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`} suppressHydrationWarning>
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
