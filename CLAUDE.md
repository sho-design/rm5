# Restoration Medical website

Public website for Restoration Medical, a physician-led multi-service clinic in Thornhill, Ontario (Maple opening 2026). Next.js 15 App Router, TypeScript, Tailwind v4, deployed on Vercel. The site stores no patient information.

## Where things live
- `design/handoff/` is the design reference: `README.md` (tech decisions, routes, CMS model, form destinations, caveats), `Restoration Medical.dc.html` (single-file prototype, the source of truth for copy and layout), `design-system/` (tokens, component specs, guidelines, `readme.md` with clinic facts and visual rules). Do not ship anything from this folder.
- `src/styles/tokens/*.css` are the design tokens, copied verbatim from the handoff. Import them, never restate hex values in components; use the CSS variables or the Tailwind theme names in `src/app/globals.css`.
- `src/fonts/` self-hosted Fraunces and Instrument Sans (OFL), loaded with `next/font/local` in `src/app/layout.tsx`.
- `src/content/` typed content modules. Collections the handoff assigns to the CMS (health notes, jobs, team, FAQ, locations, announcements, legal) are read only through `src/lib/cms.ts` so they can move to Payload CMS without touching pages.
- `src/lib/routes.ts` maps every prototype page key to its URL. Always link with these helpers.
- `src/components/ui/` shared primitives (Button, Eyebrow, headings, cards, Chooser, Faq, PathSteps, CtaBand, Photo). `src/components/chrome/` utility bar, header, mega menu, search, mobile menu, footer.
- `src/app/api/*` route handlers for forms. They forward to the destination configured by environment variables, never log request bodies, and respond with `Cache-Control: no-store`.

## Copy rules (RM-HB-COMMS)
- Plain, warm, unhurried. Short sentences. Second person ("you"), first person plural ("we"). Sentence case everywhere, including buttons and eyebrows. No exclamation marks, no emoji.
- No testimonials or ratings. No immunity, outcome or weight-loss claims. No superlatives ("best") or urgency ("limited spots").
- No em dashes, no middots. Use commas, full stops or "and". Ranges read "8am to 4pm", "4 to 8 weeks".
- Money: "$250", "HST included", "OHIP-insured" vs "uninsured fee, receipt provided".
- Pain Centre framing: physician-led, OHIP-covered with a physician referral. Never "self-referral". Chronic care is Family Medicine; the Pain Centre is procedures for pain.
- CTAs are verb plus object: "Book an iron assessment". Text links end in " ›".
- Copy in the prototype is compliance-reviewed. Change wording only with clinic approval.

## Image generation rules
Apply to every generated photo of clinic staff or clinic interiors:
- Nurses: black V-neck scrubs, modern tailored fit (Figs-style).
- Doctors: navy blue V-neck scrubs, same modern fit.
- Everyone on staff: white New Balance-style sneakers.
- Chairs and tables: black or white only.
- Doctors: light blue nitrile gloves. Aesthetic nurses: black nitrile gloves.
- Around 45% of people shown are Vietnamese / East Asian.
- No text in images. No stethoscope on nurses unless relevant.

## Clinic facts (do not invent numbers)
Thornhill: 700 Centre St (inside Walmart), L4J 0A7; 905-709-3222; fax 905-761-7306; referrals@restorationmedical.ca; contact@restorationmedical.ca. Hours Mon, Wed, Thu 9am to 4pm; Tue 3pm to 9pm; Sat 8am to 4pm; Sun 8am to 2pm; Fri closed. Maple: 2620 Rutherford Rd, Unit 105 to 107, L4K 0H1, coming soon. Physicians: Dr. Johnny Nguyen (Medical Director), Dr. Joseph Truong. Iron therapy: $250 administration only, $550 per visit clinic-supplied Monoferric 500 mg, 3 visits per course; assessment and bloodwork OHIP. Sign-off: "Refined by Medicine."

## Engineering conventions
- Content pages are static (server components). Client components only for choosers, search, job board, booking, forms, carousel and menus.
- No analytics or session replay on `/book`, `/register`, `/about/contact`, `/for-physicians`, `/about/careers`.
- Motion 200 to 400ms, `cubic-bezier(.2,.8,.2,1)`; respect `prefers-reduced-motion`.
- Themes: `data-theme="dark"` or `data-theme="contrast"` on `<html>` remaps every semantic token. Text size: `data-text` of `1`, `2`.
- Run `npm run lint` and `npx tsc --noEmit` before committing. `npm run build` must pass.
