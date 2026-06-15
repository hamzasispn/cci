import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash } from "node:crypto";

export const ADMIN_COOKIE = "cci_admin";

/** Unguessable session token derived from the admin password. */
export function expectedToken(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD is not set");
  return createHash("sha256").update(`cci:${pw}`).digest("hex");
}

export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return false;
  try {
    return token === expectedToken();
  } catch {
    return false;
  }
}

/** For server components: redirect to login if not authenticated. */
export async function requireAdmin(): Promise<void> {
  if (!(await isAuthed())) redirect("/admin/login");
}
