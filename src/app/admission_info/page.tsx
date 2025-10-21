"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { universities } from "@/data/universities";

export default function AdmissionInfoPage() {
  return (
    <main className="flex flex-col items-center bg-white text-gray-900 min-h-screen">
      <Header />

      {/* 상단 헤더 영역 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          대학별 권장과목 안내
        </div>
      </section>

      {/* 본문 리스트 */}
      <section className="max-w-[1200px] w-full px-4 py-12">
        <div className="space-y-4">
          {universities.map((u) => (
            <div
              key={u.eng}
              className="flex items-center justify-between border border-gray-300 rounded-lg px-5 py-3 hover:bg-gray-50 transition"
            >
            {/* 제목과 학교명 정렬 개선 */}
            <div className="flex items-center gap-4 w-full">
            {/* 대학 로고 */}
            <Image
                src={`/universities/${u.eng}.png`}
                alt={`${u.name} 로고`}
                width={40}
                height={40}
            />

            {/* 학교명 (고정폭, pill 형태) */}
            <span className="bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm font-medium border border-gray-200 w-[150px] text-center shrink-0">
                {u.name}
            </span>

            {/* 제목 (flex-grow로 정렬선 유지) */}
            <span className="text-gray-900 text-base font-semibold flex-1 truncate">
                {u.title}
            </span>
            </div>


              {/* 바로가기 버튼 */}
              <a
                href={u.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A7DE1] border border-[#2A7DE1] rounded-full px-3 py-1 text-sm font-medium hover:bg-[#2A7DE1] hover:text-white transition"
              >
                바로가기
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 하단 푸터 */}
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
