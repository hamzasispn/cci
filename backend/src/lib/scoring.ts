export type Tier = "A" | "B" | "C" | "D";

export function tierForScore(score: number): Tier {
  if (score <= 13) return "A";
  if (score <= 19) return "B";
  if (score <= 25) return "C";
  return "D";
}
