import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { insertLead, markEmailSent, markSyncedToSheet } from "@/lib/leads";
import { getSettings } from "@/lib/settings";
import { sendLeadEmails } from "@/lib/email";
import { appendLead } from "@/lib/google";

function corsHeaders(origin: string | null): Record<string, string> {
  // Public, unauthenticated, credential-less endpoint (no cookies / Allow-Credentials),
  // so reflecting any origin is safe and lets the Webflow form post from the live
  // domain, the apex, or *.webflow.io staging without configuration.
  return {
    "Access-Control-Allow-Origin": origin || "*",
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

  let leadId: string;
  try {
    leadId = await insertLead(parsed.data);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500, headers });
  }

  // Best-effort: send the thank-you + admin notification. A failure here must NOT
  // fail the request — the lead is already saved. email_sent stays false on failure.
  try {
    const settings = await getSettings();
    await sendLeadEmails(parsed.data, settings);
    await markEmailSent(leadId);
  } catch (err) {
    console.error("lead email failed", err);
  }

  // Best-effort: append to the connected Google Sheet (if any).
  try {
    if (await appendLead(parsed.data)) await markSyncedToSheet(leadId);
  } catch (err) {
    console.error("sheet sync failed", err);
  }

  return NextResponse.json({ ok: true }, { status: 200, headers });
}
