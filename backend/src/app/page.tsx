import Link from "next/link";

export default function Home() {
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
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div className="eyebrow rise" style={{ marginBottom: 14 }}>
          Coachability Consultants
        </div>
        <h1
          className="display rise"
          style={{ fontSize: "clamp(40px, 7vw, 72px)", marginBottom: 18, animationDelay: "0.05s" }}
        >
          Leads engine
        </h1>
        <p
          className="rise"
          style={{
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ink-soft)",
            marginBottom: 32,
            animationDelay: "0.1s",
          }}
        >
          The private backend that captures every assessment submission, emails each lead, and
          keeps your records in one place.
        </p>
        <div className="rise" style={{ animationDelay: "0.15s" }}>
          <Link
            href="/admin"
            className="btn btn-primary"
            style={{ padding: "13px 26px", fontSize: 15 }}
          >
            Open dashboard →
          </Link>
        </div>
      </div>
    </main>
  );
}
