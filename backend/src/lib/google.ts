import { google } from "googleapis";
import { getServiceClient } from "./supabase";
import { tierForScore } from "./scoring";
import type { LeadInput } from "./leadSchema";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/userinfo.email",
];

const HEADER = [
  "Date",
  "First name",
  "Last name",
  "Company",
  "Email",
  "Phone",
  "Message",
  "Score",
  "Tier",
];

type Cell = string | number;

export function oauthClient() {
  const id = process.env.GOOGLE_CLIENT_ID;
  const secret = process.env.GOOGLE_CLIENT_SECRET;
  const redirect = process.env.GOOGLE_REDIRECT_URI;
  if (!id || !secret || !redirect) {
    throw new Error("GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REDIRECT_URI are not set");
  }
  return new google.auth.OAuth2(id, secret, redirect);
}

export function getAuthUrl(): string {
  return oauthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
  });
}

export interface GoogleConnection {
  google_email: string | null;
  spreadsheet_id: string | null;
  sheet_name: string;
  connected_at: string | null;
}

export async function getConnection(): Promise<GoogleConnection | null> {
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("google_connection")
    .select("google_email, spreadsheet_id, sheet_name, connected_at")
    .eq("id", 1)
    .maybeSingle();
  if (!data || !data.spreadsheet_id) return null;
  return data as GoogleConnection;
}

async function authedClient() {
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("google_connection")
    .select("refresh_token")
    .eq("id", 1)
    .maybeSingle();
  const refresh = (data as { refresh_token?: string } | null)?.refresh_token;
  if (!refresh) throw new Error("Google is not connected");
  const client = oauthClient();
  client.setCredentials({ refresh_token: refresh });
  return client;
}

/** Exchange the OAuth code, create the spreadsheet, and store the connection. */
export async function handleCallback(code: string): Promise<void> {
  const client = oauthClient();
  const { tokens } = await client.getToken(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "Google did not return a refresh token. Remove the app at myaccount.google.com/permissions, then reconnect.",
    );
  }
  client.setCredentials(tokens);

  let email: string | null = null;
  try {
    const oauth2 = google.oauth2({ version: "v2", auth: client });
    const me = await oauth2.userinfo.get();
    email = me.data.email ?? null;
  } catch {
    /* email is optional */
  }

  const sheets = google.sheets({ version: "v4", auth: client });
  const created = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: "CCI Leads" },
      sheets: [{ properties: { title: "Leads" } }],
    },
  });
  const spreadsheetId = created.data.spreadsheetId;
  if (!spreadsheetId) throw new Error("Failed to create spreadsheet");

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: "Leads!A1",
    valueInputOption: "RAW",
    requestBody: { values: [HEADER] },
  });

  const supabase = getServiceClient();
  const { error } = await supabase.from("google_connection").upsert({
    id: 1,
    google_email: email,
    refresh_token: tokens.refresh_token,
    spreadsheet_id: spreadsheetId,
    sheet_name: "Leads",
    connected_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

export async function disconnect(): Promise<void> {
  const supabase = getServiceClient();
  await supabase.from("google_connection").delete().eq("id", 1);
}

async function appendRows(rows: Cell[][]): Promise<void> {
  const conn = await getConnection();
  if (!conn?.spreadsheet_id) return;
  const client = await authedClient();
  const sheets = google.sheets({ version: "v4", auth: client });
  await sheets.spreadsheets.values.append({
    spreadsheetId: conn.spreadsheet_id,
    range: `${conn.sheet_name}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: rows },
  });
}

/** Append one freshly-submitted lead. Returns false (no-op) if not connected. */
export async function appendLead(input: LeadInput): Promise<boolean> {
  const conn = await getConnection();
  if (!conn) return false;
  await appendRows([
    [
      new Date().toISOString(),
      input.firstName,
      input.lastName,
      input.company,
      input.email,
      input.phone,
      input.message ?? "",
      input.score,
      tierForScore(input.score),
    ],
  ]);
  return true;
}

/** Append all leads not yet synced, then mark them synced. Returns count appended. */
export async function backfillAll(): Promise<number> {
  const conn = await getConnection();
  if (!conn) throw new Error("Google is not connected");
  const supabase = getServiceClient();
  const { data } = await supabase
    .from("leads")
    .select("*")
    .eq("synced_to_sheet", false)
    .order("created_at", { ascending: true });

  const leads = (data ?? []) as Record<string, unknown>[];
  if (leads.length === 0) return 0;

  const rows: Cell[][] = leads.map((r) => [
    String(r.created_at ?? ""),
    String(r.first_name ?? ""),
    String(r.last_name ?? ""),
    String(r.company ?? ""),
    String(r.email ?? ""),
    String(r.phone ?? ""),
    String(r.message ?? ""),
    Number(r.score ?? 0),
    String(r.tier ?? ""),
  ]);
  await appendRows(rows);

  const ids = leads.map((r) => String(r.id));
  await supabase.from("leads").update({ synced_to_sheet: true }).in("id", ids);
  return rows.length;
}
