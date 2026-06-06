/**
 * Proxy middleware za komunikaciju sa backend servisom
 * Koristi se za sve zahteve koji trebaju da idu do backend-a
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function proxyRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.headers && typeof options.headers === "object") {
    const headerEntries =
      options.headers instanceof Headers
        ? Array.from(options.headers.entries())
        : Object.entries(options.headers as Record<string, string>);

    headerEntries.forEach(([key, value]) => {
      headers[key] = String(value);
    });
  }

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok && response.status !== 404) {
      throw new Error(`Backend responded with status ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(`Proxy error for ${endpoint}:`, error);
    throw error;
  }
}

export function getBackendUrl(): string {
  return BACKEND_URL;
}
