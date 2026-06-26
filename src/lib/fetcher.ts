import { authedFetch } from "@/lib/apiClient";

export async function fetcher<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await authedFetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}
