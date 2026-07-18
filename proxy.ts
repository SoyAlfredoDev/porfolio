import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales } from "@/lib/translation";

const LOCALES = new Set<string>(locales);
const DEFAULT_LOCALE = "es";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Root → default locale home
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  const segment = pathname.split("/").filter(Boolean)[0];

  // Invalid "locale" (e.g. /cotizador) → home — never treat random paths as locale
  if (segment && !LOCALES.has(segment)) {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
