import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { sendTestEmail } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  to: z.string().trim().email().max(200),
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

  const { to, ...settings } = parsed.data;
  try {
    await sendTestEmail(to, settings);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "send_failed" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
