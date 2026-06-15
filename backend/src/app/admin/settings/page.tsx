import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import AdminShell from "../AdminShell";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin();
  const settings = await getSettings();
  return (
    <AdminShell active="settings" title="Email settings">
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}
