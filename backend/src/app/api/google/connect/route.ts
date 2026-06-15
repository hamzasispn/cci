import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getAuthUrl } from "@/lib/google";

export async function GET(req: Request) {
  if (!(await isAuthed())) return NextResponse.redirect(new URL("/admin/login", req.url));
  try {
    return NextResponse.redirect(getAuthUrl());
  } catch {
    return NextResponse.redirect(new URL("/admin/google?error=Google%20OAuth%20env%20vars%20missing", req.url));
  }
}
