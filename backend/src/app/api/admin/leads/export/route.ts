import { isAuthed } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";

const COLUMNS = [
  "created_at",
  "first_name",
  "last_name",
  "company",
  "email",
  "phone",
  "message",
  "score",
  "tier",
  "email_sent",
  "synced_to_sheet",
] as const;

function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!(await isAuthed())) return new Response("Unauthorized", { status: 401 });

  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return new Response("Error", { status: 500 });

  const rows = (data ?? []) as Record<string, unknown>[];
  const lines = [
    COLUMNS.join(","),
    ...rows.map((r) => COLUMNS.map((c) => csvCell(r[c])).join(",")),
  ];
  const csv = lines.join("\r\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cci-leads.csv"',
    },
  });
}
