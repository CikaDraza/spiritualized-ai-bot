import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

// Re-send the verification email. The backend (POST /auth/resend-verification) requires a valid
// access cookie (401 otherwise) and no-ops for already-verified users — so this is implicitly
// gated to authenticated + unverified users. We just relay cookie, status and body.
export async function POST(req: NextRequest) {
  const backendRes = await fetch(`${BACKEND_URL}/auth/resend-verification`, {
    method: "POST",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
