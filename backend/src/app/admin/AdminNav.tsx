"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav({ active }: { active: "leads" | "settings" }) {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  const linkStyle = (on: boolean) => ({
    fontSize: 14,
    fontWeight: on ? 700 : 400,
    color: on ? "#1E1E1E" : "#666",
    textDecoration: "none",
  });
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "16px 24px",
        borderBottom: "1px solid #eee",
        background: "#fff",
      }}
    >
      <strong style={{ fontSize: 15 }}>CCI Leads</strong>
      <Link href="/admin" style={linkStyle(active === "leads")}>
        Leads
      </Link>
      <Link href="/admin/settings" style={linkStyle(active === "settings")}>
        Email settings
      </Link>
      <button
        onClick={logout}
        style={{
          marginLeft: "auto",
          fontSize: 13,
          padding: "6px 12px",
          border: "1px solid #ddd",
          borderRadius: 999,
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </header>
  );
}
