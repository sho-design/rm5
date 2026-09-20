"use client";

import { Icon, SmartLink, useHover } from "@/components/ui";
import type { SubNavItem } from "@/content/types";

function Tile({ item }: { item: SubNavItem }) {
  const { on, bind } = useHover();
  return (
    <SmartLink
      to={item.page}
      {...bind}
      className="flex flex-col items-center gap-1.5 rounded-[12px] px-1 py-2.5 text-center text-[11px] font-semibold text-primary transition-colors duration-[250ms] md:gap-2.5 md:rounded-[14px] md:px-1.5 md:py-2 md:text-[13px]"
    >
      <span className="flex h-9 w-9 items-center justify-center md:h-[72px] md:w-[72px]">
        <Icon name={item.icon} stroke={1.25} animate={on} className="h-9 w-9 md:h-12 md:w-12" />
      </span>
      {item.label}
    </SmartLink>
  );
}

/**
 * Division sub-navigation: bare line pictograms (prototype iconStyle
 * "lineart") that play their own animation while the tile is hovered or
 * focused (iconHover "custom"). Three-up grid on mobile, one row on desktop.
 */
export function SubNav({ items, label }: { items: readonly SubNavItem[]; label: string }) {
  return (
    <nav aria-label={`${label} sections`} className="grid grid-cols-3 gap-2 border-b border-border pb-4 md:flex md:flex-wrap md:gap-9 md:pb-7">
      {items.map((it) => (
        <Tile key={it.label} item={it} />
      ))}
    </nav>
  );
}
