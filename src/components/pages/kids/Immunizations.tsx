import { Button, ChipRow, Section } from "@/components/ui";
import { immunizationCount, kidsCopy, type ImmunizationStage } from "@/content/kids";
import { SubHeader } from "./FamilySubBits";

/**
 * Immunization tab set: age chips (2 months to Every fall) driving a sage
 * card with the vaccines due, a "Where it happens" tile and the catch-up card.
 * Controlled: the parent shares its state with the age chooser.
 */
export function Immunizations({ stages, value, onChange }: { stages: ImmunizationStage[]; value: number; onChange: (i: number) => void }) {
  const sel = stages[value] ?? stages[0];
  return (
    <Section id="immunizations" className="flex flex-col gap-6">
      <SubHeader eyebrow={kidsCopy.imm.eyebrow} accentClass="text-sage-deep" title={kidsCopy.imm.title} note={kidsCopy.imm.note} />
      <ChipRow items={stages.map((s) => s.label)} value={value} onChange={onChange} ariaLabel="Age" />
      <div className="grid grid-cols-1 gap-block lg:grid-cols-[1.4fr_1fr] lg:items-stretch">
        <div role="tabpanel" aria-live="polite" className="flex flex-col gap-5 rounded-card bg-sage-tint p-6 text-ink md:p-9">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
            <span className="display balance text-[26px] leading-[1.05] lg:text-[32px]">{sel.title}</span>
            <span className="whitespace-nowrap text-[13px] font-semibold text-sage-ink">{immunizationCount(sel)}</span>
          </div>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {sel.shots.map((v) => (
              <div key={v.n} className="flex flex-col gap-1 rounded-row bg-white/80 px-[18px] py-4">
                <span className="text-[15px] font-semibold">{v.n}</span>
                <span className="text-[13px] leading-[1.45] text-secondary">{v.d}</span>
              </div>
            ))}
          </div>
          <span className="text-[14px] leading-[1.5] text-sage-ink">{sel.note}</span>
        </div>
        <div className="flex flex-col gap-block">
          <div className="flex flex-1 flex-col gap-3 rounded-card border border-border bg-card p-6 md:p-7">
            <span className="text-[12px] font-semibold text-muted">{kidsCopy.imm.whereLabel}</span>
            <span className="text-[16px] font-semibold">{sel.where}</span>
            <span className="text-[14px] leading-[1.5] text-secondary">{kidsCopy.imm.whereNote}</span>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-card bg-sun-soft p-6 text-ink md:p-7">
            <div className="flex flex-col gap-1.5">
              <span className="display text-[24px] leading-[1.05]">{kidsCopy.imm.catchTitle}</span>
              <span className="text-[14px] leading-[1.5] text-ink/75">{kidsCopy.imm.catchBody}</span>
            </div>
            <Button to="book" className="self-start">
              {kidsCopy.imm.catchCta}
            </Button>
          </div>
        </div>
      </div>
      <span className="max-w-[720px] text-[13px] leading-[1.5] text-muted">{kidsCopy.imm.footnote}</span>
    </Section>
  );
}
