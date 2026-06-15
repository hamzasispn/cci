import { getServiceClient } from "./supabase";
import { tierForScore } from "./scoring";
import type { LeadInput } from "./leadSchema";

/** Insert a lead and return its generated id. */
export async function insertLead(input: LeadInput): Promise<string> {
  const supabase = getServiceClient();
  const { data, error } = await supabase
    .from("leads")
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      company: input.company,
      email: input.email,
      phone: input.phone,
      message: input.message ?? "",
      score: input.score,
      // tier is recomputed server-side from score; any client-supplied input.tier is
      // deliberately ignored and must never be persisted.
      tier: tierForScore(input.score),
      answers: input.answers,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return (data as { id: string }).id;
}

/** Mark that the thank-you/notification emails were sent for a lead. */
export async function markEmailSent(id: string): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase.from("leads").update({ email_sent: true }).eq("id", id);
  if (error) throw new Error(error.message);
}

/** Mark that a lead was appended to the connected Google Sheet. */
export async function markSyncedToSheet(id: string): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase.from("leads").update({ synced_to_sheet: true }).eq("id", id);
  if (error) throw new Error(error.message);
}
