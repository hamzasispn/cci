"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Connection {
  google_email: string | null;
  spreadsheet_id: string | null;
  sheet_name: string;
  connected_at: string | null;
}

export default function GooglePanel({
  connection,
  justConnected,
  error,
}: {
  connection: Connection | null;
  justConnected: boolean;
  error: string | null;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState(
    justConnected ? "Connected — a “CCI Leads” sheet was created in your Drive." : "",
  );

  async function disconnect() {
    setBusy("disconnect");
    await fetch("/api/google/disconnect", { method: "POST" });
    setBusy("");
    router.refresh();
  }

  async function backfill() {
    setBusy("backfill");
    const res = await fetch("/api/admin/google/backfill", { method: "POST" });
    const body = await res.json().catch(() => ({}));
    setMsg(res.ok ? `Synced ${body.count} existing lead(s) to the sheet.` : `Failed: ${body.error}`);
    setBusy("");
    router.refresh();
  }

  const sheetUrl = connection?.spreadsheet_id
    ? `https://docs.google.com/spreadsheets/d/${connection.spreadsheet_id}/edit`
    : null;

  return (
    <div style={{ maxWidth: 640, display: "flex", flexDirection: "column", gap: 18 }}>
      {error && (
        <div
          className="card"
          style={{ padding: 16, borderColor: "var(--danger)", color: "var(--danger)", fontSize: 14 }}
        >
          {decodeURIComponent(error)}
        </div>
      )}
      {msg && (
        <div className="card" style={{ padding: 16, fontSize: 14, color: "var(--lime-deep)" }}>
          {msg}
        </div>
      )}

      <div className="card" style={{ padding: 28 }}>
        {connection ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: "var(--lime-deep)",
                  display: "inline-block",
                }}
              />
              <span className="eyebrow" style={{ color: "var(--lime-deep)" }}>
                Connected
              </span>
            </div>
            <h2 className="display" style={{ fontSize: 22, marginBottom: 8 }}>
              {connection.google_email ?? "Google account"}
            </h2>
            <p className="hint" style={{ marginBottom: 20 }}>
              New leads are appended to your{" "}
              {sheetUrl ? (
                <a href={sheetUrl} target="_blank" rel="noopener" style={{ color: "var(--primary)" }}>
                  “CCI Leads” sheet ↗
                </a>
              ) : (
                "sheet"
              )}{" "}
              automatically.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {sheetUrl && (
                <a href={sheetUrl} target="_blank" rel="noopener" className="btn btn-primary">
                  Open sheet ↗
                </a>
              )}
              <button onClick={backfill} disabled={busy !== ""} className="btn btn-ghost">
                {busy === "backfill" ? "Syncing…" : "Sync existing leads"}
              </button>
              <button onClick={disconnect} disabled={busy !== ""} className="btn btn-ghost">
                {busy === "disconnect" ? "Disconnecting…" : "Disconnect"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="display" style={{ fontSize: 22, marginBottom: 8 }}>
              Connect your Google account
            </h2>
            <p className="hint" style={{ marginBottom: 20 }}>
              We’ll create a “CCI Leads” spreadsheet in your Google Drive and add every new lead to
              it as a new row, in real time.
            </p>
            <a href="/api/google/connect" className="btn btn-primary">
              Connect Google →
            </a>
          </>
        )}
      </div>
    </div>
  );
}
