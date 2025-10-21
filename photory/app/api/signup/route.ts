import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ✅ POST /api/signup : 회원가입
export async function POST(req: Request) {
  try {
    const { userId, email, password } = await req.json();

    if (!userId || !email || !password)
      return NextResponse.json({ success: false, message: "모든 필드를 입력해주세요." }, { status: 400 });

    // ✅ 중복 체크
    const existingEmail = await prisma.member.findFirst({
      where: { OR: [{ email }] },
    });
    if (existingEmail)
      return NextResponse.json({ success: false, message: "이미 존재하는 이메일입니다." }, { status: 400 });
    
    const existingUserId = await prisma.member.findFirst({
      where: { OR: [{ userId }] },
    });
    if (existingUserId)
      return NextResponse.json({ success: false, message: "이미 존재하는 아이디입니다." }, { status: 400 });
    
    

    // ✅ 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // DB에 저장
    await prisma.member.create({
      data: { userId, email, password: hashedPassword },
    });

    return NextResponse.json({ success: true, message: "회원가입이 완료되었습니다." });
  } 
  catch (err) {
    return NextResponse.json({ success: false, message: "알 수 없는 오류가 발생했습니다." }, { status: 500 });
  }
}
