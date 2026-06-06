"use client";

import { useBackendStatus } from "@/hooks/useBackendStatus";

export default function StatusBanner() {
  const { statusLabel, hasError } = useBackendStatus();

  return (
    <div className="mb-4 flex items-center justify-start">
      <span
        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-indigo-700/10 ${
          hasError
            ? "bg-rose-500/10 text-rose-300 ring-rose-400/20"
            : "bg-indigo-50 text-indigo-700"
        }`}
      >
        {statusLabel}
      </span>
    </div>
  );
}
