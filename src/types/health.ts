export type HealthSource = "local" | "railway" | "unknown";

export type HealthStatus = {
  status: string;
  message: string;
  source?: HealthSource;
  backendUrl?: string;
  timestamp?: string;
};
