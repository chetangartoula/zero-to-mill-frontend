import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/signup",
  "/signup/otp-verify",
  "/forgot-password",
  "/forgot-password/otp-verification",
  "/forgot-password/new-password",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthorized = request.cookies.has("refreshToken");

  if (isAuthorized && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuthorized && !PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
