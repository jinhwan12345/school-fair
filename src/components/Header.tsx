"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
        {/* 로고 클릭 시 홈으로 이동 */}
        <Link href="/" className="font-bold text-lg text-[#2A7DE1] hover:opacity-80">
          (재)수성미래교육재단
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold">
          <Link href="/schools_info" className="hover:text-[#2A7DE1]">
            수성구 고등학교 안내
          </Link>
          <a href="#" className="hover:text-[#2A7DE1]">수성구 고등학교 교육과정</a>
          <a href="#" className="hover:text-[#2A7DE1]">대학별 입시정보</a>
          <a href="#" className="hover:text-[#2A7DE1]">대학 입시 관련 TIP</a>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          className="md:hidden text-gray-700 border rounded px-3 py-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          메뉴
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t text-sm font-medium text-center py-3 space-y-2">
          <Link href="/schools_info" className="block hover:text-[#2A7DE1]">
            수성구 고등학교 안내
          </Link>
          <a href="#" className="block hover:text-[#2A7DE1]">수성구 고등학교 교육과정</a>
          <a href="#" className="block hover:text-[#2A7DE1]">대학별 입시정보</a>
          <a href="#" className="block hover:text-[#2A7DE1]">대학 입시 관련 TIP</a>
        </div>
      )}
    </header>
  );
}
