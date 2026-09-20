"use client";

import { useState } from "react";
import { ChipRow, Grid } from "@/components/ui";
import type { HealthNote } from "@/content/types";
import { NoteCard } from "./NoteCard";

/** Division filter chips and the filtered card grid. */
export function NotesGrid({ notes, filters }: { notes: HealthNote[]; filters: string[] }) {
  const [i, setI] = useState(0);
  const label = filters[i];
  const shown = label === "All" ? notes : notes.filter((n) => n.division === label);
  return (
    <>
      <div className="px-4 pt-8 md:px-content md:pt-10">
        <ChipRow items={filters} value={i} onChange={setI} size="sm" ariaLabel="Filter notes by service" />
      </div>
      <section aria-live="polite" className="px-4 pt-5 md:px-content md:pt-6">
        <Grid cols={3}>
          {shown.map((n) => (
            <NoteCard key={n.slug} note={n} />
          ))}
        </Grid>
      </section>
    </>
  );
}
