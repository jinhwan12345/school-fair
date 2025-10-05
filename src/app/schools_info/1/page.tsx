"use client";

import Image from "next/image";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

export default function SchoolDetail() {
  const { id } = useParams();

  // 예시용 데이터 (나중에 JSON이나 API로 관리 가능)
  const schoolData = [
    {
      name: "정화여자고등학교",
      logo: "/images/schools_logo/school1.png",
      info: {
        주소: "대구광역시 수성구 청호로84길 123, 정화여자고등학교(범어동)",
        홈페이지: "http://www.junghwa.dge.hs.kr",
        "고교 유형": "일반고",
        "남녀 구분": "여",
        "선발 시기": "후기",
        "설립 구분": "사립",
        "설립 유형": "단설",
        "입학자 선정 유형": "평준화",
        "설립 일자": "1971년 12월 27일",
        "고교 특성화": "해당 없음",
        "관할 교육청": "대구광역시교육청",
        "대표 번호": "053-235-7311",
      },
    },
  ];

  const school = schoolData[0]; // 현재는 1개 예시만 표시

  return (
    <main className="bg-white min-h-screen font-['Noto_Sans_KR'] text-gray-900">
      <Header />

      {/* 상단 블루 타이틀 */}
        <section className="w-full bg-[#2A7DE1] text-white py-3 text-left font-semibold text-sm md:text-base tracking-tight">
         <div className="max-w-[1200px] mx-auto px-6">
           수성구 고등학교 안내 &gt; <span className="font-normal">{school.name}</span>
         </div>
        </section>


      {/* 학교 정보 */}
      <section className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center justify-start gap-10 py-10 px-6 border-b">
        {/* 로고 */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-[120px] h-[120px] mb-3">
            <Image src={school.logo} alt={school.name} fill className="object-contain" />
          </div>
          <h2 className="font-bold text-base md:text-lg">{school.name}</h2>
        </div>

 {/* 상세 정보 테이블 */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 text-sm md:text-[15px]">
                {Object.entries(school.info).map(([label, value]) => (
                <div key={label} className="flex">
                    <span className="font-semibold w-[100px] shrink-0">{label}</span>

                        {label === "홈페이지" ? (
                        <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2A7DE1] hover:underline break-all"
                        >
                    {value}
                        </a>
                        ) : (
                    <span className="text-gray-700">{value}</span>
                    )}
                </div>
                ))}
                </div>  
      </section>

      {/* 상세 이미지 안내 */}
      <section className="w-full bg-gray-100 py-16 flex flex-col items-center justify-center text-gray-800 text-lg font-semibold">
        <p>상세 이미지</p>
        <p>아래로 스크롤</p>
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
