"use client";

import Header from "@/components/Header";
import Image from "next/image";

export default function CurriculumPage() {
  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen">
      {/* ✅ 공통 헤더 */}
      <Header />

      {/* 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          수성구 고등학교 교육과정
        </div>
      </section>

      {/* ✅ 본문 콘텐츠 */}
      <section className="max-w-[1200px] w-full px-4 py-12">
        <div className="text-center text-gray-700">
          <p className="text-lg">
            이 페이지는 수성구 내 각 고등학교의 교육과정 정보를 제공합니다.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            학교별 세부 과목, 선택과목, 진로별 교육과정 등은 순차적으로 업데이트될 예정입니다.
          </p>
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
