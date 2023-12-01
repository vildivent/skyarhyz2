import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const ref = request.nextUrl.searchParams.get("ref");
    if (!ref) return NextResponse.next();

    const nextUrl = request.nextUrl;
    nextUrl.searchParams.delete("ref");
    const response = NextResponse.redirect(nextUrl);
    const oneDay = 24 * 60 * 60 * 1000;
    response.cookies.set("ref", ref, { expires: Date.now() + oneDay });
    return response;
  }
}
