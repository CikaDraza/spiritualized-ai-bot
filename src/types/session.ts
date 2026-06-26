import { z } from "zod";

// Mirrors backend SessionSummary (app/schemas.py). Validated at the BFF boundary with Zod;
// the inferred type is the single source of truth for the drawer.
export const sessionSummarySchema = z.object({
  current_level: z.string(),
  target_level: z.string(),
  pillar_scores: z.object({
    semantics: z.number(),
    syntax: z.number(),
    orthography: z.number(),
    living_communication: z.number(),
  }),
  duration_min: z.number(),
  message_count: z.number(),
  strong_areas: z.array(z.string()),
  weak_areas: z.array(z.string()),
  most_common_correction: z.string(),
  recommendation: z.string(),
});

export type SessionSummary = z.infer<typeof sessionSummarySchema>;

export type SessionCompleteInput = {
  session_id: string;
  scenario_id: number;
};
