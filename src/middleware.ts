import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";
import { NextResponse, type NextRequest } from "next/server";

export default async function authMiddleware(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.next();
  try {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: "https://write-it-by-salman.vercel.app",
        headers: {
          //get the cookie from the request
          cookie: request.headers.get("cookie") || "",
        },
        credentials: "include",
      },
    );

    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", url.origin));
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/sign-in", url.origin));
  }
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/collection/:path*", "/journal/:path*"],
};
