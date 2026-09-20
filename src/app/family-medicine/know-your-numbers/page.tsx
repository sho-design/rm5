import type { Metadata } from "next";
import { Button, Display, Eyebrow } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { numbers } from "@/content/prevention";
import { NumberPicker } from "@/components/pages/numbers/NumberPicker";

const title = "Your lab report, in plain language.";
const lead =
  "Pick a number to see what it measures, a typical target range and what we do together if it is off. Your own targets may differ, and your doctor will say so.";

export const metadata: Metadata = { title: "Know your numbers", description: `${title} ${lead}` };

export default function KnowYourNumbersPage() {
  return (
    <>
      <header className="flex max-w-[820px] flex-col gap-4 px-4 pt-10 md:px-content md:pt-16">
        <Eyebrow tone="inherit" style={{ color: divisions.family.accent }}>
          Know your numbers
        </Eyebrow>
        <Display as="h1" size="lg">
          {title}
        </Display>
        <p className="pretty text-[17px] leading-[1.5] text-muted lg:text-[18px]">{lead}</p>
      </header>

      <NumberPicker numbers={numbers} />

      <section className="mx-3 mb-3 mt-10 flex flex-col gap-5 rounded-block border border-border bg-card p-6 md:mx-gutter md:mb-6 md:mt-12 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 md:py-10">
        <div className="flex flex-col gap-1.5">
          <span className="display text-[26px] tracking-[-.02em] lg:text-[30px]">Have a report you do not understand?</span>
          <span className="text-[15px] text-muted">Book a results visit. We go through it line by line.</span>
        </div>
        <Button to="book" className="self-start md:self-auto">
          Book a results visit
        </Button>
      </section>
    </>
  );
}
