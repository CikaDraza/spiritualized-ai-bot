"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SCENARIO_META, personaLabel, scenarioLabel } from "@/lib/scenario";
import type { Space } from "@/types/space";

export default function SlotCard({ space }: { space: Space }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  const { Icon, title } = SCENARIO_META[space.scenario_type];
  const scn = scenarioLabel(space.scenario_type);
  const tutor = personaLabel(space.persona);

  async function onDelete() {
    setPending(true);
    try {
      const res = await fetch(`/api/spaces/${space.id}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        toast.success("Learning space deleted.");
        setConfirming(false);
        router.refresh();
        return;
      }
      toast.error("Could not delete. Please try again.");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-card bg-card p-4">
      <div className="flex items-center gap-3">
        <div className="grid h-[42px] w-[42px] flex-none place-items-center rounded-tile bg-white text-primary shadow-tile">
          <Icon size={20} />
        </div>
        <div className="min-w-0">
          <div className="truncate text-[15px] font-extrabold">{title}</div>
          <div className="font-body text-[11.5px] text-muted2">{scn}</div>
        </div>
        <div className="ml-auto flex-none rounded-full bg-primary-50 px-2.5 py-[5px] text-[12px] font-extrabold text-primary">
          {space.level}
        </div>
      </div>

      <div className="mt-2.5 font-body text-[12.5px] text-muted2">
        Tutor: <b className="font-bold text-ink">{tutor}</b> · Scenario:{" "}
        <b className="font-bold text-ink">{scn}</b>
      </div>

      <div className="mt-3.5 flex gap-2.5">
        <Link
          href={`/app/spaces/${space.id}`}
          className="flex-1 rounded-tile bg-primary py-2.5 text-center text-[13px] font-bold text-white"
        >
          Open
        </Link>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="flex-1 rounded-tile bg-white py-2.5 text-center text-[13px] font-bold text-danger ring-1 ring-inset ring-[#f6d9d9]"
        >
          Delete
        </button>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirming(false)} />
          <div className="relative w-full max-w-[480px] rounded-t-[30px] bg-white px-[22px] pb-7 pt-3 text-center">
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#e3e3ea]" />
            <h2 className="text-[18px] font-extrabold">Delete this space?</h2>
            <p className="mt-2 font-body text-[13px] text-muted2">
              “{title}” will be removed.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-card bg-card py-3.5 text-[14px] font-bold text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={pending}
                className="flex-1 rounded-card bg-danger py-3.5 text-[14px] font-bold text-white disabled:opacity-60"
              >
                {pending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
