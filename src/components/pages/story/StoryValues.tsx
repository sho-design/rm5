import { Display, Grid } from "@/components/ui";
import type { TintCard } from "@/content/types";
import { storyPage } from "@/content/about";

/** "What we will not compromise on": four tinted value cards, min height 220. */
export function StoryValues({ values }: { values: TintCard[] }) {
  return (
    <section className="flex flex-col gap-5 px-4 pt-12 md:px-content md:pt-section">
      <Display size="xs">{storyPage.valuesTitle}</Display>
      <Grid cols={4}>
        {values.map((v) => (
          <div key={v.t} className="flex min-h-[180px] flex-col gap-2.5 rounded-card p-6 text-ink md:min-h-[220px] md:p-7" style={{ background: v.bg }}>
            <h3 className="display-tight text-[24px] leading-[1.05] tracking-[-.02em]">{v.t}</h3>
            <p className="text-[14px] leading-[1.5] text-secondary">{v.d}</p>
          </div>
        ))}
      </Grid>
    </section>
  );
}
