"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Arrow keys for a role="radiogroup" container: Left/Up and Right/Down move
 * to the previous or next radio, focus it and select it (WAI-ARIA radio
 * group pattern). Home and End jump to the ends. Put it on the container's
 * onKeyDown; pair with rovingTab() on each radio.
 */
export function radioKeys(e: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const radios = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="radio"]:not([disabled])'));
  if (!radios.length) return;
  const cur = radios.indexOf(document.activeElement as HTMLElement);
  if (cur === -1) return;
  e.preventDefault();
  const n = radios.length;
  const next = e.key === "Home" ? 0 : e.key === "End" ? n - 1 : e.key === "ArrowRight" || e.key === "ArrowDown" ? (cur + 1) % n : (cur - 1 + n) % n;
  radios[next].focus();
  radios[next].click();
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
