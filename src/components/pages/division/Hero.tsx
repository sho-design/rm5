import type { ReactNode } from "react";
import { Button, Photo } from "@/components/ui";

/**
 * Division hero: photo block 24px from the edge with the protection
 * gradient, sunshine eyebrow, Fraunces 56 headline (h2: the page H1 is the
 * division label above), 18px lead, one or two CTAs and an optional helper
 * line. 12px gutter, 22px radius and 360px min-height on mobile.
 */
export function Hero({
  img,
  alt,
  eyebrow,
  headline,
  blurb,
  cta,
  ctaTo,
  cta2,
  cta2To,
  helper,
}: {
  img: string;
  alt: string;
  eyebrow?: string;
  headline: ReactNode;
  blurb?: string;
  cta?: string;
  ctaTo?: string;
  cta2?: string;
  cta2To?: string;
  helper?: ReactNode;
}) {
  return (
    <section className="relative mx-3 mt-4 flex bg-ink-2 min-h-[360px] items-end overflow-hidden rounded-[22px] md:mx-gutter md:mt-8 md:min-h-[520px] md:rounded-block">
      <div className="absolute inset-0">
        <Photo src={img} alt={alt} radius="none" protect className="h-full w-full" priority sizes="100vw" />
      </div>
      <div className="relative flex max-w-[760px] flex-col gap-2 p-[18px] text-white md:gap-4 md:p-12">
        {eyebrow ? <span className="text-[11px] font-semibold text-sun md:text-[13px]">{eyebrow}</span> : null}
        <h2 className="display-tight balance text-[28px] md:text-[44px] lg:text-[56px]">{headline}</h2>
        {blurb ? <p className="pretty text-[13px] leading-[1.45] text-white/85 md:text-[18px] md:leading-[1.5]">{blurb}</p> : null}
        {cta && ctaTo ? (
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button to={ctaTo} variant="inverse">
              {cta}
            </Button>
            {cta2 && cta2To ? (
              <Button to={cta2To} variant="outline-inverse">
                {cta2}
              </Button>
            ) : null}
          </div>
        ) : null}
        {helper ? <span className="text-[13px] text-white/75">{helper}</span> : null}
      </div>
    </section>
  );
}
