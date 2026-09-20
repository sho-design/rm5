import { Block, Button } from "@/components/ui";

/** Compact closing band (30px title, 40/48 padding) used by the notes and team pages. */
export function SmallBand({ title, sub, cta, ctaTo = "book", tone = "sun" }: { title: string; sub: string; cta: string; ctaTo?: string; tone?: "sun" | "navy" }) {
  const navy = tone === "navy";
  return (
    <Block tone={navy ? "navy" : "sun"} last tight className="flex flex-col gap-6 p-7 md:p-10 md:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="display-tight text-[26px] tracking-[-.02em] lg:text-[30px]">{title}</h2>
        <p className={navy ? "text-[15px] text-white/75" : "text-[15px] text-ink/75"}>{sub}</p>
      </div>
      <Button to={ctaTo} variant={navy ? "accent" : "primary"} className="self-start lg:self-auto">
        {cta}
      </Button>
    </Block>
  );
}
