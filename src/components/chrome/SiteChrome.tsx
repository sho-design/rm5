import type { ReactNode } from "react";
import { UtilityBar } from "./UtilityBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TeachingPartners } from "./TeachingPartners";
import { StickyBook } from "./StickyBook";
import { Analytics } from "./Analytics";

/**
 * Page frame: white column up to 1280px on the warm-grey canvas, with the
 * utility bar, header, page content, teaching partners strip and footer.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col bg-page text-primary">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-chip focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <UtilityBar />
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <TeachingPartners />
      <Footer />
      <StickyBook />
      <Analytics />
    </div>
  );
}
