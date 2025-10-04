// src/app/page.tsx
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      {/* 헤더 */}
      <header className="w-full border-b bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-4 px-4">
          <h1 className="text-blue-700 font-bold text-lg">㈜수성미래교육재단</h1>
          <nav className="space-x-8 text-sm font-medium text-gray-700">
            <a href="#">관내 고등학교 안내</a>
            <a href="#">관내 고등학교 교육과정</a>
            <a href="#">대학별 입시정보</a>
            <a href="#" className="font-semibold text-black">
              대학 입시 관련 TIP
            </a>
          </nav>
        </div>
      </header>

      {/* 메인 배너 영역 */}
      <section className="w-full bg-gray-50 border-b">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center py-10 px-4">
          <div className="w-[750px] h-[200px] bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
            배너 이미지 영역
          </div>
          <div className="w-[400px] h-[200px] bg-gray-400 flex items-center justify-center text-white font-medium">
            도시락 배너 영역
          </div>
        </div>
      </section>

      {/* 학교 로고 + 지도 영역 */}
      <section className="w-full py-12">
        <div className="max-w-[1200px] mx-auto flex justify-center items-start space-x-[25px]">
          {/* 왼쪽 로고 9개 */}
          <div className="flex flex-col justify-between items-center space-y-[25px]">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-[125px] h-[80px] bg-gray-100 border rounded flex items-center justify-center shadow-sm"
              >
                로고 {i + 1}
              </div>
            ))}
          </div>

          {/* 지도 영역 */}
          <div className="w-[600px] h-[600px] bg-gray-300 flex items-center justify-center text-lg font-semibold">
            지도 영역
          </div>

          {/* 오른쪽 로고 8개 */}
          <div className="flex flex-col justify-between items-center space-y-[25px]">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-[125px] h-[80px] bg-gray-100 border rounded flex items-center justify-center shadow-sm"
              >
                로고 {i + 10}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 유관기관 영역 */}
      <section className="w-full bg-gray-50 py-8 border-t">
        <div className="max-w-[1200px] mx-auto flex space-x-6 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-[150px] h-[80px] bg-gray-200 flex items-center justify-center rounded shadow-sm"
            >
              유관기관 {i + 1}
            </div>
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-gray-800 text-white text-center py-6 text-sm mt-8">
        COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.
      </footer>
    </main>
  );
}
