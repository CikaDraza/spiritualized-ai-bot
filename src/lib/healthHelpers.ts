import { HealthSource } from "@/types/health";

export function getHealthBadgeText(
  status: "loading" | "error" | "success",
  source: HealthSource,
): string {
  if (status === "loading") {
    return "Connecting to backend...";
  }

  if (status === "error") {
    return "Backend disconnected";
  }

  if (source === "local") {
    return "Pozdrav sa lokalnog servera";
  }

  if (source === "railway") {
    return "Pozdrav sa Railway";
  }

  return "Pozdrav sa backend servera";
}

export function getBackendUrl(): string {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
}
