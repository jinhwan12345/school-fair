"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTipsWithThumbnail } from "@/data/tips";

export default function TipsPage() {
  const tips = getTipsWithThumbnail();

  return (
    <main className="flex flex-col min-h-screen bg-[#f9f9f9] font-['Noto_Sans_KR'] text-gray-900">
      {/* ✅ 헤더 */}
      <Header />

      {/* ✅ 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학 입시 관련 TIP
        </div>
      </section>

      {/* ✅ 콘텐츠 wrapper (flex-grow 적용) */}
      <div className="flex-grow">
        {/* ✅ 메인 콘텐츠 (grid 고정 높이) */}
        <section className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <Link
              key={tip.id}
              href={`/tips/${tip.id}`}
              className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden 
                         hover:border-[#2A7DE1]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* ✅ 썸네일 */}
              <div className="relative overflow-hidden">
                <img
                  src={tip.thumbnail}
                  alt={tip.title}
                  className="w-full h-52 object-cover group-hover:scale-105 group-hover:blur-[1.5px] transition-all duration-500 ease-out"
                />
              </div>

              {/* ✅ 내용 */}
              <div className="p-5 bg-white relative z-10">
                <h3 className="text-base font-bold mb-1 text-gray-800 group-hover:text-[#2A7DE1] transition-colors break-keep">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 leading-snug break-keep">{tip.description}</p>
              </div>

              {/* ✅ 라이트 그라데이션 효과 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2A7DE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
          ))}
        </section>
      </div>

      {/* ✅ 푸터 */}
      <Footer />
    </main>
  );
}
