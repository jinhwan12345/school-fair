import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "수성고교정보 통합시스템",
  description: "수성구 관내 고등학교 정보 통합시스템",
  openGraph: {
    title: "대구 수성구 고교 정보 통합 플랫폼",
    description: "정확하고 빠른 길잡기, 수성구 고등학교 정보 탐색의 시작!",
    url: "https://www.esuseonghs.or.kr/",
    siteName: "수성고교정보 통합시스템",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
