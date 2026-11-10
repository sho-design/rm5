/**
 * A number whose digits roll to the new value when it changes (a price total, a count of hours). Each digit is a
 * column of 0 to 9 inside a one-line window, moved up or down with a CSS transform in the site's motion (350ms,
 * cubic-bezier(.2,.8,.2,1)); with reduced motion the digits change at once. Digits are keyed from the right, so
 * the ones place stays the ones place when the number gains a digit. Screen readers get the plain value, not the
 * columns. Formatting is en-CA, no decimals. No client code: the change comes from the parent's re-render.
 */
export function Flow({ value, prefix = "", suffix = "", className }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const num = value.toLocaleString("en-CA", { maximumFractionDigits: 0 });
  const chars = num.split("");
  // [display:inline-block], not the inline-block class: the theme's "block" spacing key gives that class a 14px width.
  const cell = "[display:inline-block] h-[1em] leading-none";
  return (
    <span className={className}>
      <span aria-hidden className="inline-flex items-end">
        {prefix ? <span className={`${cell} whitespace-pre`}>{prefix}</span> : null}
        {chars.map((ch, i) => {
          const key = chars.length - i;
          return /\d/.test(ch) ? (
            // The hidden copy of the digit sets the cell's width, so a narrow 1 does not leave a gap after it.
            <span key={`d${key}`} className={`${cell} relative overflow-hidden`}>
              <span className="invisible">{ch}</span>
              <span className="rm-digit absolute inset-x-0 top-0 flex flex-col items-center" style={{ transform: `translateY(${-Number(ch) * 10}%)` }}>
                {Array.from({ length: 10 }, (_, n) => (
                  <span key={n} className="h-[1em] leading-none">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span key={`s${key}`} className={cell}>
              {ch}
            </span>
          );
        })}
        {suffix ? <span className={`${cell} whitespace-pre`}>{suffix}</span> : null}
      </span>
      <span className="sr-only">{`${prefix}${num}${suffix}`}</span>
    </span>
  );
}
