import { NextResponse, type NextRequest } from "next/server";

// Public routes: "/" (landing), "/login", "/register". Everything under PROTECTED needs a session.
const PROTECTED = ["/dashboard"];
const AUTH_PAGES = ["/login", "/register"];

const startsWith = (pathname: string, base: string) =>
  pathname === base || pathname.startsWith(`${base}/`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Cheap presence check; the access cookie is httpOnly (the server still validates it via /auth/me).
  const isAuthed = request.cookies.has("access_token");

  if (PROTECTED.some((p) => startsWith(pathname, p)) && !isAuthed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Already signed in → keep users out of the auth pages.
  if (AUTH_PAGES.some((p) => startsWith(pathname, p)) && isAuthed) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
