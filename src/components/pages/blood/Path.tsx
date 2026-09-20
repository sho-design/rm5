import type { PathStep } from "@/content/types";
import { Block, Display, Eyebrow, StepRow } from "@/components/ui";

/**
 * "The visit" block: navy 28px block, sunshine eyebrow, Fraunces 44 title,
 * a short right-aligned note and the four numbered steps on a hairline.
 */
export function Path({ eyebrow, title, note, steps }: { eyebrow: string; title: string; note: string; steps: PathStep[] }) {
  return (
    <Block tone="navy" className="flex flex-col gap-8 p-6 md:p-10 lg:gap-10 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="sun">{eyebrow}</Eyebrow>
          <Display size="xs">{title}</Display>
        </div>
        <span className="max-w-[380px] text-[14px] leading-[1.5] text-white/70 md:text-right">{note}</span>
      </div>
      <StepRow steps={steps} inverse cols={4} />
    </Block>
  );
}
