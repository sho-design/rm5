import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { kidsCopy } from "@/content/kids";

/** Same flag the chrome uses for the EN / Tiếng Việt toggle (hidden until VI is ready). */
const viEnabled = process.env.NEXT_PUBLIC_VI_ENABLED === "true";

/** Vietnamese-speaking families card (sage) beside the teen privacy card (paper). */
export function KidsLanguage() {
  return (
    <Section id="families" className="grid grid-cols-1 gap-block lg:grid-cols-[1.3fr_1fr] lg:items-stretch">
      <div className="flex flex-col justify-between gap-7 rounded-block bg-sage-tint p-7 text-ink md:p-10">
        <div className="flex flex-col gap-3">
          <span lang="vi">
            <Eyebrow tone="inherit" className="text-sage-deep">
              {kidsCopy.vi.eyebrow}
            </Eyebrow>
          </span>
          <Display size="2xs">{kidsCopy.vi.title}</Display>
          <p className="pretty max-w-[520px] text-[15px] leading-[1.55] text-sage-ink">{kidsCopy.vi.body}</p>
        </div>
        <div className="flex flex-wrap gap-2.5" lang="vi">
          {viEnabled ? <Button to="kids">{kidsCopy.vi.cta}</Button> : null}
          <Button to="register" variant={viEnabled ? "inverse" : "primary"}>
            {kidsCopy.vi.cta2}
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-7 rounded-block border border-border bg-card p-7 md:p-10">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="inherit" className="text-lilac-deep">
            {kidsCopy.teens.eyebrow}
          </Eyebrow>
          <h2 className="display-tight balance text-[28px] lg:text-[32px]">{kidsCopy.teens.title}</h2>
          <p className="pretty text-[15px] leading-[1.55] text-secondary">{kidsCopy.teens.body}</p>
        </div>
        <Button to="book" className="self-start">
          {kidsCopy.teens.cta}
        </Button>
      </div>
    </Section>
  );
}
