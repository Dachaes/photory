import { cookies } from "next/headers"
import { NextResponse } from "next/server";

// POST /api/login : 로그인 요청
export async function POST(req: Request) {
  const { email, password } = await req.json();

  cookies().set("user", email, { path: "/", maxAge: 3600 });

  // // 아주 간단한 유효성 검사
  // if (!email || !password) {
  //   return NextResponse.json(
  //     { success: false, message: "이메일과 비밀번호를 모두 입력하세요." },
  //     { status: 400 }
  //   );
  // }

  // // 여기서는 그냥 임시 통과
  // console.log("[API] 로그인 시도:", email, password);

  return NextResponse.json({
    success: true,
    message: "로그인 성공!",
    user: { email },
  });
}