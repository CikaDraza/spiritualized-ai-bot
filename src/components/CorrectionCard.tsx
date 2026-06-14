"use client";

import { useState } from "react";
import { Check, Languages } from "lucide-react";

import type { Mistake, Severity, TutorTurnResponse } from "@/types/tutor";

const SEVERITY: Record<Severity, { dot: string; ring: string; label: string }> = {
  minor: { dot: "bg-sky-400", ring: "border-l-sky-400", label: "Minor" },
  moderate: { dot: "bg-amber-400", ring: "border-l-amber-400", label: "Moderate" },
  major: { dot: "bg-red-400", ring: "border-l-red-400", label: "Major" },
};

const CATEGORY_LABEL: Record<string, string> = {
  semantics: "Semantics",
  syntax: "Syntax",
  orthography: "Spelling",
  living_communication: "Communication",
};

function MistakeRow({ m, showSr }: { m: Mistake; showSr: boolean }) {
  const sev = SEVERITY[m.severity] ?? SEVERITY.moderate;
  return (
    <div className={`rounded-[12px] border-l-[3px] ${sev.ring} bg-card px-3 py-2`}>
      <div className="flex items-center gap-1.5">
        <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
        <span className="font-body text-[10.5px] font-bold uppercase tracking-wide text-muted2">
          {CATEGORY_LABEL[m.category] ?? m.category} · {sev.label}
        </span>
      </div>
      <div className="mt-1 font-body text-[12.5px] leading-[1.45]">
        <span className="text-danger line-through">{m.original}</span>{" "}
        <span className="font-semibold text-ink">→ {m.correction}</span>
      </div>
      {showSr && m.explanation && (
        <p className="mt-0.5 font-body text-[11.5px] italic text-muted2">{m.explanation}</p>
      )}
    </div>
  );
}

export default function CorrectionCard({ turn }: { turn: TutorTurnResponse }) {
  const [showSr, setShowSr] = useState(false);
  const hasCorrection = turn.correction.trim().length > 0;

  if (!hasCorrection && turn.mistakes.length === 0) return null;

  const canTranslate = Boolean(turn.translation.correction) || turn.mistakes.length > 0;

  return (
    <div className="mt-1 w-full rounded-[16px] border border-line bg-white p-3.5">
      {hasCorrection && (
        <>
          <div className="mb-1 flex items-center gap-1.5 font-body text-[11px] font-bold uppercase tracking-wide text-muted2">
            <Check size={13} className="text-success" /> Correction
          </div>
          <p className="font-body text-[13px] leading-[1.5] text-ink">{turn.correction}</p>
          {showSr && turn.translation.correction && (
            <p className="mt-1 font-body text-[12px] italic leading-[1.5] text-muted2">
              {turn.translation.correction}
            </p>
          )}
        </>
      )}

      {turn.mistakes.length > 0 && (
        <div className="mt-2.5 flex flex-col gap-2">
          {turn.mistakes.map((m, i) => (
            <MistakeRow key={i} m={m} showSr={showSr} />
          ))}
        </div>
      )}

      {canTranslate && (
        <button
          type="button"
          onClick={() => setShowSr((v) => !v)}
          className="mt-2.5 flex items-center gap-1 font-body text-[11.5px] font-semibold text-primary"
        >
          <Languages size={13} /> {showSr ? "Hide Serbian" : "Show Serbian"}
        </button>
      )}
    </div>
  );
}
