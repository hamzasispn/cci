"use client";

import { useMemo, useState, type CSSProperties } from "react";

interface Settings {
  from_email: string;
  admin_to_email: string;
  thankyou_subject: string;
  thankyou_html: string;
}

const SAMPLE: Record<string, string> = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  tier: "B",
  tierLabel: "Emerging",
  score: "18",
};

const VARS = Object.keys(SAMPLE);

function renderPreview(html: string): string {
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) => SAMPLE[k] ?? "");
}

export default function SettingsForm({ initial }: { initial: Settings }) {
  const [s, setS] = useState<Settings>(initial);
  const [status, setStatus] = useState("");
  const [testTo, setTestTo] = useState(initial.admin_to_email);

  const preview = useMemo(() => renderPreview(s.thankyou_html), [s.thankyou_html]);

  function set<K extends keyof Settings>(k: K, v: Settings[K]) {
    setS((prev) => ({ ...prev, [k]: v }));
  }

  async function save() {
    setStatus("Saving…");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s),
    });
    setStatus(res.ok ? "Saved ✓" : "Save failed");
  }

  async function sendTest() {
    setStatus("Sending test…");
    const res = await fetch("/api/admin/test-email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...s, to: testTo }),
    });
    const body = await res.json().catch(() => ({}));
    setStatus(res.ok ? "Test sent ✓" : `Test failed: ${body.error ?? res.status}`);
  }

  const label: CSSProperties = { fontSize: 13, fontWeight: 600, marginBottom: 4, display: "block" };
  const input: CSSProperties = {
    width: "100%",
    padding: "9px 11px",
    border: "1px solid #ddd",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
  };
  const card: CSSProperties = {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 1px 6px rgba(0,0,0,.05)",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" }}>
      <div style={{ ...card, display: "flex", flexDirection: "column", gap: 16 }}>
        <h1 style={{ fontSize: 18, margin: 0 }}>Email settings</h1>

        <div>
          <label style={label}>From address</label>
          <input style={input} value={s.from_email} onChange={(e) => set("from_email", e.target.value)} />
          <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>
            Must be an address on your Resend-verified domain.
          </p>
        </div>

        <div>
          <label style={label}>Admin notification “To” address</label>
          <input
            style={input}
            value={s.admin_to_email}
            onChange={(e) => set("admin_to_email", e.target.value)}
          />
          <p style={{ fontSize: 12, color: "#888", margin: "4px 0 0" }}>
            Where new-lead alerts are sent. (The thank-you always goes to the visitor’s own email.)
          </p>
        </div>

        <div>
          <label style={label}>Thank-you subject</label>
          <input
            style={input}
            value={s.thankyou_subject}
            onChange={(e) => set("thankyou_subject", e.target.value)}
          />
        </div>

        <div>
          <label style={label}>Thank-you email (HTML)</label>
          <textarea
            style={{ ...input, minHeight: 220, fontFamily: "monospace", fontSize: 12 }}
            value={s.thankyou_html}
            onChange={(e) => set("thankyou_html", e.target.value)}
          />
          <p style={{ fontSize: 12, color: "#888", margin: "6px 0 0" }}>
            Variables: {VARS.map((v) => `{{${v}}}`).join("  ")}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button
            onClick={save}
            style={{ padding: "9px 16px", background: "#1E1E1E", color: "#fff", border: "none", borderRadius: 999, cursor: "pointer", fontSize: 14 }}
          >
            Save
          </button>
          <input
            style={{ ...input, width: 200 }}
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder="test@you.com"
          />
          <button
            onClick={sendTest}
            style={{ padding: "9px 16px", background: "#fff", color: "#1E1E1E", border: "1px solid #1E1E1E", borderRadius: 999, cursor: "pointer", fontSize: 14 }}
          >
            Send test
          </button>
          {status && <span style={{ fontSize: 13, color: "#444" }}>{status}</span>}
        </div>
      </div>

      <div style={card}>
        <h2 style={{ fontSize: 14, margin: "0 0 10px", color: "#666" }}>Live preview (sample data)</h2>
        <iframe
          title="preview"
          srcDoc={preview}
          style={{ width: "100%", height: 460, border: "1px solid #eee", borderRadius: 8, background: "#fff" }}
        />
      </div>
    </div>
  );
}
