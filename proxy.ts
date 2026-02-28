import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const session = getSessionCookie(request, { cookiePrefix: "better-auth-voyago" });

  if (!session) {
    return NextResponse.redirect(new URL("login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/bookings", "/hotels", "/hotels/:path*"],
};
