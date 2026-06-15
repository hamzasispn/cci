import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { backfillAll } from "@/lib/google";

export async function POST() {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const count = await backfillAll();
    return NextResponse.json({ ok: true, count });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "backfill_failed" },
      { status: 500 },
    );
  }
}
