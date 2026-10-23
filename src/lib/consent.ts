/**
 * The visitor's analytics choice, kept in this browser only. "granted" or
 * "denied"; nothing stored means the banner has not been answered yet.
 * Bump VERSION if the banner wording or the tools change, so people are
 * asked again.
 */
const KEY = "rm-consent";
const VERSION = "1";
export const CONSENT_EVENT = "rm-consent-change";
export const OPEN_SETTINGS_EVENT = "rm-consent-open";

export type Consent = "granted" | "denied" | null;

export function readConsent(): Consent {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const [v, choice] = raw.split(":");
    return v === VERSION && (choice === "granted" || choice === "denied") ? choice : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: "granted" | "denied") {
  try {
    window.localStorage.setItem(KEY, `${VERSION}:${choice}:${new Date().toISOString().slice(0, 10)}`);
  } catch {
    /* private mode: the choice lasts for this page view */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
