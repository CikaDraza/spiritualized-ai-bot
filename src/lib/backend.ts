import type { NextResponse } from "next/server";

// Server-side only: the BFF route handlers talk to FastAPI here. Never exposed to the browser.
export const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

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
