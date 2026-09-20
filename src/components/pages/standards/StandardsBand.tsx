import { Block, Button, Display, SmartLink } from "@/components/ui";
import { standardsPage } from "@/content/about";

/** Sun closing band: concern about your care, contact button and a patient rights link. */
export function StandardsBand() {
  const b = standardsPage.band;
  return (
    <Block tone="sun" last className="grid grid-cols-1 items-center gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-14">
      <div className="flex flex-col gap-3">
        <Display size="sm">{b.title}</Display>
        <p className="pretty max-w-[640px] text-[16px] leading-[1.5] text-secondary">{b.sub}</p>
      </div>
      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <Button to="contact" size="lg">
          {b.cta}
        </Button>
        <SmartLink to="rights" className="text-[14px] font-semibold text-ink">
          {b.link} ›
        </SmartLink>
      </div>
    </Block>
  );
}
