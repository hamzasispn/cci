import { Resend } from "resend";
import { tierForScore, tierLabel } from "./scoring";
import type { Settings } from "./settings";

/** The subset of a lead needed to render and address the emails. */
export interface LeadEmailData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  score: number;
}

export function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Merge variables available in the thank-you template. */
export function buildVars(lead: LeadEmailData): Record<string, string> {
  const tier = tierForScore(lead.score);
  return {
    firstName: lead.firstName,
    lastName: lead.lastName,
    company: lead.company,
    email: lead.email,
    phone: lead.phone,
    tier,
    tierLabel: tierLabel(tier),
    score: String(lead.score),
  };
}

/**
 * Replace {{var}} placeholders. Unknown variables render empty.
 * HTML body values are escaped; pass escape:false for plain-text fields (subject).
 */
export function renderTemplate(
  template: string,
  vars: Record<string, string>,
  opts: { escape?: boolean } = {},
): string {
  const escape = opts.escape ?? true;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key: string) => {
    if (!(key in vars)) return "";
    return escape ? escapeHtml(vars[key]) : vars[key];
  });
}

function adminHtml(lead: LeadEmailData, vars: Record<string, string>): string {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1E1E1E;">
    <h2 style="font-size:18px;">New assessment lead</h2>
    <ul style="line-height:1.7;padding-left:18px;">
      <li><strong>Name:</strong> ${escapeHtml(lead.firstName)} ${escapeHtml(lead.lastName)}</li>
      <li><strong>Company:</strong> ${escapeHtml(lead.company)}</li>
      <li><strong>Email:</strong> ${escapeHtml(lead.email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(lead.phone)}</li>
      <li><strong>Tier:</strong> ${vars.tier} (${vars.tierLabel})</li>
      <li><strong>Score:</strong> ${vars.score}</li>
    </ul>
  </div>`;
}

/**
 * Send the thank-you email to the lead and a notification to the admin.
 * Throws on a missing API key or a send failure (caller treats as best-effort).
 */
export async function sendLeadEmails(lead: LeadEmailData, settings: Settings): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const resend = new Resend(apiKey);
  const vars = buildVars(lead);

  const thankYou = await resend.emails.send({
    from: settings.from_email,
    to: lead.email,
    subject: renderTemplate(settings.thankyou_subject, vars, { escape: false }),
    html: renderTemplate(settings.thankyou_html, vars),
  });
  if (thankYou.error) throw new Error(thankYou.error.message || "thank-you email failed");

  const notify = await resend.emails.send({
    from: settings.from_email,
    to: settings.admin_to_email,
    subject: `New lead: ${lead.firstName} ${lead.lastName} (${vars.tierLabel})`,
    html: adminHtml(lead, vars),
  });
  if (notify.error) throw new Error(notify.error.message || "admin notification failed");
}

/** Send a single sample thank-you email to `to`, used by the dashboard test button. */
export async function sendTestEmail(to: string, settings: Settings): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  const resend = new Resend(apiKey);
  const sample: LeadEmailData = {
    firstName: "Jane",
    lastName: "Smith",
    company: "Acme Inc.",
    email: to,
    phone: "+1 555 123 4567",
    score: 18,
  };
  const vars = buildVars(sample);
  const res = await resend.emails.send({
    from: settings.from_email,
    to,
    subject: "[TEST] " + renderTemplate(settings.thankyou_subject, vars, { escape: false }),
    html: renderTemplate(settings.thankyou_html, vars),
  });
  if (res.error) throw new Error(res.error.message || "test email failed");
}
