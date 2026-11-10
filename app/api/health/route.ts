import { NextResponse } from "next/server";
import { proxyRequest } from "@/lib/proxy";

export async function GET() {
  try {
    const response = await proxyRequest("/", { method: "GET" });

    if (!response.ok) {
      return NextResponse.json({ status: "unavailable" }, { status: 503 });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}
