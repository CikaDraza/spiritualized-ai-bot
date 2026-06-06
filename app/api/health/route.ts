import { NextRequest, NextResponse } from "next/server";
import { proxyRequest, getBackendUrl } from "@/lib/proxy";

export async function GET(req: NextRequest) {
  const backendUrl = getBackendUrl();
  const isRailway =
    backendUrl.includes("railway.app") || backendUrl.includes("railway");
  const isLocal =
    backendUrl.includes("127.0.0.1") || backendUrl.includes("localhost");
  const source = isRailway ? "railway" : isLocal ? "local" : "unknown";

  try {
    const response = await proxyRequest("/", { method: "GET" });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: "backend_unavailable",
          message: `Backend returned ${response.status}`,
          backendUrl,
          source,
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      status: "ok",
      message: "Frontend and backend are connected successfully",
      backendUrl,
      source,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: `Failed to connect to backend: ${error}`,
        backendUrl,
        source,
      },
      { status: 503 },
    );
  }
}
