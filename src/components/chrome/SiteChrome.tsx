import type { ReactNode } from "react";
import { UtilityBar } from "./UtilityBar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TeachingPartners } from "./TeachingPartners";
import { StickyBook } from "./StickyBook";
import { Analytics } from "./Analytics";

/**
 * Page frame: full-width white page. The utility bar and header span the
 * viewport with their contents capped; page content, the teaching partners
 * strip and the footer sit in a centred column up to 1440px so the rounded
 * blocks keep their 24px gutters on any screen.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
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
        <Footer />
      </div>
      <StickyBook />
      <Analytics />
    </div>
  );
}
