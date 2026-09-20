import { Display, Lead, SmartLink } from "@/components/ui";
import { careersCopy } from "@/content/about";

/** Careers hero: breadcrumb + 72px H1 left, 18px lead right, aligned to the baseline. */
export function CareersHero() {
  return (
    <header className="grid grid-cols-1 items-end gap-6 px-4 pt-10 md:px-content md:pt-16 lg:grid-cols-2 lg:gap-10">
      <div className="flex flex-col gap-4">
        <SmartLink to="about" className="eyebrow text-link">
          {careersCopy.crumb}
        </SmartLink>
        <Display as="h1" size="lg">
          {careersCopy.h1}
        </Display>
      </div>
      <Lead size="md" className="lg:text-[18px]">
        {careersCopy.lead}
      </Lead>
    </header>
  );
}
