import { cookies } from "next/headers"
import { NextResponse } from "next/server";

// ✅ GET /api/me : 로그인 상태 확인
export async function GET() {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  // 쿠키 값 검증 (빈 문자열, undefined/null 문자열 제외)
  const isLoggedIn =
    user &&
    user.value &&
    user.value !== "undefined" &&
    user.value !== "null" &&
    user.value.trim() !== "";

  if (!isLoggedIn) {
    return NextResponse.json({ 
      success: false, 
      isLoggedIn: false, 
      user: null 
    }, { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    isLoggedIn: true,
    user: { email: user.value },
  });
}