"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    const speed = 1;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <main className="flex flex-col items-center bg-white text-gray-900">
      {/* 헤더 */}
      <header className="w-full border-b bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
          <div className="font-bold text-lg text-blue-700">수성고교정보 통합시스템</div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold">
            <a href="#" className="hover:text-blue-600">수성구 고등학교 안내</a>
            <a href="#" className="hover:text-blue-600">수성구 고등학교 교육과정</a>
            <a href="#" className="hover:text-blue-600">대학별 입시정보</a>
            <a href="#" className="hover:text-blue-600">대학 입시 관련 TIP</a>
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
            <a href="#" className="block hover:text-blue-600">수성구 고등학교 안내</a>
            <a href="#" className="block hover:text-blue-600">수성구 고등학교 교육과정</a>
            <a href="#" className="block hover:text-blue-600">대학별 입시정보</a>
            <a href="#" className="block hover:text-blue-600">대학 입시 관련 TIP</a>
          </div>
        )}
      </header>

      {/* ✅ 메인 배너 */}
      <section className="w-full border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <Image
            src="/banner.png"
            alt="수성고교정보 통합 배너"
            width={1200}
            height={300}
            className="rounded-md shadow-sm w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* ✅ 학교 카드 + 지도 영역 */}
      <section className="max-w-[1200px] mx-auto py-10 px-4 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* 왼쪽 학교 리스트 */}
        <div className="flex flex-col gap-3 w-full lg:w-[220px]">
          {[
            "경북고등학교",
            "농업고등학교",
            "대구남산고등학교",
            "대구여자고등학교",
            "대구혜화여자고등학교",
            "연덕고등학교",
            "수성고등학교",
            "영남공업고등학교",
            "정화여자고등학교",
          ].map((name, i) => (
            <button
              key={i}
              className="flex items-center justify-between border rounded-md px-3 py-2 bg-white shadow-sm hover:bg-blue-50 transition"
            >
              <span className="text-sm font-medium">{name}</span>
              <span className="text-gray-400 text-xs">▶</span>
            </button>
          ))}
        </div>

        {/* 중앙 지도 */}
        <div className="flex justify-center items-center bg-gray-200 rounded-md w-full lg:w-[600px] h-[600px] text-gray-700 font-semibold">
          지도 영역
        </div>

        {/* 오른쪽 학교 리스트 */}
        <div className="flex flex-col gap-3 w-full lg:w-[220px]">
          {[
            "경신고등학교",
            "대구국제고등학교",
            "대구농업마이스터고등학교",
            "대구융합고등학교",
            "대륜고등학교",
            "동문고등학교",
            "시지고등학교",
            "오성고등학교",
          ].map((name, i) => (
            <button
              key={i}
              className="flex items-center justify-between border rounded-md px-3 py-2 bg-white shadow-sm hover:bg-blue-50 transition"
            >
              <span className="text-sm font-medium">{name}</span>
              <span className="text-gray-400 text-xs">▶</span>
            </button>
          ))}
        </div>
      </section>

      {/* 유관기관 슬라이드 */}
      <section className="hidden lg:block w-full bg-gray-100 py-8 border-t border-b">
        <div className="max-w-[1200px] mx-auto overflow-hidden" ref={scrollRef}>
          <div className="flex gap-[25px] w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-[150px] h-[80px] bg-gray-300 flex items-center justify-center rounded-md font-semibold text-gray-700 flex-shrink-0"
              >
                유관기관 {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
