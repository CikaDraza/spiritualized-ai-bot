import type { NextResponse } from "next/server";

// The BFF route handlers (server-side) talk to FastAPI here. Prefer BACKEND_URL (server-only);
// fall back to NEXT_PUBLIC_API_URL so prod works with the env var Vercel already has set.
// In local development (`next dev`) that fallback is never used: a .env.local copied from
// production would otherwise send a local run to the production backend unnoticed.
const LOCAL_BACKEND = "http://127.0.0.1:8000";
export const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV === "development" ? LOCAL_BACKEND : process.env.NEXT_PUBLIC_API_URL) ??
  LOCAL_BACKEND;

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
