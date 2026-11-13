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
    <section className="rm-hero rm-ink-surface relative mx-3 mt-4 grid overflow-hidden rounded-[22px] bg-ink text-white md:mx-gutter md:mt-8 md:rounded-block lg:min-h-[540px] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* Split card: the words on a solid panel, the photo whole beside them (above on phones), so faces are never covered. */}
      <style>{`
        @keyframes rm-hero-in { from { transform: scale(1.06); } to { transform: scale(1); } }
        @keyframes rm-hero-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .rm-hero-photo > * { animation: rm-hero-in 1400ms cubic-bezier(.2,.8,.2,1) both; }
        .rm-hero-words > * { animation: rm-hero-up 600ms cubic-bezier(.2,.8,.2,1) both; }
        .rm-hero-words > *:nth-child(2) { animation-delay: 80ms; }
        .rm-hero-words > *:nth-child(3) { animation-delay: 160ms; }
        .rm-hero-words > *:nth-child(n+4) { animation-delay: 240ms; }
        @media (prefers-reduced-motion: reduce) { .rm-hero-photo > *, .rm-hero-words > * { animation: none; } }
        :root[data-theme="contrast"] .rm-hero { border: 2px solid var(--rm-ink); }
      `}</style>
      <div className="rm-hero-photo relative order-1 aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:order-2 lg:aspect-auto">
        <Photo src={img} alt={alt} radius="none" className="!absolute inset-0 h-full w-full" priority sizes="(min-width: 1024px) 60vw, 100vw" />
      </div>
      <div className="rm-hero-words relative order-2 flex flex-col justify-center gap-3 p-6 md:gap-4 md:p-10 lg:order-1 lg:p-12">
        {/* A soft glow so the panel does not read flat. */}
        <span aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: "var(--rm-sky)", animation: "none" }} />
        {eyebrow ? (
          <span className="relative flex items-center gap-2 self-start text-[13px] font-semibold text-sun">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sun" />
            {eyebrow}
          </span>
        ) : null}
        <h2 className="display-tight balance relative text-[32px] md:text-[44px] lg:text-[52px]">{headline}</h2>
        {blurb ? <p className="pretty relative text-[15px] leading-[1.55] text-white/85 md:text-[17px]">{blurb}</p> : null}
        {cta && ctaTo ? (
          <div className="relative flex flex-wrap items-center gap-2.5 pt-2">
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
        {helper ? <span className="relative text-[13px] text-white/75">{helper}</span> : null}
      </div>
    </section>
  );
}
