import { NextResponse, type NextRequest } from "next/server";

import { getBackendUrl } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const backendRes = await fetch(`${getBackendUrl()}/auth/me`, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
