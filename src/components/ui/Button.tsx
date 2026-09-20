import type { ComponentProps, ReactNode } from "react";
import { SmartLink } from "./SmartLink";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary" // ink pill
  | "secondary" // sky pill (step-2 actions, division card Book)
  | "accent" // sunshine pill (on navy)
  | "outline" // 1.5px line outline on white
  | "outline-inverse" // 1.5px white outline on photos and navy
  | "inverse" // white pill on navy / photos
  | "ghost"; // text link with chevron

export type ButtonSize = "sm" | "md" | "lg";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[var(--action-primary-bg)] text-[color:var(--action-primary-fg)] border-transparent hover:opacity-90",
  secondary: "bg-[var(--action-secondary-bg)] text-[color:var(--action-secondary-fg)] border-transparent hover:opacity-90",
  accent: "bg-[var(--action-accent-bg)] text-[color:var(--action-accent-fg)] border-transparent hover:opacity-90",
  outline: "bg-transparent text-primary border-border hover:border-sky",
  "outline-inverse": "bg-transparent text-white border-white/60 hover:border-white",
  inverse: "bg-white text-ink border-transparent hover:opacity-90",
  ghost: "bg-transparent text-link border-transparent p-0 h-auto hover:opacity-80",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-[38px] px-4 text-[14px]",
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-[16px]",
};

type Base = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds the " ›" chevron used on all text links. */
  trailing?: boolean;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

type AsLink = Base & { to: string; onClick?: never; type?: never; disabled?: never };
type AsButton = Base & { to?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export type ButtonProps = AsLink | AsButton;

/**
 * Pill button for every call to action. Primary is ink, secondary is sky,
 * accent is sunshine (on navy), outline and ghost for secondary paths.
 * Never uppercase, never more than one primary per block.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", trailing, fullWidth, className, children } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-chip border-[1.5px] font-semibold leading-none whitespace-nowrap transition-all active:scale-[.98] disabled:opacity-45 disabled:cursor-not-allowed",
    variant === "ghost" ? "text-[15px]" : sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );
  const content = (
    <>
      {children}
      {trailing ? <span aria-hidden>›</span> : null}
    </>
  );
  if ("to" in props && props.to !== undefined) {
    return (
      <SmartLink to={props.to} className={classes}>
        {content}
      </SmartLink>
    );
  }
  const { variant: _v, size: _s, trailing: _t, fullWidth: _f, className: _c, children: _ch, to: _to, ...rest } = props as AsButton;
  void _v; void _s; void _t; void _f; void _c; void _ch; void _to;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
