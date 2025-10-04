"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrame: number;
    const speed = 1; // 슬라이드 속도 (픽셀/frame)

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0; // 끝까지 가면 처음으로
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
      <header className="w-full border-b">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-6">
          <div className="font-bold text-lg text-blue-700">(재)수성미래교육재단</div>
          <nav className="flex space-x-8 text-sm font-semibold">
            <a href="#" className="hover:text-blue-600">관내 고등학교 안내</a>
            <a href="#" className="hover:text-blue-600">관내 고등학교 교육과정</a>
            <a href="#" className="hover:text-blue-600">대학별 입시정보</a>
            <a href="#" className="hover:text-blue-600">대학 입시 관련 TIP</a>
          </nav>
        </div>
      </header>

      {/* 메인 배너 */}
      <section className="w-full bg-gray-100 py-10 border-b">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
          <div className="w-[60%] h-[200px] bg-gray-300 flex items-center justify-center text-lg font-medium">
            배너 이미지 영역
          </div>
          <div className="w-[35%] h-[200px] bg-gray-400 flex items-center justify-center text-white font-semibold">
            도시락 배너 영역
          </div>
        </div>
      </section>

      {/* 본문 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto py-12 flex flex-col items-center">
        {/* 로고 + 지도 영역 */}
        <div className="flex justify-between items-start w-full">
          {/* 왼쪽 5개 */}
          <div className="flex flex-col items-center space-y-[25px]">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
                로고 {i + 1}
              </div>
            ))}
          </div>

          {/* 왼쪽 중간 4개 */}
          <div className="flex flex-col items-center space-y-[25px]">
            {[...Array(4)].map((_, i) => (
              <div key={i + 5} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
                로고 {i + 6}
              </div>
            ))}
          </div>

          {/* 지도 */}
          <div className="w-[600px] h-[600px] bg-gray-300 flex items-center justify-center font-semibold text-xl rounded">
            지도 영역
          </div>

          {/* 오른쪽 중간 4개 */}
          <div className="flex flex-col items-center space-y-[25px]">
            {[...Array(4)].map((_, i) => (
              <div key={i + 9} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
                로고 {i + 10}
              </div>
            ))}
          </div>

          {/* 오른쪽 끝 4개 */}
          <div className="flex flex-col items-center space-y-[25px]">
            {[...Array(4)].map((_, i) => (
              <div key={i + 13} className="w-[125px] h-[80px] bg-gray-200 flex items-center justify-center rounded">
                로고 {i + 14}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 유관기관 슬라이드 영역 */}
      <section className="w-full bg-gray-100 py-8 border-t border-b">
        <div className="max-w-[1200px] mx-auto overflow-hidden" ref={scrollRef}>
          <div className="flex space-x-6 w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-[200px] h-[100px] bg-gray-300 flex items-center justify-center rounded-md font-semibold text-gray-700 flex-shrink-0"
              >
                유관기관 {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-blue-900 text-white text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-6">
          <p>[42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399</p>
          <p className="mt-1">COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
