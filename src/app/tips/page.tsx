"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { getTipsWithThumbnail } from "@/data/tips";

export default function TipsPage() {
  const tips = getTipsWithThumbnail();

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      {/* 헤더 */}
      <Header />

      {/* 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학 입시 관련 TIP
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tips.map((tip) => (
          <Link
            key={tip.id}
            href={`/tips/${tip.id}`}
            className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden 
                       hover:border-[#2A7DE1]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* ✅ 썸네일 (이미지에만 블러 및 확대 효과 적용) */}
            <div className="relative overflow-hidden">
              <img
                src={tip.thumbnail}
                alt={tip.title}
                className="w-full h-52 object-cover group-hover:scale-105 group-hover:blur-[1.5px] transition-all duration-500 ease-out"
              />
            </div>

            {/* 내용 */}
            <div className="p-5 bg-white relative z-10">
              <h3 className="text-base font-bold mb-1 text-gray-800 group-hover:text-[#2A7DE1] transition-colors">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 leading-snug">{tip.description}</p>
            </div>

            {/* 트렌디한 그라데이션 라이트 효과 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2A7DE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        ))}
      </section>

      {/* 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-8">
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
