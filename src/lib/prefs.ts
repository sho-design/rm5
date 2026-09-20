"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark" | "contrast";
export type TextStep = 0 | 1 | 2;

const safeGet = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (k: string, v: string | null) => {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {
    /* private mode */
  }
};

/** Theme preference: sets data-theme on <html> and persists it. */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme");
    if (t === "dark" || t === "contrast") setThemeState(t);
  }, []);
  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    if (t === "light") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    safeSet("rm-theme", t === "light" ? null : t);
  }, []);
  return { theme, setTheme, toggleContrast: () => setTheme(theme === "contrast" ? "light" : "contrast") };
}

/** Text size steps 0, 1, 2 set as data-text on <html>. */
export function useTextSize() {
  const [step, setStepState] = useState<TextStep>(0);
  useEffect(() => {
    const s = safeGet("rm-text");
    if (s === "1" || s === "2") setStepState(Number(s) as TextStep);
  }, []);
  const setStep = useCallback((s: TextStep) => {
    setStepState(s);
    if (s === 0) document.documentElement.removeAttribute("data-text");
    else document.documentElement.setAttribute("data-text", String(s));
    safeSet("rm-text", s === 0 ? null : String(s));
  }, []);
  return { step, up: () => setStep(Math.min(2, step + 1) as TextStep), down: () => setStep(Math.max(0, step - 1) as TextStep), reset: () => setStep(0) };
}

export const viEnabled = process.env.NEXT_PUBLIC_VI_ENABLED === "true";
