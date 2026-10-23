import type { ReactNode } from "react";
import { UtilityBar } from "./UtilityBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TeachingPartners } from "./TeachingPartners";
import { StickyBook } from "./StickyBook";
import { Analytics } from "./Analytics";
import { ConsentBanner } from "./ConsentBanner";
import { getSiteSettings } from "@/lib/cms";

/**
 * Page frame: full-width white page. The utility bar and header span the
 * viewport with their contents capped; page content, the teaching partners
 * strip and the footer sit in a centred column up to 1440px so the rounded
 * blocks keep their 24px gutters on any screen.
 */
export async function SiteChrome({ children }: { children: ReactNode }) {
  // Analytics IDs: admin Site settings first, then environment variables.
  const settings = await getSiteSettings();
  const gtmId = settings?.gtmId || process.env.NEXT_PUBLIC_GTM_ID || undefined;
  const gaId = gtmId ? undefined : settings?.gaId || process.env.NEXT_PUBLIC_GA_ID || undefined;
  const analytics = Boolean(gtmId || gaId);
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-page text-primary">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <UtilityBar />
      <Header />
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <TeachingPartners />
        <Footer analytics={analytics} />
      </div>
      <StickyBook />
      <Analytics gtmId={gtmId} gaId={gaId} />
      <ConsentBanner enabled={analytics} />
    </div>
  );
}
