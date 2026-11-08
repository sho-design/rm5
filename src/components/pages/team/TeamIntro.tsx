import { Fragment } from "react";
import { Eyebrow } from "@/components/ui";
import { teamCarousel, teamPage } from "@/content/team";
import { cn } from "@/lib/cn";
import { CountUp, Reveal } from "./TeamMotion";

/**
 * Splits the title so it rises in word by word, with the last two words ("your care.") in blue italic.
 * Uses [display:inline-block], not the inline-block class: the theme's "block" spacing key gives that class a 14px width.
 */
function Title({ text }: { text: string }) {
  const words = text.split(" ");
  const accentFrom = Math.max(0, words.length - 2);
  return (
    <h1 className="display-tight max-w-[880px] text-[48px] leading-[.95] md:text-[84px] lg:text-[96px]">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Fragment key={i}>
            {/* From tablet up, "your care." starts its own line so the accent reads as one phrase. */}
            {i === accentFrom && i > 0 ? (
              <span className="hidden md:block" />
            ) : null}
            <span className="[display:inline-block] overflow-hidden whitespace-nowrap pb-[.08em] align-bottom">
              <span
                className={`rm-rise [display:inline-block] ${i >= accentFrom ? "font-display italic text-link" : ""}`}
                style={{ animationDelay: `${120 + i * 70}ms` }}
              >
                {w}
                {i < words.length - 1 ? " " : ""}
              </span>
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
}

/**
 * Navy spotlight: the title rising in, a numbers strip from the roster, then Dr. Nguyen as a statement with an
 * orbiting portrait panel (initials until his headshot is supplied) and credentials that rise in one by one.
 */
export function TeamIntro({
  physicians,
  nurses,
}: {
  physicians: number;
  nurses: number;
}) {
  const f = teamPage.founder;
  const s = teamCarousel.stats;
  const initials = f.name
    .replace(/^Dr\. /, "")
    .split(" ")
    .map((w) => w[0])
    .join("");
  const stats = [
    { n: physicians, t: s.physicians },
    { n: nurses, t: s.nurses },
    { n: 1, t: s.lab },
    { n: 2, t: s.languages },
  ];
  return (
    <div className="flex flex-col gap-12 px-6 pt-12 md:gap-16 md:px-12 md:pt-20 lg:px-16">
      <header className="flex max-w-[980px] flex-col gap-5">
        <Eyebrow tone="sky" className="rm-fade">
          {teamPage.eyebrow}
        </Eyebrow>
        <Title text={teamPage.title} />
        <p
          className="rm-rise pretty max-w-[640px] text-[17px] leading-[1.55] text-secondary md:text-[19px]"
          style={{ animationDelay: "420ms" }}
        >
          {teamPage.lead}
        </p>
      </header>

      <dl className="grid grid-cols-2 gap-y-6 border-y border-border py-6 md:grid-cols-4 md:py-8">
        {stats.map((x, i) => (
          <Reveal
            key={x.t}
            delay={i * 90}
            className={cn(
              "flex flex-col-reverse justify-end gap-1",
              i % 2 === 1 && "border-l border-border pl-5",
              i > 0 && "md:border-l md:border-border md:pl-8",
            )}
          >
            <dt className="text-[14px] text-secondary">{x.t}</dt>
            <dd className="font-display text-[56px] leading-none tracking-[-.03em] text-primary md:text-[72px]">
              <CountUp to={x.n} />
            </dd>
          </Reveal>
        ))}
      </dl>

      <section
        aria-labelledby="founder"
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16"
      >
        {/* Portrait panel: the headshot of Dr. Nguyen replaces the initials once supplied. */}
        <Reveal className="relative mx-auto w-full max-w-[420px]">
          <div
            aria-hidden
            className="relative aspect-square overflow-hidden rounded-full bg-sky-soft shadow-[0_30px_80px_rgba(16,24,40,.14)] lg:aspect-[4/5] lg:rounded-[200px]"
          >
            <span className="rm-drift absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky opacity-70" />
            <span
              className="rm-drift absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-sun opacity-80"
              style={{ animationDelay: "-8s" }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-display text-[130px] font-medium tracking-[-.04em] text-ink md:text-[170px]">
              {initials}
            </span>
          </div>
          {/* Orbit ring with a sun dot, turning slowly. */}
          <div
            aria-hidden
            className="rm-orbit pointer-events-none absolute -inset-4 rounded-full border border-dashed border-ink/20 lg:rounded-[220px]"
          >
            <span className="absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rounded-full bg-sun shadow-[0_0_16px_var(--rm-sun)]" />
          </div>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold text-link">
              {f.eyebrow}
            </span>
            <h2
              id="founder"
              className="display-tight text-[44px] leading-[1] md:text-[64px]"
            >
              {f.name}
            </h2>
            <span className="text-[15px] text-secondary">{f.role}</span>
          </Reveal>
          <Reveal delay={100}>
            <p className="pretty max-w-[720px] text-[16px] leading-[1.7] text-primary md:text-[18px]">
              {f.bio}
            </p>
          </Reveal>
          <ol className="grid max-w-[720px] grid-cols-1 gap-x-8 gap-y-3 border-t border-border pt-6 sm:grid-cols-2">
            {f.credentials.map((c, i) => (
              <Reveal
                as="li"
                key={c}
                delay={150 + i * 80}
                className="flex gap-3 text-[15px] leading-[1.4]"
              >
                <span
                  aria-hidden
                  className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full bg-sun"
                />
                {c}
              </Reveal>
            ))}
            <Reveal
              as="li"
              delay={150 + f.credentials.length * 80}
              className="flex gap-3 text-[15px] leading-[1.4] text-secondary"
            >
              <span
                aria-hidden
                className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full border-2 border-sky"
              />
              {f.preceptor}
            </Reveal>
          </ol>
        </div>
      </section>
    </div>
  );
}
