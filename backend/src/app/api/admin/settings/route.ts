import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { updateSettings } from "@/lib/settings";
import { z } from "zod";

const schema = z.object({
  from_email: z.string().trim().email().max(200),
  admin_to_email: z.string().trim().email().max(200),
  thankyou_subject: z.string().trim().min(1).max(300),
  thankyou_html: z.string().min(1).max(50000),
});

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 422 });
  }

  try {
    await updateSettings(parsed.data);
  } catch {
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
