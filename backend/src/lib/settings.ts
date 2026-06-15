import { getServiceClient } from "./supabase";

/** Admin-editable email settings (single row, id = 1). */
export interface Settings {
  from_email: string;
  admin_to_email: string;
  thankyou_subject: string;
  thankyou_html: string;
}

const COLUMNS = "from_email, admin_to_email, thankyou_subject, thankyou_html";

export async function getSettings(): Promise<Settings> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("settings")
    .select(COLUMNS)
    .eq("id", 1)
    .single();
  if (error) throw new Error(error.message);
  return data as unknown as Settings;
}

export async function updateSettings(input: Settings): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("settings")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) throw new Error(error.message);
}
