import { cookies } from "next/headers"
import { NextResponse } from "next/server";

// ✅ POST /api/logout : 로그아웃 처리
export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("user");
  return NextResponse.json({ success: true, message: "로그아웃 완료" });
}