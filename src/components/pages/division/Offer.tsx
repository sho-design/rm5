import { Button, Photo, SectionHeader, SmartLink } from "@/components/ui";
import type { DivisionService } from "@/content/types";
import { divisionPageCopy, tints } from "@/content/divisions";
import { cn } from "@/lib/cn";

/** Service tint cycle from the prototype: tints[(i + 1) % 5]. */
const tintFor = (i: number) => tints[(i + 1) % tints.length];

function Tile({ s, tint, big }: { s: DivisionService; tint: string; big?: boolean }) {
  return (
    <div className={cn("relative flex flex-col justify-end overflow-hidden rounded-card", big ? "min-h-[600px] p-7" : "min-h-[200px] p-[22px]")} style={{ background: tint }}>
      {s.image ? (
        <div className="absolute inset-0">
          <Photo src={s.image} alt="" radius="none" protect className="h-full w-full" sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 40vw"} />
        </div>
      ) : null}
      <div className="relative flex max-w-[520px] flex-col gap-2.5 text-white">
        <span className={cn("display-tight", big ? "text-[32px] lg:text-[40px]" : "text-[22px] lg:text-[24px]")}>{s.title}</span>
        <span className="text-[15px] leading-[1.5] text-white/85">{s.desc}</span>
        <div className="flex items-center gap-3.5 pt-1.5 text-[14px] font-semibold">
          <Button to="book" variant="inverse" size="sm">
            {divisionPageCopy.book}
          </Button>
          <SmartLink to={s.page} className="text-white">
            {divisionPageCopy.learnMore} ›
          </SmartLink>
        </div>
      </div>
    </div>
  );
}

/**
 * "What we offer." in the prototype's bento E: the first service as a tall
 * photo feature on the left, the rest stacked as equal photo rows on the
 * right. On mobile the services become tinted link rows (Mobile Service frame).
 */
export function Offer({ services }: { services: DivisionService[] }) {
  if (!services.length) return null;
  const [first, ...rest] = services;
  return (
    <section className="flex flex-col gap-4 px-4 pt-10 md:gap-6 md:px-content md:pt-16">
      <SectionHeader title={divisionPageCopy.offerTitle} actionLabel={divisionPageCopy.compareAll} actionTo="book" />

      <div className="hidden grid-cols-2 gap-card md:grid">
        <Tile s={first} tint={tintFor(0)} big />
        <div className="grid auto-rows-fr gap-card">
          {rest.map((s, i) => (
            <Tile key={s.title} s={s} tint={tintFor(i + 1)} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 md:hidden">
        {services.map((s, i) => (
          <SmartLink key={s.title} to={s.page} className="flex items-center justify-between gap-3 rounded-row p-4 transition-opacity active:opacity-80" style={{ background: tintFor(i) }}>
            <span className="flex flex-col gap-[3px]">
              <span className="text-[16px] font-semibold">{s.title}</span>
              <span className="text-[12px] leading-[1.4] text-muted">{s.desc}</span>
            </span>
            <span aria-hidden className="text-[18px] text-sky">
              ›
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
