import { Eyebrow } from "@/components/ui";
import { teamPage } from "@/content/team";

/**
 * Navy spotlight: page title, then Dr. Nguyen as a statement. A portrait panel (initials until the headshot is
 * supplied) beside his name, role and story, with credentials as a short timeline instead of a pill cloud.
 */
export function TeamIntro() {
  const f = teamPage.founder;
  const initials = f.name.replace(/^Dr\. /, "").split(" ").map((w) => w[0]).join("");
  return (
    <div className="flex flex-col gap-10 px-6 pt-10 md:gap-14 md:px-12 md:pt-14 lg:px-16">
      <header className="flex max-w-[820px] flex-col gap-4">
        <Eyebrow tone="sun">{teamPage.eyebrow}</Eyebrow>
        <h1 className="display-tight balance text-[44px] leading-[1] md:text-[72px]">{teamPage.title}</h1>
        <p className="pretty max-w-[640px] text-[17px] leading-[1.55] text-white/75 md:text-[19px]">{teamPage.lead}</p>
      </header>

      <section aria-labelledby="founder" className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        {/* Portrait panel: the headshot of Dr. Nguyen replaces the initials once supplied. */}
        <div aria-hidden className="relative aspect-[4/3] max-h-[460px] overflow-hidden rounded-block bg-sky-soft lg:aspect-[4/5]">
          <span className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sky opacity-60" />
          <span className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sun opacity-70" />
          <span className="absolute inset-0 flex items-center justify-center font-display text-[140px] font-medium tracking-[-.04em] text-ink md:text-[170px]">{initials}</span>
        </div>

        <div className="flex flex-col gap-6 self-center">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-sun">{f.eyebrow}</span>
            <h2 id="founder" className="display-tight text-[40px] leading-[1.02] md:text-[56px]">
              {f.name}
            </h2>
            <span className="text-[15px] text-white/65">{f.role}</span>
          </div>
          <p className="pretty max-w-[720px] text-[16px] leading-[1.65] text-white/85 md:text-[17px]">{f.bio}</p>
          <ol className="grid max-w-[720px] grid-cols-1 gap-x-8 gap-y-3 border-t border-white/15 pt-6 sm:grid-cols-2">
            {f.credentials.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] leading-[1.4]">
                <span aria-hidden className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full bg-sun" />
                {c}
              </li>
            ))}
            <li className="flex gap-3 text-[15px] leading-[1.4] text-white/75">
              <span aria-hidden className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-sky" />
              {f.preceptor}
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
