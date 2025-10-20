"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";

import logo from "../../public/logo/logo_1024x480.png";

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn } : HeaderProps ) => {
  const pathname = usePathname();
  const [indicatorPosition, setIndicatorPosition] = useState<number>(0);
  const router = useRouter();

  // ✅ 현재 라우트 확인
  useEffect (() => {
    if (pathname === "/") {
      setIndicatorPosition(-127);
    }
    else if (pathname === "/albums") {
      setIndicatorPosition(0);
    }
    else if (pathname === "/profile") {
      setIndicatorPosition(127);
    }
  }, [pathname]);

  // ✅ 로그아웃
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        console.log("[Logout] 로그아웃 성공");
        router.push("/login");
      } 
      else {
        console.error("[Logout] 실패:", data.message);
        alert("로그아웃 중 문제가 발생했습니다.");
      }
    }
    catch (err) {
      console.error("로그아웃 요청 실패:", err);
      alert("서버와의 통신에 실패했습니다.");
    }

  };

  return (
    <>
      { (pathname === "/login" || "/signup")  ? (
      <>
      </>
      ) : (
      <>
        <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src={logo}
            alt="logo"
            width={180}
            priority
          />
        </Link>
        {isLoggedIn ? ( 
          <Link href="/login" className={styles.loginButton}>
            로그인
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className={styles.loginButton}
          >
            로그아웃
          </button>
        )}
      </div>
      <nav className={styles.nav}>
        <Link 
          href="/"
          style={{ width: "100px", textAlign: "center" }}
          className={pathname === "/" ? styles.active : ""} 
        >
          홈
        </Link>
        <Link 
          href="/albums"
          style={{ width: "100px", textAlign: "center" }} 
          className={pathname === "/albums" ? styles.active : ""}
        >
          앨범
        </Link>
        <Link 
          href="/profile"
          style={{ width: "100px", textAlign: "center" }}  
          className={pathname === "/profile" ? styles.active : ""}
        >
          프로필
        </Link>
        <div
          className={styles.indicator}
          style={{
            transform: `translateX(${indicatorPosition}px)`,
          }}
        />
      </nav>
      </>
      )}
    </>
  );
}

export default Header;