import { Grid } from "@/components/ui";
import { careersWhy } from "@/content/about";

/** Why work here: four paper cards, 22px radius, title 17 and body 14. */
export function WhyCards() {
  return (
    <div className="px-4 pt-8 md:px-content md:pt-12">
      <Grid cols={4}>
        {careersWhy.map((w) => (
          <div key={w.t} className="flex flex-col gap-2 rounded-card-sm border border-border bg-card p-6">
            <span className="text-[17px] font-semibold">{w.t}</span>
            <span className="text-[14px] leading-[1.5] text-muted">{w.d}</span>
          </div>
        ))}
      </Grid>
    </div>
  );
}
