import { describe, it, expect, vi, beforeEach } from "vitest";

const { insertLeadMock, markEmailSentMock, getSettingsMock, sendLeadEmailsMock } = vi.hoisted(
  () => ({
    insertLeadMock: vi.fn(),
    markEmailSentMock: vi.fn(),
    getSettingsMock: vi.fn(),
    sendLeadEmailsMock: vi.fn(),
  }),
);

vi.mock("@/lib/leads", () => ({
  insertLead: insertLeadMock,
  markEmailSent: markEmailSentMock,
}));
vi.mock("@/lib/settings", () => ({ getSettings: getSettingsMock }));
vi.mock("@/lib/email", () => ({ sendLeadEmails: sendLeadEmailsMock }));

import { POST, OPTIONS } from "@/app/api/leads/route";

const validBody = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  message: "Hello",
  score: 18,
  tier: "B",
  answers: [1, 2],
};

function req(body: unknown, origin = "https://www.example.com") {
  return new Request("http://localhost/api/leads", {
    method: "POST",
    headers: { "content-type": "application/json", origin },
    body: JSON.stringify(body),
  });
}

describe("POST /api/leads", () => {
  beforeEach(() => {
    insertLeadMock.mockReset();
    markEmailSentMock.mockReset();
    getSettingsMock.mockReset();
    sendLeadEmailsMock.mockReset();
    process.env.ALLOWED_ORIGINS = "https://www.example.com";
    insertLeadMock.mockResolvedValue("lead-123");
    getSettingsMock.mockResolvedValue({
      from_email: "hello@x.com",
      admin_to_email: "admin@x.com",
      thankyou_subject: "Hi {{firstName}}",
      thankyou_html: "<p>Hi {{firstName}}</p>",
    });
    sendLeadEmailsMock.mockResolvedValue(undefined);
    markEmailSentMock.mockResolvedValue(undefined);
  });

  it("stores a valid lead, sends emails, and returns 200", async () => {
    const res = await POST(req(validBody) as never);
    expect(res.status).toBe(200);
    expect(insertLeadMock).toHaveBeenCalledOnce();
    expect(sendLeadEmailsMock).toHaveBeenCalledOnce();
    expect(markEmailSentMock).toHaveBeenCalledWith("lead-123");
    expect(res.headers.get("access-control-allow-origin")).toBe("https://www.example.com");
  });

  it("returns 422 for an invalid payload and does not insert", async () => {
    const res = await POST(req({ ...validBody, email: "nope" }) as never);
    expect(res.status).toBe(422);
    expect(insertLeadMock).not.toHaveBeenCalled();
  });

  it("returns 500 when insert throws", async () => {
    insertLeadMock.mockRejectedValue(new Error("db down"));
    const res = await POST(req(validBody) as never);
    expect(res.status).toBe(500);
    expect(sendLeadEmailsMock).not.toHaveBeenCalled();
  });

  it("still returns 200 when email sending fails (best-effort)", async () => {
    sendLeadEmailsMock.mockRejectedValue(new Error("smtp"));
    const res = await POST(req(validBody) as never);
    expect(res.status).toBe(200);
    expect(markEmailSentMock).not.toHaveBeenCalled();
  });

  it("OPTIONS returns 204 with CORS headers", async () => {
    const res = await OPTIONS(req(validBody) as never);
    expect(res.status).toBe(204);
    expect(res.headers.get("access-control-allow-methods")).toContain("POST");
  });
});
