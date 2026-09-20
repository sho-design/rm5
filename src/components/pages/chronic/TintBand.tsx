import { Block, Button, Display, SmartLink } from "@/components/ui";

/**
 * Closing band on a division tint: Fraunces 48 title, 17px line, ink CTA
 * with a text link underneath instead of the phone line.
 */
export function TintBand({ title, sub, cta, ctaTo = "book", link, linkTo, tint, subClassName = "text-secondary" }: { title: string; sub: string; cta: string; ctaTo?: string; link: string; linkTo: string; tint: string; subClassName?: string }) {
  return (
    <Block tone="tint" last style={{ background: tint }} className="grid grid-cols-1 items-center gap-8 p-7 text-ink md:p-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-14">
      <div className="flex flex-col gap-3">
        <Display size="sm">{title}</Display>
        <p className={`pretty max-w-[620px] text-[16px] leading-[1.5] lg:text-[17px] ${subClassName}`}>{sub}</p>
      </div>
      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <Button to={ctaTo} size="lg">
          {cta}
        </Button>
        <SmartLink to={linkTo} className={`text-[14px] font-semibold ${subClassName}`}>
          {link} ›
        </SmartLink>
      </div>
    </Block>
  );
}
