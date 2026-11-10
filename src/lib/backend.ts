import type { NextResponse } from "next/server";

const LOCAL_BACKEND_URL = "http://127.0.0.1:8000";

export function getBackendUrl(): string {
  const url =
    process.env.BACKEND_URL ||
    (process.env.NODE_ENV === "development" ? LOCAL_BACKEND_URL : undefined);

  if (!url) {
    const error = new Error("BACKEND_URL is required outside development");
    console.error("Backend configuration error:", error);
    throw error;
  }

  return url;
}

/**
 * Relay the backend's Set-Cookie headers onto our own response so the (httpOnly) auth cookies
 * become first-party to the frontend origin. The backend scopes the refresh cookie to `/auth`;
 * rewrite it to `/api/auth` so the browser returns it to our BFF refresh/logout routes. All other
 * attributes (HttpOnly, Secure, SameSite, Max-Age) are preserved exactly as the backend set them.
 */
export function relaySetCookies(from: Response, to: NextResponse): void {
  const cookies = from.headers.getSetCookie?.() ?? [];
  for (const cookie of cookies) {
    to.headers.append("set-cookie", cookie.replace(/Path=\/auth\b/i, "Path=/api/auth"));
  }
}
