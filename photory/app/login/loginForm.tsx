"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 로그인 요청
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
      credentials: "include",
    });

    const data = await res.json();
    if (data.success) router.push("/");
    else alert("아이디 또는 비밀번호를 확인해주세요.");
  };

  return (
    <form 
      onSubmit={handleLogin} 
      className={styles.loginForm}
    >
      <input 
        type="id" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        // required 
        placeholder="사용자 이름 또는 이메일" 
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
  );
}

export default LoginForm;