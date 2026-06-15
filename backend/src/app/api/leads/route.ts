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
  // If the request origin is on the allow-list, echo it back. Otherwise fall back to
  // the first configured origin, or "*" when ALLOWED_ORIGINS is unset. "*" is
  // acceptable here only because this endpoint is unauthenticated and credential-less
  // (no cookies / Allow-Credentials). ALWAYS set ALLOWED_ORIGINS in production so an
  // unset value does not silently widen access.
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
