"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

import logo from "../../public/logo/logo_1024x480.png";

const AuthPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    // 로그인 요청
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("API 응답:", data);

      if (data.success) {
        router.push("/");
      } 
      else {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (err) {
      console.error("로그인 중 오류:", err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <Image 
          src={logo} 
          alt="Photory logo"
          className={styles.logoImage}>
        </Image>
        {/* 로그인 폼 */}
         <form onSubmit={handleSubmit} className={styles.loginForm}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

      </div>
    </div>
  );
}

export default AuthPage;