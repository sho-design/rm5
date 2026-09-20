import { Display, Eyebrow, PageHeader } from "@/components/ui";
import { teamPage } from "@/content/team";

/**
 * Team header plus the founder block: portrait placeholder left (420px),
 * paper card right with eyebrow, Fraunces 44 name, role, bio and credential pills.
 */
export function TeamIntro() {
  const f = teamPage.founder;
  return (
    <>
      <PageHeader eyebrow={teamPage.eyebrow} title={teamPage.title} lead={teamPage.lead} />
      <section className="grid grid-cols-1 items-stretch gap-block px-4 pt-8 md:px-content md:pt-10 lg:grid-cols-[420px_1fr]">
        {/* Portrait placeholder: the real headshot of Dr. Nguyen (from restorationmedical.ca) replaces this striped panel. */}
        <div
          aria-hidden
          className="flex min-h-[260px] items-center justify-center rounded-block border border-border p-6 text-center lg:min-h-[520px]"
          style={{ background: "repeating-linear-gradient(135deg, var(--rm-paper-2) 0 12px, var(--rm-sky-soft) 12px 24px)" }}
        >
          <span className="text-[13px] leading-[1.6] text-muted">{f.portraitNote}</span>
        </div>
        <div className="flex flex-col justify-between gap-7 rounded-block border border-border bg-card p-6 md:p-10">
          <div className="flex flex-col gap-3">
            <Eyebrow tone="sky">{f.eyebrow}</Eyebrow>
            <Display as="h2" size="xs">
              {f.name}
            </Display>
            <span className="text-[15px] text-muted">{f.role}</span>
            <p className="pretty pt-2 text-[16px] leading-[1.55]">{f.bio}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {f.credentials.map((c) => (
              <li key={c} className="rounded-chip bg-sun-soft px-3 py-2 text-[12px] font-semibold text-ink">
                {c}
              </li>
            ))}
            <li className="rounded-chip bg-sky-soft px-3 py-2 text-[12px] font-semibold text-[color:var(--div-family-accent)]">{f.preceptor}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
