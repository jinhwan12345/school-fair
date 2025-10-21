"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function SchoolsInfo() {
  const schools = [
    { id: "junghwa", name: "정화여자고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "oseong", name: "오성고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "yeongnam-tech", name: "영남공업고등학교", type: "특성화고 / 직업", establish: "사립" },
    { id: "siji", name: "시지고등학교", type: "일반고 / 일반고", establish: "공립" },
    { id: "suseong", name: "수성고등학교", type: "일반고 / 일반고", establish: "공립" },
    { id: "dongmun", name: "동문고등학교", type: "자율고 / 자공고", establish: "공립" },
    { id: "deokwon", name: "덕원고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "daeryun", name: "대륜고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "hyehwa", name: "대구혜화여자고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "daegu-jungang", name: "대구중앙고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "daegu-agri-meister", name: "대구농업마이스터고등학교", type: "특목고 / 마이스터고", establish: "공립" },
    { id: "daegu-girls", name: "대구여자고등학교", type: "일반고 / 일반고", establish: "공립" },
    { id: "namsan", name: "대구남산고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "daegu-science", name: "대구과학고등학교", type: "기타학교 / 영재고", establish: "공립" },
    { id: "neungin", name: "능인고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "kyungshin", name: "경신고등학교", type: "일반고 / 일반고", establish: "사립" },
    { id: "kyungbuk", name: "경북고등학교", type: "일반고 / 일반고", establish: "공립" },
  ];

  return (
    <main className="bg-[#f9f9f9] min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 타이틀 */}
      <section className="w-full bg-[#2A7DE1] text-white py-4 font-semibold text-lg tracking-tight">
        <div className="max-w-[1200px] mx-auto px-6 text-left">
          수성구 고등학교 안내
        </div>
      </section>

      {/* 검색결과 안내 */}
      <div className="max-w-[1200px] mx-auto px-6 mt-8 mb-2 text-gray-800 font-medium">
        검색결과 <span className="font-bold text-[#2A7DE1]">총 {schools.length}건</span>
      </div>

      {/* 카드 리스트 */}
      <section className="max-w-[1200px] mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {schools.map((school) => (
          <Link
            key={school.id}
            href={`/schools/${school.id}`} // ✅ 각 학교 상세 페이지로 연결
            className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden 
                       hover:border-[#2A7DE1] transition-all duration-300 hover:shadow-lg"
          >
            <div className="p-6">
              {/* ✅ 로고 불러오기 */}
              <div className="flex justify-center mb-4">
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src={`/schools/${school.id}/logo.png`}
                    alt={school.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* 학교 정보 */}
              <h3 className="text-base font-bold mb-1 text-gray-800">{school.name}</h3>
              <p className="text-sm text-gray-500">고교유형 {school.type}</p>
              <p className="text-sm text-gray-500">설립구분 {school.establish}</p>
            </div>

            {/* ✅ 호버 시 강조 애니메이션 */}
            <div
              className="absolute bottom-0 right-0 w-[70px] h-[70px] bg-[#2A7DE1] 
                         rounded-tl-[60px] flex justify-center items-center 
                         translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 
                         transition-all duration-300 ease-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
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
