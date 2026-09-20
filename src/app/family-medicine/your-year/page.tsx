import type { Metadata } from "next";
import { Button, Display, Eyebrow } from "@/components/ui";
import { divisions } from "@/content/divisions";
import { YearPlanner } from "@/components/pages/year/YearPlanner";

const title = "Your year of staying well.";
const lead = "A calm rhythm of checks, spaced through the year, so problems are found early or never start. Adjust the two answers and we lay it out.";

export const metadata: Metadata = { title: "Your year", description: `${title} ${lead}` };

export default function YourYearPage() {
  return (
    <>
      <YearPlanner
        header={
          <div className="flex flex-col gap-4">
            <Eyebrow tone="inherit" style={{ color: divisions.family.accent }}>
              Prevention
            </Eyebrow>
            <Display as="h1" size="lg">
              {title}
            </Display>
            <p className="pretty text-[17px] leading-[1.5] text-muted lg:text-[18px]">{lead}</p>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-block px-4 pt-8 md:grid-cols-2 md:px-content md:pt-10">
        <div className="flex flex-col gap-3 rounded-card border border-border bg-card p-6 lg:p-8">
          <span className="display text-[24px] tracking-[-.02em] lg:text-[26px]">Every visit, always</span>
          <span className="text-[15px] leading-[1.55] text-secondary">
            Blood pressure, weight and a medication check happen at any visit. Your doctor also reviews anything overdue, so you never have to track it alone.
          </span>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-card bg-sun-soft p-6 text-ink lg:p-8">
          <div className="flex flex-col gap-2">
            <span className="display text-[24px] tracking-[-.02em] lg:text-[26px]">Let us remind you.</span>
            <span className="text-[15px] leading-[1.55] text-ink/75">
              Registered patients get a text before each season with what is due. One tap to book. Optional, unsubscribe any time.
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button to="register" size="sm" className="h-[44px] px-[22px]">
              Register
            </Button>
            <Button to="book" variant="inverse" size="sm" className="h-[44px] px-[22px]">
              Book a checkup
            </Button>
          </div>
        </div>
      </div>

      <p className="max-w-[720px] px-4 pb-10 pt-6 text-[13px] leading-[1.5] text-muted md:px-content">
        Based on Ontario screening guidelines for adults without known risk factors. Your doctor adjusts this to your history. It does not replace medical advice.
      </p>
    </>
  );
}
