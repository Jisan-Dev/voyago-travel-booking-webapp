import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const session = getSessionCookie(request, { cookiePrefix: "better-auth-voyago" });

  if (!session) {
    const loginUrl = new URL("/login", request.url);

    // ✅ include BOTH pathname + search params
    const fullPath = request.nextUrl.pathname + request.nextUrl.search;
    // console.log({
    //   fullPath,
    //   encodedFullPath: decodeURIComponent(fullPath),
    //   requestUrl: request.nextUrl.href,
    //   searchParams: request.nextUrl.search,
    //   searchP: request.nextUrl.searchParams,
    // });

    // store the original path
    loginUrl.searchParams.set("redirect", decodeURIComponent(fullPath));
    return NextResponse.redirect(loginUrl);
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  return NextResponse.next({ headers });
}

export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register|about|$).*)"],
  matcher: ["/bookings", "/payment-success"],
};
