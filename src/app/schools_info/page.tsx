"use client";

import Image from "next/image";
import Header from "@/components/Header"; // ✅ 공용 헤더 불러오기

export default function SchoolsInfo() {
  const schools = [
    { name: "경북고등학교", type: "일반고", establish: "공립" },
    { name: "경신고등학교", type: "일반고", establish: "사립" },
    { name: "대륜고등학교", type: "일반고", establish: "사립" },
    { name: "대구과학고등학교", type: "과학고", establish: "공립" },
    { name: "대구외국어고등학교", type: "외국어고", establish: "공립" },
    { name: "대구예술고등학교", type: "예술고", establish: "공립" },
    { name: "대구중앙고등학교", type: "일반고", establish: "사립" },
    { name: "대구제일고등학교", type: "일반고", establish: "사립" },
    { name: "덕원고등학교", type: "일반고", establish: "사립" },
    { name: "동일여자고등학교", type: "일반고", establish: "사립" },
    { name: "성보경영고등학교", type: "특성화고", establish: "사립" },
    { name: "수성고등학교", type: "일반고", establish: "공립" },
    { name: "심인고등학교", type: "일반고", establish: "사립" },
    { name: "정화여자고등학교", type: "일반고", establish: "사립" },
    { name: "효성여자고등학교", type: "일반고", establish: "사립" },
    { name: "경북예술고등학교", type: "예술고", establish: "공립" },
    { name: "대구사범대학교부설고등학교", type: "부설고", establish: "공립" },
  ];

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900 flex flex-col">
      {/* ✅ 공용 헤더 */}
      <Header />

      {/* ===================== 상단 타이틀 ===================== */}
      <section className="w-full bg-[#2A7DE1] text-white py-5 text-center font-semibold text-lg tracking-tight">
        관내 고등학교 안내
      </section>

      {/* ===================== 학교 리스트 ===================== */}
      <section className="max-w-[1200px] mx-auto px-6 py-12">
        <div
          className="
            grid 
            gap-8 
            sm:grid-cols-2 
            md:grid-cols-3 
            xl:grid-cols-4
            auto-rows-fr
          "
        >
          {schools.map((school, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#6AAAE4] transition-all duration-200 ease-in-out flex flex-col items-center py-8 px-4 cursor-pointer"
            >
              <div className="w-full aspect-square max-w-[180px] relative mb-5">
                <Image
                  src={`/images/schools_logo/school${i + 1}.png`}
                  alt={school.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-base font-bold mb-1 text-gray-800 text-center">
                {school.name}
              </h3>
              <p className="text-sm text-gray-500">{school.type}</p>
              <p className="text-sm text-gray-500">{school.establish}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== 푸터 ===================== */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-auto">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층
            대표전화: 053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">
            COPYRIGHT © Suseong Future Education Foundation. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
