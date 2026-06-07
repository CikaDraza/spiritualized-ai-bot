import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL, relaySetCookies } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${BACKEND_URL}/auth/logout`, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  const res = NextResponse.json(data, { status: backendRes.status });
  // Backend responds with cookie-clearing Set-Cookie headers; relay them to the browser.
  relaySetCookies(backendRes, res);
  return res;
}
