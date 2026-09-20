import { Grid } from "@/components/ui";
import type { StandardEntry } from "@/content/about";

/** Nine numbered standards on tinted cards, two per row. */
export function StandardsList({ items }: { items: StandardEntry[] }) {
  return (
    <section className="px-4 pt-8 md:px-content md:pt-10">
      <Grid cols={2}>
        {items.map((s) => (
          <article key={s.n} className="grid grid-cols-[44px_1fr] items-start gap-4 rounded-card p-6 text-ink md:grid-cols-[56px_1fr] md:gap-5 md:p-8" style={{ background: s.bg }}>
            <span aria-hidden className="display-tight text-[28px] tracking-[-.02em] text-ink opacity-55 md:text-[32px]">
              {s.n}
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="display-tight text-[24px] leading-[1.05] tracking-[-.02em] md:text-[26px]">
                <span className="sr-only">{s.n}. </span>
                {s.t}
              </h2>
              <p className="text-[15px] leading-[1.55] text-secondary">{s.d}</p>
            </div>
          </article>
        ))}
      </Grid>
    </section>
  );
}
