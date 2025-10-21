"use client";

import Header from "@/components/Header";

export default function AdmissionInfoPage() {
  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen">
      {/* ✅ 헤더 */}
      <Header />

      {/* ✅ 타이틀 영역 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학별 입시정보
        </div>
      </section>

      {/* ✅ 본문 영역 (게시판) */}
      <section className="max-w-[1200px] w-full px-4 py-12">
        <div className="w-full border-t border-gray-300">
          {/* 예시 데이터 한 줄 */}
          <div className="flex items-center justify-between py-4 border-b border-gray-200 hover:bg-gray-50 transition">
            {/* 왼쪽 아이콘 + 제목 */}
            <div className="flex items-center gap-4">
              <span className="text-[#2A7DE1] font-semibold text-sm border border-[#2A7DE1] rounded-full px-3 py-1">
                수시
              </span>
              <span className="font-medium text-gray-800">
                2026학년도 수시 신입생 모집요강 공고
              </span>
            </div>

            {/* 오른쪽 정보 */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>조회수 64194</span>
              <span>2025.05.30</span>
              <button
                aria-label="첨부파일"
                className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100"
              >
                📎
              </button>
            </div>
          </div>

          {/* 추후 map()으로 리스트화 가능 */}
        </div>
      </section>

      {/* ✅ 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화:
            053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">
            COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
