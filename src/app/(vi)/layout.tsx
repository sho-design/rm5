import type { Metadata, Viewport } from "next";
import "../globals.css";
import { site } from "@/content/site";
import { viChrome } from "@/content/vi";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import { ViHeader } from "@/components/vi/ViHeader";
import { ViFooter } from "@/components/vi/ViFooter";
import { defaultShareImage } from "@/lib/seo";
import { fraunces, instrument } from "@/lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Restoration Medical", template: "%s | Restoration Medical" },
  applicationName: "Restoration Medical",
  openGraph: { siteName: "Restoration Medical", type: "website", locale: "vi_VN", images: [{ url: defaultShareImage.url, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [defaultShareImage.url] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0F1F2E" };

/**
 * Root layout for the Vietnamese pages, so <html lang="vi"> is right for screen readers, translation tools and
 * search. Its own light chrome in Vietnamese. No analytics here, as on booking and contact.
 */
export default function ViLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <div className="relative flex min-h-screen w-full flex-col bg-page text-primary">
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-sun focus:px-4 focus:py-2 focus:font-semibold focus:text-sun-ink">
            {viChrome.skip}
          </a>
          <ViHeader />
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
            <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
              {children}
            </main>
            <ViFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
