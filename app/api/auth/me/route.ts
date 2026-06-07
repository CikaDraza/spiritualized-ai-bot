import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

export async function GET(req: NextRequest) {
  const backendRes = await fetch(`${BACKEND_URL}/auth/me`, {
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
