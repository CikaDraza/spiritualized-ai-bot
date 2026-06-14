"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { scenarioLabel } from "@/lib/scenario";
import type { Space } from "@/types/space";
import type { Mistake, Severity } from "@/types/tutor";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const PILLARS = [
  { key: "semantics", label: "Semantics" },
  { key: "syntax", label: "Syntax" },
  { key: "orthography", label: "Orthography" },
  { key: "living_communication", label: "Communication" },
] as const;
const PENALTY: Record<Severity, number> = { minor: 3, moderate: 7, major: 12 };

function levelBelow(level: string): string {
  const i = LEVELS.indexOf(level);
  return LEVELS[Math.max(0, i - 1)] ?? level;
}

type Props = {
  space: Space;
  mistakes: Mistake[];
  messageCount: number;
  startedAt: number;
  onClose: () => void;
};

export default function SessionSummaryDrawer({
  space,
  mistakes,
  messageCount,
  startedAt,
  onClose,
}: Props) {
  const [screen, setScreen] = useState<1 | 2>(1);

  const durationMin = Math.max(1, Math.round((Date.now() - startedAt) / 60000));

  // Per-pillar score: 100 minus severity-weighted penalties, clamped (mock heuristic for PR11).
  const scores = PILLARS.map((p) => {
    const penalty = mistakes
      .filter((m) => m.category === p.key)
      .reduce((sum, m) => sum + (PENALTY[m.severity] ?? PENALTY.moderate), 0);
    return { ...p, score: Math.max(40, 100 - penalty) };
  });

  const ranked = [...scores].sort((a, b) => b.score - a.score);
  const strong = ranked.slice(0, 2).filter((s) => s.score >= 80);
  const weak = ranked.filter((s) => s.score < 90).slice(-2);

  const counts = PILLARS.map((p) => ({
    label: p.label,
    n: mistakes.filter((m) => m.category === p.key).length,
  }));
  const mostCommon = [...counts].sort((a, b) => b.n - a.n)[0];

  const target = space.level;
  const current = levelBelow(target);

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
              Current level <b className="text-ink">{current}</b> · Target{" "}
              <b className="text-ink">{target}</b>
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
                { k: "Duration", v: `${durationMin} min` },
                { k: "Messages", v: String(messageCount) },
                { k: "Level est.", v: target },
              ].map((s) => (
                <div key={s.k} className="rounded-tile bg-card px-3 py-3 text-center">
                  <div className="text-[18px] font-extrabold">{s.v}</div>
                  <div className="font-body text-[11px] text-muted2">{s.k}</div>
                </div>
              ))}
            </div>

            <Section title="Strong areas">
              {strong.length ? (
                strong.map((s) => (
                  <Row key={s.key} ok>
                    {s.label}
                  </Row>
                ))
              ) : (
                <Row ok>Keep going to build strengths</Row>
              )}
            </Section>

            <Section title="Needs attention">
              {weak.length ? (
                weak.map((s) => <Row key={s.key}>{s.label}</Row>)
              ) : (
                <Row ok>Nothing major — great work!</Row>
              )}
            </Section>

            <div className="mt-3 flex justify-between rounded-tile bg-card px-4 py-3 font-body text-[13px]">
              <span className="text-muted2">Most common correction</span>
              <span className="font-bold text-ink">
                {mostCommon && mostCommon.n > 0 ? mostCommon.label : "—"}
              </span>
            </div>

            <p className="mt-3 font-body text-[12.5px] text-muted2">
              <b className="text-ink">Recommendation:</b> Keep practicing{" "}
              {scenarioLabel(space.scenario_type)}.
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
