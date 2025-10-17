// photo by "<a href="https://kr.freepik.com/free-photo/view-beautifully-decorated-scrapbook_30592674.htm">출처 freepik</a>"
// app/page.tsx
import Image from "next/image";
import mainImage from "../public/main_images/251017_3.png";

import styles from "./page.module.scss";

export default function Home() {
  
  return (
    <main className={styles.page}>
      <div style={{ position: "relative", width: "100vw", height: "600px" }}>
        <Image src={mainImage} alt="main-image" fill/>
      </div>
    </main>
  );
}
