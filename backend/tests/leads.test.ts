import { describe, it, expect, vi, beforeEach } from "vitest";

const { insertMock, singleMock, updateMock, updateEqMock } = vi.hoisted(() => {
  const singleMock = vi.fn();
  const insertMock = vi.fn(() => ({ select: () => ({ single: singleMock }) }));
  const updateEqMock = vi.fn();
  const updateMock = vi.fn(() => ({ eq: updateEqMock }));
  return { insertMock, singleMock, updateMock, updateEqMock };
});

vi.mock("@/lib/supabase", () => ({
  getServiceClient: () => ({ from: () => ({ insert: insertMock, update: updateMock }) }),
}));

import { insertLead, markEmailSent } from "@/lib/leads";

const lead = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555",
  message: "Hi",
  score: 18,
  answers: [1, 2],
};

describe("insertLead", () => {
  beforeEach(() => {
    insertMock.mockClear();
    singleMock.mockReset();
  });

  it("maps camelCase to snake_case, recomputes tier, and returns the new id", async () => {
    singleMock.mockResolvedValue({ data: { id: "lead-123" }, error: null });
    const id = await insertLead(lead);
    expect(id).toBe("lead-123");
    expect(insertMock).toHaveBeenCalledWith({
      first_name: "Jane",
      last_name: "Smith",
      company: "Acme Inc.",
      email: "jane@acme.com",
      phone: "+1 555",
      message: "Hi",
      score: 18,
      tier: "B",
      answers: [1, 2],
    });
  });

  it("throws when supabase returns an error", async () => {
    singleMock.mockResolvedValue({ data: null, error: { message: "boom" } });
    await expect(insertLead(lead)).rejects.toThrow("boom");
  });
});

describe("markEmailSent", () => {
  beforeEach(() => {
    updateMock.mockClear();
    updateEqMock.mockReset();
  });

  it("sets email_sent true for the given id", async () => {
    updateEqMock.mockResolvedValue({ error: null });
    await markEmailSent("lead-123");
    expect(updateMock).toHaveBeenCalledWith({ email_sent: true });
    expect(updateEqMock).toHaveBeenCalledWith("id", "lead-123");
  });

  it("throws when supabase returns an error", async () => {
    updateEqMock.mockResolvedValue({ error: { message: "nope" } });
    await expect(markEmailSent("lead-123")).rejects.toThrow("nope");
  });
});
