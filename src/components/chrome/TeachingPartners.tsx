import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { images } from "@/content/images";

/**
 * Teaching partners strip above the footer: label + About link left, TMU and
 * Anderson College logos right with a 1px divider. Written logo permission
 * from both schools is required before launch.
 */
export function TeachingPartners() {
  return (
    <div className="mx-3 mt-6 flex flex-wrap items-center justify-between gap-x-12 gap-y-6 rounded-[20px] border border-border bg-raised px-6 py-6 md:mx-gutter md:mt-12 md:px-10 md:py-7">
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-semibold text-muted">Teaching partners</span>
        <Link href={routes.about} className="text-[14px] font-semibold text-link">
          A teaching clinic. What that means for your visit ›
        </Link>
      </div>
      <div className="flex min-w-0 max-w-full flex-wrap items-center gap-4 md:gap-11">
        <Image src={images.logos.tmu} alt="Toronto Metropolitan University" width={160} height={56} className="h-9 w-auto max-w-[45vw] object-contain md:h-14" />
        <span aria-hidden className="hidden h-10 w-px bg-border sm:block" />
        <Image src={images.logos.anderson} alt="Anderson College of Health, Business and Technology" width={220} height={34} className="h-6 w-auto max-w-[45vw] object-contain md:h-[34px]" />
      </div>
    </div>
  );
}
