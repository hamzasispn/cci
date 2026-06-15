# CCI Leads Backend — Design

**Date:** 2026-06-15
**Status:** Approved (pending written-spec review)

## Problem

`form.js` is a self-contained vanilla-JS assessment widget embedded in a Webflow
site. It collects a lead at the end (name, company, email, phone, message, plus a
computed score, tier, and all answers), but `CONFIG.submitUrl` is empty
(`form.js:7`), so `submitLead()` (`form.js:1901-1908`) sends the data nowhere.
Leads are lost.

We need to:

1. Receive and **store every lead** in a backend.
2. **Append every lead to a Google Sheet** in the admin's own Google Drive.
3. Provide an **admin dashboard** to view/search/export leads, connect Google, and
   edit the thank-you email.
4. Send a **thank-you email** to the lead and a **notification email to the admin**,
   with a customizable (raw HTML) thank-you template.

`form.js` is final. The only permitted change is setting `CONFIG.submitUrl` to the
new backend endpoint.

## Decisions (locked)

- **Stack:** Supabase (Postgres) + Next.js (App Router) deployed on Vercel.
- **Google Sheets:** per-admin OAuth ("Connect my Google account"); leads append to
  a sheet in the admin's own Drive.
- **Email customizer:** raw HTML editor, with merge-variable reference, live preview,
  and "send test" — sent via Resend.
- **Admin login:** single admin (Supabase Auth).
- **Admin notification:** admin also receives an email on each new lead.

## Architecture

```
Webflow site (form.js — unchanged except submitUrl)
        │  POST lead JSON
        ▼
Next.js app on Vercel ──────────► Supabase Postgres
   ├─ POST /api/leads (public)        (leads, email_template, google_connection)
   │     store lead → append to Sheet → send thank-you + admin emails
   ├─ Admin dashboard (Supabase Auth, single admin)
   │     • Leads table (search, view, export CSV)
   │     • Connect Google → pick/create Sheet + backfill
   │     • Email template editor (HTML + preview + test send)
   └─ /api/google/callback (OAuth)
        ├──► Google Sheets API (append rows to admin's sheet)
        └──► Resend (thank-you email to lead, notification to admin)
```

The single change to `form.js`: set `CONFIG.submitUrl` to
`https://<app-domain>/api/leads`.

## Data flow on submit

1. `form.js` POSTs `{ firstName, lastName, company, email, phone, message, score,
   tier, answers }` to `/api/leads`.
2. Server validates → **inserts into `leads`** first (source of truth; a lead is
   never lost even if later steps fail).
3. If a Google account is connected → **append a row** to the sheet.
4. Render the HTML template with the lead's data → **send thank-you email** to the
   lead and a **notification email** to the admin via Resend.
5. Return `200` to the form.

Steps 3–4 are best-effort: failures are flagged on the lead row (`synced_to_sheet`,
`email_sent`) and logged; the dashboard exposes a "Retry sync" action. The form's
visitor experience never breaks on a downstream failure.

## Database schema

- **`leads`** — `id (uuid), created_at, first_name, last_name, company, email,
  phone, message, score (int), tier (text), answers (jsonb), synced_to_sheet
  (bool default false), email_sent (bool default false)`.
- **`email_template`** — singleton row: `id, subject (text), html (text),
  updated_at`. Seeded with a sensible default thank-you template.
- **`google_connection`** — singleton row: `id, google_email, refresh_token
  (encrypted), spreadsheet_id, sheet_name, connected_at`.
- Admin user lives in **Supabase Auth**; no separate table. Row Level Security: the
  service-role key (server-side only) handles all writes; client-side dashboard
  reads go through authenticated Supabase session.

## Admin dashboard

- **Leads page** — sortable/searchable table; row click opens detail (full answers,
  score, tier); **Export CSV** built from the DB (works regardless of Google).
- **Google connection page** — "Connect Google" → OAuth → auto-create a "CCI Leads"
  spreadsheet in the admin's Drive (or paste an existing sheet URL). Shows status +
  "Backfill existing leads to sheet".
- **Email template page** — subject field; HTML code editor; clickable merge-variable
  list (`{{firstName}}`, `{{lastName}}`, `{{company}}`, `{{email}}`, `{{phone}}`,
  `{{tier}}`, `{{tierLabel}}`, `{{score}}`); live preview (sandboxed iframe with
  sample data); "Send test to me" button; Save.

## Merge variables

Rendered server-side when sending. Available: `firstName`, `lastName`, `company`,
`email`, `phone`, `tier` (A/B/C/D), `tierLabel` (e.g. "Foundational"), `score`.
Unknown variables render empty. Values are HTML-escaped to prevent injection.

## Google OAuth

- Google Cloud project + OAuth web client. Scopes:
  `https://www.googleapis.com/auth/drive.file` (create/append to app-created sheet)
  and `https://www.googleapis.com/auth/spreadsheets`.
- Flow: dashboard → Google consent → `/api/google/callback` → store refresh token
  (encrypted) + spreadsheet id. Access tokens refreshed on demand server-side.
- On connect, auto-create a spreadsheet with a header row; store its id.

## Email (Resend)

- Resend account + verified sending domain for deliverability (Resend onboarding
  domain acceptable for initial testing).
- Two emails per lead: thank-you (to lead, from the customizable template) and
  notification (to admin, simple fixed template summarizing the lead).

## Security & error handling

- **CORS** on `/api/leads` locked to the Webflow domain(s).
- **Spam protection:** honeypot field check + basic per-IP rate limiting.
- Google refresh token **encrypted at rest**; Supabase **service-role key** never
  exposed to the browser.
- Downstream (Sheet/email) failures do not fail lead capture; flagged + retryable.

## Testing

- Unit: merge-variable template rendering (incl. escaping + unknown vars), lead
  payload validation, score/tier mapping (mirrors `form.js` tier ranges).
- Integration: `/api/leads` happy path inserts a row and triggers sheet/email
  (Google + Resend mocked); failure path still persists the lead and sets flags.
- Manual: end-to-end submit from the live Webflow form.

## Build order (4 stages, each independently usable)

1. **Capture** — Supabase project + `leads` table + `/api/leads` + wire `form.js`
   `submitUrl`. Leads are saved (core problem solved).
2. **Dashboard** — Supabase Auth single admin + leads table + CSV export.
3. **Email** — `email_template` + HTML editor/preview/test + Resend thank-you +
   admin notification.
4. **Google** — OAuth connect + Sheets append + backfill.

## One-time setup the admin provides (guided)

Supabase project, Vercel account + subdomain, Google Cloud OAuth client, Resend
account + verified domain.

## Out of scope (YAGNI)

Multi-admin/team management, drag-and-drop email builder, multiple email templates,
analytics dashboards, CRM integrations.
