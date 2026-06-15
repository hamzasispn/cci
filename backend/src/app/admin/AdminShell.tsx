"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

export default function AdminShell({
  active,
  title,
  action,
  children,
}: {
  active: "leads" | "settings" | "google";
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = [
    { key: "leads", href: "/admin", label: "Leads", icon: "▦" },
    { key: "settings", href: "/admin/settings", label: "Email", icon: "✉" },
    { key: "google", href: "/admin/google", label: "Google Sheet", icon: "▤" },
  ] as const;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 248,
          flexShrink: 0,
          padding: "26px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
          borderRight: "1px solid var(--line)",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(8px)",
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
      >
        <div style={{ padding: "0 8px" }}>
          <div className="eyebrow" style={{ marginBottom: 6 }}>
            Coachability
          </div>
          <div className="display" style={{ fontSize: 24 }}>
            Leads
          </div>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map((n) => {
            const on = n.key === active;
            return (
              <Link
                key={n.key}
                href={n.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "11px 14px",
                  borderRadius: 12,
                  fontSize: 14,
                  fontWeight: on ? 600 : 500,
                  color: on ? "#fff" : "var(--ink-soft)",
                  background: on ? "var(--primary)" : "transparent",
                  boxShadow: on ? "0 10px 22px -12px rgba(130,23,207,.8)" : "none",
                  transition: "background .16s ease, color .16s ease",
                }}
              >
                <span style={{ opacity: on ? 1 : 0.6, fontSize: 15 }}>{n.icon}</span>
                {n.label}
              </Link>
            );
          })}
        </nav>

        <button onClick={logout} className="btn btn-ghost" style={{ marginTop: "auto" }}>
          Log out
        </button>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "40px clamp(24px, 5vw, 64px)", minWidth: 0 }}>
        <header
          className="rise"
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <h1 className="display" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
            {title}
          </h1>
          {action}
        </header>
        <div className="rise" style={{ animationDelay: "0.06s" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
