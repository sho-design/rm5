# Restoration Medical website

Public website for Restoration Medical, a physician-led multi-service clinic in Thornhill, Ontario (Maple opening 2026). Built with Next.js 15 (App Router, TypeScript, React Server Components), Tailwind v4 and self-hosted Fraunces and Instrument Sans, deployed on Vercel. The site is a brochure, a booking funnel and a job board. It stores no patient information.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build
```

Copy `.env.example` to `.env.local` to configure form destinations, GTM and the Vietnamese toggle. Without form endpoints the API routes answer with a simulated success so the flows can be exercised locally.

## Layout of the repo

| Path | What it is |
|---|---|
| `design/handoff/` | The design handoff: prototype, design system, tokens, guidelines, communications handbook. Reference only; nothing here ships. |
| `src/styles/tokens/` | Design tokens (colour, type, spacing, motion) copied verbatim from the handoff. |
| `src/app/globals.css` | Tailwind theme mapped from the tokens, base resets, display type classes, icon animations. |
| `src/fonts/` | Fraunces and Instrument Sans variable fonts (OFL). |
| `src/lib/routes.ts` | Prototype page key to URL map. Every internal link goes through it. |
| `src/content/` | Typed content modules: divisions, site facts and locations, choosers, FAQ, jobs, team, notes, legal, search index. |
| `src/lib/cms.ts` | Read façade for the collections destined for the CMS (notes, jobs, team, FAQ, locations, announcements, legal). |
| `src/components/ui/` | Shared primitives: Button, headings, Section and Block, Photo, cards, Chooser, Faq, PathSteps, CtaBand, heroes, Icon, form fields, StateCard. |
| `src/components/chrome/` | Utility bar, header with mega menu and search, mobile menu, footer, teaching partners strip, analytics loader. |
| `src/components/pages/` | Page-specific sections. |
| `src/app/api/` | Form route handlers. They forward to the configured destination and never store or log a body. |

## Decisions and open items

- **CMS.** The handoff decides on Payload CMS 3 with Postgres on Neon. This repo ships the CMS collections as typed content modules behind `src/lib/cms.ts` so the site builds without a database. Wiring Payload replaces the bodies of that one file.
- **Images.** All photography is generated placeholder art served from the prototype's CDN, mapped in `src/content/images.ts`. Replace with real clinic photography before launch (dress and casting rules in `CLAUDE.md`).
- **Forms.** Destinations (Ocean, Jane, ATS, mailboxes) are unconfirmed; set the `FORM_ENDPOINT_*` variables when the clinic confirms.
- **Vietnamese.** The EN / Tiếng Việt toggle is hidden until Vietnamese copy exists (`NEXT_PUBLIC_VI_ENABLED`).
- **Logos.** Written permission from TMU and Anderson College is required before launch.
- See `design/handoff/README.md` for the full caveat list (team names, sample jobs, legal drafts, unconfirmed prices and wait times).
