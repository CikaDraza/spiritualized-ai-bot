import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL, relaySetCookies } from "@/lib/backend";

// Silent token refresh. The refresh cookie is scoped to /api/auth, so the browser only sends it
// here — we forward it to the backend's rotating /auth/refresh and relay the new Set-Cookie back
// (access at "/", refresh rewritten to /api/auth). Called by authedFetch on a 401.
export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  const res = NextResponse.json(data, { status: backendRes.status });
  if (backendRes.ok) relaySetCookies(backendRes, res);
  return res;
}
