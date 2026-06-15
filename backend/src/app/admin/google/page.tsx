import { requireAdmin } from "@/lib/auth";
import { getConnection } from "@/lib/google";
import AdminShell from "../AdminShell";
import GooglePanel from "./GooglePanel";

export const dynamic = "force-dynamic";

export default async function GooglePage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>;
}) {
  await requireAdmin();
  const connection = await getConnection();
  const sp = await searchParams;
  return (
    <AdminShell active="google" title="Google Sheet">
      <GooglePanel
        connection={connection}
        justConnected={sp.connected === "1"}
        error={sp.error ?? null}
      />
    </AdminShell>
  );
}
