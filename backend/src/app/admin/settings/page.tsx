import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import AdminNav from "../AdminNav";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f6f6f6", minHeight: "100vh" }}>
      <AdminNav active="settings" />
      <main style={{ padding: 24 }}>
        <SettingsForm initial={settings} />
      </main>
    </div>
  );
}
