import { NextResponse, type NextRequest } from "next/server";

import { getBackendUrl } from "@/lib/backend";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendRes = await fetch(`${getBackendUrl()}/spaces`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      cookie: req.headers.get("cookie") ?? "",
    },
    body,
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
