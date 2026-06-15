import { describe, it, expect, vi, beforeEach } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { renderTemplate, buildVars, sendLeadEmails } from "@/lib/email";

const lead = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme & Co",
  email: "jane@acme.com",
  phone: "+1 555",
  score: 18,
};

const settings = {
  from_email: "hello@cci.com",
  admin_to_email: "admin@cci.com",
  thankyou_subject: "Results for {{firstName}}",
  thankyou_html: "<p>Hi {{firstName}}, tier {{tierLabel}} ({{score}})</p>",
};

describe("renderTemplate", () => {
  it("substitutes known vars and escapes HTML by default", () => {
    expect(renderTemplate("<b>{{company}}</b>", { company: "Acme & Co" })).toBe(
      "<b>Acme &amp; Co</b>",
    );
  });
  it("renders unknown vars as empty", () => {
    expect(renderTemplate("a{{missing}}b", {})).toBe("ab");
  });
  it("does not escape when escape:false (for subjects)", () => {
    expect(renderTemplate("{{company}}", { company: "Acme & Co" }, { escape: false })).toBe(
      "Acme & Co",
    );
  });
});

describe("buildVars", () => {
  it("derives tier and tierLabel from score", () => {
    const v = buildVars(lead);
    expect(v.tier).toBe("B");
    expect(v.tierLabel).toBe("Emerging");
    expect(v.score).toBe("18");
    expect(v.firstName).toBe("Jane");
  });
});

describe("sendLeadEmails", () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "x" }, error: null });
    process.env.RESEND_API_KEY = "re_test";
  });

  it("sends a thank-you to the lead and a notification to the admin", async () => {
    await sendLeadEmails(lead, settings);
    expect(sendMock).toHaveBeenCalledTimes(2);

    const [thankYou, notify] = sendMock.mock.calls.map((c) => c[0]);
    expect(thankYou.to).toBe("jane@acme.com");
    expect(thankYou.from).toBe("hello@cci.com");
    expect(thankYou.subject).toBe("Results for Jane");
    expect(thankYou.html).toContain("Emerging");

    expect(notify.to).toBe("admin@cci.com");
    expect(notify.subject).toContain("Jane Smith");
  });

  it("throws when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    await expect(sendLeadEmails(lead, settings)).rejects.toThrow("RESEND_API_KEY");
  });
});
