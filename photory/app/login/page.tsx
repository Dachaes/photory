"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";

import logo from "../../public/logo/logo_1024x480.png";

const LoginPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ 로그인 검증
  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("/api/me", {
        method : "GET",
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isLoggedIn) {
          console.log("현재 로그인된 사용자:", data.user.email);
        } 
        else {
          console.log("로그인되지 않음");
        }
      }
    };

    checkLogin();
  }, []);

  // ✅ 로그인 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      const data = await res.json();
    
      if (data.success) {
        console.log("[Login] 로그인 성공:", data);
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

      </div>
    </div>
  );
}

export default LoginPage;