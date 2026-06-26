// Client-side fetch that survives a 15-minute access-token expiry: on a 401 it silently refreshes
// the session once (rotating refresh token), then retries the original request. A module-level
// singleton dedupes concurrent refreshes — important because the backend treats a reused (already
// rotated) refresh token as compromise and revokes the whole family.

let refreshInFlight: Promise<boolean> | null = null;

function refreshSession(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/auth/refresh", { method: "POST" })
      .then((res) => res.ok)
      .catch(() => false)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

export async function authedFetch(input: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, init);
  if (res.status !== 401) return res;

  const refreshed = await refreshSession();
  if (!refreshed) return res; // refresh failed → caller handles the 401 (e.g. redirect to /login)

  return fetch(input, init); // retry once with the freshly-rotated access cookie
}
