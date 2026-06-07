import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL, relaySetCookies } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendRes = await fetch(`${BACKEND_URL}/auth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  const res = NextResponse.json(data, { status: backendRes.status });
  if (backendRes.ok) relaySetCookies(backendRes, res);
  return res;
}
