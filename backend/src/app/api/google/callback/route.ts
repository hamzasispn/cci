import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { handleCallback } from "@/lib/google";

export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.redirect(new URL("/admin/login", req.url));

  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const denied = url.searchParams.get("error");
  if (denied || !code) {
    return NextResponse.redirect(new URL("/admin/google?error=Authorization%20cancelled", req.url));
  }

  try {
    await handleCallback(code);
    return NextResponse.redirect(new URL("/admin/google?connected=1", req.url));
  } catch (err) {
    const msg = encodeURIComponent(err instanceof Error ? err.message : "Connection failed");
    return NextResponse.redirect(new URL(`/admin/google?error=${msg}`, req.url));
  }
}
