import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The clinic's logo, from the supplied artwork (public/logos): the "RM" monogram tile and the "Restoration Medical"
 * lettering, cut from the full logo so the lettering can hide on its own when space is short (scrolled header,
 * larger text). Both are drawn at the same height, which keeps the full logo's proportions. The lettering is
 * navy on light surfaces and white on navy (`inverse`, and the dark theme). Never redraw or re-set it in a font.
 */
const sizes = { sm: { h: 24, gap: 5 }, md: { h: 26, gap: 5 }, lg: { h: 30, gap: 6 } } as const;
const NAME_RATIO = 6.5; // lettering width / height in the artwork (780 x 120)

export function Wordmark({ size = "md", inverse, className, href = "/", label = "Restoration Medical home" }: { size?: "sm" | "md" | "lg"; inverse?: boolean; className?: string; href?: string; label?: string }) {
  const { h, gap } = sizes[size];
  const w = Math.round(h * NAME_RATIO);
  return (
    <Link href={href} aria-label={label} className={cn("flex min-h-[44px] items-center", className)} style={{ gap }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size logo files, no optimisation needed */}
      <img src="/logos/rm-mark.png" alt="" width={h} height={h} className="block shrink-0" />
      <span className="rm-wordmark-text block shrink-0" style={{ width: w, height: h }}>
        {inverse ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/logos/rm-name-white.png" alt="" width={w} height={h} className="block" />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/rm-name-navy.png" alt="" width={w} height={h} className="rm-logo-light block" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logos/rm-name-white.png" alt="" width={w} height={h} className="rm-logo-dark hidden" />
          </>
        )}
      </span>
    </Link>
  );
}
