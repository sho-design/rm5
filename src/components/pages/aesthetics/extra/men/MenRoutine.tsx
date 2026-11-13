import {
  Display,
  Eyebrow,
  FaqList,
  Section,
  SmartLink,
  TextLink,
} from "@/components/ui";
import { menFaq, menFaqTitle, menRoutine as c } from "@/content/aes-men";
import { skinProduct } from "@/content/skincare";

/** A three-product SkinCeuticals routine (suggested retail, HST extra) and the questions men usually ask. */
export function MenRoutine() {
  const items = c.items.map((it) => ({ ...it, p: skinProduct(it.id) }));
  const total = items.reduce((s, x) => s + x.p.srp, 0);
  return (
    <Section className="rm-paper grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-text">
            {c.eyebrow}
          </Eyebrow>
          <Display size="2xs">{c.title}</Display>
          <p className="pretty text-[16px] leading-[1.55] text-secondary">
            {c.lead}
          </p>
        </div>
        <ol className="flex flex-col gap-2.5">
          {items.map((x, i) => (
            <li
              key={x.id}
              className="flex gap-4 rounded-card bg-lilac-tint p-4"
            >
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lilac-deep font-display text-[18px] text-white"
              >
                {i + 1}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[16px] font-semibold">{x.p.name}</span>
                  <span className="shrink-0 tabular-nums text-[15px]">
                    ${x.p.srp}
                  </span>
                </span>
                <span className="text-[13px] font-semibold text-lilac-text">
                  {x.when}
                </span>
                <span className="pretty text-[14px] leading-[1.45] text-secondary">
                  {x.role}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-1">
          <span className="flex items-baseline justify-between text-[15px] font-semibold">
            <span>{c.total}</span>
            <span className="tabular-nums">${total}</span>
          </span>
          <span className="text-[13px] text-secondary">{c.note}</span>
          <SmartLink
            to={c.more.page}
            className="mt-1 inline-flex min-h-[44px] w-fit items-center"
          >
            <TextLink>{c.more.t}</TextLink>
          </SmartLink>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Display size="2xs">{menFaqTitle}</Display>
        <FaqList items={menFaq} />
      </div>
    </Section>
  );
}
