import { Block, Button, Display, Eyebrow, StepRow } from "@/components/ui";
import { kidsCopy, kidsPath } from "@/content/kids";

/** First-visit path: navy block, sunshine register CTA, four numbered steps. */
export function KidsPath() {
  return (
    <Block id="first-visit" tone="navy" className="flex flex-col gap-10 p-6 md:p-10 lg:px-12 lg:py-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="flex flex-col gap-2">
          <Eyebrow tone="sun">{kidsCopy.path.eyebrow}</Eyebrow>
          <Display size="xs" className="max-w-[640px]">
            {kidsCopy.path.title}
          </Display>
        </div>
        <Button to="register" variant="accent">
          {kidsCopy.path.cta}
        </Button>
      </div>
      <StepRow steps={kidsPath} inverse />
    </Block>
  );
}
