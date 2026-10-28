"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "contrast";
export type TextStep = 0 | 1 | 2;

const safeSet = (k: string, v: string | null) => {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {
    /* private mode */
  }
};

/** Fired when a preference changes so every control on the page (utility bar, footer, phone menu) agrees. */
const PREFS_EVENT = "rm-prefs";

const readTheme = (): Theme => {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" || t === "contrast" ? t : "light";
};
const readText = (): TextStep => {
  const s = document.documentElement.getAttribute("data-text");
  return s === "1" || s === "2" ? (Number(s) as TextStep) : 0;
};

/** Theme preference: sets data-theme on <html> and persists it. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    const sync = () => setThemeState(readTheme());
    sync();
    window.addEventListener(PREFS_EVENT, sync);
    return () => window.removeEventListener(PREFS_EVENT, sync);
  }, []);
  const setTheme = useCallback((t: Theme) => {
    if (t === "light") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    safeSet("rm-theme", t === "light" ? null : t);
    window.dispatchEvent(new Event(PREFS_EVENT));
  }, []);
  return { theme, setTheme, toggleContrast: () => setTheme(theme === "contrast" ? "light" : "contrast") };
}

/** Text size steps 0, 1, 2 set as data-text on <html>. */
export function useTextSize() {
  const [step, setStepState] = useState<TextStep>(0);
  useEffect(() => {
    const sync = () => setStepState(readText());
    sync();
    window.addEventListener(PREFS_EVENT, sync);
    return () => window.removeEventListener(PREFS_EVENT, sync);
  }, []);
  const setStep = useCallback((s: TextStep) => {
    if (s === 0) document.documentElement.removeAttribute("data-text");
    else document.documentElement.setAttribute("data-text", String(s));
    safeSet("rm-text", s === 0 ? null : String(s));
    window.dispatchEvent(new Event(PREFS_EVENT));
  }, []);
  return { step, up: () => setStep(Math.min(2, step + 1) as TextStep), down: () => setStep(Math.max(0, step - 1) as TextStep), reset: () => setStep(0) };
}

export const viEnabled = process.env.NEXT_PUBLIC_VI_ENABLED === "true";
