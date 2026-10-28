import type { ReactNode } from "react";

/** Phone numbers in running text never break across lines ("905-" / "709-3222"). */
export function keepPhones(text: string): ReactNode {
  const parts = text.split(/(\d{3}-\d{3}-\d{4})/);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    i % 2 ? (
      <span key={i} className="whitespace-nowrap">
        {p}
      </span>
    ) : (
      p
    ),
  );
}
