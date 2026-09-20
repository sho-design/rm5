import { Button, Display, Eyebrow, Section } from "@/components/ui";
import { kidsCopy, kidsForms } from "@/content/kids";
import { MetaTile } from "./FamilySubBits";

/** Forms and notes: navy intro block left, four tinted form tiles right. */
export function KidsForms() {
  return (
    <Section id="forms" className="grid grid-cols-1 gap-block lg:grid-cols-[1fr_1.4fr] lg:items-stretch">
      <div className="flex flex-col justify-between gap-7 rounded-block bg-inverse p-7 text-on-inverse md:p-10">
        <div className="flex flex-col gap-3">
          <Eyebrow tone="sun">{kidsCopy.forms.eyebrow}</Eyebrow>
          <Display size="2xs">{kidsCopy.forms.title}</Display>
          <p className="pretty text-[15px] leading-[1.55] text-white/75">{kidsCopy.forms.body}</p>
        </div>
        <Button to="book" variant="accent" className="self-start">
          {kidsCopy.forms.cta}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-card sm:grid-cols-2">
        {kidsForms.map((f) => (
          <MetaTile key={f.t} {...f} minHeight={170} className="lg:p-6" />
        ))}
      </div>
    </Section>
  );
}
