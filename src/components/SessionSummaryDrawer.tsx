"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import type { SessionSummary } from "@/types/session";

// Pillars in display order; scores come from the backend (no client computation).
const PILLARS = [
  { key: "semantics", label: "Semantics" },
  { key: "syntax", label: "Syntax" },
  { key: "orthography", label: "Spelling" },
  { key: "living_communication", label: "Communication" },
] as const;

type Props = {
  summary: SessionSummary;
  onClose: () => void;
};

export default function SessionSummaryDrawer({ summary, onClose }: Props) {
  const [screen, setScreen] = useState<1 | 2>(1);

  const scores = PILLARS.map((p) => ({ ...p, score: summary.pillar_scores[p.key] }));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-[480px] rounded-t-[30px] bg-white px-[22px] pb-7 pt-3">
        <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#e3e3ea]" />

        {screen === 1 ? (
          <>
            <div className="mx-auto grid h-[68px] w-[68px] place-items-center rounded-full bg-primary-50">
              <div className="grid h-[50px] w-[50px] place-items-center rounded-full bg-brand-gradient text-white">
                <Check size={26} strokeWidth={3} />
              </div>
            </div>
            <h2 className="mt-3 text-center text-[22px] font-extrabold">Session Complete</h2>
            <p className="mt-1 text-center font-body text-[13px] text-muted2">
              Current level <b className="text-ink">{summary.current_level}</b> · Target{" "}
              <b className="text-ink">{summary.target_level}</b>
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {scores.map((s) => (
                <div key={s.key}>
                  <div className="mb-1 flex justify-between font-body text-[12.5px]">
                    <span className="text-muted2">{s.label}</span>
                    <span className="font-bold text-ink">{s.score}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-track">
                    <div
                      className="h-full rounded-full bg-brand-gradient"
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setScreen(2)}
              className="mx-auto mt-6 block rounded-card bg-card px-6 py-2.5 text-[13px] font-bold text-ink"
            >
              More
            </button>
          </>
        ) : (
          <>
            <h2 className="text-[20px] font-extrabold">Today&apos;s Session</h2>

            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {[
                { k: "Duration", v: `${summary.duration_min} min` },
                { k: "Messages", v: String(summary.message_count) },
                { k: "Level est.", v: summary.target_level },
              ].map((s) => (
                <div key={s.k} className="rounded-tile bg-card px-3 py-3 text-center">
                  <div className="text-[18px] font-extrabold">{s.v}</div>
                  <div className="font-body text-[11px] text-muted2">{s.k}</div>
                </div>
              ))}
            </div>

            <Section title="Strong areas">
              {summary.strong_areas.length ? (
                summary.strong_areas.map((label) => (
                  <Row key={label} ok>
                    {label}
                  </Row>
                ))
              ) : (
                <Row ok>Keep going to build strengths</Row>
              )}
            </Section>

            <Section title="Needs attention">
              {summary.weak_areas.length ? (
                summary.weak_areas.map((label) => <Row key={label}>{label}</Row>)
              ) : (
                <Row ok>Nothing major — great work!</Row>
              )}
            </Section>

            <div className="mt-3 flex justify-between rounded-tile bg-card px-4 py-3 font-body text-[13px]">
              <span className="text-muted2">Most common correction</span>
              <span className="font-bold text-ink">{summary.most_common_correction}</span>
            </div>

            <p className="mt-3 font-body text-[12.5px] text-muted2">
              <b className="text-ink">Recommendation:</b> {summary.recommendation}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 flex w-full items-center justify-center rounded-card bg-brand-gradient px-4 py-4 text-[15px] font-bold text-white shadow-soft"
            >
              Next lesson
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-1.5 font-body text-[12px] font-bold uppercase tracking-wide text-muted2">
        {title}
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function Row({ children, ok = false }: { children: React.ReactNode; ok?: boolean }) {
  return (
    <div className="flex items-center gap-2 font-body text-[13px] text-ink">
      {ok ? (
        <Check size={15} className="text-success" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-danger" />
      )}
      {children}
    </div>
  );
}
