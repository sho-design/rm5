"use client";

import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * "Search the site" on the 404 page: opens the header search overlay by
 * clicking its button. Falls back to the home page if the header is absent.
 */
export function SearchSiteButton({ className, children }: { className?: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const btn = document.querySelector<HTMLButtonElement>('button[aria-label="Search"]');
        if (btn) {
          window.scrollTo({ top: 0 });
          if (btn.getAttribute("aria-expanded") !== "true") btn.click();
          btn.focus();
        } else {
          router.push(routes.home);
        }
      }}
    >
      {children}
    </button>
  );
}
