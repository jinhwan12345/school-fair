"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { universities } from "@/data/universities";

export default function AdmissionInfoPage() {
  // 가나다순 정렬
  const sortedUniversities = [...universities].sort((a, b) =>
    a.name.localeCompare(b.name, "ko")
  );

  return (
    <main className="flex flex-col min-h-screen bg-[#f9f9f9] font-['Noto_Sans_KR'] text-gray-900">
      {/* 헤더 */}
      <Header />

      {/* 상단 블루 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학별 입시정보
        </div>
      </section>

      {/* 콘텐츠 wrapper */}
      <div className="flex-grow">
        {/* 메인 콘텐츠 카드 그리드 */}
        <section className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedUniversities.map((u) => (
            <Link
              key={u.eng}
              href={`/admission_info/${u.eng}`}
              className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden 
                         hover:border-[#2A7DE1]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
            >
              {/* 썸네일 */}
              <div className="relative overflow-hidden h-52 bg-white flex items-center justify-center p-6 border-b border-gray-100">
                <Image
                  src={`/universities/${u.eng}.png`}
                  alt={`${u.name} 로고`}
                  width={180}
                  height={90}
                  className="max-h-24 w-auto object-contain group-hover:scale-105 transition-all duration-500 ease-out"
                />
              </div>

              {/* 내용 */}
              <div className="p-5 bg-white relative z-10 flex flex-col flex-grow">
                <h3 className="text-base font-bold mb-1 text-gray-800 group-hover:text-[#2A7DE1] transition-colors line-clamp-2 break-keep">
                  {u.title}
                </h3>
                <p className="text-sm text-gray-600 leading-snug line-clamp-2 break-keep">
                  {u.content}
                </p>
              </div>

              {/* 라이트 그라데이션 효과 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2A7DE1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </section>
      </div>

      {/* 푸터 */}
      <Footer />
    </main>
  );
}
