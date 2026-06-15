export type Tier = "A" | "B" | "C" | "D";

// Tier bands mirror form.js CONFIG.tiers: A=8-13, B=14-19, C=20-25, D=26-32.
// Scores outside the expected 8-32 range are intentionally clamped to the nearest
// band (below 8 -> A, above 32 -> D) rather than rejected, so an unexpected score
// never causes a lead to be dropped.
export function tierForScore(score: number): Tier {
  if (score <= 13) return "A";
  if (score <= 19) return "B";
  if (score <= 25) return "C";
  return "D";
}

// Human-readable tier names, mirroring form.js CONFIG.tiers labels.
const TIER_LABELS: Record<Tier, string> = {
  A: "Foundational",
  B: "Emerging",
  C: "Strategic",
  D: "Multiplier-Ready",
};

export function tierLabel(tier: Tier): string {
  return TIER_LABELS[tier];
}
