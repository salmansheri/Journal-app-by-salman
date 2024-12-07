import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: "https://write-it-by-salman.vercel.app",
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/collection/:path*", "/journal/:path*"],
};
