"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header"; // ✅ 공용 헤더 import

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 유관기관 슬라이드 애니메이션
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
    <main className="flex flex-col items-center bg-white text-gray-900 font-['Noto_Sans_KR']">
      {/* ✅ 공용 헤더 */}
      <Header />

      {/* ===================== 메인 배너 ===================== */}
      <section className="w-full bg-gray-100 py-10 border-b">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-[25px]">
          <div className="w-full md:w-[60%] h-[180px] bg-gray-300 flex items-center justify-center text-lg font-medium">
            배너 이미지 영역
          </div>
          <div className="w-full md:w-[35%] h-[180px] bg-[#6AAAE4] flex items-center justify-center text-white font-semibold">
            도시락 배너 영역
          </div>
        </div>
      </section>

      {/* ===================== 본문 콘텐츠 ===================== */}
      <section className="max-w-[1200px] mx-auto py-10 px-4 flex justify-between items-start gap-[25px]">
        {/* 왼쪽 (5 + 4) */}
        <div className="flex gap-[25px]">
          <div className="flex flex-col gap-[25px]">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm shadow-sm hover:bg-[#F3DB48] hover:scale-105 transition-all"
              >
                로고 {i + 1}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[25px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i + 5}
                className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm shadow-sm hover:bg-[#F3DB48] hover:scale-105 transition-all"
              >
                로고 {i + 6}
              </div>
            ))}
          </div>
        </div>

        {/* 지도 */}
        <div className="w-[600px] h-[600px] bg-gray-300 flex items-center justify-center font-semibold text-xl rounded">
          지도 영역
        </div>

        {/* 오른쪽 (4 + 4) */}
        <div className="flex gap-[25px]">
          <div className="flex flex-col gap-[25px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i + 9}
                className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm shadow-sm hover:bg-[#F3DB48] hover:scale-105 transition-all"
              >
                로고 {i + 10}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[25px]">
            {[...Array(4)].map((_, i) => (
              <div
                key={i + 13}
                className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded text-sm shadow-sm hover:bg-[#F3DB48] hover:scale-105 transition-all"
              >
                로고 {i + 14}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 유관기관 슬라이드 ===================== */}
      <section className="hidden lg:block w-full bg-gray-100 py-8 border-t border-b">
        <div className="max-w-[1200px] mx-auto overflow-hidden" ref={scrollRef}>
          <div className="flex gap-[25px] w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-[150px] h-[80px] bg-gray-300 flex items-center justify-center rounded-md font-semibold text-gray-700 flex-shrink-0 hover:bg-[#F3DB48] transition-all"
              >
                유관기관 {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 푸터 ===================== */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">
            COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
