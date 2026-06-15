import { describe, it, expect } from "vitest";
import { leadSchema } from "@/lib/leadSchema";

const valid = {
  firstName: "Jane",
  lastName: "Smith",
  company: "Acme Inc.",
  email: "jane@acme.com",
  phone: "+1 555 123 4567",
  message: "Hello",
  score: 18,
  tier: "B",
  answers: [1, 2, [0, 3], null],
};

describe("leadSchema", () => {
  it("accepts a valid payload", () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });
  it("defaults message to empty string when missing", () => {
    const { message, ...rest } = valid;
    const r = leadSchema.safeParse(rest);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.message).toBe("");
  });
  it("rejects an invalid email", () => {
    expect(leadSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });
  it("rejects a missing first name", () => {
    expect(leadSchema.safeParse({ ...valid, firstName: "" }).success).toBe(false);
  });
  it("rejects a non-numeric score", () => {
    expect(leadSchema.safeParse({ ...valid, score: "x" }).success).toBe(false);
  });
});
