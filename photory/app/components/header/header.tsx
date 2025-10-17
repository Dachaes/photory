"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.scss";

import logo from "../../../public/logo/logo_1024x480.png";


const Header = () => {
  const pathname = usePathname();
  const [indicatorPosition, setIndicatorPosition] = useState<number>(0);

  useEffect (() => {
    if (pathname === "/") {
      setIndicatorPosition(-127);
    }
    else if (pathname === "/albums") {
      setIndicatorPosition(0);
    }
  }, [pathname]);

  return (
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
        <Link href="/login" className={styles.loginButton}>
          로그인
        </Link>
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
          href="/"
          style={{ width: "100px", textAlign: "center" }}  
          className={pathname === "/menu3" ? styles.active : ""}
        >
          메뉴3
        </Link>
        <div
          className={styles.indicator}
          style={{
            transform: `translateX(${indicatorPosition}px)`,
          }}
        />
      </nav>
    </>
  );
}

export default Header;