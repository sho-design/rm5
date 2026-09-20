import type { IronPrice } from "@/content/iron";
import type { PathStep, TintCard } from "@/content/types";
import { Block, Button, Display, Eyebrow, Photo, Section, SmartLink } from "@/components/ui";

/** "Often the people we see." Four tinted 22px cards. */
export function IronWho({ cards }: { cards: TintCard[] }) {
  return (
    <section className="flex flex-col gap-5 px-4 pt-12 md:px-content md:pt-16">
      <Display size="2xs">Often the people we see.</Display>
      <div className="grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((w) => (
          <div key={w.t} className="flex min-h-[150px] flex-col gap-2 rounded-card-sm p-6 text-ink" style={{ background: w.bg }}>
            <span className="display text-[22px] leading-[1.05] tracking-[-.02em] lg:text-[24px]">{w.t}</span>
            <span className="text-[14px] leading-[1.5] text-muted">{w.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/** "Three steps. One good afternoon." Navy block with three glass cards. */
export function IronSteps({ steps }: { steps: PathStep[] }) {
  return (
    <Block tone="navy" className="flex flex-col gap-8 p-6 md:p-10 lg:gap-10 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
        <Display size="sm" className="max-w-[600px]">
          Three steps. One good afternoon.
        </Display>
        <Button to="book" variant="accent">
          Start with step one
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-block md:grid-cols-3">
        {steps.map((st) => (
          <div key={st.n} className="flex flex-col gap-[18px] rounded-card-sm border border-white/10 bg-white/6 p-6 lg:p-7">
            <div className="flex items-center justify-between">
              <span className="font-display text-[44px] font-medium leading-none tracking-[-.03em] text-sun">{st.n}</span>
              <span className="rounded-chip bg-white/12 px-2.5 py-[5px] text-[12px] font-semibold">{st.time}</span>
            </div>
            <span className="display text-[24px] leading-[1.05] tracking-[-.02em] lg:text-[26px]">{st.t}</span>
            <span className="text-[15px] leading-[1.55] text-white/75">{st.d}</span>
          </div>
        ))}
      </div>
    </Block>
  );
}

/** "The visit": photo left, paper card with a ✓ list and a note link right. */
export function IronVisit({ items, img, noteHref, accent }: { items: string[]; img: string; noteHref: string; accent: string }) {
  return (
    <Section className="grid grid-cols-1 gap-block lg:grid-cols-2 lg:items-stretch">
      <Photo src={img} alt="" radius="block" className="min-h-[260px] md:min-h-[360px] lg:min-h-[480px]" tint="var(--rm-sage-tint)" sizes="(max-width: 1024px) 100vw, 50vw" />
      <div className="flex flex-col justify-center gap-6 rounded-block border border-border bg-card p-6 md:p-10 lg:p-12">
        <Eyebrow tone="inherit" style={{ color: accent }}>
          The visit
        </Eyebrow>
        <Display size="xs">Bring a book. We handle the rest.</Display>
        <ul className="flex flex-col gap-3 text-[16px] leading-[1.55] text-ink">
          {items.map((v) => (
            <li key={v} className="flex items-start gap-3">
              <span aria-hidden className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-sage-tint text-[13px] text-sage-deep">
                ✓
              </span>
              <span>{v}</span>
            </li>
          ))}
        </ul>
        <SmartLink to={noteHref} className="text-[15px] font-semibold text-link">
          Read: what to expect at an iron infusion ›
        </SmartLink>
      </div>
    </Section>
  );
}

/** "What it costs, plainly." Three price cards. */
export function IronPrices({ prices }: { prices: IronPrice[] }) {
  return (
    <Section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Display size="xs">What it costs, plainly.</Display>
          <span className="text-[15px] text-muted">Your assessment and bloodwork are OHIP-insured. The infusion visit is not. Prices include HST.</span>
        </div>
        <span className="max-w-[300px] text-[13px] leading-[1.5] text-muted md:text-right">Most private plans cover the iron itself with a prescription. We give you a receipt for the rest.</span>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-3">
        {prices.map((pr) => (
          <div key={pr.k} className="flex flex-col gap-[18px] rounded-card border border-border p-6 text-ink lg:p-7" style={{ background: pr.bg }}>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] font-semibold text-muted">{pr.k}</span>
              <span className="display text-[24px] leading-[1.05] tracking-[-.02em] lg:text-[26px]">{pr.t}</span>
            </div>
            <span className="font-display text-[44px] font-medium leading-none tracking-[-.03em] lg:text-[52px]">{pr.price}</span>
            <span className="flex-1 text-[14px] leading-[1.5] text-muted">{pr.d}</span>
            <span className="border-t border-border pt-3 text-[13px] text-muted">{pr.note}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
