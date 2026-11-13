"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type WayItem = { label: string; href: string; current?: boolean; group?: string };

/**
 * A small menu for the slim "you are here" bar (WayBar). With a mouse it opens after a short pause on hover and
 * closes a moment after the pointer leaves the button and the list; a click pins it open. Keyboard and touch
 * open it with Enter, Space or a tap. Escape or a click outside closes it.
 */
export function WayMenu({
  label,
  items,
  buttonClassName,
  buttonStyle,
  tint,
  onOpenChange,
}: {
  label: ReactNode;
  items: WayItem[];
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
  tint?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  const [open, setOpenState] = useState(false);
  const setOpen = (v: boolean) => {
    setOpenState(v);
    onOpenChange?.(v);
  };
  const timer = useRef<number | undefined>(undefined);
  const byHover = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();

  const hoverIn = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    if (open) return;
    timer.current = window.setTimeout(() => {
      byHover.current = true;
      setOpen(true);
    }, 140);
  };
  const hoverOut = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(timer.current);
    if (!byHover.current) return;
    timer.current = window.setTimeout(() => {
      byHover.current = false;
      setOpen(false);
    }, 280);
  };

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        byHover.current = false;
        setOpen(false);
        btn.current?.focus();
      }
    };
    const click = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) {
        byHover.current = false;
        setOpen(false);
      }
    };
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", click);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  let lastGroup: string | undefined;
  return (
    <div ref={box} className="relative min-w-0" onPointerEnter={hoverIn} onPointerLeave={hoverOut}>
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          window.clearTimeout(timer.current);
          if (byHover.current && open) byHover.current = false;
          else setOpen(!open);
        }}
        className={cn("flex min-w-0 items-center gap-1.5", buttonClassName)}
        style={buttonStyle}
      >
        {label}
        <span aria-hidden className="shrink-0 text-[12px] opacity-70">
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open ? (
        // pt-2 keeps the pointer over the menu while it moves from the button down into the list.
        <div id={id} className="absolute left-0 top-full z-10 pt-2">
          <ul className="max-h-[60vh] w-[300px] overflow-auto rounded-[16px] border border-border bg-page p-2 shadow-sticky">
            {items.map((it) => {
              const head = it.group && it.group !== lastGroup ? it.group : null;
              lastGroup = it.group;
              return (
                <li key={it.href + it.label}>
                  {head ? (
                    <span className="mt-1 block border-t border-border px-3 pb-1 pt-3 text-[13px] font-semibold text-muted">
                      {head}
                    </span>
                  ) : null}
                  <Link
                    href={it.href}
                    aria-current={it.current ? "page" : undefined}
                    onClick={() => {
                      byHover.current = false;
                      setOpen(false);
                    }}
                    className={cn(
                      "flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[10px] px-3 text-left text-[15px] hover:bg-card",
                      it.current && "font-semibold",
                    )}
                    style={it.current && tint ? { background: tint } : undefined}
                  >
                    {it.label}
                    {it.current ? (
                      <span aria-hidden className="text-[13px] text-muted">
                        You are here
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
