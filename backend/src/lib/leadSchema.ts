import { z } from "zod";

export const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  company: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(3).max(50),
  message: z.string().trim().max(2000).optional().default(""),
  score: z.number().int().min(0).max(40),
  tier: z.string().trim().max(2).optional(),
  answers: z.array(z.any()).default([]),
});

export type LeadInput = z.infer<typeof leadSchema>;
