import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

// One conversation turn: proxy the learner's message to the orchestrator (POST /tutor/turn),
// which replies in the space's persona tone and persists the transcript. Relays status + body.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendRes = await fetch(`${BACKEND_URL}/tutor/turn`, {
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
