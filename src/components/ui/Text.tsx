import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type DisplaySize = "hero" | "xl" | "lg" | "md" | "sm" | "xs" | "2xs" | "title-lg" | "title-md" | "title-sm" | "title-xs";

/** Fraunces display sizes from tokens/typography.css, responsive below lg. */
const sizeClass: Record<DisplaySize, string> = {
  hero: "text-[44px] md:text-[64px] lg:text-[84px]",
  xl: "text-[40px] md:text-[56px] lg:text-[76px]",
  lg: "text-[40px] md:text-[56px] lg:text-[72px]",
  md: "text-[34px] md:text-[44px] lg:text-[56px]",
  sm: "text-[32px] md:text-[40px] lg:text-[48px]",
  xs: "text-[30px] md:text-[36px] lg:text-[44px]",
  "2xs": "text-[28px] md:text-[34px] lg:text-[40px]",
  "title-lg": "text-[26px] lg:text-[30px]",
  "title-md": "text-[24px] lg:text-[26px]",
  "title-sm": "text-[22px] lg:text-[24px]",
  "title-xs": "text-[20px] lg:text-[22px]",
};

interface DisplayProps {
  as?: ElementType;
  size?: DisplaySize;
  /** tight = tracking -.025em, leading .96 to 1.02 (H1s and big H2s). */
  tight?: boolean;
  balance?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
}

/** Display heading in Fraunces 500. Use `<em>` inside for the italic 400 phrase. */
export function Display({ as: Tag = "h2", size = "sm", tight = true, balance = true, className, style, children, id }: DisplayProps) {
  return (
    <Tag id={id} style={style} className={cn(tight ? "display-tight" : "display", sizeClass[size], balance && "balance", className)}>
      {children}
    </Tag>
  );
}

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Sunshine on navy, division accent on tints, muted on white. */
  tone?: "muted" | "sun" | "sky" | "inherit";
}

/** 13px semibold eyebrow. Sentence case only. */
export function Eyebrow({ children, className, style, tone = "muted" }: EyebrowProps) {
  const toneClass = { muted: "text-muted", sun: "text-sun", sky: "text-sky", inherit: "" }[tone];
  return (
    <span style={style} className={cn("eyebrow", toneClass, className)}>
      {children}
    </span>
  );
}

interface LeadProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: "lg" | "md" | "base" | "sm";
  tone?: "secondary" | "muted" | "inverse" | "inherit";
}

/** Body copy with text-wrap: pretty. */
export function Lead({ children, className, style, size = "lg", tone = "secondary" }: LeadProps) {
  const s = { lg: "text-[17px] lg:text-[19px] leading-[1.5]", md: "text-[16px] lg:text-[17px] leading-[1.55]", base: "text-[16px] leading-[1.55]", sm: "text-[15px] leading-[1.5]" }[size];
  const t = { secondary: "text-secondary", muted: "text-muted", inverse: "text-white/75", inherit: "" }[tone];
  return (
    <p style={style} className={cn("pretty", s, t, className)}>
      {children}
    </p>
  );
}

/** Text link ending in " ›". */
export function TextLink({ children, className, ...rest }: { children: ReactNode; className?: string } & React.ComponentProps<"span">) {
  return (
    <span className={cn("text-[14px] font-semibold text-link", className)} {...rest}>
      {children} ›
    </span>
  );
}
