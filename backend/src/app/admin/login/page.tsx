"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        className="card rise"
        style={{
          width: 400,
          maxWidth: "100%",
          padding: 40,
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div className="eyebrow" style={{ marginBottom: 10 }}>
          Coachability Consultants
        </div>
        <h1 className="display" style={{ fontSize: 32, marginBottom: 6 }}>
          Leads admin
        </h1>
        <p className="hint" style={{ marginBottom: 28 }}>
          Sign in to manage submissions and email settings.
        </p>

        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="field">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
            />
          </div>
          {error && (
            <span style={{ color: "var(--danger)", fontSize: 13, fontWeight: 500 }}>{error}</span>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="btn btn-primary"
            style={{ width: "100%", padding: "12px 18px", marginTop: 4 }}
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </main>
  );
}
