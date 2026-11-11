"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Arrow keys for a role="radiogroup" container: Left/Up and Right/Down move
 * to the previous or next radio, focus it and select it (WAI-ARIA radio
 * group pattern). Home and End jump to the ends. Radios marked
 * aria-disabled (a closed day) are skipped. Put it on the container's
 * onKeyDown; pair with rovingTab() on each radio.
 */
export function radioKeys(e: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const all = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]:not([disabled])'));
  const cur = all.indexOf(document.activeElement as HTMLElement);
  if (cur === -1) return;
  const usable = (el: HTMLElement) => el.getAttribute("aria-disabled") !== "true";
  if (!all.some(usable)) return;
  e.preventDefault();
  const n = all.length;
  const step = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Home" ? 1 : -1;
  let next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : (cur + step + n) % n;
  while (!usable(all[next])) next = (next + step + n) % n;
  all[next].focus();
  all[next].click();
}

/**
 * Roving tabindex for one radio: only the selected radio is a Tab stop, or
 * the first one when nothing is selected yet, so a group costs one Tab.
 */
export function rovingTab(on: boolean, index: number, anySelected: boolean): 0 | -1 {
  if (on) return 0;
  return !anySelected && index === 0 ? 0 : -1;
}

/**
 * Move focus to an element and scroll it into view (instant when motion is
 * reduced). Pass `scrollTo` to scroll a wider block instead, for example the
 * whole booking flow so its title stays visible above the new step.
 * Scrolling honours the page's scroll-padding-top (the sticky header).
 */
export function focusAndReveal(el: HTMLElement | null, scrollTo?: HTMLElement | null) {
  if (!el) return;
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  (scrollTo ?? el).scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
}

/**
 * Ref for the heading of a step or confirmation that replaces a form. When
 * `key` changes after the first render, the element is scrolled into view
 * and focused, so people see the result and screen readers announce it.
 */
export function useRevealOnChange<T extends HTMLElement>(key: unknown, scrollTo?: { current: HTMLElement | null }) {
  const ref = useRef<T>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    focusAndReveal(ref.current, scrollTo?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return ref;
}

/**
 * After an accordion row opens and the row above it closes, the button that
 * was pressed can end up above the viewport (under the sticky header). Bring
 * it back into view on the next frame, only when it is actually hidden.
 */
export function keepInView(el: HTMLElement | null, topOffset = 72) {
  if (!el) return;
  requestAnimationFrame(() => {
    const r = el.getBoundingClientRect();
    if (r.top < topOffset || r.bottom > window.innerHeight) {
      window.scrollBy({ top: r.top - topOffset - 8, behavior: reducedMotion() ? "auto" : "smooth" });
    }
  });
}

/**
 * Keyboard support for a tab row, as screen reader users expect (WAI-ARIA tabs pattern): arrow keys move to the
 * next or previous tab and select it, Home and End jump to the ends. Put the handler on the element with
 * role="tablist" and give the selected tab tabIndex 0 and the rest -1, so Tab moves into the row once and out again.
 */
export function tabKeys(count: number, value: number, onChange: (i: number) => void) {
  return (e: KeyboardEvent<HTMLElement>) => {
    const k = e.key;
    const next =
      k === "ArrowRight" || k === "ArrowDown" ? (value + 1) % count : k === "ArrowLeft" || k === "ArrowUp" ? (value - 1 + count) % count : k === "Home" ? 0 : k === "End" ? count - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    onChange(next);
    e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus();
  };
}

/** True when the visitor asked for less motion (live: follows a change in the system setting). */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}
