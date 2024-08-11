import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return new NextResponse(
      JSON.stringify({ message: "Refresh token is required" }),
      { status: 400 }
    );
  }
  cookies().set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 604800, // 7 days
  });

  return new NextResponse(
    JSON.stringify({ message: "Session set successfully" }),
    { status: 200 }
  );
}
