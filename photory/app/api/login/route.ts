import { cookies } from "next/headers"
import { NextResponse } from "next/server";

// ✅ POST /api/login : 로그인 요청
export async function POST(req: Request) {
  const { id, password } = await req.json();

  const cookieStore = await cookies();
  (await cookies()).set("user", id, { path: "/", maxAge: 3600, secure: false });

  console.log("[API] user 쿠키 값:", cookieStore.get("user"));

  return NextResponse.json({
    success: true,
    message: "로그인 성공!",
    user: { id },
  });
}