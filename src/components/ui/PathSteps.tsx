import type { PathStep } from "@/content/types";
import { cn } from "@/lib/cn";
import { Block } from "./Section";
import { Display, Eyebrow } from "./Text";
import { Button } from "./Button";

/**
 * "Your path" block: navy 28px block, sunshine eyebrow, Fraunces 48 title,
 * white CTA, then 4 numbered steps on a hairline with sunshine number discs.
 */
export function PathSteps({
  eyebrow = "Your path",
  title,
  steps,
  cta,
  ctaTo = "book",
  tone = "navy",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  steps: PathStep[];
  cta?: string;
  ctaTo?: string;
  tone?: "navy" | "paper";
  className?: string;
  id?: string;
}) {
  const navy = tone === "navy";
  return (
    <Block id={id} tone={navy ? "navy" : "paper"} className={cn("flex flex-col gap-10 p-6 md:p-10 lg:px-12 lg:py-14", className)}>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone={navy ? "sun" : "muted"}>{eyebrow}</Eyebrow>
          <Display size="sm" className="max-w-[640px]">
            {title}
          </Display>
        </div>
        {cta ? (
          <Button to={ctaTo} variant={navy ? "inverse" : "primary"}>
            {cta}
          </Button>
        ) : null}
      </div>
      <StepRow steps={steps} inverse={navy} />
    </Block>
  );
}

/** The numbered step row on its own (used inside other blocks). */
export function StepRow({ steps, inverse, cols, className }: { steps: PathStep[]; inverse?: boolean; cols?: 3 | 4; className?: string }) {
  const n = cols ?? (steps.length === 3 ? 3 : 4);
  return (
    <div className={cn("relative grid grid-cols-1 gap-8 md:grid-cols-2", n === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4", "lg:gap-0", className)}>
      <div aria-hidden className={cn("absolute left-6 right-6 top-[22px] hidden h-px lg:block", inverse ? "bg-white/18" : "bg-border")} />
      {steps.map((s) => (
        <div key={s.n} className="relative flex flex-col gap-4 lg:pr-6">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun font-display text-[18px] font-medium text-sun-ink">{s.n}</span>
          <div className="flex flex-col gap-1.5">
            <span className={cn("text-[12px] font-semibold", inverse ? "text-white/55" : "text-muted")}>{s.time}</span>
            <span className="display text-[22px] leading-[1.05] lg:text-[24px]">{s.t}</span>
            <span className={cn("text-[14px] leading-[1.5]", inverse ? "text-white/75" : "text-secondary")}>{s.d}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
