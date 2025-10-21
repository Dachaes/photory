"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./signupForm.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // ✅ 회원가입 요청
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1️⃣ 입력값 검증
    if (!userId || !password || !passwordCheck || !email) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    // ✅ 아이디 형식 검증 (영문만, 8자 이하)
    const idRegex = /^[A-Za-z0-9_]{1,10}$/;
    const normalizedId = userId.toLowerCase();
    if (!idRegex.test(userId)) {
      alert("아이디는 영어, 숫자, 밑줄(_)만 가능하며 10자 이하여야 합니다.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 2️⃣ 서버에 회원가입 요청
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ normalizedId, email, password }),
      });
      const data = await res.json();
  
      if (res.ok && data.success) {
        alert(data.message);
        router.push("/login");
      }
      else {
        alert(data.message);
      }
    }
    catch (error) {
      alert("알 수 없는 오류가 발생했습니다.");
    }
  };

  return (
    <>
    <form 
      onSubmit={handleSignup} 
      className={styles.loginForm}
    >
      <input 
        type="userId" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        // required 
        placeholder="아이디(사용자 이름)"
        maxLength={10}
      /> 
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        // required 
        placeholder="비밀번호" 
      /> 
      <input 
        type="password" 
        value={passwordCheck} 
        onChange={(e) => setPasswordCheck(e.target.value)}
        // required 
        placeholder="비밀번호 확인" 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        // required 
        placeholder="이메일" 
      /> 
      <button type="submit">로그인</button> 
    </form>
    <Link 
      href="/login"
      className={styles.signup}>계정이 있으신가요?
    </Link>
    </>
  );
}

export default SignupForm;