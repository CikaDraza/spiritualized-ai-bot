"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import {
  LEVEL_OPTIONS,
  MAX_SPACES,
  PERSONA_OPTIONS,
  SCENARIO_OPTIONS,
  type Level,
  type Persona,
  type ScenarioType,
  type Space,
} from "@/types/space";
import { resendVerification } from "@/lib/verification";
import SlotCard from "@/components/SlotCard";

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="mb-2 font-body text-[13px] font-semibold">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[12px] px-3.5 py-2 text-[13px] font-semibold ${
        active ? "bg-primary text-white" : "bg-card text-muted2"
      }`}
    >
      {children}
    </button>
  );
}

export default function SpacesView({ spaces }: { spaces: Space[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scenario, setScenario] = useState<ScenarioType | null>(null);
  const [level, setLevel] = useState<Level | null>(null);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const emptyCount = Math.max(0, MAX_SPACES - spaces.length);

  function close() {
    setOpen(false);
    setScenario(null);
    setLevel(null);
    setPersona(null);
  }

  async function onCreate() {
    if (!scenario || !level || !persona) {
      toast.error("Pick a scenario, level and tutor.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/spaces", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scenario_type: scenario, level, persona }),
      });
      if (res.ok) {
        toast.success("Learning space created.");
        close();
        router.refresh();
        return;
      }
      if (res.status === 409) {
        toast.error(`You can have at most ${MAX_SPACES} learning spaces.`);
        return;
      }
      if (res.status === 403) {
        toast.error("Please verify your email first.", {
          action: {
            label: "Send verification link",
            onClick: () => {
              void resendVerification();
            },
          },
        });
        return;
      }
      toast.error("Could not create the space. Please try again.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-[18px] flex flex-col gap-3">
      {spaces.map((s) => (
        <SlotCard key={s.id} space={s} />
      ))}

      {Array.from({ length: emptyCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 rounded-card border-2 border-dashed border-[#d7d3ec] py-[18px] font-bold text-primary"
        >
          <Plus size={18} />
          Start new space
        </button>
      ))}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={close} />
          <div className="relative w-full max-w-[480px] rounded-t-[30px] bg-white px-[22px] pb-7 pt-3">
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#e3e3ea]" />
            <h2 className="text-[19px] font-extrabold">Create Learning Space</h2>

            <Group label="Scenario">
              {SCENARIO_OPTIONS.map((o) => (
                <Chip key={o.value} active={scenario === o.value} onClick={() => setScenario(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </Group>

            <Group label="Level">
              {LEVEL_OPTIONS.map((l) => (
                <Chip key={l} active={level === l} onClick={() => setLevel(l)}>
                  {l}
                </Chip>
              ))}
            </Group>

            <Group label="Tutor">
              {PERSONA_OPTIONS.map((o) => (
                <Chip key={o.value} active={persona === o.value} onClick={() => setPersona(o.value)}>
                  {o.label}
                </Chip>
              ))}
            </Group>

            <button
              type="button"
              onClick={onCreate}
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center rounded-card bg-brand-gradient px-4 py-4 text-[15px] font-bold text-white shadow-soft disabled:opacity-60"
            >
              {submitting ? "Creating…" : "Create"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
