"use client";

import { useMemo, useState } from "react";

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
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);
  const [testTo, setTestTo] = useState(initial.admin_to_email);

  const preview = useMemo(() => renderPreview(s.thankyou_html), [s.thankyou_html]);

  function set<K extends keyof Settings>(k: K, v: Settings[K]) {
    setS((prev) => ({ ...prev, [k]: v }));
    setStatus(null);
  }

  async function save() {
    setStatus({ msg: "Saving…", ok: true });
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(s),
    });
    setStatus(res.ok ? { msg: "Saved", ok: true } : { msg: "Save failed", ok: false });
  }

  async function sendTest() {
    setStatus({ msg: "Sending test…", ok: true });
    const res = await fetch("/api/admin/test-email", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...s, to: testTo }),
    });
    const body = await res.json().catch(() => ({}));
    setStatus(
      res.ok
        ? { msg: `Test sent to ${testTo}`, ok: true }
        : { msg: `Test failed: ${body.error ?? res.status}`, ok: false },
    );
  }

  function insertVar(v: string) {
    set("thankyou_html", `${s.thankyou_html}{{${v}}}`);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 20,
        alignItems: "start",
      }}
    >
      {/* Editor */}
      <div className="card" style={{ padding: 26, display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field">
            <label className="label">From address</label>
            <input className="input" value={s.from_email} onChange={(e) => set("from_email", e.target.value)} />
            <span className="hint">Must be on your Resend-verified domain.</span>
          </div>
          <div className="field">
            <label className="label">Notify “To” address</label>
            <input
              className="input"
              value={s.admin_to_email}
              onChange={(e) => set("admin_to_email", e.target.value)}
            />
            <span className="hint">Where new-lead alerts go.</span>
          </div>
        </div>

        <div className="field">
          <label className="label">Thank-you subject</label>
          <input
            className="input"
            value={s.thankyou_subject}
            onChange={(e) => set("thankyou_subject", e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Thank-you email (HTML)</label>
          <textarea
            className="textarea"
            style={{ minHeight: 260 }}
            value={s.thankyou_html}
            onChange={(e) => set("thankyou_html", e.target.value)}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 2 }}>
            {VARS.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => insertVar(v)}
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 12,
                  padding: "4px 9px",
                  borderRadius: 7,
                  border: "1px solid var(--line)",
                  background: "var(--primary-tint)",
                  color: "var(--primary-deep)",
                  cursor: "pointer",
                }}
              >
                {`{{${v}}}`}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--line-soft)", paddingTop: 18, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <button onClick={save} className="btn btn-primary">
            Save changes
          </button>
          <input
            className="input"
            style={{ width: 190 }}
            value={testTo}
            onChange={(e) => setTestTo(e.target.value)}
            placeholder="test@you.com"
          />
          <button onClick={sendTest} className="btn btn-ghost">
            Send test
          </button>
          {status && (
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: status.ok ? "var(--lime-deep)" : "var(--danger)",
              }}
            >
              {status.msg}
            </span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="card" style={{ padding: 26 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span className="eyebrow">Live preview</span>
          <span className="hint">sample data</span>
        </div>
        <div
          style={{
            borderRadius: 12,
            border: "1px solid var(--line)",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid var(--line-soft)",
              fontSize: 13,
            }}
          >
            <span style={{ color: "var(--muted)" }}>Subject:&nbsp;</span>
            <strong>{renderPreview(s.thankyou_subject)}</strong>
          </div>
          <iframe
            title="preview"
            srcDoc={preview}
            style={{ width: "100%", height: 440, border: "none", background: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
}
