"use client";

import NumberFlow from "@number-flow/react";

/** The site's motion: 200 to 400ms on cubic-bezier(.2,.8,.2,1). */
const timing = { duration: 350, easing: "cubic-bezier(.2,.8,.2,1)" };

/**
 * A number whose digits roll to the new value when it changes (a price total, a count of hours). Plain text with
 * reduced motion on, and screen readers read the whole value. Formatting is en-CA, no decimals.
 */
export function Flow({
  value,
  prefix,
  suffix,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  // Screen readers read the animated digits one by one ("$ 1 , 2 0 0"), so they get the plain value instead.
  const text = `${prefix ?? ""}${value.toLocaleString("en-CA", { maximumFractionDigits: 0 })}${suffix ?? ""}`;
  return (
    <span className={className}>
      <span aria-hidden>
        <NumberFlow
          value={value}
          prefix={prefix}
          suffix={suffix}
          locales="en-CA"
          format={{ maximumFractionDigits: 0 }}
          transformTiming={timing}
          spinTiming={timing}
          opacityTiming={{ duration: 200, easing: "ease-out" }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
