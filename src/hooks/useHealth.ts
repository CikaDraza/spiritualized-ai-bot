import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { HealthStatus } from "@/types/health";

const HEALTH_QUERY_KEY = ["health"] as const;

export function useHealth() {
  return useQuery<HealthStatus, Error>({
    queryKey: HEALTH_QUERY_KEY,
    queryFn: () => fetcher<HealthStatus>("/api/health"),
  });
}

export function healthQueryKey() {
  return HEALTH_QUERY_KEY;
}
