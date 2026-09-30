# Content management (Payload CMS)

The site's editable content and search settings live in Payload CMS, embedded in this same Next.js app. There is one codebase, one deploy and one database. The public site stays static: an edit in the admin panel revalidates only the pages it touches, so pages keep loading from the edge cache.

## Where

| What | Where |
|---|---|
| Admin panel | `https://<site>/admin` |
| Content API (admin panel's own, JSON) | `https://<site>/cms-api/...` |
| Config | `src/payload.config.ts` |
| Collections and globals | `src/payload/collections/*`, `src/payload/globals/*` |
| Access rules | `src/payload/access.ts` |
| Audit and revalidation hooks | `src/payload/hooks/*` |
| Read façade used by pages | `src/lib/cms.ts` |
| Per-page SEO merge | `src/lib/seo.ts` |
| Seed from the typed content | `scripts/seed.ts` |

## What editors can change

| Collection | Content | Feeds |
|---|---|---|
| Health notes | Physician-reviewed articles with drafts, autosave and version history | `/health-notes`, `/health-notes/[slug]`, home |
| Job postings | Roles with location, type, schedule, requirements, featured flag, open or closed | `/about/careers` |
| Team members | Names, roles, divisions, headshots, credentials, preceptor tag, order | `/about/team` |
| FAQ | Question, answer, category, optional link | `/about/faq` |
| Clinics | Address, hours, phone, fax, access notes, services, coming-soon flag | `/about/clinics`, footer, contact |
| Announcements | "What's new" strip items with start and end dates | Home |
| Legal pages | Privacy, accessibility, patient rights, terms | `/legal/[slug]` |
| Images | Uploads, resized to thumbnail, card and hero sizes | Anywhere an image field is set |
| Page SEO | Title tag, meta description, social image, canonical, hide from search, per page | Every page's `<head>` |
| Site settings (admins) | Phone, fax, emails, social links, search defaults, GTM container ID | Global |

Service pages, choosers, pricing tables and the immunization schedule stay in code. They change rarely and carry compliance wording that needs clinic approval; see `design/handoff/README.md`.

Anything left blank in Page SEO or missing from a collection falls back to the built-in content in `src/content`. A fresh checkout with no database still builds and renders the full site.

## Security model

- **No public sign-up.** The first admin is created by the seed (or the one-time `/admin/create-first-user` screen on an empty database). After that only admins create accounts.
- **Two roles.** `editor` edits content and Page SEO. `admin` also manages staff accounts and Site settings and can read the audit log.
- **Account lockout.** Five failed logins lock the account for 15 minutes. Passwords must be at least 12 characters. Sessions expire after two hours; cookies are `HttpOnly`, `Secure` in production, `SameSite=Lax`.
- **Rate limiting.** `src/middleware.ts` limits login and password-reset calls to 10 per minute per IP and marks `/admin` and `/cms-api` as `noindex` and `no-store`. The counter is per server instance; add a WAF rate-limit rule for `/admin` and `/cms-api` at the host for a shared limit.
- **Audit log.** Every create, update and delete in the panel is recorded with the user, time, collection, document and changed fields. Entries cannot be edited or deleted through the panel or API.
- **Content API.** GraphQL is off. The REST API serves published content read-only to the public (the same content the site renders) and requires a session for every write. CSRF and CORS are locked to the site's own origin.
- **Headers.** HSTS, CSP, `X-Frame-Options: DENY`, `Referrer-Policy` and `Permissions-Policy` come from `next.config.ts` and cover the admin too.
- **No patient data.** The CMS holds marketing content only. Booking, registration, contact, referral and careers forms post to their destination systems and never touch this database.

### Recommended at the hosting layer

- Put `/admin` behind an identity layer with SSO and two-factor (Cloudflare Access or Vercel's deployment protection for the admin path). Payload does not ship built-in TOTP; edge SSO is the simplest way to meet the "2FA enforced" requirement in the handoff without adding unaudited plugins.
- Turn on the platform's attack challenge mode and a rate-limit rule for `/admin/*` and `/cms-api/users/*`.
- Keep `PAYLOAD_SECRET` and `DATABASE_URL` in the host's encrypted environment variables only.

## Running it

### Locally

```bash
cp .env.example .env.local        # set PAYLOAD_SECRET (openssl rand -base64 48)
npm install
ADMIN_EMAIL=you@clinic.ca ADMIN_PASSWORD='at least 12 characters' npm run seed
npm run dev                        # site at :3000, admin at :3000/admin
```

Local data lives in `data/payload.db` (SQLite) and uploads in `public/media`. Both are git-ignored.

### Production (Vercel + Neon)

1. Create a Neon Postgres database (Canada central or us-east-1) and copy its connection string to `DATABASE_URL`.
2. Create a Vercel Blob store and copy its token to `BLOB_READ_WRITE_TOKEN`.
3. Set `PAYLOAD_SECRET` and `NEXT_PUBLIC_SITE_URL`.
4. Generate the first migration against Neon from your machine, commit it, and add `payload migrate` before `next build` in the Vercel build command:

```bash
DATABASE_URL=... npm run migrate:create   # writes src/payload/migrations/*
# Vercel > Settings > Build command:  npm run migrate && next build
```

5. Seed once from your machine against Neon: `DATABASE_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run seed`.

Schema changes in production only ever go through migrations (`push` is disabled for Postgres).

## Editing workflow

1. Sign in at `/admin`.
2. Health notes save as drafts and autosave every two seconds; publish when the physician has reviewed the copy. Older versions can be restored.
3. Other collections publish on save. The affected pages refresh within seconds.
4. Page SEO: open the page's row, set the title (up to 70 characters) and description (120 to 160). Leave a field blank to keep the built-in default.
5. Images: upload once, reuse anywhere. Alt text is required. Follow the photo rules in `CLAUDE.md`.

## Adding a field or collection

Edit the collection in `src/payload/collections`, run `npm run generate:types`, map the new field in `src/lib/cms.ts`, and, for Postgres, `npm run migrate:create`. Commit the migration with the code.
