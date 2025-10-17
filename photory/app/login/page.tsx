"use client";

import { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

import logo from "../../public/logo/logo_1024x480.png";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    console.log("로그인 요청:", { email, password });
    // 여기에 API 요청 로직 추가
    redirect("/");
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