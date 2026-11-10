"use client";

import { useEffect, useState } from "react";
import { draft } from "@/content/review";

/** Pages that were removed, by the ?moved= value their redirect adds, with what to say on arrival. */
const notes: Record<string, string> = {
  numbers: draft(
    "Know your numbers has moved here. Results such as cholesterol, A1c and ferritin depend on your age, sex and history, so your doctor goes through them with you at your follow-up.",
  ),
};

/**
 * A short note at the top of the page for people who arrive from an old bookmark (round 28, Fatima): says the page
 * moved and why. Removes ?moved= from the address so a refresh or a shared link does not show it again.
 */
export function MovedNotice() {
  const [text, setText] = useState("");
  useEffect(() => {
    const u = new URL(window.location.href);
    const k = u.searchParams.get("moved");
    if (!k || !notes[k]) return;
    setText(notes[k]);
    u.searchParams.delete("moved");
    window.history.replaceState(window.history.state, "", u.pathname + u.search + u.hash);
  }, []);
  if (!text) return null;
  return (
    <div role="status" className="mx-4 mt-4 flex items-start justify-between gap-4 rounded-tile bg-sky-soft px-4 py-3 text-[15px] leading-[1.5] text-ink md:mx-content">
      <span className="pretty">{text}</span>
      <button type="button" onClick={() => setText("")} className="shrink-0 text-[14px] font-semibold text-link">
        {draft("Close")}
      </button>
    </div>
  );
}
