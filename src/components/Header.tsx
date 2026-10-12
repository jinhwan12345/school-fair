"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // 🔥 방문자 상태
  const [visitStats, setVisitStats] = useState<{
    total: number;
    today: number;
  } | null>(null);

  useEffect(() => {
    const loadVisitStats = async () => {
      try {
        // 한국 시간(KST) 기준 오늘 날짜 문자열 (YYYY-MM-DD)
        const todayStr = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Seoul",
        }).format(new Date());

        const lastVisited = localStorage.getItem("last_visited_date");
        const isFirstVisitToday = lastVisited !== todayStr;

        // 오늘 첫 방문인 경우 즉시 플래그 저장 (중복 호출 방지)
        if (isFirstVisitToday) {
          localStorage.setItem("last_visited_date", todayStr);
        }

        // 당일 첫 방문 시 POST(카운트 +1), 이미 방문한 경우 GET(단순 조회)
        const res = await fetch("/api/visit", {
          method: isFirstVisitToday ? "POST" : "GET",
        });

        const json = await res.json();

        // total / today 값이 있을 때만 상태로 반영
        if (typeof json.total === "number" && typeof json.today === "number") {
          setVisitStats({
            total: json.total,
            today: json.today,
          });
        } else {
          console.warn("visit API returned unexpected payload:", json);
        }
      } catch (e) {
        console.error("visit API error:", e);
      }
    };

    loadVisitStats();
  }, []);

  // 모바일 메뉴 열림/닫힘 상태
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 라우트 이동 시 모바일 메뉴 자동 닫기
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // 모바일 메뉴 열렸을 때 배경 스크롤 방지 및 ESC 키 닫기
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: "수성구 고등학교 안내", href: "/schools_info" },
    { name: "수성구 고등학교 교육과정", href: "/curriculum" },
    { name: "대학별 입시정보", href: "/admission_info" },
    { name: "대학 입시 관련 TIP", href: "/tips" },
  ];

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="수성고교정보 통합시스템 로고"
            width={200}
            height={60}
            className="h-10 md:h-12 w-auto"
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

        {/* 🔥 접속자 수 (데스크톱) */}
        <div className="hidden md:flex flex-col items-end text-[11px] text-gray-500 leading-tight mr-3">
          <span>
            오늘 접속자: {visitStats?.today?.toLocaleString() ?? "-"}
          </span>
          <span>
            누적 접속자: {(visitStats?.total ? visitStats.total : "-")
              .toLocaleString?.() ?? "-"}
          </span>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden p-2 -mr-2 text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2A7DE1]/30"
          aria-label="메뉴 열기"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* 모바일 오른쪽 슬라이드 메뉴 드로어 */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* 배경 오버레이 (클릭 시 닫힘) */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* 오른쪽 슬라이드 패널 */}
        <div
          className={`fixed top-0 right-0 bottom-0 w-[280px] max-w-[82vw] bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* 상단: 헤더 및 닫기 버튼 */}
          <div>
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-base">전체 메뉴</span>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
                aria-label="메뉴 닫기"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 메뉴 목록 */}
            <nav className="p-4 space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 text-[#2A7DE1]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>홈</span>
                <svg
                  className={`w-4 h-4 ${pathname === "/" ? "text-[#2A7DE1]" : "text-gray-400"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-[#2A7DE1]"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-4 h-4 ${isActive ? "text-[#2A7DE1]" : "text-gray-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 하단: 접속자 통계 정보 */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/60">
            <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-xs text-xs space-y-1.5">
              <div className="font-semibold text-gray-500 text-[11px] mb-1">방문자 현황</div>
              <div className="flex justify-between items-center text-gray-600">
                <span>오늘 접속자</span>
                <span className="font-bold text-[#2A7DE1]">
                  {visitStats?.today?.toLocaleString() ?? "-"}명
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>누적 접속자</span>
                <span className="font-bold text-gray-800">
                  {(visitStats?.total ? visitStats.total : "-").toLocaleString?.() ?? "-"}명
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
