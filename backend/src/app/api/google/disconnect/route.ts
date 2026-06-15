import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { disconnect } from "@/lib/google";

export async function POST() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await disconnect();
  return NextResponse.json({ ok: true });
}
