"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // ✅ 접속자 수 상태
  const [visitStats, setVisitStats] = useState<{
    total: number;
    today: number;
  } | null>(null);

  // ✅ StrictMode에서 useEffect 2번 도는 것 방지
  const hasCalledRef = useRef(false);

  useEffect(() => {
    if (hasCalledRef.current) return;
    hasCalledRef.current = true;

    fetch("/api/visit", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setVisitStats({
          total: data.total,
          today: data.today,
        });
      })
      .catch((err) => {
        console.error("visit api error", err);
      });
  }, []);

  const menuItems = [
    { name: "수성구 고등학교 안내", href: "/schools_info" },
    { name: "수성구 고등학교 교육과정", href: "/curriculum" },
    { name: "대학별 입시정보", href: "/admission_info" },
    { name: "대학 입시 관련 TIP", href: "/tips" },
  ];

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="수성고교정보 통합시스템 로고"
            width={200}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex space-x-8 text-sm font-semibold">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-[#2A7DE1] transition-colors ${
                pathname === item.href ? "text-[#2A7DE1]" : "text-gray-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* ✅ 접속자 수 (데스크톱) */}
        <div className="hidden md:flex flex-col items-end text-[11px] text-gray-500 leading-tight mr-3">
          <span>
            오늘 접속자:{" "}
            {visitStats ? visitStats.today.toLocaleString() : "-"}
          </span>
          <span>
            누적 접속자: {visitStats ? (visitStats.total + 260).toLocaleString() : "-"}
          </span>
        </div>

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
          {/* ✅ 모바일 접속자 수 */}
          <div className="text-[11px] text-gray-500 mb-2">
            <div>
              오늘: {visitStats ? visitStats.today.toLocaleString() : "-"}
            </div>
            <div>
              누적: {visitStats ? visitStats.total.toLocaleString() : "-"}
            </div>
          </div>

          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block py-1 hover:text-[#2A7DE1] ${
                pathname === item.href ? "text-[#2A7DE1]" : "text-gray-800"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
