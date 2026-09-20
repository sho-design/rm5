import { external } from "@/lib/routes";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const glyphs = {
  instagram: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M12 7.3a4.7 4.7 0 100 9.4 4.7 4.7 0 000-9.4zm0 7.7a3 3 0 110-6 3 3 0 010 6zm6-7.9a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 3c-2.4 0-2.7 0-3.7.1-2.6.1-4.1 1.6-4.2 4.2C4 8.3 4 8.6 4 12s0 3.7.1 4.7c.1 2.6 1.6 4.1 4.2 4.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c2.6-.1 4.1-1.6 4.2-4.2.1-1 .1-1.3.1-4.7s0-3.7-.1-4.7c-.1-2.6-1.6-4.1-4.2-4.2C14.7 3 14.4 3 12 3zm0 1.7c2.4 0 2.6 0 3.6.1 1.9.1 2.6.9 2.7 2.7.1 1 .1 1.2.1 3.6s0 2.6-.1 3.6c-.1 1.8-.8 2.6-2.7 2.7-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-1.9-.1-2.6-.9-2.7-2.7C5.7 14.6 5.7 14.4 5.7 12s0-2.6.1-3.6c.1-1.8.8-2.6 2.7-2.7 1-.1 1.2-.1 3.6-.1z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9z" />
    </svg>
  ),
};

/** 26px round social icons for the utility bar; 44px variant for the mobile menu. */
export function SocialIcons({ size = 26, className }: { size?: 26 | 44; className?: string }) {
  const s = size === 44 ? "h-11 w-11 border-[1.5px] border-white/25 text-white" : "h-[26px] w-[26px] text-white/75 hover:bg-white/12 hover:text-white";
  return (
    <div className={cn("flex items-center", size === 44 ? "gap-1.5" : "gap-0.5", className)}>
      <a href={external.instagram} target="_blank" rel="noopener" aria-label="Instagram" title="Instagram" className={cn("flex items-center justify-center rounded-full transition-colors", s)}>
        {glyphs.instagram}
      </a>
      <a href={external.facebook} target="_blank" rel="noopener" aria-label="Facebook" title="Facebook" className={cn("flex items-center justify-center rounded-full transition-colors", s)}>
        {glyphs.facebook}
      </a>
    </div>
  );
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

/** Footer: 36px round bordered icon buttons (Instagram, Facebook, Google Maps, Email). */
export function FooterIcons() {
  const btn = "flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-border bg-raised transition-colors hover:border-sky";
  return (
    <div className="flex gap-2 pt-1">
      <a href={external.instagram} target="_blank" rel="noopener" aria-label="Instagram" className={btn}>
        <svg viewBox="0 0 24 24" width="16" height="16" {...line} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
      </a>
      <a href={external.facebook} target="_blank" rel="noopener" aria-label="Facebook" className={btn}>
        <svg viewBox="0 0 24 24" width="16" height="16" {...line} aria-hidden>
          <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
        </svg>
      </a>
      <a href={external.thornhillMaps} target="_blank" rel="noopener" aria-label="Google Maps" className={btn}>
        <svg viewBox="0 0 24 24" width="16" height="16" {...line} aria-hidden>
          <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
        </svg>
      </a>
      <a href={`mailto:${site.email}`} aria-label="Email" className={btn}>
        <svg viewBox="0 0 24 24" width="16" height="16" {...line} aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </a>
    </div>
  );
}
