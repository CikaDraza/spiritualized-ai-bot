"use client";

// TEMP preview route. Real SessionSummary captured from POST /tutor/session/complete (Session 1 of
// the backend integration test), fed into the actual SessionSummaryDrawer. Delete when done.
import SessionSummaryDrawer from "@/components/SessionSummaryDrawer";
import type { SessionSummary } from "@/types/session";

const summary: SessionSummary = {
  current_level: "A2",
  target_level: "B1",
  pillar_scores: {
    semantics: 100,
    syntax: 78,
    orthography: 100,
    living_communication: 100,
  },
  duration_min: 7,
  message_count: 2,
  strong_areas: ["Semantics", "Spelling"],
  weak_areas: ["Syntax"],
  most_common_correction: "Syntax",
  recommendation: "Focus on syntax. Keep practicing shopping.",
};

export default function PreviewSummaryPage() {
  return (
    <main className="min-h-screen bg-white">
      <SessionSummaryDrawer summary={summary} onClose={() => {}} />
    </main>
  );
}
