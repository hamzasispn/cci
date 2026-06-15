import { describe, it, expect } from "vitest";
import { tierForScore } from "@/lib/scoring";

describe("tierForScore", () => {
  it("maps the bottom of each band", () => {
    expect(tierForScore(8)).toBe("A");
    expect(tierForScore(14)).toBe("B");
    expect(tierForScore(20)).toBe("C");
    expect(tierForScore(26)).toBe("D");
  });
  it("maps the top of each band", () => {
    expect(tierForScore(13)).toBe("A");
    expect(tierForScore(19)).toBe("B");
    expect(tierForScore(25)).toBe("C");
    expect(tierForScore(32)).toBe("D");
  });
  it("clamps out-of-range scores into the nearest band", () => {
    expect(tierForScore(0)).toBe("A");
    expect(tierForScore(99)).toBe("D");
  });
});
