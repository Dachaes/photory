import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route" 
import Header from "../app/header/header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// ✅ Paperlogy 폰트 등록
const paperlogy = localFont({
  src: [
    { path: "../public/fonts/Paperlogy/Paperlogy-1Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-2ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-3Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-4Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-5Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-6SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-7Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-8ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/Paperlogy/Paperlogy-9Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-paperlogy",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Photory",
  description: "Photory, the album that holds your memories.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // ✅ NextAuth 세션 직접 확인
  const session = await getServerSession(authOptions)
  const isLoggedIn = !!session

  return (
    <html lang="en">
      <body
        className={`${paperlogy.variable} antialiased`}
      >
        <Header isLoggedIn={isLoggedIn} />
        {children}
      </body>
    </html>
  );
}
