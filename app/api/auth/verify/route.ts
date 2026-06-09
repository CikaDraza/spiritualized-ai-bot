import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

// Consume an email-verification token. The /verify page calls this with the token from the
// email link; we proxy to the backend (GET /auth/verify?token=…) and relay status + body.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token") ?? "";
  const backendRes = await fetch(
    `${BACKEND_URL}/auth/verify?token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
