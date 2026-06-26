import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

// End-of-session rollup: proxy to the backend (POST /tutor/session/complete), which computes the
// session summary and folds it into the learner's Learning Space profile. Relays cookie + status.
export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendRes = await fetch(`${BACKEND_URL}/tutor/session/complete`, {
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
