import { getServiceClient } from "./supabase";
import { tierForScore } from "./scoring";
import type { LeadInput } from "./leadSchema";

export async function insertLead(input: LeadInput): Promise<void> {
  const supabase = getServiceClient();
  const { error } = await supabase.from("leads").insert({
    first_name: input.firstName,
    last_name: input.lastName,
    company: input.company,
    email: input.email,
    phone: input.phone,
    message: input.message ?? "",
    score: input.score,
    tier: tierForScore(input.score),
    answers: input.answers,
  });
  if (error) throw new Error(error.message);
}
