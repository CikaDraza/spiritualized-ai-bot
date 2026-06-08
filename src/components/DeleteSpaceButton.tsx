"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteSpaceButton({ spaceId }: { spaceId: number }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);

  async function onDelete() {
    setPending(true);
    try {
      const res = await fetch(`/api/spaces/${spaceId}`, { method: "DELETE" });
      if (res.ok || res.status === 204) {
        toast.success("Learning space deleted.");
        router.push("/app");
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
    <>
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="flex w-full items-center justify-center gap-2 rounded-card bg-card px-4 py-3.5 text-[14px] font-bold text-danger"
      >
        <Trash2 size={18} />
        Delete space
      </button>

      {confirming && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirming(false)} />
          <div className="relative w-full max-w-[480px] rounded-t-[30px] bg-white px-[22px] pb-7 pt-3 text-center">
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-[#e3e3ea]" />
            <h2 className="text-[18px] font-extrabold">Delete this space?</h2>
            <p className="mt-2 font-body text-[13px] text-muted2">
              This learning space will be removed.
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
    </>
  );
}
