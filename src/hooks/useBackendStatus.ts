"use client";

import { useHealth } from "@/hooks/useHealth";
import { HealthSource } from "@/types/health";

export type UseBackendStatus = {
  statusLabel: string;
  source: HealthSource;
  hasError: boolean;
};

export function useBackendStatus(): UseBackendStatus {
  const healthQuery = useHealth();

  const source = healthQuery.data?.source ?? "unknown";

  const statusLabel = healthQuery.isLoading
    ? "Connecting to backend..."
    : healthQuery.isError
      ? "Backend disconnected"
      : source === "local"
        ? "Pozdrav sa lokalnog servera"
        : source === "railway"
          ? "Pozdrav sa Railway"
          : "Pozdrav sa backend servera";

  return {
    statusLabel,
    source,
    hasError: healthQuery.isError,
  };
}
