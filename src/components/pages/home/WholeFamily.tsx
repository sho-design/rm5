import { familyTiles } from "@/content/home";
import { Button, Display, Section, SmartLink } from "@/components/ui";

/** "One clinic for three generations." Sunshine block plus three tinted tiles. */
export function WholeFamily() {
  return (
    <Section className="grid grid-cols-1 items-stretch gap-block lg:grid-cols-[1fr_1.5fr]">
      <div className="flex flex-col justify-between gap-7 rounded-block bg-sun-soft p-6 text-ink md:p-10">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">The whole family</span>
          <Display size="xs">One clinic for three generations.</Display>
          <p className="pretty text-[15px] leading-[1.55] text-ink/75">Register your household once. Shared reminders, one point of contact, and care in Vietnamese for the parents and grandparents who prefer it.</p>
        </div>
        <Button to="register" className="self-start">
          Register your family
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-card md:grid-cols-3">
        {familyTiles.map((f) => (
          <div key={f.t} className="flex flex-col gap-3.5 rounded-card border border-border p-[26px] text-ink" style={{ background: f.bg }}>
            <h3 className="font-display text-[26px] font-medium leading-[1.05] tracking-[-.02em]">{f.t}</h3>
            <ul className="flex flex-1 flex-col gap-2 text-[14px] leading-[1.45] text-ink-2">
              {f.items.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-ink" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <SmartLink to={f.page} className="text-[13px] font-semibold text-link">
              {f.link} ›
            </SmartLink>
          </div>
        ))}
      </div>
    </Section>
  );
}
