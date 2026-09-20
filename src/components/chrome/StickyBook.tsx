"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

/** Mobile sticky Book button. Hidden on the booking and register flows. */
export function StickyBook() {
  const pathname = usePathname();
  if (pathname.startsWith(routes.book) || pathname.startsWith(routes.register)) return null;
  return (
    <div className="pointer-events-none sticky bottom-0 z-30 px-4 pb-4 sm:hidden">
      <Link href={routes.book} className="pointer-events-auto block rounded-chip bg-ink py-[15px] text-center text-[15px] font-semibold text-white shadow-sticky">
        Book an appointment
      </Link>
    </div>
  );
}
