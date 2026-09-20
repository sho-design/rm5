"use client";

import { useEffect, useState } from "react";
import { openStatus } from "@/lib/hours";

/** Live "Thornhill open now until 4pm" sentence, filled in after mount. */
export function LiveHours({ className }: { className?: string }) {
  const [text, setText] = useState<string>("Thornhill");
  useEffect(() => {
    const tick = () => setText(openStatus().text);
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return <span className={className}>{text}</span>;
}
