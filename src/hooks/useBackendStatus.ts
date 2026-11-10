"use client";

import { useHealth } from "@/hooks/useHealth";
import { getHealthBadgeText } from "@/lib/healthHelpers";

export type UseBackendStatus = {
  statusLabel: string;
  hasError: boolean;
};

export function useBackendStatus(): UseBackendStatus {
  const healthQuery = useHealth();

  const statusLabel = getHealthBadgeText(
    healthQuery.isLoading ? "loading" : healthQuery.isError ? "error" : "success",
  );

  return {
    statusLabel,
    hasError: healthQuery.isError,
  };
}
