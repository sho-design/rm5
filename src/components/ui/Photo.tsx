import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PhotoProps {
  src: string;
  alt: string;
  /** Adds the bottom protection gradient from the tokens. */
  protect?: boolean;
  /** Fill its positioned parent (default) or render with an aspect ratio. */
  ratio?: string;
  radius?: "block" | "card" | "card-sm" | "tile" | "row" | "field" | "none";
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
  tint?: string;
}

const radii = { block: "rounded-block", card: "rounded-card", "card-sm": "rounded-card-sm", tile: "rounded-tile", row: "rounded-row", field: "rounded-field", none: "" };

/**
 * Editorial photo block: object-fit cover, rounded corners, optional
 * protection gradient and overlay children (captions, pills).
 */
export function Photo({ src, alt, protect, ratio, radius = "card", className, imgClassName, style, priority, sizes = "(max-width: 768px) 100vw, 50vw", children, tint }: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden", radii[radius], className)} style={{ aspectRatio: ratio, background: tint, ...style }}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imgClassName)} />
      {protect ? <div aria-hidden className="absolute inset-0" style={{ background: "var(--photo-protection)" }} /> : null}
      {children}
    </div>
  );
}

/** White .92 pill caption placed over a photo. */
export function PhotoPill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center gap-2 rounded-chip bg-white/92 px-3 py-1.5 text-[12px] font-semibold text-ink", className)}>{children}</span>;
}
