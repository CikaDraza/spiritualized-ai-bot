import { NextResponse, type NextRequest } from "next/server";

import { BACKEND_URL } from "@/lib/backend";

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const backendRes = await fetch(`${BACKEND_URL}/spaces/${id}`, {
    method: "DELETE",
    headers: { cookie: req.headers.get("cookie") ?? "" },
    cache: "no-store",
  });
  if (backendRes.status === 204) {
    return new NextResponse(null, { status: 204 });
  }
  const data = await backendRes.json().catch(() => ({}));
  return NextResponse.json(data, { status: backendRes.status });
}
