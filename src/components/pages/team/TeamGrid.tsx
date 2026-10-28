"use client";

import { useEffect, useState } from "react";
import { ChipRow, Grid } from "@/components/ui";
import type { TeamMember } from "@/content/types";
import { TeamCard } from "./TeamCard";

/** Division filter chips and the five-column member grid. */
export function TeamGrid({ team, filters, note }: { team: TeamMember[]; filters: string[]; note: string }) {
  const [i, setI] = useState(0);
  // Menu links such as "Our clinicians" open the page filtered: /about/team?service=Medical%20Aesthetics
  useEffect(() => {
    const want = new URLSearchParams(window.location.search).get("service");
    const n = want ? filters.indexOf(want) : -1;
    if (n > 0) setI(n);
  }, [filters]);
  const label = filters[i];
  const shown = label === "All" ? team : team.filter((m) => m.divisions.includes(label));
  return (
    <section className="flex flex-col gap-6 px-4 pt-10 md:px-content md:pt-12">
      <ChipRow items={filters} value={i} onChange={setI} size="sm" ariaLabel="Filter team by service" />
      <Grid cols={5}>
        {shown.map((m) => (
          <TeamCard key={m.name} m={m} />
        ))}
      </Grid>
      <span className="text-[13px] text-muted">{note}</span>
    </section>
  );
}
