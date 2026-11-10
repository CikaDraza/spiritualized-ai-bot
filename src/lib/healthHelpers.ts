export function getHealthBadgeText(
  status: "loading" | "error" | "success",
): string {
  if (status === "loading") {
    return "Connecting to backend...";
  }

  if (status === "error") {
    return "Backend disconnected";
  }

  return "Pozdrav sa backend servera";
}
