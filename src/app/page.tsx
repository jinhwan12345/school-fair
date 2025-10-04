"use client";
import { useState, useEffect, useRef } from "react";

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
          <div className="font-bold text-lg text-blue-700">(재)수성미래교육재단</div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold">
            <a href="#" className="hover:text-blue-600">관내 고등학교 안내</a>
            <a href="#" className="hover:text-blue-600">관내 고등학교 교육과정</a>
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

        {/* 모바일 메뉴 펼침 */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 border-t text-sm font-medium text-center py-3 space-y-2">
            <a href="#" className="block hover:text-blue-600">관내 고등학교 안내</a>
            <a href="#" className="block hover:text-blue-600">관내 고등학교 교육과정</a>
            <a href="#" className="block hover:text-blue-600">대학별 입시정보</a>
            <a href="#" className="block hover:text-blue-600">대학 입시 관련 TIP</a>
          </div>
        )}
      </header>

      {/* 메인 배너 */}
      <section className="w-full bg-gray-100 py-10 border-b">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-[25px]">
          <div className="w-full md:w-[60%] h-[180px] bg-gray-300 flex items-center justify-center text-lg font-medium">
            배너 이미지 영역
          </div>
          <div className="w-full md:w-[35%] h-[180px] bg-gray-400 flex items-center justify-center text-white font-semibold">
            도시락 배너 영역
          </div>
        </div>
      </section>

      {/* 본문 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto py-10 px-4 flex flex-col items-center">
        {/* 데스크톱 배치 */}
        <div className="hidden lg:flex justify-between items-start w-full gap-[25px]">
          {/* 왼쪽 */}
          <div className="flex flex-col gap-[25px]">
            <div className="flex justify-center flex-wrap gap-[25px]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm">
                  로고 {i + 1}
                </div>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-[25px]">
              {[...Array(5)].map((_, i) => (
                <div key={i + 4} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm">
                  로고 {i + 5}
                </div>
              ))}
            </div>
          </div>

          {/* 지도 */}
          <div className="w-[600px] h-[600px] bg-gray-300 flex items-center justify-center font-semibold text-xl rounded">
            지도 영역
          </div>

          {/* 오른쪽 */}
          <div className="flex flex-col gap-[25px]">
            <div className="flex justify-center flex-wrap gap-[25px]">
              {[...Array(4)].map((_, i) => (
                <div key={i + 9} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm">
                  로고 {i + 10}
                </div>
              ))}
            </div>
            <div className="flex justify-center flex-wrap gap-[25px]">
              {[...Array(4)].map((_, i) => (
                <div key={i + 13} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm">
                  로고 {i + 14}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 모바일/태블릿용 */}
        <div className="lg:hidden flex flex-col items-center w-full space-y-[25px]">
          <div className="w-full max-w-[600px] h-[400px] bg-gray-300 flex items-center justify-center font-semibold text-lg rounded">
            지도 영역
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[15px]">
            {[...Array(17)].map((_, i) => (
              <div
                key={i}
                className="w-[90px] h-[60px] bg-gray-200 flex items-center justify-center rounded text-xs"
              >
                로고 {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 유관기관 슬라이드 (데스크톱 전용) */}
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
      <footer className="w-full bg-blue-900 text-white text-xs md:text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>[42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399</p>
          <p className="mt-1">COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
