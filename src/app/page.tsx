"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Header from "@/components/Header"; // ✅ 공통 헤더 불러오기

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // ✅ 현재 경로 확인용
  const [activeSchool, setActiveSchool] = useState<string | null>(null);

  // ✅ 페이지 이동 시 자동 스크롤 애니메이션
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrame: number;
    const speed = 1;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += speed;
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // ✅ 현재 페이지 기반으로 활성화 상태 관리
  useEffect(() => {
    if (pathname.startsWith("/schools/")) {
      const schoolPath = pathname.split("/")[2];
      setActiveSchool(schoolPath);
    } else {
      // 홈으로 돌아오면 초기화
      setActiveSchool(null);
    }
  }, [pathname]);

  // ✅ 버튼 클릭 시 페이지 이동
  const handleClick = (engName: string) => {
    router.push(`/schools/${engName}`);
  };

  const renderSchoolButton = (school: { name: string; engName: string }) => (
    <button
      key={school.engName}
      onClick={() => handleClick(school.engName)}
      className={`flex items-center justify-between border rounded-md px-3 py-2 shadow-sm transition ${
        activeSchool === school.engName
          ? "bg-[#2a7de1] text-white"
          : "bg-white hover:bg-[#f3bd8c] hover:text-white"
      }`}
    >
      <span className="text-sm font-medium">{school.name}</span>
      <Image
        src={`/schools/${school.engName}/logo.png`}
        alt={`${school.name} 로고`}
        width={24}
        height={24}
        className="ml-2"
      />
    </button>
  );

  const schoolsLeft = [
    { name: "경북고등학교", engName: "kyungbuk" },
    { name: "능인고등학교", engName: "neungin" },
    { name: "대구남산고등학교", engName: "namsan" },
    { name: "대구여자고등학교", engName: "daegu-girls" },
    { name: "대구혜화여자고등학교", engName: "hyehwa" },
    { name: "덕원고등학교", engName: "deokwon" },
    { name: "수성고등학교", engName: "suseong" },
    { name: "영남공업고등학교", engName: "yeongnam-tech" },
    { name: "정화여자고등학교", engName: "junghwa" },
  ];

  const schoolsRight = [
    { name: "경신고등학교", engName: "kyungshin" },
    { name: "대구과학고등학교", engName: "daegu-science" },
    { name: "대구농업마이스터고등학교", engName: "daegu-agri-meister" },
    { name: "대구중앙고등학교", engName: "daegu-jungang" },
    { name: "대륜고등학교", engName: "daeryun" },
    { name: "동문고등학교", engName: "dongmun" },
    { name: "시지고등학교", engName: "siji" },
    { name: "오성고등학교", engName: "oseong" },
  ];

  return (
    <main className="flex flex-col items-center bg-white text-gray-900">
      {/* ✅ 공통 헤더 */}
      <Header />

      {/* ✅ 메인 배너 */}
      <section className="w-full border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <Image
            src="/banner.png"
            alt="수성고교정보 통합 배너"
            width={1200}
            height={300}
            className="rounded-md shadow-sm w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* ✅ 학교 카드 + 지도 영역 */}
      <section className="max-w-[1200px] mx-auto py-10 px-4 flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* 왼쪽 학교 리스트 */}
          <div className="flex flex-col justify-between w-full lg:w-[220px] h-[600px]">
            {schoolsLeft.map((school) => (
              <button
                key={school.engName}
                onClick={() => handleClick(school.engName)}
                className={`flex items-center justify-between border rounded-md px-3 h-[65px] shadow-sm transition ${
                  activeSchool === school.engName
                    ? "bg-[#2a7de1] text-white"
                    : "bg-white hover:bg-[#f3bd8c] hover:text-white"
                }`}
              >
                <span className="text-sm font-medium">{school.name}</span>
                <Image
                  src={`/schools/${school.engName}/logo.png`}
                  alt={`${school.name} 로고`}
                  width={24}
                  height={24}
                  className="ml-2"
                />
              </button>
            ))}
          </div>


        {/* 중앙 지도 */}
        <div className="flex justify-center items-center bg-gray-100 rounded-md w-full lg:w-[600px] h-[600px] overflow-hidden shadow-sm">
          <Image
            src="/map.png"
            alt="수성구 고등학교 지도"
            width={600}
            height={600}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* 오른쪽 학교 리스트 */}
        <div className="flex flex-col justify-between w-full lg:w-[220px] h-[600px]">
          {schoolsRight.map((school) => (
            <button
              key={school.engName}
              onClick={() => handleClick(school.engName)}
              className={`flex items-center justify-between border rounded-md px-3 h-[75px] shadow-sm transition ${
                activeSchool === school.engName
                  ? "bg-[#2a7de1] text-white"
                  : "bg-white hover:bg-[#f3bd8c] hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">{school.name}</span>
              <Image
                src={`/schools/${school.engName}/logo.png`}
                alt={`${school.name} 로고`}
                width={24}
                height={24}
                className="ml-2"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ✅ 유관기관 슬라이드 */}
      <section className="hidden lg:block w-full bg-gray-100 py-8 border-t border-b">
        <div className="max-w-[1200px] mx-auto overflow-hidden" ref={scrollRef}>
          <div className="flex gap-[25px] w-max">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-[150px] h-[80px] bg-gray-300 flex items-center justify-center rounded-md font-semibold text-gray-700 flex-shrink-0"
              >
                유관기관 {i + 1}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ 푸터 */}
      <footer className="w-full bg-[#2A7DE1] text-white text-xs md:text-sm py-6 mt-8">
        <div className="max-w-[1200px] mx-auto text-center leading-6 px-4 md:px-6">
          <p>
            [42027] 대구광역시 수성구 달구벌대로 2451(범어동) 범어도서관 5층 대표전화: 053)668-7311 / 팩스: 053)668-7399
          </p>
          <p className="mt-1">COPYRIGHT© SUSEONG FUTURE EDUCATION FOUNDATION. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
