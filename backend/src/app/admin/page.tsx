import type { CSSProperties } from "react";
import { requireAdmin } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";
import AdminNav from "./AdminNav";

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
  synced_to_sheet: boolean;
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
    padding: "8px 10px",
    fontSize: 12,
    color: "#888",
    borderBottom: "1px solid #eee",
    whiteSpace: "nowrap",
  };
  const td: CSSProperties = {
    padding: "8px 10px",
    fontSize: 13,
    borderBottom: "1px solid #f3f3f3",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f6f6f6", minHeight: "100vh" }}>
      <AdminNav active="leads" />
      <main style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ fontSize: 18, margin: 0 }}>Leads ({leads.length})</h1>
          <a
            href="/api/admin/leads/export"
            style={{
              marginLeft: "auto",
              fontSize: 13,
              padding: "8px 14px",
              background: "#1E1E1E",
              color: "#fff",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Download CSV
          </a>
        </div>
        <div style={{ background: "#fff", borderRadius: 12, overflow: "auto", boxShadow: "0 1px 6px rgba(0,0,0,.05)" }}>
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
              {leads.length === 0 && (
                <tr>
                  <td style={td} colSpan={8}>
                    No leads yet.
                  </td>
                </tr>
              )}
              {leads.map((l) => (
                <tr key={l.id}>
                  <td style={td}>{new Date(l.created_at).toLocaleString()}</td>
                  <td style={td}>
                    {l.first_name} {l.last_name}
                  </td>
                  <td style={td}>{l.company}</td>
                  <td style={td}>{l.email}</td>
                  <td style={td}>{l.phone}</td>
                  <td style={td}>{l.score}</td>
                  <td style={td}>{l.tier}</td>
                  <td style={td}>{l.email_sent ? "✓" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
