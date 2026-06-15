import type { CSSProperties } from "react";
import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

interface LeadRow {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  company: string;
  email: string;
  phone: string;
  score: number;
  tier: string;
  email_sent: boolean;
}

export default async function AdminLeadsPage() {
  await requireAdmin();
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1000);
  const leads = (data ?? []) as LeadRow[];

  const th: CSSProperties = {
    textAlign: "left",
    padding: "14px 18px",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    borderBottom: "1px solid var(--line)",
    whiteSpace: "nowrap",
  };
  const td: CSSProperties = {
    padding: "15px 18px",
    fontSize: 14,
    color: "var(--ink)",
    borderBottom: "1px solid var(--line-soft)",
    whiteSpace: "nowrap",
  };

  const downloadBtn = (
    <a href="/api/admin/leads/export" className="btn btn-primary">
      ↓ Download CSV
    </a>
  );

  return (
    <AdminShell active="leads" title="Leads" action={downloadBtn}>
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          fontSize: 13,
          color: "var(--ink-soft)",
        }}
      >
        <span
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: "var(--surface)",
            border: "1px solid var(--line)",
          }}
        >
          <strong style={{ color: "var(--ink)" }}>{leads.length}</strong> total
        </span>
        <span
          style={{
            padding: "6px 14px",
            borderRadius: 999,
            background: "var(--surface)",
            border: "1px solid var(--line)",
          }}
        >
          <strong style={{ color: "var(--ink)" }}>
            {leads.filter((l) => l.email_sent).length}
          </strong>{" "}
          emailed
        </span>
      </div>

      <div className="card" style={{ overflow: "auto" }}>
        {leads.length === 0 ? (
          <div style={{ padding: "64px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 30, marginBottom: 10 }}>✦</div>
            <p className="display" style={{ fontSize: 20, marginBottom: 6 }}>
              No leads yet
            </p>
            <p className="hint">Submissions from your assessment form will appear here.</p>
          </div>
        ) : (
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={th}>Date</th>
                <th style={th}>Name</th>
                <th style={th}>Company</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>Score</th>
                <th style={th}>Tier</th>
                <th style={th}>Emailed</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} style={{ transition: "background .12s ease" }}>
                  <td style={{ ...td, color: "var(--muted)" }}>
                    {new Date(l.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td style={{ ...td, fontWeight: 600 }}>
                    {l.first_name} {l.last_name}
                  </td>
                  <td style={td}>{l.company}</td>
                  <td style={td}>
                    <a href={`mailto:${l.email}`} style={{ color: "var(--primary)" }}>
                      {l.email}
                    </a>
                  </td>
                  <td style={{ ...td, color: "var(--ink-soft)" }}>{l.phone}</td>
                  <td style={{ ...td, fontVariantNumeric: "tabular-nums" }}>{l.score}</td>
                  <td style={td}>
                    <span className={`tier tier-${l.tier}`}>{l.tier}</span>
                  </td>
                  <td style={td}>
                    {l.email_sent ? (
                      <span style={{ color: "var(--lime-deep)" }}>✓ sent</span>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminShell>
  );
}
