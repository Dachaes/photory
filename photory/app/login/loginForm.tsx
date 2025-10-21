"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react"
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 로그인 요청
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const res = await fetch("/api/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ id, password }),
    //   credentials: "include",
    // });

    // const data = await res.json();
    // if (data.success) router.push("/");
    // else alert("아이디 또는 비밀번호를 확인해주세요.");
    const res = await signIn("credentials", {
      userId,
      password,
      redirect: false,
    })

    if (res?.ok) {
      router.push("/");
      router.refresh();
    } 
    else {
      alert("로그인 실패");
    }
  };

  return (
    <>
    <form 
      onSubmit={handleLogin} 
      className={styles.loginForm}
    >
      <input 
        type="text" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)} 
        // required 
        placeholder="아이디 또는 이메일" 
      /> 
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        // required 
        placeholder="비밀번호" 
      /> 
      <button type="submit">로그인</button> 
    </form>
    <Link 
      href="/signup"
      className={styles.signup}>계정이 없으신가요?
    </Link>
    {/* 자동 로그인 */}
    {/* 비밀번호 찾기 */}
    </>
  );
}

export default LoginForm;