import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.scss";

import logo from "../../public/logo/logo_1024x480.png";
import SignupForm from "./signupForm";

const SignUpPage = async () => {
  // ✅ 로그인 검증
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (user && user.value && user.value !== "undefined" && user.value !== "null") {
    redirect("/");
  }

  return (
    <div className={styles.page}>
      <div className={styles.contents}>
        <Image 
          src={logo} 
          alt="Photory logo"
          className={styles.logoImage}>
        </Image>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignUpPage;