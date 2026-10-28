"use client";

import { useOpenStatus } from "@/lib/use-open-status";

/** Live "Thornhill open now until 4pm" sentence, filled in after mount. */
export function LiveHours({ className }: { className?: string }) {
  const text = useOpenStatus().text;
  return <span className={className}>{text}</span>;
}
