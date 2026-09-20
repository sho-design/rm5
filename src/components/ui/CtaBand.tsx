import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Block } from "./Section";
import { Display } from "./Text";
import { Button } from "./Button";
import { site } from "@/content/site";

/**
 * Closing band: sunshine (default) or navy, one headline, a short line and
 * one or two CTAs. Every page ends with one, 24px above the teaching strip.
 */
export function CtaBand({
  title,
  sub,
  cta,
  ctaTo = "book",
  cta2,
  cta2To,
  tone = "sun",
  callLine = true,
  children,
  className,
  titleSize = "sm",
}: {
  title: string;
  sub?: string;
  cta: string;
  ctaTo?: string;
  cta2?: string;
  cta2To?: string;
  tone?: "sun" | "navy";
  /** Show "or call 905-709-3222" under the button. */
  callLine?: boolean;
  children?: ReactNode;
  className?: string;
  titleSize?: "sm" | "xs";
}) {
  const navy = tone === "navy";
  return (
    <Block tone={navy ? "navy" : "sun"} last className={cn("grid grid-cols-1 items-center gap-8 p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-14", className)}>
      <div className="flex flex-col gap-3">
        <Display size={titleSize}>{title}</Display>
        {sub ? <span className={cn("pretty max-w-[600px] text-[16px] leading-[1.5] lg:text-[17px]", navy ? "text-white/75" : "text-ink/75")}>{sub}</span> : null}
        {children}
      </div>
      <div className="flex flex-col items-start gap-2.5 lg:items-end">
        <div className="flex flex-wrap gap-2.5">
          <Button to={ctaTo} variant={navy ? "accent" : "primary"} size="lg">
            {cta}
          </Button>
          {cta2 && cta2To ? (
            <Button to={cta2To} variant={navy ? "outline-inverse" : "outline"} size="lg">
              {cta2}
            </Button>
          ) : null}
        </div>
        {callLine ? (
          <a href={site.phoneHref} className={cn("text-[14px] font-semibold", navy ? "text-white" : "text-ink")}>
            or call {site.phone}
          </a>
        ) : null}
      </div>
    </Block>
  );
}
