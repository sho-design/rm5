/**
 * Cookie banner wording. New copy, not from the prototype: needs clinic and
 * privacy officer approval (docs/content-review.md). The privacy policy
 * should also say the site uses Google Analytics only with consent.
 */
export const consentCopy = {
  label: "Cookie choices",
  title: "Can we count visits?",
  body: "With your OK we use Google Analytics to see which pages help people. It never runs on booking, registration, contact, referral, careers or renewal pages, and it never receives health information.",
  privacy: "Privacy policy",
  accept: "Allow analytics",
  decline: "No thanks",
  settings: "Cookie settings",
  /** Shown when the banner is reopened from the footer (new wording). */
  current: (choice: string) => `Your current choice: ${choice}.`,
} as const;
