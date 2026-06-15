import { describe, it, expect, vi, beforeEach } from "vitest";

const insertMock = vi.fn();
vi.mock("@/lib/supabase", () => ({
  getServiceClient: () => ({ from: () => ({ insert: insertMock }) }),
}));

import { insertLead } from "@/lib/leads";

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
  beforeEach(() => insertMock.mockReset());

  it("maps camelCase input to snake_case columns and recomputes tier from score", async () => {
    insertMock.mockResolvedValue({ error: null });
    await insertLead(lead);
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
    insertMock.mockResolvedValue({ error: { message: "boom" } });
    await expect(insertLead(lead)).rejects.toThrow("boom");
  });
});
