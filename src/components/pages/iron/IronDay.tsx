import { ironDay as c, ironInfusionDays, ironLastStart } from "@/content/iron";
import { Display, Eyebrow, Section, SmartLink } from "@/components/ui";

const tints = ["bg-sky-soft", "bg-lilac-tint", "bg-sage-tint", "bg-sun-tint"];

/**
 * One infusion visit as a proportioned bar: check in, IV, infusion, 30 minutes watching you. Only the total (about
 * 3 hours) and the 30 minutes are clinic facts, so the parts carry no minutes of their own. The three infusion days
 * sit underneath with their hours.
 */
export function IronDay({ noteHref }: { noteHref?: string }) {
  return (
    <Section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <Display size="xs">{c.title}</Display>
      </div>

      <ol className="rm-iron-day flex flex-col gap-2.5 md:flex-row md:gap-1.5">
        {c.parts.map((p, i) => (
          <li key={p.t} className="flex flex-col gap-2 md:min-w-0" style={{ flexGrow: p.w, flexBasis: 0 }}>
            <div className={`flex h-[56px] items-center gap-3 rounded-card-sm px-4 md:h-[64px] ${tints[i]} ${i === 0 ? "md:rounded-l-block" : ""} ${i === c.parts.length - 1 ? "md:rounded-r-block" : ""}`}>
              <span className="font-display text-[22px] font-medium leading-none tracking-[-.02em]">{i + 1}</span>
              <span className="truncate text-[15px] font-semibold">{p.t}</span>
            </div>
            <span className="pretty px-1 text-[14px] leading-[1.5] text-muted">{p.d}</span>
          </li>
        ))}
      </ol>
      <p className="pretty max-w-[62ch] text-[15px] leading-[1.55] text-secondary">
        {c.note}{" "}
        {noteHref ? (
          <SmartLink to={noteHref} className="font-semibold text-link">
            Read: what to expect at an iron infusion ›
          </SmartLink>
        ) : null}
      </p>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
        {ironInfusionDays.map((d) => (
          <div key={d.label} className="flex items-baseline justify-between gap-3 rounded-card-sm border border-border bg-card px-5 py-4">
            <span className="flex flex-col">
              <span className="font-display text-[22px] font-medium leading-[1.1] tracking-[-.02em]">{d.label}</span>
              <span className="text-[13px] text-muted">{d.when}</span>
            </span>
            <span className="flex flex-col items-end text-right">
              <span className="text-[15px] font-semibold">{ironLastStart(d.lastStart)}</span>
              <span className="text-[13px] text-muted">{`Open ${d.hours}`}</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
