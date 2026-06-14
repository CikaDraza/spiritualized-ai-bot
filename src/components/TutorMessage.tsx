"use client";

import { useState } from "react";
import { Languages, Lightbulb } from "lucide-react";

import CorrectionCard from "@/components/CorrectionCard";
import type { ChatMsg } from "@/types/tutor";

export default function TutorMessage({ m }: { m: ChatMsg }) {
  const [showSr, setShowSr] = useState(false);
  const turn = m.turn;

  return (
    <div className="flex max-w-[88%] flex-col items-start gap-1.5 self-start">
      <div className="rounded-[18px] rounded-bl-[6px] bg-card px-[15px] py-3 font-body text-[13.5px] leading-[1.5] text-ink">
        {m.content}
        {showSr && turn?.translation.ai_response && (
          <p className="mt-1.5 border-t border-line pt-1.5 text-[12px] italic text-muted2">
            {turn.translation.ai_response}
          </p>
        )}
      </div>

      {turn?.translation.ai_response && (
        <button
          type="button"
          onClick={() => setShowSr((v) => !v)}
          className="flex items-center gap-1 pl-1 font-body text-[11px] font-semibold text-primary"
        >
          <Languages size={12} /> {showSr ? "Hide translation" : "Translate"}
        </button>
      )}

      {turn && turn.hints.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-1">
          {turn.hints.map((h, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-body text-[11px] text-primary-deep"
            >
              <Lightbulb size={11} /> {h}
            </span>
          ))}
        </div>
      )}

      {turn && <CorrectionCard turn={turn} />}
    </div>
  );
}
