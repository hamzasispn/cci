# Stage 1: Lead Capture — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up a Next.js backend with a `POST /api/leads` endpoint that validates and stores every form submission in Supabase Postgres, and wire `form.js` to send to it — so no lead is ever lost.

**Architecture:** A Next.js (App Router, TypeScript) app lives in `backend/`. A thin route handler validates the incoming JSON (zod), recomputes the tier server-side from the score, and inserts a row into the Supabase `leads` table via a server-only service-role client. CORS is locked to the Webflow origin. The only change to `form.js` is its `submitUrl`.

**Tech Stack:** Next.js 15, TypeScript, `@supabase/supabase-js`, `zod`, Vitest.

---

## File Structure

- `backend/` — Next.js app (scaffolded by `create-next-app`)
- `backend/.env.example` — documents required env vars (committed)
- `backend/.env.local` — real secrets (gitignored, created manually)
- `backend/supabase/migrations/0001_leads.sql` — `leads` table schema
- `backend/src/lib/supabase.ts` — server-only Supabase service-role client
- `backend/src/lib/scoring.ts` — score→tier mapping (mirrors `form.js` tier ranges)
- `backend/src/lib/leadSchema.ts` — zod schema + `LeadInput` type
- `backend/src/lib/leads.ts` — `insertLead()` data-access function
- `backend/src/app/api/leads/route.ts` — `POST` + `OPTIONS` handlers, CORS
- `backend/tests/scoring.test.ts`, `leadSchema.test.ts`, `leads.test.ts`, `route.test.ts`
- `form.js:7` — set `submitUrl`

---

## Task 1: Scaffold the Next.js app

**Files:**
- Create: `backend/` (entire scaffold)

- [ ] **Step 1: Scaffold**

Run from the repo root:

```bash
npx create-next-app@latest backend --typescript --app --src-dir --no-tailwind --eslint --use-npm --import-alias "@/*"
```

When prompted about Turbopack, accept the default.

- [ ] **Step 2: Install runtime + test dependencies**

```bash
cd backend
npm install @supabase/supabase-js zod
npm install -D vitest
```

- [ ] **Step 3: Add a test script**

In `backend/package.json`, add to the `"scripts"` object:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Create `backend/vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: { environment: "node" },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
```

- [ ] **Step 5: Verify the app builds**

Run: `npm run build`
Expected: build completes without errors.

- [ ] **Step 6: Commit**

```bash
git add backend
git commit -m "chore: scaffold next.js backend app"
```

---

## Task 2: Score→tier mapping

The tier ranges must match `form.js` exactly: A = 8–13, B = 14–19, C = 20–25, D = 26–32 (see `form.js` `CONFIG.tiers`).

**Files:**
- Create: `backend/src/lib/scoring.ts`
- Test: `backend/tests/scoring.test.ts`

- [ ] **Step 1: Write the failing test**

`backend/tests/scoring.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { tierForScore } from "@/lib/scoring";

describe("tierForScore", () => {
  it("maps the bottom of each band", () => {
    expect(tierForScore(8)).toBe("A");
    expect(tierForScore(14)).toBe("B");
    expect(tierForScore(20)).toBe("C");
    expect(tierForScore(26)).toBe("D");
  });
  it("maps the top of each band", () => {
    expect(tierForScore(13)).toBe("A");
    expect(tierForScore(19)).toBe("B");
    expect(tierForScore(25)).toBe("C");
    expect(tierForScore(32)).toBe("D");
  });
  it("clamps out-of-range scores into the nearest band", () => {
    expect(tierForScore(0)).toBe("A");
    expect(tierForScore(99)).toBe("D");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- scoring`
Expected: FAIL — cannot find module `@/lib/scoring`.

- [ ] **Step 3: Write minimal implementation**

`backend/src/lib/scoring.ts`:

```ts
export type Tier = "A" | "B" | "C" | "D";

export function tierForScore(score: number): Tier {
  if (score <= 13) return "A";
  if (score <= 19) return "B";
  if (score <= 25) return "C";
  return "D";
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- scoring`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add backend/src/lib/scoring.ts backend/tests/scoring.test.ts
git commit -m "feat: add score-to-tier mapping"
```

---

## Task 3: Lead payload schema

Validates the JSON `form.js` sends: `{ firstName, lastName, company, email, phone, message, score, tier, answers }`. `answers` is stored as-is (jsonb); we don't constrain its element shape.

**Files:**
- Create: `backend/src/lib/leadSchema.ts`
- Test: `backend/tests/leadSchema.test.ts`

- [ ] **Step 1: Write the failing test**

`backend/tests/leadSchema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/leadSchema";

const valid = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  message: "Hello",
  score: 18,
  tier: "B",
  answers: [1, 2, [0, 3], null],
};

describe("leadSchema", () => {
  it("accepts a valid payload", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });
  it("defaults message to empty string when missing", () => {
    const { message, ...rest } = valid;
    const r = leadSchema.safeParse(rest);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.message).toBe("");
  });
  it("rejects an invalid email", () => {
    expect(leadSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });
  it("rejects a missing first name", () => {
    expect(leadSchema.safeParse({ ...valid, firstName: "" }).success).toBe(false);
  });
  it("rejects a non-numeric score", () => {
    expect(leadSchema.safeParse({ ...valid, score: "x" }).success).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- leadSchema`
Expected: FAIL — cannot find module `@/lib/leadSchema`.

- [ ] **Step 3: Write minimal implementation**

`backend/src/lib/leadSchema.ts`:

```ts
import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(3).max(50),
  message: z.string().trim().max(2000).optional().default(""),
  score: z.number().int().min(0).max(40),
  tier: z.string().trim().max(2).optional(),
  answers: z.array(z.any()).default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;
```

Note: `tier` from the client is accepted but ignored — the server recomputes it from `score` (Task 6).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- leadSchema`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add backend/src/lib/leadSchema.ts backend/tests/leadSchema.test.ts
git commit -m "feat: add lead payload validation schema"
```

---

## Task 4: Database migration for `leads`

**Files:**
- Create: `backend/supabase/migrations/0001_leads.sql`

- [ ] **Step 1: Write the migration**

`backend/supabase/migrations/0001_leads.sql`:

```sql
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  message text not null default '',
  score int not null,
  tier text not null check (tier in ('A','B','C','D')),
  answers jsonb not null default '[]'::jsonb,
  synced_to_sheet boolean not null default false,
  email_sent boolean not null default false
);

-- RLS on, no policies: only the service-role key (server-side) can read/write.
-- Authenticated dashboard read policies are added in Stage 2.
alter table public.leads enable row level security;
```

- [ ] **Step 2: [MANUAL] Create the Supabase project and apply the migration**

1. Create a free project at https://supabase.com (note the project URL and keys).
2. Apply the SQL above via the Supabase dashboard SQL editor, or via the Supabase MCP `apply_migration` tool once the project is linked.
3. Verify the table exists: in the SQL editor run `select * from public.leads limit 1;` — expect an empty result, no error.

- [ ] **Step 3: Commit**

```bash
git add backend/supabase/migrations/0001_leads.sql
git commit -m "feat: add leads table migration"
```

---

## Task 5: Supabase service client + env documentation

**Files:**
- Create: `backend/src/lib/supabase.ts`
- Create: `backend/.env.example`

- [ ] **Step 1: Create the env example file**

`backend/.env.example`:

```bash
# Supabase
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Comma-separated list of allowed browser origins for /api/leads (your Webflow site)
ALLOWED_ORIGINS=https://www.coachabilityconsultants.com
```

- [ ] **Step 2: [MANUAL] Create `backend/.env.local`**

Copy `.env.example` to `backend/.env.local` and fill in the real values from your
Supabase project settings. Confirm `.env.local` is gitignored (create-next-app adds
`.env*` to `.gitignore` by default — verify with `git check-ignore backend/.env.local`,
which should print the path).

- [ ] **Step 3: Create the client**

`backend/src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

/** Server-only client using the service-role key. Never import this in client code. */
export function getServiceClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
```

- [ ] **Step 4: Commit**

```bash
git add backend/src/lib/supabase.ts backend/.env.example
git commit -m "feat: add supabase service client and env example"
```

---

## Task 6: `insertLead()` data-access function

**Files:**
- Create: `backend/src/lib/leads.ts`
- Test: `backend/tests/leads.test.ts`

- [ ] **Step 1: Write the failing test (mocking the supabase client)**

`backend/tests/leads.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const insertMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  getServiceClient: () => ({ from: () => ({ insert: insertMock }) }),
}));

import { insertLead } from "@/lib/leads";

const lead = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555",
  message: "Hi",
  score: 18,
  answers: [1, 2],
};

describe("insertLead", () => {
  beforeEach(() => insertMock.mockReset());

  it("maps camelCase input to snake_case columns and recomputes tier from score", async () => {
    insertMock.mockResolvedValue({ error: null });
    await insertLead(lead);
    expect(insertMock).toHaveBeenCalledWith({
      first_name: "Jane",
      last_name: "Smith",
      company: "Acme Inc.",
      email: "jane@acme.com",
      phone: "+1 555",
      message: "Hi",
      score: 18,
      tier: "B",
      answers: [1, 2],
    });
  });

  it("throws when supabase returns an error", async () => {
    insertMock.mockResolvedValue({ error: { message: "boom" } });
    await expect(insertLead(lead)).rejects.toThrow("boom");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- leads`
Expected: FAIL — cannot find module `@/lib/leads`.

- [ ] **Step 3: Write minimal implementation**

`backend/src/lib/leads.ts`:

```ts
import { getServiceClient } from "./supabase";
import { tierForScore } from "./scoring";
import type { LeadInput } from "./leadSchema";

export async function insertLead(input: LeadInput): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase.from("leads").insert({
    first_name: input.firstName,
    last_name: input.lastName,
    company: input.company,
    email: input.email,
    phone: input.phone,
    message: input.message ?? "",
    score: input.score,
    tier: tierForScore(input.score),
    answers: input.answers,
  });
  if (error) throw new Error(error.message);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- leads`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add backend/src/lib/leads.ts backend/tests/leads.test.ts
git commit -m "feat: add insertLead data-access function"
```

---

## Task 7: `/api/leads` route handler with CORS

**Files:**
- Create: `backend/src/app/api/leads/route.ts`
- Test: `backend/tests/route.test.ts`

- [ ] **Step 1: Write the failing test (mocking insertLead)**

`backend/tests/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const insertLeadMock = vi.fn();
vi.mock("@/lib/leads", () => ({ insertLead: insertLeadMock }));

import { POST, OPTIONS } from "@/app/api/leads/route";

const validBody = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  message: "Hello",
  score: 18,
  tier: "B",
  answers: [1, 2],
};

function req(body: unknown, origin = "https://www.example.com") {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  });
}

describe("POST /api/leads", () => {
  beforeEach(() => {
    insertLeadMock.mockReset();
    process.env.ALLOWED_ORIGINS = "https://www.example.com";
  });

  it("stores a valid lead and returns 200", async () => {
    insertLeadMock.mockResolvedValue(undefined);
    const res = await POST(req(validBody) as never);
    expect(res.status).toBe(200);
    expect(insertLeadMock).toHaveBeenCalledOnce();
    expect(res.headers.get("access-control-allow-origin")).toBe("https://www.example.com");
  });

  it("returns 422 for an invalid payload and does not insert", async () => {
    const res = await POST(req({ ...validBody, email: "nope" }) as never);
    expect(res.status).toBe(422);
    expect(insertLeadMock).not.toHaveBeenCalled();
  });

  it("returns 500 when insert throws", async () => {
    insertLeadMock.mockRejectedValue(new Error("db down"));
    const res = await POST(req(validBody) as never);
    expect(res.status).toBe(500);
  });

  it("OPTIONS returns 204 with CORS headers", async () => {
    const res = await OPTIONS(req(validBody) as never);
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- route`
Expected: FAIL — cannot find module `@/app/api/leads/route`.

- [ ] **Step 3: Write minimal implementation**

`backend/src/app/api/leads/route.ts`:

```ts
import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { insertLead } from "@/lib/leads";

function allowedOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allowList = allowedOrigins();
  const allow = origin && allowList.includes(origin) ? origin : allowList[0] ?? "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req.headers.get("origin")) });
}

export async function POST(req: Request) {
  const headers = corsHeaders(req.headers.get("origin"));

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400, headers });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten() },
      { status: 422, headers },
    );
  }

  try {
    await insertLead(parsed.data);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500, headers });
  }

  return NextResponse.json({ ok: true }, { status: 200, headers });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- route`
Expected: PASS (4 tests).

- [ ] **Step 5: Run the full suite**

Run: `npm test`
Expected: PASS (all tasks' tests green).

- [ ] **Step 6: Commit**

```bash
git add backend/src/app/api/leads/route.ts backend/tests/route.test.ts
git commit -m "feat: add /api/leads route with validation and CORS"
```

---

## Task 8: Deploy and wire `form.js`

**Files:**
- Modify: `form.js:7`

- [ ] **Step 1: [MANUAL] Deploy the backend to Vercel**

1. Push the repo to GitHub and import it into Vercel (https://vercel.com).
2. Set the Vercel project **Root Directory** to `backend`.
3. Add the env vars from `.env.example` (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `ALLOWED_ORIGINS`) in Vercel project settings.
4. Deploy and note the resulting URL, e.g. `https://cci-backend.vercel.app`.

- [ ] **Step 2: [MANUAL] Smoke-test the live endpoint**

```bash
curl -i -X POST https://YOUR-APP.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.coachabilityconsultants.com" \
  -d '{"firstName":"Test","lastName":"User","company":"Acme","email":"test@acme.com","phone":"+1 555 0000","message":"smoke test","score":18,"tier":"B","answers":[1,2]}'
```

Expected: `HTTP/1.1 200` and `{"ok":true}`. Confirm the row appears in Supabase
(`select * from public.leads;`).

- [ ] **Step 3: Point `form.js` at the backend**

In `form.js`, change line 7 from:

```js
  submitUrl: "",
```

to (use your real Vercel URL):

```js
  submitUrl: "https://YOUR-APP.vercel.app/api/leads",
```

- [ ] **Step 4: [MANUAL] End-to-end verification**

Submit the live Webflow form and confirm a new row appears in the `leads` table.

- [ ] **Step 5: Commit**

```bash
git add form.js
git commit -m "feat: point form submitUrl at the leads backend"
```

---

## Self-Review Notes

- **Spec coverage (Stage 1 scope):** lead storage (Tasks 4–8), validation + CORS +
  basic abuse protection via origin allow-list (Task 7), `form.js` wiring (Task 8).
  Stages 2–4 (dashboard, email, Google) are intentionally separate plans.
- **Honeypot deviation:** the spec mentioned a honeypot field, but `form.js` is final
  and renders no such field, so a honeypot is unusable. Stage 1 instead relies on the
  CORS origin allow-list + zod validation. Real per-IP rate limiting (e.g. Upstash) is
  deferred to a later hardening pass to avoid adding another account in Stage 1.
- **Type consistency:** `tierForScore`/`Tier` (Task 2), `leadSchema`/`LeadInput`
  (Task 3), and `insertLead(LeadInput)` (Task 6) are used consistently in the route
  (Task 7). The route recomputes tier inside `insertLead`, ignoring the client `tier`.
