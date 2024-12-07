import { NextResponse, type NextRequest } from "next/server";
import { AppURL } from "./lib/utils";

export default async function authMiddleware(request: NextRequest) {
  const url = new URL(request.url);
  const response = NextResponse.next();
  try {
    const response = await fetch(`${AppURL}/api/auth/get-session`);

    const jsonResponse = await response.json();

    const session = jsonResponse.data;

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
