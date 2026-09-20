import { Grid } from "@/components/ui";
import { standardsPage } from "@/content/about";

/** Three outlined cards: which Ontario college regulates physicians, nurses and therapists. */
export function StandardsColleges() {
  return (
    <section className="px-4 pt-12 md:px-content md:pt-16">
      <Grid cols={3}>
        {standardsPage.colleges.map((c) => (
          <div key={c.k} className="flex flex-col gap-2 rounded-card border border-border p-6 md:p-7">
            <span className="text-[12px] font-semibold text-muted">{c.k}</span>
            <p className="text-[15px] leading-[1.5]">{c.v}</p>
          </div>
        ))}
      </Grid>
    </section>
  );
}
