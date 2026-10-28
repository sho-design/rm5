"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

export interface LiveStatus {
  /** "Thornhill open now until 4pm" / "Thornhill closed, opens tomorrow at 9am". */
  text: string;
  /** Same without the clinic name, capitalised: "Open now until 4pm". */
  short: string;
  open: boolean;
  /** False until the first client tick, so server HTML never claims open or closed. */
  ready: boolean;
}

const shorten = (t: string) => {
  const s = t.replace(/^Thornhill,?\s*/, "");
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
};

/**
 * Live Thornhill status in Toronto time, refreshed each minute. Every
 * open or closed badge on the site reads this one source so they agree.
 */
export function useOpenStatus(): LiveStatus {
  const [s, setS] = useState<LiveStatus>({ text: "Thornhill", short: "", open: false, ready: false });
  useEffect(() => {
    const tick = () => {
      const st = openStatus();
      setS({ text: st.text, short: shorten(st.text), open: st.open, ready: true });
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return s;
}
