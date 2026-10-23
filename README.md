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

Copy `.env.example` to `.env.local` and set `PAYLOAD_SECRET`. Then seed the content and create the first admin:

```bash
ADMIN_EMAIL=you@clinic.ca ADMIN_PASSWORD='at least 12 characters' npm run seed
```

The admin panel is at http://localhost:3000/admin. Without form endpoints the form API routes answer with a simulated success so the flows can be exercised locally.

## Layout of the repo

| Path | What it is |
|---|---|
| `design/handoff/` | The design handoff: prototype, design system, tokens, guidelines, communications handbook. Reference only; nothing here ships. |
| `src/styles/tokens/` | Design tokens (colour, type, spacing, motion) copied verbatim from the handoff. |
| `src/app/globals.css` | Tailwind theme mapped from the tokens, base resets, display type classes, icon animations. |
| `src/fonts/` | Fraunces and Instrument Sans variable fonts (OFL). |
| `src/lib/routes.ts` | Prototype page key to URL map. Every internal link goes through it. |
| `src/content/` | Typed content modules: divisions, site facts and locations, choosers, FAQ, jobs, team, notes, legal, search index. |
| `src/payload.config.ts`, `src/payload/` | Payload CMS: collections (health notes, jobs, team, FAQ, clinics, announcements, legal pages, images, page SEO), site settings, access rules, audit log and revalidation hooks. See `docs/cms.md`. |
| `src/app/(payload)/` | The admin panel (`/admin`) and its API (`/cms-api`). |
| `src/lib/cms.ts` | Read façade over Payload with a fallback to the typed content in `src/content`, so the site builds without a database. |
| `src/lib/seo.ts` | Merges per-page SEO saved in the admin over each page's built-in metadata. |
| `src/components/ui/` | Shared primitives: Button, headings, Section and Block, Photo, cards, Chooser, Faq, PathSteps, CtaBand, heroes, Icon, form fields, StateCard. |
| `src/components/chrome/` | Utility bar, header with mega menu and search, mobile menu, footer, teaching partners strip, analytics loader. |
| `src/components/pages/` | Page-specific sections. |
| `src/app/api/` | Form route handlers. They forward to the configured destination and never store or log a body. |

## Decisions and open items

- **CMS.** Payload CMS 3 is embedded at `/admin`. Locally it uses SQLite (`data/payload.db`); production uses Postgres on Neon and Vercel Blob for uploads, configured by environment variables. `npm run build` applies migrations (and seeds, when `SEED_ON_BUILD=1`) before `next build`. Setup, roles, security model and the Vercel steps are in `docs/cms.md`.
- **Hosting.** Vercel project `rm5`, production branch `claude/new-session-kp96am`, live at https://rm5-nine.vercel.app (Vercel sign-in required while deployment protection is on).
- **Images.** All photography is generated placeholder art served from the prototype's CDN, mapped in `src/content/images.ts`. Replace with real clinic photography before launch (dress and casting rules in `CLAUDE.md`).
- **Forms.** Destinations (Ocean, Jane, ATS, mailboxes) are unconfirmed; set the `FORM_ENDPOINT_*` variables when the clinic confirms.
- **Vietnamese.** The EN / Tiếng Việt toggle is hidden until Vietnamese copy exists (`NEXT_PUBLIC_VI_ENABLED`).
- **Logos.** Written permission from TMU and Anderson College is required before launch.
- **Topic and Infusion pages.** Every mega-menu link has its own page: Pain Centre, Aesthetics, Rehab, Family Medicine and About topics (`src/content/topics.ts`, one template in `src/components/pages/topic/`) and the Infusion pages, which now live on this site rather than infusion.restorationmedical.ca (`src/content/infusion-site.ts`). New wording awaiting clinic approval is listed in `docs/content-review.md`.
- **Search.** Location-led title tags (`src/content/seo-titles.ts`), canonical links on every page, schema.org JSON-LD (`src/lib/schema.ts`: clinic, physicians, breadcrumbs, FAQ, articles) and `/llms.txt`, all generated from the content modules.
- See `design/handoff/README.md` for the full caveat list (team names, sample jobs, legal drafts, unconfirmed prices and wait times).
