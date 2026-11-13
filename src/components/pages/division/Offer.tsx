import { Button, Photo, SectionHeader, SmartLink } from "@/components/ui";
import type { DivisionService, NavKey } from "@/content/types";
import { bookFor } from "@/lib/routes";
import { divisionPageCopy, tints } from "@/content/divisions";
import { cn } from "@/lib/cn";

/** Service tint cycle from the prototype: tints[(i + 1) % 5]. */
const tintFor = (i: number) => tints[(i + 1) % tints.length];

function Tile({ s, tint, big, book }: { s: DivisionService; tint: string; big?: boolean; book?: string }) {
  return (
    <div className={cn("relative flex flex-col justify-end overflow-hidden rounded-card", big ? "min-h-[600px] p-7" : "min-h-[200px] p-[22px]")} style={{ background: s.image ? "var(--rm-ink)" : tint }}>
      {s.image ? (
        <div className="absolute inset-0">
          <Photo src={s.image} alt="" radius="none" protect className="h-full w-full" sizes={big ? "(max-width: 768px) 150vw, 70vw" : "(max-width: 768px) 150vw, 60vw"} />
          {/* A deeper shade under the text: a low-vision tester could not read white text on the bright photos. */}
          <div aria-hidden className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--rm-ink) 45%, transparent) 0%, color-mix(in srgb, var(--rm-ink) 85%, transparent) 100%)" }} />
        </div>
      ) : null}
      <div className="relative flex max-w-[520px] flex-col gap-2.5 text-white">
        <h3 className={cn("display-tight", big ? "text-[28px] lg:text-[32px]" : "text-[22px] lg:text-[24px]")}>{s.title}</h3>
        <span className="text-[15px] leading-[1.5] text-white/85">{s.desc}</span>
        <div className="flex items-center gap-3.5 pt-1.5 text-[14px] font-semibold">
          {book ? (
            <Button to={book} variant="inverse" size="sm">
              {divisionPageCopy.book}
              <span className="sr-only"> {s.title}</span>
            </Button>
          ) : null}
          <SmartLink to={s.page} className="text-white">
            {divisionPageCopy.learnMore}
            <span className="sr-only"> about {s.title}</span> ›
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
/** Pages that compare a division's services side by side ("Compare all ›"). */
const comparePage: Partial<Record<NavKey, string>> = { aesthetics: "aesPricing", infusion: "drips" };

export function Offer({ services, division }: { services: DivisionService[]; division: NavKey }) {
  // About pages (story, standards, team) are not bookable, so their tiles have no Book button.
  const book = division === "about" ? undefined : bookFor(division);
  // Family Medicine: "New patients" is already the first answer in the chooser above, so it is not repeated here,
  // and its six services sit in an even grid instead of one tall feature beside a long stack.
  const even = division === "family";
  const list = even ? services.filter((s) => s.page !== "register") : services;
  if (!list.length) return null;
  const [first, ...rest] = list;
  return (
    <section className="flex flex-col gap-4 px-4 pt-10 md:gap-6 md:px-content md:pt-16">
      <SectionHeader title={divisionPageCopy.offerTitle} actionLabel={comparePage[division] ? divisionPageCopy.compareAll : undefined} actionTo={comparePage[division]} />

      {even ? (
        <div className="hidden grid-cols-2 gap-card md:grid lg:grid-cols-3">
          {list.map((s, i) => (
            <div key={s.title} className="rm-rise grid min-h-[300px]" style={{ animationDelay: `${i * 70}ms` }}>
              <Tile s={s} tint={tintFor(i)} book={book} />
            </div>
          ))}
        </div>
      ) : null}
      <div className={even ? "hidden" : "hidden grid-cols-2 gap-card md:grid"}>
        <Tile s={first} tint={tintFor(0)} big book={book} />
        <div className="grid auto-rows-fr gap-card">
          {rest.map((s, i) => (
            <Tile key={s.title} s={s} tint={tintFor(i + 1)} book={book} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5 md:hidden">
        {list.map((s, i) => (
          <SmartLink key={s.title} to={s.page} className="flex items-center justify-between gap-3 rounded-row p-4 transition-opacity active:opacity-80" style={{ background: tintFor(i) }}>
            <span className="flex flex-col gap-[3px]">
              <span className="text-[16px] font-semibold">{s.title}</span>
              <span className="text-[13px] leading-[1.4] text-muted">{s.desc}</span>
            </span>
            <span aria-hidden className="text-[18px] text-link">
              ›
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
