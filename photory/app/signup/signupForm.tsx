"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./signupForm.module.scss";

const SignupForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  
  // ✅ 회원가입 요청
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1️⃣ 입력값 검증
    if (!id || !password || !passwordCheck || !nickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    redirect("/login");

    // 2️⃣ 서버에 회원가입 요청
    // try {
    //   const res = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       id,
    //       password,
    //       nickname,
    //     }),
    //   });

    //   const data = await res.json();

    //   // 3️⃣ 결과 처리
    //   if (res.ok && data.success) {
    //     alert("회원가입이 완료되었습니다!");
    //     router.push("/login"); // 가입 후 로그인 페이지로 이동
    //   } else {
    //     alert(data.message || "회원가입에 실패했습니다.");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    // }
  };

  return (
    <>
    <form 
      onSubmit={handleSignup} 
      className={styles.loginForm}
    >
      <input 
        type="id" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        // required 
        placeholder="아이디(사용자 이름)" 
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
        onChange={(e) => setPassword(e.target.value)}
        // required 
        placeholder="비밀번호 확인" 
      />
      <input 
        type="text" 
        value={nickname} 
        onChange={(e) => setNickname(e.target.value)}
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