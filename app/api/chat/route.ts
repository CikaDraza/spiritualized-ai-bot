import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://127.0.0.1:8000";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message, history, session_id } = body as {
    message?: string;
    history?: Array<{ role: string; content: string }>;
    session_id?: string;
  };

  if (!message || typeof message !== "string") {
    return NextResponse.json(
      { error: "Missing message field in request body." },
      { status: 400 },
    );
  }

  const authHeader = req.headers.get("authorization");

  try {
    const response = await fetch(`${BACKEND_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({ message, history: history ?? [], session_id }),
    });

    if (!response.ok) {
      const fallback = await response.text();
      return NextResponse.json(
        {
          assistant: `Backend se ne može povezati. Proveri backend server na ${BACKEND_URL}.\n\n${fallback}`,
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { assistant: `Greška prilikom poziva backend-a: ${error}` },
      { status: 500 },
    );
  }
}
